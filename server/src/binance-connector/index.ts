const { APIBase } = require('./APIBase')
const { flowRight } = require('./helpers/utils')
const {
  Blvt, Bswap, SubAccount, Market, Trade, Futures, Fiat,
  Wallet, Margin, Mining, Savings, Stream, Websocket, C2C
} = require('./modules')
import { optionsType } from './types'

export {}
class binanceConnector extends flowRight(Blvt, Bswap, SubAccount, Websocket, Stream,
  Savings, Margin, Mining, Wallet, Market, Trade, Futures, Fiat, C2C)(APIBase){
  constructor(apiKey = '', apiSecret = '', proxyUrl,options:optionsType = {},){
    options.baseURL = options.baseURL || 'https://api.binance.com'
    options.proxyUrl=proxyUrl
    super({
      apiKey,
      apiSecret,
      ...options
    })
  }
}
module.exports.binanceConnector=binanceConnector;