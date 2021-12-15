import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { Result } from '../../common/result.interface';
import { User } from './user.entity';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private readonly UserService: UserService,
    ) { }

    /*
    关于传参：
    1.传递的参数在query里面
    例如：localhost:3000/app/userinfo?id=‘1’
    @Query() query   ---->这样接收
    console.log("query:",query.id)

    2.递的是动态参数
    例如：递的是动态参数:http://localhost:1788/user/22
    22这里是一个动态参数：
    @Param('id') id: number ---->这里的id可以取任何名字
    console.log("id",id)

    3.传递的参数在body里面
      请求方式：post
      请求数据：在body里面
    postData(@Body() user: User,@Headers() headers){
        console.log("user",user)
        console.log("headers",headers)
    }
    */

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
        const data = await this.UserService.findOneUser(id);
        return { code: 200, message: '查询成功', data };
    }
}