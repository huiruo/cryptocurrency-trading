import axios from "axios";
// import { setTranderToken, getTranderToken } from "./auth.ts";

const CONTENT__TYPE = "application/json;charset=utf-8";

axios.defaults.withCredentials = true;

const instance = axios.create({
});

// instance 拦截,设置 header
instance.interceptors.request.use(
	config => {
		// Do something before request is sent
		config.headers = {
			"Content-Type": config.contentType || CONTENT__TYPE,
			// traderToken: getTranderToken()
		};

		return config;
	},
	error => {
		// Do something with request error
		const promise = Promise.reject(error);
		return promise;
	}
);

// response 拦截,处理返回结果
instance.interceptors.response.use(
	response => {
		if (response.data.code === 4040) {
			console.log("会话过期，请重新登录")
			return;
		}
		if (response.headers.traderToken) {
			console.log("traderToken === ", response.headers.traderToken);
			// setTranderToken(response.headers.traderToken);
		}
		// Do something with response data
		const data = response.data;
		let promise = Promise.resolve(data);
		return promise;
	},
	error => {
		// Do something with response error
		console.log(error);
		if (error.response) {
			switch (error.response.status) {
				case 401:
					// 返回 401 清除token信息并跳转到登录页面
					console.log("返回 401 清除token信息并跳转到登录页面");
					break;
				default:
					console.log("default");
					break;
			}
		}

		const { status, statusText } = error.response;
		// 返回接口返回的错误信息
		const promise = Promise.reject({ status, statusText });
		return promise;
	}
);

// http methods
const http = {
	get: (url, options) => {
		const config = Object.assign(
			{},
			{
				url,
				method: "GET"
			},
			options
		);
		return instance(config);
	},
	get2: (url, body, options) => {
		if (body) {
			url += http.toQueryString(body);
		}
		const config = Object.assign(
			{},
			{
				url,
				method: "GET"
			},
			options
		);
		return instance(config);
	},
	post: (url, body, options) => {
		const config = Object.assign(
			{},
			{
				url,
				method: "POST",
				data: body
			},
			options
		);
		return instance(config);
	},
	post2: (url, body, options) => {
		const config = Object.assign(
			{},
			{
				url: url + http.toQueryString(body),
				method: "POST",
				data: body
			},
			options
		);
		return instance(config);
	},
	post3: (url, body, options) => {
		const config = Object.assign(
			{},
			{
				url: url + http.toQueryString(body),
				method: "POST"
			},
			options
		);
		return instance(config);
	},
	postForm: (url, body, options) => {
		let form = new FormData();
		for (let key in body) {
			if (body.hasOwnProperty(key)) {
				form.append(key, body[key]);
			}
		}
		const config = Object.assign(
			{},
			{
				url: url,
				method: "POST",
				data: form,
				processData: false,
				contentType: false
			},
			options
		);
		return instance(config);
	},
	postForm2: (url, body, options) => {
		const config = Object.assign(
			{},
			{
				url: url,
				method: "POST",
				data: body,
				processData: false,
				contentType: false
			},
			options
		);
		return instance(config);
	},
	put: (url, body, options) => {
		const config = Object.assign(
			{},
			{
				url,
				method: "PUT",
				data: body
			},
			options
		);
		return instance(config);
	},
	put2: (url, body, options) => {
		const config = Object.assign(
			{},
			{
				url: url + http.toQueryString(body),
				method: "PUT"
			},
			options
		);
		return instance(config);
	},
	delete: (url, body, options) => {
		const config = Object.assign(
			{},
			{
				url,
				method: "DELETE",
				data: body
			},
			options
		);
		return instance(config);
	},
	delete2: (url, body, options) => {
		const config = Object.assign(
			{},
			{
				url: url + http.toQueryString(body),
				method: "DELETE"
			},
			options
		);
		return instance(config);
	},
	blobReq: url => {
		const config = {
			url,
			method: "GET",
			responseType: "blob"
		};
		return instance(config);
	},
	toQueryString(obj) {
		return obj
			? "?" +
			Object.keys(obj)
				.sort()
				.map(key => {
					let val = obj[key];
					if (Array.isArray(val)) {
						return val
							.sort()
							.map(function (val2) {
								return key + "=" + val2;
							})
							.join("&");
					}
					return key + "=" + val;
				})
				.join("&")
			: "";
	}
};

export default http;