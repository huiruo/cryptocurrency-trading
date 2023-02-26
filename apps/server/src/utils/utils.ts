import { plus, minus, times, divide } from 'src/common/boter-math'

interface myTradeProfit {
  profit: number;
  profitRate: string;
  // free: number
}

export function formatTimestamp(timestamp: number, isAccurateToSecond = true) {
  const date = new Date(timestamp);
  const y = date.getFullYear();
  const M = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const dateStr = y + '-' + addZero(M) + '-' + addZero(d)
  if (isAccurateToSecond) {
    return dateStr + ' ' + addZero(h) + ':' + addZero(m) + ':' + addZero(s);
  } else {
    return dateStr
  }
}

function addZero(m: number) {
  return m < 10 ? '0' + m : m;
}

export function calculateSpotCostPrice(qty: number, quoteQty: number, qtyLoop: number, quoteQtyLoop: number, isBuyer: boolean | number): { qtyCal: number; quoteQtyCal: number; } {
  // 补仓成本= 持仓成本+（补仓买入金额+手续费）/补仓数量
  if (isBuyer) {
    qtyLoop = plus(qtyLoop, qty)
    quoteQtyLoop = plus(quoteQtyLoop, quoteQty)
    console.log('A.情况2-是合并订单买入', qty, qtyLoop, '--', quoteQty, quoteQtyLoop)
  } else {
    qtyLoop = minus(qtyLoop, qty)
    quoteQtyLoop = minus(quoteQtyLoop, quoteQty)
    console.log('A.情况2-是合并订单卖出', qty, qtyLoop, '--', quoteQty, quoteQtyLoop)
  }
  return {
    qtyCal: qtyLoop,
    quoteQtyCal: quoteQtyLoop,
  }
}

export function calculateMyTradeProfit(
  qty: number,
  quoteQty: number,
  costPrice: number,
  totalFree: number,
  price: number,
): myTradeProfit {
  // profit =（当天结算价－开仓价格）×持仓量×合约单位－手续费
  const profit = minus(times(minus(price, costPrice), qty), totalFree)
  const profitRate = times(divide(profit, quoteQty), 100).toFixed(2) + '%'

  return {
    profit: Number(profit.toFixed(2)),
    profitRate,
  };
}