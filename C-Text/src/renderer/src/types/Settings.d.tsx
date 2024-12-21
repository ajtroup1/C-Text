export interface FileSettings {
  autosave: boolean
}

export interface AppearanceSettings {
  theme: 'light' | 'dark'
  fontSize: 'small' | 'medium' | 'large'
}

export interface EditorSettings {
  cursorType: 'line' | 'block' | 'underline'
  highlightCurrentLine: boolean
  showLineNumbers: boolean
}

export interface DefaultWorkspaceSettings {
  defaultWorkspacePath: string
}

export interface FormattingSettings {
  formatOnSave: boolean
  tabSize: number
  indentation: 'spaces' | 'tabs'
  quoteType: 'single' | 'double'
}

export interface AppSettings {
  file: FileSettings
  appearance: AppearanceSettings
  editor: EditorSettings
  defaultWorkspace: DefaultWorkspaceSettings
  formatting: FormattingSettings
}