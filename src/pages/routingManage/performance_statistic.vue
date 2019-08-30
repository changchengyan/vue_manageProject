<template>
    <div id="statistic">
        <div class="year">
            <span>月份：</span>
            <el-date-picker v-model="year1" type="month" size="mini" placeholder="选择年" @change="getBar">
            </el-date-picker>
        </div>
        <div class="subChart long">
            <div class="chartitem">
                <div class="inner">
                    <div slot="header" class="clearfix">
                        <i class="dse-rect-green"></i> <span>出勤率统计表</span>
                    </div>
                    <div class="echarts" ref="bar1"></div>
                </div>
            </div>
            <div class="chartitem">
                <div class="inner">
                    <div slot="header" class="clearfix">
                        <i class="dse-rect-green"></i> <span>上报隐患数量统计表</span>
                    </div>
                    <div class="echarts" ref="bar2"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    let BAR1 = null;
    let BAR2 = null;

    export default {
        name: 'StatisticalAnalysis',
        components: {

        },
        data() {
            return {
                loading: true,
                month1: '', //包含 年月
                month: '', // 只包含月份
                year1: '', // 年份
                post_year: '',
                post_month: '',
                attendanceRate: {
                    color: ['#d398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        top: '40px',
                        left: '60px',
                        right: '45px',
                        bottom: '60px',
//                  containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: [],
                        axisPointer: {
                            type: 'shadow'
                        },
                        splitLine: {
                            show: false
                        },
                        boundaryGap: true,
                        name: ''
                    }],
                    legend: {
                        show: false
                    },
                    yAxis: [{
                        type: 'value',
                        name: '出勤次数'
                    }],
                    dataZoom: [{
                        id: 'dataZoomX',
                        type: 'slider',
                        xAxisIndex: [0],
                        filterMode: 'filter'
                    }
                    ],
                    series: [{
                        name: '出勤次数',
                        type: 'bar',
                        barWidth: '20%',
                        data: []
                    }]
                },
                doRate: {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    grid: {
                        top: '40px',
                        left: '40px',
                        right: '45px',
                        bottom: '60px'
                    },
                    legend: {
                        top: '3%',
                        data: ['计划数量', '实际数量', '完成率']
                    },
                    xAxis: [{
                        type: 'category',
                        data: [],
                        axisPointer: {
                            type: 'shadow'
                        },
                        boundaryGap: true,
                        name: ''
                    }],
                    yAxis: [{
                        type: 'value',
                        name: '数量'
                    },
                        {
                            type: 'value',
                            name: '完成率(%)'
                        }
                    ],
                    dataZoom: [{
                        id: 'dataZoomX',
                        type: 'slider',
                        xAxisIndex: [0],
                        filterMode: 'filter'
                    }
                    ],
                    series: [{
                        name: '计划数量',
                        type: 'bar',
                        barWidth: '20%',
                        itemStyle: {
                            normal: {
                                color: '#2e8ed8'
                            }
                        },
                        data: []
                    },
                        {
                            name: '实际数量',
                            type: 'bar',
                            barWidth: '20%',
                            itemStyle: {
                                normal: {
                                    color: '#c0504d'
                                }
                            },
                            data: []
                        },
                        {
                            name: '完成率',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    color: '#97b852'
                                }
                            },
                            yAxisIndex: 1,
                            data: []
                        }
                    ]
                },
                reportRate: {
                    color: ['#e3989B'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        top: '40px',
                        left: '40px',
                        right: '45px',
                        bottom: '60px'
                    },

                    xAxis: [{
                        type: 'category',
                        data: [],
                        axisTick: {
                            alignWithLabel: true
                        },
                        boundaryGap: true,
                        name: ''
                    }],
                    yAxis: [{
                        type: 'value',
                        name: '数量'
                    }],
                    dataZoom: [{
                        id: 'dataZoomX',
                        type: 'slider',
                        xAxisIndex: [0],
                        filterMode: 'filter'
                    }],
                    series: [{
                        name: '隐患数量',
                        type: 'bar',
                        barWidth: '20%',
                        data: []
                    }]
                }
            };
        },
        methods: {
            onReady(instance) {},
            onClick(event, instance, echarts) {
                // console.log(arguments);
            },
            getCheckRecordReportByYearMonth_() {

            },
            getBar(val) {

            },
            // 初始化柱子数据
            initBar(obj) {
                return {
                    color: ['#33c89B'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: function (params) {
                            var res = '<div>当前月份：' + params[0].name + '月</div>';
                            for (var i = 0; i < params.length; i++) {
                                if (!params[i].data) {
                                    params[i].data = '- -';
                                }
                                res +=
                                    '<div>' +
                                    params[i].seriesName +
                                    ':  ' +
                                    params[i].data +
                                    '次</div>';
                            }
                            return res;
                        }
                    },
                    legend: {
                        top: '5%',
                        data: obj.nameList
                    },
                    grid: {
                        top: '80px',
                        left: '40px',
                        right: '45px',
                        bottom: '70px'
                    },
                    xAxis: [
                        {
                            type: 'category',
                            name: obj.xUnit,
                            data: obj.xData,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: obj.name,
                            minInterval: 1
                        }
                    ],
                    dataZoom: [
                        {
                            id: 'dataZoomX',
                            type: 'slider',
                            x: '15%',
                            width: '70%',
                            filterMode: 'filter'
                        }
                    ],
                    series: obj.dataList
                };
            },

        },
        mounted() {
            let that =this;
            this.loading = false;
            this.$nextTick(()=>{

                BAR1 = this.$echarts.init(that.$refs.bar1);
                BAR1.setOption(
                    that.initBar({
                        name:'出勤次数',
                        xUnit:'人名',
                        xData:['樊进','陈娇','陈强','周洁'],
                        dataList:[{
                            name: '出勤次数',
                            type: 'bar',
                            barWidth: '20%',
                            data:[100,300,500,120]
                        }]
                    })
                );


                BAR2 = this.$echarts.init(that.$refs.bar2);
                BAR2.setOption(
                    that.initBar({
                        name:'数量',
                        xUnit:'人名',
                        xData:['樊进','陈娇','陈强','周洁'],
                        dataList:[{
                            name: '上报隐患数量',
                            type: 'bar',
                            barWidth: '20%',
                            data:[100,300,500,120]
                        }]
                    })
                );
            });
        },
        created() {
            let time = new Date();
            let year = time.getUTCFullYear();
            let widthMonth = year + '-' + (time.getUTCMonth() + 1 < 10 ? '0' + (time.getUTCMonth() + 1) : time.getUTCMonth() + 1);
            this.year1 = widthMonth;
            this.month1 = widthMonth;
            this.month = '' + (time.getUTCMonth() + 1);
            this.post_year = year;
            this.post_month = '' + (time.getUTCMonth() + 1);
        }
    };
</script>

<style lang="scss" scoped>
    $baseFont:14px;
    $baseColor:#333;
    $baseBorderColor:#ccc;
    #statistic {
        width: 100%;
        height: calc(100% - 40px);
        padding: 10px;
        font-size: 14px;
        color: #333;
        .tabs {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            .tabItem {
                display: inline-block;
                padding: 10px 25px;
                border: 1px solid #ccc;
                border-radius: 5px;
                margin-right: 20px;
                cursor: pointer;
                &.actived {
                    background: #3a8ee6;
                    color: #fff;
                }
            }
        }
        .year,
        .month {
            width: 100%;
            margin: 10px;
        }
        .subChart {
            width: 100%;
            height: calc(50% - 75px);
            min-height: 320px;
            display: flex;
            justify-content: flex-start;
            .chartitem {
                width: 25%;
                padding-right: 10px; // &:first-child {
                //     width: 20%;
                // }
                &:last-child {
                    padding-right: 0px;
                }
                .inner {
                    width: 100%;
                    height: 100%;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                    .clearfix {
                        height: 30px;
                        line-height: 30px;
                        font-size: $baseFont;
                        padding-left: 10px;
                        border-bottom: 1px solid #ccc;
                    }
                    .datechoose {
                        width: 100%;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        margin: 10px 0;
                        padding-right: 25px;
                        .el-date-editor {
                            margin-left: 10px;
                        }
                    }
                    .echarts {
                        height: calc(100% - 30px) !important;
                    }
                }
            }
            &.long {
                .chartitem {
                    width: 33.33%;
                }
            }
        }
    }
</style>

