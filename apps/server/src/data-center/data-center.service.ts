import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { get, isEmpty } from 'lodash';
import { Result } from 'src/common/result.interface';
import { createRequest } from 'src/common/binance-connector/helpers/utils';
import { ConfigService } from '@nestjs/config';
import { CoinCode } from './data-center.entity';
import { Coin } from '../entity/coin.entity';
import { CoinAddition } from '../entity/coin.addition.entity';
import { DayKline } from '../entity/day.kline.entity';
import { CoinDevMember } from '../entity/coin.member.entity';
import { BaseServiceBiance } from 'src/utils/base-service-biance';
import { Balances } from '../entity/balances.entity';
import { FuturesOrder } from '../entity/futures-order.entity';
import { SpotOrder } from '../entity/spot-order.entity';
import { StrategyOrder } from '../entity/strategy-order.entity';
import { StrategyOrderId } from '../entity/strategy-orderid.entity';
import {
  AssetType,
} from 'src/common/types';
import { TradeAsset } from '../entity/asset.entity';
import { TraderApi } from '../entity/api.entity';
import { DailyProfit } from '../entity/daily.profit.entity';
import Big from 'big.js';

export interface BalanceType {
  asset: string;
  free: string;
  locked: string;
  symbol?: string
  value?: number
}


const stableCoins = ['USDT', 'BUSD', 'USDC'];
const alCoin = ['BTC', 'ETH', 'BNB']

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
    console.log('Api', { apiKey, secretKey });
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

    const pageRes = await this.spotOrderRepo.query(`select count(1) as total from coin`);
    const res = await this.coninRepo.query(sql);

    return {
      code: 200, message: 'ok', data:
      {
        total: Number(get(pageRes, '[0].total', 0)),
        res: res
      }
    };
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

  async getAllSymbolsPrice(): Promise<{ [index: string]: string }> {
    const res = await this.client.prices();
    return res
  }

  async getTickerPrice(symbols: string[]) {
    const config = {
      options: {},
      baseURL: `https://api.binance.com/api/v3/ticker/price`,
      method: 'GET',
      url: `?symbols=["${symbols.join('","')}"]`,
      apiKey: '',
      proxyUrl: '',
    };
    const gotData: any = await createRequest(config);
    if (gotData.statusCode === 200) {
      return gotData.data
    }
  }

  // 处理活期理财；生成请求price数组
  private handleFlexibleEarn(symbol: string, balances: BalanceType[]): boolean {
    const earnTarget = 'LD' + symbol
    const assetEarnIndex = balances.findIndex(item => {
      return item.asset === earnTarget;
    });

    if (assetEarnIndex > -1) {
      const assetIndex = balances.findIndex(item => {
        return item.asset === symbol;
      });
      const { free: earnfree, locked: earnLocked, asset } = balances[assetEarnIndex]
      if (assetIndex > -1) {
        // 1.移除活期理财，合并入asset
        const { free, locked } = balances[assetIndex]
        const freeTotal = new Big(free).plus(earnfree).toString();
        balances[assetIndex] = { locked, free: freeTotal, asset: symbol, symbol: asset }
        balances.splice(assetEarnIndex, 1)

        return true
      } else {
        // 2.直接添加活期理财
        balances[assetEarnIndex] = { locked: earnLocked, free: earnfree, asset: symbol, symbol: asset }

        return true
      }
    } else {
      console.log("3.不包含活期理财");
      return false
    }
  }

  calculateValue(balances: BalanceType[], symbolsPriceMap): { total: number, alCoinVal: number, otherCoinVal: number } {
    let total = 0
    let alCoinVal = 0
    let otherCoinVal = 0
    balances.forEach((balance, index) => {
      const { free, asset, locked } = balance
      const exchange = asset + 'USDT'
      const freeNums = Number(free)
      if (!stableCoins.includes(asset)) {
        const lockedNums = Number(locked)
        const price = Number(symbolsPriceMap.get(exchange))
        const coins = new Big(freeNums).plus(lockedNums);
        const value = coins.times(price).toNumber()
        total = total + value
        balances[index].value = value
        if (alCoin.includes(asset)) {
          console.log(`${asset}添加入alCoin`)
          alCoinVal = alCoinVal + value
        } else {
          console.log(`${asset}添加入otherCoin`)
          otherCoinVal = otherCoinVal + value
        }
      } else {
        // freeNums包括活期的理财稳定币+现货，但是不包括挖矿锁仓/定期的币
        total = total + freeNums
        alCoinVal = alCoinVal + freeNums
        balances[index].value = freeNums
      }
    })

    return { total, alCoinVal, otherCoinVal }
  }

  async syncBalances(): Promise<Result> {
    try {
      const res = await this.client.getAccountInfo();
      const balances = get(res, 'balances', []).filter(
        (item) => Number(item.free) !== 0,
      ) as BalanceType[];

      const balancesExchangeUsdt = []
      balances.forEach(item => {
        const { asset } = item
        this.handleFlexibleEarn(asset, balances)
        // 请求price数组排除稳定币,否则接口报错
        if (!stableCoins.includes(asset)) {
          const exchange = `${asset}USDT`
          balancesExchangeUsdt.push(exchange)
        }
      });

      const symbolsPrice = await this.getTickerPrice(balancesExchangeUsdt)
      const symbolsPriceMap = new Map(symbolsPrice.map(item => [item.symbol, item.price]))
      // 计算

      // const otherCoinMaxPositionRatio = 0.3
      const otherCoinMaxPositionRatio = 0.1
      const { total, alCoinVal, otherCoinVal } = this.calculateValue(balances, symbolsPriceMap)
      const alCoinValRatio = new Big(alCoinVal).div(total).toNumber()
      const otherCoinValRatio = new Big(otherCoinVal).div(total).toNumber()

      console.log('symbolsPrice:', symbolsPrice)
      // console.log('balances:', balances)
      console.log(`total:`, { total, alCoinVal, otherCoinVal })
      console.log(`alCoinValRatio持仓占比${(alCoinValRatio * 100).toFixed(4)}%,总值${alCoinVal}U`)
      console.log(`otherCoinValRatio持仓占比${(otherCoinValRatio * 100).toFixed(4)}%,总值${otherCoinVal}U`)
      console.log('======>')
      if (otherCoinValRatio > otherCoinMaxPositionRatio) {
        console.log(`otherCoin总值${otherCoinVal}U,超过${otherCoinMaxPositionRatio * 100}%,开始选择清仓`)
      }
      console.log('======>')

      // const maxPositionRatio = 0.3
      const maxPositionRatio = 0.1
      balances.forEach(item => {
        const { value, asset } = item
        const ratio = new Big(value).div(total).toNumber()
        console.log(`${asset}持仓占比${(ratio * 100).toFixed(4)}%,总值${value}U`)
        if (ratio > maxPositionRatio) {
          console.log(`账户总价值${total}U，${asset}总值${value}U,超过${maxPositionRatio * 100}%,开始清仓`)
        }
      })

      /*
      const sql = `TRUNCATE TABLE balances`;
      await this.coninRepo.query(sql);
      //{asset: 'ETH', free: '0.00003934', locked: '0.00000000'}
      balances.forEach(async (item) => {
        // mock userId
        this.createBalancesUtil({ ...item, userId: 1 });
      });
      */

      return { code: 200, message: 'ok', data: balances };
    } catch (error) {
      console.log('error:', error)
      return { code: 500, message: 'sync balances error', data: null };
    }
  }
  // =========== Balances end ===========

  async getAssetList(): Promise<Result> {
    const res = await this.tradeAssetRepo.find();

    return { code: 200, message: 'ok', data: res };
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


  async getCandle(): Promise<Result> {
    const symbol = 'BTCUSDT'
    const interval = '5m'
    const res = await this.client.candles(symbol, interval);
    return { code: 500, message: 'Duplicate asset', data: res };
  }
}
