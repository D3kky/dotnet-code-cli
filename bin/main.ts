import { setBaseDir } from "../src/Constants/VSCodeConsts.ts";
import * as InitConfig from "../src/Configs/InitConfig.ts";
import { configRoot } from "../src/Configs/RootConfig.ts";
import { parseArgs, args } from "../src/Utils/Args.ts";
import { getProjectRelativePaths } from "../src/Core/SolutionParser.ts";

// Setup
setBaseDir(import.meta.dirname);

async function runAsync() {
  // IMPORTANT! ALWAYS CONFIG ROOT FIRST
  configRoot(import.meta.dirname || "");

  await parseArgs();
  await InitConfig.setUpInitStruct();

  console.log(await getProjectRelativePaths(args.slnPath));
}

await runAsync();