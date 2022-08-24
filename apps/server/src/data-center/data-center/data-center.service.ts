import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { get, isEmpty } from 'lodash';
import { CoinCode } from './data-center.entity';
import { Coin } from './coin.entity';
import { Result } from 'src/common/result.interface';
import { createRequest } from 'src/binance-connector/helpers/utils';
import { CoinAddition } from './coin.addition.entity';
import { DayKline } from './day.kline.entity';
import { CoinDevMember } from './coin.member.entity';

@Injectable()
export class DataCenterService {
  constructor(
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
  ) { }

  async addSymbol(data: any): Promise<Result> {
    const { symbol } = data;
    const symbolData = await this.getSymbol(symbol);
    if (isEmpty(symbolData)) {
      const req = await this.coinCodeRepo.save(data);
      return { code: 200, message: 'ok', data: req };
    } else {
      return { code: 500, message: 'Duplicate data', data: null };
    }
  }

  async symbolList(): Promise<Result> {
    const req = await this.coinCodeRepo.find();
    return { code: 200, message: 'ok', data: req };
  }

  async getSymbol(symbol: string) {
    const sql = `select * from simplify_symbol where symbol='${symbol}'`;
    const symbolData = await this.coinCodeRepo.query(sql);

    return get(symbolData, '[0]', {});
  }

  async syncSymbolInfo(symbol: any): Promise<Result> {
    const coinCode = get(symbol, 'code', '')
    if (!coinCode) {
      return { code: 500, message: '参数错误', data: null };
    }

    const config = {
      options: { code: coinCode, addlink: 1, webp: 1 },
      baseURL: 'https://dncapi.gomynft.com/api/coin/web-coininfo',
      url: '',
      apiKey: '',
      method: 'POST',
      proxyUrl: '',
    };

    const gotData: any = await createRequest(config);
    const { statusCode } = gotData
    if (statusCode === 200) {

      if (get(gotData, 'data.code', '') !== 200) {
        return { code: 500, message: get(gotData, 'data.msg', ''), data: null };
      }

      const res = get(gotData, 'data.data', {})
      const { rateRemark, value: allot_value, name: allot_name } = get(res, 'coinallot.[0]', {})
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
      } = res

      const coin = {
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
        marketcap: marketcap_total_usd,
        marketcap_total_rnb: marketcap,
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
      }

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
        biyong,
        white_paper,
        difftime,
        supportoptions,
        is_refresh,
        not_public,
        btccorrelation,
        updatetime,
      }

      const dayKline = {
        code,
        symbol,
        holders,
        marketcappercent,
        circulationRate,
        price,
        totalSupply,
        turn_over,
        ratio,
        high_week,
        low_week,
        open,
        high,
        low,
        amount_day,
        vol_24: vol_btc,
        vol,
        vol_percent,
        ticker_num,
        change,
        change_percent,
        updatetime,
      }

      const coinData = await this.findCoin(coinCode)
      if (isEmpty(coinData)) {
        console.log('新增-->');
        /* insert coin */
        const saveRes = await this.coninRepo.save(coin);

        /* insert dev members */
        const members: CoinDevMember[] = get(res, 'members', []).map(item => {
          return {
            code,
            ...item
          }
        })
        await this.coninDevMemberRepo.insert(members);

        /* insert coin addition */
        await this.coinAdditionRepo.insert(coinAddition);
        console.log('coinAddition', coinAddition);

        /* insert day kline */
        await this.dayKlineRepo.insert(dayKline);

        return { code: 200, message: '新增成功', data: saveRes };
      } else {
        console.log('更新-->');
        const updateRes = await this.coninRepo.update({ code: coinCode }, coin);

        return { code: 200, message: '更新成功', data: coin };
      }
    } else {
      return { code: 500, message: '请求api错误', data: null };
    }
  }

  async findCoin(code: string): Promise<Result> {
    const sql = `select symbol,code from coin where code='${code}'`;
    const res = await this.coninRepo.query(sql);

    return res;
  }

}
