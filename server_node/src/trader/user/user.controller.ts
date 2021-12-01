import { Controller,Body,Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    //测试使用post:http://localhost:1788/user/find
    constructor(private readonly usersService:UserService){}
    @Post('find')
    findOne(@Body() body:any){
        console.log("find----->")
        return this.usersService.findOne(body.username);
    }
}
