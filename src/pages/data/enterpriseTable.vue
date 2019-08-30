<template>
    <div id="pipeStandingBook">
        <div class="row">
            <span>分区选择:</span>
            <div class="list" ref="area">
                <template v-if="tempAreaList&&tempAreaList.length>0">
                    <span class="all" :class="{actived:tempAreaCheckAll}" @click="handleAreaCheckAllChange">全部</span>
                    <el-checkbox-group v-model="tempAreaChecked" @change="handleAreaCheckedChange">
                        <el-checkbox v-for="(item,index) in tempAreaList" :label="item" :key="index">
                            <span class="checkbox-text-span tab-item" :title="item.name">{{item.name}}</span>
                        </el-checkbox>
                    </el-checkbox-group>
                </template>

                <template v-else>
                    <span>请配置~~</span>
                </template>
                <div class="show-more-model" v-if="show_model_area">
                    <div class="model-top">
                        <i class="el-icon-close" @click="showMore_area"></i>
                    </div>
                    <div class="left-list">
                        <el-checkbox-group v-model="leftAreaChecked" @change="handleAreaCheckedChange">
                                <el-checkbox v-for="(item,index) in leftAreaList" :label="item" :key="index">
                                    <span class="checkbox-text-span tab-item" :title="item.name">{{item.name}}</span>
                                </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <span class="more" @click="showMore_area" v-if="show_area_more">更多></span>

        </div>

        <div class="row">
            <span>分区选择:</span>
            <div class="list" ref="waterUser">
                <template v-if="tempWaterUserList&&tempWaterUserList.length>0">
                    <span class="all" :class="{actived:tempWaterUserCheckAll}" @click="handleWaterUserCheckAllChange">全部</span>
                    <el-checkbox-group v-model="tempWaterUserChecked" @change="handleWaterUserCheckedChange">
                        <el-checkbox v-for="(item,index) in tempWaterUserList" :label="item" :key="index">
                            <span class="checkbox-text-span tab-item" :title="item.NAME">{{item.NAME}}</span>
                        </el-checkbox>
                    </el-checkbox-group>
                </template>

                <template v-else>
                    <span>请配置~~</span>
                </template>
                <div class="show-more-model" v-if="show_model_waterUser">
                    <div class="model-top">
                        <i class="el-icon-close" @click="showMore_waterUser"></i>
                    </div>
                    <div class="left-list">
                        <el-checkbox-group v-model="leftWaterUserChecked" @change="handleWaterUserCheckedChange">
                            <el-checkbox v-for="(item,index) in leftWaterUserList" :label="item" :key="index">
                                <span class="checkbox-text-span tab-item" :title="item.NAME">{{item.NAME}}</span>
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <span class="more" @click="showMore_waterUser" v-if="show_waterUser_more">更多></span>
        </div>

        <div class="row">
            <span>报表类型:</span>
            <div class="list">
                <span :class="{actived:statusItem==val.value}" @click="get_statusItem(val.value)" class="tab-item" v-for="(val,index) in statusList" :key="index">{{val.label}}</span>
            </div>
        </div>

        <div class="search">
            <div class="top-search">
            <div class="label">时间：</div>
            <div v-show="statusItem==='2' || statusItem==='1'">
                <input id="monthTm" class="Wdate" type="text" onclick="WdatePicker({dateFmt:'yyyy-MM', isShowToday:false,isShowClear:false,readOnly:true})"/>
            </div>
            <div  v-show="statusItem==='0'">
                <input id="dayTm" class="Wdate" type="text" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})"/>
            </div>
            <div v-show="statusItem==='1'">
                <el-select v-model="xunTm">
                    <el-option v-for="item in xunOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button class="export-file" type="primary"><input type="file"  @change="importFile" > 导入</el-button>
            <el-button type="primary" @click="exportListToExcel">导出</el-button>
            <a :href="templateFile" @click="downloadTemplate"><i class="el-icon-download"></i> 下载模板</a>
            </div>
        </div>

        <div class="table-contnet">
            <div class="table-name">每{{statusItem === '0' ? '日' : (statusItem === '1' ? '旬':'月') }}计表水量详情表</div>

            <table class="innerTable" v-if="statusItem !== '0'">
                <thead>
                <tr>
                    <th><span>分区</span></th>
                    <th><span>用户名称</span></th>
                    <th><span>水表编号</span></th>
                    <th><span>日期</span></th>
                    <th><span>起码</span></th>
                    <th><span>止码</span></th>
                    <th><span>合计用水量</span></th>
                    <th><span>备注</span></th>
                </tr>
                </thead>
                <tbody>
                    <template v-if="tempList && tempList.length>0">
                        <tr v-for="(item,index) in tempList" :key="index">
                        <tr v-for="(item,index) in tempList" :key="index">
                            <td :title="item.areaName"><span>{{item.areaName}}</span></td>
                            <td :title="item.userName"><span>{{item.userName}}</span></td>
                            <td :title="item.meterNo"><span >{{item.meterNo}}</span></td>
                            <td :title="item.meterDate"><span>{{item.meterDate}}</span></td>
                            <td :title="item.startNumber"><span>{{item.startNumber}}</span></td>
                            <td :title="item.endNumber"><span>{{item.endNumber}}</span></td>
                            <td :title="item.sumNumber"><span>{{item.sumNumber}}</span></td>
                            <td :title="item.meterRemark"><span>{{item.meterRemark}}</span></td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr><td colspan="13"><span>无数据</span></td></tr>
                    </template>
                </tbody>
            </table>
            <table class="innerTable" v-else>
                <thead>
                <tr>
                    <th><span>分区</span></th>
                    <th><span>用户名称</span></th>
                    <th><span>水表编号</span></th>
                    <th><span>日期</span></th>
                    <th><span>起码</span></th>
                    <th><span>止码</span></th>
                    <th><span>合计用水量</span></th>
                    <th><span>备注</span></th>
                </tr>
                </thead>
                <tbody>
                    <template v-if="tempList && tempList.length>0">
                        <tr v-for="(item,index) in tempList" :key="index">
                        <td :title="item.areaName"><span>{{item.areaName}}</span></td>
                        <td :title="item.userName"><span>{{item.userName}}</span></td>
                        <td :title="item.meterNo"><span >{{item.meterNo}}</span></td>
                        <td :title="item.meterDate"><span>{{item.meterDate}}</span></td>
                        <td :title="item.startNumber"><span>{{item.startNumber}}</span></td>
                        <td :title="item.endNumber"><span>{{item.endNumber}}</span></td>
                        <td :title="item.sumNumber"><span>{{item.sumNumber}}</span></td>
                        <td :title="item.meterRemark"><span>{{item.meterRemark}}</span></td>
                    </tr>
                    </template>
                    <template v-else>
                        <tr><td colspan="12"><span>无数据</span></td></tr>
                    </template>
                </tbody>
            </table>
        </div>

        <dse-loading-animation :showAnimate="showAnimate"></dse-loading-animation>

        <dse-save-status :showModel="showModel" :content="modelContent" :type="modelType" :flag="modelFlag"/>
    </div>
</template>

<script>
    import DseLoadingAnimation from '../../common/components/dseLoadingAnimation';
    import DseSaveStatus from '../../common/components/toast/dseSaveStatus';

    import DateFunc from '@/utils/date_func';
    export  default {
        components: {DseLoadingAnimation,DseSaveStatus},

        data(){
            return{
                //分区选择 多选
                tempAreaCheckAll: false,
                tempAreaChecked: [],
                tempAreaList:[
                    // 豫海镇  王团镇 河西镇 韦州镇 下马关镇 预旺镇  丁塘镇  兴隆乡  田老庄乡  马高庄乡   张家塬乡  窑山管委会   石狮管委会
                    {
                        name:'豫海镇'
                    },
                    {
                        name:'王团镇'
                    },
                    {
                        name:'河西镇'
                    },
                    {
                        name:'韦州镇'
                    },
                    {
                        name:'下马关镇'
                    },
                    {
                        name:'预旺镇'
                    },
                    {
                        name:'丁塘镇'
                    },
                    {
                        name:'兴隆乡'
                    }
                ],

                leftAreaChecked: [],
                leftAreaList:[],

                areaList:[],//分区选择数据

                show_area_more:false,
                show_model_area:false,

                //企业选择 多选
                tempWaterUserCheckAll: false,
                tempWaterUserChecked: [],
                tempWaterUserList:[
                    {
                        NAME:'东部分区'
                    },
                    {
                        NAME:'中部分区'
                    },
                    {
                        NAME:'西部分区'
                    }
                ],

                leftWaterUserChecked: [],
                leftWaterUserList:[],

                waterUserList:[],//企业选择数据

                show_waterUser_more:false,
                show_model_waterUser:false,

                //报表选择 单选
                statusItem:'2',//报表类型
                statusList:[
                    {
                        label:'日报',
                        value:'2'
                    },
                    {
                        label:'月报',
                        value:'0'
                    },
                    {
                        label:'年报',
                        value:'1'
                    }
                    ],//报表选择数据

                //按旬时间选择
                xunTm:'1',
                xunOptions:[
                    {
                        label:'第1旬',
                        value:'1'
                    },
                    {
                        label:'第2旬',
                        value:'2'
                    },
                    {
                        label:'第3旬',
                        value:'3'
                    }
                ],

                tempList:[
                    {
                        areaName:'东部分区',
                        userName:'王团镇',
                        meterNo:'879541234',
                        meterDate:'2019-07-15 00:00',
                        startNumber:'350.67',
                        endDate:'2019-07-21 11:59',
                        endNumber:'580.72',
                        sumNumber:'220.05',
                        meterRemark:''
                    }
                ],

                //报表数据 日
                reportList:[
                    {
                        areaName:'东部分区',
                        userName:'王团镇',
                        meterNo:'879541234',
                        meterDate:'2019-07-15 00:00',
                        startNumber:'350.67',
                        endDate:'2019-07-21 11:59',
                        endNumber:'580.72',
                        sumNumber:'220.05',
                        meterRemark:''
                    }
                ],
                //报表数据 y月
                reportList_month:[
                    {
                        areaName:'东部分区',
                        userName:'王团镇',
                        meterNo:'879541234',
                        meterDate:'2019-06-15 00:00',
                        startNumber:'1000',
                        endDate:'2019-07-15 11:59',
                        endNumber:'1503.27',
                        sumNumber:'503.27',
                        meterRemark:''
                    }
                ],
                //报表数据 y月
                reportList_year:[
                    {
                        areaName:'东部分区',
                        userName:'王团镇',
                        meterNo:'879541234',
                        meterDate:'2019-01-1 00:00',
                        startNumber:'100',
                        endDate:'2019-07-15 11:59',
                        endNumber:'1503.27',
                        sumNumber:'1403.27',
                        meterRemark:''
                    }
                ],

                templateFile:'', // 上传文件的 模板
                showAnimate:false, //文件下载动画,

                //消息弹窗
                modelType: true,//为true,显示保存成功或失败弹窗 ,为false 显示是否删除弹窗
                modelFlag: false,//modelType为 true的情况下 false表示保存失败，true保存成功
                modelContent: '',// 在 modelType 为true的情况下，当前的保存状态  内容从ajax接口中获取
                showModel: false//开关弹窗
            };
        },
        computed: {
        },
        methods:{

            //下载模板
            downloadTemplate(){
                if('0' === this.statusItem){//日报
                    this.templateFile = this.$store.getters.get_filePath + '/template/每日计量水量导入报表.xls';
                }else if('1' === this.statusItem){//旬报
                    this.templateFile = this.$store.getters.get_filePath + '/template/每旬计量水量导入报表.xls';
                }else{//月报
                    this.templateFile = this.$store.getters.get_filePath + '/template/每月计量水量导入报表.xls';
                }
            },

            //分区选择 全部全部事件
            handleAreaCheckAllChange() {
                this.tempAreaCheckAll = true;
                this.leftAreaChecked = [];
                this.tempAreaChecked = [];
            },

            //企业选择 全部事件
            handleWaterUserCheckAllChange(val) {
                this.tempWaterUserCheckAll = true;
                this.tempWaterUserChecked = [];
                this.leftWaterUserChecked = [];
            },

            //分区 AreaList change事件
            handleAreaCheckedChange(value) {
                if(this.leftAreaChecked.length===0 && this.tempAreaChecked.length===0){
                    this.tempAreaCheckAll = true;
                }else{
                    this.tempAreaCheckAll = false;
                }

            },

            //企业 WaterUserList change事件
            handleWaterUserCheckedChange(value) {
                if(this.tempWaterUserChecked.length===0 && this.leftWaterUserChecked.length===0){
                    this.tempWaterUserCheckAll = true;
                }else {
                    this.tempWaterUserCheckAll = false;
                }
            },



            //分区 更多事件
            showMore_area(){
                this.show_model_area = !this.show_model_area;
            },

            //企业 更多事件
            showMore_waterUser(){
                this.show_model_waterUser = !this.show_model_waterUser;
            },

            //获取分区
            getAreaLeakList_(){

            },

            //获取企业
            getPipeWaterUserInfo_(){
                let runGetPipeWaterUserInfo = new Promise(function(resolve, reject){


                });
                return runGetPipeWaterUserInfo;
            },

            //报表类型选择事件
            get_statusItem(id){
                this.statusItem = id;
                this.search();
                switch (id) {
                    case '2':
                     this.tempList = this.reportList;
                     break;
                    case '0':
                        this.tempList = this.reportList_month;
                        break;
                    case '1':
                        this.tempList = this.reportList_year;
                        break;
                }


            },

            //获取查询参数
            getQueryParams(){
                let checkedWaterUsers = [];
                let checkedAreas  = [];

                if(this.tempAreaCheckAll){
                    checkedAreas = this.areaList;
                }else{
                    checkedAreas = this.tempAreaChecked.concat(this.leftAreaChecked);
                }

                if(this.tempWaterUserCheckAll){
                    checkedWaterUsers = this.waterUserList;
                }else{
                    checkedWaterUsers = this.tempWaterUserChecked.concat(this.leftWaterUserChecked);
                }
                let areaIds = checkedAreas.length>0?checkedAreas.map(val=>{return val.areaId;}):[];
                let userIds = checkedWaterUsers.length>0?checkedWaterUsers.map(val=>{return val.ID;}):[];
                let params = {
                    'areaIds': areaIds,
                    'userIds': userIds
                };

                if('0' === this.statusItem){//日报 测试 2019-04-06有数据
                    params.meterDay = document.getElementById('dayTm').value;
                }else if('1' === this.statusItem){//旬报 测试2019-03 第2旬有数据
                    params.meterMonth = document.getElementById('monthTm').value;
                    params.meterXun = this.xunTm;
                }else{//月报 测试 2019-03有数据
                    params.meterMonth = document.getElementById('monthTm').value;
                }
                return params;
            },

            //导出
            exportListToExcel(){
                let params = this.getQueryParams();
                if('0' === this.statusItem){//日报
                    this.exportPipeWaterDayList(params);
                }else if('1' === this.statusItem){//旬报
                    this.exportPipeWaterXunList(params);
                }else{//月报
                    this.exportPipeWaterMonthList(params);
                }
            },

            //导出月报表
            exportPipeWaterMonthList(params){

           },

            //导出日报表
            exportPipeWaterDayList(params){

            },

            //导出旬报表
            exportPipeWaterXunList(params){

            },


            //导入
            importFile(e){
                let that = this;
                let type = 'application/vnd.ms-excel';
                if(e.target.files[0].type!=type){
                    this.$message.warning('文件格式必须是.xls!');
                    return;
                }
                let formdata = new FormData();
                formdata.append('file',e.target.files[0]);

                if('0' === that.statusItem){//日报

                }else if('1' === that.statusItem){//旬报

                }else{//月报

                }
            },

            //查询报表
            search(){
                let params = this.getQueryParams();

                if(params.areaIds.length === 0){
//                    this.showModel = true;
//                    this.modelContent = '请选择分区';
                    this.$message.info('请选择分区!');
                }else if(params.userIds.length === 0){
//                    this.modelContent = '请选择企业';
//                    this.showModel = true;
                    this.$message.info('请选择企业!');
                }else{
                    if('0' === this.statusItem){//日报
                        this.getPipeWaterDayList(params);
                    }else if('1' === this.statusItem){//旬报
                        this.getPipeWaterXunList(params);
                    }else{//月报
                        this.getPipeWaterMonthList(params);
                    }
                }
            },

            //查月报
            getPipeWaterMonthList(params){

            },

            //查旬报
            getPipeWaterXunList(params){

            },

            //查日报
            getPipeWaterDayList(params){

            }
        },

        mounted() {
            //初始化时间
            document.getElementById('dayTm').value = DateFunc.formatDate(new Date,'yyyy-MM-dd');
            document.getElementById('monthTm').value = DateFunc.formatDate(new Date,'yyyy-MM');
            //分区选择 企业选择查询完成后 查询报表
            let that = this;
            Promise.all([that.getPipeWaterUserInfo_(), that.getAreaLeakList_()])
                .then(function(results){
                    that.search();
                })
                .catch(function(reason){});
        },
        created() {

        }

    };

</script>

<style scoped lang="scss">
    #pipeStandingBook{
        width:100%;
        height: 100%;
        padding: 10px;
        .search{
            width: 100%;
            .top-search{
                float: right;
                padding: 10px 0;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .label{color: #000;}
                /deep/ .el-input{width:120px;}

                .el-button{
                    margin-left: 10px;
                    position: relative;
                    &.export-file{
                        input{
                            width: 60px;
                            position: absolute;
                            top: 0;
                            left: 0;
                            opacity: 0;
                            z-index: 10;
                        }
                    }
                }
                a{
                    margin-left: 10px;
                }
            }
        }

        .row{
            width: 100%;
            height: 40px;

            padding: 5px 0;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            span{
                display: inline-block;
                margin-right: 10px;
                width: 70px;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
                line-height: 30px;
                &:last-child{
                    margin-right: 0px;
                }
                &.all{
                    background: #ccc;
                    color: #fff;
                    height: 30px;
                }
                &.more{
                    color: #0b83fe;
                    text-decoration: underline;
                    cursor: pointer;
                }
                &.tab-item{
                    cursor: pointer;
                    &:hover{
                        color: #0b83fe;
                    }
                }
                &.actived{
                    background: #0b83fe;
                    color: #fff;
                }
            }
            .list{
                /deep/ .el-checkbox{
                    width:70px;
                    margin-right: 10px;
                    .el-checkbox__input{
                        display: none;/*不显示勾选框*/
                    }

                }

                /deep/ .el-checkbox.is-checked{
                    background-color: #0b83fe;
                    .el-checkbox__label{
                        color: #fff;
                        .tab-item{
                            &:hover{
                                color: #fff;
                            }
                        }
                    }
                }

                /deep/ .el-checkbox__label{
                    padding:0 5px;
                    line-height: 12px;
                    text-overflow: ellipsis;
                    width: 70px;
                }

                .checkbox-text-span{
                    // line-height: 12px;
                    width: 60px !important;
                 }

                width: calc(100% - 140px);
                position: relative;
                display: flex;
                // line-height: 30px;
                .show-more-model{
                    position: absolute;
                    top: 40px;
                    left: 0;
                    z-index: 2;
                    width: 100%;
                    background:#f2f2f2;
                    .model-top{
                        display: flex;
                        justify-content: flex-end;
                        height: 10px;
                        align-items: center;
                        position: relative;
                        i{
                            position: absolute;
                            top: 2px;
                            right: 2px;
                        }
                    }
                    .left-list{
                        width: 100%;
                        display: flex;
                        flex-flow: wrap;
                        justify-content: flex-start;
                        align-items: center;
                    }
                }
            }
        }
        .table-contnet{
            .table-name{
                width:100%;
                text-align: center;
                font-size: 18px;
                font-weight: bold;
                padding:10px;
            }
            width: 100%;
            height: calc(100% - 170px);
            overflow-y: auto;
        }
    }
</style>




