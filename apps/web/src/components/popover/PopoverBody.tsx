import React, { FC } from 'react'
import { forwardRef } from '../utils'
import { FowerHTMLProps } from '@fower/core'
import { Box } from '@fower/react'

export interface PopoverBodyProps extends FowerHTMLProps<'div'> {}

export const PopoverBody: FC<PopoverBodyProps> = forwardRef((props, ref) => {
  return <Box ref={ref} className="bone-popover-body" px-12 py-12 leadingNormal {...props}></Box>
})
