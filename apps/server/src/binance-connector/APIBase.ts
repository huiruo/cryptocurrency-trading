import crypto from 'crypto';
import {
  removeEmptyValue,
  buildQueryString,
  createRequest,
  defaultLogger,
} from './helpers/utils';

// export {};
interface optionsType {
  apiKey: string;
  apiSecret: string;
  baseURL?: string;
  logger?: any;
}

export class APIBase {
  public apiKey: string;
  public apiSecret: string;
  public baseURL: string;
  public logger: string;
  constructor(options: optionsType) {
    const { apiKey, apiSecret, baseURL, logger } = options;

    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.baseURL = baseURL;
    this.logger = logger || defaultLogger;
  }

  publicRequest(method, path, params = {}) {
    params = removeEmptyValue(params);
    params = buildQueryString(params);
    if (params !== '') {
      path = `${path}?${params}`;
    }
    return createRequest({
      method: method,
      baseURL: this.baseURL,
      url: path,
      apiKey: this.apiKey,
    });
  }

  signRequest(method, path, params = {}) {
    params = removeEmptyValue(params);
    const timestamp = Date.now();
    const queryString = buildQueryString({ ...params, timestamp });
    const signature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(queryString)
      .digest('hex');

    return createRequest({
      method: method,
      baseURL: this.baseURL,
      url: `${path}?${queryString}&signature=${signature}`,
      apiKey: this.apiKey,
    });
  }
}

// module.exports.APIBase = APIBase;
