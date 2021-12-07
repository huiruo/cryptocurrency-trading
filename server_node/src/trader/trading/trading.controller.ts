import { Controller,Body,Post,Get } from '@nestjs/common';
import { TradingService } from './trading.service';
import { ConfigService } from '@nestjs/config';
import {HttpsProxyAgent} from 'hpagent';
import got from 'got';
const {binanceConnector}  = require('../../binance-connector/index')
// const {BinanceSpot} = require('@binance/connector2')

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

    @Post('login')
    //http://localhost:1788/trader/ticker/ticker/login
    async login(@Body() body:any){
        let testUrl ='http://localhost:8089/trader/user/login'
        const {data} = await got.post(testUrl, {
         json: {
             "account":"abchen",
             "password":"123456"
         }
         }).json();
        return { code: 200, message: '登录成功',data};
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
    @Get('gensignature2')
    async generateSignature2(payload={}){
        const binance_api_secret= this.configService.get<string>('BINANCE_API_SECRET')
        const binance_api_key= this.configService.get<string>('BINANCE_API_KEY')
        const proxy_url= this.configService.get<string>('PROXY_URL')
        console.log("开始获取---->A",binance_api_secret)
        console.log("开始获取---->B",binance_api_key)
        console.log("开始获取---->C",proxy_url)
        /*
        const client = new BinanceSpot(binance_api_key, binance_api_secret)
       const data = await client.account()
       return { code: 200, message: '查询成功',data};
        */
    }

    @Get('gensignature')
    async generateSignature(payload={}){
        const binance_api_secret= this.configService.get<string>('BINANCE_API_SECRET')
        const binance_api_key= this.configService.get<string>('BINANCE_API_KEY')
        const proxy_url= this.configService.get<string>('PROXY_URL')
        console.log("开始获取---->A",binance_api_secret)
        console.log("开始获取---->B",binance_api_key)
        console.log("开始获取---->C",proxy_url)
        // const client = new binanceConnector(binance_api_key, binance_api_secret,{},proxy_url)
        const client = new binanceConnector(binance_api_key, binance_api_secret,{},proxy_url)
        // Get account information
        // /*
        // client.account().then(response =>{
        //     console.log("response.data",response)
        // })
        // */
       const data = await client.account()
       return { code: 200, message: '查询成功',data};
    //    return { code: 200, message: '查询成功'};
    }
}