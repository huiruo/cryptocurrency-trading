import { Module } from '@nestjs/common';
import { MarketCenterController } from './market-center.controller';
import { MarketCenterService } from './market-center.service';

@Module({
  controllers: [MarketCenterController],
  providers: [MarketCenterService],
})
export class MarketCenterModule { }
