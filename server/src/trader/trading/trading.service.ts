import { Injectable,HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MyTrades } from './trading.entity'

@Injectable()
export class TradingService {
  constructor(
    // Use generics to inject the corresponding type of repository instance
    @InjectRepository(MyTrades) private readonly myTradesRepo: Repository<MyTrades>,  
  ) { }

  /*
  Export API: Binance order write into Databasce
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
  Export API: Query orders from local database
  */
  async getMyTrades(symbol: string):Promise<MyTrades> {
    const sql = `select * from mytrades where symbol='${symbol}' order by time desc`
    const myTrade = await this.myTradesRepo.query(sql);
    return myTrade;
  }
  /*
  Util method: Query orders from local database
  */
  private async findMyTradeById(id: number): Promise<MyTrades> {
      const myTrade = await this.myTradesRepo.findOne(id);
      return myTrade;
  }
}
