/**
 * SSE 解析。
 *
 * Anthropic 的流是「`event:` 行 + `data:` 行」的重复，事件之间空行分隔。
 * 这里不做流式状态机，只把字节流切成事件——负载形状的判定留给调用方，
 * 因为一次请求里的负载类型多（message_start / content_block_delta / …），
 * 让解析器认识它们只会让「新增一种事件」变成「改解析器」。
 *
 * @module @fde2e/len-llm-anthropic/sse
 */
import type { WireStreamEvent } from './wire.ts'

/**
 * 逐事件产出。
 *
 * `data` 可能跨多行（SSE 规范允许），这里按规范用换行拼接。
 */
export async function* parseSse(
  body: ReadableStream<Uint8Array>,
): AsyncGenerator<WireStreamEvent> {
  const decoder = new TextDecoder()
  let buffer = ''
  let event: string | undefined
  let dataLines: string[] = []

  const flush = (): WireStreamEvent | undefined => {
    if (dataLines.length === 0 && event === undefined) return undefined
    const out: WireStreamEvent = {
      ...(event === undefined ? {} : { event }),
      ...(dataLines.length === 0 ? {} : { data: dataLines.join('\n') }),
    }
    event = undefined
    dataLines = []
    return out
  }

  for await (const chunk of body as unknown as AsyncIterable<Uint8Array>) {
    buffer += decoder.decode(chunk, { stream: true })
    // 事件以空行结束；两种换行都认（不同的代理会改写行尾）。
    let separator = buffer.search(/\r?\n\r?\n/)
    while (separator !== -1) {
      const raw = buffer.slice(0, separator)
      buffer = buffer.slice(separator + (buffer[separator] === '\r' ? 4 : 2))
      for (const line of raw.split(/\r?\n/)) {
        if (line.startsWith('event:')) event = line.slice('event:'.length).trim()
        else if (line.startsWith('data:')) dataLines.push(line.slice('data:'.length).replace(/^ /, ''))
        // 注释行（以 `:` 开头）与未知字段按 SSE 规范忽略。
      }
      const flushed = flush()
      if (flushed !== undefined) yield flushed
      separator = buffer.search(/\r?\n\r?\n/)
    }
  }

  // 收尾：有些代理在最后一个事件后不发空行。
  const tail = buffer.trim()
  if (tail !== '') {
    for (const line of tail.split(/\r?\n/)) {
      if (line.startsWith('event:')) event = line.slice('event:'.length).trim()
      else if (line.startsWith('data:')) dataLines.push(line.slice('data:'.length).replace(/^ /, ''))
    }
  }
  const last = flush()
  if (last !== undefined) yield last
}
