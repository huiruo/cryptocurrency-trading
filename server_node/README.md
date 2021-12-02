# nestjs 文档
```
https://docs.nestjs.cn/

产品哲学：从Angular、React和Vue中得到的启发，在后端的开发中，面对大量优秀的类库，却没有一个有效解决架构问题的产品。而Nest的诞生，就是为了提供一个开箱即用的架构，实现了各种类库之间的松耦合。因此，严格意义上定义NestJS并不是一款Web服务框架，而是一个IoC容器（IoC Container ）
```

### binance
```
yarn add @binance/connector

```

### got 代理请求
```
const data = await got.get(ticker24URL,{
    agent: {
        https: new HttpsProxyAgent({
            keepAlive: true,
            keepAliveMsecs: 10000,
            maxSockets: 256,
            maxFreeSockets: 256,
            proxy: 'http://127.0.0.1:7890'
        })
    }
}).json();
```

### 创建项目 和 运行
```
a.安装NEST命令行工具（脚手架）
sudo npm i -g @nestjs/cli

b.创建一个项目:
nest n -g trader

注意：本项目用yarn

1.yarn start
2.yarn start:dev 使用nodemon 监听文件的变化，并自动重启服务

http://localhost:1788/hello
```

### 创建模块:
Controller 、Service、Module ,形成了一个模块
```
1.Controller ：控制器，主要作用：提供api接口，负责处理路由，中转，验证等一些简洁业务
2.Service：又称为 Provider ，是一系列服务，repo，工厂方法，helper的总称。主要负责处理具体的业务，如数据库的增删改查，事务，并发等逻辑代码
3.Module：负责将Controller和Service连接起来
```
```
直接使用nest-cli创建:
nest g [文件类型] [文件名] [文件目录（src目录下）]

1.首先创建Service，因为Controller和Module都需要引入:
	//创建sevice类型的文件，文件名：user，文件目录为：trader
	nest g service user trader
2.Service
	nest g controller user trader

3.Module
	nest g module user trader
```

```
//1.在user.service.ts里写：
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    findOne(username:string):string{
      if(username==='huiruo'){
          return 'I am here';
      }
      return 'Who U find?';
  }
}

//2.把Service的业务逻辑引入
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    //创建方法，后续调用
    findOne(username:string):string{
      if(username==='Kid'){
          return 'I am here';
      }
      return 'Who U find?';
  }
}

//3.把Service和Controller组装起来
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService]
})
export class UserModule {}

第三步的作用
就是其他Module想引入User的时候，就不能同时引入Service和Controller了，然后修改下app.module.ts
4.修改下app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserService } from './trader/user/user.service';
// import { UserController } from './trader/user/user.controller';
import { UserModule } from './trader/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 目录
```
dist TypeScript文件编译为JS后输出的目标目录；
src:
		.eslintrc.js eslint 配置文件
		.prettierrc prettier 配置文件
		nest-cli.json nest项目配置文件，标准模式下这个配置文件内容很简单，如果是monorepo模式，则内容较为复杂。
		nodemon.json，监控程序配置文件，定义监控那些程序忽略那些程序以及启动入口（index.js）
		tsconfig.json，ts配置文件，其中排除了对测试文件的编译
文件名后缀含义
		.middleware.ts  中间件
		.controller.ts 控制器
		.decorator.ts 自定义装饰器
		.entity.ts 数据对象实例（typeorm）
		.interface.ts 接口
		.module.ts NEST模块
		.service.ts NEST服务对象
		.pipe.ts  NEST管道对象
		.dto.ts 数据传输对象
		.spec.ts 单元测试文件
```
### 脚本
```
prebuild 删除dist目录，为重新完整构建做准备（每次构建时，nest会自动执行这个）；
build 构建当前工作区nest项目，会产生一个dist目录，其中是经过编译的代码
format 使用prettier格式化当前项目的代码
start 启动当前项目
start:dev 以开发模式启动当前项目，相比上面的start，区别是你可以边开发边调试程序，当发生文件被改动（保存），nest会自动重新加载；
start:debug 开发模式下，输出更多的调试信息；
start:prod 以生产模式运行，此时项目不在运行再nest cli中，而是直接运行编译后的项目；
lint 格式化所有ts代码，并修正代码的格式问题；
test 运行jest进行测试；
test:watch 同上，程序文件变化后自动测试；
test:cov 输出测试覆盖信息；
test:debug 运行一个websocket是的在浏览器中可以直接调试；
test:e2e 根据配置文件进行测试；
```