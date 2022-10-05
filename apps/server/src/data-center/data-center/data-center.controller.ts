import { Body, Controller, Get, Post } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { Result } from 'src/common/result.interface';
import { SymbolType } from 'src/common/types';
import { DataCenterService } from './data-center.service';
import { SpotOrder } from './spot-order.entity';
import { StrategiesOrder } from './strategies-order.entity';

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

  @Post('mergeSpotStrategies')
  async mergeSpotStrategies(@Body() spotOrders: SpotOrder[]): Promise<Result> {
    return await this.DataCenterService.mergeSpotStrategies(spotOrders)
  }

  @Post('closeSpotStrategy')
  async closeSpotStrategy(@Body() spotOrders: SpotOrder[]): Promise<Result> {
    return await this.DataCenterService.closeSpotStrategy(spotOrders)
  }
  // =========== spot end ===========

  // =========== Strategies Order start ===========
  @Post('createStrategies')
  async createStrategiesOrder(@Body() spotOrder: SpotOrder): Promise<Result> {
    return await this.DataCenterService.createStrategiesOrder(spotOrder)
  }

  @Post('strategiesOrder')
  async getStrategiesOrder(@Body() page: Page): Promise<Result> {

    return await this.DataCenterService.getStrategiesOrder(page.currentPage, page.pageSize)
  }

  @Post('createStrategies')
  async mergeStrategy(@Body() page: Page): Promise<Result> {

    return await this.DataCenterService.mergeStrategy(page.currentPage, page.pageSize)
  }

  @Post('symbolPrice')
  async getSymbolPrice(@Body() params: SymbolType): Promise<any> {
    return await this.DataCenterService.getSpotPrice(params.symbol)
  }

  @Post('strategyPrice')
  async syncStrategyPrice(@Body() params: StrategiesOrder): Promise<any> {
    return await this.DataCenterService.syncStrategyPrice(params)
  }
  // =========== Strategies Order end ===========
}
