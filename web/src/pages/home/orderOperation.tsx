import React, { useState } from 'react'
import { Box } from '@fower/react'
import {Button} from '../../components/Button/index.tsx'
import {Input} from '../../components/Input/index.tsx'

const OrderOperation =()=>{

  const [sellCode, setSellCode] = useState('')
  const [sellPrice, setSellPrice] = useState('')
  const [buyCode, setBuyCode] = useState('')
  const [buyPrice, setBuyPrice] = useState('')

  const onBuy=()=>{

    if(buyCode){
      console.log("请输入买入种类")
      return
    }

    if(buyPrice){
      console.log("请输入买入价格")
      return
    }
    console.log("onBuy:",'sellCode:',sellCode,'sellPrice:',sellPrice)
  }

  const onSell=()=>{

    if(buyCode){
      console.log("请输入卖出种类")
      return
    }

    if(buyPrice){
      console.log("请输入卖出价格")
      return
    }
    console.log("onSell",'buyCode:',buyCode,'buyPrice:',buyPrice)
  }

  return (
        <Box flex>
          <Box p='.16rem'>
              <Box>
                <Input onChange={(e) => { setSellCode(e.target.value) }} value={sellCode} placeholder="请输入种类"/>
              </Box>
              <Box>
                <Input onChange={(e) => { setSellPrice(e.target.value) }} value={sellPrice} placeholder="请输入价格"/>
              </Box>
            <Button
              w-100p
              onClick={() => { onBuy() }}
              size="lg"
            >
            xxxxx
            {/* 新建购买订单 */}
            </Button>
          </Box>

          <Box p='.16rem'>
            <Box>
              <Box>
                <Input onChange={(e) => { setBuyCode(e.target.value) }} value={buyCode} placeholder="请输入种类"/>
              </Box>
              <Box>
                <Input onChange={(e) => { setBuyPrice(e.target.value) }} value={buyPrice} placeholder="请输入价格"/>
              </Box>
            </Box>
            <Button
              w-100p
              onClick={() => { onSell() }}
              size="lg"
              colorScheme="#e92424"
            >
              xxxxx
              {/* 新建卖出订单 */}
            </Button>
          </Box>
        </Box>
  );
}

export default OrderOperation;