import { Test, TestingModule } from '@nestjs/testing'
import { FutureService } from './future.service'

describe('FutureService', () => {
  let service: FutureService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FutureService],
    }).compile()

    service = module.get<FutureService>(FutureService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
