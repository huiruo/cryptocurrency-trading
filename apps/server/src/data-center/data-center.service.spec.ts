import { Test, TestingModule } from '@nestjs/testing';
import { DataCenterService } from './data-center.service';

describe('DataCenterService', () => {
  let service: DataCenterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataCenterService],
    }).compile();

    service = module.get<DataCenterService>(DataCenterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
