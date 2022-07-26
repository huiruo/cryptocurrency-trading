import { Test, TestingModule } from '@nestjs/testing';
import { CryptoWalletService } from './crypto-wallet.service';

describe('CryptoWalletService', () => {
  let service: CryptoWalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoWalletService],
    }).compile();

    service = module.get<CryptoWalletService>(CryptoWalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
