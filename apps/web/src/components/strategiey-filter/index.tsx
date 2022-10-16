import React from 'react';
import { Box } from '@fower/react';
import { Button } from '@/common/button';
import { Select } from '@/common/select';
import { FiterStrategyOrderType, SelectType } from '@/utils/types';
import { Asset } from '../asset';

interface Props {
  selectStatusCallback: (val: string | number) => void
  selectAssetCallback: (val: string) => void
  fiterStrategyOrderCallback: (params: FiterStrategyOrderType) => void
  selectStatus: string | number
  selectAsset: string
}


const options: SelectType[] = [
  {
    label: 'All status',
    name: '',
  },
  {
    label: 'Running',
    name: 1,
  },
  {
    label: 'Ended',
    name: 0,
  }
]

/**
 * Code annotation
 */
export function StrategieyFilter(props: Props) {
  const { selectStatus, selectAsset, fiterStrategyOrderCallback, selectStatusCallback, selectAssetCallback } = props

  const onFiterStrategyOrder = () => {
    const params = {
      is_running: selectStatus,
      symbol: ''
    }
    fiterStrategyOrderCallback(params)
  }

  const assetSelectCallback = (val: string) => {
    selectAssetCallback(val)
  }

  return (
    <Box toCenterY>
      <Box mr-8px>
        <Select
          width={140}
          size="sm"
          options={options.map((i) => ({ label: i.label, value: i.name }))}
          value={selectStatus}
          onChange={(v: string) => {
            selectStatusCallback(v)
          }}
        />
      </Box>
      <Asset onChange={assetSelectCallback} value={selectAsset} />
      <Button onClick={() => onFiterStrategyOrder()} ml-8px>Filter strategies</Button>
    </Box>
  );
}
