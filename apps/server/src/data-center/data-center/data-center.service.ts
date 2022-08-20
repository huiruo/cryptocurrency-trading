import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SimplifySymbol } from './data-center.entity';

@Injectable()
export class DataCenterService {
    constructor(
        @InjectRepository(SimplifySymbol) private readonly simplifySymbolRepo: Repository<SimplifySymbol>,
    ) { }

    async addSymbol(symbol: any): Promise<SimplifySymbol> {
        /**
         * 创建新的实体实例，并将此对象的所有实体属性复制到新实体中。 请注意，它仅复制实体模型中存在的属性。
         */
        // this.userRepo.create(user);

        console.log('serice--->',symbol);
        return this.simplifySymbolRepo.save(symbol);
        /**
         * 将给定实体插入数据库。与save方法不同，执行原始操作时不包括级联，关系和其他操作。
         * 执行快速有效的INSERT操作。不检查数据库中是否存在实体，因此如果插入重复实体，本次操作将失败。
         */
        // await this.userRepo.insert(user);
    }
}
