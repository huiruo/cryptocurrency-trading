### Project introduction
A cryptocurrency quantitative trading system.
With the help of program-assisted trading, through continuous iteration, continuous trial and error to improve the transaction.
The goal is to explore profitable trading.

### Project directory
```
cryptocurrency-trading
├── app
|   |
|   ├──server (Node service,project main service)
│       ├── config
│       ├── doc
│       ├── src
│       │   ├──binance-connector (Binance api connector)
│       │   ├──common
│       │   ├──mock
│       │   ├──trader (main Module)
│       │   ├──app.controller.spec.ts
│       │   ├──app.controller.ts
│       │   ├──app.module.ts
│       │   ├──app.service.ts
│       │   ├──main.ts
│       ├── ...
│       │  
|   ├── web (Browser application)
├── trading-strategy (Trading straregy)
```

## config
In the apps\server\config\env-dev directory,rename application-dev.env_example to application-dev.env,and set your 
Binance Api.
```
binanceApiKey=test
binanceSecretKey=test
coinBaseURL=https://example.com
```
In the apps\server\ directory,rename .env_example to .env,and set your mysql.
```
host_dev=localhost
port_dev=3306
username_dev=xxxx
password_dev=xxxxx
database_dev=trader
```

## Run
In the apps\server directory:
```
yarn
yarn start:dev
```

In the apps\web directory:
```
yarn
yarn start
```