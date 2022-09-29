### 接口1
所属：现货账户和交易接口----账户成交历史
```js
myTrades (symbol, options = {}) {
  validateRequiredParameters({ symbol })
  return this.signRequest(
    'GET',
    '/api/v3/myTrades',
    Object.assign(options, {
      symbol: symbol.toUpperCase()
    })
  )
}

[
  {
    "symbol": "BNBBTC", // 交易对
    "id": 28457, // trade ID
    "orderId": 100234, // 订单ID
    "orderListId": -1, // OCO订单的ID，不然就是-1
    "price": "4.00000100", // 成交价格
    "qty": "12.00000000", // 成交量
    "quoteQty": "48.000012", // 成交金额
    "commission": "10.10000000", // 交易费金额
    "commissionAsset": "BNB", // 交易费资产类型
    "time": 1499865549590, // 交易时间
    "isBuyer": true, // 是否是买家
    "isMaker": false, // 是否是挂单方
    "isBestMatch": true //该值将始终等于 true
  }
]
```

### 接口2：加密钱包
现货账户和交易接口----账户信息 (USER_DATA)
```json
{
  "makerCommission": 15,
  "takerCommission": 15,
  "buyerCommission": 0,
  "sellerCommission": 0,
  "canTrade": true,
  "canWithdraw": true,
  "canDeposit": true,
  "updateTime": 123456789,
  "accountType": "SPOT",
  "balances": [
    {
      "asset": "BTC",
      "free": "4723846.89208129",
      "locked": "0.00000000"
    },
    {
      "asset": "LTC",
      "free": "4763368.68006011",
      "locked": "0.00000000"
    }
  ],
  "permissions": [
    "SPOT"
  ]
}
```

