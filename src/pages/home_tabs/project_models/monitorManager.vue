<template>
    <div id="monitorMsg">
        <div class="table-view">
            <table class="innerTable">
                <thead>
                <tr>
                    <th><span>监测项</span></th>
                    <th><span>检测值</span></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><span>瞬时流量(m³/s)</span></td>
                    <td><span>{{monitorMsg.sssl}}</span></td>
                </tr>
                <tr>
                    <td><span>瞬时压力（MPa）</span></td>
                    <td><span>{{monitorMsg.ssyl}}</span></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="time-select">
            <span>起始时间:</span>
            <input class="Wdate" ref="sdate" v-model="sdate" id="sdate_flow" name="sdate_flow"
                   onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',startDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'edate\')||\'%y-%M-%d\'}'})"
                   placeholder="请选择开始时间" type="text">
            <span>至</span>
            <input class="Wdate" ref="edate" v-model="edate" id="edate_flow" name="edate_flow"
                   onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'sdate\')}',maxDate:'%y-%M-%d',startDate:'%y-%M-%d'})"
                   placeholder="请选择结束时间" type="text">
            <el-button type="primary" @click="search">搜索</el-button>
        </div>
        <div class="chart-card">
            <div class="top-title">
                <span class="rect"></span>
                <span>流量</span>
            </div>
            <div class="chart-main">
                <div id="chart_flow"></div>
            </div>
        </div>
        <div class="chart-card">
            <div class="top-title">
                <span class="rect"></span>
                <span>压力</span>
            </div>
            <div class="chart-main">
                <div id="chart_press"></div>
            </div>
        </div>
    </div>
</template>

<script>

    import {charts} from '../../../mixins/chart_mixins';
    import {pump_getBzjcList} from '../../../api/interfaces/oneMap_api';


    let chart_flow = null;
    let chart_press = null;
    export default {
        name: 'monitorManager',
        props: {
            pumpId: {
                type: String,
                defaultProps: ''
            }
        },
        data() {
            return {
                monitorMsg: {
                    sssl: '',
                    ssyl: '',
                    slList: [],
                    ylList: []
                },
                init_get: true, //初始化 流量和压力 瞬时流量
                sdate: '', // 开始时间
                edate: '' // 结束时间
            };
        },
        mixins: [charts],
        methods: {
            search() {
                this.pump_getBzjcList_();
            },
            // 自适应屏幕
            resize() {
                chart_flow.resize();
                chart_press.resize();
            },
            // 获取泵站 相关检测项图表
            pump_getBzjcList_() {
                let that = this;
                this.sdate = this.$refs.sdate.value;
                this.edate = this.$refs.edate.value;

                // 选择的时间跨度不能大于 7天
                if (new Date(that.edate).getTime() - new Date(that.sdate).getTime() > 7 * 24 * 60 * 60 * 1000) {
                    this.$message.error('开始时间和结束时间不能大于7天');
                    return;
                }
                let temp_startDate = this.sdate;
                let temp_endDate = this.edate;

                pump_getBzjcList({
                    pumpCd: '',
                    stm: temp_startDate,
                    etm: temp_endDate
                }, that).then(res => {

                    let {data} = res;
                    let {sssl = '', ssyl = '', slList = [], ylList = []} = data;


                    if (that.init_get) {
                        this.monitorMsg.sssl = sssl ? sssl : '/';
                        this.monitorMsg.sssl = ssyl ? ssyl : '/';
                        that.init_get = false;
                    }

                    let temp_slList = [];
                    let temp_ylList = [];
                    slList = slList && slList.length > 0 ? slList : [];
                    ylList = ylList && ylList.length > 0 ? ylList : [];

                    slList.map(val => {
                        temp_slList.push(
                            [
                                new Date(val.tm), val.q ? parseFloat(val.q) : null
                            ]
                        );
                    });

                    let flow_obj = this.drawLine({name: '流量', unit: 'm³/h', data: [...temp_slList]});
                    chart_flow.setOption(flow_obj);

                    ylList.map(val => {
                        temp_ylList.push(
                            [
                                new Date(val.tm), val.wgage ? parseFloat(val.wgage) : null
                            ]
                        )
                    });
                    let press_obj = this.drawLine({name: '压力', unit: 'MPa', data: [...temp_ylList]});
                    chart_press.setOption(press_obj);


                })

            }
        },
        mounted() {
            chart_flow = this.$echarts.init(document.getElementById('chart_flow'));
            chart_press = this.$echarts.init(document.getElementById('chart_press'));

            let flow_obj = this.drawLine({name: '流量', unit: 'm³/h', data: []});
            chart_flow.setOption(flow_obj);

            let press_obj = this.drawLine({name: '压力', unit: 'MPa', data: []});
            chart_press.setOption(press_obj);

            this.pump_getBzjcList_();
        },
        created() {
            let time = this.$days().format('YYYY-MM-DD');
            this.sdate = time;
            this.edate = time;

        }
    };
</script>

<style scoped lang="scss">
    #monitorMsg {
        width: 100%;
        height: 100%;

        .table-view {
            width: 100%;
            padding: 0 10px;
            height: 140px;
            overflow: auto;
        }

        .chart-card {
            width: 100%;

            .top-title {
                width: 100%;
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid #ccc;
                font-size: 16px;
                font-weight: 600;
                text-align: left;
            }

            .time-select {
                width: 100%;
                height: 30px;
                display: flex;
                justify-content: flex-start;
                margin-right: 10px;
                align-items: center;

                span {
                    display: inline-block;
                    margin: 0 10px;
                }

                .el-button {
                    margin-left: 10px;
                }
            }

            .chart-main {
                width: 100%;
                height: 200px;

                & > div {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>
