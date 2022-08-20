import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { get, isEmpty } from 'lodash';
import { SimplifySymbol } from './data-center.entity';
import { Result } from 'src/common/result.interface';

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
    // test

    // test end

    const { symbol } = data;
    const symbolData = await this.getSymbol(symbol);
    if (isEmpty(symbolData)) {
      const req = await this.simplifySymbolRepo.save(data);
      return { code: 200, message: 'ok', data: req };
    } else {
      return { code: 500, message: 'Duplicate data', data: null };
    }
  }
}
