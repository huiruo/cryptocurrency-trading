/**
 * office
 *
 * home
 * http://192.168.1.100
 */
export const BASE_URL = 'http://192.168.1.100:3888'

export const apiPrefix = '/code-platform'

export const SUCCESS = 1

export const FAIL = 0

export const THIRD_PARTY_LOGIN_TAG = 't'

export const webRedirect = 'http://localhost:3800/crypto/strategies'

export const loginRedirect = 'http://localhost:3800'

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

const testRedirectUri = 'http://localhost:3800/api/auth/google'

export const googleAuthUrl =
  `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=${testRedirectUri}` +
  `&scope=profile email&client_id=${googleClientId}`

// export const HOST =
//   process.env.NODE_ENV === 'development' ? 'http://localhost:3800' : 'https://xxx.com'

/**
 * test
 */
// const HOST = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_DEV_HOST : process.env.NEXT_PUBLIC_PROD_HOST
// const googleRedirectUriByNestjs = `${HOST}/user/google/auth/handler`
// const googleRedirectUri = `${HOST}/api/auth/google`
// const googleAuthUrlByNestjs = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=${googleRedirectUriByNestjs}&scope=profile email&client_id=${googleClientId}`

export const strategyStatusMap = ['original', 'running', 'ended']

export const defaultRunning = 1
