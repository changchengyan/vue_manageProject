<template>
    <div id="statistic">
        <div class="year">
            <span>年度：</span>
            <el-date-picker v-model="year1" type="year" size="mini" placeholder="选择年"
                            @change="getLine"></el-date-picker>
        </div>
        <template v-if="showChart===1">
            <div class="subChart">
                <div class="chartitem">
                    <div class="inner">
                        <div slot="header" class="clearfix">
                            <i class="dse-rect-green"></i>
                            <span>隐患分区折线图</span>
                        </div>
                        <div class="chart" ref="line1"></div>
                    </div>
                </div>
                <div class="chartitem">
                    <div class="inner">
                        <div slot="header" class="clearfix">
                            <i class="dse-rect-green"></i>
                            <span>隐患类型分区折线图</span>
                        </div>
                        <div class="chart" ref="line2"></div>
                    </div>
                </div>
                <div class="chartitem">
                    <div class="inner">
                        <div slot="header" class="clearfix">
                            <i class="dse-rect-green"></i>
                            <span>年度巡检次数统计</span>
                        </div>
                        <div class="chart" ref="bar1"></div>
                    </div>
                </div>
                <div class="chartitem">
                    <div class="inner">
                        <div slot="header" class="clearfix">
                            <i class="dse-rect-green"></i>
                            <span>年度维护数统计</span>
                        </div>
                        <div class="chart" ref="bar2"></div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="subChart">
                <div class="chartitem">
                    <div class="inner">
                        <div slot="header" class="clearfix">
                            <i class="dse-rect-green"></i>
                            <span>隐患分区折线图</span>
                        </div>

                    </div>
                </div>
                <div class="chartitem">
                    <div class="inner">
                        <div slot="header" class="clearfix">
                            <i class="dse-rect-green"></i>
                            <span>隐患类型分区折线图</span>
                        </div>

                    </div>
                </div>
                <div class="chartitem">
                    <div class="inner">
                        <div slot="header" class="clearfix">
                            <i class="dse-rect-green"></i>
                            <span>年度巡检次数统计</span>
                        </div>

                    </div>
                </div>
                <div class="chartitem">
                    <div class="inner">
                        <div slot="header" class="clearfix">
                            <i class="dse-rect-green"></i>
                            <span>年度维护数统计</span>
                        </div>

                    </div>
                </div>
            </div>
        </template>

        <div class="month">
            <span>月份:</span>
            <el-date-picker size="mini" v-model="month1" type="month" placeholder="选择月"
                            @change="getPie"></el-date-picker>
        </div>
        <div class="subChart">
            <div class="chartitem">
                <div class="inner">
                    <div slot="header" class="clearfix">
                        <i class="dse-rect-green"></i>
                        <span>隐患分布图</span>
                    </div>
                    <div class="chart" ref="pie1"></div>
                </div>
            </div>
            <div class="chartitem">
                <div class="inner">
                    <div slot="header" class="clearfix">
                        <i class="dse-rect-green"></i>
                        <span>隐患类型图</span>
                    </div>
                    <div class="chart" ref="pie2"></div>
                </div>
            </div>
            <div class="chartitem" style="width: 50%">
                <div class="inner">
                    <div slot="header" class="clearfix">
                        <i class="dse-rect-green"></i>
                        <span>巡检完成率</span>
                    </div>
                    <div class="chart" ref="bar3"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    let LINE1 = null;
    let LINE2 = null;

    let BAR1 = null;
    let BAR2 = null;

    let PIE1 = null;
    let PIE2 = null;

    let BARLINE = null;

    export default {
        name: 'StatisticalAnalysis',
        components: {},
        data() {
            return {
                loading: true,
                month1: '', //包含 年月
                month: '', // 只包含月份
                year1: '', // 年份
                post_year: '',
                post_month: '',
                showChart: 1,
                doRate: {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        },
                        formatter: function (params) {
                            var res = '<div>计划名称：' + params[0].name + '</div>';
                            var unit = '';
                            for (var i = 0; i < params.length; i++) {
                                if (!params[i].data) {
                                    params[i].data = '0';
                                }
                                if (params[i].componentSubType == 'line') {
                                    unit = '%';
                                } else {
                                    unit = '个';
                                }
                                res +=
                                    '<div>' +
                                    params[i].seriesName +
                                    ':  ' +
                                    params[i].data +
                                    unit +
                                    '</div>';
                            }
                            return res;
                        }
                    },
                    grid: {
                        top: '80px',
                        left: '40px',
                        right: '45px',
                        bottom: '60px'
                    },
                    legend: {
                        top: '3%',
                        data: ['签到点', '已签到点', '完成率']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: [],
                            axisPointer: {
                                type: 'shadow'
                            },
                            boundaryGap: true,
                            name: ''
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '数量',
                            minInterval: 1
                        },
                        {
                            type: 'value',
                            name: '完成率(%)',
                            minInterval: 1
                        }
                    ],
                    dataZoom: [
                        {
                            id: 'dataZoomX',
                            type: 'slider',
                            x: '15%',
                            width: '70%',
                            xAxisIndex: [0],
                            filterMode: 'filter'
                        }
                    ],
                    series: [
                        {
                            name: '签到点',
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
                            name: '已签到点',
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
                }
            };
        },
        methods: {
            onReady(instance) {
            },
            onClick(event, instance, echarts) {
                console.log(arguments);
            },
            getCheckReportByYearMonth_() {

            },
            getCheckReportByYear_() {

            },
            showThisTab(index) {
                this.activedTab = index;
            },
            getPie(val) {
                // let temp = new TransformTime(val).format_yymm();
                // this.post_year = temp.split("/")[0];
                // this.post_month = parseInt(temp.split("/")[1]);
                // this.getCheckReportByYearMonth_();
            },
            getLine(val) {
                // let that = this;
                // let temp = new TransformTime(val).format_yy();
                // this.post_year = temp.split("/")[0];
                // this.getCheckReportByYear_();
                // // 为了切换图表
                // this.showChart = 2;
            },
            // 初始化 线数据
            initLine(obj) {
                return {
                    tooltip: {
                        trigger: 'axis',
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
                                    '个</div>';
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
                        bottom: '30px'
                    },
                    xAxis: {
                        name: '月',
                        type: 'category',
                        boundaryGap: false,
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
                    },
                    yAxis: {
                        name: obj.name,
                        type: 'value',
                        minInterval: 1
                    },
                    dataZoom: [
                        {
                            show: false
                        }
                    ],
                    series: obj.dataList
                };

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
                        bottom: '30px'
                    },
                    xAxis: [
                        {
                            type: 'category',
                            name: '月',
                            data: [
                                '1', '2', '3','4','5','6','7','8','9','10','11','12'
                            ],
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
                            show: false
                        }
                    ],
                    series: obj.dataList
                };
            },
            // 初始化 圆盘
            initPie(obj){
                return{
                    tooltip: {
                        position: 'top',
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} 个({d}%)'
                    },
                    grid: {
                        top: '40px',
                        left: '40px',
                        right: '45px',
                        bottom: '30px'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        top: 'middle',
                        data: obj.nameList
                    },
                    series: obj.dataList
                };
            },
            // 初始化 柱子和线
            initBarLine(obj){

                return{
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        },
                        formatter: function (params) {
                            var res = '<div>计划名称：' + params[0].name + '</div>';
                            var unit = '';
                            for (var i = 0; i < params.length; i++) {
                                if (!params[i].data) {
                                    params[i].data = '0';
                                }
                                if (params[i].componentSubType == 'line') {
                                    unit = '%';
                                } else {
                                    unit = '个';
                                }
                                res +=
                                    '<div>' +
                                    params[i].seriesName +
                                    ':  ' +
                                    params[i].data +
                                    unit +
                                    '</div>';
                            }
                            return res;
                        }
                    },
                    grid: {
                        top: '80px',
                        left: '40px',
                        right: '45px',
                        bottom: '60px'
                    },
                    legend: {
                        top: '3%',
                        data: obj.nameList
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: obj.xData,
                            axisPointer: {
                                type: 'shadow'
                            },
                            boundaryGap: true,
                            name: ''
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '数量',
                            minInterval: 1
                        },
                        {
                            type: 'value',
                            name: '完成率(%)',
                            minInterval: 1
                        }
                    ],
                    dataZoom: [
                        {
                            id: 'dataZoomX',
                            type: 'slider',
                            x: '15%',
                            width: '70%',
                            xAxisIndex: [0],
                            filterMode: 'filter'
                        }
                    ],
                    series: obj.dataList
                };
            }
        },
        mounted() {
            let that = this;
            this.loading = false;
            this.$nextTick(() => {
                setTimeout(()=>{

                    LINE1 = that.$echarts.init(that.$refs.line1);
                    LINE1.setOption(
                        that.initLine(
                            {
                                name: '隐患数量',
                                nameList: ['老城区', '新城区', '其他'],
                                dataList: [
                                    {
                                        name: '老城区',
                                        type: 'line',
                                        data: [100, 200, 300, 400, 210, 140, 100]
                                    },
                                    {
                                        name: '新城区',
                                        type: 'line',
                                        data: [100, 400, 210, 410, 720, 130, 720]
                                    },
                                    {
                                        name: '其他',
                                        type: 'line',
                                        data: [400, 322, 431, 120, 210, 532, 140]
                                    }
                                ]
                            }
                        )
                    );

                    LINE2 = that.$echarts.init(that.$refs.line2);
                    LINE2.setOption(
                        that.initLine(
                            {
                                name: '隐患数量',
                                nameList: ['供水管网占压', '暗漏', '供水设备维修', '其他', '爆管'],
                                dataList: [
                                    {
                                        name: '供水管网占压',
                                        type: 'line',
                                        data: [100, 200, 300, 400, 210, 140, 100]
                                    },
                                    {
                                        name: '暗漏',
                                        type: 'line',
                                        data: [100, 400, 210, 410, 720, 130, 720]
                                    },
                                    {
                                        name: '供水设备维修',
                                        type: 'line',
                                        data: [400, 322, 431, 120, 210, 532, 140]
                                    },
                                    {
                                        name: '其他',
                                        type: 'line',
                                        data: [160, 430, 620, 40, 110, 100, 100]
                                    },
                                    {
                                        name: '爆管',
                                        type: 'line',
                                        data: [90, 200, 110, 300, 670, 100, 200]
                                    },
                                ]
                            }
                        )
                    );

                    BAR1 = that.$echarts.init(that.$refs.bar1);
                    BAR1.setOption(
                        that.initBar(
                            {
                                name: '(次)',
                                nameList: ['年度巡检次数'],
                                dataList: [
                                    {
                                        name: '年度巡检次数',
                                        type: 'bar',
                                        data: [100, 200, 300, 400, 210, 140, 100]
                                    }
                                ]
                            }
                        )
                    );

                    BAR2 = that.$echarts.init(that.$refs.bar2);
                    BAR2.setOption(
                        that.initBar(
                            {
                                name: '(次)',
                                nameList: ['年度维护统计'],
                                dataList: [
                                    {
                                        name: '年度维护统计',
                                        type: 'bar',
                                        data: [100, 200, 300, 400, 210, 140, 100]
                                    }
                                ]
                            }
                        )
                    );
                    PIE1 = that.$echarts.init(that.$refs.pie1);
                    PIE1.setOption(
                        that.initPie(
                            {
                                nameList: ['老城区','其他'],
                                dataList: [
                                    {
                                        type: 'pie',
                                        name:'隐患分布',
                                        radius: '60%',
                                        center: ['35%', '45%'],
                                        data: [{
                                            value:100,
                                            name:'其他'
                                        },{
                                            value:600,
                                            name:'老城区'
                                        }],
                                        itemStyle: {
                                            emphasis: {
                                                shadowBlur: 10,
                                                shadowOffsetX: 0,
                                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                                            }
                                        }
                                    }
                                ]
                            }
                        )
                    );
                    PIE2 = that.$echarts.init(that.$refs.pie2);
                    PIE2.setOption(
                        that.initPie(
                            {
                                nameList: ['暗漏','供水设备维修','爆管'],
                                dataList: [
                                    {
                                        type: 'pie',
                                        name:'隐患分布',
                                        radius: '60%',
                                        center: ['35%', '45%'],
                                        data: [{
                                            value:100,
                                            name:'暗漏'
                                        },{
                                            value:600,
                                            name:'供水设备维修'
                                        },{
                                            value:10,
                                            name:'爆管'
                                        }],
                                        itemStyle: {
                                            emphasis: {
                                                shadowBlur: 10,
                                                shadowOffsetX: 0,
                                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                                            }
                                        }
                                    }
                                ]
                            }
                        )
                    );
                    BARLINE = that.$echarts.init(that.$refs.bar3);
                    BARLINE.setOption(
                        that.initBarLine(
                            {
                                nameList: ['签到点','已签到点','完成率'],
                                xData:['1月','2月','3月','4月'],
                                dataList: [
                                    {
                                        name: '签到点',
                                        type: 'bar',
                                        barWidth: '20%',
                                        itemStyle: {
                                            normal: {
                                                color: '#2e8ed8'
                                            }
                                        },
                                        data: [100,300,150,400]
                                    },
                                    {
                                        name: '已签到点',
                                        type: 'bar',
                                        barWidth: '20%',
                                        itemStyle: {
                                            normal: {
                                                color: '#c0504d'
                                            }
                                        },
                                        data:[90,100,100,110]
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
                                        data: [50,80,80,90]
                                    }
                                ]
                            }
                        )
                    );

                },1000);

            });
        },
        created() {
            let time = new Date();
            let year = time.getUTCFullYear();
            let widthMonth =
                year +
                '-' +
                (time.getUTCMonth() + 1 < 10
                    ? '0' + (time.getUTCMonth() + 1)
                    : time.getUTCMonth() + 1);
            this.year1 = '' + year;
            this.year2 = '' + year;
            this.month1 = widthMonth;
            this.month = '' + (time.getUTCMonth() + 1);
            this.post_year = year;
            this.post_month = '' + (time.getUTCMonth() + 1);
        }
    };
</script>

<style lang='scss' scoped>
    $baseFont: 14px;
    $baseColor: #333;
    $baseBorderColor: #ccc;
    #statistic {
        width: 100%;
        height: calc(100% - 40px);
        padding: 10px;
        font-size: 14px;
        color: #333;
        overflow-y: auto;

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
                padding-right: 10px;

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

                    .chart {
                        height: calc(100% - 30px) !important;
                        width: 100%;
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
