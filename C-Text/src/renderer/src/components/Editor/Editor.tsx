import { useEffect, useState, useRef } from 'react'
import '../../assets/css/editor.css'
import { _File } from '../../types/Directory.d'
import MonacoEditor from './MonacoEditor'
import getLanguageString from '@renderer/utils/getLanguageString'
import getFileExtension from '@renderer/utils/getFileExtension'

interface EditorProps {
  File: _File | null
  onSaveFile: (updatedFile: _File) => void
}

function Editor({ File, onSaveFile }: EditorProps): JSX.Element {
  const [activeFile, setActiveFile] = useState<_File | null>(null)
  const [fileContent, setFileContent] = useState<string>('')

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const bufferTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const fileContentRef = useRef<string>('')

  // Handle hanges FROM editor TO the parent component
  useEffect(() => {
    if (File && File !== activeFile) {
      setActiveFile(File) // Only update if it's a different file
      setFileContent(File.content)
      fileContentRef.current = File.content
    }
  }, [File]) // Only update when the 'File' prop changes

  const handleContentChange = (newContent: string) => {
    setFileContent(newContent)
    fileContentRef.current = newContent

    // Debouncing the save to prevent excessive calls
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      handleSave()
    }, 1000) // Save after 1 second of no typing
  }

  const handleSave = () => {
    if (activeFile && fileContentRef.current !== activeFile.content) {
      const updatedFile = { ...activeFile, content: fileContentRef.current }
      onSaveFile(updatedFile) // Trigger the parent save handler
    }
  }

  return (
    <div className="editor-main">
      {activeFile ? (
        <div className="file-chosen-editor-container">
          <div className="filename-editor-container">
            <p>
              {activeFile.name} ({activeFile.path})
            </p>
          </div>
          <div className="editor-main-content-container">
            <MonacoEditor
              value={activeFile.content}
              language={getLanguageString(getFileExtension(activeFile.name))}
              filePath={activeFile.path}
              onChange={handleContentChange}
            />
          </div>
        </div>
      ) : (
        <div className="no-file-editor-container">
          <div className="clear-logo-editor-container">
            <img src="../src/assets/geometric-logo-abstract-2ba9b8.webp" alt="logo" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Editor
