import React, { useState } from 'react'
import '../../assets/css/navbar.css'
import { Directory, _File, FileInfo, Folder } from '../../types/Directory.d'
import Dropdown from './Dropdown'
import { Menu, MenuItem } from '@mui/material'

interface NavbarProps {
  onSelectFile: (file: _File) => void
  onSelectFolder: (folder: Directory) => void
  openTerminal: () => void
  openSettings: () => void
}

function Navbar({
  onSelectFile,
  onSelectFolder,
  openTerminal,
  openSettings
}: NavbarProps): JSX.Element {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [menuType, setMenuType] = useState<string | null>(null)

  const handleOpenMenu = (type: string, event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget)
    setMenuType(type)
  }

  const handleCloseMenu = () => {
    setMenuAnchor(null)
    setMenuType(null)
  }

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
    handleCloseMenu()
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
    handleCloseMenu()
  }

  const handleOpenTerminal = () => {
    openTerminal()
  }

  const renderMenuItems = () => {
    switch (menuType) {
      case 'file':
        return (
          <>
            {/* <MenuItem onClick={}>Save</MenuItem> */}
            {/* <MenuItem onClick={}>Save As</MenuItem> // TODO Save As */}
            <MenuItem onClick={openFileDialog}>Open File</MenuItem>
            <MenuItem onClick={openFolderDialog}>Open Folder</MenuItem>
          </>
        )
      case 'view':
        return <MenuItem onClick={handleCloseMenu}>Markdown Renderer</MenuItem>
      default:
        return <MenuItem>No Options Implemented</MenuItem>
    }
  }

  return (
    <div className="navbar-main">
      <div className="navbar-options">
        <div className="navbar-option" onClick={(e) => handleOpenMenu('file', e)}>
          <p>File</p>
        </div>
        <div className="navbar-option" onClick={(e) => handleOpenMenu('edit', e)}>
          <p>Edit</p>
        </div>
        <div className="navbar-option" onClick={(e) => handleOpenMenu('view', e)}>
          <p>View</p>
        </div>
        <div className="navbar-option" onClick={handleOpenTerminal}>
          <p>Terminal</p>
        </div>
        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleCloseMenu}>
          {renderMenuItems()}
        </Menu>
      </div>
      <div className="right-navbar">
        <div className="search-bar-container-navbar">
          <input type="text" />
        </div>
        <div className="settings-icon-navbar-container" onClick={openSettings}>
          <img src="../../src/assets/images/settings-icon.png" id="settings-icon-navbar" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
