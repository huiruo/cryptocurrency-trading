import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,  // 使用泛型注入对应类型的存储库实例
    ) { }

    /**
     * 创建
     *
     * @param user User 实体对象
     */
    async createUser(user: User): Promise<User> {
        /**
         * 创建新的实体实例，并将此对象的所有实体属性复制到新实体中。 请注意，它仅复制实体模型中存在的属性。
         */
        // this.userRepo.create(user);

        // 插入数据时，删除 id，以避免请求体内传入 id
        delete user.id;
        return this.userRepo.save(user);

        /**
         * 将给定实体插入数据库。与save方法不同，执行原始操作时不包括级联，关系和其他操作。
         * 执行快速有效的INSERT操作。不检查数据库中是否存在实体，因此如果插入重复实体，本次操作将失败。
         */
        // await this.userRepo.insert(user);
    }

    /**
     * 删除
     *
     * @param id ID
     */
    async deleteUser(id: number): Promise<void> {
        await this.findOneById(id);
        this.userRepo.delete(id);
    }

    /**
     * 更新
     *
     * @param id ID
     * @param user User 实体对象
     */
    async updateUser(id: number, user: User): Promise<void> {
        await this.findOneById(id);
        // 更新数据时，删除 id，以避免请求体内传入 id
        delete user.id;
        this.userRepo.update(id, user);
    }

    /**
     * 根据ID查询
     *
     * @param id ID
     */
    async findOneUser(id: number): Promise<User> {
        return this.findOneById(id);
    }

    /**
     * 根据ID查询单个信息，如果不存在则抛出404异常
     * @param id ID
     */
    private async findOneById(id: number): Promise<User> {
        console.log("根据ID查询单个信息:",id)
        console.log("process.env",process.env.DATABASE_USER)
        const userInfo = await this.userRepo.findOne(id);
        if (!userInfo) {
            throw new HttpException(`指定 id=${id} 的用户不存在`, 404);
        }
        return userInfo;
    }
}
