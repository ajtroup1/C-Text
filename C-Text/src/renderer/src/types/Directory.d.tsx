// TODO: Have directory extend folder and contain additional metadata

export interface Directory extends Folder {
  //
}

export interface Folder {
  path: string // Path of the folder relative to the parent directory
  name: string // Name of the folder
  files: FileInfo[] // Files contained in this folder
  folders: Folder[] // Subfolders contained in this folder (recursive)
}

export interface _File extends File {
  content: string
}

export interface FileInfo {
  path: string
  folderPath: string
  name: string
  relativePath?: string
  key: string
}
