import React, { useState } from 'react';
import { Box } from '@fower/react';
import { Button } from '@/common/button';
import { Select } from '@/common/select';
import { SelectType } from '@/utils/types';

interface Props {
  // test: React.ReactNode
  fiterStrategyOrderCallback: (val: string) => void
}


const options: SelectType[] = [
  {
    label: '',
    name: '',
  },
  {
    label: '',
    name: '',
  }
]

/**
 * Code annotation
 */
export function StrategieyFilter(props: Props) {
  const { fiterStrategyOrderCallback } = props
  const [value, setValue] = useState<string>('')

  const onFiterStrategyOrder = () => {
    console.log('onFiterStrategyOrder');
  }

  return (
    <>
      <Select
        width={140}
        size="sm"
        options={options.map((i) => ({ label: i.name, value: i.name }))}
        value={value}
        onChange={(v: string) => {
          setValue(v)
          // selectStatusCallback(v)
        }}
      />
      <Button onClick={() => onFiterStrategyOrder()} mr4>Sync spot orders</Button>
    </>
  );
}
