import { WebSocketServer } from 'ws';
import { plus, minus, times, divide } from 'src/common/boter-math'
import { BinanceService } from 'src/utils/binance-service';
import { MyTrades } from 'src/common/types';
import { calculateMyTradeProfit, calculateSpotCostPrice } from 'src/utils/utils';
import { get } from 'lodash';
import { BinanceConnector } from 'src/common/binance-connector2';
import { Result } from 'src/common/result.interface';

const myTrades: MyTrades[] = []

export class WSConnector {
  private static instance: WSConnector;
  wss: WebSocketServer;

  private positionWsClient: any;
  private positionWsRef: any;

  private constructor() { }

  public static getInstance(): WSConnector {
    if (!WSConnector.instance) {
      WSConnector.instance = new WSConnector();
    }
    return WSConnector.instance;
  }

  private openEvent = () => {
    console.log('Message: Successfully connected to server');
  };

  public connect() {
    this.connectToServer();
  }

  private messageEvent = (e: any) => {
    // console.log('wss.onmessage->', e)
    console.log('e.data:', e.data)
  }

  private closeEvent = () => {
    console.log('wss.close->')
    this.unsubscribePositionWs()
  }

  private errorEvent = () => {
    console.log('wss.onerror->')
  }

  private connectToServer() {
    if (!this.wss) {
      console.log('wss dont exists, need to open')
      this.wss = new WebSocketServer({ port: 9443 });
      // return
    }
    console.log('connecting WSConnector success')
    this.wss.on('connection', async (ws: any, req: any, client: any) => {
      const ip = req.connection.remoteAddress;
      const port = req.connection.remotePort;
      const clientName = ip + port;
      console.log('%s is connected', { clientName, req: req.connection, client })

      ws.addEventListener('open', this.openEvent);
      ws.addEventListener('message', this.messageEvent);
      ws.addEventListener('close', this.closeEvent);
      ws.addEventListener('error', this.errorEvent);
      /* 
      ws.on('open', this.openEvent);
      ws.on('message', this.messageEvent);
      ws.on('close', this.closeEvent);
      ws.on('error', this.errorEvent);
      */
      // this.wss = ws

      const symbol = "BTCUSDT"
      const option = {
        endTime: 1677167999999,
        startTime: 1677081600000,
        symbol
      }

      const isSingle = true
      await this.handleTrade(ws, option, symbol, isSingle)
    })
  }

  async handleTrade(wsInst: WebSocket, option: { startTime: number, endTime: number, symbol: string }, symbol: string, isSingle = false) {
    const { free: freeStr, locked: lockedStr } = await BinanceService.getInstance().getAccountAsset(symbol)
    // 容错,获取持仓资源为空
    if (!freeStr) {
      return
    }

    const free = Number(freeStr)
    const locked = Number(lockedStr)
    const assetTotal = plus(free, locked)
    console.log('获取持仓资源:', { symbol, free, locked, assetTotal })
    const orders = await BinanceService.getInstance().getMyTrades(option)
    console.log('trades', orders.length)

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
        this.startSubscribeWsForPosition(wsInst, myTrades)

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
            this.startSubscribeWsForPosition(wsInst, myTrades)

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
            this.startSubscribeWsForPosition(wsInst, myTrades)

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
            this.startSubscribeWsForPosition(wsInst, myTrades)

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
            this.startSubscribeWsForPosition(wsInst, myTrades)

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

  async startSubscribeWsForPosition(wsInst: WebSocket, myTrades: MyTrades[]) {
    console.log('===startSubscribeWsForPosition start===');
    if (this.positionWsRef) {
      console.log('第四步1-1，先关闭 ws==>');
      await this.unsubscribePositionWs()
      console.log('第四步1-2，再开启 ws==>');
      this.subscribeWsForPosition(wsInst, 'kline_1m', myTrades)
    } else {
      console.log('第四步-B，开启 ws==>');
      this.subscribeWsForPosition(wsInst, 'kline_1m', myTrades)
    }
  }

  subscribeWsForPosition(wsInst: WebSocket, wsType: string, myTradesParms: MyTrades[]) {
    const symbolStreams = myTradesParms.map(item => `${item.symbol.toLowerCase()}@${wsType}`)
    console.log('symbolStreams:', symbolStreams);
    this.combinedStreams(wsInst, symbolStreams, myTradesParms)
  }

  combinedStreams(wsInst: WebSocket, symbolStreams: string[], myTradesParms: MyTrades[]) {
    console.log('myTradesParms', myTradesParms)
    this.positionWsClient = new BinanceConnector('', '')
    const callbacks = {
      open: () => console.log('Connected with Websocket server use combinedStreams'),
      close: () => console.log('Disconnected with Websocket server use combinedStreams'),
      message: (data: any) => {
        const dataObj = JSON.parse(data)
        this.onCombinedStreams(wsInst, dataObj.data, myTradesParms)
      }
    }
    this.positionWsRef = this.positionWsClient.combinedStreams(symbolStreams, callbacks)
  }

  onCombinedStreams(wsInst: WebSocket, data: any, myTradesParms: MyTrades[]) {
    const symbol = get(data, 's', '')
    const price = get(data, 'k.c', '')
    const time = get(data, 'E', '')

    // 开始计算盈利
    myTradesParms.forEach(item => {
      if (item.symbol === symbol) {
        const { qty, quoteQty, costPrice, totalFree } = item
        const { profit, profitRate } = calculateMyTradeProfit(qty, quoteQty, costPrice, totalFree, price)
        // console.log(`${symbol}=${price};成本${costPrice},盈亏${profit},${profitRate},持仓${quoteQty}=${new Date(time).toLocaleString()}`);
        const emit = { symbol, price, costPrice, profit, profitRate, quoteQty, time }
        wsInst.send(JSON.stringify(emit));
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

}