import { Module } from '@nestjs/common'
import { MarketCenterController } from './market.center.controller'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from 'src/user/auth.guard'
import { MarketCenterService } from './market.center.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TradeAsset } from '../entity/asset.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TradeAsset])],
  controllers: [MarketCenterController],
  providers: [
    MarketCenterService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [MarketCenterService],
})
export class MarketCenterModule {}
