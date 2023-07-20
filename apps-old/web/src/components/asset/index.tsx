import React, { useEffect, useState } from 'react';
import { AssetType } from '@/utils/types';
import { Select } from '@/common/select';
import traderApi from '@/services/traderApi';
import { toast } from '@/common/toast';

interface Props {
  onChange: (val: any) => void
  value: string | number
}

/**
 * Code annotation
 */
export function Asset(props: Props) {
  const { onChange, value } = props
  const [options, setOptions] = useState<AssetType[]>([])


  const getAsset = async () => {
    const res = await traderApi.getAssetApi()
    if (res.code === 200) {
      setOptions(res.data)
    } else {
      toast.error('Failed to get asset')
    }
  }

  useEffect(() => {
    getAsset()
    onChange(value)
  }, [])

  return (
    <Select
      renderSearch={true}
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