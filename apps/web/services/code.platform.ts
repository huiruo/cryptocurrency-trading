import { apiPrefix } from '@common/constants'
import { ResType, fetchWithAuth } from './base'
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
  RunCodeOptions,
  RunCodeResponse,
  RunningContainerOptions,
  RunningContainerResponse,
  StartContainerOptions,
  StartContainerResponse,
  StopContainerOptions,
  StopContainerResponse,
} from './code.platform.type'

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

export const codePlatformApi: Api = {
  codeList: async (
    options: CodeListOptions = { test: 123 },
  ): Promise<ResType<CodeListResponse>> => {
    const url = `${apiPrefix}${apiConfig.codeList}`
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
    const url = `${apiPrefix}${apiConfig.runCode}`
    return fetchWithAuth(url, { body: options })
  },
  getContainerStatus: async (
    options: ContainerStatusOptions = { test: 123 },
  ): Promise<ResType<ContainerStatusResponse>> => {
    const url = `${apiPrefix}${apiConfig.getContainerStatus}`
    return fetchWithAuth(url, { body: options })
  },
  getRunningContainer: async (
    options: RunningContainerOptions = { test: 123 },
  ): Promise<ResType<RunningContainerResponse>> => {
    const url = `${apiPrefix}${apiConfig.getRunningContainer}`
    return fetchWithAuth(url, { body: options }, 'GET')
  },
  buildDockerImage: async (
    options: BuildDockerImageOptions = { test: 123 },
  ): Promise<ResType<BuildDockerImageResponse>> => {
    const url = `${apiPrefix}${apiConfig.buildDockerImage}`
    return fetchWithAuth(url, { body: options })
  },
  listImg: async (): Promise<ResType<ListImgResponse>> => {
    const url = `${apiPrefix}${apiConfig.listImg}`
    return fetchWithAuth(url, { body: {} }, 'GET')
  },
  listContainers: async (
    options: ListContainersOptions = { test: 123 },
  ): Promise<ResType<ListContainersResponse>> => {
    const url = `${apiPrefix}${apiConfig.listContainers}`
    return fetchWithAuth(url, { body: options })
  },
  startContainer: async (
    options: StartContainerOptions = { test: 123 },
  ): Promise<ResType<StartContainerResponse>> => {
    const url = `${apiPrefix}${apiConfig.startContainer}`
    return fetchWithAuth(url, { body: options })
  },
  stopContainer: async (
    options: StopContainerOptions = { test: 123 },
  ): Promise<ResType<StopContainerResponse>> => {
    const url = `${apiPrefix}${apiConfig.stopContainer}`
    return fetchWithAuth(url, { body: options })
  },
  getUser: async (
    options: GetUserOptions = { test: 123 },
  ): Promise<ResType<GetUserResponse>> => {
    const url = `${apiPrefix}${apiConfig.getUser}`
    return fetchWithAuth(url, { body: options })
  },
}
