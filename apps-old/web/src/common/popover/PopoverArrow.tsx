import React, { FC } from 'react'
import { forwardRef } from '../utils'
import { Arrow, mergeRefs, ArrowProps } from 'react-laag'
import { usePopoverContext } from './context'

export const PopoverArrow: FC<ArrowProps> = forwardRef((props, ref) => {
  const { arrowProps } = usePopoverContext()
  const { ref: Aref, ...restArrowProps } = arrowProps
  const arrowRef = mergeRefs(ref, Aref)
  return <Arrow ref={arrowRef} {...restArrowProps} {...props} />
})
