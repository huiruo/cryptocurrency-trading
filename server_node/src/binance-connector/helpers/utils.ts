const got = require('got')
const {HttpsProxyAgent}  = require('hpagent')
const { Console } = require('console')
const {gotUtils} = require('./gotUtils')
// const constants = require('./constants')
// const axios = require('axios')

const removeEmptyValue = obj => {
  if (!(obj instanceof Object)) return {}
  Object.keys(obj).forEach(key => isEmptyValue(obj[key]) && delete obj[key])
  return obj
}

const isEmptyValue = input => {
  /**
   * Scope of empty value: falsy value (except for false and 0),
   * string with white space characters only, empty object, empty array
   */
  return (!input && input !== false && input !== 0) ||
    ((typeof input === 'string' || input instanceof String) && /^\s+$/.test(input as string)) ||
    (input instanceof Object && !Object.keys(input).length) ||
    (Array.isArray(input) && !input.length)
}

const buildQueryString = params => {
  if (!params) return ''
  return Object.entries(params)
    .map(stringifyKeyValuePair)
    .join('&')
}

/**
 * NOTE: The array conversion logic is different from usual query string.
 * E.g. symbols=["BTCUSDT","BNBBTC"] instead of symbols[]=BTCUSDT&symbols[]=BNBBTC
 */
const stringifyKeyValuePair = ([key, value]) => {
  const valueString = Array.isArray(value) ? `["${value.join('","')}"]` : value
  return `${key}=${encodeURIComponent(valueString)}`
}

/*
const getRequestInstance = (config) => {
  return axios.create({
    ...config
  })
}
*/

// const createRequest = (config) => {
const createRequest = async(config) => {
  const { baseURL, apiKey, method, url,proxyUrl='' } = config

  const reqUrl = baseURL+url
  console.log("req_url:",reqUrl)
  console.log("req_parm:",config)

  const headers={
        'Content-Type': 'application/json',
        'X-MBX-APIKEY': apiKey,
  }

  // let proxyUrl_test = 'http://127.0.0.1:7890'
  let proxyUrl_test = ''

  if(method==='GET'){
    console.log("GET开始请求--->")
    const data = gotUtils.get(reqUrl,headers,proxyUrl_test)
    return data
  }else if(method==='POST'){
    console.log("POST开始请求--->")
    const data = await gotUtils.post(reqUrl,headers,proxyUrl_test,{});
    return data
  }
}

const flowRight = (...functions) => input => functions.reduceRight(
  (input, fn) => fn(input),
  input
)

const defaultLogger = new Console({
  stdout: process.stdout,
  stderr: process.stderr
})

module.exports = {
  isEmptyValue,
  removeEmptyValue,
  buildQueryString,
  createRequest,
  flowRight,
  defaultLogger
}
export {}