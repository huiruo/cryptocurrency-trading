import React, { FC } from 'react'
import { PopoverContext, PopoverProps } from './types'
import { useLayer } from 'react-laag'
import { PopoverProvider } from './context'

export const Popover: FC<PopoverProps> = (props) => {
  const {
    initialOpened = false,
    placement = 'bottom-center',
    possiblePlacements = ['bottom-start', 'bottom-end', 'top-center', 'right-center'],
    triggerOffset = 12,
    containerOffset = 16,
    arrowOffset = 6,
    onClose,
    onOpen,
    children,
  } = props

  const [triggerWidth, setTriggerWidth] = React.useState<string | null>(null)

  // opened
  const [isOpen, setOpen] = React.useState(initialOpened)

  const open = () => {
    setOpen(true)
    onOpen?.()
  }

  const close = () => {
    setOpen(false)
    onClose?.()
  }

  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen,
    onOutsideClick: close, // close the menu when the user clicks outside
    onDisappear: close, // close the menu when the menu gets scrolled out of sight
    overflowContainer: false, // keep the menu positioned inside the container
    auto: true,
    possiblePlacements,
    placement,
    triggerOffset,
    containerOffset,
    arrowOffset,
    onParentClose: () => {
      setOpen(false)
    },
  })

  const ctx: PopoverContext = {
    triggerProps,
    popoverProps: props,
    setOpen,
    isDisabled: props.isDisabled,
    isOpen,
    renderLayer,
    layerProps,
    arrowProps,
    close,
    open,
    getRenderProps() {
      return { isOpen, close, open }
    },

    triggerWidth,
    setTriggerWidth,
  }

  return (
    <PopoverProvider value={ctx}>
      {typeof children === 'function' ? children({} as any) : children}
    </PopoverProvider>
  )
}
