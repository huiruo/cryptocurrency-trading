## src/user/user.controller.ts
```js
  @Public()
  @Get('google/auth/handler')
  async handlerGoogleAuth(
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
      redirect_uri: googleOauth.googleRedirectUri,
      grant_type: 'authorization_code',
    })
    const accessToken = response.data.access_token

    console.log('googleAuthHandler', { code, state })
    console.log('response.data', response.data)

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

    const { email, given_name, id } = userInfo
    const token = await this.authService.signInWithGoogle(given_name, email, id)
    console.log('登录成功,重定向:', `${webRedirect}?token=${token}`)

    return res.redirect(`${webRedirect}?token=${token}`)
  }

  // 只用来测试获取google auth token
  @Get('google/auth/handler/UseGoogleApi')
  async googleAuthHandlerUseGoogleApi(
    @Query('code') code: string,
    @Query('state') state: string,
  ): Promise<void> {
    /**
     * query, session
     */
    console.log('googleAuthHandlerUseGoogleApi', { code, state })

    const oauth2Client = new google.auth.OAuth2(
      googleOauth.clientID,
      googleOauth.clientSecret,
      googleOauth.googleRedirectUri,
    )

    const { tokens } = await oauth2Client.getToken(code)

    console.log('tokens', tokens)

    oauth2Client.setCredentials(tokens)
  }
```