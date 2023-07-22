import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import Editor from '@monaco-editor/react'
import type monaco from 'monaco-editor'
import { services } from '@services/code.platform'

/**
const langMap: Record<any, string> = {
  py: 'python',
  ts: 'typescript',
  js: 'javascript',
  go: 'go',
}
 * 
*/

const test = 'console.log(\'hello world\')'

export const SourceCodeEditor = forwardRef((props, ref) => {
  const [value, setValue] = useState<string>(test || '')
  const lang = 'typescript'
  const htmlRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>()

  useImperativeHandle(ref, () => ({
    runCode: async () => {
      console.log('code:', value)
      if (!value) {
        console.log('please enter code')
        return
      }
      const data = await services.runCode({ type: 'js', code: value })
      console.log('onRunJs', data)
    },
  }))

  const saveCode = useDebouncedCallback(async (code: string) => {
    // const langMap: Record<string, StrategyLang> = {
    //   python: StrategyLang.Py,
    //   typescript: StrategyLang.Ts,
    //   javascript: StrategyLang.Js,
    //   go: StrategyLang.Go,
    // }
    // const input: ModifyStrategyInput = {
    //   id: strategy.id,
    //   // lang: langMap[lang],
    // }

    // if (langMap[lang]) {
    //   input[langMap[lang]] = code
    // }

    try {
      console.log('Saved', code)
    } catch (error) {
      console.log('Save fail')
    }
  }, 1000)

  console.log('code val:', value)

  return (
    <div style={{ height: 'calc(100vh - 200px)' }}>
      <Editor
        options={{
          // scrollBeyondLastLine: false,
          wordWrap: 'on',
          padding: {
            top: 10,
          },
          wrappingStrategy: 'advanced',
          minimap: {
            enabled: false,
          },
          overviewRulerLanes: 0,
        }}
        defaultLanguage={lang || 'typescript'}
        value={value}
        theme="vs-dark"
        onChange={(v) => {
          setValue(v as string)
          saveCode(v as string)
        }}
        beforeMount={(monaco) => {
          // extra libraries

          const libSource = `
            declare module "boter-core" {
              export type ParamsSchema = any
              export type Candle = any
              export type Ticker = any

              export declare type Period = '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '6h' | '8h' | '12h' | '1d' | '3d' | '1w' | '1M';

              export declare function onCandle(period: Period | (string & {})): MethodDecorator;

              export declare function onInit(): MethodDecorator;

              export class BaseStrategy<T> {
                botId: number
                sleep: (ms: number) => Promise<void>,
                logger: {
                  debug(message?: any, ...optionalParams: any[]): void
                  info(message?: any, ...optionalParams: any[]): void 
                  warn(message?: any, ...optionalParams: any[]): void 
                  error(message?: any, ...optionalParams: any[]): void 
                }
                orderService: any
                params: T
                exchange: any
                okx: any
                binance: any
                binanceWebsocket: any
              }
            }
          `

          monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false,
          })

          monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            // allowJs: true,
            // checkJs: true,
            target: monaco.languages.typescript.ScriptTarget.ES2015,
            allowNonTsExtensions: true,
          })

          monaco.languages.typescript.typescriptDefaults.addExtraLib(libSource)
          monaco.editor.createModel(libSource, 'typescript')
        }}
        onMount={(editor, monaco) => {
          editorRef.current = editor
          // editor.updateOptions({})
          console.log('monaco', monaco)

          if (!htmlRef.current || !editorRef.current) return

          const container = htmlRef.current

          const updateHeight = () => {
            const contentHeight = Math.min(800, editor.getContentHeight())
            // const contentHeight = editor.getContentHeight()
            container.style.width = '100%'
            const h = contentHeight < 300 ? 300 : contentHeight
            container.style.height = h > 300 ? '300px' : `${h}px`
            const { width } = container.getBoundingClientRect()
            editor.layout({ width, height: contentHeight })
          }

          editorRef.current.onDidContentSizeChange(updateHeight)
          updateHeight()
        }}
      />
    </div>
  )
})

SourceCodeEditor.displayName = 'SourceCodeEditor'
