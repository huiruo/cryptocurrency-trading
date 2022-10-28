import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TraderApi } from 'src/entity/api.entity';
import { TradeAsset } from 'src/entity/asset.entity';
import { DailyProfit } from 'src/entity/daily.profit.entity';
import { SpotOrder } from 'src/entity/spot-order.entity';
import { StrategiesOrder } from 'src/entity/strategies-order.entity';
import { StrategyOrderId } from 'src/entity/strategy-orderid.entity';
import { StrategyOrderController } from './strategy-order.controller';
import { StrategyOrderService } from './strategy-order.service';

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      // FuturesOrder,
      SpotOrder,
      StrategiesOrder,
      StrategyOrderId,
      TradeAsset,
      TraderApi,
      DailyProfit
    ])],
  controllers: [StrategyOrderController],
  providers: [StrategyOrderService],
})
export class StrategyOrderModule { }

