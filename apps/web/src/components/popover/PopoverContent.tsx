import React, { FC, ReactNode, PropsWithChildren } from 'react'
import { forwardRef } from '../utils'
import { FowerHTMLProps } from '@fower/core'
import { Box } from '@fower/react'
import { PopoverRenderProps } from './types'
import { usePopoverContext } from './context'

export interface PopoverContentProps extends Omit<FowerHTMLProps<'div'>, 'children'> {
  /**
   * set width base trigger width
   * 是否跟随 trigger 元素宽度
   */
  useTriggerWidth?: boolean
  children: ((props: PopoverRenderProps) => ReactNode) | ReactNode
}

export const PopoverContent: FC<PopoverContentProps> = forwardRef(
  (props: PopoverContentProps, ref) => {
    const { children, useTriggerWidth, ...rest } = props

    const { isOpen, layerProps, renderLayer, getRenderProps, triggerWidth } = usePopoverContext()

    const widthProps: any = {}
    if (triggerWidth && useTriggerWidth) {
      widthProps.w = triggerWidth + '!important'
    }

    return (
      <>
        {renderLayer(
          <>
            {isOpen && (
              <Box
                ref={ref}
                shadow
                bgWhite
                rounded
                zIndex-1000
                {...layerProps}
                {...rest}
                {...widthProps}
              >
                {typeof children === 'function' ? (children as any)(getRenderProps()) : children}
              </Box>
            )}
          </>,
        )}
      </>
    )
  },
)
