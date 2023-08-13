import { apiPrefix } from '@common/constants'
import { ResType, fetchWithAuth } from './base'
import {
  Api,
  GetFutureOrderParams,
  FutureOrders,
  SyncFutureOrderParams,
} from './future.type'

interface ApiConfig {
  syncFutureOrder: string
  getFutureOrders: string
}

const apiConfig: ApiConfig = {
  syncFutureOrder: '/future/syncOrder',
  getFutureOrders: '/future/orders',
}

export const futureApi: Api = {
  syncFutureOrder: async (
    options: SyncFutureOrderParams,
  ): Promise<ResType<null>> => {
    const url = `${apiPrefix}${apiConfig.syncFutureOrder}`
    return await fetchWithAuth<null>(url, { body: options }, 'POST')
  },
  getFutureOrders: async (
    options: GetFutureOrderParams,
  ): Promise<ResType<FutureOrders>> => {
    const url = `${apiPrefix}${apiConfig.getFutureOrders}`
    return await fetchWithAuth<FutureOrders>(url, { body: options }, 'POST')
  },
}
