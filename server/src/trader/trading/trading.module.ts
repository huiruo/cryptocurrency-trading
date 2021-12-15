import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradingController } from './trading.controller';
import {MyTrades} from './trading.entity'
import { TradingService } from './trading.service';

@Module({
    // 将entity中的User进行导入，这样UserService才能够正常使用
    imports: [TypeOrmModule.forFeature([MyTrades])],
    // 注册控制器模块
    controllers:[TradingController],
    // 注册服务模块
    providers:[TradingService],
    exports:[TradingService]
})
export class TradingModule {}
