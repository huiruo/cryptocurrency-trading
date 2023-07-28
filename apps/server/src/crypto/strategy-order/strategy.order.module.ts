import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from 'src/user/auth.guard'
import { StrategyOrderController } from './strategy.order.controller'
import { StrategyOrderService } from './strategy.order.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StrategyOrder } from '../entity/strategy-order.entity'

@Module({
  imports: [TypeOrmModule.forFeature([StrategyOrder])],
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
