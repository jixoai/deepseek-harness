/**
 * Anthropic Messages API 适配器。
 *
 * 设计取舍：**只实现 `stream()`**。`LlmAdapter` 的其余方法都有合理默认，
 * 逐一重写只会增加与上游同步时要维护的面积。
 *
 * 流式是唯一路径：内核的消费方（agent-loop）按增量消费，非流式响应在这里
 * 也是用 `stream: true` 拿、由上游累积。这样只有一条代码路径要维护。
 *
 * @module @fde2e/len-llm-anthropic/adapter
 */
import type { GenerateOptions, StreamChunk } from '@fde2e/len-llm'
import { LlmAdapter, LlmError, attributionHeaders } from '@fde2e/len-llm'
import type { ContentBlock, FinishReason, TokenUsage } from '@fde2e/len-llm'
import { parseSse } from './sse.ts'
import { serializeConversation, serializeTools } from './serialize.ts'
import type { WireRequest, WireStreamPayload, WireUsage } from './wire.ts'

/** 适配器连接参数。 */
export interface AnthropicAdapterOptions {
  /** 端点根，例如 `http://localhost:20002/deepseek`。不含 `/v1/messages`。 */
  readonly baseURL: string
  /** 取 key 的方式；每次请求都调用，配置改了立刻生效。 */
  readonly apiKey: () => Promise<string>
  /** 默认 max tokens（请求未指定时）。 */
  readonly maxTokens?: number
  /** 额外的请求头（代理鉴权等）。 */
  readonly headers?: () => Record<string, string>
  /**
   * 推理预算（token）。`undefined` 交给服务端默认；数字表示上限；
   * `0` 表示关闭推理。
   *
   * 这个开关不是可选优化：推理模型不设界时会用光 `max_tokens` 全在思考，
   * 正文为空，而调用方只会看到「零断言」这种下游症状。
   */
  readonly thinkingBudget?: number
}

/** 默认 max tokens：Anthropic 要求必填，缺省给一个够用的值。 */
const DEFAULT_MAX_TOKENS = 8192

/** Anthropic 的 API 版本头。 */
const ANTHROPIC_VERSION = '2023-06-01'

/** 推理预算 → 请求字段。未配置时不发（交给服务端默认）。 */
function thinkingField(budget: number | undefined): Pick<WireRequest, 'thinking'> | Record<string, never> {
  if (budget === undefined) return {}
  if (budget <= 0) return { thinking: { type: 'disabled' } }
  return { thinking: { type: 'enabled', budget_tokens: budget } }
}

/** 把 Anthropic 的 stop_reason 翻成内核的 FinishReason。 */
function toFinishReason(reason: string | null | undefined): FinishReason {
  switch (reason) {
    case 'tool_use':
      return { kind: 'tool-calls' }
    case 'max_tokens':
      return { kind: 'max-tokens' }
    default:
      // end_turn / stop_sequence / null / 未知值都按正常结束处理：
      // 未知的停止原因不该被报成错误，那会让一次成功的调用看起来失败。
      return { kind: 'stop' }
  }
}

/** 用量翻译。Anthropic 的缓存字段与内核对齐，直接搬。 */
function toUsage(usage: WireUsage | undefined): TokenUsage {
  const input = usage?.input_tokens ?? 0
  const output = usage?.output_tokens ?? 0
  const cacheRead = usage?.cache_read_input_tokens ?? 0
  const cacheWrite = usage?.cache_creation_input_tokens ?? 0
  return {
    inputTokens: input,
    outputTokens: output,
    totalTokens: input + output + cacheRead + cacheWrite,
    cacheReadTokens: cacheRead,
    cacheWriteTokens: cacheWrite,
  }
}

/** 适配器本体。 */
export class AnthropicAdapter extends LlmAdapter {
  constructor(private readonly options: AnthropicAdapterOptions) {
    super()
  }

  /** Anthropic Messages 端点。 */
  private endpoint(): string {
    const base = this.options.baseURL.replace(/\/+$/, '')
    return `${base}/v1/messages`
  }

  override async *stream(options: GenerateOptions): AsyncIterable<StreamChunk> {
    const conversation = serializeConversation(options.messages, options.system)
    const tools = serializeTools(options.tools)

    const body: WireRequest = {
      model: options.model,
      max_tokens: options.maxTokens ?? this.options.maxTokens ?? DEFAULT_MAX_TOKENS,
      messages: conversation.messages,
      stream: true,
      ...(conversation.system === undefined ? {} : { system: conversation.system }),
      ...(tools === undefined ? {} : { tools }),
      ...(options.temperature === undefined ? {} : { temperature: options.temperature }),
      ...(options.stop === undefined || options.stop.length === 0 ? {} : { stop_sequences: options.stop }),
      ...thinkingField(this.options.thinkingBudget),
    }

    const apiKey = await this.options.apiKey()
    const response = await fetch(this.endpoint(), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'anthropic-version': ANTHROPIC_VERSION,
        'x-api-key': apiKey,
        accept: 'text/event-stream',
        // 每个 provider 请求都带归属头：这是内核的硬契约，不是建议。
        ...attributionHeaders(),
        ...(this.options.headers?.() ?? {}),
      },
      body: JSON.stringify(body),
      ...(options.signal === undefined ? {} : { signal: options.signal }),
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      yield {
        type: 'finish',
        reason: {
          kind: 'error',
          failure: new LlmError(
            `anthropic: HTTP ${String(response.status)} from ${this.endpoint()}: ${detail.slice(0, 800)}`,
            'PROVIDER_ERROR',
          ),
        },
      }
      return
    }
    if (response.body === null) {
      yield {
        type: 'finish',
        reason: {
          kind: 'error',
          failure: new LlmError('anthropic: response had no body', 'PROVIDER_ERROR'),
        },
      }
      return
    }

    // 流式状态：按 index 累积每个块的增量，块结束时一次成块。
    const partial = new Map<number, { kind: string; text: string; json: string; id?: string; name?: string }>()
    let stopReason: string | null = null
    let usage: WireUsage | undefined

    for await (const event of parseSse(response.body)) {
      if (event.data === undefined) continue
      let payload: WireStreamPayload
      try {
        payload = JSON.parse(event.data) as WireStreamPayload
      } catch {
        // 不认识的负载跳过：一个畸形事件不该毁掉整轮。
        continue
      }

      switch (payload.type) {
        case 'message_start':
          if (payload.message.usage !== undefined) usage = { ...usage, ...payload.message.usage }
          break
        case 'content_block_start': {
          const block = payload.content_block
          const slot = {
            kind: block.type,
            text: block.type === 'text' ? block.text : block.type === 'thinking' ? block.thinking : '',
            json: '',
            ...(block.type === 'tool_use' ? { id: block.id, name: block.name } : {}),
          }
          partial.set(payload.index, slot)
          yield {
            type: 'block-start',
            index: payload.index,
            blockType: block.type === 'tool_use' ? 'tool-call' : block.type === 'thinking' ? 'reasoning' : 'text',
          }
          break
        }
        case 'content_block_delta': {
          const slot = partial.get(payload.index)
          if (slot === undefined) break
          const delta = payload.delta
          if (delta.type === 'text_delta') {
            slot.text += delta.text
            yield { type: 'text-delta', index: payload.index, text: delta.text }
          } else if (delta.type === 'thinking_delta') {
            slot.text += delta.thinking
            yield { type: 'reasoning-delta', index: payload.index, text: delta.thinking }
          } else if (delta.type === 'signature_delta') {
            // 签名只对「把推理回传给 Anthropic」有意义；我们不回传，
            // 所以只保留不发出，避免推理内容进用户可见的文本流。
          } else if (delta.type === 'input_json_delta') {
            slot.json += delta.partial_json
            yield {
              type: 'tool-call-delta',
              index: payload.index,
              id: (slot.id ?? '') as never,
              ...(slot.name === undefined ? {} : { name: slot.name }),
              argumentsDelta: delta.partial_json,
            }
          }
          break
        }
        case 'content_block_stop': {
          const slot = partial.get(payload.index)
          partial.delete(payload.index)
          if (slot === undefined) break
          const block: ContentBlock = slot.kind === 'tool_use'
            ? { type: 'tool-call', id: (slot.id ?? '') as never, name: slot.name ?? '', arguments: slot.json }
            : slot.kind === 'thinking'
              ? { type: 'reasoning', text: slot.text }
              : { type: 'text', text: slot.text }
          yield { type: 'block-end', index: payload.index, block }
          break
        }
        case 'message_delta':
          if (payload.delta.stop_reason !== undefined) stopReason = payload.delta.stop_reason
          if (payload.usage !== undefined) usage = { ...usage, ...payload.usage }
          break
        case 'error':
          yield {
            type: 'finish',
            reason: {
              kind: 'error',
              failure: new LlmError(
                `anthropic: stream error ${payload.error.type}: ${payload.error.message}`,
                'PROVIDER_ERROR',
              ),
            },
          }
          return
        case 'message_stop':
        case 'ping':
        default:
          break
      }
    }

    if (usage !== undefined) yield { type: 'usage', usage: toUsage(usage) }
    yield { type: 'finish', reason: toFinishReason(stopReason) }
  }
}
