/**
 *  @desc 一张图 模块的 接口
 *  @author  changcheng
 *  @time 2019-8-15
 *
 */


import fetch from '../fetch';

import domainURL from '../urls';


// 分区计量
export function getLeakageMapList(context) {
	return fetch({
		url: domainURL.getLeakageMapList,
		method: 'get',
		params: ''
	}, context);
}

export function getAreaLeakList(params, context) {
	return fetch({
		url: domainURL.getAreaLeakList,
		method: 'post',
		params: params
	}, context);
}


/**
 *  预警信息
 */

export function getAlarmUrl(params, context) {
	return fetch({
		url: domainURL.getAlarmUrl,
		method: 'post',
		params: params
	}, context);
}

export function getRealTimeWarnList(params, context) {
	return fetch({
		url: domainURL.getRealTimeWarnList,
		method: 'post',
		params: params
	}, context);
}


/**
 *  模糊搜索
 */

export function getOneMapSearchList(params, context) {
	return fetch({
		url: domainURL.getOneMapSearchList,
		method: 'post',
		params: params
	}, context);
}


/**
 *  管网管理
 *
 */




/**
 *
 * 工程管理
 *
 */



// 水厂
export function getScgcxx(params, context) {
	return fetch({
		url: domainURL.getScgcxx,
		method: 'post',
		params: params
	}, context);
}


export function getScyxxx(params, context) {
	return fetch({
		url: domainURL.getScyxxx,
		method: 'post',
		params: params
	}, context);
}

export function getWrWfctB(params, context) {
	return fetch({
		url: domainURL.getWrWfctB,
		method: 'post',
		params: params
	}, context);
}

export function waterFactory_getScjcList(params, context) {
	return fetch({
		url: domainURL.waterFactory_getScjcList,
		method: 'post',
		params: params
	}, context);
}

// 泵站
export function getBzgcxx(params, context) {
	return fetch({
		url: domainURL.getBzgcxx,
		method: 'post',
		params: params
	}, context);
}

export function getBzyxxx(params, context) {
	return fetch({
		url: domainURL.getBzyxxx,
		method: 'post',
		params: params
	}, context);
}

export function pump_getBzjcList(params, context) {
	return fetch({
		url: domainURL.pump_getBzjcList,
		method: 'post',
		params: params
	}, context);
}

export function getWrPumpB(params, context) {
	return fetch({
		url: domainURL.getWrPumpB,
		method: 'post',
		params: params
	}, context);
}

export function getScSlList(params, context) {
	return fetch({
		url: domainURL.getScSlList,
		method: 'post',
		params: params
	}, context);
}


export function getBzYlList(params, context) {
	return fetch({
		url: domainURL.getBzYlList,
		method: 'post',
		params: params
	}, context);
}











/**
 *
 *  监测信息
 *
 */
// 获取实时水质监测信息
export function getSzJcList(params, context) {
	return fetch({
		url: domainURL.getSzJcList,
		method: 'post',
		params: params
	}, context);
}
// 获取水质监测信息详情
export function getRzjcList(params, context) {
	return fetch({
		url: domainURL.getRzjcList,
		method: 'post',
		params: params
	}, context);
}
// 获取实时水位监测信息
export function getSzList(params, context) {
	return fetch({
		url: domainURL.getSzList,
		method: 'post',
		params: params
	}, context);
}
// 获取水位监测信息详情
export function getRsvrRList(params, context) {
	return fetch({
		url: domainURL.getRsvrRList,
		method: 'post',
		params: params
	}, context);
}
// 获取实时流量监测信息
export function getSljcList(params, context) {
	return fetch({
		url: domainURL.getSljcList,
		method: 'post',
		params: params
	}, context);
}
// 获取流量监测信息详情
export function getSlList(params, context) {
	return fetch({
		url: domainURL.getSlList,
		method: 'post',
		params: params
	}, context);
}
// 获取实时压力监测信息
export function getYljcList(params, context) {
	return fetch({
		url: domainURL.getYljcList,
		method: 'post',
		params: params
	}, context);
}
// 获取压力监测信息详情
export function getYlList(params, context) {
	return fetch({
		url: domainURL.getYlList,
		method: 'post',
		params: params
	}, context);
}





/**
 *
 * 巡查检修信息
 *
 */


/**
 *
 *  水量水费信息
 *
 */
