import { Body, Controller, Post } from '@nestjs/common'
import { FutureService } from './future.service'
import { Result } from 'src/types'
import { GetFutureOrderParams, SyncFutureOrderParams } from './future.type'

@Controller('future')
export class FutureController {
  constructor(private readonly futureService: FutureService) {}

  @Post('syncOrder')
  async syncSpotOrder(
    @Body() spotOrderParams: SyncFutureOrderParams,
  ): Promise<Result> {
    return await this.futureService.syncFutureOrder(spotOrderParams)
  }

  @Post('orders')
  async getSpotOrder(
    @Body() getSpotOrderParams: GetFutureOrderParams,
  ): Promise<Result> {
    return await this.futureService.getFutureOrders(getSpotOrderParams)
  }
}
