/**
 * Typed failures shared by subagent service and provider operations.
 *
 * @module @fde2e/len-subagent
 */

import { HarnessError } from '@fde2e/len-llm'

/** Typed failure for the subagent seam. */
export class SubagentError extends HarnessError {
  constructor(message: string, code: string, options?: ErrorOptions) {
    super(message, code, options)
    this.name = 'SubagentError'
  }
}
