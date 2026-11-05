/**
 * Anthropic Messages API 的线上类型。
 *
 * 只声明我们实际发送与读取的字段。刻意**不**做全量建模：Anthropic 的响应
 * 会持续加字段，把未知字段当错误会让适配器在对方升级时失效。
 *
 * @module @fde2e/len-llm-anthropic/wire
 */

/** 请求侧内容块。图片与文件走各自的 source 形态。 */
export type WireRequestBlock =
  | { type: 'text'; text: string }
  | { type: 'image'; source: { type: 'base64'; media_type: string; data: string } }
  | { type: 'tool_use'; id: string; name: string; input: unknown }
  | { type: 'tool_result'; tool_use_id: string; content?: string; is_error?: boolean }
  | { type: 'thinking'; thinking: string; signature?: string }

/** 请求侧消息。system 不在其中——它是顶层字段。 */
export interface WireRequestMessage {
  role: 'user' | 'assistant'
  content: WireRequestBlock[]
}

/** 请求体。 */
export interface WireRequest {
  model: string
  max_tokens: number
  messages: WireRequestMessage[]
  system?: string
  tools?: { name: string; description: string; input_schema: Record<string, unknown> }[]
  temperature?: number
  stop_sequences?: string[]
  stream?: boolean
  metadata?: { user_id?: string }
}

/** 响应侧内容块。`thinking` 与 `redacted_thinking` 是推理模型的产物。 */
export type WireResponseBlock =
  | { type: 'text'; text: string }
  | { type: 'thinking'; thinking: string; signature?: string }
  | { type: 'redacted_thinking'; data: string }
  | { type: 'tool_use'; id: string; name: string; input: unknown }

/** token 用量。Anthropic 把缓存读写分开计，不合并。 */
export interface WireUsage {
  input_tokens?: number
  output_tokens?: number
  cache_creation_input_tokens?: number
  cache_read_input_tokens?: number
}

/** 非流式响应体。 */
export interface WireResponse {
  id: string
  type: 'message'
  role: 'assistant'
  model: string
  content: WireResponseBlock[]
  stop_reason: string | null
  stop_sequence: string | null
  usage?: WireUsage
}

/** SSE 事件。`data` 是 JSON 文本（`ping` 之类的空事件没有 data）。 */
export interface WireStreamEvent {
  event?: string
  data?: string
}

/** 流式事件的负载形状（按 `type` 分派）。 */
export type WireStreamPayload =
  | { type: 'message_start'; message: WireResponse }
  | { type: 'content_block_start'; index: number; content_block: WireResponseBlock }
  | { type: 'content_block_delta'; index: number; delta: WireDelta }
  | { type: 'content_block_stop'; index: number }
  | { type: 'message_delta'; delta: { stop_reason?: string | null; stop_sequence?: string | null }; usage?: WireUsage }
  | { type: 'message_stop' }
  | { type: 'ping' }
  | { type: 'error'; error: { type: string; message: string } }

/** 增量。 */
export type WireDelta =
  | { type: 'text_delta'; text: string }
  | { type: 'thinking_delta'; thinking: string }
  | { type: 'signature_delta'; signature: string }
  | { type: 'input_json_delta'; partial_json: string }
