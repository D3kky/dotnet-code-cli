import * as InitConfig from "../src/Configs/InitConfig.ts";
import { handleArgs } from "../src/Utils/Args.ts";
import { getProjectRelativePaths } from "../src/Core/SolutionParser.ts";
import {
  buildWorkspaceFromFolders,
  saveWorkspace,
} from "../src/Core/WorkspaceBuilder.ts";
import { openCodeWithWorkspace } from "../src/Core/ProcessControl.ts";
import path from "node:path";
import { existsSolutionWorkspace } from "../src/Utils/FileUtil.ts";

// Setup
const validExtValues: Set<string> = new Set([".sln", ".slnx"]);

async function runAsync() {
  // IMPORTANT! ALWAYS CONFIG ROOT FIRST
  await InitConfig.setUpInitStruct();

  const slnAbsPath: string = await handleArgs();
  const ext = path.extname(slnAbsPath);

  if (!validExtValues.has(ext)) throw new Error("File must be of type sln or slnx");

  let workspacePath: string | null =
    await existsSolutionWorkspace(slnAbsPath, ext);

  console.log("Generating workspace");
  const slnProjectPaths = await getProjectRelativePaths(slnAbsPath);
  const slnName: string = path.basename(slnAbsPath, ext);
  workspacePath = await saveWorkspace(
    await buildWorkspaceFromFolders(slnName, slnAbsPath, slnProjectPaths));

  openCodeWithWorkspace(workspacePath!);
}

await runAsync();
