## 更新钱包
```
Data Api: 更新钱包
http://localhost:1788/account/binance/cryptoWallet
```

##  从币安更新订单,并写入本地数据库
```
Data Api:从币安更新订单,并写入本地数据库
http://localhost:1788/trader/binance/myTrades
```

## Server api: 计算持仓成本
```
http://localhost:1788/account/api/calculateCostprice

symbol:'ETHUSDT'
asset:'ETH'
or:
symbol:'BTCUSDT'
asset:'BTC'
```

## Server api: 更新单一asset策略
```
http://localhost:1788/account/api/updateStrategy
symbol:'ETHUSDT' 
or:
symbol:'BTCUSDT'
asset:'BTC'
```

### 获取实时价格，不做任何操作
```
Server api: 获取最新价格
http://localhost:1788/account/api/symbolPrice
symbol:'BTCUSDT'
```

### 获取实时价格，计算盈利写入策略表
```
Data Api/Server Api: 更新策略:计算盈亏
http://localhost:1788/account/binance/updateProfit
symbol:'BTCUSDT'
```