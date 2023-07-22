import { Test, TestingModule } from '@nestjs/testing'
import { StrategyOrderController } from './strategy.order.controller'

describe('StrategyOrderController', () => {
  let controller: StrategyOrderController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StrategyOrderController],
    }).compile()

    controller = module.get<StrategyOrderController>(StrategyOrderController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
