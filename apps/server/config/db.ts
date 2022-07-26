import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {env,envNumber} from '../src/utils/env-unit'

/*
const HOST_PROD = env('host_prod')
const PORT_PROD = envNumber('port_prod')
const USERNAME_PROD = env('username_prod')
const PASSWORD_PROD = env('password_prod')
const DATABASE_PROD = env('database_prod')

const HOST_DEV = env('host_dev')
const PORT_DEV = envNumber('port_dev')
const USERNAME_DEV = env('username_dev')
const PASSWORD_DEV = env('password_dev')
const DATABASE_DEV = env('database_dev')
//读取.env并格式化配置，同时第二个参数可设置默认值
//console.log("读取配置：",envNumber('APP_PORT', 3000))
*/
const localConfig:TypeOrmModuleOptions={
  type: "mysql",
  host: env('host_dev'),
  port: envNumber('port_dev'),
  username: env('username_dev'),
  password: env('password_dev'),
  database: env('database_dev'),
  entities: ["dist/**/*.entity{.ts,.js}"],
  connectTimeout:60000,
  synchronize: false
}

const productConfig:TypeOrmModuleOptions={
  type: "mysql",
  host: env('host_prod'),
  port: envNumber('port_prod'),
  username: env('username_prod'),
  password: env('password_prod'),
  database: env('database_prod'),
  entities: ["dist/**/*.entity{.ts,.js}"],
  connectTimeout:60000,
  synchronize: false
}

//const config =process.env.NODE_ENV==='prod'?productConfig:localConfig;
//远程连不上，写死本地数据库
const config =process.env.NODE_ENV==='dev'?productConfig:localConfig;

export default config;