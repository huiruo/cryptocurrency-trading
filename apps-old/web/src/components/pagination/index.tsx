import React from 'react';
import { Button } from '@/common/button';
import { Box } from '@fower/react';
import { Select } from '@/common/select';

const options = [10, 20]

interface Props {
  onChange: (currentPage: number, pageSize: number) => void
  onChangePageSize?: (pageSize: number) => void
  currentPage: number
  pageSize?: number
  showPageSelect?: boolean
}

/**
 * Code annotation
 */
export function Pagination(props: Props) {

  const { onChange, currentPage, pageSize = 10, onChangePageSize, showPageSelect = false } = props

  const onNextPage = () => {
    onChange(currentPage + 1, pageSize)
  }

  const onPrePage = () => {
    let current = 0

    if (currentPage !== 1) {
      current = currentPage - 1
      onChange(current, pageSize)
    }
  }

  return (
    <Box toCenterY mt='20px' mb='20px'>
      <Button onClick={onPrePage}>Previous page</Button>
      Current Page：{currentPage}
      {showPageSelect &&
        <Select
          width={140}
          size="sm"
          options={options.map((i) => ({ label: i, value: i }))}
          value={pageSize}
          onChange={(v: number) => {
            onChangePageSize && onChangePageSize(v)
          }}
        />
      }
      <Button onClick={onNextPage}>Next page</Button>
    </Box>
  );
}
