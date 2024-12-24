import React, { useEffect, useState } from 'react'
import '../../assets/css/modal.css'
import { Settings } from '../../types/Settings.d'
import SettingsComponent from './SettingsComponent'

interface ModalProps {
  mode: string
  _settings?: Settings | null
  onClose: () => void
  onUpdateSettings: (updatedSettings: Settings) => void
}

const Modal: React.FC<ModalProps> = ({ mode, _settings, onClose, onUpdateSettings }) => {
  const [settings, setSettings] = useState<Settings | null>(null)

  useEffect(() => {
    if (_settings) {
      setSettings(_settings)
    }
  }, [])

  const handleUpdate = (newSettings: Settings | null | undefined) => {
    if (newSettings) {
      setSettings(newSettings)
    }
  }

  const saveSettingsChanges = () => {
    if (settings) {
      onUpdateSettings(settings)
    }
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
              <div className="settings-inner-container">
                <SettingsComponent settings={settings} onUpdate={handleUpdate} />{' '}
              </div>
            )}
            <div className="settings-btns-container">
              <button
                className="btn btn-primary"
                id="accept-settings-btn"
                onClick={() => saveSettingsChanges()}
              >
                Accept Changes
              </button>
              <button className="btn btn-danger" id="decline-settings-btn" onClick={onClose}>
                Decline Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
