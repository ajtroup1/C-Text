import React from 'react'
import '../../assets/css/navbar.css'
import { Directory, _File, FileInfo } from '../../types/Directory.d'
import { v4 as uuidv4 } from 'uuid'

interface NavbarProps {
  onSelectFile: (file: _File) => void
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

          const fileWithContent: _File = {
            ...selectedFile,
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

  const excludedGitFilesRegex = /^(HEAD|config|description|packed-refs|ORIG_HEAD|COMMIT_EDITMSG)$/
  const excludeExtensionPatterns = /\.sample$/ // Exclude .sample files
  const excludeFolderPatterns = /(^|\/)(\.git|\.vscode)(\/|$)/ // Exclude .git and .vscode folders

  // Combine all patterns into a single regex
  const excludedFilesRegex = new RegExp(
    `(${excludedGitFilesRegex.source})|(${excludeExtensionPatterns.source})|(${excludeFolderPatterns.source})`
  )

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
          folders: []
        }

        let c = 0
        Array.from(selectedFolder).forEach((file) => {
          const parts = file.webkitRelativePath.split('/')
          const folderPath = parts.slice(0, -1).join('/')
          const fileName = parts[parts.length - 1]

          // Check if file or folder should be excluded
          if (excludedFilesRegex.test(file.webkitRelativePath)) return // Exclude based on full path

          const fileObject: FileInfo = {
            path: selectedFolder[c].path,
            name: fileName,
            relativePath: folderPath + '/' + fileName,
            key: uuidv4()
          }

          // Helper function to find or create folders recursively
          const addFileToFolder = (folder: Directory, pathParts: string[], file: FileInfo) => {
            const [currentFolderName, ...remainingPath] = pathParts

            // If there's no more path to follow, this is where we should add the file
            if (remainingPath.length === 0) {
              folder.files.push(file)
              return
            }

            // Check if the folder exists
            let subFolder = folder.folders.find((sub) => sub.name === currentFolderName)

            // If the subfolder doesn't exist, create it
            if (!subFolder) {
              subFolder = {
                path: selectedFolder[c].path + '/' + currentFolderName,
                name: currentFolderName,
                files: [],
                folders: []
              }
              folder.folders.push(subFolder)
            }

            // Recurse into the subfolder
            addFileToFolder(subFolder, remainingPath, file)
          }

          // Start adding files starting from the root folder
          addFileToFolder(rootDirectory, folderPath.split('/'), fileObject)
          c++
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
      </div>
    </div>
  )
}

export default Navbar
