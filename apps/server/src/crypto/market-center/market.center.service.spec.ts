import { Test, TestingModule } from '@nestjs/testing'
import { MarketCenterService } from './market.center.service'

describe('MarketCenterService', () => {
  let service: MarketCenterService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketCenterService],
    }).compile()

    service = module.get<MarketCenterService>(MarketCenterService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
