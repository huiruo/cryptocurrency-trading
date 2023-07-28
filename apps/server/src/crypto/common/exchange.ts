import { Binance, FuturesOrder, StopNewFuturesOrder } from 'binance-api-node'
// import { nanoid } from 'nanoid'

export class Exchange {
  binance: Binance

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // private async futuresOrder(opt: any, side: 'BUY' | 'SELL'):Promise<FuturesOrder> {
  private async futuresOrder(
    options: StopNewFuturesOrder,
  ): Promise<FuturesOrder> {
    /*
    const { price, clientOrderId } = opt
    const symbol = opt.symbol
    const isLimit = !!price // 有价格就认为是 limit 单
    const params: any = {
      symbol,
      side,
      type: isLimit ? 'LIMIT' : 'MARKET',
      recvWindow: 1000 * 100,
    }
    params.newClientOrderId = clientOrderId || 'fjeofo'
    */

    // params.newClientOrderId = clientOrderId || `Bot${this.ctx.botId}__${nanoid()}`
    // TODO:fix key
    // params.newClientOrderId = clientOrderId || `${nanoid()}`

    /*
    if (quantity) {
      params.quantity = this.makeFuturesQuantityPrecise(symbol, quantity).toString()
    }

    if (isLimit) {
      params.timeInForce = 'GTC'
      params.price = this.makeFuturesPricePrecise(symbol, price!)
    }
    */

    return await this.binance.futuresOrder(options)
  }

  /*
  async long(opt: any): Promise<any> {
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
  */

  /*
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
  */
}
