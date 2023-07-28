import React from 'react'
import store from '@stores/index'
import SpotOperation from './spot-operation'
import { spotApi } from '@services/spot'
import { GetSpotOrderParamsNoPage } from '@services/spot.type'
import { appStoreActions } from '@stores/appSlice'
import { SUCCESS } from '@common/constants'
import { message } from 'antd'
import SpotTable from './SpotTable'

export default function SpotOrders() {
  const getSpotOrdersUtil = async ({
    symbol,
    pageSize = 10,
    currentPage = 1,
  }: GetSpotOrderParamsNoPage) => {
    const res = await spotApi.getSpotOrders({ pageSize, currentPage, symbol })
    if (res.code === SUCCESS) {
      store.dispatch(appStoreActions.setSpotOrders(res.data))
    } else {
      message.error(res.msg || 'error')
    }
  }

  return (
    <div className="spot-container">
      <SpotOperation searchCallBack={getSpotOrdersUtil} />
      <SpotTable />
    </div>
  )
}
