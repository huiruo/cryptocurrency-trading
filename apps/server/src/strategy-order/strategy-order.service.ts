import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { get, isEmpty } from 'lodash';
import { nanoid } from 'nanoid';
import { Result } from 'src/common/result.interface';
import { CalculateCloseStrategyOrderType, CalculateStrategiesOrderType, FiterStrategyOrderType, StrategyProfit } from 'src/common/types';
import { TraderApi } from 'src/entity/api.entity';
import { TradeAsset } from 'src/entity/asset.entity';
import { DailyProfit } from 'src/entity/daily.profit.entity';
import { FuturesOrder } from 'src/entity/futures-order.entity';
import { ProfitStatistics } from 'src/entity/profit.statistics.entity';
import { SpotOrder } from 'src/entity/spot-order.entity';
import { StrategyOrder } from 'src/entity/strategy-order.entity';
import { StrategyOrderId } from 'src/entity/strategy-orderid.entity';
import { BaseServiceBiance } from 'src/utils/base-service-biance';
import { formatTimestamp } from 'src/utils/utils';
import Big from 'big.js';
import { Repository } from 'typeorm';

@Injectable()
export class StrategyOrderService {
  private client: BaseServiceBiance;
  constructor(
    private configService: ConfigService,

    @InjectRepository(SpotOrder)
    private readonly spotOrderRepo: Repository<SpotOrder>,

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

    @InjectRepository(ProfitStatistics)
    private readonly profitStatisticsRepo: Repository<ProfitStatistics>,
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

  private async findStrategyOrderIdUtil(
    orderId: number,
  ): Promise<StrategyOrderId> {
    const sql = `select strategyId,orderId from strategy_orderid where orderId='${orderId}'`;

    return await this.strategyOrderIdRepo.query(sql);
  }

  async getSpotPrice(symbol: string): Promise<any> {
    /*
      { BTCUSDT: '19376.16000000' }
    */
    return await this.client.spotPrice(symbol);
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

  private async getAsset(name: string): Promise<TradeAsset> {
    const sql = `select * from asset where name='${name}'`;
    const symbolData = await this.tradeAssetRepo.query(sql);

    return get(symbolData, '[0]', {});
  }

  private async createStrategyOrderIdUtil(strategyOrderId: StrategyOrderId) {
    await this.strategyOrderIdRepo.save(strategyOrderId);
  }

  private async createStrategyOrderUtil(strategiesOrder: StrategyOrder) {
    return await this.strategiesOrderRepo.save(strategiesOrder);
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

  private async calculateSpotOrderMergeStrategy(spotOrders: SpotOrder[], strategyOrder: StrategyOrder): Promise<CalculateStrategiesOrderType> {
    const { symbol, qty, quoteQty, userId, free: realizedFree } = strategyOrder;
    let qtyTotal = 0;
    let free = 0;
    let quoteQtyTotal = 0;
    let isTheSameSymbol = true;
    const targetSymbol = symbol;

    const { spotFree } = await this.getUserSpotFree(userId);

    spotOrders.forEach((item) => {
      const { qty: qtyItem, quoteQty: quoteQtyItem, symbol, isBuyer } = item;
      const qtyItemInt = Number(qtyItem)
      const quoteQtyItemInt = Number(quoteQtyItem)
      if (targetSymbol !== symbol) {
        isTheSameSymbol = false;
      }

      free = quoteQtyItemInt * spotFree + free;

      if (isBuyer) {
        qtyTotal = qtyItemInt + qtyTotal;
        quoteQtyTotal = quoteQtyItemInt + quoteQtyTotal;
      } else {
        qtyTotal = qtyTotal - qtyItemInt;
        quoteQtyTotal = quoteQtyTotal - quoteQtyItemInt;
      }
    });

    const finalqty = Number(qty) + qtyTotal;
    const finalQuoteQty = Number(quoteQty) + quoteQtyTotal;
    const finalFree = realizedFree + free
    const entryPrice = (finalQuoteQty / finalqty).toFixed(8)

    return {
      qty: finalqty.toString(),
      quoteQty: finalQuoteQty.toString(),
      entryPrice,
      isTheSameSymbol,
      free: finalFree
    };
  }

  private async updateStrategyOrderUtil(strategiesOrder: StrategyOrder) {
    const { strategyId, qty, quoteQty, entryPrice, updatedAt, free } =
      strategiesOrder;
    const sql = `update strategy_order set qty = "${qty}",free="${free}",quoteQty = "${quoteQty}",entryPrice="${entryPrice}",updatedAt="${updatedAt}" WHERE strategyId = "${strategyId}"`;
    return await this.strategiesOrderRepo.query(sql);
  }

  private async calculateSpotOrderCloseStrategy(
    spotOrders: SpotOrder[],
    strategyOrder: StrategyOrder,
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

  private async updateCloseStrategyOrderUtil(strategiesOrder: StrategyOrder): Promise<Result> {
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

    const sql = `update strategy_order set sellingQty = "${sellingQty}",sellingQuoteQty = "${sellingQuoteQty}",sellingPrice="${sellingPrice}",
    realizedProfit="${realizedProfit}",realizedProfitRate="${realizedProfitRate}",free="${free}",sellingTime="${sellingTime}",is_running=${is_running},updatedAt="${updatedAt}" WHERE strategyId = "${strategyId}"`;
    try {
      const res = await this.strategiesOrderRepo.query(sql);
      return { code: 200, message: 'Calculate amount update succeeded', data: res };
    } catch (error) {
      console.log('error:', error);
      return { code: 500, message: 'updateCloseStrategyOrder error' };
    }
  }

  private async getTradeCountByDay(day: string, userId: number) {
    const sql = `SELECT * FROM daily_profit WHERE userId=${userId} AND DATE_FORMAT(time, '%Y-%m-%d') = '${day}'`
    const tradeCount = await this.dailyProfitRepo.query(sql);
    return tradeCount
  }

  async createSpotStrategy(spotOrders: SpotOrder[]): Promise<Result> {
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

  async getStrategiesOrder(
    fiterStrategyOrder: FiterStrategyOrderType,
  ): Promise<Result> {
    const { currentPage, pageSize, symbol, is_running } = fiterStrategyOrder;
    let sql = '';
    let pageSql = ''
    if (symbol) {
      if (is_running !== '') {
        sql = `select * from strategy_order where symbol ="${symbol}" and is_running=${is_running}  order by createdAt desc limit ${(currentPage - 1) * pageSize
          },${pageSize}`;

        pageSql = `select count(1) as total from strategy_order where symbol ="${symbol}" and is_running=${is_running}`;
      } else {
        sql = `select * from strategy_order where symbol ="${symbol}" order by createdAt desc limit ${(currentPage - 1) * pageSize
          },${pageSize}`;

        pageSql = `select count(1) as total from strategy_order where symbol ="${symbol}"`;
      }
    } else {
      if (is_running !== 3) {
        sql = `select * from strategy_order where is_running ="${is_running}" order by createdAt desc limit ${(currentPage - 1) * pageSize
          },${pageSize}`;

        pageSql = `select count(1) as total from strategy_order where is_running ="${is_running}"`;
      } else {
        sql = `select * from strategy_order order by createdAt desc limit ${(currentPage - 1) * pageSize
          },${pageSize}`;

        pageSql = 'select count(1) as total from strategy_order;'
      }
    }
    const res = await this.strategiesOrderRepo.query(sql);
    const pageRes = await this.spotOrderRepo.query(pageSql);

    return {
      code: 200, message: 'ok', data:
      {
        total: Number(get(pageRes, '[0].total', 0)),
        res: res
      }
    };
  }

  async mergeSpotStrategy(spotOrders: SpotOrder[], strategyOrder: StrategyOrder): Promise<Result> {
    const { userId, strategyId, symbol, time, side } = strategyOrder;
    /*
    const spotPrice = await this.getSpotPrice(symbol);
    const price = get(spotPrice, `${symbol}`, '');
    if (!price) {
      return { code: 500, message: 'error', data: null };
    }
    */

    const { qty, quoteQty, entryPrice, isTheSameSymbol, free = 0 } =
      await this.calculateSpotOrderMergeStrategy(spotOrders, strategyOrder);
    if (!isTheSameSymbol) {
      return {
        code: 500,
        message: 'The selected order not the same Symbol',
        data: null,
      };
    }

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
      free,

      stopType: 0,
      stopProfit: '',
      stopLoss: '',
      stopProfitPrice: '',
      stopLossPrice: '',

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


  async closeSpotStrategy(
    spotOrders: SpotOrder[],
    strategyOrder: StrategyOrder,
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

  async syncAllStrategiesPrice(
    strategiesOrders: StrategyOrder[],
  ): Promise<Result> {
    const res = await this.loopUpdateStrategiesPrice(strategiesOrders);
    return res;
  }

  private async loopUpdateStrategiesPrice(strategiesOrders: StrategyOrder[]) {
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

        const sql = `update strategy_order set price = "${price}",profitRate = "${profitRate}",
    profit = "${profit}",updatedAt="${updatedAt}" WHERE strategyId = "${strategyId}"`;

        const result = await this.strategiesOrderRepo.query(sql);
      }

      return { code: 200, message: 'Update succeeded', data: null };
    } catch (error) {
      console.log('update error', error);

      return { code: 500, message: 'update error', data: null };
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

  private async getProfitStatisticsById(userId: any): Promise<ProfitStatistics> {
    const sql = `select profit,profitRate,amount,date_format(time,'%Y-%m-%d %H:%i:%S.%f') AS time from profit_statistics WHERE userId = "${userId}" limit 1`;
    const profitStatistics = await this.strategiesOrderRepo.query(sql);
    return get(profitStatistics, '[0]', {});
  }

  private calculateTotalProfit(dailyProfit: DailyProfit[]): number {
    const totalProfit = new Big(0)
    let totalProfitNumber = 0
    dailyProfit.forEach((item) => {
      const { profit } = item
      totalProfitNumber = totalProfit.plus(profit).plus(totalProfitNumber).toNumber()
    })

    return totalProfitNumber
  }

  async getProfitStatistics(): Promise<Result> {
    const userId = 1
    const res = await this.getProfitStatisticsById(userId)
    return { code: 200, message: 'sync profit statistics', data: res };
  }

  async profitStatistics(): Promise<Result> {
    const userId = 1
    const profitStatistics = await this.getProfitStatisticsById(userId)
    if (isEmpty(profitStatistics)) {
      const dailyProfit = await this.dailyProfitRepo.find({ userId });
      const { time } = dailyProfit[dailyProfit.length - 1]
      const totalProfit = this.calculateTotalProfit(dailyProfit)
      const profitStatistics = {
        userId,
        profit: totalProfit,
        time,
        profitRate: '',
        amount: '',
      }

      try {
        await this.profitStatisticsRepo.save(profitStatistics)
        return { code: 200, message: 'sync profit statistics', data: dailyProfit };
      } catch (error) {
        console.log('error:', error);
        return { code: 500, message: 'sync profit statistics error' };
      }
    } else {
      const { time: profitTime, profit } = profitStatistics
      const querySql = `select profit,profitRate,amount,date_format(time,'%Y-%m-%d %H:%i:%S.%f') as time from daily_profit WHERE userId = "${userId}" and time>"${profitTime}"`;
      const dailyProfit = await this.dailyProfitRepo.query(querySql);
      if (isEmpty(dailyProfit)) {
        return { code: 200, message: 'Already the latest data', data: null };
      }
      const { time } = dailyProfit[dailyProfit.length - 1]
      const totalProfit = this.calculateTotalProfit(dailyProfit)
      const profitAll = new Big(totalProfit).plus(profit).toNumber()

      try {
        const updateSql = `update profit_statistics set profit=${profitAll},time = "${time}"  WHERE userId = "${userId}"`;
        await this.profitStatisticsRepo.query(updateSql)
        return { code: 200, message: 'sync profit statistics', data: null };
      } catch (error) {
        console.log('error:', error);
        return { code: 500, message: 'sync profit statistics error' };
      }
    }
  }

  async getDailyProfit(startTime: string, endTime: string): Promise<Result> {
    const userId = 1
    const sql = `select profit,profitRate,amount,date_format(time,'%Y-%m-%d') as time from daily_profit WHERE userId = "${userId}" and time between '${startTime}' and '${endTime}' order by time asc`
    const res = await this.dailyProfitRepo.query(sql)

    return { code: 200, message: 'sync profit statistics', data: res };
  }
}
