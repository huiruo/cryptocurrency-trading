import { Injectable } from '@nestjs/common'
import { Account } from 'binance-api-node'
import { success } from 'src/common/constant'
import { ResultWithData } from 'src/types'
import { BinanceService } from '../common/binance-service'
import { NewAssetBalance, StatisticsAccountRes } from './market.center.type'
import { generateRequestPriceArray } from './accountInfo.util'
import { divide } from 'src/common/utils/boter-math'
import { services } from 'src/common/utils/axios-request'
import { calculateValue } from './calculate.util'

@Injectable()
export class MarketCenterService {
  private client: BinanceService

  constructor() {
    this.initBinanceApi()
  }

  initBinanceApi(): void {
    this.client = BinanceService.getInstance()
  }

  async syncBalances(): Promise<ResultWithData<Account>> {
    try {
      console.log('syncBalances-->')
      const account = await this.getAccountInfo()

      if (!account) return { code: 500, msg: 'sync balances error', data: null }

      return { code: success, msg: 'sync balances successful', data: account }
    } catch (error) {
      console.log('error:', error)
      return { code: 500, msg: 'sync balances error', data: null }
    }
  }

  async statisticsAccount(): Promise<ResultWithData<StatisticsAccountRes>> {
    try {
      const account = await this.getAccountInfo()

      if (!account) return { code: 500, msg: 'sync balances error', data: null }

      const balances = account.balances as NewAssetBalance[]
      const { balancesExchangeUsdt, earnsOrExclude } =
        generateRequestPriceArray(balances)

      const balancesTarget = balances.filter(
        (item) => !earnsOrExclude.includes(item.asset),
      )

      // mock test start
      /*
      balancesTarget.push({
        asset: 'IMX',
        free: '504.54000000',
        locked: '0.00000000'
      })
      balancesExchangeUsdt.push('IMXUSDT')
      */
      // mock test end

      const symbols = Array.from(new Set(balancesExchangeUsdt))
      const symbolsPrice = await services.getSymbolsPrice(symbols)
      const symbolsPriceMap = new Map(
        symbolsPrice.map((item: { symbol: string; price: string }) => [
          item.symbol,
          item.price,
        ]),
      ) as Map<string, string>
      // console.log('statisticsAccount-syncBalances', { balancesExchangeUsdt, earnsOrExclude, balancesTarget, symbolsPrice, symbolsPriceMap })

      /**
       * Start analyzing positions
       */
      // const maxOtherCoinRatio = 0.3
      const maxOtherCoinRatio = 0.1
      const { total, alCoinVal, otherCoinVal } = calculateValue(
        balancesTarget,
        symbolsPriceMap,
      )

      const alCoinValRatio = divide(alCoinVal, total)
      const otherCoinValRatio = divide(otherCoinVal, total)

      console.log('earnsOrExclude:', earnsOrExclude)
      console.log(`0.账户总值：${total}U`)
      console.log(
        `1.alCoinValRatio持仓占比${(alCoinValRatio * 100).toFixed(
          4,
        )}%,总值${alCoinVal}U`,
      )
      console.log(
        `2.otherCoinValRatio持仓占比${(otherCoinValRatio * 100).toFixed(
          4,
        )}%,总值${otherCoinVal}U`,
      )
      if (otherCoinValRatio > maxOtherCoinRatio) {
        console.log(
          `A.otherCoin总值${otherCoinVal}U,超过${
            maxOtherCoinRatio * 100
          }%,开始选择清仓`,
        )
      }

      // const maxPositionRatio = 0.3
      const maxPositionRatio = 0.1
      /*
      let orderType = 'LIMIT'
      let orderType = 'MARKET'
      */

      balancesTarget.forEach(async (item) => {
        const { quoteQty, asset, canSellFree, free } = item
        const ratio = divide(quoteQty, total)
        const quantity = Number(canSellFree || free)
        console.log(
          `4-1.${asset}持仓占比${(ratio * 100).toFixed(
            4,
          )}%,总值${quoteQty}U,可出售${quantity}`,
        )
        /*
        if (ratio > maxPositionRatio) {
          const quantity = Number(canSellFree || free)
          console.log(`4-1.账户总价值${total}U，${asset}总值${quoteQty}U,超过${maxPositionRatio * 100}%,开始清仓...可以出售的${asset}资产${quantity}`)
          // const quantity = 0.0000009
          // const quantity = 9001
          // const price = '25000'
          if (orderType === OrderType.LIMIT) {
            await this.sellSpot(asset, quantity, 'LIMIT', price)
          } else if (orderType === OrderType.MARKET) {
            await this.sellSpot(asset, quantity, 'MARKET')
          }
        } 
        */
      })

      /*
      const sql = `TRUNCATE TABLE balances`;
      await this.coninRepo.query(sql);
      //{asset: 'ETH', free: '0.00003934', locked: '0.00000000'}
      balances.forEach(async (item) => {
        // mock userId
        this.createBalancesUtil({ ...item, userId: 1 });
      });
      */

      /*
      const sql = `TRUNCATE TABLE balances`;
      await this.coninRepo.query(sql);
      //{asset: 'ETH', free: '0.00003934', locked: '0.00000000'}
      balances.forEach(async (item) => {
        // mock userId
        this.createBalancesUtil({ ...item, userId: 1 });
      });
      */

      return {
        code: success,
        msg: 'Statistics account successful',
        data: {
          balances: balancesTarget,
          total,
          alCoinVal,
          otherCoinVal,
          alCoinValRatio,
          otherCoinValRatio,
          maxOtherCoinRatio,
          maxPositionRatio,
        },
      }
    } catch (error) {
      console.log('error:', error)
      return { code: 500, msg: 'Statistics account error', data: null }
    }
  }

  private async getAccountInfo(): Promise<Account> {
    const res = await this.client.getAccountInfo()
    if (res.code === success) {
      const balances = res.data.balances.filter(
        (item) => Number(item.free) !== 0,
      )
      return { ...res.data, balances }
    } else {
      return null
    }
  }
}
