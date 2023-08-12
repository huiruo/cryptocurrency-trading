import { Injectable } from '@nestjs/common'
import { BinanceService } from '../common/binance-service'
import { FutureOrder } from '../entity/future-order.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { GetFutureOrderParams, SyncFutureOrderParams } from './future.type'
import { PaginationResType, Result, ResultWithData } from 'src/types'
import { fail, success } from 'src/common/constant'
import { get } from 'lodash'

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
      console.log('syncFutureOrder options:', syncFutureOrderParams)
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

      return {
        code: success,
        msg: 'test Ok',
      }

      // TODO: userId
      /*
      const userId = 1
      for (const item of data) {
        const { id } = item
        const existFutureOrder = await this.findFutureOrderUtil(id)
        if (isEmpty(existFutureOrder)) {
          console.log('=== not exist spotOrder,insert... ===')
          await this.savaFutureOrderUtil(item as unknown as FutureOrder, userId)
        } else {
          console.log('=== exist spotOrder,skip... ===')
        }
      }

      return {
        code: success,
        // msg: `Sync successful,You have ${data.length} ${symbol} orders on this day`,
        msg: 'ok',
      }
      */
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

  private async findFutureOrderUtil(id: number): Promise<FutureOrder> {
    const sql = `select symbol,orderId from future_order where id='${id}'`
    const futureOrder = await this.futureOrderRepo.query(sql)
    return get(futureOrder, '[0]', {})
  }

  private async savaFutureOrderUtil(
    spotOrder: FutureOrder,
    userId: number,
  ): Promise<void> {
    spotOrder.userId = userId
    const isBuyer = spotOrder.isBuyer ? 1 : 0
    const isMaker = spotOrder.isBuyer ? 1 : 0
    const isBestMatch = spotOrder.isBuyer ? 1 : 0
    await this.futureOrderRepo.save({
      ...spotOrder,
      isBuyer,
      isMaker,
      isBestMatch,
    })
  }
}
