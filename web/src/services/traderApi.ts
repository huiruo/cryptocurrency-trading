import http from "./http";
import {traderApiUrl} from "./config.ts";

const traderApi = {

	testLogin(data){
		const url = `${traderApiUrl}/trader/user/login`;
		console.log("data",data)
		console.log("url",url)
		return http.post2(url, data);
	},

	getTreeApi(data) {
		const url = `${traderApiUrl}/trader/`;

		return http.post2(url, data);
	},

	//获取列数据
	getColumnsDataApi(data) {
		const url = `${traderApiUrl}/columns`;

		return http.post2(url, data);
	},

	//获取表-行数据
	getDataSourceApi(data) {
		const url = `${traderApiUrl}/data`;

		return http.post2(url, data);
	},
}

export default traderApi;
