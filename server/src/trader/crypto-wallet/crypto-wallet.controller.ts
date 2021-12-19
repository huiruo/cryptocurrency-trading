import { Controller,Post,Get,Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CryptoWalletService } from './crypto-wallet.service';

const { binanceConnector }  = require('../../binance-connector/index')

@Controller('account')
export class CryptoWalletController {
      
  constructor(
    private readonly cryptoWalletService:CryptoWalletService,
    private configService: ConfigService,
){
}

  @Get('binance/cryptoWallet')
  //http://localhost:1788/account/binance/cryptoWallet
  async cryptoWallet(payload={}){
      const binance_api_secret= this.configService.get<string>('BINANCE_API_SECRET')
      const binance_api_key= this.configService.get<string>('BINANCE_API_KEY')
      const proxy_url= this.configService.get<string>('PROXY_URL')

      const client = new binanceConnector(binance_api_key, binance_api_secret,proxy_url,{})

      const { statusCode,data,statusMessage } = await client.account()

      if(statusCode===200){

        await this.cryptoWalletService.updateCryptoWallet(data);

        return { code: 200, message: statusMessage,data};
      }else{
        return { code: 0, message: statusMessage,data:null};
      }
  }

  @Get('api/cryptoWallet')
  //http://localhost:1788/account/api/cryptoWallet
  async cryptoWalletApi(payload={}){
        const data = await this.cryptoWalletService.getCryptoWallet();

        return { code: 200, message: '查询成功',data};
  }
}
