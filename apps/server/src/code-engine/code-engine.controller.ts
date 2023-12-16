import { Body, Controller, Get, Post } from '@nestjs/common'
import { CodeEngineService } from './code-engine.service'
import { Result, ResultWithData } from '../types/index'
import {
  BuildImage,
  Container,
  GetContainers,
  ImageType,
  RunningDockerContainersType,
  TaskCode,
} from './code-engine.types'
import { DockerContainer } from './docker.types'
import { success } from 'src/common/constant'

@Controller('code-engine')
export class CodeEngineController {
  constructor(private readonly codeEngineService: CodeEngineService) {}

  @Post('stopContainer')
  async stopContainer(@Body() container: Container): Promise<Result> {
    console.log('stopContainer-->', container)
    return await this.codeEngineService.stopContainer(container)
  }

  @Post('startContainer')
  async startContainer(@Body() container: Container): Promise<Result> {
    return await this.codeEngineService.startContainer(container)
  }

  @Get('listImg')
  async listImg(): Promise<ResultWithData<ImageType[]>> {
    return await this.codeEngineService.listImg()
  }

  @Post('listContainers')
  async listContainers(
    @Body() containers: GetContainers,
  ): Promise<ResultWithData<DockerContainer[]>> {
    console.log('listContainers===>')
    const { isRunning } = containers

    return await this.codeEngineService.listContainers(isRunning)
  }

  @Post('runCode')
  async runJsCode(@Body() taskCode: TaskCode): Promise<Result> {
    const data = await this.codeEngineService.runCode(taskCode)
    return data
  }

  @Post('getContainerStatus')
  async getContainerStatus(
    @Body() container: Container,
  ): Promise<ResultWithData<string>> {
    const status =
      await this.codeEngineService.isDockerContainerStopped(container)
    return { code: success, msg: 'success', data: status }
  }

  @Get('getRunningContainer')
  async getRunningContainer(): Promise<
    ResultWithData<RunningDockerContainersType[]>
  > {
    const data = await this.codeEngineService.getRunningContainer()

    return { code: success, msg: 'success', data }
  }

  // runDockerfile
  @Post('buildDockerImage')
  async runDockerfile(@Body() buildImage: BuildImage): Promise<Result> {
    console.log('startContainer-->', buildImage)
    return await this.codeEngineService.runDockerfile(buildImage)
  }

  @Post('buildDockerImage')
  async runDockerUseImg(@Body() buildImage: BuildImage): Promise<Result> {
    /*
    # docker build -t node-client .
    # “.”表示Dockerfile所在的当前目录
    # docker run -p 3008:3008 node-client
    # docker run --name node-client-123 -p 3008:3008 node-client
    */
    /*
    startContainer--> {
      name: 'node-client',
      id: '735004e918be',
      size: 187810533,
      created: 1684712631,
      containers: -1
    }

    // 查看所有容器
    docker ps -a
    * */
    console.log('startContainer-->', buildImage)
    return { code: 0, msg: 'fail' }
    // return await this.codeEngineService.runDockerfile(buildImage)
  }
}
