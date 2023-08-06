import { getParameterByName } from '@common/utils'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'

export interface ResType<T> {
  code: number
  msg: string
  data: T
}

export interface PaginationType {
  currentPage: number
  pageSize: number
}

export interface PaginationResType<T> {
  total: number
  data: T
}

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
  let token = getCookie('token')
  if (!token) {
    console.log('test-1:', token)
    token = getParameterByName('codeToken', window.location.href)
    if (token) setCookie('token', token)
  }

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
      deleteCookie('token')
      window.location.href = '/'
      console.log('请登录==>')
      return { code: 0, msg: '请登录' } as ResType<T>
    }

    if (response.status === 500) {
      return {
        code: response.status,
        msg: response.statusText as string,
        data: null,
      } as ResType<T>
    }

    const newToken = response.headers.get('Authorization')
    if (newToken && newToken !== token) {
      setCookie('token', newToken)
    }

    return await response.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('fetchWithAuth error', error)

    return { code: -1, msg: error.message as string, data: null } as ResType<T>
  }
}
