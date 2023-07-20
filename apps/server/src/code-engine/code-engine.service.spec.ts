import { Test, TestingModule } from '@nestjs/testing'
import { CodeEngineService } from './code-engine.service'

describe('CodeEngineService', () => {
  let service: CodeEngineService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeEngineService],
    }).compile()

    service = module.get<CodeEngineService>(CodeEngineService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
