import React from 'react';
import { Box } from '@fower/react';
import { Button } from '@/common/button';
import { useNavigate } from 'react-router-dom';
import { Asset } from '../asset';

interface Props {
  spotCallBack: (value: string) => void
  assetSyncValue: string
  assetSyncValueCallback: (value: string) => void
}

/**
 * Asset Select
 */
export function AssetSync(props: Props) {

  const { spotCallBack, assetSyncValue, assetSyncValueCallback } = props
  const navigate = useNavigate();

  const onAddAsset = () => {
    navigate('/trade/addAsset')
  }

  const assetSelectCallback = (val: string) => {
    assetSyncValueCallback(val)
  }

  return (
    <Box flex toCenterY>
      <Asset onChange={assetSelectCallback} value={assetSyncValue} />
      <Button onClick={() => spotCallBack(assetSyncValue)} ml4 mr4>Sync spot orders</Button>
      <Button ml2 onClick={onAddAsset}>Add code</Button>
    </Box>
  )
}
