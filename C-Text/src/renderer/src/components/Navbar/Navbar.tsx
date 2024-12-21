import React from 'react'
import '../../assets/css/navbar.css'
import { Directory, _File, FileInfo, Folder } from '../../types/Directory.d'
import { v4 as uuidv4 } from 'uuid'

interface NavbarProps {
  onSelectFile: (file: _File) => void
  onSelectFolder: (folder: Directory) => void
  openTerminal: () => void
}

function Navbar({ onSelectFile, onSelectFolder, openTerminal }: NavbarProps): JSX.Element {
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

  // Combine all patterns into a single regex
  const openFolderDialog = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'directory'
    input.webkitdirectory = true

    input.onchange = async (event) => {
      const target = event.target as HTMLInputElement
      const selectedFolder = target?.files

      if (selectedFolder) {
        const path = selectedFolder[0].path.split('\\').slice(0, -1).join('\\')

        try {
          const dir = await (window as any).electron.readDirectory(path)
          onSelectFolder(dir)
        } catch (error) {
          console.error('Error reading directory:', error)
        }
      }
    }

    input.click()
  }

  const handleOpenTerminal = () => {
    openTerminal()
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
        <div className="navbar-option" onClick={handleOpenTerminal}>
          <p>Terminal</p>
        </div>
      </div>
      <div className='right-navbar'>
        <div className='search-bar-container-navbar'>
          <input type="text"/>
        </div>
        <div className='settings-icon-navbar-container'>
          <img src='../../src/assets/images/settings-icon.png' id='settings-icon-navbar'/>
        </div>
      </div>
    </div>
  )
}

export default Navbar
