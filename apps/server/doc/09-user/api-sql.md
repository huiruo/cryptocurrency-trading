

```sql
CREATE TABLE `api`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `userId` int(0) NOT NULL COMMENT '用户ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '该 Api 名字',
  `apiKey` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'apiKey',
  `secretKey` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'secretKey',
  `markerFree` float NOT NULL DEFAULT 0.00015,
  `takerFree` float NOT NULL DEFAULT 0.0004,
  `spotFree` float NOT NULL DEFAULT 0.001,
  -- `isSimulated` tinyint(0) NOT NULL DEFAULT 0 COMMENT '是否是模拟盘',
  -- `deletedAt` datetime(6) NULL DEFAULT NULL COMMENT '是否已被删除',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_idx`(`userId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;
```