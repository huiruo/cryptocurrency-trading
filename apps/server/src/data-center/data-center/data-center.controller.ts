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
    return await this.DataCenterService.syncCoinInfo(args.code);
  }

  @Post('getCoin')
  async getCoin(@Body() page: Page): Promise<Result> {
    const data = await this.DataCenterService.getCoin(page.currentPage, page.pageSize);
    return data;
  }


  // =========== Balances test ===========
  @Get('syncBalances')
  async syncAccountInfo(): Promise<Result> {
    return await this.DataCenterService.syncBalances()
  }

  @Get('balances')
  async getAccountInfo(): Promise<Result> {
    return await this.DataCenterService.getBalances()
  }
  // =========== Balances test ===========

  @Get('futuresTest')
  async futuresTest(): Promise<Result> {

    return await this.DataCenterService.futuresTest()
  }
}
