<template>
  <div id="factoryMonitor">
    <div class="top-table">
      <table class="innerTable">
        <tbody>
          <tr>
            <td>
              <span>今日取水量（m³）</span>
            </td>
            <td>
              <span>{{monitorMsg.inW}}</span>
            </td>
            <td>
              <span>今日供水量(m³)</span>
            </td>
            <td>
              <span>{{monitorMsg.outW}}</span>
            </td>
          </tr>
          <!--          <tr>-->
          <!--            <td><span>供水浊度（NTU）</span></td>-->
          <!--            <td><span>{{monitorMsg.TURB}}</span></td>-->
          <!--            <td><span>供水余氯（mg/L）</span></td>-->
          <!--            <td><span>{{monitorMsg.CL}}</span></td>-->
          <!--          </tr>-->
        </tbody>
      </table>
      <div class="table-two">
        <table class="innerTable">
          <thead>
            <tr>
              <th>
                <span>取水流量点</span>
              </th>
              <th>
                <span>流量瞬时值(m³/s)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="monitorMsg.inQList&&monitorMsg.inQList.length>0">
              <tr v-for="(item,index) in monitorMsg.inQList" :key="index">
                <td>
                  <span>{{item.mpNm}}</span>
                </td>
                <td>
                  <span>{{item.val}}</span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <table class="innerTable">
          <thead>
            <tr>
              <th>
                <span>供水流量点</span>
              </th>
              <th>
                <span>流量瞬时值(m³/s)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="monitorMsg.outQList&&monitorMsg.outQList.length>0">
              <tr v-for="(item,index) in monitorMsg.outQList" :key="index">
                <td>
                  <span>{{item.mpNm}}</span>
                </td>
                <td>
                  <span>{{item.val}}</span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="table-two">
        <table class="innerTable">
          <thead>
            <tr>
              <th>
                <span>压力点</span>
              </th>
              <th>
                <span>压力瞬时值(MPa)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="monitorMsg.pList&&monitorMsg.pList.length>0">
              <tr v-for="(item,index) in monitorMsg.pList" :key="index">
                <td>
                  <span>{{item.mpNm}}</span>
                </td>
                <td>
                  <span>{{item.val}}</span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
         <table class="innerTable">
          <thead>
            <tr>
              <th>
                <span>水质监测点</span>
              </th>
              <th>
                <span>水质瞬时值</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="monitorMsg.qc&&monitorMsg.qc.length>0">
              <tr v-for="(item,index) in monitorMsg.qc" :key="index">
                <td>
                  <span>{{item.mpNm}}</span>
                </td>
                <td>
                  <span>{{item.val}}</span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="wrap-crarts">
      <div class="chart-item">
        <div class="top-head">
          <span class="rect"></span>
          <span>流量</span>
        </div>
        <div class="chart-content">
          <div class="chart-head">
            <div class="col">
              <span>起始时间:</span>
              <input
                class="Wdate"
                ref="sdate_flow"
                v-model="sdate_flow"
                id="sdate_flow"
                name="sdate_flow"
                onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',startDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'edate_flow\')||\'%y-%M-%d\'}'})"
                placeholder="请选择开始时间"
                type="text"
              />
              <span>至</span>
              <input
                class="Wdate"
                ref="edate_flow"
                v-model="edate_flow"
                id="edate_flow"
                name="edate_flow"
                onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'sdate_flow\')}',maxDate:'%y-%M-%d',startDate:'%y-%M-%d'})"
                placeholder="请选择结束时间"
                type="text"
              />
              <el-button type="primary" @click="search_flow">搜索</el-button>
            </div>
            <div class="col"></div>
          </div>
          <div class="chart-main">
            <div id="chart_flow"></div>
          </div>
        </div>
      </div>
      <div class="chart-item">
        <div class="top-head">
          <span class="rect"></span>
          <span>压力</span>
        </div>
        <div class="chart-content">
          <div class="chart-head">
            <div class="col">
              <span>起始时间:</span>
              <input
                class="Wdate"
                ref="sdate_press"
                v-model="sdate_press"
                id="sdate_press"
                name="sdate_press"
                onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',startDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'edate_press\')||\'%y-%M-%d\'}'})"
                placeholder="请选择开始时间"
                type="text"
              />
              <span>至</span>
              <input
                class="Wdate"
                ref="edate_press"
                v-model="edate_press"
                id="edate_press"
                name="edate_press"
                onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'sdate_press\')}',maxDate:'%y-%M-%d',startDate:'%y-%M-%d'})"
                placeholder="请选择结束时间"
                type="text"
              />
              <el-button type="primary" @click="search_press">搜索</el-button>
            </div>
            <div class="col"></div>
          </div>
          <div class="chart-main">
            <div id="chart_press"></div>
          </div>
        </div>
      </div>
      <div class="chart-item">
        <div class="top-head">
          <span class="rect"></span>
          <span>水质</span>
        </div>
        <div class="chart-content">
          <div class="chart-head">
            <div class="col">
              <span>起始时间:</span>
              <input
                class="Wdate"
                ref="sdate_qc"
                v-model="sdate_qc"
                id="sdate_qc"
                name="sdate_qc"
                onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',startDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'edate_qc\')||\'%y-%M-%d\'}'})"
                placeholder="请选择开始时间"
                type="text"
              />
              <span>至</span>
              <input
                class="Wdate"
                ref="edate_qc"
                v-model="edate_qc"
                id="edate_qc"
                name="edate_qc"
                onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'sdate_qc\')}',maxDate:'%y-%M-%d',startDate:'%y-%M-%d'})"
                placeholder="请选择结束时间"
                type="text"
              />
              <el-button type="primary" @click="search_qc">搜索</el-button>
            </div>
            <div class="col">
              <template v-if="factoryName=='东部净水厂'">
                <el-radio v-model="qc_radio" @change="selectThisParams" label="PH">PH</el-radio>
                 <el-radio v-model="qc_radio" @change="selectThisParams" label="TDS">导电率</el-radio>
                <el-radio v-model="qc_radio" @change="selectThisParams" label="DO">溶解氧</el-radio>
              </template>
                <template v-else-if="factoryName=='窑山扩建水厂'||factoryName=='麻疙瘩、合合山净水厂'||factoryName=='马家洼子净水厂'||factoryName=='王团扩建水厂'">
                <el-radio v-model="qc_radio" @change="selectThisParams" label="PH">PH</el-radio>
                <el-radio v-model="qc_radio" @change="selectThisParams" label="TDS">导电率</el-radio>
                <el-radio v-model="qc_radio" @change="selectThisParams" label="DO">溶解氧</el-radio>
                <el-radio v-model="qc_radio" @change="selectThisParams" label="CL">余氯</el-radio>
                <el-radio v-model="qc_radio" @change="selectThisParams" label="TURB">浊度</el-radio>
              </template>
                <template v-else-if="factoryName=='小洪沟净水厂'">
              <el-radio v-model="qc_radio" @change="selectThisParams" label="PH">PH</el-radio>
                   <el-radio v-model="qc_radio" @change="selectThisParams" label="CL">余氯</el-radio>
               <el-radio v-model="qc_radio" @change="selectThisParams" label="TDS">导电率</el-radio>
                <el-radio v-model="qc_radio" @change="selectThisParams" label="DO">溶解氧</el-radio>
              </template>
              <!-- <el-radio v-model="qc_radio" @change="selectThisParams" label="TURB">浊度</el-radio>
              <el-radio v-model="qc_radio" @change="selectThisParams" label="CL">余氯</el-radio>
              <el-radio v-model="qc_radio" @change="selectThisParams" label="PH">PH</el-radio>
               <el-radio v-model="qc_radio" @change="selectThisParams" label="TDS">TDS</el-radio>
                <el-radio v-model="qc_radio" @change="selectThisParams" label="DO">DO</el-radio> -->
            </div>
          </div>
          <div class="chart-main">
            <div id="chart_qc"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let chart_flow = null;
let chart_press = null;
let chart_qc = null;

export default {
  name: 'factoryMonitor',
  props: ['factoryId','factoryName'],
  components: {},
  data() {
    return {
      qc_radio: 'PH', // 水质默认选着浊度
      monitorMsg: {
        inW: '1000',
        outW: '920',
        outQList: [
          {
            mpNm: '供水点1',
            val: '0.54'
          },
          {
            mpNm: '供水点2',
            val: '0.51'
          }
        ],
        inQList: [
          {
            mpNm: '取水点1',
            val: '0.51'
          },
          {
            mpNm: '取水点2',
            val: '0.49'
          }
        ],
        pList: [
          {
            mpNm: '压力点1',
            val: '0.34'
          },
          {
            mpNm: '压力点2',
            val: '0.30'
          }
        ],
        qc:[]
      }, // 监测信息的数据

      // 东部净水厂
      qc_east:[
      {
          mpNm: 'PH',
          val: '8.3'  
        },
         {
          mpNm: '导电率(ppm)',
          val: '892'  
        },
         {
          mpNm: '溶解氧(mg/L)',
          val: '5.4'  
        }
      ],
      // 小洪沟净水厂
      qc_hongGou:[
        {
          mpNm: 'PH',
          val: '8.3'  
        },
         {
          mpNm: '导电率(ppm)',
          val: '892'  
        },
         {
          mpNm: '溶解氧(mg/L)',
          val: '5.4'  
        },
         {
          mpNm: '余氯(mg/L)',
          val: '0.52'  
        }
      ],
      // 其他水厂
      qc_other:[
        {
          mpNm: 'PH',
          val: '8.3'  
        },
         {
          mpNm: '导电率(ppm)',
          val: '892'  
        },
         {
          mpNm: '溶解氧(mg/L)',
          val: '5.4'  
        },
         {
          mpNm: '余氯(mg/L)',
          val: '0.52'  
        },
         {
          mpNm: '浊度(°)',
          val: '2'  
        }
      ],
      sdate_qc: '',
      edate_qc: '',
      sdate_flow: '',
      edate_flow: '',
      sdate_press: '',
      edate_press: '',
      init_fetch: true, //初始执行一次 水压和水质的接口
      press_id: '', //水压的ID
      qc_id: '', //水质的ID,
      pressDevs: [] //水压的 设备列表
    };
  },
  methods: {
    getWaterworksInfo_() {},
    // 流量
    getQDataList_() {},
    // 压力
    getPressureList_(ids) {},
    // 水质
    getWqList_(keyWord, id) {},
    // 自适应屏幕
    resize() {
      chart_flow.resize();
      chart_press.resize();
      chart_qc.resize();
    },
    // 搜水流
    search_flow() {
      this.getQDataList_();
    },
    // 搜水压
    search_press() {
      let id = this.press_id;
      this.getPressureList_(id);
    },
    // 搜水质
    search_qc() {
      let str = this.qc_radio;
      let id = this.qc_id;
      this.getWqList_(str, id);
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
  mounted() {
    chart_flow = this.$echarts.init(document.getElementById('chart_flow'));
    chart_press = this.$echarts.init(document.getElementById('chart_press'));
    chart_qc = this.$echarts.init(document.getElementById('chart_qc'));
    this.getQDataList_();

    // 绘制图表 水流
     chart_flow.setOption({
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
              name: '(m³/s)'
            },
            color: '#2d9fff',
            series: [
              {
                name: '水流',
                type: 'line',
                barWidth: '10%',
                data: [
                [ new Date().getTime()-18000000 ,0.52 ],[ new Date().getTime()-15000000 ,0.54 ],[ new Date().getTime()-12000000 ,0.55 ],
                [ new Date().getTime()-9000000 ,0.55 ],[ new Date().getTime()-6000000 ,0.51 ],[ new Date().getTime()-3000000 ,0.50 ]
                ],
                smooth: true
              }
            ]
          });
      // 水压
    chart_press.setOption({
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
              name: '(MPa)'
            },
            color: '#2d9fff',
            series: [
              {
                name: '水压',
                type: 'line',
                barWidth: '10%',
                data: [
                 [ new Date().getTime()-20000 ,0.32 ],[ new Date().getTime()-19000 ,0.32 ],[ new Date().getTime()-18000 ,0.33 ],
                [ new Date().getTime()-17000 ,0.31 ],[ new Date().getTime()-16000 ,0.34 ],[ new Date().getTime()-15000 ,0.32 ]
                ],
                smooth: true
              }
            ]
          });
    
    
    
    
    
   
   // 水质
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
  },
  created() {
    this.getWaterworksInfo_();
    let time = new Date();
    let currentDate = time.toLocaleDateString();
    this.sdate_qc = this.sdate_flow = this.sdate_press = currentDate.replace(
      /\//g,
      '-'
    );
    this.edate_qc = this.edate_flow = this.edate_press = currentDate.replace(
      /\//g,
      '-'
    );
    let name = this.factoryName;

    switch(name){

      case '东部净水厂':
          this.monitorMsg.qc = this.qc_east;
        break;
      case '小洪沟净水厂':
         this.monitorMsg.qc = this.qc_hongGou;
        break;
      default:
        this.monitorMsg.qc = this.qc_other;

    }

  }
};
</script>

<style lang="scss" scoped>
#factoryMonitor {
  width: 100%;
  height: 100%;
  table {
    border-top: 1px solid #e9e9e9;
  }
  .wrap-crarts {
    width: 100%;
    height: calc(100% - 141px);
    .chart-item {
      width: 100%;
      .top-head {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span {
          margin-right: 10px;
        }
      }
      .chart-content {
        width: 100%;
        .chart-head {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .chart-main {
          width: 100%;
          height: 200px;
          & > div {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .top-table {
    .table-two {
      width: 100%;
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      table.innerTable {
        width: 45%;
      }
    }
  }
}
</style>
