import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TradingModule } from './trader/trading/trading.module';
import { UserModule } from './trader/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '../config/db'
import { getDirFilenames } from './utils/getDirFilenames';
import { CryptoWalletController } from './trader/crypto-wallet/crypto-wallet.controller';
import { CryptoWalletModule } from './trader/crypto-wallet/crypto-wallet.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
      // 静态资源服务器
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '../static'),
      }),
      ConfigModule.forRoot({
        /*
        isGlobal?: boolean;  // 启用这个会作用于整个大系统(全局module),而非仅你当前注入的module!
        ignoreEnvFile?: boolean; // 若是开启这个就会忽略.env文件的读取!!
        ignoreEnvVars?: boolean; // 忽略系统级变量注入,默认是关闭(会读取系统变量)
        envFilePath?: string | string[];// .env文件的去,基于运行时根路径找(process.cwd)
        encoding?: string; // 文件编码,推荐utf-8,容错率高!
        validationSchema?: any; // 可以校验所有传入自定义环境变量(没关闭系统变量也会追加进来)
        validationOptions?: Record<string, any>;
        load?: Array<ConfigFactory>; // 加载环境变量的工厂函数,可以用于组合复杂的配置
        expandVariables?: boolean; // 支持环境变量嵌套变量,
        */
        // envFilePath:['./config/.env','.env1'],
        envFilePath:[...getDirFilenames({environment:process.env.NODE_ENV})],
        //配置为全局可见，否则需要在每个模块中单独导入ConfigModule
        isGlobal: true,
        // ignoreEnvFile:false, 
        ignoreEnvVars:true,
      }),
      TradingModule,
      CryptoWalletModule,
      UserModule,
      TypeOrmModule.forRoot(dbConfig),
    ],
    controllers: [AppController, CryptoWalletController],
    providers: [AppService],
})
export class AppModule {}
