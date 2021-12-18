import React,{ useEffect,useState } from 'react'
import { Box } from '@fower/react'
import Header from '../../components/Header/index'
import traderApi from "../../services/traderApi"
import { itemType,orderItemType } from '../../utils/types'
import { formatUnixTime } from '../../utils/index'

const Account =()=>{

  const [orderList,setOrderList] = useState<orderItemType[]>([])

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

  const getSymbolOrder= async(symbol:string)=>{
    const data = { symbol }
    const res = await traderApi.getMyTrades(data)
    console.log("onSymbolItem",res)
    setOrderList(res.data)
  }

  useEffect(()=>{
    getSymbolOrder(currencyList[1].symbol)
  },[])

  /*
  const renderNicknameColumn = () => {
    return <span>{xxx}</span>
  }
  */

  const onSymbolItem= async(symbol:string)=>{
    getSymbolOrder(symbol)
  }

  return (
    <Box w='100%'>
      <Header />
      <Box w='100%'>
        <Box px='1.2rem' pt='.rem'>
          <Box>
            <Box h='.2rem' leading='.2rem'>交易对</Box>
            {currencyList.map(item=>{
              return (
                <Box key={item.id} onClick={()=>onSymbolItem(item.symbol)} toCenterY h='.24rem' cursor='pointer' bgYellow500--hover>{item.symbol}</Box>
              )
            })}
          </Box>
          <Box>
            {/* table start */}
            <Box as='table' w="100%">
              <Box as='thead' bg='aliceblue' style={{border:'1px solid #f0f0f0'}}>
                <tr>
                  {/*  
                  <Box as='th'>
                    <div>
                      <Checkbox
                        value="all"
                        onChange={(e) => {
                          if (e.target.checked) {
                            checkAllChange()
                          } else {
                            setCheckList([])
                          }
                        }}
                      />
                    </div>
                  </Box>
                  */}
                  <Box as='th'>交易对</Box>
                  <Box as='th'>ID</Box>
                  <Box as='th'>订单ID</Box>
                  <Box as='th'>成交价格</Box>
                  <Box as='th'>成交量</Box>
                  <Box as='th'>成交金额</Box>
                  <Box as='th'>交易费金额</Box>
                  <Box as='th'>易费资产类型</Box>
                  <Box as='th'>交易时间</Box>
                  <Box as='th'>是否是买家</Box>
                  <Box as='th'>是否是挂单方</Box>
                  <Box as='th'>isBestMatch</Box>
                </tr>
              </Box>
              <tbody>
                {orderList.map((item:orderItemType) => {
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
                      <Box as='td'>{item.symbol}</Box>
                      <Box as='td'>{item.id}</Box>
                      <Box as='td'>{item.orderId}</Box>
                      <Box as='td'>{item.price}</Box>
                      <Box as='td'>{item.qty}</Box>
                      <Box as='td'>{item.quoteQty}</Box>
                      <Box as='td'>{item.commission}</Box>
                      <Box as='td'>{item.commissionAsset}</Box>
                      {/* <Box as='td'>{item.time}</Box> */}
                      {/* <Box as='td'>{getDateTimeStr(item.time*1)}</Box> */}
                      <Box as='td'>{formatUnixTime(Number(item.time))}</Box>
                      <Box as='td'>{item.isBuyer?'是':'否'}</Box>
                      <Box as='td'>{item.isMaker?'是':'否'}</Box>
                      <Box as='td'>{item.isBestMatch?'是':'否'}</Box>
                    </Box>
                  )
                })}
              </tbody>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Account;