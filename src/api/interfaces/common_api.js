/**
 *   通用模块   放置 通用的 接口
 */


import fetch from '../fetch';

import domainURL from '../urls';

import postFile from '../postFile';

//  带有进度条的上传过程
export function uploadFile(params,context) {
    return postFile({
        url: domainURL.uploadFile,
        method: 'post',
        params: params
    },context);
}

// 获取session
export function getSessionUser(context) {
    return fetch({
        url: domainURL.getSessionUser,
        method: 'get',
        params:''
    },context);
}

// 获取分区列表
export function getAreaList(params,context) {
    return fetch({
        url: domainURL.getAreaList,
        method: 'post',
        params: params
    },context);
}
























































































































































































































