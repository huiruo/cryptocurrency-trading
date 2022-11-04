interface Params {
  cash: number
  period: string
}

interface CheckCandleReturn {
  isHit: boolean
  periodRatio: number
  amplitude: number
}

interface trackerReturn {
  trend: 1 | 2 | 3
  periodRatio: number
  amplitude: number
}

interface Msg {
  symbol: string
  open: number
  openTime: number
  closeTime: number
  time: number
  period: string
  type: string
  periodRatio: number
  amplitude: number
}

const timeFormatMaps: Record<string, number> = {
  '1m': 60000,
  '3m': 180000,
  '5m': 300000,
  '15m': 900000,
  '30m': 1800000,
  '1h': 3600000,
  '2h': 7200000,
  '4h': 14400000,
  '6h': 21600000,
  '8h': 28800000,
  '12h': 43200000,
  '1d': 86400000,
}

const trendMaps: Record<string, number> = {
  up: 1,
  down: 2,
  sidewaysInUP: 3,
  sidewaysInDown: 4,
  sidewaysAtLow: 5,
  sidewaysAtHight: 6,
}

const intervalMaximum = {
  high: 0,
  low: 0,
  closeHigh: 0,
  closeLow: 0,
  openHigh: 0,
  openLow: 0,
}

let isInit = true
const sameSideKlineNum = 3

const mapsDownROC: Record<string, number> = {
  '1m': -0.1,
  '3m': -0.5,
  '5m': -0.8,
  '15m': -0.8,

  '30m': -1,
  '1h': -1,
  '2h': -1,
  '4h': -1,
  '6h': -1,
  '8h': -1,
  '12h': -1,
  '1d': -1,
}

const mapsRiseRoc: Record<string, number> = {
  '1m': 0.1,
  '3m': 0.5,
  '5m': 1,
  '15m': 1.2,

  '30m': 1.2,
  '1h': 1.2,
  '2h': 1.2,
  '4h': 1.2,
  '6h': 1.2,
  '8h': 1.2,
  '12h': 1.2,
  '1d': 1.2,
}

const calculateRatio = (current: Candle, preClose: number): { periodRatio: number, amplitude: number } => {
  const { close, high, low, } = current
  // 周期涨幅
  const periodRatio = (close - preClose) / preClose * 100
  const periodRatioFixed = Number(periodRatio.toFixed(2))

  // 振幅
  const amplitude = (high - low) / preClose * 100
  const amplitudeFixed = Number(amplitude.toFixed(2))

  return {
    periodRatio: periodRatioFixed,
    amplitude: amplitudeFixed,
  }
}

/**
 * 识别K线信号
 */
class CandleSignal {
  constructor(private candles: Candle[], private period: Period) { }

  /**
   * 检查前面的 K 线是否影线过多，影线过多说明不是横盘
   */
  checkWickNormal(): boolean {
    const bodyRatios = this.candles.reduce<number[]>((acc, candle) => {
      const r = (candle.high - candle.low) / Math.abs(candle.open - candle.close)
      if (r > 10) acc.push(r)
      return acc
    }, [])

    const r = times(divide(bodyRatios.length, this.candles.length), 100)

    if (r > 20) {
      return false
    }
    return true
  }

  /**
   * 检查价格是否上涨
   */
  tracker(): trackerReturn {
    // 优先检查前面 K 线影线是否正常
    /*
    const isWickNormal = this.checkWickNormal()
    if (!isWickNormal) return false
    */

    // roc基准值
    const BASE = mapsRiseRoc[this.period]
    const [current, ...previous] = this.candles


    const { high: highCurrent, low: lowCurrent, open: openCurrent, close: closeCurrent } = current
    // 计算区间最值
    if (isInit) {
      isInit = false
      const last = this.candles[this.candles.length - 1]
      intervalMaximum.high = last.high
      intervalMaximum.low = last.low
      intervalMaximum.closeHigh = last.close
      intervalMaximum.closeLow = last.close
      intervalMaximum.openHigh = last.open
      intervalMaximum.openLow = last.open
      this.candles.forEach((item) => {
        const { high: highItem, low: lowItem, open: openItem, close: closeItem } = item
        const { high, low, closeHigh, closeLow, openHigh, openLow } = intervalMaximum
        intervalMaximum.high = high > highItem ? high : highItem
        intervalMaximum.low = low < lowItem ? low : lowItem
        intervalMaximum.closeHigh = closeHigh > closeItem ? closeHigh : closeItem
        intervalMaximum.closeLow = closeLow < closeItem ? closeLow : closeItem
        intervalMaximum.openHigh = openHigh > openItem ? openHigh : openItem
        intervalMaximum.openLow = openLow < openItem ? openLow : openItem

        // console.log('time:', new Date(item.openTime).toLocaleString());
      })
      console.log('计算区间最值:第一次启动1:', intervalMaximum);
    } else {
      // console.log('计算区间最值', '非第一次启动');
      const { high, low, closeHigh, closeLow, openHigh, openLow } = intervalMaximum
      intervalMaximum.high = high > highCurrent ? high : highCurrent
      intervalMaximum.low = low < lowCurrent ? low : lowCurrent
      intervalMaximum.closeHigh = closeHigh > closeCurrent ? closeHigh : closeCurrent
      intervalMaximum.closeLow = closeLow < closeCurrent ? closeLow : closeCurrent
      intervalMaximum.openHigh = openHigh > openCurrent ? openHigh : openCurrent
      intervalMaximum.openLow = openLow < openCurrent ? openLow : openCurrent
    }

    // 是否有x根同一方向k
    // const listForSameSideKline = []
    /*
    const listForSameSideKline = previous.slice(0, sameSideKlineNum)
    console.log('计算区间最值:第一次启动2:', listForSameSideKline);
    */

    let greenKNums = 0
    let redKNums = 0
    previous.slice(0, sameSideKlineNum).forEach((item, index) => {
      const { open, close } = item
      if (open <= close) {
        greenKNums = greenKNums + 1
      } else {
        redKNums = redKNums + 1
      }
    })

    if (greenKNums >= sameSideKlineNum) {
      const { close: preClose } = previous[0] as Candle
      const { periodRatio, amplitude } = calculateRatio(current, preClose)

      return {
        trend: 1,
        periodRatio,
        amplitude,
      }
    }

    if (redKNums >= sameSideKlineNum) {
      console.log('1.识别到连续阴线=====>');
      const { close: preClose } = previous[0] as Candle
      const { periodRatio, amplitude } = calculateRatio(current, preClose)

      return {
        trend: 2,
        periodRatio,
        amplitude,
      }
    }

    return {
      trend: 3,
      periodRatio: 0,
      amplitude: 0
    }
  }

  /**
   * 检查是否放量
   */
  checkVolumeRise(direction?: 'short' | 'long'): boolean {
    const baseRocMaps: Record<string, number> = {
      '3m': 30,
      '5m': 40, //
      '15m': 60,
    }
    // roc 基准值: TODO: 多空需要区分吗？
    const BASE = direction === 'short' ? baseRocMaps[this.period] : baseRocMaps[this.period]

    const [current, ...previous] = this.candles

    const allRoc = previous.reduce<number[]>((acc, item) => {
      const roc = this.getRoc(current.volume, item.volume)
      return [...acc, roc]
    }, [])

    // roc 大于 base 的数量
    const len = allRoc.filter((roc) => roc > BASE).length

    // roc 大于 base 的数量 百分比
    const ratio = times(divide(len, allRoc.length), 100)

    // 前 5 个 roc 必须大于 base
    const every = allRoc.splice(0, 5).every((i) => i > BASE)

    // 超过 60% roc 超过 BASE 值，则认为是价格突破
    if (ratio > 60 && every) {
      return true
    }
    return false
  }

  /**
   * 计算两个值的变动速率，为了好看，把变动速率乘以 100
   * 实际上就是当前值较前一个值的变动百分比
   */
  private getRoc(curValue: number, prevValue: number) {
    if (!prevValue) return 0
    const roc = divide(curValue - prevValue, prevValue) * 100
    return roc
  }

  atr = (period: number) => {
    const atr = new ATR(period)
    return this.candles.reduce<number[]>((result, candle) => {
      atr.update(candle)
      if (atr.isStable) {
        const value = Number(atr.getResult().toFixed(8))
        result.push(value)
      }
      return result
    }, [])
  }

  tr = () => {
    const atr = new TR()
    return this.candles.reduce<number[]>((result, candle) => {
      atr.update(candle)
      if (atr.isStable) {
        const value = Number(atr.getResult().toFixed(8))
        result.push(value)
      }
      return result
    }, [])
  }

  trp = () => {
    const atr = new TR()
    return this.candles.reduce<number[]>((result, candle) => {
      atr.update(candle)
      if (atr.isStable) {
        const value = Number(atr.getResult().toFixed(8))
        result.push(times(divide(value, candle.close), 100))
      }
      return result
    }, [])
  }
}

export class Strategy extends BaseStrategy<Params> {
  description = 'K线信号机器人'
  paramsSchema: ParamsSchema = [
    {
      component: 'CashInput',
      name: 'cash',
      label: '投入金额',
    },
    {
      component: 'CandlePeriod',
      name: 'period',
      label: '周期',
      validators: { required: '不能为空' },
    },
  ]

  @onInit()
  async handleInit() {
    this.logger.info('初始化', this.params)

    this.setConfig({
      chartConfig: {
        candle: true,
        volume: true,
        // rsi: 5,
        // ma: [5, 10],
      },
    })
  }

  @onCandle('{{params.period}}')
  // @onCandle('5m')
  async handleCandle(candle: Candle) {
    const candles = this.candles.slice(0, 20)

    if (!this.isBacktest) {
      this.logger.info('close:', candle.close, new Date(candle.time))
    }

    // if (candles.length >= 20) {
    if (candles.length >= 6) {
      const { period, tradeType } = this.params
      // const type = 'Spot'
      // const type = 'Futures'
      const type = tradeType
      await this.checkSignal(period, candle, type, candles)
    }
  }


  /*
  @onCandle('1m')
  async handleCandle2(candle: Candle) {
    const candles = this.candles.slice(0, 20)

    // if (candles.length >= 20) {
    if (candles.length >= 6) {
      const { period, tradeType } = this.params
      // const type = 'Spot'
      // const type = 'Futures'
      const type = tradeType
      await this.checkSignal(period, candle, type, candles)
    }
  }
  */

  async checkSignal(period: string, candle: Candle, type: TradeType, candles: Candle[]) {
    const signal = new CandleSignal(candles, period as any)
    const { trend, periodRatio, amplitude } = signal.tracker()
    if (trend === 1 || trend === 2) {
      const { symbol, open, closeTime, time } = candle
      const calOpenTime = closeTime - timeFormatMaps[period] + 1

      const msg = {
        symbol,
        open,
        openTime: time,
        closeTime,
        time,
        period,
        type,
        periodRatio,
        amplitude
      }

      console.log('===涨===:', period, new Date(closeTime).toLocaleString());
      // await this.sendMdMsg(msg)
      if (trend == 1) {
        if (this.isBacktest) {
          this.buy()
        }
      } else {
        if (this.isBacktest) {
          this.sell()
        }
      }
    }

    if (trend === 3) {
      const { closeTime } = candle
      console.log('===盘整===:', period, new Date(closeTime).toLocaleString());
    }
  }

  private async sendMdMsg(msg: Msg) {
    try {
      const dingtalkMessages = new DingtalkMessages()
      await dingtalkMessages.sendMdMsg(msg, 'tracker')
    } catch (error) {
      console.log('send message error==========:', error)
    }
  }
}
