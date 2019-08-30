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
  },context);
}

export function getAreaLeakList(params,context) {
    return fetch({
        url: domainURL.getAreaLeakList,
        method: 'post',
        params: params
    },context);
}



















