import http from "./http";
import { traderApiUrl } from "./config";

interface resType {
	data: any,
	code?: number,
	message?: string
}

interface Ticker24hrType {
	data: any,
	code?: number,
	message?: string
}

interface onLoginType {
	data: any,
	code?: number,
	message?: string
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
	onLogin(data: any) {
		const url = `${traderApiUrl}/trader/user/login`;
		return http.post<onLoginType>(data, url);
	},
	get24hrTicker(data: any) {
		const url: string = `${traderApiUrl}/trader/ticker/24hr`;
		return http.get<Ticker24hrType>(data, url);
	},
	getMyTrades(data: any) {
		const url: string = `${traderApiUrl}/trader/api/myTrades`;
		return http.get<resType>(data, url);
	},

	cryptoWalletApi() {
		const url: string = `${traderApiUrl}/account/api/cryptoWallet`;
		return http.get<resType>({}, url);
	},

	getStrategiesApi() {
		const url: string = `${traderApiUrl}/account/api/getStrategies`;
		return http.get<resType>({}, url);
	},

	// 计算成本
	calculateCostpriceApi(data: any) {
		const url: string = `${traderApiUrl}/account/api/calculateCostprice`;
		return http.get<resType>(data, url);
	},

	// 创建/更新策略
	updateTradingStrategy(data: any) {
		const url: string = `${traderApiUrl}/account/api/updateStrategy`;
		return http.get<resType>(data, url);
	},

	// 更新盈亏
	updateProfitApi(data: any) {
		const url: string = `${traderApiUrl}/account/binance/updateProfit`;
		return http.get<resType>(data, url);
	},

	// 同步钱包
	updateCryptoWalletApi() {
		const url: string = `${traderApiUrl}/account/binance/cryptoWallet`;
		return http.get<resType>({}, url);
	},

	// 从币安更新订单
	myTradesFromBinance(data: any) {
		const url: string = `${traderApiUrl}/trader/binance/myTrades`;
		return http.get<resType>(data, url);
	},

	// 添加请求code
	addSimplifySymbol(data: any) {
		const url: string = `${traderApiUrl}/data/center/addCode`;
		return http.post<resType>(data, url);
	},

	getSymbolList() {
		const url: string = `${traderApiUrl}/data/center/symbolList`;
		return http.get<resType>({}, url);
	},

	syncCoinInfoApi(data: any) {
		const url: string = `${traderApiUrl}/data/center/syncCoinInfo`;
		return http.post<resType>(data, url);
	},

	getCoinApi(data: any) {
		const url: string = `${traderApiUrl}/data/center/getCoin`;
		return http.post<resType>(data, url);
	},

	syncBalancesApi() {
		const url: string = `${traderApiUrl}/data/center/syncBalances`;
		return http.get<resType>({}, url);
	},

	balancesApi() {
		const url: string = `${traderApiUrl}/data/center/balances`;
		return http.get<resType>({}, url);
	},

	syncFutureOrderApi() {
		const url: string = `${traderApiUrl}/data/center/syncFutureOrder`;
		return http.get<resType>({}, url);
	},

	futureOrdersApi(data: any) {
		const url: string = `${traderApiUrl}/data/center/futureOrders`;
		return http.post<resType>(data, url);
	},
}

export default traderApi;
