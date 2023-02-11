
import { APIBase } from './APIBase'
import { flowRight } from './helpers/utils'
import { Websocket } from './modules/websocket';
import { Stream } from './modules/stream';

export class BinanceConnector extends flowRight(Websocket, Stream)(APIBase) {
  constructor(apiKey = '', apiSecret = '', options: any = {}) {
    options.baseURL = options.baseURL || 'https://api.binance.com'
    super({
      apiKey,
      apiSecret,
      ...options
    })
  }
}
