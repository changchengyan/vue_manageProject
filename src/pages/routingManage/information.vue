<template>
    <div id="information">
        <div id="gis"></div>
        <div class="table">
            <dse-toggle-table :innerWidth="350" @toggleFlag="toggleFlag">
                <div class="tabs">
                    <div class="tab-item" @click="selectThis(index)" :class="{actived:index==activedIndex}"
                         v-for="(item,index) in tabs" :key="index">
                        {{item.name}}
                    </div>
                </div>
                <template v-if="activedIndex==0">
                    <div class="msg">
                        <div class="contentTable">
                            <dse-table-list :totalNum="onLive_msg.totalPages" :currentPage="onLive_msg.currentPage"
                                            @goto_page="goto_page">
                                <thead>
                                <tr>
                                    <th><span>区域颜色</span></th>
                                    <th><span>状态</span></th>
                                    <th><span>巡检人员</span></th>
                                    <th class="time-sm"><span>上线时间</span></th>
                                    <th><span>今日巡检里程</span></th>
                                </tr>
                                </thead>
                                <tbody>
                                <template v-if="onLive_msg.planList.length>0">
                                    <tr v-for="(item,index) in onLive_msg.planList" :key="index">
                                        <td><span class="rect" :style="{backgroundColor:'rgba'+item.areaColor}"></span>
                                        </td>
                                        <td>
                                            <template v-if="item.startTime&&!item.endTime">
                                                <img src="../../assets/images/common/onLine.png" alt="">
                                            </template>
                                            <template v-else>
                                                <img src="../../assets/images/common/offLine.png" alt="">
                                            </template>
                                        </td>
                                        <td><span class="name">{{item.userName}}</span></td>
                                        <td class="time-sm" :title="item.startTime"><span class="onLineTime">{{item.startTime}}</span>
                                        </td>
                                        <td><span>{{item.inspectLength?item.inspectLength:0}}公里</span></td>
                                    </tr>
                                </template>
                                </tbody>
                            </dse-table-list>
                        </div>
                    </div>
                </template>
                <template v-if="activedIndex==1">
                    <div class="plan plan_">
                        <div class="row ">
                            <span class="littleLong">巡检人员:</span>
                            <el-input clearable v-model="routingCheck_plan.worker"></el-input>
                        </div>
                        <div class="row">
                            <span class="sm">从:</span>
                            <el-date-picker align="center" value-format="yyyy-MM" @change="getPlan_startMonth"
                                            v-model="routingCheck_plan.startTime" type="month" placeholder="月份">
                            </el-date-picker>
                            <span class="sm">到:</span>
                            <el-date-picker align="center" value-format="yyyy-MM" @change="getPlan_endMonth"
                                            v-model="routingCheck_plan.endTime" type="month" placeholder="月份">
                            </el-date-picker>
                            <el-button type="primary" @click="search_routingCheckPlan">搜索</el-button>
                        </div>
                        <div class="addPlan">
                            <span :class="{ifAdd:addFlag===true}" @click="gotoDescPage"><i
                                    class="el-icon-plus"></i>新增</span>
                        </div>
                        <div class="content routing-plan">
                            <dse-table-list :totalNum="routingCheck_plan.totalPages"
                                            :currentPage="routingCheck_plan.currentPage" @goto_page="goto_page">
                                <thead>
                                <tr>
                                    <th><span>计划名称</span></th>
                                    <th><span>巡检日期</span></th>
                                    <th><span>巡检进度</span></th>
                                    <th><span>巡检人</span></th>
                                </tr>
                                </thead>
                                <tbody>
                                <template v-if="routingCheck_plan.planList.length>0">
                                    <tr v-for="(item,index) in routingCheck_plan.planList" :key="index">
                                        <td><span class="place" :title="item.planName">{{item.planName}}</span></td>
                                        <template v-if="item.endTime">
                                            <td :title="item.startTime+'-'+item.endTime"><span>{{item.startTime}}-{{item.endTime}}</span>
                                            </td>
                                        </template>
                                        <template v-else>
                                            <td :title="item.startTime"><span>{{item.startTime}}</span></td>
                                        </template>
                                        <td><span>{{item.sumnum}}%</span></td>
                                        <!--<td><span>{{item.planCycle}}</span></td>-->
                                        <td :title="item.allName"><span>{{item.allName}}</span></td>
                                    </tr>
                                </template>
                                </tbody>
                            </dse-table-list>
                        </div>
                    </div>
                </template>
                <template v-if="activedIndex==2">
                    <div class="plan">
                        <div class="row">
                            <span>处理人:</span>
                            <el-input v-model="peopleName" clearable></el-input>
                        </div>
                        <div class="row">
                            <span class="sm">从:</span>
                            <el-date-picker align="center" v-model="pipeRepair.startTime" type="date" placeholder="日期"
                                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                            <span class="sm">到:</span>
                            <el-date-picker align="center" v-model="pipeRepair.endTime" type="date" placeholder="日期"
                                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                            <el-button type="primary" @click="search_repair">搜索</el-button>
                        </div>
                        <div class="content rushRepair">
                            <dse-table-list :totalNum="pipeRepair.totalPages" :currentPage="pipeRepair.currentPage"
                                            @goto_page="goto_page">
                                <thead>
                                <tr>
                                    <th><span>序号</span></th>
                                    <th class="tableName"><span>检修单号</span></th>
                                    <th class="tableTime"><span>派单时间</span></th>
                                    <th><span>状态</span></th>
                                    <th><span>详情</span></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item,index) in pipeRepair.planList" :key="index">
                                    <td><span>{{index+1}}</span></td>
                                    <td class="tableName" :title="item.orderCode"><span>{{item.orderCode}}</span></td>
                                    <td class="tableTime" :title="item.dispatchTime"><span>{{item.dispatchTime}}</span>
                                    </td>
                                    <td>
                                        <template v-if="item.orderStatus=='0'">
                                            <span class="ordering">派单</span>
                                        </template>
                                        <template v-if="item.orderStatus=='1'">
                                            <span class="receive">派单</span>
                                        </template>
                                        <template v-if="item.orderStatus=='2'">
                                            <span class="doing">处理中</span>
                                        </template>
                                        <template v-if="item.orderStatus=='3'">
                                            <span class="doing"> 拒绝处理</span>
                                        </template>
                                        <template v-if="item.orderStatus=='4'">
                                            <span class="down">处理完成</span>
                                        </template>
                                        <template v-if="item.orderStatus=='5'">
                                            <span class="checked">审核通过</span>
                                        </template>
                                        <template v-if="item.orderStatus=='6'">
                                            <span class="doing">审核拒绝</span>
                                        </template>
                                    </td>
                                    <td class="hasBorder" @click="gotosubDesc(item.id,item.type,item.orderStatus)">
                                        <span>详情</span></td>
                                </tr>
                                </tbody>
                            </dse-table-list>
                        </div>
                    </div>
                </template>
                <template v-if="activedIndex==3">
                    <div class="plan">
                        <div class="row">
                            <span>巡检人员:</span>
                            <el-input v-model="routingCheck_record.worker" clearable></el-input>
                        </div>
                        <div class="row">
                            <span class="sm">从:</span>
                            <el-date-picker align="center" v-model="routingCheck_record.startTime" type="date"
                                            placeholder="日期" @change="getStartTime_record">
                            </el-date-picker>
                            <span class="sm">到:</span>
                            <el-date-picker align="center" v-model="routingCheck_record.endTime" type="date"
                                            placeholder="日期" @change="getEndTime_record">
                            </el-date-picker>
                            <el-button type="primary" @click="shearch_record">搜索</el-button>
                        </div>
                        <div class="content rushRepair ">
                            <dse-table-list :totalNum="routingCheck_record.totalPages"
                                            :currentPage="routingCheck_record.currentPage" @goto_page="goto_page">
                                <thead>
                                <tr>
                                    <th><span>巡检人员</span></th>
                                    <th><span>巡检日期</span></th>
                                    <th><span>当前进度</span></th>
                                    <th><span>计划名称</span></th>
                                </tr>
                                </thead>
                                <tbody>
                                <template v-if=" routingCheck_record.planList.length>0">
                                    <tr v-for="(item,index) in routingCheck_record.planList" :key="index">
                                        <td><span>{{item.userName}}</span></td>

                                        <td class="record_time" :title="item.startTime+'-'+item.endTime"><span>{{item.startTime|formateStartTime}}-{{item.endTime|formateEndTime}}</span>
                                        </td>
                                        <td><span>{{item.sumNum}}%</span></td>
                                        <td class="record_place"><span class="hasColor"
                                                                       @click="gotonewPage(item.recordId,item.planName)">{{item.planName}}</span>
                                        </td>
                                    </tr>
                                </template>
                                </tbody>
                            </dse-table-list>
                        </div>
                    </div>
                </template>
            </dse-toggle-table>
        </div>
        <dse-select-tips :closedModel_flag="showSelect_model_flag" @closeModel="close_selectModel"
                         @configSelect="configTable"/>
    </div>
</template>

<script>

    import * as esriLoader from 'esri-loader';

    import DseSelectTips from '../../common/components/DseselectTips';
    import DseToggleTable from '../../common/components/dseToggleTable';
    import DseTableList from '../../common/components/dseTableList';

    esriLoader.loadCss(window.DSE.arcgis_mainCss);
    let startJs = window.DSE.arcgis_startJS;
    const options = {
        url: startJs,
        dojoConfig: window.DSE.gisConfig
    };

    let loadJSON_func = null;
    let layerInfos = {};

    export default {
        components: {
            DseTableList,
            DseToggleTable,
            DseSelectTips
        },
        data() {
            return {
                addFlag: true, //控制新增计划的按钮权限
                companyId: '', // 公司的ID
                map: null,
                view: null,
                tabs: [{
                    name: '实时信息'
                },
                    {
                        name: '巡检计划'
                    },
                    {
                        name: '管网抢修'
                    },
                    {
                        name: '巡检记录'
                    }
                ],
                activedIndex: 0, // 激活的tabs
                peopleName: '', //模糊查询的巡检人员
                areaID: '', //巡检区域
                startValue_plan: '', //巡检计划的开始时间
                endValue_plan: '', //巡检计划的结束时间
                startValue: '', //开始时间
                endValue: '', //结束时间
                tableData: [],
                plan: {
                    name: ''
                },
                recordId: '', //巡检记录ID
                routingCheckTotolPage: 1,
                routingCheck_recordList: [], //巡检记录
                search_startPlan: null,
                search_endPlan: null,
                temp_onlineArea: [], //保存实时信息的副本
                marks_online: [], //在线模块的标记点
                marks_plan: [], //巡检计划的标记点
                temp_planArea: [], //巡检记录的区域
                ifshowTable: true, //是否显示右侧内容
                showLegent: true, //显示图例
                routingCheck_planList: [], //巡检计划
                routingCheck_totalPage: 1,
                online_initCount: 0, //判断是否是第一次进入  实时信息
                update_time: '', // arcgis 更新时间
                layers: [],
                onLive_msg: { //实时信息
                    totalPages: 1,
                    currentPage: 1,
                    planList: [
                        {
                            areaColor: '#0b83fe',
                            startTime: '2019-3-12 9:21',
                            endTime: '2019-4-23 12:56',
                            userName: '李建国',
                            inspectLength: 12
                        },
                        {
                            areaColor: '#0b83fe',
                            startTime: '2019-3-12 9:21',
                            endTime: '2019-4-23 12:56',
                            userName: '李建国',
                            inspectLength: 12
                        },
                        {
                            areaColor: '#0b83fe',
                            startTime: '2019-3-12 9:21',
                            endTime: '2019-4-23 12:56',
                            userName: '李建国',
                            inspectLength: 12
                        }
                    ]
                },
                routingCheck_plan: { // 巡检计划
                    totalPages: 1,
                    currentPage: 1,
                    planList: [
                        {
                            planName:'计划1',
                            startTime:'2019-3-12 9:54',
                            endTime:'2019-3-12 16:21',
                            sumnum:12,
                            allName:'李建国，赵铁柱,王跃进'
                        },
                        {
                            planName:'计划2',
                            startTime:'2019-3-12 9:54',
                            endTime:'2019-3-12 16:21',
                            sumnum:12,
                            allName:'李建国，赵铁柱,王跃进'
                        },
                        {
                            planName:'计划3',
                            startTime:'2019-3-12 9:54',
                            endTime:'2019-3-12 16:21',
                            sumnum:12,
                            allName:'李建国，赵铁柱,王跃进'
                        }
                    ],
                    worker: '',
                    startTime: '',
                    endTime: '',
                    post_startTime: '',
                    post_endTime: ''
                },
                pipeRepair: { //管网抢修
                    totalPages: 1,
                    currentPage: 1,
                    planList: [
                        {
                            orderCode:'order01',
                            dispatchTime:'2019-4-21 9:54',
                            orderStatus:'2',
                        },
                        {
                            orderCode:'order02',
                            dispatchTime:'2019-4-21 10:05',
                            orderStatus:'4',
                        },
                        {
                            orderCode:'order03',
                            dispatchTime:'2019-6-9 9:15',
                            orderStatus:'3',
                        }
                    ],
                    worker: '',
                    startTime: '',
                    endTime: '',
                    post_startTime: '',
                    post_endTime: ''
                },
                routingCheck_record: { //巡检记录
                    totalPages: 1,
                    currentPage: 1,
                    planList: [
                        {
                            userName:'赵铁柱',
                            startTime:'2019-4-13 9:31',
                            endTime:'2019-4-13 18:01',
                            sumNum:31,
                            recordId:'BHBH432',
                            planName:'计划01'
                        },
                        {
                            userName:'王铁蛋',
                            startTime:'2019-4-13 9:31',
                            endTime:'2019-4-13 18:01',
                            sumNum:31,
                            recordId:'BHBH432',
                            planName:'计划02'
                        },
                        {
                            userName:'黄国庆',
                            startTime:'2019-4-13 9:31',
                            endTime:'2019-4-13 18:01',
                            sumNum:31,
                            recordId:'BHBH432',
                            planName:'计划03'
                        }
                    ],
                    worker: '',
                    startTime: '',
                    endTime: ''
                },
                showSelect_model_flag: false, //管网抢修 选择进入 标准工单 或者原用工单 弹窗
                gotoDetail_id: null, // 管网抢修进入详情页的id
                filePath: '',
            };
        },
        methods: {
            selectThis(index) {
                this.activedIndex = index;
                if (this.view) {
                    this.view.popup.close();
                }
            },
            toggleFlag(flag) {

            },
            goto_page(pageNum) {

            },
            gotoDescPage() {
                let flag = this.addFlag;
                if (!flag) {
                    return;
                }
                this.$store.commit('setAside_status', false);
                this.$emit('hiddenAside');
                this.$router.push({
                    name: 'makePlan'
                });
            },
            showLegend_() {
                this.showLegent = true;
            },
            gotonewPage(recordId, name) {
                this.$router.push({
                    name: 'record',
                    params: {
                        id: '' + recordId,
                        planName: name
                    }
                });
                this.$store.commit('setAside_status', false);
                this.$emit('hiddenAside');
            },
            gotosubDesc(id, type, status) {
                // this.showSelect_model_flag = true;
                // this.gotoDetail_id = id;
                // let temp_num = parseInt(type);
                // let temp_id = id;

                this.$router.push({
                    name: 'piperepair',
                    params: {
                        'id': '',
                        'status': '1',
                        'tableType':'1'
                    }
                });
                this.$store.commit('setAside_status', false);
                this.$emit('hiddenAside');
            },
            createMap(position) {
                let that = this;
                esriLoader
                    .loadModules(
                        [
                            'dojo/on',
                            'esri/Map',
                            'esri/views/MapView',
                            'esri/layers/FeatureLayer',
                            'esri/layers/WebTileLayer','esri/Graphic','esri/layers/GraphicsLayer',
                            'dojo/domReady!'
                        ],
                        options
                    )
                    .then(
                        ([
                             domOn,
                             Map,
                             MapView,
                             FeatureLayer,
                             WebTileLayer,Graphic,GraphicsLayer
                         ]) => {

                            that.map = new Map({
                                basemap: {
                                    baseLayers: [
                                        //地形图
                                        new WebTileLayer({
                                            urlTemplate: 'http://{subDomain}.tianditu.gov.cn/DataServer?T=ter_w&X=${col}&Y=${row}&L=${level}&tk=94aa433732f999e8f30b6a7b0141cbfd',
                                            subDomains: ['t0', 't1', 't5', 't6', 't7'],
                                            visible: false
                                        }),
                                        //地形图注记
                                        new WebTileLayer({
                                            urlTemplate: 'http://{subDomain}.tianditu.gov.cn/DataServer?T=cta_w&X=${col}&Y=${row}&L=${level}&tk=94aa433732f999e8f30b6a7b0141cbfd',
                                            subDomains: ['t0', 't1', 't5', 't6', 't7'],
                                            visible: false
                                        }),
                                        //影像图
                                        new WebTileLayer({
                                            urlTemplate: 'http://{subDomain}.tianditu.gov.cn/DataServer?T=img_w&X=${col}&Y=${row}&L=${level}&tk=94aa433732f999e8f30b6a7b0141cbfd',
                                            subDomains: ['t0', 't1', 't5', 't6', 't7'],
                                            visible: false
                                        }),
                                        //影像图注记
                                        new WebTileLayer({
                                            urlTemplate: 'http://{subDomain}.tianditu.gov.cn/DataServer?T=cia_w&X=${col}&Y=${row}&L=${level}&tk=94aa433732f999e8f30b6a7b0141cbfd',//注记
                                            subDomains: ['t0', 't1', 't5', 't6', 't7'],
                                            visible: false
                                        }),
                                        //矢量图
                                        new WebTileLayer({
                                            urlTemplate: 'http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_w&X=${col}&Y=${row}&L=${level}&tk=94aa433732f999e8f30b6a7b0141cbfd',
                                            subDomains: ['t0', 't1', 't5', 't6', 't7'],
                                            visible: true
                                        }),
                                        //矢量图注记
                                        new WebTileLayer({
                                            urlTemplate: 'http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_w&X=${col}&Y=${row}&L=${level}&tk=94aa433732f999e8f30b6a7b0141cbfd',
                                            subDomains: ['t0', 't1', 't5', 't6', 't7'],
                                            visible: true
                                        })
                                    ]
                                }
                            });

                            that.view = new MapView({
                                container: 'gis',
                                map: that.map,
                                zoom: 10,
                                center: [105.97957, 36.9786],
                                ui: {
                                    components: ['zoom']
                                }
                            });

                            //添加地图约束条件
						if(window.gisConfig.minScale != undefined){
						that.view.constraints.minScale = window.gisConfig.minScale;
						}
						if(window.gisConfig.maxScale != undefined){
						that.view.constraints.maxScale = window.gisConfig.maxScale;
						}
						if(window.gisConfig.snapToZoom != undefined){
						that.view.constraints.snapToZoom = window.gisConfig.snapToZoom;
						}
						if(window.gisConfig.rotationEnabled != undefined){
						that.view.constraints.rotationEnabled = window.gisConfig.rotationEnabled;
						}

						//配置文件中自带空间数据
						loadJSON_func = function(layerID){
							let layer = that.map.findLayerById(layerID);
							let layerInfo = layerInfos[layerID];
							if (layerInfo.features) {
								layerInfo.features.forEach(feature => {
								let graphic = new Graphic();
								//添加属性数据
								if (feature.attributes) {
									graphic.attributes = feature.attributes;
								}
								//添加符号
								graphic.symbol = layerInfo.symbolFunc(graphic.attributes);
								//添加空间数据
								if (feature.geometry) {
									feature.geometry.type = 'point';
									if (feature.geometry.rings) {
									feature.geometry.type = 'polygon';
									}
									if (feature.geometry.paths) {
									feature.geometry.type = 'polyline';
									}
									graphic.geometry = feature.geometry;
								}
								layer.graphics.add(graphic);
								});
							}
						};

						//添加基础图层（非业务图层）
						if (window.gisConfig && window.gisConfig.baseLayers && window.gisConfig.baseLayers.length) {
							window.gisConfig.baseLayers.forEach(item => {
								layerInfos[item.id] = item;

								let layer = new GraphicsLayer({
									id: item.id,
									maxScale: item.maxScale ? item.maxScale : 0,
									minScale: item.minScale ? item.minScale : 0,
									graphics: []
								});
								that.map.add(layer);
								//如果初始配置显示为true，则加载数据
								if(item.initShow){
									loadJSON_func(item.id);
								}
							});
						}


                        }
                    );
            },
            toggleSelectThis(val) {

            },
            //是否是底图
            _isBaseLayer(layerId) {
                let items = window.DSE.baseMapLayers.filter(function (layer) {
                    return layer.id === layerId;
                });
                return items.length > 0 ? items[0] : null;
            },
            //切换底图状态.
            _changeBaseLayer(type) {
                //
                let self = this;
                //
                this.map.allLayers.forEach((layer, index) => {

                    if (this._isBaseLayer(layer.id)) {
                        // self.map.getLayer(lId).setVisibility(false);

                        self.map.findLayerById(layer.id).visible = false;
                        /**
                         * 修复底图切换时，标签图层显示不正常
                         * @author wangsl
                         * @date 2017-05-24
                         * */
                        let lblLayer = self.map.findLayerById(layer.id + 'w');
                        //hide label layer.
                        if (lblLayer) {
                            // lblLayer.setVisibility(false);
                            lblLayer.visible = false;
                        }
                    }
                });
                let vecLayer = this.map.findLayerById(type);
                let labelLayer = this.map.findLayerById(type + 'w');
                //
                if (vecLayer) {
                    vecLayer.visible = true;
                }
                if (labelLayer) {
                    labelLayer.visible = true;
                }
            },
            thisDom(obj) {
                let that = this;
                let temp_str = obj.tmpStr;
                switch (temp_str) {
                    case '平面':
                        this._changeBaseLayer('gvec');
                        break;
                    case '卫星':
                        this._changeBaseLayer('gimg');
                        break;
                    case '地形':
                        this._changeBaseLayer('gter');
                        break;
                    case '测距':
                        that.distance.start();
                        break;
                    case '测面':
                        that.area.start();
                        break;
                    case '标点':
                        that.drawTools.activate('circle');
                        break;
                    case '标面':
                        that.drawTools.activate('polygon');
                        break;
                    case '清除所有':
                        that.distance.clear();
                        that.area.clear();
                        break;
                }
            },
            queryOnlinePerson_(page) { //实时查询

            },
            queryInspectionInfo_(page) {

            },
            getStartTime_record(val) {

            },
            getEndTime_record(val) {

            },
            shearch_record() {
                let temp_startTime = this.routingCheck_record.startTime;
                let temp_endTime = this.routingCheck_record.endTime;
                var time1 = new Date(temp_startTime);
                var time2 = new Date(temp_endTime);
                if (time1 > time2) {
                    this.$message.error('开始时间不能大于结束时间!');
                    return;
                }
                this.queryInspectionInfo_('1');
            },
            search_routingCheckPlan() {
                let that = this;
                let temp_start = new Date(that.routingCheck_plan.post_startTime);
                let temp_end = new Date(that.routingCheck_plan.post_endTime);
                if (temp_end < temp_start) {
                    this.$message.error('开始月份不能大于结束月份!');
                    return;
                }
                this.queryInspectorPlanInfo_('1');
            },

            //获取当前之前或者之后天数的日期
            getDateStr(val, AddDayCount) {
                let dd = new Date(val);
                dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
                let y = dd.getFullYear();
                let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
                let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
                return y + '/' + m + '/' + d;
            },
            //获取当前月有多少天
            getMonthLength(date) {
                let d = new Date(date);
                // 将日期设置为下月一号
                d.setMonth(d.getMonth() + 1);
                d.setDate('1');
                // 获取本月最后一天
                d.setDate(d.getDate() - 1);
                return d.getDate();
            },
            getPlan_startMonth(val) {
                if (val) {
                    let formate_time = val.replace('-', '/');
                    let old_time = formate_time + '/01';
                    // let temp_time = this.getDateStr(old_time, -6)
                    this.routingCheck_plan.post_startTime = old_time;
                } else {
                    this.routingCheck_plan.startTime = '';
                    this.routingCheck_plan.post_startTime = '';
                }

            },
            getPlan_endMonth(val) {
                if (val) {
                    let days = this.getMonthLength(val);
                    let formate_time = val.replace('-', '/');
                    let old_time = formate_time + '/' + days;
                    // let temp_time = this.getDateStr(old_time, 6)
                    this.routingCheck_plan.post_endTime = old_time;
                } else {
                    this.routingCheck_plan.endTime = '';
                    this.routingCheck_plan.post_endTime = '';
                }

            },
            toggleShowTable() {
                this.ifshowTable = !this.ifshowTable;
            },
            closeLegent() {
                this.showLegent = !this.showLegent;
            },
            queryInspectorPlanInfo_(page) {

            },
            getModifiedTime_() {

            },
            getWorkorderList_(page) {

            },
            search_repair() {
                this.getWorkorderList_('1');

            },
            getPageData_onLine(pageNum) {
                this.queryOnlinePerson_(pageNum);
            },
            getPageData_routingPlan(pageNum) {
                this.queryInspectorPlanInfo_(pageNum); //获取获取巡检计划
            },
            getPageData_repair(pageNum) {
                this.getWorkorderList_(pageNum); // 获取 管网抢修
            },
            getPageData_checkRecord(pageNum) {
                this.queryInspectionInfo_(pageNum); //获取获取巡检记录
            },
            getMapPro_(id) {

            },
            close_selectModel(val) {
                this.showSelect_model_flag = false;
            },
            configTable(val) {
                let temp_id = this.gotoDetail_id;
                this.$router.push({
                    name: 'pipe_rushrepair_piperepair',
                    params: {
                        'id': temp_id,
                        'tableType': val
                    }
                });
                this.$store.commit('setAside_status', false);
                this.$emit('hiddenAside');
            },
            getUserRecord_(userID, recordId) {

            }
        },
        filters: {
            formateStartTime(val) {
                return val;
            },
            formateEndTime(val) {
                return val;
            },
            formate_time(val) {
                let temp_val = val;
                temp_val = temp_val.split(' ');
                temp_val = temp_val[0];
                let temp_year = temp_val.split('-')[0] + '年';
                let temp_month = temp_val.split('-')[1] + '月';
                let temp_day = temp_val.split('-')[2] + '日';
                return temp_year + temp_month + temp_day;
            },
        },
        mounted() {
            let that = this;
            this.$nextTick(()=>{
                setTimeout(()=>{
                    that.createMap('');
                },1000);
            });

        },
        created() {


        },
        beforeDestroy() {


        }
    };
</script>

<style lang="scss">
.esri-ui-top-left {
    top: 0px !important;
}

</style>

<style lang="scss" scoped>
    $baseFont: 14px;
    $baseColor: #333;
    $borderColor: #ccc;

    #information {
        width: 100%;
        height: 100%;
        position: relative;

        #danger {
            width: 100%;
            height: 100%;
            font-size: 14px;
            color: #333;
            padding: 10px;

            .row {
                width: 100%;
                // border-top: 1px solid #ccc;
                border-left: 1px solid #ccc;
                display: flex;
                justify-content: flex-start;

                &:first-child {
                    border-top: 1px solid #ccc;
                }

                span {
                    display: inline-block;
                    border-right: 1px solid #ccc;
                    height: 30px;
                    line-height: 30px;
                    padding-left: 5px;
                    padding-right: 5px;
                    border-bottom: 1px solid #ccc;

                    &:first-child {
                        width: 100px;
                        text-align: right;
                        background: #d6fafa;
                        border-bottom: 1px solid #ccc;
                    }

                    &:last-child {
                        width: calc(100% - 100px);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }

            .tips {
                width: 100%;
                height: 30px;
                display: flex;
                align-items: center;
                font-weight: 600;

                .rect {
                    display: flex;
                    width: 14px;
                    height: 14px;
                    border: 1px solid #ccc;
                    background: #d6fafa;
                    margin-right: 10px;
                }
            }

            .imgs {
                width: 100%;
                height: calc(100% - 180px);
                overflow-y: auto;
                display: flex;
                // justify-content: flex-start;
                flex-wrap: wrap;

                // flex-flow: row;
                img {
                    width: 130px;
                    margin: 10px;
                    height: 130px;
                }
            }
        }

        #gis {
            width: 100%;
            height: 100%;
        }

        .gisTool {
            position: absolute;
            right: 20px;
            top: 20px;
            width: 260px;
            height: 30px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            border-radius: 5px;
            background: #fff;
        }

        & > .table {
            height: calc(100% - 90px);
            position: absolute;
            top: 70px;
            right: 20px;
            background: #fff;

            .tabs {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                font-size: $baseFont;
                color: $baseColor;
                background: rgb(227, 237, 239);
                height: 30px;
                line-height: 30px;

                .tab-item {
                    width: 70px;
                    text-align: center;
                    border-right: 1px solid #ccc;
                    cursor: pointer;

                    &.actived {
                        background: rgb(11, 131, 254);
                        color: #fff;
                    }

                    &:last-child {
                        border-right: none;
                    }
                }
            }

            .plan {
                width: 100%;
                height: calc(100% - 40px);
                // overflow: hidden;
                &.plan_ {
                    .el-input {
                        width: calc(100% - 70px);
                    }
                }

                .row {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    height: 30px;
                    line-height: 30px;
                    font-size: $baseFont;
                    margin: 10px 0;
                    padding: 0 10px;

                    span {
                        display: inline-block;
                        width: 60px;
                    }

                    span.sm {
                        width: 30px;
                        margin: 0 10px;
                    }

                    .el-input {
                        width: calc(100% - 80px);
                    }

                    .el-select {
                        width: calc(100% - 40px);
                    }

                    .el-date-editor {
                        width: 110px;

                        .el-picker-panel {
                            position: absolute;
                            left: -158px !important;
                        }
                    }

                    .el-button {
                        margin-left: 4px;
                    }


                }

                .addPlan {
                    width: 100%;
                    padding: 0 10px;
                    height: 35px;
                    background: #dcdedd;
                    font-size: 14px;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;

                    span {
                        display: inline-block;
                        padding: 0 10px;
                        line-height: 25px;
                        background: gray;
                        color: #fff;
                        border-radius: 5px;
                        cursor: not-allowed;

                        &.ifAdd {
                            background: #3a9a2e;
                            cursor: pointer;
                        }
                    }
                }

                .content {
                    width: 100%;
                    height: calc(100% - 125px);
                    overflow-y: auto;

                    &.rushRepair {
                        height: calc(100% - 80px);
                        .table-wrap{
                            width: calc(100% - 45px);
                        }
                    }

                    &.routing-plan {
                        height: calc(100% - 115px);

                        table {
                            td {
                                span {
                                    width: 100%;
                                }
                            }
                        }
                    }

                    table {
                        width: 100%;
                        border-spacing: 0;
                        border-top: 1px solid #ccc;
                        font-size: $baseFont;
                        text-align: center;

                        .tableName,
                        .tableTime {
                            span {
                                width: 100%;
                            }
                        }

                        thead {
                            width: 100%;

                            tr {
                                width: 100%;

                                th {
                                    width: 20%;
                                    height: 25px;
                                    line-height: 25px;
                                    border-right: 1px solid #ccc;
                                    border-bottom: 1px solid #ccc;

                                    &:last-child {
                                        border-right: none;
                                    }
                                }
                            }
                        }

                        tbody {
                            width: 100%;
                            height: calc(100% - 30px);
                            overflow-y: auto;

                            tr {
                                width: 100%;

                                td {
                                    width: 20%; // height: 25px;
                                    line-height: 25px;
                                    border-right: 1px solid #ccc;
                                    border-bottom: 1px solid #ccc;

                                    &:last-child {
                                        border-right: none;
                                    }

                                    .area {
                                        // color: #0f84fe;
                                        // text-decoration: underline;
                                        // cursor: pointer;
                                    }

                                    span.ordering {
                                        display: inline-block;
                                        padding: 2px 10px;
                                        /*background: #c964e9;*/
                                        color: #c964e9;
                                        border-radius: 5px;
                                    }

                                    span.receive {
                                        display: inline-block;
                                        padding: 2px 8px;
                                        color: #e7af18;
                                        border-radius: 5px;
                                    }

                                    span.doing {
                                        display: inline-block;
                                        padding: 2px 10px;
                                        /*background: #ff2c50;*/
                                        color: #ff2c50;
                                        border-radius: 5px;
                                    }

                                    span.down {
                                        display: inline-block;
                                        padding: 2px 10px;
                                        /*background: #16bfb1;*/
                                        color: #16bfb1;
                                        border-radius: 5px;
                                    }

                                    span.checked {
                                        display: inline-block;
                                        padding: 2px 6px;
                                        /*background: #00bd12;*/
                                        color: #00bd12;
                                        border-radius: 5px;
                                    }

                                    span.hasColor {
                                        color: #0f84fe;
                                        text-decoration: underline;
                                        cursor: pointer;
                                    }

                                    &.hasBorder {
                                        span {
                                            display: inline-block;
                                            width: 45px;
                                            line-height: 20px;
                                            border: 1px solid #1b8cff;
                                            cursor: pointer;
                                            border-radius: 5px;
                                            color: #1b8cff;

                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .pagination {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }
            }

            .msg {
                width: 100%;
                height: calc(100% - 24px);

                .contentTable {
                    width: 100%;
                    height: calc(100% - 6px);
                    overflow-y: auto;
                    .table-wrap {
                        height: calc(100% - 45px);
                    }
                }
            }
        }
    }
</style>
