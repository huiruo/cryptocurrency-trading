import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import {
  Api,
  BuildDockerImageOptions,
  BuildDockerImageResponse,
  CodeListOptions,
  CodeListResponse,
  ContainerStatusOptions,
  ContainerStatusResponse,
  GetUserOptions,
  GetUserResponse,
  ListContainersOptions,
  ListContainersResponse,
  ListImgResponse,
  ResType,
  RunCodeOptions,
  RunCodeResponse,
  RunningContainerOptions,
  RunningContainerResponse,
  StartContainerOptions,
  StartContainerResponse,
  StopContainerOptions,
  StopContainerResponse,
} from './types'

const baseUrl = '/code-platform'

interface ApiConfig {
  codeList: string
  runCode: string
  getContainerStatus: string
  getRunningContainer: string
  buildDockerImage: string
  listImg: string
  listContainers: string
  startContainer: string
  stopContainer: string
  getUser: string

  // Add more API endpoints here...
  [key: string]: string
}

const apiConfig: ApiConfig = {
  codeList: '/code-engine/codeList',
  runCode: '/code-engine/runCode',
  getContainerStatus: '/code-engine/getContainerStatus',
  getRunningContainer: '/code-engine/getRunningContainer',
  buildDockerImage: '/code-engine/buildDockerImage',
  listImg: '/code-engine/listImg',
  listContainers: '/code-engine/listContainers',
  startContainer: '/code-engine/startContainer',
  stopContainer: '/code-engine/stopContainer',
  getUser: '/user/auth/userId',
}

interface FetchOptions<T> extends Omit<RequestInit, 'body'> {
  headers?: {
    Authorization: string
  }
  body?: T | unknown
}

const fetchWithAuth = async <T>(
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

export const services: Api = {
  codeList: async (
    options: CodeListOptions = { test: 123 },
  ): Promise<ResType<CodeListResponse>> => {
    const url = `${baseUrl}${apiConfig.codeList}`
    const res = await fetchWithAuth<CodeListResponse>(
      url,
      { body: options },
      'GET',
    )
    const data = res.data || []
    return {
      code: res.code,
      msg: res.msg,
      data,
    }
  },
  runCode: async (
    options: RunCodeOptions = { test: 123 },
  ): Promise<ResType<RunCodeResponse>> => {
    const url = `${baseUrl}${apiConfig.runCode}`
    return fetchWithAuth(url, { body: options })
  },
  getContainerStatus: async (
    options: ContainerStatusOptions = { test: 123 },
  ): Promise<ResType<ContainerStatusResponse>> => {
    const url = `${baseUrl}${apiConfig.getContainerStatus}`
    return fetchWithAuth(url, { body: options })
  },
  getRunningContainer: async (
    options: RunningContainerOptions = { test: 123 },
  ): Promise<ResType<RunningContainerResponse>> => {
    const url = `${baseUrl}${apiConfig.getRunningContainer}`
    return fetchWithAuth(url, { body: options }, 'GET')
  },
  buildDockerImage: async (
    options: BuildDockerImageOptions = { test: 123 },
  ): Promise<ResType<BuildDockerImageResponse>> => {
    const url = `${baseUrl}${apiConfig.buildDockerImage}`
    return fetchWithAuth(url, { body: options })
  },
  listImg: async (): Promise<ResType<ListImgResponse>> => {
    const url = `${baseUrl}${apiConfig.listImg}`
    return fetchWithAuth(url, { body: {} }, 'GET')
  },
  listContainers: async (
    options: ListContainersOptions = { test: 123 },
  ): Promise<ResType<ListContainersResponse>> => {
    const url = `${baseUrl}${apiConfig.listContainers}`
    return fetchWithAuth(url, { body: options })
  },
  startContainer: async (
    options: StartContainerOptions = { test: 123 },
  ): Promise<ResType<StartContainerResponse>> => {
    const url = `${baseUrl}${apiConfig.startContainer}`
    return fetchWithAuth(url, { body: options })
  },
  stopContainer: async (
    options: StopContainerOptions = { test: 123 },
  ): Promise<ResType<StopContainerResponse>> => {
    const url = `${baseUrl}${apiConfig.stopContainer}`
    return fetchWithAuth(url, { body: options })
  },
  getUser: async (
    options: GetUserOptions = { test: 123 },
  ): Promise<ResType<GetUserResponse>> => {
    const url = `${baseUrl}${apiConfig.getUser}`
    return fetchWithAuth(url, { body: options })
  },
}

export function test(test): void {
  console.log('test', test)
}
