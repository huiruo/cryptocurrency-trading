import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradingController } from './trading.controller';
import {MyTrades} from './trading.entity'
import { TradingService } from './trading.service';

@Module({
    imports: [TypeOrmModule.forFeature([MyTrades])],
    controllers:[TradingController],
    providers:[TradingService],
    exports:[TradingService]
})
export class TradingModule {}
