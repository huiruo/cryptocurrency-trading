https://docs.nestjs.com/security/authentication#jwt-token
/*
在此示例中，我们创建了一个名为 UserController 的控制器，并在其中定义了两个路由。

在 getUser() 路由中，我们使用 @nestjs/passport 模块的 AuthGuard 守卫来保护路由，
并指定使用 jwt 策略进行身份验证。在 getUser() 方法中，我们从请求对象中获取已经经过身份验证的用户信息，并将其返回给客户端。

在 getToken() 路由中，我们从查询参数中获取访问令牌，并使用 this.validateAccessToken() 方法
来验证访问令牌并返回用户信息。在验证成功后，我们使用 @nestjs/jwt 模块的 JwtService 来生成 JWT token，并将其返回给客户端。

请注意，在实际应用程序中，您可能需要使用更复杂的身份验证和授权策略，并处理更多的错误情况和边缘情况。
此外，您可能需要将 JWT token 存储在安全的地方，并确保在发送请求时使用最新的 token。

```javaScript
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private readonly jwtService: JwtService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Req() req) {
    // 获取已经经过身份验证的用户信息
    const user = req.user;

    return user;
  }

  @Get('token')
  async getToken(@Req() req) {
    // 从查询参数中获取访问令牌
    const accessToken = req.query.access_token;

    // 验证访问令牌并生成 JWT token
    const user = await this.validateAccessToken(accessToken);
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async validateAccessToken(accessToken: string) {
    // 发送请求以验证访问令牌并返回用户信息
    // ...
  }
}
```