import { ChangeEvent, useCallback, useState } from 'react'
import { useControlledInfo, useId } from '../hooks'
import { StringOrNumber, RadioGroupProps, UseRadioGroupReturn } from './types'

export function useRadioGroup(props: RadioGroupProps): UseRadioGroupReturn {
  const { defaultValue, onChange: onChangeProp } = props
  const [state, setState] = useState<StringOrNumber>(defaultValue || '')
  const { controlled, value } = useControlledInfo(props.value, state)

  const name = useId(undefined, 'radio')

  const setValue = useCallback(
    (nextValue: StringOrNumber) => {
      if (!controlled) setState(nextValue)
      onChangeProp?.(nextValue)
    },
    [controlled, onChangeProp],
  )

  /** @example <RadioGroup onChange={...}></RadioGroup> */
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      console.log('e---:', e)
      // const nextValue = getNextCheckboxGroupValue(e, groupValue)
      // setValue(nextValue)
    },
    [value, setValue],
  )

  return {
    name,
    controlled,
    value,
    onChange,
    setValue,
  }
}
