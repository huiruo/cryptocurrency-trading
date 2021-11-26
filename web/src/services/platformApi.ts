import http from "./http";
import {platformUrl} from "./config.ts";

const platformApi = {

	getSSprice(data){
		console.log("getSSprice:",data)
		console.log("getSSprice_url:",platformUrl)
		const url = `${platformUrl}/api/spot/v3/instruments/BTC-USDT/ticker`

		return http.get(url, data);
	},

	getTreeApi(data) {
		const url = `${platformUrl}/trader/menu/getTree`;

		return http.post2(url, data);
	},

	//获取列数据
	getColumnsDataApi(data) {
		const url = `${platformUrl}/columns/getByFormKey`;

		return http.post2(url, data);
	},

	//获取表-行数据
	getDataSourceApi(data) {
		const url = `${platformUrl}/data/getFormData`;

		return http.post2(url, data);
	},
}
export default platformApi;