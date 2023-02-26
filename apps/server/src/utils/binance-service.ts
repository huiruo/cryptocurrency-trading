import Binance, { MyTrade, NewOrderSpot, Order, OrderType } from 'binance-api-node';
import { Injectable } from '@nestjs/common';
import { Exchange } from './exchange';
import { get } from 'lodash';
import { SyncSpotOrderParams } from 'src/common/types';

export interface BalanceType {
  asset: string;
  free: string;
  // 挂单的锁定
  locked: string;
  // 币价值
  quoteQty: number
  // 可以出售的free,当有理财才有值，否则直接取free进行出售
  canSellFree?: string
}

@Injectable()
export class BinanceService {
  private static instance: BinanceService
  public client = Binance();
  exchange: Exchange;

  constructor() {
    this.exchange = new Exchange();
  }

  public static getInstance(): BinanceService {
    if (!BinanceService.instance) {
      BinanceService.instance = new BinanceService();
    }

    return BinanceService.instance;
  }

  public connect(apiKey: string, secretKey: string) {
    try {
      this.client = Binance({ apiKey: apiKey, apiSecret: secretKey });
      console.log('Binance connection is successful...')
    } catch (error) {
      console.log('connect:', error);
    }
  }

  async getAccountInfo() {
    try {
      return await this.client.accountInfo();
    } catch (error) {
      console.log('getAccountInfo:', error);
    }
  }

  async tradeSpot(options: NewOrderSpot): Promise<Order> {
    try {
      return await this.client.order(options);
    } catch (error) {
      console.log('tradeSpot:', error);
    }
  }

  async tradeSpotTest(options: NewOrderSpot): Promise<Order> {
    try {
      return await this.client.orderTest(options);
    } catch (error) {
      console.log('tradeSpotTest:', error);
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
      console.log('openOrders:', error);
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
      console.log('allOrders:', error);
    }
  }

  async futuresAccountInfo() {
    try {
      return await this.client.futuresAccountInfo({ recvWindow: 1000 * 10 });
    } catch (error) {
      console.log('futuresAccountInfo:', error);
    }
  }

  async futuresAllOrders() {
    try {
      return await this.client.futuresAllOrders({
        symbol: 'BTCUSDT',
        recvWindow: 59999,
      });
    } catch (error) {
      console.log('futuresAllOrders:', error);
    }
  }

  async futuresOpenOrders() {
    try {
      return await this.client.futuresOpenOrders({
        // symbol: 'BTCUSDT',
        // recvWindow: 59999,
      });
    } catch (error) {
      console.log('futuresOpenOrders:', error);
    }
  }

  async futuresCancelAllOpenOrders(options: {
    symbol: string
  }) {
    try {
      return await this.client.futuresCancelAllOpenOrders(options);
    } catch (error) {
      console.log('futuresCancelAllOpenOrders:', error);
    }
  }

  async futuresBatchOrders() {
    try {
      return await this.client.futuresBatchOrders({ batchOrders: [] });
    } catch (error) {
      console.log('futuresBatchOrders:', error);
    }
  }

  async spotPrice(symbol: string) {
    try {
      return await this.client.prices({ symbol });
    } catch (error) {
      console.log('spotPrice:', error);
    }
  }

  async futuresPrice(symbol: string) {
    try {
      return await this.client.futuresPrices();
    } catch (error) {
      console.log('futuresPrice:', error);
    }
  }

  async prices(symbol?: string): Promise<{ [index: string]: string }> {
    try {
      return await this.client.prices();
    } catch (error) {
      console.log('prices:', error);
    }
  }

  async candles(symbol: string, interval: string) {
    try {
      return await this.client.candles({ symbol, interval: '5m' });
    } catch (error) {
      console.log('candles:', error);
    }
  }

  async short(opt?: any) {
    return await this.exchange.short(opt);
  }


  // 找出持仓资源,也可以在 socket userData订阅返回，这里选择拿接口数据
  async getAccountAsset(symbol: string): Promise<BalanceType> {
    const res = await this.getAccountInfo();
    const balances = get(res, 'balances', []).filter(
      (item) => Number(item.free) !== 0,
    ) as BalanceType[];

    // test mock
    /*
    balances.push({
      asset: 'IMX',
      free: '504.54000000',
      locked: '0.00000000'
    })
    */
    // 2.10 18:02 挂单成交,1.008
    /*
    balances.push({
      asset: 'IMX',
      free: '991.08',
      locked: '0.00000000'
    })
    */
    // console.log('balances:', balances);
    // test mock

    let balance = {} as BalanceType
    balances.forEach((item) => {
      const isInclude = symbol.search(new RegExp(`^${item.asset}`))
      // console.log('==1.找出持仓asset==:', item);
      if (isInclude !== -1) {
        console.log('==2.找到持仓asset==:', item);
        balance = item
      }
    })

    return balance
  }

  async getMyTrades(spotOrderParams: SyncSpotOrderParams): Promise<MyTrade[]> {
    const { symbol, startTime, endTime } = spotOrderParams
    let options = {} as SyncSpotOrderParams
    if (startTime && endTime) {
      options = {
        symbol,
        recvWindow: 59999,
        startTime,
        endTime,
      }
    } else {
      options = {
        symbol,
        recvWindow: 59999,
        startTime: null,
        endTime: null,
      }
    }
    return await this.client.myTrades(options)
  }
}
