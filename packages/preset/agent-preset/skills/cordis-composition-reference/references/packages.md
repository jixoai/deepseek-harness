# Loadable Harness plugin packages

This file is GENERATED from workspace manifests (`scripts/gen-plugin-packages.ts`) and verified fresh by `pnpm run verify-plugin-packages` (part of `doc-sync`); do not edit it by hand.

Every package below exports a Cordis plugin that a bundle patch can name in a Loader row. `Config` marks packages whose row accepts a `config` mapping; query `Config.listConfigs` through `cordis_inspect_query` (filter by `name`, then query the `entry` id) for the mounted schema. Packages under `experimental` are pre-stable.

## acp

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-acp` | yes | Automation-only Agent Client Protocol server for driving FDE2E LEN agents over JSON-RPC stdio |

## api

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-api-account-controller` | no | Expose safe account operations over authenticated Remote |
| `@fde2e/len-api-gateway` | yes | Typert Remote Host dispatcher and Client API endpoint |
| `@fde2e/len-api-job-controller` | yes | Job Remote observation stream and the reference-counted client job-output service |
| `@fde2e/len-api-remote-access` | no | Method-level Remote access control for non-owner Peers and the per-Peer access snapshot |
| `@fde2e/len-api-remotes` | no | Remote BFF assembly for application-selected Host capabilities |
| `@fde2e/len-api-session-controller` | yes | Session Remote commands, cold reads, and live control transport |
| `@fde2e/len-api-settings-controller` | yes | Remote owner for the configuration surfaces over the settings-domain seams |
| `@fde2e/len-api-terminal-controller` | yes | Session-owned interactive terminals with shell discovery, screen recovery and typed Remote control |
| `@fde2e/len-api-workspace-controller` | yes | Workspace Remote commands and reconnect-safe state transport |
| `@fde2e/len-api-workspace-files` | yes | Workspace file service and Client resource provider: bounded reads, directory listing, and live metadata over the workspaceFiles Remote namespace |

## attachment

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-attachment-local` | yes | Private content-addressed DSH_HOME attachment storage |

## boot

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-config-editor` | no | Persist plugin configuration through profile patches and Loader reconciliation |
| `@fde2e/len-hmr` | yes | Coordinated module and profile configuration hot reload |
| `@fde2e/len-plugin-manager` | yes | Current-profile plugin and bundle management shared by dsh CLI, Web and agent tools |
| `@fde2e/len-plugin-market` | yes | Configured plugin market indexes for the Web Discover page and the plugin_market agent tool |

## browser-use

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-browser-use` | no | Exclusive named browser-use provider registration |

## bundle

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-acp-app` | no | The dsh ACP profile bundle: automation-only JSON-RPC stdio and process lifecycle over dsh-base |
| `@fde2e/len-headless` | yes | The dsh one-shot bundle: a direct core Agent/Session runner over dsh-base with no Host, HTTP, or browser layer |
| `@fde2e/len-sdk-app` | yes | The dsh SDK profile bundle: stdio JSON-RPC serving and process lifecycle over dsh-base |
| `@fde2e/len-web-app` | yes | The dsh browser-surface bundle: the web patch layer over dsh-base plus the runtime glue plugin (frontend dist serving, bash runtime variables, URL line) |

## client

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-client-connection` | yes | Authenticated RPC transport and generation lifecycle |
| `@fde2e/len-client-file-upload` | no | Agent-scoped browser file upload, streaming intake, and staged receipt service |
| `@fde2e/len-client-hmr` | yes | Web client graph synchronization and rebuilt-bundle reload transport |
| `@fde2e/len-client-locale` | no | Locale plugin: Host-backed preference, extensible language catalog, browser fallback, and typed built-in dictionaries |
| `@fde2e/len-client-modules` | no | Client module system, dual-face: node half composes the __DSH_BOOT__ entry graph (incremental dsh.client scan, bundle route, index tap, webPlugins service); browser half is the lazy-CJS module table the vendored cordis Loader consumes as its internal seam |
| `@fde2e/len-client-product-analytics` | yes | Desktop product event collection and authenticated Host reporting |
| `@fde2e/len-client-resources` | no | Unified client resource model: protocol-registered providers turn URL addresses into live values, consumed through the useResource global standard hook |
| `@fde2e/len-client-shortcuts` | yes | Application keyboard command registry and physical-key routing |
| `@fde2e/len-client-ui-agent-preset` | no | Agent-preset surfaces: the default for later sessions, this session's seat, and the composition editor |
| `@fde2e/len-client-ui-agent-team` | no | Web shared task board for a subagent tree |
| `@fde2e/len-client-ui-approval` | no | Approval composer takeover over the scoped Remote Event waterfall |
| `@fde2e/len-client-ui-attachment` | no | Dynamic attachment presentation plugin for conversation input, message-image, and trajectory image slots |
| `@fde2e/len-client-ui-brand-official` | no | Official FDE2E LEN brand occupants for the Web client's sidebar slots |
| `@fde2e/len-client-ui-chat` | no | Chat Conversation target, node definitions, renderers, and details surface |
| `@fde2e/len-client-ui-commands` | no | Client command surface: global directory cache, '/' source, three command UI kinds, popupSelect registry |
| `@fde2e/len-client-ui-context-menu` | no | Typed, plugin-extensible context menus with captured targets and shared Web presentation |
| `@fde2e/len-client-ui-conversation` | no | Target-neutral Conversation assembly, shell, composer, queue, and view navigation |
| `@fde2e/len-client-ui-deliverables` | no | Changed-files card with per-file comparison tabs, delivery cards, and clickable final-response file references for Web |
| `@fde2e/len-client-ui-directory-picker-browse` | no | In-app directory browsing surface: the workspace directory-flow owner rendering the host's listing and creation primitives |
| `@fde2e/len-client-ui-directory-picker-native` | no | Native directory-picker surface: the renderless workspace directory-flow occupant driving the local Desktop or Host OS chooser |
| `@fde2e/len-client-ui-entry-customization` | no | Customize plugin entries in the left sidebar, conversation views, and right sidebar, and quickly create new plugins. |
| `@fde2e/len-client-ui-file-actions` | no | Original-file saving and image clipboard actions for Web and Desktop |
| `@fde2e/len-client-ui-file-drag` | no | Application-owned file drag transfers and localized failure feedback |
| `@fde2e/len-client-ui-goal` | no | Session goal surface: GoalBar docked above the composer, read from the goal session projection |
| `@fde2e/len-client-ui-input-trigger` | no | Input trigger pipeline: '/' and '@' detection, candidate menu, pick routing to registered sources |
| `@fde2e/len-client-ui-jobs` | no | Session-header background-job list with on-demand streaming record panels |
| `@fde2e/len-client-ui-layout` | no | Shell plugin: three-column AppFrame with drag handles, ctx.layout viewing-state service (navigation + panels) |
| `@fde2e/len-client-ui-message-feedback` | no | The Web feedback surface: per-message Like/Dislike in the assistant-message action strip and the feedback dialog behind both ratings and /feedback, backed by the messageFeedback and sessionFeedback Host Remotes |
| `@fde2e/len-client-ui-model-selection` | no | Model selection over the shared model catalog, Session projection, and session.selectModel |
| `@fde2e/len-client-ui-open-in-app` | no | Web "Open In..." controls: the Session-header split button opening the workspace directory in an installed application, and the document preview's default-application controls for one file |
| `@fde2e/len-client-ui-permission-presets` | no | Permission surfaces: a new-session default in General settings and a current-session /permission popup over the permissions projection |
| `@fde2e/len-client-ui-plan` | no | Plan mode controls, persistent transcript plan cards, and sidebar Markdown previews |
| `@fde2e/len-client-ui-plugin-manager` | yes | Plugin management for the dsh web client: the sidebar Plugins panel installs, enables, disables, retries, and composes installed plugin packages |
| `@fde2e/len-client-ui-plugin-market` | no | Discover tab of the dsh web Plugins page: browse configured plugin market indexes and install their bundles |
| `@fde2e/len-client-ui-reference` | no | Unified Web @file and @session reference source |
| `@fde2e/len-client-ui-renderer` | no | Browser UI renderer: React slot bindings, ctx.uiRenderer, and the assembled application root |
| `@fde2e/len-client-ui-schedule` | no | Host task management page and Session reminder catalog |
| `@fde2e/len-client-ui-secret-mask` | no | Web display masking for recognized credentials in sent user text |
| `@fde2e/len-client-ui-session` | no | Session Controller adapter for React and session-scoped slots |
| `@fde2e/len-client-ui-settings` | no | Settings domain base plugin: shared configuration forms and the canonical settings slot-type contract |
| `@fde2e/len-client-ui-settings-account` | yes | Manage DeepSeek login and open Platform billing pages |
| `@fde2e/len-client-ui-settings-agent-loop` | no | Settings page of the agent loop on the dsh web client's Plugins page: the parallel tool-call cap of the agent-loop namespace |
| `@fde2e/len-client-ui-settings-general` | no | Settings ownerless-copy and product onboarding plugin: the General section, shell trigger/header chrome content, settings dictionaries, and the versioned welcome notice |
| `@fde2e/len-client-ui-settings-models` | yes | Models settings and shared product-onboarding dialogs over existing settings and credential joins |
| `@fde2e/len-client-ui-settings-plugin-inventory` | no | Read-only Cordis Loader inventory tab in Web Plugins settings |
| `@fde2e/len-client-ui-settings-plugins` | no | Built-in plugins settings section for the dsh web client: the Settings navigation entry and the tab chrome feature-owned tabs register into |
| `@fde2e/len-client-ui-settings-session-log` | no | General settings control for Session-log upload with DeepSeek API requests |
| `@fde2e/len-client-ui-settings-shell` | no | Settings page of the shell executor on the dsh web client's Plugins page: the command timeout and the per-stream output cap of the shell namespace |
| `@fde2e/len-client-ui-settings-subagent` | no | Settings page of Subagent delegation on the dsh web client's Plugins page: recursion depth, parallel capacity, and the models agents may choose for subagents |
| `@fde2e/len-client-ui-settings-web-search` | no | Settings page for web search and fetch on the dsh web client's Plugins page: the Search and Fetch provider menus, the DeepSeek Search API result count, and legacy Messages search settings |
| `@fde2e/len-client-ui-shortcuts` | no | Keyboard shortcut reference, recording, and local preference editing |
| `@fde2e/len-client-ui-sidebar` | no | Sidebar plugin: session multi-level tree, search, grouping, state dots |
| `@fde2e/len-client-ui-sidebar-browser` | no | Sandboxed Web browser tabs for the right Sidebar |
| `@fde2e/len-client-ui-sidebar-documentpreview` | yes | Extensible Sidebar previews for Office documents, spreadsheets, Markdown, code, images, PDF, HTML, and plain text |
| `@fde2e/len-client-ui-sidebar-files` | no | The workspace files page and one workspace directory tree per pane beside docked and floating file previews, listed lazily over the workspaceFiles Remote namespace |
| `@fde2e/len-client-ui-sidebar-right` | no | Right Sidebar: the docking surface's session-bound state, its panel and header expand control, and the navigation service over it |
| `@fde2e/len-client-ui-sidebar-terminal` | no | Interactive shell tabs for the right Sidebar |
| `@fde2e/len-client-ui-skill` | no | Web skill references and the dedicated skill tool row |
| `@fde2e/len-client-ui-subagent` | no | Subagent conversation catalog, continuation routing UI, and '@' reference source |
| `@fde2e/len-client-ui-theme` | yes | Theme plugin: Host bootstrap for the pre-plugin palette; ThemeRuntime for light/dark/system state and icon replacements; --dsw-* token styles and Appearance settings row |
| `@fde2e/len-client-ui-tool` | no | Client Tool call-tree renderer and keyed per-tool presentation slot |
| `@fde2e/len-client-ui-trajectory` | yes | Trajectory event ledger and timing overview with live tool-result inspection |
| `@fde2e/len-client-ui-user-questions` | no | Web ask_user_question composer takeover and plan-review presentation UI |
| `@fde2e/len-client-ui-workflow-run` | no | Durable workflow-run Conversation Node and nested member disclosure for dsh web |
| `@fde2e/len-client-ui-workspace` | no | Workspace picker plugin: one WorkspacePicker registered into the sidebar and empty-state workspace slots |

## compaction

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-command-compact` | no | Human-facing slash command for explicit session compaction |
| `@fde2e/len-compaction-basic` | yes | Token-meter-driven compaction policy and LLM summarization backend for the FDE2E LEN |
| `@fde2e/len-compaction-image-offload` | no | Durable image offload for image-capable routes: replace over-budget request images with placeholders and retry |
| `@fde2e/len-compaction-tool-result-pruner` | yes | Replay-safe model-free head/middle/tail pruning for tool-result surface nodes |

## computer-use

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-computer-use` | no | Exclusive named computer-use provider registration |

## context

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-agent-instructions` | yes | Workspace context loader for AGENTS.md/CLAUDE.md instruction files |
| `@fde2e/len-file-reference-local` | yes | Local-filesystem ctx.fileReferences provider with bounded fuzzy indexes |
| `@fde2e/len-harness-dev-context` | no | Model context naming the FDE2E LEN checkout and Web GUI URL without letting either change the system prompt |
| `@fde2e/len-session-reference` | yes | Cross-session snapshot references and durable untrusted model context (ctx.sessionReferenceResolver) |
| `@fde2e/len-time-context` | yes | Durable per-step context with the current time and elapsed time |
| `@fde2e/len-tmux-context` | yes | Opt-in durable per-step context with this agent's tmux pane and window location |

## core

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-agent` | no | Agent interface, registry, initiator scope, and event vocabulary for the FDE2E LEN |
| `@fde2e/len-agent-default-model` | yes | Default model selection shared by Agent entry points |
| `@fde2e/len-agent-loop` | yes | The concrete agent loop plugin for the FDE2E LEN |
| `@fde2e/len-agent-tool-presentation` | yes | Deprecated tool presentation selector; use dsh-tool-executor-native or dsh-tool-executor-ptc directly |
| `@fde2e/len-session` | no | Event-sourced session store for the FDE2E LEN |
| `@fde2e/len-system-prompt` | yes | System prompt assembly registry for the FDE2E LEN |
| `@fde2e/len-tool-executor-native` | no | Native tool execution plugin |
| `@fde2e/len-tool-executor-ptc` | yes | PTC program execution, tool bindings, and generated SDK prompts |
| `@fde2e/len-tools` | no | Tool registry and execution pipeline for the FDE2E LEN |

## credentials

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-authorization` | no | Authorization seam (ctx.authorization): plugin-owned flows that obtain a credential through a conversation with the human |
| `@fde2e/len-credentials-local` | yes | File-backed credentials provider ($DSH_HOME/.env under the live process environment) for the FDE2E LEN |
| `@fde2e/len-deepseek-account-platform` | yes | Authorize DeepSeek accounts through browser PKCE |

## deliverables

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-deliverable-file-references` | no | Shared model guidance for file links and deliverables across FDE2E LEN hosts |
| `@fde2e/len-tool-present` | yes | Explicit workspace file delivery declarations for the FDE2E LEN |
| `@fde2e/len-workspace-changes` | yes | Per-turn workspace file changes recorded from git working-tree snapshots and whole-file captures, with per-file comparisons, for the FDE2E LEN |

## document

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-office-to-pdf` | yes | Shared Office-to-PDF conversion with bounded queues and caching |

## experimental

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-action-cards` | yes | Optional action cards below answers: one shared proposal tool, card state, user actions and status notices |
| `@fde2e/len-client-ui-action-cards` | no | Action cards below completed answers: the shared card frame, kind bodies and the compact tool row |
| `@fde2e/len-client-ui-creation-recommendations` | no | Body of the personalized page card: location choice, creation progress, Undo and Restore |
| `@fde2e/len-client-ui-plugin-recommendations` | no | Official plugin card body with catalog text and enabling |
| `@fde2e/len-creation-recommendations` | no | Create persistent removable interface plugins from explicit conversation needs |
| `@fde2e/len-cua` | no | Shared Computer Use application objects, authorization, and logged tool execution |
| `@fde2e/len-experimental-api-speech-to-text` | yes | Authenticated experimental speech transcription for browser clients |
| `@fde2e/len-experimental-auto-review` | no | Per-tool LLM authorization review for the FDE2E LEN Auto permission preset |
| `@fde2e/len-experimental-browser-use-chrome-devtools-mcp` | yes | Experimental per-Session Chromium browser tools through chrome-devtools-mcp |
| `@fde2e/len-experimental-browser-use-playwright-mcp` | yes | Experimental per-Session Chromium browser tools through @playwright/mcp |
| `@fde2e/len-experimental-browser-use-stagehand-native` | yes | Experimental Stagehand browser tools with separately configured native models |
| `@fde2e/len-experimental-claude-code-mods` | yes | Experimental bridge: load Claude Code mods (hooks modules) and run their hook chains on FDE2E LEN extension points |
| `@fde2e/len-experimental-client-ui-claude-code-mods` | no | Web band above the prompt for Claude Code mods: draws each session's mod tree and sends button presses back to the bridge |
| `@fde2e/len-experimental-client-ui-cot-translation` | yes | Optional machine translation of expanded reasoning, preserving original Session text |
| `@fde2e/len-experimental-client-ui-forge` | yes | Sidebar panel for a Session's change requests, with a worktree option for new Sessions and its Host Remote |
| `@fde2e/len-experimental-client-ui-stats` | no | Per-turn and per-step context, timing, cache, and tool-cost table contributed as an experimental conversation View |
| `@fde2e/len-experimental-client-ui-voice-input` | no | Record speech and insert editable text into the conversation draft |
| `@fde2e/len-experimental-computer-use-cua-driver-mcp` | yes | Experimental computer use through an installed Cua Driver MCP executable |
| `@fde2e/len-experimental-computer-use-cua-driver-native` | no | Experimental computer-use provider embedding the Cua Driver native npm SDK |
| `@fde2e/len-experimental-cua-macos` | yes | macOS native provider for shared Computer Use application and window objects |
| `@fde2e/len-experimental-forge` | yes | Provider-neutral change request registry with shared status polling |
| `@fde2e/len-experimental-forge-github` | yes | GitHub provider for the experimental forge registry, read through the GitHub CLI on the host |
| `@fde2e/len-experimental-forge-session` | yes | Binds change requests to the Session that created, pushed, or tracked them |
| `@fde2e/len-experimental-inspector` | yes | Experimental cross-realm CDP hub for Host debugging and Client Runtime inspection |
| `@fde2e/len-experimental-ptc-runtime-python` | yes | CPython subprocess implementation of the FDE2E LEN PTC execution seam |
| `@fde2e/len-experimental-session-inspector` | no | Experimental virtualized Session log and live Chat group/node inspectors |
| `@fde2e/len-experimental-speech-to-text` | yes | Experimental speech recognition with independently selectable providers |
| `@fde2e/len-experimental-speech-to-text-sensevoice` | yes | Local SenseVoice ONNX transcription with a managed sherpa-onnx process |
| `@fde2e/len-experimental-subagent-oar` | yes | Experimental one-shot subagents through OAR runtimes |
| `@fde2e/len-experimental-tool-subagent-oar` | yes | Delegate standalone tasks to configured external subagent providers |
| `@fde2e/len-experimental-tool-worktree` | no | Model tool that creates and enters a new Git worktree |
| `@fde2e/len-experimental-translator` | yes | Machine translation with reusable Session results |
| `@fde2e/len-experimental-worktree` | yes | Creates a named Git worktree and changes the calling Session working directory |
| `@fde2e/len-hooks-claude-code` | yes | Bridge plugin: run a Claude Code hooks.json / settings hook config on the FDE2E LEN interception seams |
| `@fde2e/len-hooks-codex` | yes | Bridge plugin: run a Codex hooks.json hook config on the FDE2E LEN interception seams |
| `@fde2e/len-plugin-recommendations` | no | Official plugin suggestions with explicit user activation and persistent conversation decisions |
| `@fde2e/len-session-title-all-prompts-llm` | yes | All-user-messages LLM provider plugin for FDE2E LEN session titles |
| `@fde2e/len-skill-badge` | no | Bundled dsh badge skill provider for FDE2E LEN |
| `@fde2e/len-tool-ralph` | yes | Model-facing fresh-agent Ralph loop over the workflow and subagent seams |
| `@fde2e/len-tool-session-query` | yes | Workspace-authorized model-facing session history search, trace, and event read tools |
| `@fde2e/len-tool-terminal` | yes | Six model-facing persistent PTY tools with owner isolation and generic background-job integration |
| `@fde2e/len-webhook` | no | Fire-and-forget webhook rule runtime that creates Workspace-backed FDE2E LEN Sessions |
| `@fde2e/len-webhook-github` | yes | Signed GitHub HTTP webhook adapter for the FDE2E LEN webhook runtime |

## extensions

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-client-ui-cordis` | no | Cordis dynamic-plugin definition card: the keyed cordis_define tool row with its run/stop switch |
| `@fde2e/len-cordis-client-runner` | no | Browser half of dynamic dual-half plugin packages: event subscription, closure evaluation, guard facade, and loader entries |
| `@fde2e/len-cordis-host-runner` | yes | Dynamic package definition registry, host-half sandbox lifecycle, and invoke handler table for model-mounted dual-half packages |
| `@fde2e/len-tool-cordis` | no | Read-only runtime API inspection for Harness plugin development |

## feedback

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-command-feedback` | no | Log-only session feedback: the record event, the sessionFeedback Host Remote, and the human-facing slash command |
| `@fde2e/len-message-feedback` | yes | Canonical Session-log ratings and notes for finalized assistant messages |

## fs

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-fs-local` | yes | Local-filesystem implementation of the FDE2E LEN filesystem seam (ctx.fs) |
| `@fde2e/len-fs-observation-policy` | no | File-context policy plugin for the FDE2E LEN — observed-state, read-before-edit, and version-guarded write/edit added over the ctx.fs provider seam through the fs/* event gate (no service API) |
| `@fde2e/len-fs-sandbox` | yes | Sandbox-enforcing implementation of the FDE2E LEN filesystem seam: fences write/edit by the per-call sandbox mode (read-only denies mutation, workspace-write contains it to the workspace + temp roots) while reads pass through |
| `@fde2e/len-tool-fs` | yes | Model-facing filesystem tools (read, write, edit) over the FDE2E LEN filesystem seam (ctx.fs) |
| `@fde2e/len-tool-fs-search` | yes | Model-facing filesystem discovery tools (glob, grep) backed by the packaged ripgrep binary (@vscode/ripgrep) |
| `@fde2e/len-tool-str-replace-editor` | yes | Model-facing view, create, literal replace, and line insert tool over the Harness filesystem service |

## goal

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-command-goal` | no | Human-facing slash command for persisted same-session goals |
| `@fde2e/len-goal` | yes | Event-sourced same-session goal state and lifecycle service for the FDE2E LEN |
| `@fde2e/len-goal-round-driver` | no | Race-fenced same-session goal-round driver |
| `@fde2e/len-tool-goal` | yes | Model-facing same-session goal tools with execution-time authority checks |

## guard

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-repeat-tool-reminder` | yes | Repeat-tool-call guard plugin: advisory reminders when an agent loops on identical tool calls |
| `@fde2e/len-tool-call-timeout-policy` | no | Tool-call timeout policy: a tools/execute wrapper that arms a per-tool deadline on exec.signal and returns TOOL_TIMEOUT when it wins |

## host

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-host-directory-picker-auto` | no | Adaptive chooser of the directory-picker seam: resolves the host situation at boot and mounts the native or browse backend for the FDE2E LEN web GUI host |
| `@fde2e/len-host-directory-picker-browse` | yes | In-app browsing backend of the directory-picker seam (listing/creation primitives over the host filesystem) |
| `@fde2e/len-host-directory-picker-native` | no | Native-OS-chooser backend of the directory-picker seam for the FDE2E LEN web GUI host |
| `@fde2e/len-host-frontend-static` | yes | SPA dist server for the Web shell: owns the webserver fallback seat, serving explicit index entries and static assets with traversal rejection and 404 misses |
| `@fde2e/len-host-open-in-app` | yes | Host half of open-in-app: resolved application catalog, icons, and the launch endpoint as three webServer routes |
| `@fde2e/len-host-plugin-inventory` | no | Read-only Remote projection of current Cordis Loader plugin state |
| `@fde2e/len-host-product-telemetry-otel` | yes | Explicit product usage events exported through OpenTelemetry HTTP logs |
| `@fde2e/len-host-webserver` | yes | Web route-registration plugin: HTTP and upgrade routes, per-Peer index transform taps, and static dist fallback |

## interaction

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-commands` | no | Plugin-owned human command registry for FDE2E LEN UIs |
| `@fde2e/len-permission-presets` | yes | User-facing permission presets (ctx.permissionPresets) for the FDE2E LEN: one product-level Permissions select bundling the sandbox-mode and approval-policy knobs, written through to their own session events |
| `@fde2e/len-tool-ask-user` | yes | Model-facing ask_user_question tool over the ctx.userQuestions seam |
| `@fde2e/len-user-approval` | yes | User-approval seam (ctx.approval) for the FDE2E LEN: one-shot permission decisions dispatched to composed answerers over the approval/request waterfall, fail-closed by default |
| `@fde2e/len-user-questions` | no | Abstract user-questions seam (ctx.userQuestions) for asking the human during agent runs |

## jobs

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-jobs-local` | yes | Process-local implementation of the FDE2E LEN background job registry seam |
| `@fde2e/len-tool-jobs` | yes | Model-facing background job control tools (job_output, job_list, job_kill) over the ctx.jobs registry |

## llm

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-deepseek-llm-api-extensions` | no | Additive request-field registry for the official DeepSeek LLM API adapter |
| `@fde2e/len-llm` | no | Provider-neutral LLM service interface for the FDE2E LEN |
| `@fde2e/len-llm-deepseek-account` | yes | DeepSeek account provider authentication and discovery |
| `@fde2e/len-llm-deepseek-api-key` | yes | DeepSeek api-key provider authentication and discovery |
| `@fde2e/len-llm-pi-ai` | yes | pi-ai-backed DeepSeek adapter for the FDE2E LEN LLM seam (design-verification twin of dsh-llm-deepseek) |
| `@fde2e/len-llm-retry` | yes | Provider-routed LLM request retry policy for the FDE2E LEN |
| `@fde2e/len-plugin-package-inventory-deepseek` | yes | Active Loader-backed plugin package inventory for official DeepSeek LLM API requests |
| `@fde2e/len-token-meter` | yes | Replay-aware token measurement service (ctx.tokenMeter) for the FDE2E LEN |

## lsp

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-lsp` | no | Abstract LSP capability seam (ctx.lsp) for the FDE2E LEN — language-server provider registry keyed by branded id and extension mapping, order-independent per-query selection, normalized definition/references/implementation/hover requests and results, and the LspError taxonomy |
| `@fde2e/len-lsp-stdio` | yes | Generic stdio language-server provider for the FDE2E LEN LSP capability seam (ctx.lsp) — spawns configured servers, translates JSON-RPC, and serves transient-open goToDefinition/findReferences/goToImplementation/hover queries in the host filesystem namespace |
| `@fde2e/len-tool-lsp` | yes | Model-facing lsp tool over the FDE2E LEN LSP capability seam (ctx.lsp) — one read-only tool with goToDefinition/findReferences/goToImplementation/hover operations, one-based UTF-16 cursor coordinates, bounded location rendering, and hover normalization |

## mcp

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-mcp-client` | yes | MCP client bridge: connects to MCP servers and registers their tools on ctx.tools |
| `@fde2e/len-mcp-manager` | yes | MCP server manager: a settings-driven fleet of mcp-client instances with runtime status, restart, and probe |
| `@fde2e/len-mcp-resources` | no | Scoped MCP resource discovery and reading through shared model tools |

## plan

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-plan-mode` | yes | Logged per-agent plan mode with deployment guidance, a direct slash command, and a user-reviewed exit |

## preset

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-agent-preset` | yes | Declare an Agent capability composition in Cordis YAML |
| `@fde2e/len-agent-preset-registry` | yes | Declarative Agent preset registry and profile-backed editing |
| `@fde2e/len-persona` | yes | Composition-authored deployment persona section for the FDE2E LEN |

## ptc-runtime

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-ptc-runtime-node` | yes | Node PTC execution with async function, REPL and VM Script evaluators and optional retained state |

## sandbox

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-sandbox-local` | yes | Local process-sandbox backends for the FDE2E LEN sandbox seam: bwrap, the npm-distributed landlock-run launcher, macOS Seatbelt, or the Windows ACL restricted-token runner — functionally probed, fail-closed |
| `@fde2e/len-sandbox-policy` | yes | Per-call sandbox policy resolver and current model context: deployment fallbacks plus each session's mode and workspace root, shared by every enforcing capability family |

## schedule

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-schedule` | yes | Host-wide durable reminders with shared management and delivery to existing or new Sessions |
| `@fde2e/len-tool-schedule` | no | Model-facing scheduled task tools (schedule_create, schedule_list, schedule_view, schedule_edit) over the Host ctx.schedule service |

## sdk

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-sdk-jsonrpc-server` | yes | Stdio JSON-RPC server plugin for out-of-process FDE2E LEN SDK clients |

## session

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-message-quotes` | no | Selected-text quotation and Markdown blockquote presentation |
| `@fde2e/len-session-checkpoint-policy` | no | Semantic session durability checkpoints before model requests and tool side effects |
| `@fde2e/len-session-log-deepseek` | yes | Incremental lossless session-log request extension for the official DeepSeek LLM API |
| `@fde2e/len-session-persistence-jsonl` | yes | JSONL durable session persistence backend for the FDE2E LEN |
| `@fde2e/len-session-projection` | no | Session-projection seam: the merge-extensible projection type table, the provider contract, and the ctx.sessionProjections registry serving whole current values of log-derived per-session state |
| `@fde2e/len-session-projection-cache` | yes | Persisted projection cache (ctx.sessionProjectionCache): durable per-session checkpoint records on the session_projcache storage domain (per-record layout), throttled write-behind, and the cached listing read |
| `@fde2e/len-session-stats` | no | Whole-log conversation counts and wall times projection (sessionStats) for the FDE2E LEN |
| `@fde2e/len-session-telemetry-otel` | yes | Feedback-authorized Session logs over byte-bounded OpenTelemetry HTTP requests |
| `@fde2e/len-session-title` | yes | Log-backed session title service and provider registry for the FDE2E LEN |
| `@fde2e/len-session-title-first-prompt-llm` | yes | First-message LLM provider plugin for FDE2E LEN session titles |
| `@fde2e/len-session-turn-outline` | no | Whole-log turn outline projection (turnOutline) for the FDE2E LEN |
| `@fde2e/len-tool-working-directory` | no | Read and change the active Session working directory |
| `@fde2e/len-working-directory` | yes | Session working directories with durable changes and model context |

## session-query

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-session-log-export` | yes | Web Session-log ZIP export and Session Markdown copy |
| `@fde2e/len-session-query-sqlite` | yes | Concrete ctx.sessionQuery backend with SQLite FTS5 search |

## settings

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-settings` | no | Abstract user-settings seam (ctx.settings) for the FDE2E LEN |

## shell

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-bash-local` | yes | Local-subprocess implementation of the FDE2E LEN bash executor seam |
| `@fde2e/len-bash-sandbox` | yes | Sandbox-consuming implementation of the FDE2E LEN bash executor seam (confines every command via ctx.sandbox, reports denial/enforcement result facts) |
| `@fde2e/len-pwsh-local` | yes | Local PowerShell implementation of the FDE2E LEN bash executor seam |
| `@fde2e/len-pwsh-sandbox` | yes | Sandbox-consuming implementation of the FDE2E LEN PowerShell executor seam (confines every command via ctx.sandbox, reports denial/enforcement result facts) |
| `@fde2e/len-shell-env` | yes | Tool-independent managed DSH_* shell environment registry |
| `@fde2e/len-tool-bash` | yes | Model-facing bash tool with optional generic background-job and sandbox-escalation support |
| `@fde2e/len-tool-bash-persistent` | yes | Model-facing owner-scoped persistent Bash tool backed by the Harness PTY service |
| `@fde2e/len-tool-pwsh` | yes | Model-facing pwsh tool over the bash executor seam |
| `@fde2e/len-tool-pwsh-persistent` | yes | Model-facing owner-scoped persistent PowerShell tool backed by the Harness PTY service |

## skill

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-skill` | yes | Agent skill provider registry for the FDE2E LEN |
| `@fde2e/len-skill-filesystem` | yes | Local filesystem skill provider for the FDE2E LEN |
| `@fde2e/len-skill-office` | yes | Bundled Word, PowerPoint, and Excel workflows and LibreOffice Kit operations |
| `@fde2e/len-tool-skill` | yes | Model-facing skill loading tool for the FDE2E LEN |
| `@fde2e/len-tool-workspace-dependencies` | yes | The load_workspace_dependencies tool: absolute paths into a bundled Python, Node.js, and pnpm payload |

## spill

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-spill-local` | yes | Local-filesystem implementation of the FDE2E LEN spill storage seam (private session-scoped files) |
| `@fde2e/len-spill-policy` | yes | Token-budgeted tool-result retention with recoverable text and image paths |

## ssh

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-fs-ssh` | no | Filesystem provider over the shared POSIX SSH helper |
| `@fde2e/len-sandbox-ssh` | no | Remote POSIX sandbox argv provider over the shared SSH helper |
| `@fde2e/len-ssh` | yes | Shared OpenSSH connection and versioned POSIX remote helper |
| `@fde2e/len-subprocess-ssh` | no | Subprocess and terminal provider over the shared POSIX SSH helper |

## storage

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-storage` | no | Storage hub (ctx.storage): named backend registry plus mounted data-form facilities for the FDE2E LEN |
| `@fde2e/len-storage-domain` | yes | Domain data form (ctx.storage.domain): schema-validated, event-emitting KV domains over storage backends for the FDE2E LEN |
| `@fde2e/len-storage-json` | yes | JSON file KV storage backend for the FDE2E LEN storage hub |
| `@fde2e/len-storage-sqlite` | yes | SQLite storage backend (kv facet) for the FDE2E LEN storage hub |

## subagent

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-subagent` | yes | Abstract subagent seam (ctx.subagents): named-provider registry for delegating to child agents |
| `@fde2e/len-subagent-acp` | yes | Out-of-process ACP subagent backend: drives a child agent in a spawned subprocess over the Agent Client Protocol |
| `@fde2e/len-subagent-claude-code` | yes | One-shot Claude Code subagent provider over the official Agent SDK |
| `@fde2e/len-subagent-codex` | yes | One-shot Codex subagent provider over the official app-server protocol |
| `@fde2e/len-subagent-dsh-sdk` | yes | Out-of-process SDK subagent backend: drives a child FDE2E LEN runtime subprocess over stdio JSON-RPC through the TypeScript SDK client |
| `@fde2e/len-subagent-fork-in-process` | yes | In-process fork subagent backend: runs a child agent seeded with a prefix of the parent's log |
| `@fde2e/len-subagent-spawn-in-process` | yes | In-process spawn subagent backend: runs a fresh child agent on ctx.agents |
| `@fde2e/len-tool-subagent` | yes | Model-facing subagent delegation tool over the ctx.subagents seam |
| `@fde2e/len-tool-subagent-control` | yes | Shared messaging, interruption, and child discovery tools for subagents |

## subprocess

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-subprocess-local` | no | Local-subprocess implementation of the FDE2E LEN subprocess seam |

## team

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-agent-team` | yes | Shared task DAG and change waits for subagent trees |
| `@fde2e/len-tool-agent-team` | yes | Scoped model-facing Agent Teams tools over ctx.agentTeams |

## telemetry

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-otel` | no | Cordis service for independent ordinary-event and byte-bounded Session-log OTLP channels |

## terminal

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-terminal` | no | Persistent PTY session seam for the FDE2E LEN — owner-scoped ids, backend registry, interactive sends, reads, signals, and awaited cleanup |
| `@fde2e/len-terminal-bash` | yes | Persistent shell PTY backend over the FDE2E LEN subprocess terminal primitive |

## test-support

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-llm-replay` | yes | Replay LLM plugin: short-circuits llm/stream with model chunks reconstructed from a recorded session JSONL (keyless snapshot tests) |

## todo

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-tool-todo` | yes | Model-facing todo_write tool over the FDE2E LEN event-sourced session log |

## typert

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-typert-loader` | yes | Loader integration for generated Typert package contributions |

## web

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-tool-web` | yes | Model-facing web tools (web_search, web_fetch) over the FDE2E LEN web capability seam (ctx.web) |
| `@fde2e/len-web` | yes | Abstract web access capability seam (ctx.web) for the FDE2E LEN — search/fetch provider registry, registration-order-independent selection, request/result vocabulary, and the WebError taxonomy |
| `@fde2e/len-web-deepseek-api` | yes | DeepSeek Search and Fetch API providers for the FDE2E LEN web capability seam (ctx.web) |
| `@fde2e/len-web-fetch-http` | yes | Anonymous HTTP(S) fetch provider for the FDE2E LEN web capability seam (ctx.web) |
| `@fde2e/len-web-search-deepseek` | yes | DeepSeek-backed search provider (native web_search via the Anthropic-compatible API) for the FDE2E LEN web capability seam (ctx.web) |

## workflow

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-tool-workflow` | yes | Model-facing workflow tool: run a JavaScript orchestration script over ctx.workflowEngine |
| `@fde2e/len-workflow-ptc` | yes | Workflow orchestration in the shared sandboxed Node PTC runtime |

## workspace

| Package | Config | Description |
|---|---|---|
| `@fde2e/len-workspace` | no | Workspace entity registry (ctx.workspaceRegistry): durable workspace records with validated session attachment over the domain data form for the FDE2E LEN |
