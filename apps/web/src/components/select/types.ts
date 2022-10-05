import { FowerHTMLProps } from '@fower/core'
import { RadioOption, RenderItem } from '../radio'
import { ReactNode, ReactElement } from 'react'

type StringOrNumber = string | number

export interface RenderSelectTriggerProps {
  isOpen: boolean
  item?: RadioOption
}

export type RenderSelectTrigger = (props: RenderSelectTriggerProps) => ReactNode

export interface RenderSearchProps {
  value: any
  placeholder?: string
  setValue: (value: any) => any
  onChange: (e: any) => any
}

export type RenderSearch = (props: RenderSearchProps) => ReactNode

export type SelectSize = 'sm' | 'md' | 'lg' | number

export interface SelectProps extends Omit<FowerHTMLProps<'div'>, 'onChange'> {
  size?: SelectSize

  /**
   * set width base trigger width
   * 是否跟随 trigger 元素宽度
   */
  useTriggerWidth?: boolean

  containerMaxHeight?: string | number

  placeholder?: string

  disabled?: boolean

  value?: StringOrNumber

  width?: number

  loading?: boolean

  defaultValue?: StringOrNumber

  options?: (RadioOption & { icon?: string })[]

  name?: string

  icon?: ReactElement

  renderTrigger?: RenderSelectTrigger

  renderItem?: RenderItem

  searchPlaceholder?: string

  renderSearch?: RenderSearch | boolean

  onChange?(nextValue: StringOrNumber): void
}
