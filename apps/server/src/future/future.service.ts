import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FuturesOrder } from 'doc/03-futures-1/futures-order.entity';
import { get, isEmpty } from 'lodash';
import { Result } from 'src/common/result.interface';
import { TraderApi } from 'src/entity/api.entity';
import { TradeAsset } from 'src/entity/asset.entity';
import { DailyProfit } from 'src/entity/daily.profit.entity';
import { StrategyOrder } from 'src/entity/strategy-order.entity';
import { StrategyOrderId } from 'src/entity/strategy-orderid.entity';
import { BaseServiceBiance } from 'src/utils/base-service-biance';
import { Repository } from 'typeorm';

@Injectable()
export class FutureService {
  private client: BaseServiceBiance;
  constructor(
    private configService: ConfigService,

    @InjectRepository(FuturesOrder)
    private readonly futuresOrderRepo: Repository<FuturesOrder>,

    @InjectRepository(StrategyOrder)
    private readonly strategiesOrderRepo: Repository<StrategyOrder>,

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

  private async createfutureOrderUtil(order: FuturesOrder) {
    await this.futuresOrderRepo.save(order);
  }

  private async findFutureOrderUtil(orderId: number): Promise<FuturesOrder> {
    const sql = `select symbol,orderId from futures_order where orderId='${orderId}'`;
    const futureOrder = await this.futuresOrderRepo.query(sql);
    return get(futureOrder, '[0]', {});
  }


  async futuresAllOrders(): Promise<Result> {
    const info = await this.client.futuresAllOrders();
    if (Array.isArray(info)) {
      info.forEach(async (item) => {
        const { orderId } = item;
        // mock userId
        item.userId = 1;
        const existFutureOrder = await this.findFutureOrderUtil(orderId);
        if (isEmpty(existFutureOrder)) {
          console.log('=== not exist FutureOrder,insert... ===');
          await this.createfutureOrderUtil(item);
        } else {
          console.log('=== exist FutureOrder,skip... ===');
        }
      });
    }

    return { code: 200, message: 'ok', data: info };
  }

  async getFutureOrders(
    currentPage: number,
    pageSize: number,
  ): Promise<Result> {
    const sql = `select * from futures_order order by updateTime desc limit ${(currentPage - 1) * pageSize
      },${pageSize}`;

    const res = await this.futuresOrderRepo.query(sql);
    return { code: 200, message: 'ok', data: res };
  }

  /*
  [{
      "asset": "USDT",
      "walletBalance": "762.40744601",
      "unrealizedProfit": "-37.09661096",
      "marginBalance": "725.31083505",
      "maintMargin": "5.95196795",
      "initialMargin": "743.99599451",
      "positionInitialMargin": "743.99599451",
      "openOrderInitialMargin": "0.00000000",
      "maxWithdrawAmount": "0.82715543",
      "crossWalletBalance": "0.82715543",
      "crossUnPnl": "0.00000000",
      "availableBalance": "0.82715543",
      "marginAvailable": true,
      "updateTime": 1664121600397
  },]
  */
  async futuresAccountInfo(): Promise<Result> {
    const info = await this.client.futuresAccountInfo();

    return { code: 200, message: 'ok', data: info };
  }

  async futuresBatchOrders(): Promise<Result> {
    const info = await this.client.futuresBatchOrders();

    return { code: 200, message: 'ok', data: info };
  }
  // =========== future end ===========
}

