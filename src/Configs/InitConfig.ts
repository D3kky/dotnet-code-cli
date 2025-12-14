import path from "node:path";
import { VSCodeConsts } from "../Constants/VSCodeConsts.ts";
import { fileExists } from "../Utils/FileUtil.ts";


const roots = {
  workspace: "workspaces",
  configs: "configs"
}

async function createIfNotExists(path: string) {
  if(! await fileExists(path)) Deno.mkdir(path);
}

export async function setUpInitStruct() {
  for(const filePath in roots) {
    await createIfNotExists(path.join(VSCodeConsts.root, filePath));
  }
};