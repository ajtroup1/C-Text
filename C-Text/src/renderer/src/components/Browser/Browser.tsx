import { Directory } from '@renderer/types/Directory.d'
import '../../assets/css/browser.css'
import { useEffect, useState } from 'react'

interface BrowserProps {
  Workspace: Directory | null
}

function Browser({ Workspace }: BrowserProps): JSX.Element {
  const [repo, setRepo] = useState<Directory | null>(null)

  useEffect(() => {
    setRepo(Workspace) 
  }, [Workspace]) 

  return (
    <div className="browser-main">
      {repo ? (
        <p>You have chosen a repo.</p>
      ) : (
        <div className="no-dir-browser-container">
          <p>Choose a repository to browse.</p>
        </div>
      )}
    </div>
  )
}

export default Browser
