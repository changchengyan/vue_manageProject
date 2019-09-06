<template>
    <div id="makePlan">
        <div id="gis"></div>
        <div class="leftWrap">
            <div class="toggleBar" @click="toggleShow">
                <template v-if="showTable">
                    <i class="el-icon-arrow-left"></i>
                </template>
                <template v-else>
                    <i class="el-icon-arrow-right"></i>
                </template>
            </div>
            <div class="innerWrap" v-if="showTable">
                <div class="topHead">
                    <span class="rect"> </span>
                    <span>巡检计划定制</span>
                </div>
                <div class="tableContent">
                    <table>
                        <tr>
                            <td><i class="el-icon-star-on"></i> <span>巡检名称</span></td>
                            <td><input type="text" placeholder="请输入巡检名称" v-model="plan.planName"></td>
                        </tr>
                        <tr>
                            <td><i class="el-icon-star-on"></i> <span>巡检周期</span></td>
                            <td>
                                <el-radio v-model="plan.planCycle" @change="getPlanCycle" label="年">年</el-radio>
                                <el-radio v-model="plan.planCycle" @change="getPlanCycle" label="季度">季度</el-radio>
                                <el-radio v-model="plan.planCycle" @change="getPlanCycle" label="月">月</el-radio>
                                <el-radio v-model="plan.planCycle" @change="getPlanCycle" label="周">周</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td><i class="el-icon-star-on"></i><span>网格区域</span></td>
                            <td class="drawPolygon" @click="drawPolygon_"><span>点击设置巡检区域(在地图上框选)</span></td>
                        </tr>
                        <tr>
                            <td><i class="el-icon-star-on"></i><span>区域名称</span></td>
                            <td class="drawPolygon" @click="drawPolygon_"><span>{{polygon_postObj.areaName}}</span></td>
                        </tr>
                        <tr>
                            <td><i class="el-icon-star-on"></i><span>签到点</span></td>
                            <td>
                                <span>{{makeNum}}个</span>
                                <img src="../../assets/images/common/mark.png" alt="">
                                <span class="addPoint" :class="{actived:allowAdd}" @click="addPoint">新增</span>
                            </td>
                        </tr>
                        <tr>
                            <td><i class="el-icon-star-on"></i><span>巡检人员</span></td>
                            <td>
                                <div class="workersTree" style="margin-top: 30px">
                                    <el-tree :data="workers" :props="defaultProps" accordion>
                                    </el-tree>
                                </div>
                                <span class="selectBtn" @click="showPeopleModel">选择</span>
                            </td>
                        </tr>

                        <tr>
                            <td><i class="el-icon-star-on"></i><span>巡检方式</span></td>
                            <td>
                                <el-radio v-model="plan.inspectMode" label="0">步行</el-radio>
                                <el-radio v-model="plan.inspectMode" label="1">自行车</el-radio>
                                <el-radio v-model="plan.inspectMode" label="2">摩托车</el-radio>
                                <el-radio v-model="plan.inspectMode" label="3">汽车</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td><i class="el-icon-star-on"></i><span>巡检内容</span></td>
                            <td>
                                <textarea placeholder="巡检内容" v-model="plan.inspectInfo"></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td><i class="el-icon-star-on"></i><span>备注</span></td>
                            <td>
                                <textarea placeholder="设备专项维护在此备注设备类型" v-model="plan.remarks"></textarea>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="action">
                    <div class="save" @click="save" :class="{notAllow:save_flag===true}">保存</div>
                    <div class="cancel" @click="cancel">取消</div>
                </div>
            </div>
        </div>
        <dse-view :showViewModel="showPeopleTreeFlag" :title="'选择人员'" @hiddenSelf="hiddenPeopleModel">
            <div class="peopleSelectTree">
                <div class="peopleTree">
                    <dse-shuttle-box @thisWorkers="getWorkers" :defaultWorkers="workersList"/>
                </div>
                <div class="actions">
                    <div class="cancel" @click="cancelSelectPeople">取消</div>
                    <div class="config" @click="configSelectPeople">确定</div>
                </div>
            </div>
        </dse-view>
        <dse-save-status @delThis="closeSaveModel" :showModel="toggleShowSaveStatus" :type="1" :flag="saveFlag"
                         :content="saveMsg"/>
    </div>
</template>

<script>
    import * as esriLoader from 'esri-loader';


    import DseView from '../../common/components/toast/DseView';
    import DseSaveStatus from '../../common/components/toast/DseSaveStatus';
    import DseShuttleBox from '../../common/components/DseShuttleBox';

    import {
        uuid_
    } from '@/utils/uuid';

    import JudgeTime from '@/utils/judgeTime';

    esriLoader.loadCss(window.DSE.arcgis_mainCss);

    let startJs = window.DSE.arcgis_startJS;
    const options = {
        url: startJs,
        dojoConfig: window.DSE.gisConfig
    };


    export default {
        components: {
            DseShuttleBox,
            DseSaveStatus,
            DseView
        },
        data() {
            return {
                view: null,
                map: null,
                layers: [],
                contentList: [{
                    value: '1',
                    label: '管道及附属设备'
                },
                    {
                        value: '2',
                        label: '消防栓'
                    }
                ],
                toggleShowSaveStatus: false, //显示保存状态的弹窗
                saveFlag: false, //保存状态的判断
                saveMsg: '', // 保存状态的提示信息
                contentItem: '', //巡检内容
                showTable: true, //显示左侧窗口
                gistools_left: 380, //gis工具窗口
                allowAdd: false, //允许添加点标记
                makeNum: 0, //标记数量
                areaID: '', //区域ID
                polygon_postObj: {
                    //  上传区域的信息
                    id: '',
                    areaName: '',
                    planArea: '',
                    areas: 0,
                    areaColor: ''
                },
                plan: {
                    // 上传计划信息
                    id: '', //计划ID
                    planName: '',
                    planCycle: '',
                    inspectPlanDate: '',
                    personId: '',
                    areaId: '',
                    inspectMode: '',
                    inspectInfo: '',
                    signCode: '',
                    patrolineLength: '',
                    remarks: '',
                    inspectPlanDateEnd: ''
                },
                markPoints: [{
                    // 上传点的信息
                    pointName: '',
                    lgtd: '',
                    lttd: '',
                    inspectArea: '',
                    planID: ''
                }],
                addWorkers: [],
                showPeopleTreeFlag: false, // 显示选择人员的弹窗
                peopleTreeSelect: [], //待选的所有员工
                peopleTreeSelected: [],
                peopleSelected_show: null,
                save_success_flagCount: 0, //提交保存的计数器 等于4 才算保存成功
                timer: null, //保存状态轮询
                workers: [], //显示选中的不同部门的工作人员
                defaultProps: {
                    children: 'userList',
                    label: 'NAME'
                },
                workersList: [], //初始化的部门员工列表
                post_workers: null,
                post_workerList: [],
                save_flag: false, // 点击保存后关闭保存按钮 默认是 可以点击的
            };
        },
        methods: {
            toggleShow() {
                this.showTable = !this.showTable;
                if (!this.showTable) {
                    this.gistools_left = 20;
                } else {
                    this.gistools_left = 380;
                }
            },
            closeSaveModel(val) {
                this.toggleShowSaveStatus = val.modelFlag;
            },
            getPlanArea() {
                // let that = this;
                // let temp_areaId = this.polygon_postObj.id;
                // let temp_areaName = this.polygon_postObj.areaName;
                // let temp_planArea = this.polygon_postObj.planArea;
                // let temp_areage = this.polygon_postObj.areas;
                // let temp_areaColor = this.polygon_postObj.areaColor;
                // let temp_planID = this.plan.id;
                //
            },
            getSignPoint() {

            },
            getInspectorPlan() {

            },
            getInspectorInfo() {

            },
            save() {
                let that = this;
                if (this.save_flag === true) {
                    return;
                }
                this.save_flag = true;

                if (this.makeNum == 0) {
                    this.$message.error('请添加签到点!');
                    this.save_flag = false;
                    return;
                }
                if (this.post_workerList.length > that.markPoints.length) {
                    this.$message.error('巡检人数不能大于签到点数!');
                    this.save_flag = false;
                    return;
                }

                if (this.post_workerList.length == 0) {
                    this.$message.error('请添加派工人员!');
                    this.save_flag = false;
                    return;
                }
                if (this.plan.planName === '') {
                    this.$message.error('请填写计划名字!');
                    this.save_flag = false;
                    return;
                }
                this.getPlanArea();
                this.getInspectorPlan();
                this.getInspectorInfo();
                this.getSignPoint();

            },
            drawPolygon_() {

            },
            cancel() {
                this.$router.push({
                    path: '/routing/msg'
                });
                this.$store.commit('setAside_status', true);
                this.$emit('showAside');
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
                                container: 'gis',
                                map: that.map,
                                zoom: 10,
                                center: [105.97957, 36.9786],
                                ui: {
                                    components: ['zoom']
                                }
                            });
                            console.log('进来了吗');
                        }
                    );

            },
            addPoint() {

            },
            hiddenPeopleModel(flag) {
                this.showPeopleTreeFlag = flag;
            },
            showPeopleModel() {
                this.showPeopleTreeFlag = true;
            },
            cancelSelectPeople() {
                this.showPeopleTreeFlag = false;
            },
            configSelectPeople() {
                this.showPeopleTreeFlag = false;
                this.peopleSelected_show = this.selected;
            },
            getWorkers(val) {
                this.workers = val;
                this.formatePostWorkers();
            },
            formatePostWorkers() {
                let that = this;
                let temp_arr = this.workers;
                let temp_post = [];
                if (temp_arr.length) {
                    for (let i = 0; i < temp_arr.length; i++) {
                        for (let j = 0; j < temp_arr[i].userList.length; j++) {
                            temp_post.push({
                                planId: '' + that.plan.id,
                                personId: '' + temp_arr[i].userList[j].ID
                            });
                        }
                    }
                }
                that.post_workerList = temp_post;
            },
            getDepartAndUser_() {

            },
            getPlanCycle(val) {
                let that = this;
                let timeFormate = null;
                switch (val) {
                    case '年':
                        timeFormate = new JudgeTime('1');
                        that.plan.inspectPlanDate = (timeFormate.formateTime()).startTime + ' ' + '00:00:01';
                        that.plan.inspectPlanDateEnd = (timeFormate.formateTime()).endTime + ' ' + '23:23:59';
                        break;
                    case '季度':
                        timeFormate = new JudgeTime('2');
                        that.plan.inspectPlanDate = (timeFormate.formateTime()).startTime + ' ' + '00:00:01';
                        that.plan.inspectPlanDateEnd = (timeFormate.formateTime()).endTime + ' ' + '23:23:59';
                        break;
                    case '月':
                        timeFormate = new JudgeTime('3');
                        that.plan.inspectPlanDate = (timeFormate.formateTime()).startTime + ' ' + '00:00:01';
                        that.plan.inspectPlanDateEnd = (timeFormate.formateTime()).endTime + ' ' + '23:23:59';
                        break;
                    case '周':
                        timeFormate = new JudgeTime('4');
                        that.plan.inspectPlanDate = (timeFormate.formateTime()).startTime + ' ' + '00:00:01';
                        that.plan.inspectPlanDateEnd = (timeFormate.formateTime()).endTime + ' ' + '23:23:59';
                        break;
                }
            }
        },
        computed: {
            selected: function () {
                let temp_select = this.peopleTreeSelected;
                let temp_arr = this.peopleTreeSelect;
                let temp_str = '';
                for (let i = 0; i < temp_select.length; i++) {
                    for (let j = 0; j < temp_arr.length; j++) {
                        if (temp_arr[j].key == temp_select[i]) {
                            temp_str += temp_arr[j].label + ',';
                            break;
                        }
                    }
                }
                return temp_str;
            }
        },
        mounted() {
            let that = this;
            this.$nextTick(()=>{
                setTimeout(()=>{
                    that.createMap('');
                },1000);
            });
        },
        beforeDestroy() {
            this.$store.commit('setAside_status', true);
            this.$emit('showAside');
        },
        created() {
            let that = this;
            // this.getWorkers();
            // let orgId = JSON.stringify(sessionStorage.getItem('user'))
            that.polygon_postObj.id = uuid_(32, 32);
            that.plan.id = uuid_(32, 32);
        }
    };
</script>

<style lang="scss" scoped>
    $baseFont: 14px;
    $baseColor: #333;
    $baseBorderColor: #ccc;
    $baseBg: #fff;
    #makePlan {
        width: 100%;
        height: 100%;
        position: relative;

        i {
            color: red;
        }

        input {
            padding-left: 10px;
        }

        input::-webkit-input-placeholder {
            color: #ccc;
        }

        input::-moz-placeholder {
            color: #ccc;
        }

        input:-ms-input-placeholder {
            color: #ccc;
        }

        textarea {
            border: 1px solid #ccc;
            border-radius: 5px;
            padding-left: 10px;
        }

        .peopleSelectTree {
            width: 100%;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .peopleTree {
                width: 100%;
                display: flex;
                justify-content: center;
            }

            .actions {
                width: 100%;
                padding: 10px;
                display: flex;
                justify-content: center;
                align-items: center;

                div {
                    display: inline-block;
                    padding: 0 20px;
                    background: #0b83fe;
                    line-height: 30px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-left: 10px;
                    color: #fff;
                }
            }
        }

        #gis {
            width: 100%;
            height: 100%;
        }

        .leftWrap {
            position: absolute;
            left: 10px;
            top: 10px;
            height: calc(100% - 20px);

            .toggleBar {
                position: absolute;
                top: 50%;
                right: -24px;
                width: 24px;
                height: 88px;
                line-height: 88px;
                border: 1px solid $baseBorderColor;
                cursor: pointer;
                text-align: center;
                background: #fff;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }

            .innerWrap {
                width: 350px;
                height: 100%;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                font-size: $baseFont;
                color: $baseColor;
                background: $baseBg;

                .topHead {
                    width: 100%;
                    padding: 10px;

                    span:first-child {
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        background: #05beb8;
                        margin-right: 10px;
                    }

                    // border-bottom: 1px solid $baseBorderColor;
                    margin-bottom: 10px;
                }

                .tableContent {
                    width: 100%;
                    height: calc(100% - 80px);
                    overflow-y: auto;

                    table {
                        width: 100%;
                        border-spacing: 0;
                        text-align: center;
                        border-top: 1px solid #ccc;

                        tr {
                            width: 100%;

                            td {
                                // padding: 2px;
                                border-bottom: 1px solid #ccc;
                                width: 80px;
                                line-height: 30px;
                                position: relative; // display: flex;
                                // align-items: center;
                                &:last-child {
                                    width: calc(100% - 80px);
                                }

                                &:first-child {
                                    background: #d6fafa;
                                    font-weight: 600;
                                }

                                input {
                                    display: inline-block;
                                    width: 80%;
                                    border: 1px solid #ccc;
                                    line-height: 20px;
                                    border-radius: 5px;
                                    padding-right: 5px;
                                }

                                .el-date-editor {
                                    width: 80%;
                                }

                                .el-select {
                                    width: 80%;
                                }

                                textarea {
                                    display: inline-block;
                                    margin-top: 10px;
                                    min-height: 80px;
                                    width: 80%;
                                    resize: none;
                                }

                                span.addPoint {
                                    display: inline-block;
                                    padding: 0 5px;
                                    line-height: 20px;
                                    background: gray;
                                    color: #fff;
                                    cursor: pointer;
                                    border-radius: 3px;
                                    /*margin-left: 20px;*/
                                    &.actived {
                                        background: #0b83fe;
                                    }
                                }

                                &.drawPolygon {
                                    cursor: pointer;
                                }

                                img {
                                    width: 16px;
                                    vertical-align: middle;
                                }

                                .selectBtn {
                                    display: inline-block;
                                    padding: 0px 10px;
                                    background: #0b83fe;
                                    line-height: 25px;
                                    color: #fff;
                                    cursor: pointer;
                                    border-radius: 5px;
                                    position: absolute;
                                    /*right: 10px;*/
                                    right: 0;
                                    top: 3px;
                                }

                                .peoples {
                                    display: inline-block;
                                    width: calc(100% - 80px);
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    text-align: center;
                                    margin-right: 50px; // margin-top: 5px;
                                }
                            }
                        }
                    }
                }

                .action {
                    width: 100%;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #fff7f8;

                    div {
                        height: 30px;
                        padding: 0 20px;
                        margin-right: 10px;
                        line-height: 30px;
                        border-radius: 5px;
                        cursor: pointer;

                        &.save {
                            background: #0b83fe;
                            color: #fff;

                            &.notAllow {
                                background: gray;
                                cursor: not-allowed;
                            }
                        }

                        &.cancel {
                            background: #ccccce;
                        }
                    }
                }
            }
        }

        .gistools {
            position: absolute;
            height: 30px;
            top: 20px;
            width: 325px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            background: #fff;
            border-radius: 5px;
        }

        .legend {
            width: 300px;
            height: 300px;
            position: absolute;
            right: 20px;
            bottom: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            padding: 10px;
            font-size: $baseFont;
            color: $baseColor;

            .turbes {
                width: 100%;
                height: 200px;
                overflow-y: auto;

                .item {
                    height: 25px;
                    display: flex;
                    align-items: center;

                    div {
                        width: 50%;
                        text-align: center;
                    }
                }
            }

            .devs {
                width: 100%;
                height: calc(100% - 200px);
                overflow-x: auto;
                display: flex;
                justify-content: flex-start;

                .devItem {
                    width: 60px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    div {
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
</style>
