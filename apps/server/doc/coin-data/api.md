

## 1.添加 code
http://localhost:1788/data/center/addCode

```json
{    
    "symbol":"BTC",
    "code":"bitcoin"
}
```

## 2.同步coin info
http://localhost:1788/data/center/syncSymbol
```javaScript
{"code":"tether"}
```

## 3.获取所有code
http://localhost:1788/data/center/codelist

## 4.获取币排名
http://localhost:1788/data/center/getCoin
```json
{
  "currentPage": 1,
  "pageSize": 10
}
```

## api
```json
{"code":"bitcoin","addlink":1,"webp":1}
{"code":"ethereum","addlink":1,"webp":1}
```