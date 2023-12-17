import { Module } from '@nestjs/common'
import { MarketCenterController } from './market.center.controller'
import { MarketCenterService } from './market.center.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TradeAsset } from '../entity/asset.entity'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [TypeOrmModule.forFeature([TradeAsset]), ConfigModule],
  controllers: [MarketCenterController],
  providers: [MarketCenterService],
  exports: [MarketCenterService],
})
export class MarketCenterModule {}
