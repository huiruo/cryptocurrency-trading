import React, { useState } from 'react'
import { Button } from '../../components/Button/index'
import { Input } from '../../components/Input/index'
import './orderOperation.scss'

const OrderOperation =()=>{

  const [sellCode, setSellCode] = useState('')
  const [sellPrice, setSellPrice] = useState('')
  const [buyCode, setBuyCode] = useState('')
  const [buyPrice, setBuyPrice] = useState('')

  // /*
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
  // */

  return (
        <div className='flex'>
          <div style={{padding:'1.6rem'}}>
              <div>
                <Input onChange={(e) => { setSellCode(e.target.value) }} value={sellCode} placeholder="请输入种类"/>
              </div>
              <div>
                <Input onChange={(e) => { setSellPrice(e.target.value) }} value={sellPrice} placeholder="请输入价格"/>
                {/* <Input onChange={(e) => { setSellPrice(e.target.value) }} value={sellPrice} size={2}/> */}
              </div>
            <Button
              w-100p
              onClick={() => { onBuy() }}
              size="lg"
            >
            xxxxx
            </Button>
            {/* 新建购买订单 */}
          </div>

          <div style={{padding:'1.6rem'}}>
            <div>
              <div>
                <Input onChange={(e) => { setBuyCode(e.target.value) }} value={buyCode} placeholder="请输入种类"/>
              </div>
              <div>
                <Input onChange={(e) => { setBuyPrice(e.target.value) }} value={buyPrice} placeholder="请输入价格"/>
              </div>
            </div>
            <Button
              w-100p
              onClick={() => { onSell() }}
              size="lg"
              colorScheme="#e92424"
            >
              xxxxx
            </Button>
            {/* 新建卖出订单 */}
          </div>
        </div>
  );
}

export default OrderOperation;