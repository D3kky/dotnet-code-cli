import path from "node:path";
import { fileExists } from "./FileUtil.ts";
// deno-lint-ignore no-import-prefix
import { parseArgs } from "jsr:@std/cli@1.0.24/parse-args";

export const flags = parseArgs(Deno.args, {
  boolean: ["forceReload"],
  string: ["sln"],
  alias: { f: "forceReload" },
  default: { forceReload: false }
});

export async function handleArgs(): Promise<string> {
  await handleSolutionArg(flags.sln ?? Deno.args[0]);

  return flags.sln ?? Deno.args[0]  
}

async function handleSolutionArg(solutionPath: string) {
  if(! await fileExists(solutionPath)) throw new Error("The path you provided doesnt exit");
  if(path.extname(solutionPath) !== ".sln") throw new Error("File must be of type .sln");
}