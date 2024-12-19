import { useEffect, useState, useRef } from 'react'
import '../../assets/css/editor.css'
import { File } from '../../types/Directory.d'

interface EditorProps {
  File: File | null
  onSaveFile: (updatedFile: File) => void 
}

function Editor({ File, onSaveFile }: EditorProps): JSX.Element {
  const [activeFile, setActiveFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<string>('')

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const bufferTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const fileContentRef = useRef<string>('')

  useEffect(() => {
    if (File && !activeFile) {
      setActiveFile(File)
      setFileContent(File.content)
      fileContentRef.current = File.content 
    }
  }, [File, activeFile])

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value
    setFileContent(newContent)
    fileContentRef.current = newContent

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    if (bufferTimeoutRef.current) {
      clearTimeout(bufferTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      bufferTimeoutRef.current = setTimeout(() => {
        handleSave() 
      }, 250)
    }, 1000)
  }

  const handleSave = () => {
    if (activeFile && fileContentRef.current !== activeFile.content) {
      const updatedFile = { ...activeFile, content: fileContentRef.current }
      onSaveFile(updatedFile) 
    }
  }

  return (
    <div className="editor-main">
      {activeFile ? (
        <div className="file-chosen-editor-container">
          <div className="filename-editor-container">
            <p>{activeFile.name} ({activeFile.path})</p>
          </div>
          <div className="editor-main-content-container">
            <textarea
              value={fileContent} 
              onChange={handleContentChange} 
              className="editor-textarea"
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
