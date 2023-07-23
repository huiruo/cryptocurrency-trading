import React from 'react'
import { marketCenterApi } from '@services/market.center'
import { Button } from 'antd'
import { SUCCESS } from '@common/constants'

export default function Balances() {
  const onSyncAccount = async () => {
    const res = await marketCenterApi.syncAccount()
    console.log('onSyncBalances:', res)
    if (res.code === SUCCESS) {
      // setBalances(res.data)
    } else {
      alert('get balances error')
    }
  }

  const onStatisticsAccount = async () => {
    const res = await marketCenterApi.statisticsAccount()
    console.log('statisticsAccount:', res)
    if (res.code === SUCCESS) {
      // setBalances(res.data)
    } else {
      alert('statistics Account error')
    }
  }

  return (
    <div>
      <div>
        <Button onClick={() => onSyncAccount()}>sync Account</Button>
        <Button onClick={() => onStatisticsAccount()}>
          statistics Account
        </Button>
      </div>
      hello balances
    </div>
  )
}
