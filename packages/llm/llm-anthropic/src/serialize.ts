/**
 * 把内核的消息模型翻译成 Anthropic Messages 请求。
 *
 * 三处语义差异必须显式处理，否则会静默丢内容：
 *
 * 1. **system 不是消息**：Anthropic 用顶层 `system` 字段。内核把 system prompt
 *    放在 history 首条 `system`/`developer` 消息里，所以要抽出来合并。
 * 2. **tool 结果是 user 消息里的块**：Anthropic 没有独立 tool 角色，
 *    `tool_result` 必须放进 `user` 的 content 数组。
 * 3. **tool 调用是 assistant 的 `tool_use` 块**：参数是对象而不是 JSON 字符串，
 *    内核给的是原始 JSON 串，需要解析（解析失败按原文保留，不丢内容）。
 *
 * @module @fde2e/len-llm-anthropic/serialize
 */
import type { ContentBlock, RequestMessage, ToolSchema } from '@fde2e/len-llm'
import type { WireRequestBlock, WireRequestMessage } from './wire.ts'

/** 翻译结果：system 文本 + 有序消息。 */
export interface SerializedConversation {
  system?: string
  messages: WireRequestMessage[]
}

/** 一条消息里可显示为文本的部分（未知块类型跳过，不伪造）。 */
function textOf(content: unknown): string {
  if (typeof content === 'string') return content
  if (!Array.isArray(content)) return ''
  return content
    .map((block) => {
      if (block !== null && typeof block === 'object' && 'type' in block) {
        const typed = block as { type: string; text?: string }
        if (typed.type === 'text' && typeof typed.text === 'string') return typed.text
      }
      return ''
    })
    .join('')
}

/** 把内核内容块翻成 Anthropic 请求块；未知类型跳过。 */
function toRequestBlocks(content: readonly ContentBlock[]): WireRequestBlock[] {
  const out: WireRequestBlock[] = []
  for (const block of content) {
    switch (block.type) {
      case 'text':
        out.push({ type: 'text', text: block.text })
        break
      case 'image':
        // 内核的图片块只是**引用**（attachmentId + 尺寸），字节在 attachment
        // 服务里，需要异步取回才能内联成 Anthropic 的 base64 source。这个适配器
        // 暂不接那条链，所以图片在这里被明确跳过——不是忘了处理，而是没有
        // 悄悄发一个空图片让模型困惑。接入点就是这里。
        break
      case 'tool-call': {
        let input: unknown = {}
        try {
          input = block.arguments === '' ? {} : JSON.parse(block.arguments)
        } catch {
          // 解析不了就原样送出：宁可让服务端拒绝，也不静默把调用变形。
          input = { __raw: block.arguments }
        }
        out.push({ type: 'tool_use', id: block.id, name: block.name, input })
        break
      }
      case 'reasoning':
        // 历史里的推理不回声（Anthropic 要求带 signature 才能回传，
        // 而我们不保存签名）；省略不影响后续轮次。
        break
      default:
        break
    }
  }
  return out
}

/**
 * 序列化整段对话。
 *
 * 空 content 的消息会被丢弃：Anthropic 拒绝空 content 数组，而一个只含
 * 未知块的 assistant 消息翻完就是空的。
 */
export function serializeConversation(
  messages: readonly RequestMessage[],
  explicitSystem?: string,
): SerializedConversation {
  const systemParts: string[] = []
  if (explicitSystem !== undefined && explicitSystem !== '') systemParts.push(explicitSystem)

  const out: WireRequestMessage[] = []
  /** 上一条真实消息的角色：工具结果必须并入连续的 user 消息。 */
  let lastRole: 'user' | 'assistant' | undefined

  const append = (role: 'user' | 'assistant', blocks: WireRequestBlock[]): void => {
    if (blocks.length === 0) return
    const previous = out[out.length - 1]
    // Anthropic 要求 user/assistant 交替。相邻同类消息合并而不是插空消息，
    // 否则连续的 tool_result 会触发 "roles must alternate"。
    if (lastRole === role && previous !== undefined) {
      previous.content.push(...blocks)
      return
    }
    out.push({ role, content: blocks })
    lastRole = role
  }

  for (const message of messages) {
    switch (message.role) {
      case 'system':
      case 'developer': {
        const text = textOf(message.content)
        if (text !== '') systemParts.push(text)
        break
      }
      case 'user':
        append('user', toRequestBlocks(message.content as readonly ContentBlock[]))
        break
      case 'assistant':
        append('assistant', toRequestBlocks(message.content as readonly ContentBlock[]))
        break
      case 'tool': {
        append('user', [{
          type: 'tool_result',
          tool_use_id: message.toolCallId,
          content: textOf(message.content),
          ...(message.isError === true ? { is_error: true } : {}),
        }])
        break
      }
      default:
        break
    }
  }

  return {
    ...(systemParts.length === 0 ? {} : { system: systemParts.join('\n\n') }),
    messages: out,
  }
}

/** 工具声明：内核用 `parameters`，Anthropic 用 `input_schema`。 */
export function serializeTools(
  tools: readonly ToolSchema[] | undefined,
): { name: string; description: string; input_schema: Record<string, unknown> }[] | undefined {
  if (tools === undefined || tools.length === 0) return undefined
  return tools.map(tool => ({
    name: tool.name,
    description: tool.description,
    input_schema: tool.parameters,
  }))
}
