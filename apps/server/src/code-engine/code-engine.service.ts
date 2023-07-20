import { Injectable } from '@nestjs/common'
import { echo, pwd } from 'shelljs'
import {
  buildDockerImage,
  checkContainerStatus,
  getRunningDockerContainers,
  isDockerImageExist,
  listContainersUtil,
  listImgUtil,
  startContainer,
  stopDockerContainer,
  writeCodeFile,
} from 'src/common/docker-util'
import { Result, ResultWithData } from '../types/index'
import {
  BuildImage,
  Container,
  ImageType,
  RunningDockerContainersType,
  TaskCode,
} from './code-engine.types'
import { success, fail } from 'src/common/constant'
import { DockerContainer } from './docker.types'

@Injectable()
export class CodeEngineService {
  async runCode(taskCode: TaskCode): Promise<Result> {
    // console.log('service runJsCode', shell)
    // shell.echo('hello world');
    echo('hello world')
    const res = pwd()
    echo(res)

    console.log('taskCode', taskCode)
    // const path = `/home/ruo/work-space/code-platform-server`
    const path = '/home/ruo/work-space/js-code-run-test'
    const fileName = `/app.${taskCode.type}`

    return await writeCodeFile(path + fileName, taskCode.code)
  }

  async getRunningContainer(): Promise<RunningDockerContainersType[]> {
    return getRunningDockerContainers()
  }

  async listImg(): Promise<ResultWithData<ImageType[]>> {
    return listImgUtil()
  }

  async listContainers(
    isRun: boolean,
  ): Promise<ResultWithData<DockerContainer[]>> {
    return listContainersUtil(isRun)
  }

  async isDockerContainerStopped(container: Container): Promise<string> {
    return checkContainerStatus(container.containerName)
    // return isDockerContainerStopped(container.containerName)
  }

  async stopContainer(container: Container): Promise<Result> {
    console.log('stopContainer-->', container)
    const status = stopDockerContainer(container.containerName)
    if (status) {
      return { code: success, msg: 'Stop container successfully' }
    } else {
      return { code: fail, msg: 'stop Container failed.' }
    }
  }

  async startContainer(container: Container): Promise<Result> {
    // const status = checkContainerStatus(container.containerName)
    const status = checkContainerStatus(container.Id)
    console.log('startContainer-status:', { status, id: container.Id })
    if (
      status === 'restarting' ||
      status === 'running' ||
      status === 'NoSuchObject'
    ) {
      return { code: success, msg: `${container.containerName} is ${status}` }
    } else {
      console.log('启动已有容器', container.containerName)
      // TODO: 不是异步可能会有问题
      const isSucceed = startContainer(container.containerName)
      if (isSucceed) {
        return { code: success, msg: 'start container successfully' }
      } else {
        return { code: fail, msg: 'Error: Container start failed.' }
      }
    }
  }

  async runDockerfile(buildImage: BuildImage): Promise<Result> {
    const { dockerfileName, imageName } = buildImage
    if (isDockerImageExist(imageName)) {
      console.log(`Docker image ${imageName} exists.`)

      return {
        code: fail,
        msg: `Docker image ${imageName} exists.`,
      }
    } else {
      console.log(`Docker image ${imageName} does not exist.`)
      const res = await buildDockerImage(dockerfileName, imageName)
      const { status, msg } = res
      return {
        code: status ? success : fail,
        msg,
      }
    }
  }
}
