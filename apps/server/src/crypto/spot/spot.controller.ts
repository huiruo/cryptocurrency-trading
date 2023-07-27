import { Body, Controller, Post } from '@nestjs/common'
import { GetSpotOrderParams, SyncSpotOrderParams } from './spot.type'
import { SpotService } from './spot.service'
import { Result } from 'src/types'

@Controller('spot')
export class SpotController {
  constructor(private readonly spotService: SpotService) {}

  @Post('syncOrder')
  async syncSpotOrder(
    @Body() spotOrderParams: SyncSpotOrderParams,
  ): Promise<Result> {
    return await this.spotService.syncSpotOrder(spotOrderParams)
  }

  @Post('orders')
  async getSpotOrder(
    @Body() getSpotOrderParams: GetSpotOrderParams,
  ): Promise<Result> {
    return await this.spotService.getSpotOrders(getSpotOrderParams)
  }
}
