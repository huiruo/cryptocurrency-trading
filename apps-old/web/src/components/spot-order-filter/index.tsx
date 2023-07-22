import React from 'react';
import { Button } from '@/common/button';
import { Box } from '@fower/react';
import { Asset } from '../asset';

interface Props {
  spotCallBack: (symbolAsset: string, isUpdate: boolean) => void
  selectCallback: (val: any) => void
  selectAssetValue: string
}

/**
 * Code annotation
 */
export function SpotOrderFilter(props: Props) {
  const { spotCallBack, selectCallback, selectAssetValue } = props

  const onSearch = () => {
    spotCallBack(selectAssetValue, true)
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