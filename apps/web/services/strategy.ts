import { apiPrefix } from '@common/constants'
import { ResType, fetchWithAuth } from './base'
import { Api, StraOrdersParams, StraOrders } from './strategy.type'
import { SpotOrder } from './spot.type'

interface ApiConfig {
  getSpotOrders: string
  createSpotStra: string
}

const apiConfig: ApiConfig = {
  getSpotOrders: '/strategy/straOrder',
  createSpotStra: '/strategy/createSpotStra',
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
  createSpotStra: async (spotOrders: SpotOrder[]): Promise<ResType<null>> => {
    const url = `${apiPrefix}${apiConfig.createSpotStra}`
    return await fetchWithAuth<null>(url, { body: spotOrders }, 'POST')
  },
}
