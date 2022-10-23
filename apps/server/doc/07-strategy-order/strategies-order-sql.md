## strategies_order
```sql
CREATE TABLE `strategies_order`(
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'symbol',
  `price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'price',
  `orderType` int(6) NOT NULL,
  `side` int(6) NOT NULL,
  `leverage` int(6) NOT NULL,

  `qty` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'qty',
  `quoteQty` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'quoteQty',
  `sellingQty` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'sellingQty',
  `sellingQuoteQty` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'sellingQuoteQty',

  `entryPrice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'entryPrice',
  `sellingPrice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'sellingPrice',
  `sellingTime` bigint(60) NULL DEFAULT NULL,

  `profit` double(8,2) NULL DEFAULT NULL,
  `profitRate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'profitRate',
  `realizedProfit` double(8,2) NULL DEFAULT NULL,
  `realizedProfitRate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'realizedProfitRate',
  `free` double(8,2) NULL DEFAULT NULL,
  -- `netProfit` double(8,2) NULL DEFAULT NULL COMMENT '净利润',
  -- `netProfitRate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '净利润比例',

  `stopType` int(6) NOT NULL DEFAULT 0 COMMENT '止盈止损方式',
  `stopProfit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'stopProfit',
  `stopLoss` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'stopLoss',
  `stopProfitPrice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'stopProfitPrice',
  `stopLossPrice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'stopLossPrice',

  `tradeUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'note',
  `klineShots` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin default NULL,

  `is_running` tinyint(1) NOT NULL,
  `userId` bigint(60) NOT NULL,
  `strategyId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `time` bigint(60) NULL DEFAULT NULL,
  `updatedAt` bigint(60) NULL DEFAULT NULL,
  -- `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;
```

## strategy_orderId
```sql
CREATE TABLE `strategy_orderid`(
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `strategyId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` bigint(60) NOT NULL,
  `orderId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'orderId',
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;
```