import { Module } from '@nestjs/common'
import { StrategyOrderController } from './strategy.order.controller'
import { StrategyOrderService } from './strategy.order.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StrategyOrder } from '../entity/strategy-order.entity'
import { StrategyOrderId } from '../entity/strategy-orderid.entity'
import { SpotOrder } from '../entity/spot-order.entity'
import { TraderApi } from '../entity/api.entity'
import { DailyProfit } from '../entity/daily.profit.entity'
import { ProfitStatistics } from '../entity/profit.statistics.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StrategyOrder,
      StrategyOrderId,
      SpotOrder,
      TraderApi,
      DailyProfit,
      ProfitStatistics,
    ]),
  ],
  controllers: [StrategyOrderController],
  providers: [StrategyOrderService],
  exports: [StrategyOrderService],
})
export class StrategyOrderModule {}
