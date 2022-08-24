
```sql
CREATE TABLE `coin_code`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `baseAsset` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `quoteAsset` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 667 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
```

## 1.基础数据
```sql
CREATE TABLE `coin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name_zh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `rank` bigint(0) NOT NULL COMMENT '排名',
  `price` double(32, 8) NULL DEFAULT NULL COMMENT '当前价格',
  `holders` bigint(0) NOT NULL COMMENT 'holders',
  `maxsupply` bigint(0) NOT NULL COMMENT 'maxsupply',
  `is_infinity_supply` tinyint(0) NULL DEFAULT NULL COMMENT '是否无限增发',
  `circulationRate` float NOT NULL COMMENT '流通率',
  `supply` bigint(0) NOT NULL COMMENT '流通总量',
  `marketcap` bigint(0) NOT NULL COMMENT '总市值',
  `marketcap_total_rnb` bigint(0) NOT NULL COMMENT '总市值',
  `marketcappercent` float NOT NULL COMMENT '流通占全球市值',
  `supportfutures` int(0) NOT NULL COMMENT '是否合约',
  `supportetf` int(0) NOT NULL,
  `supportspots` int(0) NOT NULL,
  `haslongshort` int(0) NOT NULL,
  `icoprice` double(32, 8) NULL DEFAULT NULL COMMENT 'ico价格',
  `openprice` double(32, 8) NULL DEFAULT NULL COMMENT '开盘价格',
  `openprice_percent` double(32, 8) NULL DEFAULT NULL COMMENT '投资回报',
  `his_highest_usd` double(32, 8) NULL DEFAULT NULL COMMENT '最高价格',
  `his_lowest_usd` double(32, 8) NULL DEFAULT NULL COMMENT '历史最低',
  `his_highprice_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '高点',
  `his_lowprice_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '低点',
  `prooftype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `allot_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `allot_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `rateRemark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `publicchain` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `miningstate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `blockreward` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `firstblocktime` bigint(0) NOT NULL,
  `blockspleed` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `halvetime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `halvereward` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `online_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `exchange_listcount` int(0) NOT NULL,
  `logo_small` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `updatetime` bigint(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 667 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
```


```sql
CREATE TABLE `day_kline`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `holders` bigint(0) NOT NULL COMMENT 'holders',
  `totalSupply` bigint(0) NOT NULL COMMENT '流通总量',
  `marketcappercent` float NOT NULL COMMENT '流通占全球市值',
  `circulationRate` float NOT NULL COMMENT '流通率',
  `turn_over` float NOT NULL COMMENT '换手率',
  `ratio` float NOT NULL COMMENT '量比',
  `high_week` double(32, 8) NULL DEFAULT NULL COMMENT '周高',
  `low_week` double(32, 8) NULL DEFAULT NULL COMMENT '周低',
  `open` double(32, 8) NULL DEFAULT NULL COMMENT 'open',
  `price` double(32, 8) NULL DEFAULT NULL COMMENT '当前价格',
  `high` double(32, 8) NULL DEFAULT NULL,
  `low` double(32, 8) NULL DEFAULT NULL,
  `amount_day` bigint(0) NOT NULL COMMENT '24小时量',
  `vol_24` bigint(0) NOT NULL COMMENT '24H成交额',
  `vol` bigint(0) NOT NULL COMMENT '24H成交额',
  `vol_percent` float NOT NULL COMMENT '额比率',
  `ticker_num` int(0) NOT NULL,
  `change` double(32, 8) NULL DEFAULT NULL COMMENT '波动',
  `change_percent` float NOT NULL COMMENT '波动率',
  `updatetime` bigint(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 667 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Compact;
}
```

```sql
CREATE TABLE `coin_addition`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `siteurl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `coindesc` mediumtext NOT NULL,
  `codelink` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `telegramlink` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `facebook` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `twitter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `explorer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `redditlink` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `biyong` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `white_paper` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `difftime` int(0) NOT NULL,
  `supportoptions` int(0) NOT NULL,
  `is_refresh` int(0) NOT NULL,
  `not_public` bigint(0) NOT NULL ,
  `btccorrelation` float NOT NULL COMMENT 'btc相关性',
  `updatetime` bigint(0) NOT NULL,

  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 667 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Compact;
}
```

```sql
CREATE TABLE `coin_dev_member`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `headimg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `twitterlink` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `linkinLink` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `isfounder` int(0) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,

  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 667 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Compact;
```

## 2.次要字段数据
// Initial Coin Offering缩写)，首次币发行，源自股票市场的首次公开发行(IPO)概念，是区块链项目首次发行代币，募集比特币、以太坊等通用数字货币的行为。

```

```

去掉的字段:
```
"weibo": "",
"lang": "",
"pledgeamount": "",
"mediumlink": "",
"audit": [],
"contract_addr": "",
"scenetag": [],
"tokenminiunit": "",
"tokeninflation": "",
"crowdfunding": [],
"lockpositionreleaseinfo": "",
"forking": [],
"orgaddress": "",
"orgimg": "",
"founders": [],
"contracts": [],
"ico_first": "",
"ico_sum": "",
"lockandlift": [],
"disposal": [],
"discord": "",
"coinfounderqa": [],
"consultant": [],
"tags": [],
```

