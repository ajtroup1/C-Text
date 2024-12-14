import React, { useRef, useState } from 'react'

function Taskbar(): JSX.Element {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState)
  }

  return (
    <div className="taskbar-main">
      <div className="taskbar-option" onClick={toggleDropdown}>
        <p>File</p>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <p>New File</p>
            <p>Open</p>
            <p>Save</p>
            <p>Exit</p>
          </div>
        )}
      </div>

      <div className="taskbar-option">
        <p>Edit</p>
      </div>
      <div className="taskbar-option">
        <p>View</p>
      </div>
      <div className="taskbar-option">
        <p>Terminal</p>
      </div>

      {/* {fileName && (
        <div>
          <h3>File Name: {fileName}</h3>
          <pre>{fileContent}</pre>
        </div>
      )} */}
    </div>
  )
}

export default Taskbar
