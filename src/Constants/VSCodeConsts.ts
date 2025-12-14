export const VSCodeConsts = {
  fileExtension: ".code-workspace",
  root: "",
}

export function setBaseDir(dirName: string | undefined) : void {
  VSCodeConsts.root = dirName!
}