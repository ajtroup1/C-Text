import React, { useState } from 'react'
import Tabs from './Tabs'
import '../../assets/css/Editor.css'

function Editor(): JSX.Element {
  return (
    <div className="editor-main">
      <div className="tabs-container">
        <Tabs />
      </div>
      <div className="below-tabs">
        <div className="text-container">
          <textarea
          // Update file content when edited
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default Editor
