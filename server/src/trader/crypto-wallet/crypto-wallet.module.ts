import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletInfo } from './crypto-info.entity'
import { CryptoWallet } from './crypto_wallet.entity'
import { MyTrades } from './crypto-myTrades.entity'
import { TradingStrategy } from './trading_strategy.entity'
import { CryptoWalletService } from './crypto-wallet.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([WalletInfo,CryptoWallet,MyTrades,TradingStrategy]),
  ],
  providers:[CryptoWalletService],
  exports:[CryptoWalletService]
})
export class CryptoWalletModule {}
