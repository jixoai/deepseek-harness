import { Context } from '@deepseek-ai/cordis'
import Sandbox from '@fde2e/len-sandbox-local'
import SandboxPolicy from '@fde2e/len-sandbox-policy'
import SessionProjections from '@fde2e/len-session-projection'
import { onTestFinished } from 'vitest'
import type { SandboxMode } from '@fde2e/len-sandbox'

/** Mount the Python runtime's policy and confinement providers with owned teardown. */
export async function createRuntimeContext(policy: { mode?: SandboxMode; workspaceRoot?: string } = {}): Promise<Context> {
  const ctx = new Context()
  onTestFinished(async () => { await ctx.fiber.dispose() })
  await ctx.plugin(Sandbox, {})
  await ctx.plugin(SessionProjections)
  await ctx.plugin(SandboxPolicy, { mode: 'danger-full-access', ...policy })
  return ctx
}
