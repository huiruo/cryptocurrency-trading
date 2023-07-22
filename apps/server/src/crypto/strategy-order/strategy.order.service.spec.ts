import { Test, TestingModule } from '@nestjs/testing'
import { StrategyOrderService } from './strategy.order.service'

describe('StrategyOrderService', () => {
  let service: StrategyOrderService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StrategyOrderService],
    }).compile()

    service = module.get<StrategyOrderService>(StrategyOrderService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
