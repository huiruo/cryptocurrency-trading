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
import { googleApiBaseUrl, googleRedirectUriDev2 } from 'src/common/auth-config'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'
import { Public } from 'src/common/decorators/public.decorator'
import { fail, success } from 'src/common/constant'
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
    console.log('%c=====login', 'color:red')
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
    console.log('%c=====google/auth/code', 'color:red')
    const { client_id, client_secret } =
      this.authService.getGoogleOauth_clientID()
    if (!client_id || !client_secret) {
      res.status(500).json({ message: 'googleOauth error' })
      return
    }
    // Send a POST request to the Google server to get an access token
    const response = await axios.post(`${googleApiBaseUrl}/oauth2/v4/token`, {
      code,
      client_id,
      client_secret,
      redirect_uri: googleRedirectUriDev2,
      grant_type: 'authorization_code',
    })

    const accessToken = response.data.access_token

    // Use access tokens to make requests to the Google API to get user information
    const { data: userInfo } = await axios.get(
      `${googleApiBaseUrl}/oauth2/v1/userinfo?access_token=${accessToken}`,
    )
    /*
      User information is processed here, checking if the user is already registered and if not, storing it in the database
      e.g. store it in the database and create a JWT token for authentication purposes
      Perform login logic and save user data in session or database so that future requests can use it
    */
    const result = await this.userService.handlerGoogleAuth(userInfo)
    if (result.code === fail) {
      res.status(500).json({ message: result.msg })
      return
    }

    const { email, given_name, id, picture } = userInfo as GoogleAuthType
    const token = await this.authService.signInWithGoogle(given_name, email, id)

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
    return { code: success, msg: '查询成功', data }
  }

  @Get('auth/verify')
  @HttpCode(HttpStatus.OK)
  async getUserByAuth(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    console.log('%c=====auth/verify', 'color:red')
    const authorization = req.headers['authorization']
    try {
      let authToken = ''
      if (authorization) {
        authToken = authorization.split(' ')[1]
      } else {
        res.status(401).json({ msg: 'Unauthorized' })
      }

      const userRes = await this.authService.getUserFromToken(authToken)
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
