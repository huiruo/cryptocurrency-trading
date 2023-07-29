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
  /**
   * Renewal in less than 30/20 minutes
   * nomal JWT_EXPIRATION_THRESHOLD = 1800
   * nomal JWT_EXPIRATION = 3600
   */
  private readonly JWT_EXPIRATION_THRESHOLD = 1800
  private readonly JWT_EXPIRATION = 3600

  /* test
  private readonly JWT_EXPIRATION_THRESHOLD = 100
  private readonly JWT_EXPIRATION = 140 
  */

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  /**
   * Use an Interceptor to validate the JWT and redirect the user when the JWT expires.
   * Interceptors are a special type of middleware in the NestJS framework that can process requests and responses before or after controller methods execute.
   *  */
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

      // To renews tart
      // expiresIn Expiration Time
      const expiresIn = Math.floor(payload.exp - Date.now() / 1000)
      if (expiresIn >= 0 && expiresIn <= this.JWT_EXPIRATION_THRESHOLD) {
        const { username, email, googleId } = payload
        const token = await this.jwtService.signAsync(
          { username, email, googleId },
          { expiresIn: this.JWT_EXPIRATION },
        )
        console.log(
          `Request ${request.method} ${request.url},After updating the JWT with an expiration time of ${expiresIn}, renewing...,${token}`,
        )
        request.headers.authorization = `Bearer ${token}`
        response.setHeader('Authorization', `${token}`)
      } else {
        console.log(`Request ${request.method} ${request.url}:Not to renew`, {
          expiresIn,
        })
        // fix cache
        response.setHeader('Authorization', '')
      }
      // To renews end

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      // request['user'] = payload
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
