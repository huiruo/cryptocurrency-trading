import Cookies from "js-cookie";

const TokenKey = "Admin-Token-Market";
const UserTypeKey = "User-Type-Market";
const traderToKenKey = "Trader-Token";
export function setTranderToken(value:any) {
	Cookies.set(traderToKenKey, value);
	// window.sessionStorage.setItem(traderToKenKey, value);
}

export function getTranderToken() {
	return Cookies.get(traderToKenKey);
	// return window.sessionStorage.getItem(traderToKenKey);
}

/**
 * 读取 账户权限
 */
export function getToken() {
	return Cookies.get(TokenKey);
}

/**
 * 设置 账户权限
 * @param {*} token
 */
export function setToken(token:any) {
	return Cookies.set(TokenKey, token);
}

/**
 * 删除 账户权限
 */
export function removeToken() {
	return Cookies.remove(TokenKey);
}
/**
 * 读取 账户权限
 */
export function getUserType() {
	return Cookies.get(UserTypeKey);
}

/**
 * 设置 账户权限
 * @param {*} token
 */
export function setUserType(type:any) {
	return Cookies.set(UserTypeKey, type);
}
/**
 * 删除 账户权限
 */
export function removeUserType() {
	return Cookies.remove(UserTypeKey);
}
