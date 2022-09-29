
1E10的意思是：科学计数法的另外一种表示方法，表示1×10¹⁰=1×10^10=10，000，000，000

```sql
CREATE TABLE `coin_code`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
```

## 1.基础数据
```sql
CREATE TABLE `coin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name_zh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `ranked` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '当前价格',
  `holders` bigint(100) NOT NULL COMMENT 'holders',
  `maxsupply` bigint(100) NOT NULL COMMENT 'maxsupply',
  `is_infinity_supply` tinyint(50) NULL DEFAULT NULL COMMENT '是否无限增发',
  `circulationRate` float NOT NULL COMMENT '流通率',
  `supply` bigint(100) NOT NULL COMMENT '流通总量',
  `marketcap` bigint(100) NOT NULL COMMENT '总市值',
  `marketcap_total_rnb` bigint(100) NOT NULL COMMENT '总市值',
  `marketcappercent` float NOT NULL COMMENT '流通占全球市值',
  `supportfutures` int(50) NOT NULL COMMENT '是否合约',
  `supportetf` int(50) NOT NULL,
  `supportspots` int(50) NOT NULL,
  `haslongshort` int(50) NOT NULL,
  `icoprice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'ico价格',
  `openprice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '开盘价格',
  `openprice_percent` double(32, 8) NULL DEFAULT NULL COMMENT '投资回报',
  `his_highest_usd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '最高价格',
  `his_lowest_usd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '历史最低',
  `his_highprice_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '高点',
  `his_lowprice_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '低点',
  `prooftype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `allot_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `allot_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `rateRemark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `publicchain` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `miningstate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `blockreward` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `firstblocktime` bigint(100) NOT NULL,
  `blockspleed` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `halvetime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `halvereward` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `online_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `exchange_listcount` int(50) NOT NULL,
  `logo_small` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `updatetime` bigint(100) NOT NULL,
  -- ** coin_kline start
  `totalSupply` bigint(100) NOT NULL COMMENT '流通总量',
  `turn_over` float NOT NULL COMMENT '换手率',
  `ratio` float NOT NULL COMMENT '量比',
  `high_week` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '周高',
  `low_week` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '周低',
  `open` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'open',
  `high` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `low` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `amount_day` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '24小时量',
  `vol_24` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '24H成交额',
  `vol` varchar(255) NOT NULL COMMENT '24H成交额',
  `change` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '波动',
  `vol_percent` float NOT NULL COMMENT '额比率',
  `ticker_num` int(50) NOT NULL,
  `change_percent` float NOT NULL COMMENT '波动率',
  -- ** coin_kline end
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
```


```sql
CREATE TABLE `coin_kline`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `updatetime` bigint(100) NOT NULL,
  `price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '当前价格',
  `marketcappercent` float NOT NULL COMMENT '流通占全球市值',
  `circulationRate` float NOT NULL COMMENT '流通率',
  `holders` bigint(100) NOT NULL COMMENT 'holders',

  `totalSupply` bigint(100) NOT NULL COMMENT '流通总量',
  `turn_over` float NOT NULL COMMENT '换手率',
  `ratio` float NOT NULL COMMENT '量比',
  `high_week` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '周高',
  `low_week` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '周低',
  `open` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'open',
  `high` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `low` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `amount_day` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '24小时量',
  `vol_24` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '24H成交额',
  `vol` varchar(255) NOT NULL COMMENT '24H成交额',
  `change` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '波动',
  `vol_percent` float NOT NULL COMMENT '额比率',
  `ticker_num` int(50) NOT NULL,
  `change_percent` float NOT NULL COMMENT '波动率',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;
```

```sql
CREATE TABLE `coin_addition`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `siteurl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `coindesc` LONGTEXT NOT NULL,
  `codelink` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `telegramlink` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `facebook` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `twitter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `explorer` mediumtext NOT NULL,
  `redditlink` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `biyong` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `white_paper` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `difftime` int(50) NOT NULL,
  `supportoptions` int(50) NOT NULL,
  `is_refresh` int(50) NOT NULL,
  `not_public` bigint(100) NOT NULL ,
  `btccorrelation` float NOT NULL COMMENT 'btc相关性',
  `updatetime` bigint(100) NOT NULL,

  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

  `coindesc` mediumtext NOT NULL,
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
  `isfounder` int(50) NOT NULL,
  `description` mediumtext NOT NULL,

  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;
```

## 2.次要字段数据
// Initial Coin Offering缩写)，首次币发行，源自股票市场的首次公开发行(IPO)概念，是区块链项目首次发行代币，募集比特币、以太坊等通用数字货币的行为。
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

