## order 时间 limit 
```
优先级低
```

## 登录功能
```
优先级 低
```

## 策略订单止损策略 
```
是否 设定止损
止损价格设定
```

## 设置手续费扣除
全局设置:
spotFree = 0.1%
spotFree = 0.075%
```
orderType number
1 spot
2 future

note string
这笔策略的反思

leverage number
杠杆数 如果是现货则为1
```


需要设置的地方:
```
1.创建订单的时候
2.更新订单的时候

新增字段：
netProfit
netProfitRate
```


```
2.数字单位里面k和M是计算单位的字母形式，k代表千，M代表兆。
6.计数单位依次为个、百、千、万、十万、百万、千万、亿、十亿、百亿、千亿、兆、十兆、百兆、千兆。
```