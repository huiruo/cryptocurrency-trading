import { SpotOrder } from "src/entity/spot-order.entity";
import { StrategyOrder } from "src/entity/strategy-order.entity";

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
  profit: number;
  profitRate: string;
  netProfit: number;
  free: number
  netProfitRate: string;
}

export interface AssetType {
  name: string
  symbol: string
  code?: string
}

export interface SyncSpotOrderParams {
  symbol: string
  startTime: number
  endTime: number
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
  free?: number
  entryPrice: string
  isTheSameSymbol: boolean
}

export interface CalculateCloseStrategyOrderType {
  sellingQty: string
  sellingQuoteQty: string
  sellingPrice: string
  realizedProfit: number,
  realizedProfitRate: string
  isTheSameSymbol: boolean
  isTheSameSide: boolean
  free: number
  // netProfit: number
  // netProfitRate: string
}

export interface MergeSpotStrategyParams {
  spotOrders: SpotOrder[]
  strategyOrder: StrategyOrder
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

export interface PaginationType {
  currentPage: number
  pageSize: number
}

export interface FilterDate {
  startTime: string
  endTime: string
}


export interface gotResType {
  body?: any;
  statusCode?: string | number;
  error?: string | number;
  statusMessage?: string | number;
  response?: any;
}
