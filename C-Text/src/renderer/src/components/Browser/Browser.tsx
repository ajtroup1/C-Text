import { Directory, _File } from '@renderer/types/Directory.d'
import '../../assets/css/browser.css'
import { useState, useEffect } from 'react'

interface BrowserProps {
  Workspace: Directory | null
  selectFile: (file: _File) => void
}

function Browser({ Workspace, selectFile }: BrowserProps): JSX.Element {
  const [repo, setRepo] = useState<Directory | null>(null)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())
  const [selectedFile, setSelectedFile] = useState<_File | null>(null)

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
          style={{ paddingLeft: `${level * 20}px`, cursor: 'pointer' }}
          onClick={() => toggleFolder(folderPath)}
        >
          <span>{expandedFolders.has(folderPath) ? '[-]' : '[+]'}</span> {directory.name}
        </div>

        {directory.files && (
          <div style={{ paddingLeft: `${(level + 1) * 20}px` }}>
            {directory.files.map((file) => (
              <div key={file.path} style={{ marginBottom: '5px' }}>
                <span style={{ cursor: 'pointer' }} onClick={() => handleSelectFile(file)}>
                  - {file.name}
                </span>
              </div>
            ))}
          </div>
        )}
        {expandedFolders.has(folderPath) && directory.folders && (
          <div style={{ paddingLeft: `${(level + 1) * 20}px` }}>
            {directory.folders.map((subfolder) => renderDirectory(subfolder, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const handleSelectFile = async (file: _File) => {
    setSelectedFile(file) // First, set the file as selected
    try {
      const content = await fetchFileContent(file) // Fetch content asynchronously
      const updatedFile = { ...file, content } // Update the file with content
      selectFile(updatedFile) // Pass the updated file to the parent component
    } catch (error) {
      console.error('Error fetching file content:', error)
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
