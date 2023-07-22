import { Test, TestingModule } from '@nestjs/testing'
import { FutureController } from './future.controller'

describe('FutureController', () => {
  let controller: FutureController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FutureController],
    }).compile()

    controller = module.get<FutureController>(FutureController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
