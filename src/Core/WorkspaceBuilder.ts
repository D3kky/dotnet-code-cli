import { Workspace } from "../Types/Workspace.ts";
import { omnisharpSettings, VSCodeConsts } from "../Constants/VSCodeConsts.ts";
import path from "node:path";

export function buildWorkspaceFromFolders(name: string, slnRootFolder: string, folderPaths: string[]): Workspace {
  const cwdPath = path.dirname(slnRootFolder);

  const workspace: Workspace = {
    name,
    slnRoot: slnRootFolder,
    folders: [],
    settings: omnisharpSettings
  };

  for(const folderPath of folderPaths) {
    workspace.folders.push({ path: path.join(slnRootFolder, folderPath) })
  };

  omnisharpSettings["terminal.integrated.cwd"] = cwdPath;
  omnisharpSettings["dotnet.defaultSolution"] = path.join(slnRootFolder, `${workspace.name}.sln`);

  return workspace
}

export async function saveWorkspace(workspace: Workspace): Promise<string> {
  if(workspace.name === null) throw Error("Workspace name must exist");

  const text:string = JSON.stringify(workspace);
  const workspacePath = path.join(VSCodeConsts.root, VSCodeConsts.workspaceRoot, `${workspace.name}.${VSCodeConsts.workspaceExtension}`);

  await Deno.writeTextFile(workspacePath, text);

  return workspacePath;
}