import { useState, useEffect } from 'react'
import { useRadioGroupContext } from './radioGroupContext'
import { HtmlInputProps, RadioHooksResult, RenderItem } from './types'

export function useRadio(props: HtmlInputProps): RadioHooksResult {
  let inputProps: HtmlInputProps = {}
  let renderItem: RenderItem | undefined = undefined
  const { value, onChange } = props

  /** hooks */
  const context = useRadioGroupContext()
  const [disabled, setDisabled] = useState(props.disabled ?? false)
  const [checked, setChecked] = useState(props.checked || props.defaultChecked || false)

  useEffect(() => {
    if (typeof props.checked !== 'boolean') return
    setChecked(!!props.checked)
  }, [props.checked])

  useEffect(() => {
    if (typeof props.disabled !== 'boolean') return
    setDisabled(!!props.disabled)
  }, [props.disabled])

  /** For radio group */
  if (context) {
    const { value: radioGroupValue, setValue: setRadioGroupValue } = context
    inputProps.checked = value === radioGroupValue
    inputProps.onChange = (e) => {
      setRadioGroupValue?.(value)
      onChange && onChange(e)
    }

    renderItem = context.renderItem
  } else {
    inputProps.onChange = (e) => {
      const { checked } = e.target
      setChecked(checked)
    }
  }

  return {
    inputProps,
    renderItem,
    state: { disabled, checked: context ? inputProps.checked : checked },
  }
}
