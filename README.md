### Project introduction
A cryptocurrency quantitative trading system.
With the help of program-assisted trading, through continuous iteration, continuous trial and error to improve the transaction.
The goal is to explore profitable trading.

### Project directory
```
cryptocurrency-trading
├── app (mobile app:Did not start development)
├── server (Node service,project main service)
│   ├── config
│   ├── doc
│   ├── src
│   │   ├──binance-connector (Binance api connector)
│   │   ├──common
│   │   ├──mock
│   │   ├──trader (main Module)
│   │   ├──app.controller.spec.ts
│   │   ├──app.controller.ts
│   │   ├──app.module.ts
│   │   ├──app.service.ts
│   │   ├──main.ts
│   ├── ...
│   │  
├── server_java (Java service, involving timing tasks, etc.)
├── trading_strategy (Trading straregy)
├── web (Browser application)
```

### git commit specification
```
feat：new feature

fix：fix bug

docs：documentation

style： format (does not affect the change of code operation)

refactor：refactoring (that is, it is not a new feature, nor is it a code change to modify a bug)

test：add test

chore：Changes in the build process or auxiliary tools
```