import React from 'react'

interface FileDialogProps {
  closeDialog: () => void // function to close the dialog
}

function FileDialog({ closeDialog }: FileDialogProps): JSX.Element {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>File Dialog</h2>
        <p>Here is the content of the dialog.</p>
        <button onClick={closeDialog}>Close</button>
      </div>
    </div>
  )
}

export default FileDialog
