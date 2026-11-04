/** The bundle package names the dsh installation selects, offers, installs on demand, or retires. */

/** Installation-owned defaults used when a shipped profile is first opened. */
export interface ProfileTemplate {
  /** Ordered bundle layer list. */
  bundles: readonly string[]
}

/** The shipped profile templates auto-initialized on first use, by name. */
export const PROFILE_TEMPLATES: Record<string, ProfileTemplate> = {
  acp: {
    bundles: ['@fde2e/len-base', '@fde2e/len-acp-app'],
  },
  web: {
    bundles: ['@fde2e/len-base', '@fde2e/len-web-app'],
  },
  headless: {
    bundles: ['@fde2e/len-base', '@fde2e/len-headless'],
  },
  sdk: {
    bundles: ['@fde2e/len-base', '@fde2e/len-sdk-app'],
  },
  'sdk-minimal': {
    bundles: ['@fde2e/len-sdk-minimal'],
  },
}

/**
 * Installation-owned bundle tuples that an earlier release wrote into a shipped profile; app-boot replaces an exact
 * match with the {@link PROFILE_TEMPLATES} entry of the same name and leaves every other list untouched.
 */
export const INSTALLATION_OWNED_PROFILE_TUPLES: Readonly<Record<string, readonly string[]>> = {
  headless: ['@fde2e/len-base', '@fde2e/len-web-app', '@fde2e/len-headless'],
}

/** Bundles an earlier release shipped and the installation no longer carries; app-boot removes them from profiles. */
export const RETIRED_BUNDLES: ReadonlySet<string> = new Set([
  // The Web composition mounts Schedule itself
  // ([upgrade guide](../../../../docs/upgrade-guide/v0.2.0-rc.2/schedule-bundle-retired/guide.md)).
  '@fde2e/len-experimental-schedule-bundle',
  '@fde2e/len-experimental-agent-team-profile',
])

/** The bundle list a `dsh plugin` init uses for a name with no shipped template. */
export const DEFAULT_PROFILE_BUNDLES: readonly string[] = ['@fde2e/len-base']

/**
 * The bundles the dsh installation ships for a person to switch on: each a
 * runtime dependency of the installation that declares `dsh.bundle.patch`,
 * an `icon`, and `./locale/*.json` display metadata, selected by no shipped
 * template, and offered switched off by the plugin manager except persistent
 * terminals, which have no page switch
 * ([rationale](../../../../.agents/notes/implemented/process/2026-09-15-shipped-optional-bundles.md),
 * [admission](../../../../.agents/notes/implemented/architecture/2026-09-21-experimental-capabilities-as-optional-bundles.md)).
 */
export const OPTIONAL_BUNDLES: readonly string[] = [
  '@fde2e/len-personalized-recommendations',
  '@fde2e/len-cua-bundle',
  '@fde2e/len-experimental-session-search',
  '@fde2e/len-experimental-ralph-bundle',
  '@fde2e/len-experimental-terminal-bundle',
  '@fde2e/len-experimental-badge-skill-bundle',
  '@fde2e/len-experimental-session-titles-bundle',
  '@fde2e/len-experimental-voice-input-bundle',
  '@fde2e/len-experimental-cot-translation-bundle',
  '@fde2e/len-experimental-auto-review',
  '@fde2e/len-experimental-inspector-profile',
  '@fde2e/len-experimental-liveshare',
  '@fde2e/len-experimental-plugin-market-bundle',
  '@fde2e/len-experimental-tool-worktree',
  '@fde2e/len-experimental-forge-bundle',
]

/** Public DSH release members available through the ordinary on-demand bundle installer. */
export const ON_DEMAND_BUNDLES: readonly string[] = [
  '@fde2e/len-subagent-claude-code',
  '@fde2e/len-subagent-codex',
]
