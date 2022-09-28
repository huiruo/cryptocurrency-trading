import { Exchange } from './exchange';
import Binance from 'binance-api-node';

export class BaseServiceBiance {
  private client = Binance();
  exchange: Exchange;

  constructor(apiKey: string, secretKey: string) {
    this.exchange = new Exchange();

    try {
      this.client = Binance({ apiKey: apiKey, apiSecret: secretKey });
      console.log('=== initBinanceApi success ===');
    } catch (error) {
      throw new Error('apiKey and secretKey are invalid');
    }
  }

  async getAccountInfo() {
    try {
      return await this.client.accountInfo();
    } catch (error) {
      throw new Error('apiKey and secretKey are invalid');
    }
  }

  async futuresAccountInfo() {
    try {
      return await this.client.futuresAccountInfo({ recvWindow: 1000 * 10 });
    } catch (error) {
      throw new Error('apiKey and secretKey are invalid');
    }
  }

  async futuresAllOrders() {
    try {
      /*
      return await this.client.futuresOpenOrders({
        symbol: 'BTCUSDT'
      })
      */

      /*
      "startTime": 1662912000000,
      "endTime": 1664207999999,
      recvWindow: 1000 * 10
      */
      return await this.client.futuresAllOrders({
        symbol: 'BTCUSDT',
        // recvWindow: 1000 * 10,
        recvWindow: 59999,
        // limit: 10,
        // orderId: 2850048922,
        // startTime: 1663084800000,
        // endTime: 1664294399999,
      });
    } catch (error) {
      console.log('error', error);

      throw new Error('futuresAllOrders error');
    }
  }

  async futuresBatchOrders() {
    try {
      return await this.client.futuresBatchOrders({ batchOrders: [] });
    } catch (error) {
      console.log('error:', error);
      throw new Error('futuresBatchOrders error');
    }
  }

  async short(opt?: any) {
    return await this.exchange.short(opt);
  }
}
