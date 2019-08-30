
<template>
    <div id="allArea">
        <div class="top-head">
            <div class="row">
                <span class="rect"></span>
                <span>水费数据</span>
            </div>
            <div class="row">
                <input type="text" v-model="initDate" ref="sdate_repair"  name="sdate_repair" class="Wdate"  placeholder="请选择年月"
                       onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM'})">
            </div>
        </div>
        <div class="rate-cards">
            <div class="row">
                <div class="card-item">
                    <span class="green">{{cardPanel.userCount}}</span>
                    <span>用户数(户)</span>
                </div>
                <div class="card-item">
                    <span class="green">{{cardPanel.usedWater}}</span>
                    <span>用水量(m³)</span>
                </div>
                <div class="card-item">
                    <span class="green">{{cardPanel.receiveMoney}}</span>
                    <span>已收水费(元)</span>
                </div>
            </div>
            <div class="row">
                <div class="card-item">
                    <span class="green">{{cardPanel.willGiveMoneyUserCount}}</span>
                    <span>登记待缴户数</span>
                </div>
                <div class="card-item">
                    <span class="green">{{cardPanel.rangeUserCapacity}}</span>
                    <span>户均用水量(m³)</span>
                </div>
                <div class="card-item">
                    <span class="green">{{cardPanel.rangeUserCost}}</span>
                    <span>户均缴费(元)</span>
                </div>
            </div>
        </div>
        <div class="top-head">
            <div class="col">
                <span class="rect"></span>
                <span>各乡镇水量统计(m³)</span>
            </div>
        </div>
        <div class="areaWater-statiChart" ref="areaWater"></div>
        <div class="top-head">
            <div class="col">
                <span class="rect"></span>
                <span>各乡镇用水费收缴统计</span>
            </div>
        </div>
        <div class="areaRate-statiChart" ref="areaRate"></div>
    </div>
</template>

<script>
    let PIECHART = null;
    let BARCHART = null;

    export default {
        name: 'allArea',
        data(){
            return{
                initDate:'',
                cardPanel:{
                    userCount:297504,
                    usedWater:691583.46,
                    receiveMoney:1682734.00,
                    willGiveMoneyUserCount:3115,
                    rangeUserCapacity:0.77,
                    rangeUserCost:3.85
                }
            };
        },
        methods:{
            initPie(obj){
                return {
                    tooltip: {
                        trigger: 'item',
                        formatter: function(params, ticket, callback) {
                            let res = params.seriesName;
                            res += '<br/>' + params.name + ' : ' + params.value+'m³';
                            return res;
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        right: '0%',
                        bottom: '0%',
                        data: ['东部片区', '中部片区', '西部片区'],
                        itemWidth: 20,
                        itemHeight: 10
                    },
                    color:['#3b7fd2','#ff953f','#9eca4e'],
                    series: [{
                        name: '各乡镇用水量统计',
                        type: 'pie',
                        avoidLabelOverlap: false,
                        radius: ['50%', '90%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'center',
                                formatter: '{text|{b}}\n{value|{d}%}',
                                rich: {
                                    text: {
                                        color: '#F2A695',
                                        fontSize: 20,
                                        align: 'center',
                                        verticalAlign: 'middle',
                                        padding: 5
                                    },
                                    value: {
                                        color: '#F2A695',
                                        fontSize: 14,
                                        align: 'center',
                                        verticalAlign: 'middle',
                                    },
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '46',
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [ {
                            value: 97543.15,
                            name: '东部片区'
                        }, {
                            value: 250761.58,
                            name: '中部片区'
                        }, {
                            value: 208856.54,
                            name: '西部片区'
                        }]
                    }]
                };
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
                        top: '10',
                        icon: 'rect',
                        selectedMode: false, //取消图例上的点击事件
                        data: ['应交水费', '实缴水费'],
                    },
                    grid: {
                        left: '20',
                        right: '30',
                        bottom: '20',
                        top:'70',
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
                        data: ['东部', '中部', '西部'],
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
                            data: [667724.497603394,695106.247092476, 673714.25530413]
                        },
                        {
                            name: '实缴水费',
                            type: 'bar',
                            barWidth: '10%',// 柱形的宽度
                            barGap: 0,
                            data: [551720.052711896,574344.743472357,556669.203815747]
                        }
                    ]
                };
            }
        },
        mounted() {
            let that = this;
            PIECHART = that.$echarts.init(that.$refs.areaWater);
            PIECHART.clear();
            PIECHART.setOption(
                that.initPie()
            );
            BARCHART = that.$echarts.init(that.$refs.areaRate);
            BARCHART.clear();
            BARCHART.setOption(
                that.initBar()
            );
            let date = new Date().toLocaleDateString();
            console.log(date);
            date = date.replace(/\//g,'-');
            date = date.split('-').splice(0,2);
            date = date.join('-');
            this.initDate = date;
        }
    };
</script>

<style scoped lang="scss">
    #allArea{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        .rate-cards{
            width: 100%;
            padding: 5px;
            .row{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;
                margin-bottom: 10px;
                .card-item  {
                    width: calc(33.33% - 5px);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 5px 0;
                    border: 1px solid #4ACBE8;
                    span{
                        &.green{
                            color: #4ACBE8;
                            font-size: 14px;
                            font-weight: 600;
                        }
                    }
                }
            }
        }
        .areaWater-statiChart{
            width: 100%;
            height: 200px;
        }
        .areaRate-statiChart{
            width: 100%;
            height: 300px;
        }
    }
</style>

