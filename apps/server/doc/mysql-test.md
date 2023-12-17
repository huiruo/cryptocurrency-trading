

## test
```sql
UPDATE spot_order SET strategyId = NULL, strategyStatus = 0;

UPDATE spot_order SET strategyId = NULL, strategyStatus = 0 WHERE symbol = 'MKRUSDT';
TRUNCATE TABLE strategy_orderid;
DELETE FROM strategy_order WHERE symbol = 'MKRUSDT';


TRUNCATE TABLE strategy_order;
SELECT * FROM spot_order WHERE symbol = 'ARUSDT';
DELETE FROM spot_order WHERE symbol = 'ARUSDT';


DELETE FROM asset WHERE symbol = 'WLDUSDT';


UPDATE future_order SET strategyId = NULL, strategyStatus = 0 WHERE symbol = "BNBUSDT";
DELETE FROM strategy_orderid WHERE orderId = "48526159851";
DELETE FROM strategy_order WHERE symbol = "BNBUSDT";


UPDATE future_order SET strategyId = NULL, strategyStatus = 0 WHERE symbol = "CHZUSDT";
DELETE FROM strategy_orderid WHERE orderId = "9818718968";
DELETE FROM strategy_order WHERE symbol = "CHZUSDT";

UPDATE future_order SET strategyId = NULL, strategyStatus = 0 WHERE symbol = "CHZUSDT";
DELETE FROM strategy_orderid WHERE orderId = "9780625637";
DELETE FROM strategy_order WHERE symbol = "CHZUSDT";
```


## test
```js
=== not exist spotOrder,insert... ===
savaSpotOrderUtil==>res [Object: null prototype] {
  symbol: 'ARUSDT',
  id: 40019955,
  orderId: 510528045,
  orderListId: -1,
  price: '10.48000000',
  qty: '39.77000000',
  quoteQty: '416.78960000',
  commission: '0.00102725',
  commissionAsset: 'BNB',
  time: 1677497477482,
  isBuyer: true,
  isMaker: true,
  isBestMatch: true,
  userId: 1
}
savaSpotOrderUtil==>res {
  symbol: 'ARUSDT',
  id: 40019955,
  orderId: 510528045,
  orderListId: -1,
  price: '10.48000000',
  qty: '39.77000000',
  quoteQty: '416.78960000',
  commission: '0.00102725',
  commissionAsset: 'BNB',
  time: 1677497477482,
  isBuyer: 1,
  isMaker: 1,
  isBestMatch: 1,
  userId: 1
}
```