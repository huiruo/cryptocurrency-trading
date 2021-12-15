import { Injectable,HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MyTrades } from './trading.entity'

@Injectable()
export class TradingService {
  constructor(
    // 使用泛型注入对应类型的存储库实例
    @InjectRepository(MyTrades) private readonly myTradesRepo: Repository<MyTrades>,  
  ) { }

  /*
  binance 订单储存
  */
  async createMyTrades(myTrades: MyTrades[]) {
    myTrades.forEach(async (element:MyTrades) => {
      const myTrade = await this.findMyTradeById(element.id)
      if (!myTrade) {
        console.log("myTrades insert---->",element)
        return this.myTradesRepo.save(element);
      }
    });
  }

  /*
  查询本地数据库
  */
  async getMyTrades(symbol: string):Promise<MyTrades> {
    const sql = `select * from mytrades where symbol='${symbol}'`
    const myTrade = await this.myTradesRepo.query(sql);
    return myTrade;
  }

  private async findMyTradeById(id: number): Promise<MyTrades> {
      const myTrade = await this.myTradesRepo.findOne(id);
      return myTrade;
  }
}
