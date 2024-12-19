import { Directory, _File, FileInfo } from '@renderer/types/Directory.d'
import '../../assets/css/browser.css'
import { useState, useEffect } from 'react'

interface BrowserProps {
  Workspace: Directory | null
  selectFile: (fileoath: string) => void
}

function Browser({ Workspace, selectFile }: BrowserProps): JSX.Element {
  const [repo, setRepo] = useState<Directory | null>(null)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

  useEffect(() => {
    setRepo(Workspace)
  }, [Workspace])

  const toggleFolder = (folderPath: string) => {
    setExpandedFolders((prev) => {
      const newExpandedFolders = new Set(prev)
      if (newExpandedFolders.has(folderPath)) {
        newExpandedFolders.delete(folderPath)
      } else {
        newExpandedFolders.add(folderPath)
      }
      return newExpandedFolders
    })
  }

  const renderDirectory = (directory: Directory, level: number) => {
    const folderPath = directory.path

    return (
      <div key={folderPath}>
        <div
          style={{ paddingLeft: `${level * 10}px`, cursor: 'pointer' }}
          onClick={() => toggleFolder(folderPath)}
        >
          <span>{expandedFolders.has(folderPath) ? '[-]' : '[+]'}</span> {directory.name}
        </div>

        {directory.files && (
          <div style={{ paddingLeft: `${(level + 1) * 10}px` }}>
            {directory.files.map((file) => (
              <div key={file.key} style={{ marginBottom: '5px' }}>
                <span style={{ cursor: 'pointer' }} onClick={() => handleSelectFile(file.key)}>
                  - {file.name}
                </span>
              </div>
            ))}
          </div>
        )}
        {expandedFolders.has(folderPath) && directory.folders && (
          <div style={{ paddingLeft: `${(level + 1) * 10}px` }}>
            {directory.folders.map((subfolder) => renderDirectory(subfolder, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const handleSelectFile = async (fileKey: string) => {
    // Search for the file where its key matches the passed fileKey
    console.log("key: ", fileKey)
    console.log("repo files: ", repo?.files)
    const selectedFile = repo?.files.find((file) => file.key === fileKey)

    // If the file is found, select it
    if (selectedFile) {
      console.log('File found:', selectedFile)
      selectFile(selectedFile.path)
    } else {
      console.log('File not found')
    }
  }

  return (
    <div className="browser-main">
      {repo ? (
        <div className="dir-chosen-browser-container">
          <div className="repo-name-browser-container">
            <p>Browsing repository: {repo.name}</p>
          </div>
          <div className="dir-contents-container">{renderDirectory(repo, 0)}</div>
        </div>
      ) : (
        <div className="no-dir-browser-container">
          <p>Choose a repository to browse.</p>
        </div>
      )}
    </div>
  )
}

export default Browser
