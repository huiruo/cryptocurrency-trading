// import http from "./http";
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
}

export default traderApi;
