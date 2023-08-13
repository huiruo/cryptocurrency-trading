import { PaginationType } from 'src/types'
import { SpotOrder } from '../entity/spot-order.entity'
import { StrategyOrder } from '../entity/strategy-order.entity'
import { FutureOrder } from '../entity/future-order.entity'

export interface StgOrderParams extends PaginationType {
  symbol?: string
  is_running: string | number
}

export type OrderType = 'spot' | 'future'

export interface SyncStgPriceType {
  symbol: string
  qty: string
  entryPrice: string
  quoteQty: string
  userId: number
  strategyId: string
}

export interface CalculateStrategiesOrderType {
  qty: string
  quoteQty: string
  free?: number
  entryPrice: string
  isTheSameSymbol: boolean
}

export interface StrategyProfit {
  profit: number
  profitRate: string
  netProfit: number
  free: number
  netProfitRate: string
}

export interface ResetStg {
  strategyId: string
  orderType: OrderType
}

export interface StgOperation {
  orders: SpotOrder[] | FutureOrder[]
  stgOrder: StrategyOrder
  orderType: OrderType
}

export interface CalculateCloseStrategyOrderType {
  sellingQty: string
  sellingQuoteQty: string
  sellingPrice: string
  realizedProfit: number
  realizedProfitRate: string
  isTheSameSymbol: boolean
  isTheSameSide: boolean
  free: number
  // netProfit: number
  // netProfitRate: string
}
