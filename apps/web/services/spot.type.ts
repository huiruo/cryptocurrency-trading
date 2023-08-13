import { PaginationType, ResType } from './base'

export interface Api {
  addAsset: (assetType: AssetType) => Promise<ResType<null>>
  getAssets: (pagination: PaginationType) => Promise<ResType<AssetType[]>>
  syncSpotOrder: (
    syncSpotOrderParams: SyncSpotOrderParams,
  ) => Promise<ResType<null>>
  getSpotOrders: (
    getSpotOrderParams: GetSpotOrderParams,
  ) => Promise<ResType<SpotOrders>>
}

export interface AssetType {
  name: string
  symbol: string
  code?: string
  tradeUrl?: string
}

export interface SyncSpotOrderParams {
  symbol: string
  startTime: number
  endTime: number
  recvWindow?: number
}

export interface GetSpotOrderParams extends PaginationType {
  symbol?: string
}

export interface GetSpotOrderParamsNoPage {
  symbol: string
  currentPage?: number
  pageSize?: number
}

export interface SpotOrder {
  id: number
  userId: number
  strategyId: string
  orderId: number
  symbol: string
  price: string
  qty: string
  quoteQty: string
  commission: string
  commissionAsset: string
  isBuyer: number | boolean
  strategyStatus: number
  isMaker: boolean
  isBestMatch: boolean
  time: number
  updatedAt: number
  createdAt: number
}

export interface SpotOrders {
  data: SpotOrder[]
  total: number
  currentPage: number
  pageSize: number
}

export type SpotOrdersParams = {
  current?: number
  page?: number
}

export type FetchSpotOrdersAction = {
  payload: ResType<SpotOrders>
  type: string
}

export interface SpotFilter {
  symbol: string
}
