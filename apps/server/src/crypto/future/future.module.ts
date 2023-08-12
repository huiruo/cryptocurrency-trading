import { Module } from '@nestjs/common'
import { FutureController } from './future.controller'
import { FutureService } from './future.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FutureOrder } from '../entity/future-order.entity'

@Module({
  imports: [TypeOrmModule.forFeature([FutureOrder])],
  controllers: [FutureController],
  providers: [FutureService],
  exports: [FutureService],
})
export class FutureModule {}
