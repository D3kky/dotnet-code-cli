import { exec } from "node:child_process";

export function openCodeWithWorkspace(workspacePath: string) {
  exec(`code ${workspacePath}`);
}