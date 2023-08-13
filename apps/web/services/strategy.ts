import { apiPrefix } from '@common/constants'
import { ResType, fetchWithAuth } from './base'
import {
  StgOrdersParams,
  StgOrders,
  ResetStg,
  SyncStgPriceType,
  StgOperation,
} from './strategy.type'
import { SpotOrder } from './spot.type'
import { FutureOrder } from './future.type'

export interface Api {
  getStgOrders: (
    StgOrdersParams: StgOrdersParams,
  ) => Promise<ResType<StgOrders>>
  createSpotStg: (spotOrders: SpotOrder[]) => Promise<ResType<null>>
  createFutureStg: (options: FutureOrder[]) => Promise<ResType<null>>
  resetStg: (resetStg: ResetStg) => Promise<ResType<null>>
  closeStg: (stgOperation: StgOperation) => Promise<ResType<null>>
  mergeOrder: (stgOperation: StgOperation) => Promise<ResType<null>>
  syncStgPrice: (syncStgPriceType: SyncStgPriceType[]) => Promise<ResType<null>>
}

interface ApiConfig {
  getStgOrders: string
  createSpotStg: string
  createFutureStg: string
  resetStg: string
  closeStg: string
  mergeOrder: string
  syncStgPrice: string
}

const apiConfig: ApiConfig = {
  getStgOrders: '/stg/order',
  createSpotStg: '/stg/createSpotStg',
  createFutureStg: '/stg/createFutureStg',
  resetStg: '/stg/reset',
  closeStg: '/stg/close',
  mergeOrder: '/stg/mergeOrder',
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
  createFutureStg: async (options: FutureOrder[]): Promise<ResType<null>> => {
    const url = `${apiPrefix}${apiConfig.createFutureStg}`
    return await fetchWithAuth<null>(url, { body: options }, 'POST')
  },
  resetStg: async (resetStra: ResetStg): Promise<ResType<null>> => {
    const url = `${apiPrefix}${apiConfig.resetStg}`
    return await fetchWithAuth<null>(url, { body: resetStra }, 'POST')
  },
  closeStg: async (options: StgOperation): Promise<ResType<null>> => {
    const url = `${apiPrefix}${apiConfig.closeStg}`
    return await fetchWithAuth<null>(url, { body: options }, 'POST')
  },
  mergeOrder: async (options: StgOperation): Promise<ResType<null>> => {
    const url = `${apiPrefix}${apiConfig.mergeOrder}`
    return await fetchWithAuth<null>(url, { body: options }, 'POST')
  },
  syncStgPrice: async (
    syncStgPriceType: SyncStgPriceType[],
  ): Promise<ResType<null>> => {
    const url = `${apiPrefix}${apiConfig.syncStgPrice}`
    return await fetchWithAuth<null>(url, { body: syncStgPriceType }, 'POST')
  },
}
