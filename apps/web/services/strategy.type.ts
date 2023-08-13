import { PaginationType, ResType } from './base'
import { SpotOrder } from './spot.type'

export interface Api {
  getStgOrders: (
    StgOrdersParams: StgOrdersParams,
  ) => Promise<ResType<StgOrders>>
  createSpotStg: (spotOrders: SpotOrder[]) => Promise<ResType<null>>
  resetStg: (resetStg: ResetStg) => Promise<ResType<null>>
  closeStg: (spotStgOperation: SpotStgOperation) => Promise<ResType<null>>
  mergeOrder: (spotStgOperation: SpotStgOperation) => Promise<ResType<null>>
  syncStgPrice: (syncStgPriceType: SyncStgPriceType[]) => Promise<ResType<null>>
}

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

export interface SpotStgOperation {
  spotOrders: SpotOrder[]
  stgOrder: StgOrder
}

export type FetchStgOrdersParams = {
  current?: number
  page?: number
}

export type FetchStgOrdersAction = {
  payload: ResType<StgOrders>
  type: string
}

export interface StgFilter {
  status: number
  asset: string
}
