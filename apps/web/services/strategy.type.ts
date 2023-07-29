import { PaginationType, ResType } from './base'
import { SpotOrder } from './spot.type'

export interface Api {
  getStrategyOrders: (
    straOrdersParams: StraOrdersParams,
  ) => Promise<ResType<StraOrders>>
  createSpotStra: (spotOrders: SpotOrder[]) => Promise<ResType<null>>
}

export interface StraOrdersParams extends PaginationType {
  is_running: number
  symbol: string
}

export interface StraOrders {
  data: StraOrder[]
  total: number
}

export interface StraOrder {
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
