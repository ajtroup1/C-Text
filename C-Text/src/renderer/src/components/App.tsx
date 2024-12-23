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
  const [debugging, setDebugging] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalMode, setModalMode] = useState<string>('settings')
  const [workspace, setWorkspace] = useState<Directory | null>(null)
  const [activeFile, setActiveFile] = useState<_File | null>(null)
  const [tabbedFiles, setTabbedFiles] = useState<_File[]>([])
  const [activeTabbedFileId, setActiveTabbedFileId] = useState<string | null>(null)

  useEffect(() => {
    if (activeFile) {
      const found = tabbedFiles.find((f) => f.path == activeFile.path)
      if (!found) {
        tabbedFiles.push(activeFile)
        setActiveTabbedFileId(activeFile.path)
      }
    }
  }, [activeFile])

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
      // Cast element to HTMLElement to access the style property
      const htmlElement = element as HTMLElement
      htmlElement.style.fontSize = `${newFontSize}px`
    })
  }, [settings])

  const handleTabClick = (path: string) => {
    setActiveTabbedFileId(path)
    const foundFile = tabbedFiles.find((f) => f.path === path)
    if (foundFile) {
      setActiveFile(foundFile)
    } else {
      //
    }
  }

  const handleTabClose = (index: number) => {
    const updatedTabs = tabbedFiles.filter((_, i) => i !== index)
    setTabbedFiles(updatedTabs)
    if (updatedTabs.length > 0) {
      const nextActiveFile = updatedTabs[0]
      setActiveTabbedFileId(nextActiveFile.path)
      setActiveFile(nextActiveFile)
    } else {
      setActiveTabbedFileId(null)
      setActiveFile(null)
    }
  }

  const handleFileSelect = (file: _File) => {
    if (debugging) {
      console.log('Selected file from navbar: ', file)
    }

    const found = tabbedFiles.find((f) => f.path === file.path)
    if (found) {
      setActiveFile(file)
      setActiveTabbedFileId(file.path)
    } else {
      tabbedFiles.push(file)
      setActiveFile(file)
      setActiveTabbedFileId(file.path)
    }
  }

  const handleFolderSelect = (folder: Directory) => {
    if (debugging) {
      console.log(folder)
    }
    setWorkspace(folder)
  }

  const handleSaveFile = async (updatedFile: _File) => {
    if (debugging) {
      console.log('UPDATED FILE CONTENT:', updatedFile)
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

  return (
    <ThemeProvider theme={{ mode: settings?.appearance.theme }}>
      <div className="main">
        {settings && <GlobalStyle settings={settings} />}
        <Navbar
          onSelectFile={handleFileSelect}
          onSelectFolder={handleFolderSelect}
          openTerminal={openTerminal}
          openSettings={handleOpenSettings}
          saveDocument={saveDocument}
        />
        <div className="lower-main" ref={lowerMainRef}>
          <div className="browser-container" ref={browserRef}>
            <Browser
              Workspace={workspace}
              selectFile={handleBrowserFileSelect}
              onCloseWorkspace={onCloseWorkspace}
            />
          </div>
          <div className="resizer" ref={resizerRef}></div>
          <div className="editor-container" ref={editorRef}>
            <div className="tabs-container">
              {tabbedFiles.map((file, index) => (
                <div
                  key={index}
                  className={`tab-container ${file.path === activeTabbedFileId ? 'active-tab' : ''}`}
                  onClick={() => handleTabClick(file.path)}
                >
                  <p className="tab-name">{file.name}</p>
                  <div
                    className="close-tab-btn-container"
                    onClick={(e) => {
                      e.stopPropagation() 
                      handleTabClose(index)
                    }}
                  >
                    <p>x</p>
                  </div>
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
