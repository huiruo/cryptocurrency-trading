```javaScript
{
     "msgtype": "markdown",
     "markdown": {
         "title":"botxer",
         "text": "#### 杭州天气 @15692426057 \n > 9度，西北风1级，空气良89，相对温度73%\n > ![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png)\n > ###### 10点20分发布 [天气](https://www.dingtalk.com) \n"
     },
      "at": {
          "atMobiles": [
              "15692426057"
          ],
          "atUserIds": [],
          "isAtAll": false
      }
 }
```

```javaScript
{
	"msgtype": "text",
	"text": {
		"content": "boter: a test"
	},
	"at": {
		"atMobiles": ["15692426057"],
		"isAtAll": false
	}
}
```

## main link
Request URL: 

https://dncapi.gomynft.com/api/coin/web-coininfo
```json
{"code":"bitcoin","addlink":1,"webp":1}
{"code":"polkadot100","addlink":1,"webp":1}
```

## postman
```json
{
  "symbol":"BTCUSDT",
  "baseAsset":"BTC",
  "quoteAsset":"USDT",
  "code":"bitcoin",
  "addlink":1,
  "webp":1
}
```

## 扩展
utf8已经能够存下大部分中文汉字，为什么还要使用utf8mb4?
```
MySQL在5.5.3之后增加utf8mb4编码，mb4就是most bytes 4的意思，是用来兼容四字节的unicode。

utf-8编码存储的可能2个字节、3个字节、4个字节的字符，但是在MySQL中，utf8编码只支持3字节的数据，而移动端的表情数据（比如emoj表情）是4个字节的字符。所以直接往采用utf-8编码，如果插入表情数据和不常用的汉字，以及任何新增的 Unicode 字符等数据，数据库都会报错。

两者的直观对比：

utf8 空间占用小，一般开发足够。

utf8mb4会多占用点空间，所以当有类似于存储表情需求的时候，使用这个。


utf8_unicode_ci和utf8_general_ci对于中、英文来说基本上没有什么差别，但是如果有用到俄语、法语、德语，就一定要使用utf8_unicode_ci。
两者的直观对比：

utf8_general_ci校对速度快，但准确度稍差（一般的开发中忽略不计，还是要以速度为首选），一般就选用这个就可以了。
utf8_unicode_ci准确度高，但校对速度稍慢。
```

## reference resources
```
link:
https://www.feixiaohaozh.info/currencies/bitcoin/

api:
https://dncapi.gomynft.com/api/v4/reducehalf/info?coincode=bitcoin&webp=1



api:
https://dncapi.gomynft.com/api/home/global?webp=1
Request Method: GET
```

```json
{
	"data": {
		"codetotal": 3588,
		"tokentotal": 13421,
		"exchangetotal": 615,
		"vol24h": 84374256335.5097,
		"marketcapvol": 1133146286422.0,
		"risenum": 1610,
		"fallnum": 3451,
		"walletcount": 95,
		"dappcount": 863,
		"websitecount": 283,
		"offmarketprice": 0.98990798,
		"exchangerate": 0.14841199,
		"usdt_price_cny": 6.67000000000000000000,
		"xauprice": 1769.93,
		"changerate": -2.9308,
		"btcpropotion": 39.7303,
		"gas": 6.00000000000000000000
	},
	"code": 200,
	"msg": "success"
}


```

```
流通市值 ¥3.03万亿
24H最高
¥16.00万
24H量
56.55万
24H最低
¥15.62万
24H额
¥897.35亿
24H波幅
+2.42%
量比 
1.06
总市值
¥3.03万亿
BTC相关性
1
历史最高 
¥46.44万
首日开盘价
¥0.02
历史最低 
¥441.54
投资回报 
+9416727.00倍
```


```
https://dncapi.gomynft.com/api/coin/cointrades-web?code=bitcoin&webp=1
```

## 参考
https://dncapi.gomynft.com/api/v2/Defi/web-proposal-coininfo?code=ethereum&webp=1

## main link
Request URL: 

https://dncapi.gomynft.com/api/coin/web-coininfo
```json
{"code":"bitcoin","addlink":1,"webp":1}
{"code":"polkadot100","addlink":1,"webp":1}
```

## api
```
http://localhost:1788/data/center/addCode
    {
    "symbol":"BTCUSDT",
    "baseAsset":"BTC",
    "quoteAsset":"USDT",
    "code":"bitcoin",
    "addlink":1,
    "webp":1
    }


http://localhost:1788/data/center/syncSymbol
```
