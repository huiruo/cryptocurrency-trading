import { Body, Controller, Get, Post } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { Result } from 'src/common/result.interface';
import { DataCenterService } from './data-center.service';

export interface Page {
  currentPage: number
  pageSize: number
}

@Controller('data/center')
export class DataCenterController {
  constructor(
    private readonly DataCenterService: DataCenterService,
    // private configService: ConfigService,
  ) { }

  @Post('addCode')
  async addCode(@Body() symbol: any): Promise<Result> {
    console.log('addCode', symbol);

    const data = await this.DataCenterService.addCode(symbol);
    return data;
  }

  @Get('codelist')
  async getCodelist(): Promise<Result> {
    const data = await this.DataCenterService.getCodelist();
    return data;
  }

  @Post('syncCoinInfo')
  async syncCoinInfo(@Body() args: any): Promise<Result> {
    /*
    {"code":"polkadot100","addlink":1,"webp":1}
    {"code":"bitcoin"}
    {"code":"polkadot100"}
    */
    console.log('code', args);
    const data = await this.DataCenterService.syncCoinInfo(args.code);
    console.log('data', data);
    return data;
  }

  @Post('getCoin')
  async getCoin(@Body() page: Page): Promise<Result> {
    const data = await this.DataCenterService.getCoin(page.currentPage, page.pageSize);
    return data;
  }


  // =========== trader test ===========
  @Get('syncBalances')
  async syncAccountInfo(): Promise<Result> {
    return await this.DataCenterService.syncAccountInfo()
  }

  @Get('balances')
  async getAccountInfo(@Body() page: Page): Promise<Result> {
    return await this.DataCenterService.getAccountInfo()
  }

}
