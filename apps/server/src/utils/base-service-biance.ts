import { Exchange } from "./exchange"
import Binance from 'binance-api-node'

export class BaseServiceBiance {

  private client = Binance()
  exchange: Exchange

  constructor(apiKey: string, secretKey: string) {
    this.exchange = new Exchange()

    try {
      this.client = Binance({ apiKey: apiKey, apiSecret: secretKey })
    } catch (error) {
      throw new Error('apiKey and secretKey are invalid')
    }
    console.log('this.client:', this.client);
  }

  async getAccountInfo() {
    try {
      const accountInfo = await this.client.accountInfo()
      return accountInfo
    } catch (error) {
      throw new Error('apiKey and secretKey are invalid')
    }
  }

  async short(opt?: any) {
    return await this.exchange.short(opt)
  }
}