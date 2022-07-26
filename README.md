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
|   ├── server-java (Java service, involving timing tasks, etc.)
|   ├── web (Browser application)
├── trading-strategy (Trading straregy)
```

### Secret file
The necessary configuration parameters for project operation include database account configuration, platform API Key and platform Secret Key.
```
server/.env
server/config/env-prod/application-prod.env
server-java/src/main/resources/application-prod.properties
```