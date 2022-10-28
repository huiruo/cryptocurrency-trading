import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { TraderApi } from 'src/entity/api.entity';
import { TradeAsset } from 'src/entity/asset.entity';
import { DailyProfit } from 'src/entity/daily.profit.entity';
import { SpotOrder } from 'src/entity/spot-order.entity';
import { StrategiesOrder } from 'src/entity/strategies-order.entity';
import { StrategyOrderId } from 'src/entity/strategy-orderid.entity';
import { BaseServiceBiance } from 'src/utils/base-service-biance';
import { Repository } from 'typeorm';

@Injectable()
export class SpotService {
  private client: BaseServiceBiance;
  constructor(
    private configService: ConfigService,

    @InjectRepository(SpotOrder)
    private readonly spotOrderRepo: Repository<SpotOrder>,

    @InjectRepository(StrategiesOrder)
    private readonly strategiesOrderRepo: Repository<StrategiesOrder>,

    @InjectRepository(StrategyOrderId)
    private readonly strategyOrderIdRepo: Repository<StrategyOrderId>,

    @InjectRepository(TradeAsset)
    private readonly tradeAssetRepo: Repository<TradeAsset>,

    @InjectRepository(TraderApi)
    private readonly traderApiRepo: Repository<TraderApi>,

    @InjectRepository(DailyProfit)
    private readonly dailyProfitRepo: Repository<DailyProfit>,
  ) {
    this.initBinanceApi();
  }

  async initBinanceApi() {
    const apiKey = this.configService.get<string>('binanceApiKey');
    const secretKey = this.configService.get<string>('binanceSecretKey');
    if (apiKey && secretKey) {
      const baseServiceBinance = new BaseServiceBiance(apiKey, secretKey);
      this.client = baseServiceBinance;
    } else {
      console.log('=== Api key do not exist ===');
    }
  }

}
