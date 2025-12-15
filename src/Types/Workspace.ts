export type Workspace = {
  name: string | null,
  slnRoot: string | null,
  folders: { path: string } [],
  settings: object
}