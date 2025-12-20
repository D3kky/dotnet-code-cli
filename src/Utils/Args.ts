import path, { resolve } from "node:path";
import { fileExists } from "./FileUtil.ts";

export const args = {
  slnPathAbs: ""
}

export async function parseArgs(): Promise<string> {
  if(Deno.args.length === 0) throw new Error("At least one argument must be provided")
  if(Deno.args.length === 1) await handleSolutionArg(Deno.args[0]);

  return args.slnPathAbs;
}

async function handleSolutionArg(solutionPath: string) {
  if(! await fileExists(solutionPath)) throw new Error("The path you provided doesnt exit");
  if(path.extname(solutionPath) !== ".sln") throw new Error("File must be of type .sln");

  args.slnPathAbs = resolve(Deno.cwd(), solutionPath)
} 