import { Test, TestingModule } from '@nestjs/testing';
import { TradingService } from './trading.service';

describe('TradingService', () => {
  let service: TradingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradingService],
    }).compile();

    service = module.get<TradingService>(TradingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
