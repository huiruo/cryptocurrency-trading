import React,{useEffect,useState} from 'react'
import { Box } from '@fower/react'
import OrderOperation from './orderOperation.tsx'
// import UserPanel from './userPanel.tsx'
import TraderHeader from './traderHeader.tsx'
import traderApi from "../../services/traderApi.ts"
// import {TickerInter} from '../../utils/types.ts'

interface TickerInter{
  lastPrice: string //最新价格
  lastQty: string  //最新成交的数量
  bidPrice: string //买一价
  bidQty: string   //买一价对应的数量
  askPrice: string //卖一价
  askQty: string   //卖一价对应的量
  highPrice: string//24h最高价
  lowPrice: string //24h最低价
  volume: string   //24h成交量(USDT)
  quoteVolume: string //24h成交额(USDT)
  openPrice: string //开盘价

  priceChange: string,      //24h涨跌
  priceChangePercent: string,      //24h涨幅
  prevClosePrice: string, //上一个收盘价
  openTime: number,  //integer($int64)
  closeTime: number, //integer($int64)
  count: number,  //成交笔数
}

const Trader =()=>{

  const [ticker,setTicker] = useState<boolean>(222)
  const [age, setAge] = useState<boolean>(28)
  // const [ticker,setTicker] = useState()

  useEffect(() => {
    const get24hrTicker = async()=>{
      // const platform = 'binance'
      const platform = 'okex'

      let data=null

      if(platform==='okex'){
        data ={
          symbol:'BTC-USDT',
          platform
        }
      }else{
        data ={
          symbol:'BTCUSDT',
          platform
        }
      }

      const res = await traderApi.get24hrTicker(data)
      if (res.code === 0) {
        const {
          last,
          last_qty,
          best_ask,
          best_ask_size,
          best_bid,
          best_bid_size,
          open_24h,
          high_24h,
          low_24h,
          base_volume_24h,
          quote_volume_24h,
          // timestamp,//UTC 0 时开盘价
          // open_utc0,//UTC+8 时开盘价
          // open_utc8,
        } = res.data
        if(platform==='okex'){
          const tickerData = {
            lastPrice: last,      //最新价格
            lastQty: last_qty,  //最新成交的数量
            bidPrice: best_bid,  //买一价
            bidQty: best_bid_size,         //买一价对应的数量
            askPrice: best_ask,  //卖一价
            askQty: best_ask_size,         //卖一价对应的量
            highPrice: high_24h,   //24h最高价
            lowPrice: low_24h,   //24h最低价
            volume: base_volume_24h,  //24h成交量(USDT)
            quoteVolume: quote_volume_24h, //24h成交额(USDT)
            openPrice: open_24h, //开盘价

            priceChange: "",      //24h涨跌
            priceChangePercent: "",      //24h涨幅
            prevClosePrice: "", //上一个收盘价
            openTime: 0,  //integer($int64)
            closeTime: 0,  //integer($int64)
            count: 0,        //成交笔数
            //以下属性okex没有
            /*
            openTime: 1638083673203,  //integer($int64)
            closeTime: 1638083673203,  //integer($int64)
            count: 1097514,        //成交笔数
            priceChange: "135.22000000",      //24h涨跌
            priceChangePercent: "0.249",      //24h涨幅
            prevClosePrice: "54377.08000000", //上一个收盘价
            */
          }
          // let test:string = ''
          // test =222
          console.log("tickerData",tickerData)
          // setTicker(tickerData)
          setTicker("test")
        }else{

        }
      } else {
        alert("请求错误")
      }
    }
    get24hrTicker()
  },[])

  console.log("ticker--->1",ticker)
  console.log("ticker--->2",ticker)
  return (
    <>
      <Box row h="8.4rem" bgBrand400>
        <Box bgGray100 w="80%">
          <Box bg="#FCD535" h="16%">
            <TraderHeader ticker={ticker} callBack={'test'}/>
          </Box>
          <Box row w="100%" h="84%">
            <Box w='20%' h='100%' bgBlue100>
              <Box bgBrand400 h='50%'>top</Box>
              <Box bgBrand h='50%'>bottom</Box>
            </Box>
            <Box w='80%' h='100%' bgBrand200>
              <Box bg='grey' h='50%'>top</Box>
              <Box bg='beige' h='50%'>
                <OrderOperation />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box bgBrand w="20%" minW=".32rem">
          <Box bgBrand400 h='50%'>top</Box>
          <Box bgBrand h='50%'>bottom</Box>
        </Box>
      </Box>
    </>
  );
}

export default Trader;
