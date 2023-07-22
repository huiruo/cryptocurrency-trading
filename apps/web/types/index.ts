export type LoginSuccessPayload = {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
  token: string
}

export type LoginSuccess = {
  username: string
  email: string
  avatar: string
  token: string
}

export type VerifyAuthResType = {
  username: string
  email: string
}

export interface ResultType<T> {
  statusCode: number
  message: string
  data: T
}

export interface Container {
  containerName: string
}

export interface GetContainers {
  isRunning: boolean
}

export interface TaskCode {
  code: string
  type: string
}

export interface BuildImage {
  dockerfileName: string
  imageName: string
}
