import { Controller, Get } from '@nestjs/common'
import { MarketCenterService } from './market.center.service'
import { ResultWithData } from 'src/types'
import { Account } from 'binance-api-node'
import { StatisticsAccountRes } from './market.center.type'

@Controller('market.center')
export class MarketCenterController {
  constructor(private readonly marketCenterService: MarketCenterService) {}

  @Get('syncBalances')
  async syncBalances(): Promise<ResultWithData<Account>> {
    return await this.marketCenterService.syncBalances()
  }

  @Get('statisticsAccount')
  async statisticsAccount(): Promise<ResultWithData<StatisticsAccountRes>> {
    return await this.marketCenterService.statisticsAccount()
  }
}
