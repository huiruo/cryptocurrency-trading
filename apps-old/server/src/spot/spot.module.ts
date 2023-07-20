import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TraderApi } from 'src/entity/api.entity';
import { TradeAsset } from 'src/entity/asset.entity';
import { DailyProfit } from 'src/entity/daily.profit.entity';
import { SpotOrder } from 'src/entity/spot-order.entity';
import { StrategyOrder } from 'src/entity/strategy-order.entity';
import { StrategyOrderId } from 'src/entity/strategy-orderid.entity';
import { SpotController } from './spot.controller';
import { SpotService } from './spot.service';

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      // FuturesOrder,
      SpotOrder,
      StrategyOrder,
      StrategyOrderId,
      TradeAsset,
      TraderApi,
      DailyProfit
    ])],
  controllers: [SpotController],
  providers: [SpotService],
})

export class SpotModule { }
