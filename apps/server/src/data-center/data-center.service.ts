import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { get, isEmpty } from 'lodash';
import { Result } from 'src/common/result.interface';
import { createRequest } from 'src/common/got-requst/utils';
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
import { AssetType, SyncSpotOrderParams } from 'src/common/types';
import { TradeAsset } from '../entity/asset.entity';
import { TraderApi } from '../entity/api.entity';
import { DailyProfit } from '../entity/daily.profit.entity';
import Big from 'big.js';
import { plus, minus, times, divide } from 'src/common/boter-math'
import { MyTrade, OrderType } from 'binance-api-node';
import { BinanceConnector } from 'src/common/binance-connector2';
import { calculateSpotCostPrice } from 'src/utils/utils';
// import { mockBTCOrders, mockIMX } from './mock-orders'

export interface BalanceType {
  asset: string;
  free: string;
  // 挂单的锁定
  locked: string;
  // 币价值
  quoteQty: number
  // 可以出售的free,当有理财才有值，否则直接取free进行出售
  canSellFree?: string
}

const stableCoins = ['USDT', 'BUSD', 'USDC'];
const alCoin = ['BTC', 'ETH', 'BNB']
// 不存在/过期的代币
const excludeSymbol = ['ETHW']

interface MyTrades {
  symbol: string
  qty: number
  quoteQty: number
  costPrice: number
  totalFree: number
  time: number
  finalOrderId: number
  isBuyer?: boolean
  isRunning: boolean
}

const myTrades: MyTrades[] = []

@Injectable()
export class DataCenterService {
  private client: BaseServiceBiance;
  private userWsClient: any;
  private userWsRef: any;

  private positionWsClient: any;
  private positionWsRef: any;

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
    /*
    const apiKey = this.configService.get<string>('binanceApiKey');
    const secretKey = this.configService.get<string>('binanceSecretKey');
    if (apiKey && secretKey) {
      this.client = BaseServiceBiance.getInstance();
    } else {
      console.log('=== Api key do not exist ===');
    }
    */
    this.client = BaseServiceBiance.getInstance();
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
    // https://binance-docs.github.io/apidocs/spot/cn/#8ff46b58de
    const config = {
      options: {},
      baseURL: `https://api.binance.com/api/v3/ticker/price`,
      method: 'GET',
      url: `?symbols=["${symbols.join('","')}"]`,
      apiKey: '',
      proxyUrl: '',
    };

    console.log('config', config)

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

  // 处理活期理财/挂单locked/过期的代币；生成请求price数组
  private handleFlexibleEarnAndlocked(index: number, balances: BalanceType[], earnsOrExclude: string[]): string {
    const balance = balances[index]
    const { locked: lockedStr, free: freeStr } = balance
    const free = Number(freeStr)
    const locked = Number(lockedStr)
    const { asset, isEarn } = this.search_LD_earn(balance.asset)
    // 处理不存在/过期的代币
    if (excludeSymbol.includes(asset)) {
      console.log('处理不存在/过期的代币', asset);
      earnsOrExclude.push(asset)

      return asset
    }

    // 处理挂单
    if (locked) {
      const assetIndex = balances.findIndex(item => {
        return item.asset === asset;
      });
      const freeTotal = plus(free, locked).toString();
      balances[assetIndex] = { ...balance, free: freeTotal, canSellFree: freeStr }
    }

    // 处理活期理财
    if (isEarn) {
      const assetIndex = balances.findIndex(item => {
        return item.asset === asset;
      });

      if (assetIndex > -1) {
        // 1.存在现货+活期，移除活期理财，合并入现货
        const { free: spotFree, asset: spotAsset, locked: spotLocked } = balances[assetIndex]
        const freeTotal = plus(free, Number(spotFree)).toString();
        balances[assetIndex] = { locked: spotLocked, free: freeTotal, asset: spotAsset, quoteQty: 0, canSellFree: spotFree }
        earnsOrExclude.push(balance.asset)
      } else {
        // 2.直接添加活期理财
        balances[index] = { locked: lockedStr, free: freeStr, asset, quoteQty: 0, canSellFree: '0' }
      }
    }

    return asset
  }

  // 计算总价值和单个币种的价值
  calculateValue(balances: BalanceType[], symbolsPriceMap: Map<string, string>): { total: number, alCoinVal: number, otherCoinVal: number } {
    let total = 0
    let alCoinVal = 0
    let otherCoinVal = 0
    balances.forEach((balance, index) => {
      const { free: freeStr, asset, locked } = balance

      const exchange = asset + 'USDT'
      const free = Number(freeStr)
      if (!stableCoins.includes(asset)) {
        const lockedNums = Number(locked)
        // 这里注意，symbolsPriceMap.get(exchange) 找不到 对应的key,下面逻辑就会报错,所以这里排除price为 NaN 容错
        const price = Number(symbolsPriceMap.get(exchange))
        if (price) {
          const coins = plus(free, lockedNums);
          // 持仓总价值
          const quoteQty = times(coins, price)
          total = plus(total, quoteQty)
          balances[index].quoteQty = quoteQty
          if (alCoin.includes(asset)) {
            // ${asset}添加入alCoin
            // alCoinVal = alCoinVal + quoteQty
            alCoinVal = plus(alCoinVal, quoteQty)
          } else {
            // ${asset}添加入otherCoin
            // otherCoinVal = otherCoinVal + quoteQty
            otherCoinVal = plus(otherCoinVal, quoteQty)
          }
        }
      } else {
        // free包括活期的理财稳定币+现货，但是不包括挖矿锁仓/定期的币
        total = plus(total, free)
        alCoinVal = plus(alCoinVal, free)
        balances[index].quoteQty = free
      }
    })

    return { total, alCoinVal, otherCoinVal }
  }

  async getSpotOrder(spotOrderParams: SyncSpotOrderParams): Promise<MyTrade[]> {
    const { symbol, startTime, endTime } = spotOrderParams
    let options = {}
    if (startTime && endTime) {
      options = {
        symbol,
        recvWindow: 59999,
        startTime,
        endTime,
      }
    } else {
      options = {
        symbol,
        recvWindow: 59999,
      }
    }

    const data = await this.client.getMyTrades(options);

    console.log('获取该资源的所有订单数据:', data.length, spotOrderParams);
    return data
  }

  async createListenKey() {
    return this.userWsClient.createListenKey()
  }

  async startUserWebsocket(): Promise<Result> {
    const apiKey = this.configService.get<string>('binanceApiKey');
    const secretKey = this.configService.get<string>('binanceSecretKey');
    this.userWsClient = new BinanceConnector(apiKey, secretKey)

    const callbacks = {
      open: () => console.log('Connected with Websocket server use userData'),
      close: () => console.log('Disconnected with Websocket server use userData'),
      message: (data: any) => {
        console.log('UserWebsocket===>', data)
        const dataObj = JSON.parse(data)
        this.onUserData(dataObj, dataObj.e)
      }
    }

    const { data: lkData, status } = await this.createListenKey()
    if (status === 200) {
      const listenKey = get(lkData, 'listenKey', '')
      this.userWsRef = this.userWsClient.userData(listenKey, callbacks)

      return { code: 200, message: 'subscribeWebsocket userData ok', data: null };
    }

    return { code: 200, message: 'failed to subscribeWebsocket userData', data: null };
  }

  async onUserData(data: any, eventType: string) {
    if (eventType === 'executionReport') {
      const { E: time, s: symbol, S: side, o: orderType, q: qty, p: price, X: orderStatus, i: orderId, n: freeNum, N: freeAsset, Z: tradedQty, Y: notTradedQty } = data
      console.log('订单处理:', {
        eventType,
        time,
        symbol,
        side,
        orderType,
        qty,
        price,
        orderStatus,
        orderId,
        freeNum,
        freeAsset,
        tradedQty,
        notTradedQty
      })

      if (orderStatus === 'NEW') {
        console.log('==1.挂单==');
      }

      if (orderStatus === 'TRADE') {
        console.log('==2.订单成交==', symbol);
      }

      if (orderStatus === 'CANCELED') {
        console.log('==3.取消订单==');
        // 这里只传 symbol,因为订单可能被拆分，qty等参数在这里失去作用,所以订单的聚合在下面的逻辑
        console.log('==测试,以下逻辑正式上线放在 orderStatus == TRADE,这里为了方便测试==');
        this.onTrade(symbol, side)
      }

      if (orderStatus == 'REJECTED') {
        console.log('==4.新订单被拒绝==', symbol);
      }
    }
  }

  // 找出持仓资源,也可以在 socket userData订阅返回，这里选择拿接口数据
  async getAccountAsset(symbol: string): Promise<BalanceType> {
    const res = await this.client.getAccountInfo();
    const balances = get(res, 'balances', []).filter(
      (item) => Number(item.free) !== 0,
    ) as BalanceType[];

    // test mock
    /*
    balances.push({
      asset: 'IMX',
      free: '504.54000000',
      locked: '0.00000000'
    })
    */
    // 2.10 18:02 挂单成交,1.008
    /*
    balances.push({
      asset: 'IMX',
      free: '991.08',
      locked: '0.00000000'
    })
    */
    // console.log('balances:', balances);
    // test mock

    let balance = {} as BalanceType
    balances.forEach((item) => {
      const isInclude = symbol.search(new RegExp(`^${item.asset}`))
      // console.log('==1.找出持仓asset==:', item);
      if (isInclude !== -1) {
        console.log('==2.找到持仓asset==:', item);
        balance = item
      }
    })

    return balance
  }

  async getAccountInfo(): Promise<BalanceType[]> {
    const res = await this.client.getAccountInfo();
    const balances = get(res, 'balances', []).filter(
      (item) => Number(item.free) !== 0,
    ) as BalanceType[];

    return balances
  }

  tradeWS() {
    const apiKey = this.configService.get<string>('binanceApiKey');
    const secretKey = this.configService.get<string>('binanceSecretKey');
    this.userWsClient = new BinanceConnector(apiKey, secretKey)
    const callbacks = {
      open: () => console.log('Connected with Websocket server'),
      close: () => console.log('Disconnected with Websocket server'),
      message: data => console.log('tradeWS:', data)
    }

    this.userWsRef = this.userWsClient.tradeWS('BTCUSDT', callbacks)
    // setTimeout(() => this.wsClient.unsubscribe(wsRef), 60000)
  }

  tickerWS() {
    // this.wsClient = new BinanceConnector('', '')
    const apiKey = this.configService.get<string>('binanceApiKey');
    const secretKey = this.configService.get<string>('binanceSecretKey');
    this.userWsClient = new BinanceConnector(apiKey, secretKey)
    const callbacks = {
      open: () => console.log('Connected with Websocket server'),
      close: () => console.log('Disconnected with Websocket server'),
      message: data => console.log('tickerWS:', data)
    }

    this.userWsRef = this.userWsClient.tradeWS('BTCUSDT', callbacks)
  }

  /*
  1s 1m 3m 5m 15m 30m 
  */
  klineWS(symbol: string, interval = '1m') {
    // const apiKey = this.configService.get<string>('binanceApiKey');
    // const secretKey = this.configService.get<string>('binanceSecretKey');
    // this.wsClient = new BinanceConnector(apiKey, secretKey)
    this.userWsClient = new BinanceConnector('', '')
    const callbacks = {
      open: () => console.log('Connected with Websocket server'),
      close: () => console.log('Disconnected with Websocket server'),
      message: data => console.log('tickerWS:', data)
    }

    this.userWsRef = this.userWsClient.klineWS(symbol, interval, callbacks)
  }

  // const symbols = ['IMXUSDT', 'BTCUSDT']
  // const wsType = 'kline_1m'
  // const wsType = 'kline_1s'
  // const wsType = 'ticker'
  // const wsType = 'miniTicker'
  subscribeWsForPosition(wsType: string, myTradesParms: MyTrades[]) {
    const symbolStreams = myTradesParms.map(item => `${item.symbol.toLowerCase()}@${wsType}`)
    console.log('symbolStreams:', symbolStreams);
    this.combinedStreams(symbolStreams, myTradesParms)
  }

  combinedStreams(symbolStreams: string[], myTradesParms: MyTrades[]) {
    this.positionWsClient = new BinanceConnector('', '')
    const callbacks = {
      open: () => console.log('Connected with Websocket server use combinedStreams'),
      close: () => console.log('Disconnected with Websocket server use combinedStreams'),
      message: (data: any) => {
        const dataObj = JSON.parse(data)
        this.onCombinedStreams(dataObj.data, myTradesParms)
      }
    }
    this.positionWsRef = this.positionWsClient.combinedStreams(symbolStreams, callbacks)
  }

  onCombinedStreams(data: any, myTradesParms: MyTrades[]) {
    const symbol = get(data, 's', '')
    const price = get(data, 'k.c', '')
    const time = get(data, 'E', '')
    // 开始计算盈利
    myTradesParms.forEach(item => {
      if (item.symbol === symbol) {
        const { qty, quoteQty, costPrice, totalFree } = item
        const { profit, profitRate } = calculateMyTradeProfit(qty, quoteQty, costPrice, totalFree, price)
        console.log(`${symbol}=${price};成本${costPrice},盈亏${profit},${profitRate},持仓${quoteQty}=${new Date(time).toLocaleString()}`);
      }
    })
  }

  async onTrade(symbol: string, side: boolean) {
    // 第0步骤，ws 监听挂单的成交
    // 逻辑在上面

    // 第一步获取持仓资源
    const { free: freeStr, locked: lockedStr } = await this.getAccountAsset(symbol)
    console.log('获取持仓资源是否为空==>', { freeStr, lockedStr })
    // 容错,获取持仓资源为空
    if (!freeStr) {
      /* 清仓逻辑未处理
      else {
        console.log('只有一个订单-卖出')
        const index = myTrades.findIndex(item => item.symbol == symbol)
        myTrades[index].isRunning = false
      }
      */
      return
    }

    const free = Number(freeStr)
    const locked = Number(lockedStr)
    const assetTotal = plus(free, locked)
    console.log('获取持仓资源:', { symbol, free, locked, assetTotal })


    // 第二步获取该资源的所有订单: 排序：[older,...,newest],接口最大返回 500 条
    const orders = await this.getSpotOrder({ symbol, startTime: 0, endTime: 0 })
    // 生成myTrade
    let qtyLoop = 0
    let quoteQtyLoop = 0

    // 反向遍历从最新遍历
    let length = orders.length
    for (let dynamicLength = orders.length - 1; dynamicLength >= 0; dynamicLength--) {
      const { qty: qtyStr, quoteQty: quoteQtyStr, price: priceStr, symbol, orderId, time, isBuyer } = orders[dynamicLength];
      const qty = Number(qtyStr)
      const quoteQty = Number(quoteQtyStr)
      const price = Number(priceStr)

      // 情况1：只有一个订单
      if (assetTotal === qty) {
        if (isBuyer) {
          console.log(`只有一个买入订单-结束循环', ${qty}, ${qtyLoop}, ${quoteQty}, ${quoteQtyLoop},${new Date(time).toLocaleString()}`)
          myTrades.push({
            symbol,
            qty,
            quoteQty,
            costPrice: price,
            totalFree: 0,
            finalOrderId: orderId,
            time,
            isRunning: true
          })
        }

        // 第四步，开启 ws
        this.startSubscribeWsForPosition(myTrades)

        break
      }

      // dynamicLength !== length - 1 排除最新的一条数据
      if (dynamicLength !== length - 1) {
        // 情况2：拆分订单,判断它的订单id是同一个
        let lastOrder = orders[dynamicLength + 1]
        if (lastOrder.orderId === orderId) {
          const { qtyCal, quoteQtyCal } = calculateSpotCostPrice(qty, quoteQty, qtyLoop, quoteQtyLoop, isBuyer)
          qtyLoop = qtyCal
          quoteQtyLoop = quoteQtyCal
          if (isBuyer) {
            console.log(`A.情况2-是合并订单买入', ${qty}, ${qtyLoop}, ${quoteQty}, ${quoteQtyLoop},${new Date(time).toLocaleString()}`)
          } else {
            console.log(`A.情况2-是合并订单卖出', ${qty}, ${qtyLoop}, ${quoteQty}, ${quoteQtyLoop},${new Date(time).toLocaleString()}`)
          }
        } else {
          if (qtyLoop === assetTotal) {
            const costPriceLoop = Number(divide(quoteQtyLoop, qtyLoop).toFixed(8))
            console.log(`B.订单计算完毕-结束循环', ${qty}, ${qtyLoop}, ${quoteQty}, ${quoteQtyLoop},${costPriceLoop},${new Date(time).toLocaleString()}`)
            myTrades.push({
              symbol,
              qty: qtyLoop,
              quoteQty: quoteQtyLoop,
              costPrice: costPriceLoop,
              totalFree: 0,
              finalOrderId: orderId,
              time,
              isRunning: true
            })
            // 第四步，开启 ws
            this.startSubscribeWsForPosition(myTrades)

            break
          } else if (qtyLoop > assetTotal) {
            const costPriceLoop = Number(divide(quoteQtyLoop, qtyLoop).toFixed(8))
            console.log(`如果订单计算的qtyLoop > 持有的token数量,认为上一条是最后一个订单,把数据复原到上一条,结束循环', ${qty}, ${qtyLoop}, ${quoteQty}, ${quoteQtyLoop},${new Date(time).toLocaleString()}`)
            // 如果是买入，减回去;卖出，加回去
            if (isBuyer) {
              qtyLoop = minus(qtyLoop, qty)
              quoteQtyLoop = minus(quoteQtyLoop, quoteQty)
            } else {
              qtyLoop = plus(qtyLoop, qty)
              quoteQtyLoop = plus(quoteQtyLoop, quoteQty)
            }

            myTrades.push({
              symbol,
              qty: qtyLoop,
              quoteQty: quoteQtyLoop,
              costPrice: costPriceLoop,
              totalFree: 0,
              finalOrderId: orderId,
              time,
              isRunning: true
            })
            // 第四步，开启 ws
            this.startSubscribeWsForPosition(myTrades)

            break
          } else {
            const { qtyCal, quoteQtyCal } = calculateSpotCostPrice(qty, quoteQty, qtyLoop, quoteQtyLoop, isBuyer)
            qtyLoop = qtyCal
            quoteQtyLoop = quoteQtyCal
            if (isBuyer) {
              console.log(`B.独立订单-asset对应不上，进一步计算补仓', ${qty}, ${qtyLoop}, ${quoteQty}, ${quoteQtyLoop},${new Date(time).toLocaleString()}`)
            } else {
              console.log(`B.独立订单-asset对应不上，进一步计算减仓', ${qty}, ${qtyLoop}, ${quoteQty}, ${quoteQtyLoop},${new Date(time).toLocaleString()}`)
            }
          }
        }
      } else {
        const { qtyCal, quoteQtyCal } = calculateSpotCostPrice(qty, quoteQty, qtyLoop, quoteQtyLoop, isBuyer)
        qtyLoop = qtyCal
        quoteQtyLoop = quoteQtyCal
        if (isBuyer) {
          console.log(`=第一条循环数据，-卖入', ${qty}, ${qtyLoop}, ${quoteQty}, ${quoteQtyLoop},${new Date(time).toLocaleString()}`)
        } else {
          console.log(`=第一条循环数据，-卖出', ${qty}, ${qtyLoop}, ${quoteQty}, ${quoteQtyLoop},${new Date(time).toLocaleString()}`)
        }
      }
    }
  }

  async startSubscribeWsForPosition(myTrades: MyTrades[]) {
    if (this.positionWsRef) {
      console.log('第四步1-1，先关闭 ws==>');
      await this.unsubscribePositionWs()
      console.log('第四步1-2，再开启 ws==>');
      this.subscribeWsForPosition('kline_1m', myTrades)
    } else {
      console.log('第四步-B，开启 ws==>');
      this.subscribeWsForPosition('kline_1m', myTrades)
    }
  }

  async unsubscribePositionWs(): Promise<Result> {
    if (this.positionWsRef) {
      console.log('A-1.PositionWs 不为空，开始关闭');
      await this.positionWsClient.unsubscribe(this.positionWsRef)
      console.log('A-2.PositionWs 关闭关闭成功');
      this.positionWsRef = null
      return { code: 200, message: 'stop ok', data: null };
    } else {
      console.log('B.PositionWs not running');
      return { code: 200, message: 'PositionWs not running', data: null };
    }
  }

  async unsubscribeUserWs(): Promise<Result> {
    console.log('unsubscribeUserWs start');
    if (this.userWsRef) {
      console.log('A-1.UserWs 不为空');
      await this.userWsClient.unsubscribe(this.userWsRef)
      console.log('A-2.UserWs 不为空');
      this.userWsRef = null
      return { code: 200, message: 'stop ok', data: null };
    } else {
      console.log('B.UserWs not running');
      return { code: 200, message: 'UserWs not running', data: null };
    }
  }

  async syncBalances(): Promise<Result> {
    try {
      const balancesExchangeUsdt: string[] = []
      const earnsOrExclude: string[] = []
      const balances = await this.getAccountInfo()

      balances.forEach((_, index) => {
        const asset = this.handleFlexibleEarnAndlocked(index, balances, earnsOrExclude)
        // 请求price数组排除稳定币和过期代币,否则接口报错
        if (!stableCoins.includes(asset) && !excludeSymbol.includes(asset)) {
          const exchange = `${asset}USDT`
          balancesExchangeUsdt.push(exchange)
        }
      });

      const balancesTarget = balances.filter(item => !earnsOrExclude.includes(item.asset))

      // mock test start
      /*
      balancesTarget.push({
        asset: 'IMX',
        free: '504.54000000',
        locked: '0.00000000'
      })
      balancesExchangeUsdt.push('IMXUSDT')
      */
      // mock test end

      const symbols = Array.from(new Set(balancesExchangeUsdt))
      const symbolsPrice = await this.getSymbolsPrice(symbols)
      const symbolsPriceMap = new Map(symbolsPrice.map((item: { symbol: string; price: string; }) => [item.symbol, item.price])) as Map<string, string>

      console.log('balances:', balances);
      /*
      console.log('balances:', balances);
      console.log('balancesExchangeUsdt:', balancesExchangeUsdt);
      console.log('symbolsPriceMap:', symbolsPriceMap);
      */

      /*
        开始计算
      */
      // const maxOtherCoinRatio = 0.3
      const maxOtherCoinRatio = 0.1
      const { total, alCoinVal, otherCoinVal } = this.calculateValue(balancesTarget, symbolsPriceMap)

      const alCoinValRatio = divide(alCoinVal, total)
      const otherCoinValRatio = divide(otherCoinVal, total)

      console.log('earnsOrExclude:', earnsOrExclude)
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
        const { quoteQty, asset, canSellFree, free } = item
        const ratio = divide(quoteQty, total)
        console.log(`4-1.${asset}持仓占比${(ratio * 100).toFixed(4)}%,总值${quoteQty}U`)

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
          console.log(`4-2.账户总价值${total}U，${asset}总值${quoteQty}U,超过${maxPositionRatio * 100}%,开始清仓`)
          const quantity = Number(canSellFree || free)
          // const quantity = 0.0000009
          // const quantity = 9001
          const price = '25000'
          /*
          if (orderType === OrderType.LIMIT) {
            await this.sellSpot(asset, quantity, 'LIMIT', price)
          } else if (orderType === OrderType.MARKET) {
            await this.sellSpot(asset, quantity, 'MARKET')
          }
          */
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

      return { code: 200, message: 'ok', data: balancesTarget };
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

    const minsVal = minus(callCellQty, minQtyNum)
    const filterStepSize = new Big(minsVal).mod(stepSizeNum).toNumber()
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
function calculateMyTradeProfit(qty: number, quoteQty: number, costPrice: number, totalFree: number, price: any): { profit: any; profitRate: any; } {
  throw new Error('Function not implemented.');
}

