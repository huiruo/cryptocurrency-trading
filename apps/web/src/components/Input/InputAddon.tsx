import React, { FC } from 'react'
import { forwardRef } from '../utils'
import { Box } from '@fower/react'
import { FowerHTMLProps } from '@fower/core'
import { AtomicProps } from '@fower/atomic-props'
import { Placement, useInputGroupContext } from './context'

export interface InputAddonProps extends FowerHTMLProps<'div'> {
  placementMap?: 'left' | 'right'
}

export const InputAddon: FC<InputAddonProps> = forwardRef((props: InputAddonProps, ref) => {
  let attrs: AtomicProps = {}
  const ctx = useInputGroupContext()

  if (ctx.placementMap) {
    const { size, placementMap } = ctx
    const { placement } = placementMap.get(props)!

    attrs.h = size
    attrs.borderTop = 1
    attrs.borderBottom = 1

    if (placement === Placement.start) {
      attrs.borderLeft = 1
      attrs.roundedLeftMedium = true
    }

    if (placement === Placement.end) {
      attrs.borderRight = 1
      attrs.roundedRightMedium = true
    }
  }
  return (
    <Box
      className="bone-input-addon"
      ref={ref}
      px4
      bgGray100
      toCenter
      borderGray300
      {...(attrs as any)}
      {...props}
    />
  )
})
;(InputAddon as any).id = 'InputAddon'
