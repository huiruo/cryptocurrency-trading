import { apiPrefix } from '@common/constants'
import {
  PaginationResType,
  PaginationType,
  ResType,
  fetchWithAuth,
} from './base'
import {
  Api,
  AssetType,
  GetSpotOrderParams,
  SpotOrder,
  SyncSpotOrderParams,
} from './spot.type'

interface ApiConfig {
  addAsset: string
  getAssets: string
  syncSpotOrder: string
  getSpotOrders: string
}

const apiConfig: ApiConfig = {
  addAsset: '/market.center/addAsset',
  getAssets: '/market.center/assets',
  syncSpotOrder: '/spot/syncOrder',
  getSpotOrders: '/spot/orders',
}

export const spotApi: Api = {
  addAsset: async (asset: AssetType): Promise<ResType<null>> => {
    const url = `${apiPrefix}${apiConfig.addAsset}`
    return await fetchWithAuth<null>(url, { body: asset }, 'POST')
  },
  getAssets: async (
    pagination: PaginationType,
  ): Promise<ResType<AssetType[]>> => {
    const url = `${apiPrefix}${apiConfig.getAssets}`
    return await fetchWithAuth<AssetType[]>(url, { body: pagination }, 'POST')
  },
  syncSpotOrder: async (
    syncSpotOrderParams: SyncSpotOrderParams,
  ): Promise<ResType<null>> => {
    const url = `${apiPrefix}${apiConfig.syncSpotOrder}`
    return await fetchWithAuth<null>(url, { body: syncSpotOrderParams }, 'POST')
  },
  getSpotOrders: async (
    getSpotOrderParams: GetSpotOrderParams,
  ): Promise<ResType<PaginationResType<SpotOrder>>> => {
    const url = `${apiPrefix}${apiConfig.getSpotOrders}`
    return await fetchWithAuth<PaginationResType<SpotOrder>>(
      url,
      { body: getSpotOrderParams },
      'POST',
    )
  },
}
