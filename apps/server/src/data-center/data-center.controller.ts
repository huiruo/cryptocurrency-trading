import { Body, Controller, Get, Post } from '@nestjs/common';
import { get } from 'lodash';
// import { ConfigService } from '@nestjs/config';
import { Result } from 'src/common/result.interface';
import { AssetType, MergeSpotStrategyParams, SymbolType, SyncSpotOrderParams } from 'src/common/types';
import { DataCenterService } from './data-center.service';
import { SpotOrder } from './spot-order.entity';
import { StrategiesOrder } from './strategies-order.entity';

export interface Page {
  currentPage: number;
  pageSize: number;
}

@Controller('data/center')
export class DataCenterController {
  constructor(
    private readonly DataCenterService: DataCenterService, // private configService: ConfigService,
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
    const data = await this.DataCenterService.getCoin(
      page.currentPage,
      page.pageSize,
    );
    return data;
  }

  // =========== Balances start ===========
  @Get('syncBalances')
  async syncAccountInfo(): Promise<Result> {
    return await this.DataCenterService.syncBalances();
  }

  @Get('balances')
  async getAccountInfo(): Promise<Result> {
    return await this.DataCenterService.getBalances();
  }
  // =========== Balances end ===========

  // =========== future start ===========
  @Get('syncFutureOrder')
  async futuresAllOrders(): Promise<Result> {
    return await this.DataCenterService.futuresAllOrders();
  }

  @Post('futureOrders')
  async getFuturesOrders(@Body() page: Page): Promise<Result> {
    return await this.DataCenterService.getFutureOrders(
      page.currentPage,
      page.pageSize,
    );
  }

  @Get('futuresBatchOrders')
  async futuresBatchOrders(): Promise<Result> {
    return await this.DataCenterService.futuresBatchOrders();
  }
  // =========== future end ===========

  // =========== spot start ===========
  // =========== spot start ===========
  @Get('asset')
  async getAssets(): Promise<Result> {
    return await this.DataCenterService.getAssetList();
  }

  @Post('spotOrders')
  async getSpotOrder(@Body() page: Page): Promise<Result> {
    return await this.DataCenterService.getSpotOrder(
      page.currentPage,
      page.pageSize,
    );
  }

  @Post('addAsset')
  async addAsset(@Body() asset: AssetType): Promise<Result> {
    return await this.DataCenterService.addAsset(asset);
  }

  @Post('syncSpotOrder')
  async syncSpotOrder(@Body() asset: SyncSpotOrderParams): Promise<Result> {
    return await this.DataCenterService.syncSpotOrder(asset);
  }

  @Get('spotOpenOrders')
  async getSpotOpenOrders(): Promise<Result> {
    return await this.DataCenterService.getSpotOpenOrders();
  }

  @Get('spotAllOrders')
  async getSpotAllOrders(): Promise<Result> {
    return await this.DataCenterService.getSpotAllOrders();
  }

  @Post('resetSpotOrderStatus')
  async resetSpotOrderStatus(@Body() spotOrder: SpotOrder): Promise<Result> {
    return await this.DataCenterService.resetSpotOrderStatus(spotOrder);
  }
  // =========== spot end ===========
  // =========== spot end ===========

  // =========== Strategies Order start ===========
  @Post('createStrategy')
  async createStrategy(@Body() spotOrder: SpotOrder[]): Promise<Result> {
    return await this.DataCenterService.createStrategy(spotOrder);
  }

  @Post('mergeSpotStrategy')
  async mergeSpotStrategy(@Body() params: MergeSpotStrategyParams): Promise<Result> {
    const { spotOrders, strategyOrder } = params

    return await this.DataCenterService.mergeSpotStrategy(
      spotOrders,
      strategyOrder,
    );
  }

  @Post('closeSpotStrategy')
  async closeSpotStrategy(@Body() spotOrders: SpotOrder[]): Promise<Result> {
    return await this.DataCenterService.closeSpotStrategy(spotOrders);
  }

  @Post('strategiesOrder')
  async getStrategiesOrder(@Body() page: Page): Promise<Result> {
    return await this.DataCenterService.getStrategiesOrder(
      page.currentPage,
      page.pageSize,
    );
  }

  @Post('symbolPrice')
  async getSymbolPrice(@Body() params: SymbolType): Promise<any> {
    return await this.DataCenterService.getSpotPrice(params.symbol);
  }

  @Post('strategyPrice')
  async syncStrategyPrice(@Body() params: StrategiesOrder): Promise<any> {
    return await this.DataCenterService.syncStrategyPrice(params);
  }
  // =========== Strategies Order end ===========
}
