import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from 'src/user/auth.guard'
import { FutureController } from './future.controller'
import { FutureService } from './future.service'

@Module({
  controllers: [FutureController],
  providers: [
    FutureService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [FutureService],
})
export class FutureModule {}
