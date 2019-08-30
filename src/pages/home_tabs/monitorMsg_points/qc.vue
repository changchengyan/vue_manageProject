<template>
  <div id="qc">
    <div class="row">
      <span>起始时间:</span>
      <input class="Wdate" ref="sdate" v-model="sdate" id="sdate" name="sdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:'readOnly',minDate:'#F{$dp.$D(\'edate\',{M:-12})}',maxDate:'#F{ $dp.$D(\'edate\')}'})" placeholder="请选择开始时间"  type="text" >
      <span>至</span>
      <input class="Wdate" ref="edate" v-model="edate" id="edate" name="edate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:'readOnly',minDate:'#F{$dp.$D(\'sdate\')}',maxDate:'#F{$dp.$D(\'sdate\',{M:+12})}'})" placeholder="请选择结束时间"   type="text">
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <div class="row">
      <template v-if="factoryName=='东部净水厂水质监测点'">
       <el-radio v-model="qc_radio" @change="selectThisParams" label="PH">PH</el-radio>
       <el-radio v-model="qc_radio" @change="selectThisParams" label="TDS">导电率</el-radio>
       <el-radio v-model="qc_radio" @change="selectThisParams" label="DO">溶解氧</el-radio>
      </template>
      <template v-if="factoryName=='窑山扩建水厂水质监测点'">
      <el-radio v-model="qc_radio" @change="selectThisParams" label="PH">PH</el-radio>
      <el-radio v-model="qc_radio" @change="selectThisParams" label="TDS">导电率</el-radio>
      <el-radio v-model="qc_radio" @change="selectThisParams" label="DO">溶解氧</el-radio>
      <el-radio v-model="qc_radio" @change="selectThisParams" label="TURB">浊度</el-radio>
      <el-radio v-model="qc_radio" @change="selectThisParams" label="CL">余氯</el-radio>
      </template>
      <template v-if="factoryName=='麻疙瘩、合合山净水厂水质监测点'||factoryName=='马家洼子净水厂水质监测点'||factoryName=='王团净水厂水质监测点'">
      <el-radio v-model="qc_radio" @change="selectThisParams" label="PH">PH</el-radio>
      <el-radio v-model="qc_radio" @change="selectThisParams" label="TDS">导电率</el-radio>
      <el-radio v-model="qc_radio" @change="selectThisParams" label="DO">溶解氧</el-radio>
      <el-radio v-model="qc_radio" @change="selectThisParams" label="TURB">浊度</el-radio>
      <el-radio v-model="qc_radio" @change="selectThisParams" label="CL">余氯</el-radio>
      </template>
      <template v-if="factoryName=='小洪沟净水厂水质监测点'">
      <el-radio v-model="qc_radio" @change="selectThisParams" label="PH">PH</el-radio>
      <el-radio v-model="qc_radio" @change="selectThisParams" label="TDS">导电率</el-radio>
      <el-radio v-model="qc_radio" @change="selectThisParams" label="DO">溶解氧</el-radio>
      <el-radio v-model="qc_radio" @change="selectThisParams" label="CL">余氯</el-radio>
      </template>
    </div>
    <div class="sub-charts">
      <div id="pipe_qc"></div>
    </div>
  </div>
</template>

<script>

  let chart_qc = null;
  export default {
    name: 'qc',
    props:['temp_id','factoryName'],
    components:{
    },
    data(){
      return{
        sdate:'',
        edate:'',
        radio:'TURB',
        current_id:'',
        name:'浊度',
        unit:'(NTU)',
        qc_radio:'PH'
      };
    },
    methods:{
      // 水质
      getWqList_(keyWord){
  
      },
      search(){
        let keyWord ='';
        if(this.radio=='1'){
          keyWord = 'TURB';
        }else{
          keyWord = 'CL';
        }
        this.getWqList_(keyWord);
      },
      showChart(e){
        this.radio=e;
        this.getWqList_();
      },
       // 切换 水质的 监测点
      selectThisParams(val) {
        switch (val) {
          case 'TURB':
            chart_qc.setOption({
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'line'
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
                name: '(°)'
              },
              color: '#2d9fff',
              series: [
                {
                  name: '浊度',
                  type: 'line',
                  barWidth: '10%',
                  data: [
                    [new Date().getTime() - 18000000, 1.5],
              [new Date().getTime() - 15000000, 1.3],
              [new Date().getTime() - 12000000, 1.28],
              [new Date().getTime() - 9000000, 1.9],
              [new Date().getTime() - 6000000, 2.3],
              [new Date().getTime() - 3000000, 2.4]
                  ],
                  smooth: true
                }
              ]
            });
            break;
              case 'CL':
            chart_qc.setOption({
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'line'
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
                name: '(mg/L)'
              },
              color: '#2d9fff',
              series: [
                {
                  name: '余氯',
                  type: 'line',
                  barWidth: '10%',
                  data: [
                    [new Date().getTime() - 18000000, 0.53],
                    [new Date().getTime() - 15000000, 0.62],
                    [new Date().getTime() - 12000000, 0.58],
                    [new Date().getTime() - 9000000, 0.51],
                    [new Date().getTime() - 6000000, 0.67],
                    [new Date().getTime() - 3000000, 0.61]
                  ],
                  smooth: true
                }
              ]
            });
            break;
            case 'PH':
            chart_qc.setOption({
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'line'
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
                name: '(PH)'
              },
              color: '#2d9fff',
              series: [
                {
                  name: 'PH',
                  type: 'line',
                  barWidth: '10%',
                  data: [
                    [new Date().getTime() - 18000000, 8.2],
                    [new Date().getTime() - 15000000, 8.8],
                    [new Date().getTime() - 12000000, 8.4],
                    [new Date().getTime() - 9000000, 8.9],
                    [new Date().getTime() - 6000000, 8.01],
                    [new Date().getTime() - 3000000, 8.18]
                  ],
                  smooth: true
                }
              ]
            });
            break;
            case 'TDS':
            chart_qc.setOption({
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'line'
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
                name: '(ppm)'
              },
              color: '#2d9fff',
              series: [
                {
                  name: '导电率',
                  type: 'line',
                  barWidth: '10%',
                  data: [
                    [new Date().getTime() - 18000000,942],
                    [new Date().getTime() - 15000000, 879],
                    [new Date().getTime() - 12000000, 720],
                    [new Date().getTime() - 9000000, 880],
                    [new Date().getTime() - 6000000, 920],
                    [new Date().getTime() - 3000000, 880]
                  ],
                  smooth: true
                }
              ]
            });
            break;
              case 'DO':
            chart_qc.setOption({
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'line'
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
                name: '(mg/L)'
              },
              color: '#2d9fff',
              series: [
                {
                  name: '溶解氧',
                  type: 'line',
                  barWidth: '10%',
                  data: [
                    [new Date().getTime() - 18000000,5.3],
                    [new Date().getTime() - 15000000, 5.8],
                    [new Date().getTime() - 12000000, 6.7],
                    [new Date().getTime() - 9000000, 7.3],
                    [new Date().getTime() - 6000000, 5.7],
                    [new Date().getTime() - 3000000, 6.1]
                  ],
                  smooth: true
                }
              ]
            });
            break;
        }
      }
    },
    mounted(){
      chart_qc = this.$echarts.init(document.getElementById('pipe_qc'));
      this.selectThisParams('PH');
    },
    created() {
      let time = new Date();
      let currentDate = time.toLocaleDateString();
      this.edate= this.sdate = currentDate.replace(/\//g,'-');
      this.current_id = this.temp_id.split(',')[0];
    }
  };
</script>

<style scoped lang="scss">
  #qc{
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







