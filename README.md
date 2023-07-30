## Word
The key is to act, don't be a giant of thinking and a dwarf of action.

## Project introduction
A cryptocurrency quantitative trading system.
With the help of program-assisted trading, through continuous iteration, continuous trial and error to improve the transaction.
The goal is to explore profitable trading.

## config
In the apps\server\config\env-dev directory,rename application-dev.env_example to application-dev.env,and set your 
Binance Api.
```
binanceApiKey=test
binanceSecretKey=test
coinBaseURL=https://example.com
```

In the apps\server\ directory,rename .env_example to .env,and set your mysql;
```
host_prod=localhost
port_prod=3306
username_prod=xx
password_prod=xx
database_prod=code-platform

host_dev=127.0.0.1
port_dev=3306
username_dev=xx
password_dev=xx
database_dev=code-platform

jwt_secret=xx
```

web: .env_example --> .env
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xx
NEXT_PUBLIC_DEV_HOST=http://localhost:3888
NEXT_PUBLIC_PROD_HOST=http://localhost:3888
SECRET_COOKIE_PASSWORD=xx
```


## Run
```
cd .
yarn install

cd apps/web
yarn dev

cd apps/server
yarn install
yarn dev
```