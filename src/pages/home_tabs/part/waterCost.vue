<template>
    <div id="waterCost">
        <div class="top-title">
            <span>各乡镇用水费缴收统计</span>
        </div>
        <div class="chart-wrap">
            <div class="chart" ref="chart"></div>
        </div>
    </div>
</template>

<script>

    let BARCHART = null;

    export default {
        name: 'waterCost',
        data(){
            return{
                chartData:{
                    nameList:[],
                    execCostList:[],
                    realCostList:[]
                }
            };
        },
        methods:{
            resize(){
                this.$nextTick(()=>{
                    BARCHART.resize();
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
                       this.chartData = {
                           nameList:['预旺镇','马高庄镇','张家塬乡','韦州镇','下马关镇'],
                           execCostList:[121138.73,183110.56,122177.59,95249.02,146048.60],
                           realCostList:[100093.17,151298.58,100951.56,78701.31,120675.43]
                       };
                       break;
                   case '2':
                       this.chartData = {
                           nameList:['王团镇','马高庄乡','石狮管委会','田老庄乡','河西镇','预旺镇'],
                           execCostList:[124845.24,111595.48,121933.37,107157.66,101823.43,127841.06],
                           realCostList:[103142.40,92195.95,100736.72,88529.59,84122.65,105617.43]
                       };
                       break;
                   case '3':
                       this.chartData = {
                           nameList:['兴隆乡','河西镇'],
                           execCostList:[334079.65,339634.61],
                           realCostList:[276039.65,280629.55]
                       };
                       break;
               }

                BARCHART.setOption(
                    that.initBar({
                        nameList: that.chartData.nameList,
                        execCostList: that.chartData.execCostList,
                        realCostList: that.chartData.realCostList
                    })
                );

            }
        },
        mounted() {
            let that = this;
            BARCHART = that.$echarts.init(that.$refs.chart);

        }
    };
</script>

<style scoped lang="scss">
#waterCost{
    width: 100%;
    height: 100%; overflow-y: auto;

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
        height: calc(100% - 50px);
        .chart {
            width: 100%;
            height: 100%;
        }


    }

}
</style>
