
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
    low_24h	String	24小时最低价
    base_volume_24h	String	24小时成交量，按交易货币统计
    quote_volume_24h	String	24小时成交量，按计价货币统计
    timestamp	String	系统时间戳
    open_utc0	String	UTC 0 时开盘价
    open_utc8	String	UTC+8 时开盘价
}
```
### 全部ticker信息
获取平台全部币对的最新成交价、买一价、卖一价和24小时交易量的快照信息。
GET/api/spot/v3/instruments/ticker
```text
https://www.okex.com/api/spot/v3/instruments/ticker
```
