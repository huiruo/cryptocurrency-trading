import { FutureOrder } from '../entity/future-order.entity'
import { SpotOrder } from '../entity/spot-order.entity'
import {
  CalculateStrategiesOrderType,
  OrderType,
  StrategyProfit,
} from './strategy.order.type'

export function getStrategySide(
  order: SpotOrder | FutureOrder,
  orderType: OrderType,
): number {
  // side: orderType === 'spot' ? isBuyer : (side === 'SELL' ? 0 : 1),
  if (orderType === 'future') {
    const { side } = order as FutureOrder

    return side === 'SELL' ? 0 : 1
  }

  const { isBuyer } = order as SpotOrder
  return isBuyer
}

export function calculateStrategiesOrder(
  orders: SpotOrder[] | FutureOrder[],
  targetSymbol: string,
  orderType: OrderType,
): CalculateStrategiesOrderType {
  let qtyTotal = 0
  let quoteQtyTotal = 0
  let isTheSameSymbol = true

  if (orderType === 'spot') {
    ;(orders as SpotOrder[]).forEach((item) => {
      const { qty, quoteQty, symbol, isBuyer } = item
      if (targetSymbol !== symbol) {
        isTheSameSymbol = false
      }

      if (isBuyer) {
        qtyTotal = Number(qty) + qtyTotal
        quoteQtyTotal = Number(quoteQty) + quoteQtyTotal
      } else {
        qtyTotal = qtyTotal - Number(qty)
        quoteQtyTotal = quoteQtyTotal - Number(quoteQty)
      }
    })
  } else if (orderType === 'future') {
    ;(orders as FutureOrder[]).forEach((item) => {
      const { origQty: qty, cumQuote: quoteQty, symbol } = item
      if (targetSymbol !== symbol) {
        isTheSameSymbol = false
      }

      // TODO: future is calculated in a variety of ways
      // if (isBuyer) {
      qtyTotal = Number(qty) + qtyTotal
      quoteQtyTotal = Number(quoteQty) + quoteQtyTotal
      // } else {
      //   qtyTotal = qtyTotal - Number(qty)
      //   quoteQtyTotal = quoteQtyTotal - Number(quoteQty)
      // }
    })
  }

  return {
    qty: qtyTotal.toString(),
    quoteQty: quoteQtyTotal.toString(),
    entryPrice: (quoteQtyTotal / qtyTotal).toFixed(8),
    isTheSameSymbol,
  }
}

export function calculateStrategyProfit(
  price: string,
  entryPrice: string,
  qty: string,
  quoteQty: string,
  userId: number,
  realizedFree: number,
  isUpdate = false,
  spotFree: number,
): StrategyProfit {
  const currentPrice = Number(price)
  const costPriceInt = Number(entryPrice)
  const qtyInt = Number(qty)
  const quoteQtyInt = Number(quoteQty)

  let free = 0
  let netProfit = 0
  let netProfitRate = ''
  // profit =（当天结算价－开仓价格）×持仓量×合约单位－手续费
  if (!isUpdate) {
    free = quoteQtyInt * spotFree + realizedFree
  }

  const profit = (currentPrice - costPriceInt) * qtyInt

  if (!isUpdate) {
    netProfit = profit - free
    netProfitRate =
      parseFloat(((netProfit / quoteQtyInt) * 100).toFixed(2)) + '%'
  }
  const profitRate = parseFloat(((profit / quoteQtyInt) * 100).toFixed(2)) + '%'

  /*
  console.log('alculateStrategyProfit 1:', realizedFree);
  console.log('alculateStrategyProfit 3:', profit, '-', profitRate);
  console.log('alculateStrategyProfit 4:', netProfit, '-', netProfitRate);
  */

  return {
    profit,
    profitRate,
    free,
    netProfit,
    netProfitRate,
  }
}
