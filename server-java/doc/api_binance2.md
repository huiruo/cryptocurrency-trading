
# 开发人员2_文档
test:
http://localhost:8089/trader/user/test
官方界面：
https://www.binance.com/zh-CN/trade/BTC_USDT?layout=basic

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
btcusdt表:对应文档:
{
    //新加属性：
    id:
    time: 时间戳？
    //接口属性
    "priceChange": "135.22000000",      //24h涨跌
    "priceChangePercent": "0.249",      //24h涨幅
    "lastPrice": "54512.30000000",      //最新价格
    "lastQty": "0.04870000",  //最新成交的数量
    "bidPrice": "54512.30000000",  //买一价
    "bidQty": "0.42919000",         //买一价对应的数量
    "askPrice": "54512.31000000",  //卖一价
    "askQty": "0.39927000",         //卖一价对应的量
    "highPrice": "55280.00000000",   //24h最高价
    "lowPrice": "53666.60000000",   //24h最低价
    "volume": "30185.73239000",  //24h成交量(USDT)
    "quoteVolume": "1648227782.60675300", //24h成交额(USDT)
    "openTime": 1637997273203,  //integer($int64)
    "closeTime": 1638083673203,  //integer($int64)
    "count": 1097514,        //成交笔数
    "prevClosePrice": "54377.08000000", //上一个收盘价
    "openPrice": "54377.08000000", //开盘价
}

移除属性：
    "symbol": "BTCUSDT",
    "firstId": 1164696160,      // 首笔成交id
    "lastId": 1165793673,    // 末笔成交id
    "weightedAvgPrice": "54602.87533566", 加权平均价格
动态对比：
{
    "symbol": "BTCUSDT",
    "priceChange": "85.88000000",
    "priceChangePercent": "0.158",
    "weightedAvgPrice": "54602.64515848",
    "prevClosePrice": "54363.77000000",
    "lastPrice": "54449.65000000",
    "lastQty": "0.02330000",
    "bidPrice": "54449.64000000",
    "bidQty": "0.33027000",
    "askPrice": "54449.65000000",
    "askQty": "0.96126000",
    "openPrice": "54363.77000000",
    "highPrice": "55280.00000000",
    "lowPrice": "53666.60000000",
    "volume": "30251.08848000",
    "quoteVolume": "1651789449.93116110",
    "openTime": 1637997530631,
    "closeTime": 1638083930631,
    "firstId": 1164698281,
    "lastId": 1165796159,
    "count": 1097879
}
```