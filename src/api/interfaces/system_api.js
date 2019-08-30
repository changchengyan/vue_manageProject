/**
 *  @desc 系统配置 模块的 接口
 *  @author  wangwei
 *  @time 2019-8-15
 *
 */

import fetch from '../fetch';
import domainURL from '../urls';


/**
 *  供水工程
 */

export function getWrCwsBList(params, context) {
	return fetch({
		url: domainURL.getWrCwsBList,
		method: 'post',
		params
	}, context);
}


export function saveOrUpWrCwsB(params, context) {
	return fetch({
		url: domainURL.saveOrUpWrCwsB,
		method: 'post',
		params
	}, context);
}

export function updWrCwsUseStatus(params, context) {
	return fetch({
		url: domainURL.updWrCwsUseStatus,
		method: 'post',
		params
	}, context);
}


export function delSupplyWater(params, context) {
	return fetch({
		url: domainURL.delSupplyWater,
		method: 'post',
		params
	}, context);
}

export function supplyWaterCheckExist(params, context) {
	return fetch({
		url: domainURL.supplyWaterCheckExist,
		method: 'post',
		params
	}, context);
}



/**
 * 获取工程配置列表
 */

// 系统配置-工程配置-检查水库编码是否存在
export function wrResBCtrlCheckExist(params, context) {
	return fetch({
		url: domainURL.wrResBCtrlCheckExist,
		method: 'post',
		params
	}, context);
}
// 系统配置-工程配置-检查水厂编码是否存在
export function wrWfctBCtrlCheckExist(params, context) {
	return fetch({
		url: domainURL.wrWfctBCtrlCheckExist,
		method: 'post',
		params
	}, context);
}
// 系统配置-工程配置-检查泵站编码是否存在
export function wrPumpBCtrlCheckExist(params, context) {
	return fetch({
		url: domainURL.wrPumpBCtrlCheckExist,
		method: 'post',
		params
	}, context);
}
// 系统配置-工程配置-检查联户表井编码是否存在
export function dseWrLhbjBCtrlCheckExist(params, context) {
	return fetch({
		url: domainURL.dseWrLhbjBCtrlCheckExist,
		method: 'post',
		params
	}, context);
}
// 系统配置-工程配置- 检查蓄水池编码是否存在
export function dsePoolinfBCtrlCheckExist(params, context) {
	return fetch({
		url: domainURL.dsePoolinfBCtrlCheckExist,
		method: 'post',
		params
	}, context);
}
// 系统配置-工程配置-获取分区列表
export function getDictListByValues(params, context) {
	return fetch({
		url: domainURL.getDictListByValues,
		method: 'post',
		params
	}, context);
}
// 系统配置-工程配置-保存更新水库基本信息
export function saveOrUpWrResB(params, context) {
	return fetch({
		url: domainURL.saveOrUpWrResB,
		method: 'post',
		params
	}, context);
}
// 系统配置-工程配置-保存更新水厂基本信息
export function saveOrUpWrWfctB(params, context) {
	return fetch({
		url: domainURL.saveOrUpWrWfctB,
		method: 'post',
		params
	}, context);
}
// 系统配置-工程配置-保存更新泵站基本信息
export function saveOrUpWrPumpB(params, context) {
	return fetch({
		url: domainURL.saveOrUpWrPumpB,
		method: 'post',
		params
	}, context);
}
// 系统配置-工程配置-保存更新联户表井基本信息
export function saveOrUpDseWrLhbjB(params, context) {
	return fetch({
		url: domainURL.saveOrUpDseWrLhbjB,
		method: 'post',
		params
	}, context);
}
// 系统配置-工程配置-保存更新蓄水池基本信息
export function saveOrUpDsePoolinfB(params, context) {
	return fetch({
		url: domainURL.saveOrUpDsePoolinfB,
		method: 'post',
		params
	}, context);
}
// 系统配置-工程配置-删除工程配置列表
export function destoryGcgl(params, context) {
	return fetch({
		url: domainURL.destoryGcgl,
		method: 'post',
		params
	}, context);
}
// 系统配置-工程配置-获取工程配置列表
export function getGcglList(params, context) {
	return fetch({
		url: domainURL.getGcglList,
		method: 'post',
		params
	}, context);
}
// 系统配置-工程配置-保存更新用水户基本信息
export function saveOrUpDseWateruseB(params, context) {
	return fetch({
		url: domainURL.saveOrUpDseWateruseB,
		method: 'post',
		params
	}, context);
}

/**
 *
 * @param params
 * @param context
 * @returns {*|Promise|Promise<any>}  监测点配置
 */


// 系统配置-监测点配置-获取监测点基本信息列表
export function getStJcdBList(params, context) {
	return fetch({
		url: domainURL.getStJcdBList,
		method: 'post',
		params
	}, context);
}
// 系统配置-监测点配置-保存更新监测点基本信息
export function saveOrUpStJcdB(params, context) {
	return fetch({
		url: domainURL.saveOrUpStJcdB,
		method: 'post',
		params
	}, context);
}
// 系统配置-监测点配置-删除监测点基本信息
export function destoryStJcdB(params, context) {
	return fetch({
		url: domainURL.destoryStJcdB,
		method: 'post',
		params
	}, context);
}
// 系统配置-监测点配置-检查监测点代码是否存在
export function checkExist(params, context) {
	return fetch({
		url: domainURL.checkExist,
		method: 'post',
		params
	}, context);
}

export function sitePointdel(params, context) {
	return fetch({
		url: domainURL.sitePointdel + '/' + params.delId,
		method: 'delete'
	}, context);
}

export function getStWarnList(params, context) {
	return fetch({
		url: domainURL.getStWarnList,
		method: 'post',
		params
	}, context);
}
