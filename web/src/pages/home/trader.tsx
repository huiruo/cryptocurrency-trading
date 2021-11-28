import React,{useEffect} from 'react'
import { Box } from '@fower/react'
import CenterPanel from './centerPanel.tsx'
import OrderOperation from './orderOperation.tsx'
import UserPanel from './userPanel.tsx'
import traderApi from '../../services/traderApi.ts'

const Trader =()=>{
  useEffect(() => {  
    const get24hrTicker = async()=>{
      /*
        1.okex:
        const data={
          symbol:'BTC-USDT',
          platform:'okex'
        }
      */
      /*
      2.binance:
      */
      const data={
        symbol:'BTCUSDT',
        platform:'binance'
      }
      const res = await traderApi.get24hrTicker(data)
      if (res.code === 0) {
        console.log("get24hrTicker:",res.data)
      } else {
        alert("请求错误")
      } 
    }
    get24hrTicker()
  })
  return (
    <>
      <CenterPanel />
      <Box flex h='3.88rem'>
        <UserPanel />
        <OrderOperation />
      </Box>
    </>
  );
}

export default Trader;