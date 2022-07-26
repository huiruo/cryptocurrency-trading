import http from "./http";
import {traderApiUrl} from "./config";

interface resType {
  data: any, 
  code?: number,
  msg?: string
}

interface Ticker24hrType {
  data: any, 
  code?: number,
  msg?: string
}

interface onLoginType {
  data: any, 
  code?: number,
  msg?: string
}
const traderApi = {
	/*
	get24hrTicker(data:any){
		const url = `${traderApiUrl}/trader/ticker/24hr`;
		return http.get2(url, data);
	},
	onLogin(data:any){
		const url = `${traderApiUrl}/trader/user/login`;
		return http.post2(url, data);
	},
	*/
	onLogin(data:any){
		const url = `${traderApiUrl}/trader/user/login`;
		return http.post<onLoginType>(data,url);
	},
	get24hrTicker(data:any){
		const url:string = `${traderApiUrl}/trader/ticker/24hr`;
		return http.get<Ticker24hrType>(data,url);
	},
	getMyTrades(data:any){
		const url:string = `${traderApiUrl}/trader/api/myTrades`;
		return http.get<resType>(data,url);
	},

	cryptoWalletApi(){
		const url:string = `${traderApiUrl}/account/api/cryptoWallet`;
		return http.get<resType>({},url);
	},

	getStrategiesApi(){
		const url:string = `${traderApiUrl}/account/api/getStrategies`;
		return http.get<resType>({},url);
	},

	// 计算成本
	calculateCostpriceApi(data:any){
		const url:string = `${traderApiUrl}/account/api/calculateCostprice`;
		return http.get<resType>(data,url);
	},

	// 创建/更新策略
	updateTradingStrategy(data:any){
		const url:string = `${traderApiUrl}/account/api/updateStrategy`;
		return http.get<resType>(data,url);
	},

	// 更新盈亏
	updateProfitApi(data:any){
		const url:string = `${traderApiUrl}/account/binance/updateProfit`;
		return http.get<resType>(data,url);
	},

	// 同步钱包
	updateCryptoWalletApi(){
		const url:string = `${traderApiUrl}/account/binance/cryptoWallet`;
		return http.get<resType>({},url);
	},

	// 从币安更新订单
	myTradesFromBinance(data:any){
		const url:string = `${traderApiUrl}/trader/binance/myTrades`;
		return http.get<resType>(data,url);
	}
}

export default traderApi;
