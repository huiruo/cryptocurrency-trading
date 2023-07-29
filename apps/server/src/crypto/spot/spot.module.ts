import { Module } from '@nestjs/common'
import { SpotController } from './spot.controller'
import { SpotService } from './spot.service'
import { SpotOrder } from '../entity/spot-order.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([SpotOrder])],
  controllers: [SpotController],
  providers: [SpotService],
  exports: [SpotService],
})
export class SpotModule {}
