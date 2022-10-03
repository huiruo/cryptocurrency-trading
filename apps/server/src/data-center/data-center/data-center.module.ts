import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataCenterController } from './data-center.controller';
import { CoinCode } from './data-center.entity';
import { Coin } from './coin.entity';
import { DataCenterService } from './data-center.service';
import { CoinAddition } from './coin.addition.entity';
import { DayKline } from './day.kline.entity';
import { CoinDevMember } from './coin.member.entity';
import { Balances } from './balances.entity';
import { FuturesOrder } from './futures-order.entity';
import { SpotOrder } from './spot-order.entity';
import { StrategiesOrder } from './strategies-order.entity';
import { StrategyOrderId } from './strategy-orderid.entity';

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
      StrategiesOrder,
      StrategyOrderId,
    ])],
  controllers: [DataCenterController],
  providers: [DataCenterService],
})
export class DataCenterModule { }
