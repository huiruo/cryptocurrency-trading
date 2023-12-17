import { SUCCESS } from '@common/constants'
import { marketCenterApi } from '@services/market.center'
import { IMonitorwallet } from '@services/market.center.type'
import { Button } from 'antd'
import React, { useState } from 'react'

export const WalletData = () => {
  const [monitorwalletData, setMonitorwalletData] = useState<IMonitorwallet>({
    symbol: '',
    balance: '',
  })

  const onMonitorwallet = async () => {
    const res = await marketCenterApi.monitorwallet()
    console.log('onSyncBalances:', res)
    if (res.code === SUCCESS) {
      setMonitorwalletData(res.data)
    } else {
      alert('monitorwallet error')
    }
  }

  return (
    <div>
      <Button onClick={() => onMonitorwallet()}>Monitor wallet</Button>
      <div>{monitorwalletData.balance}</div>
      <div>{monitorwalletData.symbol}</div>
    </div>
  )
}
