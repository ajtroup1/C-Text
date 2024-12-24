import { useRef, useEffect, useState } from 'react'
import * as monaco from 'monaco-editor'
import { Settings } from '@renderer/types/Settings.d'
import monokai from 'monaco-themes/themes/Monokai.json'
import nord from 'monaco-themes/themes/Nord.json'
import solarizedDark from 'monaco-themes/themes/Solarized-dark.json'
import twilight from 'monaco-themes/themes/Twilight.json'
import active4d from 'monaco-themes/themes/Active4D.json'
import allHallowsEve from 'monaco-themes/themes/All Hallows Eve.json'
import amy from 'monaco-themes/themes/Amy.json'
import birdsOfParadise from 'monaco-themes/themes/Birds Of Paradise.json'
import blackboard from 'monaco-themes/themes/Blackboard.json'
import brillianceBlack from 'monaco-themes/themes/Brilliance Black.json'
import brillianceDull from 'monaco-themes/themes/Brilliance Dull.json'
import chromeDevtools from 'monaco-themes/themes/Chrome DevTools.json'
import cloudsMidnight from 'monaco-themes/themes/Clouds Midnight.json'
import clouds from 'monaco-themes/themes/Clouds.json'
import cobalt from 'monaco-themes/themes/Cobalt.json'
import cobalt2 from 'monaco-themes/themes/Cobalt2.json'
import dawn from 'monaco-themes/themes/Dawn.json'
import dominionDay from 'monaco-themes/themes/Dominion Day.json'
import dracula from 'monaco-themes/themes/Dracula.json'
import dreamweaver from 'monaco-themes/themes/Dreamweaver.json'
import eiffel from 'monaco-themes/themes/Eiffel.json'
import espressoLibre from 'monaco-themes/themes/Espresso Libre.json'
import githubDark from 'monaco-themes/themes/GitHub Dark.json'
import githubLight from 'monaco-themes/themes/GitHub Light.json'
import github from 'monaco-themes/themes/GitHub.json'
import idle from 'monaco-themes/themes/Idle.json'
import idlefingers from 'monaco-themes/themes/Idlefingers.json'
import iplastic from 'monaco-themes/themes/iPlastic.json'
import katzenmilch from 'monaco-themes/themes/Katzenmilch.json'
import krtheme from 'monaco-themes/themes/KrTheme.json'
import kuroiTheme from 'monaco-themes/themes/Kuroir Theme.json'
import lazy from 'monaco-themes/themes/Lazy.json'
import magicwb from 'monaco-themes/themes/MagicWB (Amiga).json'
import merbivore from 'monaco-themes/themes/Merbivore.json'
import merbivoreSoft from 'monaco-themes/themes/Merbivore Soft.json'
import monoindustrial from 'monaco-themes/themes/MonoIndustrial.json'
import monokaiBright from 'monaco-themes/themes/Monokai Bright.json'
import nightOwl from 'monaco-themes/themes/Night Owl.json'
import oceanicNext from 'monaco-themes/themes/Oceanic Next.json'
import pastelsOnDark from 'monaco-themes/themes/Pastels on Dark.json'
import slushAndPoppies from 'monaco-themes/themes/Slush and Poppies.json'
import solarizedLight from 'monaco-themes/themes/Solarized-Light.json'
import spaceCadet from 'monaco-themes/themes/SpaceCadet.json'
import sunburst from 'monaco-themes/themes/Sunburst.json'
import textmate from 'monaco-themes/themes/Textmate (Mac Classic).json'
import tomorrowNightBlue from 'monaco-themes/themes/Tomorrow-Night-Blue.json'
import tomorrowNightBright from 'monaco-themes/themes/Tomorrow-Night-Bright.json'
import tomorrowNightEighties from 'monaco-themes/themes/Tomorrow-Night-Eighties.json'
import tomorrowNight from 'monaco-themes/themes/Tomorrow-Night.json'
import tomorrow from 'monaco-themes/themes/Tomorrow.json'
import upstreamSunburst from 'monaco-themes/themes/Upstream Sunburst.json'
import vibrantLink from 'monaco-themes/themes/Vibrant Ink.json'
import zenburnesque from 'monaco-themes/themes/Zenburnesque.json'

monaco.editor.defineTheme('monokai', {
  ...monokai,
  base: 'vs-dark'
})

monaco.editor.defineTheme('nord', {
  ...nord,
  base: 'vs-dark'
})

monaco.editor.defineTheme('solarized-dark', {
  ...solarizedDark,
  base: 'vs-dark'
})

monaco.editor.defineTheme('twilight', {
  ...twilight,
  base: 'vs-dark'
})

monaco.editor.defineTheme('active4d', {
  ...active4d,
  base: 'vs-dark'
})

monaco.editor.defineTheme('all-hallows-eve', {
  ...allHallowsEve,
  base: 'vs-dark'
})

monaco.editor.defineTheme('amy', {
  ...amy,
  base: 'vs-dark'
})

monaco.editor.defineTheme('birds-of-paradise', {
  ...birdsOfParadise,
  base: 'vs-dark'
})

monaco.editor.defineTheme('blackboard', {
  ...blackboard,
  base: 'vs-dark'
})

monaco.editor.defineTheme('brilliance-black', {
  ...brillianceBlack,
  base: 'vs-dark'
})

monaco.editor.defineTheme('brilliance-dull', {
  ...brillianceDull,
  base: 'vs-dark'
})

monaco.editor.defineTheme('chrome-devtools', {
  ...chromeDevtools,
  base: 'vs-dark'
})

monaco.editor.defineTheme('clouds-midnight', {
  ...cloudsMidnight,
  base: 'vs-dark'
})

monaco.editor.defineTheme('clouds', {
  ...clouds,
  base: 'vs-dark'
})

monaco.editor.defineTheme('cobalt', {
  ...cobalt,
  base: 'vs-dark'
})

monaco.editor.defineTheme('cobalt2', {
  ...cobalt2,
  base: 'vs-dark'
})

monaco.editor.defineTheme('dawn', {
  ...dawn,
  base: 'vs-dark'
})

monaco.editor.defineTheme('dominion-day', {
  ...dominionDay,
  base: 'vs-dark'
})

monaco.editor.defineTheme('dracula', {
  ...dracula,
  base: 'vs-dark'
})

monaco.editor.defineTheme('dreamweaver', {
  ...dreamweaver,
  base: 'vs-dark'
})

monaco.editor.defineTheme('eiffel', {
  ...eiffel,
  base: 'vs-dark'
})

monaco.editor.defineTheme('espresso-libre', {
  ...espressoLibre,
  base: 'vs-dark'
})

monaco.editor.defineTheme('github-dark', {
  ...githubDark,
  base: 'vs-dark'
})

monaco.editor.defineTheme('github-light', {
  ...githubLight,
  base: 'vs-dark'
})

monaco.editor.defineTheme('github', {
  ...github,
  base: 'vs-dark'
})

monaco.editor.defineTheme('idle', {
  ...idle,
  base: 'vs-dark'
})

monaco.editor.defineTheme('idlefingers', {
  ...idlefingers,
  base: 'vs-dark'
})

monaco.editor.defineTheme('iplastic', {
  ...iplastic,
  base: 'vs-dark'
})

monaco.editor.defineTheme('katzenmilch', {
  ...katzenmilch,
  base: 'vs-dark'
})

monaco.editor.defineTheme('krtheme', {
  ...krtheme,
  base: 'vs-dark'
})

monaco.editor.defineTheme('kuroir-theme', {
  ...kuroiTheme,
  base: 'vs-dark'
})

monaco.editor.defineTheme('lazy', {
  ...lazy,
  base: 'vs-dark'
})

monaco.editor.defineTheme('magicwb', {
  ...magicwb,
  base: 'vs-dark'
})

monaco.editor.defineTheme('merbivore', {
  ...merbivore,
  base: 'vs-dark'
})

monaco.editor.defineTheme('merbivore-soft', {
  ...merbivoreSoft,
  base: 'vs-dark'
})

monaco.editor.defineTheme('monoindustrial', {
  ...monoindustrial,
  base: 'vs-dark'
})

monaco.editor.defineTheme('monokai-bright', {
  ...monokaiBright,
  base: 'vs-dark'
})

monaco.editor.defineTheme('night-owl', {
  ...nightOwl,
  base: 'vs-dark'
})

monaco.editor.defineTheme('oceanic-next', {
  ...oceanicNext,
  base: 'vs-dark'
})

monaco.editor.defineTheme('pastels-on-dark', {
  ...pastelsOnDark,
  base: 'vs-dark'
})

monaco.editor.defineTheme('slush-and-poppies', {
  ...slushAndPoppies,
  base: 'vs-dark'
})

monaco.editor.defineTheme('solarized-light', {
  ...solarizedLight,
  base: 'vs-dark'
})

monaco.editor.defineTheme('space-cadet', {
  ...spaceCadet,
  base: 'vs-dark'
})

monaco.editor.defineTheme('sunburst', {
  ...sunburst,
  base: 'vs-dark'
})

monaco.editor.defineTheme('textmate', {
  ...textmate,
  base: 'vs-dark'
})

monaco.editor.defineTheme('tomorrow-night-blue', {
  ...tomorrowNightBlue,
  base: 'vs-dark'
})

monaco.editor.defineTheme('tomorrow-night-bright', {
  ...tomorrowNightBright,
  base: 'vs-dark'
})

monaco.editor.defineTheme('tomorrow-night-eighties', {
  ...tomorrowNightEighties,
  base: 'vs-dark'
})

monaco.editor.defineTheme('tomorrow-night', {
  ...tomorrowNight,
  base: 'vs-dark'
})

monaco.editor.defineTheme('tomorrow', {
  ...tomorrow,
  base: 'vs-dark'
})

monaco.editor.defineTheme('upstream-sunburst', {
  ...upstreamSunburst,
  base: 'vs-dark'
})

monaco.editor.defineTheme('vibrant-link', {
  ...vibrantLink,
  base: 'vs-dark'
})

monaco.editor.defineTheme('zenburnesque', {
  ...zenburnesque,
  base: 'vs-dark'
})

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
  }, [_settings])

  // Set theme when settings change and when Monaco is initialized
  useEffect(() => {
    if (settings.editor.theme === 'monokai') {
      monaco.editor.setTheme('monokai')
    }
  }, [settings.editor.theme]) // This ensures theme is applied when settings change

  useEffect(() => {
    if (editorRef.current && !monacoInstance.current) {
      const modelUri = monaco.Uri.file(filePath)

      // Create or reuse the model only for the specific file
      let model = monaco.editor.getModel(modelUri)
      if (!model) {
        model = monaco.editor.createModel(value, language, modelUri)
      }

      // Create Monaco editor instance with theme from settings
      monacoInstance.current = monaco.editor.create(editorRef.current, {
        model,
        theme:
          settings.editor.theme === 'light_1'
            ? 'vs'
            : settings.editor.theme === 'light_2'
              ? 'hc-light'
              : settings.editor.theme === 'dark_1'
                ? 'vs-dark'
                : settings.editor.theme === 'monokai'
                  ? 'monokai'
                  : settings.editor.theme === 'nord'
                    ? 'nord'
                    : settings.editor.theme === 'solarized-dark'
                      ? 'solarized-dark'
                      : settings.editor.theme === 'twilight'
                        ? 'twilight'
                        : settings.editor.theme === 'active4d'
                          ? 'active4d'
                          : settings.editor.theme === 'all-hallows-eve'
                            ? 'all-hallows-eve'
                            : settings.editor.theme === 'amy'
                              ? 'amy'
                              : settings.editor.theme === 'birds-of-paradise'
                                ? 'birds-of-paradise'
                                : settings.editor.theme === 'blackboard'
                                  ? 'blackboard'
                                  : settings.editor.theme === 'brilliance-black'
                                    ? 'brilliance-black'
                                    : settings.editor.theme === 'brilliance-dull'
                                      ? 'brilliance-dull'
                                      : settings.editor.theme === 'chrome-devtools'
                                        ? 'chrome-devtools'
                                        : settings.editor.theme === 'clouds-midnight'
                                          ? 'clouds-midnight'
                                          : settings.editor.theme === 'clouds'
                                            ? 'clouds'
                                            : settings.editor.theme === 'cobalt'
                                              ? 'cobalt'
                                              : settings.editor.theme === 'cobalt2'
                                                ? 'cobalt2'
                                                : settings.editor.theme === 'dawn'
                                                  ? 'dawn'
                                                  : settings.editor.theme === 'dominion-day'
                                                    ? 'dominion-day'
                                                    : settings.editor.theme === 'dracula'
                                                      ? 'dracula'
                                                      : settings.editor.theme === 'dreamweaver'
                                                        ? 'dreamweaver'
                                                        : settings.editor.theme === 'eiffel'
                                                          ? 'eiffel'
                                                          : settings.editor.theme ===
                                                              'espresso-libre'
                                                            ? 'espresso-libre'
                                                            : settings.editor.theme ===
                                                                'github-dark'
                                                              ? 'github-dark'
                                                              : settings.editor.theme ===
                                                                  'github-light'
                                                                ? 'github-light'
                                                                : settings.editor.theme === 'github'
                                                                  ? 'github'
                                                                  : settings.editor.theme === 'idle'
                                                                    ? 'idle'
                                                                    : settings.editor.theme ===
                                                                        'idlefingers'
                                                                      ? 'idlefingers'
                                                                      : settings.editor.theme ===
                                                                          'iplastic'
                                                                        ? 'iplastic'
                                                                        : settings.editor.theme ===
                                                                            'katzenmilch'
                                                                          ? 'katzenmilch'
                                                                          : settings.editor
                                                                                .theme === 'krtheme'
                                                                            ? 'krtheme'
                                                                            : settings.editor
                                                                                  .theme ===
                                                                                'kuroir-theme'
                                                                              ? 'kuroir-theme'
                                                                              : settings.editor
                                                                                    .theme ===
                                                                                  'lazy'
                                                                                ? 'lazy'
                                                                                : settings.editor
                                                                                      .theme ===
                                                                                    'magicwb'
                                                                                  ? 'magicwb'
                                                                                  : settings.editor
                                                                                        .theme ===
                                                                                      'merbivore'
                                                                                    ? 'merbivore'
                                                                                    : settings
                                                                                          .editor
                                                                                          .theme ===
                                                                                        'merbivore-soft'
                                                                                      ? 'merbivore-soft'
                                                                                      : settings
                                                                                            .editor
                                                                                            .theme ===
                                                                                          'monoindustrial'
                                                                                        ? 'monoindustrial'
                                                                                        : settings
                                                                                              .editor
                                                                                              .theme ===
                                                                                            'monokai-bright'
                                                                                          ? 'monokai-bright'
                                                                                          : settings
                                                                                                .editor
                                                                                                .theme ===
                                                                                              'night-owl'
                                                                                            ? 'night-owl'
                                                                                            : settings
                                                                                                  .editor
                                                                                                  .theme ===
                                                                                                'oceanic-next'
                                                                                              ? 'oceanic-next'
                                                                                              : settings
                                                                                                    .editor
                                                                                                    .theme ===
                                                                                                  'pastels-on-dark'
                                                                                                ? 'pastels-on-dark'
                                                                                                : settings
                                                                                                      .editor
                                                                                                      .theme ===
                                                                                                    'slush-and-poppies'
                                                                                                  ? 'slush-and-poppies'
                                                                                                  : settings
                                                                                                        .editor
                                                                                                        .theme ===
                                                                                                      'solarized-light'
                                                                                                    ? 'solarized-light'
                                                                                                    : settings
                                                                                                          .editor
                                                                                                          .theme ===
                                                                                                        'space-cadet'
                                                                                                      ? 'space-cadet'
                                                                                                      : settings
                                                                                                            .editor
                                                                                                            .theme ===
                                                                                                          'sunburst'
                                                                                                        ? 'sunburst'
                                                                                                        : settings
                                                                                                              .editor
                                                                                                              .theme ===
                                                                                                            'textmate'
                                                                                                          ? 'textmate'
                                                                                                          : settings
                                                                                                                .editor
                                                                                                                .theme ===
                                                                                                              'tomorrow-night-blue'
                                                                                                            ? 'tomorrow-night-blue'
                                                                                                            : settings
                                                                                                                  .editor
                                                                                                                  .theme ===
                                                                                                                'tomorrow-night-bright'
                                                                                                              ? 'tomorrow-night-bright'
                                                                                                              : settings
                                                                                                                    .editor
                                                                                                                    .theme ===
                                                                                                                  'tomorrow-night-eighties'
                                                                                                                ? 'tomorrow-night-eighties'
                                                                                                                : settings
                                                                                                                      .editor
                                                                                                                      .theme ===
                                                                                                                    'tomorrow-night'
                                                                                                                  ? 'tomorrow-night'
                                                                                                                  : settings
                                                                                                                        .editor
                                                                                                                        .theme ===
                                                                                                                      'tomorrow'
                                                                                                                    ? 'tomorrow'
                                                                                                                    : settings
                                                                                                                          .editor
                                                                                                                          .theme ===
                                                                                                                        'upstream-sunburst'
                                                                                                                      ? 'upstream-sunburst'
                                                                                                                      : settings
                                                                                                                            .editor
                                                                                                                            .theme ===
                                                                                                                          'vibrant-ink'
                                                                                                                        ? 'vibrant-link'
                                                                                                                        : settings
                                                                                                                              .editor
                                                                                                                              .theme ===
                                                                                                                            'zenburnesque'
                                                                                                                          ? 'zenburnesque'
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
  }, [filePath, language, settings]) // Ensure the effect is called when settings change

  // Update model language and value based on prop changes
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
