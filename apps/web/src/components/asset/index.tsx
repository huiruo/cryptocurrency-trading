import React, { useEffect, useState } from 'react';
import { AssetType } from '@/utils/types';
import { Select } from '@/common/select';
import traderApi from '@/services/traderApi';

interface Props {
  onChange: (val: any) => void
  defaultVal?: string | number
  value: string | number
}

/**
 * Code annotation
 */
export function Asset(props: Props) {
  const { onChange, defaultVal = '', value } = props
  // const [value, setValue] = useState<string | number>('')
  const [options, setOptions] = useState<AssetType[]>([])


  const getAsset = async () => {
    const res = await traderApi.getAssetApi()
    if (res.code === 200) {
      setOptions(res.data)
    } else {
      console.log("Get asset oerror")
    }
  }

  useEffect(() => {
    getAsset()
    onChange(value)
  }, [])

  /*
  useEffect(() => {
    const val = get(options, '[0].name', '')
    setValue(val)
  }, [options])
  */

  return (
    <Select
      width={140}
      size="sm"
      options={options.map((i) => ({ label: i.name, value: i.name }))}
      value={value}
      onChange={(v: string) => {
        onChange(v)
      }}
    />
  );
}