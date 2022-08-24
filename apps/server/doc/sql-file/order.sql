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

 Date: 23/08/2022 23:39:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `botId` int(0) NOT NULL COMMENT '机器人ID',
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '交易对',
  `side` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '交易类型',
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '状态',
  `price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '成交价格',
  `qty` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '成交量',
  `quoteQty` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '成交金额',
  `isBuyer` tinyint(0) NULL DEFAULT NULL COMMENT '是否是买家',
  `isMaker` tinyint(0) NULL DEFAULT NULL COMMENT '是否是挂单方',
  `orderTime` bigint(0) NULL DEFAULT NULL COMMENT '订单时间',
  `createdAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `orderId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '交易所订单ID',
  `realizedProfit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '已实现利润',
  `clientOrderId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '交易所自定义订单ID',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '类型，市价、限价',
  `operationType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '类型，做多入场、做空入场、做多止损...',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `bot_idx`(`botId`) USING BTREE,
  INDEX `status_idx`(`status`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6291 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
