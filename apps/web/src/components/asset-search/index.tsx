import React, { useEffect, useState } from 'react';
import { Button } from '@/common/button';
import { AssetType, SearchParmas } from '@/utils/types';
import { Select } from '@/common/select';
import { get } from 'lodash';
import { Box } from '@fower/react';

interface Props {
  // test: React.ReactNode
  options: AssetType[]
  spotCallBack: (searchParmas: SearchParmas) => void
  selectCallback: (val: string) => void
}

/**
 * Code annotation
 */
export function AssetSearch(props: Props) {
  const { options, spotCallBack, selectCallback } = props
  const [value, setValue] = useState<string>('')

  const onSearch = () => {
    console.log('onSearch:', value);
    const params = {
      currentPage: 1,
      pageSize: 10,
      symbol: value
    }

    spotCallBack(params)
  }

  /*
  useEffect(() => {
    const val = get(options, '[0].name', '')
    setValue(val)
  }, [options])
  */

  return (
    <Box flex toCenterY mt='10px'>
      <Select
        width={140}
        size="sm"
        options={options.map((i) => ({ label: i.name, value: i.name }))}
        value={value}
        onChange={(v: string) => {
          setValue(v)
          selectCallback(v)
        }}
      />
      <Button onClick={() => onSearch()} ml4 mr4>Search</Button>
    </Box>
  );
}
