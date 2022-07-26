import { Test, TestingModule } from '@nestjs/testing';
import { CryptoWalletController } from './crypto-wallet.controller';

describe('CryptoWalletController', () => {
  let controller: CryptoWalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoWalletController],
    }).compile();

    controller = module.get<CryptoWalletController>(CryptoWalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
