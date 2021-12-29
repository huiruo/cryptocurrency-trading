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

  /*
  Data Api: 更新钱包
  http://localhost:1788/account/binance/cryptoWallet
  */
  @Get('binance/cryptoWallet')
  async cryptoWallet(){
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

  /*
  Server api: 获取钱包详情
  http://localhost:1788/account/api/cryptoWallet
  */
  @Get('api/cryptoWallet')
  async cryptoWalletApi(){
    const data = await this.cryptoWalletService.getCryptoWallet();

    return { code: 200, message: '查询成功',data};
  }

  /*
  Server api: 计算持仓成本
  http://localhost:1788/account/api/calculateCostprice
  symbol:'ETHUSDT'
  asset:'ETH'
  or:
  symbol:'BTCUSDT'
  asset:'BTC'
  */
  @Get('api/calculateCostPrice')
  async calculateCostprice(@Query() query){
    console.log("query:",query.symbol)
    const { symbol } = query

    // 匹配USDT结尾,并截取asset start
    const regUSDT = /USDT$/
    let asset:string = ''
    if(regUSDT.test(symbol)){
      asset = symbol.replace(/USDT/g, "");
    }
    //end

    if(asset){
      const data = await this.cryptoWalletService.CALC_holdCostprice(symbol,asset);
      return { code: 200, message: '查询成功',data};
    }else{
      return { code: 200, message: 'asset error',data:null};
    }
  }

  /*
  Server api: 更新单一asset策略
  http://localhost:1788/account/api/updateStrategy
  symbol:'ETHUSDT' 
  or:
  symbol:'BTCUSDT'
  asset:'BTC'
  */
  @Get('api/updateStrategy')
  async updateTradingStrategy(@Query() query){
    console.log("updateStrategy_query:",query.symbol)
    const { symbol } = query

    // 匹配USDT结尾,并截取asset start
    const regUSDT = /USDT$/
    let asset:string = ''
    if(regUSDT.test(symbol)){
      asset = symbol.replace(/USDT/g, "");
    }
    //end

    if(asset){

      const data = await this.cryptoWalletService.updateTradingStrategy(symbol,asset);

      return { code: 200, message: '更新成功',data};
    }else{

      return { code: 200, message: 'asset error',data:null};
    }
  } 
}
