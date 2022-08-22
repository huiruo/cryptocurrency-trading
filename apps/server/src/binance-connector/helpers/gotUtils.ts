import { gotResType } from '../types';
import got from 'got';
import { HttpsProxyAgent } from 'hpagent';
import _ from 'lodash';

const isNull = (param) => {
  return _.isNull(param) || _.isUndefined(param);
};

export class gotUtils {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  /**
   * application/x-www-form-urlencoded
   * @param {string} reqUrl
   * @param {object} paramBody
   * @param {object} paramOptions
   * @param {object} headers
   * @returns {{error ?: object, statusCode ?: number, statusMessage ?: string, body ?: string, response ?: any}} 响应结果
   */
  static async postForm(
    reqUrl,
    headers?,
    proxyUrl?: string,
    paramOptions = {},
  ) {
    const agent = proxyUrl
      ? {
          https: new HttpsProxyAgent({
            keepAlive: true,
            keepAliveMsecs: 10000,
            maxSockets: 256,
            maxFreeSockets: 256,
            proxy: proxyUrl,
          }),
        }
      : null;
    try {
      console.log('agent:', agent);
      console.log('proxyUrl:', proxyUrl);
      console.log('reqUrl:', reqUrl);

      const res: any = await got.post(reqUrl, {
        headers,
        agent,
      });
      return {
        error: null,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        body: JSON.parse(res.body),
        response: res.response,
      };
    } catch (e) {
      const ret: gotResType = {};
      if (isNull(e.response)) {
        ret.error = e;
        ret.statusCode = e.response.statusCode;
        ret.statusMessage = e.response.statusMessage;
        ret.response = e.response;
      } else {
        ret.error = e;
        ret.statusCode = -1;
        ret.statusMessage = e.message;
      }
      return ret;
    }
  }
  /**
   * application/json
   * @param {string} reqUrl
   * @param {object} paramBody
   * @param {object} paramOptions
   * @param {object} headers
   * @returns {{error ?: object, statusCode ?: number, statusMessage ?: string, body ?: string, response ?: any}} 响应结果
   */
  static async post(reqUrl, headers?, proxyUrl?: string, paramOptions = {}) {
    try {
      const agent = proxyUrl
        ? {
            https: new HttpsProxyAgent({
              keepAlive: true,
              keepAliveMsecs: 10000,
              maxSockets: 256,
              maxFreeSockets: 256,
              proxy: proxyUrl,
            }),
          }
        : null;

      console.log('agent:', agent);
      console.log('proxyUrl:', proxyUrl);
      console.log('reqUrl:', reqUrl);
      console.log('reqUrl-data:', paramOptions);

      const res: any = await got.post(reqUrl, {
        headers,
        agent,
        // body: JSON.stringify({ code: 'polkadot', addlink: 1, webp: 1 }),
        // body: JSON.stringify({ code: 'bitcoin', addlink: 1, webp: 1 }),
        /*
        body: JSON.stringify({
          msgtype: 'text',
          text: {
            content: 'boter: a test',
          },
          at: {
            atMobiles: ['15692426057'],
            isAtAll: false,
          },
        }),
        */
        body: JSON.stringify(paramOptions),
      });
      return {
        error: null,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        data: JSON.parse(res.body),
        response: res.response,
      };
    } catch (e) {
      console.log('post_error:', e);
      const ret: gotResType = {};
      if (!isNull(e.response)) {
        ret.statusCode = e.response.statusCode;
        ret.statusMessage = e.response.statusMessage;
        ret.response = e.response;
        ret.error = e;
      } else {
        ret.statusCode = -1;
        ret.statusMessage = e.message;
        ret.error = e;
      }
      return ret;
    }
  }

  /**
   * @param {string} reqUrl
   * @param {object} paramBody
   * @param {object} paramOptions
   * @param {object} headers
   * @returns {{error ?: object, statusCode ?: number, statusMessage ?: string, body ?: string, response ?: any}} 响应结果
   */
  static async get(reqUrl: string, headers?, proxyUrl?: string) {
    const agent = proxyUrl
      ? {
          https: new HttpsProxyAgent({
            keepAlive: true,
            keepAliveMsecs: 10000,
            maxSockets: 256,
            maxFreeSockets: 256,
            proxy: proxyUrl,
          }),
        }
      : null;

    console.log('agent:', agent);
    console.log('proxyUrl:', proxyUrl);
    console.log('reqUrl:', reqUrl);

    try {
      const res = await got.get(reqUrl, {
        headers,
        agent,
      });
      return {
        error: null,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        data: JSON.parse(res.body),
      };
    } catch (e) {
      console.log('get_error', e);

      const ret: gotResType = {};
      if (!isNull(e.response)) {
        ret.error = e;
        ret.statusCode = e.response.statusCode;
        ret.statusMessage = e.response.statusMessage;
        ret.response = e.response;
      } else {
        ret.error = e;
        ret.statusCode = -1;
        ret.statusMessage = e.message;
      }
      return ret;
    }
  }
}

// exports.gotUtils = gotUtils;
