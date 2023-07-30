import { Body, Controller, Post } from '@nestjs/common'
import { Result } from 'src/types'
import { StrategyOrderService } from './strategy.order.service'
import {
  StgOrderParams,
  ResetStg,
  SpotStgOperation,
  SyncStgPriceType,
} from './strategy.order.type'
import { SpotOrder } from '../entity/spot-order.entity'

@Controller('stg')
export class StrategyOrderController {
  constructor(private readonly strategyOrderService: StrategyOrderService) {}

  @Post('order')
  async getStgOrder(@Body() stgOrderParams: StgOrderParams): Promise<Result> {
    return await this.strategyOrderService.getStgOrder(stgOrderParams)
  }

  @Post('createSpotStg')
  async createSpotStra(@Body() spotOrders: SpotOrder[]): Promise<Result> {
    return await this.strategyOrderService.createSpotStg(spotOrders)
  }

  @Post('reset')
  async resetStg(@Body() resetStg: ResetStg): Promise<Result> {
    return await this.strategyOrderService.resetStg(resetStg)
  }

  @Post('close')
  async closeStg(@Body() spotStgOperation: SpotStgOperation): Promise<Result> {
    return await this.strategyOrderService.closeStg(spotStgOperation)
  }

  @Post('syncPrice')
  async syncStgPrice(@Body() stgOrders: SyncStgPriceType[]): Promise<Result> {
    return await this.strategyOrderService.syncStgPrice(stgOrders)
  }
}
