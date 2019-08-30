export default {
    state: {
        headTabList:[],
        sunTab_pipe: [],
        sunTab_project: [],
        sunTab_monitor: [], //巡检抢修 '人员定位'
        sunTab_devs: [''],// 设备运行  '设备运行'
        sunTab_msg: [], //监测信息 '监测信息'
        sunTab_zone: [''], //分区计量  '分区计量'
        sunTab_simulate: [''], //管网模拟，'管网模拟'
        treeSelectedList:[11,12,13,14,15], //树 被选择的列表  ,21,31,4,5,6,7
        videoPannelIndex:0 , //播放视频的索引
        warningList:[], //预警的 列表

    },
    mutations: {
        set_headTabList(state,val){
            state.headTabList = val;
        },
        set_sunTab_pipe(state,val){
            state.sunTab_pipe = val;
        },
        set_sunTab_project(state,val){
            state.sunTab_project = val;
        },
        set_sunTab_monitor(state,val){
            state.sunTab_monitor = val;
        },
        set_sunTab_devs(state,val){
            state.sunTab_devs = val;
        },
        set_sunTab_msg(state,val){
            state.sunTab_msg = val;
        },
        set_sunTab_zone(state,val){
            state.sunTab_zone = val;
        },
        set_sunTab_simulate(state,val){
            state.sunTab_simulate = val;
        },
        set_treeSelectedList(state,val){
            state.treeSelectedList = val;
        },
        set_videoPannelIndex(state,val){
            state.videoPannelIndex = val;
        },
        set_warningList(state,val){
            state.warningList = val;
            sessionStorage.setItem('warningList',JSON.stringify(val));
        }
    },
    actions: {

    },
    getters: {
        get_headTabList(state) {
            return state.headTabList;
        },
        get_sunTab_pipe(state) {
            return state.sunTab_pipe;
        },
        get_sunTab_project(state) {
            return state.sunTab_project;
        },
        get_sunTab_monitor(state) {
            return state.sunTab_monitor;
        },
        get_sunTab_devs(state) {
            return state.sunTab_devs;
        },
        get_sunTab_msg(state) {
            return state.sunTab_msg;
        },
        get_sunTab_zone(state) {
            return state.sunTab_zone;
        },
        get_sunTab_simulate(state) {
            return state.sunTab_simulate;
        },
        get_treeSelectedList(state){
            return state.treeSelectedList;
        },
        get_videoPannelIndex(state){
            return state.videoPannelIndex ;
        },
        get_warningList(state){
            if(state.warningList.length==0){
                state.warningList = JSON.parse(sessionStorage.getItem('warningList'));
            }
            return  state.warningList;

        }
    }
};
