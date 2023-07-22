import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { ResType } from './types'

interface FetchOptions<T> extends Omit<RequestInit, 'body'> {
  headers?: {
    Authorization: string
  }
  body?: T | unknown
}

export const fetchWithAuth = async <T>(
  url: string,
  options: FetchOptions<T> = {},
  method = 'POST',
): Promise<ResType<T>> => {
  const token = getCookie('token')
  try {
    const response = await fetch(url, {
      ...options,
      method,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: method === 'POST' ? JSON.stringify(options.body) : null,
    })

    if (response.status === 401) {
      sessionStorage.setItem('isTokenExpired', '0')
      deleteCookie('token')
      window.location.href = '/'
      return { code: 0, msg: '请登录' } as ResType<T>
    }

    const newToken = response.headers.get('Authorization')
    if (newToken) {
      setCookie('token', newToken)
    }

    return response.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('fetchWithAuth error', error)

    return { code: -1, msg: error.message as string, data: null } as ResType<T>
  }
}
