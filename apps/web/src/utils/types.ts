
export type TickerInter = {
  lastPrice: string;      //最新价格
  lastQty: string;  //最新成交的数量
  bidPrice: string;  //买一价
  bidQty: string;         //买一价对应的数量
  askPrice: string;  //卖一价
  askQty: string;         //卖一价对应的量
  highPrice: string;   //24h最高价
  lowPrice: string;   //24h最低价
  volume: string;  //24h成交量(USDT)
  quoteVolume: string; //24h成交额(USDT)
  openPrice: string; //开盘价

  priceChange: string;      //24h涨跌
  priceChangePercent: string;      //24h涨幅
  prevClosePrice: string; //上一个收盘价
  openTime: number;  //integer($int64)
  closeTime: number; //integer($int64)
  count: number;  //成交笔数
}

export interface itemType {
  id: number,
  symbol: string
}

export interface orderItemType {
  symbol: string,
  id: number,
  orderId: number,
  orderListId: number,
  price: string,
  qty: string,
  quoteQty: string,
  commission: string,
  commissionAsset: string,
  time: number,
  isBuyer: boolean,
  isMaker: boolean,
  isBestMatch: boolean
}

export interface balancesType {
  id?: string,
  asset: string,
  free: string,
  locked: string,
  updateTime: number
}

export interface SymbolListType {
  id?: string,
  symbol: string,
  // baseAsset:string,
  // quoteAsset:string,
  code: string,
}

export interface strategyType {
  id?: string,
  asset: string,
  quantity: string,
  price: string,
  cost_price: number,
  profit_ratio: string,
  profit_amount: number,
  update_time: string,
  first_order_id: string,
  first_order_price: string,
  last_order_id: string,
  last_order_price: string,
  is_running: number
}

export interface SpotOrder {
  id: number;
  userId: number;
  strategyId?: string;
  orderId: number;
  symbol: string;
  price: string;
  qty: string;
  quoteQty: string;
  commission: string;
  commissionAsset: string;
  isBuyer: boolean;
  isMaker: boolean;
  isBestMatch: boolean;
  time: number;
  updatedAt?: number;
  createdAt?: number;
}

export interface StrategiesOrder {
  id: number;
  userId: number;
  strategyId: string;
  symbol: string;
  price: string;
  qty: string;
  quoteQty: string;
  profit: number;
  profitRate: string;
  entryPrice: string;
  sellingPrice: string;
  is_running: boolean;
  time: number;
  updatedAt?: number;
  createdAt?: number;
}

export interface FuturesOrder {
  id: number;
  userId: number;
  strategyId?: string;
  orderId: number;
  symbol: string;
  status: string;
  clientOrderId: string;
  price: string;
  avgPrice: string;
  origQty: string;
  executedQty: string;
  cumQuote: string;
  timeInForce: string;
  type: string;
  reduceOnly: boolean;
  closePosition: boolean;
  side: string;
  positionSide: string;
  stopPrice: string;
  workingType: string;
  priceProtect: boolean;
  origType: string;
  time: number;
  updateTime?: number;
  updatedAt?: number;
  createdAt?: number;
}

export interface BalancesTypes {
  id: number;
  userId: number;
  asset: string;
  free: string;
  locked: string;
  updatedAt?: number;
  createdAt?: number;
}