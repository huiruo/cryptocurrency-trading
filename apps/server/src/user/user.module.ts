import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { UserService } from './user.service'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { env } from 'src/common/env-unit'
import { jwtConstants } from 'src/common/auth-config'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: env('jwt_secret'),
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    ConfigModule,
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [UserService],
})
export class UserModule {}
