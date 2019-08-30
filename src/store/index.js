import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';



//局部vuex

import root_store from '@/store/modules/root';
// 一张图
import oneMap_store from '@/store/modules/oneMap_store';
// 用水分析
import waterAnalysis_store from '@/store/modules/waterAnalysis_store';
// 巡检管理
import routingManager_store from '@/store/modules/routingManager_store';
// 物资管理
import goodsManage_store from '@/store/modules/goodsManage_store';
// 节水管理
import saveWaterManage_store from '@/store/modules/saveWaterManage_store';
// 管网管理
import pipeManage_store from '@/store/modules/pipeManage_store';
// 应急管理
import emergencyManage_store from '@/store/modules/emergencyManage_store';
// 数据管理
import dataManage_store from '@/store/modules/dataManage_store';
// 系统管理
import system_store from '@/store/modules/system_store';

Vue.use(Vuex);

export default new Vuex.Store({

    modules: {
        oneMap_store,
        waterAnalysis_store,
        routingManager_store,
        goodsManage_store,
        saveWaterManage_store,
        root_store,
        pipeManage_store,
        emergencyManage_store,
        dataManage_store,
        system_store
    },
    strict: false,//此值不能设置为true，否则gis框架中vuex相关代码会出现循环调用
    // strict: process.env.NODE_ENV !== 'production'
    plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
});
