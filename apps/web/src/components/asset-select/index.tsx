import React, { useEffect, useState } from 'react';
import { Box } from '@fower/react';
import { Select } from '@/common/select';
import { Button } from '@/common/button';
import { useNavigate } from 'react-router-dom';
import { AssetType } from '@/utils/types';
import { get } from 'lodash';

interface Props {
  spotCallBack: (value: string | number) => void
  options: AssetType[]
}

/**
 * Asset Select
 */
export function AssetSelect(props: Props) {

  const { spotCallBack, options } = props
  const [value, setValue] = useState<number | string>('')
  const navigate = useNavigate();

  const onAddAsset = () => {
    navigate('/trade/addAsset')
  }

  useEffect(() => {
    const val = get(options, '[0].name', '')
    setValue(val)
  }, [options])

  return (
    <Box flex toCenterY>
      <Select
        width={140}
        size="sm"
        options={options.map((i) => ({ label: i.name, value: i.name }))}
        value={value}
        onChange={(v: number) => {
          setValue(v)
        }}
      />
      <Button onClick={() => spotCallBack(value)} ml4 mr4>Sync spot orders</Button>
      <Button ml2 onClick={onAddAsset}>Add code</Button>
    </Box>
  )
}
