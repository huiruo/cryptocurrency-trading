import { PaginationType, ResType } from './base'

export interface Api {
  syncFutureOrder: (
    syncSpotOrderParams: SyncFutureOrderParams,
  ) => Promise<ResType<null>>
  getFutureOrders: (
    getSpotOrderParams: GetFutureOrderParams,
  ) => Promise<ResType<FutureOrders>>
}

export interface SyncFutureOrderParams {
  symbol: string
  startTime: number
  endTime: number
  recvWindow?: number
}

export interface GetFutureOrderParams extends PaginationType {
  symbol?: string
}

export interface FutureOrder {
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

export interface FutureOrders {
  data: FutureOrder[]
  total: number
  currentPage: number
  pageSize: number
}
