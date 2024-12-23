import React, { useEffect, useState } from 'react'
import '../../assets/css/modal.css'
import { Settings } from '../../types/Settings.d'
import SettingsComponent from './SettingsComponent'

interface ModalProps {
  mode: string
  settings?: Settings | null
  onClose: () => void
  onUpdateSettings: (updatedSettings: Settings) => void
}

const Modal: React.FC<ModalProps> = ({ mode, settings, onClose, onUpdateSettings }) => {
  // Update function for handling settings changes
  const handleUpdate = (newSettings: Settings) => {
    onUpdateSettings(newSettings)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {mode === 'settings' && (
          <div className="modal-content">
            <h2 className="modal-title">Settings</h2>
            {settings && (
              <div className='settings-inner-container'>
                <SettingsComponent settings={settings} onUpdate={handleUpdate} />{' '}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
