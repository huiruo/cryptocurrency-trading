const googleRedirectUriProd = 'http://localhost:3888/user/google/auth/handler'

const googleRedirectUriDev = 'http://localhost:3888/user/google/auth/handler'

export const googleRedirectUriDev2 = 'http://localhost:3800/api/auth/google'

export const googleOauth = {
  googleRedirectUri:
    process.env.NODE_ENV === 'prod'
      ? googleRedirectUriProd
      : googleRedirectUriDev,
}

export const googleApiBaseUrl = 'https://www.googleapis.com'

export const webRedirect = 'http://localhost:3800/crypto/strategies'

export const notLoginRedirect = 'http://localhost:3800/'

export const jwtConstants = {
  // expiresIn: '120s', // test
  expiresIn: '3600s', // nornal
}
