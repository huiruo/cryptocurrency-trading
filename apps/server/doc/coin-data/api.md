

## 1.添加 code
http://localhost:1788/data/center/addCode

```json
{    
    "symbol":"BTC",
    "code":"bitcoin"
}
```

## 2.同步coin info
http://localhost:1788/data/center/syncSymbol
```javaScript
{"code":"tether"}
```

## 3.获取所有code
http://localhost:1788/data/center/codelist

## 4.获取币排名
http://localhost:1788/data/center/getCoin
```json
{
  "currentPage": 1,
  "pageSize": 10
}
```

## api
```json
{"code":"bitcoin","addlink":1,"webp":1}
{"code":"ethereum","addlink":1,"webp":1}
```


## api
https://github.com/Ashlar/binance-api-node
yarn add binance-api-node

## api 2
npm install binance --save
node_modules\binance\README.md

https://github.com/tiagosiebler/binance#readme


## ap3
<!-- packages\boter-core\src\services\exchange.ts -->
```js
  async long(opt: any): Promise<any> {
    try {
      return await this.futuresOrder(opt, 'BUY')
    } catch (error) {
      throw new Error(`[order long fail]: ${JSON.stringify(error)}, opt: ${JSON.stringify(opt)}`)
    }
  }
```

```javaScript
  private async futuresOrder(opt: any, side: 'BUY' | 'SELL') {
    const { quantity, price, clientOrderId } = opt
    const symbol = opt.symbol || this.symbol
    const isLimit = !!price // 有价格就认为是 limit 单

    const params: any = {
      symbol,
      side,
      type: isLimit ? 'LIMIT' : 'MARKET',
      recvWindow: 1000 * 100,
    }

    params.newClientOrderId = clientOrderId || `Bot${this.ctx.botId}__${nanoid()}`

    if (quantity) {
      params.quantity = this.makeFuturesQuantityPrecise(symbol, quantity).toString()
    }

    if (isLimit) {
      params.timeInForce = 'GTC'
      params.price = this.makeFuturesPricePrecise(symbol, price!)
    }

    const order = await this.binance.futuresOrder(params)

    await this.createFuturesOrder(order as any, price)

    return order
  }
```


## biance api test
```
http://localhost:1788/data/center/checkBianceApi
```