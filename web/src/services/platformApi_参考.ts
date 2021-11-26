import http from "./http";
import {traderApiUrl} from "./config.ts";
/* 模拟数据
import {
	detailMock,
	treeMock,
	rowMock,
	columnsMock
} from './mockJson'
const getMock = (type) => {
	let data: any = null
	switch (type) {
		case 'detail':
			data = detailMock
			break;
		case 'tree':
			data = treeMock
			break;
		case 'row':
			data = rowMock
			break;
		case 'columns':
			data = columnsMock
			break;
	}
	return new Promise((resolve) => {
		setTimeout(function () {
			console.log("模拟mock---->", data)
			resolve(data);
		}, 1000);
	}).catch((error) => {
		console.log(error)
	});
}
*/

const traderApi = {
	getTreeApi(data) {
		const url = `${traderApiUrl}/trader/menu/getTree`;
		return http.post2(url, data);
		// return getMock('tree')
	},
	//获取列数据
	getColumnsDataApi(data) {
		const url = `${traderApiUrl}/columns/getByFormKey`;
		return http.post2(url, data);
		// return getMock('columns')
	},
	//获取表-行数据
	getDataSourceApi(data) {
		const url = `${traderApiUrl}/data/getFormData`;
		return http.post2(url, data);
		// return getMock('row')
	},
	//点击侧边栏获取表的详情
	getTableDetailByKeyApi(data) {
		const url = `${traderApiUrl}/form/getByFolderId`;
		return http.post2(url, data);
		// return getMock('detail')
	},
	loginApi(data) {
		/*
		const url = `${traderApiUrl}/trader/menu/getTree`;
		return http.get2(url, data);
		*/
		return new Promise((resolve) => {
			setTimeout(function () {
				console.log('执行完成', data);
				/*
				const dataRes = {
					code: 4009,
					msg: "账号或密码错误"
				}
				*/
				const dataSuc = {
					code: 1,
					msg: '成功',
					data: {
						affiliation: 0,
						depId: 1,
						hadSubPwd: 0,
						isGuildBoss: 1,
						loginName: "admin",
						phoneChecked: false,
						phoneNumber: "18825163428",
						realName: "管理员",
						sessionId: "0120b512e6e4727a4fb26543e9d11eff",
						userId: "75655",
						userType: 1,
						vvRoleGroupIds: "1,36",

					}
				}
				resolve(dataSuc);
			}, 1000);
		}).catch((error) => {
			console.log(error)
		});
	},
	//添加列
	addColumnApi(data) {
		const url = `${traderApiUrl}/columns/save`;
		return http.post2(url, data);
		// return getMock('row')
	},
	//添加行
	addRowApi(data) {
		const url = `${traderApiUrl}/data/saveOne`;
		return http.post(url, data);
	},
	//添加文件夹
	addFileApi(data) {
		const url = `${traderApiUrl}/trader/menu/save`;
		return http.post2(url, data);
	},
	//添加表
	addTableApi(data) {
		const url = `${traderApiUrl}/form/save`;
		return http.post2(url, data);
	},
	//编辑行数据
	editRowApi(data) {
		const url = `${traderApiUrl}/data/updateOne`;
		return http.post2(url, data);
	},
	//删除行数据
	deleteRowApi(data) {
		const url = `${traderApiUrl}/data/removeOne`;
		return http.post2(url, data);
	},
}
export default traderApi;
