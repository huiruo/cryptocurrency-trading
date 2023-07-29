import { Module } from '@nestjs/common'
import { MarketCenterController } from './market.center.controller'
import { MarketCenterService } from './market.center.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TradeAsset } from '../entity/asset.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TradeAsset])],
  controllers: [MarketCenterController],
  providers: [MarketCenterService],
  exports: [MarketCenterService],
})
export class MarketCenterModule {}
