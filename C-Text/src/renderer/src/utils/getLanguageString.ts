function getLanguageString(extension: string): string {
  const languageMap: Record<string, string> = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    py: 'python',
    c: 'c',
    cpp: 'cpp',
    h: 'cpp',
    html: 'html',
    css: 'css',
    scss: 'scss',
    java: 'java',
    cs: 'csharp',
    rb: 'ruby',
    php: 'php',
    json: 'json',
    xml: 'xml',
    sql: 'sql',
    sh: 'shell',
    md: 'markdown',
    go: 'go',
    rs: 'rust',
    swift: 'swift',
    kotlin: 'kotlin',
    yaml: 'yaml',
    toml: 'toml',
    lua: 'lua',
    dart: 'dart'
  }

  return languageMap[extension] || 'plaintext';
}

export default getLanguageString