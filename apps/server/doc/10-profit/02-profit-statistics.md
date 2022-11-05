

```sql
CREATE TABLE `profit_statistics`(
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `userId` int(0) NOT NULL,
  `profit` double(8,2) NOT NULL DEFAULT 0,
  `profitRate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `amount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;
```

## sql date
```sql
select id, phone,time,year(time),month(time), DAY(time),TIME(time) from user where phone='xx' #分别取年、月、日、时间select id, phone,time,year(time) from user where phone='xxxxxx'  #取年

select id, phone,time,month(time) from user where phone='xxxxxx' #取月

select id, phone,time,DAY(time) from user where phone='xxxxxx'   #取日

select id, phone,time,TIME(time) from user where phone='xxxxxx'  #取时间
```

日期格式化
```sql
-- 时间格式化为 “YYYY-MM-DD”
SELECT date_format( createTime,'%Y-%m-%d') AS createTime FROM TABLE
```

date_format()函数其他格式符如下：
```
%a	工作日的缩写名称（Sun~Sat)
%b	月份的缩写名称（Jan…Dec)
%c	月份，数字形式（0~12)
%D	带有英语后缀的该月日期(0th, 2st, 3nd,…）
%d	该月日期，数字形式（00~31)
%e	该月日期，数字形式（(0~31)
%f	微秒（000000 …999999)
%H	以 2 位数表示 24 小时（00~23)
%h, %I	以 2 位数表示 12 小时（01~12)
%i	分钟，数字形式(00~59)
%j	—年中的天数（001~366)
%k	以 24 小时（0~23)表示
%l	以12小时（1~12)表示
%M	月份名称（January~December)
%m	月份，数字形式（00~12)
%p	上午（AM) 或下午（PM)
%r	时间，12小时制（小时 (hh): 分钟 (mm) : 秒数 (ss) 后加 AM 或 PM)
%S, %s	以 2 位数形式表示秒（00~59)
%T	时间，24 小时制（小时 (hh): 分钟 (mm): 秒数 (ss))
%U	周（00~53)，其中周日为每周的第一天
%u	周（00~53)，其中周一为每周的第一天
%V	周（01~53)，其中周日为每周的第一天，和％X同时使用
%v	周（01~53)，其中周一为每周的第一天，和%x同时使用
%W	星期标识（周日、周一、周二…周六）
%w	—周中的每日（0= 周日…6= 周六）
%X	该周的年份，其中周日为每周的第一天，数字形式，4 位数，和％V同时使用
%x	该周的年份，其中周一为每周的第一天，数字形式，4位数，和%v同时使用
%Y	4 位数形式表示年份
%y	2 位数形式表示年份
%%	%一个文字字符
```



