import { useRef, useEffect } from 'react'
import * as monaco from 'monaco-editor'

interface MonacoEditorProps {
  value: string
  language: string
  filePath: string // Unique identifier for the file
  onChange: (newContent: string) => void
}

function MonacoEditor({ value, language, filePath, onChange }: MonacoEditorProps): JSX.Element {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const modelRef = useRef<monaco.editor.ITextModel | null>(null)
  const fileContentRef = useRef<string>('')

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
        theme: 'vs-dark',
        automaticLayout: true
      })

      monacoInstance.current.onDidChangeModelContent(() => {
        const newValue = model.getValue()
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
  }, [filePath, language])

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
