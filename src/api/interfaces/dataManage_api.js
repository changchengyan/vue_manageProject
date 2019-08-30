/**
 *  @desc 数据管理 模块的 接口
 *  @author  changcheng
 *  @time 2019-8-15
 *
 */


import fetch from '../fetch';
import domainURL from '../urls';

/**
 *
 * 报警信息
 *
 */


export function handleWarnInfo(params, context) {
	return fetch({
		url: domainURL.handleWarnInfo,
		method: 'post',
		params: params
	}, context);
}

export function getWarnList(params, context) {
	return fetch({
		url: domainURL.getWarnList,
		method: 'post',
		params: params
	}, context);
}

export function exportWarnList(params, context) {
	return fetch({
		url: domainURL.exportWarnList,
		method: 'post',
		params: params
	}, context);
}
// 获取工程列表 工程类型（prtype）1：水厂 2： 水库 3：泵站  4：蓄水池 5：联户表井
export function getGcglList(params, context) {
	return fetch({
		url: domainURL.getGcglList,
		method: 'post',
		params: params
	}, context);
}






/**
 *
 *  监测预警
 *
 */

export function getScjcList(params, context) {
	return fetch({
		url: domainURL.getScjcList,
		method: 'post',
		params: params
	}, context);
}

export function getSkjcList(params, context) {
	return fetch({
		url: domainURL.getSkjcList,
		method: 'post',
		params: params
	}, context);
}

export function getLhbjList(params, context) {
	return fetch({
		url: domainURL.getLhbjList,
		method: 'post',
		params: params
	}, context);
}

export function getBzjcList(params, context) {
	return fetch({
		url: domainURL.getBzjcList,
		method: 'post',
		params: params
	}, context);
}

export function getGdjcdList(params, context) {
	return fetch({
		url: domainURL.getGdjcdList,
		method: 'post',
		params: params
	}, context);
}

export function getXscjcList(params, context) {
	return fetch({
		url: domainURL.getXscjcList,
		method: 'post',
		params: params
	}, context);
}
// 修改监测数据
export function updScjcData(params, context) {
	return fetch({
		url: domainURL.updScjcData,
		method: 'post',
		params: params
	}, context);
}
// 根据分区编码获取相应工程
export function getGcByAreaCode(params, context) {
	return fetch({
		url: domainURL.getGcByAreaCode,
		method: 'post',
		params: params
	}, context);
}
// 获取监测点基本信息列表
export function getStJcdBList(params, context) {
	return fetch({
		url: domainURL.getStJcdBList,
		method: 'post',
		params: params
	}, context);
}

/**
 *
 * 农饮指标
 *
 */


export function getDseGszbRList(params, context) {
	return fetch({
		url: domainURL.getDseGszbRList,
		method: 'post',
		params: params
	}, context);

}

export function saveOrUpDseGszbR(params, context) {
	return fetch({
		url: domainURL.saveOrUpDseGszbR,
		method: 'post',
		params: params
	}, context);
}

export function nyIndex_delete(params, context) {
	return fetch({
		url: domainURL.nyIndex_delete + '/' + params.delId,
		method: 'post',
		params: params
	}, context);
}



/**
 *
 * 水量管理
 *
 */
