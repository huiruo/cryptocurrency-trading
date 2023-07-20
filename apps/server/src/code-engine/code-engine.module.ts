import { Module } from '@nestjs/common'
import { CodeEngineController } from './code-engine.controller'
import { CodeEngineService } from './code-engine.service'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from 'src/user/auth.guard'

@Module({
  controllers: [CodeEngineController],
  providers: [
    CodeEngineService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [CodeEngineService],
})
export class CodeEngineModule {}
