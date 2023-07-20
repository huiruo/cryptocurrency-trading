// export interface Options {
//   [key: string]: string | boolean | object;
// }

export interface Api {
  codeList: (options?: CodeListOptions) => Promise<ResType<CodeListResponse>>
  runCode: (options?: RunCodeOptions) => Promise<ResType<RunCodeResponse>>
  getContainerStatus: (
    options?: ContainerStatusOptions,
  ) => Promise<ResType<ContainerStatusResponse>>
  getRunningContainer: (
    options?: RunningContainerOptions,
  ) => Promise<ResType<RunningContainerResponse>>
  buildDockerImage: (
    options?: BuildDockerImageOptions,
  ) => Promise<ResType<BuildDockerImageResponse>>
  // listImg: (options?: ListImgOptions) => Promise<ResType<ListImgResponse>>
  listImg: () => Promise<ResType<ListImgResponse>>
  listContainers: (
    options: ListContainersOptions,
  ) => Promise<ResType<ListContainersResponse>>
  startContainer: (
    options?: StartContainerOptions,
  ) => Promise<ResType<StartContainerResponse>>
  stopContainer: (
    options?: StopContainerOptions,
  ) => Promise<ResType<StopContainerResponse>>
  getUser: (options?: GetUserOptions) => Promise<ResType<GetUserResponse>>
}

export interface ResType<T> {
  code: number
  msg: string
  data: T
}

export interface CodeListOptions {
  test: number
}
export interface CodeListResponse {
  test2: []
}

export interface RunCodeOptions {
  test: number
}
export interface RunCodeResponse {
  test: number
}

export interface ContainerStatusOptions {
  test: number
}
export interface ContainerStatusResponse {
  test: number
}

export interface RunningContainerOptions {
  test: number
}
export interface RunningContainerResponse {
  test: number
}

export interface BuildDockerImageOptions {
  test: number
}
export interface BuildDockerImageResponse {
  test: number
}

// export interface ListImgOptions { }
export interface ListImgResponse {
  test: number
}

export interface ListContainersOptions {
  test: number
}
export interface ListContainersResponse {
  test: number
}

export interface StartContainerOptions {
  test: number
}
export interface StartContainerResponse {
  test: number
}

export interface StopContainerOptions {
  test: number
}
export interface StopContainerResponse {
  test: number
}

export interface GetUserOptions {
  test: number
}
export interface GetUserResponse {
  test: number
}
