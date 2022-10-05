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
