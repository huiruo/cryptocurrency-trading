
### 2021.11.26
```
1.尝试接入公共接口
文档：
https://www.okex.com/docs/zh/#option_ws-full_depth
2.接口
https://www.okex.com

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

###### 2.尝试用 binance api
```

```