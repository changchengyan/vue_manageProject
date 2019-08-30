<template>
    <div id="zoneConfig">
        <div id="gisMap" :style="{width:defaultWidth}">
            <div class="colorDesk">
                <div class="setting-btn" @click="openColorModel"><span>设置</span></div>
                <p><span class="cycle" :style="{background:colorList[0].colorCode}"></span><span>漏损率&le;{{colorList[0].rateGrater}}%</span>
                </p>
                <p><span class="cycle" :style="{background:colorList[1].colorCode}"></span><span>{{colorList[1].rateLess}}%&lt;漏损率&le;{{colorList[1].rateGrater}}%</span>
                </p>
                <p><span class="cycle" :style="{background:colorList[2].colorCode}"></span><span>{{colorList[2].rateLess}}%&lt;漏损率&le;{{colorList[2].rateGrater}}%</span>
                </p>
                <p><span class="cycle" :style="{background:colorList[3].colorCode}"></span><span>{{colorList[3].rateLess}}%&lt;漏损率</span>
                </p>
            </div>
        </div>
        <div class="slide-table">
            <div class="fnHeader">分配配置</div>
            <dse-toggle-table :totalPage="totalPages" :innerWidth="360" @toggleFlag="toggleFlag">
                <template v-if="showView=='1'">
                    <div class="addPart-btn" @click="gotoAddView">新增分区</div>
                    <div class="tabs">
                        <div class="tab-item" v-for="(val,index) in tabs" :key="index"
                             :class="{actived:index==tab_activedIndex}" @click="selectThisTab(index)">
                            <span>{{val}}</span>
                        </div>
                    </div>
                    <template v-if="tab_activedIndex==0">
                        <div class="table-content">
                            <table class="innerTable">
                                <thead>
                                <tr>
                                    <th><span>分区名字</span></th>
                                    <th><span>操作</span></th>
                                </tr>
                                </thead>
                                <tbody>
                                <template v-if="partList&&partList.length>0">
                                    <tr v-for="(val,index) in partList" :key="index">
                                        <td><span>{{val.label}}</span></td>
                                        <td><span class="edit" @click="editPartModelShow(val)">编辑</span> <span
                                                class="del" @click="delPart(val.id)">删除</span></td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td colspan="2"><span> 暂时没有分区数据~~</span></td>
                                    </tr>
                                </template>
                                </tbody>
                            </table>
                        </div>
                    </template>
                    <template v-if="tab_activedIndex==1">
                        <div class="searchWrap">
                            <div class="left">
                                <span>时间:</span>
                                <input type="text" id="date_ym" readonly="readonly" class="Wdate"
                                       onfocus="WdatePicker({dateFmt:'yyyy-MM'})">
                                <span class="search-btn" @click="search">搜索</span>
                            </div>
                            <template v-if="ifEditWater">
                                <span class="editWater-btn" @click="editWaterAction">上报</span>
                            </template>
                            <template v-else>
                                <span class="editWater-btn" @click="saveWaterEdit">保存</span>
                            </template>
                        </div>
                        <div class="table-list">
                            <dse-table-list :totalNum="totalNum" :currentPage="currentPage" @goto_page="goto_page">
                                <thead>
                                <tr>
                                    <th><span>分区名字</span></th>
                                    <th><span>月供水量&nbsp;&nbsp;&nbsp;(万吨)</span></th>
                                    <th><span>月售水量&nbsp;&nbsp;&nbsp;(万吨)</span></th>
                                    <th><span>未计量水量&nbsp;&nbsp;(万吨)</span></th>
                                </tr>
                                </thead>
                                <tbody>
                                <template v-if="waterValList&&waterValList.length>0">
                                    <tr v-for="(val,index) in waterValList" :key="index">
                                        <td :title="val.name">
                                            <span>{{val.name}}</span>
                                        </td>
                                        <td>
                                            <template v-if="ifEditWater">
                                                <span>{{val.supply}}</span>
                                            </template>
                                            <template v-else>
                                                <input type="text" @change="validate_num($event,index,'supply')"
                                                       v-model="val.supply" placeholder="供水量">
                                            </template>
                                        </td>
                                        <td>
                                            <template v-if="ifEditWater">
                                                <span>{{val.useWater}}</span>
                                            </template>
                                            <template v-else>
                                                <input type="text" @change="validate_num($event,index,'useWater')"
                                                       v-model="val.useWater" placeholder="售水量">
                                            </template>
                                        </td>
                                        <td>
                                            <template v-if="ifEditWater">
                                                <span>{{val.uncountWater}}</span>
                                            </template>
                                            <template v-else>
                                                <input type="text" @change="validate_num($event,index,'uncountWater')"
                                                       v-model="val.uncountWater"
                                                       placeholder="未计入量">
                                            </template>
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td colspan="4"><span>暂时没有数据~~</span></td>
                                    </tr>
                                </template>

                                </tbody>
                            </dse-table-list>
                        </div>
                    </template>
                </template>
                <template v-if="showView=='2'">
                    <div class="addPart">
                        <div class="add-button">
                            <span @click="drawPart" title="双击结束分区绘制">绘制分区</span>
                        </div>
                        <template v-if="drawFlag">
                            <div class="input-content">
                                <div class="row">
                                    <span class="rect"></span>
                                    <span>绘制分区基本信息</span>
                                </div>
                                <el-form ref="partForm" :model="partForm" :rules="rules" label-width="180px">
                                    <el-form-item label="分区名字:" prop="name">
                                        <el-input v-model="partForm.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="分区编码:" prop="code">
                                        <el-input v-model="partForm.code"></el-input>
                                    </el-form-item>
                                    <el-form-item label="服务面积:" prop="area">
                                        <el-input v-model="partForm.area"></el-input>
                                    </el-form-item>
                                    <el-form-item label="用水户数(个):" prop="userCount">
                                        <el-input v-model="partForm.userCount"></el-input>
                                    </el-form-item>
                                    <el-form-item label="用水量(m³):" prop="consumption">
                                        <el-input v-model="partForm.consumption"></el-input>
                                    </el-form-item>
                                    <el-form-item label="边界管线数(个):" prop="pipeCount">
                                        <el-input v-model="partForm.pipeCount"></el-input>
                                    </el-form-item>
                                    <el-form-item label="边界流量表数(个):" prop="flowCount">
                                        <el-input v-model="partForm.flowCount"></el-input>
                                    </el-form-item>

                                    <el-form-item label="夜间压力最小值(Mpa):" prop="pressLow">
                                        <el-input v-model="partForm.pressLow"></el-input>
                                    </el-form-item>
                                    <el-form-item label="夜间压力最大值(Mpa):" prop="pressHigh">
                                        <el-input v-model="partForm.pressHigh"></el-input>
                                    </el-form-item>
                                    <el-form-item label="夜间流量最小值(m³/s):" prop="flowLow">
                                        <el-input v-model="partForm.flowLow"></el-input>
                                    </el-form-item>
                                    <el-form-item label="夜间流量最大值(m³/s):" prop="flowHigh">
                                        <el-input v-model="partForm.flowHigh"></el-input>
                                    </el-form-item>
                                    <el-form-item label="区域管网总长(m):" prop="pipeLength">
                                        <el-input v-model="partForm.pipeLength"></el-input>
                                    </el-form-item>
                                    <el-form-item label="管网基本信息:">
                                        <textarea v-model="partForm.pipeInfo"></textarea>
                                    </el-form-item>
                                </el-form>
                                <div class="actions">
                                    <span class="save" @click="goList">提交</span>
                                    <span class="goback" @click="gotoPartList">取消</span>
                                </div>
                            </div>
                        </template>
                    </div>
                </template>
            </dse-toggle-table>
        </div>
        <dse-save-status :type="modeltype" :delNum="delId" :showModel="showModel" @delThis="hiddenModel"
                         @sureDelThis="sureDelThis"/>
        <dse-gis-model :showFlag="post_newPoint.showFlag" :tips="post_newPoint.tips" :left_="post_newPoint.left_+'px'"
                       :top_="post_newPoint.top_+'px'"
                       @closeModel="closeModel">

            <el-radio-group v-model="post_newPoint.type" @change="changeDirct">
                <el-radio :label="'0'">进水流量表</el-radio>
                <el-radio :label="'1'">出水流量表</el-radio>
            </el-radio-group>

            <div class="actions">
                <span class="save" @click="saveDirct">保存</span>
                <span class='goback' @click="closeModel">取消</span>
            </div>
        </dse-gis-model>

        <div class="search-list" :style="{opacity:searchPannelFlag?'1':'0'}">
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

        <dse-bg-model :tips="editPartTip" :modelFlag="partModelFlag" @closeBg="closePartBg">
            <el-form class="lineDouble" ref="undateForm" :model="editPost" :rules="rules" label-width="180px">
                <el-form-item label="分区名字:" prop="name">
                    <el-input v-model="editPost.name"></el-input>
                </el-form-item>
                <el-form-item label="分区编码:" prop="code">
                    <el-input v-model="editPost.code"></el-input>
                </el-form-item>
                <el-form-item label="服务面积:" prop="area">
                    <el-input v-model="editPost.area"></el-input>
                </el-form-item>
                <el-form-item label="用水户数(个):" prop="userCount">
                    <el-input v-model="editPost.userCount"></el-input>
                </el-form-item>
                <el-form-item label="用水量(m³):" prop="consumption">
                    <el-input v-model="editPost.consumption"></el-input>
                </el-form-item>
                <el-form-item label="边界管线数(个):" prop="pipeCount">
                    <el-input v-model="editPost.pipeCount"></el-input>
                </el-form-item>
                <el-form-item label="边界流量表数(个):" prop="flowCount">
                    <el-input v-model="editPost.flowCount"></el-input>
                </el-form-item>
                <el-form-item label="夜间压力最小值(Mpa):" prop="pressLow">
                    <el-input v-model="editPost.pressLow"></el-input>
                </el-form-item>
                <el-form-item label="夜间压力最大值(Mpa):" prop="pressHigh">
                    <el-input v-model="editPost.pressHigh"></el-input>
                </el-form-item>
                <el-form-item label="夜间流量最小值(m³/s):" prop="flowLow">
                    <el-input v-model="editPost.flowLow"></el-input>
                </el-form-item>
                <el-form-item label="夜间流量最大值(m³/s):" prop="flowHigh">
                    <el-input v-model="editPost.flowHigh"></el-input>
                </el-form-item>
                <el-form-item label="区域管网总长(m):" prop="pipeLength">
                    <el-input v-model="editPost.pipeLength"></el-input>
                </el-form-item>
                <el-form-item label="管网基本信息:">
                    <textarea v-model="editPost.pipeInfo"></textarea>
                </el-form-item>
            </el-form>

            <div class="actions">
                <span class="save" @click="updatePart">更新</span>
                <span class="goback" @click="closePartBg">取消</span>
            </div>

        </dse-bg-model>

        <dse-normal-model :tips="colorTips" :modelFlag="colorModelFlag" :onHandleModelClose="closeColorModel">

            <table class="table-color">
                <tbody>
                <tr>
                    <td><span>漏损率(%)≤</span></td>
                    <td><input type="text" v-model="colorList[0].rateGrater" @change="getVal($event,0)"
                               placeholder="请输入漏损值"></td>
                    <td>
                        <el-color-picker v-model="colorList[0].colorCode" show-alpha></el-color-picker>
                    </td>
                </tr>
                <tr>
                    <td><input type="text" v-model="colorList[1].rateLess" @change="getVal($event,11)"
                               placeholder="请输入漏损值"><span>&lt;漏损率(%)&le;</span></td>
                    <td><input type="text" v-model="colorList[1].rateGrater" @change="getVal($event,12)"
                               placeholder="请输入漏损值"></td>
                    <td>
                        <el-color-picker v-model="colorList[1].colorCode" show-alpha></el-color-picker>
                    </td>
                </tr>
                <tr>
                    <td><input type="text" v-model="colorList[2].rateLess" @change="getVal($event,21)"
                               placeholder="请输入漏损值"><span>&lt;漏损率(%)&le;</span></td>
                    <td><input type="text" v-model="colorList[2].rateGrater" @change="getVal($event,22)"
                               placeholder="请输入漏损值"></td>
                    <td>
                        <el-color-picker v-model="colorList[2].colorCode" show-alpha></el-color-picker>
                    </td>
                </tr>
                <tr>
                    <td><input type="text" v-model="colorList[3].rateLess" @change="getVal($event,3)"
                               placeholder="请输入漏损值">&lt;
                    </td>
                    <td><span>漏损率(%)</span></td>
                    <td>
                        <el-color-picker v-model="colorList[3].colorCode" show-alpha></el-color-picker>
                    </td>
                </tr>
                </tbody>
            </table>

            <div class="actions">
                <span class="save" @click="save_leakColor">保存</span>
                <span class="goback" @click="closeColorModel">取消</span>
            </div>

        </dse-normal-model>

    </div>
</template>

<script>
    import $ from 'jquery';

    import * as esriLoader from 'esri-loader';

    import DseToggleTable from '../../common/components/dseToggleTable';
    import DseSaveStatus from '../../common/components/toast/dseSaveStatus';


    import {
        uuid_
    } from '../../utils/uuid';
    import DseGisModel from '../../common/components/toast/dseGisModel';
    import DseTableList from '../../common/components/dseTableList';
    import DseBgModel from '../../common/components/toast/dseBgModel';
    import DseNormalModel from '../../common/components/toast/dseNormalModel';

    let options = {
        url: window.DSE.arcgis_startJS,
        dojoConfig: window.DSE.gisConfig
    };
    esriLoader.loadCss(window.DSE.arcgis_mainCss);

    // 绘制分区的 函数
    let drawPart_func = null;

    // 初始化 分区的面 的函数
    let init_part = null;

    let loadJSON_func = null;
    let layerInfos = {};

    export default {
        components: {
            DseNormalModel,
            DseBgModel,
            DseTableList,
            DseGisModel,
            DseSaveStatus,
            DseToggleTable
        },
        data() {
            return {
                companyId: '', // 公司ID
                //多图层待选
                searchLists: [],
                defaultName: '',
                closeFlag: true,
                totalPages: 1,
                defaultWidth: 'calc(100% - 350px)',
                // tabs: ['分区列表', '分区水量'],
                tabs: ['分区列表'],
                tab_activedIndex: 0,
                totalNum: 1,
                currentPage: 1,
                modeltype: false,
                delId: '',
                showModel: false,
                drawFlag: false, // 开始绘制的开关
                saveFlag: true, // 每次只能绘制一个并保存
                view: null, //当前的 gis view
                map: null, //当前的 gis map
                partList: [], // 分区列表
                partLayer: null, //分区图层
                flowLayer: null, // 流量表图层
                pipeLayer: null, //管道图层
                usersLayer: null, // 大用水户 图层
                pressLayer: null, // 水压的图层
                tempPartLayer: null, // 临时绘制的面的图层
                //表单验证规则
                rules: {
                    name: [{
                        required: true,
                        message: '请输入分区名字',
                        trigger: 'blur'
                    },
                        {
                            max: 30,
                            message: '长度最多为30个字符',
                            trigger: 'blur'
                        }
                    ],
                    code: [{
                        required: true,
                        message: '请输入分区编码',
                        trigger: 'blur'
                    },
                        {
                            max: 30,
                            message: '长度最多为30个字符',
                            trigger: 'blur'
                        }
                    ],
                    area: [{
                        required: true,
                        pattern: /^(([1-9][0-9]*|0)\.([0-9]*)$)|^([1-9][0-9]*|0)$/,
                        message: '请输入数字',
                        trigger: 'blur'
                    }],
                    userCount: [{
                        required: true,
                        pattern: /^(0|[1-9][0-9]*)$/,
                        message: '请输入整数',
                        trigger: 'blur'
                    }],
                    consumption: [{
                        required: true,
                        pattern: /^(([1-9][0-9]*|0)\.([0-9]*)$)|^([1-9][0-9]*|0)$/,
                        message: '请输入数字',
                        trigger: 'blur'
                    }],
                    pipeCount: [{
                        required: true,
                        pattern: /^(0|[1-9][0-9]*)$/,
                        message: '请输入整数',
                        trigger: 'blur'
                    }],
                    flowCount: [{
                        required: true,
                        pattern: /^(0|[1-9][0-9]*)$/,
                        message: '请输入整数',
                        trigger: 'blur'
                    }],
                    pressLow: [{
                        required: true,
                        pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g,
                        message: '请输入数字',
                        trigger: 'blur'
                    }],
                    pressHigh: [{
                        required: true,
                        pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g,
                        message: '请输入数字',
                        trigger: 'blur'
                    }],
                    flowLow: [{
                        required: true,
                        pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g,
                        message: '请输入数字',
                        trigger: 'blur'
                    }],
                    flowHigh: [{
                        required: true,
                        pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g,
                        message: '请输入数字',
                        trigger: 'blur'
                    }],
                    pipeLength: [{
                        required: true,
                        pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g,
                        message: '请输入数字',
                        trigger: 'blur'
                    }],
                    pipeInfo: [{
                        required: true,
                        message: '请输入管网基本信息',
                        trigger: 'blur'
                    },
                        {
                            max: 100,
                            message: '长度最多为100个字符',
                            trigger: 'blur'
                        }
                    ],
                },
                // 待提交的数据
                partForm: {
                    companyId: '',
                    pid: '',
                    code: '',
                    name: '',
                    lev: '1',
                    zone: '',
                    area: 0,
                    userCount: 0,
                    pipeLength: 0,
                    pipeInfo: '',
                    pipeCount: 0,
                    valveCount: 0,
                    flowCount: 0,
                    consumption: 0,
                    monitorList: [],
                    id: '',
                    flowLow: 0,
                    flowHigh: 0,
                    pressLow: 0,
                    pressHigh: 0,
                    waterUserList: []
                },
                // 选取进出水流量计
                post_newPoint: { // 提交点的名字
                    name: '',
                    top_: '',
                    left_: '',
                    tips: '',
                    id: '',
                    type: '0', // 进水流量计 ‘0’ 出水流量计 ‘1’
                    showFlag: false,
                    eidtOrdel: true, // 默认编辑  或者查看
                },
                searchPannelFlag: false, //多图层待选的列表弹窗
                showView: '1', // '1' 分区列表和 分区水量列表  ‘2’新增分区
                ifEditWater: true, //编辑水量
                editPartTip: '', // 编辑分区的弹窗
                partModelFlag: false, //编辑分区弹窗
                editPost: { // 编辑的数据更新

                },
                waterValList: [], //分区水量 列表
                date_ym: '', //年月字符串

                colorTips: '漏损率颜色 设置', //色盘的 弹窗 tip
                colorModelFlag: false, //色盘的弹窗 开关
                colorList: [{
                    rateGrater: 2,
                    rateLess: '',
                    colorCode: 'rgb(0, 153, 102)'
                },
                    {
                        rateGrater: 5,
                        rateLess: 2,
                        colorCode: 'rgb(255, 255, 0)'
                    },
                    {
                        rateGrater: 5,
                        rateLess: 10,
                        colorCode: 'rgb(255, 0, 0)'
                    },
                    {
                        rateGrater: '',
                        rateLess: '5',
                        colorCode: 'rgb(226, 83, 77)'
                    }
                ]
            };
        },
        methods: {
            // 打开 色盘 弹窗
            openColorModel() {
                this.colorModelFlag = true;
            },
            // 关闭色盘
            closeColorModel() {
                this.colorModelFlag = false;
            },
            // 色盘的 输入判断
            getVal(e, index) {
                let regexp = /^[1-9][0-9]*([.][0-9]+)?$/;
                let value = e.target.value;
                if (value) {
                    let flag = regexp.test(value);
                    if (!flag) {
                        if (index == 0) {
                            this.colorList[0].rateGrater = '0';
                            this.colorList[1].rateGrater = '0';
                        }
                        if (index == 11) {
                            this.colorList[1].rateGrater = '0';
                            this.colorList[0].rateGrater = '0';
                        }
                        if (index == 12) {
                            this.colorList[1].rateLess = '0';
                            this.colorList[2].rateGrater = '0';
                        }
                        if (index == 21) {
                            this.colorList[2].rateGrater = '0';
                            this.colorList[1].rateLess = '0';
                        }
                        if (index == 22) {
                            this.colorList[2].rateLess = '0';
                            this.colorList[3].rateGrater = '0';
                        }
                        if (index == 3) {
                            this.colorList[3].rateGrater = '0';
                            this.colorList[2].rateLess = '0';
                        }
                        return;
                    }
                }

                if (index == 0) {
                    this.colorList[0].rateGrater = value;
                    this.colorList[1].rateLess = value;
                }
                if (index == 11) {
                    this.colorList[1].rateLess = value;
                    this.colorList[0].rateGrater = value;
                }
                if (index == 12) {
                    this.colorList[1].rateGrater = value;
                    this.colorList[2].rateLess = value;
                }
                if (index == 21) {
                    this.colorList[2].rateLess = value;
                    this.colorList[1].rateGrater = value;
                }
                if (index == 22) {
                    this.colorList[2].rateGrater = value;
                    this.colorList[3].rateLess = value;
                }
                if (index == 3) {
                    this.colorList[3].rateLess = value;
                    this.colorList[2].rateGrater = value;
                }

            },
            // 搜索这个要素
            searchThis(val) {
                let type = val.layerID;
                this.searchPannelFlag = false;
                if (type != 'liuliang') {
                    return;
                }
                this.post_newPoint.showFlag = true;
                this.post_newPoint.tips = val.name;
                this.post_newPoint.id = val.id;
            },
            // 选择进出水流量计  弹窗
            changeDirct(e) {
                if (e == '0') {
                    this.post_newPoint.type = '0';
                }
            },
            // 保存 色盘设置值
            save_leakColor() {


                let val_31 = this.colorList[1].rateLess;
                val_31 = val_31 ? val_31 : '0';
                let val_32 = this.colorList[1].rateGrater;
                val_32 = val_32 ? val_32 : '0';

                let val_21 = this.colorList[2].rateLess;
                val_21 = val_21 ? val_21 : '0';
                let val_22 = this.colorList[2].rateGrater;
                val_22 = val_22 ? val_22 : '0';

                console.log(val_31, val_32);
                console.log(val_21, val_22);

                if (parseFloat(val_21) > parseFloat(val_22)) {
                    this.$message.warning('您输入的数值有误');
                    return;
                }
                if (parseFloat(val_31) > parseFloat(val_32)) {
                    this.$message.warning('您输入的数值有误');
                    return;
                }

                this.saveLeakColor_();

            },
            // 保存色盘 配置
            saveLeakColor_() {
// 				let that = this;
// 				let temp_list = this.colorList;
// 				saveLeakColor(temp_list, that).then(res => {
// 					that.colorModelFlag = false;
//
// 					setTimeout(() => {
// 						that.$message.success('配置成功');
// 						that.getLeakColor_();
// 					}, 500);
// 				});
            },
            // 获取色盘色值
            getLeakColor_() {


            },
            // 保存进出水流量计 到暂存点
            saveDirct() {
                let that = this;
                this.partForm.monitorList.push({
                    type: that.post_newPoint.type,
                    id: that.post_newPoint.id
                });
                that.post_newPoint.showFlag = false;
            },
            // 关闭分区编辑的弹窗
            closePartBg() {
                this.partModelFlag = false;
            },
            // 切换到 新增页面
            gotoAddView() {
                this.showView = '2';
            },
            // 关闭 选流量计的方向的弹窗
            closeModel(flag) {
                this.post_newPoint.showFlag = false;
            },
            // 编辑弹窗显示
            editPartModelShow(val) {
                this.partModelFlag = true;
                this.editPartTip = val.label;
                this.getAreaInfo_(val.id);
            },
            //校验当前的 水量 书否是数字
            validate_num(e, index, type) {

                let temp_val = e.target.value;
                if (!temp_val) {
                    return;
                }
                let regexp = /^(([1-9][0-9]*|0)\.([0-9]*)$)|^([1-9][0-9]*|0)$/;

                let flag = regexp.test(temp_val);

                if (!flag) {
                    this.waterValList[index][type] = '0.00';
                }


                // console.log(e);
                // console.log(index);
                // console.log(type);
            },
            // 保存修改过得 分区水量
            saveWaterEdit() {
                let that = this;
                let list = [...that.waterValList];
                let date_str = $('#date_ym').val();
                let temp_year = date_str.split('-')[0];
                let temp_month = date_str.split('-')[1];
                let temp_postList = [];
                list.map(val => {
                    let json = {
                        yearnum: temp_year,
                        monthnum: temp_month
                    };
                    json.areaId = val.areaId;
                    json.supply = val.supply === null ? '' : val.supply;
                    json.useWater = val.useWater === null ? '' : val.useWater;
                    json.uncountWater = val.uncountWater === null ? '' : val.uncountWater;
                    json.companyId = that.companyId;
                    temp_postList.push(json);
                });
                that.saveLeakRecord_(temp_postList);
            },
            // 保存上报 水量
            saveLeakRecord_(temp_postList) {
                // let that = this;
                // saveLeakRecord(temp_postList, that).then(res => {
                // 	that.ifEditWater = true;
                // 	that.$message.success('更新成功');
                // 	setTimeout(() => {
                // 		that.getAreaLeakMonthList_('1');
                // 	}, 500);
                // });
            },
            // 触发 新增分区
            updatePart() {
                let that = this;
                this.$refs.undateForm.validate((valid) => {
                    if (valid) {
                        if (!that.editPost.zone) {
                            that.$message.warning('请绘制分区');
                            return;
                        }

                        let temp_min_flow = parseFloat(that.editPost.flowLow);
                        let temp_max_flow = parseFloat(that.editPost.flowHigh);

                        if (temp_min_flow > temp_max_flow) {
                            that.$message.warning('最小流量不能大于最大流量');
                            return;
                        }

                        let temp_min_press = parseFloat(that.editPost.pressLow);
                        let temp_max_press = parseFloat(that.editPost.pressHigh);

                        if (temp_min_press > temp_max_press) {
                            that.$message.warning('最小水压不能大于最大水压');
                            return;
                        }
                        that.updateArea_();
                    } else {

                        return false;
                    }
                });
            },
            callBackList(arr) {

            },
            toggleFlag(flag) {
                if (flag) {
                    this.defaultWidth = 'calc(100% - 350px)';
                } else {
                    this.defaultWidth = '100%';
                }
            },
            selectThisTab(index) {
                let that = this;
                this.tab_activedIndex = index;
                if (this.tab_activedIndex == 1) {
                    this.$nextTick(() => {
                        $('#date_ym').val(that.date_ym);
                        that.getAreaLeakMonthList_('1');
                    });
                }
            },
            // 搜索 分区水量
            search() {
                this.getAreaLeakMonthList_('1');
            },
            // 切换到编辑模式
            editWaterAction() {
                this.ifEditWater = false;
            },
            //跳转页面 分区水量
            goto_page(num) {
                this.getAreaLeakMonthList_(num);
            },
            hiddenModel(obj) {
                this.showModel = false;
                this.delId = '';
            },
            // 真的删除分区
            sureDelThis(id) {
                // let temp_id = this.delId;
                this.deleteArea_();
            },
            // 关闭 删除窗口
            delPart(id) {
                this.showModel = true;
                this.delId = id;
            },
            // 删除 分区 接口
            deleteArea_() {
                // let that = this;
                // let temp_id = this.delId;
                // deleteArea({
                // 	id: temp_id,
                // 	delFlag: '1'
                // }, that).then(res => {
                // 	that.showModel = false;
                // 	setTimeout(() => {
                // 		that.$message.success('删除成功!');
                // 		init_part();
                // 		that.getAreaTree_();
                // 	}, 500);
                // });
            },
            // 开始绘制 分区
            drawPart() {
                this.drawFlag = true;
                drawPart_func(true);
                this.tempPartLayer.removeAll();
            },
            // 获取分区详情
            getAreaInfo_(id) {

            },
            goList() {
                let that = this;
                this.$refs.partForm.validate((valid) => {
                    if (valid) {

                        if (!that.partForm.zone) {
                            that.$message.warning('请绘制分区');
                            return;
                        }

                        let temp_min_flow = parseFloat(that.partForm.flowLow);
                        let temp_max_flow = parseFloat(that.partForm.flowHigh);

                        if (temp_min_flow > temp_max_flow) {
                            that.$message.warning('最小流量不能大于最大流量');
                            return;
                        }

                        let temp_min_press = parseFloat(that.partForm.pressLow);
                        let temp_max_press = parseFloat(that.partForm.pressHigh);

                        if (temp_min_press > temp_max_press) {
                            that.$message.warning('最小水压不能大于最大水压');
                            return;
                        }


                        let has_inOut_monitor = false;

                        let temp_monitorList = that.partForm.monitorList;
                        for (let i = 0; i < temp_monitorList.length; i++) {
                            if (temp_monitorList[i].type === '0' || temp_monitorList[i].type === '1') {
                                has_inOut_monitor = true;
                                break;
                            }
                        }

                        if (!has_inOut_monitor) {
                            that.$message.warning('请选择至少一个进水流量计或者出水流量计');
                            return;
                        }


                        that.addArea_();
                    } else {

                        return false;
                    }
                });
            },
            loadGis() {
                let that = this;
                esriLoader.loadModules(['dojo/on', 'esri/Map', 'esri/views/MapView', 'esri/layers/WebTileLayer',
                    'esri/layers/GraphicsLayer', 'esri/Graphic', 'esri/symbols/PictureMarkerSymbol', 'esri/geometry/Point',
                    'esri/geometry/Polygon', 'esri/geometry/Polyline', 'dse/utils/EleClash', 'dojo/domReady!'
                ], options)
                    .then(([on, Map, MapView, WebTileLayer, GraphicsLayer, Graphic, PictureMarkerSymbol, Point, Polygon, Polyline,
                               EleClash
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
                                        urlTemplate: 'http://{subDomain}.tianditu.gov.cn/DataServer?T=cia_w&X=${col}&Y=${row}&L=${level}&tk=94aa433732f999e8f30b6a7b0141cbfd', //注记
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
                                ],
                            }
                        });
                        that.view = new MapView({
                            container: 'gisMap',
                            map: that.map,
                            zoom: 10,
                            center: [106.462165, 36.96828],
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

                        //配置文件中自带空间数据
                        loadJSON_func = function (layerID) {
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
                                if (item.initShow) {
                                    loadJSON_func(item.id);
                                }
                            });
                        }

                        // 监听 popup 随地图移动
                        that.view.watch('extent', () => {
                            //popup随地图移动
                            if (that.post_newPoint.showFlag) {
                                let mapPoint = new Point({
                                    x: that.view_new_point[0],
                                    y: that.view_new_point[1],
                                    spatialReference: {
                                        wkid: 4326
                                    }
                                });
                                let mps = that.view.toScreen(mapPoint);
                                console.log(mps);
                                that.post_newPoint.left_ = mps.x;
                                that.post_newPoint.top_ = mps.y;
                            }
                        });


                        // 显示 水流图层
                        that.flowLayer = new GraphicsLayer('flow');
                        that.map.add(that.flowLayer);


                        that.flowLayer.removeAll();


                        // 显示 水压图层
                        that.pressLayer = new GraphicsLayer('press');
                        that.map.add(that.pressLayer);


                        that.flowLayer.removeAll();


                        /**
                         * 管网的图层
                         *
                         */

                        that.pipeLayer = new GraphicsLayer('pipeLayer');
                        that.map.add(that.pipeLayer);
                        that.pipeLayer.removeAll();


                        // 显示 大用水户
                        that.usersLayer = new GraphicsLayer('usersLayer');
                        that.map.add(that.usersLayer);

                        that.usersLayer.removeAll();


                        /**
                         *  初始化 分区 面
                         */
                        that.partLayer = new GraphicsLayer('partLayer');
                        that.map.add(that.partLayer);

                        // 临时绘制的面的 图层
                        that.tempPartLayer = new GraphicsLayer('tempPartLayer');
                        that.map.add(that.tempPartLayer);

                        init_part = function () {
                            that.partLayer.removeAll();
// 							getAreaTree({
// 								companyId: that.partForm.companyId
// 							}, that).then(res => {
// 								let {
// 									data
// 								} = res;
// 								data = data && data.length > 0 ? data : [];
//
//
// 								for (let i = 0; i < data.length; i++) {
// 									let graphic_part = new Graphic({
// 										symbol: {
// 											type: 'simple-fill',
// 											color: [0, 0, 255, 0.2],
// 											style: 'solid',
// 											outline: {
// 												color: 'blue',
// 												width: '0.5px'
// 											}
// 										},
// 										attributes: {}
// 									});
// 									let polygon = new Polygon({
// 										hasZ: false,
// 										hasM: false,
// 										rings: [],
// 										spatialReference: {
// 											wkid: 4326
// 										}
// 									});
// 									//分割出多面
// 									if (data[i].zone) {
// 										let strs = data[i].zone.substring(data[i].zone.indexOf('(')).split('),');
// 										strs.forEach(ringStr => {
// 											let ring = [];
// 											let pointstrs = ringStr.replace(/\(/g, '').replace(/\)/g, '').split(',');
// 											pointstrs.forEach(pointstr => {
// 												let points = pointstr.split(' ');
// 												ring.push(points);
// 											});
// 											polygon.rings.push(ring);
// 										});
// 										graphic_part.geometry = polygon;
// 										graphic_part.attributes.layerID = 'yali';
// 										graphic_part.attributes.icon = 'press';
// 										that.partLayer.add(graphic_part);
//
// 									}
// 								}
// 							});
//
                        };
                        init_part();
                        // 分区 碰撞检测
                        let temp_eleClash = null;
                        // 绘制分区
                        drawPart_func = function (flag) {

                            temp_eleClash = new EleClash({
                                view: that.view,
                                pipeLayer: that.pipeLayer,
                                flowLayer: that.flowLayer,
                                pressLayer: that.pressLayer,
                                usersLayer: that.usersLayer,
                                partLayer: that.partLayer,
                                tempPartLayer: that.tempPartLayer,
                                that_: that
                            });
                            temp_eleClash.draw_polygon(flag);

                        };

                        // 新增 一个巡检点
                        //点击显示popup
                        that.view.on('click', (event) => {
                            that.view.hitTest(event).then(function (response) {
                                console.log(response);

                                // 点击 开始绘图的时候 放开
                                if (that.drawFlag) {
                                    let mapPonit = response.screenPoint.mapPoint;
                                    that.view_new_point = [mapPonit.longitude, mapPonit.latitude];

                                    that.post_newPoint.top_ = response.screenPoint.y;
                                    that.post_newPoint.left_ = response.screenPoint.x;

                                    if (response.results.length > 0) {
                                        let filterLayers = []; //受保护的 业务图层 也就是需要弹窗的业务图层
                                        let resList = response.results;

                                        let configList = window.gisConfig.optionalLayers;
                                        for (let i = 0; i < configList.length; i++) {
                                            for (let j = 0; j < resList.length; j++) {
                                                if (configList[i].id == resList[j].graphic.attributes.layerID) {
                                                    filterLayers.push({
                                                        layerID: resList[j].graphic.attributes.layerID,
                                                        name: resList[j].graphic.attributes.name,
                                                        icon: resList[j].graphic.attributes.icon,
                                                        id: resList[j].graphic.attributes.id
                                                    });
                                                }
                                            }
                                        }

                                        if (filterLayers.length == 1) {
                                            that.searchThis(filterLayers[0]);
                                        } else if (filterLayers.length > 1) {
                                            // 展示 待选择的图层列表
                                            that.searchLists = filterLayers;
                                            that.searchPannelFlag = true;
                                        } else {
                                            that.searchPannelFlag = false;
                                        }
                                    }
                                }
                            });
                        });


                    })
                    .catch(err => {
                        console.error(err);
                    });
            },

            // 获取 分区列表
            getAreaTree_() {
                // let that = this;
                // getAreaTree({
                // 	companyId: that.partForm.companyId
                // }, that).then(res => {
                // 	let {
                // 		data
                // 	} = res;
                // 	data = data && data.length > 0 ? data : [];
                // 	that.partList = data;
                // });
            },
            // 保存新增的分区
            addArea_() {
// 				let that = this;
// 				let temp_formData = this.partForm;
// 				addArea(temp_formData, that).then(res => {
// 					that.$message.success('保存成功');
// 					that.tempPartLayer.removeAll();
// 					that.saveFlag = true;
//
// 					setTimeout(() => {
// 						that.showView = '1';
// 						that.tab_activedIndex = 0;
// 						that.getAreaTree_();
// 						init_part();
// 					}, 2000);
//
// 				});
            },
            // 返回到分区列表
            gotoPartList() {
                drawPart_func(false);
                this.saveFlag = true;
                this.drawFlag = false;
                this.showView = '1';
                this.tab_activedIndex = 0;
                this.getAreaTree_();
            },
            // 更新分区配置
            updateArea_() {
                let that = this;

                let json = {};
                let temp_obj = that.editPost;
                json.code = temp_obj.code;
                json.name = temp_obj.name;
                json.zone = temp_obj.zone;
                json.area = temp_obj.area;
                json.userCount = temp_obj.userCount;
                json.pipeLength = temp_obj.pipeLength;
                json.pipeInfo = temp_obj.pipeInfo;
                json.pipeCount = temp_obj.pipeCount;
                json.valveCount = temp_obj.valveCount;
                json.flowCount = temp_obj.flowCount;
                json.consumption = temp_obj.consumption;
                json.id = temp_obj.id;
                json.flowLow = temp_obj.flowLow;
                json.flowHigh = temp_obj.flowHigh;
                json.pressLow = temp_obj.pressLow;
                json.pressHigh = temp_obj.pressHigh;
                // updateArea(json, that).then(res => {
                // 	that.partModelFlag = false;
                // 	setTimeout(() => {
                // 		that.$message.success('分区更新成功');
                // 		that.getAreaTree_();
                // 	}, 500);
                // });
            },
            // 获取 分区水量列表
            getAreaLeakMonthList_(pageNum) {
                // let that = this;
                // let date = $('#date_ym').val();
                // let temp_year = date.split('-')[0];
                // let temp_month = date.split('-')[1];
                // getAreaLeakMonthList({
                // 	areaNm: '',
                // 	yearNum: temp_year,
                // 	monthNum: temp_month,
                // 	areaId: '',
                // 	pageNum: pageNum,
                // 	pageSize: '10'
                // }, that).then(res => {
                // 	that.waterValList = res.data.rows && res.data.rows.length > 0 ? res.data.rows : [];
                // 	that.totalNum = res.data.total > 0 ? Math.ceil(res.data.total / 10) : 1;
                // 	that.currentPage = pageNum;
                // });
            }
        },
        mounted() {
            this.loadGis();
        },
        created() {
            this.partForm.companyId = this.$store.getters.get_companyId;
            this.partForm.id = uuid_(32);
            this.getAreaTree_();
            this.companyId = this.$store.getters.get_companyId;
            let time = new Date();
            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            this.date_ym = year + '-' + month;

            this.getLeakColor_();


        }

    };
</script>

<style lang="scss">
    .esri-ui-top-left {
        top: 0px !important;
    }

</style>

<style scoped lang="scss">
    #zoneConfig {
        width: 100%;
        height: 100%;
        position: relative;

        #gisMap {
            height: 100%;
            position: relative;

            .colorDesk {
                width: 200px;
                height: 170px;
                background: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 1);
                position: absolute;
                top: 10px;
                right: 20px;
                z-index: 1;

                .setting-btn {
                    width: 60px;
                    margin: 0 auto;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    background: #0b83fe;
                    color: #fff;
                    cursor: pointer;
                    border-bottom-left-radius: 3px;
                    border-bottom-right-radius: 3px;
                }

                p {
                    width: 100%;
                    text-align: center;

                    span {
                        display: inline-block;

                        &:first-child {
                            width: 40px;
                        }

                        &:last-child {
                            width: calc(100% - 50px);
                        }

                        &.cycle {
                            display: inline-block;
                            width: 12px;
                            height: 12px;
                            border-radius: 50%;
                        }
                    }
                }
            }
        }

        input.Wdate {
            height: 28px;
        }

        .search-list {
            position: absolute;
            top: 100px;
            left: 20px;
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
                    height: 20px;

                    &:hover {
                        background: rgba(0, 0, 0, 0.3);
                    }

                    .col {
                        display: flex;
                        align-items: center;
                        padding: 0 5px;

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

        .drawTip {
            position: absolute;
            z-index: 1;
            width: 120px;
            border: 1px solid #0b83fe;
            background: #fff;
        }

        #bgModel {
            .actions {
                padding-bottom: 20px;
            }
        }


        table.innerTable {
            thead {
                tr {
                    th {
                        &:last-child {
                            width: 80px;
                        }
                    }
                }
            }

            tbody {
                tr {
                    td {
                        span.edit {
                            width: 40px;
                        }

                        span.del {
                            width: 40px;
                        }

                        input {
                            display: inline-block;
                            width: calc(100% - 20px);
                            border: 1px solid #ccc;
                        }
                    }
                }
            }
        }

        table.table-color {
            width: 100%;
            border-spacing: 0;

            td {
                height: 40px;

                &:first-child {
                    text-align: right;
                }

                &:last-child {
                    text-align: left;
                }

                input {
                    display: inline-block;
                    width: 100px;
                }

                .colorLine {
                    border: 1px solid #ccc;
                    display: inline-block;
                    width: 40px;
                    height: 24px;
                }

                /deep/ .m-colorPicker .box {
                    position: absolute;
                    left: -200px;
                    z-index: 1000;
                    display: none;

                    &.open {
                        display: block;
                    }
                }


            }
        }

        .lineDouble {
            width: 100%;
            display: flex;
            flex-flow: wrap;
            justify-content: flex-start;
            align-items: center;

            .el-form-item {
                width: 50%;

                textarea {
                    min-width: 180px;
                    resize: none;
                    height: 200px;
                }
            }
        }

        .searchBox {
            width: 200px;
            height: 30px;
            line-height: 30px;
            position: absolute;
            top: 10px;
            left: 80px;
            z-index: 10;
        }

        .searchWrap {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;

            .left {
                span.search-btn {
                    display: inline-block;
                    margin-left: 2px;
                    width: 40px;
                    height: 28px;
                    background: #0b83fe;
                    color: #fff;
                    cursor: pointer;
                    line-height: 28px;
                    text-align: center;
                }
            }

            .editWater-btn {
                display: inline-block;
                width: 60px;
                text-align: center;
                background: #0b83fe;
                color: #fff;
                cursor: pointer;
                line-height: 30px;
                float: right;
            }
        }

        .table-list {
            width: 100%;
            height: calc(100% - 100px);
        }

        .slide-table {
            position: absolute;
            right: 0px;
            top: 0px;
            z-index: 10;
            height: 100%;

            .fnHeader {
                padding: 5px 10px;
                font-size: 16px;
                font-weight: bold;
                text-align: center;
                background-color: #fff;
            }

            .addPart-btn {
                position: absolute;
                top: 5px;
                right: 8px;
                z-index: 100;
                width: 80px;
                line-height: 30px;
                height: 30px;
                background: #0b83fe;
                color: #fff;
                cursor: pointer;
                text-align: center;
            }

            .tabs {
                width: 100%;
                height: 30px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 10px;

                .tab-item {
                    width: 80px;
                    cursor: pointer;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;

                    &.actived {
                        background: #2a91db;
                        color: #fff;
                    }
                }
            }

            .table-content {
                width: 100%;
                height: calc(100% - 50px);
                overflow-y: auto;

                table {
                    span.edit {
                        width: 30px;
                        cursor: pointer;
                        color: #0b83fe;
                    }

                    span.del {
                        width: 30px;
                        cursor: pointer;
                        color: #0b83fe;
                    }
                }
            }

            .addPart {
                width: 100%;
                height: calc(100% - 50px);

                .add-button {
                    width: 80px;
                    text-align: center;
                    margin: 0 auto;
                    height: 50px;
                    line-height: 30px;
                    padding: 10px 0;
                    cursor: pointer;
                    color: #fff;

                    span {
                        display: inline-block;
                        height: 30px;
                        width: 100%;
                        line-height: 30px;
                        background: #2a91db;
                    }
                }

                .input-content {
                    width: 100%;
                    height: calc(100% - 20px);

                    .row {
                        width: 100%;
                        height: 30px;
                        line-height: 30px;

                    }

                    .row:first-child {
                        width: 100%;
                        padding: 0 10px;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        border-bottom: 1px solid #ccc;

                        span {
                            display: inline-block;
                            margin-right: 10px;
                        }
                    }

                    .el-form {
                        width: 100%;
                        height: calc(100% - 60px);
                        overflow: auto;

                        textarea {
                            display: inline-block;
                            width: 110px;
                            height: 120px;
                            resize: none;
                        }
                    }


                    .actions {
                        width: 100%;
                        height: 50px;
                        padding: 10px 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        span {
                            display: inline-block;
                            height: 30px;
                            line-height: 30px;
                            padding: 0 15px;
                            cursor: pointer;
                            background: #00a854;
                            color: #fff;
                        }
                    }
                }
            }
        }

    }
</style>
