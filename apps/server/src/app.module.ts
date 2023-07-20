import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CodeEngineModule } from './code-engine/code-engine.module'
import { dbConfig } from '../config/db'
import { UserModule } from './user/user.module'

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), CodeEngineModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
