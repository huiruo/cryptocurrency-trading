import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtService } from '@nestjs/jwt'
import { DecodedByTokenType, ResultWithData } from 'src/types'
import { ConfigService } from '@nestjs/config'
import { fail, success } from 'src/common/constant'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  getGoogleOauth_clientID(): {
    client_id: string
    client_secret: string
  } {
    const client_id = this.configService.get('googleOauth_clientID')
    const client_secret = this.configService.get('googleOauth_clientSecret')

    return {
      client_id,
      client_secret,
    }
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; msg?: string }> {
    const users = await this.userService.findOneByName(username)
    if (users.length === 0) {
      return { msg: '用户名错误', access_token: '' }
    }

    const user = users[0]
    if (user.password !== pass) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.id, username: user.username }

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async signInWithGoogle(
    username: string,
    email: string,
    googleId: string,
  ): Promise<string> {
    const payload = { username, email, googleId }
    return await this.jwtService.signAsync(payload)
  }

  async getUserFromToken(
    token: string,
  ): Promise<ResultWithData<DecodedByTokenType>> {
    try {
      const decodedByToken = this.jwtService.verify(token)
      console.log('decodedByToken', decodedByToken)
      return { code: success, msg: '查询成功', data: decodedByToken }
    } catch (error) {
      return { code: fail, msg: error, data: null }
    }
  }
}
