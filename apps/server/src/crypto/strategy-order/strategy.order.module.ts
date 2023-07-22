import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from 'src/user/auth.guard'
import { StrategyOrderController } from './strategy.order.controller'
import { StrategyOrderService } from './strategy.order.service'

@Module({
  controllers: [StrategyOrderController],
  providers: [
    StrategyOrderService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [StrategyOrderService],
})
export class StrategyOrderModule {}
