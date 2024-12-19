import { useEffect, useState, useRef } from 'react'
import '../../assets/css/editor.css'
import { _File } from '../../types/Directory.d'

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
    if (File && !activeFile) {
      setActiveFile(File)
      setFileContent(File.content)
      fileContentRef.current = File.content
    }
  }, [File, activeFile])

  // Handle changes FROM the parent component TO the editor
  useEffect(() => {
    if (File) {
      setFileContent(File.content)
      setActiveFile(File)
    }
  }, [File])

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

  // Handle Tab key press to insert spaces
  const handleTabPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault() // Prevent default tab behavior

      const textarea = textareaRef.current
      if (textarea) {
        const cursorStart = textarea.selectionStart
        const cursorEnd = textarea.selectionEnd

        const newContent = fileContent.slice(0, cursorStart) + '  ' + fileContent.slice(cursorEnd) // 4 spaces

        setFileContent(newContent)

        // Set the cursor position to right after the inserted spaces
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = cursorStart + 2
        })
      }
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      // Ensure that cursor remains after content changes
      const cursorPosition = textareaRef.current.selectionStart
      textareaRef.current.selectionStart = textareaRef.current.selectionEnd = cursorPosition
    }
  }, [fileContent])

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
            <textarea
              ref={textareaRef}
              value={fileContent}
              onChange={handleContentChange}
              onKeyDown={handleTabPress}
              className="editor-textarea"
              spellCheck="false"
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
