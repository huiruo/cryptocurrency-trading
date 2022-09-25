
# binance 官方行情
```text
https://www.binance.com/zh-CN/trade/BTC_USDT?layout=basic
```

# api
```
https://www.okex.com/docs/zh/#spot-some
```

### 获取某个ticker信息
文档：
https://www.okex.com/docs/zh/#spot-some
```
GET/api/spot/v3/instruments/<instrument-id>/ticke
test:
https://www.okex.com/api/spot/v3/instruments/BTC-USDT/ticker

{
    instrument_id	String	币对名称
    last	String	最新成交价
    last_qty	String	最新成交的数量
    best_ask	String	卖一价
    best_ask_size	String	卖一价对应的量
    best_bid	String	买一价
    best_bid_size	String	买一价对应的数量
    
    open_24h	String	24小时开盘价
    high_24h	String	24小时最高价
    low_24h	    String	24小时最低价
    base_volume_24h	String	24小时成交量，按交易货币统计
    quote_volume_24h	String	24小时成交量，按计价货币统计
    
    timestamp	String	系统时间戳
    open_utc0	String	UTC 0 时开盘价
    open_utc8	String	UTC+8 时开盘价
}

{
    "data": {
        "best_bid_size": "1.8824126",
        "open_utc8": "54901",
        "last": "54464.6",
        "last_qty": "0.00001", 
        "quote_volume_24h": "539346664.3",
        "open_utc0": "54721.4",
        "best_ask": "54464.7",
        "instrument_id": "BTC-USDT",
        "best_ask_size": "0.14320013",
        "best_bid": "54464.6",
        "product_id": "BTC-USDT",
        "ask": "54464.7",
        "high_24h": "55275.6",
        "low_24h": "53678.9",
        "bid": "54464.6",
        "base_volume_24h": "9864.05482244",
        "open_24h": "54304.6",
        "timestamp": "2021-11-28T07:19:09.220Z" 系统时间戳
    },
    "code": 0,
    "msg": "操作成功！"
}
```
### 全部ticker信息
获取平台全部币对的最新成交价、买一价、卖一价和24小时交易量的快照信息。
GET/api/spot/v3/instruments/ticker
```text
https://www.okex.com/api/spot/v3/instruments/ticker
```

### 整合统一接口
```text
略
```
