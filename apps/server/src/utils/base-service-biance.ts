import { Exchange } from './exchange';
import Binance from 'binance-api-node';

export class BaseServiceBiance {
  private client = Binance();
  exchange: Exchange;

  constructor(apiKey: string, secretKey: string) {
    this.exchange = new Exchange();

    try {
      this.client = Binance({ apiKey: apiKey, apiSecret: secretKey });
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

  /*
  Get trades for the current authenticated account and symbol.
  */
  async myTrades(options: any) {
    try {
      const res = await this.client.myTrades(options);

      return {
        isSucceed: true,
        msg: 'Success',
        data: res
      }
    } catch (error) {
      console.log('error', error);
      return {
        isSucceed: false,
        msg: error,
        data: null
      }
      // throw new Error(error);
    }
  }

  /*
  Get all open orders on a symbol.
  */
  async openOrders(options: any) {
    try {
      return await this.client.openOrders(
        options
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  /*
  Get all account orders on a symbol; active, canceled, or filled.
  */
  async allOrders(options: any) {
    try {
      return await this.client.allOrders(
        options
      );
    } catch (error) {
      throw new Error(error);
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
      return await this.client.futuresAllOrders({
        symbol: 'BTCUSDT',
        recvWindow: 59999,
      });
    } catch (error) {

      throw new Error('futuresAllOrders error');
    }
  }

  async futuresOpenOrders() {
    try {
      return await this.client.futuresOpenOrders({
        // symbol: 'BTCUSDT',
        // recvWindow: 59999,
      });
    } catch (error) {

      throw new Error('futuresOpenOrders error');
    }
  }

  async futuresCancelAllOpenOrders(options: {
    symbol: string
  }) {
    try {
      return await this.client.futuresCancelAllOpenOrders(options);
    } catch (error) {

      throw new Error('futuresCancelAllOpenOrders error');
    }
  }

  async futuresBatchOrders() {
    try {
      return await this.client.futuresBatchOrders({ batchOrders: [] });
    } catch (error) {
      throw new Error('futuresBatchOrders error');
    }
  }

  async spotPrice(symbol: string) {
    try {
      return await this.client.prices({ symbol });
    } catch (error) {
      throw new Error(error);
    }
  }

  async futuresPrice(symbol: string) {
    try {
      return await this.client.futuresPrices();
    } catch (error) {
      throw new Error(error);
    }
  }

  async prices(symbol?: string): Promise<{ [index: string]: string }> {
    try {
      return await this.client.prices();
    } catch (error) {
      throw new Error(error);
    }
  }

  async candles(symbol: string, interval: string) {
    try {
      return await this.client.candles({ symbol, interval: '5m' });
    } catch (error) {
      throw new Error(error);
    }
  }

  async short(opt?: any) {
    return await this.exchange.short(opt);
  }
}
