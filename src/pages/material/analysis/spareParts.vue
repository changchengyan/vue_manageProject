
<template>
    <div id="spareParts">
        <!-- 备品备件分析 -->
        <div v-show="1 === 1" class="main clearfix">
            <div class="article">
                <div v-if="1 === 1" class="dashboard card">
                    <ul class="row">
                        <li v-for="(item, key) in staticPanelCards" :key="key" class="col">
                            <div class="section">
                                <p class="text"><countTo :startVal="0" :endVal="Number(item.value)" :duration="3000" class="value" />(个)</p>
                                <p class="text">
                                    <span class="label">{{ item.label }}</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="pieWraperEnd">
                    <div class="row">
                        <div class="title">
                            <span>东部分公司</span>
                        </div>
                        <div class="chart-item" ref="PieEleCenter11"></div>
                        <div class="chart-item" ref="PieEleCenter22"></div>
                    </div>
                    <div class="row">
                        <div class="title">
                            <span>中部分公司</span>
                        </div>
                        <div class="chart-item" ref="PieEleCenter33"></div>
                        <div class="chart-item" ref="PieEleCenter44"></div>
                    </div>
                    <div class="row">
                        <div class="title">
                            <span>西部分公司</span>
                        </div>
                        <div class="chart-item" ref="PieEleCenter55"></div>
                        <div class="chart-item" ref="PieEleCenter66"></div>
                    </div>
                </div>
            </div>
            <div class="aside">
                <div class="sub-title">
                    <h1>低于库存备品备件清单(东部)</h1>
                </div>
                <table class="innerTable">
                    <thead>
                    <tr>
                        <th><span>备件名称</span></th>
                        <th><span>设备编号</span></th>
                        <th><span>备件类型</span></th>
                        <th><span>生产厂家</span></th>
                        <th><span>规格型号</span></th>
                        <th><span>安全库存</span></th>
                        <th><span>当前库存</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(val,index) in tableList" :key="index">
                        <td><span>{{val.name}}</span></td>
                        <td><span>{{val.code}}</span></td>
                        <td><span>{{val.type}}</span></td>
                        <td><span>{{val.factoryName}}</span></td>
                        <td><span>{{val.modelType}}</span></td>
                        <td><span>{{val.leftCount}}</span></td>
                        <td><span>{{val.currentCount}}</span></td>
                    </tr>
                    </tbody>
                </table>
                <div class="sub-title">
                    <h1>低于库存备品备件清单(中部)</h1>
                </div>
                <table class="innerTable">
                    <thead>
                    <tr>
                        <th><span>备件名称</span></th>
                        <th><span>设备编号</span></th>
                        <th><span>备件类型</span></th>
                        <th><span>生产厂家</span></th>
                        <th><span>规格型号</span></th>
                        <th><span>安全库存</span></th>
                        <th><span>当前库存</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(val,index) in md_tableList" :key="index">
                        <td><span>{{val.name}}</span></td>
                        <td><span>{{val.code}}</span></td>
                        <td><span>{{val.type}}</span></td>
                        <td><span>{{val.factoryName}}</span></td>
                        <td><span>{{val.modelType}}</span></td>
                        <td><span>{{val.leftCount}}</span></td>
                        <td><span>{{val.currentCount}}</span></td>
                    </tr>
                    </tbody>
                </table>
                <div class="sub-title">
                    <h1>低于库存备品备件清单(西部)</h1>
                </div>
                <table class="innerTable">
                    <thead>
                    <tr>
                        <th><span>备件名称</span></th>
                        <th><span>设备编号</span></th>
                        <th><span>备件类型</span></th>
                        <th><span>生产厂家</span></th>
                        <th><span>规格型号</span></th>
                        <th><span>安全库存</span></th>
                        <th><span>当前库存</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(val,index) in west_tableList" :key="index">
                        <td><span>{{val.name}}</span></td>
                        <td><span>{{val.code}}</span></td>
                        <td><span>{{val.type}}</span></td>
                        <td><span>{{val.factoryName}}</span></td>
                        <td><span>{{val.modelType}}</span></td>
                        <td><span>{{val.leftCount}}</span></td>
                        <td><span>{{val.currentCount}}</span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import countTo from 'vue-count-to';

    import dashboards0 from './data/dashboards0';
    import dashboards1 from './data/dashboards1';
    import asideTableHead0 from './data/asideTableHead0';
    import asideTableData0 from './data/asideTableData0';
    import asideTableHead1 from './data/asideTableHead1';
    import asideTableData1 from './data/asideTableData1';
    import commonBar from './data/commonBar';

    const { commonBarCenter, commonPieCenter, commonBarAside, commonPieAside } = commonBar;



    let PieEleCenter11;
    let PieEleCenter22;
    let PieEleCenter33;
    let PieEleCenter44;
    let PieEleCenter55;
    let PieEleCenter66;


    export default {
        name: 'spareParts',
        components: { countTo },
        data() {
            return {
                globalTabIndex: 0,
                globalTabs: ['设备分析', '备品备件分析'],
                asideTableHead0,
                asideTableData0,
                commonBarCenter,
                commonPieCenter,
                commonBarAside,
                dashboards0,
                dashboards1,

                asideTableHead1,
                asideTableData1,
                commonPieAside,
                tableTabs:['东部','中部','西部'],
                tableIndex:0,
                temp_tableList:[
                    {
                        name:'阀门阀板',
                        code:'TXBJ-0101',
                        type:'机械类',
                        factoryName:'塘沽瓦斯特',
                        modelType:'DN400',
                        leftCount:'20',
                        currentCount:'15'
                    },
                    {
                        name:'泵组螺栓',
                        code:'TXBJ-0102',
                        type:'机械类',
                        factoryName:'塘沽瓦斯特',
                        modelType:'DN 16-20',
                        leftCount:'60',
                        currentCount:'50'
                    },
                    {
                        name:'继电器',
                        code:'TXBJ-0103',
                        type:'',
                        factoryName:'正泰电气',
                        modelType:'Z370X',
                        leftCount:'40',
                        currentCount:'33'
                    },
                    {
                        name:'连接器',
                        code:'TXBJ-0104',
                        type:'机械类',
                        factoryName:'襄阳承轴',
                        modelType:'PQ-050T',
                        leftCount:'10',
                        currentCount:'9'
                    }
                ],
                tableList:[
                    {
                        name:'阀门阀板',
                        code:'TXBJ-0101',
                        type:'机械类',
                        factoryName:'塘沽瓦斯特',
                        modelType:'DN400',
                        leftCount:'20',
                        currentCount:'15'
                    },
                    {
                        name:'泵组螺栓',
                        code:'TXBJ-0102',
                        type:'机械类',
                        factoryName:'塘沽瓦斯特',
                        modelType:'DN 16-20',
                        leftCount:'60',
                        currentCount:'50'
                    },
                    {
                        name:'继电器',
                        code:'TXBJ-0103',
                        type:'电气类',
                        factoryName:'正泰电气',
                        modelType:'Z370X',
                        leftCount:'40',
                        currentCount:'33'
                    },
                    {
                        name:'连接器',
                        code:'TXBJ-0104',
                        type:'机械类',
                        factoryName:'襄阳承轴',
                        modelType:'PQ-050T',
                        leftCount:'10',
                        currentCount:'9'
                    }
                ],
                east_tableList:[
                    {
                        name:'阀门阀板',
                        code:'TXBJ-0101',
                        type:'机械类',
                        factoryName:'塘沽瓦斯特',
                        modelType:'DN400',
                        leftCount:'20',
                        currentCount:'15'
                    },
                    {
                        name:'泵组螺栓',
                        code:'TXBJ-0102',
                        type:'机械类',
                        factoryName:'塘沽瓦斯特',
                        modelType:'DN 16-20',
                        leftCount:'60',
                        currentCount:'50'
                    },
                    {
                        name:'继电器',
                        code:'TXBJ-0103',
                        type:'电气类',
                        factoryName:'正泰电气',
                        modelType:'Z370X',
                        leftCount:'40',
                        currentCount:'33'
                    },
                    {
                        name:'连接器',
                        code:'TXBJ-0104',
                        type:'机械类',
                        factoryName:'襄阳承轴',
                        modelType:'PQ-050T',
                        leftCount:'10',
                        currentCount:'9'
                    }
                ],
                md_tableList:[
                    {
                        name:'阀门阀板',
                        code:'TXBJ-0103',
                        type:'机械类',
                        factoryName:'塘沽瓦斯特',
                        modelType:'DN400',
                        leftCount:'10',
                        currentCount:'2'
                    },
                    {
                        name:'泵组螺栓',
                        code:'TXBJ-0106',
                        type:'机械类',
                        factoryName:'塘沽瓦斯特',
                        modelType:'DN 16-20',
                        leftCount:'10',
                        currentCount:'3'
                    },
                    {
                        name:'连接器',
                        code:'TXBJ-0104',
                        type:'机械类',
                        factoryName:'襄阳承轴',
                        modelType:'PQ-050T',
                        leftCount:'10',
                        currentCount:'5'
                    }
                ],
                west_tableList:[
                    {
                        name:'泵组螺栓',
                        code:'TXBJ-0105',
                        type:'机械类',
                        factoryName:'塘沽瓦斯特',
                        modelType:'DN 16-20',
                        leftCount:'10',
                        currentCount:'2'
                    },
                    {
                        name:'继电器',
                        code:'TXBJ-0103',
                        type:'电气类',
                        factoryName:'正泰电气',
                        modelType:'Z370X',
                        leftCount:'10',
                        currentCount:'3'
                    },
                    {
                        name:'连接器',
                        code:'TXBJ-0104',
                        type:'机械类',
                        factoryName:'襄阳承轴',
                        modelType:'PQ-050T',
                        leftCount:'10',
                        currentCount:'4'
                    }
                ],
                staticPanelCards:[
                    {
                        label:'全县设备总数',
                        value:2099
                    },
                    {
                        label:'东部分公司',
                        value:756
                    },
                    {
                        label:'西部分公司',
                        value:645
                    },
                    {
                        label:'中部分公司',
                        value:698
                    }
                ]
            };
        },
        mounted() {
            const that = this;

            setTimeout(() => {
                that._initialization();
            }, 700);
        },
        methods: {
            _initialization() {
                const that = this;

                that.$nextTick(() => {
                    that.onHandleGlobalTabChange(0);
                });
            },
            selectThisTab(index){
                this.tableIndex = index;
                if(index==0){
                    this.tableList = this.east_tableList;
                }else if(index==1){
                    this.tableList = this.md_tableList;
                }else {
                    this.tableList = this.west_tableList;
                }
            },
            _drawArticle() {
                const that = this;
                const { globalTabIndex = 0 } = that;

                switch (globalTabIndex) {
                    case 0:
                        PieEleCenter11.setOption(
                            that._drawPie({
                                title:'备品备件分布图',
                                nameList:['机械类','电气类','液压类','通信类'],
                                colorList:['#3b7fd2','#d73a35','#9eca4e','#7f59ae'],
                                dataList:[
                                    {
                                        value:109,
                                        name:'机械类'
                                    },
                                    {
                                        value:110,
                                        name:'电气类'
                                    },{
                                        value:98,
                                        name:'液压类'
                                    },
                                    {
                                        value:108,
                                        name:'通信类'
                                    }
                                ]
                            })
                        );
                        PieEleCenter33.setOption(
                            that._drawPie({
                                title:'备品备件分布图',
                                nameList:['机械类','电气类','液压类','通信类'],
                                colorList:['#3b7fd2','#d73a35','#9eca4e','#7f59ae'],
                                dataList:[
                                    {
                                        value:120,
                                        name:'机械类'
                                    },
                                    {
                                        value:170,
                                        name:'电气类'
                                    },{
                                        value:99,
                                        name:'液压类'
                                    },
                                    {
                                        value:98,
                                        name:'通信类'
                                    }

                                ]
                            })
                        );
                        PieEleCenter55.setOption(
                            that._drawPie({
                                title:'备品备件分布图',
                                nameList:['机械类','电气类','液压类','通信类'],
                                colorList:['#3b7fd2','#d73a35','#9eca4e','#7f59ae'],
                                dataList:[
                                    {
                                        value:99,
                                        name:'机械类'
                                    },
                                    {
                                        value:120,
                                        name:'电气类'
                                    },{
                                        value:70,
                                        name:'液压类'
                                    },
                                    {
                                        value:130,
                                        name:'通信类'
                                    }

                                ]
                            })
                        );
                        PieEleCenter22.setOption(
                            that.initBar({
                               nameList:['机械类','电气类','液压类','通信类'] ,
                                dataList:[1,5,5,10]
                            })
                        );
                        PieEleCenter44.setOption(
                            that.initBar({
                                nameList:['机械类','电气类','液压类','通信类'] ,
                                dataList:[8,22,-10,-10]
                            })
                        );
                        PieEleCenter66.setOption(
                            that.initBar({
                                nameList:['机械类','电气类','液压类','通信类'] ,
                                dataList:[10,22,-18,-2]
                            })
                        );
                        break;
                    default:
                        break;
                }
            },
            _drawBarEleEnd() {
                const that = this;
                const {globalTabIndex = 0} = that;
                switch (globalTabIndex) {
                    case 1:
                        PieEleCenter11.setOption(
                            that._drawPie({
                                title:'备品备件分布图',
                                nameList:['泵组类','电气类','电机类','阀门类','自动化类','仪器仪表类'],
                                colorList:['#3b7fd2','#d73a35','#9eca4e','#7f59ae','#32b8dd','#ff953f'],
                                dataList:[
                                    {
                                        value:29,
                                        name:'泵组类'
                                    },
                                    {
                                        value:87,
                                        name:'电气类'
                                    },{
                                        value:45,
                                        name:'电机类'
                                    },
                                    {
                                        value:130,
                                        name:'阀门类'
                                    },
                                    {
                                        value:54,
                                        name:'自动化类'
                                    },
                                    {
                                        value:106,
                                        name:'仪器仪表类'
                                    }

                                ]
                            })
                        );
                        PieEleCenter33.setOption(
                            that._drawPie({
                                title:'备品备件分布图',
                                nameList:['泵组类','电气类','电机类','阀门类','自动化类','仪器仪表类'],
                                colorList:['#3b7fd2','#d73a35','#9eca4e','#7f59ae','#32b8dd','#ff953f'],
                                dataList:[
                                    {
                                        value:78,
                                        name:'泵组类'
                                    },
                                    {
                                        value:69,
                                        name:'电气类'
                                    },{
                                        value:33,
                                        name:'电机类'
                                    },
                                    {
                                        value:102,
                                        name:'阀门类'
                                    },
                                    {
                                        value:30,
                                        name:'自动化类'
                                    },
                                    {
                                        value:59,
                                        name:'仪器仪表类'
                                    }

                                ]
                            })
                        );
                        PieEleCenter55.setOption(
                            that._drawPie({
                                title:'备品备件分布图',
                                nameList:['泵组类','电气类','电机类','阀门类','自动化类','仪器仪表类'],
                                colorList:['#3b7fd2','#d73a35','#9eca4e','#7f59ae','#32b8dd','#ff953f'],
                                dataList:[
                                    {
                                        value:88,
                                        name:'泵组类'
                                    },
                                    {
                                        value:65,
                                        name:'电气类'
                                    },{
                                        value:98,
                                        name:'电机类'
                                    },
                                    {
                                        value:108,
                                        name:'阀门类'
                                    },
                                    {
                                        value:28,
                                        name:'自动化类'
                                    },
                                    {
                                        value:77,
                                        name:'仪器仪表类'
                                    }

                                ]
                            })
                        );
                        PieEleCenter44.setOption(
                            that._drawRadar({
                                dataNameList:[
                                    {
                                        max:300,
                                        name:'3年以上'
                                    },
                                    {
                                        max:49,
                                        name:'1~3年'
                                    },
                                    {
                                        max:100,
                                        name:'一年以内'
                                    },
                                    {
                                        max:100,
                                        name:'超期'
                                    }
                                ],
                                dateList:[300,49,40,15]
                            })
                        );
                        PieEleCenter66.setOption(
                            that._drawRadar({
                                dataNameList:[
                                    {
                                        max:900,
                                        name:'3年以上'
                                    },
                                    {
                                        max:300,
                                        name:'1~3年'
                                    },
                                    {
                                        max:200,
                                        name:'一年以内'
                                    },
                                    {
                                        max:100,
                                        name:'超期'
                                    }
                                ],
                                dateList:[872,287,130,15]
                            })
                        );
                        PieEleCenter22.setOption(
                            that._drawRadar({
                                dataNameList:[
                                    {
                                        max:300,
                                        name:'3年以上'
                                    },
                                    {
                                        max:100,
                                        name:'1~3年'
                                    },
                                    {
                                        max:100,
                                        name:'一年以内'
                                    },
                                    {
                                        max:100,
                                        name:'超期'
                                    }
                                ],
                                dateList:[279,59,33,17]
                            })
                        );
                        break;
                    default:
                        break;
                }
            },
            // 绘制一个 柱子
            initBar(obj){
                return {
                    title: {
                        text: '备品备件满足库存要求情况',
                        left:'center'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        left:60,
                        bottom: 30
                    },
                    calculable: true,
                    xAxis: [{
                        type: 'category',
                        name: '',
                        axisLabel: {

                        },
                        data: obj.nameList
                    }],
                    color:'#4f81bd',
                    yAxis: [{
                        type: 'value',
                        name: '(个)',
                    }],
                    series: [{
                        type: 'bar',
                        barWidth:'20%',
                        data: obj.dataList,
                    }]

                };
            },
            onHandleGlobalTabChange(globalTabIndex) {
                const that = this;

                that.globalTabIndex = globalTabIndex;

                switch (globalTabIndex) {
                    case 0:

                        PieEleCenter11 = that.$echarts.init(that.$refs.PieEleCenter11);
                        PieEleCenter33 = that.$echarts.init(that.$refs.PieEleCenter33);
                        PieEleCenter55 = that.$echarts.init(that.$refs.PieEleCenter55);

                        PieEleCenter22 = that.$echarts.init(that.$refs.PieEleCenter22);
                        PieEleCenter44 = that.$echarts.init(that.$refs.PieEleCenter44);
                        PieEleCenter66 = that.$echarts.init(that.$refs.PieEleCenter66);

                        break;
                    default:
                        break;
                }

                that._drawArticle();
            },
            _drawRadar(obj){
                return{
                    grid:{
                        top:100
                    },
                    color: ['rgba(0,183,238, 1)', 'rgba(86,199,60, 1)'],
                    tooltip: {
                        show: true,
                        trigger: 'item',
                    },
                    backgroundColor: '#fff',
                    title: {
                        text: '设备寿命统计',
                        left: 'center',
                        textStyle: {
                            color: '#333333'
                        }
                    },
                    radar: {
                        center: ['50%', '50%'],
                        radius: '60%',
                        startAngle: 90,
                        splitNumber: 4,
                        shape: 'circle',
                        splitArea: {
                            areaStyle: {
                                color: ['transparent']
                            }
                        },
                        name: {
                            color: '#999'
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                type: 'dashed',
                                color: '#d1d1d1'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: 'dashed',
                                color: '#d1d1d1'
                            }
                        },
                        indicator: obj.dataNameList
                    },
                    series: [{
                        name: '通过率(%)',
                        type: 'radar',
                        symbol: 'circle',
                        symbolSize: 10,
                        areaStyle: {
                            normal: {
                                color: 'rgba(86,199,60, 0.3)'
                            }
                        },
                        itemStyle: {
                            color: 'rgba(255,255,255, 1)',
                            borderColor: '#2aba3f',
                            borderWidth: 3,
                        },
                        lineStyle: {
                            normal: {
                                color: '#2aba3f',
                                width: 3
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                color: '#000',
                            }
                        },
                        data: [
                            obj.dateList
                        ]


                    }]
                };
            },
            _drawPie(obj){
                return{
                    title: {
                        text: obj.title,
                        left:'center',
                        top:10
                    },
                    grid:{
                        top:50
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    color:obj.colorList,
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        y:'center',
                        data:obj.nameList,
                        formatter:function(name){
                            return name;
                        }
                    },
                    series : [
                        {
                            name: '备品备件分布图',
                            type: 'pie',
                            center: ['35%', '50%'],
                            radius: ['30%', '58%'],
                            data:obj.dataList,
                            itemStyle: {
                                normal: {
                                    label:{
                                        show: true,
                                        formatter: '{b}:{c}({d}%)'
                                    }
                                },
                                labelLine :{show:true}
                            }
                        }
                    ]
                };
            },
        }
    };
</script>

<style lang="scss" scoped="scoped">
    @import '../../analysis/county/style/index.scss';

    .dashboard {
        margin-bottom: 8px;
    }

    .barEleEnd {
        width: 100%;
        height: 300px;
    }

    #spareParts{
        width: 100%;
        height: calc(100% - 40px);
        overflow-y: auto;
    }
    .pieWraperEnd{
        width: 100%;
        .row{
            width: 100%;
            height: 300px;
            display: flex;
            justify-content: flex-start;
            margin-bottom: 10px;
            background: #fff;
            margin-left: 0 !important;
            margin-bottom: 10px !important;

            .title{
                width: 30px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 0 5px;
                background: #b4e5f3;
                color: #437282;
            }
            .chart-item{
                width: calc(50% - 15px);
                height: 100%;
            }
        }
    }
    .aside{
        background: #fff;
        .tabs{
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #e9e9e9;
            .tab-item{
                width: 33.33%;
                height: 100%;
                line-height: 30px;
                text-align: center;
                border-right: 1px solid #e9e9e9;
                cursor: pointer;
                &.actived{
                    background: #0b83fe;
                    color: #fff;
                }
            }
        }
        .sub-title{
            text-align: center;
        }
    }

    table{
        td:last-child{
            line-height: 25px;
        }
    }


</style>

