import { getFileText } from "../Utils/FileUtil.ts";

export async function getProjectRelativePaths(slnPath: string): Promise<string[]> {
  const txt: string = await getFileText(slnPath);

  const projectStartName = "Project";
  const projectEndName = "EndProject";

  const expr = new RegExp(`${projectStartName}.*?${projectEndName}`, "gs")
  const projectLines: string[] = Array.from(txt.match(expr) || []);

  const projectPaths: string[] = [];
  for(const line of projectLines) {
    const rightSide = line.split('"');
    const projPath = rightSide[5];

    projectPaths.push(projPath);
  }

  return projectPaths;
}