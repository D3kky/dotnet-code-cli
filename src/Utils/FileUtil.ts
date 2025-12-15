export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await Deno.stat(filePath);
    return true;
  }
  catch(e) {
    return false;
  }
}

export async function getFileText(filePath: string): Promise<string> {
  if(!await fileExists(filePath)) throw new Error(`The file: ${filePath} doesnt exist`);
  return await Deno.readTextFile(filePath);
}

export async function saveFileText(filePath: string, fileText: string) {
  await Deno.writeTextFile(filePath, fileText);
}