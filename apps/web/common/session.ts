import type { IronSessionOptions } from 'iron-session'
import { LoginSuccess } from 'types'

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'code-platform-cookie',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    // secure: false,
  },
}

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    // user?: User
    // payload?: LoginSuccessPayload
    payload?: LoginSuccess
    loginStatus?: number
  }
}
