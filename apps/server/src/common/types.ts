export interface balancesType{
  id?:string,
  asset:string,
  free:string,
  locked:string,
  updateTime:number
}

export interface cryptoWalletType{
  makerCommission:number,
  takerCommission:number,
  buyerCommission:number,
  sellerCommission:number,
  canTrade:boolean,
  canWithdraw: boolean,
  canDeposit: boolean,
  updateTime:number,
  accountType:string,
  balances: balancesType[]
}