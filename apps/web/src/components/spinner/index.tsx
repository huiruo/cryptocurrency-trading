import React, { FC } from 'react'
import { forwardRef } from '../utils'
import { Box } from '@fower/react'
import { keyframes } from '@fower/core'
import { FowerHTMLProps } from '@fower/core'

export interface SpinnerProps extends FowerHTMLProps<'div'> {
  /**
   * animation speed
   * @example 0.8s
   */
  speed?: string

  children?: React.ReactElement
}

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
})

export const Spinner: FC<SpinnerProps> = forwardRef((props: SpinnerProps, ref) => {
  const { speed = '1s', children, ...rest } = props

  if (Array.isArray(children)) {
    throw new Error('require single child element')
  }

  const spinnerProps: any = {
    ref,
    square: 24,
    className: 'bone-spinner',
    brand500: true,
    css: { animation: `${spin} ${speed} linear infinite` },
    ...rest,
  }

  if (children) return React.cloneElement(children, spinnerProps)

  return (
    <Box
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...spinnerProps}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        style={{ opacity: 0.25 }}
      ></circle>
      <path
        style={{ opacity: 0.75 }}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </Box>
  )
})
