const { binanceConnector }  = require('../binance-connector/index')

export const getSymbolPriceUtil = async(binance_api_key:string,binance_api_secret:string,symbol:string)=>{
  const proxy_url = null

  const client = new binanceConnector(binance_api_key, binance_api_secret,proxy_url,{})

  const { statusCode,data,statusMessage } = await client.tickerPrice(symbol)

  // return { code: 200, message: '查询成功',data};
  return { code: statusCode, message: statusMessage,data};
}
