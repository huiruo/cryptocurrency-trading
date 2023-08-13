import { Body, Controller, Post } from '@nestjs/common'
import { FutureService } from './future.service'
import { Result } from 'src/types'
import { GetFutureOrderParams, SyncFutureOrderParams } from './future.type'

@Controller('future')
export class FutureController {
  constructor(private readonly futureService: FutureService) {}

  @Post('syncOrder')
  async syncOrder(@Body() options: SyncFutureOrderParams): Promise<Result> {
    return await this.futureService.syncFutureOrder(options)
  }

  @Post('orders')
  async getFutureOrder(@Body() options: GetFutureOrderParams): Promise<Result> {
    return await this.futureService.getFutureOrders(options)
  }
}
