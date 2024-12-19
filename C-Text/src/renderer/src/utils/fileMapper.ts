import { File as CustomFile } from '../types/Directory.d'

export const mapToCustomFile = (file: File): CustomFile => {
  return {
    name: file.name,
    path: file.name, // You can adjust this as needed
    fileSizeBytes: file.size,
    content: "",
  }
}
