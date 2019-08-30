/**
 *
 * @desc 针对 www-form 的接口的  集中管理
 * @author changcheng
 * @time  2019-8-15
 *
 */

import fetch from '../contentType_form_fetch';
import domainURL from '../urls';

// 报警列表  getWarnList
export function getWarnList(params,context) {
  return fetch({
    url: domainURL.getWarnList,
    method: 'get',
    params: params
  },context);
}

export function getPipeMapList(context) {
  return fetch({
    url: domainURL.getPipeMapList,
    method: 'get'
  },context);
}

export function getPipeValveMapList(context) {
  return fetch({
    url: domainURL.getPipeValveMapList,
    method: 'get'
  },context);
}

export function getWellMapList(context) {
  return fetch({
    url: domainURL.getWellMapList,
    method: 'get'
  },context);
}

export function getHydrantMapList(context) {
  return fetch({
    url: domainURL.getHydrantMapList,
    method: 'get'
  },context);
}



// 获取组织机构
export function listDepartmentByOrgId(params,context) {
  return fetch({
    url: domainURL.listDepartmentByOrgId,
    method: 'post',
    params: params
  },context);
}

// 查看 分区漏损的 色值
export function getLeakColor(context) {
  return fetch({
    url: domainURL.getLeakColor,
    method: 'get'
  },context);
}

// 综合监测 获取生产组织结构(分区)
export function getOrganDictTree(params, context) {
	return fetch({
		url: domainURL.getOrganDictTree,
		method: 'post',
		params
	}, context);
}
