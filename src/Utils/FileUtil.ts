import path from "node:path";
import { VSCodeConsts } from "../Constants/VSCodeConsts.ts";

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await Deno.stat(filePath);
    return true;
  }
  catch(e) {
    return false;
  }
}

export async function getFileText(filePath: string): Promise<string> {
  if(!await fileExists(filePath)) throw new Error(`The file: ${filePath} doesnt exist`);
  return await Deno.readTextFile(filePath);
}

export async function saveFileText(filePath: string, fileText: string): Promise<void> {
  await Deno.writeTextFile(filePath, fileText);
}

export async function existsSolutionWorkspace(slnPath: string): Promise<string | null> {
  const workspacePath = path.join(VSCodeConsts.workspaceRoot, `${path.basename(slnPath, ".sln")}${VSCodeConsts.workspaceExtension}`);
  
  return await fileExists(workspacePath) ? workspacePath : null;
}