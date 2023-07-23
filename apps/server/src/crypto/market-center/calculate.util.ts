import { plus, times } from 'src/common/utils/boter-math'
import { alCoin, stableCoins } from './accountInfo.util'
import { NewAssetBalance } from './market.center.type'

/** 计算总价值和单个币种的价值 */
export function calculateValue(
  balances: NewAssetBalance[],
  symbolsPriceMap: Map<string, string>,
): { total: number; alCoinVal: number; otherCoinVal: number } {
  let total = 0
  let alCoinVal = 0
  let otherCoinVal = 0
  balances.forEach((balance, index) => {
    const { free: freeStr, asset, locked } = balance

    const exchange = asset + 'USDT'
    const free = Number(freeStr)
    if (!stableCoins.includes(asset)) {
      const lockedNums = Number(locked)
      // 这里注意，symbolsPriceMap.get(exchange) 找不到 对应的key,下面逻辑就会报错,所以这里排除price为 NaN 容错
      const price = Number(symbolsPriceMap.get(exchange))
      if (price) {
        const coins = plus(free, lockedNums)
        // 持仓总价值
        const quoteQty = times(coins, price)
        total = plus(total, quoteQty)
        balances[index].quoteQty = quoteQty
        if (alCoin.includes(asset)) {
          // ${asset}添加入alCoin
          // alCoinVal = alCoinVal + quoteQty
          alCoinVal = plus(alCoinVal, quoteQty)
        } else {
          // ${asset}添加入otherCoin
          // otherCoinVal = otherCoinVal + quoteQty
          otherCoinVal = plus(otherCoinVal, quoteQty)
        }
      }
    } else {
      // free包括活期的理财稳定币+现货，但是不包括挖矿锁仓/定期的币
      total = plus(total, free)
      alCoinVal = plus(alCoinVal, free)
      balances[index].quoteQty = free
    }
  })

  return { total, alCoinVal, otherCoinVal }
}
