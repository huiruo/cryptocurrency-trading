import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Result } from 'src/common/result.interface';
import { DataCenterService } from './data-center.service';

@Controller('data/center')
export class DataCenterController {
    constructor(
        private readonly DataCenterService:DataCenterService,
        private configService: ConfigService,
    ){
    }

    @Post('addCode')
    // async createUser(@Body() symbol: any): Promise<Result> {
    async createUser(@Body() symbol: any) {
      console.log('controller--->',symbol);
      const data = await this.DataCenterService.addSymbol(symbol);
      return { code:200, message:'ok',data}; 
      /*
        // if(symbol){
            const data = await this.DataCenterService.addSymbol(symbol);
            return { code:200, message:'ok',data}; 
        // }else{
        //     return { code:500, message:'请求参数错误',data:null}; 
        // }
      */
    }
}
