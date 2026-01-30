import path from "node:path";
import { getFileText } from "../Utils/FileUtil.ts";

export async function getProjectRelativePaths(slnPath: string): Promise<string[]> {
  switch(path.extname(slnPath)) {
    case ".sln": return await GetProjectRelativePathsSln(slnPath)
    case ".slnx": return await GetProjectRelativePathsSlnx(slnPath);
    default: throw new Error("Extension not recognized");    
  }
}

async function GetProjectRelativePathsSlnx(slnPath: string): Promise<string[]> {
  const slnRoot: string = Deno.realPathSync(path.dirname(slnPath));
  const txt: string = await getFileText(slnPath);

  const projectStartName:string = "<Project Path=";
  const projectEndName:string = "/>";

  const expr:RegExp = new RegExp(`${projectStartName}.*?${projectEndName}`, "gs");
  const projectLines: string[] = Array.from(txt.match(expr) || []);

  return projectLines.map<string>(e =>
    path.join(slnRoot, 
    path.dirname(e.replaceAll(projectStartName, "")
      .replaceAll(projectEndName, "")
      .replaceAll(`"`, "")
      .replace(/\/[^\/]+\.csproj$/, ""))));
}

async function GetProjectRelativePathsSln(slnPath: string): Promise<string[]> {
  const slnRoot: string = path.dirname(slnPath);
  const txt: string = await getFileText(slnPath);

  const projectStartName = "Project";
  const projectEndName = "EndProject";

  const expr = new RegExp(`${projectStartName}.*?${projectEndName}`, "gs")
  const projectLines: string[] = Array.from(txt.match(expr) || []);

  const projectPaths: string[] = [];
  for(const line of projectLines) {
    // Right side of =
    const rightSide: string = line.split("=")[1];
    const rightSideArray: string[] = rightSide.split(", ");
    const projPath = rightSideArray[1].replaceAll('"', "");

    // remove duds
    if(path.extname(projPath) !== ".csproj") continue;

    projectPaths.push(Deno.realPathSync(path.join(slnRoot, path.dirname(projPath))));
  }

  return projectPaths;
}