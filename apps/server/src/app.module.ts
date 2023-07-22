import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CodeEngineModule } from './code-engine/code-engine.module'
import { dbConfig } from '../config/db'
import { UserModule } from './user/user.module'

import { MarketCenterModule } from './crypto/market-center/market.center.module'
import { SpotModule } from './crypto/spot/spot.module'
import { FutureModule } from './crypto/future/future.module'
import { StrategyOrderModule } from './crypto/strategy-order/strategy.order.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    CodeEngineModule,
    UserModule,
    MarketCenterModule,
    SpotModule,
    FutureModule,
    StrategyOrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
