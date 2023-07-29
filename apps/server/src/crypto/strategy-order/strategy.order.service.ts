import { Injectable } from '@nestjs/common'
import { BinanceService } from '../common/binance-service'
import { GetStraOrderParams, ResetStra } from './strategy.order.type'
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
  ) {
    this.initBinanceApi()
  }

  initBinanceApi(): void {
    this.client = BinanceService.getInstance()
  }

  async getStraOrder(
    getStraOrderParams: GetStraOrderParams,
  ): Promise<ResultWithData<PaginationResType<StrategyOrder>>> {
    console.log('', getStraOrderParams)

    const { currentPage, pageSize, symbol, is_running } = getStraOrderParams
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
      if (is_running !== 3) {
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
      },
    }
  }

  async resetStra(resetStra: ResetStra): Promise<Result> {
    try {
      const { strategyId, orderType } = resetStra
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

  async createSpotStra(spotOrders: SpotOrder[]): Promise<Result> {
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
        const { profit, profitRate, free } = await calculateStrategyProfit(
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
}
