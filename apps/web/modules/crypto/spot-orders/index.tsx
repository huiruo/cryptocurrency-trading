import React from 'react'
import SpotOperation from './spot-operation'
import { spotApi } from '@services/spot'
import { GetSpotOrderParamsNoPage } from '@services/spot.type'

export default function SpotOrders() {
  const getSpotOrdersUtil = async ({
    symbol,
    pageSize = 10,
    currentPage = 1,
  }: GetSpotOrderParamsNoPage) => {
    const res = await spotApi.getSpotOrders({ pageSize, currentPage, symbol })
    console.log('getSpotOrdersUtil==>', res)
  }

  return (
    <div>
      <SpotOperation searchCallBack={getSpotOrdersUtil} />
    </div>
  )
}
