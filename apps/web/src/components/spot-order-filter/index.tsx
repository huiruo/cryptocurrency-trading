import React from 'react';
import { Button } from '@/common/button';
import { SearchParmas } from '@/utils/types';
import { Box } from '@fower/react';
import { Asset } from '../asset';

interface Props {
  spotCallBack: (searchParmas: SearchParmas, isUpdate: boolean) => void
  selectCallback: (val: any) => void
  selectAssetValue: string
}

/**
 * Code annotation
 */
export function SpotOrderFilter(props: Props) {
  const { spotCallBack, selectCallback, selectAssetValue } = props

  const onSearch = () => {
    const params = {
      currentPage: 1,
      pageSize: 10,
      symbol: ''
    }

    spotCallBack(params, true)
  }

  const assetSelectCallback = (val: string | number) => {
    selectCallback(val)
  }

  return (
    <Box flex toCenterY mt='10px'>
      <Asset value={selectAssetValue} onChange={assetSelectCallback} />
      <Button onClick={() => onSearch()} ml4 mr4>Search</Button>
    </Box>
  );
}
