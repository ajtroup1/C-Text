export interface Settings {
  file: {
    autosave: boolean
  }
  appearance: {
    theme: string
    fontSize: number
  }
  editor: {
    cursorType: 'line' | 'block' | 'underline'
    fontSize: number // EDITOR font size, not the general font size
    highlightCurrentLine: boolean
    lineNumbers: boolean
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
  type: 'toggle';
  label: string;
  desc?: string;
};

export type DropdownConfig = {
  type: 'dropdown';
  label: string;
  options: string[];
  desc?: string;
};

export type NumberConfig = {
  type: 'number';
  label: string;
  desc?: string;
};

export type InputConfig = {
  type: 'input';
  label: string;
  desc?: string;
};

export type SettingField = 
  | ToggleConfig
  | DropdownConfig
  | NumberConfig
  | InputConfig;

export type SettingsMetadata = {
  [category: string]: {
    [key: string]: SettingField;
  };
};
