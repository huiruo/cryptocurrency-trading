/*
 Navicat Premium Data Transfer

 Source Server         : boter
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : 43.128.224.150:3306
 Source Schema         : boter_dev

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 24/09/2022 06:33:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for coin
-- ----------------------------
DROP TABLE IF EXISTS `coin`;
CREATE TABLE `coin`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'code',
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'symbol',
  `name_zh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'name_zh',
  `price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '当前价格',
  `holders` bigint(0) NOT NULL COMMENT '持仓地址',
  `maxsupply` bigint(0) NOT NULL COMMENT 'maxsupply',
  `is_infinity_supply` int(0) NOT NULL COMMENT '是否无限增发',
  `circulationRate` int(0) NOT NULL COMMENT '流通率',
  `supply` bigint(0) NOT NULL COMMENT '流通总量',
  `marketcap` bigint(0) NOT NULL COMMENT '总市值',
  `marketcap_total_rnb` bigint(0) NOT NULL COMMENT '总市值人民币',
  `marketcappercent` int(0) NOT NULL COMMENT '流通占全球市值',
  `supportfutures` int(0) NOT NULL COMMENT '是否合约',
  `supportetf` int(0) NOT NULL COMMENT 'supportetf',
  `supportspots` int(0) NOT NULL COMMENT 'supportspots',
  `haslongshort` int(0) NOT NULL COMMENT 'haslongshort',
  `icoprice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'ico价格',
  `openprice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '开盘价格',
  `openprice_percent` int(0) NOT NULL COMMENT '投资回报',
  `his_highest_usd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '最高价格',
  `his_lowest_usd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '历史最低',
  `his_highprice_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '高点',
  `his_lowprice_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '低点',
  `prooftype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'prooftype',
  `allot_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'allot_name',
  `allot_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'allot_value',
  `rateRemark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'rateRemark',
  `publicchain` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '公链',
  `miningstate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'miningstate',
  `blockreward` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'blockreward',
  `firstblocktime` bigint(0) NOT NULL COMMENT 'firstblocktime',
  `blockspleed` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'blockspleed',
  `halvetime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'halvetime',
  `halvereward` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'halvereward',
  `online_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'online_time',
  `exchange_listcount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'exchange_listcount',
  `logo_small` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '图标',
  `updatetime` int(0) NOT NULL COMMENT 'updatetime',
  `totalSupply` bigint(0) NOT NULL COMMENT 'maxsupply',
  `turn_over` int(0) NOT NULL COMMENT 'turn_over',
  `ratio` int(0) NOT NULL COMMENT 'ratio',
  `high_week` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'high_week',
  `low_week` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'low_week',
  `open` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'open',
  `high` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'high',
  `low` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'low',
  `amount_day` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'amount_day',
  `vol_24` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'vol_24',
  `vol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '成交量',
  `vol_percent` int(0) NOT NULL COMMENT 'vol_percent',
  `ticker_num` int(0) NOT NULL COMMENT 'ticker_num',
  `change` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'change',
  `change_percent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'change_percent',
  `ranked` int(0) NOT NULL COMMENT '排名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of coin
-- ----------------------------
INSERT INTO `coin` VALUES (4, 'bitcoin', 'BTC', '比特币', '19186.66', 48340978, 21000000, 0, 91, 19144368, 367316479730, 2474978440420, 37, 1, 1, 1, 1, '0.0025', '0.0025', 767466300, '68928.9', '65.53', '2021-11-10', '2013-07-05', 'POW', 'POW挖矿', '100', '100%由POW挖矿产生，预计到2140年全部挖完', 'BTC', '在挖', '6.25', 1231006505, '预估10分钟左右', '预估2024年5月', '3.125', '2008-10-31', '119', 'https://s2.gongft.com/logo/1/bitcoin.png?x-oss-process=style/coin_36', 1662623196, 19144368, 3, 1, '20436.36', '18585.51', '18792.87', '131032.47', '125902.35', '482856.55', '953849.39', '62456797213', 12, 219, '396.47', '2.11', 1);
INSERT INTO `coin` VALUES (5, 'tether', 'USDT', '泰达币', '1.0186', 5281337, 67736606297, 1, 100, 67545704103, 68996507174, 463588241192, 7, 1, 0, 1, 0, '1', '1', 2, '1.1059', '0.9251440167', '2017-11-12', '2018-02-02', '', '', '', '', 'Omni,Tron,Ethereum,BscScan,algo,polygonscan', '', '', 0, '', '', '0', '2014-11-26', '74', 'https://s2.gongft.com/logo/1/tether.png?x-oss-process=style/coin_36', 1662473926, 67736606297, 44, 1, '1.0242', '1.0109', '1.0229', '6.8963', '6.8511', '29546351427', '3087912.69', '202799465403', 35, 128, '-0.004296', '-0.42', 3);
INSERT INTO `coin` VALUES (6, 'monero', 'XMR', '门罗币', '153.47', 0, 0, 0, 0, 18168499, 2788319541, 18787697067, 0, 1, 1, 1, 0, '2.47', '2.47', 6113, '518.49', '0.2129669935', '2021-05-07', '2015-01-14', 'PoW', '', '', '', '', '', '', 0, '', '', '0', '2014-04-18', '49', 'https://s2.gongft.com/logo/1/monero.png?x-oss-process=style/coin_36', 1662473926, 18168499, 5, 1, '160.06', '147.41', '157.67', '1078.48', '1033.6', '972339.25', '70564.86', '1004006450', 0, 69, '-4.0643', '-2.58', 27);
INSERT INTO `coin` VALUES (7, 'chiliz', 'CHZ', '', '0.2032', 148860, 8888888888, 0, 68, 6000386953, 1806222222, 8215499395, 0, 1, 1, 1, 0, '0.0215', '0.0215', 845, '0.8901', '0.0038181879', '2021-03-13', '2019-09-27', '', '私募', '34.5', '未说明', 'ERC20 & BEP2', '', '', 0, '', '', '0', '2019-07-02', '65', 'https://s2.gongft.com/logo/1/chiliz.png?x-oss-process=style/coin_36', 1662473935, 8888888888, 18, 1, '0.2283', '0.1945', '0.2072', '1.4217', '1.361', '1069426507', '323.08', '1468676806', 0, 95, '-0.003808', '-1.84', 43);
INSERT INTO `coin` VALUES (8, 'ethereum', 'ETH', '以太坊', '1646.27', 204757954, 0, 1, 0, 122255565, 201265668992, 1356128077668, 20, 1, 1, 1, 1, '0.308', '0.308', 534403, '4864.02', '0.420897007', '2021-11-11', '2015-10-21', 'POW+POS', '团队', '8.3', '未说明', '', '在挖', '2', 1438197988, '预估30秒', '', '0', '2014-07-24', '120', 'https://s2.gongft.com/logo/1/ethereum.png?x-oss-process=style/coin_36', 1662473935, 122255565, 6, 1, '1686.32', '1478.18', '1585.35', '11362.42', '10636.74', '7186938.17', '444173.53', '79930577718', 14, 287, '64.5347', '4.08', 2);
INSERT INTO `coin` VALUES (9, 'ethereum-classic', 'ETC', '以太经典', '41.5008', 2459821, 210700000, 0, 65, 136634988, 8744218560, 38207568300, 1, 1, 1, 1, 0, '0.7523', '0.7523', 5417, '176.51', '0.4524460137', '2021-05-07', '2016-07-25', 'Proof of Work (PoW)', '', '', '', '', '', '', 0, '', '', '0', '2015-11-01', '85', 'https://s2.gongft.com/logo/1/ethereum-classic.png?x-oss-process=style/coin_36', 1662476631, 210700000, 48, 3, '42.0823', '31.102', '35.5953', '283.55', '238.8', '65181845.12', '115160.1', '18207755170', 3, 144, '5.8625', '16.45', 17);
INSERT INTO `coin` VALUES (10, 'polkadot100', 'DOT', '波卡币', '7.5197', 1053923, 0, 1, 0, 1112289288, 9232033137, 56357182885, 1, 1, 1, 1, 0, '0.3662', '0.3662', 1953, '54.9467', '1.6719', '2021-11-04', '2020-08-02', 'NPOS', '2017年种子轮', '50', '', 'Polkadot', '在挖', '', 0, '', '', '0', '2019-05-05', '102', 'https://s2.gongft.com/logo/1/polkadot100.png?x-oss-process=style/coin_36&v=1641782741', 1662475056, 1227712959, 4, 1, '7.698', '6.8792', '7.5372', '51.8691', '49.1085', '47074068.23', '105236.62', '2385094014', 0, 151, '-0.01205', '-0.16', 10);
INSERT INTO `coin` VALUES (11, 'usdc', 'USDC', '', '1.0008', 559992, 0, 1, 0, 51861996400, 51903485997, 349725688647, 5, 1, 0, 1, 0, '1', '1', 0, '1.3093', '0.98113621', '2018-11-20', '2019-01-07', '', '', '', '', 'Ethereum,BscScan,Tronscan,solana,Algorand,Stellar', '', '', 0, '', '', '0', '2018-09-24', '63', 'https://s2.gongft.com/logo/1/usdc.png?x-oss-process=style/coin_36', 1662476796, 51861996400, 6, 1, '1.0013', '0.9999', '1.0011', '6.7467', '6.74', '3108541553', '15685.98', '20963974107', 4, 217, '-0.00030033', '-0.03', 4);
INSERT INTO `coin` VALUES (12, 'binance-coin', 'BNB', '币安币', '280.47', 322450, 200000000, 0, 82, 163276975, 45794293178, 308561947433, 4, 1, 1, 1, 0, '0.15', '0.15', 186880, '690.49', '0.0961093977', '2021-05-10', '2017-08-01', '', '团队', '40', '创始团队成员早期持有', 'Binance Chain', '', '', 0, '', '', '0', '2017-07-26', '77', 'https://s2.gongft.com/logo/1/binance-coin.png?x-oss-process=style/coin_36', 1662476783, 163276975, 1, 1, '291.89', '271.46', '276.49', '1927.13', '1844.05', '2189175.25', '74917.82', '4135600129', 1, 119, '3.5446', '1.28', 5);
INSERT INTO `coin` VALUES (13, 'binanceusd', 'BUSD', '', '1.0004', 3834208, 0, 1, 0, 19433224173, 19440997462, 130993440898, 2, 0, 0, 1, 0, '0', '0', 0, '1.0931', '0.9702', '2022-05-12', '2019-11-13', '', '', '', '', 'ethereum,BscScan', '', '', 0, '', '', '0', '--', '36', 'https://s2.gongft.com/logo/1/binanceusd_36.png?v=02', 1662476796, 19433224173, 33, 1, '1.0006', '1', '1.0004', '6.7413', '6.7393', '6452455944', '58361.22', '43389849861', 8, 47, '0', '0', 6);
INSERT INTO `coin` VALUES (14, 'ripple', 'XRP', '瑞波币', '0.3343', 228091, 100000000000, 0, 50, 49646492379, 33426429315, 111829389344, 2, 1, 1, 1, 0, '0.005874', '0.005874', 5591, '3.8419', '0.0028023501', '2018-01-04', '2014-07-07', 'RPCA', '', '', '', '', '', '', 0, '', '', '0', '2011-04-18', '93', 'https://s2.gongft.com/logo/1/ripple.png?x-oss-process=style/coin_36&v=1662013812', 1662476783, 99989318921, 4, 1, '0.3432', '0.3208', '0.3285', '2.3124', '2.2093', '1959918750', '622404.12', '4408470377', 1, 174, '0.005685', '1.73', 8);
INSERT INTO `coin` VALUES (15, 'cardano', 'ADA', '艾达币', '0.4958', 0, 45000000000, 0, 76, 34155827433, 16994884692, 114104386365, 2, 1, 1, 1, 0, '0.0026', '0.0026', 18969, '3.099', '0.0173540991', '2021-09-02', '2017-10-01', 'PoS', '运作基金', '11', '未说明', '', '', '', 0, '', '', '0', '2017-10-02', '72', 'https://s2.gongft.com/logo/1/cardano.png?x-oss-process=style/coin_36', 1662476783, 34277702082, 3, 1, '0.5119', '0.4395', '0.4929', '3.4491', '3.2847', '1184762001', '117343.05', '3956965534', 1, 117, '0.002515', '0.51', 7);
INSERT INTO `coin` VALUES (16, 'solana', 'SOL', '', '32.9738', 0, 500000000, 0, 70, 350014611, 16486900000, 77765358773, 1, 1, 1, 1, 0, '1.565', '1.565', 2007, '259.9', '0.50533792', '2021-11-07', '2020-05-12', '', '代币销售', '37.1', '未说明', 'Solana', '', '', 0, '', '', '0', '2020-03-23', '46', 'https://s2.gongft.com/logo/1/solana.png?x-oss-process=style/coin_36&v=1586240198', 1662476807, 500000000, 5, 1, '33.5007', '30.516', '31.7531', '225.72', '213.66', '17931022.59', '1009.37', '3966402292', 1, 70, '1.1212', '3.52', 9);
INSERT INTO `coin` VALUES (17, 'dogecoin', 'DOGE', '狗狗币', '0.062702', 5045307, 132670764300, 1, 100, 132670764300, 8318722263, 56051550608, 1, 1, 1, 1, 0, '0.000559', '0.000559', 11117, '0.7402', '0.0000854744', '2021-05-08', '2015-05-07', 'PoW', '', '', '', 'BscScan', '', '', 0, '', '', '0', '2013-12-12', '106', 'https://s2.gongft.com/logo/1/dogecoin.png?x-oss-process=style/coin_36', 1662476783, 132670764300, 10, 1, '0.065099', '0.059968', '0.06225', '0.4386', '0.4164', '13851421504', '16617.95', '5855336587', 1, 168, '0.00029953', '0.48', 11);
INSERT INTO `coin` VALUES (18, 'shibainu', 'SHIB', '', '0.00001254', 215, 1000000000000000, 0, 55, 549063278876302, 7395277281, 46392838197, 1, 1, 1, 1, 0, '1e-10', '1e-10', 12539900, '0.00008818', '1e-8', '2021-10-28', '2021-02-01', '', '', '', '', 'Ethereum,BscScan,solscan', '', '', 0, '', '', '0', '2021-02-01', '87', 'https://s2.gongft.com/logo/1/shibainu.png?x-oss-process=style/coin_36&v=1612162497', 1662476822, 589735030408323, 5, 1, '0.00001332', '0.00001189', '0.00001247', '0.00008671', '0.00008307', '27208028309409', '0', '2298929292', 0, 126, '6.98329e-8', '0.56', 13);
INSERT INTO `coin` VALUES (19, 'ravencoin', 'RVN', '', '0.065152', 0, 21000000000, 0, 50, 10473290000, 682355790, 4597713313, 0, 1, 1, 1, 0, '0.026499', '0.026499', 146, '0.289', '0.0085871301', '2021-02-20', '2020-03-13', 'Proof of Work (PoW)', '', '', '', '', '', '', 0, '', '', '0', '2018-03-11', '25', 'https://s2.gongft.com/logo/1/ravencoin.png?x-oss-process=style/coin_36', 1663069745, 10473290000, 80, 2, '0.073141', '0.034513', '0.053836', '0.4928', '0.3621', '8329424635', '1078.93', '3657758431', 1, 32, '0.011316', '21.02', 64);

SET FOREIGN_KEY_CHECKS = 1;
