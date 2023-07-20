import React, { cloneElement, forwardRef } from 'react'
import { Box,BoxComponent } from '@fower/react'
import { FowerColor, As } from '@fower/core'
import { upFirst } from '@fower/utils'

type Size = 'sm' | 'md' | 'lg' | number

export interface ButtonProps {
  as?: As

  colorScheme?: FowerColor

  size?: Size

  variant?: 'outline' | 'filled' | 'ghost' | 'light'

  leftIcon?: React.ReactElement

  rightIcon?: React.ReactElement

  icon?: React.ReactElement

  disabled?: boolean

  loading?: boolean

  children?: string | React.ReactNode
}
//@ts-ignore
const Button: BoxComponent<'button', ButtonProps> = forwardRef((props: ButtonProps, ref) => {
  const {
    as = 'button',
    size = 'md',
    variant = 'filled',
    leftIcon,
    rightIcon,
    icon,
    colorScheme = 'brand500',
    disabled,
    loading,
    children,
    ...rest
  } = props

  const sizeStyle = getSizeStyle(size)

  if (icon) delete sizeStyle?.px // icon button 不要 padding

  // const isFilled = variant === 'filled'
  const notAllowed = !!(disabled || loading)
  const iconButtonProps = icon ? { w: sizeStyle.h } : {}

  return (
    <Box
    as={as}
    ref={ref}
    className="bone-button"
    inlineFlex
    toCenter
    outlineNone
    cursorPointer
    roundedMedium
    opacity-40={notAllowed}
    cursorNotAllowed={notAllowed}
    color={colorScheme}
    css={{
      appearance: 'none',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      verticalAlign: 'middle',
      transition: 'background 250ms ease',
    }}
    {...getVariantStyle(colorScheme, notAllowed)[variant]}
    {...sizeStyle}
    {...iconButtonProps}
    {...rest} 
    >
      {icon && cloneElement(icon, { square: sizeStyle.text * 1.2 })}
      {leftIcon && cloneElement(leftIcon, { mr: 8, square: sizeStyle.text })}
      {children}
      {rightIcon && cloneElement(rightIcon, { ml: 8, square: sizeStyle.text })}
    </Box>
  )
})

function getVariantStyle(color: string, notAllowed: any = null): any {
  const light: any = { 'bg--T90': color, borderColor: color }
  const filled: any = { white: true, 'white--dark': true, bg: color }
  const ghost: any = { bgTransparent: true }
  const outline: any = { border: true, borderColor: color, bgTransparent: true }

  const Color = upFirst(color)

  /**
   * hover must be after active
   * @see https://stackoverflow.com/questions/23534266/aactive-is-not-working-while-ahover-is-working-well
   *   */
  if (!notAllowed) {
    light[`bg${Color}--T65--active`] = true
    light[`${color}--D10--active`] = true
    light[`bg${Color}--T75--hover`] = true

    filled[`bg${Color}--D26--active`] = true
    filled[`bg${Color}--D10--hover`] = true

    ghost[`bg${Color}--T65--active`] = true
    ghost[`bg${Color}--T85--hover`] = true

    outline[`bg${Color}--D20--active`] = true
    outline[`bg${Color}--hover`] = true
    outline['color--hover'] = 'white'
  }
  const styles = { light, filled, ghost, outline }
  return styles
}

interface Sizes {
  [key: string]: {
    h: number
    text: number
    px?: number
    rounded?: number
  }
}

function getSizeStyle(size: Size) {
  const sizes: Sizes = {
    sm: { h: 32, text: 14, px: 12, rounded: 4 },
    md: { h: 40, text: 16, px: 16, rounded: 6 },
    lg: { h: 48, text: 18, px: 20, rounded: 8 },
  }
  if (typeof size === 'string') return sizes[size]
  return {
    h: size,
    px: size * 0.4,
    text: size * 0.35,
    rounded: size * 0.1,
  }
}

export {Button}