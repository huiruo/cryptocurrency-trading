import { Injectable } from '@nestjs/common'
import { BinanceService } from '../common/binance-service'
import { SyncSpotOrderParams, GetSpotOrderParams } from './spot.type'
import { get, isEmpty } from 'lodash'
import { PaginationResType, Result, ResultWithData } from 'src/types'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SpotOrder } from '../entity/spot-order.entity'
import { fail, success } from 'src/common/constant'

@Injectable()
export class SpotService {
  private client: BinanceService

  constructor(
    @InjectRepository(SpotOrder)
    private readonly spotOrderRepo: Repository<SpotOrder>,
  ) {
    this.initBinanceApi()
  }

  initBinanceApi(): void {
    this.client = BinanceService.getInstance()
  }

  async getSpotOrders(
    getSpotOrderParams: GetSpotOrderParams,
  ): Promise<ResultWithData<PaginationResType<SpotOrder>>> {
    const { currentPage, pageSize, symbol } = getSpotOrderParams
    let sql = ''
    let pageSql = ''
    if (symbol) {
      sql = `select * from spot_order where symbol ="${symbol}" order by time desc limit ${
        (currentPage - 1) * pageSize
      },${pageSize}`
      pageSql = `select count(1) as total from spot_order where symbol ="${symbol}"`
    } else {
      pageSql = 'select count(1) as total from spot_order;'
      sql = `select * from spot_order order by time desc limit ${
        (currentPage - 1) * pageSize
      },${pageSize}`
    }

    const res = await this.spotOrderRepo.query(sql)
    const pageRes = await this.spotOrderRepo.query(pageSql)

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

  async syncSpotOrder(spotOrderParams: SyncSpotOrderParams): Promise<Result> {
    try {
      const { symbol, startTime, endTime } = spotOrderParams
      const data = await BinanceService.getInstance().getMyTrades({
        symbol,
        startTime,
        endTime,
      })
      console.log('spotOrderParams:', spotOrderParams, 'info:', data.length)

      // TODO: userId
      const userId = 1
      for (const item of data) {
        const { id } = item
        const existSpotOrder = await this.findSpotOrderUtil(id)
        if (isEmpty(existSpotOrder)) {
          console.log('=== not exist spotOrder,insert... ===')
          await this.savaSpotOrderUtil(item as unknown as SpotOrder, userId)
        } else {
          console.log('=== exist spotOrder,skip... ===')
        }
      }

      return {
        code: success,
        msg: `Sync successful,You have ${data.length} ${symbol} orders on this day 
     `,
      }
    } catch (error) {
      return { code: fail, msg: error.toString() || 'syncSpotOrder error' }
    }
  }

  private async findSpotOrderUtil(id: number): Promise<SpotOrder> {
    const sql = `select symbol,orderId from spot_order where id='${id}'`
    const futureOrder = await this.spotOrderRepo.query(sql)
    return get(futureOrder, '[0]', {})
  }

  private async savaSpotOrderUtil(
    spotOrder: SpotOrder,
    userId: number,
  ): Promise<void> {
    spotOrder.userId = userId
    const isBuyer = spotOrder.isBuyer ? 1 : 0
    const isMaker = spotOrder.isBuyer ? 1 : 0
    const isBestMatch = spotOrder.isBuyer ? 1 : 0
    await this.spotOrderRepo.save({
      ...spotOrder,
      isBuyer,
      isMaker,
      isBestMatch,
    })
  }
}
