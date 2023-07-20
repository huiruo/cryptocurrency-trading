## 新建数据库
```
名字：
code-platform

字符集：
utf8mb4

排序规则：
utf8mb4_unicode_ci
```

### 区别
utf8mb4_general_ci
utf8mb4_bin  utf8mb4_bin->trading使用
utf8mb4_unicode_ci -->现在使用

常用 utf8mb4_unicode_ci
utf8mb4_general_ci 更快，utf8mb4_unicode_ci 更准确。推荐是 utf8mb4_unicode_ci ，将来 8.0 里也极有可能使用变为默认的规则。相比选择哪一种collation，使用者更应该关心字符集与排序规则在db里需要统一。
```
utf8mb4_bin
二进制存储，区分大小写	
不区分大小写，

utf8mb4_general_ci	-->更快	
某些特殊语言或者字符集，排序结果可能不一致

utf8mb4_unicode_ci -->更准确
不区分大小写，能够处理特殊字符的排序
```

### 连接mysql
https://docs.nestjs.com/recipes/sql-typeorm

https://www.lpya.cn/detail/33
```
yarn add @nestjs/typeorm typeorm mysql2
或
npm install --save @nestjs/typeorm typeorm mysql2
```