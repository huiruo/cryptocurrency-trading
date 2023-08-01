import { BASE_URL, FAIL, SUCCESS } from '@common/constants'
import { LoginSuccess, ResultType, VerifyAuthResType } from 'types'

export async function handleGoogleAuthCodeApi(
  code: string,
): Promise<ResultType<LoginSuccess>> {
  try {
    const res = await fetch(`${BASE_URL}/user/google/auth/code?code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.status === 200) {
      return {
        statusCode: SUCCESS,
        message: 'OK',
        data: await res.json(),
      }
    }

    return {
      statusCode: FAIL,
      message: res.statusText,
      data: await res.json(),
    }
  } catch (error) {
    return {
      statusCode: FAIL,
      message: error as string,
      data: {
        username: '',
        email: '',
        avatar: '',
        token: '',
      },
    }
  }
}

export async function verifyAuth(
  token: string,
): Promise<ResultType<VerifyAuthResType>> {
  try {
    const res = await fetch(`${BASE_URL}/user/auth/verify`, {
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
      data: {
        username: '',
        email: '',
      },
    }
  }
}
