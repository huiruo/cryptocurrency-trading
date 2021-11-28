
# 开发人员2_文档
test:
http://localhost:8089/trader/user/test

### 币安接口
https://binance-docs.github.io/apidocs/spot/cn/#185368440e

###### 1.24hr 价格变动情况
文档：
https://binance-docs.github.io/apidocs/spot/cn/#24hr
```
实例：
https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT
```

##### 最新价格
文档：
https://binance-docs.github.io/apidocs/spot/cn/#8ff46b58de
```
https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT
{
    "symbol": "BTCUSDT",
    "priceChange": "105.74000000",
    "priceChangePercent": "0.195",
    "weightedAvgPrice": "54599.38636672",
    "prevClosePrice": "54294.26000000",
    "lastPrice": "54400.00000000",
    "lastQty": "0.06589000",
    "bidPrice": "54399.99000000",
    "bidQty": "1.05692000",
    "askPrice": "54400.00000000",
    "askQty": "6.57080000",
    "openPrice": "54294.26000000",
    "highPrice": "55280.00000000",
    "lowPrice": "53666.60000000",
    "volume": "30139.41407000",
    "quoteVolume": "1645593513.67443560",
    "openTime": 1637994651353,
    "closeTime": 1638081051353,
    "firstId": 1164665906,
    "lastId": 1165766626,
    "count": 1100721
}
```