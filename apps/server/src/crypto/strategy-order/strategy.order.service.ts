import { Injectable } from '@nestjs/common'
import { BinanceService } from '../common/binance-service'
import { GetStraOrderParams } from './strategy.order.type'
import { PaginationResType, ResultWithData } from 'src/types'
import { StrategyOrder } from '../entity/strategy-order.entity'
import { get } from 'lodash'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { success } from 'src/common/constant'

@Injectable()
export class StrategyOrderService {
  private client: BinanceService

  constructor(
    @InjectRepository(StrategyOrder)
    private readonly strategyOrderRepo: Repository<StrategyOrder>,
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
}
