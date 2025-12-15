import { Workspace } from "../Types/Workspace.ts";
import { omnisharpSettings, VSCodeConsts } from "../Constants/VSCodeConsts.ts";
import path from "node:path";

export function buildWorkspaceFromFolders(name: string, slnRoot: string, folderPaths: string[]): Workspace {
  const workspace: Workspace = {
    name,
    slnRoot,
    folders: [],
    settings: omnisharpSettings
  };

  for(const folderPath of folderPaths) {
    workspace.folders.push({ path: folderPath })
  };

  return workspace
}

export async function saveWorkspace(workspace: Workspace): Promise<string> {
  if(workspace.name === null) throw Error("Workspace name must exist");

  const text:string = JSON.stringify(workspace);
  const workspacePath = path.join(VSCodeConsts.root, VSCodeConsts.workspaceRoot, `${workspace.name}.${VSCodeConsts.workspaceExtension}`);

  await Deno.writeTextFile(workspacePath, text);

  return workspacePath;
}