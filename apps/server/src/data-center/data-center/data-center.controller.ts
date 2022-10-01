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


  // =========== Balances start ===========
  @Get('syncBalances')
  async syncAccountInfo(): Promise<Result> {
    return await this.DataCenterService.syncBalances()
  }

  @Get('balances')
  async getAccountInfo(): Promise<Result> {
    return await this.DataCenterService.getBalances()
  }
  // =========== Balances end ===========

  // =========== future start ===========
  @Get('syncFutureOrder')
  async futuresAllOrders(): Promise<Result> {

    return await this.DataCenterService.futuresAllOrders()
  }

  @Post('futureOrders')
  async getFuturesOrders(@Body() page: Page): Promise<Result> {

    return await this.DataCenterService.getFutureOrders(page.currentPage, page.pageSize)
  }

  @Get('futuresBatchOrders')
  async futuresBatchOrders(): Promise<Result> {

    return await this.DataCenterService.futuresBatchOrders()
  }
  // =========== future end ===========

  // =========== spot start ===========
  @Post('spotOrders')
  async getSpotOrder(@Body() page: Page): Promise<Result> {

    return await this.DataCenterService.getSpotOrder(page.currentPage, page.pageSize)
  }

  @Get('syncSpotOrder')
  async syncSpotOrder(): Promise<Result> {

    return await this.DataCenterService.syncSpotOrder()
  }

  @Get('spotOpenOrders')
  async getSpotOpenOrders(): Promise<Result> {

    return await this.DataCenterService.getSpotOpenOrders()
  }

  @Get('spotAllOrders')
  async getSpotAllOrders(): Promise<Result> {

    return await this.DataCenterService.getSpotAllOrders()
  }
  // =========== spot end ===========
}
