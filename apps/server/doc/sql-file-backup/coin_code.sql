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

 Date: 25/08/2022 21:00:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for coin_code
-- ----------------------------
DROP TABLE IF EXISTS `coin_code`;
CREATE TABLE `coin_code`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of coin_code
-- ----------------------------
INSERT INTO `coin_code` VALUES (1, 'BTC', 'bitcoin');
INSERT INTO `coin_code` VALUES (2, 'ETH', 'ethereum');
INSERT INTO `coin_code` VALUES (3, 'USDT', 'tether');
INSERT INTO `coin_code` VALUES (4, 'USDC', 'usdc');
INSERT INTO `coin_code` VALUES (5, 'BNB', 'binance-coin');
INSERT INTO `coin_code` VALUES (6, 'BUSD', 'binanceusd');
INSERT INTO `coin_code` VALUES (7, 'XRP', 'ripple');
INSERT INTO `coin_code` VALUES (8, 'ADA', 'cardano');
INSERT INTO `coin_code` VALUES (9, 'SOL', 'solana');
INSERT INTO `coin_code` VALUES (10, 'DOGE', 'dogecoin');
INSERT INTO `coin_code` VALUES (11, 'DOT', 'polkadot100');
INSERT INTO `coin_code` VALUES (12, 'SHIB', 'shibainu');
INSERT INTO `coin_code` VALUES (13, 'MATIC', 'matictoken');
INSERT INTO `coin_code` VALUES (14, 'AVAX', 'avalanche');
INSERT INTO `coin_code` VALUES (15, 'DAI', 'dai');
INSERT INTO `coin_code` VALUES (16, 'TRX', 'tron');
INSERT INTO `coin_code` VALUES (17, 'WBTC', 'wrapped-bitcoin');
INSERT INTO `coin_code` VALUES (18, 'UNI', 'uniswap');
INSERT INTO `coin_code` VALUES (19, 'ETC', 'ethereum-classic');
INSERT INTO `coin_code` VALUES (20, 'OKB', 'okb');
INSERT INTO `coin_code` VALUES (21, 'LTC', 'litecoin');
INSERT INTO `coin_code` VALUES (22, 'FTT', 'ftx-token');
INSERT INTO `coin_code` VALUES (23, 'ATOM', 'cosmos');
INSERT INTO `coin_code` VALUES (24, 'LINK', 'chainlink');
INSERT INTO `coin_code` VALUES (25, 'NEAR', 'nearprotocol');
INSERT INTO `coin_code` VALUES (26, 'CRO', 'crypto-com-chain');
INSERT INTO `coin_code` VALUES (27, 'XMR', 'monero');
INSERT INTO `coin_code` VALUES (28, 'XLM', 'stellar');
INSERT INTO `coin_code` VALUES (29, 'BCH', 'bitcoin-cash');
INSERT INTO `coin_code` VALUES (30, 'FLOW', 'flow');
INSERT INTO `coin_code` VALUES (31, 'ALGO', 'algorand');
INSERT INTO `coin_code` VALUES (32, 'VET', 'vechaincom');
INSERT INTO `coin_code` VALUES (33, 'FIL', 'filecoinnew');
INSERT INTO `coin_code` VALUES (34, 'EOS', 'eos');
INSERT INTO `coin_code` VALUES (35, 'ICP', 'dfinity');
INSERT INTO `coin_code` VALUES (36, 'APE', 'ape1');
INSERT INTO `coin_code` VALUES (37, 'MANA', 'decentraland');
INSERT INTO `coin_code` VALUES (38, 'SAND', 'thesandbox');
INSERT INTO `coin_code` VALUES (39, 'XTZ', 'tezos');
INSERT INTO `coin_code` VALUES (40, 'HBAR', 'hederahashgraph');
INSERT INTO `coin_code` VALUES (41, 'CHZ', 'chiliz');
INSERT INTO `coin_code` VALUES (42, 'QNT', 'quant');
INSERT INTO `coin_code` VALUES (43, 'EGLD', 'elrond');
INSERT INTO `coin_code` VALUES (44, 'AAVE', 'aave-new');
INSERT INTO `coin_code` VALUES (45, 'THETA', 'thetatoken');
INSERT INTO `coin_code` VALUES (46, 'AXS', 'axieinfinity');
INSERT INTO `coin_code` VALUES (47, 'BIT', 'bitdao');
INSERT INTO `coin_code` VALUES (48, 'TUSD', 'true-usd');
INSERT INTO `coin_code` VALUES (49, 'BSV', 'bitcoin-cash-sv');
INSERT INTO `coin_code` VALUES (50, 'ZEC', 'zcash');
INSERT INTO `coin_code` VALUES (51, 'KCS', 'kcs');
INSERT INTO `coin_code` VALUES (52, 'HNT', 'hnt');
INSERT INTO `coin_code` VALUES (53, 'USDP', 'paxosstandard');
INSERT INTO `coin_code` VALUES (54, 'BTT', 'bitTorrentchain');
INSERT INTO `coin_code` VALUES (55, 'IOTA', 'iota');
INSERT INTO `coin_code` VALUES (56, 'MKR', 'maker');
INSERT INTO `coin_code` VALUES (57, 'GRT', 'graph');
INSERT INTO `coin_code` VALUES (58, 'KLAY', 'klaytn');
INSERT INTO `coin_code` VALUES (59, 'HT', 'ht');
INSERT INTO `coin_code` VALUES (60, 'FTM', 'fantom');
INSERT INTO `coin_code` VALUES (61, 'XEC', 'ecash');
INSERT INTO `coin_code` VALUES (62, 'USDD', 'decentralized-usd-trx');
INSERT INTO `coin_code` VALUES (63, 'RUNE', 'thorchain');
INSERT INTO `coin_code` VALUES (64, 'SNX', 'synthetix-network-token');
INSERT INTO `coin_code` VALUES (65, 'LDO', 'lidodaotoken');
INSERT INTO `coin_code` VALUES (66, 'NEO', 'neo');
INSERT INTO `coin_code` VALUES (67, 'USDN', 'dollarneutrino');
INSERT INTO `coin_code` VALUES (68, 'CRV', 'curve');
INSERT INTO `coin_code` VALUES (69, 'PAXG', 'paxgold');
INSERT INTO `coin_code` VALUES (70, 'GT', 'gatechaintoken');
INSERT INTO `coin_code` VALUES (71, 'WAVES', 'waves');
INSERT INTO `coin_code` VALUES (72, 'BAT', 'basic-attention-token');
INSERT INTO `coin_code` VALUES (73, 'CAKE', 'pancakeswap');
INSERT INTO `coin_code` VALUES (74, 'NEXO', 'nexo');
INSERT INTO `coin_code` VALUES (75, 'DASH', 'dash');
INSERT INTO `coin_code` VALUES (76, 'STX', 'blockstack');
INSERT INTO `coin_code` VALUES (77, 'ZIL', 'zilliqa');
INSERT INTO `coin_code` VALUES (78, 'LRC', 'loopring');
INSERT INTO `coin_code` VALUES (79, 'ENJ', 'enjin-coin');
INSERT INTO `coin_code` VALUES (80, 'GMT', 'green-metaverse');
INSERT INTO `coin_code` VALUES (81, 'MINA', 'minaprotocol');
INSERT INTO `coin_code` VALUES (82, 'BTG', 'bitcoin-gold');
INSERT INTO `coin_code` VALUES (83, 'KAVA', 'kava');
INSERT INTO `coin_code` VALUES (84, 'GNO', 'gnosis-gno');
INSERT INTO `coin_code` VALUES (85, 'TWT', 'trustwallet');
INSERT INTO `coin_code` VALUES (86, '1INCH', '1inchtoken');
INSERT INTO `coin_code` VALUES (87, 'AR', 'arweave');
INSERT INTO `coin_code` VALUES (88, 'XEM', 'nem');
INSERT INTO `coin_code` VALUES (89, 'DCR', 'decred');
INSERT INTO `coin_code` VALUES (90, 'KSM', 'kusama');
INSERT INTO `coin_code` VALUES (91, 'CELO', 'celo');
INSERT INTO `coin_code` VALUES (92, 'ANKR', 'ankr');
INSERT INTO `coin_code` VALUES (93, 'HOT', 'holo');
INSERT INTO `coin_code` VALUES (94, 'GALA', 'gala');
INSERT INTO `coin_code` VALUES (95, 'CVX', 'convex-finance');
INSERT INTO `coin_code` VALUES (96, 'XDC', 'xinfin');
INSERT INTO `coin_code` VALUES (97, 'COMP', 'compound');
INSERT INTO `coin_code` VALUES (98, 'ROSE', 'oasislabs');
INSERT INTO `coin_code` VALUES (99, 'QTUM', 'qtum');
INSERT INTO `coin_code` VALUES (100, 'YFI', 'yearnfinance');

SET FOREIGN_KEY_CHECKS = 1;
