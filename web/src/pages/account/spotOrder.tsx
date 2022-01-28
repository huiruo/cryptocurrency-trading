import React,{ useEffect,useState } from 'react'
import { Box } from '@fower/react'
import { itemType,orderItemType } from '../../utils/types'
import traderApi from "../../services/traderApi"
import { formatUnixTime } from '../../utils/index'
import { Button } from '../../components/Button/index'

const SpotOrder =()=>{

  const [currencyList] = useState<itemType[]>([
    {
      id:1,
      symbol:'BTCUSDT'
    },
    {
      id:2,
      symbol:'ETHUSDT'
    },
  ])
  const [symbol,setSymbol] = useState<string>('BTCUSDT')
  const [orderList,setOrderList] = useState<orderItemType[]>([])


  const getSymbolOrder= async(symbol:string)=>{
    const data = { symbol }
    const res = await traderApi.getMyTrades(data)
    setOrderList(res.data)
  }

  const onSymbolItem= async(symbol:string)=>{
    setSymbol(symbol)
    getSymbolOrder(symbol)
  }

  useEffect(()=>{
    let isUnmount:boolean = false;

    const getSymbolOrder= async(symbol:string)=>{
      const data = { symbol }
      const res = await traderApi.getMyTrades(data)
      if(!isUnmount){
        setOrderList(res.data)
      }
    }

    getSymbolOrder(symbol)

    return function cleanup() {
      isUnmount = true
    }
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSync = async()=>{
    const res = await traderApi.myTradesFromBinance({symbol})
    if(res.code=== 200){
      setOrderList(res.data)
    }else{
      console.log("同步失败")
    }
  }

  return (
  <Box>
    <Box>

      <Box className='flex' mb='1rem' style={{justifyContent: 'space-between'}}>
        <Box h='2rem' leading='2rem'>交易订单: { symbol }</Box>
        <Box>
          <Button
            onClick={() => { onSync() }}
            size="sm"
          >
            同步订单
          </Button>
        </Box>
      </Box>

      {currencyList.map(item=>{
        return (
          <Box key={item.id} onClick={()=>onSymbolItem(item.symbol)} toCenterY h='2.4rem' cursor='pointer' bgYellow500--hover>{item.symbol}</Box>
        )
      })}
    </Box>
    <Box>
      {/* table start */}
      <Box as='table' w="100%">
        <Box as='thead' bg='aliceblue' style={{border:'1px solid #f0f0f0'}}>
          <tr>
            <Box as='th'>序号</Box>
            <Box as='th'>交易对</Box>
            <Box as='th'>订单ID</Box>
            <Box as='th'>交易方向</Box>
            <Box as='th'>成交价格</Box>
            <Box as='th'>交易时间</Box>
            <Box as='th'>成交量</Box>
            <Box as='th'>成交金额</Box>
            <Box as='th'>交易费金额</Box>
            <Box as='th'>易费资产类型</Box>
            <Box as='th'>是否是挂单方</Box>
            <Box as='th'>isBestMatch</Box>
          </tr>
        </Box>
        <tbody>
          {orderList.map((item:orderItemType,index) => {
            return (
              <Box as='tr' key={item.id} border-1 borderSolid borderOrange500>
                {/*  
                  <Box as='tr'>
                    <div>
                      <Checkbox
                        value={item.id}
                        onChange={(e) => {
                          console.log('-----------xxx:', e.target.checked)
                        }}
                      />
                    </div>
                  </Box>
                */}
                <Box as='td'>{index}</Box>
                <Box as='td'>{item.symbol}</Box>
                <Box as='td'>{item.orderId}</Box>
                <Box as='td'>{item.isBuyer?'买入':'卖出'}</Box>
                <Box as='td'>{item.price}</Box>
                <Box as='td'>{formatUnixTime(Number(item.time))}</Box>
                <Box as='td'>{item.qty}</Box>
                <Box as='td'>{item.quoteQty}</Box>
                <Box as='td'>{item.commission}</Box>
                <Box as='td'>{item.commissionAsset}</Box>
                {/* <Box as='td'>{item.time}</Box> */}
                {/* <Box as='td'>{getDateTimeStr(item.time*1)}</Box> */}
                <Box as='td'>{item.isMaker?'是':'否'}</Box>
                <Box as='td'>{item.isBestMatch?'是':'否'}</Box>
              </Box>
            )
          })}
        </tbody>
      </Box>
    </Box>
  </Box>
  );
}

export default SpotOrder;