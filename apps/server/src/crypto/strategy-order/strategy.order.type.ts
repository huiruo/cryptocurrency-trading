import { PaginationType } from 'src/types'

export interface SyncSpotOrderParams {
  symbol: string
  startTime: number
  endTime: number
  recvWindow?: number
}

export interface GetStraOrderParams extends PaginationType {
  symbol?: string
  is_running: string | number
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

export type OrderType = 'future' | 'spot'

export interface ResetStra {
  strategyId: string
  orderType: OrderType
}
