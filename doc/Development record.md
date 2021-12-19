### 测试接口
```
欧易：
https://www.okex.com/api/spot/v3/instruments/BTC-USDT/ticker

java:
http://172.16.1.141:8099/trader/api/ticker/24hr

binance:
https://api.binance.com/sapi/v1/system/status

http://localhost:1788/trader/ticker/24hr?symbol=BTC-USDT&platform=okex
```

### 2021.12.13(1)
```
1.前天做java后端的退出这个项目，java服务先退出，改用node
比较打击，郁闷度过半天，自己才是最可靠的,之后进度会慢很多，猥琐半天再次重新出发。

2.很难找到稳定梯子，几乎花了一天的时间在找梯子。试了两家广告比较响的都不如意都申请退款了。
太难了，没梯子这个项目基本停下来。最后找到不是很贵但是目前来看效果还可以的。

3.目前来看，post权限请求可以调通，可以进行下一步开发。
```

### 2021.12.13(2)
```
1.
总结:
a.对接socket,先放下
b.对接口账户接口连接到数据库
c.前端对接本地数据库然后计算波动
```

###### 实施：
```
1.处理好模拟数据
接口：
http://localhost:1788/trader/ticker/myTrades

2.启动数据库
#停止
sudo service mysql stop
#启动
sudo service mysql start
service mysql  status

sudo mysql -uroot -p
abchen_183

3.测试数据库是否能正常返回
http://localhost:1788/user/22

4.创建表
```

测试表链接
```sql
CREATE TABLE `mytrades`  (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

INSERT INTO `myTrades` VALUES (23, '测试1213', '123456', NULL);
```

###### myTrades表
```
{
    "symbol": "ETHUSDT",
    "id": 680883373,
    "orderId": 6738250241,
    "orderListId": -1,
    "price": "4190.83000000",
    "qty": "0.21540000",
    "quoteQty": "902.70478200",
    "commission": "0.00118524",
    "commissionAsset": "BNB",
    "time": 1637552912052,
    "isBuyer": true,
    "isMaker": true,
    "isBestMatch": true
}
```
```sql
CREATE TABLE `mytrades`  (
  `id` bigint(60) NOT NULL,
  `symbol` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `orderId` bigint(60) NULL DEFAULT NULL,
  `orderListId` bigint(60) NULL DEFAULT NULL,
  `price` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `qty` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `quoteQty` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `commission` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `commissionAsset` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `time` bigint(60) NULL DEFAULT NULL,
  `isBuyer` tinyint(1) NOT NULL,
  `isMaker` tinyint(1) NOT NULL,
  `isBestMatch` tinyint(1) NOT NULL,
   PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;
```

### 2021.12.14
```
1.前端工作
基础页面
```
### 2021.12.15
```
对接myTrades接口
1.编写 myTrades 链接 自己的数据库的数据

2.前端页面
```

### 2021.12.19
```
对接钱包：
逻辑：先把 api数据，逻辑处理--->本地数据
```

表设计：
```json
"makerCommission": 10,
"takerCommission": 10,
"buyerCommission": 0,
"sellerCommission": 0,
"canTrade": true,
"canWithdraw": true,
"canDeposit": true,
"updateTime": 1639755096309,
"accountType": "SPOT",
"balances": [
    {
        "asset": "BTC",
        "free": "0.2577788",
        "locked": "0.00000000"
    },
    {
        "asset": "LTC",
        "free": "0.00000000",
        "locked": "0.00000000"
    },
    {
        "asset": "DOT",
        "free": "0.00760000",
        "locked": "0.00000000"
    },
    {
        "asset": "RUNE",
        "free": "0.00000000",
        "locked": "0.00000000"
    },
    {
        "asset": "BNBUP",
        "free": "0.00000000",
        "locked": "0.00000000"
    },
  ]
```

  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
```sql
CREATE TABLE `crypto_wallet`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `asset` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `free` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `locked` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `updateTime` bigint(60) NULL DEFAULT NULL,
   PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

CREATE TABLE `wallet_info`  (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `accountType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `updateTime` bigint(60) NULL DEFAULT NULL,
  `canTrade` tinyint(1) NOT NULL,
  `canWithdraw` tinyint(1) NOT NULL,
  `canDeposit` tinyint(1) NOT NULL,
  `makerCommission` bigint(60) NULL DEFAULT NULL,
  `takerCommission` bigint(60) NULL DEFAULT NULL,
  `buyerCommission` bigint(60) NULL DEFAULT NULL,
  `sellerCommission` bigint(60) NULL DEFAULT NULL,
   PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;
```

```
1.Service:
nest g service cryptoWallet trader
2.controller:
nest g controller cryptoWallet trader
3.Module
nest g module cryptoWallet trader

1639897104628
```
