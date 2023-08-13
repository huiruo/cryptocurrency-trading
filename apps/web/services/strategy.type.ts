import { PaginationType, ResType } from './base'
import { FutureOrder } from './future.type'
import { SpotOrder } from './spot.type'

export interface SelectStatusType {
  label: string
  name: string | number
}

export interface SyncStgPriceType {
  symbol: string
  qty: string
  entryPrice: string
  quoteQty: string
  userId: number
  strategyId: string
}

export interface StgOrdersParams extends PaginationType {
  is_running: number
  symbol: string
}

export interface StgOrders {
  data: StgOrder[]
  total: number
  currentPage: number
  pageSize: number
}

export interface StgOrder {
  id: number
  symbol: string
  price: string
  side: number
  orderType: number
  leverage: number
  entryPrice: string
  sellingPrice: string
  sellingTime: number
  qty: string
  quoteQty: string
  sellingQty: string
  sellingQuoteQty: string
  profit: number
  profitRate: string
  realizedProfit: number
  realizedProfitRate: string
  free: number
  stopType: number
  stopProfit: string
  stopLoss: string
  stopProfitPrice: string
  stopLossPrice: string
  note: string
  klineShots: string
  is_running: boolean
  userId: number
  strategyId: string
  time: number
  updatedAt: number
  createdAt?: number
}

export type OrderType = 'future' | 'spot'

export interface ResetStg {
  strategyId: string
  orderType: OrderType
}

export interface StgOperation {
  orders: SpotOrder[] | FutureOrder[]
  stgOrder: StgOrder
  orderType: OrderType
}

export type FetchStgOrdersParams = {
  current?: number
  page?: number
}

export type FetchStgOrdersAction = {
  payload: ResType<StgOrders>
  type: string
}

export type StgStatus = 2 | 1 | 0

export interface StgFilter {
  status: StgStatus
  asset: string
}
