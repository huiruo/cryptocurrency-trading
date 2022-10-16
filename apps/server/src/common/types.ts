import { SpotOrder } from "src/data-center/spot-order.entity";
import { StrategiesOrder } from "src/data-center/strategies-order.entity";

export interface balancesType {
  id?: string;
  asset: string;
  free: string;
  locked: string;
  updateTime: number;
}

export interface SymbolType {
  symbol: string;
}

export interface cryptoWalletType {
  makerCommission: number;
  takerCommission: number;
  buyerCommission: number;
  sellerCommission: number;
  canTrade: boolean;
  canWithdraw: boolean;
  canDeposit: boolean;
  updateTime: number;
  accountType: string;
  balances: balancesType[];
}

export interface StrategyProfit {
  profit: number
  profitRate: string
}

export interface AssetType {
  name: string
  symbol: string
  code?: string
}

export interface SyncSpotOrderParams {
  name: string
}


export interface CreateOrdersStrategy {
  userId: number
  qty: string
  quoteQty: string
  entryPrice: string
  sellingPrice: string
  sellingQty: string
  sellingQuoteQty: string
  sellingTime: number
  symbol: string
  time: number
  strategyId: string
}

export interface CalculateStrategiesOrderType {
  qty: string
  quoteQty: string
  entryPrice: string
  isTheSameSymbol: boolean
}

export interface CalculateCloseStrategyOrderType {
  sellingQty: string
  sellingQuoteQty: string
  sellingPrice: string
  realizedProfit: number,
  realizedProfitRate: string,
  isTheSameSymbol: boolean
  isTheSameSide: boolean
}

export interface MergeSpotStrategyParams {
  spotOrders: SpotOrder[]
  strategyOrder: StrategiesOrder
}

export interface SearchParmas {
  currentPage: number;
  pageSize: number;
  symbol?: string;
}

export interface FiterStrategyOrderType {
  is_running: string | number
  symbol: string
  currentPage?: number
  pageSize?: number
}
