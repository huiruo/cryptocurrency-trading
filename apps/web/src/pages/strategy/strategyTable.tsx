import React,{ useEffect,useState } from 'react'
import { Box } from '@fower/react'
import traderApi from "../../services/traderApi"
import { strategyType } from '../../utils/types'
import { formatUnixTime } from '../../utils/index'
import { Button } from '../../components/Button/index'

const StrategyTable =()=>{

  const [strategies,setStrategies] = useState<strategyType[]>([])

  useEffect(()=>{
    let isUnmount:boolean = false;

    const getStrategies= async()=>{
      const res = await traderApi.getStrategiesApi()
      if(!isUnmount){
        if(res.code===200){
          setStrategies(res.data)
        }else{
          console.log('获取详情失败')
        }
      }
    }

    getStrategies()

    return function cleanup() {
      isUnmount = true
    }
  },[])

  const getStrategies= async()=>{
    const res = await traderApi.getStrategiesApi()
    setStrategies(res.data)
  }

  const onUpdate = async(asset:string)=>{
    const data ={
      symbol:asset
    }
    const res = await traderApi.calculateCostpriceApi(data)
    console.log("onUpdate--->",res)
    getStrategies()
  }

  const onUpdateProfit  = async(asset:string)=>{
    const data ={
      symbol:asset
    }
    const res = await traderApi.updateProfitApi(data)
    console.log("onUpdateProfit--->",res)
    getStrategies()
  }

  const onSync = async()=>{
    console.log('onSync',) 
    // const testSymbol:string = 'BTCUSDT'
    const testSymbol:string = 'ETHUSDT'

    const data = {
      symbol: testSymbol
    }
    const res = await traderApi.updateTradingStrategy(data)
    console.log("onUpdateProfit--->",res)

    setTimeout(()=>{
      console.log("更新表单-----")
      getStrategies()
    },800)

  }

  return (
    <Box>
      <Box flex mb='0.1rem' style={{justifyContent: 'space-between'}}>
        <Box>运行策略</Box>
        <Box>
          <Button
            onClick={() => { onSync() }}
            size="sm"
          >
            同步策略(暂时写死)
          </Button>
        </Box>
      </Box>
      <Box as='table' w="100%">
        <Box as='thead' bg='aliceblue' style={{border:'1px solid #f0f0f0'}}>
          <tr>
            <Box as='th'>交易对</Box>
            <Box as='th'>数量</Box>
            <Box as='th'>当前价格</Box>
            <Box as='th'>持仓成本</Box>
            <Box as='th'>盈亏比率</Box>
            <Box as='th'>盈亏</Box>
            <Box as='th'>更新时间</Box>
            <Box as='th'>第一笔订单</Box>
            <Box as='th'>最后一笔订单</Box>
            <Box as='th'>操作</Box>
          </tr>
        </Box>
        <tbody>
          {strategies.map((item:strategyType) => {
            return (
              <Box as='tr' key={item.id} border-1 borderSolid borderOrange500>
                <Box as='td'>{item.asset}</Box>
                <Box as='td'>{item.quantity}</Box>
                <Box as='td'>{item.price}</Box>
                <Box as='td'>{item.cost_price}</Box>
                <Box as='td'>{item.profit_ratio}%</Box>
                <Box as='td'>{item.profit_amount}</Box>
                <Box as='td'>{formatUnixTime(item.update_time)}</Box>
                <Box as='td'>{item.first_order_price}</Box>
                <Box as='td'>{item.last_order_price}</Box>
                <Box as='td'>
                  <Button
                    onClick={() => { onUpdate(item.asset) }}
                    size="sm"
                    mr='0.1rem'
                  >
                    计算成本 
                  </Button>
                  <Button
                    onClick={() => { onUpdateProfit(item.asset) }}
                    size="sm"
                  >
                    更新盈亏 
                  </Button>
                </Box>
              </Box>
            )
          })}
        </tbody>
      </Box>
    </Box>
  );
}

export default StrategyTable;