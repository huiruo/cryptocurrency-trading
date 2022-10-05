import React, { FC, memo } from 'react'
import { forwardRef } from '../utils'
import { FowerHTMLProps } from '@fower/core'
import { Box } from '@fower/react'

export interface PopoverTitleProps extends FowerHTMLProps<'header'> {}

export const PopoverTitle: FC<PopoverTitleProps> = memo(
  forwardRef((props, ref) => {
    return (
      <Box
        ref={ref}
        as="header"
        className="bone-popover-title"
        fontBold
        px-12
        py-12
        borderBottom-1
        borderGray100--d4
        {...props}
      ></Box>
    )
  }),
)
