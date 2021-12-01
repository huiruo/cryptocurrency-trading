

### 接口1:获取24小时行情
```text
http://localhost:8089/trader/api/spot/v3/instrument/ticker
修改后：
http://localhost:8089/trader/ticker/24hr

对比:
    币安：
    https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT
    欧易：
    GET/api/spot/v3/instruments/<instrument-id>/ticke
    https://www.okex.com/api/spot/v3/instruments/BTC-USDT/ticker
```