export interface Directory {
  path: string // The path of the directory
  name: string // The name of the directory
  files: File[] // The files directly inside this directory
  folders: Folder[] // Folders (which themselves contain files and/or other folders)
}

export interface Folder {
  path: string // Path of the folder relative to the parent directory
  name: string // Name of the folder
  files: File[] // Files contained in this folder
  folders: Folder[] // Subfolders contained in this folder (recursive)
}

export interface File {
  path: string // Path of the file relative to the parent folder or directory
  name: string // Name of the file
  fileSizeBytes: number // Size of the file in bytes
  content: string // The actual text/string content within the file
}
