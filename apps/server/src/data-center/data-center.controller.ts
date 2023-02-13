import { Body, Controller, Get, Post } from '@nestjs/common';
import { Result } from 'src/common/result.interface';
import {
  AssetType,
  PaginationType
} from 'src/common/types';
import { DataCenterService } from './data-center.service';

// export interface Page {
//   currentPage: number;
//   pageSize: number;
// }

@Controller('data/center')
export class DataCenterController {
  constructor(
    private readonly DataCenterService: DataCenterService, // private configService: ConfigService,
  ) { }

  @Post('addCode')
  async addCode(@Body() symbol: any): Promise<Result> {
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
  async getCoin(@Body() page: PaginationType): Promise<Result> {
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

  @Get('userWebsocket')
  async testWebsocket(): Promise<Result> {
    return await this.DataCenterService.startUserWebsocket();
  }

  @Get('unsubscribeUserWs')
  async unsubscribeUserWs(): Promise<Result> {
    return await this.DataCenterService.unsubscribeUserWs();
  }

  @Get('unsubscribePositionWs')
  async unsubscribePositionWs(): Promise<Result> {
    return await this.DataCenterService.unsubscribePositionWs();
  }

  @Get('balances')
  async getAccountInfo(): Promise<Result> {
    return await this.DataCenterService.getBalances();
  }
  // =========== Balances end ===========

  @Get('asset')
  async getAssets(): Promise<Result> {
    return await this.DataCenterService.getAssetList();
  }

  @Post('addAsset')
  async addAsset(@Body() asset: AssetType): Promise<Result> {
    return await this.DataCenterService.addAsset(asset);
  }

  @Get('getCandle')
  async getCandle(): Promise<Result> {
    return await this.DataCenterService.getCandle();
  }
}
