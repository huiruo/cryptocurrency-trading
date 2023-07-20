import React, { useEffect, useState } from 'react'
import { Box } from '@fower/react'
import { Input } from '@/common/input/index'
import useDebounce from '@/utils/useDebounce'

const CrytoIncreaseCalculator = () => {

  const [inputVal, setInputVal] = useState<string>('100')

  const queryUtil = (val: string) => { }

  const delayQuery = useDebounce((val) => queryUtil(val), 1000)
  // const delayQuery = debounce((val)=>queryUtil(val),1000)
  // const delayQuery = useThrottle((val)=>queryUtil(val),1000)

  const onInput = (e: any) => {
    const val = e.target.value
    delayQuery(val)
    setInputVal(val)
  }

  useEffect(() => {
  }, [])

  return (
    <Box>
      CrytoIncreaseCalculator
      <Input onChange={(e) => onInput(e)} value={inputVal} placeholder="请输入价格" />
    </Box>
  );
}

export default CrytoIncreaseCalculator;