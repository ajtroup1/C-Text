export interface Settings {
  file: {
    autosave: boolean
  }
  appearance: {
    theme: string
    fontSize: 'small' | 'medium' | 'large'
  }
  editor: {
    cursorType: 'line' | 'block' | 'underline'
    fontSize: number // EDITOR font size, not the general font size
    highlightCurrentLine: boolean
    lineNumbers: boolean
    theme:
      | 'light_1'
      | 'dark_1'
      | 'light_2'
      | 'dark_2'
      | 'monokai'
      | 'nord'
      | 'solarized-dark'
      | 'twilight'
      | 'active4d'
      | 'all-hallows-eve'
      | 'amy'
      | 'birds-of-paradise'
      | 'blackboard'
      | 'brilliance-black'
      | 'brilliance-dull'
      | 'chrome-devtools'
      | 'clouds-midnight'
      | 'clouds'
      | 'cobalt'
      | 'cobalt2'
      | 'dawn'
      | 'dominion-day'
      | 'dracula'
      | 'dreamweaver'
      | 'eiffel'
      | 'espresso-libre'
      | 'github-dark'
      | 'github-light'
      | 'github'
      | 'idle'
      | 'idlefingers'
      | 'iplastic'
      | 'katzenmilch'
      | 'krtheme'
      | 'kuroir-theme'
      | 'lazy'
      | 'magicwb'
      | 'merbivore'
      | 'merbivore-soft'
      | 'monoindustrial'
      | 'monokai-bright'
      | 'night-owl'
      | 'oceanic-next'
      | 'pastels-on-dark'
      | 'slush-and-poppies'
      | 'solarized-light'
      | 'space-cadet'
      | 'sunburst'
      | 'textmate'
      | 'tomorrow-night-blue'
      | 'tomorrow-night-bright'
      | 'tomorrow-night-eighties'
      | 'tomorrow-night'
      | 'tomorrow'
      | 'upstream-sunburst'
      | 'vibrant-ink'
      | 'zenburnesque'
  }
  defaultWorkspace: {
    path: string
  }
  formatting: {
    formatOnSave: boolean
    tabSize: number
    unifyQuotes: boolean
    quoteType: 'double' | 'single'
  }
}

export type ToggleConfig = {
  type: 'toggle'
  label: string
  desc?: string
}

export type DropdownConfig = {
  type: 'dropdown'
  label: string
  options: string[]
  desc?: string
}

export type NumberConfig = {
  type: 'number'
  label: string
  desc?: string
}

export type InputConfig = {
  type: 'input'
  label: string
  desc?: string
}

export type SettingField = ToggleConfig | DropdownConfig | NumberConfig | InputConfig

export type SettingsMetadata = {
  [category: string]: {
    [key: string]: SettingField
  }
}
