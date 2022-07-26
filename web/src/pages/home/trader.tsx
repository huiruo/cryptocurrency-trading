import React,{useEffect,useState} from 'react'
import OrderOperation from './orderOperation'
import TraderHeader from './traderHeader'
import {TickerInter} from '../../utils/types'
import CurrencyList from './right/currencyList'
// import traderApi from "../../services/traderApi"
import './trader.scss'

const Trader =()=>{

  // const [ticker,setTicker] = useState<TickerInter>({ 
  const [ticker] = useState<TickerInter>({ 
    lastPrice:'',
    lastQty:'', 
    bidPrice:'',
    bidQty:'', 
    askPrice:'',
    askQty: '',
    highPrice: '',
    lowPrice:'',
    volume:'',
    quoteVolume: '',
    openPrice: '',
    priceChange: '',
    priceChangePercent: '',
    prevClosePrice: '',
    openTime: 0,
    closeTime: 0,
    count: 0,
  })

  useEffect(() => {
    /*
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
      console.log("traderApi.get24hrTicker调用返回:",res)
      // console.log("traderApi.get24hrTicker调用返回:",res)
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
            //openTime: 1638083673203,  //integer($int64)
            //closeTime: 1638083673203,  //integer($int64)
            //count: 1097514,        //成交笔数
            //priceChange: "135.22000000",      //24h涨跌
            //priceChangePercent: "0.249",      //24h涨幅
            //prevClosePrice: "54377.08000000", //上一个收盘价
          }
          console.log("tickerData",tickerData)
          setTicker(tickerData)
        }else{
          console.log("走binance逻辑----->")
        }
      } else {
        alert(res.msg)
      }
    }
    get24hrTicker()
    */
  },[])

  // console.log("ticker--->1:",ticker)
  // console.log("ticker--->2:",setTicker)
  return (
      <div className='flex-row trader-container'>
        <div style={{width:'80%'}}>

          <div style={{height:'16%',background:'grey'}}>
            <TraderHeader ticker={ticker} />
          </div>

          <div className='flex-row' style={{width:'100%',height:'84%'}}>
            <div style={{width:'20%',height:'100%'}}>
              <div style={{height:'50%'}}>top</div>
              <div style={{height:'50%'}}>bottom</div>
            </div>
            <div style={{width:'80%',height:'100%',background:'green'}}>
              <div style={{height:'50%'}}>top</div>
              <div style={{height:'50%'}}>
                <OrderOperation />
              </div>
            </div>
          </div>

        </div>

        <div style={{width:'80%',minWidth: '3.2rem'}}>
          <div style={{height:'50%',border: 'solid 1px #EEF0F2'}}>
            <CurrencyList />
          </div>
          <div style={{height:'50%'}}>bottom</div>
        </div>

      </div>
  );
}

export default Trader;
