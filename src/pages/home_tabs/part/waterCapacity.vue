<template>
    <div id="waterCapacity">
        <div class="top-title">
            <span>各乡镇用水量统计</span>
        </div>
        <div class="chart-wrap">
            <div class="chart" ref="chart"></div>
        </div>
    </div>
</template>

<script>
    let PIECHART = null;
    export default {
        name: 'waterCapacity',
        components: {},
        data() {
            return {
                chartData: {
                    nameList: [],
                    capacityList: []
                }
            };
        },
        methods: {
            resize() {
                PIECHART.resize();
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
                        orient: 'vertical',
                        right: '0%',
                        bottom: '0%',
                        data: obj.nameList,
                        itemWidth: 20,
                        itemHeight: 10
                    },
                    series: [{
                        name: '各乡镇用水量统计',
                        type: 'pie',
                        avoidLabelOverlap: false,
                        radius: ['50%', '90%'],
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
            initData(type) {
                let that = this;
                console.log('type', type);

                switch (type) {
                    case '1':
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

                PIECHART = that.$echarts.init(that.$refs.chart);
                PIECHART.setOption(
                    that.initPie({
                        nameList: that.chartData.nameList,
                        capacityList: that.chartData.capacityList
                    })
                );


            }
        },
        mounted() {
            let that = this;
            PIECHART = that.$echarts.init(that.$refs.chart);


        }
    };
</script>

<style scoped lang="scss">
    #waterCapacity {
        width: 100%;
        height: 100%;
        overflow-y: auto;

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
