import React, { useState } from 'react';
import { Box } from '@fower/react';
import { Button } from '@/common/button';
import { useNavigate } from 'react-router-dom';
import { Asset } from '../asset';

interface Props {
  spotCallBack: (value: string | number) => void
}

/**
 * Asset Select
 */
export function AssetSync(props: Props) {

  const { spotCallBack } = props
  const [assetVal, setAssetVal] = useState<number | string>('BTCUSDT')
  const navigate = useNavigate();

  const onAddAsset = () => {
    navigate('/trade/addAsset')
  }

  const assetSelectCallback = (val: string | number) => {
    setAssetVal(val)
  }

  return (
    <Box flex toCenterY>
      <Asset onChange={assetSelectCallback} value={assetVal} />
      <Button onClick={() => spotCallBack(assetVal)} ml4 mr4>Sync spot orders</Button>
      <Button ml2 onClick={onAddAsset}>Add code</Button>
    </Box>
  )
}
