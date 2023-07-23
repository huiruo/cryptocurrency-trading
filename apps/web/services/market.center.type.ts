import { ResType } from './base'

export const enum TradingType {
  // eslint-disable-next-line no-unused-vars
  MARGIN = 'MARGIN',
  // eslint-disable-next-line no-unused-vars
  SPOT = 'SPOT',
}

export type TradingType_LT = 'MARGIN' | 'SPOT'

export interface Account {
  accountType: TradingType.MARGIN | TradingType.SPOT
  balances: AssetBalance[]
  buyerCommission: number
  canDeposit: boolean
  canTrade: boolean
  canWithdraw: boolean
  makerCommission: number
  permissions: TradingType_LT[]
  sellerCommission: number
  takerCommission: number
  updateTime: number
}

export interface AssetBalance {
  asset: string
  free: string
  locked: string
}

export interface NewAssetBalance extends AssetBalance {
  /** 挂单的锁定 */
  locked: string
  /** 币价值 */
  quoteQty?: number
  /** 可以出售的free,当有理财才有值，否则直接取free进行出售 */
  canSellFree?: string
}

export interface StatisticsAccountResponse {
  balances: NewAssetBalance[]
  total: number
  alCoinVal: number
  otherCoinVal: number
  alCoinValRatio: number
  otherCoinValRatio: number
  maxOtherCoinRatio: number
  maxPositionRatio: number
}

export interface Api {
  syncAccount: () => Promise<ResType<Account>>
  statisticsAccount: () => Promise<ResType<StatisticsAccountResponse>>
}
