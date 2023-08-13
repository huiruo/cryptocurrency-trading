import { PaginationType, ResType } from './base'

export interface Api {
  syncFutureOrder: (
    syncSpotOrderParams: SyncFutureOrderParams,
  ) => Promise<ResType<null>>
  getFutureOrders: (
    options: GetFutureOrderParams,
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
  id: string
  userId: string
  strategyId: string
  orderId: string
  symbol: string
  status: string
  clientOrderId: string
  price: string
  avgPrice: string
  origQty: string
  executedQty: string
  cumQuote: string
  type: string
  reduceOnly: number | boolean
  closePosition: number | boolean
  side: string
  positionSide: string
  stopPrice: string
  workingType: string
  priceProtect: number | boolean
  origType: string
  time: string
  updateTime: string
  strategyStatus: number
  updatedAt: string
  createdAt: string
}

export interface FutureOrders {
  data: FutureOrder[]
  total: number
  currentPage: number
  pageSize: number
}

export type FutureOrdersParams = {
  current?: number
  page?: number
}

export type FetchFutureOrdersAction = {
  payload: ResType<FutureOrders>
  type: string
}

export interface FutureFilter {
  symbol: string
}
