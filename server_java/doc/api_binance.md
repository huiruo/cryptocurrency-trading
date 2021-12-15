# binance 
建议您尽可能多地使用websocket消息获取相应数据，以减少请求带来的访问限制压力。

https://binance-docs.github.io/apidocs/spot/cn/#185368440e
```
HTTP 返回代码
https://api.binance.com
https://api1.binance.com
https://api2.binance.com
https://api3.binance.com

HTTP 返回代码
HTTP 4XX 错误码用于指示错误的请求内容、行为、格式。问题在于请求者。
HTTP 403 错误码表示违反WAF限制(Web应用程序防火墙)。
HTTP 429 错误码表示警告访问频次超限，即将被封IP。
HTTP 418 表示收到429后继续访问，于是被封了。
HTTP 5XX 错误码用于指示Binance服务侧的问题。
```

### 公开api
```
术语:
base asset 指一个交易对的交易对象，即写在靠前部分的资产名, 比如BTCUSDT, BTC是base asset。
quote asset 指一个交易对的定价资产，即写在靠后部分的资产名, 比如BTCUSDT, USDT是quote asset。
```
###### 枚举定义:
交易对状态 (状态 status):

PRE_TRADING 交易前
TRADING 交易中
POST_TRADING 交易后
END_OF_DAY
HALT
AUCTION_MATCH
BREAK
###### 交易对类型:
SPOT 现货

###### swagger 
https://binance.github.io/binance-api-swagger/#/Market/get_api_v3_ticker_price

### 行情
``
https://api.binance.com/api/v3/ticker/price
实例：
https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT
```
