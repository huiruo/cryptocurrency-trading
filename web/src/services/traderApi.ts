// import http from "./http";
import http from "./http";
import {traderApiUrl} from "./config";

// interface Ticker24hrInter<T> {
//   data: T, 
//   code?: number,
//   msg?: string
// }
interface Ticker24hrInter {
  data: any, 
  code?: number,
  msg?: string
}

interface onLoginInter {
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
		return http.post<onLoginInter>(data,url);
	},
	get24hrTicker(data:any){
		const url:string = `${traderApiUrl}/trader/ticker/24hr`;
		return http.get<Ticker24hrInter>(data,url);
	},
}

export default traderApi;
