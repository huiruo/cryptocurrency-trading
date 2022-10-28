import { Body, Controller, Post } from '@nestjs/common';
import { Result } from 'src/common/result.interface';
import { FiterStrategyOrderType, MergeSpotStrategyParams } from 'src/common/types';
import { SpotOrder } from 'src/entity/spot-order.entity';
import { StrategyOrder } from 'src/entity/strategy-order.entity';
import { StrategyOrderService } from './strategy-order.service';

@Controller('strategy/order')
export class StrategyOrderController {

  constructor(
    private readonly StrategyOrderService: StrategyOrderService,
  ) { }

  @Post('createSpot')
  async createSpotStrategy(@Body() spotOrder: SpotOrder[]): Promise<Result> {
    return await this.StrategyOrderService.createSpotStrategy(spotOrder);
  }

  @Post('getOrder')
  async getStrategiesOrder(
    @Body() fiterStrategyOrder: FiterStrategyOrderType,
  ): Promise<Result> {
    return await this.StrategyOrderService.getStrategiesOrder(fiterStrategyOrder);
  }

  @Post('mergeSpot')
  async mergeSpotStrategy(
    @Body() params: MergeSpotStrategyParams,
  ): Promise<Result> {
    const { spotOrders, strategyOrder } = params;

    return await this.StrategyOrderService.mergeSpotStrategy(
      spotOrders,
      strategyOrder,
    );
  }

  @Post('closeSpot')
  async closeSpotStrategy(
    @Body() params: MergeSpotStrategyParams,
  ): Promise<Result> {
    const { spotOrders, strategyOrder } = params;

    return await this.StrategyOrderService.closeSpotStrategy(
      spotOrders,
      strategyOrder,
    );
  }

  @Post('syncPrice')
  async syncAllStrategiesPrice(
    @Body() params: StrategyOrder[],
  ): Promise<any> {
    return await this.StrategyOrderService.syncAllStrategiesPrice(params);
  }

  @Post('syncAmount')
  async syncAmount(@Body() params: any): Promise<any> {
    return await this.StrategyOrderService.syncAmount();
  }
}
