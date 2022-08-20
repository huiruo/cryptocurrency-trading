## main link
Request URL: 

https://dncapi.gomynft.com/api/coin/web-coininfo
```json
{"code":"bitcoin","addlink":1,"webp":1}
{"code":"polkadot100","addlink":1,"webp":1}
```

## postman
```json
{
  "symbol":"BTCUSDT",
  "baseAsset":"BTC",
  "quoteAsset":"USDT",
  "code":"bitcoin",
  "addlink":1,
  "webp":1
}
```

## 扩展
utf8已经能够存下大部分中文汉字，为什么还要使用utf8mb4?
```
MySQL在5.5.3之后增加utf8mb4编码，mb4就是most bytes 4的意思，是用来兼容四字节的unicode。

utf-8编码存储的可能2个字节、3个字节、4个字节的字符，但是在MySQL中，utf8编码只支持3字节的数据，而移动端的表情数据（比如emoj表情）是4个字节的字符。所以直接往采用utf-8编码，如果插入表情数据和不常用的汉字，以及任何新增的 Unicode 字符等数据，数据库都会报错。

两者的直观对比：

utf8 空间占用小，一般开发足够。

utf8mb4会多占用点空间，所以当有类似于存储表情需求的时候，使用这个。


utf8_unicode_ci和utf8_general_ci对于中、英文来说基本上没有什么差别，但是如果有用到俄语、法语、德语，就一定要使用utf8_unicode_ci。
两者的直观对比：

utf8_general_ci校对速度快，但准确度稍差（一般的开发中忽略不计，还是要以速度为首选），一般就选用这个就可以了。
utf8_unicode_ci准确度高，但校对速度稍慢。
```

## info sql
```sql
CREATE TABLE `simplify_symbol`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `baseAsset` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `quoteAsset` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 650 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
```

```sql
CREATE TABLE `crypto_wallet`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `asset` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `free` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `locked` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `updateTime` bigint(60) NULL DEFAULT NULL,
   PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;
```