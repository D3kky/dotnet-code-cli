export const VSCodeConsts = {
  workspaceExtension: ".code-workspace",
  root: "",
  configRoot: "configs",
  workspaceRoot: "workspaces"
}

export function setBaseDir(dirName: string | undefined) : void {
  VSCodeConsts.root = dirName!
}

export const omnisharpSettings = {
  "omnisharp.useGlobalMono": "always",
  "omnisharp.path": "latest",
  "omnisharp.workspaceLoadOnStartup": true
}