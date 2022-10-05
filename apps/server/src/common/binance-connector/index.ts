import { APIBase } from './APIBase';
import { flowRight } from './helpers/utils';
import {
  Blvt,
  Bswap,
  SubAccount,
  Market,
  Trade,
  Futures,
  Fiat,
  Wallet,
  Margin,
  Mining,
  Savings,
  Stream,
  Websocket,
  C2C,
} from './modules';
import { optionsType } from './types';

// export {};
export class binanceConnector extends flowRight(
  Blvt,
  Bswap,
  SubAccount,
  Websocket,
  Stream,
  Savings,
  Margin,
  Mining,
  Wallet,
  Market,
  Trade,
  Futures,
  Fiat,
  C2C,
)(APIBase) {
  constructor(
    apiKey = '',
    apiSecret = '',
    proxyUrl,
    options: optionsType = {},
  ) {
    options.baseURL = options.baseURL || 'https://api.binance.com';
    options.proxyUrl = proxyUrl;
    super({
      apiKey,
      apiSecret,
      ...options,
    });
  }
}

// module.exports.binanceConnector = binanceConnector;
