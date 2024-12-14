import Browser from './Browser/Browser'
import Editor from './Editor/Editor'
import { useEffect, useState } from 'react'
import Taskbar from './Taskbar/Taskbar'

function App(): JSX.Element {
  useEffect(() => {
    const resizer = document.querySelector('.resizer') as HTMLElement
    const editor = document.querySelector('.editor-container') as HTMLElement
    const browser = document.querySelector('.browser-container') as HTMLElement

    if (!resizer || !editor || !browser) {
      console.error('Required elements are missing from the DOM')
      return
    }

    let isDragging = false

    const handleMouseDown = () => {
      isDragging = true
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const offsetX = e.clientX
      const totalWidth = resizer.parentElement?.offsetWidth || 0

      const newBrowserWidth = Math.max(150, offsetX)
      const newEditorWidth = Math.max(150, totalWidth - offsetX - resizer.offsetWidth)

      browser.style.width = `${newBrowserWidth}px`
      editor.style.width = `${newEditorWidth}px`
    }

    const handleMouseUp = () => {
      isDragging = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    resizer.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      resizer.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div className="main">
      <div className="taskbar-container">
        <Taskbar />
      </div>
      <div className="below-taskbar">
        <div className="browser-container">
          <Browser />
        </div>
        <div className="resizer"></div>
        <div className="editor-container">
          <Editor />
        </div>
      </div>
    </div>
  )
}

export default App
