<template>
    <div id="zhutai">
        <!--      <iframe :src="staticPath+'/companys/liupanshan/ershuichang/main/index.html'" frameborder="0"></iframe>-->
        <div class="card">
            <span>放置平面图</span>
        </div>
        <div class="card">
            <div class="tip-head">
                <div class="rect"></div>
                <span>监测信息</span>
            </div>
            <div class="main-contnet">
                <div class="row">
                    <div class="col" :class="{select:selectIndex==1}" @click="select(1)"><span>{{today.inWater?today.inWater:'/'}}</span><span>取水流量(m³/h)</span></div>
                    <div class="col" :class="{select:selectIndex==2}" @click="select(2)"><span>{{today.press?today.press:'/'}}</span><span>供水压力(MPa)</span></div>
                    <div class="col" :class="{select:selectIndex==3}" @click="select(3)"><span>{{today.cl?today.cl:'/'}}</span><span>供水余氯(mg/L)</span></div>
                </div>
                <div class="row">
                    <div class="col" :class="{select:selectIndex==4}" @click="select(4)"><span>{{today.muddy?today.muddy:'/'}}</span><span>供水浊度(NTU)</span></div>
                    <div class="col" :class="{select:selectIndex==5}" @click="select(5)"><span>{{today.ph?today.ph:'/'}}</span><span>供水PH</span></div>
                    <div class="col" :class="{select:selectIndex==6}" @click="select(6)"><span>{{today.lev?today.lev:'/'}}</span><span>供水水位(m)</span></div>
                </div>
                <div class="chart-search">
                    <div class="search-time">
                        <input class="Wdate"
                               ref="sdate"
                               v-model="sdate"
                               id="sdate"
                               name="sdate"
                               onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',startDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'edate\')||\'%y-%M-%d\'}'})"
                               placeholder="请选择开始时间"
                               type="text">
                        <span>至</span>
                        <input class="Wdate"
                               ref="edate"
                               v-model="edate"
                               id="edate"
                               name="edate"
                               onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'sdate\')}',maxDate:'%y-%M-%d',startDate:'%y-%M-%d'})"
                               placeholder="请选择结束时间"
                               type="text">
                        <el-button type="primary" @click="search">搜索</el-button>

                        <div class="change-view" @click="changeShow">
                            <template v-if="viewChange">
                                <i class="el-icon-s-grid"></i>
                            </template>
                            <template v-else>
                                <i class="el-icon-s-data"></i>
                            </template>
                        </div>

                    </div>
                    <div class="chart-main" id="chart" v-show="viewChange"></div>
                    <div class="main-table" v-show="!viewChange">
                        <table class="innerTable first-no-line" >
                            <thead>
                                <tr>
                                    <th><span>时间</span></th>
                                    <th><span>数值</span></th>
                                </tr>
                            </thead>
                            <tbody>
                            <template v-if="chartData&&chartData.length>0">
                                <tr v-for="(item,i) in chartData" :key="i">
                                    <td><span>{{item[0] |formate_time}}</span></td>
                                    <td><span>{{item[1]}}</span></td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr>
                                    <td colspan="2"><span>暂无数据~~</span></td>
                                </tr>
                            </template>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // 图表的对象
    import {charts} from '../../../mixins/chart_mixins';
    import {waterFactory_getScjcList} from '../../../api/interfaces/oneMap_api';




    let  LINECHART = null;
    export default {
        name: 'zhutai',
        data() {
            return {
                staticPath: '',
                sdate:'', //开始时间
                edate:'', // 结束时间
                selectIndex:1, //初始化当前选中项
                chartData:[], //图表的数据
                init_taday:true, //初始化当天瞬时值
                today:{
                    inWater:'/',
                    press:'/',
                    cl:'/',
                    muddy:'/',
                    ph:'/',
                    lev:'/'
                },
                viewChange:true, // 默认显示图表
            };
        },
        mixins:[charts],
        methods:{

            select(num){
                this.selectIndex = num;
                this.getScyxxx_(num);
            },
            search(){
                let that = this;
                this.sdate = this.$refs.sdate.value;
                this.edate = this.$refs.edate.value;

                // 选择的时间跨度不能大于 7天
                if (new Date( that.edate).getTime() - new Date(that.sdate).getTime() > 7 * 24 * 60 * 60 * 1000) {
                    this.$message.error('开始时间和结束时间不能大于7天');
                    return;
                }
                let type = this.selectIndex;
                this.getScyxxx_(type);
            },
            // 获取 历史监测信息
            getScyxxx_(type = 1){
                let that = this;
                let temp_startDate = this.sdate;
                let temp_endDate = this.edate;
                waterFactory_getScjcList({
                    wfctCd:that.factoryId,
                    stm:''+temp_startDate,
                    etm:''+temp_endDate
                },that).then(res=>{

                    let {data} = res;
                    let {slList,scjcRealVo,rzList} = data;

                    if(that.init_taday){
                        let len_inWater = scjcRealVo.qsslList&&scjcRealVo.qsslList.length-1>=0? scjcRealVo.qsslList.length-1:0;
                        let len_press = scjcRealVo.ylList&&scjcRealVo.ylList.length-1>=0?scjcRealVo.ylList.length-1:0;
                        let len_qc = scjcRealVo.szList&&scjcRealVo.szList.length-1>=0?scjcRealVo.szList.length-1:0;
                        let len_lev = scjcRealVo.realRzList&&scjcRealVo.realRzList.length-1>=0?scjcRealVo.realRzList.length-1:0;

                        console.log(len_inWater,len_press,len_qc,len_lev);

                        that.today = {
                            inWater:scjcRealVo.qsslList&&scjcRealVo.qsslList.length>0?scjcRealVo.qsslList[len_inWater].q:'/',
                            press:scjcRealVo.ylList&&scjcRealVo.ylList.length>0?scjcRealVo.ylList[len_press].wgage:'/',
                            cl:scjcRealVo.szList&&scjcRealVo.szList.length>0?scjcRealVo.szList[len_qc].chl:'/',
                            muddy:scjcRealVo.szList&&scjcRealVo.szList.length>0?scjcRealVo.szList[len_qc].turb:'/',
                            ph:scjcRealVo.szList&&scjcRealVo.szList.length>0?scjcRealVo.szList[len_qc].ph:'/',
                            lev:scjcRealVo.realRzList&&scjcRealVo.realRzList.length>0?scjcRealVo.realRzList[len_lev].rz:'/'
                        };
                        that.init_taday = false;
                    }




                    let chart_obj = null;
                    let qc = data.szList&&data.szList.length>0?data.szList:[];
                    // 水流
                    if(type==1){
                        let flow = slList&&slList.length>0?slList:[];
                        let temp_flow_data = [];
                        flow.map(val=>{
                            temp_flow_data.push(
                                [
                                    new Date(val.tm),val.q?parseFloat(val.q):null
                                ]
                            )
                        });
                        chart_obj= this.drawLine({name:'流量',unit:'m³/h',data:[...temp_flow_data]});
                    }else if(type==2){
                        // 压力
                        let press =  data.ylList&&data.ylList.length>0?data.ylList:[];
                        let temp_press_data = [];
                        press.map(val=>{
                            temp_press_data.push(
                                [
                                    new Date(val.tm),val.wgage?parseFloat(val.wgage):null
                                ]
                            )
                        });
                        chart_obj = this.drawLine({name:'压力',unit:'MPa',data:[...temp_press_data]});

                    }else if(type==3){

                        let temp_qc_cl_data = [];
                        qc.map(val=>{
                            if(val.chl){
                                temp_qc_cl_data.push(
                                    [
                                        new Date(val.tm),val.chl?parseFloat(val.chl):null
                                    ]
                                );
                            }
                        });
                        chart_obj = this.drawLine({name:'余氯',unit:'(mg/L)',data:[...temp_qc_cl_data]});
                    }else if(type==4){

                        let temp_qc_muddy_data = [];
                        qc.map(val=>{
                            if(val.turb){
                                temp_qc_muddy_data.push(
                                    [
                                        new Date(val.tm),val.turb?parseFloat(val.turb):null
                                    ]
                                );
                            }
                        });
                        chart_obj = this.drawLine({name:'浊度',unit:'(NTU)',data:[...temp_qc_muddy_data]});
                    }else if(type==5){
                        let temp_qc_ph_data = [];
                        qc.map(val=> {
                            if (val.ph) {
                                temp_qc_ph_data.push(
                                    [
                                        new Date(val.tm), val.ph ? parseFloat(val.ph) : null
                                    ]
                                );
                            }
                        });
                        chart_obj = this.drawLine({name:'ph',unit:'(ph)',data:[...temp_qc_ph_data]});

                    }else if(type==6){
                        rzList = rzList&&rzList.length?rzList:[];

                        let temp_lev_data = [];
                        rzList.map(val=> {
                            if (val.rz) {
                                temp_lev_data.push(
                                    [
                                        new Date(val.tm), val.rz ? parseFloat(val.rz) : null
                                    ]
                                );
                            }
                        });
                        chart_obj = this.drawLine({name:'水位',unit:'(m)',data:[...temp_lev_data]});
                    }
                    LINECHART = this.$echarts.init(document.getElementById('chart'));
                    LINECHART.setOption(chart_obj);
                });
            },
            // 切换视图--图和表
            changeShow(){
                let that = this;
                this.viewChange = !this.viewChange;

                let temp_index = this.selectIndex;
                if (this.viewChange){
                    this.$nextTick(()=>{
                        setTimeout(()=>{
                            that.getScyxxx_(temp_index);
                        });
                    });
                }else{
                    return;
                }

            },
            // 自由放缩
            resize(){
                LINECHART.resize();
            }

        },
        mounted() {
            this.staticPath = window.DSE.static_baseUrl;
            LINECHART = this.$echarts.init(document.getElementById('chart'));
            let qc_obj = this.drawLine({name:'流量',unit:'(m³/h)',data:[]});
            LINECHART.setOption(qc_obj);
            this.getScyxxx_(1);
        },
        created() {
             let time = this.$days().format('YYYY-MM-DD');
             this.sdate = this.edate = time;
        },
        filters:{
            formate_time(val){
                let temp_val = val;

                temp_val = new Date(val).toLocaleString();
                temp_val = temp_val.replace(/\//g,'-');

                return temp_val;

            }
        }
    };
</script>

<style scoped lang="scss">
    #zhutai {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        padding: 10px;

        iframe {
            border-spacing: 0;
            width: 100%;
            height: 100%;
        }

        .card {

            &:first-child{
                width: calc(100% - 410px);
            }
            &:last-child{
                width: 400px;
            }

            box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);

            .tip-head {
                width: 100%;
                height: 40px;
                line-height: 40px;
                text-align: left;
                font-size: 16px;
                font-weight: 600;
            }

            .main-contnet {
                width: 100%;

                .row {
                    width: 100%;
                    display: flex;
                    padding: 0 10px;
                    justify-content: space-around;
                    margin-bottom: 10px;

                    &:last-child {
                        margin-bottom: 0;
                    }

                    .col {
                        width: calc(33.33% - 10px);
                        padding: 10px 0;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        background: #fff;
                        color: #0b83fe;
                        border: 1px solid #0b83fe;
                        &.select{
                            background: #0b83fe;
                            color: #fff;
                        }

                        span {
                            display: inline-block;
                            line-height: 25px;
                        }
                    }
                }
                .chart-search{
                    width: 100%;
                    .search-time{
                        width: 100%;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        input{
                            margin: 0 10px;
                        }
                        .change-view{
                            margin-left: 1em;
                            height: 30px;
                            font-size: 30px;
                            color: #0b83fe;
                            line-height: 30px;
                            cursor: pointer;
                        }
                    }
                    .chart-main{
                        width: 100%;
                        height: 200px;
                    }
                }

                .main-table{
                    padding-top: 10px;
                }
            }

        }
    }
</style>
