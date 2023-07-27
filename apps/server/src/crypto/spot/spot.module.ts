import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from 'src/user/auth.guard'
import { SpotController } from './spot.controller'
import { SpotService } from './spot.service'
import { SpotOrder } from '../entity/spot-order.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([SpotOrder])],
  controllers: [SpotController],
  providers: [
    SpotService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [SpotService],
})
export class SpotModule {}
