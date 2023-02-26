import { Controller, Get } from '@nestjs/common';
import { Result } from 'src/common/result.interface';
import { MarketCenterService } from './market-center.service';

@Controller('market')
export class MarketCenterController {
  constructor(
    private readonly marketCenterService: MarketCenterService, // private configService: ConfigService,
  ) { }

  @Get('startWs')
  async syncAccountInfo(): Promise<Result> {
    return await this.marketCenterService.startUserWebsocket();
  }
}
