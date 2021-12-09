import {gotResType} from '../types'
const got = require('got');
const {HttpsProxyAgent}  = require('hpagent')
const _ = require('lodash');

const HttpMethod = {
    get    : 'GET',
    post   : 'POST',
    put    : 'PUT',
    patch  : 'PATCH',
    head   : 'HEAD',
    delete : 'DELETE',
    options: 'OPTIONS',
    trace  : 'TRACE'
};

const isNull=(param)=>{
  console.log("isNull:",param)
  return _.isNull(param) || _.isUndefined(param);
}

class gotUtils {
    constructor(){
        console.log("constructor--->")
    }
    /**
     * 初始化选项
     * @param {object}  paramOptions 默认传入的选项
     * @param {string}  paramMethod 要设置的方法 @see HttpMethod
     * @param {object}  headers http的header选项
     * @return {object} 返回初始化的options
     */
    static initOptions(paramOptions, paramMethod, headers) {

        if (isNull(paramOptions)) {
            paramOptions = {};
        }

        if (!_.isObject(paramOptions)) {
            paramOptions = {};
        }
        if (isNull(headers)) {
            headers = {};
        }

        if (!_.isObject(headers)) {
            headers = {};
        }
        let options = _.clone(paramOptions);

        options.headers = _.clone(headers);
        options.method = paramMethod;
        return options;
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
        // let options = this.initOptions(paramOptions, HttpMethod.post, headers);
        // options.form = paramBody;
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
            // const res:gotResType = await got(reqUrl, options);
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
            // console.log("post-res.statusCode",JSON.parse(res.statusCode))
            // console.log("post-res.statusCode",res.statusMessage)
            console.log("post-----res.body:",JSON.parse(res.body))
            return {error: null, statusCode: res.statusCode, statusMessage: res.statusMessage, body: JSON.parse(res.body), response: res.response};
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
    // static async get(reqUrl,headers = {},proxyUrl,paramBody, paramOptions = {}, ) {
    static async get(reqUrl:string,headers?,proxyUrl?:string) {
        // let options = this.initOptions(paramOptions, HttpMethod.get, headers = {});
        // options.searchParams = new URLSearchParams(paramBody);
        // console.log("option",options)
        // options.agent={
        //     https: new HttpsProxyAgent({
        //         keepAlive: true,
        //         keepAliveMsecs: 10000,
        //         maxSockets: 256,
        //         maxFreeSockets: 256,
        //         proxy: proxyUrl
        //     })
        // }
        // /*
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
            return {error: null, statusCode: res.statusCode, statusMessage: res.statusMessage, body: JSON.parse(res.body)};
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