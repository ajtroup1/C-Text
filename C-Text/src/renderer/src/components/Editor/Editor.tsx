import { useEffect, useState } from 'react'
import '../../assets/css/editor.css'
import { File } from '../../types/Directory.d'

interface EditorProps {
  File: File | null
}

function Editor({ File }: EditorProps): JSX.Element {
  const [activeFile, setActiveFile] = useState<File | null>(null)

  useEffect(() => {
    setActiveFile(File)
  }, [File])

  return (
    <div className="editor-main">
      {activeFile ? (
        <p>There is a file here</p>
      ) : (
        <div className="no-file-editor-container">
          <div className='clear-logo-editor-container'>
            <img src="../src/assets/geometric-logo-abstract-2ba9b8.webp" />
            <div className="glitter"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Editor
