<template>
    <div id="poolMonitor">
        <div class="row">
            <span>起始时间:</span>
            <input class="Wdate" ref="sdate" v-model="sdate" id="sdate" name="sdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:'readOnly',minDate:'#F{$dp.$D(\'edate\',{M:-12})}',maxDate:'#F{ $dp.$D(\'edate\')}'})" placeholder="请选择开始时间"  type="text" >
            <span>至</span>
            <input class="Wdate" ref="edate" v-model="edate" id="edate" name="edate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:'readOnly',minDate:'#F{$dp.$D(\'sdate\')}',maxDate:'#F{$dp.$D(\'sdate\',{M:+12})}'})" placeholder="请选择结束时间"   type="text">
            <el-button type="primary" @click="search">搜索</el-button>
        </div>
        <div class="sub-charts">
            <div id="waterLevChart"></div>
        </div>
    </div>
</template>

<script>
    let waterLev = null;
    export default {
        name: 'pool-monitor',
        data(){
            return{
                sdate_lev:'',
                edate_lev:'',
                sdate:'',
                edate:'',
                tableVal:{
                    zData:1326.67
                }
            };
        },
        mounted() {
            waterLev = this.$echarts.init(document.getElementById('waterLevChart'));
            // 绘制图表 水流
            waterLev.setOption({
                tooltip: {},
                grid: {
                    top: '40px',
                    left: '40px',
                    right: '45px',
                    bottom: '30px'
                },
                xAxis: {
                    show: true,
                    name: '时间',
                    type: 'time',
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    show: true,
                    name: '(m)'
                },
                color: '#2d9fff',
                series: [{
                    name: '水位',
                    type: 'line',
                    barWidth: '10%',
                    data:  [[ new Date().getTime()-15000000 ,3 ],[ new Date().getTime()-12000000 ,3.2 ],[ new Date().getTime()-9000000 ,3.6 ],[ new Date().getTime()-6000000 ,3.1 ],[ new Date().getTime()-3000000 ,3.15 ]]
                }]
            });
        },
        created() {
            let time = new Date();
            let currentDate = time.toLocaleDateString();
            this.sdate= this.sdate_lev = currentDate.replace(/\//g,'-');
            this.edate= this.edate_lev = currentDate.replace(/\//g,'-');
        },
        methods:{
            search(){

            }
        }
    };
</script>

<style scoped lang="scss">
#poolMonitor{
    width: 100%;
    height: 100%;
    width: 100%;
    height: 100%;
    padding: 10px;
    .row{
        width: 100%;
        height: 50px;
        padding: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span{
            display: inline-block;
            width: 80px;
            text-align: center;
        }
        .el-date-editor.el-input{
            width: 220px;
        }
        .el-button{
            margin-left: 10px;
        }
    }
    .sub-charts{
        width: 100%;
        height: calc(100% - 50px);
        &>div{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
