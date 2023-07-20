import { ResultType, VerifyAuthResType } from 'types'

const constUrl = 'http://192.168.186.118:3888'

export async function handleGoogleAuthCodeApi(code: string): Promise<any> {
  try {
    return fetch(`${constUrl}/user/google/auth/code?code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('NetWork Error', error)
    return {
      code: 0,
      message: error,
    }
  }
}

export async function verifyAuth(
  token: string,
): Promise<ResultType<VerifyAuthResType>> {
  try {
    const res = await fetch(`${constUrl}/user/auth/verify`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return await res.json()
  } catch (error) {
    console.error('NetWork Error', error)

    return {
      statusCode: 500,
      message: 'Request error',
    }
  }
}
