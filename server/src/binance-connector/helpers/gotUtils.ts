import { gotResType } from '../types'
const got = require('got');
const { HttpsProxyAgent }  = require('hpagent')
const _ = require('lodash');

const isNull=(param)=>{
  return _.isNull(param) || _.isUndefined(param);
}

class gotUtils {
    constructor(){
    }

    /**
     * 通过 application/x-www-form-urlencoded 方式上传参数
     * @param {string} reqUrl
     * @param {object} paramBody
     * @param {object} paramOptions
     * @param {object} headers
     * @returns {{error ?: object, statusCode ?: number, statusMessage ?: string, body ?: string, response ?: any}} 响应结果
     */
    static async postForm(reqUrl,headers?,proxyUrl?:string,paramOptions = {}) {
        console.log("post-proxyUrl",proxyUrl)
        const agent = proxyUrl?{
                        https: new HttpsProxyAgent({
                        keepAlive: true,
                        keepAliveMsecs: 10000,
                        maxSockets: 256,
                        maxFreeSockets: 256,
                        proxy: proxyUrl
                    })
                }:null
        try {
            const res = await got.post(reqUrl, {
                headers,
                agent,
            });
            return {error: null, statusCode: res.statusCode, statusMessage: res.statusMessage, body: JSON.parse(res.body), response: res.response};
        }catch(e) {
            let ret:gotResType = {};
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
     * 通过 application/json 方式上传参数
     * @param {string} reqUrl
     * @param {object} paramBody
     * @param {object} paramOptions
     * @param {object} headers
     * @returns {{error ?: object, statusCode ?: number, statusMessage ?: string, body ?: string, response ?: any}} 响应结果
     */
    static async post(reqUrl,headers?,proxyUrl?:string,paramOptions = {}) {
        try {
            console.log("post-proxyUrl",proxyUrl)
            const agent = proxyUrl?{
                            https: new HttpsProxyAgent({
                            keepAlive: true,
                            keepAliveMsecs: 10000,
                            maxSockets: 256,
                            maxFreeSockets: 256,
                            proxy: proxyUrl
                        })
                    }:null
            console.log("post-agent",agent)
            const res = await got.post(reqUrl, {
                headers,
                agent,
            });
            // }).json();
            return {error: null, statusCode: res.statusCode, statusMessage: res.statusMessage, data: JSON.parse(res.body), response: res.response};
        }catch(e) {
            let ret:gotResType = {};
            if (!isNull(e.response)) {
                ret.statusCode = e.response.statusCode;
                ret.statusMessage = e.response.statusMessage;
                ret.response = e.response;
                ret.error = e
            } else {
                ret.statusCode = -1;
                ret.statusMessage = e.message;
                ret.error = e
            }
            console.log("post请求错误:",ret)
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
    static async get(reqUrl:string,headers?,proxyUrl?:string) {

        console.log("proxyUrl",proxyUrl)
        const agent = proxyUrl?{
                        https: new HttpsProxyAgent({
                        keepAlive: true,
                        keepAliveMsecs: 10000,
                        maxSockets: 256,
                        maxFreeSockets: 256,
                        proxy: proxyUrl
                    })
                }:null
        console.log("agent",agent)
        try {
            const res = await got.get(reqUrl, {
                headers,
                agent,
            });
            // }).json();
            return {error: null, statusCode: res.statusCode, statusMessage: res.statusMessage, data: JSON.parse(res.body)};
        }catch(e) {
            let ret:gotResType = { };
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

exports.gotUtils = gotUtils;