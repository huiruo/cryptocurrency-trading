import React from 'react'
import { Box } from '@fower/react'
import { CheckOutline } from '../icons'
import { CheckboxStatus } from './types'

export const checkboxDefaultRender = ({
  checked,
  colorScheme,
}: CheckboxStatus & { colorScheme: string }) => {
  const atomicProps: any = {}
  if (!!checked) {
    atomicProps.borderColor = colorScheme
    atomicProps.bg = colorScheme
  }
  return (
    <Box toCenter square-20 border-2 rounded-4 borderGray400={!checked} {...atomicProps}>
      <CheckOutline white square-20 strokeWidth={4} hidden={!checked}></CheckOutline>
    </Box>
  )
}
