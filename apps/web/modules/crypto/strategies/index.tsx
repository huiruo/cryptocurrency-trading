import React, { useEffect } from 'react'
import store from '@stores/index'
import { strategyApi } from '@services/strategy'
import { StraOrdersParams } from '@services/strategy.type'
import { SUCCESS } from '@common/constants'
import { appStoreActions } from '@stores/appSlice'
import { message } from 'antd'
import StraTable from './StraTable'

export default function Strategies() {
  const getSpotOrdersUtil = async (strategyOrdersParams: StraOrdersParams) => {
    const res = await strategyApi.getStrategyOrders(strategyOrdersParams)
    if (res.code === SUCCESS) {
      store.dispatch(appStoreActions.setStraOrders(res.data))
    } else {
      message.error(res.msg || 'error')
    }
  }

  useEffect(() => {
    getSpotOrdersUtil({
      symbol: 'BTCUSDT',
      is_running: 1,
      pageSize: 10,
      currentPage: 1,
    })
  }, [])

  return (
    <div className="strategy-container">
      <StraTable />
    </div>
  )
}
