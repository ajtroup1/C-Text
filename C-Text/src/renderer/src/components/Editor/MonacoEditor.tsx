import { useRef, useEffect, useState } from 'react'
import * as monaco from 'monaco-editor'
import { Settings } from '@renderer/types/Settings.d'

interface MonacoEditorProps {
  value: string
  language: string
  filePath: string // Unique identifier for the file
  _settings: Settings
  onChange: (newContent: string) => void
}

function MonacoEditor({
  value,
  language,
  filePath,
  _settings,
  onChange
}: MonacoEditorProps): JSX.Element {
  const [settings, setSettings] = useState<Settings>(_settings)
  const editorRef = useRef<HTMLDivElement | null>(null)
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const modelRef = useRef<monaco.editor.ITextModel | null>(null)
  const fileContentRef = useRef<string>('')

  useEffect(() => {
    setSettings(_settings)
    console.log('asda', _settings)
  }, [_settings])

  useEffect(() => {
    if (editorRef.current && !monacoInstance.current) {
      const modelUri = monaco.Uri.file(filePath)

      // Create or reuse the model only for the specific file
      let model = monaco.editor.getModel(modelUri)
      if (!model) {
        model = monaco.editor.createModel(value, language, modelUri)
      }

      monacoInstance.current = monaco.editor.create(editorRef.current, {
        model,
        theme:
          settings.editor.theme === 'light_1'
            ? 'vs'
            : settings.editor.theme === 'light_2'
              ? 'hc-light'
              : settings.editor.theme === 'dark_1'
                ? 'vs-dark'
                : 'hc-dark',
        automaticLayout: true,
        fontSize: settings.editor.fontSize,
        cursorStyle: settings.editor.cursorType,
        renderLineHighlight: settings.editor.highlightCurrentLine ? 'all' : 'none',
        lineNumbers: settings.editor.lineNumbers ? 'on' : 'off'
      })

      monacoInstance.current.onDidChangeModelContent(() => {
        const newValue = model?.getValue() ?? ''
        if (newValue !== fileContentRef.current) {
          onChange(newValue)
        }
      })

      modelRef.current = model
    }

    return () => {
      monacoInstance.current?.dispose()
      modelRef.current?.dispose()
      monacoInstance.current = null
      modelRef.current = null
    }
  }, [filePath, language, value])

  useEffect(() => {
    if (monacoInstance.current) {
      const editor = monacoInstance.current
      const highlight = settings.editor.highlightCurrentLine ? 'all' : 'none'
      const ln = settings.editor.lineNumbers ? 'on' : 'off'
      const theme =
        settings.editor.theme === 'light_1'
          ? 'vs'
          : settings.editor.theme === 'light_2'
            ? 'hc-light'
            : settings.editor.theme === 'dark_1'
              ? 'vs-dark'
              : 'hc-dark'

      console.log(theme)

      monaco.editor.setTheme(theme)
      editor.updateOptions({
        fontSize: settings.editor.fontSize,
        cursorStyle: settings.editor.cursorType,
        renderLineHighlight: highlight,
        lineNumbers: ln
      })
    }
  }, [settings])

  useEffect(() => {
    const model = modelRef.current
    if (model) {
      if (model.getLanguageId() !== language) {
        monaco.editor.setModelLanguage(model, language)
      }
      if (model.getValue() !== value) {
        model.setValue(value)
      }
    }
  }, [value, language])

  return <div ref={editorRef} style={{ height: '100vh', width: '100%' }} />
}

export default MonacoEditor
