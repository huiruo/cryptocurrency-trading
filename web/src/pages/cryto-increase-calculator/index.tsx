import React,{ useEffect, useState } from 'react'
// import {debounce} from 'lodash'
import { Box } from '@fower/react'
import { Input } from '../../components/Input/index'
import useDebounce from '../../utils/useDebounce'
// import useThrottle from '../../utils/useThrottle'

const CrytoIncreaseCalculator =()=>{

  const [inputVal, setInputVal] = useState<string>('100')

  const queryUtil = (val:string)=>{
    console.log('分割线------>','query:',val)
  }

  // const delayQuery = debounce((val)=>queryUtil(val),1000)
  const delayQuery = useDebounce((val)=>queryUtil(val),1000)
  // const delayQuery = useThrottle((val)=>queryUtil(val),1000)

  const onInput = (e:any)=>{
    const val = e.target.value
    console.log('input:',val)

    delayQuery(val)

    setInputVal(val)
  }

  useEffect(()=>{
  },[])

  return (
    <Box>
      CrytoIncreaseCalculator 
      <Input onChange={(e) => onInput(e)} value={inputVal} placeholder="请输入价格"/>
    </Box>
  );
}

export default CrytoIncreaseCalculator;