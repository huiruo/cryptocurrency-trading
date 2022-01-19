import React,{ useState } from 'react'
import { Box } from '@fower/react'
import { Input } from '../../../components/Input/index'
import traderApi from "../../../services/traderApi"

interface itemType {
  id:number,
  symbol:string
}
const App =()=>{
  const [searchVal, setSearchVal] = useState<string>('')
  const [currencyList] = useState<itemType[]>([
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

  const onSymbolItem= async(symbol:string)=>{
    const data = { symbol }
    const res = await traderApi.getMyTrades(data)
    console.log("onSymbolItem",res)
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
            <Box key={item.id} onClick={()=>onSymbolItem(item.symbol)} toCenterY h='.24rem' cursor='pointer' bgYellow500--hover>{item.symbol}</Box>
          )
        })}
      </Box>
    </Box>
  );
}

export default App;