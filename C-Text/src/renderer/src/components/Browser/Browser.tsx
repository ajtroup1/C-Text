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
    console.log('key: ', fileKey)

    // Recursive function to search for a file in the directory structure
    const findFileRecursive = (directory: Directory): FileInfo | undefined => {
      // Search in the current folder's files
      const file = directory.files.find((file) => file.key === fileKey)
      if (file) return file

      // Search recursively in all subfolders
      for (const folder of directory.folders) {
        const result = findFileRecursive(folder)
        if (result) return result // Return as soon as we find the file
      }

      return undefined // Return undefined if file is not found
    }

    // Search for the file starting from the root directory
    const selectedFile = repo ? findFileRecursive(repo) : undefined

    const binaryFileExtensions =
      /\.(exe|dll|png|jpg|jpeg|gif|bmp|pdf|zip|rar|7z|mp3|mp4|avi|mov|mkv|bin|iso|tar|gz)$/i

    if (selectedFile) {
      console.log('File found:', selectedFile)
      // Check for binary extensions
      if (binaryFileExtensions.test(selectedFile.name)) {
        alert(`The selected file (${selectedFile.name}) cannot be displayed.`)
        return
      }
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
