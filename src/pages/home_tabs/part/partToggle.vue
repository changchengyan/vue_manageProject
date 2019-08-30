<template>
    <div id="partToggle">
        <div class="row">
            <div class="top-title">
                <span>各乡镇用水量统计</span>
            </div>
            <div class="chart-wrap">
                <div class="chart" ref="chartPie"></div>
            </div>
        </div>
        <div class="row">
            <div class="top-title">
                <span>各乡镇用水费缴收统计</span>
            </div>
            <div class="chart-wrap">
                <div class="chart" ref="chartBar"></div>
            </div>
        </div>
    </div>
</template>

<script>

    let BARCHART = null;
    let PIECHART = null;



    export default {
        name: 'partToggle',
        props: ['partId'],
        data() {
            return {
                activeIndex: 0,
                chartData: {
                    nameList: [],
                    capacityList: []
                },
                barData:{
                    nameList:[],
                    execCostList:[],
                    realCostList:[]
                }
            };
        },
        methods: {
            resize() {

                this.$nextTick(() => {
                    BARCHART.resize();
                    PIECHART.resize();
                });
            },
            initBar(obj){
                return{
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        itemWidth: 20, //图例的宽度
                        itemHeight: 8, //图例的高度
                        itemGap: 40,
                        left: 'center',
                        top: '20',
                        icon: 'rect',
                        selectedMode: false, //取消图例上的点击事件
                        data: ['应交水费', '实缴水费'],
                    },
                    grid: {
                        left: '30',
                        right: '30',
                        bottom: '20',
                        top:'60',
                        containLabel: true
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                    },
                    calculable: true,
                    xAxis: [{
                        splitLine: {
                            show: false
                        }, //去除网格线
                        splitArea: {
                            show: false
                        }, //保留网格区域
                        axisLine: {
                            show: true,
                            lineStyle: { //轴上的线样式
                                color: '#979797',
                                width: 0.6, //这里是为了突出显示加上的
                            },
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: { //轴上的数据样式
                            color: '#393C40',
                            rotate:60,
                            fontSize:12
                        },
                        data: obj.nameList,
                    }],
                    yAxis: [{
                        // type: 'value',
                        name:'万元',
                        splitLine: {
                            show: false
                        }, //去除网格线
                        splitArea: {
                            show: false
                        }, //保留网格区域
                        axisLine: {
                            show: true,
                            lineStyle: { //轴上的线样式
                                color: '#979797',
                                width: 0.6, //这里是为了突出显示加上的
                            },
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: { //轴上的数据样式
                            color: '#393C40',
                        }
                    }],
                    color:['#1A88DB','#ED963A'],
                    series: [
                        {
                            name: '应交水费',
                            type: 'bar',
                            barWidth: '10%',// 柱形的宽度
                            barGap: 0,
                            data:  obj.execCostList
                        },
                        {
                            name: '实缴水费',
                            type: 'bar',
                            barWidth: '10%',// 柱形的宽度
                            barGap: 0,
                            data: obj.realCostList
                        }
                    ]
                };
            },
            initData(type){
                let that = this;
                console.log('type',type);
                switch (type) {
                    case '1':
                        this.barData = {
                            nameList:['预旺镇','马高庄镇','张家塬乡','韦州镇','下马关镇'],
                            execCostList:[121138.73,183110.56,122177.59,95249.02,146048.60],
                            realCostList:[100093.17,151298.58,100951.56,78701.31,120675.43]
                        };
                        this.chartData = {
                            nameList: ['预旺镇', '马高庄镇', '张家塬乡', '韦州镇', '下马关镇'],
                            capacityList: [{
                                name: '预旺镇',
                                value: 42083.20
                            }, {
                                name: '马高庄乡',
                                value: 63612.01
                            }, {
                                name: '张家塬乡',
                                value: 42444.10
                            }, {
                                name: '韦州镇',
                                value: 33089.20
                            }, {
                                name: '下马关镇',
                                value: 50736.81
                            }]
                        };
                        break;
                    case '2':
                        this.barData = {
                            nameList:['王团镇','马高庄乡','石狮管委会','田老庄乡','河西镇','预旺镇'],
                            execCostList:[124845.24,111595.48,121933.37,107157.66,101823.43,127841.06],
                            realCostList:[103142.40,92195.95,100736.72,88529.59,84122.65,105617.43]
                        };
                        this.chartData = {
                            nameList: ['王团镇', '马高庄乡', '石狮管委会', '田老庄乡', '河西镇', '预旺镇'],
                            capacityList: [
                                {
                                    name: '王团镇',
                                    value: 45032.45
                                }, {
                                    name: '下马关镇',
                                    value: 40253.18
                                }, {
                                    name: '石狮管委会',
                                    value: 43982.12
                                }, {
                                    name: '田老庄乡',
                                    value: 38652.43
                                }, {
                                    name: '河西镇',
                                    value: 36728.34
                                }, {
                                    name: '预旺镇',
                                    value: 46113.06
                                }
                            ]
                        };
                        break;
                    case '3':
                        this.barData = {
                            nameList:['兴隆乡','河西镇'],
                            execCostList:[334079.65,339634.61],
                            realCostList:[276039.65,280629.55]
                        };
                        this.chartData = {
                            nameList: ['兴隆乡', '河西镇'],
                            capacityList: [
                                {
                                    name: '兴隆乡',
                                    value: 103567.23
                                }, {
                                    name: '河西镇',
                                    value: 105289.31
                                }
                            ]
                        };
                        break;
                }


                this.$nextTick(()=>{

                    setTimeout(()=>{
                        BARCHART = that.$echarts.init(that.$refs.chartBar);
                        BARCHART.setOption(
                            that.initBar({
                                nameList: that.barData.nameList,
                                execCostList: that.barData.execCostList,
                                realCostList: that.barData.realCostList
                            })
                        );

                        PIECHART = that.$echarts.init(that.$refs.chartPie);
                        PIECHART.setOption(
                            that.initPie({
                                nameList: that.chartData.nameList,
                                capacityList: that.chartData.capacityList
                            })
                        );
                    },1000);

                });



            },
            initPie(obj) {
                return {
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params, ticket, callback) {
                            let res = params.seriesName;
                            res += '<br/>' + params.name + ' : ' + params.value + 'm³';
                            return res;
                        }
                    },
                    legend: {
                        orient: 'horizontal',
                        top: '0%',
                        left: 'center',
                        data: obj.nameList,
                        itemWidth: 20,
                        itemHeight: 10
                    },
                    series: [{
                        name: '各乡镇用水量统计',
                        type: 'pie',
                        avoidLabelOverlap: false,
                        radius: ['50%', '70%'],
                        itemStyle: {
                            normal: {
                                label:{
                                    show: true,
                                    formatter: '{b}:{c}({d}%)'
                                }
                            },
                            labelLine :{show:true}
                        },
                        data: obj.capacityList
                    }]
                };
            },
        },
        mounted() {
            let that = this;
            BARCHART = that.$echarts.init(that.$refs.chartBar);
            PIECHART = that.$echarts.init(that.$refs.chartPie);
        }
    };
</script>

<style scoped lang="scss">
    #partToggle {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        .row{
            width: 50%;
            height: 50%;
            .top-title {
                width: 100%;
                height: 40px;
                text-align: center;
                line-height: 40px;
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 10px;
            }

            .chart-wrap {
                width: 100%;
                height: 300px;

                .chart {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>
