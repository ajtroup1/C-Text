import { Directory, _File, FileInfo, Folder } from '@renderer/types/Directory.d'
import '../../assets/css/browser.css'
import { useState, useEffect } from 'react'
import returnImgPath from '@renderer/utils/getFileIcon'

interface BrowserProps {
  Workspace: Directory | null
  selectFile: (fileoath: string) => void
}

function Browser({ Workspace, selectFile }: BrowserProps): JSX.Element {
  const [repo, setRepo] = useState<Directory | null>(null)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (Workspace) {
      setRepo(Workspace)
    }
  }, [Workspace])

  const toggleFolder = (folderPath: string) => {
    setExpandedFolders((prevExpanded) => {
      const newExpanded = new Set(prevExpanded)
      if (newExpanded.has(folderPath)) {
        newExpanded.delete(folderPath)
      } else {
        newExpanded.add(folderPath)
      }
      return newExpanded
    })
  }

  const renderDirectory = (directory: Directory, level: number) => {
    const folderPath = directory.path
    const folderName = directory.name // TODO: handle special folder type images

    return (
      <div key={folderPath}>
        <div
          style={{ paddingLeft: `${level * 10}px`, cursor: 'pointer', marginBottom: '2%' }}
          onClick={() => toggleFolder(folderPath)}
        >
          <span style={{ paddingRight: '0.7%' }}>
            {expandedFolders.has(folderPath) ? (
              <img src={returnImgPath('collapse-ctext')} id="collapse-img-browser" />
            ) : (
              <img src={returnImgPath('folder')} id="folder-icon-browser" />
            )}
          </span>{' '}
          {directory.name}
        </div>

        {expandedFolders.has(folderPath) && (
          <div style={{ paddingLeft: `${(level + 1) * 10}px` }}>
            {/* Render files */}
            {directory.files &&
              directory.files.map((file) => (
                <div key={file.key} style={{ marginBottom: '2%' }}>
                  <span style={{ cursor: 'pointer', display: 'flex' }} onClick={() => handleSelectFile(file.key)}>
                    {
                      <div className="file-type-icon-browser-container">
                        <img
                          src={returnImgPath(getFileExtension(file.name))}
                          id="file-type-icon-browser"
                        />
                      </div>
                    }{' '}
                    {file.name}
                  </span>
                </div>
              ))}

            {/* Render subfolders */}
            {directory.folders &&
              directory.folders.map((subfolder) => renderDirectory(subfolder, level + 1))}
          </div>
        )}
      </div>
    )
  }

  function getFileExtension(fileName: string): string {
    const parts = fileName.split('.')
    return parts.length > 1 ? parts.pop()! : ''
  }

  const handleSelectFile = async (fileKey: string) => {
    console.log('key: ', fileKey)

    const findFileRecursive = (directory: Directory): FileInfo | undefined => {
      const file = directory.files.find((file) => file.key === fileKey)
      if (file) return file

      for (const folder of directory.folders) {
        const result = findFileRecursive(folder)
        if (result) return result
      }

      return undefined
    }

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
