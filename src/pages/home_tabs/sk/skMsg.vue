<template>
    <div id="skMsg">
      <div class="row">
        <table class="innerTable">
          <tbody>
          <tr>
            <td><span>水位(m)</span></td>
            <td><span>{{tableVal.zData}}</span></td>
          </tr>
<!--          <tr>-->
<!--            <td><span>浊度(NTU)</span></td>-->
<!--            <td><span>{{tableVal.TURB}}</span></td>-->
<!--          </tr>-->
          </tbody>
        </table>
      </div>
      <div class="row">
        <div class="top-head">
          <span class="rect"></span>
          <span>水位</span>
        </div>
        <div class="chart-content">
          <div class="search-time">
            <span>时间:</span>
            <input type="text" ref="sdate_lev" v-model="sdate_lev" id="sdate_lev" name="sdate_lev" class="Wdate" onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',startDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'edate_lev\')||\'%y-%M-%d\'}'})" placeholder="请选择开始时间" >
            <span>至</span>
            <input type="text" ref="edate_lev" v-model="edate_lev" id="edate_lev" name="edate_lev" class="Wdate" placeholder="请选择结束时间"  onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'sdate_lev\')}',maxDate:'%y-%M-%d',startDate:'%y-%M-%d'})">

            <el-button type="primary" @click="searchLev">搜索</el-button>
          </div>
          <div class="main-chart">
               <div id="pipe_water"></div>
          </div>
        </div>
      </div>
<!--      <div class="row">-->
<!--        <div class="top-head">-->
<!--          <span class="rect"></span>-->
<!--          <span>浊度</span>-->
<!--        </div>-->
<!--        <div class="chart-content">-->
<!--          <div class="search-time">-->
<!--            <span>时间:</span>-->
<!--            <input type="text" ref="sdate_dimness" v-model="sdate_dimness" id="sdate_dimness" name="sdate_danger" class="Wdate" onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',startDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'edate_dimness\')||\'%y-%M-%d\'}'})" placeholder="请选择开始时间" >-->
<!--            <span>至</span>-->
<!--            <input type="text" ref="edate_dimness" v-model="edate_dimness" id="edate_dimness" name="edate_danger" class="Wdate" placeholder="请选择结束时间"  onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'sdate_dimness\')}',maxDate:'%y-%M-%d',startDate:'%y-%M-%d'})">-->
<!--            <el-button type="primary" @click="searchDimness">搜索</el-button>-->
<!--          </div>-->
<!--          <div class="main-chart">-->
<!--            <div id="pipe_dimness"></div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
</template>

<script>

  let pipe_water = null;
  // let pipe_dimness = null;

  export default {
        name: 'skMsg',
      components:{

      },
      props:['skId'],
      data(){
          return{
            sdate_lev:'',
            edate_lev:'',
            sdate_dimness:'',
            edate_dimness:'',
            tableVal:{
              zData:'20',
              TURB:'0.52',
              zDataId:'',
              TURBId:''
            }
          };
      },
      methods:{
        getRsvrWqInfo_(){

        },
        // 获取水位过程线
        getZData_(id){



        },
        // 获取浊度过程线
        getWqList_(id){

        },
        searchDimness(){
          let temp_id = this.tableVal.TURBId;
          this.getWqList_(temp_id);
        },
        searchLev(){
          let temp_id = this.tableVal.zDataId;
          this.getZData_(temp_id);
        },
        // 自适应屏幕
        resize(){
          pipe_water.resize();
          // pipe_dimness.resize();
        },
      },
      mounted(){
        this.getRsvrWqInfo_();
        pipe_water = this.$echarts.init(document.getElementById('pipe_water'));
        // pipe_dimness = this.$echarts.init(document.getElementById('pipe_dimness'));
        // 绘制图表 水位
        pipe_water.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer : {
              type : 'line'
            }
          },
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
            name: '(水位m)'
          },
          color: '#2d9fff',
          series: [{
            name: '水位',
            type: 'line',
            barWidth: '10%',
            // eslint-disable-next-line standard/array-bracket-even-spacing
            data:  [[new Date().getTime()-21000000 ,31],[new Date().getTime()-18000000 ,31],[new Date().getTime()-15000000,34.5],[new Date().getTime()-12000000,32 ],[new Date().getTime()-9000000 ,31 ],[new Date().getTime()-6000000 ,30.8], [new Date().getTime()-3000000 ,32 ]],
            smooth:false
          }]
        });
        // // 绘制图表 水位
        // pipe_dimness.setOption({
        //   tooltip: {
        //     trigger: 'axis',
        //     axisPointer : {
        //       type : 'line'
        //     }
        //   },
        //   grid: {
        //     top: '40px',
        //     left: '40px',
        //     right: '45px',
        //     bottom: '30px'
        //   },
        //   xAxis: {
        //     show: true,
        //     name: '时间',
        //     type: 'time',
        //     splitLine: {
        //       show: false
        //     }
        //   },
        //   yAxis: {
        //     show: true,
        //     name: '(浊度NTU)'
        //   },
        //   color: '#2d9fff',
        //   series: [{
        //     name: '浊度',
        //     type: 'line',
        //     barWidth: '10%',
        //     data:  [
        //       [ new Date().getTime()-20000 ,0.12 ],[ new Date().getTime()-19000 ,0.26 ],[ new Date().getTime()-18000 ,0.35 ]
        //     ],
        //     smooth:false
        //   }]
        // });
      },
      created() {

          let time = new Date();
          let currentDate = time.toLocaleDateString();
          this.sdate_dimness= this.sdate_lev = currentDate.replace(/\//g,'-');
          this.edate_dimness= this.edate_lev = currentDate.replace(/\//g,'-');

      }
    };
</script>

<style scoped lang="scss">
#skMsg{
  width: 100%;
  height: 100%;
  table{
    border-top: 1px solid #e9e9e9;
  }
  .row{
    &:not(:first-child){
      height: 400px;
      .top-head{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span{
          margin-right: 10px;
        }
      }
      .chart-content{
        width: 100%;
        height: calc(100% - 20px);
        .search-time{
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span{
            display: inline-block;
            margin-right: 10px;
          }
          input{
            margin-right: 10px;
          }
        }
        .main-chart{
          width: 100%;
          height: calc(100% - 40px);
          &>div{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

}
</style>
