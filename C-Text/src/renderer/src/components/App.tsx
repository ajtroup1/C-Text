import React, { useState, useRef, useEffect } from 'react'
import Navbar from './Navbar/Navbar'
import Browser from './Browser/Browser'
import Editor from './Editor/Editor'
import { Directory, _File, FileInfo } from '@renderer/types/Directory.d'
import { useResizer } from '../hooks/useResizer'
import { Settings } from '@renderer/types/Settings.d'
import Modal from './Modal/Modal'

function App(): JSX.Element {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [debugging, setDebugging] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalMode, setModalMode] = useState<string>('settings')
  const [workspace, setWorkspace] = useState<Directory | null>(null)
  const [activeFile, setActiveFile] = useState<_File | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await (window as any).electron.getOrCreateSettings()
      setSettings(settings)
      if (debugging) {
        console.log('Received settings from backend: ', settings)
      }
    }

    fetchSettings()
  }, [])

  // --------------------------------------------------------
  // RESIZING FOR EDITOR / BROSWER WIDTH
  const browserRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const resizerRef = useRef<HTMLDivElement>(null)
  const lowerMainRef = useRef<HTMLDivElement>(null)

  useResizer(browserRef, editorRef, resizerRef, lowerMainRef)
  // --------------------------------------------------------

  const handleFileSelect = (file: _File) => {
    if (debugging) {
      console.log(file)
    }
    setActiveFile(file)
  }

  const handleFolderSelect = (folder: Directory) => {
    if (debugging) {
      console.log(folder)
    }
    setWorkspace(folder)
  }

  const handleSaveFile = async (updatedFile: _File) => {
    if (debugging) {
      console.log(updatedFile)
    }
    setActiveFile(updatedFile)
    await (window as any).electron.saveFile(updatedFile.path, updatedFile.content)
  }

  const handleBrowserFileSelect = async (filePath: string) => {
    const file = await (window as any).electron.getFile(filePath)
    setActiveFile(file)
  }

  const openTerminal = () => {
    if (workspace) {
      ;(window as any).electron.openTerminal(workspace.path)
    } else {
      ;(window as any).electron.openTerminal('DEFAULT')
    }
  }

  const handleOpenModal = (mode: string) => {
    setModalMode(mode)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleOpenSettings = () => {
    handleOpenModal('settings')
  }

  const handleSettingsChange = (newSettings: Settings) => {
    console.log(newSettings)
  }

  return (
    <div className="main">
      <Navbar
        onSelectFile={handleFileSelect}
        onSelectFolder={handleFolderSelect}
        openTerminal={openTerminal}
        openSettings={handleOpenSettings}
      />
      <div className="lower-main" ref={lowerMainRef}>
        <div className="browser-container" ref={browserRef}>
          <Browser Workspace={workspace} selectFile={handleBrowserFileSelect} />
        </div>
        <div className="resizer" ref={resizerRef}></div>
        <div className="editor-container" ref={editorRef}>
          <Editor File={activeFile} onSaveFile={handleSaveFile} />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          mode={modalMode}
          settings={settings}
          onClose={handleClose}
          onUpdateSettings={handleSettingsChange}
        />
      )}
    </div>
  )
}

export default App
