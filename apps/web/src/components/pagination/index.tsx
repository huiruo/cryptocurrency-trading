import React, { useState } from 'react';
import { Button } from '@/common/button';
import { Box } from '@fower/react';

interface Props {
  onChange: (currentPage: number, pageSize: number) => void
  currentPage: number
  // onChange: () => void
  // onChange: any
}

/**
 * Code annotation
 */
export function Pagination(props: Props) {

  const { onChange, currentPage } = props

  const onNextPage = () => {
    const pageSize = 10
    onChange(currentPage + 1, pageSize)
  }

  const onPrePage = () => {
    const pageSize = 10
    let current = 0

    if (currentPage !== 1) {
      current = currentPage - 1
      onChange(current, pageSize)
    }
  }

  return (
    <Box mt='20px' mb='20px'>
      <Button onClick={onPrePage}>Previous page</Button>
      Current Page：{currentPage}
      <Button onClick={onNextPage}>Next page</Button>
    </Box>
  );
}
