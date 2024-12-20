export interface AppearanceSettings {
  theme: 'light' | 'dark'
  fontSize: 'small' | 'medium' | 'large'
}

export interface EditorSettings {
  tabSpacing: number
}

export interface DefaultWorkspaceSettings {
  defaultWorkspacePath: string
}

export interface AppSettings {
  appearance: AppearanceSettings
  editor: EditorSettings
  defaultWorkspace: DefaultWorkspaceSettings
}