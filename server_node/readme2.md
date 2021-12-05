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

```
yarn add @nestjs/typeorm typeorm mysql2
yarn add sequelize-typescript
    通过上面的安装，我们就在nestjs集成了mysql库并使用typeorm来操作。
    mysql2： 用于node.js来操作mysql的库；
    typeorm：一个orm库，可以理解为把对象和表做了一个映射关系，来方便操作；
    @nestjs/typeorm：nestjs基于typeorm的封装。
```

### binance
```
yarn add @binance/connector

```


### 其他参考
app.controller.ts文件
```js
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * 应用程序控制器，@Controller() 可以指定参数，用于定义类的父路由，如 @Controller("cat")，此时这个类的所有父路由就会成为 /cat
 *
 * 被 @Controller() 修饰的类，可以通过其构造函数完成依赖注入，但依赖注入的类必须与当前类属于同一个模块
 */
@Controller()
export class AppController {
    /**
     * 构造函数，用于注入这个类的依赖，注入类时，需要使用 @Inject() 修饰符，其参数是被注入的类的类名
 
     * 在注入被 @Injectable() 修饰的类时，可以不使用 @Inject() 修饰参数，此时依赖注器入会使用参数的类型完成注入
     *
     * Tips: 这里使用 @Inject(AppService) 是为了规范代码风格
     */
    constructor(
        @Inject(AppService) private readonly appService: AppService,
    ) { }
    /**
     * @Get() 可以指定参数，用于定义方法路由，如 @Get(":id")，此时这个方法路由就会成为 /:id，即查询指定ID
     */
    @Get()
    async root() {
        return this.appService.root();
    }
}
```
app.service.ts文件
```js
import { Injectable } from '@nestjs/common';
/**
 * 被 @Injectable() 修饰的类，可以通过其构造函数完成依赖注入，但依赖注入的类必须与当前类属于同一个模块
 */
@Injectable()
export class AppService {
    constructor() { } // 构造函数，一般用于处理依赖注入

    async root() {
        return 'Hello World!';
    }
}
```

app.module.ts文件
```js
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatModule } from 'cats/cat.module';
import { ErrorsInterceptor } from 'common/errors.interceptor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
/**
 * @Module() 定义一个模块，并管理这个模块的导入集合、控制器集合、提供者集合、导出集合
 */
@Module({
    // TypeOrmModule.forRoot() 默认加载项目根目录下的 ormconfig.json 配置文件用于配置数据库连接
    // TypeORM 配置文件详细文档 https://typeorm.io/#/using-ormconfig
    imports: [TypeOrmModule.forRoot(), CatModule],  // 导入其他模块的集合
    controllers: [AppController],  // 当前模块的控制器集合
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ErrorsInterceptor
        },
        AppService
    ],  // 当前模块的提供者集合
    exports: [], // 导出当前模块的提供者，用于被其他模块调用
})
export class AppModule { }


2.4 main.ts入口文件
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);  // 创建应用程序实例，此时所有被 AppModule 导入的其他模块的所有实例都会被加载
    await app.listen(3000);
}
bootstrap();
```


3. 通用错误处理和接口文件
在项目实践中，注入错误处理、接口等模块化文件需要重复使用。最好集中在公用模块中。在项目根目录下创建common文件夹，并新建错误处理和接口模块。
```js
common/errors.interceptor.ts错误处理文件

import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // 异常拦截器，拦截每个请求中的异常，目的是将异常码和异常信息改写为 { code: xxx, message: xxx } 类型
        return next.handle().pipe(catchError((error, caught): any => {
            if (error instanceof HttpException) {
                return Promise.resolve({
                    code: error.getStatus(),
                    message: error.getResponse()
                });
            }
            return Promise.resolve({
                code: 500,
                message: `出现了意外错误：${error.toString()}`
            });
        }));
    }
}
```
3.2 common/result.interface.ts接口文件
```js
// 定义通用的API接口返回数据类型
export interface Result {
    code: number;
    message: string;
    data?: any;
}
```
