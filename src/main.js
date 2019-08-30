/**
 * @description 该文件为框架在开发时使用的主文件，在开发时为了能够预览各个模块的开发效果， 需要在此文件中引入当前模块中引入对应的库
 *
 * 例如： ./components 中的ImageCard.vue 文件使用了 bootstrap-vue这个库，则需要在这里引入才能在开发时看到效果。
 * */
import Vue from 'vue';
import ELEMENT from 'element-ui';
import VueHead from 'vue-head';
import App from './App';
import store from './store';

import '../node_modules/element-ui/lib/theme-chalk/index.css';

import dse from './config/inner_config';

import router from './router';
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'; //引入中文包，提示信息可以以中文形式显示

import _ from 'lodash';

import echarts from 'echarts';

import 'babel-polyfill';

import days from  'dayjs';

Vue.prototype.$echarts = echarts;

// 时间处理插件
Vue.prototype.$days = days;

VeeValidate.Validator.localize(zh_CN);

Vue.use(VueHead);

const config = {
    // errorBagName: 'errors',
    // fieldsBagName: 'fields',
    errorBagName: 'errorBags',//同时引入vee-validate和elmentui（在使用elmentui进行表单验证时会报冲突：The computed property "fields" is already defined in data，因为这两个包中都定义了fileds，因此此处更改VeeValidate的配置）
    fieldsBagName: 'fieldBags',
    delay: 100,
    locale: 'zh_CN',
    strict: true,
    enableAutoClasses: true,
    events: 'blur',
    inject: true
};
Vue.use(VeeValidate, config);

Vue.config.productionTip = false;

Vue.prototype.funTool = _;
//
Vue.use(ELEMENT);




Vue.prototype.DSE = dse;
window.DSE = dse;
/* eslint-disable no-new */
// 根据路由设置标题
router.beforeEach((to, from, next) => {
    /*路由发生改变修改页面的title */
    if(to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});


new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});


