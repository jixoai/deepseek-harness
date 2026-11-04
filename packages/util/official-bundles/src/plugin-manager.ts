/** The package names the plugin manager protects, hides, orders, or marks experimental. */

/**
 * Plugin packages the plugin manager refuses to disable or remove, because management itself needs them; a bundle that
 * contains one is read-only as well. Removing a name drops only this `management-required` refusal; the manager's own
 * entry, installation-carried bundles, and unaddressable rows stay protected by their own rules.
 */
export const PROTECTED_PLUGINS: ReadonlySet<string> = new Set([
  '@fde2e/len-plugin-manager', '@deepseek-ai/cordis-plugin-loader',
  '@deepseek-ai/cordis-plugin-include', '@fde2e/len-api-gateway',
  '@fde2e/len-host-webserver', '@fde2e/len-client-modules',
  '@fde2e/len-client-ui-settings-plugin-inventory', '@fde2e/len-client-ui-plugin-manager',
  '@fde2e/len-host-plugin-inventory', '@fde2e/len-typert-registry',
  '@fde2e/len-api-remotes', '@fde2e/len-api-remote-access',
  '@deepseek-ai/cordis-plugin-timer', '@fde2e/len-client-connection',
  '@fde2e/len-host-frontend-static', '@fde2e/len-tools',
  '@fde2e/len-hmr',
])

/**
 * Built-in profile bundles, persistent terminals, and the standalone worktree tool, which have no plugin manager page.
 * Their Host availability and activation stay intact.
 */
export const HIDDEN_BUNDLES: ReadonlySet<string> = new Set([
  '@fde2e/len-base',
  '@fde2e/len-web-app',
  '@fde2e/len-headless',
  '@fde2e/len-sdk-app',
  '@fde2e/len-acp-app',
  '@fde2e/len-sdk-minimal',
  '@fde2e/len-experimental-terminal-bundle',
  '@fde2e/len-experimental-tool-worktree',
])

/**
 * The optional bundles the plugin manager's main and More lists rank first, in this order. {@link MORE_BUNDLES}, not
 * this list, decides whether a bundle appears on the main list.
 */
export const EXTENSION_BUNDLES: readonly string[] = [
  '@fde2e/len-experimental-voice-input-bundle',
  '@fde2e/len-experimental-plugin-market-bundle',
  '@fde2e/len-experimental-auto-review',
]

/**
 * The optional bundles the plugin manager's main list leaves out until the profile enables them; its More list,
 * which includes every eligible bundle, ranks them last in this order.
 */
export const MORE_BUNDLES: readonly string[] = [
  '@fde2e/len-personalized-recommendations',
  '@fde2e/len-experimental-inspector-profile',
  '@fde2e/len-cua-bundle',
  '@fde2e/len-experimental-cot-translation-bundle',
  '@fde2e/len-experimental-session-search',
  '@fde2e/len-experimental-session-titles-bundle',
  '@fde2e/len-experimental-badge-skill-bundle',
  '@fde2e/len-experimental-ralph-bundle',
  '@fde2e/len-subagent-codex',
  '@fde2e/len-subagent-claude-code',
]

/** Official bundles the plugin manager marks with the Experimental badge. */
export const EXPERIMENTAL_BUNDLES: ReadonlySet<string> = new Set([
  '@fde2e/len-personalized-recommendations',
  '@fde2e/len-cua-bundle',
  '@fde2e/len-experimental-voice-input-bundle',
  '@fde2e/len-experimental-auto-review',
  '@fde2e/len-experimental-inspector-profile',
  '@fde2e/len-experimental-forge-bundle',
  '@fde2e/len-experimental-tool-worktree',
  '@fde2e/len-experimental-cot-translation-bundle',
  '@fde2e/len-experimental-session-search',
  '@fde2e/len-experimental-session-titles-bundle',
  '@fde2e/len-experimental-badge-skill-bundle',
  '@fde2e/len-experimental-ralph-bundle',
  '@fde2e/len-experimental-plugin-market-bundle',
  '@fde2e/len-experimental-liveshare',
])
