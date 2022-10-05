import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { get, isEmpty } from 'lodash';
import { Result } from 'src/common/result.interface';
import { createRequest } from 'src/binance-connector/helpers/utils';
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
import { AssetType, StrategyProfit } from 'src/common/types';
import { TradeAsset } from './asset.entity';

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
      console.log('Api key do not exist');
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
        console.log('add-->');

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
        // console.log('coin', coin);
        const saveRes = await this.coninRepo.save(coin);

        return { code: 200, message: 'added successfully', data: saveRes };
      } else {
        console.log('update-->');
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

  private async saveBalancesUtil(order: FuturesOrder) {
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
        item.userId = 1
        this.saveBalancesUtil(item)
      })

      return { code: 200, message: 'ok', data: balances };
    } catch (error) {
      return { code: 500, message: 'sync balances error', data: null };
    }
  }
  // =========== Balances end ===========

  // =========== future start ===========
  private async savefutureOrderUtil(order: FuturesOrder) {
    await this.futuresOrderRepo.save(order);
  }

  private async findFutureOrderUtil(orderId: number): Promise<FuturesOrder> {
    const sql = `select symbol,orderId from futures_order where orderId='${orderId}'`;
    const futureOrder = await this.futuresOrderRepo.query(sql);
    return get(futureOrder, '[0]', {});
  }

  async getFutureOrders(currentPage: number, pageSize: number): Promise<Result> {
    const sql = `select * from futures_order order by updateTime desc limit ${(currentPage - 1) * pageSize
      },${pageSize}`;

    const res = await this.futuresOrderRepo.query(sql);
    return { code: 200, message: 'ok', data: res };
  }

  async futuresAllOrders(): Promise<Result> {
    const info = await this.client.futuresAllOrders();
    if (Array.isArray(info)) {
      info.forEach(async item => {
        const { orderId } = item
        // mock userId
        item.userId = 1
        const existFutureOrder = await this.findFutureOrderUtil(orderId)
        if (isEmpty(existFutureOrder)) {
          console.log('== not exist FutureOrder,insert...');
          await this.savefutureOrderUtil(item)
        } else {
          console.log('== exist FutureOrder,skip... ==');
        }
      })
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
    const info = await this.client.futuresAccountInfo()

    return { code: 200, message: 'ok', data: info };
  }

  async futuresBatchOrders(): Promise<Result> {
    const info = await this.client.futuresBatchOrders();

    return { code: 200, message: 'ok', data: info };
  }
  // =========== future end =========== 

  // =========== spot start ===========
  private async savaSpotOrderUtil(spotOrder: SpotOrder) {
    await this.spotOrderRepo.save(spotOrder);
  }

  private async findSpotOrderUtil(orderId: number): Promise<FuturesOrder> {
    const sql = `select symbol,orderId from spot_order where orderId='${orderId}'`;
    const futureOrder = await this.spotOrderRepo.query(sql);
    return get(futureOrder, '[0]', {});
  }

  async getAsset(name: string) {
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

  async getSpotOrder(currentPage: number, pageSize: number): Promise<Result> {
    const sql = `select * from spot_order order by time desc limit ${(currentPage - 1) * pageSize
      },${pageSize}`;

    const res = await this.spotOrderRepo.query(sql);
    return { code: 200, message: 'ok', data: res };
  }

  async syncSpotOrder(): Promise<Result> {
    const info: any = await this.client.myTrades(
      {
        // symbol: 'BTCUSDT',
        symbol: 'BTCBUSD',
        // endTime: 1664467199999,
        // startTime: 1662566400000,
      }
    );
    console.log('=== spot order ====', info.length);

    info.forEach(async (item) => {
      const { orderId } = item as any
      // mock userId
      item.userId = 1
      const existSpotOrder = await this.findSpotOrderUtil(orderId)
      if (isEmpty(existSpotOrder)) {
        console.log('== not exist spotOrder,insert...');
        this.savaSpotOrderUtil(item)
      } else {
        console.log('== exist spotOrder,skip... ==');
      }
    })

    return { code: 200, message: 'ok', data: null };
  }

  async getSpotAllOrders(): Promise<Result> {
    const info = await this.client.allOrders(
      {
        // symbol: 'BTCUSDT',
        symbol: 'BTCBUSD',
        // endTime: 1664467199999,
        // startTime: 1662566400000,
      }
    );

    return { code: 200, message: 'ok', data: info };
  }

  async getSpotOpenOrders(): Promise<Result> {
    const info = await this.client.openOrders(
      { symbol: 'BTCUSDT', }
    );

    return { code: 200, message: 'ok', data: info };
  }

  private calculateStrategyProfit(price: string, entryPrice: string, qty: string, quoteQty: string): StrategyProfit {
    const currentPrice = Number(price)
    const costPriceInt = Number(entryPrice)
    const qtyInt = Number(qty)
    const quoteQtyInt = Number(quoteQty)

    // 浮动盈亏: profit =（当天结算价－开仓价格）×持仓量×合约单位－手续费
    const profit = (currentPrice - costPriceInt) * qtyInt
    const profitRate = parseFloat(((profit / quoteQtyInt) * 100).toFixed(2)) + '%'

    return {
      profit,
      profitRate
    }
  }

  async closeSpotStrategy(spotOrders: SpotOrder[]): Promise<Result> {
    console.log('closeSpotStrategy', spotOrders);

    const ordersLength = spotOrders.length
    const ordersIsGreaterThan2 = spotOrders.length > 2
    const firstOrder = get(spotOrders, '[0]', {})
    const lastOrder = get(spotOrders, `[${ordersLength - 1}]`, {})

    const { orderId, userId } = firstOrder

    const strategyOrderId = await this.findStrategyOrderIdUtil(orderId)
    console.log('strategyOrderId', strategyOrderId);

    if (isEmpty(strategyOrderId)) {
      console.log('== not exist strategy,create closeSpotStrategy ...');
      let qty = ''
      let quoteQty = ''
      let entryPrice = ''
      let sellingPrice = ''
      let sellingQty = ''
      let sellingQuoteQty = ''
      const strategyId = nanoid()
      // create strategy
      spotOrders.forEach(async (item, index) => {
        console.log('spotOrders item:', index, 'item:', item);
        const { orderId, userId } = item
        /*
        await this.saveStrategyOrderIdUtil({
          userId,
          strategyId,
          orderId
        })
        */
        if (ordersIsGreaterThan2) {
          console.log('=== Increase or decrease coin position ===');
        } else {
          console.log('=== Buy and sell only once ===');
        }
      })

      if (ordersIsGreaterThan2) {
        console.log('=== Increase or decrease coin position ===');
      } else {
        console.log('=== Buy and sell only once ===');
        qty = firstOrder.qty
        quoteQty = firstOrder.quoteQty
        entryPrice = firstOrder.price
        sellingPrice = lastOrder.price
        sellingQty = lastOrder.qty
        sellingQuoteQty = lastOrder.quoteQty
      }

      const { profit, profitRate } = this.calculateStrategyProfit(sellingPrice, entryPrice, qty, quoteQty)

      const strategiesOrder = {
        userId,
        strategyId,
        symbol: firstOrder.symbol,
        price: '',
        qty: qty,
        quoteQty: quoteQty,
        sellingQty,
        sellingQuoteQty,
        profit: 0,
        profitRate: '',
        realizedProfit: profit,
        realizedProfitRate: profitRate,
        entryPrice: entryPrice,
        sellingPrice: sellingPrice,
        is_running: false,
        time: firstOrder.time,
        sellingTime: lastOrder.time
      }

      console.log('strategiesOrder:', strategiesOrder);

      await this.saveStrategiesOrderUtil(strategiesOrder)
    } else {
      console.log('== exist strategyOrderId,update strategy ... ==');
    }

    return { code: 200, message: 'ok', data: null };
  }

  async mergeSpotStrategies(spotOrders: SpotOrder[]): Promise<Result> {
    console.log('spotOrder', spotOrders);
    const firstOrder = get(spotOrders, '[0]', {})
    const { orderId } = firstOrder
    console.log('orderId', orderId);
    const strategyOrderId = await this.findStrategyOrderIdUtil(orderId)
    console.log('strategyOrderId', strategyOrderId);

    if (isEmpty(strategyOrderId)) {
      console.log('== not exist strategy,create strategy ...');
      const strategyId = nanoid()
      // create strategy
      spotOrders.forEach(async (item) => {
        console.log('spotOrders item:', item);
        const { orderId, userId } = item
        await this.saveStrategyOrderIdUtil({
          userId,
          strategyId,
          orderId
        })
      })
    } else {
      console.log('== exist strategyOrderId,update strategy ... ==');
    }

    return { code: 200, message: 'ok', data: null };
  }
  // =========== spot end ===========

  // =========== Strategies Order start ===========
  private async saveStrategyOrderIdUtil(strategyOrderId: StrategyOrderId) {
    await this.strategyOrderIdRepo.save(strategyOrderId);
  }

  private async findStrategyOrderIdUtil(orderId: number): Promise<StrategyOrderId> {
    const sql = `select strategyId,orderId from strategy_orderid where orderId='${orderId}'`;
    const strategyOrderId = await this.strategyOrderIdRepo.query(sql);
    return strategyOrderId;
  }

  private async saveStrategiesOrderUtil(strategiesOrder: StrategiesOrder) {
    await this.strategiesOrderRepo.save(strategiesOrder);
  }

  async getStrategiesOrder(currentPage: number, pageSize: number): Promise<Result> {
    const sql = `select * from strategies_order order by createdAt desc limit ${(currentPage - 1) * pageSize
      },${pageSize}`;

    const res = await this.strategiesOrderRepo.query(sql);
    return { code: 200, message: 'ok', data: res };
  }

  async mergeStrategy(currentPage: number, pageSize: number): Promise<Result> {
    const sql = `select * from spot_order order by time desc limit ${(currentPage - 1) * pageSize
      },${pageSize}`;

    const res = await this.spotOrderRepo.query(sql);
    return { code: 200, message: 'ok', data: res };
  }

  async createStrategiesOrder(spotOrder: SpotOrder): Promise<Result> {
    const { orderId, userId } = spotOrder

    const strategyOrderId = await this.findStrategyOrderIdUtil(orderId)
    console.log('strategyOrderId', strategyOrderId);

    if (isEmpty(strategyOrderId)) {
      console.log('== not exist strategy,insert...');
      const strategyId = nanoid()
      const strategiesOrder = {
        userId: userId,
        strategyId,
        symbol: spotOrder.symbol,
        price: '',
        qty: spotOrder.qty,
        quoteQty: spotOrder.quoteQty,
        sellingQty: '',
        sellingQuoteQty: '',
        profit: 0,
        profitRate: '',
        entryPrice: spotOrder.price,
        sellingPrice: '',
        is_running: true,
        time: spotOrder.time,
        realizedProfit: 0,
        realizedProfitRate: '',
        sellingTime: null
      }

      await this.saveStrategiesOrderUtil(strategiesOrder)
      await this.saveStrategyOrderIdUtil({
        userId,
        strategyId,
        orderId
      })
    } else {
      console.log('== exist strategyOrderId,skip... ==');
    }

    return { code: 200, message: 'ok', data: null };
  }

  async getSpotPrice(symbol: string): Promise<any> {
    /*
      { BTCUSDT: '19376.16000000' }
    */
    return await this.client.spotPrice(symbol)
  }

  async syncStrategyPrice(strategiesOrder: StrategiesOrder): Promise<Result> {
    const { symbol, entryPrice, quoteQty, qty, strategyId } = strategiesOrder
    const spotPrice = await this.getSpotPrice(symbol)
    const price = get(spotPrice, `${symbol}`, '')

    if (!price) {
      return { code: 500, message: 'error', data: null };
    }

    const { profit, profitRate } = this.calculateStrategyProfit(price, entryPrice, qty, quoteQty)

    const sql = `update strategies_order set price = "${price}",profitRate = "${profitRate}",profit = "${profit}" WHERE strategyId = "${strategyId}"`;
    const result = await this.strategiesOrderRepo.query(sql);

    return { code: 200, message: 'ok', data: result };
  }
  // =========== Strategies Order end ===========
}
