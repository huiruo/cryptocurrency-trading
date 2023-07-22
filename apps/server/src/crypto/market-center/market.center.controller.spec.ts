import { Test, TestingModule } from '@nestjs/testing'
import { MarketCenterController } from './market.center.controller'

describe('MarketCenterController', () => {
  let controller: MarketCenterController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketCenterController],
    }).compile()

    controller = module.get<MarketCenterController>(MarketCenterController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
