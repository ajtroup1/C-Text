export interface Directory {
  path: string // The path of the directory
  name: string // The name of the directory
  files: FileInfo[] // The files directly inside this directory
  folders: Folder[] // Folders (which themselves contain files and/or other folders)
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
  name: string
  relativePath?: string
  key: string
}
