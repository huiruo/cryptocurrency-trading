import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { get, isEmpty } from 'lodash';
import { Result } from 'src/common/result.interface';
import { createRequest } from 'src/common/binance-connector/helpers/utils';
import { ConfigService } from '@nestjs/config';
import { CoinCode } from './data-center.entity';
import { Coin } from './coin.entity';
import { CoinAddition } from './coin.addition.entity';
import { DayKline } from './day.kline.entity';
import { CoinDevMember } from './coin.member.entity';
import { BaseServiceBiance } from 'src/utils/base-service-biance';
import { Balances } from './balances.entity';
import { FuturesOrder } from './futures-order.entity';
import { SpotOrder } from './spot-order.entity';
import { StrategiesOrder } from './strategies-order.entity';
import { nanoid } from 'nanoid';
import { StrategyOrderId } from './strategy-orderid.entity';
import {
  AssetType,
  CalculateCloseStrategyOrderType,
  CalculateStrategiesOrderType,
  FiterStrategyOrderType,
  SearchParmas,
  StrategyProfit,
  SyncSpotOrderParams,
} from 'src/common/types';
import { TradeAsset } from './asset.entity';
import { TraderApi } from './api.entity';
import { DailyProfit } from './daily.profit.entity';
import { formatTimestamp } from 'src/utils/utils';

@Injectable()
export class DataCenterService {
  private client: BaseServiceBiance;
  constructor(
    private configService: ConfigService,

    @InjectRepository(CoinCode)
    private readonly coinCodeRepo: Repository<CoinCode>,

    @InjectRepository(Coin)
    private readonly coninRepo: Repository<Coin>,

    @InjectRepository(CoinAddition)
    private readonly coinAdditionRepo: Repository<CoinAddition>,

    @InjectRepository(DayKline)
    private readonly dayKlineRepo: Repository<DayKline>,

    @InjectRepository(CoinDevMember)
    private readonly coninDevMemberRepo: Repository<CoinDevMember>,

    @InjectRepository(Balances)
    private readonly balancesRepo: Repository<Balances>,

    @InjectRepository(FuturesOrder)
    private readonly futuresOrderRepo: Repository<FuturesOrder>,

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

  async addCode(data: any): Promise<Result> {
    const { symbol } = data;

    const symbolData = await this.getSymbol(symbol);
    if (isEmpty(symbolData)) {
      const res = await this.coinCodeRepo.save(data);
      return { code: 200, message: 'ok', data: res };
    } else {
      return { code: 500, message: 'Duplicate data', data: null };
    }
  }

  async getCodelist(): Promise<Result> {
    const res = await this.coinCodeRepo.find();
    return { code: 200, message: 'ok', data: res };
  }

  async getCoin(currentPage: number, pageSize: number): Promise<Result> {
    const sql = `select * from coin order by ranked asc limit ${(currentPage - 1) * pageSize
      },${pageSize}`;

    return await this.coninRepo.query(sql);
  }

  async getSymbol(symbol: string) {
    const sql = `select * from coin_code where symbol='${symbol}'`;
    const symbolData = await this.coinCodeRepo.query(sql);

    return get(symbolData, '[0]', {});
  }

  async syncCoinInfo(coinCode: string): Promise<Result> {
    const coinBaseURL = this.configService.get<string>('coinBaseURL');
    if (!coinBaseURL) {
      return { code: 500, message: 'URL dont exist', data: null };
    }

    /*
    {"code":"polkadot100","addlink":1,"webp":1}
    */
    const config = {
      options: { code: coinCode, addlink: 1, webp: 1 },
      baseURL: coinBaseURL,
      url: '',
      apiKey: '',
      method: 'POST',
      proxyUrl: '',
    };

    const gotData: any = await createRequest(config);

    const { statusCode } = gotData;

    if (statusCode === 200) {
      if (get(gotData, 'data.code', '') !== 200) {
        return { code: 500, message: get(gotData, 'data.msg', ''), data: null };
      }

      const res = get(gotData, 'data.data', {});
      const {
        rateRemark = '',
        value: allot_value = '',
        name: allot_name = '',
      } = get(res, 'coinallot.[0]', {});
      const {
        code,
        symbol,
        name_zh,
        rank,
        price,
        holders,
        maxsupply,
        is_infinity_supply,
        circulationRate,
        supply,
        marketcap,
        marketcap_total_usd,
        // marketcap_total_rnb,
        marketcappercent,
        supportfutures,
        supportetf,
        supportspots,
        haslongshort,
        icoprice,
        openprice,
        openprice_percent,
        his_highest_usd,
        his_lowest_usd,
        his_highprice_time,
        his_lowprice_time,
        prooftype,
        // allot_name,
        // allot_value,
        // rateRemark,
        publicchain,
        miningstate,
        blockreward,
        firstblocktime,
        blockspleed,
        halvetime,
        halvereward,
        online_time,
        exchange_listcount,
        logo_small,
        updatetime,
        /* coinAddition */
        siteurl,
        coindesc,
        codelink,
        logo,
        telegramlink,
        facebook,
        twitter,
        explorer,
        redditlink,
        algorithm,
        biyong,
        white_paper,
        difftime,
        supportoptions,
        is_refresh,
        not_public,
        btccorrelation,
        /* coinAddition end */
        /* day_kline*/
        totalSupply,
        turn_over,
        ratio,
        high_week,
        low_week,
        open,
        price_cny,
        high,
        low,
        amount_day,
        vol_btc,
        vol,
        vol_percent,
        ticker_num,
        change,
        change_percent,
        /* day_kline end */
      } = res;

      const coin = {
        code,
        symbol,
        name_zh,
        ranked: rank,
        price: price.toString(),
        holders,
        maxsupply,
        is_infinity_supply,
        circulationRate,
        supply,
        marketcap: marketcap_total_usd,
        marketcap_total_rnb: marketcap,
        marketcappercent,
        supportfutures,
        supportetf,
        supportspots,
        haslongshort,
        icoprice: icoprice.toString(),
        openprice: openprice.toString(),
        openprice_percent,
        his_highest_usd: his_highest_usd.toString(),
        his_lowest_usd: his_lowest_usd.toString(),
        his_highprice_time,
        his_lowprice_time,
        prooftype,
        allot_name,
        allot_value,
        rateRemark,
        publicchain,
        miningstate,
        blockreward,
        firstblocktime,
        blockspleed,
        halvetime,
        halvereward,
        online_time,
        exchange_listcount,
        logo_small,
        updatetime,
        /* kline data start*/
        totalSupply,
        turn_over,
        ratio,
        high_week: high_week.toString(),
        low_week: low_week.toString(),
        open: open.toString(),
        high: high.toString(),
        low: low.toString(),
        amount_day: amount_day.toString(),
        vol_24: vol_btc.toString(),
        vol: vol.toString(),
        vol_percent,
        ticker_num,
        change: change.toString(),
        change_percent: change_percent.toString(),
        /* kline data end*/
      };

      const coinAddition = {
        code,
        symbol,
        siteurl,
        coindesc,
        codelink,
        logo,
        telegramlink,
        facebook,
        twitter,
        explorer,
        redditlink,
        algorithm: algorithm || '',
        biyong,
        white_paper,
        difftime,
        supportoptions,
        is_refresh,
        not_public,
        btccorrelation,
        updatetime,
      };

      const dayKline = {
        code,
        symbol,
        updatetime,
        price: price.toString(),
        marketcappercent,
        circulationRate,
        holders,
        // only for kline
        totalSupply,
        turn_over,
        ratio,
        high_week: high_week.toString(),
        low_week: low_week.toString(),
        open: open.toString(),
        high: high.toString(),
        low: low.toString(),
        amount_day: amount_day.toString(),
        vol_24: vol_btc.toString(),
        vol: vol.toString(),
        vol_percent,
        ticker_num,
        change: change.toString(),
        change_percent: change_percent.toString(),
      };

      const coinData = await this.findCoin(coinCode);
      if (isEmpty(coinData)) {
        console.log('=== add ===');

        /* insert dev members */
        const members: CoinDevMember[] = get(res, 'members', []).map((item) => {
          return {
            code,
            ...item,
          };
        });
        this.coninDevMemberRepo.insert(members);

        /* insert coin addition */
        this.coinAdditionRepo.insert(coinAddition);

        /* insert day kline */
        this.dayKlineRepo.insert(dayKline);

        /* insert coin */
        const createRes = await this.coninRepo.save(coin);

        return { code: 200, message: 'added successfully', data: createRes };
      } else {
        console.log('=== update ===');
        const updateRes = await this.coninRepo.update({ code: coinCode }, coin);

        return { code: 200, message: 'update completed', data: coin };
      }
    } else {
      return { code: 500, message: 'request api error', data: null };
    }
  }

  async findCoin(code: string): Promise<Result> {
    const sql = `select symbol,code from coin where code='${code}'`;
    const res = await this.coninRepo.query(sql);

    return res;
  }

  // =========== Balances start ===========
  async getBalances(): Promise<Result> {
    const res = await this.balancesRepo.find();
    return { code: 200, message: 'ok', data: res };
  }

  private async createBalancesUtil(order: FuturesOrder) {
    await this.balancesRepo.save(order);
  }

  async syncBalances(): Promise<Result> {
    try {
      const res = await this.client.getAccountInfo();
      const balances = get(res, 'balances', []).filter(
        (item) => Number(item.free) !== 0,
      );

      const sql = `TRUNCATE TABLE balances`;
      await this.coninRepo.query(sql);

      //{asset: 'ETH', free: '0.00003934', locked: '0.00000000'}
      balances.forEach(async (item) => {
        // mock userId
        item.userId = 1;
        this.createBalancesUtil(item);
      });

      return { code: 200, message: 'ok', data: balances };
    } catch (error) {
      return { code: 500, message: 'sync balances error', data: null };
    }
  }
  // =========== Balances end ===========

  // =========== future start ===========
  private async createfutureOrderUtil(order: FuturesOrder) {
    await this.futuresOrderRepo.save(order);
  }

  private async findFutureOrderUtil(orderId: number): Promise<FuturesOrder> {
    const sql = `select symbol,orderId from futures_order where orderId='${orderId}'`;
    const futureOrder = await this.futuresOrderRepo.query(sql);
    return get(futureOrder, '[0]', {});
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

  // =========== spot start ===========
  async getAssetList(): Promise<Result> {
    const res = await this.tradeAssetRepo.find();

    return { code: 200, message: 'ok', data: res };
  }

  private async savaSpotOrderUtil(spotOrder: SpotOrder) {
    await this.spotOrderRepo.save(spotOrder);
  }

  private async findSpotOrderUtil(orderId: number): Promise<FuturesOrder> {
    const sql = `select symbol,orderId from spot_order where orderId='${orderId}'`;
    const futureOrder = await this.spotOrderRepo.query(sql);
    return get(futureOrder, '[0]', {});
  }

  private async getAsset(name: string): Promise<TradeAsset> {
    const sql = `select * from asset where name='${name}'`;
    const symbolData = await this.tradeAssetRepo.query(sql);

    return get(symbolData, '[0]', {});
  }

  async addAsset(asset: AssetType): Promise<Result> {
    const { name } = asset;

    const assetData = await this.getAsset(name);
    if (isEmpty(assetData)) {
      const res = await this.tradeAssetRepo.save(asset);
      return { code: 200, message: 'ok', data: res };
    } else {
      return { code: 500, message: 'Duplicate asset', data: null };
    }
  }

  async getSpotOrder(searchParmas: SearchParmas): Promise<Result> {
    const { currentPage, pageSize, symbol } = searchParmas;
    let sql = '';
    if (symbol) {
      sql = `select * from spot_order where symbol ="${symbol}" order by time desc limit ${(currentPage - 1) * pageSize
        },${pageSize}`;
    } else {
      sql = `select * from spot_order order by time desc limit ${(currentPage - 1) * pageSize
        },${pageSize}`;
    }

    const res = await this.spotOrderRepo.query(sql);
    return { code: 200, message: 'ok', data: res };
  }

  async syncSpotOrder(asset: SyncSpotOrderParams): Promise<Result> {
    const info: any = await this.client.myTrades({
      // symbol: 'BTCUSDT',
      // symbol: 'BTCBUSD',
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

  async getSpotAllOrders(): Promise<Result> {
    const info = await this.client.allOrders({
      // symbol: 'BTCUSDT',
      symbol: 'BTCBUSD',
      // endTime: 1664467199999,
      // startTime: 1662566400000,
    });

    return { code: 200, message: 'ok', data: info };
  }

  async getSpotOpenOrders(): Promise<Result> {
    const info = await this.client.openOrders({ symbol: 'BTCUSDT' });

    return { code: 200, message: 'ok', data: info };
  }

  private async getUserSpotFree(userId: number): Promise<any> {
    const res = await this.traderApiRepo.find({ where: { userId } });
    return get(res, '[0]', {});
  }

  private async calculateStrategyProfit(
    price: string,
    entryPrice: string,
    qty: string,
    quoteQty: string,
    userId: number,
    realizedFree: number,
    isUpdate = false,
  ): Promise<StrategyProfit> {
    const currentPrice = Number(price);
    const costPriceInt = Number(entryPrice);
    const qtyInt = Number(qty);
    const quoteQtyInt = Number(quoteQty);

    let free = 0;
    let netProfit = 0;
    let netProfitRate = '';
    // profit =（当天结算价－开仓价格）×持仓量×合约单位－手续费
    if (!isUpdate) {
      const { spotFree } = await this.getUserSpotFree(userId);
      free = quoteQtyInt * spotFree + realizedFree;
    }

    const profit = (currentPrice - costPriceInt) * qtyInt;

    if (!isUpdate) {
      netProfit = profit - free;
      netProfitRate =
        parseFloat(((netProfit / quoteQtyInt) * 100).toFixed(2)) + '%';
    }
    const profitRate =
      parseFloat(((profit / quoteQtyInt) * 100).toFixed(2)) + '%';

    /*
    console.log('alculateStrategyProfit 1:', realizedFree);
    console.log('alculateStrategyProfit 3:', profit, '-', profitRate);
    console.log('alculateStrategyProfit 4:', netProfit, '-', netProfitRate);
    */

    return {
      profit,
      profitRate,
      free,
      netProfit,
      netProfitRate,
    };
  }

  private async updateOrderStatus(
    type: string,
    id: number,
    strategyId: string,
    strategyStatus: number,
  ) {
    if (type === 'spot') {
      const sql = `update spot_order set strategyId="${strategyId}",strategyStatus = "${strategyStatus}"  WHERE id = "${id}"`;
      await this.spotOrderRepo.query(sql);
    }

    if (type === 'future') {
      const sql = `update futures_order set strategyId="${strategyId}",strategyStatus = "${strategyStatus}"  WHERE id = "${id}"`;
      await this.futuresOrderRepo.query(sql);
    }
  }

  // update spot_order strategyStatus and delete strategies_order record
  async resetSpotOrderStatus(spotOrder: SpotOrder): Promise<Result> {
    const { strategyId } = spotOrder;

    const sql = `update spot_order set strategyId="",strategyStatus = 0  WHERE strategyId = "${strategyId}"`;
    await this.spotOrderRepo.query(sql);

    await this.deleteStrategyOrder(strategyId);

    await this.deleteStrategyOrderId(strategyId);

    return { code: 200, message: 'ok', data: null };
  }

  private async deleteStrategyOrder(strategyId: string) {
    const sql = `delete from strategies_order WHERE strategyId = "${strategyId}"`;

    await this.strategyOrderIdRepo.query(sql);
  }

  private async deleteStrategyOrderId(strategyId: string) {
    const sql = `delete from strategy_orderid WHERE strategyId = "${strategyId}"`;

    await this.strategyOrderIdRepo.query(sql);
  }
  // =========== spot end ===========

  // =========== Strategies Order start ===========
  private async createStrategyOrderIdUtil(strategyOrderId: StrategyOrderId) {
    await this.strategyOrderIdRepo.save(strategyOrderId);
  }

  private async findStrategyOrderIdUtil(
    orderId: number,
  ): Promise<StrategyOrderId> {
    const sql = `select strategyId,orderId from strategy_orderid where orderId='${orderId}'`;

    return await this.strategyOrderIdRepo.query(sql);
  }

  private async createStrategyOrderUtil(strategiesOrder: StrategiesOrder) {
    return await this.strategiesOrderRepo.save(strategiesOrder);
  }

  private async updateStrategyOrderUtil(strategiesOrder: StrategiesOrder) {
    const { strategyId, qty, quoteQty, entryPrice, updatedAt } =
      strategiesOrder;

    const sql = `update strategies_order set qty = "${qty}",quoteQty = "${quoteQty}",entryPrice="${entryPrice}",updatedAt="${updatedAt}" WHERE strategyId = "${strategyId}"`;
    return await this.strategiesOrderRepo.query(sql);
  }

  private async updateCloseStrategyOrderUtil(strategiesOrder: StrategiesOrder): Promise<Result> {
    const {
      strategyId,
      is_running,
      sellingQty,
      sellingQuoteQty,
      sellingPrice,
      realizedProfit,
      realizedProfitRate,
      sellingTime,
      free,
      updatedAt,
    } = strategiesOrder;

    const sql = `update strategies_order set sellingQty = "${sellingQty}",sellingQuoteQty = "${sellingQuoteQty}",sellingPrice="${sellingPrice}",
    realizedProfit="${realizedProfit}",realizedProfitRate="${realizedProfitRate}",free="${free}",sellingTime="${sellingTime}",is_running=${is_running},updatedAt="${updatedAt}" WHERE strategyId = "${strategyId}"`;
    try {
      const res = await this.strategiesOrderRepo.query(sql);
      return { code: 200, message: 'Calculate amount update succeeded', data: res };
    } catch (error) {
      console.log('error:', error);
      return { code: 500, message: 'updateCloseStrategyOrder error' };
    }
  }

  async getStrategiesOrder(
    fiterStrategyOrder: FiterStrategyOrderType,
  ): Promise<Result> {
    const { currentPage, pageSize, symbol, is_running } = fiterStrategyOrder;
    let sql = '';
    if (symbol) {
      if (is_running !== '') {
        sql = `select * from strategies_order where symbol ="${symbol}" and is_running=${is_running}  order by createdAt desc limit ${(currentPage - 1) * pageSize
          },${pageSize}`;
      } else {
        sql = `select * from strategies_order where symbol ="${symbol}" order by createdAt desc limit ${(currentPage - 1) * pageSize
          },${pageSize}`;
      }
    } else {
      if (is_running !== '') {
        sql = `select * from strategies_order where is_running ="${is_running}" order by createdAt desc limit ${(currentPage - 1) * pageSize
          },${pageSize}`;
      } else {
        sql = `select * from strategies_order order by createdAt desc limit ${(currentPage - 1) * pageSize
          },${pageSize}`;
      }
    }
    const res = await this.strategiesOrderRepo.query(sql);
    return { code: 200, message: 'ok', data: res };
  }

  async closeSpotStrategy(
    spotOrders: SpotOrder[],
    strategyOrder: StrategiesOrder,
  ): Promise<Result> {
    const ordersLength = spotOrders.length;
    const lastOrder = get(spotOrders, `[${ordersLength - 1}]`, {}) as SpotOrder;

    const {
      sellingQty,
      sellingQuoteQty,
      sellingPrice,
      realizedProfit,
      realizedProfitRate,
      isTheSameSymbol,
      isTheSameSide,
      free,
    } = await this.calculateSpotOrderCloseStrategy(spotOrders, strategyOrder);
    if (!isTheSameSymbol) {
      return {
        code: 500,
        message: 'The selected order not the same Symbol',
        data: null,
      };
    }

    if (isTheSameSide) {
      return {
        code: 500,
        message: 'The selected order is not opposite to the strategy',
        data: null,
      };
    }

    const { userId, strategyId, symbol, time } = strategyOrder;
    const sellingTime = Number(lastOrder.time)
    const strategiesOrder = {
      symbol,
      price: '',
      side: 1,
      orderType: 1,
      leverage: 1,

      entryPrice: '',
      sellingPrice,
      sellingTime,

      qty: null,
      quoteQty: null,
      sellingQty,
      sellingQuoteQty,

      profit: 0,
      profitRate: '',
      realizedProfit,
      realizedProfitRate,
      free,

      stopType: 0,
      stopProfit: '',
      stopLoss: '',
      stopProfitPrice: '',
      stopLossPrice: '',

      tradeUrl: '',
      note: '',
      klineShots: '',

      is_running: false,
      userId,
      strategyId,
      time,
      updatedAt: new Date().getTime(),
    };

    // update daily profit start
    const calculateRes = await this.calculateAmountByClose(sellingTime, realizedProfit, userId)
    if (calculateRes.code !== 200) {
      return { code: 500, message: calculateRes.message };
    }
    // update daily profit end

    const res = await this.updateCloseStrategyOrderUtil(strategiesOrder);
    if (calculateRes.code !== 200) {
      return { code: 500, message: res.message };
    }

    // update order spot order strategyStatus
    const ended = 2;
    const sql = `update spot_order set strategyStatus = ${ended} WHERE strategyId = "${strategyId}"`;
    await this.spotOrderRepo.query(sql);
    // end

    // update close spot order
    spotOrders.forEach((item) => {
      const { id: idUpdate } = item;
      this.updateOrderStatus('spot', idUpdate, strategyId, ended);
    });
    // end

    return { code: 200, message: 'ok', data: res.data };
  }

  async mergeSpotStrategy(
    spotOrders: SpotOrder[],
    strategyOrder: StrategiesOrder,
  ): Promise<Result> {
    const { qty, quoteQty, entryPrice, isTheSameSymbol } =
      this.calculateSpotOrderMergeStrategy(spotOrders, strategyOrder);
    if (!isTheSameSymbol) {
      return {
        code: 500,
        message: 'The selected order not the same Symbol',
        data: null,
      };
    }

    const { userId, strategyId, symbol, time, side } = strategyOrder;

    const strategiesOrder = {
      symbol,
      price: '',
      side,
      orderType: 1,
      leverage: 1,

      entryPrice,
      sellingPrice: '',
      sellingTime: null,

      qty,
      quoteQty,
      sellingQty: '',
      sellingQuoteQty: '',

      profit: 0,
      profitRate: '',
      realizedProfit: 0,
      realizedProfitRate: '',
      free: 0,

      stopType: 0,
      stopProfit: '',
      stopLoss: '',
      stopProfitPrice: '',
      stopLossPrice: '',

      tradeUrl: '',
      note: '',
      klineShots: '',

      is_running: true,
      time,
      updatedAt: new Date().getTime(),
      userId,
      strategyId,
    };

    await this.updateStrategyOrderUtil(strategiesOrder);
    const running = 1;
    spotOrders.forEach((item) => {
      const { id: idUpdate } = item;
      this.updateOrderStatus('spot', idUpdate, strategyId, running);
    });
    return { code: 200, message: 'ok', data: null };
  }

  private async calculateSpotOrderCloseStrategy(
    spotOrders: SpotOrder[],
    strategyOrder: StrategiesOrder,
  ): Promise<CalculateCloseStrategyOrderType> {
    const {
      symbol,
      side,
      entryPrice,
      userId,
      free: realizedFree,
    } = strategyOrder;
    let qtyTotal = 0;
    let quoteQtyTotal = 0;
    let isTheSameSymbol = true;
    const targetSymbol = symbol;
    let isTheSameSide = false;

    spotOrders.forEach((item) => {
      const { qty, quoteQty, symbol, isBuyer } = item;
      // /*
      if (targetSymbol !== symbol) {
        isTheSameSymbol = false;
      }
      // */

      if (side === isBuyer) {
        isTheSameSide = true;
      }

      qtyTotal = Number(qty) + qtyTotal;
      quoteQtyTotal = Number(quoteQty) + quoteQtyTotal;
    });

    const sellingPrice = (quoteQtyTotal / qtyTotal).toFixed(8);
    const sellingQty = qtyTotal.toString();
    const sellingQuoteQty = quoteQtyTotal.toString();

    const { profit, profitRate, netProfit, netProfitRate, free } =
      await this.calculateStrategyProfit(
        sellingPrice,
        entryPrice,
        sellingQty,
        sellingQuoteQty,
        userId,
        realizedFree,
      );

    return {
      sellingQty,
      sellingQuoteQty,
      sellingPrice,
      realizedProfit: netProfit,
      realizedProfitRate: netProfitRate,
      isTheSameSymbol,
      isTheSameSide,
      free,
      // netProfit,
      // netProfitRate
    };
  }

  private calculateSpotOrderMergeStrategy(
    spotOrders: SpotOrder[],
    strategyOrder: StrategiesOrder,
  ): CalculateStrategiesOrderType {
    const { symbol } = strategyOrder;
    let qtyTotal = 0;
    let quoteQtyTotal = 0;
    let isTheSameSymbol = true;
    const targetSymbol = symbol;

    spotOrders.forEach((item) => {
      const { qty, quoteQty, symbol, isBuyer } = item;
      if (targetSymbol !== symbol) {
        isTheSameSymbol = false;
      }

      if (isBuyer) {
        qtyTotal = Number(qty) + qtyTotal;
        quoteQtyTotal = Number(quoteQty) + quoteQtyTotal;
      } else {
        qtyTotal = qtyTotal - Number(qty);
        quoteQtyTotal = quoteQtyTotal - Number(quoteQty);
      }
    });

    const { qty, quoteQty } = strategyOrder;
    qtyTotal = Number(qty) + qtyTotal;
    quoteQtyTotal = Number(quoteQty) + quoteQtyTotal;

    return {
      qty: qtyTotal.toString(),
      quoteQty: quoteQtyTotal.toString(),
      entryPrice: (quoteQtyTotal / qtyTotal).toFixed(8),
      isTheSameSymbol,
    };
  }

  private calculateSpotStrategiesOrder(
    spotOrders: SpotOrder[],
    targetSymbol: string,
  ): CalculateStrategiesOrderType {
    let qtyTotal = 0;
    let quoteQtyTotal = 0;
    let isTheSameSymbol = true;

    spotOrders.forEach((item) => {
      const { qty, quoteQty, symbol, isBuyer } = item;
      if (targetSymbol !== symbol) {
        isTheSameSymbol = false;
      }

      if (isBuyer) {
        qtyTotal = Number(qty) + qtyTotal;
        quoteQtyTotal = Number(quoteQty) + quoteQtyTotal;
      } else {
        qtyTotal = qtyTotal - Number(qty);
        quoteQtyTotal = quoteQtyTotal - Number(quoteQty);
      }
    });

    return {
      qty: qtyTotal.toString(),
      quoteQty: quoteQtyTotal.toString(),
      entryPrice: (quoteQtyTotal / qtyTotal).toFixed(8),
      isTheSameSymbol,
    };
  }

  async createStrategy(spotOrders: SpotOrder[]): Promise<Result> {
    const firstOrder = get(spotOrders, '[0]', {}) as SpotOrder;
    const { orderId, userId, time, symbol, isBuyer } = firstOrder;
    const strategyOrderId = await this.findStrategyOrderIdUtil(orderId);
    if (isEmpty(strategyOrderId)) {
      console.log('=== not exist strategy,insert... ===');
      const strategyId = nanoid();

      // get price from server
      const spotPrice = await this.getSpotPrice(symbol);
      const price = get(spotPrice, `${symbol}`, '');

      const { qty, quoteQty, entryPrice, isTheSameSymbol } =
        this.calculateSpotStrategiesOrder(spotOrders, symbol);
      if (!isTheSameSymbol) {
        return {
          code: 500,
          message: 'The selected order not the same Symbol',
          data: null,
        };
      }

      const realizedFree = 0;
      const { profit, profitRate, free } = await this.calculateStrategyProfit(
        price,
        entryPrice,
        qty,
        quoteQty,
        userId,
        realizedFree,
      );

      const { tradeUrl } = await this.getAsset(symbol);

      const strategiesOrder = {
        symbol,
        price,
        side: isBuyer,
        orderType: 1,
        leverage: 1,

        entryPrice,
        sellingPrice: '',
        sellingTime: null,

        qty,
        quoteQty,
        sellingQty: '',
        sellingQuoteQty: '',

        profit,
        profitRate,
        realizedProfit: 0,
        realizedProfitRate: '',
        free,

        stopType: 0,
        stopProfit: '',
        stopLoss: '',
        stopProfitPrice: '',
        stopLossPrice: '',

        tradeUrl,
        note: '',
        klineShots: '',

        is_running: true,
        userId: userId,
        strategyId,
        updatedAt: new Date().getTime(),
        time,
      };

      this.createStrategyOrderIdUtil({ userId, strategyId, orderId });
      await this.createStrategyOrderUtil(strategiesOrder);
      const running = 1;
      spotOrders.forEach((item) => {
        const { id: idUpdate } = item;
        this.updateOrderStatus('spot', idUpdate, strategyId, running);
      });
    } else {
      console.log('=== exist strategyOrderId,update... ===');
    }

    return { code: 200, message: 'ok', data: null };
  }

  async getSpotPrice(symbol: string): Promise<any> {
    /*
      { BTCUSDT: '19376.16000000' }
    */
    return await this.client.spotPrice(symbol);
  }

  async syncStrategyPrice(strategiesOrder: StrategiesOrder): Promise<Result> {
    const { symbol, entryPrice, quoteQty, qty, strategyId, userId } =
      strategiesOrder;
    const spotPrice = await this.getSpotPrice(symbol);
    const price = get(spotPrice, `${symbol}`, '');
    const realizedFree = 0;

    if (!price) {
      return { code: 500, message: 'error', data: null };
    }

    const isUpdate = true;
    const updatedAt = new Date().getTime();
    const { profit, profitRate } = await this.calculateStrategyProfit(
      price,
      entryPrice,
      qty,
      quoteQty,
      userId,
      realizedFree,
      isUpdate,
    );

    const sql = `update strategies_order set price = "${price}",profitRate = "${profitRate}",
    profit = "${profit}",updatedAt="${updatedAt}" WHERE strategyId = "${strategyId}"`;
    const result = await this.strategiesOrderRepo.query(sql);

    return { code: 200, message: 'ok', data: result };
  }

  private async loopUpdateStrategiesPrice(strategiesOrders: StrategiesOrder[]) {
    const updatedAt = new Date().getTime();
    try {
      for (let index = 0; index < strategiesOrders.length; index++) {
        const item = strategiesOrders[index];

        const { symbol, entryPrice, quoteQty, qty, strategyId, userId } = item;
        const spotPrice = await this.getSpotPrice(symbol);

        const price = get(spotPrice, `${symbol}`, '');
        const realizedFree = 0;
        if (!price) {
          return { code: 500, message: 'error', data: null };
        }

        const isUpdate = true;
        const { profit, profitRate } = await this.calculateStrategyProfit(
          price,
          entryPrice,
          qty,
          quoteQty,
          userId,
          realizedFree,
          isUpdate,
        );

        const sql = `update strategies_order set price = "${price}",profitRate = "${profitRate}",
    profit = "${profit}",updatedAt="${updatedAt}" WHERE strategyId = "${strategyId}"`;

        const result = await this.strategiesOrderRepo.query(sql);
      }

      return { code: 200, message: 'Update succeeded', data: null };
    } catch (error) {
      return { code: 500, message: 'update error', data: null };
    }
  }

  async syncAllStrategiesPrice(
    strategiesOrders: StrategiesOrder[],
  ): Promise<Result> {
    const res = await this.loopUpdateStrategiesPrice(strategiesOrders);
    return res;
  }
  // =========== Strategies Order end ===========

  // =========== Count start ===========
  private async getTradeCountByDay(day: string, userId: number) {
    const sql = `SELECT * FROM daily_profit WHERE userId=${userId} AND DATE_FORMAT(time, '%Y-%m-%d') = '${day}'`
    const tradeCount = await this.dailyProfitRepo.query(sql);
    return tradeCount
  }

  private async calculateAmountByClose(time: number, profit: number, userId: number): Promise<Result> {
    const res = await this.client.getAccountInfo();
    const balances = get(res, 'balances', [])
    for (let index = 0; index < balances.length; index++) {
      const element = balances[index];
      if (element.asset === 'USDT') {
        const dayStr = formatTimestamp(time, false)
        const timeStr = formatTimestamp(time)
        const tradeCountList = await this.getTradeCountByDay(dayStr, userId)
        const amount = element.free
        if (isEmpty(tradeCountList)) {
          const calAmount = Number(amount) + profit
          const profitRate =
            parseFloat(((profit / calAmount) * 100).toFixed(2)) + '%';
          const tradeCount = {
            userId,
            profit: profit,
            profitRate,
            amount,
            time: timeStr
          }

          try {
            await this.dailyProfitRepo.save(tradeCount);
            return { code: 200, message: 'Calculate amount succeeded' };
          } catch (error) {
            console.log('error:', error);
            return { code: 500, message: 'calculate amount error' };
          }
        } else {
          const { profit: itemProfit, id } = tradeCountList[0]
          const calProfit = profit + itemProfit
          const calAmount = Number(amount) + calProfit
          console.log('update:', profit, '-', itemProfit, '', calProfit, '-', calAmount);
          const profitRate =
            parseFloat(((calProfit / calAmount) * 100).toFixed(2)) + '%';
          const sql = `update daily_profit set profit = ${calProfit},profitRate = '${profitRate}',time='${timeStr}' WHERE id = ${id}`;
          try {
            await this.spotOrderRepo.query(sql);
            return { code: 200, message: 'Calculate amount update succeeded' };
          } catch (error) {
            console.log('error:', error);
            return { code: 500, message: 'calculate amount update error' };
          }
        }
        // break
      }
    }
  }

  async syncAmount(): Promise<Result> {
    const res = await this.client.getAccountInfo();
    const balances = get(res, 'balances', [])
    for (let index = 0; index < balances.length; index++) {
      const element = balances[index];
      if (element.asset === 'USDT') {
        /*
        { asset: 'USDT', free: '3848.07452924', locked: '0.00000000' }  
        select * from daily_profit where time = to_days(now());
        select * from daily_profit where userId = 1;
        SELECT * FROM daily_profit WHERE DATE_FORMAT(createdAt, '%Y-%m-%d') = '2022-10-26'
        */
        // const date = new Date()
        // const date = new Date("2022-3-15")
        const dayStr = formatTimestamp(new Date().getTime(), false)
        const timeStr = formatTimestamp(new Date().getTime())
        const userId = 1
        const tradeCountList = await this.getTradeCountByDay(dayStr, userId)
        console.log('tradeCountList:', tradeCountList);

        if (isEmpty(tradeCountList)) {
          const tradeCount = {
            userId: 1,
            profit: 0,
            profitRate: '',
            amount: element.free,
            time: timeStr
          }

          await this.dailyProfitRepo.save(tradeCount);
        } else {
          console.log('update');
        }
        break
      }
    }

    return { code: 200, message: 'sync amount', data: null };
  }
  // =========== Count end ===========
}
