import { Body, Controller, Get, Post } from '@nestjs/common';
import { Result } from 'src/common/result.interface';
import { SearchParmas, SyncSpotOrderParams } from 'src/common/types';
import { SpotOrder } from 'src/entity/spot-order.entity';
import { SpotService } from './spot.service';

@Controller('spot')
export class SpotController {

  constructor(
    private readonly SpotService: SpotService,
  ) { }

  @Post('orders')
  async getSpotOrder(@Body() searchParmas: SearchParmas): Promise<Result> {
    return await this.SpotService.getSpotOrder(searchParmas);
  }

  @Post('syncOrder')
  async syncSpotOrder(@Body() spotOrderParams: SyncSpotOrderParams): Promise<Result> {
    return await this.SpotService.syncSpotOrder(spotOrderParams);
  }

  @Post('resetOrderStatus')
  async resetSpotOrderStatus(@Body() spotOrder: SpotOrder): Promise<Result> {
    return await this.SpotService.resetSpotOrderStatus(spotOrder);
  }

  @Get('spotOpenOrders')
  async getSpotOpenOrders(): Promise<Result> {
    return await this.SpotService.getSpotOpenOrders();
  }

  @Get('spotAllOrders')
  async getSpotAllOrders(): Promise<Result> {
    return await this.SpotService.getSpotAllOrders();
  }
}
