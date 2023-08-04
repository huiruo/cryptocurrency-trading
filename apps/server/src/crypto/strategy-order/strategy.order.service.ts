import { Injectable } from '@nestjs/common'
import { BinanceService } from '../common/binance-service'
import {
  StgOrderParams,
  ResetStg,
  SpotStgOperation,
  CalculateCloseStrategyOrderType,
  SyncStgPriceType,
  CalculateStrategiesOrderType,
} from './strategy.order.type'
import { PaginationResType, Result, ResultWithData } from 'src/types'
import { StrategyOrder } from '../entity/strategy-order.entity'
import { get, isEmpty } from 'lodash'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { fail, success } from 'src/common/constant'
import { SpotOrder } from '../entity/spot-order.entity'
import { StrategyOrderId } from '../entity/strategy-orderid.entity'
import {
  calculateSpotStrategiesOrder,
  calculateStrategyProfit,
} from './strategy.util'
import { nanoid } from 'nanoid'
import { TraderApi } from '../entity/api.entity'
import { DailyProfit } from '../entity/daily.profit.entity'
import { ProfitStatistics } from '../entity/profit.statistics.entity'
import { formatTimestamp } from 'src/common/utils'

@Injectable()
export class StrategyOrderService {
  private client: BinanceService

  constructor(
    @InjectRepository(StrategyOrder)
    private readonly strategyOrderRepo: Repository<StrategyOrder>,

    @InjectRepository(StrategyOrderId)
    private readonly strategyOrderIdRepo: Repository<StrategyOrderId>,

    @InjectRepository(SpotOrder)
    private readonly spotOrderRepo: Repository<SpotOrder>,

    @InjectRepository(TraderApi)
    private readonly traderApiRepo: Repository<TraderApi>,

    @InjectRepository(DailyProfit)
    private readonly dailyProfitRepo: Repository<DailyProfit>,

    @InjectRepository(ProfitStatistics)
    private readonly profitStatisticsRepo: Repository<ProfitStatistics>,
  ) {
    this.initBinanceApi()
  }

  initBinanceApi(): void {
    this.client = BinanceService.getInstance()
  }

  async getStgOrder(
    stgOrderParams: StgOrderParams,
  ): Promise<ResultWithData<PaginationResType<StrategyOrder>>> {
    const { currentPage, pageSize, symbol, is_running } = stgOrderParams
    console.log('stgOrderParams==>', stgOrderParams)
    let sql = ''
    let pageSql = ''
    if (symbol) {
      if (is_running !== '') {
        sql = `select * from strategy_order where symbol ="${symbol}" and is_running=${is_running}  order by createdAt desc limit ${
          (currentPage - 1) * pageSize
        },${pageSize}`

        pageSql = `select count(1) as total from strategy_order where symbol ="${symbol}" and is_running=${is_running}`
      } else {
        sql = `select * from strategy_order where symbol ="${symbol}" order by createdAt desc limit ${
          (currentPage - 1) * pageSize
        },${pageSize}`

        pageSql = `select count(1) as total from strategy_order where symbol ="${symbol}"`
      }
    } else {
      if (is_running !== 2) {
        sql = `select * from strategy_order where is_running ="${is_running}" order by createdAt desc limit ${
          (currentPage - 1) * pageSize
        },${pageSize}`

        pageSql = `select count(1) as total from strategy_order where is_running ="${is_running}"`
      } else {
        sql = `select * from strategy_order order by createdAt desc limit ${
          (currentPage - 1) * pageSize
        },${pageSize}`

        pageSql = 'select count(1) as total from strategy_order;'
      }
    }

    const res = await this.strategyOrderRepo.query(sql)
    const pageRes = await this.strategyOrderRepo.query(pageSql)

    return {
      code: success,
      msg: 'ok',
      data: {
        total: Number(get(pageRes, '[0].total', 0)),
        data: res,
        currentPage,
        pageSize,
      },
    }
  }

  async resetStg(ResetStg: ResetStg): Promise<Result> {
    try {
      const { strategyId, orderType } = ResetStg
      if (orderType === 'spot') {
        const sql = `update spot_order set strategyId="",strategyStatus = 0  WHERE strategyId = "${strategyId}"`
        await this.spotOrderRepo.query(sql)
      }

      await this.deleteStrategyOrder(strategyId)
      await this.deleteStrategyOrderId(strategyId)

      return {
        code: success,
        msg: 'ok',
      }
    } catch (error) {
      return {
        code: fail,
        msg: error,
      }
    }
  }

  async mergeOrder(spotStgOperation: SpotStgOperation): Promise<Result> {
    try {
      const { spotOrders, stgOrder } = spotStgOperation
      const { userId, strategyId, symbol, time, side } = stgOrder
      /*
      const spotPrice = await this.getSpotPrice(symbol);
      const price = get(spotPrice, `${symbol}`, '');
      if (!price) {
        return { code: 500, message: 'error', data: null };
      }
      */

      const {
        qty,
        quoteQty,
        entryPrice,
        isTheSameSymbol,
        free = 0,
      } = await this.calculateSpotOrderMergeStrategy(spotOrders, stgOrder)
      if (!isTheSameSymbol) {
        return {
          code: 500,
          msg: 'The selected order not the same Symbol',
        }
      }

      const strategiesOrder = {
        symbol,
        price: '',
        side,
        orderType: 1,
        leverage: 1,

        entryPrice,
        sellingPrice: '',
        sellingTime: null,

        qty,
        quoteQty,
        sellingQty: '',
        sellingQuoteQty: '',

        profit: 0,
        profitRate: '',
        realizedProfit: 0,
        realizedProfitRate: '',
        free,

        stopType: 0,
        stopProfit: '',
        stopLoss: '',
        stopProfitPrice: '',
        stopLossPrice: '',

        note: '',
        klineShots: '',

        is_running: true,
        time,
        updatedAt: new Date().getTime(),
        userId,
        strategyId,
      }

      const updateStgOrderRes = await this.updateStgOrderUtil(strategiesOrder)
      if (updateStgOrderRes.code !== success) {
        return updateStgOrderRes
      }

      const running = 1
      spotOrders.forEach((item) => {
        const { id: idUpdate } = item
        this.updateOrderStatus('spot', idUpdate, strategyId, running)
      })

      return {
        code: success,
        msg: 'ok',
      }
    } catch (error) {
      console.log('close error', error)
      return {
        code: fail,
        msg: error.toString(),
      }
    }
  }

  async closeStg(spotStgOperation: SpotStgOperation): Promise<Result> {
    try {
      const { spotOrders, stgOrder } = spotStgOperation
      const ordersLength = spotOrders.length
      const lastOrder = get(
        spotOrders,
        `[${ordersLength - 1}]`,
        {},
      ) as SpotOrder

      const {
        sellingQty,
        sellingQuoteQty,
        sellingPrice,
        realizedProfit,
        realizedProfitRate,
        isTheSameSymbol,
        isTheSameSide,
        free,
      } = await this.calculateSpotOrderCloseStrategy(spotOrders, stgOrder)
      if (!isTheSameSymbol) {
        return {
          code: 500,
          msg: 'The selected order not the same Symbol',
        }
      }

      if (isTheSameSide) {
        return {
          code: 500,
          msg: 'The selected order is not opposite to the strategy',
        }
      }

      const { userId, strategyId, symbol, time } = stgOrder
      const sellingTime = Number(lastOrder.time)
      const strategiesOrder = {
        symbol,
        price: '',
        side: 1,
        orderType: 1,
        leverage: 1,

        entryPrice: '',
        sellingPrice,
        sellingTime,

        qty: null,
        quoteQty: null,
        sellingQty,
        sellingQuoteQty,

        profit: 0,
        profitRate: '',
        realizedProfit,
        realizedProfitRate,
        free,

        stopType: 0,
        stopProfit: '',
        stopLoss: '',
        stopProfitPrice: '',
        stopLossPrice: '',

        note: '',
        klineShots: '',

        is_running: false,
        userId,
        strategyId,
        time,
        updatedAt: new Date().getTime(),
      }

      // update daily profit start
      const calculateRes = await this.calculateAmountByClose(
        sellingTime,
        realizedProfit,
        userId,
      )

      if (calculateRes.code !== success) {
        return { code: 500, msg: calculateRes.msg }
      }
      // update daily profit end

      const res = await this.updateCloseStrategyOrderUtil(strategiesOrder)
      if (calculateRes.code !== success) {
        return { code: 500, msg: res.msg }
      }

      // update order spot order strategyStatus
      const ended = 2
      const sql = `update spot_order set strategyStatus = ${ended} WHERE strategyId = "${strategyId}"`
      await this.spotOrderRepo.query(sql)
      // end

      // update close spot order
      spotOrders.forEach((item) => {
        const { id: idUpdate } = item
        this.updateOrderStatus('spot', idUpdate, strategyId, ended)
      })
      // end

      return {
        code: success,
        msg: 'ok',
      }
    } catch (error) {
      console.log('close error', error)
      return {
        code: fail,
        msg: error.toString(),
      }
    }
  }

  async createSpotStg(spotOrders: SpotOrder[]): Promise<Result> {
    try {
      const firstOrder = spotOrders[0]
      const { orderId, userId, time, symbol, isBuyer } = firstOrder
      const strategyOrderId = await this.findStrategyOrderIdUtil(orderId)
      if (isEmpty(strategyOrderId)) {
        console.log('=== not exist strategy,insert... ===')
        const strategyId = nanoid()

        // get price from server
        const spotPrices = await this.getSpotPrice(symbol)
        const price = get(spotPrices, `${symbol}`, '')

        const { qty, quoteQty, entryPrice, isTheSameSymbol } =
          calculateSpotStrategiesOrder(spotOrders, symbol)
        if (!isTheSameSymbol) {
          return {
            code: 500,
            msg: 'The selected order not the same Symbol',
          }
        }

        const realizedFree = 0
        const spotFree = await this.getUserSpotFree(userId)
        const { profit, profitRate, free } = calculateStrategyProfit(
          price,
          entryPrice,
          qty,
          quoteQty,
          userId,
          realizedFree,
          false,
          Number(spotFree),
        )

        const strategiesOrder = {
          symbol,
          price,
          side: isBuyer,
          orderType: 1,
          leverage: 1,

          entryPrice,
          sellingPrice: '',
          sellingTime: null,

          qty,
          quoteQty,
          sellingQty: '',
          sellingQuoteQty: '',

          profit,
          profitRate,
          realizedProfit: 0,
          realizedProfitRate: '',
          free,

          stopType: 0,
          stopProfit: '',
          stopLoss: '',
          stopProfitPrice: '',
          stopLossPrice: '',

          note: '',
          klineShots: '',

          is_running: true,
          userId: userId,
          strategyId,
          updatedAt: new Date().getTime(),
          time,
        }

        await this.createStrategyOrderIdUtil({ userId, strategyId, orderId })

        await this.createStrategyOrderUtil(strategiesOrder)
        const running = 1
        spotOrders.forEach((item) => {
          const { id: idUpdate } = item
          this.updateOrderStatus('spot', idUpdate, strategyId, running)
        })
      } else {
        console.log('=== exist strategyOrderId,update... ===')
      }

      return {
        code: success,
        msg: 'ok',
      }
    } catch (error) {
      return {
        code: fail,
        msg: error,
      }
    }
  }

  private async findStrategyOrderIdUtil(
    orderId: number,
  ): Promise<StrategyOrderId> {
    const sql = `select strategyId,orderId from strategy_orderid where orderId='${orderId}'`

    return await this.strategyOrderIdRepo.query(sql)
  }

  /**
   * { BTCUSDT: '19376.16000000' }
   */
  async getSpotPrice(symbol: string): Promise<{ [index: string]: string }> {
    return await this.client.prices({ symbol })
  }

  private async createStrategyOrderIdUtil(
    strategyOrderId: StrategyOrderId,
  ): Promise<StrategyOrderId> {
    return await this.strategyOrderIdRepo.save(strategyOrderId)
  }

  private async createStrategyOrderUtil(
    strategyOrder: StrategyOrder,
  ): Promise<StrategyOrder> {
    return await this.strategyOrderRepo.save(strategyOrder)
  }

  private async updateOrderStatus(
    type: string,
    id: number,
    strategyId: string,
    strategyStatus: number,
  ): Promise<Result> {
    try {
      if (type === 'spot') {
        const sql = `update spot_order set strategyId="${strategyId}",strategyStatus = "${strategyStatus}"  WHERE id = "${id}"`
        await this.spotOrderRepo.query(sql)
      }

      // /*
      if (type === 'future') {
        // const sql = `update futures_order set strategyId="${strategyId}",strategyStatus = "${strategyStatus}"  WHERE id = "${id}"`;
        // await this.futuresOrderRepo.query(sql);
      }
      // */

      return { code: success, msg: 'add asset successfully' }
    } catch (error) {
      return { code: fail, msg: 'updateOrderStatus error' }
    }
  }

  async getUserSpotFree(userId: number): Promise<string> {
    const res = await this.traderApiRepo.find({ where: { userId } })
    if (res.length) {
      return res[0].spotFree
    }

    return '0'
  }

  private async deleteStrategyOrder(strategyId: string): Promise<void> {
    const sql = `delete from strategy_order WHERE strategyId = "${strategyId}"`
    await this.strategyOrderIdRepo.query(sql)
  }

  private async deleteStrategyOrderId(strategyId: string): Promise<void> {
    const sql = `delete from strategy_orderid WHERE strategyId = "${strategyId}"`
    await this.strategyOrderIdRepo.query(sql)
  }

  private async calculateSpotOrderCloseStrategy(
    spotOrders: SpotOrder[],
    strategyOrder: StrategyOrder,
  ): Promise<CalculateCloseStrategyOrderType> {
    const {
      symbol,
      side,
      entryPrice,
      userId,
      free: realizedFree,
    } = strategyOrder
    let qtyTotal = 0
    let quoteQtyTotal = 0
    let isTheSameSymbol = true
    const targetSymbol = symbol
    let isTheSameSide = false

    spotOrders.forEach((item) => {
      const { qty, quoteQty, symbol, isBuyer } = item
      if (targetSymbol !== symbol) {
        isTheSameSymbol = false
      }

      if (side === isBuyer) {
        isTheSameSide = true
      }

      qtyTotal = Number(qty) + qtyTotal
      quoteQtyTotal = Number(quoteQty) + quoteQtyTotal
    })

    const sellingPrice = (quoteQtyTotal / qtyTotal).toFixed(8)
    const sellingQty = qtyTotal.toString()
    const sellingQuoteQty = quoteQtyTotal.toString()

    const spotFree = await this.getUserSpotFree(userId)
    const { profit, profitRate, netProfit, netProfitRate, free } =
      calculateStrategyProfit(
        sellingPrice,
        entryPrice,
        sellingQty,
        sellingQuoteQty,
        userId,
        realizedFree,
        false,
        Number(spotFree),
      )

    console.log('calculateSpotOrderCloseStrategy==>', { profit, profitRate })

    return {
      sellingQty,
      sellingQuoteQty,
      sellingPrice,
      realizedProfit: netProfit,
      realizedProfitRate: netProfitRate,
      isTheSameSymbol,
      isTheSameSide,
      free,
      // netProfit,
      // netProfitRate
    }
  }

  private async calculateAmountByClose(
    time: number,
    profit: number,
    userId: number,
  ): Promise<Result> {
    const res = await this.client.getAccountInfo()
    if (res.code !== success) {
      return { code: 500, msg: 'getAccountInfo amount error' }
    }

    const balances = get(res.data, 'balances', [])

    for (let index = 0; index < balances.length; index++) {
      const element = balances[index]
      if (element.asset === 'USDT') {
        const dayStr = formatTimestamp(time, false)
        const timeStr = formatTimestamp(time)
        const tradeCountList = await this.getTradeCountByDay(dayStr, userId)
        const amount = element.free
        if (isEmpty(tradeCountList)) {
          const calAmount = Number(amount) + profit
          const profitRate =
            parseFloat(((profit / calAmount) * 100).toFixed(2)) + '%'
          const tradeCount = {
            userId,
            profit: profit,
            profitRate,
            amount,
            time: timeStr,
          }

          try {
            await this.dailyProfitRepo.save(tradeCount)
            return { code: success, msg: 'Calculate amount succeeded' }
          } catch (error) {
            console.log('error:', error)
            return { code: 500, msg: error.toString() }
          }
        } else {
          const { profit: itemProfit, id } = tradeCountList[0]
          const calProfit = profit + itemProfit
          const calAmount = Number(amount) + calProfit
          console.log(
            'update:',
            profit,
            '-',
            itemProfit,
            '',
            calProfit,
            '-',
            calAmount,
          )
          const profitRate =
            parseFloat(((calProfit / calAmount) * 100).toFixed(2)) + '%'
          const sql = `update daily_profit set profit = ${calProfit},profitRate = '${profitRate}',time='${timeStr}' WHERE id = ${id}`
          try {
            await this.spotOrderRepo.query(sql)
            return { code: success, msg: 'Calculate amount update succeeded' }
          } catch (error) {
            return { code: 500, msg: error.toString() }
          }
        }
        // break
      }
    }

    return { code: 500, msg: 'Incorrectly calculated amount' }
  }

  private async getTradeCountByDay(
    day: string,
    userId: number,
  ): Promise<DailyProfit[]> {
    const sql = `SELECT * FROM daily_profit WHERE userId=${userId} AND DATE_FORMAT(time, '%Y-%m-%d') = '${day}'`
    return await this.dailyProfitRepo.query(sql)
  }

  private async updateCloseStrategyOrderUtil(
    strategiesOrder: StrategyOrder,
  ): Promise<Result> {
    const {
      strategyId,
      is_running,
      sellingQty,
      sellingQuoteQty,
      sellingPrice,
      realizedProfit,
      realizedProfitRate,
      sellingTime,
      free,
      updatedAt,
    } = strategiesOrder

    const sql = `update strategy_order set sellingQty = "${sellingQty}",sellingQuoteQty = "${sellingQuoteQty}",sellingPrice="${sellingPrice}",
    realizedProfit="${realizedProfit}",realizedProfitRate="${realizedProfitRate}",free="${free}",sellingTime="${sellingTime}",is_running=${is_running},updatedAt="${updatedAt}" WHERE strategyId = "${strategyId}"`
    try {
      await this.strategyOrderIdRepo.query(sql)

      return { code: success, msg: 'Calculate amount update succeeded' }
    } catch (error) {
      return { code: 500, msg: 'updateCloseStrategyOrder error' }
    }
  }

  async syncStgPrice(stgOrders: SyncStgPriceType[]): Promise<Result> {
    try {
      console.log('syncStgPrice', stgOrders)
      const updatedAt = new Date().getTime()
      for (let index = 0; index < stgOrders.length; index++) {
        const item = stgOrders[index]

        const { symbol, entryPrice, quoteQty, qty, strategyId, userId } = item
        const spotPrice = await this.getSpotPrice(symbol)

        const price = get(spotPrice, `${symbol}`, '')
        const realizedFree = 0
        if (!price) {
          return { code: 500, msg: 'get symbol price error' }
        }

        const isUpdate = true
        const spotFree = await this.getUserSpotFree(userId)
        const { profit, profitRate } = calculateStrategyProfit(
          price,
          entryPrice,
          qty,
          quoteQty,
          userId,
          realizedFree,
          isUpdate,
          Number(spotFree),
        )

        const sql = `update strategy_order set price = "${price}",profitRate = "${profitRate}",
    profit = "${profit}",updatedAt="${updatedAt}" WHERE strategyId = "${strategyId}"`

        await this.strategyOrderIdRepo.query(sql)
      }

      return { code: success, msg: 'sync strategy price successfully' }
    } catch (error) {
      return {
        code: fail,
        msg: error.sqlMessage || 'sync strategy price failed',
      }
    }
  }

  private async calculateSpotOrderMergeStrategy(
    spotOrders: SpotOrder[],
    strategyOrder: StrategyOrder,
  ): Promise<CalculateStrategiesOrderType> {
    const { symbol, qty, quoteQty, userId, free: realizedFree } = strategyOrder
    let qtyTotal = 0
    let free = 0
    let quoteQtyTotal = 0
    let isTheSameSymbol = true
    const targetSymbol = symbol

    const spotFree = await this.getUserSpotFree(userId)

    spotOrders.forEach((item) => {
      const { qty: qtyItem, quoteQty: quoteQtyItem, symbol, isBuyer } = item
      const qtyItemInt = Number(qtyItem)
      const quoteQtyItemInt = Number(quoteQtyItem)
      if (targetSymbol !== symbol) {
        isTheSameSymbol = false
      }

      free = quoteQtyItemInt * Number(spotFree) + free

      if (isBuyer) {
        qtyTotal = qtyItemInt + qtyTotal
        quoteQtyTotal = quoteQtyItemInt + quoteQtyTotal
      } else {
        qtyTotal = qtyTotal - qtyItemInt
        quoteQtyTotal = quoteQtyTotal - quoteQtyItemInt
      }
    })

    const finalqty = Number(qty) + qtyTotal
    const finalQuoteQty = Number(quoteQty) + quoteQtyTotal
    const finalFree = realizedFree + free
    const entryPrice = (finalQuoteQty / finalqty).toFixed(8)

    return {
      qty: finalqty.toString(),
      quoteQty: finalQuoteQty.toString(),
      entryPrice,
      isTheSameSymbol,
      free: finalFree,
    }
  }

  private async updateStgOrderUtil(
    strategiesOrder: StrategyOrder,
  ): Promise<Result> {
    try {
      const { strategyId, qty, quoteQty, entryPrice, updatedAt, free } =
        strategiesOrder
      const sql = `update strategy_order set qty = "${qty}",free="${free}",quoteQty = "${quoteQty}",entryPrice="${entryPrice}",updatedAt="${updatedAt}" WHERE strategyId = "${strategyId}"`
      await this.strategyOrderRepo.query(sql)
      return { code: success, msg: 'update strategy order succeeded' }
    } catch (error) {
      return { code: fail, msg: 'update strategy order  error' }
    }
  }
}
