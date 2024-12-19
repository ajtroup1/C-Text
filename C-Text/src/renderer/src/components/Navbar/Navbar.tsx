import React from 'react'
import '../../assets/css/navbar.css'
import { Directory, File } from "../../types/Directory.d"

interface NavbarProps {
  onSelectFile: (file: File) => void
  onSelectFolder: (folder: Directory) => void
}

function Navbar({ onSelectFile, onSelectFolder }: NavbarProps): JSX.Element {
  const openFileDialog = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '*' 

    input.onchange = (event) => {
      const target = event.target as HTMLInputElement
      const selectedFile = target?.files?.[0]

      if (selectedFile) {
        const reader = new FileReader()

        reader.onload = () => {
          const fileContent = reader.result as string

          const fileWithContent: File = {
            name: selectedFile.name,
            path: selectedFile.path,
            fileSizeBytes: selectedFile.size,
            content: fileContent
          }

          onSelectFile(fileWithContent)
        }

        reader.onerror = () => {
          console.error('Error reading file')
        }

        reader.readAsText(selectedFile) 
      }
    }

    input.click()
  }

  const openFolderDialog = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'directory'
    input.webkitdirectory = true

    input.onchange = async (event) => {
      const target = event.target as HTMLInputElement
      const selectedFolder = target?.files

      if (selectedFolder) {
        const rootPath = selectedFolder[0].webkitRelativePath.split('/')[0]
        const rootDirectory: Directory = {
          path: rootPath,
          name: rootPath,
          files: [],
          folders: [],
        }

        Array.from(selectedFolder).forEach((file) => {
          const parts = file.webkitRelativePath.split('/')
          const folderPath = parts.slice(0, -1).join('/')
          const fileName = parts[parts.length - 1]

          const fileObject: File = {
            path: folderPath + '/' + fileName,
            name: fileName,
            fileSizeBytes: file.size,
            content: '',
          }

          const folderPathExists = rootDirectory.folders.find(
            (folder) => folder.path === folderPath
          )

          if (folderPathExists) {
            folderPathExists.files.push(fileObject)
          } else {
            rootDirectory.folders.push({
              path: folderPath,
              name: folderPath.split('/').pop() ?? '',
              files: [fileObject],
              folders: [],
            })
          }
        })

        onSelectFolder(rootDirectory)
      }
    }

    input.click()
  }

  return (
    <div className="navbar-main">
      <div className="navbar-options">
        <div className="navbar-option">
          <p>File</p>
          <div className="dropdown">
            <div className="dropdown-item" onClick={openFileDialog}>
              Open File
            </div>
            <div className="dropdown-item" onClick={openFolderDialog}>
              Open Folder
            </div>
          </div>
        </div>
        <div className="navbar-option">
          <p>Edit</p>
        </div>
        <div className="navbar-option">
          <p>View</p>
        </div>
        <div className="navbar-option">
          <p>Terminal</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar
