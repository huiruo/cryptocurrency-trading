import http from "./http";
import {traderApiUrl} from "./config";

const traderApi = {

	onLogin(data:any){
		const url = `${traderApiUrl}/trader/user/login`;
		return http.post2(url, data);
	},

	get24hrTicker(data:any){
		const url = `${traderApiUrl}/trader/api/ticker/24hr`;
		return http.get2(url, data);
	},
}

export default traderApi;
