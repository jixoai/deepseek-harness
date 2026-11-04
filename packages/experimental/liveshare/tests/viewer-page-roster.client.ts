/**
 * Test-only client roster of the assembled viewer page.
 *
 * A served viewer page is the owner's own Web shell with the owner's client plugins; this roster is the
 * subset the viewer page specs need: the wire plugin, the Gateway, remote access, the Session/Workspace controllers,
 * the menu service, presentation plugins, and the Liveshare `./client` face, which mounts the viewer surfaces when the
 * carrier names a share. Every row is the package's own `/client` face registered as a module-table
 * factory. It must be imported only after {@link prepareViewerRemoteFaces} answered the generated
 * `/remote` faces these plugins import.
 *
 * @module @fde2e/len-experimental-liveshare/tests/viewer-page-roster
 */

import * as apiGateway from '@fde2e/len-api-gateway/client'
import * as apiRemoteAccess from '@fde2e/len-api-remote-access/client'
import * as apiRemotes from '@fde2e/len-api-remotes/client'
import * as apiSessionController from '@fde2e/len-api-session-controller/client'
import * as apiWorkspaceController from '@fde2e/len-api-workspace-controller/client'
import * as clientConnection from '@fde2e/len-client-connection/client'
import * as clientFileUpload from '@fde2e/len-client-file-upload/client'
import * as clientLocale from '@fde2e/len-client-locale/client'
import * as clientModules from '@fde2e/len-client-modules/client'
import * as clientResources from '@fde2e/len-client-resources/client'
import * as clientShortcuts from '@fde2e/len-client-shortcuts/client'
import * as uiAttachment from '@fde2e/len-client-ui-attachment/client'
import * as uiChat from '@fde2e/len-client-ui-chat/client'
import * as uiContextMenu from '@fde2e/len-client-ui-context-menu/client'
import * as uiConversation from '@fde2e/len-client-ui-conversation/client'
import * as uiDeliverables from '@fde2e/len-client-ui-deliverables/client'
import * as uiFileDrag from '@fde2e/len-client-ui-file-drag/client'
import * as uiLayout from '@fde2e/len-client-ui-layout/client'
import * as uiRenderer from '@fde2e/len-client-ui-renderer/client'
import * as uiSession from '@fde2e/len-client-ui-session/client'
import * as uiSettings from '@fde2e/len-client-ui-settings/client'
import * as uiSidebar from '@fde2e/len-client-ui-sidebar/client'
import * as uiSidebarRight from '@fde2e/len-client-ui-sidebar-right/client'
import * as uiTheme from '@fde2e/len-client-ui-theme/client'
import * as uiTool from '@fde2e/len-client-ui-tool/client'
import * as uiTrajectory from '@fde2e/len-client-ui-trajectory/client'
import * as uiWorkspace from '@fde2e/len-client-ui-workspace/client'
import * as typertRegistry from '@fde2e/len-typert-registry/client'
import * as liveshare from '../src/client/index.ts'

/** One module-table row: the entry id the Loader creates, and that plugin's client exports. */
export interface ViewerPageRosterRow {
  readonly id: string
  readonly exports: Readonly<Record<string, unknown>>
}

/** Entry id of the module-system bootstrap whose exports the facade hands to the module system. */
export const VIEWER_PAGE_BOOTSTRAP_ID = '@fde2e/len-client-modules'

/** The viewer page roster; Cordis composes these entries by service injection, so order is irrelevant. */
export const VIEWER_PAGE_ROSTER: readonly ViewerPageRosterRow[] = [
  { id: '@fde2e/len-typert-registry', exports: typertRegistry },
  { id: '@fde2e/len-experimental-liveshare', exports: liveshare },
  { id: VIEWER_PAGE_BOOTSTRAP_ID, exports: clientModules },
  { id: '@fde2e/len-client-connection', exports: clientConnection },
  { id: '@fde2e/len-api-gateway', exports: apiGateway },
  { id: '@fde2e/len-api-remote-access', exports: apiRemoteAccess },
  { id: '@fde2e/len-api-remotes', exports: apiRemotes },
  { id: '@fde2e/len-api-session-controller', exports: apiSessionController },
  { id: '@fde2e/len-api-workspace-controller', exports: apiWorkspaceController },
  { id: '@fde2e/len-client-file-upload', exports: clientFileUpload },
  { id: '@fde2e/len-client-locale', exports: clientLocale },
  { id: '@fde2e/len-client-resources', exports: clientResources },
  { id: '@fde2e/len-client-shortcuts', exports: clientShortcuts },
  { id: '@fde2e/len-client-ui-renderer', exports: uiRenderer },
  { id: '@fde2e/len-client-ui-theme', exports: uiTheme },
  { id: '@fde2e/len-client-ui-settings', exports: uiSettings },
  { id: '@fde2e/len-client-ui-layout', exports: uiLayout },
  { id: '@fde2e/len-client-ui-session', exports: uiSession },
  { id: '@fde2e/len-client-ui-sidebar', exports: uiSidebar },
  { id: '@fde2e/len-client-ui-conversation', exports: uiConversation },
  { id: '@fde2e/len-client-ui-chat', exports: uiChat },
  { id: '@fde2e/len-client-ui-context-menu', exports: uiContextMenu },
  { id: '@fde2e/len-client-ui-tool', exports: uiTool },
  { id: '@fde2e/len-client-ui-attachment', exports: uiAttachment },
  { id: '@fde2e/len-client-ui-file-drag', exports: uiFileDrag },
  { id: '@fde2e/len-client-ui-sidebar-right', exports: uiSidebarRight },
  { id: '@fde2e/len-client-ui-trajectory', exports: uiTrajectory },
  { id: '@fde2e/len-client-ui-deliverables', exports: uiDeliverables },
  { id: '@fde2e/len-client-ui-workspace', exports: uiWorkspace },
]
