import React,{ useState } from 'react'
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
    <div>
      <div>
        <Input onChange={(e) => onSearch(e)} value={searchVal} placeholder="请输入种类"/>
      </div>
      <div>
        <div style={{height:'2rem',lineHeight:'2rem'}}>交易对</div>

        {currencyList.map(item=>{
          return (
            <div className='toCenterY' style={{height:'2.4rem',cursor: 'pointer'}} key={item.id} onClick={()=>onSymbolItem(item.symbol)}>{item.symbol}</div>
          )
        })}

      </div>
    </div>
  );
}

export default App;