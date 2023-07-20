
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
```
yarn dev
```
