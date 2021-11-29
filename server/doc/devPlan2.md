### 运行访问
```
1.公司：
test:
    5901:
    http://172.16.1.141:8099/trader/api/ticker
    5902:172.16.1.141
    http://172.16.1.141:8099/trader/api/ticker
    24小时接口postman测试：
    http://172.16.1.141:8099/trader/api/ticker/24hr
web 开发环境配置：
    proxy: {
      "/traderUrl": {
        //company
        target: "http://172.16.1.141:8099",
        //home
        // target:"http://192.168.31.139:8089",
        changeOrigin: true,
        pathRewrite: {
          "^/traderUrl": ""
        }
      }
    },
    
2.home：

```
### 2021.1127:获取24小时行情
```text
已完成
```

### 2021.1128 
1638083293
1638082888491
1.基础数据：实时存取btc信息
```text
需求：
新建：
btcusdt 表:
字段：
{
id:
time: 时间戳？
}
接口：
    币安：
    https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT
    如果不行备用 欧易：
    https://www.okex.com/api/spot/v3/instruments/BTC-USDT/ticker
```