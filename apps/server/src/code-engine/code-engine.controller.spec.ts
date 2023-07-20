import { Test, TestingModule } from '@nestjs/testing'
import { CodeEngineController } from './code-engine.controller'

describe('CodeEngineController', () => {
  let controller: CodeEngineController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodeEngineController],
    }).compile()

    controller = module.get<CodeEngineController>(CodeEngineController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
