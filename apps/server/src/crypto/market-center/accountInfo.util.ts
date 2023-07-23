import { plus } from 'src/common/utils/boter-math'
import { NewAssetBalance } from './market.center.type'

export const stableCoins = ['USDT', 'BUSD', 'USDC']
export const alCoin = ['BTC', 'ETH', 'BNB']
// non-existent/expired tokens
const excludeSymbol = ['ETHW']

export function generateRequestPriceArray(balances: NewAssetBalance[]): {
  earnsOrExclude: string[]
  balancesExchangeUsdt: string[]
} {
  const earnsOrExclude: string[] = []
  const balancesExchangeUsdt: string[] = []
  balances.forEach((_, index) => {
    const asset = handleFlexibleEarnAndlocked(index, balances, earnsOrExclude)
    // Request the price array to exclude stable coins and expired tokens, otherwise the interface will report an error
    // 请求price数组排除稳定币和过期代币,否则接口报错
    if (!stableCoins.includes(asset) && !excludeSymbol.includes(asset)) {
      const exchange = `${asset}USDT`
      balancesExchangeUsdt.push(exchange)
    }
  })

  return {
    earnsOrExclude,
    balancesExchangeUsdt,
  }
}

/**
 * 处理活期理财/挂单locked/过期的代币；生成请求price数组
 * Handle current financial management/pending order locked/expired tokens; generate request price array
 * */
export function handleFlexibleEarnAndlocked(
  index: number,
  balances: NewAssetBalance[],
  earnsOrExclude: string[],
): string {
  const balance = balances[index]
  const { locked: lockedStr, free: freeStr } = balance
  const free = Number(freeStr)
  const locked = Number(lockedStr)
  const { asset, isEarn } = search_LD_earn(balance.asset)
  // 处理不存在/过期的代币
  if (excludeSymbol.includes(asset)) {
    console.log('处理不存在/过期的代币', asset)
    earnsOrExclude.push(asset)

    return asset
  }

  // 处理挂单
  if (locked) {
    const assetIndex = balances.findIndex((item) => {
      return item.asset === asset
    })
    const freeTotal = plus(free, locked).toString()
    balances[assetIndex] = { ...balance, free: freeTotal, canSellFree: freeStr }
  }

  // 处理活期理财
  if (isEarn) {
    const assetIndex = balances.findIndex((item) => {
      return item.asset === asset
    })

    if (assetIndex > -1) {
      // 1.存在现货+活期，移除活期理财，合并入现货
      const {
        free: spotFree,
        asset: spotAsset,
        locked: spotLocked,
      } = balances[assetIndex]
      const freeTotal = plus(free, Number(spotFree)).toString()
      balances[assetIndex] = {
        locked: spotLocked,
        free: freeTotal,
        asset: spotAsset,
        quoteQty: 0,
        canSellFree: spotFree,
      }
      earnsOrExclude.push(balance.asset)
    } else {
      // 2.直接添加活期理财
      balances[index] = {
        locked: lockedStr,
        free: freeStr,
        asset,
        quoteQty: 0,
        canSellFree: '0',
      }
    }
  }

  return asset
}

export function search_LD_earn(asset: string): {
  isEarn: boolean
  asset: string
} {
  const isInclude = asset.search(new RegExp('^LD'))
  if (isInclude !== -1) {
    // 除开和理财名字相似的asset
    if (asset === 'LDO') {
      // 不是是理财,但是LDO
      // console.log('C.不是是理财,但是LDO', asset, '-', isInclude)
      return { isEarn: false, asset }
    } else {
      // 是理财
      return { isEarn: true, asset: asset.substring(2) }
    }
  } else {
    // 不是是理财
    return { isEarn: false, asset }
  }
}
