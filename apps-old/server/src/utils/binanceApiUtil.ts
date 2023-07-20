import { BinanceConnector } from '../common/binance-connector/index';

export const getSymbolPriceUtil = async (
  binance_api_key: string,
  binance_api_secret: string,
  symbol: string,
) => {
  const proxy_url = null;

  const client = new BinanceConnector(
    binance_api_key,
    binance_api_secret,
  );

  const { statusCode, data, statusMessage } = await client.tickerPrice(symbol);

  return { code: statusCode, message: statusMessage, data };
};
