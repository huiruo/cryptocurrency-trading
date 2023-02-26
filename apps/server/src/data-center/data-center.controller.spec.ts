import { Test, TestingModule } from '@nestjs/testing';
import { DataCenterController } from './data-center.controller';

describe('DataCenterController', () => {
  let controller: DataCenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataCenterController],
    }).compile();

    controller = module.get<DataCenterController>(DataCenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
