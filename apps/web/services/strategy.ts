import { apiPrefix } from '@common/constants'
import { ResType, fetchWithAuth } from './base'
import {
  Api,
  StgOrdersParams,
  StgOrders,
  ResetStg,
  SpotStgOperation,
  SyncStgPriceType,
} from './strategy.type'
import { SpotOrder } from './spot.type'

interface ApiConfig {
  getStgOrders: string
  createSpotStg: string
  resetStg: string
  closeStg: string
  syncStgPrice: string
}

const apiConfig: ApiConfig = {
  getStgOrders: '/stg/order',
  createSpotStg: '/stg/createSpotStg',
  resetStg: '/stg/reset',
  closeStg: '/stg/close',
  syncStgPrice: '/stg/syncPrice',
}

export const strategyApi: Api = {
  getStgOrders: async (
    StgOrdersParams: StgOrdersParams,
  ): Promise<ResType<StgOrders>> => {
    const url = `${apiPrefix}${apiConfig.getStgOrders}`
    return await fetchWithAuth<StgOrders>(
      url,
      { body: StgOrdersParams },
      'POST',
    )
  },
  createSpotStg: async (spotOrders: SpotOrder[]): Promise<ResType<null>> => {
    const url = `${apiPrefix}${apiConfig.createSpotStg}`
    return await fetchWithAuth<null>(url, { body: spotOrders }, 'POST')
  },
  resetStg: async (resetStra: ResetStg): Promise<ResType<null>> => {
    const url = `${apiPrefix}${apiConfig.resetStg}`
    return await fetchWithAuth<null>(url, { body: resetStra }, 'POST')
  },
  closeStg: async (
    spotStgOperation: SpotStgOperation,
  ): Promise<ResType<null>> => {
    const url = `${apiPrefix}${apiConfig.closeStg}`
    return await fetchWithAuth<null>(url, { body: spotStgOperation }, 'POST')
  },
  syncStgPrice: async (
    syncStgPriceType: SyncStgPriceType[],
  ): Promise<ResType<null>> => {
    const url = `${apiPrefix}${apiConfig.syncStgPrice}`
    return await fetchWithAuth<null>(url, { body: syncStgPriceType }, 'POST')
  },
}
