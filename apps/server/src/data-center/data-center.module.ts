import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataCenterController } from './data-center.controller';
import { CoinCode } from './data-center.entity';
import { Coin } from '../entity/coin.entity';
import { DataCenterService } from './data-center.service';
import { CoinAddition } from '../entity/coin.addition.entity';
import { DayKline } from '../entity/day.kline.entity';
import { CoinDevMember } from '../entity/coin.member.entity';
import { Balances } from '../entity/balances.entity';
import { FuturesOrder } from '../entity/futures-order.entity';
import { SpotOrder } from '../entity/spot-order.entity';
import { StrategyOrder } from '../entity/strategy-order.entity';
import { StrategyOrderId } from '../entity/strategy-orderid.entity';
import { TradeAsset } from '../entity/asset.entity';
import { TraderApi } from '../entity/api.entity';
import { DailyProfit } from '../entity/daily.profit.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      CoinCode,
      Coin,
      CoinAddition,
      DayKline,
      CoinDevMember,
      Balances,
      FuturesOrder,
      SpotOrder,
      StrategyOrder,
      StrategyOrderId,
      TradeAsset,
      TraderApi,
      DailyProfit
    ])],
  controllers: [DataCenterController],
  providers: [DataCenterService],
})
export class DataCenterModule { }
