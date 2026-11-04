/** Platform-neutral assembly of generated Host Remote contributions. */

import type { Context } from '@deepseek-ai/cordis'
import productAnalyticsRemote from '@fde2e/len-client-product-analytics/remote'
export type {} from '@fde2e/len-client-product-analytics/remote'
import agentPresetsRemote from '@fde2e/len-agent-preset-registry/remote'
import userQuestionsRemote from '@fde2e/len-user-questions/remote'
import commandsRemote from '@fde2e/len-commands/remote'
import agentTeamsRemote from '@fde2e/len-agent-team/remote'
export type {} from '@fde2e/len-agent-team/remote'
import accountRemote from '@fde2e/len-api-account-controller/remote'
import settingsControllerRemote from '@fde2e/len-api-settings-controller/remote'
import officeToPdfRemote from '@fde2e/len-office-to-pdf/remote'
import goalsRemote from '@fde2e/len-goal/remote'
import scheduleRemote from '@fde2e/len-schedule/remote'
import llmRemote from '@fde2e/len-llm/remote'
import dynamicRemote from '@fde2e/len-cordis-host-runner/remote'
import pluginManagerRemote from '@fde2e/len-plugin-manager/remote'
import mcpManagerRemote from '@fde2e/len-mcp-manager/remote'
import toolResultsRemote from '@fde2e/len-client-ui-trajectory/remote'
import pluginRegistryProbeRemote from '@fde2e/len-client-ui-plugin-manager/remote'
import pluginMarketRemote from '@fde2e/len-plugin-market/remote'
import pluginInventoryRemote from '@fde2e/len-host-plugin-inventory/remote'
import messageFeedbackRemote from '@fde2e/len-message-feedback/remote'
import permissionPresetsRemote from '@fde2e/len-permission-presets/remote'
import sessionFeedbackRemote from '@fde2e/len-command-feedback/remote'
import fileUploadsRemote from '@fde2e/len-client-file-upload/remote'
import sessionReferencesRemote from '@fde2e/len-session-reference/remote'
import subagentsRemote from '@fde2e/len-subagent/remote'
import sessionRemote from '@fde2e/len-api-session-controller/remote'
import jobRemote from '@fde2e/len-api-job-controller/remote'
import workspaceRemote from '@fde2e/len-api-workspace-controller/remote'
import terminalRemote from '@fde2e/len-api-terminal-controller/remote'
import workspaceFilesRemote from '@fde2e/len-api-workspace-files/remote'
import webRemote from '@fde2e/len-web/remote'
import type { ClientRemote } from '@fde2e/len-api-gateway/client'

export type { ClientRemote } from '@fde2e/len-api-gateway/client'
export type {
  BundleDetail, BundleInfo, BundleRowInfo, ChangeResult, IncompatiblePlugin, InspectOptions, InstallBundleOptions, InstallSpecKind,
  ManagementError, PackageResult,
  PluginChange, PluginEntryId, PluginInfo, PluginInspectProblem, PluginInstallCancellation, PluginInstallFailureKind,
  PluginInstallLogChunk, PluginInstallProgress, PluginInstallRequestId, PluginRegistries, PluginSpecInspection,
  PluginUpdateProgress, PluginUpdateResult, PluginUpdateStep, PluginVersion, PluginVersionList, RegistryAttempt,
  ReadOnlyReason, Registry, RestartReason,
} from '@fde2e/len-plugin-manager/types'
export type { McpManagedServerStatus, McpManagedServerView } from '@fde2e/len-mcp-manager/types'
export type {} from '@fde2e/len-plugin-manager/remote'
export type {} from '@fde2e/len-mcp-manager/remote'
export type {} from '@fde2e/len-client-ui-plugin-manager/remote'
export type {} from '@fde2e/len-client-ui-trajectory/remote'
export type {} from '@fde2e/len-plugin-market/remote'
export type {
  MarketCompatibility, MarketIndexSummary, MarketInstallation, MarketInstallationStatus, MarketListingEntry, MarketListingVersion,
  MarketQuery, MarketSearchResult, MarketSort, PluginDetail, PluginDetailDocumentId, PluginDetailOrigin,
} from '@fde2e/len-plugin-market/types'
export type { PluginInventorySnapshot } from '@fde2e/len-host-plugin-inventory/types'
export type {} from '@fde2e/len-agent-preset-registry/remote'
export type {} from '@fde2e/len-user-questions/remote'
export type {} from '@fde2e/len-commands/remote'
export type {} from '@fde2e/len-web/remote'
export type {} from '@fde2e/len-api-settings-controller/remote'
export type {} from '@fde2e/len-api-account-controller/remote'
export type {} from '@fde2e/len-goal/remote'
export type {} from '@fde2e/len-schedule/remote'
export type {} from '@fde2e/len-office-to-pdf/remote'
export type {} from '@fde2e/len-llm/remote'
export type {} from '@fde2e/len-host-plugin-inventory/remote'
export type {} from '@fde2e/len-message-feedback/remote'
export type {} from '@fde2e/len-permission-presets/remote'
export type {} from '@fde2e/len-command-feedback/remote'
export type {} from '@fde2e/len-client-file-upload/remote'
export type {} from '@fde2e/len-session-reference/remote'
export type {} from '@fde2e/len-subagent/remote'
export type * from '@fde2e/len-subagent/client'
export type {} from '@fde2e/len-api-session-controller/remote'
export type * from '@fde2e/len-api-session-controller/types'
export type {} from '@fde2e/len-api-job-controller/remote'
export type * from '@fde2e/len-api-job-controller/types'
export type {} from '@fde2e/len-api-workspace-controller/remote'
export type * from '@fde2e/len-api-workspace-controller/types'
export type {} from '@fde2e/len-api-workspace-files/remote'
export type * from '@fde2e/len-api-workspace-files/types'
export type {} from '@fde2e/len-api-terminal-controller/remote'
export type * from '@fde2e/len-api-terminal-controller/types'
// The forwarded-event allowlist's selection seat: without it in the consumer's
// compilation face `TypertRemoteEvent` is `never` and every `$on` call fails.
export type { ApiRemoteForwardedEvent } from '../types.ts'
// The owner packages' client-safe `./types` exports supply the `Events`
// signatures `$on` hands to a listener, so a consumer reads the very
// declaration the Host emits rather than a flattened restatement of it.
export type {} from '@fde2e/len-commands/types'
export type {} from '@fde2e/len-web/types'
export type {} from '@fde2e/len-cordis-host-runner/types'
export type {} from '@fde2e/len-credentials/types'
export type {} from '@fde2e/len-llm/types'
export type {} from '@fde2e/len-agent-preset-registry/types'
export type {} from '@fde2e/len-permission-presets/types'
export type {} from '@fde2e/len-settings/types'
export type {} from '@fde2e/len-user-approval/types'
export type {} from '@fde2e/len-user-questions/types'
export type {} from '@fde2e/len-api-session-controller/types'

/**
 * The carrier's Client-facing types, re-exported so a business package names one
 * assembly package instead of both this facade and the Connection plugin. Type-only:
 * the carrier's runtime values stay behind their own module edge.
 */
export type {
  ConnectionHandle, ConnectionSinks, ContentBlock,
  MessageId,
  RpcId, RpcRequest, RpcResponse, RpcResult, SessionId,
  StreamChunk,
} from '@fde2e/len-client-connection/client'
export type {} from '@fde2e/len-api-gateway/client'
export type {} from '@fde2e/len-cordis-host-runner/remote'

// The payload vocabulary of the selected namespaces, re-exported so a Client
// contribution can name what it sends and receives without importing a Host
// package: this assembly is the one place both planes legitimately meet.
export type {
  ApprovalRequestId,
  CordisHalfState,
  CordisDynamicPackageId,
  CordisDynamicPluginId,
  CordisDynamicPluginRunId,
  CordisDynamicRunMode,
  CordisInspectMethodManifest,
  CordisInspectPlatform,
  CordisInspectProviderManifest,
  CordisInspectProviderView,
  CordisInspectQueryRequest,
  CordisInspectQueryResolution,
  CordisInspectQueryResolved,
  CordisInspectRequestId,
  CordisInspectResolveAck,
  CordisRunDiagnostic,
  CordisRunStatus,
  DynamicCordisClientSource,
  DynamicCordisHostHalfResult,
  DynamicCordisInventoryRow,
  DynamicCordisInvokeResult,
  DynamicCordisPackage,
  DynamicCordisRequestResolved,
  DynamicCordisResolveAck,
  DynamicCordisRetracted,
  DynamicCordisRunRequest,
  DynamicCordisRunResolution,
  DynamicCordisRunAttempt,
  DynamicCordisRunResponse,
  DynamicCordisStopResponse,
  DynamicCordisUndefineReceipt,
  RequestRunOutcome,
} from '@fde2e/len-cordis-host-runner/types'
// Credential state vocabulary for the credentials namespace (values never ride it).
export type { CredentialInfo } from '@fde2e/len-credentials/types'
// Redacted namespace vocabulary for the settings namespace (secrets never ride
// it). It travels with its seam, whose `./types` the Client face already reads.
export type {
  SettingsDescribeValue, SettingsNamespaceView, SettingsPathOpView, SettingsSecretView,
} from '@fde2e/len-settings/types'
// Provider registry and discovery vocabulary for the llm namespace.
export type {
  LlmConfigurableProvider, LlmDiscoveredModel,
  LlmModelDiscoveryRequest, LlmNativeAuth, LlmProviderInfo,
} from '@fde2e/len-llm/types'
// Reference-discovery result vocabulary for the fileReferences and
// sessionReferenceResolver namespaces.
export type { FileReferenceCandidate } from '@fde2e/len-file-reference/types'
export type { SessionReferenceMentionCandidate } from '@fde2e/len-session-reference/types'

// The Remote failure vocabulary, re-exported so business packages keep naming
// this assembly alone. Types only: a value export would make spec imports load
// this module's owner /remote artifacts; specs take RemoteError from
// dsh-client-test-runtime instead.
export type {
  RemoteErrorCode, RemoteErrorDetailsMap, RemoteFailure, RemoteResult,
} from '@fde2e/len-typert-protocol'
export type { RemoteHostFacts } from '@fde2e/len-api-gateway/client'

declare module '@deepseek-ai/cordis' {
  interface Context {
    /** Generated Remote namespaces selected by this Client assembly. */
    remote: ClientRemote
  }
}

/** Required service: the typed Client Remote contribution mount. */
export const inject = ['remote']

/**
 * Mount the Host capabilities explicitly selected for this Client assembly.
 * @param ctx - Client Cordis root carrying the typed API service.
 * @returns disposer after every selected Remote namespace is ready.
 */
export async function apply(ctx: Context): Promise<() => Promise<void>> {
  const disposers: Array<() => Promise<void>> = []
  try {
    for (const contribution of [
      productAnalyticsRemote, agentPresetsRemote, commandsRemote, agentTeamsRemote, settingsControllerRemote, accountRemote,
      goalsRemote, llmRemote, dynamicRemote, scheduleRemote,
      pluginInventoryRemote, pluginManagerRemote, mcpManagerRemote, pluginMarketRemote, pluginRegistryProbeRemote,
      toolResultsRemote,
      messageFeedbackRemote, sessionFeedbackRemote,
      fileUploadsRemote, sessionReferencesRemote,
      permissionPresetsRemote, subagentsRemote, sessionRemote, jobRemote, workspaceRemote, workspaceFilesRemote, terminalRemote,
      officeToPdfRemote, userQuestionsRemote, webRemote,
    ]) {
      disposers.push(await ctx.remote.$mount(contribution))
    }
  } catch (error) {
    for (const dispose of disposers.reverse()) await dispose()
    throw error
  }
  // Unwound in reverse mount order, so a namespace never outlives one mounted
  // after it.
  return async () => {
    for (const dispose of disposers.reverse()) await dispose()
  }
}
