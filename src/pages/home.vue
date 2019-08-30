<template>
    <div id="home" ref="home">
        <div class="main-tontext">
            <div class="col" :class="{ifshow:!treeShowFlag}">
                <!-- 左侧栏 -->
                <div class="inner-wrap" :class="{ifshow:treeShowFlag}">
                    <el-tree :data="treeData" default-expand-all show-checkbox node-key="id" ref="tree"
                             :props="defaultProps"
                             :default-checked-keys="get_treeSelectedList" @check-change="nodeChange"
                             >
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>
                                <img :src="staticPath+data.icon" />
                               {{ node.label }}
                            </span>
                        </span>
                    </el-tree>
                </div>
            </div>
            <!-- 中间地图ps:包括右侧栏 -->
            <div class="col">
                <div id="gis" style="width:100%">
                    <dse-gis-map ref="gisLayer" @tellFather_ifSimulate="pipe_ifSimulate_fm"/>
                </div>
                <div class="tree-list" @click="showTree()">
                    <span>选择图层</span>
                    <i class="trans el-icon-caret-right" :class="{showSubTree:treeShowFlag==true}"></i>
                </div>
                <!-- 首页悬浮工具栏 -->
                <dse-func-tools @changeBasemap="baseMapChange" @drawTools="drawTool" @fullScreen="fullScreen">
                    <div class="col">
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                                 @select="changePart">
                            <el-submenu index="1">
                                <template slot="title">
                                    <img src="../assets/images/common/baseMapChange.png" alt="">
                                    分区
                                </template>
                                <el-menu-item index="1-1">颍东县</el-menu-item>
<!--                                <el-menu-item index="1-2">同心县同心分公司</el-menu-item>-->
<!--                                <el-menu-item index="1-3">同心县东部分公司</el-menu-item>-->
<!--                                <el-menu-item index="1-4">同心县西部分公司</el-menu-item>-->
<!--                                <el-menu-item index="2-1">海源县</el-menu-item>-->
                            </el-submenu>
                        </el-menu>
                    </div>
                    <div class="col alert-msg" @click="showMsgModel">
                        <i class="el-icon-tickets"></i>
                        <span>我的待办</span>
                    </div>
                    <div class="col alert" @click="showNoticeModel">
                        <template v-if="wornList.length==0">
                            <img src="../assets/images/common/alert.png" alt="">
                        </template>
                        <template v-else>
                            <img src="../assets/images/common/alert_red.gif" alt="">
                        </template>
                    </div>
                </dse-func-tools>
                <div class="searchBox">
                    <dse-fuzzy-search :searchLists="searchLists" :defaultName="defaultName" :closeList_flag="closeFlag"
                                      ref="fuzzySearchDom"
                                      @selectThis="selectThis" @callBackList="callBackList"/>
                </div>
                <dse-toggle-table :totalPage="totalPages" :innerWidth="350" @toggleFlag="toggleFlag">
                    <template v-if="!simulate">
                        <dse-tabs-toggle :tabList="subTabList.headList" @myActivedIndex="myActivedIndex"
                                         ref="prevTabsNext"></dse-tabs-toggle>
                        <dse-tabs-underline :tabs="subList" @tab_line_index="tab_line_index" ref="subTabs">
                            <component :is="subContentList" ref="moduleItem" @tellFather_changeGis="changeGis_show"
                                       @IamHere="IamHere"
                                       @telHome_transWord="telHome_transWord" @PipeShow="PipeShow"></component>
                        </dse-tabs-underline>
                    </template>
                    <template v-else>
                        <div class="selinum-head">
                            <span>关阀信息</span>
                        </div>
                        <div class="sub-content">
                            <div class="sub-item">
                                <div class="sub-head">
                                    <span class="rect"></span>
                                    <span>关阀方案</span>
                                </div>
                                <table class="innerTable simulate-table">
                                    <thead>
                                    <tr>
                                        <th><span>序号</span></th>
                                        <th><span>类型</span></th>
                                        <th><span>设备编号</span></th>
                                        <th><span>状态</span></th>
                                        <th><span>启闭方案</span></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <template v-if="close_fm_simulate.onOfList&&close_fm_simulate.onOfList.length>0">
                                        <tr v-for="(val,index) in close_fm_simulate.onOfList" :key="index">
                                            <td :title="val.seq"><span>{{val.seq}}</span></td>
                                            <td><span>{{val.valveTp}}</span></td>
                                            <td :title="val.valveCode"><span>{{val.valveCode}}</span></td>
                                            <td>
                                                <el-radio v-model="val.onOffStats" label="1" @change="change_status">开
                                                </el-radio>
                                            </td>
                                            <td>
                                                <el-radio v-model="val.operate" label="1" @change="change_opa">关
                                                </el-radio>
                                            </td>
                                        </tr>
                                    </template>
                                    <template v-else>
                                        <tr>
                                            <td colspan="5"><span>暂时没有您查询的数据哦~~</span></td>
                                        </tr>
                                    </template>

                                    </tbody>
                                </table>
                            </div>
                            <div class="sub-item">
                                <div class="sub-head">
                                    <span class="rect"></span>
                                    <span>停水通知</span>
                                </div>
                                <div class="tip-content">
                                    <div class="row"><span>停水开始时间:</span>
                                        <input type="text" ref="cfStartStr" id="cfStartStr" name="cfStartStr"
                                               class="Wdate"
                                               onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd HH',startDate:'%y-%M-%d ',maxDate:'#F{$dp.$D(\'cfEndStr\')||\'%y-%M-%d %H\'}'})"
                                               placeholder="请选择开始时间">
                                    </div>
                                    <div class="row"><span>停水结束时间:</span>
                                        <input type="text" ref="cfEndStr" id="cfEndStr" name="cfEndStr" class="Wdate"
                                               placeholder="请选择结束时间"
                                               onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd HH',minDate:'#F{$dp.$D(\'cfStartStr\')}',maxDate:'%y-%M-%d %H',startDate:'%y-%M-%d %H'})">
                                    </div>
                                    <div class="row"><span>停水主管径:</span>
                                        <el-input placeholder="停水主管径" clearable
                                                  v-model="close_fm_simulate.pipeRadius"></el-input>
                                    </div>
                                    <div class="row"><span>停水原因:</span>
                                        <el-input placeholder="停水原因" clearable
                                                  v-model="close_fm_simulate.cfReason"></el-input>
                                    </div>
                                    <div class="row"><span>停水地点:</span>
                                        <el-input placeholder="停水地点" clearable
                                                  v-model="close_fm_simulate.cfLoc"></el-input>
                                    </div>
                                    <div class="row"><span>停水用户:</span>
                                        <el-input placeholder="停水用户" clearable
                                                  v-model="close_fm_simulate.cfUser"></el-input>
                                    </div>
                                    <div class="row"><span>停水影响范围:</span>
                                        <el-input placeholder="停水影响范围" clearable
                                                  v-model="close_fm_simulate.infLoc"></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="senium-export">
                            <span @click="exportValveImitate_">导出</span>
                        </div>
                    </template>
                </dse-toggle-table>
                <!-- 左侧的通知-->
                <div class="left-tipPanel" :class="{panelPosition:showPanel==true}">
                    <template v-if="showPanel">
                        <tip-tabs ref="tipPanel"/>
                    </template>
                    <div class="toggle-bnt" @click="toggleShow">
                        <template v-if="showPanel">
                            <img src="../assets/images/home/toggleShowPanel.png" alt="">
                        </template>
                        <template v-else>
                            <span class="panel-btn">工作概览</span>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <dse-list-model :list="noticeList" :tips="'报警通知'" ref="notice" @stopMp3="stopMp3">
            <table class="innerTable head-nobg">
                <thead>
                <tr>
                    <th><span>时间</span></th>
                    <th><span>内容</span></th>
                </tr>
                </thead>
                <tbody>
                <template v-if="mp3URLList&&mp3URLList.length>0">
                    <tr v-for="(val,index) in mp3URLList" :key="index">
                        <td :title="val.tm"><span>{{val.tm|formate_tm}}</span></td>
                        <td :title="val.warnmx"><span>{{val.warnmx}}</span></td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="2"><span>高兴！没有警报。</span></td>
                    </tr>
                </template>
                </tbody>
            </table>
        </dse-list-model>
        <dse-loading-animation :showAnimate="showAnimate"/>
        <iframe :src="staticPath+mp3URl" frameborder="0" allow="autoplay"
                style="position: absolute;left:0;top:0;z-index: -100;opacity: 0;display:none"></iframe>

        <dse-list-model :tips="'报警通知'"   ref="panelModel">
            <div class="cards">
                <div class="card-item">
                    <span>待处理预警</span>
                    <span>5</span>
                </div>
                <div class="card-item">
                    <span>待执行巡检</span>
                    <span>1</span>
                </div>
                <div class="card-item">
                    <span>待处理隐患</span>
                    <span>1</span>
                </div>
                <div class="card-item">
                    <span>待抄表(户)</span>
                    <span>2000</span>
                </div>
                <div class="card-item">
                    <span>待收费(户)</span>
                    <span>1890</span>
                </div>
            </div>
        </dse-list-model>
    </div>

</template>

<script>
    import {
        mapGetters,
        mapMutations
    } from 'vuex';

    import DseFuncTools from '../common/components/dseFuncTools';
    import DseFuzzySearch from '../common/components/dseFuzzySearch';
    import DseGisMap from '../common/components/dseGisMap';
    import DseLoadingAnimation from '../common/components/dseLoadingAnimation';
    import DseTabsToggle from '../common/components/dseTabsToggle';
    import DseTabsUnderline from '../common/components/dseTabsUnderline';
    import DseToggleTable from '../common/components/dseToggleTable';


    import DseListModel from '../common/components/toast/dseListModel';
    import TipTabs from './tipPanel/TipTabs';

    // 首部tabs 文件
    const PIPEMSG = {
        template: '<div class="tabItem"><span>管网信息</span></div>'
    };
    const PROJECTMSG = {
        template: '<div class="tabItem"><span>工程信息</span></div>'
    };
    const MONITORMSG = {
        template: '<div class="tabItem"><span>监测信息</span></div>'
    };
    const DEVSMSG = {
        template: '<div class="tabItem"><span>设备信息</span></div>'
    };
    const VIEWMSG = {
        template: '<div class="tabItem"><span>巡查检修信息</span></div>'
    };
    const WATERATEMSG = {
        template: '<div class="tabItem"><span>水量水费信息</span></div>'
    };

    // 管网信息
    const MAINSUB = {
        template: '<div class="tabItem"><span>主干管</span></div>'
    };
    const BRANCHMAINSUB = {
        template: '<div class="tabItem"><span>支干管</span></div>'
    };
    const BRANCHSUB = {
        template: '<div class="tabItem"><span>支管</span></div>'
    };


    // 工程信息
    const RESERVOIRSUB = {
        template: '<div class="tabItem"><span>水库</span></div>'
    };
    const FACTORYSUB = {
        template: '<div class="tabItem"><span>水厂</span></div>'
    };
    const WATERSUB = {
        template: '<div class="tabItem"><span>蓄水池</span></div>'
    };
    const PUMPSUB = {
        template: '<div class="tabItem"><span>泵站</span></div>'
    };
    const USERDEVSUB = {
        template: '<div class="tabItem"><span>联户表井</span></div>'
    };


    // 设备运行
    const DEVSUB = {template: '<div class="tabItem"><span>设备运行</span></div>'};

    // 监测信息
    const LEVSUB = {
        template: '<div class="tabItem"><span>水位</span></div>'
    };
    const FLOWSUB = {
        template: '<div class="tabItem"><span>流量</span></div>'
    };
    const QCSUB = {
        template: '<div class="tabItem"><span>水质</span></div>'
    };
    const PRESSUB = {
        template: '<div class="tabItem"><span>压力</span></div>'
    };
    const VIDEOSUB = {
        template: '<div class="tabItem"><span>视频</span></div>'
    };

    // 巡检
    const LIVESUB = {
        template: '<div class="tabItem"><span>实时信息</span></div>'
    };
    const REPAIRSUB = {
        template: '<div class="tabItem"><span>检修信息</span></div>'
    };
    const DANGERSUB = {
        template: '<div class="tabItem"><span>隐患信息</span></div>'
    };


    // 水量与水费计收
    const ALLAREASUB = {
        template: '<div class="tabItem"><span>同心县</span></div>'
    };
    const EASTSUB = {
        template: '<div class="tabItem"><span>同心东部</span></div>'
    };
    const WESTSUB = {
        template: '<div class="tabItem"><span>同心西部</span></div>'
    };
    const MIDDLESUB = {
        template: '<div class="tabItem"><span>同心中部</span></div>'
    };

    const HAIYUANSUB = {
        template: '<div class="tabItem"><span>海源县</span></div>'
    };


    // 管网子模块
    const PIPEMODULE = () => import('@/pages/home_tabs/pipeMsg');
    // 工程信息子模块
    const PROJECTMODULE = () => import('@/pages/home_tabs/projectMsg');
    // 设备运行子模块
    const DEVMODULE = () => import('@/pages/home_tabs/devWarking');
    // 监测信息
    const MONITORMODULE = () => import('@/pages/home_tabs/msg');
    // 巡检信息
    const REPAIRMODULE = () => import('@/pages/home_tabs/RoutingView');
    // 水量水费计收
    const WATERATEMODULE = () => import('@/pages/home_tabs/waterate');

    // ,
    // {
    //   id: 30,
    //     label: '设备信息',
    //   index: 0,
    //   ifOnly: true,
    //   father: '设备信息',
    //   selfIndex: 0,
    //   layerID: 'shebei',
    //   componentName: DEVSUB
    // }

    // {
    //     id: 23,
    //         label: '水质',
    //     father: '监测信息',
    //     index: 1,
    //     ifOnly: false,
    //     selfIndex: 2,
    //     layerID: 'shuizhi',
    //     componentName: QCSUB
    // },

    export default {
        components: {
            TipTabs,
            DseListModel,
            DseToggleTable,
            DseTabsUnderline,
            DseTabsToggle,
            DseLoadingAnimation,
            DseGisMap,
            DseFuzzySearch,
            DseFuncTools
        },
        data() {
            return {
                showPanel:true, //工作概览的  面板显示
                staticPath:'', //静态文件的 路径前缀
                activeIndex: '0',
                mapOptions: {
                    isWeb3D: false
                },
                pannelWidth: 'calc(100% - 420px)',
                optionalLayers: {},
                totalPages: 1, //共多少页
                defaultWidth: 'calc(100% - 350px)',
                treeData: [{
                    id: 0,
                    label: '管网信息',
                    father: '',
                    index: 1,
                    ifOnly: false,
                    icon:'/images/symbol/fold.png',
                    children: [{
                        id: 1,
                        label: '主干管',
                        father: '管网信息',
                        index: 0,
                        ifOnly: false,
                        selfIndex: 0,
                        layerID: 'pipeline',
                        componentName: MAINSUB,
                        icon:'/images/symbol/pipe.png'
                    },
                        {
                            id: 2,
                            label: '支干管',
                            father: '管网信息',
                            index: 0,
                            ifOnly: false,
                            selfIndex: 1,
                            layerID: 'pipeline2',
                            componentName: BRANCHMAINSUB,
                            icon:'/images/symbol/pipe.png'
                        },
                        {
                            id: 3,
                            label: '支管',
                            father: '管网信息',
                            index: 0,
                            ifOnly: false,
                            selfIndex: 2,
                            layerID: 'pipeline3',
                            componentName: BRANCHSUB,
                            icon:'/images/symbol/pipe.png'
                        }
                    ]
                }, {
                    id: 10,
                    label: '工程信息',
                    father: '',
                    index: 0,
                    ifOnly: false,
                    icon:'/images/symbol/fold.png',
                    children: [{
                        id: 11,
                        label: '水库',
                        father: '工程信息',
                        index: 0,
                        ifOnly: false,
                        selfIndex: 0,
                        layerID: 'shuiku',
                        componentName: RESERVOIRSUB,
                        icon:'/images/symbol/reservoir.png'
                    },
                        {
                            id: 12,
                            label: '水厂',
                            father: '工程信息',
                            index: 0,
                            ifOnly: false,
                            selfIndex: 1,
                            layerID: 'shuichang',
                            componentName: FACTORYSUB,
                            icon:'/images/symbol/waterFactory.png'
                        },
                        {
                            id: 13,
                            label: '泵站',
                            father: '工程信息',
                            index: 0,
                            ifOnly: false,
                            selfIndex: 2,
                            layerID: 'bengzhan',
                            componentName: PUMPSUB,
                            icon:'/images/symbol/pump.png'
                        },
                        {
                            id: 14,
                            label: '蓄水池',
                            father: '工程信息',
                            index: 0,
                            ifOnly: false,
                            selfIndex: 3,
                            layerID: 'xushuichi',
                            componentName: WATERSUB,
                            icon:'/images/symbol/xsc.png'
                        },
                        {
                            id: 15,
                            label: '联户表井',
                            father: '工程信息',
                            index: 0,
                            ifOnly: false,
                            selfIndex: 4,
                            layerID: 'dayongshuihu',
                            componentName: USERDEVSUB,
                            icon:'/images/symbol/lhbj.png'
                        }
                    ]
                },
                    {
                        id: 20,
                        label: '监测信息',
                        index: 1,
                        ifOnly: true,
                        icon:'/images/symbol/fold.png',
                        children: [{
                            id: 21,
                            label: '水位',
                            father: '监测信息',
                            index: 1,
                            ifOnly: false,
                            selfIndex: 0,
                            layerID: 'shuiwei',
                            componentName: LEVSUB,
                            icon:'/images/symbol/shuiwei.png'
                        },
                            {
                                id: 22,
                                label: '流量',
                                father: '监测信息',
                                index: 1,
                                ifOnly: false,
                                selfIndex: 1,
                                layerID: 'liuliang',
                                componentName: FLOWSUB,
                                icon:'/images/symbol/flow.png'
                            },
                            {
                                id: 24,
                                label: '压力',
                                father: '监测信息',
                                index: 1,
                                ifOnly: false,
                                selfIndex: 3,
                                layerID: 'yali',
                                componentName: PRESSUB,
                                icon:'/images/symbol/press.png'
                            },
                             {
                                id: 25,
                                label: '水质',
                                father: '监测信息',
                                index: 1,
                                ifOnly: false,
                                selfIndex: 4,
                                layerID: 'shuizhi',
                                componentName: QCSUB,
                                icon:'/images/symbol/shuizhi.png'
                            },
                            {
                                id: 26,
                                label: '视频',
                                father: '监测信息',
                                index: 1,
                                ifOnly: false,
                                selfIndex: 5,
                                layerID: 'shipin',
                                componentName: VIDEOSUB,
                                icon:'/images/symbol/video.png'
                            }
                        ]
                    },
                    {
                        id: 30,
                        label: '巡查检修信息',
                        index: 2,
                        ifOnly: true,
                        icon:'/images/symbol/fold.png',
                        children: [
                            {
                                id: 31,
                                label: '实时信息',
                                father: '巡查检修信息',
                                index: 2,
                                ifOnly: false,
                                selfIndex: 0,
                                layerID: 'shishi',
                                componentName: LIVESUB,
                                icon:'/images/symbol/woker.png'
                            },
                            {
                                id: 32,
                                label: '检修信息',
                                father: '巡查检修信息',
                                index: 2,
                                ifOnly: false,
                                selfIndex: 1,
                                layerID: 'jianxiu',
                                componentName: REPAIRSUB,
                                icon:'/images/symbol/buildProjects.png'
                            },
                            {
                                id: 33,
                                label: '隐患信息',
                                father: '巡查检修信息',
                                index: 2,
                                ifOnly: false,
                                selfIndex: 2,
                                layerID: 'yinhuan',
                                componentName: DANGERSUB,
                                icon:'/images/symbol/downDanger.png'
                            }
                        ]
                    },
                    {
                        id: 40,
                        label: '水量水费信息',
                        index: 3,
                        ifOnly: true,
                        icon:'/images/symbol/fold.png',
                        children:[
                            {
                                id: 41,
                                label: '同心县',
                                father: '水量水费信息',
                                index: 0,
                                ifOnly: false,
                                componentName: ALLAREASUB,
                                icon:'/images/symbol/fold.png',
                                children:[
                                    {
                                        id: 411,
                                        label: '同心东部',
                                        father: '水量水费信息',
                                        index: 2,
                                        ifOnly: false,
                                        selfIndex: 1,
                                        layerID: 'txdbfgs',
                                        componentName: EASTSUB,
                                        icon:'/images/symbol/part.png'
                                    },
                                    {
                                        id: 412,
                                        label: '同心西部',
                                        father: '水量水费信息',
                                        index: 2,
                                        ifOnly: false,
                                        selfIndex: 2,
                                        layerID: 'txxbfgs',
                                        componentName: WESTSUB,
                                        icon:'/images/symbol/part.png'
                                    } ,
                                    {
                                        id: 413,
                                        label: '同心中部',
                                        father: '水量水费信息',
                                        index: 2,
                                        ifOnly: false,
                                        selfIndex: 2,
                                        layerID: 'txfgs',
                                        componentName: MIDDLESUB,
                                        icon:'/images/symbol/part.png'
                                    }
                                ]
                            },
                            {
                            id: 42,
                            label: '海源县',
                            father: '水量水费信息',
                            index: 0,
                            ifOnly: false,
                            layerID: 'hyx',
                            componentName: HAIYUANSUB,
                            icon:'/images/symbol/fold.png',
                                children:[
                                    {
                                        id: 421,
                                        label: '海源公司',
                                        father: '水量水费信息',
                                        index: 0,
                                        ifOnly: false,
                                        componentName: HAIYUANSUB,
                                        icon:'/images/symbol/part.png'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                leftSliderToggle: false, //  左侧开关显示
                tabActivedIndex: 0, //页签的默认激活项
                subTabList: {
                    headList: [PROJECTMSG],
                    project: [],
                    monitor: [],
                    devs: [],
                    msg: [],
                    ids: [1, 2, 3],
                    pipe: []
                },
                headList: [], //一级页签列表
                subList: [RESERVOIRSUB, FACTORYSUB, WATERSUB, PUMPSUB, USERDEVSUB], //二级页签列表
                subContentList: PROJECTMODULE, //抽屉显示的内容区
                noticeMusicURL: '', //连续播放的音频URL
                searchLists: [], //模糊查询的数据列表
                defaultName: '', //模糊查询的关键字
                closeFlag: false, //关闭列表
                noticeList: [],
                showLayerBgColor: true, // 是否显示分区域的背景
                bg_model_showFlag: false, //显示弹窗的 开关
                partList: [], //分区的列表
                bgModelTips: '', // 伸缩 弹窗的 头部提示语,
                areaId: '', // 当前选中的分区的Id，传递给 弹窗中的 监测信息
                pannelTools: { // 点击 树来  工具栏中出现的工具条
                    pipe: true,
                    fm: false,
                    partArea: false
                },
                simulate: false, // 调出关阀模拟

                legendIcon: { // 图例 动态变动
                    jxj: false, // 检修井
                    fm: false, //阀门 开 、阀门（全关）、阀门（一定开度）
                    xfs: false, //消防栓（正常）、消防栓（异常）
                    danger: false, //  隐患（已上报）、隐患（处理中）
                    project: false, // 工程(建设中)
                    inspectingOfficer: false, //巡检人
                },
                pipeLength_pannel: {
                    length: 0, // 管网长度
                    yearOnyear: 0 // 同比增长
                },
                close_fm_simulate: { // 模拟管阀的 数据
                    loc: '',
                    pipeCode: '',
                    cfStartStr: '',
                    cfEndStr: '',
                    cfReason: '',
                    cfLoc: '',
                    cfUser: '',
                    infLoc: '',
                    createUser: '',
                    pipeRadius: '',
                    onOfList: []
                },
                showAnimate: false, //模拟管阀的  导出动画
                getPipe_id_fm: null, //获取点击管道 ，进行关阀模拟
                wornList: [
                    {
                        a: '河东加压泵站出水压力监测点',
                        b: '压力',
                        stm: '2019-8-5 21：20',
                        warnText: '报警消息，压力监测点、河东加压泵站出水压力监测点，当前监测值0.5MPa正常范围0.2-0.4MPa',
                        e: '2019-8-5 22：20',
                    },{
                        a: '旱天岭1#高位蓄水池水位监测点',
                        b: '水位',
                        stm: '2019-8-5 21：20',
                        warnText: '报警消息，水位监测点、旱天岭1#高位蓄水池水位监测点，当前监测值3m,正常范围0-2.5m',
                        e: '2019-8-5 22：20',
                    },{
                        a: '西部净水厂清水池水位监测点',
                        b: '水位',
                        stm: '2019-8-5 21：20',
                        warnText: '报警消息，水位监测点、西部净水厂清水池水位监测点，当前监测值3m,正常范围0-2.5m',
                        e: '2019-8-5 22：20',
                    },{
                        a: '丁塘加压泵站出水压力监测点',
                        b: '压力',
                        stm: '2019-8-5 21：20',
                        warnText: '报警消息，压力监测点、丁塘加压泵站监测点，当前监测值0.8MPa正常范围0.2-0.4MPa',
                        e: '2019-8-5 22：20',
                    },{
                        a: '丁塘加压泵站出水管网流量监测点',
                        b: '流量',
                        stm: '2019-8-5 21：20',
                        warnText: '报警消息，流量监测点、丁塘加压泵站出水管网流量监测点，当前监测值5m3/s正常范围4m3/s-2m3/s',
                        e: '2019-8-5 22：20',
                    },{
                        a: '西部净水厂视频监测点',
                        b: '视频',
                        stm: '2019-8-5 21：20',
                        warnText: '报警消息，视频监测点、西部净水厂视频监测点，当前未采集到视频监测信息',
                        e: '2019-8-5 22：20',
                    }
                ], //预警列表
                mp3URl: '',
                mp3List_index: 0,
                mp3List: [
                    {
                        url:'/mp3s/hd_pump_press.mp3'
                    },
                    {
                        url:'/mp3s/htl_pool_lev.mp3'
                    },
                    {
                        url:'/mp3s/jsc_lev.mp3'
                    },
                    {
                        url:'/mp3s/dt_pump_press.mp3'
                    },
                    {
                        url:'/mp3s/dt_pump_flow.mp3'
                    },
                    {
                        url:'/mp3s/jsc_video.mp3'
                    }
                ],
                staticPathUrl: '', //静态文件前缀
                mp3URLList: [
                    {
                        url:'/mp3s/hd_pump_press.mp3'
                    },
                    {
                        url:'/mp3s/htl_pool_lev.mp3'
                    },
                    {
                        url:'/mp3s/jsc_lev.mp3'
                    },
                    {
                        url:'/mp3s/dt_pump_press.mp3'
                    },
                    {
                        url:'/mp3s/dt_pump_flow.mp3'
                    },
                    {
                        url:'/mp3s/jsc_video.mp3'
                    }
                ], // 播放音频列表
                currentPlayIndex: 0, //当前音频播放的索引
                mp3_timer: null, //播放音乐的定时器
                legendInfos: [], //保存所有图层图例信息
                treeShowFlag: false
            };
        },
        computed: {
            ...mapGetters({
                get_cityPosition: 'get_cityPosition',
                get_companyId: 'get_companyId',
                get_headTabList: 'get_headTabList',
                get_sunTab_pipe: 'get_sunTab_pipe',
                get_sunTab_project: 'get_sunTab_project',
                get_sunTab_monitor: 'get_sunTab_monitor',
                get_sunTab_devs: 'get_sunTab_devs',
                get_sunTab_msg: 'get_sunTab_msg',
                get_sunTab_zone: 'get_sunTab_zone',
                get_sunTab_simulate: 'get_sunTab_simulate',
                get_treeSelectedList: 'get_treeSelectedList'
            }),
            isPipelineLegend() {
                let isVisible = false;
                this.legendInfos.forEach(function (legendInfo) {
                    if (legendInfo.layerID === 'pipeline' && legendInfo.visible) {
                        isVisible = true;
                    }
                });
                return isVisible;
            },
            visibleLegendInfos: function () {
                return this.legendInfos.filter(function (legendInfo) {
                    if (legendInfo.layerID !== 'pipeline') {
                        return legendInfo.visible;
                    }
                });
            }
        },
        methods: {
            // 左侧菜单的切换
            // toggleLeftSlider() {
            // 	this.leftSliderToggle = !this.leftSliderToggle;
            // },
            // 显示或者隐藏树
            showTree() {
                this.treeShowFlag = !this.treeShowFlag;
            },
            // 显隐 面板
            toggleShow(){
              this.showPanel = !this.showPanel;
            },
            toggleFlag(flag) {
                let that = this;
                if (flag) {
                    this.defaultWidth = 'calc(100% - 350px)';
                    this.pannelWidth = 'calc(100% - 420px)';

                    this.$nextTick(() => {

                        let wrap_obj = that.getCheckedNodes();

                        // 重置 一级 页签
                        let top_tabs = wrap_obj.toptabs;
                        let last_top_tab = top_tabs[top_tabs.length - 1].template;
                        let fatherName = '';
                        last_top_tab = last_top_tab.replace(/<div class="tabItem"><span>/, '');
                        last_top_tab = last_top_tab.replace(/<\/span><\/div>/, '');
                        fatherName = last_top_tab.trim();
                        that.$refs.prevTabsNext.fromFather(top_tabs, fatherName, true);

                        // 模拟点击一级页签的最后一个 来触发页面 二级 以及 三级内容显示
                        let temp_index = null; //原有索引
                        switch (fatherName) {
                            case '管网信息':
                                temp_index = 0;
                                break;
                            case '工程信息':
                                temp_index = 1;
                                break;
                            case '监测信息':
                                temp_index = 2;
                                break;
                            case '设备信息':
                                temp_index = 3;
                                break;
                            case '巡查检修信息':
                                temp_index = 4;
                                break;
                        }
                        switch (temp_index) {
                            case 0:
                                that.$refs.subTabs.fromFather(wrap_obj.subTab.pipe, '', true);
                                that.subContentList = PIPEMODULE;
                                setTimeout(() => {
                                    that.$refs.moduleItem.fromFather('', wrap_obj.subTab.pipe, true);
                                }, 500);
                                break;
                            case 1:
                                that.$refs.subTabs.fromFather(wrap_obj.subTab.project, '', true);
                                that.subContentList = PROJECTMODULE;
                                setTimeout(() => {
                                    that.$refs.moduleItem.fromFather('', wrap_obj.subTab.project, true);
                                }, 500);
                                break;
                            case 2:
                                that.$refs.subTabs.fromFather(wrap_obj.subTab.monitor, '', true);
                                that.subContentList = DEVMODULE;
                                setTimeout(() => {
                                    that.$refs.moduleItem.fromFather('', wrap_obj.subTab.monitor, true);
                                }, 500);
                                break;
                            case 3:
                                that.$refs.subTabs.fromFather(wrap_obj.subTab.devs, '', true);
                                that.subContentList = MONITORMODULE;
                                setTimeout(() => {
                                    that.$refs.moduleItem.fromFather('', wrap_obj.subTab.devs, true);
                                }, 500);
                                break;
                            case 4:
                                that.$refs.subTabs.fromFather(wrap_obj.subTab.msg, '', true);
                                that.subContentList = REPAIRMODULE;
                                setTimeout(() => {
                                    that.$refs.moduleItem.fromFather('', wrap_obj.subTab.msg, true);
                                }, 500);
                                break;
                        }
                    });

                } else {
                    this.defaultWidth = '100%';
                    this.pannelWidth = 'calc(100% - 40px)';
                }
                this.$nextTick(() => {
                    that.$refs.dashboard.resize();
                });
            },
            getCheckedNodes() {
                let list = this.$refs.tree.getCheckedNodes();
                let topSet = new Set();
                let projectSet = new Set();
                let devSet = new Set();
                let monitorSet = new Set();
                let msgSet = new Set();
                let pipeSet = new Set();
                let waterateSet = new Set();

                topSet.add(PROJECTMSG);
                projectSet.add(RESERVOIRSUB, FACTORYSUB, WATERSUB, PUMPSUB, USERDEVSUB);
                list.map((val) => {
                    if (val.father === '管网信息') {
                        topSet.add(PIPEMSG);
                        pipeSet.add(val.componentName);
                    }
                    if (val.father === '工程信息') {
                        topSet.add(PROJECTMSG);
                        projectSet.add(val.componentName);
                    }
                    if (val.father === '监测信息') {
                        topSet.add(MONITORMSG);
                        monitorSet.add(val.componentName);
                    }
                    if (val.father === '设备信息') {
                        topSet.add(DEVSMSG);
                        devSet.add(val.componentName);
                    }
                    if (val.father === '巡查检修信息') {
                        topSet.add(VIEWMSG);
                        msgSet.add(val.componentName);
                    }
                    if(val.father=='水量水费信息'){
                        topSet.add(WATERATEMSG);
                        waterateSet.add(val.componentName);
                        waterateSet.add(ALLAREASUB);
                    }
                });
                return {
                    toptabs: [...topSet],
                    subTab: {
                        project: [...projectSet],
                        devs: [...devSet],
                        monitor: [...monitorSet],
                        msg: [...msgSet],
                        pipe: [...pipeSet],
                        waterate:[...waterateSet]
                    }
                };
            },
            nodeChange(item, ifChecked, children) {
                let that = this;
                that.simulate = false;
                this.$nextTick(() => {
                    //显示或者绑定的图层
                    if (item.layerID) {
                        this.$refs.gisLayer.setLayerVisible(item.layerID, ifChecked);
                        this.setLegendVisible(item.layerID, ifChecked);
                    }
                    let wrap_obj = this.getCheckedNodes();

                    let end_topTab = (wrap_obj.toptabs)[wrap_obj.toptabs.length - 1];
                    let contentList = null; // 选择的二级tab下的 主要内容区的 待选列表
                    setTimeout(() => {
                        that.$refs.prevTabsNext.fromFather(wrap_obj.toptabs, item.father, ifChecked);
                    }, 500);
                    if (!item.children && !ifChecked) {
                        switch (end_topTab) {
                            case PIPEMSG:
                                that.subContentList = PIPEMODULE;
                                that.$refs.subTabs.fromFather(wrap_obj.subTab.pipe, item.componentName, ifChecked);
                                contentList = wrap_obj.subTab.pipe;
                                break;
                            case PROJECTMSG:
                                that.subContentList = PROJECTMODULE;
                                that.$refs.subTabs.fromFather(wrap_obj.subTab.project, item.componentName, ifChecked);
                                contentList = wrap_obj.subTab.project;
                                break;
                            case MONITORMSG:
                                that.subContentList = MONITORMODULE;
                                that.$refs.subTabs.fromFather(wrap_obj.subTab.monitor, item.componentName, ifChecked);
                                contentList = wrap_obj.subTab.monitor;
                                break;
                            case DEVSMSG:
                                that.subContentList = DEVMODULE;
                                that.$refs.subTabs.fromFather(wrap_obj.subTab.devs, item.componentName, ifChecked);
                                contentList = wrap_obj.subTab.devs;
                                break;
                            case VIEWMSG:
                                that.subContentList = REPAIRMODULE;
                                that.$refs.subTabs.fromFather(wrap_obj.subTab.msg, item.componentName, ifChecked);
                                contentList = wrap_obj.subTab.msg;
                                break;
                            case WATERATEMSG:
                                that.subContentList = WATERATEMODULE;
                                that.$refs.subTabs.fromFather(wrap_obj.subTab.waterate, item.componentName, ifChecked);
                                contentList = wrap_obj.subTab.waterate;
                                break;
                        }

                        setTimeout(() => {
                            that.$refs.moduleItem.fromFather(item.componentName, contentList, ifChecked);
                        }, 520);
                    } else if (!item.children && ifChecked) {
                        let currentNodename = item.father;
                        switch (currentNodename) {
                            case '管网信息':
                                that.subContentList = PIPEMODULE;
                                that.$refs.subTabs.fromFather(wrap_obj.subTab.pipe, item.componentName, ifChecked);
                                contentList = wrap_obj.subTab.pipe;
                                break;
                            case '工程信息':
                                that.subContentList = PROJECTMODULE;
                                that.$refs.subTabs.fromFather(wrap_obj.subTab.project, item.componentName, ifChecked);
                                contentList = wrap_obj.subTab.project;
                                break;
                            case '监测信息':
                                that.subContentList = MONITORMODULE;
                                that.$refs.subTabs.fromFather(wrap_obj.subTab.monitor, item.componentName, ifChecked);
                                contentList = wrap_obj.subTab.monitor;
                                break;
                            case '设备信息':
                                that.subContentList = DEVMODULE;
                                that.$refs.subTabs.fromFather(wrap_obj.subTab.devs, item.componentName, ifChecked);
                                contentList = wrap_obj.subTab.devs;
                                break;
                            case '巡查检修信息':
                                that.subContentList = REPAIRMODULE;
                                that.$refs.subTabs.fromFather(wrap_obj.subTab.msg, item.componentName, ifChecked);
                                contentList = wrap_obj.subTab.msg;
                                break;
                            case '水量水费信息':
                                that.subContentList = WATERATEMODULE;
                                that.$refs.subTabs.fromFather(wrap_obj.subTab.waterate, item.componentName, ifChecked);
                                contentList = wrap_obj.subTab.waterate;
                                break;
                        }

                        setTimeout(() => {
                            that.$refs.moduleItem.fromFather(item.componentName, contentList, ifChecked);
                        }, 520);
                    }
                });
            },
            myActivedIndex(obj) {
                let that = this;
                this.tabActivedIndex = obj.activedIndex;

                console.log( this.tabActivedIndex);

                let wrap_obj = this.getCheckedNodes();
                switch (obj.activedIndex) {
                    case 0:
                        that.$refs.subTabs.fromFather(wrap_obj.subTab.pipe, '', true);
                        that.subContentList = PIPEMODULE;
                        setTimeout(() => {
                            that.$refs.moduleItem.fromFather('', wrap_obj.subTab.pipe, true);
                        }, 500);
                        break;
                    case 1:
                        that.$refs.subTabs.fromFather(wrap_obj.subTab.project, '', true);
                        that.subContentList = PROJECTMODULE;
                        setTimeout(() => {
                            that.$refs.moduleItem.fromFather('', wrap_obj.subTab.project, true);
                        }, 500);
                        break;
                    case 2:
                        that.$refs.subTabs.fromFather(wrap_obj.subTab.monitor, '', true);
                        that.subContentList = MONITORMODULE;
                        setTimeout(() => {
                            that.$refs.moduleItem.fromFather('', wrap_obj.subTab.monitor, true);
                        }, 500);
                        break;
                    case 3:
                        that.$refs.subTabs.fromFather(wrap_obj.subTab.msg, '', true);
                        that.subContentList = REPAIRMODULE;
                        setTimeout(() => {
                            that.$refs.moduleItem.fromFather('', wrap_obj.subTab.msg, true);
                        }, 500);
                        break;
                    // case 3:
                    //   that.$refs.subTabs.fromFather(wrap_obj.subTab.devs, '', true);
                    //   that.subContentList = DEVMODULE;
                    //   setTimeout(() => {
                    //     that.$refs.moduleItem.fromFather('', wrap_obj.subTab.devs, true);
                    //   }, 500);
                    //   break;
                    case 4:
                        that.$refs.subTabs.fromFather(wrap_obj.subTab.waterate, '', true);
                        that.subContentList = WATERATEMODULE;
                        setTimeout(() => {
                            that.$refs.moduleItem.fromFather('', wrap_obj.subTab.waterate, true);
                        }, 500);
                        break;
                }
            },
            ...mapMutations({
                'set_headTabList': 'set_headTabList',
                'set_sunTab_pipe': 'set_sunTab_pipe',
                'set_sunTab_project': 'set_sunTab_project',
                'set_sunTab_monitor': 'set_sunTab_monitor',
                'set_sunTab_devs': 'set_sunTab_devs',
                'set_sunTab_msg': 'set_sunTab_msg',
                'set_sunTab_zone': 'set_sunTab_zone',
                'set_sunTab_simulate': 'set_sunTab_simulate',
                'set_treeSelectedList': 'set_treeSelectedList'
            }),
            // 显隐 分区的颜色和背景
            toggoleShowArea(val) {
                this.$refs.gisLayer.setPartitionFill(val);
            },
            // 二级tab的 回调函数
            tab_line_index(obj) {
                this.$refs.moduleItem.fromFather(obj.component, obj.list, true);
            },
            // 回调的 模糊查询函数
            callBackList(name) {

            },
            // 跳转到 图层编辑页面
            gotoEditGis() {
                this.$router.push({
                    name: 'gisEdit'
                });
            },
            // 选择模糊查询的某一个 要素
            selectThis(val) {
                this.defaultName = val.name;
                // 逻辑处理  显示图层 或者是其它
                let type = val.type;
                switch (val.type) {
                    case '1':
                        type = '水库';
                        break;
                    case '2':
                        type = '水厂';
                        break;
                    case '3':
                        type = '泵站';
                        break;
                    case '4':
                        type = '蓄水池';
                        break;
                    case '5':
                        type = '联户表井';
                        break;
                    case '6':
                        type = '设备信息';
                        break;
                    case '7':
                        type = '水位';
                        break;
                    case '8':
                        type = '流量';
                        break;
                    case '9':
                        type = '水质';
                        break;
                    case '10':
                        type = '压力';
                        break;
                    case '11':
                        type = '视频';
                        break;
                    case '12':
                        type = '实时信息';
                        break;
                    case '13':
                        type = '检修信息';
                        break;
                    case '14':
                        type = '隐患信息';
                        break;
                    case '15':
                        type = '主干管';
                        break;
                    case '16':
                        type = '支干管';
                        break;
                    case '17':
                        type = '支管';
                        break;
                }


                let list = this.$refs.tree.getCheckedNodes();
                let flag = false;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].label == type) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    let tree_nodeList = [];
                    let temp_json = {
                        id: '',
                        label: ''
                    };
                    let temp_type = val.type;
                    switch (temp_type) {
                        case '1':
                            temp_json.id = 11;
                            temp_json.label = '水库';
                            temp_json.layerID = 'pipeline';
                            temp_json.componentName = RESERVOIRSUB;
                            temp_json.father = '工程信息';
                            tree_nodeList.push(temp_json);
                            break;
                        case '2':
                            temp_json.id = 12;
                            temp_json.label = '水厂';
                            temp_json.layerID = 'shuichang';
                            temp_json.componentName = FACTORYSUB;
                            temp_json.father = '工程信息';
                            tree_nodeList.push(temp_json);
                            break;
                        case '3':
                            temp_json.id = 13;
                            temp_json.label = '泵站';
                            temp_json.layerID = 'bengzhan';
                            temp_json.componentName = PUMPSUB;
                            temp_json.father = '工程信息';
                            tree_nodeList.push(temp_json);
                            break;
                        case '4':
                            temp_json.id = 14;
                            temp_json.label = '蓄水池';
                            temp_json.layerID = 'fire_hydrant';
                            temp_json.componentName = RESERVOIRSUB;
                            temp_json.father = '工程信息';
                            tree_nodeList.push(temp_json);
                            break;
                        case '5':
                            temp_json.id = 15;
                            temp_json.label = '联户表井';
                            temp_json.layerID = 'shuichang';
                            temp_json.componentName = FACTORYSUB;
                            temp_json.father = '工程信息';
                            tree_nodeList.push(temp_json);
                            break;
                        case '6':
                            temp_json.id = 21;
                            temp_json.label = '水位';
                            temp_json.layerID = 'shuichang';
                            temp_json.componentName = LEVSUB;
                            temp_json.father = '监测信息';
                            tree_nodeList.push(temp_json);
                            break;
                        case '7':
                            temp_json.id = 22;
                            temp_json.label = '流量';
                            temp_json.layerID = 'shuichang';
                            temp_json.componentName = FLOWSUB;
                            temp_json.father = '监测信息';
                            tree_nodeList.push(temp_json);
                            break;
                        case '8':
                            temp_json.id = 23;
                            temp_json.label = '水质';
                            temp_json.layerID = 'shuichang';
                            temp_json.componentName = QCSUB;
                            temp_json.father = '监测信息';
                            tree_nodeList.push(temp_json);
                            break;
                        case '9':
                            temp_json.id = 24;
                            temp_json.label = '压力';
                            temp_json.layerID = 'shuichang';
                            temp_json.componentName = LEVSUB;
                            temp_json.father = '监测信息';
                            tree_nodeList.push(temp_json);
                            break;
                        case '10':
                            temp_json.id = 25;
                            temp_json.label = '视频';
                            temp_json.layerID = 'shuichang';
                            temp_json.componentName = VIDEOSUB;
                            temp_json.father = '监测信息';
                            tree_nodeList.push(temp_json);
                            break;
                        case '11':
                            temp_json.id = 30;
                            temp_json.label = '设备信息';
                            temp_json.layerID = 'shuichang';
                            temp_json.componentName = DEVSUB;
                            temp_json.father = '设备信息';
                            tree_nodeList.push(temp_json);
                            break;
                        case '12':
                            temp_json.id = 31;
                            temp_json.label = '实时信息';
                            temp_json.layerID = 'shuichang';
                            temp_json.componentName = LIVESUB;
                            temp_json.father = '巡查检修信息';
                            tree_nodeList.push(temp_json);
                            break;
                        case '13':
                            temp_json.id = 32;
                            temp_json.label = '检修信息';
                            temp_json.layerID = 'shuichang';
                            temp_json.componentName = REPAIRSUB;
                            temp_json.father = '巡查检修信息';
                            tree_nodeList.push(temp_json);
                            break;
                        case '14':
                            temp_json.id = 30;
                            temp_json.label = '隐患信息';
                            temp_json.layerID = 'shuichang';
                            temp_json.componentName = DANGERSUB;
                            temp_json.father = '巡查检修信息';
                            tree_nodeList.push(temp_json);
                            break;
                        case '15':
                            temp_json.id = 1;
                            temp_json.label = '主干管';
                            temp_json.layerID = 'shuichang';
                            temp_json.componentName = MAINSUB;
                            temp_json.father = '管网信息';
                            tree_nodeList.push(temp_json);
                            break;
                        case '16':
                            temp_json.id = 2;
                            temp_json.label = '支干管';
                            temp_json.layerID = 'shuichang';
                            temp_json.componentName = BRANCHMAINSUB;
                            temp_json.father = '管网信息';
                            tree_nodeList.push(temp_json);
                            break;
                        case '17':
                            temp_json.id = 3;
                            temp_json.label = '支管';
                            temp_json.layerID = 'shuichang';
                            temp_json.componentName = BRANCHSUB;
                            temp_json.father = '管网信息';
                            tree_nodeList.push(temp_json);
                            break;
                    }
                    let temp_list = list.concat(tree_nodeList);
                    this.$refs.tree.setCheckedNodes(temp_list);
                    this.nodeChange(temp_json, true, null);
                }

                let json = {};
                json.eleId = val.id;
                json.name = val.name;

                switch (val.type) {
                    case '1': // 计量间
                        json.layerID = 'jiliangjian';
                        break;
                    case '2': // 大用户
                        json.layerID = 'dayongshuihu';
                        break;
                    case '3': // 泵站
                        json.layerID = 'bengzhan';
                        break;
                    case '4': // 水库
                        json.layerID = 'shuiku';
                        break;
                    case '5': // 水厂
                        json.layerID = 'shuichang';
                        break;
                    case '6': // 管道
                        json.layerID = 'pipeline';
                        break;
                    case '7': // 阀门
                        json.layerID = 'valve';
                        break;
                    case '8': // 消防栓  检修井
                        json.layerID = 'fire_hydrant';
                        break;
                    case '9': // 检修井
                        json.layerID = 'manhole';
                        break;
                    case '10':
                        json.layerID = 'partition';
                        break;
                    case '11':
                        json.layerID = 'shuizhi';
                        break;
                    case '12':
                        json.layerID = 'yali';
                        break;
                    case '13':
                        json.layerID = 'liuliang';
                        break;
                    case '14':
                        json.layerID = 'shipin';
                        break;
                    case '15':
                        json.layerID = 'yali';
                        break;
                    case '16':
                        json.layerID = 'liuliang';
                        break;
                    case '17':
                        json.layerID = 'shipin';
                        break;
                }

                console.log(val);
                console.log(json);
                this.IamHere(json);
            },
            //显示 通知的弹窗
            showNoticeModel() {
                let that = this;
                if (this.mp3URLList.length == 0) {
                    return;
                }

                this.$refs.notice.showModel();
                if (this.mp3_timer) {
                    clearInterval(that.mp3_timer);
                }
                this.mp3URl = (this.mp3URLList)[0];
                let mp3List = this.mp3URLList;
                this.mp3_timer = setInterval(() => {
                    that.mp3List_index += 1;
                    if (that.mp3List_index > mp3List.length - 1) {
                        that.mp3URl = '';
                        clearInterval(that.mp3_timer);
                        return;
                    }
                    that.mp3URl = mp3List[that.mp3List_index];
                }, 14 * 1000);
            },

            //关阀模拟
            simulateAnalysis() {
                // if(!this.getPipe_id_fm){
                //   this.$message.error('请选择一节管道!');
                //   return;
                // }
                // this.simulate = true;
                // this.close_fm_simulate.pipeRadius =  this.getPipe_id_fm.attr.pipeRadius ;

                // this.createImitateInfo_();
                this.$refs.gisLayer.simulateAnalysis();
            },
            // 获取 管道 关联的 阀门数据
            createImitateInfo_() {

            },
            // 关阀模拟 导出
            exportValveImitate_() {

            },
            // 关阀的状态
            change_status(e) {
                console.log(e);
            },
            // 关阀 的 操作
            change_opa(e) {
                console.log(e);
            },
            // 回调 切换底图
            baseMapChange(v) {
                /**
                 *  '1' 平面图 '2' 卫星图  '3' 地形图
                 */
                this.$refs.gisLayer.changeMap(v);
            },
            // 回调 绘制 点线面
            drawTool(v) {
                /**
                 *  '1'  点 '2'线  '3' 面  '清除' 4
                 */
                this.$refs.gisLayer.drawAction(v);
            },
            // 接收来自管网的 导出excel的函数
            telHome_transWord(obj) {
                this.$refs.gisLayer.exportWord(obj);
            },
            // 当前窗口全屏
            fullScreen(flag) {
                let home = this.$refs.home;
                if (flag) {
                    if (home.requestFullscreen) {
                        home.requestFullscreen();
                    } else if (home.webkitRequestFullScreen) {
                        home.webkitRequestFullScreen();
                    } else if (home.mozRequestFullScreen) {
                        home.mozRequestFullScreen();
                    } else {
                        home.msRequestFullscreen();
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else {
                        document.msExitFullscreen();
                    }
                }

            },
            // 转发查询 gis要素点
            IamHere(val) {
                this.$refs.gisLayer.searchThis(val);
            },
            // 显隐 过期管道
            PipeShow(flag) {
                this.$refs.gisLayer.setOverduePipelineVisible(flag);
            },
            // 是否进行 管阀模拟
            pipe_ifSimulate_fm(val) {
                this.getPipe_id_fm = val;
            },
            // 报警 列表
            getWarnList_() {

            },
            //管网信息 参数改变 控制 gis的图层显隐
            changeGis_show(obj) {
                this.$refs.gisLayer.changShow(obj);
            },
            // 关闭警告弹窗 关闭音乐
            stopMp3(flag) {
                this.mp3URl = '';
            },
            //与图层同步显隐图例
            setLegendVisible(layerID, visible) {
                this.legendInfos.forEach(legendInfo => {
                    if (legendInfo.layerID === layerID) {
                        legendInfo.visible = visible;
                    }
                });
            },
            // 切换 分区
            changePart(key, keyPat) {
                let temp_index = (keyPat[1].split('-'))[1];
				// this.$refs.dashboard.changArea(temp_index);
				this.$refs.gisLayer.gotoPartition(key);
				this.$refs.tipPanel.changeIndex(temp_index);
            },
            // 显示 通知通告的 弹窗
            showMsgModel(){
                this.$refs.panelModel.showModel();
            }
        },
        created() {
            this.staticPath = window.DSE.static_baseUrl;
            this.staticPathUrl = this.$store.getters.get_filePath;

            this.headList = this.get_headTabList;
            // this.getWarnList_();
            // this.mp3URLList = this.$store.getters.get_audioList;
            this.mp3URLList = this.$store.getters.get_warningList;
            this.mp3URl = (this.mp3URLList)[0].url;

        },
        mounted() {
            let that = this;
            if (this.mp3_timer) {
                clearInterval(that.mp3_timer);
            }
            let mp3List = this.mp3URLList;
            this.mp3_timer = setInterval(() => {
                that.mp3List_index += 1;
                if (that.mp3List_index > mp3List.length - 1) {
                    that.mp3URl = '';
                    clearInterval(that.mp3_timer);
                    return;
                }
                that.mp3URl = mp3List[that.mp3List_index].url;
            }, 14 * 1000);

            //获取图层中的图例信息
            if (window.gisConfig && window.gisConfig.optionalLayers && window.gisConfig.optionalLayers.length) {
                window.gisConfig.optionalLayers.forEach(layer => {
                    // 如果图层初始配置显示为true，则显示图例
                    if (layer.legends) {
                        let visible = false;
                        if (layer.initShow) {
                            visible = true;
                        }
                        layer.legends.forEach(legend => {
                            legend.layerID = layer.id;
                            legend.visible = visible;
                            this.legendInfos.push(legend);
                        });
                    }
                });
                // console.log('this.legendInfos', this.legendInfos);
            }

        },
        filters:{
            formate_tm(val){
                let temp_val = val;

                temp_val = temp_val.substring(3);

                return temp_val;
            }
        }

    };
</script>


<style scoped lang="scss">
    #home {
        width: 100%;
        height: calc(100% - 60px);
        position: relative;
        .custom-tree-node{
            img{
                width: 14px;
            }
        }
        .main-tontext {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;

            & > .col {
                position: relative;
                height: 100%;

                &:nth-child(1) {
                    position: absolute !important;
                    top: 70px;
                    left: 10px;
                    z-index: 999;


                    height: auto !important;
                    border-radius: 6px;
                    background: #fff;

                    .inner-wrap {
                        // width: 128px;
                        opacity: 0;
                        position: absolute;
                        top: -30px;
                        left: 240px;
                        z-index: -10;

                        @media screen and(min-width: 1601px) {
                            max-height: 900px;
                            overflow-y: auto;
                        }
                        @media screen and(max-width: 1600px) {
                            max-height: 500px;
                            overflow-y: auto;
                        }

                        &.ifshow {
                            opacity: 1;
                            z-index: 2;
                        }

                        .el-tree {
                            width: 100%;
                            height: 100%;
                            overflow-y: auto;
                        }
                    }

                }

                &:nth-child(1).ifshow {
                    z-index: -10;
                }

                &:nth-child(2) {
                    width: 100%;
                    position: relative;
                    display: flex;
                    justify-content: space-between;

                    #gis {
                        height: 100%;
                        position: relative;
                        overflow: hidden;
                    }

                    .gis-tool {
                        position: absolute;
                        top: 10px;
                        left: 10px;
                        z-index: 100;
                    }

                    .left-legend {
                        position: absolute;
                        left: 10px;
                        bottom: 10px;
                        z-index: 2;
                        font-size: 12px;

                        .icon-wrap {
                            width: 280px;
                            max-height: 400px;
                            overflow-y: auto;

                            .pipe-wrap {
                                width: 100%;
                                height: 30px;
                                display: flex;
                                flex-direction: column;
                                flex-flow: wrap;
                                justify-content: center;
                                align-items: center;
                                overflow-y: auto;

                                .col {
                                    width: 130px;
                                    height: 16px;
                                    line-height: 16px;
                                    text-align: center;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;

                                    .pencil {
                                        display: inline-block;
                                        width: 50px;
                                        height: 5px;
                                        background: #0b83fe;
                                        margin-right: 10px;

                                        &.ignore {
                                            background: gray;
                                        }
                                    }
                                }
                            }

                            .sub-icons {
                                width: 100%;
                                height: calc(100% - 30px);
                                display: flex;
                                flex-direction: column;
                                flex-flow: wrap;
                                justify-content: left;
                                align-items: center;
                                overflow-y: auto;

                                .col {
                                    width: 140px;
                                    height: 20px;
                                    text-align: center;
                                    display: flex;
                                    justify-content: flex-start;
                                    align-items: center;
                                    padding: 0 10px;

                                    img {
                                        width: 16px;
                                        height: 16px;
                                        margin-right: 10px;
                                    }
                                }

                            }
                        }

                        .get-more {
                            width: 100%;
                            height: 20px;
                            line-height: 20px;
                            text-align: center;
                            text-decoration: underline;
                            color: #0b83fe;
                            cursor: pointer;
                        }
                    }

                    .tree-list{
                        width: 75px;
                        font-size: 12px;
                        text-align: center;
                        height: 25px;
                        line-height: 25px;
                        border-radius: 25px;
                        position: absolute;
                        top: 10px;
                        left: 240px;
                        background:#0690F8;
                        color: #fff;
                        cursor: pointer;
                        i.trans{
                            transition: all 0.5s linear;
                            &.showSubTree{
                                transform: rotate(90deg);
                            }
                        }
                    }

                    #funcTools {
                        position: absolute;
                        top: 10px;
                        left: 540px;
                        box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);

                        .col {
                            width: 80px;
                            border-right: 1px solid #ccc;
                            height: 30px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                            color: #909399;

                            img {
                                width: 14px;
                                height: 14px;
                                margin-right: 5px;
                            }

                            &.alert {
                                img {
                                    width: 24px;
                                    height: 24px;
                                }
                            }
                            i{
                                display: inline-block;
                                padding-top: 3px;
                            }

                            &:hover {
                                color: blue;
                            }

                            &:last-child {
                                width: 40px;

                                i {
                                    font-size: 30px;
                                }
                            }

                        }

                        .have-more {
                            width: 126px;
                            height: 38px;
                            line-height: 38px;
                            position: relative;
                            padding-left: 10px;
                            border-right: 1px solid #e9e9e9;

                            .el-checkbox {
                                margin-right: 5px;
                                margin-bottom: 0px;
                            }

                            .colorList {
                                position: absolute;
                                top: 40px;
                                left: 0px;
                                width: 144px;
                                height: 95px;
                                padding: 5px;
                                background: #fff;
                                box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
                                display: none;


                                .row {
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    height: 25px;
                                    line-height: 25px;
                                }

                                .cycle-color {
                                    display: inline-block;
                                    width: 12px;
                                    height: 12px;
                                    border-radius: 50%;
                                    margin-right: 5px;

                                    &.red {
                                        background: red;
                                    }

                                    &.orange {
                                        background: orange;
                                    }

                                    &.yellow {
                                        background: yellow;
                                    }

                                    &.green {
                                        background: green;
                                    }
                                }
                            }

                            &:hover {
                                .colorList {
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    align-items: flex-start;
                                }
                            }
                        }

                    }

                    .searchBox {
                        width: 200px;
                        height: 30px;
                        position: absolute;
                        top: 10px;
                        left: 320px;
                        z-index: 100;
                    }
                    .left-tipPanel{

                        max-height: calc(100% - 35px);
                        position: absolute;
                        bottom: 10px;
                        left: 10px;
                        z-index: 100;
                        border-radius: 5px;

                        &.panelPosition{
                            top: 10px;
                        }

                        .toggle-bnt{
                            width: 20px;
                            height:50px ;
                            position: absolute;
                            right: -20px;
                            top: 50%;
                            margin-top: -70px;
                            cursor: pointer;
                        }
                        .panel-btn{
                            position: absolute;
                            top: 0px;
                            left: 10px;
                            width: 60px;
                            height: 60px;
                            border-radius: 50%;
                            text-align: center;
                            line-height: 60px;
                            background: #0b83fe;
                            color: #fff;
                            opacity: 0.5;
                            font-size: 12px;
                            &:hover{
                                opacity: 1;
                            }
                        }
                    }

                    .tabs {
                        width: 100%;
                        height: 30px;
                        border-bottom: 1px solid #ccc;

                        span {
                            display: inline-block;
                            width: 80px;
                            text-align: center;
                            line-height: 30px;

                            &.activedTab {
                                color: #fff;
                                background: #0b83fe;
                            }

                            cursor: pointer;
                        }
                    }

                    .main-content {
                        width: 100%;
                        height: calc(100% - 30px);
                        padding: 5px 0;
                    }

                    #toggleTable_list {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        height: calc(100% - 15px);
                    }
                }
            }
        }


        table.simulate-table {
            .el-radio {
                display: flex;
                justify-content: center;
                align-items: center;

                /deep/ .el-radio__inner {
                    width: 14px;
                }
            }
        }

        table.head-nobg {

            thead {
                tr {
                    th {

                        background: #fff;
                        color: #333;
                        border-bottom: 1px solid #e9e9e9;

                        &:first-child {
                            width: 120px;
                            border-right: none;
                            border-right: 1px solid #e9e9e9;
                        }
                    }
                }
            }

        }

        .selinum-head {
            width: 100%;
            height: 40px;
            padding: 10px 10px 0px;
            text-align: center;
            border-bottom: 1px solid #ccc;
            margin-bottom: 10px;
            font-size: 18px;
            font-weight: 600;
        }

        .sub-content {
            width: 100%;
            height: calc(100% - 100px);
            overflow-y: auto;

            .tip-content {
                .row {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 5px;

                    & > span {
                        display: inline-block;
                        width: 95px;
                        text-align: right;
                    }

                    .el-input {
                        width: calc(100% - 100px);
                    }

                }

            }
        }

        .senium-export {
            width: 100px;
            height: 50px;
            padding: 10px;
            margin: 0 auto;

            span {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                padding: 0 15px;
                cursor: pointer;
                background: #0b83fe;
                color: #fff;
            }
        }

        table{
            tr{
                td:last-child{
                    span{
                        line-height: 30px;
                    }
                }
            }
        }

        .cards{
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            padding: 0 10px;
            .card-item{
                width: calc(20% - 5px);
                height: 60px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border: 1px solid  #4ACBE8;;
                span{
                    &:last-child{
                        font-size: 16px;
                        line-height: 22px;
                        font-weight: 600;
                        color: #4ACBE8;
                    }
                }
            }
        }

    }
</style>
