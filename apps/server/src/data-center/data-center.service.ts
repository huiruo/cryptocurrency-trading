import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cloneDeep, get, isEmpty } from 'lodash';
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
import { OrderType } from 'binance-api-node';

export interface BalanceType {
  asset: string;
  free: string;
  // 挂单的锁定
  locked: string;
  // 币价值
  value?: number
  // 可以出售的free,当有理财才有值，否则直接取free进行出售
  canSellFree?: string
}

let isTrade = 0

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

  async getSymbolsPrice(symbols: string[]) {
    // doc
    // https://binance-docs.github.io/apidocs/spot/cn/#8ff46b58de
    const config = {
      options: {},
      baseURL: `https://api.binance.com/api/v3/ticker/price`,
      method: 'GET',
      url: `?symbols=["${symbols.join('","')}"]`,
      apiKey: '',
      proxyUrl: '',
    };
    // console.log('config', config)
    const gotData: any = await createRequest(config);
    if (gotData.statusCode === 200) {
      return gotData.data
    }
  }

  private search_LD_earn(asset: string): { isEarn: boolean, asset: string } {
    const isInclude = asset.search(new RegExp(`^LD`))
    if (isInclude !== -1) {
      // 除开和理财名字相似的asset
      if (asset === 'LDO') {
        // 不是是理财,但是LDO
        // console.log('C.不是是理财,但是LDO', asset, '-', isInclude)
        return { isEarn: false, asset }
      } else {
        // 是理财
        return { isEarn: true, asset: asset.substring(2) }
      }
    } else {
      // 不是是理财
      return { isEarn: false, asset }
    }
  }

  // 处理活期理财/挂单locked；生成请求price数组
  private handleFlexibleEarnAndlocked(index: number, balances: BalanceType[], earns: string[]): string {
    const balance = balances[index]
    const { locked, free } = balance
    const { asset, isEarn } = this.search_LD_earn(balance.asset)
    // 处理挂单
    if (Number(locked)) {
      const assetIndex = balances.findIndex(item => {
        return item.asset === asset;
      });
      const freeTotal = new Big(free).plus(locked).toString();
      balances[assetIndex] = { ...balance, free: freeTotal, canSellFree: free }
    }

    // 处理活期理财
    if (isEarn) {
      const assetIndex = balances.findIndex(item => {
        return item.asset === asset;
      });
      if (assetIndex > -1) {
        // 1.存在现货+活期，移除活期理财，合并入现货
        const { free: spotFree, asset: spotAsset, locked: spotLocked } = balances[assetIndex]
        const freeTotal = new Big(free).plus(spotFree).toString();
        balances[assetIndex] = { locked: spotLocked, free: freeTotal, asset: spotAsset, canSellFree: spotFree }
        earns.push(balance.asset)
      } else {
        // 2.直接添加活期理财
        balances[index] = { locked, free, asset, canSellFree: '0' }
      }
    }

    return asset
  }

  calculateValue(balances: BalanceType[], symbolsPriceMap: Map<string, string>): { total: number, alCoinVal: number, otherCoinVal: number } {
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
          // console.log(`${asset}添加入alCoin`)
          alCoinVal = alCoinVal + value
        } else {
          // console.log(`${asset}添加入otherCoin`)
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
      const balancesExchangeUsdt: string[] = []
      const earns: string[] = []
      const res = await this.client.getAccountInfo();
      const balances = get(res, 'balances', []).filter(
        (item) => Number(item.free) !== 0,
      ) as BalanceType[];

      balances.forEach((_, index) => {
        const asset = this.handleFlexibleEarnAndlocked(index, balances, earns)
        // 请求price数组排除稳定币,否则接口报错
        if (!stableCoins.includes(asset)) {
          const exchange = `${asset}USDT`
          balancesExchangeUsdt.push(exchange)
        }
      });

      const balancesTarget = balances.filter(item => !earns.includes(item.asset))
      const symbols = Array.from(new Set(balancesExchangeUsdt))
      const symbolsPrice = await this.getSymbolsPrice(symbols)
      const symbolsPriceMap = new Map(symbolsPrice.map((item: { symbol: string; price: string; }) => [item.symbol, item.price])) as Map<string, string>

      /*
        开始计算
      */
      // const maxOtherCoinRatio = 0.3
      const maxOtherCoinRatio = 0.1
      const { total, alCoinVal, otherCoinVal } = this.calculateValue(balancesTarget, symbolsPriceMap)
      const alCoinValRatio = new Big(alCoinVal).div(total).toNumber()
      const otherCoinValRatio = new Big(otherCoinVal).div(total).toNumber()

      console.log('earns:', earns)
      console.log(`0.账户总值：${(total)}U`)
      console.log(`1.alCoinValRatio持仓占比${(alCoinValRatio * 100).toFixed(4)}%,总值${alCoinVal}U`)
      console.log(`2.otherCoinValRatio持仓占比${(otherCoinValRatio * 100).toFixed(4)}%,总值${otherCoinVal}U`)
      if (otherCoinValRatio > maxOtherCoinRatio) {
        console.log(`A.otherCoin总值${otherCoinVal}U,超过${maxOtherCoinRatio * 100}%,开始选择清仓`)
      }

      // const maxPositionRatio = 0.3
      const maxPositionRatio = 0.1
      let orderType = 'LIMIT'
      // let orderType = 'MARKET'

      console.log('==============>')
      balancesTarget.forEach(async item => {
        const { value, asset, canSellFree, free } = item
        const ratio = new Big(value).div(total).toNumber()
        console.log(`4-1.${asset}持仓占比${(ratio * 100).toFixed(4)}%,总值${value}U`)

        /*
        if (asset === 'WAN') {
          console.log(`4-2.账户总价值${total}U，${asset}总值${value}U,超过${maxPositionRatio * 100}%,开始清仓`)
          const quantity = Number(canSellFree || free)
          const price = '0.25000'

          if (orderType === OrderType.LIMIT) {
            await this.sellSpot(asset, quantity, 'LIMIT', price)
          } else if (orderType === OrderType.MARKET) {
            await this.sellSpot(asset, quantity, 'MARKET')
          }
        }
        */

        ///*
        if (ratio > maxPositionRatio) {
          console.log(`4-2.账户总价值${total}U，${asset}总值${value}U,超过${maxPositionRatio * 100}%,开始清仓`)
          const quantity = Number(canSellFree || free)
          // const quantity = 0.0000009
          // const quantity = 9001
          const price = '25000'

          if (orderType === OrderType.LIMIT) {
            await this.sellSpot(asset, quantity, 'LIMIT', price)
          } else if (orderType === OrderType.MARKET) {
            await this.sellSpot(asset, quantity, 'MARKET')
          }
        }
        //*/
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

  async exchangeInfo(symbol: string) {
    const config = {
      options: {},
      baseURL: `https://api.binance.com/api/v3/exchangeInfo`,
      method: 'GET',
      url: `?symbol=${symbol}`,
      apiKey: '',
      proxyUrl: '',
    };
    const gotData: any = await createRequest(config);
    if (gotData.statusCode === 200) {
      return get(gotData.data, 'symbols[0].filters', [])
    }
  }

  // 获取小数点后位数
  private countDecimal(num: number): number {
    console.log('获取小数点后位数:', num.toString().split("."))
    const splitNum = num.toString().split(".")
    // 有可能是整数
    if (splitNum.length === 1) {
      return 0
    }

    return num.toString().split(".")[1].length;
  }

  // 不四舍五入
  private numPoint(num: number, point: number): number {
    return Math.floor(num * Math.pow(10, point)) / Math.pow(10, point);
  }

  /*
  LIMIT ==> LOT_SIZE 
  MARKET ==> MARKET_LOT_SIZE 
  */
  async sellSpot(asset: string, quantity: number, orderType: string, price?: string) {
    const defaultExchange = 'USDT'
    const exchange = `${asset}${defaultExchange}`
    const filters = await this.exchangeInfo(exchange)

    // 这里有个问题，如果市价单读取MARKET_LOT_SIZE，stepSize,minQty 为0会导致订单提交失败，所以这里都按照 LOT_SIZE 的过滤器来过滤订单
    const filterKey = 'LOT_SIZE'
    // const filterKey = 'MARKET_LOT_SIZE'
    const LOT_SIZE = filters.find(item => { return item.filterType === filterKey });

    const { minQty, maxQty, stepSize } = LOT_SIZE
    const stepSizeNum = Number(stepSize)
    const minQtyNum = Number(minQty)
    const maxQtyNum = Number(maxQty)

    let callCellQty = 0
    const decimalCount = this.countDecimal(stepSizeNum)
    callCellQty = this.numPoint(quantity, decimalCount)

    console.log('LOT_SIZE', LOT_SIZE);
    console.log('sellSpot====>end', filters)
    console.log('callCellQty:', callCellQty, 'quantity', quantity)
    console.log('decimalCount:', decimalCount)
    /* 
      https://binance-docs.github.io/apidocs/spot/cn/#cc81fff589
      (callCellQty - minQtyNum) % stepSizeNum !== 0
    */
    const filterStepSize = new Big(callCellQty).minus(minQtyNum).mod(stepSizeNum).toNumber()
    if (filterStepSize === 0 && maxQtyNum > callCellQty && minQtyNum < callCellQty) {
      if (orderType === OrderType.LIMIT) {
        const tradeRes = await this.client.tradeSpot({
          symbol: exchange,
          side: 'SELL',
          quantity: callCellQty.toString(),
          price,
          type: orderType
        })
        console.log('1-1.可以提交limit...', { exchange, quantity: callCellQty, price, orderType });
        console.log('1-2.res', tradeRes);
      } else if (orderType === OrderType.MARKET) {
        console.log('0.开始提交市价...', { exchange, quantity: callCellQty, orderType });
        // const tradeRes = await this.client.tradeSpotTest({
        const tradeRes = await this.client.tradeSpot({
          symbol: exchange,
          side: 'SELL',
          quantity: callCellQty.toString(),
          type: orderType
        })
        console.log('1-1.可以提交市价...', { exchange, quantity: callCellQty, orderType });
      }
    } else {
      console.log('2.stepsize error...', { exchange, quantity: callCellQty, price, orderType });
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
