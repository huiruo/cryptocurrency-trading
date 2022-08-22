import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { get, isEmpty } from 'lodash';
import { SimplifySymbol } from './data-center.entity';
import { Result } from 'src/common/result.interface';
import { createRequest } from 'src/binance-connector/helpers/utils';

@Injectable()
export class DataCenterService {
  constructor(
    @InjectRepository(SimplifySymbol)
    private readonly simplifySymbolRepo: Repository<SimplifySymbol>,
  ) {}

  async addSymbol(data: any): Promise<Result> {
    const { symbol } = data;
    const symbolData = await this.getSymbol(symbol);
    if (isEmpty(symbolData)) {
      const req = await this.simplifySymbolRepo.save(data);
      return { code: 200, message: 'ok', data: req };
    } else {
      return { code: 500, message: 'Duplicate data', data: null };
    }
  }

  async symbolList(): Promise<Result> {
    const req = await this.simplifySymbolRepo.find();
    return { code: 200, message: 'ok', data: req };
  }

  async getSymbol(symbol: string) {
    const sql = `select * from simplify_symbol where symbol='${symbol}'`;
    const symbolData = await this.simplifySymbolRepo.query(sql);

    return get(symbolData, '[0]', {});
  }

  async syncSymbolInfo(data: any): Promise<Result> {
    // /*
    const config = {
      baseURL: 'https://dncapi.gomynft.com/api/coin/web-coininfo',
      url: '',
      apiKey: '',
      method: 'POST',
      proxyUrl: '',
      options: { code: 'bitcoin', addlink: 1, webp: 1 },
    };
    // */
    /*
    const config = {
      baseURL: 'https://oapi.dingtalk.com/robot/send',
      apiKey: '',
      method: 'POST',
      url: '?access_token=8a9f7b66e75b94006cd1c37248f899b7a3e039006f3a7aae9eaaf97672fae3a0',
      proxyUrl: '',
      options: {
        msgtype: 'text',
        text: {
          content: 'boter: a test',
        },
        at: {
          atMobiles: ['15692426057'],
          isAtAll: false,
        },
      },
    };
    // */
    const { symbol } = data;
    const gotData = await createRequest(config);
    console.log('gotData:', gotData);
    return { code: 200, message: 'ok', data: gotData };

    /*
    const { symbol } = data;
    const symbolData = await this.getSymbol(symbol);
    if (isEmpty(symbolData)) {
      const req = await this.simplifySymbolRepo.save(data);
      return { code: 200, message: 'ok', data: req };
    } else {
      return { code: 500, message: 'Duplicate data', data: null };
    }
    */
  }
}
