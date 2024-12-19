import React, { useState, useRef } from 'react'
import Navbar from './Navbar/Navbar'
import Browser from './Browser/Browser'
import Editor from './Editor/Editor'
import { Directory, File } from '@renderer/types/Directory.d'
import { useResizer } from '../hooks/useResizer'

function App(): JSX.Element {
  const [debugging, setDebugging] = useState<boolean>(true)
  const [workspace, setWorkspace] = useState<Directory | null>(null)
  const [activeFile, setActiveFile] = useState<File | null>(null)

  // --------------------------------------------------------
  // RESIZING FOR EDITOR / BROSWER WIDTH
  const browserRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const resizerRef = useRef<HTMLDivElement>(null)
  const lowerMainRef = useRef<HTMLDivElement>(null)

  useResizer(browserRef, editorRef, resizerRef, lowerMainRef)
  // --------------------------------------------------------

// ------------------------------------------------

// --------- --- 

  const handleFileSelect = (file: File) => {
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

  const handleSaveFile = async (updatedFile: File) => {
    if (debugging) {
      console.log(updatedFile)
    }
    setActiveFile(updatedFile)
    await (window as any).electron.saveFile(updatedFile.path, updatedFile.content)
  }

  return (
    <div className="main">
      <Navbar onSelectFile={handleFileSelect} onSelectFolder={handleFolderSelect} />
      <div className="lower-main" ref={lowerMainRef}>
        <div className="browser-container" ref={browserRef}>
          <Browser Workspace={workspace} />
        </div>
        <div className="resizer" ref={resizerRef}></div>
        <div className="editor-container" ref={editorRef}>
          <Editor File={activeFile} onSaveFile={handleSaveFile} />
        </div>
      </div>
    </div>
  )
}

export default App
