import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MyTrades } from './trading.entity'

@Injectable()
export class TradingService {
  constructor(
    // 使用泛型注入对应类型的存储库实例
    @InjectRepository(MyTrades) private readonly userRepo: Repository<MyTrades>,  
  ) { }

  findOne(username:string):string{
    console.log("test--->",)
    if(username==='huiruo'){
        return 'I am here';
    }
    return 'Who U find?';
  }

  async createMyTrades(myTrades: MyTrades): Promise<MyTrades> {
    console.log("myTrades---->",myTrades)
    delete myTrades.id;
    return this.userRepo.save(myTrades);
  }
}
