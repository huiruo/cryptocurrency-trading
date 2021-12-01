import { Controller,Body,Post,Get } from '@nestjs/common';
import { UserService } from './user.service';
import got from 'got';
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
}