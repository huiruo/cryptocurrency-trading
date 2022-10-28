import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TraderApi } from 'src/entity/api.entity';
import { TradeAsset } from 'src/entity/asset.entity';
import { DailyProfit } from 'src/entity/daily.profit.entity';
import { FuturesOrder } from 'src/entity/futures-order.entity';
import { SpotOrder } from 'src/entity/spot-order.entity';
import { StrategyOrder } from 'src/entity/strategy-order.entity';
import { StrategyOrderId } from 'src/entity/strategy-orderid.entity';
import { StrategyOrderController } from './strategy-order.controller';
import { StrategyOrderService } from './strategy-order.service';

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      FuturesOrder,
      SpotOrder,
      StrategyOrder,
      StrategyOrderId,
      TradeAsset,
      TraderApi,
      DailyProfit
    ])],
  controllers: [StrategyOrderController],
  providers: [StrategyOrderService],
})

export class StrategyOrderModule { }
