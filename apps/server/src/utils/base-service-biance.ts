import { Exchange } from "./exchange"
import Binance from 'binance-api-node'

export class BaseServiceBiance {

  private client = Binance()
  exchange: Exchange

  constructor(apiKey: string, secretKey: string) {
    this.exchange = new Exchange()

    try {
      this.client = Binance({ apiKey: apiKey, apiSecret: secretKey })
      console.log('=== initBinanceApi success ===');
    } catch (error) {
      throw new Error('apiKey and secretKey are invalid')
    }
  }

  async getAccountInfo() {
    try {

      return await this.client.accountInfo()
    } catch (error) {
      throw new Error('apiKey and secretKey are invalid')
    }
  }

  async futuresAccountInfo() {
    try {

      return await this.client.futuresAccountInfo({ recvWindow: 1000 * 10 })
    } catch (error) {
      throw new Error('apiKey and secretKey are invalid')
    }
  }

  async futuresOpenOrders() {
    try {

      // return await this.client.futuresOpenOrders({
      //   symbol: 'BTCUSDT'
      // })

      return await this.client.futuresAllOrders({
        // symbol: 'BTCUSDT'
        // "startTime": 1662912000000,
        // "endTime": 1664207999999,
        // "page": 1,
        // "rows": 12,
        "symbol": "BTCUSDT",
        // 'limit': 10,
        // recvWindow: 1000 * 10
      })
    } catch (error) {
      throw new Error('apiKey and secretKey are invalid')
    }
  }

  async short(opt?: any) {
    return await this.exchange.short(opt)
  }
}