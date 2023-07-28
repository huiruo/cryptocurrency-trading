import { apiPrefix } from '@common/constants'
import { ResType, fetchWithAuth } from './base'
import { Api, StraOrdersParams, StraOrders } from './strategy.type'

interface ApiConfig {
  getSpotOrders: string
}

const apiConfig: ApiConfig = {
  getSpotOrders: '/strategy.order/straOrder',
}

export const strategyApi: Api = {
  getStrategyOrders: async (
    straOrdersParams: StraOrdersParams,
  ): Promise<ResType<StraOrders>> => {
    const url = `${apiPrefix}${apiConfig.getSpotOrders}`
    return await fetchWithAuth<StraOrders>(
      url,
      { body: straOrdersParams },
      'POST',
    )
  },
}
