import { Body, Controller, Get, Post } from '@nestjs/common'
import { MarketCenterService } from './market.center.service'
import { PaginationType, Result, ResultWithData } from 'src/types'
import { Account } from 'binance-api-node'
import {
  AssetType,
  IMonitorAsset,
  StatisticsAccountRes,
} from './market.center.type'
import { TradeAsset } from '../entity/asset.entity'

@Controller('market.center')
export class MarketCenterController {
  constructor(private readonly marketCenterService: MarketCenterService) {}

  @Get('syncBalances')
  async syncBalances(): Promise<ResultWithData<Account>> {
    return await this.marketCenterService.syncBalances()
  }

  @Get('monitorwallet')
  async monitorwallet(): Promise<ResultWithData<IMonitorAsset>> {
    return await this.marketCenterService.monitorwallet()
  }

  @Get('statisticsAccount')
  async statisticsAccount(): Promise<ResultWithData<StatisticsAccountRes>> {
    return await this.marketCenterService.statisticsAccount()
  }

  @Post('addAsset')
  async addAsset(@Body() asset: AssetType): Promise<Result> {
    return await this.marketCenterService.addAsset(asset)
  }

  @Post('assets')
  async getAssets(
    @Body() page: PaginationType,
  ): Promise<ResultWithData<TradeAsset[]>> {
    return await this.marketCenterService.getAssets(page)
  }
}
