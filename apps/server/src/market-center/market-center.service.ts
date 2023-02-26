import { Injectable } from '@nestjs/common';
import { MyTrade } from 'binance-api-node';
import { ConfigService } from '@nestjs/config';
import { get } from 'lodash';
import { BinanceConnector } from 'src/common/binance-connector2';
import { Result } from 'src/common/result.interface';
import { SyncSpotOrderParams } from 'src/common/types';
import { BaseServiceBiance } from 'src/utils/base-service-biance';
import { WebSocketServer } from 'ws';
import { plus, minus, times, divide } from 'src/common/boter-math'
import { BalanceType } from 'src/data-center/data-center.service';
import { calculateMyTradeProfit, calculateSpotCostPrice } from 'src/utils/utils';
import { WSConnector } from './WSConnector'

interface MyTrades {
  symbol: string
  qty: number
  quoteQty: number
  costPrice: number
  totalFree: number
  time: number
  finalOrderId: number
  isBuyer?: boolean
  isRunning: boolean
}

const myTrades: MyTrades[] = []

@Injectable()
export class MarketCenterService {

  private clientWs: WebSocket
  private pingTimeout: any
  private baseApiService: BaseServiceBiance;

  private positionWsClient: any;
  private positionWsRef: any;

  constructor(
    private configService: ConfigService,
  ) {
    WSConnector.getInstance().connect()
  }

  async startUserWebsocket(): Promise<Result> {

    WSConnector.getInstance().connect()
    return { code: 200, message: 'subscribeWebsocket userData ok', data: null };
  }

  private async initBinanceApi() {
    /*
    const apiKey = this.configService.get<string>('binanceApiKey');
    const secretKey = this.configService.get<string>('binanceSecretKey');
    if (apiKey && secretKey) {
      this.client = BaseServiceBiance.getInstance();
    } else {
      console.log('=== Api key do not exist ===');
    }
    */
    this.baseApiService = BaseServiceBiance.getInstance();
  }

  private initWebsocket() {
    console.log('===initWebsocket===');

    const wss = new WebSocketServer({ port: 9443 });

    // wss.on('ping', this.heartbeat);

    wss.on('close', () => {
      console.log('==close==');

      // clearTimeout(this.pingTimeout);
    });

    wss.on('close', () => {
      console.log('==disconnected==');
    });

    wss.on('connection', async (ws: any, req: any) => {
      const ip = req.connection.remoteAddress;
      const port = req.connection.remotePort;
      const clientName = ip + port;
      console.log('%s is connected', clientName)

      if (!this.baseApiService) {
        console.log('=初始化baseApiService==》')
        await this.initBinanceApi()
      } else {
        myTrades.length = 0
        console.log('=不初始化baseApiService==》')
      }

      ws.on('error', console.error);

      ws.on('message', (data: any) => {
        console.log('==received: %s', data);
      });

      this.clientWs = ws

      const symbol = "BTCUSDT"
      const option = {
        endTime: 1677167999999,
        startTime: 1677081600000,
        symbol
      }

      const isSingle = true
      await this.handleTrade(option, symbol, isSingle)
    })
  }

  // 户端可能会在不知情的情况下断开连接。
  // 您可能希望在您的客户端上添加一个 ping 侦听器以防止这种情况发生。一个简单的实现是：
  /*
  heartbeat = () => {
    clearTimeout(this.pingTimeout);

    // Use `WebSocket#terminate()`, which immediately destroys the connection,
    // instead of `WebSocket#close()`, which waits for the close timer.
    // Delay should be equal to the interval at which your server
    // sends out pings plus a conservative assumption of the latency.
    this.pingTimeout = setTimeout(() => {
      this.terminate();
    }, 30000 + 1000);
  }
  */

  async startSubscribeWsForPosition(myTrades: MyTrades[]) {
    console.log('===startSubscribeWsForPosition start===');
    if (this.positionWsRef) {
      console.log('第四步1-1，先关闭 ws==>');
      await this.unsubscribePositionWs()
      console.log('第四步1-2，再开启 ws==>');
      this.subscribeWsForPosition('kline_1m', myTrades)
    } else {
      console.log('第四步-B，开启 ws==>');
      this.subscribeWsForPosition('kline_1m', myTrades)
    }
  }

  subscribeWsForPosition(wsType: string, myTradesParms: MyTrades[]) {
    const symbolStreams = myTradesParms.map(item => `${item.symbol.toLowerCase()}@${wsType}`)
    console.log('symbolStreams:', symbolStreams);
    this.combinedStreams(symbolStreams, myTradesParms)
  }

  combinedStreams(symbolStreams: string[], myTradesParms: MyTrades[]) {
    console.log('myTradesParms', myTradesParms)
    this.positionWsClient = new BinanceConnector('', '')
    const callbacks = {
      open: () => console.log('Connected with Websocket server use combinedStreams'),
      close: () => console.log('Disconnected with Websocket server use combinedStreams'),
      message: (data: any) => {
        const dataObj = JSON.parse(data)
        this.onCombinedStreams(dataObj.data, myTradesParms)
      }
    }
    this.positionWsRef = this.positionWsClient.combinedStreams(symbolStreams, callbacks)
  }

  onCombinedStreams(data: any, myTradesParms: MyTrades[]) {
    const symbol = get(data, 's', '')
    const price = get(data, 'k.c', '')
    const time = get(data, 'E', '')

    // 开始计算盈利
    myTradesParms.forEach(item => {
      if (item.symbol === symbol) {
        const { qty, quoteQty, costPrice, totalFree } = item
        const { profit, profitRate } = calculateMyTradeProfit(qty, quoteQty, costPrice, totalFree, price)
        console.log(`${symbol}=${price};成本${costPrice},盈亏${profit},${profitRate},持仓${quoteQty}=${new Date(time).toLocaleString()}`);
        const emit = { symbol, price, costPrice, profit, profitRate, quoteQty, time }
        this.clientWs.send(JSON.stringify(emit));
      }
    })
  }

  async unsubscribePositionWs(): Promise<Result> {
    if (this.positionWsRef) {
      console.log('A-1.PositionWs 不为空，开始关闭');
      await this.positionWsClient.unsubscribe(this.positionWsRef)
      console.log('A-2.PositionWs 关闭关闭成功');
      this.positionWsRef = null
      return { code: 200, message: 'stop ok', data: null };
    } else {
      console.log('B.PositionWs not running');
      return { code: 200, message: 'PositionWs not running', data: null };
    }
  }

  async getMyTrades(spotOrderParams: SyncSpotOrderParams): Promise<MyTrade[]> {
    const { symbol, startTime, endTime } = spotOrderParams
    let options = {}
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
      }
    }
    return this.baseApiService.getMyTrades(options)
  }

  // 找出持仓资源,也可以在 socket userData订阅返回，这里选择拿接口数据
  async getAccountAsset(symbol: string): Promise<BalanceType> {
    const res = await this.baseApiService.getAccountInfo();
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

  handleTrade = async (option: { startTime: number, endTime: number, symbol: string }, symbol: string, isSingle = false) => {
    const { free: freeStr, locked: lockedStr } = await this.getAccountAsset(symbol)
    // 容错,获取持仓资源为空
    if (!freeStr) {
      return
    }

    const free = Number(freeStr)
    const locked = Number(lockedStr)
    const assetTotal = plus(free, locked)
    console.log('获取持仓资源:', { symbol, free, locked, assetTotal })
    const orders = await this.getMyTrades(option)
    console.log('trades', orders)

    // 生成myTrade
    let qtyLoop = 0
    let quoteQtyLoop = 0

    // 反向遍历从最新遍历
    const length = orders.length
    for (let dynamicLength = orders.length - 1; dynamicLength >= 0; dynamicLength--) {
      const { qty: qtyStr, quoteQty: quoteQtyStr, price: priceStr, symbol, orderId, time, isBuyer } = orders[dynamicLength];
      const qty = Number(qtyStr)
      const quoteQty = Number(quoteQtyStr)
      const price = Number(priceStr)

      // 情况1：只有一个订单
      if (assetTotal === qty) {
        if (isBuyer) {
          console.log(`只有一个买入订单-结束循环', ${qty}, ${qtyLoop}, ${quoteQty}, ${quoteQtyLoop},${new Date(time).toLocaleString()}`)
          myTrades.push({
            symbol,
            qty,
            quoteQty,
            costPrice: price,
            totalFree: 0,
            finalOrderId: orderId,
            time,
            isRunning: true
          })
        }

        // 第四步，开启 ws
        this.startSubscribeWsForPosition(myTrades)

        break
      }

      // dynamicLength !== length - 1 排除最新的一条数据
      if (dynamicLength !== length - 1) {
        // 情况2：拆分订单,判断它的订单id是同一个
        let lastOrder = orders[dynamicLength + 1]
        if (lastOrder.orderId === orderId) {
          const { qtyCal, quoteQtyCal } = calculateSpotCostPrice(qty, quoteQty, qtyLoop, quoteQtyLoop, isBuyer)
          qtyLoop = qtyCal
          quoteQtyLoop = quoteQtyCal
          if (isBuyer) {
            console.log(`A.情况2-是合并订单买入', ${qty}, ${qtyLoop}, ${quoteQty}, ${quoteQtyLoop},${new Date(time).toLocaleString()}`)
          } else {
            console.log(`A.情况2-是合并订单卖出', ${qty}, ${qtyLoop}, ${quoteQty}, ${quoteQtyLoop},${new Date(time).toLocaleString()}`)
          }

          if (isSingle && dynamicLength === 0) {
            console.log("单一订单模式且是最后一条==不计算加建仓")
            const costPriceLoop = Number(divide(quoteQtyLoop, qtyLoop).toFixed(8))
            myTrades.push({
              symbol,
              qty: qtyLoop,
              quoteQty: quoteQtyLoop,
              costPrice: costPriceLoop,
              totalFree: 0,
              finalOrderId: orderId,
              time,
              isRunning: true
            })
            // 第四步，开启 ws
            this.startSubscribeWsForPosition(myTrades)

            break
          }
        } else {

          if (isSingle) {
            console.log('==单一订单模式==不计算加建仓==');
            const costPriceLoop = Number(divide(quoteQtyLoop, qtyLoop).toFixed(8))
            myTrades.push({
              symbol,
              qty: qtyLoop,
              quoteQty: quoteQtyLoop,
              costPrice: costPriceLoop,
              totalFree: 0,
              finalOrderId: orderId,
              time,
              isRunning: true
            })
            // 第四步，开启 ws
            this.startSubscribeWsForPosition(myTrades)

            break
          }

          if (qtyLoop === assetTotal) {
            const costPriceLoop = Number(divide(quoteQtyLoop, qtyLoop).toFixed(8))
            console.log(`B.订单计算完毕-结束循环', ${qty}, ${qtyLoop}, ${quoteQty}, ${quoteQtyLoop},${costPriceLoop},${new Date(time).toLocaleString()}`)
            myTrades.push({
              symbol,
              qty: qtyLoop,
              quoteQty: quoteQtyLoop,
              costPrice: costPriceLoop,
              totalFree: 0,
              finalOrderId: orderId,
              time,
              isRunning: true
            })
            // 第四步，开启 ws
            this.startSubscribeWsForPosition(myTrades)

            break
          } else if (qtyLoop > assetTotal) {
            const costPriceLoop = Number(divide(quoteQtyLoop, qtyLoop).toFixed(8))
            console.log(`如果订单计算的qtyLoop > 持有的token数量,认为上一条是最后一个订单,把数据复原到上一条,结束循环', ${qty}, ${qtyLoop}, ${quoteQty}, ${quoteQtyLoop},${new Date(time).toLocaleString()}`)
            // 如果是买入，减回去;卖出，加回去
            if (isBuyer) {
              qtyLoop = minus(qtyLoop, qty)
              quoteQtyLoop = minus(quoteQtyLoop, quoteQty)
            } else {
              qtyLoop = plus(qtyLoop, qty)
              quoteQtyLoop = plus(quoteQtyLoop, quoteQty)
            }

            myTrades.push({
              symbol,
              qty: qtyLoop,
              quoteQty: quoteQtyLoop,
              costPrice: costPriceLoop,
              totalFree: 0,
              finalOrderId: orderId,
              time,
              isRunning: true
            })
            // 第四步，开启 ws
            this.startSubscribeWsForPosition(myTrades)

            break
          } else {
            const { qtyCal, quoteQtyCal } = calculateSpotCostPrice(qty, quoteQty, qtyLoop, quoteQtyLoop, isBuyer)
            qtyLoop = qtyCal
            quoteQtyLoop = quoteQtyCal
            if (isBuyer) {
              console.log(`B.独立订单-asset对应不上，进一步计算补仓', ${qty}, ${qtyLoop}, ${quoteQty}, ${quoteQtyLoop},${new Date(time).toLocaleString()}`)
            } else {
              console.log(`B.独立订单-asset对应不上，进一步计算减仓', ${qty}, ${qtyLoop}, ${quoteQty}, ${quoteQtyLoop},${new Date(time).toLocaleString()}`)
            }
          }
        }
      } else {
        const { qtyCal, quoteQtyCal } = calculateSpotCostPrice(qty, quoteQty, qtyLoop, quoteQtyLoop, isBuyer)
        qtyLoop = qtyCal
        quoteQtyLoop = quoteQtyCal
        if (isBuyer) {
          console.log(`=第一条循环数据，-卖入', ${qty}, ${qtyLoop}, ${quoteQty}, ${quoteQtyLoop},${new Date(time).toLocaleString()}`)
        } else {
          console.log(`=第一条循环数据，-卖出', ${qty}, ${qtyLoop}, ${quoteQty}, ${quoteQtyLoop},${new Date(time).toLocaleString()}`)
        }
      }
    }
  }


}
