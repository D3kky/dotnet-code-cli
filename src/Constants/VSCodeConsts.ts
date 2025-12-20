import path from "node:path";
import { fileURLToPath } from "node:url";

export const VSCodeConsts = {
  workspaceExtension: ".code-workspace",
  root: path.dirname(fileURLToPath(Deno.mainModule)),
  configRoot: path.join(path.dirname(fileURLToPath(Deno.mainModule)), "configs"),
  workspaceRoot: path.join(path.dirname(fileURLToPath(Deno.mainModule)), "workspaces")
}

export const omnisharpSettings: Record<string, unknown> = {
  "omnisharp.useGlobalMono": "always",
  "omnisharp.path": "latest",
  "omnisharp.workspaceLoadOnStartup": true
}