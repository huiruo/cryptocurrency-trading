import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataCenterController } from './data-center.controller';
import { CoinCode } from './data-center.entity';
import { Coin } from './coin.entity';
import { DataCenterService } from './data-center.service';
import { CoinAddition } from './coin.addition.entity';
import { DayKline } from './day.kline.entity';
import { CoinDevMember } from './coin.member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoinCode, Coin, CoinAddition, DayKline, CoinDevMember])],
  controllers: [DataCenterController],
  providers: [DataCenterService],
})
export class DataCenterModule { }
