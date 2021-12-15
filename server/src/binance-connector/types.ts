
// import {optionsType} from '../types'
// import {wsRefType} from '../types'
export interface optionsType{
  baseURL?:string
  proxyUrl?:string
  symbols?:any
  symbol?:string
  orderListId?:string|number
  listClientOrderId?:string|number
  origClientOrderId?:string|number
}

export interface wsRefType{
  closeInitiated?:any
  ws?:any
}

export interface binanceConnectorType{
  binance_api_key:string
  binance_api_secret:string
  proxy_url?:string
}

export interface gotResType{
  body?:any
  statusCode?:string|number
  error?:string|number
  statusMessage?:string|number
  response?:any
}