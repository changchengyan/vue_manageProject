
<template>
    <div style="width: 100%;height: 100%;">
        <div id="gisMap">
            <dse-gis-model :tips="popupInfoWindow.modelTip" :width_="popupInfoWindow.width_"
                           :showFlag="popupInfoWindow.isVisible" :top_="popupInfoWindow.centerScreenY+'px'"
                           :left_="popupInfoWindow.centerScreenX + 'px'" @closeModel="closeModel">
                <!--      管网图层-->
                <template v-if="popupInfoWindow.type=='pipeline'">
                    <dse-separating-tabs :tabs="pipeTabs" @separatingTabIndex="getTabIndex" ref="separatingTab_index">
                        <template v-if="pipeIndex==0">
                            <div class="pipe-tableMsg">
                                <table class="innerTable">
                                    <tbody>
                                    <tr>
                                        <td><span>管道名称</span></td>
                                        <td :title="model_pipe_msg.detail.PIPE_NAME"><span>{{model_pipe_msg.detail.PIPE_NAME}}</span>
                                        </td>
                                        <td><span>管道编号</span></td>
                                        <td :title="model_pipe_msg.detail.CODE">
                                            <span>{{model_pipe_msg.detail.CODE}}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>起始高程(m)</span></td>
                                        <td><span>{{model_pipe_msg.detail.STARTEL}}</span></td>
                                        <td><span>终点高程(m)</span></td>
                                        <td><span>{{model_pipe_msg.detail.ENDEL}}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>起始坐标</span></td>
                                        <td :title="model_pipe_msg.detail.START_POINT"><span>{{model_pipe_msg.detail.START_POINT |formate_formatDegree}}</span>
                                        </td>
                                        <td><span>终点坐标</span></td>
                                        <td :title="model_pipe_msg.detail.END_POINT"><span>{{model_pipe_msg.detail.END_POINT | formate_formatDegree}}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>长度(m)</span></td>
                                        <td><span>{{model_pipe_msg.detail.PIPE_LENGTH}}</span></td>
                                        <td><span>管材</span></td>
                                        <td><span>{{model_pipe_msg.detail.PIPE_MATERIAL}}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>管道评级</span></td>
                                        <td><span>{{model_pipe_msg.detail.PIPE_LEVEL |formate_lev}}</span></td>
                                        <td><span>管径</span></td>
                                        <td><span>{{model_pipe_msg.detail.PIPE_RADIUS}}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>埋深(m)</span></td>
                                        <td><span>{{model_pipe_msg.detail.PIPE_DEEP}}</span></td>
                                        <td><span>生产厂家</span></td>
                                        <td :title="model_pipe_msg.detail.MANUFACTURER"><span>{{model_pipe_msg.detail.MANUFACTURER}}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>公称压力(MPa)</span></td>
                                        <td><span>{{model_pipe_msg.detail.PRES_THRESHOLD}}</span></td>
                                        <td><span>安装时间</span></td>
                                        <td :title="model_pipe_msg.detail.INSTALL_TIME"><span>{{model_pipe_msg.detail.INSTALL_TIME}}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>防腐形式</span></td>
                                        <td><span>{{model_pipe_msg.detail.ANTI_STYLE}}</span></td>
                                        <td><span>使用寿命(年)</span></td>
                                        <td><span>{{model_pipe_msg.detail.USE_YEAR}}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>使用状态</span></td>
                                        <td><span>{{model_pipe_msg.detail.STATUS |formate_pipeStatus}}</span></td>
                                        <td><span>接口形式</span></td>
                                        <td><span>{{model_pipe_msg.detail.INTERFACE_TYPE|formate_interfaceType}}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>施工单位</span></td>
                                        <td :title="model_pipe_msg.detail.CONSTRUCTION_DEPT"><span>{{model_pipe_msg.detail.CONSTRUCTION_DEPT}}</span>
                                        </td>
                                        <td><span>设计单位</span></td>
                                        <td :title="model_pipe_msg.detail.DESIGN_DEPT"><span>{{model_pipe_msg.detail.DESIGN_DEPT}}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>监理单位</span></td>
                                        <td :title="model_pipe_msg.detail.SUPERVISOR_DEPT"><span>{{model_pipe_msg.detail.SUPERVISOR_DEPT}}</span>
                                        </td>
                                        <td><span>建设单位</span></td>
                                        <td :title="model_pipe_msg.detail.BUILD_DEPT"><span>{{model_pipe_msg.detail.BUILD_DEPT}}</span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </template>
                        <template v-else>
                            <template v-if=" model_pipe_msg.lifeCycle&& model_pipe_msg.lifeCycle.length>0">
                                <el-timeline v-for="(val,index) in model_pipe_msg.lifeCycle" :key="index">
                                    <el-timeline-item :timestamp="val.HAPPEND_TIME +' '+val.EVENT_DESC" placement="top">
                                        <el-card>
                                            <img :src="val.FILE_PATH" alt="">
                                        </el-card>
                                    </el-timeline-item>
                                </el-timeline>
                            </template>
                            <template v-else>
                                <span>暂无管道生命周期信息~~</span>
                            </template>
                        </template>
                    </dse-separating-tabs>
                </template>
                <!--      阀门图层-->
                <template v-if="popupInfoWindow.type=='valve'">
                    <table class="innerTable">
                        <tbody>
                        <tr>
                            <td><span>阀门编号</span></td>
                            <td :title="model_fm_msg.id"><span>{{model_fm_msg.id}}</span></td>
                            <td><span>阀门名称</span></td>
                            <td :title="model_fm_msg.valveNm"><span>{{model_fm_msg.valveNm}}</span></td>
                        </tr>
                        <tr>
                            <td><span>阀门类型</span></td>
                            <td><span>{{model_fm_msg.subtype}}</span></td>
                            <td><span>阀门口径</span></td>
                            <td><span>{{model_fm_msg.ds}}</span></td>
                        </tr>
                        <tr>
                            <td><span>所属管得到编号</span></td>
                            <td><span>{{model_fm_msg.pipeCode}}</span></td>
                            <td><span>所属管道名称</span></td>
                            <td :title="model_fm_msg.pipeName"><span>{{model_fm_msg.pipeName}}</span></td>
                        </tr>
                        <tr>
                            <td><span>阀门型号</span></td>
                            <td><span>{{model_fm_msg.subtype}}</span></td>
                            <td><span>阀门材质</span></td>
                            <td><span>{{model_fm_msg.material}}</span></td>
                        </tr>
                        <tr>
                            <td><span>埋深(m)</span></td>
                            <td><span>{{model_fm_msg.cenDeep}}</span></td>
                            <td><span>生产厂家</span></td>
                            <td><span>{{model_fm_msg.manufacturer}}</span></td>
                        </tr>
                        <tr>
                            <td><span>安装时间</span></td>
                            <td><span>{{model_fm_msg.fixDateStr}}</span></td>
                            <td><span>使用寿命(年)</span></td>
                            <td><span>{{model_fm_msg.lifeCycle}}</span></td>
                        </tr>
                        <tr>
                            <td><span>开关状态</span></td>
                            <td><span>{{model_fm_msg.onOffStats|formate_fm_ststus}}</span></td>
                            <td><span>操作记录</span></td>
                            <td :title="model_fm_msg.operRecord"><span>{{model_fm_msg.operRecord}}</span></td>
                        </tr>
                        </tbody>
                    </table>
                </template>
                <!--      分区的图层弹窗-->
                <template v-if="popupInfoWindow.type=='partition'">
                    <div class="part-wrap">
                        <div class="col">
                            <table class="innerTable">
                                <tbody>
                                <tr>
                                    <td><span>本月供水量:</span></td>
                                    <td><span>{{model_part_msg.supply}}</span></td>
                                </tr>
                                <tr>
                                    <td><span>本月应收水费:</span></td>
                                    <td><span>{{model_part_msg.execCost}}</span></td>
                                </tr>
                                <tr>
                                    <td><span>本月实缴水费:</span></td>
                                    <td><span>{{model_part_msg.realCost}}</span></td>
                                </tr>
                                <tr>
                                    <td><span>差额率:</span></td>
                                    <td><span>{{model_part_msg.blance}}%</span></td>
                                </tr>
                                <tr>
                                    <td colspan="2" @click="goto_part_detail(model_part_msg.type)"><span
                                            class="detail-model">详情</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col">
                            <div class="water-chart" ref="smChart"></div>
                        </div>
                    </div>
                </template>
                <!--      巡检点-->
                <template v-if="popupInfoWindow.type=='jianxiu'">
                    <table class="innerTable">
                        <tbody>
                        <tr>
                            <td><span>工单单号</span></td>
                            <td :title="model_xunjian_msg.repair.orderCode">
                                <span>{{model_xunjian_msg.repair.orderCode}}</span></td>
                            <td><span>工单类型</span></td>
                            <td :title="model_xunjian_msg.repair.orderType"><span>{{model_xunjian_msg.repair.orderType |formate_orderType}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td><span>工单状态</span></td>
                            <td :title="model_xunjian_msg.repair.orderStatus"><span>{{model_xunjian_msg.repair.orderStatus|formate_status}}</span>
                            </td>
                            <td><span>上报人</span></td>
                            <td :title="model_xunjian_msg.repair.userName">
                                <span>{{model_xunjian_msg.repair.userName}}</span></td>
                        </tr>
                        <tr>
                            <td><span>上报时间</span></td>
                            <td><span>{{model_xunjian_msg.repair.reportTimeStr}}</span></td>
                            <td><span>操作</span></td>
                            <td><span class="hollowOut-border">详情</span></td>
                        </tr>
                        </tbody>
                    </table>
                </template>
                <!--      在建工程-->
                <template v-if="popupInfoWindow.type=='buildingProject'">
                    <table class="innerTable">
                        <tbody>
                        <tr>
                            <td><span>工程名称</span></td>
                            <td :title="model_jxj_msg.code"><span>{{model_jxj_msg.code}}</span></td>
                            <td><span>工程地点</span></td>
                            <td :title="model_jxj_msg.name"><span>{{model_jxj_msg.name}}</span></td>
                        </tr>
                        <tr>
                            <td><span>施工单位</span></td>
                            <td :title="model_jxj_msg.pipeCode"><span>{{model_jxj_msg.pipeCode}}</span></td>
                            <td><span>开工日期</span></td>
                            <td :title="model_jxj_msg.pipeName"><span>{{model_jxj_msg.pipeName}}</span></td>
                        </tr>
                        <tr>
                            <td><span>竣工日期</span></td>
                            <td><span>{{model_jxj_msg.model}}</span></td>
                            <td><span>联系人</span></td>
                            <td><span>老王</span></td>
                        </tr>
                        <tr>
                            <td><span>联系电话</span></td>
                            <td><span>{{model_jxj_msg.model}}</span></td>
                            <td><span>联系人</span></td>
                            <td><span>老王</span></td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="imgs">
                        <div class="img-head">
                            <span class="rect"></span>
                            <span>现场照片</span>
                        </div>
                        <div class="img-wrap">
                            <el-carousel trigger="click" height="150px">
                                <el-carousel-item v-for="item in 4" :key="item">
                                    <h3 class="small">{{ item }}</h3>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                </template>
                <!--      水费计收-->
                <template v-if="popupInfoWindow.type=='shuifeijishou'">
                    <table class="innerTable">
                        <tbody>
                        <tr>
                            <td><span>水费价格</span></td>
                            <td><span>{{model_shuifei_msg.sfjg}}元</span></td>
                        </tr>
                        <tr>
                            <td><span>应收水费</span></td>
                            <td><span>{{model_shuifei_msg.yssf}}元</span></td>
                        </tr>
                        <tr>
                            <td><span>实收水费</span></td>
                            <td><span>{{model_shuifei_msg.sssf}}元</span></td>
                        </tr>
                        <tr>
                            <td><span>供水保障率</span></td>
                            <td><span>{{model_shuifei_msg.gsbzl}}%</span></td>
                        </tr>
                        </tbody>
                    </table>
                </template>
            </dse-gis-model>


            <dse-bg-model :tips="contentTip" :modelFlag='bgModelFlag' ref="bgModel" @changeSize="changeSize"
                          @closeBg="closeBg">
                <!--      泵站图层-->
                <template v-if="popupInfoWindow.type=='bengzhan'">
                    <dse-separating-tabs :tabs="['运行组态', '监测信息', '视频监控', '基础信息','巡检记录']"  :pumpId="pumpId" @separatingTabIndex="pump_tanIndex">
                        <pump-toggle :pumpId="temp_id" :pumpName="initName" ref="pump"/>
                    </dse-separating-tabs>
                </template>
                <!--      分区图层-->
                <template v-if="popupInfoWindow.type=='partition'">
<!--                    <dse-separating-tabs :tabs="['水费统计','水量缴收统计']" @separatingTabIndex="area_tanIndex">-->
                        <part-toggle :partId="temp_id" ref="part"/>
<!--                    </dse-separating-tabs>-->
                </template>
                <!--      水库-->
                <template v-if="popupInfoWindow.type=='shuiku'">
                    <dse-separating-tabs :tabs="['监测信息','视频监测','基础信息']" @separatingTabIndex="sk_tabIndex">
                        <toggle-sk :skId="temp_id" :graphic="popupGraphic" ref="sk"/>
                    </dse-separating-tabs>
                </template>
                <!--      水厂-->
                <template v-if="popupInfoWindow.type=='shuichang'">
                    <dse-separating-tabs :tabs="['平面布置','运行组态','视频信息','巡检信息','基础信息']" @separatingTabIndex="sc_tabIndex">
                        <toggle-water-factory :factoryId="temp_id" ref="sc" :factoryName="initName" />
                    </dse-separating-tabs>
                </template>

                <!--   蓄水池-->
                <template v-if="popupInfoWindow.type=='xushuichi'">
                    <dse-separating-tabs :tabs="['运行组态','监测信息','视频监控','基础信息','巡检记录']" @separatingTabIndex="pool_tabIndex">
                        <pool-toggle :factoryId="temp_id" ref="pool" :poolName="initName"/>
                    </dse-separating-tabs>
                </template>
                <!--   联户表井-->
                <template v-if="popupInfoWindow.type=='dayongshuihu'">
                    <dse-separating-tabs :tabs="['运行组态','巡检记录']" @separatingTabIndex="userDev_tabIndex">
                        <user-dev-toggole :factoryId="temp_id" ref="userDev" :userDevName="initName" />
                    </dse-separating-tabs>
                </template>

                <!--   视频-->
                <template v-if="popupInfoWindow.type=='shipin'">
                    <video-point/>
                </template>
                <!--   水位-->
                <template v-if="popupInfoWindow.type=='shipin'">
                    <water-lev-point/>
                </template>
            </dse-bg-model>

            <!--  点击显示图层选择列表-->
            <div class="search-list" :style="{opacity:searchPannelFlag?'1':'0',top:searchListTop,left:searchListLeft}">
                <div class="top-head">
                    <span>待选择的要素点，请选择</span>
                </div>
                <div class="list-search">
                    <div class="searchItem" v-for="(val,index) in searchLists" :key="index" @click="searchThis(val)">
                        <div class="col">
                            <img :src="DSE.static_baseUrl+'/images/symbol/'+val.icon+'.png'" alt="">
                            <span>{{val.name}}</span>
                        </div>
                        <div class="col">
                            <i class="el-icon-position"></i>
                        </div>
                    </div>
                </div>
            </div>
            <dse-loading-animation :showAnimate="showAnimate"/>
            <dse-normal-model :tips="popupInfoWindow.modelTip" :modelFlag="chartModel_flag"
                              :onHandleModelClose="closeNormalModel" ref="chartModel">
                <component :is="monitor_waterComponent" :temp_id="temp_id" :factoryName="initName"></component>
            </dse-normal-model>

            <div class="tooltip-list"
                 :style="{opacity:tooltipPannelFlag?'1':'0',top:tooltipListTop,left:tooltipListLeft}">
                <div class="list-search">
                    <div class="searchItem" v-for="(val,index) in tooltipLists" :key="index">
                        <div class="col">
                            <img :src="local_staticPath+'/images/symbol/'+val.icon+'.png'" alt="">
                            <span>{{val.name}}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <template v-if="model_monitor_point.flow&&model_monitor_point.flow.length>0">
            <allwayshow-model v-for="item in model_monitor_point.flow" :modelVal="item" :key="item.id"
                              :style="{top:item.centerScreenY?(item.centerScreenY-76)+'px':'0px',left:item.centerScreenX?(item.centerScreenX-65)+'px':'0px'}">
                <div class="top-head" :style="{background: item.status? '#0b83fe':'#ff0000'}">
                    <span :title="item.modelTip">{{item.modelTip}}</span>
                </div>
                <div class="main-content">
                    <div class="strVal">
                        <div class="row">
                            <span :class="{error:!item.status}">{{item.value}}</span>
                            <i class="el-icon-s-data" @click="showChartModel(item)"></i>
                        </div>
                    </div>
                </div>
            </allwayshow-model>
        </template>
        <template v-if="model_monitor_point.press&&model_monitor_point.press.length>0">
            <allwayshow-model v-for="item in model_monitor_point.press" :key="item.id" :modelVal="item"
                              :style="{top:item.centerScreenY?(item.centerScreenY-76)+'px':'0px',left:item.centerScreenX?(item.centerScreenX-65)+'px':'0px'}">
                <div class="top-head" :style="{background: item.status? '#0b83fe':'#ff0000'}">
                    <span :title="item.modelTip">{{item.modelTip}}</span>
                </div>
                <div class="main-content">
                    <div class="strVal">
                        <div class="row">
                            <span :class="{error:!item.status}">{{item.value}}</span>
                            <i class="el-icon-s-data" @click="showChartModel(item)"></i>
                        </div>
                    </div>
                </div>
            </allwayshow-model>
        </template>
        <template v-if="model_monitor_point.qc&&model_monitor_point.qc.length>0">
            <allwayshow-model v-for="item in model_monitor_point.qc" :key="item.id"
                              :style="{top:item.centerScreenY?(item.centerScreenY-148)+'px':'0px',left:item.centerScreenX?(item.centerScreenX-65)+'px':'0px'}">
                <div class="top-head" :style="{background: item.status? '#0b83fe':'#ff0000'}">
                    <span :title="item.modelTip">{{item.modelTip}}</span>
                    <i class="el-icon-s-data" @click="showChartModel(item)"></i>
                </div>
                <div class="main-content">
                    <div class="strVal">
                        <div class="" v-for="(val,index) in  item.list" :key="index">
                            <div :class="{error:!val.status}">{{val.value}}</div>
                            <!-- <div :class="{error:!val.status}">浊度：{{val.TURB}} NTU</div>
                            <div :class="{error:!val.status}">余氯：{{val.FCHL}} ml/L</div> -->
                        </div>
                    </div>
                </div>
            </allwayshow-model>
        </template>
        <template v-if="model_monitor_point.shuiwei&&model_monitor_point.shuiwei.length>0">
            <allwayshow-model v-for="item in model_monitor_point.shuiwei" :modelVal="item" :key="item.id"
                              :style="{top:item.centerScreenY?(item.centerScreenY-76)+'px':'0px',left:item.centerScreenX?(item.centerScreenX-65)+'px':'0px'}">
                <div class="top-head" :style="{background: item.status? '#0b83fe':'#ff0000'}">
                    <span :title="item.modelTip">{{item.modelTip}}</span>
                </div>
                <div class="main-content">
                    <div class="strVal">
                        <div class="row">
                            <span :class="{error:!item.status}">{{item.value}}</span>
                            <i class="el-icon-s-data" @click="showChartModel(item)"></i>
                        </div>
                    </div>
                </div>
            </allwayshow-model>
        </template>
    </div>
</template>

<script>

    /**
     *  特别说明   该文件不是 公共组件！！！！！！！   是中转和业务集散地  是伪组件
     *
     */

    import * as esriLoader from 'esri-loader';

    import ToggleSk from '../../pages/home_tabs/sk/toggleSk';
    import ToggleWaterFactory from '../../pages/home_tabs/waterFactory/toggleWaterFactory';

    import PumpToggle from '../../pages/home_tabs/pump/pumpToggle';
    import PoolToggle from '../../pages/home_tabs/pool/poolToggle';
    import UserDevToggole from '../../pages/home_tabs/userDev/userDevToggole';
    import VideoPoint from '../../pages/home_tabs/monitorMsg_points/video';
    import WaterLevPoint from '../../pages/home_tabs/monitorMsg_points/waterLev';
    import PartToggle from '../../pages/home_tabs/part/partToggle';


    import AllwayshowModel from '../../pages/home_tabs/showAllModel/sModel';
    import DseLoadingAnimation from './DseLoadingAnimation';
    import DseSeparatingTabs from './DseSeparatingTabs';
    import DseBgModel from './toast/DseBgModel';
    import DseGisModel from './toast/DseGisModel';
    import DseNormalModel from './toast/DseNormalModel';

    import {formatDegree} from '../../utils/gisUtils';
    import {DSE} from '../../moduleConfig'

    import {
        getBzgcxx,
        getRzjcList,
        getScgcxx,
        getSljcList,
        getSzJcList,
        getYljcList
    } from '../../api/interfaces/oneMap_api';
    import {getStJcdBList} from '../../api/interfaces/system_api';

    let options = {
        url: DSE.arcgis_startJS,
        dojoConfig: DSE.gisConfig
    };
    esriLoader.loadCss(DSE.arcgis_mainCss);

    let exportBase64_func = null; //导出的 函数
    // let loadLayerAllData_func = null;
    let loadJSON_func = null;
    let popup_func = null;
    let highlight_func = null;
    let activePopupTool_func = null;
    let simulateAnalysis_func = null;

    // 绘制 轨迹线
    // eslint-disable-next-line no-unused-vars
    let trackLine_func = null;
    // 轨迹 跑
    // eslint-disable-next-line no-unused-vars
    let trajRun_func = null;

    // 轨迹的定时器
    let timer;

    // 水量的 图表
    let WATERCAPACITYCHART = null;

    // 实时监测的人的轨迹线
    let TRACKLINE_func = null;


    const FLOWMODULE = () => import('@/pages/home_tabs/monitorMsg_points/flow');
    const PRESSMODULE = () => import('@/pages/home_tabs/monitorMsg_points/press');
    const QCMODULE = () => import('@/pages/home_tabs/monitorMsg_points/qc');
    const VIDEOMODULE = () => import('@/pages/home_tabs/monitorMsg_points/video');
    const WATERMODULE = () => import('@/pages/home_tabs/monitorMsg_points/waterLev');

    //用于高亮
    let highlight = {
        defaultSymbol: null,
        symbols: {},
        graphics: []
    };
    let layerInfos = {};

    export default {
        name: 'dse-gisMap',
        components: {
            PartToggle,
            WaterLevPoint,
            VideoPoint,
            UserDevToggole,
            PoolToggle,
            DseNormalModel,
            DseGisModel,
            DseBgModel,
            DseSeparatingTabs,
            DseLoadingAnimation,
            AllwayshowModel,
            PumpToggle,
            ToggleWaterFactory,
            ToggleSk
        },
        data() {
            return {
                companyId: '',
                view: null,
                map: null,
                signPointLayer: null, // 签到点的 图层
                trackLineLayer: null, //轨迹线的  图层
                drawTools: null,
                distance: null,
                area: null,
                optionalLayers: {},
                optionalLayerViews: {},
                popupInfoWindow: {
                    x: '106.5977',
                    y: '38.1918',
                    centerScreenX: 0,
                    centerScreenY: 0,
                    isVisible: false, //除了 监测信息
                    width_: '400px',
                    modelTip: '管道详情',  // gis 弹窗的 标题
                    type: null, // 要显示的 哪个要素的弹窗
                    monitor_isVisiable: false,  //  监测信息 弹窗
                    graphic: null  //所属图形
                },
                pipeIndex: 0, // 管道 弹窗 tab 切换索引
                pipeTabs: ['基础信息', '全生命周期信息'],

                pumpId: '', //当前 索要查询的 泵站Id
                searchLists: [], // 带搜索的 列表
                searchPannelFlag: false, //默认搜索面板关闭
                searchListTop: '0px',
                searchListLeft: '0px',
                tooltipLists: [], // tooltip列表
                tooltipPannelFlag: false, //默认tooltip面板关闭
                tooltipListTop: '0px',
                tooltipListLeft: '0px',
                model_pipe_msg: {
                    detail: {
                        PIPE_NAME: '同心管道1',
                        CODE: 'GD001',
                        STARTEL: '20',
                        ENDEL: '15',
                        START_POINT: '106.3030,36.9132',
                        END_POINT: '106.3030,36.9132',
                        PIPE_LENGTH: '20',
                        PIPE_MATERIAL: '球墨铸铁',
                        PIPE_LEVEL: '1',
                        PIPE_RADIUS: 'DN200',
                        PIPE_DEEP: '12',
                        MANUFACTURER: '东深电子',
                        PRES_THRESHOLD: '12',
                        INSTALL_TIME: '2019-01-2 6:21',
                        ANTI_STYLE: '化学防腐',
                        USE_YEAR: '16',
                        STATUS: '0',
                        INTERFACE_TYPE: '螺栓连接',
                        CONSTRUCTION_DEPT: '东深电子股份有限公司',
                        DESIGN_DEPT: '东深电子股份有限公司',
                        SUPERVISOR_DEPT: '东深电子股份有限公司',
                        BUILD_DEPT: '东深电子股份有限公司'
                    },
                    lifeCycle: []
                },
                current_pipeId: '', //当前管道的Id
                model_fm_msg: {}, //阀门的信息
                model_jxj_msg: {}, //检修井
                model_xfs_msg: {}, //消防栓
                model_part_msg: {
                    supply: 12000,
                    execCost: 10000,
                    realCost: 2000,
                    blance: '200',
                    type: '1', // 1 代表 东部 分区 2 代表中部分区 3代表 西部分区
                    waterCapacityList: [], // 图表数据
                }, //监测站点的信息
                model_xunjian_msg: {
                    live: {},
                    repair: {},
                    danger: {}
                }, //巡检的弹窗
                model_monitor_point: {
                    flow: [],
                    flow_hidden: [],
                    press: [],
                    press_hidden: [],
                    qc: [],
                    qc_hidden: [],
                    video: [],
                    video_hidden: [],
                    shuiwei: [],
                    shuiwei_hidden: []
                },//监测站点的值和状态
                model_shuifei_msg: { //水费计收
                    sfjg: 0,
                    yssf: 0,
                    sssf: 2000,
                    gsbzl: 0
                },
                temp_id: '', //大弹窗的 要素ID
                contentTip: '', //大弹窗的 提示信息
                bgModelFlag: false, //大弹窗的显隐控制
                showAnimate: false, //默认 导出图片的缓冲弹窗关闭
                static_frontPath: '', // 静态资源前缀
                chartModel_flag: false,   //水流、水质、水压、视频 图表弹窗 控制
                monitor_waterComponent: '', //水质、水压、流量、视频的 二次弹窗
                baoGuanGraphic: null,
                popupGraphic: {},
                initName:'', //获取 当前点击的点图层的 名字
                local_staticPath:DSE.static_baseUrl, // 本地的 静态资源文件前缀
            };
        },
        methods: {
            drawAction(type) {
                let that = this;
                switch (type) {
                    case '1':

                        that.distance.clear();
                        that.area.clear();
                        that.drawTools.activate('circle');
                        break;
                    case '2':

                        that.distance.clear();
                        that.area.clear();

                        that.distance.start();
                        break;
                    case '3':

                        that.distance.clear();
                        that.area.clear();

                        that.drawTools.activate('polygon');
                        break;
                    case '4':

                        that.distance.clear();
                        that.area.clear();

                        break;
                }
            },

            exportWord(obj) {
                exportBase64_func(obj);
            },
            /**
             * 底图切换
             * @public
             * @param {Number} type - 底图绑定的整数
             * @returns {null}  - 没有返回值
             */
            changeMap(type) {
                let temp_index = parseInt(type) * 2 - 1;
                let temp_layers = this.map.basemap.baseLayers;
                // let temp_refs = this.map.basemap.referenceLayers;

                temp_layers.map((val, index) => {
                    if (index == temp_index || index == temp_index - 1) {
                        val.visible = true;
                    } else {
                        val.visible = false;
                    }
                });
                // temp_refs.map((val,index)=>{
                //   if(index==temp_index){
                //     val.visible = true;
                //   }else{
                //     val.visible = false;
                //   }
                // });
            },
            /**
             * 显隐图层
             * @public
             * @param {String} layerID - 图层ID
             * @param {Boolean} isShow - 是否显示
             * @returns {null}  - 没有返回值
             */
            setLayerVisible(layerID, isShow) {
              // console.log(layerID, isShow);
                let layer = this.map.findLayerById(layerID);
                if (!layer) return;
                layer.visible = isShow;
                if (layer.labelLayer) layer.labelLayer.visible = isShow;
                //如果没有初始加载数据，则加载数据
                window.gisConfig.optionalLayers.forEach(item => {
                    if (item.id == layerID && !item.initShow) {
                        // loadLayerAllData_func(layerID);
                        loadJSON_func(layerID);
                        item.initShow = true;//防止重复加载数据
                    }
                });

                //同步显隐infoWindow
                if (!isShow) {
                    switch (layerID) {
                        case 'liuliang':
                            this.model_monitor_point.flow_hidden = this.model_monitor_point.flow;
                            this.model_monitor_point.flow = [];
                            break;
                        case 'yali':
                            this.model_monitor_point.press_hidden = this.model_monitor_point.press;
                            this.model_monitor_point.press = [];
                            break;
                        case 'shuizhi':
                            this.model_monitor_point.qc_hidden = this.model_monitor_point.qc;
                            this.model_monitor_point.qc = [];
                            break;
                        case 'shipin':
                            this.model_monitor_point.video_hidden = this.model_monitor_point.video;
                            this.model_monitor_point.video = [];
                            break;
                        case 'shuiwei':
                            this.model_monitor_point.shuiwei_hidden = this.model_monitor_point.shuiwei;
                            this.model_monitor_point.shuiwei = [];
                            break;
                    }
                } else {
                    switch (layerID) {
                        case 'liuliang':
                            if (this.model_monitor_point.flow_hidden.length > 0) {
                                this.model_monitor_point.flow = this.model_monitor_point.flow_hidden;
                                this.model_monitor_point.flow_hidden = [];
                            }
                            break;
                        case 'yali':
                            if (this.model_monitor_point.press_hidden.length > 0) {
                                this.model_monitor_point.press = this.model_monitor_point.press_hidden;
                                this.model_monitor_point.press_hidden = [];
                            }
                            break;
                        case 'shuizhi':
                            if (this.model_monitor_point.qc_hidden.length > 0) {
                                this.model_monitor_point.qc = this.model_monitor_point.qc_hidden;
                                this.model_monitor_point.qc_hidden = [];
                            }
                            break;
                        case 'shipin':
                            if (this.model_monitor_point.video_hidden.length > 0) {
                                this.model_monitor_point.video = this.model_monitor_point.video_hidden;
                                this.model_monitor_point.video_hidden = [];
                            }
                            break;
                        case 'shuiwei':
                            if (this.model_monitor_point.shuiwei_hidden.length > 0) {
                                this.model_monitor_point.shuiwei = this.model_monitor_point.shuiwei_hidden;
                                this.model_monitor_point.shuiwei_hidden = [];
                            }
                            break;
                    }
                }
                //同步显隐popup及其高亮
                if (this.popupInfoWindow.graphic) {
                    if (this.popupInfoWindow.graphic.layer.id === layerID) {
                        if (isShow) {
                            this.popupInfoWindow.isVisible = true;
                            if (layerID == 'liuliang' || layerID == 'yali' || layerID == 'shuizhi' || layerID == 'shipin') {
                                this.popupInfoWindow.isVisible = false;
                            }
                        } else {
                            this.popupInfoWindow.isVisible = false;
                        }
                    }
                }
            },
            /**
             * 显隐分区填充区域
             * @public
             * @param {Boolean} isTransparent - 是否显示：true填充颜色
             * @returns {null}  - 没有返回值
             */
            setPartitionFill(isTransparent) {
                let layerConfigItem;
                window.gisConfig.optionalLayers.forEach(item => {
                    if (item.id == 'partition') {
                        layerConfigItem = item;
                    }
                });
                this.map.findLayerById('partition').graphics.forEach(function (graphic, i) {
                    if (!isTransparent) {
                        graphic.symbol.color = null;
                        let sym = graphic.symbol.clone();
                        graphic.symbol = sym;
                    } else {
                        graphic.symbol = layerConfigItem.symbol ? layerConfigItem.symbol : layerConfigItem.symbolFunc(graphic.attributes);
                    }
                });
            },
            gotoPartition(key) {
                switch (key) {
                    case '1-1':
                        var allExtent = null;
                        this.map.findLayerById('partition').graphics.forEach(function (graphic, i) {
                          if (graphic.attributes.id !== 3) {
                            if (allExtent) {
                                allExtent = allExtent.union(graphic.geometry.extent);
                            } else {
                                allExtent = graphic.geometry.extent.clone();
                            }
                          }
                        });
                        this.view.goTo(allExtent.expand(1.6));
                        break;
                    case '1-2':
                        this.map.findLayerById('partition').graphics.forEach(function (graphic, i) {
                            if (graphic.attributes.id === 0) {
                                this.view.goTo(graphic.geometry.extent.clone().expand(1.6));
                            }
                        }.bind(this));
                        break;
                    case '1-3':
                        this.map.findLayerById('partition').graphics.forEach(function (graphic, i) {
                            if (graphic.attributes.id === 1) {
                                this.view.goTo(graphic.geometry.extent.clone().expand(1.6));
                            }
                        }.bind(this));
                        break;
                    case '1-4':
                        this.map.findLayerById('partition').graphics.forEach(function (graphic, i) {
                            if (graphic.attributes.id === 2) {
                                this.view.goTo(graphic.geometry.extent.clone().expand(1.6));
                            }
                        }.bind(this));
                        break;
                    case '2-1':
                        this.map.findLayerById('partition').graphics.forEach(function (graphic, i) {
                            if (graphic.attributes.id === 3) {
                                this.view.goTo(graphic.geometry.extent.clone().expand(1.6));
                            }
                        }.bind(this));
                        break;
                }
            },
            /**
             * 显隐超期使用管道
             * @public
             * @param {Boolean} isShow - 是否显示
             * @returns {null}  - 没有返回值
             */
            setOverduePipelineVisible(isShow) {
                this.map.findLayerById('pipeline').graphics.forEach(function (item, i) {
                    if (item.attributes.overline) {
                        item.visible = isShow;
                    }
                });
            },
            /**
             * 按条件显隐官网数据,所有条件为null时显示所有管线，否则满足所有非null条件时显示，其它情况则隐藏
             * @public
             * @param {Object} obj - 过滤条件
             * @param {String} obj.start_time - 开始时间：如 2010 含
             * @param {String} obj.end_time - 结束时间：如 2019 含
             * @param {String} obj.areaItem - 分区，空字符表示全部
             * @param {String} obj.productItem - 管材
             * @param {String} obj.caliberItem - 管径
             * @param {String} obj.pipeName - 名称
             * @param {Boolean} obj.oldChecked - 超期管道是否显示：true显示
             * @returns {null} - 没有返回值
             */
            changShow(obj) {
                // console.log('过滤条件', obj);
                //清理之前的查询高亮
                highlight_func(null, 'query', '1');

                if (obj.start_time != '' || obj.end_time != '' || obj.areaItem != '' || obj.productItem != '全部管材'
                    || obj.caliberItem != '全部管径' || obj.pipeName != '' || obj.oldChecked != false) {
                    // console.log('过滤管线');
                    let changeLayerIDs = ['pipeline'];
                    changeLayerIDs.forEach(changeLayerID => {
                        this.map.findLayerById(changeLayerID).graphics.forEach(function (item, i) {
                            if (item.attributes === null) {//排除高亮图形
                                return;
                            }
                            let isHighlight = false;
                            if (obj.start_time != null && obj.start_time !== '' && obj.end_time != null && obj.end_time !== '') {
                                let geodate = null;
                                switch (changeLayerID) {
                                    case 'pipeline':
                                        geodate = new Date(item.attributes.installTime.replace(/-/g, '/'));
                                        break;
                                    // case 'manhole':
                                    // case 'fire_hydrant':
                                    // case 'valve':
                                    //   geodate = new Date(item.attributes.fixDate.replace(/-/g,'/'));
                                    //   break;
                                }
                                let date_start_time = new Date(obj.start_time + '/01/01');
                                let date_end_time = new Date(obj.end_time + '/12/31');
                                if (geodate === null) {
                                    isHighlight = false;
                                } else if (geodate <= date_start_time || geodate >= date_end_time) {
                                    isHighlight = false;
                                } else {
                                    isHighlight = true;
                                }
                            } else if (obj.areaItem != null && obj.areaItem !== '' && obj.areaItem !== item.attributes.areaId) {
                                isHighlight = false;
                            } else if (obj.productItem != null && obj.productItem != '全部管材' && item.attributes.pipeMaterial != obj.productItem) {
                                isHighlight = false;
                            } else if (obj.caliberItem != null && obj.caliberItem != '全部管径' && item.attributes.pipeRadius != obj.caliberItem) {
                                isHighlight = false;
                            } else if (obj.pipeName != null && obj.pipeName !== '' && item.attributes.name.indexOf(obj.pipeName) < 0) {
                                isHighlight = false;
                            } else if (obj.oldChecked != null && (obj.oldChecked == true && item.attributes.overLine != '1')) {
                                isHighlight = false;
                            } else {
                                isHighlight = true;
                            }
                            // item.visible = isHighlight;
                            if (isHighlight) {
                                highlight_func(item, 'query', '2');
                            }
                        });
                    });
                }
                //console.log('管线图形',this.map.findLayerById('pipeline').graphics);
                // let changeOtherLayerIDs = [];
                // if(obj.start_time != '' || obj.end_time != '' || obj.areaItem != '' || obj.jxjName != ''){
                //   changeOtherLayerIDs.push('manhole');
                // }
                // if(obj.start_time != '' || obj.end_time != '' || obj.areaItem != '' || obj.xfsName != ''){
                //   changeOtherLayerIDs.push('fire_hydrant');
                // }
                // if(obj.start_time != '' || obj.end_time != '' || obj.areaItem != '' || obj.fmName != ''){
                //   changeOtherLayerIDs.push('valve');
                // }
                // console.log('过滤其它', changeOtherLayerIDs);
                // let changeOtherLayerIDs = ['manhole','fire_hydrant','valve'];
                // changeOtherLayerIDs.forEach(changeLayerID => {
                //   let objname = null;
                //     switch(changeLayerID){
                //         case 'manhole':
                //           objname = 'jxjName';
                //           break;
                //         case 'fire_hydrant':
                //           objname = 'xfsName';
                //           break;
                //         case 'valve':
                //           objname = 'fmName';
                //           break;
                //     }
                //   this.map.findLayerById(changeLayerID).graphics.forEach(function(item, i){
                //     if(item.attributes === null){//排除高亮图形
                //       return;
                //     }
                //     let isHighlight = false;
                //     if(obj.start_time != null && obj.start_time !== '' && obj.end_time != null && obj.end_time !== ''){
                //       let geodate = null;
                //       switch(changeLayerID){
                //         case 'manhole':
                //         case 'fire_hydrant':
                //         case 'valve':
                //           geodate = new Date(item.attributes.fixDate.replace(/-/g,'/'));
                //           break;
                //       }
                //       let date_start_time = new Date(obj.start_time + '/01/01');
                //       let date_end_time = new Date(obj.end_time + '/12/31');
                //       if(geodate === null){
                //         isHighlight = false;
                //       }else if(geodate <= date_start_time || geodate >= date_end_time){
                //         isHighlight = false;
                //       }else{
                //         isHighlight = true;
                //       }
                //     }
                //     else if(obj.areaItem != null && obj.areaItem !== '' && obj.areaItem !== item.attributes.areaId){
                //       isHighlight = false;
                //     }
                //     else if(obj[objname] != null && obj[objname] !== '' && item.attributes.name.indexOf(obj[objname]) < 0){
                //       isHighlight = false;
                //     }
                //     else{
                //       isHighlight = true;
                //     }
                //     // item.visible = isHighlight;
                //     if(isHighlight){
                //       highlight_func(item,'query','2');
                //     }
                //   });
                // });
            },
            /**
             * 显示popup窗口
             * @public
             * @param {String} layerID - 图层id
             * @param {String} id - 图形id
             * @param {Boolean} isCenter - 图形的定位点是否移动到地图中心：true移动地图中心
             * @returns {Boolean} - 有对应的空间数据时返回true，没有对应空间数据时返回false
             */
            popup(layerID, id, isCenter) {
                let graphic = this.map.findLayerById(layerID).graphics.find(graphic => {
                    if (graphic.attributes) {
                        return graphic.attributes.id == id;
                    }
                });
                if (graphic) {
                    this.popupGraphic = graphic;

                    if (isCenter) {
                        if (graphic.geometry.type === 'point') {
                            this.view.goTo(graphic);
                        } else {
                            this.view.goTo(graphic.geometry.clone().extent.expand(2.2));
                        }
                    }
                    highlight_func(graphic, 'popup', '1');
                    popup_func(graphic);
                    return true;
                } else {
                    console.log('没有此ID对应的空间数据', layerID, id);
                    return false;
                }
            },
            /**
             * 关闭popup，并取消所有高亮效果
             * @public
             * @returns {null} - 没有返回值
             */
            closePopup() {
                this.popupInfoWindow.graphic = null;
                this.popupInfoWindow.isVisible = false;
                this.bgModelFlag = false;
                //取消所有高亮效果
                highlight_func(null, 'popup', '1');
            },
            //激活popup工具
            activePopupTool() {
                this.popupToolHandle = activePopupTool_func();
            },
            deactivePopupTool() {
                if (this.popupToolHandle) {
                    this.popupToolHandle.remove();
                    this.popupToolHandle = null;
                }
            },
            /**
             * 开始关阀模拟分析
             * @returns {null} 无返回值
             */
            simulateAnalysis() {
                simulateAnalysis_func();
            },
            clearSimulateAnalysis() {
                if (this.simulateHandle) {
                    this.activePopupTool();
                    if (this.simulateHandle) {
                        this.simulateHandle.remove();
                        this.simulateHandle = null;
                    }
                    if (this.baoGuanGraphic) {
                        this.view.graphics.remove(this.baoGuanGraphic);
                        this.baoGuanGraphic = null;
                    }
                }
            },
            // loadLayerAllData(layerID){
            //   loadLayerAllData_func(layerID);
            // },
            /**
             * 加载地图、底图、图层、popup
             * @private
             * @returns {null} - 没有返回值
             */
            loadGis() {
                let that = this;
                // dse.layers.2d.baseMap.Gaode
                esriLoader.loadModules(['dojo/on', 'esri/Map', 'esri/views/MapView', 'esri/Graphic',
                    'esri/layers/GraphicsLayer', 'esri/layers/WebTileLayer', 'dse//modules/toolbars/_Draw', 'dse/modules/measure/_measureDistance',
                    'dse/modules/measure/_measureArea', 'dse/utils/ExportImg', 'esri/geometry/Point', 'esri/geometry/Polyline', 'esri/geometry/Polygon',
                    'esri/widgets/CoordinateConversion', 'esri/symbols/PictureMarkerSymbol', 'esri/geometry/support/webMercatorUtils', 'dojo/domReady!'], options)
                    .then(([on, Map, MapView, Graphic, GraphicsLayer, WebTileLayer, _Draw, _measureDistance, _measureArea, ExportImg
                               , Point, Polyline, Polygon, CoordinateConversion, PictureMarkerSymbol, webMercatorUtils]) => {
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

                        // 105.916571 36.989498   105.97957, 36.9786
                        that.view = new MapView({
                            container: 'gisMap',
                            map: that.map,
                            zoom: 11,
                            // center: [106.462165, 36.96828],
                            center: [116.10278,32.90839],
                            ui: {
                                components: ['zoom']
                            }
                        });
                        //添加地图约束条件
                        if (window.gisConfig.minScale != undefined) {
                            that.view.constraints.minScale = window.gisConfig.minScale;
                        }
                        if (window.gisConfig.maxScale != undefined) {
                            that.view.constraints.maxScale = window.gisConfig.maxScale;
                        }
                        if (window.gisConfig.snapToZoom != undefined) {
                            that.view.constraints.snapToZoom = window.gisConfig.snapToZoom;
                        }
                        if (window.gisConfig.rotationEnabled != undefined) {
                            that.view.constraints.rotationEnabled = window.gisConfig.rotationEnabled;
                        }

                        that.drawTools = new _Draw({
                            view: that.view
                        });
                        that.distance = new _measureDistance({
                            view: that.view
                        });
                        that.area = new _measureArea({
                            view: that.view
                        });

                        //配置文件中自带空间数据  如果 配置文件里面有数据 就直接加载数据，没有就从接口里面拽去数据
                        loadJSON_func = function (layerID) {
                            let layer = that.map.findLayerById(layerID);
                            let layerInfo = layerInfos[layerID];

                            // 渲染 当前 页面的 要素
                           function inner_draw(features){
                                features.forEach(feature => {
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

                                    //添加文字标注
                                    if (layerInfo.label) {
                                        let textGraphic = graphic.clone();
                                        textGraphic.symbol = layerInfo.label(graphic.attributes);
                                        if (graphic.geometry) {
                                            if (graphic.geometry.type === 'polygon' || graphic.geometry.type === 'polyline') {
                                                textGraphic.geometry = new Point({
                                                    x: graphic.attributes.label_x,
                                                    y: graphic.attributes.label_y,
                                                    spatialReference: 4326
                                                });
                                            }
                                        }
                                        layer.labelLayer.graphics.add(textGraphic);
                                    }
                                });
                            }


                            if (layerInfo.features.length>0) {
                                inner_draw( layerInfo.features);
                            }else{

                                let promiseFetch = null;
                                switch (layerID) {
                                    case 'shuichang':
                                        promiseFetch =getScgcxx({
                                            'adcd': '',
                                            'keyname': '',
                                            'pageNum':'1',
                                            'pageSize': '10000'
                                        },that);
                                        break;
                                    case 'bengzhan':
                                        promiseFetch = getBzgcxx({
                                            adcd:'',
                                            keyname:'',
                                            pageNum:'1',
                                            pageSize:'10000'
                                        });
                                        break;
                                    case 'shuizhi':
                                        promiseFetch = getSzJcList({
                                            adcd:'',
                                            keyname:''
                                        },that);
                                        break;
                                    case 'yali':
                                        promiseFetch = getYljcList({
                                            adcd:'',
                                            keyname:''
                                        },that);
                                        break;
                                    case 'liuliang':
                                        promiseFetch = getSljcList({
                                            adcd:'',
                                            keyname:''
                                        },that);
                                        break;
                                    case 'shuiwei':
                                        promiseFetch = getRzjcList({
                                            adcd:'',
                                            keyname:''
                                        },that);
                                        break;
                                    case 'shipin':
                                        promiseFetch = getStJcdBList({
                                            jctype:'5'
                                        },that);
                                        break;
                                }

                                if(layerID=='shuichang')
                                {
                                    promiseFetch.then(res=>{
                                        let {data} = res;
                                        let {list} = data;
                                        list = list&&list.length>0?list:[];
                                        list.map(val=>{
                                            layerInfo.features.push({
                                                attributes:{
                                                    ...val,
                                                    value:val.q,
                                                    normalVal:val.q+2,
                                                    eleId:val.wfctCd,
                                                    id:val.wfctCd,
                                                    name:val.wfctnm,
                                                    status:val.jcTypeNm?true:false
                                                },
                                                geometry:{
                                                    x:val.lgtd,
                                                    y:val.lttd
                                                }
                                            }) ;
                                        });
                                        inner_draw(layerInfo.features);
                                    });
                                }else if(layerID=='bengzhan')
                                {
                                        promiseFetch.then(res=>{
                                            let {data} = res;
                                            let {list} = data;
                                            list = list&&list.length>0?list:[];
                                            list.map(val=>{
                                                layerInfo.features.push({
                                                    attributes:{
                                                        ...val,
                                                        eleId:val.pumpCd,
                                                        id:val.pumpCd,
                                                        name:val.pumpNm,
                                                        status:val.jcTypeNm?true:false
                                                    },
                                                    geometry:{
                                                        x:val.lgtd,
                                                        y:val.lttd
                                                    }
                                                }) ;
                                            });
                                            inner_draw(layerInfo.features);
                                        });

                                }else if(layerID=='shuizhi')
                                {
                                    promiseFetch.then(res=>{
                                        let {data} = res;
                                        data = data&&data.length>0?data:[];
                                        data.map(val=>{
                                            layerInfo.features.push({
                                                attributes:{
                                                    ...val,
                                                    value:0.32,
                                                    normalVal:'≤0.5',
                                                    id:val.stcd,
                                                    eleId:val.stcd,
                                                    name:val.stnm,
                                                    area:val.adnm,
                                                    time:val.tm,
                                                    status:val.warnCount&&parseInt(val.warnCount)>0?true:false,
                                                    paramsItem:[
                                                        {
                                                            value:val.ph,
                                                            normalVal:val.phRange,
                                                            type:'PH'
                                                        },
                                                        {
                                                            value:val.turb,
                                                            normalVal:val.turbRange,
                                                            type:'turb'
                                                        },
                                                        {
                                                            value:val.chl,
                                                            normalVal:val.chlRange,
                                                            type:'cl'
                                                        }
                                                    ]
                                                },
                                                geometry:{
                                                    x:val.lgtd,
                                                    y:val.lttd
                                                }
                                            }) ;
                                        });
                                        console.log(layerInfo.features);
                                        inner_draw(layerInfo.features);
                                    });
                                }else if(layerID=='liuliang')
                                {
                                    promiseFetch.then(res=>{
                                        let {data} = res;
                                        data = data&&data.length>0?data:[];
                                        data.map(val=>{
                                            layerInfo.features.push({
                                                attributes:{
                                                    ...val,
                                                    value:0.32,
                                                    normalVal:'≤0.5',
                                                    id:val.stcd,
                                                    eleId:val.stcd,
                                                    name:val.stnm,
                                                    area:val.adnm,
                                                    time:val.tm,
                                                    status:val.warnCount&&parseInt(val.warnCount)>0?true:false
                                                },
                                                geometry:{
                                                    x:val.lgtd,
                                                    y:val.lttd
                                                }
                                            }) ;
                                        });
                                        console.log(layerInfo.features);
                                        inner_draw(layerInfo.features);
                                    });
                                }else if(layerID=='shuiwei')
                                {
                                    promiseFetch.then(res=>{
                                        let {data} = res;
                                        data = data&&data.length>0?data:[];
                                        data.map(val=>{
                                            layerInfo.features.push({
                                                attributes:{
                                                    ...val,
                                                    value:0.32,
                                                    normalVal:'≤0.5',
                                                    id:val.stcd,
                                                    eleId:val.stcd,
                                                    name:val.stnm,
                                                    area:val.adnm,
                                                    time:val.tm,
                                                    status:val.warnCount&&parseInt(val.warnCount)>0?true:false
                                                },
                                                geometry:{
                                                    x:val.lgtd,
                                                    y:val.lttd
                                                }
                                            }) ;
                                        });
                                        console.log(layerInfo.features);
                                        inner_draw(layerInfo.features);
                                    });
                                }else if(layerID=='yali')
                                {
                                    promiseFetch.then(res=>{
                                        let {data} = res;
                                        data = data&&data.length>0?data:[];
                                        data.map(val=>{
                                            layerInfo.features.push({
                                                attributes:{
                                                    ...val,
                                                    value:0.32,
                                                    normalVal:'≤0.5',
                                                    id:val.stcd,
                                                    eleId:val.stcd,
                                                    name:val.stnm,
                                                    area:val.adnm,
                                                    time:val.tm,
                                                    status:val.warnCount&&parseInt(val.warnCount)>0?true:false
                                                },
                                                geometry:{
                                                    x:val.lgtd,
                                                    y:val.lttd
                                                }
                                            }) ;
                                        });
                                        console.log(layerInfo.features);
                                        inner_draw(layerInfo.features);
                                    });
                                }
                                return ;
                            }
                            //显示infoWindow
                            showInfoWindows(layerInfo.id);
                            //如果图层制定了聚类功能，则发送事件，必须放在图层和infoWindow之后
                            if (layerInfo.clusterGroup) {
                                that.$emit('cluster-update', layerInfo.id);
                            }
                        };



                        //显示infoWindow
                        function showInfoWindows(layerid, dataIDs) {
                            let mps;
                            switch (layerid) {
                                case 'liuliang':  // 流量
                                    that.map.findLayerById(layerid).graphics.forEach(graphic => {
                                        mps = that.view.toScreen(graphic.geometry);
                                        let obj = {
                                            x: graphic.geometry.x,
                                            y: graphic.geometry.y,
                                            centerScreenX: mps.x,
                                            centerScreenY: mps.y,
                                            modelTip: graphic.attributes.name,  // gis 弹窗的 标题
                                            status: graphic.attributes.status,
                                            id: graphic.attributes.id,
                                            layerID: layerid,
                                            list: [],
                                            graphic: graphic,
                                            value: graphic.attributes.value + 'm³/s'
                                        };
                                        that.model_monitor_point.flow.push(obj);
                                    });
                                    break;
                                case 'yali':  // 压力
                                    that.map.findLayerById(layerid).graphics.forEach(graphic => {
                                        mps = that.view.toScreen(graphic.geometry);
                                        let obj = {
                                            x: graphic.geometry.x,
                                            y: graphic.geometry.y,
                                            centerScreenX: mps.x,
                                            centerScreenY: mps.y,
                                            modelTip: graphic.attributes.name,  // gis 弹窗的 标题
                                            value: graphic.attributes.value + 'MPa',
                                            status: graphic.attributes.status,
                                            id: graphic.attributes.id,
                                            layerID: layerid,
                                            list: [],
                                            graphic: graphic
                                        };
                                        that.model_monitor_point.press.push(obj);
                                    });
                                    break;
                                case 'shuizhi':  // 水质
                                    that.map.findLayerById(layerid).graphics.forEach(graphic => {
                                        mps = that.view.toScreen(graphic.geometry);
                                        let obj = {
                                            x: graphic.geometry.x,
                                            y: graphic.geometry.y,
                                            centerScreenX: mps.x,
                                            centerScreenY: mps.y,
                                            modelTip: graphic.attributes.name,  // gis 弹窗的 标题
                                            value: graphic.attributes.value + 'MPa',
                                            status: graphic.attributes.status,
                                            id: graphic.attributes.id,
                                            layerID: layerid,
                                            list: graphic.attributes.paramsItem,
                                            graphic: graphic
                                        };
                                        that.model_monitor_point.qc.push(obj);
                                    });
                                    break;
                                case 'shipin':  // 视频
                                    break;
                                case 'shuiwei':  // 水位
                                    that.map.findLayerById(layerid).graphics.forEach(graphic => {
                                        mps = that.view.toScreen(graphic.geometry);
                                        let obj = {
                                            x: graphic.geometry.x,
                                            y: graphic.geometry.y,
                                            centerScreenX: mps.x,
                                            centerScreenY: mps.y,
                                            modelTip: graphic.attributes.name,  // gis 弹窗的 标题
                                            status: graphic.attributes.status,
                                            id: graphic.attributes.id,
                                            layerID: layerid,
                                            list: [],
                                            graphic: graphic,
                                            value: graphic.attributes.value + 'm'
                                        };
                                        that.model_monitor_point.shuiwei.push(obj);
                                    });
                                    break;
                            }
                        }

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
                                if (item.label) {
                                    layer.labelLayer = new GraphicsLayer({
                                        id: item.id + '_label',
                                        maxScale: item.maxScale ? item.maxScale : 0,
                                        minScale: item.minScale ? item.minScale : 0,
                                        graphics: []
                                    });
                                    that.map.add(layer.labelLayer);
                                }
                                //如果初始配置显示为true，则加载数据
                                if (item.initShow) {
                                    loadJSON_func(item.id);
                                }
                            });
                        }

                        //添加图层，图层顺序按照配置文件中的顺序添加，图层数据后面根据实际情况添加
                        if (window.gisConfig && window.gisConfig.optionalLayers && window.gisConfig.optionalLayers.length) {
                            window.gisConfig.optionalLayers.forEach(item => {
                                layerInfos[item.id] = item;

                                let layer = new GraphicsLayer({
                                    id: item.id,
                                    maxScale: item.maxScale ? item.maxScale : 0,
                                    minScale: item.minScale ? item.minScale : 0,
                                    graphics: []
                                });
                                that.map.add(layer);
                                that.$set(that.optionalLayers, item.id, layer);
                                if (item.label) {
                                    layer.labelLayer = new GraphicsLayer({
                                        id: item.id + '_label',
                                        maxScale: item.maxScale ? item.maxScale : 0,
                                        minScale: item.minScale ? item.minScale : 0,
                                        graphics: []
                                    });
                                    that.map.add(layer.labelLayer);
                                }
                                //如果初始配置显示为true，则加载数据
                                if (item.initShow) {
                                    loadJSON_func(item.id);
                                }
                                //
                                if (item.clusterGroup) {
                                    layer.watch('visible', (newValue, oldValue, propertyName, target) => {
                                        // console.log('watch visible',newValue,target);
                                        if (newValue) {
                                            if (!clusterlayerIDs.some(id => {
                                                return id === target.id;
                                            })) {
                                                clusterlayerIDs.push(target.id);
                                            }
                                        } else {
                                            if (clusterlayerIDs.some(id => {
                                                return id === target.id;
                                            })) {
                                                clusterlayerIDs.splice(clusterlayerIDs.indexOf(target.id), 1);
                                            }
                                        }
                                        // console.log('watch visible  clusterlayerIDs',clusterlayerIDs);
                                        cluster_func(clusterlayerIDs);
                                    });
                                }
                            });
                        }

                        //获取配置文件中的高亮设置信息
                        if (window.gisConfig && window.gisConfig.defaultHighlight) {
                            highlight.defaultSymbol = window.gisConfig.defaultHighlight;
                        }
                        // else{
                        //   console.log('请先配置高亮符号！');
                        // }
                        if (window.gisConfig && window.gisConfig.optionalLayers && window.gisConfig.optionalLayers.length) {
                            window.gisConfig.optionalLayers.forEach(item => {
                                highlight.symbols[item.id] = item.highlight ? item.highlight : null;
                            });
                        }

                        /**
                         * 高亮某个图形
                         * 设计思路：按触发高亮的类型、高亮优先级，值越小优先级越高，优先级只针对高亮图形本身的所有高亮类型
                         * 叠加时新增一个graphic（与原graphic在同一个图层）用于高亮，不叠加时替换原graphic的symbol
                         * 在配置文件中各图层可以配置自己的高亮信息，没有配置时取默认高亮信息defaultHighlight
                         * @param {Graphic} graphic - 需要高亮的图形
                         * @param {String} type - 触发类型：popup、query
                         * @param {String} [clearType = '0'] - 清理类型：0：清理所有高亮，1：清理本触发类型的所有高亮，2：不处理之前的高亮，3：只清理此图形的触发类型的高亮
                         * @returns {null} - 没有返回值
                         */
                        highlight_func = function (graphic, type, clearType = '0') {
                            //高亮清理相关处理
                            switch (clearType) {
                                case '0':
                                    // highlight.graphics.forEach(gc => {

                                    // });
                                    // highlight.graphics = [];
                                    break;
                                case '1':
                                    // console.log('高亮清理1',highlight);
                                    for (let i = 0; i < highlight.graphics.length; i++) {
                                        let gc = highlight.graphics[i];
                                        if (type == 'popup') {
                                            if (gc[type]) {//已存在
                                                if (gc[type].symbol !== undefined) {//以覆盖方式存在
                                                    gc.layer.graphics.remove(gc[type]);
                                                    gc[type] = null;
                                                    //如果存在query
                                                    if (gc['query']) {
                                                        if (gc['query'].symbol !== undefined) {//以覆盖方式存在
                                                            gc.layer.graphics.add(gc['query']);
                                                        } else {
                                                            gc.symbol = gc['query'];
                                                        }
                                                    } else {
                                                        highlight.graphics.splice(i, 1);
                                                        i--;
                                                    }
                                                } else {//以符号方式存在
                                                    gc[type] = null;
                                                    if (gc['query']) {
                                                        if (gc['query'].symbol !== undefined) {//以覆盖方式存在
                                                            gc.layer.graphics.add(gc['query']);
                                                            gc.symbol = gc.symbol_old;
                                                            gc.symbol_old = null;
                                                        } else {
                                                            gc.symbol = gc['query'];
                                                        }
                                                    } else {//不存在query
                                                        gc.symbol = gc.symbol_old;
                                                        gc.symbol_old = null;
                                                        highlight.graphics.splice(i, 1);
                                                        i--;
                                                    }
                                                }
                                            }
                                            // else{//不存在
                                            // }
                                        } else if (type == 'query') {
                                            if (gc[type]) {//已存在
                                                if (gc['popup']) {//已存在
                                                    gc[type] = null;
                                                } else {//popup不存在
                                                    if (gc[type]) {//'query'存在
                                                        if (gc[type].symbol !== undefined) {//以覆盖方式存在
                                                            gc.layer.graphics.remove(gc[type]);
                                                        } else {
                                                            gc.symbol = gc.symbol_old;
                                                            gc.symbol_old = null;
                                                        }
                                                        gc[type] = null;
                                                        highlight.graphics.splice(i, 1);
                                                        i--;
                                                    } else {//'query'不存在
                                                        highlight.graphics.splice(i, 1);
                                                        i--;
                                                    }
                                                }
                                            }
                                            // else{//不存在
                                            // }
                                        }
                                    }
                                    break;
                                case '2':
                                    break;
                                case '3':
                                    break;
                            }
                            if (graphic == null) {
                                return;
                            }

                            //高亮符号
                            let symbol = null;
                            let isOver = null;
                            if (highlight.defaultSymbol) {
                                symbol = highlight.defaultSymbol[type].func(graphic);
                                isOver = highlight.defaultSymbol[type].isOver;
                            }
                            if (highlight.symbols[graphic.layer.id]) {
                                symbol = highlight.symbols[graphic.layer.id][type].func(graphic.attributes);
                                isOver = highlight.symbols[graphic.layer.id][type].isOver;
                            }
                            if (symbol == null) {
                                return;
                            }
                            //是否叠加
                            let newGraphic = null;
                            if (isOver) {
                                newGraphic = new Graphic();
                                newGraphic.geometry = graphic.geometry.clone();
                                newGraphic.symbol = symbol;
                            }
                            //popup在最上，query过滤其次
                            if (newGraphic) {
                                if (type == 'popup') {
                                    if (graphic[type]) {//已存在popup高亮
                                        //判断已存在popup高亮是graphic还是symbol
                                        if (graphic[type].symbol === undefined) {//是symbol
                                            graphic.layer.graphics.add(newGraphic);
                                            if (graphic['query']) {
                                                if (graphic['query'] === undefined) {//是symbol
                                                } else {
                                                    graphic.symbol = graphic.symbol_old;
                                                    graphic.symbol_old = null;
                                                }
                                            } else {//不存在query
                                                graphic.symbol = graphic.symbol_old;
                                                graphic.symbol_old = null;
                                            }
                                        } else {
                                            graphic.layer.graphics.remove(graphic[type]);
                                            graphic.layer.graphics.add(newGraphic);
                                        }
                                    } else {//不存在popup高亮
                                        if (graphic['query']) {
                                            //判断已存在query高亮是graphic还是symbol
                                            if (graphic['query'].symbol === undefined) {//是symbol
                                                graphic.symbol = graphic.symbol_old;
                                                graphic.symbol_old = null;
                                                graphic.layer.graphics.add(newGraphic);
                                            } else {
                                                graphic.layer.graphics.add(newGraphic);
                                            }
                                        } else {
                                            graphic.layer.graphics.add(newGraphic);
                                            highlight.graphics.push(graphic);
                                        }
                                    }
                                } else if (type == 'query') {
                                    //如果存在popup高亮，则不改变符号，只保存query高亮信息
                                    if (!graphic['popup']) {//不存在popup高亮
                                        if (graphic[type]) {//存在query高亮
                                            //如果之前是覆盖方式高亮则先删除
                                            if (graphic[type].symbol !== undefined) {
                                                graphic.layer.graphics.remove(graphic[type]);
                                                // graphic.layer.graphics.add(newGraphic,graphic.layer.graphics.indexOf(graphic) + 1);
                                                graphic.layer.graphics.add(newGraphic);
                                            } else {//符号
                                                graphic.symbol = graphic.symbol_old;
                                                graphic.symbol_old = null;
                                                // graphic.layer.graphics.add(newGraphic,graphic.layer.graphics.indexOf(graphic) + 1);
                                                graphic.layer.graphics.add(newGraphic);
                                            }
                                        } else {
                                            // graphic.layer.graphics.add(newGraphic,graphic.layer.graphics.indexOf(graphic) + 1);
                                            graphic.layer.graphics.add(newGraphic);
                                            highlight.graphics.push(graphic);
                                        }
                                    }
                                }
                                graphic[type] = newGraphic;
                            } else {
                                if (type == 'popup') {
                                    //如果query义覆盖的方式存在，则需要将query对应的newGraphic从图层中删除
                                    if (graphic['query'] && graphic['query'].symbol !== undefined) {
                                        graphic['query'].layer.graphics.remove(graphic['query']);
                                        graphic.symbol = graphic.symbol_old;
                                    }

                                    if (graphic[type]) {//已存在popup高亮
                                        //判断已存在popup高亮是graphic还是symbol
                                        if (graphic[type].symbol === undefined) {//是symbol
                                            graphic.symbol = symbol;
                                        } else {
                                            graphic[type].layer.graphics.remove(graphic[type]);
                                            graphic.symbol = symbol;
                                        }
                                    } else {//不存在popup高亮
                                        graphic.symbol = symbol;
                                    }
                                } else if (type == 'query') {
                                    //如果存在popup高亮
                                    if (graphic['popup']) {
                                        //之前是覆盖方式高亮
                                        if (graphic['popup'].symbol !== undefined) {
                                            if (graphic[type].symbol !== undefined) {//之前是覆盖方式高亮
                                                graphic.symbol_old = graphic.symbol;
                                            }
                                        }
                                        // else{//符号
                                        // }
                                    } else {//不存在popup高亮
                                        if (graphic[type]) {//存在
                                            if (graphic[type].symbol !== undefined) {//之前是覆盖方式高亮
                                                graphic.layer.graphics.remove(graphic[type]);
                                                graphic.symbol_old = symbol;
                                                graphic.symbol = symbol;
                                            } else {//符号
                                                graphic.symbol = symbol;
                                            }
                                        } else {//不存在
                                            graphic.symbol_old = symbol;
                                            graphic.symbol = symbol;
                                            highlight.graphics.push(graphic);
                                        }
                                    }
                                }

                                graphic[type] = symbol;
                            }
                            // if(!highlight.graphics.some(item => {
                            //   return item === graphic;
                            // })){
                            //   highlight.graphics.push(graphic);
                            // }
                        };

                        //popup或infoWindow随地图移动
                        that.view.watch('extent', () => {
                            //popup随地图移动
                            if (that.popupInfoWindow.isVisible) {
                                var mapPoint = new Point({
                                    x: that.popupInfoWindow.x,
                                    y: that.popupInfoWindow.y,
                                    spatialReference: {
                                        wkid: 4326
                                    }
                                });
                                let mps = that.view.toScreen(mapPoint);
                                that.popupInfoWindow.centerScreenX = mps.x;
                                that.popupInfoWindow.centerScreenY = mps.y;
                                // let popupDom = document.getElementById('dse-popup-window');
                                // that.popupInfoWindow.centerScreenY = mps.y - popupDom.offsetHeight / 2;
                            }
                            //infoWindow随地图移动
                            let video = that.model_monitor_point.video.concat(that.model_monitor_point.video_hidden);
                            if (video) {
                                video.forEach(item => {
                                    var mapPoint = new Point({
                                        x: item.x,
                                        y: item.y,
                                        spatialReference: {
                                            wkid: 4326
                                        }
                                    });
                                    let mps = that.view.toScreen(mapPoint);
                                    item.centerScreenX = mps.x;
                                    item.centerScreenY = mps.y;
                                    // that.$refs.moreModel.toggleShowModel('video',that.model_monitor_point.video);
                                });
                            }
                            let flow = that.model_monitor_point.flow.concat(that.model_monitor_point.flow_hidden);
                            if (flow) {
                                flow.forEach(item => {
                                    var mapPoint = new Point({
                                        x: item.x,
                                        y: item.y,
                                        spatialReference: {
                                            wkid: 4326
                                        }
                                    });
                                    let mps = that.view.toScreen(mapPoint);
                                    item.centerScreenX = mps.x;
                                    item.centerScreenY = mps.y;
                                });
                                // that.$refs.moreModel.toggleShowModel('flow',that.model_monitor_point.flow);
                            }
                            let press = that.model_monitor_point.press.concat(that.model_monitor_point.press_hidden);
                            if (press) {
                                press.forEach(item => {
                                    var mapPoint = new Point({
                                        x: item.x,
                                        y: item.y,
                                        spatialReference: {
                                            wkid: 4326
                                        }
                                    });
                                    let mps = that.view.toScreen(mapPoint);
                                    item.centerScreenX = mps.x;
                                    item.centerScreenY = mps.y;
                                });
                                // that.$refs.moreModel.toggleShowModel('press',that.model_monitor_point.press);
                            }
                            let qc = that.model_monitor_point.qc.concat(that.model_monitor_point.qc_hidden);
                            if (qc) {
                                qc.forEach(item => {
                                    var mapPoint = new Point({
                                        x: item.x,
                                        y: item.y,
                                        spatialReference: {
                                            wkid: 4326
                                        }
                                    });
                                    let mps = that.view.toScreen(mapPoint);
                                    item.centerScreenX = mps.x;
                                    item.centerScreenY = mps.y;
                                });
                                // that.$refs.moreModel.toggleShowModel('qc',that.model_monitor_point.qc);
                            }
                            let shuiwei = that.model_monitor_point.shuiwei.concat(that.model_monitor_point.shuiwei_hidden);
                            if (shuiwei) {
                                shuiwei.forEach(item => {
                                    var mapPoint = new Point({
                                        x: item.x,
                                        y: item.y,
                                        spatialReference: {
                                            wkid: 4326
                                        }
                                    });
                                    let mps = that.view.toScreen(mapPoint);
                                    item.centerScreenX = mps.x;
                                    item.centerScreenY = mps.y;
                                });
                                // that.$refs.moreModel.toggleShowModel('shuiwei',that.model_monitor_point.shuiwei);
                            }
                        });

                        // 鼠标悬浮在图层上 变成 ‘手爪’
                        that.view.on('pointer-move',function (event) {

                        that.view.hitTest(event).then(function (res) {
                            if(res.results.length){
                            document.getElementsByTagName('body')[0].style.cursor = 'pointer';
                            }else{
                            document.getElementsByTagName('body')[0].style.cursor = 'default';
                            }
                        });
                        });

                        that.view.ui.add('gisModel', 'manual');

                        var ccWidget = new CoordinateConversion({
                            multipleConversions: false,
                            view: that.view
                        });
                        ccWidget.formats = ccWidget.formats.filter(function (item, i) {
                            if (item.name == 'xy') {
                                // item.name = '经纬度';
                                return item;
                            }
                        });
                        // that.view.ui.add(ccWidget,'bottom-right');

                        //点击显示popup
                        activePopupTool_func = function () {
                            return that.view.on('click', (event) => {
                                timestamp = 0;
                                that.tooltipPannelFlag = false;

                                that.view.hitTest(event).then(function (response) {
                                    //  console.log('click',response);
                                    if (response.results.length) {
                                        let filterLayers = []; //受保护的 业务图层 也就是需要弹窗的业务图层
                                        let resList = response.results;

                                        let configList = window.gisConfig.optionalLayers;
                                        for (let i = 0; i < configList.length; i++) {
                                            for (let j = 0; j < resList.length; j++) {
                                                if (resList[j].graphic.attributes !== null) {//排除高亮图形
                                                    if (configList[i].id == resList[j].graphic.layer.id) {
                                                        filterLayers.push({
                                                            name: resList[j].graphic.attributes.name,
                                                            layerID: resList[j].graphic.layer.id,
                                                            eleId: resList[j].graphic.attributes.id,
                                                            geometry: resList[j].graphic.geometry,
                                                            code: resList[j].graphic.attributes.id,
                                                            icon: configList[i].icon,
                                                            point: resList[j].mapPoint,
                                                            attr: resList[j].graphic.attributes
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                        //将地图点选情况分为三类：
                                        //1、当选中的要素中同时有行政区划、分区和其它业务图层要素时，只显示业务图层要素；
                                        //2、当选中的要素中同时有行政区划、分区要素时，只显示分区要素；
                                        //3、当选中的要素中只有行政区划，直接显示就可以了；
                                        if (filterLayers.length > 0) {
                                            let tongxinCount = 0;
                                            let partitionCount = 0;
                                            let otherCount = 0;
                                            filterLayers.forEach(item => {
                                                if (item.layerID === 'tongxin') tongxinCount++;
                                                else if (item.layerID === 'partition') partitionCount++;
                                                else otherCount++;
                                            });
                                            if (otherCount > 0 && (partitionCount > 0 || tongxinCount > 0)) {
                                                for (let i = 0; i < filterLayers.length; i++) {
                                                    if (filterLayers[i].layerID === 'partition' || filterLayers[i].layerID === 'tongxin') {
                                                        filterLayers.splice(i, 1);
                                                        i--;
                                                    }
                                                }
                                            } else if (partitionCount > 0 && tongxinCount > 0) {
                                                for (let i = 0; i < filterLayers.length; i++) {
                                                    if (filterLayers[i].layerID === 'tongxin') {
                                                        filterLayers.splice(i, 1);
                                                        i--;
                                                    }
                                                }
                                            }
                                        }
                                        //显示弹窗
                                        if (filterLayers.length == 1) {
                                            that.searchThis(filterLayers[0]);
                                        } else if (filterLayers.length > 1) {
                                            // 展示 待选择的图层列表
                                            that.searchLists = filterLayers;
                                            that.searchListLeft = event.x + 'px';
                                            that.searchListTop = event.y + 'px';
                                            that.searchPannelFlag = true;
                                        } else {
                                            that.searchPannelFlag = false;
                                        }
                                    }
                                });
                            });
                        };
                        that.popupToolHandle = activePopupTool_func();

                        //
                        that.view.on('blur', (event) => {
                            that.searchPannelFlag = false;
                        });
                        that.view.on('pointer-down', (event) => {
                            that.searchPannelFlag = false;
                        });

                        let timestamp = 0;
                        that.view.on('pointer-move', (event) => {
                            // console.log('pointer-move',event.timestamp);
                            setTimeout(() => {
                                if (timestamp === event.timestamp) {
                                    that.view.hitTest(event).then(function (response) {
                                        if (response.results.length) {
                                            let filterLayers = []; //受保护的 业务图层 也就是需要弹窗的业务图层
                                            let resList = response.results;
                                            let configList = window.gisConfig.optionalLayers;
                                            for (let i = 0; i < configList.length; i++) {
                                                for (let j = 0; j < resList.length; j++) {
                                                    //排除高亮图形、分区图层、行政区划图层
                                                    if (resList[j].graphic.attributes !== null && resList[j].graphic.layer.id !== 'partition' && resList[j].graphic.layer.id !== 'tongxin') {
                                                        if (configList[i].id == resList[j].graphic.layer.id) {
                                                            console.log(resList[j].graphic);

                                                            filterLayers.push({
                                                                name: resList[j].graphic.attributes.name,
                                                                layerID: resList[j].graphic.layer.id,
                                                                eleId: resList[j].graphic.attributes.id,
                                                                geometry: resList[j].graphic.geometry,
                                                                code: resList[j].graphic.attributes.id,
                                                                icon: configList[i].icon,
                                                                point: resList[j].mapPoint,
                                                                attr: resList[j].graphic.attributes
                                                            });
                                                        }
                                                    }
                                                }
                                            }
                                            if (filterLayers.length > 0) {
                                                // 展示列表
                                                that.tooltipLists = filterLayers;
                                                that.tooltipListLeft = event.x + 20 + 'px';
                                                that.tooltipListTop = event.y + 'px';
                                                that.tooltipPannelFlag = true;
                                            } else {
                                                that.tooltipPannelFlag = false;
                                            }
                                        }
                                    });
                                } else {
                                    that.tooltipPannelFlag = false;
                                }
                            }, 500);
                            timestamp = event.timestamp;
                        });

                        popup_func = function (graphic) {
                            let geometry = graphic.geometry;
                            let mps = null;
                            switch (geometry.type) {
                                case 'point':
                                    that.popupInfoWindow.graphic = graphic;
                                    that.popupInfoWindow.x = geometry.x;
                                    that.popupInfoWindow.y = geometry.y;
                                    mps = that.view.toScreen(geometry);
                                    that.popupInfoWindow.centerScreenX = mps.x;
                                    that.popupInfoWindow.centerScreenY = mps.y;
                                    break;
                                case 'polyline':
                                    that.popupInfoWindow.graphic = graphic;
                                    var mapPoint = new Point({
                                        spatialReference: geometry.spatialReference
                                    });
                                    //线类型数据取质心作为定位点，质心由后端MySQL空间函数生成
                                    if (graphic.attributes.centroid) {
                                        let lanlat = graphic.attributes.centroid.substring(6).split(' ');
                                        that.popupInfoWindow.x = lanlat[0];
                                        that.popupInfoWindow.y = lanlat[1];
                                        mapPoint.x = lanlat[0];
                                        mapPoint.y = lanlat[1];
                                    } else {//线类型数据取第一个节点作为定位点
                                        that.popupInfoWindow.x = geometry.paths[0][0][0];
                                        that.popupInfoWindow.y = geometry.paths[0][0][1];
                                        mapPoint.x = geometry.paths[0][0][0];
                                        mapPoint.y = geometry.paths[0][0][1];
                                    }
                                    mps = that.view.toScreen(mapPoint);
                                    that.popupInfoWindow.centerScreenX = mps.x;
                                    that.popupInfoWindow.centerScreenY = mps.y;
                                    break;
                                case 'polygon':
                                    that.popupInfoWindow.graphic = graphic;
                                    //面类型数据取质心作为定位点，质心由后端MySQL空间函数生成
                                    if (graphic.attributes.centroid) {
                                        let lanlat = graphic.attributes.centroid.substring(6).split(' ');
                                        that.popupInfoWindow.x = lanlat[0];
                                        that.popupInfoWindow.y = lanlat[1];
                                        let mapPoint = new Point({
                                            spatialReference: geometry.spatialReference
                                        });
                                        mapPoint.x = lanlat[0];
                                        mapPoint.y = lanlat[1];
                                        mps = that.view.toScreen(mapPoint);
                                    } else {
                                        //面类型数据取中心点作为定位点
                                        that.popupInfoWindow.x = geometry.extent.center.x;
                                        that.popupInfoWindow.y = geometry.extent.center.y;
                                        mps = that.view.toScreen(geometry.extent.center);
                                    }
                                    that.popupInfoWindow.centerScreenX = mps.x;
                                    that.popupInfoWindow.centerScreenY = mps.y;
                                    break;
                                default:
                                    that.popupInfoWindow.isVisible = false;
                                    break;
                            }
                            // that.$nextTick(function () {
                            //   let popupDom = document.getElementById('dse-popup-window');
                            //   that.popupInfoWindow.centerScreenY = mps.y - popupDom.offsetHeight / 2;
                            // });

                        };

                        simulateAnalysis_func = function () {
                            //清理爆管分析
                            that.clearSimulateAnalysis();
                            //地图失去焦点时取消此分析工具
                            let simulateMapHandle = that.view.on('blur', (event) => {
                                that.clearSimulateAnalysis();
                                if (simulateMapHandle) {
                                    simulateMapHandle.remove;
                                }
                            });
                            //开始爆管分析
                            that.deactivePopupTool();

                            that.simulateHandle = that.view.on('click', (event) => {
                                that.view.hitTest(event).then(function (response) {
                                    for (let i = 0; i < response.results.length; i++) {
                                        if (response.results[i].graphic.layer.id === 'pipeline') {
                                            //清理前一次的分析结果
                                            if (that.baoGuanGraphic) {
                                                that.view.graphics.remove(that.baoGuanGraphic);
                                                that.baoGuanGraphic = null;
                                            }
                                            //添加爆管点
                                            that.baoGuanGraphic = new Graphic;
                                            that.baoGuanGraphic.geometry = response.results[i].mapPoint.clone();
                                            that.baoGuanGraphic.symbol = window.gisConfig.baoGuanSymbol;
                                            that.view.graphics.add(that.baoGuanGraphic);
                                            // console.log('添加爆管点');
                                        }
                                    }
                                });
                            });
                        };

                        exportBase64_func = function (obj) {
                            that.showAnimate = true;
                            let temp_exportImg = new ExportImg({
                                view: that.view,
                                serviceURL: window.arcgisExportMap
                            });
                            temp_exportImg.start().then(res => {
                                that.showAnimate = false;
                                res = res.replace(/data:image\/png;base64,/, '');
                                obj.image = res;
                                // exportPipeBaseInfo(obj,that).then(res=>{
                                //   let temp_fileURL = DSE.base_api_url+'/'+res.data;
                                //   window.location.href=temp_fileURL;
                                // });
                            }).catch(err => {
                                console.log(err);
                            });
                        };

                        //实现聚类，可以一个图层一个聚类也可以多个图层做一个聚类(暂时先实现多个图层做一个聚类)
                        //一个图层一个聚类时将聚合的图形放到对应的图层中，多个图层做一个聚类将聚合的图形放到view.graphics中
                        let handleExtentForCluster = null;
                        let clusterlayerIDs = [];
                        let clusterFromGraphics = [];//聚类由哪些要素聚类的
                        function cluster_func(layerIDs) {
                            clearCluster(true);
                            if (!layerIDs || layerIDs.length === 0) {
                                return;
                            }

                            let clusterGraphics = [];
                            let clusters = [];//生成的聚类点集合
                            let clusterTolerance = 50;
                            let clusterToleranceForView = 0;
                            let clusterSymbol = null;
                            let textSymbol = null;
                            //从配置文件获取对应聚类的配置项
                            if (window.gisConfig && window.gisConfig.cluster && window.gisConfig.cluster.length > 0) {
                                clusterTolerance = window.gisConfig.cluster[0].distance;
                                clusterSymbol = window.gisConfig.cluster[0].symbol;
                                textSymbol = window.gisConfig.cluster[0].textSymbol;
                            }
                            //获取需要参与聚类的所有要素
                            layerIDs.forEach(layerid => {
                                clusterGraphics = clusterGraphics.concat(that.map.findLayerById(layerid).graphics.toArray());
                            });
                            if (clusterGraphics.length === 0) {
                                return;
                            }
                            //地图初次显示时
                            _clusterGraphics(clusterGraphics);
                            handleExtentForCluster = that.view.watch('extent', e => {
                                //多个图层做一个聚类要绑定图层的显隐状态
                                _clusterGraphics(clusterGraphics);
                            });

                            function _clusterGraphics(clusterGraphics) {
                                clearCluster(false);
                                clusters = [];
                                //根据地图坐标系转换聚类距离单位
                                let p1 = that.view.toMap({
                                    x: 0,
                                    y: 0
                                });
                                let p2 = that.view.toMap({
                                    x: clusterTolerance,
                                    y: 0
                                });
                                clusterToleranceForView = p2.longitude - p1.longitude;
                                //按地图当前范围的1.1倍范围过滤数据，再按照聚类距离（按像素）分类实际需要聚类的要素，不需要聚类的要素不管
                                let testExtent = that.view.extent.clone();
                                if (testExtent.spatialReference.wkid !== 4326) {
                                    testExtent = webMercatorUtils.webMercatorToGeographic(testExtent);
                                }
                                //生成聚簇点
                                for (let j = 0; j < clusterGraphics.length; j++) {
                                    if (!testExtent.contains(clusterGraphics[j].geometry)) {
                                        continue;
                                    }
                                    var graphic = clusterGraphics[j];
                                    var clustered = false;
                                    for (var i = 0; i < clusters.length; i++) {
                                        var c = clusters[i];
                                        if (clusterTest(graphic, c)) {
                                            clusterFromGraphics.push(graphic);
                                            clusterAddPoint(graphic, c);
                                            clustered = true;
                                            break;
                                        }
                                    }
                                    if (!clustered) {
                                        clusterCreate(graphic);
                                        clusterFromGraphics.push(graphic);
                                    }
                                }
                                //显示所有聚类
                                for (let i = 0; i < clusters.length; i++) {
                                    if (clusters[i].clusterAttributes.clusterCount <= 1) {
                                        for (let j = 0; j < clusterFromGraphics.length; j++) {
                                            if (clusters[i].fromGraphic === clusterFromGraphics[j]) {
                                                clusterFromGraphics.splice(j, 1);
                                                break;
                                            }
                                        }

                                        clusters.splice(i, 1);
                                        i--;
                                        continue;
                                    }
                                    delete clusters[i].fromGraphic;//此属性只临时用来区分此聚类点来自哪个图形，此属性会在显示前删除
                                    showCluster(clusters[i]);
                                }
                                //同时删除所有参加聚类的要素，注意：本来应该是隐藏，可是graphic.visible = false;不起作用，因此才改为删除
                                clusterFromGraphics.forEach(graphicFrom => {
                                    that.map.findLayerById(graphicFrom.layerID).graphics.remove(graphicFrom);
                                    //隐藏对应的popup
                                    for (let i = 0; i < that.model_monitor_point.flow.length; i++) {
                                        if (that.model_monitor_point.flow[i].graphic === graphicFrom) {
                                            that.model_monitor_point.flow_hidden.push(that.model_monitor_point.flow[i]);
                                            that.model_monitor_point.flow.splice(i, 1);
                                            i--;
                                        }
                                    }
                                    for (let i = 0; i < that.model_monitor_point.press.length; i++) {
                                        if (that.model_monitor_point.press[i].graphic === graphicFrom) {
                                            that.model_monitor_point.press_hidden.push(that.model_monitor_point.press[i]);
                                            that.model_monitor_point.press.splice(i, 1);
                                            i--;
                                        }
                                    }
                                    for (let i = 0; i < that.model_monitor_point.qc.length; i++) {
                                        if (that.model_monitor_point.qc[i].graphic === graphicFrom) {
                                            that.model_monitor_point.qc_hidden.push(that.model_monitor_point.qc[i]);
                                            that.model_monitor_point.qc.splice(i, 1);
                                            i--;
                                        }
                                    }
                                    for (let i = 0; i < that.model_monitor_point.video.length; i++) {
                                        if (that.model_monitor_point.video[i].graphic === graphicFrom) {
                                            that.model_monitor_point.video_hidden.push(that.model_monitor_point.video[i]);
                                            that.model_monitor_point.video.splice(i, 1);
                                            i--;
                                        }
                                    }
                                });
                            }

                            //计算p要素是否满足放到cluster这个聚类点中
                            function clusterTest(p, cluster) {
                                var distance = (Math.sqrt(Math.pow((cluster.geometry.x - p.geometry.x), 2) + Math.pow((cluster.geometry.y - p.geometry.y), 2)));
                                return (distance <= clusterToleranceForView);
                            }

                            function clusterAddPoint(p, cluster) {
                                var count, x, y;
                                //用均值表示聚类的定位点
                                count = cluster.clusterAttributes.clusterCount;
                                x = (p.geometry.x + (cluster.geometry.x * count)) / (count + 1);
                                y = (p.geometry.y + (cluster.geometry.y * count)) / (count + 1);
                                cluster.geometry.x = x;
                                cluster.geometry.y = y;
                                //获取聚类的范围
                                if (p.geometry.x < cluster.clusterAttributes.extent[0]) {
                                    cluster.clusterAttributes.extent[0] = p.geometry.x;
                                } else if (p.geometry.x > cluster.clusterAttributes.extent[2]) {
                                    cluster.clusterAttributes.extent[2] = p.geometry.x;
                                }
                                if (p.geometry.y < cluster.clusterAttributes.extent[1]) {
                                    cluster.clusterAttributes.extent[1] = p.geometry.y;
                                } else if (p.geometry.y > cluster.clusterAttributes.extent[3]) {
                                    cluster.clusterAttributes.extent[3] = p.geometry.y;
                                }
                                cluster.clusterAttributes.clusterCount++;
                            }

                            //创建聚簇点
                            function clusterCreate(p) {
                                var cluster = new Graphic({
                                    geometry: p.geometry.clone()
                                });
                                cluster.fromGraphic = p;//此属性只临时用来区分此聚类点来自哪个图形，此属性会在显示前删除
                                cluster.clusterAttributes = {
                                    clusterCount: 1,
                                    extent: [p.geometry.x, p.geometry.y, p.geometry.x, p.geometry.y]
                                };
                                cluster.layerID = p.layerID;
                                clusters.push(cluster);
                            }

                            function showCluster(graphic) {
                                graphic.symbol = clusterSymbol;
                                let textGraphic = new Graphic({
                                    geometry: graphic.geometry.clone(),
                                    symbol: textSymbol
                                });
                                textGraphic.symbol.text = graphic.clusterAttributes.clusterCount;
                                textGraphic.orignGraphic = graphic;
                                textGraphic.layerID = graphic.layerID;
                                graphic.textGraphic = textGraphic;

                                that.view.graphics.addMany([graphic, textGraphic]);
                            }

                        }

                        //取消所有图层的聚类功能
                        function clearCluster(isClearHandle) {
                            if (isClearHandle) {
                                if (handleExtentForCluster) {
                                    // console.log('remove handleExtentForCluster');
                                    handleExtentForCluster.remove();
                                    handleExtentForCluster = null;
                                }
                            }
                            if (clusterFromGraphics) {
                                clusterFromGraphics.forEach(graphicFrom => {
                                    that.map.findLayerById(graphicFrom.layerID).graphics.add(graphicFrom);
                                    //显示对应的popup
                                    for (let i = 0; i < that.model_monitor_point.flow_hidden.length; i++) {
                                        if (that.model_monitor_point.flow_hidden[i].graphic === graphicFrom) {
                                            that.model_monitor_point.flow.push(that.model_monitor_point.flow_hidden[i]);
                                            that.model_monitor_point.flow_hidden.splice(i, 1);
                                            i--;
                                        }
                                    }
                                    for (let i = 0; i < that.model_monitor_point.press_hidden.length; i++) {
                                        if (that.model_monitor_point.press_hidden[i].graphic === graphicFrom) {
                                            that.model_monitor_point.press.push(that.model_monitor_point.press_hidden[i]);
                                            that.model_monitor_point.press_hidden.splice(i, 1);
                                            i--;
                                        }
                                    }
                                    for (let i = 0; i < that.model_monitor_point.qc_hidden.length; i++) {
                                        if (that.model_monitor_point.qc_hidden[i].graphic === graphicFrom) {
                                            that.model_monitor_point.qc.push(that.model_monitor_point.qc_hidden[i]);
                                            that.model_monitor_point.qc_hidden.splice(i, 1);
                                            i--;
                                        }
                                    }
                                    for (let i = 0; i < that.model_monitor_point.video_hidden.length; i++) {
                                        if (that.model_monitor_point.video_hidden[i].graphic === graphicFrom) {
                                            that.model_monitor_point.video.push(that.model_monitor_point.video_hidden[i]);
                                            that.model_monitor_point.video_hidden.splice(i, 1);
                                            i--;
                                        }
                                    }
                                });
                                clusterFromGraphics = [];
                            }
                            for (let i = 0; i < that.view.graphics.length; i++) {
                                if (that.view.graphics.getItemAt(i).clusterAttributes || that.view.graphics.getItemAt(i).orignGraphic) {
                                    that.view.graphics.removeAt(i);
                                    i--;
                                }
                            }
                        }

                        //聚类功能触发事件
                        that.$on('cluster-update', layerid => {
                            if (!clusterlayerIDs.some(id => {
                                return id === layerid;
                            })) {
                                clusterlayerIDs.push(layerid);
                            }
                            cluster_func(clusterlayerIDs);
                        });

                        // 轨迹线  绘制
                        that.trackLineLayer = new GraphicsLayer('trackLine');
                        that.map.add(that.trackLineLayer);
                        TRACKLINE_func = function (name) {
                            that.trackLineLayer.removeAll();
                            let  paths = [
                                [105.886981, 36.980734],
                                [105.888068, 36.981051],
                                [105.888831, 36.981253],
                                [105.889891, 36.980965],
                                [105.891742, 36.980208],
                                [105.89344, 36.980013],
                                [105.894167,36.975054],
                                [105.889927,36.972287],
                                [105.889424,36.969403],
                                [105.890287,36.9675],
                                [105.889137,36.96231],
                                [105.885831,36.962714],
                                [105.882957,36.966405]
                            ];

                            // x: 105.820125,
                            //     y: 37.038290
                            if(name=='王建国'){
                                paths =  [
                                    [105.886981, 36.980734],
                                    [105.888068, 36.981051],
                                    [105.888831, 36.981253],
                                    [105.889891, 36.980965],
                                    [105.891742, 36.980208],
                                    [105.89344, 36.980013],
                                    [105.894167,36.975054],
                                    [105.889927,36.972287],
                                    [105.889424,36.969403],
                                    [105.890287,36.9675],
                                    [105.889137,36.96231],
                                    [105.885831,36.962714],
                                    [105.882957,36.966405]
                                ];
                            }else if(name=='李富贵'){
                                paths =  [
                                    [105.864521, 36.951619],
                                    [105.865689,36.951994],
                                    [105.867773,36.952023],
                                    [105.870037,36.950811],
                                    [105.875678,36.949427],
                                    [105.877223,36.951215],
                                    [105.880026,36.951417],
                                    [105.881068,36.948591],
                                    [105.882397,36.947841],
                                    [105.882972,36.946947],
                                    [105.891228,36.953984],
                                    [105.890473,36.951446],
                                    [105.888712,36.949341],
                                    [105.886449,36.948158],
                                    [105.88476,36.945187]
                                ];
                            }else if(name=='刘国庆'){
                                paths =  [
                                    [105.820125, 37.038290],
                                    [105.821958,37.038434],
                                    [105.824473,37.037253],
                                    [105.82803,37.038953],
                                    [105.828461,37.038031],
                                    [105.83457,37.035928],
                                    [105.837013,37.034747],
                                    [105.838846,37.036302],
                                    [105.835935,37.032961],
                                    [105.827527,37.032471],
                                    [105.837885,37.023604],
                                    [105.834866,37.02372],
                                    [105.828614,37.023316],
                                    [105.82653,37.023374]
                                ];
                            }

                            let polyline = new Polyline({
                                paths: paths,
                                spatialReference: {wkid: 4326}
                            });

                            let line = new Graphic({
                                geometry: polyline,
                                symbol: {
                                    type: 'simple-line',
                                    color: [4, 90, 141],
                                    width: 2,
                                    cap: 'round',
                                    join: 'round'
                                }
                            });
                            that.trackLineLayer.add(line);
                        };
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },

            // 轨迹线绘制
            trackLine(recordId) {
                trackLine_func(recordId);
            },
            // 显示 轨迹
            showTrackLine(name) {
                TRACKLINE_func(name);
            },
            // 轨迹线 动画
            trajRun(ifLine) {
                trajRun_func(ifLine);
            },
            // 管道 tabs切换
            getTabIndex(index) {
                // let that = this;
                this.pipeIndex = index;
                if (index == 0) {
                    return;
                } else {
                    return;
                }
            },
            /**
             * @desc
             * @params
             * @return
             */
            // 关闭弹窗
            closeModel() {
                if (this.popupInfoWindow.type == 'pipeline') {
                    this.pipeIndex = 0;
                    this.$refs.separatingTab_index.init();
                }
                this.closePopup();
            },
            // 关闭 大弹窗
            closeBg(flag) {
                this.closePopup();
            },
            // 关闭弹窗
            closeNormalModel() {
                this.closePopup();
            },
            // 改变 弹窗大小 内容自适应
            changeSize(flag) {
                let type = this.popupInfoWindow.type;
                switch (type) {
                    case 'bengzhan':
                        this.$refs.pump.resize();
                        break;
                    case 'partition':
                        this.$refs.part.resize();
                        break;
                    case 'shuiku':
                        this.$refs.sk.resize();
                        break;
                    case 'shuichang':
                        this.$refs.sc.resize();
                        break;
                    case 'xushuichi':
                        this.$refs.sc.resize();
                        break;
                    case 'dayongshuihu':
                        this.$refs.bgUser.resize();
                        break;
                    case 'jiliangjian':
                        this.$refs.countRoom.resize();
                        break;
                }
            },
            // 搜索这个要素
            searchThis(val) {

                console.log(val);

                this.initName = val.name;

                if (this.popup(val.layerID, val.eleId, true)) {
                    let that = this;
                    let type = val.layerID;
                    console.log(val);

                    this.popupInfoWindow.modelTip = val.name;
                    this.popupInfoWindow.type = val.layerID;
                    this.popupInfoWindow.width_ ='400px';

                    // let now = new Date();
                    // let  currentYear = now.getFullYear();
                    // let  currentMonth = now.getMonth()+1;

                    switch (type) {
                        case 'txfgs': // 同心分公司水费计收
                        case 'txdbfgs': // 同心东部分公司水费计收
                        case 'txxbfgs': // 同心西部分公司水费计收
                        case 'hyx': // 海原分公司水费计收
                           this.popupInfoWindow.width_ = '200px';
                          this.popupInfoWindow.type = 'shuifeijishou';
                          this.popupInfoWindow.isVisible = true;

                          that.model_shuifei_msg = {
                              sfjg: val.attr.sfjg,
                              yssf: val.attr.yssf,
                              sssf: val.attr.sssf,
                              gsbzl: val.attr.gsbzl
                          };
                          break;
                        case 'partition': // 分区
                            that.temp_id = val.eleId;
                            this.popupInfoWindow.isVisible = true;


                            if (val.name == '同心东部') {
                                that.model_part_msg = {
                                    supply: 14536.23,
                                    execCost: 41843.31,
                                    realCost: 29813.15,
                                    blance: '28.75',
                                    type: '1',
                                    waterCapacityList: [14536.23, 14576.32, 14256.34]
                                };
                            } else if (val.name == '同心中部') {
                                that.model_part_msg = {
                                    supply: 40294.15,
                                    execCost: 41843.31,
                                    realCost: 29813.15,
                                    blance: '28.75',
                                    type: '2',
                                    waterCapacityList: [40294.15, 43449.49, 42344.23]
                                };
                            } else if (val.name == '同心西部') {
                                that.model_part_msg = {
                                    supply: 17285.35,
                                    execCost: 41843.31,
                                    realCost: 29813.15,
                                    blance: '28.75',
                                    type: '3',
                                    waterCapacityList: [17285.35, 14872.71, 15432.31]
                                };
                            }


                            that.$nextTick(() => {
                                WATERCAPACITYCHART = that.$echarts.init(that.$refs.smChart);
                                WATERCAPACITYCHART.setOption(
                                    that.initBar({
                                        data: that.model_part_msg.waterCapacityList
                                    })
                                );
                            });
                            break;
                        case 'pipeline':  // 管网
                        case 'pipeline2':
                        case 'pipeline3':
                            this.popupInfoWindow.type = 'pipeline';

                            that.current_pipeId = val.eleId;
                            this.popupInfoWindow.isVisible = true;

                            that.$emit('tellFather_ifSimulate', val);
                            break;
                        case 'manhole': // 检修井

                            break;
                        case 'fire_hydrant':  //消防栓

                            break;
                        case 'valve':  // 阀门

                            break;
                        case 'shuiku':  // 水库
                            this.popupInfoWindow.isVisible = false;
                            this.bgModelFlag = true;
                            this.$refs.bgModel.showModel();
                            this.contentTip = val.name + '详情';
                            that.temp_id = val.eleId;
                            break;
                        case 'shuichang':  // 水厂
                            this.popupInfoWindow.isVisible = false;
                            this.bgModelFlag = true;
                            this.$refs.bgModel.showModel();
                            this.contentTip = val.name + '详情';
                            that.temp_id = val.eleId;
                            break;
                        case 'dayongshuihu':  // 联户表井
                            this.popupInfoWindow.isVisible = false;
                            this.bgModelFlag = true;
                            this.$refs.bgModel.showModel();
                            this.contentTip = val.name + '详情';
                            that.temp_id = val.eleId;
                            break;
                        case 'bengzhan':  // 泵站
                            this.popupInfoWindow.isVisible = false;
                            this.$refs.bgModel.showModel();
                            this.bgModelFlag = true;
                            this.contentTip = val.name + '详情';
                            that.temp_id = val.eleId;
                            break;
                        case 'xushuichi':  // 蓄水池
                            this.popupInfoWindow.isVisible = false;
                            this.bgModelFlag = true;
                            this.$refs.bgModel.showModel();
                            this.contentTip = val.name + '详情';
                            that.temp_id = val.eleId;
                            break;
                        case 'shishi':  // 实时信息
                            this.popupInfoWindow.isVisible = false;
                            this.bgModelFlag = false;
                            TRACKLINE_func(val.name);
                            break;
                        case 'jianxiu':  // 检修信息
                            this.popupInfoWindow.isVisible = false;
                            this.bgModelFlag = false;
                            break;
                        case 'yinhuan':  // 隐患信息
                            this.popupInfoWindow.isVisible = false;
                            this.bgModelFlag = false;
                            break;
                        case 'guanfa':  // 管阀信息
                            break;
                        case 'shebei':  // 设备运行
                            break;
                        case 'liuliang':  // 流量
                            this.popupInfoWindow.isVisible = false;
                            this.popupInfoWindow.monitor_isVisiable = true;
                             this.monitor_waterComponent = FLOWMODULE;
                            this.$refs.chartModel.showModel();
                            that.temp_id = val.eleId;

                            // this.showChartModel({
                            //   id:val.eleId,
                            //   modelTip:val.name,
                            //   layerID:val.layerID
                            // });

                            break;
                        case 'yali':  // 压力
                            this.popupInfoWindow.isVisible = false;
                            this.popupInfoWindow.monitor_isVisiable = true;
                             this.monitor_waterComponent = PRESSMODULE;
                            that.temp_id = val.eleId;
                            // this.bgModelFlag = false;
                            // this.showChartModel({
                            //   id:val.eleId,
                            //   modelTip:val.name,
                            //   layerID:val.layerID
                            // });
                            this.$refs.chartModel.showModel();
                            break;
                        case 'shuizhi':  // 水质
                            this.popupInfoWindow.isVisible = false;
                            this.popupInfoWindow.monitor_isVisiable = true;
                            that.temp_id = val.eleId;
                            // this.bgModelFlag = false;
                            // this.showChartModel({
                            //   id:val.eleId,
                            //   modelTip:val.name,
                            //   layerID:val.layerID
                            // });
                            this.$refs.chartModel.showModel();
                            this.monitor_waterComponent = QCMODULE;
                            break;
                        case 'shipin':  // 视频
                            this.popupInfoWindow.isVisible = false;
                            this.popupInfoWindow.monitor_isVisiable = true;
                             this.monitor_waterComponent = VIDEOMODULE;
                            // this.bgModelFlag = false;
                            // this.showChartModel({
                            //   id:val.eleId,
                            //   modelTip:val.name,
                            //   layerID:val.layerID
                            // });
                            this.$refs.chartModel.showModel();

                            break;
                        case 'shuiwei':  // 水位
                            this.popupInfoWindow.isVisible = false;
                            this.popupInfoWindow.monitor_isVisiable = true;
                              this.monitor_waterComponent = WATERMODULE;
                            this.$refs.chartModel.showModel();
                            that.temp_id = val.eleId;

                            // this.bgModelFlag = false;
                            // this.showChartModel({
                            //   id:val.eleId,
                            //   modelTip:val.name,
                            //   layerID:val.layerID
                            // });
                            break;

                    }
                }
                this.searchPannelFlag = false;
            },
            // 显示 分区的二级弹窗
            goto_part_detail(type) {
                let that = this;
                this.bgModelFlag = true;
                this.$refs.bgModel.showModel();
                that.contentTip = this.popupInfoWindow.modelTip;
                setTimeout(() => {
                    that.part_tabIndex(0);
                }, 200);
            },
            // 展示水质 水压 水流 视频的 二级弹窗
            showChartModel(item) {
                console.log('hahahaha');
                console.log(item);
                console.log(item.modelTip);
                this.initName = item.modelTip;
                this.chartModel_flag = true;
                this.$refs.chartModel.showModel();
                let temp_id = '';
                let tip_name = '';
                let temp_layerId = '';

                if (item && item.length > 0) {
                    item.map(val => {
                        temp_id += val.id + ',';
                    });
                    temp_id = temp_id.split(',');
                    temp_id.pop();
                    temp_id = temp_id.join(',');
                    this.temp_id = temp_id;
                    tip_name = item[0].modelTip;
                    temp_layerId = item[0].layerID;
                } else {
                    this.temp_id = item.id;
                    tip_name = item.modelTip;
                    temp_layerId = item.layerID;
                }


                this.popupInfoWindow.modelTip = tip_name;

                switch (temp_layerId) {
                    case 'liuliang':
                        this.monitor_waterComponent = FLOWMODULE;
                        break;
                    case 'yali':
                        this.monitor_waterComponent = PRESSMODULE;
                        break;
                    case 'shuizhi':
                        this.monitor_waterComponent = QCMODULE;
                        break;
                    case 'shipin':
                        this.monitor_waterComponent = VIDEOMODULE;
                        break;
                    case 'shuiwei':
                        this.monitor_waterComponent = WATERMODULE;
                        break;
                }
            },
            // 水库 切换页签
            sk_tabIndex(index) {
                this.$refs.sk.activeThis(index);
            },
            // 分区的 切换页签
            area_tanIndex(index) {
                let type = this.model_part_msg.type;
                this.$refs.part.activeThis(index, type);
            },
            // 水厂的切换
            sc_tabIndex(index) {
                this.$refs.sc.activeThis(index);
            },
            //蓄水池的切换
            pool_tabIndex(index) {
                this.$refs.pool.activeThis(index);
            },
            //联户表井
            userDev_tabIndex(index) {
                this.$refs.userDev.activeThis(index);
            },
            // 大用水户切换
            bgUser_tabIndex(index) {
                this.$refs.bgUser.activeThis(index);
            },
            // 获取泵站  分离式tab获取索引
            pump_tanIndex(index) {
                this.$refs.pump.activeThis(index);
            },
            // 获取分区的切换
            part_tabIndex(index) {
                let that = this;
                let type = this.model_part_msg.type;
                this.$nextTick(() => {
                    that.$refs.part.initData(type);
                });
            },
            // 视频监测的切换
            countRoom_tabIndex(index) {
                this.$refs.countRoom.activeThis(index);
            },
            // 显示 水的 二级弹窗
            show2ClassModel(obj) {
                this.popupInfoWindow.modelTip = obj.modelTip;
                this.showChartModel(obj.layerID, obj.id);
            },
            // 绘制一个 柱子
            initBar(obj) {
                return {
                    title: {
                        text: '月用水变化趋势',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        left: 60,
                        bottom: 30
                    },
                    calculable: true,
                    xAxis: [{
                        type: 'category',
                        name: '月',
                        axisLabel: {},
                        data: ['本月', '上月', '去年']
                    }],
                    color: ['#4f81bd', '#4f81bd', '#4f81bd'],
                    yAxis: [{
                        type: 'value',
                        name: '(m³)',
                    }],
                    series: [{
                        type: 'bar',
                        barWidth: '10%',
                        data: obj.data,
                    }]

                };
            }
        },
        filters: {
            formate_fm_ststus(val) {
                let temp_val = val;
                switch (val) {
                    case '1':
                        temp_val = '关';
                        break;
                    case '0':
                        temp_val = '开';
                        break;
                }

                return temp_val;
            },
            formate_interfaceType(val) {
                let temp_val = val;

                let list = DSE.interFace;

                for (let i = 0; i < list.length; i++) {
                    if (list[i].value == val) {
                        temp_val = list[i].label;
                        break;
                    }
                }
                return temp_val;
            },
            formate_pipeStatus(val) {
                let temp_val = val;
                switch (val) {
                    case '1':
                        temp_val = '报废';
                        break;
                    case '0':
                        temp_val = '正常';
                        break;
                }

                return temp_val;
            },
            formate_orderLev(val) {
                let temp_val = val;
                let list = DSE.dangerlist;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].value == val) {
                        temp_val = list[i].label;
                        break;
                    }
                }
                return temp_val;
            },
            formate_orderType(val) {
                let temp_val = val;
                let list = DSE.repairOrderTypes;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].value == val) {
                        temp_val = list[i].label;
                        break;
                    }
                }
                return temp_val;
            },
            formate_status(val) {
                let temp_val = val;
                let list = DSE.orderStatus;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].value == val) {
                        temp_val = list[i].label;
                        break;
                    }
                }
                return temp_val;
            },
            formate_formatDegree(val) {
                if (!val) {
                    return val;
                }
                let temp_val = val.split(',');
                let temp_str = '';
                temp_str += formatDegree(parseFloat(temp_val[0])) + ',';
                temp_str += formatDegree(parseFloat(temp_val[1]));
                return temp_str;
            },
            formate_lev(val) {

                if (!val) {
                    return val;
                }
                let temp_val = val;
                switch (val) {
                    case '1':
                        temp_val = 'I';
                        break;
                    case '2':
                        temp_val = 'II';
                        break;
                    case '3':
                        temp_val = 'III';
                        break;
                }
                return temp_val;
            }
        },
        mounted() {
            let that = this;
            this.$nextTick(() => {
                setTimeout(() => {
                    that.loadGis();
                }, 1000);
            });

        },
        beforeDestroy() {
            if (timer) {
                clearInterval(timer);
            }
        },
        created() {
            this.companyId = this.$store.getters.get_companyId;
            this.static_frontPath = this.$store.getters.get_filePath;
        }

    };

</script>

<style scoped lang="scss">
    #gisMap {
        width: 100%;
        height: 100%;
        position: relative;

        .search-list {
            position: absolute;
            top: 127px;
            left: 136px;
            width: 200px;
            background: #fff;
            box-shadow: 0 0 10px rgb(0, 0, 0);

            .top-head {
                width: 100%;
                height: 30px;
                line-height: 30px;
                background: #0b83fe;
                text-align: left;
                color: #fff;
                padding-left: 1em;
            }

            .list-search {
                width: 100%;
                max-height: 300px;
                overflow-y: auto;

                .searchItem {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    border-bottom: 1px solid #e9e9e9;
                    height: 35px;

                    &:hover {
                        background: rgba(0, 0, 0, 0.3);
                    }

                    .col {
                        display: flex;
                        align-items: center;
                        padding: 0px 5px;

                        &:first-child {
                            width: 180px;
                            justify-content: flex-start;

                            img {
                                width: 14px;
                                height: 14px;
                                margin-right: 5px;
                            }

                            span {
                                display: inline-block;
                                width: calc(100% - 16px);
                                height: 100%;
                                line-height: 20px;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                            }
                        }

                        &:last-child {
                            width: 20px;
                            justify-content: flex-end;
                        }

                    }
                }
            }
        }

        .tooltip-list {
            position: absolute;
            top: 127px;
            left: 136px;
            width: 200px;
            background: #fff;
            box-shadow: 0 0 10px rgb(0, 0, 0);

            .list-search {
                width: 100%;
                max-height: 300px;
                overflow-y: auto;

                .searchItem {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    // cursor: pointer;
                    border-bottom: 1px solid #e9e9e9;
                    height: 35px;

                    .col {
                        display: flex;
                        align-items: center;
                        padding: 0px 5px;

                        &:first-child {
                            // width: 180px;
                            width: auto;
                            justify-content: flex-start;

                            img {
                                width: 14px;
                                height: 14px;
                                margin-right: 5px;
                            }

                            span {
                                display: inline-block;
                                width: calc(100% - 16px);
                                height: 100%;
                                line-height: 20px;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                            }
                        }

                        // &:last-child{
                        //   width: 20px;
                        //   justify-content: flex-end;
                        // }

                    }
                }
            }
        }
    }

    .dse-popup-window {
        position: absolute;
        left: 0px;
        top: 0px;
        background-color: rgb(80, 221, 151);
        border: #323232 1px solid;
    }

    .innerTable {
        border-top: 1px solid #e9e9e9;

        tr {
            td:nth-child(odd) {
                background: #dcf2fd;
            }
        }
    }

    .part-wrap {
        width: 100%;
        max-height: 200px;
        overflow-y: auto;
        display: flex;
        justify-content: space-between;

        .col {
            &:first-child {
                width: 160px;
            }

            &:last-child {
                width: calc(100% - 160px);

                .water-chart {
                    width: 100%;
                    height: 200px;
                }
            }
        }

        table {
            tbody {
                tr {
                }

                td:last-child {
                    span {
                        line-height: 30px;
                    }
                }

                span.detail-model {
                    width: 40px;
                    line-height: 24px !important;
                    border-radius: 4px;
                    cursor: pointer;
                    border: 1px solid #0b83fe;
                    color: #0b83fe;
                }
            }
        }
    }

    .strVal {
        width: 100%;

        .row {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 10px;

            i {
                cursor: pointer;
            }
        }

    }

    .time-select {
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: flex-start;
        margin-right: 10px;

        .col {
            width: 300px;
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
            align-items: center;

            span {
                display: inline-block;
                width: 60px;
                text-align: right;
                margin-right: 5px;

                &.textLeft {
                    text-align: left;
                    width: 20px;
                }
            }

            /deep/ .el-date-editor.el-input {
                width: calc(100% - 70px);
            }


        }
    }

    .chart-main {
        width: 100%;
        height: calc(100% - 50px);
    }

    #gis_sm_Model {
        .error {
            color: red;
        }
    }

    .pipe-tableMsg {
        max-height: 300px;
        overflow-y: auto;
    }

</style>
