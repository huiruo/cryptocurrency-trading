import { Controller,Body,Post,Get } from '@nestjs/common';
import { TradingService } from './trading.service';
import { ConfigService } from '@nestjs/config';
import got from 'got';
const crypto = require('crypto');
import {HttpsProxyAgent} from 'hpagent';

const { Spot } = require('@binance/connector')
const {BinanceSpot}  = require('@binance/connector2')

@Controller('trader/ticker')
export class TradingController {
    
    constructor(
        private readonly tradingService:TradingService,
        private configService: ConfigService,
    ){

    }

    @Post('find')
    //http://localhost:1788/trader/ticker/ticker/find
    findOne(@Body() body:any){
        return this.tradingService.findOne(body.username);
    }

    @Get('24hr')
    ticker(){
       //test:
       //http://localhost:1788/trader/ticker/24hr?symbol=BTC-USDT&platform=okex
       const ticker24URL = 'https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT'
       const data= this.gotData(ticker24URL)
       return data
    }

    async gotData(ticker24URL:string){
        const data = await got.get(ticker24URL,{
            agent: {
                https: new HttpsProxyAgent({
                    keepAlive: true,
                    keepAliveMsecs: 10000,
                    maxSockets: 256,
                    maxFreeSockets: 256,
                    proxy: 'http://127.0.0.1:7890'
                })
            }
        }).json();
        return data
    }

    hash_signature(query_string) {
        const binanceApiSecret= this.configService.get<string>('binanceApiSecret')
        return crypto
            .createHmac('sha512', binanceApiSecret)
            .update(query_string)
            .digest('hex');
    }
    signature(query_string) {
        const binanceApiSecret= this.configService.get<string>('binanceApiSecret')
        return crypto
            .createHmac('sha256', binanceApiSecret)
            .update(query_string)
            .digest('hex');
    }

    random_string() {
        return crypto.randomBytes(32).toString('hex').substring(0,32);
    }

    @Get('gensignature')
    async generateSignature(payload={}){
       //test:
       //http://localhost:1788/trader/ticker/gensignature
       console.log("generateSignature--->")
       const timestamp = Date.now()
       const nonce = this.random_string()
    //    const payload_to_sign = timestamp + "\n" + nonce + "\n" + JSON.stringify(payload) + "\n"
       const payload_to_sign =`timestamp=${timestamp}`
       const signature = this.hash_signature(payload_to_sign)
    //    console.log("0.生成签名",payload_to_sign)
    //    console.log("1.生成签名",signature)
       console.log("2.timestamp:",timestamp)


       const signature2 = this.signature(payload_to_sign)
        console.log("1.生成签名",signature2)

       //test:
       //http://localhost:8089/trader/user/login
       let testUrl ='http://localhost:8089/trader/user/login'
        /*
       const {data} = await got.post(testUrl, {
        json: {
            "account":"abchen",
            "password":"123456"
        }
        }).json();
        */
    //    let testWallet = `https://api.binance.com/sapi/v1/account/apiRestrictions?timestamp=${timestamp}&signature=${signature}`
    //    let testWallet = `https://api.binance.com/sapi/v1/account/apiRestrictions?timestamp=${timestamp}&signature=${signature2}`
    //    let testWallet = `https://api.binance.com/sapi/v1/asset/assetDetail?timestamp=${timestamp}&signature=${signature2}`
       let testWallet = `https://api.binance.com/sapi/v1/capital/config/getall?timestamp=${timestamp}&signature=${signature2}`
       //&timestamp=1499827319559&signature=c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71
        console.log("3.请求链接:",testWallet)
        const data = await got.get(testWallet,{
            agent: {
                https: new HttpsProxyAgent({
                    keepAlive: true,
                    keepAliveMsecs: 10000,
                    maxSockets: 256,
                    maxFreeSockets: 256,
                    proxy: 'http://127.0.0.1:7890'
                })
            }
        }).json();
        console.log("got_post_data",data)

        //const url = baseURL + path
        //const signature = hash_signature(payload_to_sign)
    }

    //http://localhost:1788/trader/ticker/gensignature2
    @Get('gensignature2')
    async generateSignature2(payload={}){
        console.log("generateSignature2---->")
        const binanceApiSecret= this.configService.get<string>('binanceApiSecret')
        const binanceApiKey= this.configService.get<string>('binanceApiKey')
        const client = new Spot(binanceApiKey, binanceApiSecret)
        // Get account information
        client.account().then(response =>{
            console.log("response.data",response)
            return client.logger.log(response.data)
        })
    }

    @Get('gensignature3')
    async generateSignature3(payload={}){
        // client.getHello()
        const binanceApiSecret= this.configService.get<string>('binanceApiSecret')
        const binanceApiKey= this.configService.get<string>('binanceApiKey')
        console.log("开始获取---->1",binanceApiSecret)
        console.log("开始获取---->2",binanceApiKey)
        // console.log("开始获取2---->",process.env.binanceApiSecret)
        const client = new BinanceSpot(binanceApiKey, binanceApiSecret)
        // Get account information
        client.account().then(response =>{
            console.log("response.data",response)
            return client.logger.log(response.data)
        })
    }
}