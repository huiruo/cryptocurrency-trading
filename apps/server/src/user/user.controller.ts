import {
  Body,
  Controller,
  Post,
  Get,
  Inject,
  Param,
  Req,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common'
import { UserService } from './user.service'
import { Request, Response } from 'express'
import { GoogleAuthType, ResultWithData } from '../types'
import axios from 'axios'
import {
  googleApiBaseUrl,
  googleOauth,
  googleRedirectUriDev2,
  webRedirect,
} from 'src/common/auth-config'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'
import { Public } from 'src/common/decorators/public.decorator'
import { success } from 'src/common/constant'
import { User } from './user.entity'

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(
    @Body() signInDto: { username: string; password: string },
  ): Promise<{ access_token: string; msg?: string }> {
    return this.authService.signIn(signInDto.username, signInDto.password)
  }

  // handle google auth code
  @Public()
  @Get('google/auth/code')
  async HandleGoogleAuthCode(
    @Query('code') code: string,
    @Query('state') state: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    // 向Google服务器发出POST请求以获取访问令牌
    const response = await axios.post(`${googleApiBaseUrl}/oauth2/v4/token`, {
      code,
      client_id: googleOauth.clientID,
      client_secret: googleOauth.clientSecret,
      redirect_uri: googleRedirectUriDev2,
      grant_type: 'authorization_code',
    })

    const accessToken = response.data.access_token

    // 使用访问令牌向Google API发出请求以获取用户信息
    const userInfoResponse = await axios.get(
      `${googleApiBaseUrl}/oauth2/v1/userinfo?access_token=${accessToken}`,
    )

    // 解析响应以获取用户信息
    const userInfo = userInfoResponse.data as GoogleAuthType
    console.log('解析响应获取的用户信息:', userInfo)

    /*
      在这里处理用户信息，检查用户是否已经注册过，如果没有，则将其保存到数据库
      例如将其存储在数据库中并创建JWT令牌以进行身份验证
      执行登录逻辑，并将用户数据保存在会话或数据库中，以便将来的请求可以使用它
    */
    const result = await this.userService.handlerGoogleAuth(userInfo)
    console.log('拿到 google 账户信息,处理好注册和登录返回:', result)

    const { email, given_name, id, picture } = userInfo
    const token = await this.authService.signInWithGoogle(given_name, email, id)
    console.log('登录成功:', `${webRedirect}?token=${token}`)

    res.setHeader(
      'Set-Cookie',
      `token=${token}; HttpOnly; Secure; SameSite=Strict`,
    )

    res
      .status(200)
      .json({ username: given_name, email, avatar: picture, token })
  }

  // localhost:3888/user/7
  @UseGuards(AuthGuard)
  @Get('userId:id')
  async findOneUser(@Param('id') id: number): Promise<ResultWithData<User[]>> {
    console.log('userId==>findOneUser-->', id)
    const data = await this.userService.findUser(id)
    return { code: 200, msg: '查询成功', data }
  }

  @Get('auth/verify')
  @HttpCode(HttpStatus.OK)
  async getUserByAuth(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const authorization = req.headers['authorization']
    console.log('======>verifyAuth')
    try {
      let authToken = ''
      if (authorization) {
        authToken = authorization.split(' ')[1]
      } else {
        res.status(401).json({ msg: 'Unauthorized' })
      }

      const userRes = await this.authService.getUserFromToken(authToken)
      console.log('======>verifyAuth 2:', userRes)
      // TODO: 不用查询
      /*
      const users = await this.userService.findOneByEmail(userRes.data.email)
      console.log('======>verifyAuth 3:', users)
      */
      res.status(200).json({
        code: success,
        msg: '查询成功',
        data: { username: userRes.data.username, email: userRes.data.email },
      })
    } catch (error) {
      res.status(500).json({ msg: 'Unauthorized' })
    }
  }
}
