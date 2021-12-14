import React,{useState} from 'react'
import { Box } from '@fower/react'
import {Input} from '../../../components/Input/index'

const App =()=>{
  const [searchVal, setSearchVal] = useState('')
  const [currencyList] = useState([
    {
      id:12455,
      symbol:'BTCUSDT'
    },
    {
      id:1244,
      symbol:'ETHUSDT'
    },
  ])

  const onSearch = (e:any)=>{
    setSearchVal(e.target.value)
  }

  const onSymbolItem=()=>{
    console.log("onSymbolItem-->")
  }

  return (
    <Box>
      <Box>
        <Input onChange={(e) => onSearch(e)} value={searchVal} placeholder="请输入种类"/>
      </Box>
      <Box>
        <Box h='.2rem' leading='.2rem'>交易对</Box>
        {currencyList.map(item=>{
          return (
            <Box key={item.id} onClick={()=>onSymbolItem()} toCenterY h='.24rem' cursor='pointer' bgYellow500--hover>{item.symbol}</Box>
          )
        })}
      </Box>
    </Box>
  );
}

export default App;