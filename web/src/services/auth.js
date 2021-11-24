import Cookies from "js-cookie";

const TokenKey = "Admin-Token-Market";
const UserTypeKey = "User-Type-Market";
const KonfiToKenKey = "KonfiToken";
export function setKonfiToken(value) {
	Cookies.set(KonfiToKenKey, value);
	// window.sessionStorage.setItem(KonfiToKenKey, value);
}

export function getKonfiToken() {
	return Cookies.get(KonfiToKenKey);
	// return window.sessionStorage.getItem(KonfiToKenKey);
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
export function setToken(token) {
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
export function setUserType(type) {
	return Cookies.set(UserTypeKey, type);
}
/**
 * 删除 账户权限
 */
export function removeUserType() {
	return Cookies.remove(UserTypeKey);
}
