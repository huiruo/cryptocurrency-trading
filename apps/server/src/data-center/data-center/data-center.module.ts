
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataCenterController } from './data-center.controller';
import { SimplifySymbol } from './data-center.entity';
import { DataCenterService } from './data-center.service';

@Module({
    imports: [TypeOrmModule.forFeature([SimplifySymbol])],
    controllers: [DataCenterController],
    providers: [DataCenterService],
})
export class DataCenterModule {
}
