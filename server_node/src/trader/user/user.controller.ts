import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { Result } from '../../common/result.interface';
import { User } from './user.entity';
import { UserService } from './user.service';
import { getDirFilenames } from '../../utils/getDirFilenames';


@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private readonly UserService: UserService,
    ) { }

    @Post()
    async createUser(@Body() User: User): Promise<Result> {
        await this.UserService.createUser(User);
        return { code: 200, message: '创建成功' };
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<Result> {
        await this.UserService.deleteUser(id);
        return { code: 200, message: '删除成功' };
    }

    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() User: User): Promise<Result> {
        await this.UserService.updateUser(id, User);
        return { code: 200, message: '更新成功' };
    }

    @Get(':id')
    //http://localhost:1788/user/22
    async findOneUser(@Param('id') id: number): Promise<Result> {
        console.log("...getDirAllFileNameArr()--->",...getDirFilenames())
        console.log("get_user",id)
        console.log("binanceApiSecret:",process.env.binanceApiSecret);
        console.log("binanceApiKey:",process.env.binanceApiKey);
        const data = await this.UserService.findOneUser(id);
        return { code: 200, message: '查询成功', data };
    }
}