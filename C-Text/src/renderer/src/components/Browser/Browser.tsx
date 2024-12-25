import { Directory, _File, FileInfo, Folder } from '@renderer/types/Directory.d'
import '../../assets/css/browser.css'
import { useState, useEffect } from 'react'
import returnImgPath from '@renderer/utils/getFileIcon'
import getFileExtension from '@renderer/utils/getFileExtension'
import { Settings } from '@renderer/types/Settings.d'

interface BrowserProps {
  Workspace: Directory | null
  selectFile: (fileoath: string) => void
  onCloseWorkspace: () => void
  settings: Settings
}

function Browser({ Workspace, selectFile, onCloseWorkspace, settings }: BrowserProps): JSX.Element {
  const [repo, setRepo] = useState<Directory | null>(null)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())
  const [loadingSettings, setLoadingSettings] = useState<boolean>(true)

  useEffect(() => {
    if (settings) {
      setLoadingSettings(false)
    }
  }, [settings])

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
          * {directory.name}
        </div>

        {expandedFolders.has(folderPath) && (
          <div style={{ paddingLeft: `${(level + 1) * 10}px` }}>
            {/* Render files */}
            {directory.files &&
              directory.files.map((file) => (
                <div key={file.key} style={{ marginBottom: '2%' }}>
                  <span
                    style={{ cursor: 'pointer', display: 'flex' }}
                    onClick={() => handleSelectFile(file.key)}
                  >
                    {
                      <div className="file-type-icon-browser-container">
                        <img
                          src={
                            file.name.toLowerCase() === 'makefile'
                              ? returnImgPath('makefile')
                              : returnImgPath(getFileExtension(file.name))
                          }
                          id="file-type-icon-browser"
                        />
                      </div>
                    }{' '}
                    - {file.name}
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

  const handleSelectFile = async (fileKey: string) => {
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
      if (binaryFileExtensions.test(selectedFile.name)) {
        alert(`The selected file (${selectedFile.name}) cannot be displayed.`)
        return
      }
      selectFile(selectedFile.path)
    } else {
      console.log('File not found')
    }
  }

  const handleCloseWorkspace = () => {
    setRepo(null)
    onCloseWorkspace()
  }

  return (
    <div className={`browser-main`}>
      {repo ? (
        <div className={`dir-chosen-browser-container ${settings.appearance.theme === 'light' && 'bg-white'}`}>
          <div className={`repo-name-browser-container ${settings.appearance.theme === 'light' && 'bg-gray-300 text-black'}`}>
            <p>Workspace: {repo.name}</p>
            <button className="btn btn-danger close-workspace-btn" onClick={handleCloseWorkspace}>
              Close Workspace
            </button>
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
