const {APIBase} = require('./APIBase')
const { flowRight } = require('./helpers/utils')
const {
  Blvt, Bswap, SubAccount, Market, Trade, Futures, Fiat,
  Wallet, Margin, Mining, Savings, Stream, Websocket, C2C
} = require('./modules')
import {binanceConnectorType,optionsType} from './types'

export {}
class binanceConnector extends flowRight(Blvt, Bswap, SubAccount, Websocket, Stream,
  Savings, Margin, Mining, Wallet, Market, Trade, Futures, Fiat, C2C)(APIBase){
  constructor(apiKey = '', apiSecret = '', proxyUrl,options:optionsType = {},){
    console.log("binanceConnector--->1",apiKey)
    console.log("binanceConnector--->2",apiSecret)
    console.log("binanceConnector--->3",options)
    console.log("binanceConnector--->4",proxyUrl)
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