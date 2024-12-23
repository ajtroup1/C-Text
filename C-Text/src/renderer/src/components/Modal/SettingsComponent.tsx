import React, { useEffect, useState } from 'react'
import { Settings, SettingsMetadata } from '../../types/Settings.d'

const settingsMetadata: SettingsMetadata = {
  file: {
    autosave: {
      type: 'toggle',
      label: 'Autosave',
      desc: 'Autosaves at an interval of 1 second of typing inactivity.'
    }
  },
  appearance: {
    theme: {
      type: 'dropdown',
      label: 'Theme',
      options: ['light', 'dark'],
      desc: 'The theming affects appearance elements such as coloring, styling, fonts, etc.'
    },
    fontSize: {
      type: 'number',
      label: 'Font Size',
      desc: 'Font size for the C-Text app excluding the editor.'
    }
  },
  editor: {
    cursorType: {
      type: 'dropdown',
      label: 'Cursor Type',
      options: ['line', 'block', 'underline'],
      desc: 'The type of cursor denoter in the editor.\nMost modern editing software uses the "Line" cursor, and "Block" is associated with insert modes.\n"Underline" also exists.'
    },
    fontSize: {
      type: 'number',
      label: 'Font Size (Editor)',
      desc: 'Font size for the editor component only. This setting is independant of Appearance/Font Size.'
    },
    highlightCurrentLine: {
      type: 'toggle',
      label: 'Highlight Current Line',
      desc: 'Opaquely highlights the entire line where the cursor currently is.'
    },
    lineNumbers: {
      type: 'toggle',
      label: 'Show Line Numbers',
      desc: 'Show line numbers on the left side of the editor'
    }
  },
  defaultWorkspace: {
    path: {
      type: 'input',
      label: 'Default Workspace Path',
      desc: 'This is the location on your machine where new workspaces will be generated upon selecting "New Workspace".'
    }
  },
  formatting: {
    formatOnSave: {
      type: 'toggle',
      label: 'Format On Save',
      desc: 'Automatically format on *manual* save.'
    },
    tabSize: {
      type: 'number',
      label: 'Tab Size',
      desc: 'The amount of spaces contained within a tab character in C-Text. It is common practice to use 4 (default) or 2.'
    },
    unifyQuotes: {
      type: 'toggle',
      label: 'Unify Quotes',
      desc: 'On format, this will convert all significant quotes to either single or double (specified by Quote Type below).'
    },
    quoteType: {
      type: 'dropdown',
      label: 'Quote Type',
      options: ['single', 'double'],
      desc: 'On "Unify Quotes", use either single or double quotes.'
    }
  }
}

function SettingsComponent({
  settings,
  onUpdate
}: {
  settings: Settings
  onUpdate: (newSettings: Settings) => void
}) {
  const [localSettings, setLocalSettings] = useState(settings)

  const handleChange = (category: string, key: string, value: any) => {
    const updated = { ...localSettings, [category]: { ...localSettings[category], [key]: value } }
    setLocalSettings(updated)
    onUpdate(updated)
    console.log('UPDATED: ', updated)
  }

  const capitalize = (v: string) => {
    return v.charAt(0)?.toUpperCase() + v.slice(1)
  }

  return (
    <div className="settings-form">
      {Object.entries(settingsMetadata).map(([category, fields]) => (
        <div key={category} className="settings-category">
          <h3 className="settings-category">{capitalize(category)}</h3>
          {Object.entries(fields).map(([key, config]) => (
            <div key={key} className="settings-item">
              <label className="settings-option">{config.label}</label>
              {config.type === 'dropdown' && (
                <select
                  className="settings-select"
                  value={localSettings[category][key]}
                  onChange={(e) => handleChange(category, key, e.target.value)}
                >
                  {config.options.map((option) => (
                    <option key={option} value={option}>
                      {capitalize(option)}
                    </option>
                  ))}
                </select>
              )}
              {config.type === 'toggle' && (
                <div className='settings-checkbox-container'>
                  {localSettings[category][key] === true ? (
                    <p>Enabled</p>
                  ) : (
                    <p>Disabled</p>
                  )}
                  <input
                    type="checkbox"
                    checked={localSettings[category][key]}
                    onChange={(e) => handleChange(category, key, e.target.checked)}
                  />
                </div>
              )}
              {config.type === 'number' && (
                <input
                  type="number"
                  value={localSettings[category][key]}
                  onChange={(e) => handleChange(category, key, Number(e.target.value))}
                />
              )}
              {config.type === 'input' && (
                <input
                  type="text"
                  value={localSettings[category][key]}
                  onChange={(e) => handleChange(category, key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default SettingsComponent
