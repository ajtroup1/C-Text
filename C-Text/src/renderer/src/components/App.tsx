import React, { useState, useRef, useEffect } from 'react'
import Navbar from './Navbar/Navbar'
import Browser from './Browser/Browser'
import Editor from './Editor/Editor'
import { Directory, _File, FileInfo } from '@renderer/types/Directory.d'
import { useResizer } from '../hooks/useResizer'
import { Settings } from '@renderer/types/Settings.d'
import Modal from './Modal/Modal'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './GlobalStyle'
import Loading from './Shared/Loading'

function App(): JSX.Element {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [debugging, setDebugging] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalMode, setModalMode] = useState<string>('settings')
  const [workspace, setWorkspace] = useState<Directory | null>(null)
  const [activeFile, setActiveFile] = useState<_File | null>(null)
  const [tabbedFiles, setTabbedFiles] = useState<_File[]>([])
  const [activeTab, setActiveTab] = useState<string | null>(null)

  // --------------------------------------------------------
  // RESIZING FOR EDITOR / BROSWER WIDTH
  const browserRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const resizerRef = useRef<HTMLDivElement>(null)
  const lowerMainRef = useRef<HTMLDivElement>(null)

  useResizer(browserRef, editorRef, resizerRef, lowerMainRef)
  // --------------------------------------------------------

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

  useEffect(() => {
    const body = document.body

    const baseFont = 16

    let newFontSize

    if (settings?.appearance.fontSize == 'small') {
      newFontSize = baseFont * 0.75
    } else if (settings?.appearance.fontSize == 'large') {
      newFontSize = baseFont * 1.5
    } else {
      newFontSize = baseFont
    }

    body.style.fontSize = `${newFontSize}px`

    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, a, input')

    elements.forEach((element) => {
      const htmlElement = element as HTMLElement
      htmlElement.style.fontSize = `${newFontSize}px`
    })
  }, [settings])

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
    if (!tabbedFiles.find((f) => f.path == file.path)) {
      tabbedFiles.push(file)
    }
    setActiveTab(file.path)
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
    ;(window as any).electron.saveSettings(newSettings)
    setSettings(newSettings)
    handleClose()
  }

  const onCloseWorkspace = () => {
    setWorkspace(null)
  }

  const saveDocument = () => {
    if (activeFile) {
      handleSaveFile(activeFile)
    }
  }

  const closeTab = (file: _File): void => {
    setTabbedFiles((prev) => prev.filter((f) => f.path !== file.path))

    // If the active tab is the closed tab, update the active tab to the first one if available
    if (activeTab === file.path) {
      const newActiveTab = tabbedFiles.length > 1 ? tabbedFiles[0].path : null
      setActiveTab(newActiveTab)
      setActiveFile(tabbedFiles.length > 1 ? tabbedFiles[0] : null)
    }

    // If no files are left, reset the active file and tab
    if (tabbedFiles.length === 1) {
      setActiveFile(null)
    }
  }

  const setActiveTabbedFile = (path: string) => {
    console.log('tabbed:', tabbedFiles)
    const file = tabbedFiles.find((f) => f.path === path)
    if (file) {
      setActiveFile(file)
      setActiveTab(file.path)
    }
  }

  return (
    <ThemeProvider theme={{ mode: settings?.appearance.theme }}>
      <div className="main">
        {settings && <GlobalStyle settings={settings} />}
        {settings && (
          <Navbar
            onSelectFile={handleFileSelect}
            onSelectFolder={handleFolderSelect}
            openTerminal={openTerminal}
            openSettings={handleOpenSettings}
            saveDocument={saveDocument}
            settings={settings}
          />
        )}
        <div className="lower-main" ref={lowerMainRef}>
          <div className="browser-container" ref={browserRef}>
            {settings && (
              <Browser
                Workspace={workspace}
                selectFile={handleBrowserFileSelect}
                onCloseWorkspace={onCloseWorkspace}
                settings={settings}
              />
            )}
          </div>
          <div className="resizer" ref={resizerRef}></div>
          <div className="editor-container" ref={editorRef}>
            <div className="tabs-container">
              {tabbedFiles.map((file) => (
                <div
                  key={file.path}
                  className={`tab pt-1 cursor-pointer ${
                    activeTab === file.path ? 'bg-white text-black' : ''
                  }`}
                  onClick={() => setActiveTabbedFile(file.path)}
                >
                  <p>{file.name}</p>
                  <span
                    className="closebtn ml-4 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      closeTab(file)
                    }}
                  >
                    ✕
                  </span>
                </div>
              ))}
            </div>
            {settings && (
              <Editor File={activeFile} _settings={settings} onSaveFile={handleSaveFile} />
            )}
          </div>
        </div>
        {isModalOpen && (
          <Modal
            mode={modalMode}
            _settings={settings}
            onClose={handleClose}
            onUpdateSettings={handleSettingsChange}
          />
        )}
      </div>
    </ThemeProvider>
  )
}

export default App
