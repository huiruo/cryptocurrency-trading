/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : trader

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 25/08/2022 21:01:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for coin_dkline
-- ----------------------------
DROP TABLE IF EXISTS `coin_dkline`;
CREATE TABLE `coin_dkline`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
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
) ENGINE = InnoDB AUTO_INCREMENT = 668 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of coin_dkline
-- ----------------------------
INSERT INTO `coin_dkline` VALUES (670, 'bitcoin', 'BTC', 47415034, 19131062, 37.8325, 91.1, 2.91, 1.01, 23625.32000000, 20792.71000000, 21289.68000000, 21630.81000000, 147038.32000000, 143333.02000000, 555239, 953849, 81046961428, 16.3, 226, 342.73000000, 1.61, 1661424937);
INSERT INTO `coin_dkline` VALUES (671, 'ethereum', 'ETH', 202540345, 122098800, 18.9344, 0, 4.69, 0.86, 1919.33000000, 1529.64000000, 1630.78000000, 1695.38000000, 11554.05000000, 10988.19000000, 5725975, 444174, 65437638539, 13.2, 296, 65.05010000, 3.99, 1661425371);
INSERT INTO `coin_dkline` VALUES (672, 'tether', 'USDT', 5117020, 67740456297, 6.2592, 99.72, 40.17, 0.89, 1.01940000, 1.00420000, 1.01600000, 1.01300000, 6.84640000, 6.81140000, 27153982506, 3087913, 185204627329, 37.38, 130, -0.00304800, -0.3, 1661425412);
INSERT INTO `coin_dkline` VALUES (673, 'tether', 'USDT', 5117020, 67740456297, 6.2535, 99.72, 40.16, 0.88, 1.01940000, 1.00420000, 1.01580000, 1.01280000, 6.84640000, 6.81140000, 27127900880, 3087913, 185127479924, 37.36, 130, -0.00314900, -0.31, 1661425536);
INSERT INTO `coin_dkline` VALUES (674, 'tether', 'USDT', 5117020, 67740456297, 6.2527, 99.72, 40.21, 0.88, 1.01940000, 1.00420000, 1.01580000, 1.01290000, 6.84640000, 6.81140000, 27127900880, 3087913, 185378645114, 37.36, 130, -0.00314900, -0.31, 1661425597);
INSERT INTO `coin_dkline` VALUES (675, 'tether', 'USDT', 5117020, 67740456297, 6.2527, 99.72, 40.43, 0.88, 1.01940000, 1.00420000, 1.01580000, 1.01270000, 6.84640000, 6.81140000, 27167865483, 3087913, 185207377761, 37.36, 131, -0.00314900, -0.31, 1661425639);
INSERT INTO `coin_dkline` VALUES (676, 'tether', 'USDT', 5117020, 67740456297, 6.2492, 99.72, 40.27, 0.88, 1.01940000, 1.00420000, 1.01570000, 1.01270000, 6.84640000, 6.81140000, 27190565445, 3087913, 185666191427, 37.35, 131, -0.00314900, -0.31, 1661425757);
INSERT INTO `coin_dkline` VALUES (677, 'usdc', 'USDC', 553382, 52262955749, 4.7695, 0, 4.59, 0.86, 1.00130000, 0.99980000, 1.00050000, 1.00050000, 6.74330000, 6.73930000, 2396545842, 15686, 16161644080, 3.25, 218, -0.00020014, -0.02, 1661426057);
INSERT INTO `coin_dkline` VALUES (678, 'binance-coin', 'BNB', 322424, 163276975, 4.4974, 81.64, 1.7, 0.73, 311.53000000, 278.53000000, 295.68000000, 302.03000000, 2054.28000000, 1991.95000000, 2766324, 74918, 5632153483, 1.13, 120, 6.29900000, 2.13, 1661426057);
INSERT INTO `coin_dkline` VALUES (679, 'binanceusd', 'BUSD', 3776715, 19136585098, 1.746, 0, 20.56, 0.85, 1.00050000, 0.99980000, 1.00010000, 1.00010000, 6.74060000, 6.73730000, 3932137209, 58361, 26518951327, 5.32, 47, 0.00010000, 0.01, 1661426095);
INSERT INTO `coin_dkline` VALUES (680, 'ripple', 'XRP', 227292, 99989330486, 1.5677, 49.54, 3.23, 0.8, 0.38860000, 0.33230000, 0.34170000, 0.34690000, 2.37640000, 2.30170000, 1600525197, 622404, 3741087122, 0.75, 177, 0.00519300, 1.52, 1661426102);
INSERT INTO `coin_dkline` VALUES (681, 'cardano', 'ADA', 0, 34817081517, 1.4471, 75.9, 2.08, 0.6, 0.55560000, 0.43580000, 0.45820000, 0.46420000, 3.16340000, 3.08190000, 710599424, 117343, 2225692696, 0.45, 118, 0.00609200, 1.33, 1661426086);
INSERT INTO `coin_dkline` VALUES (682, 'solana', 'SOL', 0, 500000000, 1.1509, 69.85, 4.32, 0.78, 41.86530000, 33.87520000, 35.14290000, 36.15190000, 244.99000000, 235.18000000, 15101937, 1009, 3677632014, 0.74, 70, 0.99830000, 2.84, 1661426118);
INSERT INTO `coin_dkline` VALUES (683, 'dogecoin', 'DOGE', 5024813, 132670764300, 0.8522, 100, 7.11, 0.77, 0.08410200, 0.06531800, 0.06779100, 0.07051000, 0.48270000, 0.45610000, 9417983235, 16618, 4474770464, 0.9, 170, 0.00272400, 4.02, 1661426118);
INSERT INTO `coin_dkline` VALUES (684, 'polkadot100', 'DOT', 1050723, 1225403676, 0.7758, 0, 3.91, 0.79, 8.57760000, 7.03010000, 7.61140000, 7.66740000, 52.07190000, 50.72770000, 43369154, 105237, 2240870216, 0.45, 155, 0.05254200, 0.69, 1661426118);
INSERT INTO `coin_dkline` VALUES (685, 'shibainu', 'SHIB', 207, 589735030408323, 0.6916, 54.91, 12.84, 0.93, 0.00001568, 0.00001254, 0.00001314, 0.00001382, 0.00009311, 0.00008833, 70339326395939, 0, 6565060349, 1.31, 123, 0.00000067, 5.1, 1661426137);
INSERT INTO `coin_dkline` VALUES (686, 'matictoken', 'MATIC', 267504, 10000000000, 0.6042, 80.42, 7.32, 0.64, 0.91350000, 0.76170000, 0.81500000, 0.82480000, 5.66590000, 5.46990000, 588577769, 1105, 3272350363, 0.66, 144, 0.01002100, 1.23, 1661426157);
INSERT INTO `coin_dkline` VALUES (687, 'avalanche', 'AVAX', 87063, 404229626, 0.6087, 39.59, 4.6, 0.79, 26.66210000, 21.63260000, 23.15730000, 23.44310000, 159.39000000, 154.83000000, 13099575, 3775, 2069213353, 0.42, 112, 0.29850000, 1.29, 1661426178);
INSERT INTO `coin_dkline` VALUES (688, 'dai', 'DAI', 115969, 6490671703, 0.5915, 0, 3.33, 0.85, 1.00200000, 0.99730000, 1.00150000, 1.00030000, 6.75140000, 6.73930000, 215546003, 3181, 1455451561, 0.29, 113, -0.00130200, -0.13, 1661426178);
INSERT INTO `coin_dkline` VALUES (689, 'tron', 'TRX', 108742041, 92394518482, 0.5503, 0, 3.88, 0.81, 0.07002800, 0.06402200, 0.06530700, 0.06537600, 0.44400000, 0.43610000, 3583219373, 135068, 1581179871, 0.32, 182, -0.00002616, -0.04, 1661426197);
INSERT INTO `coin_dkline` VALUES (690, 'wrapped-bitcoin', 'WBTC', 51701, 247162, 0.4887, 1.18, 1.32, 1.09, 23608.03000000, 20785.79000000, 21329.86000000, 21700.51000000, 146845.88000000, 143687.71000000, 3256, 3967, 477917433, 0.1, 94, 366.93000000, 1.72, 1661426199);
INSERT INTO `coin_dkline` VALUES (691, 'uniswap', 'UNI', 55240, 1000000000, 0.4851, 74.56, 1.72, 0.76, 8.20110000, 6.63140000, 7.05340000, 7.14100000, 49.03170000, 47.23470000, 12782719, 62922, 615414487, 0.12, 115, 0.09024900, 1.28, 1661426178);
INSERT INTO `coin_dkline` VALUES (692, 'ethereum-classic', 'ETC', 2449280, 210700000, 0.4596, 64.78, 22.68, 1.04, 42.67580000, 31.35030000, 33.54680000, 36.96060000, 252.92000000, 225.50000000, 30888320, 115160, 7709308459, 1.55, 147, 3.44230000, 10.27, 1661426206);
INSERT INTO `coin_dkline` VALUES (693, 'okb', 'OKB', 49645, 300000000, 0.4256, 87.56, 0.26, 0.66, 21.01760000, 16.91460000, 17.35690000, 17.78170000, 120.24000000, 116.85000000, 675281, 8093, 82467260, 0.02, 30, 0.41840000, 2.41, 1661426199);
INSERT INTO `coin_dkline` VALUES (694, 'litecoin', 'LTC', 7280756, 84000000, 0.3675, 84.54, 4.48, 0.73, 62.86150000, 52.43930000, 56.33580000, 56.79890000, 388.00000000, 377.64000000, 3178133, 218770, 1216510545, 0.24, 181, 0.50100000, 0.89, 1661426206);
INSERT INTO `coin_dkline` VALUES (695, 'ftx-token', 'FTT', 19863, 330200114, 0.343, 38.38, 1.04, 0.76, 30.59030000, 26.15930000, 27.45370000, 28.00970000, 190.57000000, 184.98000000, 1400075, 164, 264647160, 0.05, 47, 0.55190000, 2.01, 1661426219);
INSERT INTO `coin_dkline` VALUES (696, 'cosmos', 'ATOM', 40066, 286370297, 0.3361, 0, 18.25, 1.76, 13.38360000, 10.00370000, 11.80870000, 12.88040000, 90.17860000, 79.45780000, 51687642, 41157, 4535035682, 0.9, 122, 1.07650000, 9.12, 1661426206);
INSERT INTO `coin_dkline` VALUES (697, 'chainlink', 'LINK', 115119, 1000000000, 0.312, 47.06, 8.16, 0.73, 8.41990000, 6.68580000, 7.12360000, 7.27920000, 49.63140000, 47.81680000, 38362779, 141885, 1881588797, 0.38, 188, 0.16360000, 2.3, 1661426222);
INSERT INTO `coin_dkline` VALUES (698, 'nearprotocol', 'NEAR', 27494, 1000000000, 0.3067, 76.89, 13.54, 0.8, 5.20670000, 3.93990000, 4.27650000, 4.37750000, 29.97190000, 28.58390000, 104156006, 9884, 3069621846, 0.62, 86, 0.10760000, 2.52, 1661426240);
INSERT INTO `coin_dkline` VALUES (699, 'crypto-com-chain', 'CRO', 267313, 100000000000, 0.3042, 25.26, 0.43, 1.01, 0.14650000, 0.12220000, 0.12770000, 0.13200000, 0.89340000, 0.85840000, 108423655, 6393, 96611087, 0.02, 56, 0.00450000, 3.53, 1661426261);
INSERT INTO `coin_dkline` VALUES (700, 'monero', 'XMR', 0, 18165021, 0.2556, 0, 4.98, 0.81, 173.80000000, 142.16000000, 153.69000000, 154.35000000, 1047.69000000, 1012.51000000, 904467, 70565, 940869982, 0.19, 71, 0.87480000, 0.57, 1661426261);
INSERT INTO `coin_dkline` VALUES (701, 'stellar', 'XLM', 0, 50001787619, 0.2534, 50.54, 1.62, 0.78, 0.12440000, 0.10630000, 0.10900000, 0.11000000, 0.74720000, 0.73440000, 409161596, 151168, 286560915, 0.06, 130, 0.00089466, 0.82, 1661426261);
INSERT INTO `coin_dkline` VALUES (702, 'bitcoin-cash', 'BCH', 17123166, 19154113, 0.228, 91.21, 7.02, 0.8, 139.39000000, 111.53000000, 133.30000000, 130.58000000, 906.39000000, 873.64000000, 1345197, 275168, 1183818025, 0.24, 170, -2.51550000, -1.89, 1661426240);
INSERT INTO `coin_dkline` VALUES (703, 'flow', 'FLOW', 403, 1390757889, 0.2089, 0, 3.21, 0.75, 2.83180000, 2.05400000, 2.17010000, 2.20970000, 15.19680000, 14.58770000, 33313496, 0, 495758370, 0.1, 34, 0.04226400, 1.95, 1661426281);
INSERT INTO `coin_dkline` VALUES (704, 'algorand', 'ALGO', 0, 7320941443, 0.1934, 68.99, 7.44, 0.89, 0.34920000, 0.29110000, 0.30620000, 0.30730000, 2.08940000, 2.03750000, 514156969, 19756, 1062736246, 0.21, 96, 0.00061337, 0.2, 1661426281);
INSERT INTO `coin_dkline` VALUES (705, 'vechaincom', 'VET', 0, 85985041177, 0.1775, 83.62, 3.33, 0.85, 0.03060600, 0.02501800, 0.02627000, 0.02683900, 0.18320000, 0.17640000, 2412062925, 10636, 436153077, 0.09, 67, 0.00059058, 2.25, 1661426297);
INSERT INTO `coin_dkline` VALUES (706, 'filecoinnew', 'FIL', 1172900, 266916616, 0.157, 13.35, 13.85, 0.82, 8.32380000, 6.06310000, 6.30320000, 6.45230000, 44.31850000, 42.25530000, 37015338, 51269, 1607504200, 0.32, 116, 0.16160000, 2.57, 1661426281);
INSERT INTO `coin_dkline` VALUES (707, 'eos', 'EOS', 5469033, 1053784266, 0.1515, 0, 30, 0.7, 1.92620000, 1.26310000, 1.70550000, 1.67980000, 12.21800000, 11.20590000, 297362114, 167614, 3363177310, 0.68, 167, -0.02644600, -1.55, 1661426319);
INSERT INTO `coin_dkline` VALUES (708, 'dfinity', 'ICP', 0, 488508776, 0.1527, 0, 6.21, 1, 7.54450000, 6.09920000, 6.35210000, 6.54570000, 44.78610000, 42.80040000, 15878406, 18, 700401111, 0.14, 63, 0.19740000, 3.11, 1661426411);
INSERT INTO `coin_dkline` VALUES (709, 'ape1', 'APE', 88656, 1000000000, 0.1506, 30.69, 6.58, 0.8, 6.41950000, 4.85780000, 5.46370000, 5.38320000, 37.51920000, 35.80840000, 20200565, 0, 732600255, 0.15, 52, -0.07920400, -1.45, 1661426439);
INSERT INTO `coin_dkline` VALUES (710, 'decentraland', 'MANA', 264916, 2193561927, 0.1431, 0, 7.24, 0.85, 1.00220000, 0.80690000, 0.83670000, 0.84730000, 5.76630000, 5.61810000, 134123085, 2706, 765643205, 0.15, 96, 0.01128600, 1.35, 1661426418);
INSERT INTO `coin_dkline` VALUES (711, 'thesandbox', 'SAND', 159758, 3000000000, 0.1391, 47.58, 11.57, 0.78, 1.25070000, 1.01580000, 1.05590000, 1.06860000, 7.26220000, 7.07150000, 165187166, 661, 1189114996, 0.24, 77, 0.01298400, 1.23, 1661426450);
INSERT INTO `coin_dkline` VALUES (712, 'tezos', 'XTZ', 17563, 927939226, 0.1367, 0, 3.31, 0.87, 1.92390000, 1.52440000, 1.61050000, 1.65330000, 11.18840000, 10.76860000, 29967861, 21543, 333898337, 0.07, 87, 0.04346500, 2.7, 1661426477);
INSERT INTO `coin_dkline` VALUES (713, 'hederahashgraph', 'HBAR', 0, 50000000000, 0.1327, 42.17, 2.1, 1.44, 0.07587200, 0.06421600, 0.06663500, 0.06903800, 0.47530000, 0.44830000, 442605358, 619, 205889599, 0.04, 41, 0.00241800, 3.63, 1661426477);
INSERT INTO `coin_dkline` VALUES (714, 'chiliz', 'CHZ', 147857, 8888888888, 0.1315, 67.5, 33.38, 0.95, 0.26630000, 0.17590000, 0.24700000, 0.24040000, 1.79430000, 1.59420000, 2002709750, 323, 3244510517, 0.65, 93, -0.00601200, -2.44, 1661426468);
INSERT INTO `coin_dkline` VALUES (715, 'quant', 'QNT', 64877, 14612493, 0.1207, 82.62, 1.7, 0.79, 117.28000000, 98.64340000, 110.19000000, 109.65000000, 756.54000000, 726.08000000, 204754, 177, 151252375, 0.03, 45, -0.27480000, -0.25, 1661426496);
INSERT INTO `coin_dkline` VALUES (716, 'elrond', 'EGLD', 29388, 23038572, 0.1195, 73.33, 3.74, 1.12, 59.28740000, 51.22770000, 54.20990000, 56.88000000, 388.31000000, 364.96000000, 861016, 689, 330088131, 0.07, 53, 2.62070000, 4.83, 1661426509);
INSERT INTO `coin_dkline` VALUES (717, 'aave-new', 'AAVE', 120484, 16000000, 0.1153, 87.45, 12.57, 0.96, 107.06000000, 80.48870000, 89.32920000, 90.33810000, 618.37000000, 595.25000000, 1760211, 20666, 1070642959, 0.22, 116, 1.01820000, 1.14, 1661426530);
INSERT INTO `coin_dkline` VALUES (718, 'thetatoken', 'THETA', 0, 1000000000, 0.1164, 100, 3.38, 1.07, 1.43440000, 1.16110000, 1.22350000, 1.27600000, 8.73240000, 8.24390000, 33887656, 3192, 290223634, 0.06, 53, 0.04954800, 4.04, 1661426509);
INSERT INTO `coin_dkline` VALUES (719, 'axieinfinity', 'AXS', 57554, 270000000, 0.1121, 30.73, 8.03, 0.73, 17.44850000, 13.63010000, 14.66490000, 14.82050000, 101.48000000, 98.39230000, 6663476, 436, 665368052, 0.13, 95, 0.13940000, 0.95, 1661426538);
INSERT INTO `coin_dkline` VALUES (720, 'bitdao', 'BIT', 18301, 10000000000, 0.1017, 20.61, 3.39, 0.73, 0.54370000, 0.44380000, 0.52580000, 0.54130000, 3.66340000, 3.52460000, 69887440, 0, 254566884, 0.05, 17, 0.01489700, 2.83, 1661426538);
INSERT INTO `coin_dkline` VALUES (721, 'true-usd', 'TUSD', 51198, 1227899014, 0.1001, 0, 16.28, 0.88, 1.00020000, 0.99970000, 0.99990000, 1.00000000, 6.73860000, 6.73660000, 178685925, 4464, 1203726491, 0.24, 37, 0.00009999, 0.01, 1661426551);
INSERT INTO `coin_dkline` VALUES (722, 'bitcoin-cash-sv', 'BSV', 10811392, 19150402, 0.0971, 91.19, 5.58, 0.79, 63.74150000, 51.09410000, 55.67680000, 55.61070000, 382.60000000, 371.26000000, 1049399, 125210, 400269972, 0.08, 67, -0.05566600, -0.1, 1661426530);
INSERT INTO `coin_dkline` VALUES (723, 'zcash', 'ZEC', 411640, 15109731, 0.0941, 71.95, 21.44, 1.06, 78.27170000, 60.81340000, 66.61850000, 68.32430000, 471.13000000, 445.77000000, 3239100, 83047, 1491593519, 0.3, 84, 1.68590000, 2.53, 1661426559);
INSERT INTO `coin_dkline` VALUES (724, 'kcs', 'KCS', 62628, 170118638, 0.0875, 49.19, 0.27, 0.89, 10.38130000, 9.21580000, 9.61170000, 9.75130000, 66.06330000, 64.74470000, 268723, 385, 17629472, 0, 9, 0.13270000, 1.38, 1661426571);
INSERT INTO `coin_dkline` VALUES (725, 'hnt', 'HNT', 0, 223000000, 0.0787, 55.86, 2.45, 1.97, 7.74270000, 6.31440000, 7.54320000, 6.93240000, 51.62650000, 46.07570000, 3053962, 81, 142652128, 0.03, 10, -0.61010000, -8.09, 1661426582);
INSERT INTO `coin_dkline` VALUES (726, 'paxosstandard', 'USDP(PAX)', 109599, 906425972, 0.0826, 0, 0.01, 0.98, 1.00040000, 0.99750000, 0.99990000, 0.99970000, 6.74000000, 6.73190000, 54198, 5245, 365075, 0, 8, -0.00019997, -0.02, 1661426592);
INSERT INTO `coin_dkline` VALUES (727, 'bitTorrentchain', 'BTT', 24344, 990000000000000, 0.0788, 0, 2.65, 1.04, 0.00000097, 0.00000086, 0.00000090, 0.00000092, 0.00000625, 0.00000605, 24833075834980, 0, 154195442, 0.03, 35, 0.00000002, 2.65, 1661426592);
INSERT INTO `coin_dkline` VALUES (728, 'iota', 'IOTA', 340692, 2779530283, 0.0769, 100, 1.97, 0.96, 0.33250000, 0.27730000, 0.30110000, 0.30350000, 2.06580000, 2.00720000, 54708487, 5358, 111877924, 0.02, 45, 0.00219900, 0.73, 1661426597);
INSERT INTO `coin_dkline` VALUES (729, 'maker', 'MKR', 3512, 977631, 0.0775, 97.22, 5.47, 1.14, 974.34000000, 796.00000000, 854.59000000, 869.36000000, 5908.35000000, 5704.18000000, 53451, 6173, 313491230, 0.06, 82, 14.02740000, 1.64, 1661426597);
INSERT INTO `coin_dkline` VALUES (730, 'graph', 'GRT', 109236, 10000000000, 0.0743, 68.61, 4.12, 0.97, 0.12620000, 0.09981800, 0.11530000, 0.11810000, 0.80990000, 0.76740000, 284455479, 0, 226357666, 0.05, 57, 0.00280100, 2.43, 1661426597);
INSERT INTO `coin_dkline` VALUES (731, 'klaytn', 'KLAY', 0, 10782297981, 0.0704, 0, 3.88, 0.91, 0.28380000, 0.23510000, 0.25750000, 0.25630000, 1.78420000, 1.69660000, 116919932, 568, 201957658, 0.04, 37, -0.00121000, -0.47, 1661426612);
INSERT INTO `coin_dkline` VALUES (732, 'ht', 'HT', 51351, 207350658, 0.0746, 32.97, 4.47, 1.24, 5.10030000, 4.34310000, 4.68710000, 4.96550000, 33.46150000, 31.51490000, 7363479, 10254, 246363885, 0.05, 47, 0.27700000, 5.91, 1661426597);
INSERT INTO `coin_dkline` VALUES (733, 'fantom', 'FTM', 75896, 3175000000, 0.0731, 80.16, 14.42, 0.9, 0.36210000, 0.28530000, 0.30290000, 0.31500000, 2.12650000, 2.02470000, 366851865, 723, 778677232, 0.16, 59, 0.01170700, 3.86, 1661426612);
INSERT INTO `coin_dkline` VALUES (734, 'ecash', 'XEC', 0, 21000000000000, 0.0702, 91.19, 0.71, 0.91, 0.00004589, 0.00003853, 0.00003966, 0.00004020, 0.00027309, 0.00026628, 135459551192, 0, 36696013, 0.01, 29, 0.00000053, 1.34, 1661426612);
INSERT INTO `coin_dkline` VALUES (735, 'decentralized-usd-trx', 'USDD', 1114, 748476949, 0.0683, 0.07, 0.99, 0.78, 1.02840000, 0.99900000, 1.00040000, 1.00010000, 6.74600000, 6.73590000, 7391750, 0, 49754697, 0.01, 26, -0.00050030, -0.05, 1661426612);
INSERT INTO `coin_dkline` VALUES (736, 'thorchain', 'RUNE', 0, 334937975, 0.0675, 33.07, 12.34, 0.93, 2.57790000, 2.02680000, 2.15070000, 2.23880000, 15.37270000, 14.48600000, 40809367, 683, 615774848, 0.12, 34, 0.08631400, 4.01, 1661426633);
INSERT INTO `coin_dkline` VALUES (737, 'synthetix-network-token', 'SNX', 8521, 291657311, 0.0639, 0, 8.83, 0.75, 3.59280000, 2.65040000, 3.04450000, 2.99670000, 21.20440000, 20.13040000, 20624966, 6070, 416413109, 0.08, 94, -0.05306500, -1.74, 1661426633);
INSERT INTO `coin_dkline` VALUES (738, 'lidodaotoken', 'LDO', 9, 1000000000, 0.0605, 31.3, 16.3, 0.67, 2.60100000, 1.73440000, 2.08540000, 2.12100000, 15.77160000, 14.03320000, 51016022, 0, 729175606, 0.15, 43, 0.03031400, 1.45, 1661426633);
INSERT INTO `coin_dkline` VALUES (739, 'neo', 'NEO', 135358, 100000000, 0.0647, 70.54, 7.28, 0.86, 11.43850000, 9.21840000, 10.00920000, 10.06000000, 69.10020000, 66.72370000, 5141354, 70013, 348531835, 0.07, 77, 0.04407000, 0.44, 1661426612);
INSERT INTO `coin_dkline` VALUES (740, 'dollarneutrino', 'USDN', 1925, 693030360, 0.0605, 0, 0.05, 1.04, 1.00430000, 0.93610000, 0.99100000, 0.95720000, 6.70830000, 6.43950000, 323697, 30, 2091170, 0, 4, -0.03451100, -3.48, 1661426654);
INSERT INTO `coin_dkline` VALUES (741, 'curve', 'CRV', 77087, 1809461226, 0.0574, 17.43, 42.74, 1.07, 1.22880000, 0.97210000, 1.16140000, 1.19290000, 8.13540000, 7.81540000, 225687372, 5488, 1813938253, 0.36, 96, 0.03124800, 2.69, 1661426657);
INSERT INTO `coin_dkline` VALUES (742, 'paxgold', 'PAXG', 18985, 339687, 0.0544, 0, 1.3, 0.7, 1765.05000000, 1723.67000000, 1742.63000000, 1757.03000000, 11854.29000000, 11741.23000000, 4427, 132, 52390317, 0.01, 40, 14.11750000, 0.81, 1661426657);
INSERT INTO `coin_dkline` VALUES (743, 'gatechaintoken', 'GT', 3635, 300000000, 0.0543, 13.08, 0.14, 0.91, 4.90330000, 4.35160000, 4.49880000, 4.55540000, 30.76360000, 29.99280000, 185995, 3011, 5708992, 0, 7, 0.05934700, 1.32, 1661426657);
INSERT INTO `coin_dkline` VALUES (744, 'waves', 'WAVES', 0, 109142680, 0.0517, 0, 20.92, 0.77, 5.81190000, 4.67850000, 5.23480000, 5.19390000, 35.49710000, 34.54840000, 22806201, 4387, 798870291, 0.16, 69, -0.04294200, -0.82, 1661426674);
INSERT INTO `coin_dkline` VALUES (745, 'basic-attention-token', 'BAT', 21582, 1500000000, 0.0513, 99.89, 6.75, 1.11, 0.42490000, 0.34840000, 0.36740000, 0.37580000, 2.55500000, 2.47010000, 101220406, 13397, 256140690, 0.05, 84, 0.00848400, 2.31, 1661426678);
INSERT INTO `coin_dkline` VALUES (746, 'pancakeswap', 'CAKE', 1246996, 321091675, 0.0513, 18.75, 9.43, 1.02, 4.05720000, 3.59340000, 3.89970000, 3.99960000, 27.27340000, 26.16970000, 13270411, 19, 357364944, 0.07, 60, 0.09335900, 2.39, 1661426657);
INSERT INTO `coin_dkline` VALUES (747, 'nexo', 'NEXO', 74060, 1000000000, 0.0511, 56, 7.05, 1.3, 1.06420000, 0.84970000, 0.98680000, 1.00140000, 6.83090000, 6.46910000, 39425279, 1118, 266337407, 0.05, 43, 0.01518700, 1.54, 1661426686);
INSERT INTO `coin_dkline` VALUES (748, 'dash', 'DASH', 1613695, 10877524, 0.0493, 57.55, 22.74, 1.08, 55.20880000, 44.33530000, 48.93740000, 49.73930000, 340.95000000, 328.01000000, 2474546, 113753, 828933185, 0.17, 109, 0.86980000, 1.78, 1661426695);
INSERT INTO `coin_dkline` VALUES (749, 'blockstack', 'STX', 0, 1352464600, 0.0485, 73.18, 1.65, 0.88, 0.47510000, 0.37690000, 0.38810000, 0.39990000, 2.72480000, 2.61160000, 21940981, 190, 59161933, 0.01, 17, 0.01179800, 3.04, 1661426695);
INSERT INTO `coin_dkline` VALUES (750, 'zilliqa', 'ZIL', 0, 16497239046, 0.0487, 62.88, 35.19, 2.04, 0.04432900, 0.03606300, 0.03794400, 0.04048200, 0.28220000, 0.25540000, 4647491403, 5114, 1267685615, 0.25, 66, 0.00256300, 6.76, 1661426702);
INSERT INTO `coin_dkline` VALUES (751, 'loopring', 'LRC', 152565, 1373873437, 0.0483, 96.77, 7.88, 1.22, 0.44100000, 0.36110000, 0.38160000, 0.39870000, 2.74640000, 2.56380000, 104724617, 4980, 281336465, 0.06, 77, 0.01731400, 4.54, 1661426702);
INSERT INTO `coin_dkline` VALUES (752, 'enjin-coin', 'ENJ', 181923, 1000000000, 0.0469, 89.64, 12.13, 1.01, 0.66170000, 0.53280000, 0.56460000, 0.57420000, 3.92820000, 3.77590000, 108784661, 1289, 420883461, 0.08, 93, 0.00982000, 1.74, 1661426702);
INSERT INTO `coin_dkline` VALUES (753, 'green-metaverse', 'GMT', 93622, 6000000000, 0.0438, 10, 25.6, 0.56, 1.00820000, 0.73910000, 0.79380000, 0.80150000, 5.45170000, 5.27240000, 153659697, 0, 829666313, 0.17, 46, 0.00872000, 1.1, 1661426717);
INSERT INTO `coin_dkline` VALUES (754, 'minaprotocol', 'MINA', 0, 824104972, 0.0437, 64.6, 7.12, 0.98, 0.81280000, 0.67750000, 0.72280000, 0.74320000, 5.05680000, 4.83780000, 46008480, 0, 230164583, 0.05, 38, 0.01606900, 2.21, 1661426717);
INSERT INTO `coin_dkline` VALUES (755, 'bitcoin-gold', 'BTG', 0, 17513924, 0.0429, 83.4, 3.22, 1.08, 30.00940000, 24.27420000, 26.42450000, 26.85030000, 183.31000000, 177.19000000, 564199, 440, 102065015, 0.02, 19, 0.40720000, 1.54, 1661426717);
INSERT INTO `coin_dkline` VALUES (756, 'kava', 'KAVA', 0, 253359299, 0.0427, 0, 5.18, 0.85, 2.16250000, 1.73800000, 1.80160000, 1.86950000, 12.67480000, 12.12090000, 12883899, 2144, 163659703, 0.03, 37, 0.06913400, 3.84, 1661426717);
INSERT INTO `coin_dkline` VALUES (757, 'gnosis-gno', 'GNO', 15642, 10000000, 0.0398, 25.8, 1.04, 0.69, 203.43000000, 159.79000000, 163.50000000, 168.89000000, 1143.84000000, 1101.39000000, 26861, 39, 30566624, 0.01, 33, 5.31610000, 3.25, 1661426736);
INSERT INTO `coin_dkline` VALUES (758, 'trustwallet', 'TWT', 280839, 999668148, 0.0389, 41.66, 1.37, 0.39, 1.15190000, 0.92290000, 1.01870000, 1.02390000, 7.04120000, 6.84100000, 5732694, 39, 39429825, 0.01, 16, 0.00306200, 0.3, 1661426736);
INSERT INTO `coin_dkline` VALUES (759, '1inchtoken', '1INCH', 92632, 1500000000, 0.0397, 38.74, 6.01, 0.93, 0.79480000, 0.66210000, 0.72680000, 0.74990000, 5.07100000, 4.87760000, 34947831, 0, 176586377, 0.04, 77, 0.02339300, 3.22, 1661426778);
INSERT INTO `coin_dkline` VALUES (760, 'arweave', 'AR', 0, 63190435, 0.0388, 50.6, 3.92, 0.85, 13.60620000, 11.59780000, 12.62850000, 12.74490000, 87.45650000, 83.87590000, 1310588, 349, 112335604, 0.02, 38, 0.08985000, 0.71, 1661426806);
INSERT INTO `coin_dkline` VALUES (761, 'nem', 'XEM', 0, 8999999999, 0.0392, 100, 4.54, 1.67, 0.05418200, 0.04377000, 0.04639700, 0.04785000, 0.33380000, 0.31100000, 408856280, 6787, 131820702, 0.03, 56, 0.00145200, 3.13, 1661426822);
INSERT INTO `coin_dkline` VALUES (762, 'decred', 'DCR', 575869, 14290637, 0.0434, 68.05, 7.81, 3.58, 37.01240000, 27.21380000, 28.79290000, 33.29520000, 249.38000000, 193.70000000, 1117130, 1499, 250620308, 0.05, 29, 4.42560000, 15.33, 1661426822);
INSERT INTO `coin_dkline` VALUES (763, 'kusama', 'KSM', 265878, 10000000, 0.0386, 84.7, 12.13, 1.41, 55.83950000, 46.90420000, 48.76020000, 50.11300000, 340.68000000, 328.53000000, 1026718, 5938, 346683153, 0.07, 73, 1.27940000, 2.62, 1661426828);
INSERT INTO `coin_dkline` VALUES (764, 'celo', 'CELO', 0, 1000000000, 0.0382, 45.66, 3.22, 0.83, 1.02680000, 0.85710000, 0.89820000, 0.91930000, 6.25550000, 6.04870000, 14693495, 51, 91015083, 0.02, 35, 0.01961300, 2.18, 1661426822);
INSERT INTO `coin_dkline` VALUES (765, 'ankr', 'ANKR', 30730, 10000000000, 0.0373, 96.63, 67.8, 3.2, 0.04878700, 0.03572800, 0.03704300, 0.04241200, 0.30880000, 0.24950000, 6551283292, 1710, 1872173695, 0.37, 62, 0.00533500, 14.39, 1661426822);
INSERT INTO `coin_dkline` VALUES (766, 'holo', 'HOT', 129326, 177619433541, 0.0356, 97.59, 4.23, 0.94, 0.00256800, 0.00208900, 0.00221800, 0.00225700, 0.01528100, 0.01483700, 7334213136, 316, 111613498, 0.02, 26, 0.00003903, 1.76, 1661426839);
INSERT INTO `coin_dkline` VALUES (767, 'gala', 'GALA', 156903, 35240112493, 0.0355, 13.95, 45.6, 0.87, 0.06587800, 0.05017100, 0.05500100, 0.05585300, 0.38240000, 0.36560000, 3180493778, 0, 1197485587, 0.24, 82, 0.00083625, 1.52, 1661426839);
INSERT INTO `coin_dkline` VALUES (768, 'convex-finance', 'CVX', 14350, 94003310, 0.0355, 66.99, 3.12, 1.18, 6.05000000, 4.85580000, 5.56790000, 5.82200000, 39.79930000, 37.47330000, 2089729, 0, 81925621, 0.02, 37, 0.25810000, 4.64, 1661426839);
INSERT INTO `coin_dkline` VALUES (769, 'xinfin', 'XDC', 0, 37705012699, 0.0349, 0, 0.28, 1.11, 0.03453900, 0.02812300, 0.03089800, 0.03114400, 0.21550000, 0.20640000, 34853649, 9, 7313978, 0, 10, 0.00023797, 0.77, 1661426838);
INSERT INTO `coin_dkline` VALUES (770, 'compound', 'COMP', 12034, 10000000, 0.0341, 72.17, 8.43, 0.86, 60.35010000, 48.07600000, 51.13170000, 51.79770000, 355.13000000, 339.89000000, 606150, 8147, 212383245, 0.04, 53, 0.62430000, 1.22, 1661426839);
INSERT INTO `coin_dkline` VALUES (771, 'oasislabs', 'ROSE', 201934, 10000000000, 0.0331, 50.27, 7.04, 0.64, 0.08779200, 0.06362300, 0.07323700, 0.07227200, 0.50090000, 0.47770000, 354107265, 874, 172402686, 0.03, 21, -0.00091483, -1.25, 1661426839);
INSERT INTO `coin_dkline` VALUES (772, 'qtum', 'QTUM', 1099, 104300448, 0.0335, 96.73, 10.45, 1.1, 4.10160000, 3.27400000, 3.49430000, 3.52660000, 24.13070000, 23.31410000, 10899945, 31845, 258928118, 0.05, 92, 0.03041600, 0.87, 1661426860);
INSERT INTO `coin_dkline` VALUES (773, 'yearnfinance', 'YFI', 7322, 36666, 0.0335, 99.92, 23.25, 1.12, 11449.68000000, 8277.20000000, 9208.90000000, 10023.93000000, 68776.04000000, 61969.25000000, 8543, 49430, 575384031, 0.12, 93, 810.75000000, 8.8, 1661426860);

SET FOREIGN_KEY_CHECKS = 1;
