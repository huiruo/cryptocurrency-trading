
## init project
nest new code-platform-server

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## api test
```
localhost:3888

localhost:3888/code-engine/codeList
```

## 创建模块
npm i -g @nestjs/cli

```
nest g [文件类型] [文件名] [文件目录（src目录下）]
```


首先创建Service，因为Controller和Module都需要引入
```
// 创建sevice类型的文件，文件名：user，文件目录为：logical
nest g service user logical
```

```
nest g controller user
```

```
nest g module user
```

## crypto
```bash
nest g service market.center crypto/market-center

nest g controller market.center crypto/market-center

nest g module market.center crypto/market-center
```

```bash
nest g service spot crypto/spot

nest g controller spot crypto/spot

nest g module spot crypto/spot
```

```bash
nest g service future crypto/future

nest g controller future crypto/future

nest g module future crypto/future
```

```bash
nest g service strategy.order crypto/strategy-order

nest g controller strategy.order crypto/strategy-order

nest g module strategy.order crypto/strategy-order
```