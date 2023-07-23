import { AssetBalance } from 'binance-api-node'

export interface SyncSpotOrderParams {
  symbol: string
  startTime: number
  endTime: number
  recvWindow?: number
}

export interface NewAssetBalance extends AssetBalance {
  /** 挂单的锁定 */
  locked: string
  /** 币价值 */
  quoteQty?: number
  /** 可以出售的free,当有理财才有值，否则直接取free进行出售 */
  canSellFree?: string
}

export interface StatisticsAccountRes {
  balances: NewAssetBalance[]
  total: number
  alCoinVal: number
  otherCoinVal: number
  alCoinValRatio: number
  otherCoinValRatio: number
  maxOtherCoinRatio: number
  maxPositionRatio: number
}
