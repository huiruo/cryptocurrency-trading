import {gotResType} from '../types'
const got = require('got');
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

class GotUtils {
    /**
     * 初始化选项
     * @param {object}  paramOptions 默认传入的选项
     * @param {string}  paramMethod 要设置的方法 @see HttpMethod
     * @param {object}  paramheaders http的header选项
     * @return {object} 返回初始化的options
     */
    static initOptions(paramOptions, paramMethod, paramheaders) {

        if (isNull(paramOptions)) {
            paramOptions = {};
        }

        if (!_.isObject(paramOptions)) {
            paramOptions = {};
        }
        if (isNull(paramheaders)) {
            paramheaders = {};
        }

        if (!_.isObject(paramheaders)) {
            paramheaders = {};
        }
        let options = _.clone(paramOptions);

        options.headers = _.clone(paramheaders);
        options.method = paramMethod;
        return options;
    }

    /**
     * 通过 application/x-www-form-urlencoded 方式上传参数
     * @param {string} paramURL
     * @param {object} paramBody
     * @param {object} paramOptions
     * @param {object} paramHeaders
     * @returns {{error ?: object, statusCode ?: number, statusMessage ?: string, body ?: string, response ?: any}} 响应结果
     */
    static async postForm(paramURL, paramBody, paramOptions = {}, paramheaders = {}) {
        let options = this.initOptions(paramOptions, HttpMethod.post, paramheaders);
        options.form = paramBody;

        try {
            const r = await got(paramURL, options);
            return {error: undefined, statusCode: r.statusCode, statusMessage: r.statusMessage, body: r.body, response: r.response};
        }catch(e) {
            let ret:gotResType = { error: e };
            if (!_.isNull(e.response)) {
                ret.statusCode = e.response.statusCode;
                ret.statusMessage = e.response.statusMessage;
                ret.response = e.response;
            } else {
                ret.statusCode = -1;
                ret.statusMessage = e.message;
            }
            return ret;
        }
    }
    /**
     * 通过 application/json 方式上传参数
     * @param {string} paramURL
     * @param {object} paramBody
     * @param {object} paramOptions
     * @param {object} paramHeaders
     * @returns {{error ?: object, statusCode ?: number, statusMessage ?: string, body ?: string, response ?: any}} 响应结果
     */
    static async post(paramURL, paramBody, paramOptions = {}, paramheaders = {}) {
        let options = this.initOptions(paramOptions, HttpMethod.post, paramheaders);
        options.json = paramBody;

        try {
            const r = await got(paramURL, options);
            return {error: undefined, statusCode: r.statusCode, statusMessage: r.statusMessage, body: r.body, response: r.response};
        }catch(e) {
            let ret:gotResType = { error: e };
            if (!_.isNull(e.response)) {
                ret.statusCode = e.response.statusCode;
                ret.statusMessage = e.response.statusMessage;
                ret.response = e.response;
            } else {
                ret.statusCode = -1;
                ret.statusMessage = e.message;
            }
            return ret;
        }
    }
    /**
     * @param {string} paramURLRL
     * @param {object} paramBody
     * @param {object} paramOptions
     * @param {object} paramHeaders
     * @returns {{error ?: object, statusCode ?: number, statusMessage ?: string, body ?: string, response ?: any}} 响应结果
     */
    static async get(paramURL, paramBody, paramOptions = {}, paramheaders = {}) {
        let options = this.initOptions(paramOptions, HttpMethod.get, paramheaders = {});
        options.searchParams = new URLSearchParams(paramBody);

        try {
            const r = await got(paramURL, options);
            return {error: undefined, statusCode: r.statusCode, statusMessage: r.statusMessage, body: r.body, response: r.response};
        }catch(e) {
            let ret:gotResType = { error: e };
            if (!_.isNull(e.response)) {
                ret.statusCode = e.response.statusCode;
                ret.statusMessage = e.response.statusMessage;
                ret.response = e.response;
            } else {
                ret.statusCode = -1;
                ret.statusMessage = e.message;
            }
            console.log("GotUtils:",ret)
            return ret;
        }
    }
}

exports.GotUtils = GotUtils;