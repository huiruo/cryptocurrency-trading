import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { get, isEmpty } from 'lodash';
import { Result } from 'src/common/result.interface';
import { SearchParmas, SyncSpotOrderParams } from 'src/common/types';
import { TraderApi } from 'src/entity/api.entity';
import { TradeAsset } from 'src/entity/asset.entity';
import { DailyProfit } from 'src/entity/daily.profit.entity';
import { SpotOrder } from 'src/entity/spot-order.entity';
import { StrategyOrder } from 'src/entity/strategy-order.entity';
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

  private async deleteStrategyOrderId(strategyId: string) {
    const sql = `delete from strategy_orderid WHERE strategyId = "${strategyId}"`;

    await this.strategyOrderIdRepo.query(sql);
  }

  private async deleteStrategyOrder(strategyId: string) {
    const sql = `delete from strategy_order WHERE strategyId = "${strategyId}"`;

    await this.strategyOrderIdRepo.query(sql);
  }

  private async findSpotOrderUtil(orderId: number): Promise<SpotOrder> {
    const sql = `select symbol,orderId from spot_order where orderId='${orderId}'`;
    const futureOrder = await this.spotOrderRepo.query(sql);
    return get(futureOrder, '[0]', {});
  }

  private async savaSpotOrderUtil(spotOrder: SpotOrder) {
    await this.spotOrderRepo.save(spotOrder);
  }


  async getSpotOrder(searchParmas: SearchParmas): Promise<Result> {
    const { currentPage, pageSize, symbol } = searchParmas;
    let sql = '';
    let pageSql = ''
    if (symbol) {
      sql = `select * from spot_order where symbol ="${symbol}" order by time desc limit ${(currentPage - 1) * pageSize
        },${pageSize}`;
      pageSql = `select count(1) as total from spot_order where symbol ="${symbol}"`;
    } else {
      pageSql = 'select count(1) as total from spot_order;'
      sql = `select * from spot_order order by time desc limit ${(currentPage - 1) * pageSize
        },${pageSize}`;
    }


    const res = await this.spotOrderRepo.query(sql);
    const pageRes = await this.spotOrderRepo.query(pageSql);

    return {
      code: 200, message: 'ok', data:
      {
        total: Number(get(pageRes, '[0].total', 0)),
        res: res
      }
    };
  }

  async syncSpotOrder(asset: SyncSpotOrderParams): Promise<Result> {
    const info: any = await this.client.myTrades({
      symbol: asset.name,
      recvWindow: 59999,
      // endTime: 1664467199999,
      // startTime: 1662566400000,
    });

    info.forEach(async (item) => {
      const { orderId } = item as any;
      // mock userId
      item.userId = 1;
      const existSpotOrder = await this.findSpotOrderUtil(orderId);
      if (isEmpty(existSpotOrder)) {
        console.log('=== not exist spotOrder,insert... ===');
        this.savaSpotOrderUtil(item);
      } else {
        console.log('=== exist spotOrder,skip... ===');
      }
    });

    return { code: 200, message: 'ok', data: null };
  }

  async resetSpotOrderStatus(spotOrder: SpotOrder): Promise<Result> {
    const { strategyId } = spotOrder;

    const sql = `update spot_order set strategyId="",strategyStatus = 0  WHERE strategyId = "${strategyId}"`;
    await this.spotOrderRepo.query(sql);

    await this.deleteStrategyOrder(strategyId);

    await this.deleteStrategyOrderId(strategyId);

    return { code: 200, message: 'ok', data: null };
  }


  async getSpotOpenOrders(): Promise<Result> {
    const info = await this.client.openOrders({ symbol: 'BTCUSDT' });

    return { code: 200, message: 'ok', data: info };
  }

  async getSpotAllOrders(): Promise<Result> {
    const info = await this.client.allOrders({
      // symbol: 'BTCUSDT',
      symbol: 'BTCBUSD',
      // endTime: 1664467199999,
      // startTime: 1662566400000,
    });

    return { code: 200, message: 'ok', data: info };
  }

}
