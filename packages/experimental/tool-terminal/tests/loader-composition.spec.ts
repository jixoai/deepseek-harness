import { executeToolFixture } from '@fde2e/len-tool-testkit'
import * as NativeToolExecutor from '@fde2e/len-tool-executor-native'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { unsupportedModel, provideWorkingDirectoryFixture, unsupportedInbox } from '@fde2e/len-agent-loop-testkit'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import Loader from '@deepseek-ai/cordis-plugin-loader'
import Include from '@deepseek-ai/cordis-plugin-include'
import { ToolCallId } from '@fde2e/len-llm'
import { Session, SessionId } from '@fde2e/len-session'
import AgentRegistry from '@fde2e/len-agent'
import type { Agent } from '@fde2e/len-agent'
import SystemPrompt from '@fde2e/len-system-prompt'
import ToolRuntime from '@fde2e/len-tools'
import TerminalSessionService from '@fde2e/len-terminal'
import SandboxProvider from '@fde2e/len-sandbox'
import type { ConfinedArgv, SandboxPolicy } from '@fde2e/len-sandbox'
import SandboxPolicyService from '@fde2e/len-sandbox-policy'
import SessionProjectionRegistry from '@fde2e/len-session-projection'
import LocalSubprocessRuntime from '@fde2e/len-subprocess-local'
import * as TerminalLocal from '@fde2e/len-terminal-bash'
import * as ToolPty from '@fde2e/len-tool-terminal'

let root: string | undefined
let context: Context | undefined

afterEach(async () => {
  await context?.fiber.dispose()
  context = undefined
  if (root !== undefined) await rm(root, { recursive: true, force: true })
  root = undefined
})

class PassthroughSandbox extends SandboxProvider {
  async confine(argv: readonly string[], _policy: SandboxPolicy): Promise<ConfinedArgv> {
    return { argv: [...argv], enforcement: 'full', denialSignatures: [], runnerFailureRules: [] }
  }
}

async function agent(ctx: Context): Promise<Agent> {
  const scope = ctx.plugin(() => {})
  const id = SessionId('pty-loader-agent')
  const session = Session.create(id)
  const value: Agent = {
    id, options: {}, session, model: unsupportedModel(),
    inbox: unsupportedInbox(),
    status: 'idle',
    ctx: scope.ctx,
    send: () => {},
    followup: () => {}, steer: () => {}, inject: () => {}, cancel() {},
    runMaintenance: job => job(new AbortController().signal),
    whenIdle: () => Promise.resolve(),
  }
  await ctx.agents.register(value)
  return value
}

function resultText(result: { content: { type: string; text?: string }[] }): string {
  return result.content.filter(block => block.type === 'text').map(block => block.text).join('')
}

const suite = process.platform === 'linux' || process.platform === 'darwin' ? describe : describe.skip

suite('terminal real Loader composition through cordis.yml', () => {
  it('boots cordis.yml and preserves shell state across real tool calls', async () => {
    root = await mkdtemp(join(tmpdir(), 'dsh-pty-loader-'))
    const configPath = join(root, 'cordis.yml')
    await writeFile(configPath, [
      "- name: '@fde2e/len-agent'",
      "- name: '@fde2e/len-system-prompt'",
      "- name: '@fde2e/len-tools'",
      "- name: '@fde2e/len-tool-executor-native'",
      "- name: '@fde2e/len-terminal'",
      "- name: '@fde2e/len-test-sandbox'",
      "- name: '@fde2e/len-session-projection'",
      "- name: '@fde2e/len-sandbox-policy'",
      '  config:',
      '    mode: danger-full-access',
      `    workspaceRoot: ${JSON.stringify(root)}`,
      "- name: '@fde2e/len-subprocess-local'",
      "- name: '@fde2e/len-terminal-bash'",
      '  config:',
      '    pollIntervalMs: 10',
      '    exactProbeAfterMs: 20',
      '    idleSilenceMs: 250',
      '    handoffGraceMs: 250',
      '    timeoutMs: 2000',
      '    disposeGraceMs: 500',
      "- name: '@fde2e/len-tool-terminal'",
      '',
    ].join('\n'))

    context = new Context()

    provideWorkingDirectoryFixture(context)
    context.baseUrl = pathToFileURL(root).href + '/'
    await context.plugin(Loader)
    context.loader.builtins.include = Include
    const modules = new Map<string, unknown>([
      ['@fde2e/len-agent', AgentRegistry],
      ['@fde2e/len-system-prompt', SystemPrompt],
      ['@fde2e/len-tools', ToolRuntime],
      ['@fde2e/len-tool-executor-native', NativeToolExecutor],
      ['@fde2e/len-terminal', TerminalSessionService],
      ['@fde2e/len-test-sandbox', PassthroughSandbox],
      ['@fde2e/len-session-projection', SessionProjectionRegistry],
      ['@fde2e/len-sandbox-policy', SandboxPolicyService],
      ['@fde2e/len-subprocess-local', LocalSubprocessRuntime],
      ['@fde2e/len-terminal-bash', TerminalLocal],
      ['@fde2e/len-tool-terminal', ToolPty],
    ])
    context.loader.internal = {
      version: 'v2',
      async import(specifier: string) {
        if (!modules.has(specifier)) throw new Error(`unexpected Loader import: ${specifier}`)
        return modules.get(specifier)
      },
    } as unknown as NonNullable<typeof context.loader.internal>
    await context.loader.create({ name: 'cordis:include', config: { path: pathToFileURL(configPath).href } })
    await context.loader.await()

    const owner = await agent(context)
    const signal = new AbortController().signal
    const spawn = await executeToolFixture(context, {
      signal, callId: ToolCallId('spawn'), name: 'terminal_open', arguments: { type: 'shell', name: 'main', cwd: root }, agent: owner,
    })
    expect(resultText(spawn)).toContain('started terminal session pty-1 (main)')

    await executeToolFixture(context, {
      signal, callId: ToolCallId('state'), name: 'terminal_send', arguments: { sessionId: 'pty-1', text: 'export KEEP=loader; cd /' }, agent: owner,
    })
    const read = await executeToolFixture(context, {
      signal, callId: ToolCallId('read'), name: 'terminal_send', arguments: { sessionId: 'pty-1', text: 'printf "cwd=%s keep=%s\\n" "$PWD" "$KEEP"' }, agent: owner,
    })
    expect(resultText(read)).toContain('cwd=/ keep=loader')
    expect(context.terminals.list(owner)).toHaveLength(1)
  }, 15_000)
})
