
```sql

SELECT
  c.id,
  c.code,
  c.name_zh,
  c.symbol,
  c.price,
  c.openprice,
  c.allot_name,
  c.allot_value,
  c.blockreward,
  c.blockspleed,
  c.circulationRate,
  c.exchange_listcount,
  c.firstblocktime,
  c.halvereward,
  c.halvetime,
  c.haslongshort,
  c.his_highest_usd,
  c.his_highprice_time,
  c.his_lowest_usd,
  c.his_lowprice_time,
  c.holders,
  c.icoprice,
  c.is_infinity_supply,
  c.logo_small,
  c.marketcap,
  c.marketcap_total_rnb,
  c.marketcappercent,
  c.maxsupply,
  c.miningstate,
  c.online_time,
  c.openprice_percent,
  c.prooftype,
  c.publicchain,
  c.ranking,
  c.rateRemark,
  c.supply,
  c.supportetf,
  c.supportfutures,
  c.supportspots,
  c.updatetime
FROM coin c
where c.code = 'bitcoin'
```


```sql
SELECT
  k.amount_day,
  k.change,
  k.change_percent,
  k.high,
  k.high_week,
  k.low,
  k.low_week,
  k.open,
  k.ratio,
  k.ticker_num,
  k.totalSupply,
  k.turn_over,
  k.vol,
  k.vol_24,
  k.vol_percent
FROM coin_kline k where k.code = 'bitcoin' order by updatetime desc limit 1

-- k.id,
-- k.code,
-- k.symbol,
-- k.updatetime,
-- k.price,
-- k.marketcappercent,
-- k.circulationRate,
-- k.holders,
```

```sql
SELECT
  a.biyong,
  a.btccorrelation,
  a.codelink,
  a.coindesc,
  a.difftime,
  a.explorer,
  a.facebook,
  a.is_refresh,
  a.logo,
  a.not_public,
  a.redditlink,
  a.siteurl,
  a.supportoptions,
  a.telegramlink,
  a.twitter,
  a.white_paper
FROM coin_addition a
where a.code = 'bitcoin'

-- code,
-- id,
-- symbol,
-- updatetime,
```

```sql
SELECT
  m.description,
  m.headimg,
  m.isfounder,
  m.linkinLink,
  m.name,
  m.title,
  m.twitterlink
FROM coin_dev_member m
where m.code = 'bitcoin'

-- m.id,
-- m.code,
```