import { Controller,Body,Post,Get } from '@nestjs/common';
import { UserService } from './user.service';
import got from 'got';
const crypto = require('crypto');
import {HttpsProxyAgent} from 'hpagent';


@Controller('trader/ticker')
export class UserController {
    //http://localhost:1788/trader/ticker/ticker/find
    constructor(private readonly usersService:UserService){}
    @Post('find')
    findOne(@Body() body:any){
        return this.usersService.findOne(body.username);
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
        return crypto
            .createHmac('sha512', apiSecret)
            .update(query_string)
            .digest('hex');
    }
    signature(query_string) {
        return crypto
            .createHmac('sha256', apiSecret)
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
}