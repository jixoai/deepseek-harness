/**
 * 序列化契约：三处语义差异必须显式处理，处理错会静默丢内容。
 */
import { describe, expect, it } from 'vitest'
import { serializeConversation, serializeTools } from '../src/serialize.ts'

describe('serializeConversation', () => {
  it('system 抽到顶层，不进消息数组', () => {
    const out = serializeConversation([
      { role: 'system', content: [{ type: 'text', text: 'you are len' }] },
      { role: 'user', content: [{ type: 'text', text: 'hi' }] },
    ] as never)
    expect(out.system).toBe('you are len')
    expect(out.messages).toHaveLength(1)
    expect(out.messages[0]!.role).toBe('user')
  })

  it('developer 与显式 system 合并，顺序保持', () => {
    const out = serializeConversation(
      [{ role: 'developer', content: [{ type: 'text', text: 'be terse' }] }] as never,
      'base',
    )
    expect(out.system).toBe('base\n\nbe terse')
  })

  it('tool 结果进 user 消息的 tool_result 块', () => {
    const out = serializeConversation([
      { role: 'user', content: [{ type: 'text', text: 'weather?' }] },
      { role: 'assistant', content: [{ type: 'tool-call', id: 'c1', name: 'w', arguments: '{}' }] },
      { role: 'tool', toolCallId: 'c1', content: [{ type: 'text', text: 'sunny' }] },
    ] as never)
    const last = out.messages[out.messages.length - 1]!
    expect(last.role).toBe('user')
    expect(last.content[0]).toMatchObject({ type: 'tool_result', tool_use_id: 'c1', content: 'sunny' })
  })

  it('相邻同类消息合并（Anthropic 要求角色交替）', () => {
    const out = serializeConversation([
      { role: 'user', content: [{ type: 'text', text: 'a' }] },
      { role: 'user', content: [{ type: 'text', text: 'b' }] },
    ] as never)
    expect(out.messages).toHaveLength(1)
    expect(out.messages[0]!.content).toHaveLength(2)
  })

  it('tool 调用参数解析成对象；解析不了按原文保留而不是丢弃', () => {
    const out = serializeConversation([
      { role: 'assistant', content: [{ type: 'tool-call', id: 'c', name: 'n', arguments: '{"a":1}' }] },
      { role: 'assistant', content: [{ type: 'tool-call', id: 'd', name: 'm', arguments: 'not json' }] },
    ] as never)
    expect(out.messages[0]!.content[0]).toMatchObject({ input: { a: 1 } })
    expect(out.messages[0]!.content[1]).toMatchObject({ input: { __raw: 'not json' } })
  })

  it('空 content 的消息被丢弃（Anthropic 拒绝空数组）', () => {
    const out = serializeConversation([
      { role: 'assistant', content: [] },
      { role: 'user', content: [{ type: 'text', text: 'x' }] },
    ] as never)
    expect(out.messages).toHaveLength(1)
    expect(out.messages[0]!.role).toBe('user')
  })
})

describe('serializeTools', () => {
  it('parameters 映射到 input_schema', () => {
    const out = serializeTools([
      { name: 'w', description: 'd', parameters: { type: 'object', properties: {} } },
    ] as never)
    expect(out).toEqual([{ name: 'w', description: 'd', input_schema: { type: 'object', properties: {} } }])
  })

  it('没有工具时返回 undefined（不发空数组）', () => {
    expect(serializeTools([])).toBeUndefined()
    expect(serializeTools(undefined)).toBeUndefined()
  })
})
