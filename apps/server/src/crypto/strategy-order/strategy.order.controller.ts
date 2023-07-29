import { Body, Controller, Post } from '@nestjs/common'
import { Result } from 'src/types'
import { StrategyOrderService } from './strategy.order.service'
import { GetStraOrderParams } from './strategy.order.type'
import { SpotOrder } from '../entity/spot-order.entity'

@Controller('strategy')
export class StrategyOrderController {
  constructor(private readonly strategyOrderService: StrategyOrderService) {}

  @Post('straOrder')
  async getStraOrder(
    @Body() getStraOrderParams: GetStraOrderParams,
  ): Promise<Result> {
    return await this.strategyOrderService.getStraOrder(getStraOrderParams)
  }

  @Post('createSpotStra')
  async createSpotStra(@Body() spotOrders: SpotOrder[]): Promise<Result> {
    return await this.strategyOrderService.createSpotStra(spotOrders)
  }
}
