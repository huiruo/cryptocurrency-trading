import { Console } from 'console';
import { gotUtils } from './gotUtils';

export const removeEmptyValue = (obj) => {
  if (!(obj instanceof Object)) return {};
  Object.keys(obj).forEach((key) => isEmptyValue(obj[key]) && delete obj[key]);
  return obj;
};

export const isEmptyValue = (input) => {
  /**
   * Scope of empty value: falsy value (except for false and 0),
   * string with white space characters only, empty object, empty array
   */
  return (
    (!input && input !== false && input !== 0) ||
    ((typeof input === 'string' || input instanceof String) &&
      /^\s+$/.test(input as string)) ||
    (input instanceof Object && !Object.keys(input).length) ||
    (Array.isArray(input) && !input.length)
  );
};

export const buildQueryString = (params) => {
  if (!params) return '';
  return Object.entries(params).map(stringifyKeyValuePair).join('&');
};

/**
 * NOTE: The array conversion logic is different from usual query string.
 * E.g. symbols=["BTCUSDT","BNBBTC"] instead of symbols[]=BTCUSDT&symbols[]=BNBBTC
 */
const stringifyKeyValuePair = ([key, value]) => {
  const valueString = Array.isArray(value) ? `["${value.join('","')}"]` : value;
  return `${key}=${encodeURIComponent(valueString)}`;
};

export const createRequest = async (config: any) => {
  const { baseURL, apiKey, method, url, proxyUrl = '', options = {} } = config;
  const reqUrl = baseURL + url;
  const headers = {
    'Content-Type': 'application/json',
    'X-MBX-APIKEY': apiKey,
  };

  // let proxyUrl_test = 'http://127.0.0.1:7890'
  const proxyUrl_test = '';

  if (method === 'GET') {
    const data = await gotUtils.get(reqUrl, headers, proxyUrl_test);
    return data;
  } else if (method === 'POST') {
    const data = await gotUtils.post(reqUrl, headers, proxyUrl_test, options);
    return data;
  }
};

export const flowRight =
  (...functions) =>
    (input) =>
      functions.reduceRight((input, fn) => fn(input), input);

export const defaultLogger = new Console({
  stdout: process.stdout,
  stderr: process.stderr,
});

/*
module.exports = {
  isEmptyValue,
  removeEmptyValue,
  buildQueryString,
  createRequest,
  flowRight,
  defaultLogger,
};
export {};
*/
