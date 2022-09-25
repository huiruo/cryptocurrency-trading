import { Binance, FuturesOrder, OrderType } from 'binance-api-node'
import { nanoid } from 'nanoid'

export class Exchange {

  binance: Binance

  private async futuresOrder(opt: any, side: 'BUY' | 'SELL') {
    const { quantity, price, clientOrderId } = opt

    console.log('futuresOrder:', opt);

    // const symbol = opt.symbol || this.symbol
    const symbol = opt.symbol

    const isLimit = !!price // 有价格就认为是 limit 单

    const params: any = {
      symbol,
      side,
      type: isLimit ? 'LIMIT' : 'MARKET',
      recvWindow: 1000 * 100,
    }

    // params.newClientOrderId = clientOrderId || `Bot${this.ctx.botId}__${nanoid()}`
    params.newClientOrderId = clientOrderId || `${nanoid()}`

    /*
    if (quantity) {
      params.quantity = this.makeFuturesQuantityPrecise(symbol, quantity).toString()
    }

    if (isLimit) {
      params.timeInForce = 'GTC'
      params.price = this.makeFuturesPricePrecise(symbol, price!)
    }
    */

    const order = await this.binance.futuresOrder(params)
    console.log('this.binance.futuresOrder:', order);


    // await this.createFuturesOrder(order as any, price)

    return order
  }

  async long(opt: any): Promise<any> {
    console.log('exchange-long=======');

    try {
      return await this.futuresOrder(opt, 'BUY')
    } catch (error) {
      throw new Error(`[order long fail]: ${JSON.stringify(error)}, opt: ${JSON.stringify(opt)}`)
    }
  }

  async short(opt: any): Promise<any> {
    try {
      return await this.futuresOrder(opt, 'SELL')
    } catch (error) {
      throw new Error(`[order short fail]: ${JSON.stringify(error)}, opt: ${JSON.stringify(opt)}`)
    }
  }

  private async createFuturesOrder(order: any, price?: number) {
    const input = {
      orderId: order.orderId.toString(),
      clientOrderId: order.clientOrderId,
      symbol: order.symbol,
      status: order.status,
      side: order.side,
      qty: order.origQty.toString(),
      price: (price || order.price).toString(),
      orderTime: order.updateTime,
    }

    // await this.orderService.createOrder(input)
  }
}