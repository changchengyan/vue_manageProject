<template>
    <div id="monitorRecord">

        <div class="block">
            <div class="card">
                <div class="search-wrap">
                    关键字：
                    <el-input placeholder="请输入巡检人员关键字" clearable v-model.trim="name"
                              @keyup.enter.native="getInspectionInfo(1)"></el-input>
                    起始时间：
                    <input id="stm" class="Wdate" type="text"
                           onclick="var etm=$dp.$('etm');WdatePicker({onpicked:function(){etm.click();},maxDate:'#F{$dp.$D(\'etm\')}'})"/>
                    至
                    <input id="etm" class="Wdate" type="text" onclick="WdatePicker({minDate:'#F{$dp.$D(\'stm\')}'})"/>
                    <el-button @click="getInspectionInfo(1)" type="primary">搜索</el-button>
                    <!--<input id="d11" class="Wdate" type="text" onClick="WdatePicker({errDealMode:1,dateFmt:'yyyy-MM-dd HH:mm',startDate:'%y-%M-1',onpicked:function(){d12.click();},maxDate:'#F{$dp.$D(\'d12\')}',minDate:'#F{$dp.$D(\'d12\',{d:-15})}',isShowClear:false,readOnly:true})" />-->
                    <!--<input id="d11" class="Wdate" type="text" onClick="WdatePicker({errDealMode:1,dateFmt:'yyyy-MM-dd HH:mm',startDate:'%y-%M-1',onpicked:function(){d12.click();},isShowClear:false,readOnly:true})" />
                    <span>至</span>
                    <input id="d12" class="Wdate" type="text" onClick="WdatePicker({errDealMode:1,dateFmt:'yyyy-MM-dd HH:mm',startDate:'%y-%M-%d',minDate:'#F{$dp.$D(\'d11\')}',maxDate:'#F{$dp.$D(\'d11\',{d:15})}',onpicked:function(){window.doQuery_sqgc();},isShowClear:false,readOnly:true})" />-->
                </div>
                <div class="table-content">
                    <dse-table-width-pagination :totalNum="totalNum" :currentPage="currentPage" @goto_page="goto_page">
                        <thead>
                        <tr>
                            <th width="60"><span>序号</span></th>
                            <th><span>巡检日期</span></th>
                            <th><span>巡检班组</span></th>
                            <th><span>巡检人员</span></th>
                            <th><span>巡检完成率(%)</span></th>
                            <th><span>隐患数量</span></th>
                            <th width="60"><span>详情</span></th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-if="recordList && recordList.length>0">
                            <tr v-for="(item,index) in recordList" :key="index">
                                <td><span>{{index+1}}</span></td>
                                <td><span>{{item.inspectDate}}</span></td>
                                <td><span>{{item.groupName}}</span></td>
                                <td><span>{{item.userName}}</span></td>
                                <td><span>{{item.sumNum}}</span></td>
                                <td><span>{{item.probCount}}</span></td>
                                <td class="btns"><span  @click="gotoDetail(item)">详情</span></td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="7"><span>无数据</span></td>
                            </tr>
                        </template>
                        </tbody>
                    </dse-table-width-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import DseTableWidthPagination from '../../common/components/DseTableWidthPagination';
    // import MonitorRecordDetail from './detail/monitorRecordDetail';


    import DateFunc from '@/utils/date_func';

    export default {
        name: 'monitorRecord',
        components: {DseTableWidthPagination},
        data() {
            return {
                name: '',//巡检人员名称关键字
                recordList: [{
                    'nowEndTime': '2019-03-31 23:23:00',
                    'sumCount': 3,
                    'inspectDate': '2019-03-27 10:25:00',
                    'planName': '同心县韦州镇同心村巡检计划',
                    'leadTime': 2400,
                    'userName': '张伟',
                    'recordId': '0048F16009C6429A5664B897E81CA23F',
                    'inspectLength': 0.0000,
                    'nowStartTime': '2019-06-01 00:00:00',
                    'sumNowCount': 0,
                    'groupName': '一班',
                    'probCount': 1,
                    'inspectSpeed': 0.00,
                    'planId': 'IS76LNFJPC0U3M1S9U1FUGJ79SSLA97V',
                    'startTime': '2019-03-27 10:25:00',
                    'sumNum': 30,
                    'endTime': '2019-03-27 10:26:00',
                    'inspectMode': '2'
                }, {
                    'nowEndTime': '2019-03-03 23:23:00',
                    'sumCount': 0,
                    'inspectDate': '2019-02-28 14:18:00',
                    'planName': '窑山管网巡检',
                    'leadTime': 33600,
                    'userName': '王华',
                    'recordId': '3D2057041567815F1074847BAE554A10',
                    'inspectLength': 2.6615,
                    'nowStartTime': '2019-02-25 00:00:00',
                    'sumNowCount': 4,
                    'groupName': '二班',
                    'probCount': 0,
                    'inspectSpeed': 0.00,
                    'planId': 'NJJ6QRH32IGAB4PU7NH7TVA2AE0OT5U5',
                    'startTime': '2019-02-28 14:18:00',
                    'sumNum': 40,
                    'endTime': '2019-02-28 14:32:00',
                    'inspectMode': '0'
                }, {
                    'nowEndTime': '2019-03-03 23:23:00',
                    'sumCount': 0,
                    'inspectDate': '2019-03-27 10:26:00',
                    'planName': '王团管网巡检',
                    'leadTime': 7200,
                    'userName': '黎明',
                    'recordId': 'C8BB47865330668607EA644E997A3A1D',
                    'inspectLength': 0.0000,
                    'nowStartTime': '2019-02-25 00:00:00',
                    'sumNowCount': 0,
                    'groupName': '三班',
                    'probCount': 0,
                    'inspectSpeed': 0.00,
                    'planId': 'NJJ6QRH32IGAB4PU7NH7TVA2AE0OT5U5',
                    'startTime': '2019-03-27 10:26:00',
                    'sumNum': 35,
                    'endTime': '2019-03-27 10:29:00',
                    'inspectMode': '0'
                }, {
                    'nowEndTime': '2019-03-03 23:23:00',
                    'sumCount': 0,
                    'inspectDate': '2019-03-27 10:25:00',
                    'planName': '河西加压泵站巡检',
                    'leadTime': 0,
                    'userName': '赵建国',
                    'recordId': 'E74964132978DAF95951DA5FADB07D4A',
                    'inspectLength': 0.0000,
                    'nowStartTime': '2019-02-25 00:00:00',
                    'sumNowCount': 0,
                    'groupName': '四班',
                    'probCount': 0,
                    'inspectSpeed': 0.00,
                    'planId': 'NJJ6QRH32IGAB4PU7NH7TVA2AE0OT5U5',
                    'startTime': '2019-03-27 10:25:00',
                    'sumNum': 55,
                    'endTime': '2019-03-27 10:25:00',
                    'inspectMode': '0'
                }, {
                    'nowEndTime': '2019-03-03 23:23:00',
                    'sumCount': 0,
                    'inspectDate': '2019-02-28 14:06:00',
                    'planName': '小西沟水库巡检',
                    'leadTime': 26400,
                    'userName': '刘晓庆',
                    'recordId': 'F9B4F6199A77B0F70D3EF2D55A989410',
                    'inspectLength': 1.6343,
                    'nowStartTime': '2019-02-25 00:00:00',
                    'sumNowCount': 0,
                    'groupName': '一班',
                    'probCount': 0,
                    'inspectSpeed': 0.00,
                    'planId': 'NJJ6QRH32IGAB4PU7NH7TVA2AE0OT5U5',
                    'startTime': '2019-02-28 14:06:00',
                    'sumNum': 80,
                    'endTime': '2019-02-28 14:17:00',
                    'inspectMode': '0'
                }],//巡检记录
                totalNum: 1,//总共记录条数
                currentPage: 1,//当前页码
                rowData: {},//行数据
                showDetail: false//是否打开详情页
            };
        },
        computed: {},
        methods: {
            //详情页返回列表页
            detailBack() {
                this.showDetail = false;
                this.$store.commit('set_asideStatus', true);
                this.$emit('showAside');
            },

            //去详情页
            gotoDetail(rowData) {
                //当前页打开
                this.$router.push({
                    path:'/routing/monitorRecordDetail',
                    params:{
                        rowData:rowData
                    }
                });
                this.$emit('hiddenAside',false);
            },

            //获取巡检记录列表
            getInspectionInfo(page) {

            },

            //翻页事件
            goto_page(pageNum) {
                this.queryInspectionInfo_(pageNum);
            },

            //初始化 //设置初始开始时间结束时间
            init() {
                let stm = new Date();
                stm.setMonth((new Date()).getMonth() - 1);
                document.getElementById('stm').value = DateFunc.formatDate(stm, 'yyyy-MM-dd');
                document.getElementById('etm').value = DateFunc.formatDate(new Date, 'yyyy-MM-dd');
                this.getInspectionInfo(1);
            }
        },
        mounted() {
            this.init();
        }
    };

</script>
<style scoped lang='scss'>
    #monitorRecord {
        width: 100%;
        height: 100%;
        .search-wrap {
            width: 100%;
            height: 30px;
            line-height: 30px;
            align-items: center;
            margin-bottom: 10px;

            .Wdate:last-of-type {
                margin-right: 10px;
            }

            .el-input {
                width: 200px;
                margin-right: 10px;
            }
        }

        .table-content {
            width: 100%;
            height: calc(100% - 30px);

        }


    }
</style>
