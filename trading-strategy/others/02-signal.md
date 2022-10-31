

```js
    // 超过 60% roc 超过 BASE 值，则认为是价格突破
    if (ratio > 60 && every && sd < 1.2) {
      console.log('======previous.length===1:', previous.length);
      // console.log('sd test:================2:', sd, current.close, new Date(current.time).toLocaleString())
      console.log('current=================4:', current);
      console.log('Previous================5:', previous[0]);
      const { open, close, high, low, } = current
      const { open: preOpen, close: preClose } = previous[0] as Candle

      // 周期涨幅
      const currentPeriodRatio = (close - preClose) / preClose * 100
      // const currentPeriodRatioFixed = Math.floor(currentPeriodRatio * 100) / 100
      const currentPeriodRatioFixed = currentPeriodRatio.toFixed(2)
      console.log('周期涨幅================7:', currentPeriodRatio, 'fixed:', currentPeriodRatioFixed);

      // day
      const dayOpen = 7.49
      const dayChange = (close - dayOpen) / dayOpen * 100
      const dayChangeFixed = Math.floor(dayChange * 100) / 100
      console.log('日内================8:', dayChange, 'fixed:', dayChangeFixed);

      // 振幅
      const amplitude = (high - low) / preClose * 100
      // const amplitudeFixed = Math.floor(amplitude * 100) / 100
      const amplitudeFixed = amplitude.toFixed(2)
      console.log('振幅================9:', amplitude, 'fixed:', amplitudeFixed);

      return {
        isHit: true,
        currentPeriodRatio: 0
      }
    }
```