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
	onLogin(data: any) {
		const url = `${traderApiUrl}/trader/user/login`;
		return http.post<onLoginType>(data, url);
	},

	getAssetApi() {
		const url: string = `${traderApiUrl}/data/center/asset`;
		return http.get<resType>({}, url);
	},

	// add symbol code
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

	// =========== Spot Order start ===========
	syncSpotOrderApi(data: any) {
		const url: string = `${traderApiUrl}/data/center/syncSpotOrder`;
		return http.post<resType>(data, url);
	},

	spotOrdersApi(data: any) {
		const url: string = `${traderApiUrl}/data/center/spotOrders`;
		return http.post<resType>(data, url);
	},
	mergeSpotStrategiesApi(data: any) {
		const url: string = `${traderApiUrl}/data/center/mergeSpotStrategies`;
		return http.post<resType>(data, url);
	},
	closeSpotStrategyApi(data: any) {
		const url: string = `${traderApiUrl}/data/center/closeSpotStrategy`;
		return http.post<resType>(data, url);
	},
	addAssetApi(data: any) {
		const url: string = `${traderApiUrl}/data/center/addAsset`;
		return http.post<resType>(data, url);
	},
	// =========== Spot Order end ===========

	// =========== Strategies Order start ===========
	creatStrategiesApi(data: any) {
		const url: string = `${traderApiUrl}/data/center/createStrategies`;
		return http.post<resType>(data, url);
	},
	strategiesOrderApi(data: any) {
		const url: string = `${traderApiUrl}/data/center/strategiesOrder`;
		return http.post<resType>(data, url);
	},
	mergeStrategiesApi(data: any) {
		const url: string = `${traderApiUrl}/data/center/futureOrders`;
		return http.post<resType>(data, url);
	},
	syncStrategyPriceApi(data: any) {
		const url: string = `${traderApiUrl}/data/center/strategyPrice`;
		return http.post<resType>(data, url);
	}
	// =========== Strategies Order end ===========
}

export default traderApi;
