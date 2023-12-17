import { AssetBalance } from 'binance-api-node'

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

export interface AssetType {
  name: string
  symbol: string
  code?: string
  tradeUrl?: string
}

export interface IMonitorAsset {
  balance: string
  symbol: string
}
