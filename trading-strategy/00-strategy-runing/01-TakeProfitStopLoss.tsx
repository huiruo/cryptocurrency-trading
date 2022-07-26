import { BaseStrategy, ParamsSchema, Candle, Ticker } from 'boter-core'

interface Params {
  // initialMargin:cash * leverage
  cash: number
  leverage: number
  direction: 'long' | 'short'
  purchasePrice: number
  profitPercent: number
  lossPercent: number
  profitPrice: number
  lossPrice: number
}

// tradeStatus
const unSubmited = 0
const pending = 1
const opening = 2
const stoped = 3
const fail = 4

export class Strategy extends BaseStrategy<Params> {
  name = 'Take Profit/Stop Loss Strategy'
  tradeStatus = unSubmited

  firstTicker: Ticker
  price: number

  paramsSchema: ParamsSchema = [
    {
      name: 'direction',
      component: 'RadioGroup',
      updatable: false,
      value: 'short',
      options: [
        { label: '做多', value: 'long' },
        { label: '做空', value: 'short' },
      ],
    },

    {
      label: '杠杆',
      name: 'leverage',
      component: 'Leverage',
      updatable: false,
      value: 1,
      validators: {
        required: '不能为空',
      },
    },

    {
      label: '投资额',
      description: '如果余额不足，策略会自动终止',
      name: 'cash',
      updatable: false,
      component: 'CashInput',
      componentProps: {
        placeholder: '投资额',
      },
      validators: {
        required: '投资额不能为空',
      },
    },
    {
      label: '委托价格',
      description: '委托价格/usdt',
      name: 'purchasePrice',
      component: 'NumberInput',
      updatable: false,
      validators: {
        required: '委托价格不能为空',
      },
    },
    {
      component: 'Box',
      css: 'toCenterY spaceX3',
      children: [
        {
          label: '止盈率:单位%',
          name: 'profitPercent',
          component: 'NumberInput',
          componentProps: {
            placeholder: '到达止盈线自动平仓',
          },
          validators: {
            required: '止盈率不能为空',
          },
        },
        {
          label: '止损率:单位%',
          name: 'lossPercent',
          component: 'NumberInput',
          componentProps: {
            placeholder: '值为0表示不自动平仓',
          },
          validators: {
            required: '止损率不能为空',
          },
        },
      ],
    },
  ]

  locking = false

  async onInit() {
    this.logger.info('1.init-test........')
  }

  async onFuturesTicker(ticker: Ticker) {
    if (this.locking) return
    this.locking = true
    await this.sleep(2000)
    this.logger.info(`1-1.${ticker.close}--tradeStatus:${this.tradeStatus}--position: ${JSON.stringify(this.position)}`)

    // strategy start
    const { entryPrice, positionAmount, leverage, initialMargin } = this.position
    if (initialMargin) {
      if (this.tradeStatus === opening || (this.tradeStatus === pending && initialMargin !== 0)) {
        const { close: currentPrice } = ticker
        const { profitPercent, lossPercent } = this.params

        // 浮动盈亏: profit =（当天结算价－开仓价格）×持仓量×合约单位－手续费
        const profit = (currentPrice - entryPrice) * positionAmount * leverage
        const profitRate = parseFloat(((profit / initialMargin) * 100).toFixed(2))
        if (profitRate > 0) {
          if (profitRate > profitPercent) {
            this.logger.info(`当前:${profitRate}%,达到${profitPercent}%止盈线,开始止盈...`)
            this.tradeStatus = stoped
            await this.closePosition()
          } else {
            this.logger.info(`当前:${profitRate}%,未达到${profitPercent}%止盈线,running`)
          }
        } else {
          if (!lossPercent) {
            this.logger.info(`当前:${profitRate}%,该策略未设置止损线,running`)
          } else {
            if (profitRate < 0 - lossPercent) {
              this.logger.info(`当前:${profitRate}%,达到-${lossPercent}%止损线,开始止损...`)
              this.tradeStatus = stoped
              await this.closePosition()
            } else {
              this.logger.info(`当前:${profitRate}%,未达到-${lossPercent}%止损线,running`)
            }
          }
        }
      }
    }
    // strategy end

    if (this.tradeStatus === unSubmited) {
      this.tradeStatus = pending
      this.firstTicker = ticker
      this.price = this.firstTicker.close

      this.logger.info(`2-3.No order,init orders,price: ${this.price}`)
      await this.initOrders()
    }

    this.locking = false
    this.logger.info('=====line=======')
  }

  async onStop() {
    this.logger.info('5.onStop........')
    // await this.closePosition()
    await this.cancelFuturesOrders()
  }

  // custom method
  async initOrders() {
    const promises = []
    const { purchasePrice, direction, cash, leverage } = this.params
    this.logger.info(`5.initOrders:${JSON.stringify(this.params)}`)

    if (direction === 'long')
      promises.push(
        this.long({
          quantity: (cash * leverage) / purchasePrice,
          price: purchasePrice,
        }),
      )

    if (direction === 'short')
      promises.push(
        this.short({
          quantity: (cash * leverage) / purchasePrice,
          price: purchasePrice,
        }),
      )

    const res = await Promise.all(promises)
    if (res.length) {
      this.tradeStatus = opening
    } else {
      this.tradeStatus = fail
    }
    this.logger.info('isSuccess:', JSON.stringify(res))
  }
}
