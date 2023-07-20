import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator'
import { env } from 'src/common/env-unit'

@Injectable()
export class AuthGuard implements CanActivate {
  /* test 小于2分钟续签
  private readonly JWT_EXPIRATION_THRESHOLD = 2 * 60
  private readonly JWT_EXPIRATION = 140 
  */

  // 小于30/20分钟续签
  // private readonly JWT_EXPIRATION_THRESHOLD = 1800
  private readonly JWT_EXPIRATION_THRESHOLD = 1200
  /**
   * nomal: 3600
   */
  // private readonly JWT_EXPIRATION = 3600
  private readonly JWT_EXPIRATION = 300

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  /**使用拦截器（Interceptor）来验证 JWT 并在 JWT 过期时重定向用户。
   * 拦截器是 NestJS 框架中的一个特殊类型的中间件，它可以在控制器方法执行之前或之后对请求和响应进行处理。 */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      // 💡 See this condition
      return true
    }

    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      console.log('auth.guard UnauthorizedException')
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: env('jwt_secret'),
      })

      // 续签start
      // expiresIn 过期时间
      const expiresIn = Math.floor(payload.exp - Date.now() / 1000)
      // console.log('续签start',expiresIn)
      if (expiresIn >= 0 && expiresIn <= this.JWT_EXPIRATION_THRESHOLD) {
        console.log('更新 JWT 的过期时间为 xx 后,正在续签...')
        const { username, email, googleId } = payload
        const token = await this.jwtService.signAsync(
          { username, email, googleId },
          { expiresIn: this.JWT_EXPIRATION },
        )
        request.headers.authorization = `Bearer ${token}`
        response.setHeader('Authorization', `${token}`)
      } else {
        console.log('不续签')
      }
      // 续签end

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload
    } catch {
      console.log('auth.guard reject-->')

      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
