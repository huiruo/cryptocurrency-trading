import { Test, TestingModule } from '@nestjs/testing';
import { TradingController } from './trading.controller';

describe('TradingController', () => {
  let controller: TradingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TradingController],
    }).compile();

    controller = module.get<TradingController>(TradingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
