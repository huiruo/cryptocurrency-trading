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

 Date: 24/09/2022 06:34:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for coin_kline
-- ----------------------------
DROP TABLE IF EXISTS `coin_kline`;
CREATE TABLE `coin_kline`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'code',
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'symbol',
  `holders` bigint(0) NOT NULL COMMENT '持仓地址',
  `totalSupply` bigint(0) NOT NULL COMMENT 'maxsupply',
  `marketcappercent` int(0) NOT NULL COMMENT 'marketcappercent',
  `circulationRate` int(0) NOT NULL COMMENT 'circulationRate',
  `turn_over` int(0) NOT NULL COMMENT 'turn_over',
  `ratio` int(0) NOT NULL COMMENT 'ratio',
  `high_week` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'high_week',
  `low_week` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'low_week',
  `open` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'open',
  `price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'price',
  `high` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'high',
  `low` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'low',
  `amount_day` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'amount_day',
  `vol_24` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'vol_24',
  `vol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '成交量',
  `ticker_num` int(0) NOT NULL COMMENT 'ticker_num',
  `change` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'change',
  `change_percent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'change_percent',
  `updatetime` int(0) NOT NULL COMMENT 'updatetime',
  `vol_percent` int(0) NOT NULL COMMENT 'vol_percent',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 69 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of coin_kline
-- ----------------------------
INSERT INTO `coin_kline` VALUES (1, 'bitcoin', 'BTC', 48029354, 19138837, 37, 91, 3, 1, '21829.99', '19532.47', '19986.89', '20107.87', '136594.28', '131959.61', '532688.41', '953849.39', '72192474968', 222, '123.9', '0.62', 1662101644, 0);
INSERT INTO `coin_kline` VALUES (2, 'ethereum', 'ETH', 202540345, 122203408, 19, 0, 5, 1, '1712.35', '1425.53', '1549.04', '1590.77', '10836.18', '10225.18', '6286540.17', '444173.53', '67419324820', 293, '40.463', '2.61', 1662101664, 0);
INSERT INTO `coin_kline` VALUES (3, 'tether', 'USDT', 5193595, 67741306297, 7, 100, 37, 1, '1.0196', '1.0098', '1.0143', '1.0139', '6.8687', '6.8262', '25087070290', '3087912.69', '171551322452', 125, '-0.0005072', '-0.05', 1662101644, 0);
INSERT INTO `coin_kline` VALUES (4, 'usdc', 'USDC', 557944, 52026651620, 5, 0, 5, 1, '1.0012', '1', '1.0006', '1.0008', '6.744', '6.7406', '2635410646', '15685.98', '17775968646', 208, '0', '0', 1662101664, 0);
INSERT INTO `coin_kline` VALUES (5, 'binance-coin', 'BNB', 322448, 163276975, 4, 82, 1, 1, '303.76', '271.46', '276.82', '277.65', '1891.96', '1829.09', '2228923.5', '74917.82', '4168722897', 120, '0.4435', '0.16', 1662101664, 0);
INSERT INTO `coin_kline` VALUES (6, 'binanceusd', 'BUSD', 3814820, 19418545041, 2, 0, 37, 2, '1.0006', '1', '1.0004', '1.0003', '6.7413', '6.7393', '7169025543', '58361.22', '48268978574', 47, '-0.00010004', '-0.01', 1662101664, 0);
INSERT INTO `coin_kline` VALUES (7, 'ripple', 'XRP', 227722, 99989318921, 2, 50, 3, 1, '0.3704', '0.3188', '0.3265', '0.3346', '2.2592', '2.1703', '1425306827', '622404.12', '3213662046', 177, '0.008288', '2.54', 1662101678, 0);
INSERT INTO `coin_kline` VALUES (8, 'cardano', 'ADA', 0, 34277702082, 2, 76, 3, 1, '0.4823', '0.4252', '0.447', '0.4585', '3.1048', '2.9761', '908192920', '117343.05', '2806081558', 119, '0.011401', '2.55', 1662101678, 0);
INSERT INTO `coin_kline` VALUES (9, 'solana', 'SOL', 0, 500000000, 1, 70, 4, 1, '35.9941', '30.0623', '31.1443', '31.5773', '215.15', '205.61', '15221590.97', '1009.37', '3218897877', 70, '0.4083', '1.31', 1662101686, 0);
INSERT INTO `coin_kline` VALUES (10, 'dogecoin', 'DOGE', 5042876, 132670764300, 1, 100, 8, 1, '0.069403', '0.059968', '0.06053', '0.062179', '0.4229', '0.404', '10294132106', '16617.95', '4314865111', 170, '0.001557', '2.57', 1662101686, 0);
INSERT INTO `coin_kline` VALUES (11, 'polkadot100', 'DOT', 1051856, 1227712959, 1, 0, 4, 1, '7.6708', '6.817', '6.9707', '7.2369', '49.1085', '46.352', '43341286.21', '105236.62', '2113977033', 153, '0.2568', '3.68', 1662101686, 0);
INSERT INTO `coin_kline` VALUES (12, 'shibainu', 'SHIB', 214, 589735030408323, 1, 55, 4, 1, '0.00001408', '0.00001174', '0.00001213', '0.00001223', '0.00008368', '0.00008011', '21030477168576', '0', '1732070131', 120, '9.94703e-8', '0.82', 1662101664, 0);
INSERT INTO `coin_kline` VALUES (13, 'matictoken', 'MATIC', 268796, 10000000000, 1, 87, 12, 1, '0.8968', '0.7569', '0.8335', '0.8813', '6.0426', '5.5514', '1077879047', '1105.1', '6401549424', 148, '0.046577', '5.58', 1662101664, 0);
INSERT INTO `coin_kline` VALUES (14, 'avalanche', 'AVAX', 87948, 404229626, 1, 41, 5, 1, '23.2406', '17.565', '19.0545', '19.2635', '131.93', '124.06', '16071137.6', '3774.67', '2085895030', 112, '0.2095', '1.1', 1662101706, 0);
INSERT INTO `coin_kline` VALUES (15, 'dai', 'DAI', 116242, 6548559135, 1, 0, 3, 1, '1.0012', '0.9997', '1.0005', '1.0008', '6.746', '6.74', '226547089', '3180.97', '1527354517', 108, '0.00030014', '0.03', 1662101685, 0);
INSERT INTO `coin_kline` VALUES (16, 'tron', 'TRX', 109786280, 92383853271, 1, 0, 3, 1, '0.066939', '0.060969', '0.062882', '0.063191', '0.4277', '0.4185', '3221828889', '135067.65', '1370751289', 179, '0.00033314', '0.53', 1662101686, 0);
INSERT INTO `coin_kline` VALUES (17, 'wrapped-bitcoin', 'WBTC', 52007, 247660, 0, 1, 2, 1, '21798.56', '19524.61', '19970.18', '20088.23', '136332.51', '132137.09', '3931.02', '3967.26', '532013462', 87, '117.82', '0.59', 1662101706, 0);
INSERT INTO `coin_kline` VALUES (18, 'uniswap', 'UNI', 55425, 1000000000, 0, 75, 2, 1, '7.1081', '5.6904', '6.0636', '6.3356', '42.9163', '40.1773', '11661113.7', '62922.22', '497932857', 116, '0.2681', '4.42', 1662101717, 0);
INSERT INTO `coin_kline` VALUES (19, 'ethereum-classic', 'ETC', 2455356, 210700000, 0, 65, 11, 1, '38.2657', '30.4315', '31.9959', '32.7104', '223.13', '209.56', '14538400.97', '115160.1', '3198289933', 146, '0.7166', '2.24', 1662101727, 0);
INSERT INTO `coin_kline` VALUES (20, 'okb', 'OKB', 49675, 300000000, 0, 88, 0, 1, '17.81', '15.0437', '15.276', '15.3619', '104.96', '102.16', '646353.38', '8092.56', '66918501.98', 28, '0.077948', '0.51', 1662101727, 0);
INSERT INTO `coin_kline` VALUES (21, 'litecoin', 'LTC', 7381316, 84000000, 0, 85, 6, 1, '58.2913', '51.8357', '54.5922', '57.5415', '391.24', '365.25', '4472477.52', '218770.06', '1733284656', 180, '2.9584', '5.42', 1662101717, 0);
INSERT INTO `coin_kline` VALUES (22, 'ftx-token', 'FTT', 20014, 330083354, 0, 52, 1, 1, '28.1002', '25.1897', '26.5018', '26.5746', '182.44', '175.92', '1771544.1', '163.76', '317333703', 47, '0.047748', '0.18', 1662101717, 0);
INSERT INTO `coin_kline` VALUES (23, 'cosmos', 'ATOM', 40199, 286370297, 0, 0, 10, 1, '13.2745', '10.1823', '11.6378', '12.4445', '86.4323', '77.3764', '29728223.23', '41156.9', '2491381961', 123, '0.8119', '6.98', 1662101727, 0);
INSERT INTO `coin_kline` VALUES (24, 'chainlink', 'LINK', 115791, 1000000000, 0, 49, 8, 1, '7.1729', '6.2119', '6.5587', '6.8783', '47.0197', '43.5315', '41144786.21', '141884.77', '1907355354', 187, '0.3194', '4.87', 1662101706, 0);
INSERT INTO `coin_kline` VALUES (25, 'nearprotocol', 'NEAR', 27628, 1000000000, 0, 77, 13, 1, '4.5045', '3.6985', '4.2493', '4.2972', '29.5825', '28.3029', '98583901.1', '9883.65', '2854213666', 89, '0.049695', '1.17', 1662101727, 0);
INSERT INTO `coin_kline` VALUES (26, 'crypto-com-chain', 'CRO', 267809, 100000000000, 0, 25, 1, 1, '0.1323', '0.1175', '0.1221', '0.1222', '0.8334', '0.7964', '128689316', '6392.64', '105911738', 56, '0.0001952', '0.16', 1662101750, 0);
INSERT INTO `coin_kline` VALUES (27, 'monero', 'XMR', 0, 18168499, 0, 0, 6, 1, '155.56', '141.55', '152.53', '151.62', '1043.64', '1009.48', '1059189.81', '70564.86', '1082944485', 72, '-0.8231', '-0.54', 1662101750, 0);
INSERT INTO `coin_kline` VALUES (28, 'stellar', 'XLM', 0, 50001787613, 0, 51, 2, 1, '0.114', '0.1006', '0.1045', '0.1056', '0.7128', '0.6872', '456320383', '151168.2', '324680320', 126, '0.001097', '1.05', 1662101768, 0);
INSERT INTO `coin_kline` VALUES (29, 'bitcoin-cash', 'BCH', 17123166, 19161319, 0, 91, 6, 1, '131.32', '111.14', '114.35', '117.35', '794', '762.06', '1217017.98', '275168.13', '962132785', 168, '2.996', '2.62', 1662101768, 0);
INSERT INTO `coin_kline` VALUES (30, 'flow', 'FLOW', 413, 1390757889, 0, 0, 3, 1, '2.1852', '1.7164', '2.0319', '2.0571', '14.1228', '13.3742', '34903413.17', '0', '483520998', 34, '0.025195', '1.24', 1662101768, 0);
INSERT INTO `coin_kline` VALUES (31, 'bitcoin', 'BTC', 48203441, 19138837, 38, 91, 3, 1, '20826.99', '19532.47', '20088.03', '19787.6', '137700.19', '133118.21', '494957.35', '953849.39', '65958677911', 219, '-301.33', '-1.5', 1662206206, 0);
INSERT INTO `coin_kline` VALUES (32, 'bitcoin', 'BTC', 48203441, 19138837, 38, 91, 3, 1, '20826.99', '19532.47', '20294.5', '19841.58', '137700.19', '133118.21', '549674.37', '953849.39', '73445364986', 219, '-446.33', '-2.2', 1662210208, 0);
INSERT INTO `coin_kline` VALUES (33, 'bitcoin', 'BTC', 48203441, 19138837, 38, 91, 3, 1, '20826.99', '19532.47', '20306.14', '19856.5', '137700.19', '133118.21', '533018.19', '953849.39', '71273656290', 219, '-469.53', '-2.31', 1662212626, 0);
INSERT INTO `coin_kline` VALUES (34, 'bitcoin', 'BTC', 48163033, 19138837, 38, 91, 3, 1, '20826.99', '19532.47', '20415.37', '19817.68', '137558.76', '133118.21', '511009.02', '953849.39', '68181319742', 219, '-598.18', '-2.93', 1662216378, 0);
INSERT INTO `coin_kline` VALUES (35, 'bitcoin', 'BTC', 48226037, 19138837, 37, 91, 3, 1, '20555.77', '19532.47', '19929.51', '19788.59', '134510.15', '132521.16', '491779.09', '953849.39', '65555820303', 216, '-139.49', '-0.7', 1662257512, 0);
INSERT INTO `coin_kline` VALUES (36, 'bitcoin', 'BTC', 48226037, 19138837, 37, 91, 3, 1, '20555.77', '19532.47', '19952.98', '19791.78', '134510.15', '132521.16', '479080.34', '953849.39', '63876851197', 216, '-155.58', '-0.78', 1662268320, 0);
INSERT INTO `coin_kline` VALUES (37, 'bitcoin', 'BTC', 48231067, 19138837, 37, 91, 2, 1, '20555.77', '19532.47', '19784.8', '19689.88', '134036.33', '132521.16', '474078.89', '953849.39', '62896241993', 216, '-94.9672', '-0.48', 1662277982, 0);
INSERT INTO `coin_kline` VALUES (38, 'bitcoin', 'BTC', 48233940, 19138837, 37, 91, 2, 1, '20555.77', '19532.47', '19787.52', '19799.1', '134036.33', '132007.32', '475429.05', '953849.39', '63132445602', 216, '-3.9606', '-0.02', 1662284310, 19);
INSERT INTO `coin_kline` VALUES (39, 'bitcoin', 'BTC', 48233940, 19138837, 37, 91, 2, 1, '20555.77', '19532.47', '19838.6', '19776.21', '134036.33', '132007.32', '474389.65', '953849.39', '62932880602', 216, '-63.487', '-0.32', 1662287200, 19);
INSERT INTO `coin_kline` VALUES (40, 'bitcoin', 'BTC', 48233940, 19138837, 37, 91, 3, 1, '20555.77', '19532.47', '19831.14', '19836.43', '134255.72', '132007.32', '479974.26', '953849.39', '64498152777', 216, '5.9491', '0.03', 1662294966, 19);
INSERT INTO `coin_kline` VALUES (41, 'bitcoin', 'BTC', 48233940, 19138837, 37, 91, 3, 1, '20555.77', '19532.47', '19799.13', '19724.87', '134255.72', '132007.32', '491765.96', '953849.39', '65306430657', 215, '-75.2404', '-0.38', 1662301689, 19);
INSERT INTO `coin_kline` VALUES (42, 'bitcoin', 'BTC', 48278547, 19141612, 38, 91, 2, 1, '20555.77', '19532.47', '19789.96', '19852.58', '135069.61', '132007.32', '437641.43', '953849.39', '58553143254', 216, '61.3528', '0.31', 1662344261, 17);
INSERT INTO `coin_kline` VALUES (43, 'tether', 'USDT', 5249380, 67741306297, 7, 100, 28, 1, '1.0242', '1.0109', '1.0181', '1.0185', '6.901', '6.8451', '18862878235', '3087912.69', '129345800898', 123, '0.00040723', '0.04', 1662362639, 34);
INSERT INTO `coin_kline` VALUES (44, 'monero', 'XMR', 0, 18168499, 0, 0, 5, 1, '157.19', '144.97', '154.41', '156.84', '1059.14', '1037.18', '854136.88', '70564.86', '902877735', 68, '2.5762', '1.67', 1662363437, 0);
INSERT INTO `coin_kline` VALUES (45, 'chiliz', 'CHZ', 148739, 8888888888, 0, 68, 11, 0, '0.2283', '0.1945', '0.2145', '0.2083', '1.4621', '1.4028', '632555319', '323.08', '888218536', 95, '-0.006199', '-2.89', 1662363633, 0);
INSERT INTO `coin_kline` VALUES (46, 'ethereum', 'ETH', 202540345, 122242711, 19, 0, 3, 1, '1646.6', '1425.53', '1549.94', '1561.78', '10707.22', '10394.64', '3658061.34', '444173.53', '38494780529', 285, '11.6261', '0.75', 1662363782, 10);
INSERT INTO `coin_kline` VALUES (47, 'bitcoin', 'BTC', 48287953, 19141612, 38, 91, 3, 1, '20555.77', '19532.47', '19701.06', '19741.73', '135069.61', '132007.32', '493401.2', '953849.39', '65647589909', 217, '39.4046', '0.2', 1662364277, 17);
INSERT INTO `coin_kline` VALUES (48, 'tether', 'USDT', 5249380, 67741306297, 7, 100, 28, 1, '1.0242', '1.0109', '1.0174', '1.0189', '6.901', '6.8451', '18946643439', '3087912.69', '130228268760', 123, '0.001526', '0.15', 1662364298, 34);
INSERT INTO `coin_kline` VALUES (49, 'ethereum', 'ETH', 202540345, 122242711, 19, 0, 3, 1, '1646.6', '1425.53', '1548.98', '1563.25', '10707.22', '10394.64', '3668401.07', '444173.53', '38650262325', 285, '13.9437', '0.9', 1662364315, 10);
INSERT INTO `coin_kline` VALUES (50, 'chiliz', 'CHZ', 148739, 8888888888, 0, 68, 11, 0, '0.2283', '0.1945', '0.2143', '0.2083', '1.4621', '1.4015', '637699760', '323.08', '895567834', 95, '-0.006199', '-2.89', 1662364337, 0);
INSERT INTO `coin_kline` VALUES (51, 'monero', 'XMR', 0, 18168499, 0, 0, 5, 1, '157.19', '144.97', '154.31', '156.54', '1059.14', '1037.18', '852130.34', '70564.86', '901348196', 68, '2.2525', '1.46', 1662364337, 0);
INSERT INTO `coin_kline` VALUES (52, 'bitcoin', 'BTC', 48289598, 19142568, 37, 91, 3, 1, '20555.77', '19578.87', '19789.37', '19719.02', '135917.31', '132560.24', '605455.19', '953849.39', '80470145600', 217, '-61.319', '-0.31', 1662473915, 14);
INSERT INTO `coin_kline` VALUES (53, 'tether', 'USDT', 5281337, 67736606297, 7, 100, 44, 1, '1.0242', '1.0109', '1.0229', '1.0186', '6.8963', '6.8511', '29546351427', '3087912.69', '202799465403', 128, '-0.004296', '-0.42', 1662473926, 35);
INSERT INTO `coin_kline` VALUES (54, 'monero', 'XMR', 0, 18168499, 0, 0, 5, 1, '160.06', '147.41', '157.67', '153.47', '1078.48', '1033.6', '972339.25', '70564.86', '1004006450', 69, '-4.0643', '-2.58', 1662473926, 0);
INSERT INTO `coin_kline` VALUES (55, 'chiliz', 'CHZ', 148860, 8888888888, 0, 68, 18, 1, '0.2283', '0.1945', '0.2072', '0.2032', '1.4217', '1.361', '1069426507', '323.08', '1468676806', 95, '-0.003808', '-1.84', 1662473935, 0);
INSERT INTO `coin_kline` VALUES (56, 'ethereum', 'ETH', 204757954, 122255565, 20, 0, 6, 1, '1686.32', '1478.18', '1585.35', '1646.27', '11362.42', '10636.74', '7186938.17', '444173.53', '79930577718', 287, '64.5347', '4.08', 1662473935, 14);
INSERT INTO `coin_kline` VALUES (57, 'ethereum-classic', 'ETC', 2459821, 210700000, 1, 65, 47, 3, '41.6482', '31.102', '34.6449', '40.1786', '280.62', '232.3', '64693281.02', '115160.1', '17513985436', 144, '5.5388', '15.99', 1662473942, 3);
INSERT INTO `coin_kline` VALUES (58, 'polkadot100', 'DOT', 1053923, 1227712959, 1, 0, 4, 1, '7.698', '6.8792', '7.5372', '7.5197', '51.8691', '49.1085', '47074068.23', '105236.62', '2385094014', 151, '-0.01205', '-0.16', 1662475056, 0);
INSERT INTO `coin_kline` VALUES (59, 'ethereum-classic', 'ETC', 2459821, 210700000, 1, 65, 48, 3, '42.0823', '31.102', '35.5953', '41.5008', '283.55', '238.8', '65181845.12', '115160.1', '18207755170', 144, '5.8625', '16.45', 1662476631, 3);
INSERT INTO `coin_kline` VALUES (60, 'usdc', 'USDC', 559992, 51861996400, 5, 0, 6, 1, '1.0013', '0.9999', '1.0011', '1.0008', '6.7467', '6.74', '3108541553', '15685.98', '20963974107', 217, '-0.00030033', '-0.03', 1662476796, 4);
INSERT INTO `coin_kline` VALUES (61, 'binance-coin', 'BNB', 322450, 163276975, 4, 82, 1, 1, '291.89', '271.46', '276.49', '280.47', '1927.13', '1844.05', '2189175.25', '74917.82', '4135600129', 119, '3.5446', '1.28', 1662476783, 1);
INSERT INTO `coin_kline` VALUES (62, 'binanceusd', 'BUSD', 3834208, 19433224173, 2, 0, 33, 1, '1.0006', '1', '1.0004', '1.0004', '6.7413', '6.7393', '6452455944', '58361.22', '43389849861', 47, '0', '0', 1662476796, 8);
INSERT INTO `coin_kline` VALUES (63, 'ripple', 'XRP', 228091, 99989318921, 2, 50, 4, 1, '0.3432', '0.3208', '0.3285', '0.3343', '2.3124', '2.2093', '1959918750', '622404.12', '4408470377', 174, '0.005685', '1.73', 1662476783, 1);
INSERT INTO `coin_kline` VALUES (64, 'cardano', 'ADA', 0, 34277702082, 2, 76, 3, 1, '0.5119', '0.4395', '0.4929', '0.4958', '3.4491', '3.2847', '1184762001', '117343.05', '3956965534', 117, '0.002515', '0.51', 1662476783, 1);
INSERT INTO `coin_kline` VALUES (65, 'solana', 'SOL', 0, 500000000, 1, 70, 5, 1, '33.5007', '30.516', '31.7531', '32.9738', '225.72', '213.66', '17931022.59', '1009.37', '3966402292', 70, '1.1212', '3.52', 1662476807, 1);
INSERT INTO `coin_kline` VALUES (66, 'dogecoin', 'DOGE', 5045307, 132670764300, 1, 100, 10, 1, '0.065099', '0.059968', '0.06225', '0.062702', '0.4386', '0.4164', '13851421504', '16617.95', '5855336587', 168, '0.00029953', '0.48', 1662476783, 1);
INSERT INTO `coin_kline` VALUES (67, 'shibainu', 'SHIB', 215, 589735030408323, 1, 55, 5, 1, '0.00001332', '0.00001189', '0.00001247', '0.00001254', '0.00008671', '0.00008307', '27208028309409', '0', '2298929292', 126, '6.98329e-8', '0.56', 1662476822, 0);
INSERT INTO `coin_kline` VALUES (68, 'bitcoin', 'BTC', 48340978, 19144368, 37, 91, 3, 1, '20436.36', '18585.51', '18792.87', '19186.66', '131032.47', '125902.35', '482856.55', '953849.39', '62456797213', 219, '396.47', '2.11', 1662623196, 12);
INSERT INTO `coin_kline` VALUES (69, 'ravencoin', 'RVN', 0, 10473290000, 0, 50, 80, 2, '0.073141', '0.034513', '0.053836', '0.065152', '0.4928', '0.3621', '8329424635', '1078.93', '3657758431', 32, '0.011316', '21.02', 1663069745, 1);

SET FOREIGN_KEY_CHECKS = 1;