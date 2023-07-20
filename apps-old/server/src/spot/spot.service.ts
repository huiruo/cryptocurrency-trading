import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { get, isEmpty } from 'lodash';
import { Result } from 'src/common/result.interface';
import { SearchParmas, SyncSpotOrderParams } from 'src/common/types';
import { SpotOrder } from 'src/entity/spot-order.entity';
import { StrategyOrderId } from 'src/entity/strategy-orderid.entity';
import { BinanceService } from 'src/utils/binance-service';
import { Repository } from 'typeorm';

@Injectable()
export class SpotService {
  private client: BinanceService;
  constructor(
    private configService: ConfigService,

    @InjectRepository(SpotOrder)
    private readonly spotOrderRepo: Repository<SpotOrder>,

    @InjectRepository(StrategyOrderId)
    private readonly strategyOrderIdRepo: Repository<StrategyOrderId>,
  ) {
    this.initBinanceApi();
  }

  async initBinanceApi() {
    /*
    const apiKey = this.configService.get<string>('binanceApiKey');
    const secretKey = this.configService.get<string>('binanceSecretKey');
    if (apiKey && secretKey) {
      this.client = BinanceService.getInstance();
    } else {
      console.log('=== Api key do not exist ===');
    }
    */
    this.client = BinanceService.getInstance();
  }

  private async deleteStrategyOrderId(strategyId: string) {
    const sql = `delete from strategy_orderid WHERE strategyId = "${strategyId}"`;

    await this.strategyOrderIdRepo.query(sql);
  }

  private async deleteStrategyOrder(strategyId: string) {
    const sql = `delete from strategy_order WHERE strategyId = "${strategyId}"`;

    await this.strategyOrderIdRepo.query(sql);
  }

  private async findSpotOrderUtil(id: number): Promise<SpotOrder> {
    const sql = `select symbol,orderId from spot_order where id='${id}'`;
    const futureOrder = await this.spotOrderRepo.query(sql);
    return get(futureOrder, '[0]', {});
  }

  private async savaSpotOrderUtil(spotOrder: SpotOrder, userId: number) {
    spotOrder.userId = userId
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

  async syncSpotOrder(spotOrderParams: SyncSpotOrderParams): Promise<Result> {
    const { symbol, startTime, endTime } = spotOrderParams
    console.log('myTrades', spotOrderParams)
    const data = await BinanceService.getInstance().getMyTrades({ symbol, startTime, endTime })
    // if (!isSucceed) {
    //   return { code: 599, message: msg, data: null };
    // }

    console.log('spotOrderParams:', spotOrderParams, 'info:', data.length);

    const userId = 1;
    for (const item of data) {
      const { id } = item as any;
      // mock userId
      const existSpotOrder = await this.findSpotOrderUtil(id);
      if (isEmpty(existSpotOrder)) {
        console.log('=== not exist spotOrder,insert... ===');
        // this.savaSpotOrderUtil(item, userId);
      } else {
        console.log('=== exist spotOrder,skip... ===');
      }
    };

    return { code: 200, message: 'ok', data: data };
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
      symbol: 'BTCBUSD',
    });

    return { code: 200, message: 'ok', data: info };
  }
}
