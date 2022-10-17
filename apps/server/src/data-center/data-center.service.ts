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
import { time } from 'console';

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
    const { currentPage, pageSize, symbol } = searchParmas
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

  private calculateStrategyProfit(
    price: string,
    entryPrice: string,
    qty: string,
    quoteQty: string,
  ): StrategyProfit {
    const currentPrice = Number(price);
    const costPriceInt = Number(entryPrice);
    const qtyInt = Number(qty);
    const quoteQtyInt = Number(quoteQty);

    // 浮动盈亏: profit =（当天结算价－开仓价格）×持仓量×合约单位－手续费
    const profit = (currentPrice - costPriceInt) * qtyInt;
    const profitRate =
      parseFloat(((profit / quoteQtyInt) * 100).toFixed(2)) + '%';

    return {
      profit,
      profitRate,
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

    const { strategyId, qty, quoteQty, entryPrice } = strategiesOrder

    const sql = `update strategies_order set qty = "${qty}",quoteQty = "${quoteQty}",entryPrice="${entryPrice}" WHERE strategyId = "${strategyId}"`;
    return await this.strategiesOrderRepo.query(sql);
  }

  private async updateCloseStrategyOrderUtil(strategiesOrder: StrategiesOrder) {

    const {
      strategyId,
      is_running,
      sellingQty,
      sellingQuoteQty,
      sellingPrice,
      realizedProfit,
      realizedProfitRate,
      sellingTime,
    } = strategiesOrder

    const sql = `update strategies_order set sellingQty = "${sellingQty}",sellingQuoteQty = "${sellingQuoteQty}",sellingPrice="${sellingPrice}",
    realizedProfit="${realizedProfit}",realizedProfitRate="${realizedProfitRate}",sellingTime="${sellingTime}",is_running=${is_running} WHERE strategyId = "${strategyId}"`;

    return await this.strategiesOrderRepo.query(sql);
  }

  async getStrategiesOrder(fiterStrategyOrder: FiterStrategyOrderType): Promise<Result> {
    const { currentPage, pageSize, symbol, is_running } = fiterStrategyOrder
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

  async closeSpotStrategy(spotOrders: SpotOrder[], strategyOrder: StrategiesOrder): Promise<Result> {
    const ordersLength = spotOrders.length;
    const lastOrder = get(spotOrders, `[${ordersLength - 1}]`, {}) as SpotOrder;

    const {
      sellingQty,
      sellingQuoteQty,
      sellingPrice,
      realizedProfit,
      realizedProfitRate,
      isTheSameSymbol,
      isTheSameSide
    } = this.calculateSpotOrderCloseStrategy(spotOrders, strategyOrder)
    if (!isTheSameSymbol) {
      return { code: 500, message: 'The selected order not the same Symbol', data: null };
    }

    if (isTheSameSide) {
      return { code: 500, message: 'The selected order is not opposite to the strategy', data: null };
    }

    const { userId, strategyId, symbol, time } = strategyOrder

    const strategiesOrder = {
      userId,
      strategyId,
      symbol,
      side: 1,
      price: '',
      qty: null,
      quoteQty: null,
      profit: 0,
      profitRate: '',
      entryPrice: '',
      time,

      is_running: false,
      sellingQty,
      sellingQuoteQty,
      sellingPrice,
      realizedProfit,
      realizedProfitRate,
      sellingTime: lastOrder.time,

      stopProfit: '',
      stopLoss: '',
      stopProfitPrice: '',
      stopLossPrice: '',
      stopType: 0,
      tradeUrl: ''
    };

    const res = await this.updateCloseStrategyOrderUtil(strategiesOrder)
    const ended = 2;
    // update close spot order
    spotOrders.forEach(item => {
      const { id: idUpdate } = item
      this.updateOrderStatus('spot', idUpdate, strategyId, ended);
    })
    // update order spot order strategyStatus
    const sql = `update spot_order set strategyStatus = ${ended}  WHERE strategyId = "${strategyId}"`;
    await this.spotOrderRepo.query(sql);
    return { code: 200, message: 'ok', data: res };
  }

  async mergeSpotStrategy(spotOrders: SpotOrder[], strategyOrder: StrategiesOrder): Promise<Result> {
    const { qty, quoteQty, entryPrice, isTheSameSymbol } = this.calculateSpotOrderMergeStrategy(spotOrders, strategyOrder)
    if (!isTheSameSymbol) {
      return { code: 500, message: 'The selected order not the same Symbol', data: null };
    }

    const { userId, strategyId, symbol, time, side } = strategyOrder

    const strategiesOrder = {
      userId,
      strategyId,
      symbol,
      price: '',
      side,
      qty,
      quoteQty,
      sellingQty: '',
      sellingQuoteQty: '',
      profit: 0,
      profitRate: '',
      entryPrice,
      sellingPrice: '',
      is_running: true,
      time,
      realizedProfit: 0,
      realizedProfitRate: '',
      sellingTime: null,

      stopProfit: '',
      stopLoss: '',
      stopProfitPrice: '',
      stopLossPrice: '',
      stopType: 0,
      tradeUrl: ''
    };

    await this.updateStrategyOrderUtil(strategiesOrder)
    const running = 1;
    spotOrders.forEach(item => {
      const { id: idUpdate } = item
      this.updateOrderStatus('spot', idUpdate, strategyId, running);
    })
    return { code: 200, message: 'ok', data: null };
  }


  private calculateSpotOrderCloseStrategy(spotOrders: SpotOrder[], strategyOrder: StrategiesOrder): CalculateCloseStrategyOrderType {
    const { symbol, side, entryPrice } = strategyOrder
    let qtyTotal = 0
    let quoteQtyTotal = 0
    let isTheSameSymbol = true
    const targetSymbol = symbol
    let isTheSameSide = false

    spotOrders.forEach(item => {
      const { qty, quoteQty, symbol, isBuyer } = item
      // /*
      if (targetSymbol !== symbol) {
        isTheSameSymbol = false
      }
      // */

      if (side === isBuyer) {
        isTheSameSide = true
      }

      qtyTotal = Number(qty) + qtyTotal
      quoteQtyTotal = Number(quoteQty) + quoteQtyTotal
    })

    const sellingPrice = (quoteQtyTotal / qtyTotal).toFixed(8)
    const sellingQty = qtyTotal.toString()
    const sellingQuoteQty = quoteQtyTotal.toString()

    const { profit, profitRate } = this.calculateStrategyProfit(sellingPrice, entryPrice, sellingQty, sellingQuoteQty)

    return {
      sellingQty,
      sellingQuoteQty,
      sellingPrice,
      realizedProfit: profit,
      realizedProfitRate: profitRate,
      isTheSameSymbol,
      isTheSameSide
    }
  }

  private calculateSpotOrderMergeStrategy(spotOrders: SpotOrder[], strategyOrder: StrategiesOrder): CalculateStrategiesOrderType {
    const { symbol } = strategyOrder
    let qtyTotal = 0
    let quoteQtyTotal = 0
    let isTheSameSymbol = true
    const targetSymbol = symbol

    spotOrders.forEach(item => {
      const { qty, quoteQty, symbol, isBuyer } = item
      if (targetSymbol !== symbol) {
        isTheSameSymbol = false
      }

      if (isBuyer) {
        qtyTotal = Number(qty) + qtyTotal
        quoteQtyTotal = Number(quoteQty) + quoteQtyTotal
      } else {
        qtyTotal = qtyTotal - Number(qty)
        quoteQtyTotal = quoteQtyTotal - Number(quoteQty)
      }
    })

    const { qty, quoteQty } = strategyOrder
    qtyTotal = Number(qty) + qtyTotal
    quoteQtyTotal = Number(quoteQty) + quoteQtyTotal

    return {
      qty: qtyTotal.toString(),
      quoteQty: quoteQtyTotal.toString(),
      entryPrice: (quoteQtyTotal / qtyTotal).toFixed(8),
      isTheSameSymbol
    }
  }

  private calculateSpotStrategiesOrder(spotOrders: SpotOrder[], targetSymbol: string): CalculateStrategiesOrderType {
    let qtyTotal = 0
    let quoteQtyTotal = 0
    let isTheSameSymbol = true

    spotOrders.forEach(item => {
      const { qty, quoteQty, symbol, isBuyer } = item
      if (targetSymbol !== symbol) {
        isTheSameSymbol = false
      }

      if (isBuyer) {
        qtyTotal = Number(qty) + qtyTotal
        quoteQtyTotal = Number(quoteQty) + quoteQtyTotal
      } else {
        qtyTotal = qtyTotal - Number(qty)
        quoteQtyTotal = quoteQtyTotal - Number(quoteQty)
      }
    })

    return {
      qty: qtyTotal.toString(),
      quoteQty: quoteQtyTotal.toString(),
      entryPrice: (quoteQtyTotal / qtyTotal).toFixed(8),
      isTheSameSymbol
    }
  }

  async createStrategy(spotOrders: SpotOrder[]): Promise<Result> {
    const firstOrder = get(spotOrders, '[0]', {}) as SpotOrder;
    const { orderId, userId, time, symbol, isBuyer } = firstOrder
    const strategyOrderId = await this.findStrategyOrderIdUtil(orderId);
    if (isEmpty(strategyOrderId)) {
      console.log('=== not exist strategy,insert... ===');
      const strategyId = nanoid();

      const { qty, quoteQty, entryPrice, isTheSameSymbol } = this.calculateSpotStrategiesOrder(spotOrders, symbol)
      if (!isTheSameSymbol) {
        return { code: 500, message: 'The selected order not the same Symbol', data: null };
      }

      const { tradeUrl } = await this.getAsset(symbol)

      const strategiesOrder = {
        userId: userId,
        strategyId,
        symbol,
        price: '',
        side: isBuyer,
        // qty: spotOrder.qty,
        qty,
        // quoteQty: spotOrder.quoteQty,
        quoteQty,
        sellingQty: '',
        sellingQuoteQty: '',
        profit: 0,
        profitRate: '',
        // entryPrice: spotOrder.price,
        entryPrice,
        sellingPrice: '',
        is_running: true,
        // time: spotOrder.time,
        time,
        realizedProfit: 0,
        realizedProfitRate: '',
        sellingTime: null,

        stopProfit: '',
        stopLoss: '',
        stopProfitPrice: '',
        stopLossPrice: '',
        stopType: 0,
        tradeUrl
      };

      this.createStrategyOrderIdUtil({ userId, strategyId, orderId });
      await this.createStrategyOrderUtil(strategiesOrder);
      const running = 1;
      spotOrders.forEach(item => {
        const { id: idUpdate } = item
        this.updateOrderStatus('spot', idUpdate, strategyId, running);
      })
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
    const { symbol, entryPrice, quoteQty, qty, strategyId } = strategiesOrder;
    const spotPrice = await this.getSpotPrice(symbol);
    const price = get(spotPrice, `${symbol}`, '');

    if (!price) {
      return { code: 500, message: 'error', data: null };
    }

    const { profit, profitRate } = this.calculateStrategyProfit(
      price,
      entryPrice,
      qty,
      quoteQty,
    );

    const sql = `update strategies_order set price = "${price}",profitRate = "${profitRate}",profit = "${profit}" WHERE strategyId = "${strategyId}"`;
    const result = await this.strategiesOrderRepo.query(sql);

    return { code: 200, message: 'ok', data: result };
  }
  // =========== Strategies Order end ===========
}
