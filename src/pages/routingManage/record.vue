<template>
    <div id="record">
        <div class="topHead">
            <div class="col">
                <span class="rect"></span>
                <span>{{planName}}管线巡查记录</span>
            </div>
            <div class="col">
                <span class="goback" @click="goback">返回</span>
            </div>
        </div>
        <div class="recordTable">
            <div class="inner-wrap">
                <div class="recordList">
                    <div class="item">
                        <div class="sm"><span>巡检人员</span></div>
                        <div class="lastCeil"><span>{{routingCheck_recordList.userName||""}}</span></div>
                        <div class="sm"><span>巡检计划名称</span></div>
                        <div><span>{{routingCheck_recordList.planName||""}}</span></div>
                    </div>
                    <div class="item">
                        <div><span>巡检区域名称</span></div>
                        <div><span>{{routingCheck_recordList.areaName||""}}</span></div>
                        <div><span>巡线长度</span></div>
                        <div><span>{{routingCheck_recordList.inspectLength||0}} Km</span></div>
                    </div>
                    <div class="item">
                        <div><span>今日签到点</span></div>
                        <div><span>{{routingCheck_recordList.sumNowCount}}</span></div>
                        <div><span>累计签到点</span></div>
                        <div><span>{{routingCheck_recordList.sumCount}}</span></div>
                    </div>
                    <div class="item">
                        <div><span>开始时间</span></div>
                        <div><span>{{routingCheck_recordList.startTime}}</span></div>
                        <div><span>结束时间</span></div>
                        <div><span>{{routingCheck_recordList.endTime}}</span></div>
                    </div>
                    <div class="item">
                        <div><span>在线时长</span></div>
                        <div><span>{{routingCheck_recordList.leadTime}} 小时</span></div>
                        <div><span>平均速度</span></div>
                        <div><span>{{inspectSpeed}} Km/h</span></div>
                    </div>
                    <div class="item">
                        <div><span>巡检进度</span></div>
                        <div>
                            <div class="progress">
                                <span class="innerProgress" :style="{width:routingCheck_recordList.sumNum+'%'}"></span>
                            </div>
                            <span>{{routingCheck_recordList.sumNum}}%</span>
                        </div>
                        <div><span>轨迹回放</span></div>
                        <div @click="playGisTrail">
                            <img class="play" src="../../assets/images/common/play.png" alt="">
                        </div>
                    </div>
                    <div class="item">
                        <div><span>巡检方式</span></div>
                        <div><span>{{routingCheck_recordList.inspectMode|trans_type}}</span></div>
                        <div><span>隐患个数</span></div>
                        <div><span>{{routingCheck_recordList.probCount}} 个</span></div>
                    </div>
                </div>
                <div id="map_wrap"></div>
            </div>
        </div>
        <div class="topHead">
            <div class="col">
                <span class="rect"></span>
                <span>隐患详情</span>
            </div>
        </div>
        <div class="recordTable">
            <div class="desc">
               <table class="innerTable">
                   <thead>
                   <tr>
                       <th><span>序号</span></th>
                       <th><span>隐患上报时间</span></th>
                       <th><span>隐患编号</span></th>
                       <th><span>紧急程度</span></th>
                       <th><span>隐患描述</span></th>
                       <th><span>隐患地点</span></th>
                       <th><span>现场照片</span></th>
                       <th><span>定位</span></th>
                       <th><span>隐患状态</span></th>
                   </tr>
                   </thead>
                   <tbody>
                   <tr v-for="(item,index) in problemsData" :key="index">
                       <td><span>{{index+1}}</span></td>
                       <td><span>{{item.reportTime}}</span></td>
                       <td><span>{{item.probCode}}</span></td>
                       <td>
                           <template v-if="item.probLevel=='0'">
                               <span class="status level3">紧急</span>
                           </template>
                           <template v-if="item.probLevel=='1'">
                               <span class="status level2">较急</span>
                           </template>
                           <template v-if="item.probLevel=='2'">
                               <span class="status level1">一般</span>
                           </template>
                       </td>
                       <td><span>{{item.descrip}}</span></td>
                       <td><span>{{item.place}}</span></td>
                       <td @click="showPicModel_(index)">
                           <template v-for="(val,i) in item.file" >
                               <img  :src="filePath+val.filePath" alt=""   v-if="i<=2" :key="i">
                           </template>
                       </td>
                       <td>
                           <img class="position" src="../../assets/images/common/position.png" alt="">
                       </td>
                       <td>
                           <template v-if="item.probStatus=='0'">
                               <span class="actionStatus">未核实</span>
                           </template>
                           <template v-if="item.probStatus=='1'">
                               <span class="actionStatus">已核实</span>
                           </template>
                           <template v-if="item.probStatus=='2'">
                               <span class="actionStatus">已派单</span>
                           </template>
                           <template v-if="item.probStatus=='3'">
                               <span class="actionStatus">处理中</span>
                           </template>
                           <template v-if="item.probStatus=='4'">
                               <span class="actionStatus">已处理</span>
                           </template>
                       </td>
                   </tr>
                   </tbody>

               </table>
            </div>
        </div>

        <dse-view :showViewModel='showPicModel' :title="'图片'" @hiddenSelf="hiddenPicModel">
            <div class="slider">
                <el-carousel :interval="5000" arrow="always">
                    <el-carousel-item v-for="(item,index) in carousel " :key="index">
                        <img :src="filePath+item.filePath" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
        </dse-view>

    </div>
</template>

<script>
    import * as esriLoader from 'esri-loader';

    import DseView from '../../common/components/toast/DseView';


    esriLoader.loadCss(window.DSE.arcgis_mainCss);
    let startJs = window.DSE.arcgis_startJS;
    const options = {
        url: startJs,
        dojoConfig: window.DSE.gisConfig
    };

    export default {
        components: {
            DseView
        },
        data() {
            return {
                filePath: '', // 网络文件初始路径
                planName:'', //计划的名字
                view: null, //gis 视图的实例
                map: null, //gis 地图类型的实例
                routingCheckTotolPage: 1,
                problemPosition_point: null, //隐患位置的点位
                newGraphicsLayer_line: null, //轨迹线图层
                base_lineLayer:null, // 巡检人员的轨迹线
                newGraphicsLayer_peoplePoints: null, //定位点
                routingCheck_recordList: {
                    areaName: '东区',
                    endTime: '2019-3-4 7:32',
                    inspectDate: '2019-1-12 14:23',
                    inspectLength: '12',
                    inspectMode: '2',
                    inspectSpeed: '12',
                    leadTime: 0,
                    nowEndTime: '2019-3-4 7:32',
                    nowStartTime: '2019-3-4 7:32',
                    planId: 'BVJHBVJHBH',
                    planName: '巡检1',
                    recordId: '',
                    startTime: '2019-5-2 7:32',
                    sumCount: 0,
                    userName: '赵铁柱',
                    probCount: 0,
                    sumNowCount: 0,
                    sumNum: 0

                },
                problemsData: [
                    {
                        reportTime:'2019-5-2 7:32',
                        probCode:'CORD001',
                        probLevel:'1',
                        descrip:'巡检来了',
                        place:'骏业财富中心大厦',
                        file:[],
                        lgtd:'',
                        lttd:'',
                        probStatus:'2'
                    }
                ], //隐患详情列表
                showPicModel: false, //显示图片轮播的弹窗
                carousel: [], //轮播图
                person_remrks: [], //人的轨迹
                persional_focus: [], //地图聚焦
                inspectSpeed: null, //平均速度
                errorPoints:[], //隐患点的坐标点集合
            };
        },
        methods: {
            goback() {
                this.$router.push({
                    path: '/routing/msg'
                });
                this.$store.commit('setAside_status', true);
                this.$emit('showAside');
                this.$emit('activedTab', 3);
            },
            showPositionGis(lgtd, lttd) {
                let points = [lgtd, lttd];
                setTimeout(() => {
                    this.createMap('gisPosition', points);
                }, 1000);
            },

            playGisTrail() {
                // let points = [106.299599, 36.007376]
                let points = this.persional_focus;
                setTimeout(() => {
                    this.createMap('gisTrail', points);
                }, 1000);
            },
            createMap(id,positions) {
                let that = this;
                esriLoader
                    .loadModules(
                        [
                            'dojo/on',
                            'esri/Map',
                            'esri/views/MapView',
                            'esri/layers/FeatureLayer',
                            'esri/layers/WebTileLayer',
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
                             WebTileLayer
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
                                container: 'map_wrap',
                                map: that.map,
                                zoom: 10,
                                center: [105.97957, 36.9786],
                                ui: {
                                    components:['zoom']
                                }
                            });

                        }
                    );
            },

            queryInspectionInfo_(id, page) {

            },
            hiddenPicModel(val) {
                this.showPicModel = false;
            },
            showPicModel_(index) {
                if (this.problemsData[index].file.length > 0) {
                    this.showPicModel = true;
                    this.carousel = this.problemsData[index].file;
                }
            }
        },
        filters: {
            trans_type(val) {
                let temp_val = val;
                switch (val) {
                    case '0':
                        temp_val= '步行';
                        break;
                    case '1':
                        temp_val= '自行车';
                        break;
                    case '2':
                        temp_val= '摩托车';
                        break;
                    case '3':
                        temp_val= '汽车';
                        break;
                }
                return  temp_val;
            }
        },
        mounted() {
            this.$nextTick(()=>{
                this.createMap('',[]);
            });
        },
        beforeDestroy() {
            this.$store.commit('setAside_status', true);
            this.$emit('showAside');
        },
        created() {
            let id = this.$route.params.id;
            this.planName = this.$route.params.planName;
            this.queryInspectionInfo_(id, '1');
            this.filePath = this.$store.getters.get_filePath;
        }
    };
</script>

<style lang="scss" scoped>
    $baseFont:14px;
    $baseColor:#333;
    $baseBorderColor:#ccc;
    $baseBg:#fff;

    * {
        box-sizing: border-box;
    }

    #record {
        width: 100%;
        height: 100%;
        color: $baseColor;
        font-size: $baseFont;
        background: $baseBg;

        &>.topHead {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            background: #ebebeb;
            padding: 0 20px;

            .col {
                .rect {
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    background: #05bebb;
                }

                .goback {
                    display: inline-block;
                    padding: 4px 20px;
                    background: #fe8a01;
                    cursor: pointer;
                    color: #fff;
                    border-radius: 5px;
                }
            }
        }

        .recordTable {
            width: 100%;
            height: calc(50% - 40px);
            overflow-y: auto;

            .inner-wrap {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-between;

                .recordList {
                    width: calc(100% - 900px);
                    height: 100%;
                    border-right: 1px solid #ccc;

                    &>div.item {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        height: 14.28%;
                        align-items: center;

                        &>div {
                            // width: 25%;
                            border-right: 1px solid $baseBorderColor;
                            border-bottom: 1px solid $baseBorderColor; // line-height: 30px;
                            padding-left: 10px;
                            height: 100%;
                            display: table-cell;
                            text-align: center;
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            &:last-child {
                                border-right: none;
                            }

                            &.lastBorder {
                                border-right: 1px solid $baseBorderColor;
                            }

                            &:nth-child(odd) {
                                width: 100px;
                                background: #d6fafa;
                            }

                            &:nth-child(even) {
                                width: calc(50% - 100px);
                            }

                            .progress {
                                width: 80%;
                                height: 12px;
                                background: #cfcfcf;
                                display: inline-block;
                                position: relative;
                                border-radius: 12px;
                                margin-right: 10px;

                                span {
                                    position: absolute;
                                    top: 0;
                                    left: 0; // width: 60%;
                                    height: 12px;
                                    border-radius: 12px;
                                    background: #3ea3f6;
                                }
                            }

                            img {
                                width: 35px;
                                display: inline-block;
                                vertical-align: middle;
                                cursor: pointer;

                                &:hover {
                                    width: 50px;
                                }
                            }
                        }

                    }
                }

                #map_wrap {
                    width: 900px;
                    height: 100%;
                }

            }

            .desc {
                width: 100%;
                height: 100%;
                border-top: 1px solid #ccc;
                    table{
                        img{
                            width: 18px;
                        }
                    }
            }
        }

        .paingation {
            width: 100%;
            display: flex;
            justify-content: center;
        }

        #gisPosition,
        #gisTrail {
            width: 100%;
            height: 400px;
            position: relative;
        }

        .slider {
            width: 100%;
            height: 300px;

            .el-carousel {
                width: 100%;
                height: 100%;

                .el-carousel__container {
                    position: relative;
                    height: 400px !important;
                }

                .el-carousel__item h3 {
                    color: #475669;
                    font-size: 14px;
                    opacity: 0.75;
                    line-height: 150px;
                    margin: 0;
                }

                .el-carousel__item:nth-child(2n) {
                    background-color: #99a9bf;
                }

                .el-carousel__item:nth-child(2n+1) {
                    background-color: #d3dce6;
                }

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>
