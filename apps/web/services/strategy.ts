import { apiPrefix } from '@common/constants'
import { ResType, fetchWithAuth } from './base'
import { Api, StraOrdersParams, StraOrders, ResetStra } from './strategy.type'
import { SpotOrder } from './spot.type'

interface ApiConfig {
  getSpotOrders: string
  createSpotStra: string
  resetStra: string
}

const apiConfig: ApiConfig = {
  getSpotOrders: '/strategy/straOrder',
  createSpotStra: '/strategy/createSpotStra',
  resetStra: '/strategy/resetStra',
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
  resetStra: async (resetStra: ResetStra): Promise<ResType<null>> => {
    const url = `${apiPrefix}${apiConfig.resetStra}`
    return await fetchWithAuth<null>(url, { body: resetStra }, 'POST')
  },
}
