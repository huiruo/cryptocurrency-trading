import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletInfo } from './crypto-info.entity'
import { CryptoWallet } from './crypto_wallet.entity'
import { CryptoWalletService } from './crypto-wallet.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([WalletInfo,CryptoWallet]),
  ],
  providers:[CryptoWalletService],
  exports:[CryptoWalletService]
})
export class CryptoWalletModule {}
