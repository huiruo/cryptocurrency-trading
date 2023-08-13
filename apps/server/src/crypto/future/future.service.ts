import { Injectable } from '@nestjs/common'
import { BinanceService } from '../common/binance-service'
import { FutureOrder } from '../entity/future-order.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { GetFutureOrderParams, SyncFutureOrderParams } from './future.type'
import { PaginationResType, Result, ResultWithData } from 'src/types'
import { fail, success } from 'src/common/constant'
import { get, isEmpty } from 'lodash'

@Injectable()
export class FutureService {
  private client: BinanceService

  constructor(
    @InjectRepository(FutureOrder)
    private readonly futureOrderRepo: Repository<FutureOrder>,
  ) {
    this.initBinanceApi()
  }

  initBinanceApi(): void {
    this.client = BinanceService.getInstance()
  }

  async syncFutureOrder(
    syncFutureOrderParams: SyncFutureOrderParams,
  ): Promise<Result> {
    try {
      const { symbol, startTime, endTime } = syncFutureOrderParams
      const data = await BinanceService.getInstance().getFutureTrades({
        symbol,
        startTime,
        endTime,
      })

      console.log(
        'syncFutureOrderParams:',
        syncFutureOrderParams,
        'info:',
        data,
      )

      // TODO: userId
      const userId = 1
      for (const item of data) {
        const { orderId } = item
        const existFutureOrder = await this.findFutureOrderUtil(orderId)
        if (isEmpty(existFutureOrder)) {
          console.log('=== not exist futureOrder,insert... ===')
          await this.savaFutureOrderUtil(item as unknown as FutureOrder, userId)
        } else {
          console.log('=== exist futureOrder,skip... ===')
        }
      }

      return {
        code: success,
        msg: `Sync successful,You have ${data.length} ${symbol} orders on this day`,
      }
    } catch (error) {
      console.log('syncFutureOrder error:', error)
      return { code: fail, msg: error.sqlMessage || 'syncFutureOrder error' }
    }
  }

  async getFutureOrders(
    getFutureOrderParams: GetFutureOrderParams,
  ): Promise<ResultWithData<PaginationResType<FutureOrder>>> {
    const { currentPage, pageSize, symbol } = getFutureOrderParams
    let sql = ''
    let pageSql = ''
    if (symbol) {
      sql = `select * from future_order where symbol ="${symbol}" order by time desc limit ${
        (currentPage - 1) * pageSize
      },${pageSize}`
      pageSql = `select count(1) as total from future_order where symbol ="${symbol}"`
    } else {
      pageSql = 'select count(1) as total from future_order;'
      sql = `select * from future_order order by time desc limit ${
        (currentPage - 1) * pageSize
      },${pageSize}`
    }

    const res = await this.futureOrderRepo.query(sql)
    const pageRes = await this.futureOrderRepo.query(pageSql)

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

  private async findFutureOrderUtil(orderId: number): Promise<FutureOrder> {
    const sql = `select symbol,orderId from future_order where orderId='${orderId}'`
    const futureOrder = await this.futureOrderRepo.query(sql)
    return get(futureOrder, '[0]', {})
  }

  private async savaFutureOrderUtil(
    futureOrder: FutureOrder,
    userId: number,
  ): Promise<void> {
    futureOrder.userId = userId
    const reduceOnly = futureOrder.reduceOnly ? 1 : 0
    const closePosition = futureOrder.closePosition ? 1 : 0
    const priceProtect = futureOrder.priceProtect ? 1 : 0
    await this.futureOrderRepo.save({
      ...futureOrder,
      reduceOnly,
      closePosition,
      priceProtect,
    })
  }
}
