import * as InitConfig from "../src/Configs/InitConfig.ts";
import { parseArgs } from "../src/Utils/Args.ts";
import { getProjectRelativePaths } from "../src/Core/SolutionParser.ts";
import { buildWorkspaceFromFolders, saveWorkspace } from "../src/Core/WorkspaceBuilder.ts";
import { openCodeWithWorkspace } from "../src/Core/ProcessControl.ts";
import path from "node:path";

// Setup

async function runAsync() {
  // IMPORTANT! ALWAYS CONFIG ROOT FIRST
  await InitConfig.setUpInitStruct();

  const slnAbsPath: string = await parseArgs();

  const slnProjectPaths = await getProjectRelativePaths(slnAbsPath);
  const slnName: string = path.basename(slnAbsPath, ".sln")

  const workspacePath = await saveWorkspace(await buildWorkspaceFromFolders(slnName, slnAbsPath, slnProjectPaths));

  openCodeWithWorkspace(workspacePath);
}

await runAsync();