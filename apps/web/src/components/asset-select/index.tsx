import React, { useState } from 'react';
import { Box } from '@fower/react';
import { Select } from '@/common/select';
import { Button } from '@/common/button';
import { useNavigate } from 'react-router-dom';
import { AssetType } from '@/utils/types';
import { get } from 'lodash';

interface Props {
  // test: React.ReactNode
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

  console.log('fjeo:', get(options, '[0]', ''));


  return (
    <>
      <Box toCenterX mb='20px'>
        <Box w='90%'>
          <Box>
            <Select
              width={140}
              size="sm"
              options={options.map((i) => ({ label: i.name, value: i.name }))}
              value={value || get(options, '[0].name', '')}
              onChange={(v: number) => {
                setValue(v)
              }}
            />
          </Box>
          <Button onClick={() => spotCallBack(value)} mr4>Sync spot orders</Button>
          <Button ml2 onClick={onAddAsset}>Add code</Button>
        </Box>
      </Box>
    </>
  )
}
