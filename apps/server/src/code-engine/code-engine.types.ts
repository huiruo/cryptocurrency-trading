export interface Container {
  containerName: string
  Id: string
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

export interface ImageType {
  name: string
  id: string
  size: number
  created: number
  containers: number
}

export interface RunningDockerContainersType {
  id: string
  name: string
  image: string
}
