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
                       <td><span>{{monitorMsg.q}}</span></td>
                   </tr>
                   <tr>
                       <td><span>瞬时压力（MPa）</span></td>
                       <td><span>{{monitorMsg.p}}</span></td>
                   </tr>
               </tbody>
           </table>
       </div>
        <div class="chart-card">
            <div class="top-title">
              <span class="rect"></span>
                <span>流量</span>
            </div>
            <div class="time-select">
              <span>起始时间:</span>
              <input class="Wdate" ref="sdate_flow" v-model="sdate_flow" id="sdate_flow" name="sdate_flow" onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',startDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'edate_flow\')||\'%y-%M-%d\'}'})" placeholder="请选择开始时间"  type="text" >
              <span>至</span>
              <input class="Wdate" ref="edate_flow" v-model="edate_flow" id="edate_flow" name="edate_flow" onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'sdate_flow\')}',maxDate:'%y-%M-%d',startDate:'%y-%M-%d'})" placeholder="请选择结束时间"   type="text">
              <el-button type="primary" @click="search_flow">搜索</el-button>
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
        <div class="time-select">
          <span>起始时间:</span>
          <input class="Wdate" ref="sdate_press" v-model="sdate_press" id="sdate_press" name="sdate_press" onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',startDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'edate_press\')||\'%y-%M-%d\'}'})" placeholder="请选择开始时间"  type="text" >
          <span>至</span>
          <input class="Wdate" ref="edate_press" v-model="edate_press" id="edate_press" name="edate_press" onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'sdate_press\')}',maxDate:'%y-%M-%d',startDate:'%y-%M-%d'})" placeholder="请选择结束时间"   type="text">
          <el-button type="primary" @click="search_press">搜索</el-button>
        </div>
        <div class="chart-main">
          <div id="chart_press"></div>
        </div>
      </div>
    </div>
</template>

<script>

    let chart_flow  =null;
    let chart_press = null;
    export default {
        name: 'monitorManager',
        props:['pumpId'],
        components:{

        },
        data(){
            return{
              monitorMsg:{
                  q:'0.54',
                  p:'0.33'
              },
              sdate_flow:'',
              edate_flow:'',
              sdate_press:'',
              edate_press:'',
              init_get:true, //初始化 流量和压力调用
              flow_id:'',
              press_id:''
            };
        },
      methods:{
        getPumpBaseInfo_(){


        },
        // 流量
        getQDataList_(id){

        },
        // 压力
        getPressureList_(id){

        },
        search_flow(){
          let id = this.flow_id;
          this.getQDataList_(id);
        },
        search_press(){
          let id = this.press_id;
          this.getPressureList_(id);
        },
        // 自适应屏幕
        resize(){
          chart_flow.resize();
          chart_press.resize();
        },
      },
      mounted(){
        chart_flow = this.$echarts.init(document.getElementById('chart_flow'));
        chart_press = this.$echarts.init(document.getElementById('chart_press'));

        // 绘制图表 水流
        chart_flow.setOption({
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
            name: '(m³/h)'
          },
          color: '#2d9fff',
          series: [{
            name: '流量',
            type: 'line',
            barWidth: '10%',
            data:  [
                [ new Date().getTime()-18000000 ,0.52 ],[ new Date().getTime()-15000000 ,0.54 ],[ new Date().getTime()-12000000 ,0.55 ],
                [ new Date().getTime()-9000000 ,0.55 ],[ new Date().getTime()-6000000 ,0.51 ],[ new Date().getTime()-3000000 ,0.50 ]
            ],
            smooth:true
          }]
        });
        // 绘制图表 压力
        chart_press.setOption({
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
            name: '(MPa)'
          },
          color: '#2d9fff',
          series: [{
            name: '压力',
            type: 'line',
            barWidth: '10%',
            data:  [
                [ new Date().getTime()-20000 ,0.32 ],[ new Date().getTime()-19000 ,0.32 ],[ new Date().getTime()-18000 ,0.33 ],
                [ new Date().getTime()-17000 ,0.31 ],[ new Date().getTime()-16000 ,0.34 ],[ new Date().getTime()-15000 ,0.32 ]
            ],
            lineStyle: {
              opacity: 1
            },
            smooth:true
          }]
        });

        this.getPumpBaseInfo_();
      },
      created() {
          let time = new Date();
        let currentDate = time.toLocaleDateString();
        this.sdate_flow= this.sdate_press = currentDate.replace(/\//g,'-');
        this.edate_flow= this.edate_press= currentDate.replace(/\//g,'-');

      }
    };
</script>

<style scoped lang="scss">
    #monitorMsg{
        width: 100%;
        height: 100%;
        .table-view{
            width: 100%;
            padding: 0 10px;
            height: 140px;
            overflow: auto;
        }
        .chart-card{
            width: 100%;
            .top-title{
                width: 100%;
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid #ccc;
                font-size: 16px;
                font-weight: 600;
                text-align: left;
            }
            .time-select{
                width: 100%;
                height: 30px;
                display: flex;
                justify-content: flex-start;
                margin-right: 10px;
                align-items: center;
              span{
                display: inline-block;
                margin:0 10px;
              }
              .el-button{
                margin-left: 10px;
              }
            }
            .chart-main{
                width: 100%;
                height: 200px;
              &>div{
                width: 100%;
                height: 100%;
              }
            }
        }
    }
</style>
