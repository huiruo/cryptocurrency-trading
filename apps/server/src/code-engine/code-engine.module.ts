import { Module } from '@nestjs/common'
import { CodeEngineController } from './code-engine.controller'
import { CodeEngineService } from './code-engine.service'

@Module({
  controllers: [CodeEngineController],
  providers: [CodeEngineService],
  exports: [CodeEngineService],
})
export class CodeEngineModule {}
