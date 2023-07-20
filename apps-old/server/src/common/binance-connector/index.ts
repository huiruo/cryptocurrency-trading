
import { APIBase } from './APIBase'
import { flowRight } from './helpers/utils'

import {
  Blvt,
  Bswap,
  SubAccount,
  Market,
  Trade,
  Wallet,
  Margin,
  Mining,
  Savings,
  Staking,
  Stream,
  Websocket,
  Futures,
  Fiat,
  C2C,
  Loan,
  Pay,
  Convert,
  Rebate,
  NFT,
  GiftCard,
  PortfolioMargin,
} from './modules';

export class BinanceConnector extends flowRight(
  Blvt,
  Bswap,
  SubAccount,
  Market,
  Trade,
  Wallet,
  Margin,
  Mining,
  Savings,
  Staking,
  Stream,
  Websocket,
  Futures,
  Fiat,
  C2C,
  Loan,
  Pay,
  Convert,
  Rebate,
  NFT,
  GiftCard,
  PortfolioMargin,
)(APIBase) {
  constructor(apiKey = '', apiSecret = '', options: any = {}) {
    options.baseURL = options.baseURL || 'https://api.binance.com'
    super({
      apiKey,
      apiSecret,
      ...options
    })
  }
}
