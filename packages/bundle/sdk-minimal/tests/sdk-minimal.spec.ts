/** The standalone SDK-minimal bundle's complete declared Cordis tree. */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as yaml from 'js-yaml'
import { describe, expect, it } from 'vitest'
import { entryListSchema } from '@deepseek-ai/cordis-plugin-include'

function packageName(specifier: string): string {
  return specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0]!
}

describe('dsh-sdk-minimal bundle', () => {
  it('declares one standalone allowlisted tree with every row dependency', () => {
    const root = fileURLToPath(new URL('..', import.meta.url))
    const manifest = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')) as {
      dependencies?: Record<string, string>
      dsh?: { bundle?: { patch?: string } }
    }
    expect(manifest.dsh?.bundle?.patch).toBe('./cordis.patch.yml')
    const patches = yaml.load(
      readFileSync(resolve(root, manifest.dsh!.bundle!.patch!), 'utf8'),
      { schema: entryListSchema },
    ) as Array<{ insert?: Array<{ id?: string; inject?: string[]; name?: string; config?: Record<string, unknown>; disabled?: unknown }> }>
    expect(patches).toHaveLength(1)
    const rows = patches[0]?.insert ?? []
    expect(rows.map(row => [row.id, row.name])).toEqual([
      ['sdk-app-startup', '@fde2e/len-sdk-app'],
      ['sdk-jsonrpc-server', '@fde2e/len-sdk-jsonrpc-server'],
      ['deepseek-llm-api-extensions', '@fde2e/len-deepseek-llm-api-extensions'],
      ['session-log-deepseek', '@fde2e/len-session-log-deepseek'],
      ['plugin-package-inventory-deepseek', '@fde2e/len-plugin-package-inventory-deepseek'],
      ['llm-deepseek', '@fde2e/len-llm-deepseek-api-key'],
      ['sandbox', '@fde2e/len-sandbox-local'],
      ['filesystem', '@fde2e/len-fs-local'],
      ['attachment-local', '@fde2e/len-attachment-local'],
      ['tool-fs', '@fde2e/len-tool-fs'],
      ['working-directory', '@fde2e/len-working-directory'],
      ['tool-working-directory', '@fde2e/len-tool-working-directory'],
      ['session-projection', '@fde2e/len-session-projection'],
      ['token-meter', '@fde2e/len-token-meter'],
      ['compaction-basic', '@fde2e/len-compaction-basic'],
      ['image-offload', '@fde2e/len-compaction-image-offload'],
      ['sandbox-policy', '@fde2e/len-sandbox-policy'],
      ['subprocess', '@fde2e/len-subprocess-local'],
      ['pty', '@fde2e/len-terminal'],
      ['terminal-bash', '@fde2e/len-terminal-bash'],
      ['terminal-pwsh', '@fde2e/len-terminal-bash'],
      ['timer', '@deepseek-ai/cordis-plugin-timer'],
      ['llm', '@fde2e/len-llm'],
      ['session', '@fde2e/len-session'],
      ['session-title', '@fde2e/len-session-title'],
      ['system-prompt', '@fde2e/len-system-prompt'],
      ['tools', '@fde2e/len-tools'],
      ['tool-executor-native', '@fde2e/len-tool-executor-native'],
      ['mcp-resources', '@fde2e/len-mcp-resources'],
      ['agent', '@fde2e/len-agent'],
      ['llm-retry', '@fde2e/len-llm-retry'],
      ['jobs', '@fde2e/len-jobs-local'],
      ['agent-loop', '@fde2e/len-agent-loop'],
      ['persistent-bash', '@fde2e/len-tool-bash-persistent'],
      ['persistent-pwsh', '@fde2e/len-tool-pwsh-persistent'],
      ['sessions', '@fde2e/len-session-persistence-jsonl'],
      ['session-checkpoint-policy', '@fde2e/len-session-checkpoint-policy'],
    ])
    expect(rows.find(row => row.id === 'sdk-app-startup')?.config).toEqual({ profile: 'sdk-minimal' })
    expect(rows.find(row => row.id === 'sdk-jsonrpc-server')).toMatchObject({
      inject: ['sdkAppStartup', 'loader'],
      config: { maxTokensAsSuccess: false },
    })
    expect(rows.find(row => row.id === 'llm-deepseek')?.config).toEqual({
      apiKeyEnv: 'DEEPSEEK_API_KEY',
      defaultContextWindow: { __jsExpr: 'Number(process.env.DSH_CONTEXT_WINDOW ?? 1000000)' },
      streamIdleTimeoutMs: 172800000,
    })
    expect(rows.find(row => row.id === 'system-prompt')?.config).toEqual({
      includeHarnessIdentity: false,
      includeRuntimeContext: false,
      personaPrefix: { __jsExpr: "process.env.DSH_SYSTEM_PROMPT ?? 'You are a helpful software engineer assistant.'" },
    })
    expect(rows.find(row => row.id === 'agent-loop')?.config).toEqual({ agents: [] })
    expect(rows.find(row => row.id === 'tool-fs')?.config).toEqual({ read: false, readImage: true, write: false, edit: false })
    expect(rows.find(row => row.id === 'compaction-basic')?.config).toBeUndefined()
    expect(rows.find(row => row.id === 'terminal-bash')).toMatchObject({
      disabled: { __jsExpr: "process.platform === 'win32'" },
    })
    expect(rows.find(row => row.id === 'terminal-pwsh')).toMatchObject({
      disabled: { __jsExpr: "process.platform !== 'win32'" },
      config: { shellDialect: 'pwsh', timeoutMs: 300000 },
    })
    expect(Object.keys(manifest.dependencies ?? {}).sort()).toEqual(
      [...new Set(rows.map(row => row.name).filter((name): name is string => name !== undefined).map(packageName))].sort(),
    )
  })
})
