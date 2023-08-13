import Binance, {
  Account,
  AssetBalance,
  CandleChartResult,
  CandlesOptions,
  FuturesAccountInfoResult,
  FuturesCancelAllOpenOrdersResult,
  FuturesOrder,
  GetFuturesOrder,
  MyTrade,
  NewFuturesOrder,
  NewOrderSpot,
  Order,
  QueryFuturesOrderResult,
  QueryOrderResult,
} from 'binance-api-node'
import { Injectable } from '@nestjs/common'
import { get } from 'lodash'
import { Exchange } from './exchange'
import { ResultWithData } from 'src/types'
import { success } from 'src/common/constant'
import { SyncSpotOrderParams } from '../spot/spot.type'
import { SyncFutureOrderParams } from '../future/future.type'

@Injectable()
export class BinanceService {
  private static instance: BinanceService
  public client = Binance()
  exchange: Exchange

  constructor() {
    this.exchange = new Exchange()
  }

  public static getInstance(): BinanceService {
    if (!BinanceService.instance) {
      BinanceService.instance = new BinanceService()
    }

    return BinanceService.instance
  }

  public connect(apiKey: string, secretKey: string): void {
    try {
      this.client = Binance({ apiKey: apiKey, apiSecret: secretKey })
      console.log('Binance connection is successful...')
    } catch (error) {
      console.log('connect:', error)
    }
  }

  async getAccountInfo(): Promise<ResultWithData<Account>> {
    try {
      const account = await this.client.accountInfo()
      return {
        code: success,
        msg: 'Ok',
        data: account,
      }
    } catch (error) {
      console.log('getAccountInfo:', error)
      return {
        code: 0,
        msg: error.code,
        data: null,
      }
    }
  }

  async tradeSpot(options: NewOrderSpot): Promise<Order> {
    try {
      return await this.client.order(options)
    } catch (error) {
      console.log('tradeSpot:', error)
    }
  }

  async tradeSpotTest(options: NewOrderSpot): Promise<Order> {
    try {
      return await this.client.orderTest(options)
    } catch (error) {
      console.log('tradeSpotTest:', error)
    }
  }

  /*
  Get all open orders on a symbol.
  */
  async openOrders(options: {
    symbol?: string
    recvWindow?: number
    useServerTime?: boolean
  }): Promise<QueryOrderResult[]> {
    try {
      return await this.client.openOrders(options)
    } catch (error) {
      console.log('openOrders:', error)
    }
  }

  /*
  Get all account orders on a symbol; active, canceled, or filled.
  */
  async allOrders(options: {
    symbol?: string
    orderId?: number
    startTime?: number
    endTime?: number
    limit?: number
    recvWindow?: number
    timestamp?: number
    useServerTime?: boolean
  }): Promise<QueryOrderResult[]> {
    try {
      return await this.client.allOrders(options)
    } catch (error) {
      console.log('allOrders:', error)
    }
  }

  async futuresAccountInfo(): Promise<FuturesAccountInfoResult> {
    try {
      return await this.client.futuresAccountInfo({ recvWindow: 1000 * 10 })
    } catch (error) {
      console.log('futuresAccountInfo:', error)
    }
  }

  /**
   * {
   *   symbol: 'BTCUSDT',
   *   recvWindow: 59999,
   * }
   */
  async futuresAllOrders(options: {
    symbol: string
    orderId?: number
    startTime?: number
    endTime?: number
    limit?: number
    recvWindow?: number
  }): Promise<QueryFuturesOrderResult> {
    try {
      return await this.client.futuresAllOrders(options)
    } catch (error) {
      console.log('futuresAllOrders:', error)
    }
  }

  /**
   * {
   *   symbol: 'BTCUSDT',
   *   recvWindow: 59999,
   * }
   */
  async futuresOpenOrders(options: {
    symbol?: string
    useServerTime?: boolean
  }): Promise<QueryFuturesOrderResult[]> {
    try {
      return await this.client.futuresOpenOrders(options)
    } catch (error) {
      console.log('futuresOpenOrders:', error)
    }
  }

  async futuresCancelAllOpenOrders(options: {
    symbol: string
  }): Promise<FuturesCancelAllOpenOrdersResult> {
    try {
      return await this.client.futuresCancelAllOpenOrders(options)
    } catch (error) {
      console.log('futuresCancelAllOpenOrders:', error)
    }
  }

  /**
   * batchOrders: []
   */
  async futuresBatchOrders(options: {
    batchOrders: NewFuturesOrder[]
    recvWindow?: number
    timestamp?: number
  }): Promise<FuturesOrder[]> {
    try {
      return await this.client.futuresBatchOrders(options)
    } catch (error) {
      console.log('futuresBatchOrders:', error)
    }
  }

  async prices(options?: {
    symbol?: string
  }): Promise<{ [index: string]: string }> {
    try {
      return await this.client.prices(options)
    } catch (error) {
      console.log('spotPrice:', error)
    }
  }

  async futuresPrice(options?: {
    symbol: string
  }): Promise<{ [index: string]: string }> {
    try {
      return await this.client.futuresPrices(options)
    } catch (error) {
      console.log('futuresPrice:', error)
    }
  }

  /**
   * { symbol, interval: '5m' }
   */
  async candles(options: CandlesOptions): Promise<CandleChartResult[]> {
    try {
      return await this.client.candles(options)
    } catch (error) {
      console.log('candles:', error)
    }
  }

  /*
  async short(opt?: any) {
    return await this.exchange.short(opt)
  }
  */

  // 找出持仓资源,也可以在 socket userData订阅返回，这里选择拿接口数据
  async getAccountAsset(symbol: string): Promise<ResultWithData<AssetBalance>> {
    const { data, code, msg } = await this.getAccountInfo()
    if (code !== 200) {
      return {
        data: null,
        code,
        msg,
      }
    }
    const balances = get(data, 'balances', []).filter(
      (item) => Number(item.free) !== 0,
    ) as AssetBalance[]

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

    let balance = {} as AssetBalance
    balances.forEach((item) => {
      const isInclude = symbol.search(new RegExp(`^${item.asset}`))
      // console.log('==1.找出持仓asset==:', item);
      if (isInclude !== -1) {
        console.log('==2.找到持仓asset==:', item)
        balance = item
      }
    })

    return {
      data: balance,
      code,
      msg,
    }
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

  async getFutureTrades(
    futureOrderParams: SyncFutureOrderParams,
  ): Promise<GetFuturesOrder[]> {
    const { symbol, startTime, endTime } = futureOrderParams
    let options = {} as SyncFutureOrderParams
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

    return (await this.client.futuresAllOrders(
      options,
    )) as unknown as GetFuturesOrder[]
  }
}
