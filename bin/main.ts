import { setBaseDir } from "../src/Constants/VSCodeConsts.ts";
import * as InitConfig from "../src/Configs/InitConfig.ts";
import { configRoot } from "../src/Configs/RootConfig.ts";
import { parseArgs, args } from "../src/Utils/Args.ts";
import { getProjectRelativePaths } from "../src/Core/SolutionParser.ts";
import path from "node:path";
import { buildWorkspaceFromFolders, saveWorkspace } from "../src/Core/WorkspaceBuilder.ts";
import { openCodeWithWorkspace } from "../src/Core/ProcessControl.ts";

// Setup
setBaseDir(import.meta.dirname);

async function runAsync() {
  // IMPORTANT! ALWAYS CONFIG ROOT FIRST
  configRoot(import.meta.dirname || "");
  await InitConfig.setUpInitStruct();

  await parseArgs();

  const slnRoot = path.dirname(args.slnPath);
  const slnName = path.basename(args.slnPath, ".sln");

  const slnProjectPaths = await getProjectRelativePaths(args.slnPath);
  const workspacePath = await saveWorkspace(await buildWorkspaceFromFolders(slnName, slnRoot, slnProjectPaths));

  openCodeWithWorkspace(workspacePath);
}

await runAsync();