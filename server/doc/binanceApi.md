

### 枚举
https://binance-docs.github.io/apidocs/spot/cn/#api-3

https://www.binance.com/cn/support/articles/360033779452-Types-of-Order

术语：
base asset 指一个交易对的交易对象，即写在靠前部分的资产名, 比如BTCUSDT, BTC是base asset。
quote asset 指一个交易对的定价资产，即写在靠后部分的资产名, 比如BTCUSDT, USDT是quote asset。

###### 交易对状态 (状态 status):
```
PRE_TRADING 交易前
TRADING 交易中
POST_TRADING 交易后
END_OF_DAY
HALT
AUCTION_MATCH
BREAK
```

###### 交易对类型:
```
SPOT 现货
```

###### 订单状态 (状态 status):
```
状态	描述

NEW	订单被交易引擎接受

PARTIALLY_FILLED	部分订单被成交

FILLED	订单完全成交

CANCELED	用户撤销了订单

PENDING_CANCEL	撤销中(目前并未使用)

REJECTED	订单没有被交易引擎接受，也没被处理

EXPIRED	订单被交易引擎取消, 比如

LIMIT FOK 订单没有成交
市价单没有完全成交
强平期间被取消的订单
交易所维护期间被取消的订单
```

###### OCO 状态 (状态类型集 listStatusType):
```
状态	描述
RESPONSE	当ListStatus响应失败的操作时使用。 (订单完成或取消订单)
EXEC_STARTED	当已经下单或者订单有更新时
ALL_DONE	当订单执行结束或者不在激活状态
```

###### OCO 订单状态 (订单状态集 listOrderStatus):
```
状态	描述
EXECUTING	当已经下单或者订单有更新时
ALL_DONE	当订单执行结束或者不在激活状态
REJECT	当订单状态响应失败(订单完成或取消订单)
```

###### 指定订单的类型
```
OCO 选择性委托订单
```


###### 关于订单类型的类型，可以参考这里详细说明
```
LIMIT 限价单
MARKET 市价单
STOP_LOSS 止损单
STOP_LOSS_LIMIT 限价止损单
TAKE_PROFIT 止盈单
TAKE_PROFIT_LIMIT 限价止盈单
LIMIT_MAKER 限价只挂单
```
###### 订单返回类型 (newOrderRespType):
```
ACK
RESULT
FULL
```

###### 订单方向 (方向 side):
```
BUY 买入
SELL 卖出
```

###### 有效方式 (timeInForce):
```
这里定义了订单多久能够失效

Status	Description
GTC	成交为止
订单会一直有效，直到被成交或者取消。

IOC	无法立即成交的部分就撤销
订单在失效前会尽量多的成交。

FOK	无法全部立即成交就撤销
如果无法全部成交，订单会失效。
```

###### K线间隔:
```
m -> 分钟; h -> 小时; d -> 天; w -> 周; M -> 月
```

```
1m
3m
5m
15m
30m
1h
2h
4h
6h
8h
12h
1d
3d
1w
1M
```

###### 限制种类 (rateLimitType) 
```
REQUEST_WEIGHT 单位时间请求权重之和上限

ORDERS 单位时间下单次数限制

RAW_REQUESTS 单位时间请求次数上限
```

###### 限制间隔 (interval)
```
SECOND 秒
MINUTE 分
DAY 天
```

###### quoteOrderQty
```
使用 quoteOrderQty 的市价单MARKET 明确的是通过买入(或卖出)想要花费(或获取)的报价资产数量; 此时的正确报单数量将会以市场流动性和quoteOrderQty被计算出来。
以BTCUSDT为例, quoteOrderQty=100:
 下买单的时候, 订单会尽可能的买进价值100USDT的BTC.
 下卖单的时候, 订单会尽可能的卖出价值100USDT的BTC.
使用 quoteOrderQty 的市价单MARKET不会突破LOT_SIZE的限制规则; 报单会按给定的quoteOrderQty尽可能接近地被执行。
```
