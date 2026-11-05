/**
 * `llm-anthropic` —— 把 Anthropic Messages API 接进内核的 LLM seam。
 *
 * 用途：任何说 Anthropic Messages 协议的服务（官方、企业网关、本地代理）
 * 都能作为 provider 路由使用。本仓的第一位用户是本地模型网关。
 *
 * 凭据走内核的 credentials 服务，和 DeepSeek 路由同一条链：优先
 * `$DSH_HOME/.credentials.yaml`，其次启动环境变量。适配器自己不落盘任何 key。
 *
 * @module @fde2e/len-llm-anthropic
 */
import type { Context } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { LlmError } from '@fde2e/len-llm'
import { AnthropicAdapter } from './adapter.ts'

export { AnthropicAdapter } from './adapter.ts'
export type { AnthropicAdapterOptions } from './adapter.ts'
export { serializeConversation, serializeTools } from './serialize.ts'
export { parseSse } from './sse.ts'
export type * from './wire.ts'

/** Cordis 插件名。 */
export const name = 'llm-anthropic'

/** 依赖 llm 服务。 */
export const inject = ['llm']

/** 插件配置。 */
export interface Config {
  /** 路由名：请求里的 `provider` 就是这个值。 */
  provider: string
  /** 端点根，不含 `/v1/messages`。 */
  baseURL: string
  /** 凭据引用名；从 credentials 服务或环境变量取。 */
  apiKeyEnv: string
  /** 请求未指定时的 max tokens。 */
  maxTokens?: number
}

/** 配置 schema。 */
export const Config: z<Config> = z.object({
  provider: z.string().required(),
  baseURL: z.string().required(),
  apiKeyEnv: z.string().default('ANTHROPIC_API_KEY'),
  maxTokens: z.number().default(8192),
})

/**
 * 解析一次请求要用的 key。
 *
 * 顺序：credentials 服务 → 启动环境。与 DeepSeek 路由保持一致，用户不必
 * 记住「哪个 provider 的 key 存在哪」。
 */
function keyResolver(ctx: Context, ref: string): () => Promise<string> {
  return async () => {
    const credentials = ctx.get('credentials') as
      | { resolve(r: unknown): Promise<{ value: string } | undefined> }
      | undefined
    if (credentials !== undefined) {
      const hit = await credentials.resolve(ref)
      if (hit !== undefined && hit.value.length > 0) return hit.value
    }
    const ambient = process.env[ref]
    if (ambient !== undefined && ambient.length > 0) return ambient
    throw new LlmError(
      `llm-anthropic: no API key for provider route "${ref}"; store it through the credentials`
      + ` service or export ${ref} in the launching environment`,
      'MISSING_CREDENTIAL',
    )
  }
}

/** 挂载插件。 */
export async function apply(ctx: Context, config: Config): Promise<void> {
  const llm = ctx.get('llm') as {
    registerAdapter(providers: string[], adapter: unknown): () => void
  }

  const adapter = new AnthropicAdapter({
    baseURL: config.baseURL,
    apiKey: keyResolver(ctx, config.apiKeyEnv),
    ...(config.maxTokens === undefined ? {} : { maxTokens: config.maxTokens }),
  })

  ctx.effect(() => {
    const dispose = llm.registerAdapter([config.provider], adapter)
    return dispose
  }, `${name}.register`)
}
