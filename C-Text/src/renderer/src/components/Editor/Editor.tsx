import { useEffect, useState, useRef } from 'react'
import '../../assets/css/editor.css'
import { _File } from '../../types/Directory.d'
import MonacoEditor from './MonacoEditor'
import getLanguageString from '@renderer/utils/getLanguageString'
import getFileExtension from '@renderer/utils/getFileExtension'
import { Settings } from '@renderer/types/Settings.d'

interface EditorProps {
  File: _File | null
  _settings: Settings
  onSaveFile: (updatedFile: _File) => void
}

function Editor({ File, _settings, onSaveFile }: EditorProps): JSX.Element {
  const [settings, setSettings] = useState<Settings>(_settings)
  const [activeFile, setActiveFile] = useState<_File | null>(null)
  const [fileContent, setFileContent] = useState<string>('')

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const fileContentRef = useRef<string>('')

  useEffect(() => {
    setSettings(_settings)
  }, [_settings])

  useEffect(() => {
    if (File && File !== activeFile) {
      setActiveFile(File)
      setFileContent(File.content)
      fileContentRef.current = File.content
    }
  }, [File])

  const handleContentChange = (newContent: string) => {
    setFileContent(newContent) // Update state with new content
    fileContentRef.current = newContent

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      handleSave()
    }, 1000)
  }

  const handleSave = () => {
    if (activeFile && fileContentRef.current !== activeFile.content) {
      const updatedFile = { ...activeFile, content: fileContentRef.current }
      console.log('Saving content:', updatedFile.content)
      onSaveFile(updatedFile)
    }
  }

  return (
    <div className="editor-main">
      {File ? (
        <div className="file-chosen-editor-container">
          <div className="filename-editor-container">
            <p>
              {File.name} ({File.path})
            </p>
          </div>
          <div className="editor-main-content-container">
            <MonacoEditor
              value={fileContent}
              language={getLanguageString(getFileExtension(File.name))}
              filePath={File.path}
              _settings={settings}
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
