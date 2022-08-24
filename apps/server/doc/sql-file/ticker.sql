/*
 Navicat Premium Data Transfer

 Source Server         : boter-dev
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : 43.128.224.150:3306
 Source Schema         : boter_dev

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 23/08/2022 23:44:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ticker
-- ----------------------------
DROP TABLE IF EXISTS `ticker`;
CREATE TABLE `ticker`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `eventType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '事件类型',
  `eventTime` bigint(0) NOT NULL COMMENT '事件时间',
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '交易对',
  `priceChange` float NOT NULL COMMENT '24小时价格变化',
  `priceChangePercent` float NOT NULL COMMENT '24小时价格变化(百分比)',
  `weightedAveragePrice` float NOT NULL COMMENT '平均价格',
  `previousClose` float NOT NULL COMMENT '整整24小时之前，向前数的最后一次成交价格',
  `currentClose` float NOT NULL COMMENT '最新成交价格',
  `closeQuantity` float NOT NULL COMMENT '最新成交交易的成交量',
  `bestBid` float NOT NULL COMMENT '目前最高买单价',
  `bestBidQuantity` float NOT NULL COMMENT '目前最高买单价的挂单量',
  `bestAskPrice` float NOT NULL COMMENT '目前最低卖单价',
  `bestAskQuantity` float NOT NULL COMMENT '目前最低卖单价的挂单量',
  `open` float NOT NULL COMMENT '整整24小时前，向后数的第一次成交价格',
  `high` float NOT NULL COMMENT '24小时内最高成交价',
  `low` float NOT NULL COMMENT '24小时内最低成交价',
  `baseAssetVolume` float NOT NULL COMMENT '24小时内成交量',
  `quoteAssetVolume` float NOT NULL COMMENT '24小时内成交额',
  `openTime` bigint(0) NOT NULL COMMENT '统计开始时间',
  `closeTime` bigint(0) NOT NULL COMMENT '统计结束时间',
  `firstTradeId` bigint(0) NOT NULL COMMENT '24小时内第一笔成交交易ID',
  `lastTradeId` bigint(0) NOT NULL COMMENT '24小时内最后一笔成交交易I',
  `trades` int(0) NOT NULL COMMENT '24小时内成交数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
