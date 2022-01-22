## 钱包表
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

## 策略
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

## 订单表
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

## user
```sql
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

INSERT INTO `user` VALUES (20, 'abchen', '123456', NULL);
INSERT INTO `user` VALUES (21, '1', '123', NULL);
INSERT INTO `user` VALUES (22, '测试注册', '123', NULL);
INSERT INTO `user` VALUES (23, '测试2', '123456', NULL);
```