import Binance, { MyTrade, NewOrderSpot, Order, OrderType } from 'binance-api-node';
import { Injectable } from '@nestjs/common';
import { Exchange } from './exchange';

@Injectable()
export class BaseServiceBiance {
  private static instance: BaseServiceBiance
  public client = Binance();
  exchange: Exchange;

  constructor() {
    this.exchange = new Exchange();
  }

  public static getInstance(): BaseServiceBiance {
    if (!BaseServiceBiance.instance) {
      BaseServiceBiance.instance = new BaseServiceBiance();
    }

    return BaseServiceBiance.instance;
  }

  public connect(apiKey: string, secretKey: string) {
    try {
      this.client = Binance({ apiKey: apiKey, apiSecret: secretKey });
      console.log('Binance connection is successful...')
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAccountInfo() {
    try {
      return await this.client.accountInfo();
    } catch (error) {
      throw new Error(error);
    }
  }

  async tradeSpot(options: NewOrderSpot): Promise<Order> {
    try {
      return await this.client.order(options);
    } catch (error) {
      throw new Error(error);
    }
  }

  async tradeSpotTest(options: NewOrderSpot): Promise<Order> {
    try {
      return await this.client.orderTest(options);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMyTrades(options: any): Promise<MyTrade[]> {
    try {
      return await this.client.myTrades(options);
    } catch (error) {
      console.log('getMyTrades', error);
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
      throw new Error(error);
    }
  }

  async futuresAllOrders() {
    try {
      return await this.client.futuresAllOrders({
        symbol: 'BTCUSDT',
        recvWindow: 59999,
      });
    } catch (error) {

      throw new Error(error);
    }
  }

  async futuresOpenOrders() {
    try {
      return await this.client.futuresOpenOrders({
        // symbol: 'BTCUSDT',
        // recvWindow: 59999,
      });
    } catch (error) {

      throw new Error(error);
    }
  }

  async futuresCancelAllOpenOrders(options: {
    symbol: string
  }) {
    try {
      return await this.client.futuresCancelAllOpenOrders(options);
    } catch (error) {

      throw new Error(error);
    }
  }

  async futuresBatchOrders() {
    try {
      return await this.client.futuresBatchOrders({ batchOrders: [] });
    } catch (error) {
      throw new Error(error);
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
