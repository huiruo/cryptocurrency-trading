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
  ]
```

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
```

### tips
```
1.如何计算成本价？

2.如何计算波动价格？
```
### 计算成本价
```
钱包 = 订单 ----> 需要聚合的订单
方法：targetFree --->计算出需要聚合的订单
calculateCostPrice
```

例子1：
```
https://www.gupiaojs.cn/
假设用a1元买进了b1手，用c1元卖出了d1手，用a2元买进了b2手，用c2元卖出了d2手，用a3元买进了b3手，用c3元卖出了d3手...，成本价就是（a1 x b1 + a2 x b2 +a3 x b3... - c1 x d1 - c2 x d2- c3 x d3...) / (b1 + b2 +b3 ... - d1 - d2 - d3 ...)

补仓后成本价计算方法：（以补仓1次为例）
（第一次买入数量*买入价+第二次买入数量*买入价+交易费用）/(第一次买入数量+第二次买入数量）

比如买入某股票，价格为5.2，买入10000股，手续费总共为16元，那么可以算出买入成本价为：〔（5.2*10000）+16〕/10000=5.2016元。

补仓后成本均价=(前期每股均价*前期所购股票数量+补仓每股均价*补仓股票数量)/(前期股票数量+补仓股票数量)
```

###  策略
由于计算持仓需要起始订单
所以需要建立一个策略表，存放正在运行的策略。并且关联起始订单
```
quantity double(16,16);
double(16,2) 16位长度，小数点后16位。
double类型，长度需大于等于小数点位数，若相等则整数部分必须为0
假设长度为3，小数点位数为2，则整数位数为1。
整数位数超出限制会导致插入失败
小数位数超出限制将对超出位从后往前依次进行五舍六入
```

```
trading_strategy
  id
  asset string  种类
  quantity double  数量
  cost_price double  成本
  profit_ratio double 盈利比率 100000.33
  first_order_id string 策略起始订单
  last_order_id string 策略起始订单
  is_running tinyint 是否正在运行
  update_time bigint  更新时间
```

```sql
CREATE TABLE `trading_strategy`  (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `asset` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `quantity` double(32,8) NULL DEFAULT NULL,
  `price` double(32,8) NULL DEFAULT NULL,
  `cost_price` double(32,8) NULL DEFAULT NULL,
  `profit_ratio` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `profit_amount` double(8,2) NULL DEFAULT NULL,
	`update_time`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `first_order_id` bigint(0) NULL DEFAULT NULL,
  `first_order_price` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `last_order_id` bigint(0) NULL DEFAULT NULL,
  `last_order_price` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `is_running` tinyint(1) NOT NULL,
   PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;
```
```sql
SELECT * FROM `mytrades` WHERE symbol = "BTCUSDT" and qty = 0.00295000;
SELECT * FROM `mytrades` WHERE symbol = "BTCUSDT" and time >= 1640633572086 order by time desc;
```

### 2021.12.29
计算成本调试代码：
```ts
/*
test:
const tradesQty= targetTrade.map(item=>{
  return {
    isBuyer:item.isBuyer,
    price:parseFloat(Number(item.price).toFixed(8)),
    qty:parseFloat(Number(item.qty).toFixed(8))
  }
})
*/

targetTrade.forEach(item=>{
  const isBuyer = item.isBuyer
  const price = parseFloat(Number(item.price).toFixed(8))
  const qty = parseFloat(Number(item.qty).toFixed(8))

  if(isBuyer===1){
    console.log("买入前：totalCost:",totalCost,"totalQty:",totalQty)

    let cost:number = parseFloat((price* qty).toFixed(8))
    totalQty = parseFloat((qty + totalQty).toFixed(8))
    totalCost = parseFloat((cost + totalCost).toFixed(8))

    console.log(qty,'单笔花费：',cost,"计算后:",totalCost,'totalQty:',totalQty)
    console.log("买入=============分割线",Number((totalCost/totalQty).toFixed(8)))
  }else{
    console.log("卖出前：totalCost:",totalCost,"totalQty:",totalQty)
    let cost:number = parseFloat((price* qty).toFixed(8))
    totalQty = parseFloat((qty - totalQty).toFixed(8))
    totalCost = parseFloat((cost - totalCost).toFixed(8))

    console.log(qty,'单笔花费：',cost,"计算后:",totalCost,'totalQty:',totalQty)
    console.log("卖出=============分割线",Number((totalCost/totalQty).toFixed(8)))
  }
})
```

### 计算起始订单调试代码
```ts
//获得起始订单 start
const findFirstOredrsql = `select * from mytrades where id='${symbolTrades[calculatingTargetIndex-1].id}'`
const firstStrategyOredr:MyTrades[] = await this.myTradesRepo.query(findFirstOredrsql);
//获得起始订单 end

/*
//and qty = 0.00295000 这里只是写死测试，start
const findFirstOredrsql = `select * from mytrades where symbol='${symbol}' and qty = 0.00093000`
const firstStrategyOredr:MyTrades[] = await this.myTradesRepo.query(findFirstOredrsql);
// console.log("实际起始订单id",firstStrategyOredr[0].id)
//end
*/
// console.log("计算出起始订单",firstStrategyOredr)
// console.log("计算出起始订单id",symbolTrades[calculatingTargetIndex-1].id)
// return firstStrategyOredr
```