import { VSCodeConsts } from "../Constants/VSCodeConsts.ts";
import { fileExists } from "../Utils/FileUtil.ts";

async function createIfNotExists(path: string) {
  if(! await fileExists(path)) Deno.mkdir(path);
}

export async function setUpInitStruct() {
  const folderRoots = {
    config: VSCodeConsts.configRoot,
    workspace: VSCodeConsts.workspaceRoot
  }

  for(const value of Object.values(folderRoots)) {
    await createIfNotExists(value);
  }
};