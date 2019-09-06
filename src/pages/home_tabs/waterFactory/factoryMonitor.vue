<template>
  <div id="factoryMonitor">
    <div class="top-table">
      <table class="innerTable first-no-line">
        <tbody>
          <tr>
            <td>
              <span>今日取水量（m³）</span>
            </td>
            <td>
              <span>{{monitorMsg.inW}}</span>
            </td>
            <td>
              <span>今日供水(m³)</span>
            </td>
            <td>
              <span>{{monitorMsg.outW}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>取水流量（m³/h）</span>
            </td>
            <td>
              <span>{{monitorMsg.inFlow}}</span>
            </td>
            <td>
              <span>供水流量（m³/h）</span>
            </td>
            <td>
              <span>{{monitorMsg.outFlow}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>供水压力（MPa）</span>
            </td>
            <td>
              <span>{{monitorMsg.inW}}</span>
            </td>
            <td>
              <span>PH</span>
            </td>
            <td>
              <span>{{monitorMsg.ph}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>余氯（mg/L）</span>
            </td>
            <td>
              <span>{{monitorMsg.cl}}</span>
            </td>
            <td>
              <span>浊度(mg/L)</span>
            </td>
            <td>
              <span>{{monitorMsg.muddy}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="select-monitors">
        <div class="col">
          <span>起始时间:</span>
          <input
                  class="Wdate"
                  ref="sdate"
                  v-model="sdate"
                  id="sdate"
                  name="sdate_flow"
                  onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',startDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'edate\')||\'%y-%M-%d\'}'})"
                  placeholder="请选择开始时间"
                  type="text"
          />
          <span>至</span>
          <input
                  class="Wdate"
                  ref="edate"
                  v-model="edate"
                  id="edate"
                  name="edate_flow"
                  onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'sdate\')}',maxDate:'%y-%M-%d',startDate:'%y-%M-%d'})"
                  placeholder="请选择结束时间"
                  type="text"
          />
          <el-button type="primary" @click="search">搜索</el-button>
        </div>
        <div class="col"></div>
    </div>
    <div class="wrap-charts">
      <div class="chart-item">
        <div class="top-head">
          <span class="rect"></span>
          <span>流量</span>
        </div>
        <div class="chart-content">
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
          <div class="change-item">
            <el-radio v-model="qc_radio" @change="selectThisItem" label="muddy">浊度</el-radio>
            <el-radio v-model="qc_radio" @change="selectThisItem" label="PH">PH</el-radio>
            <el-radio v-model="qc_radio" @change="selectThisItem" label="CL">余氯</el-radio>
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
import {waterFactory_getScjcList} from '../../../api/interfaces/oneMap_api';

import {charts} from '../../../mixins/chart_mixins';

let chart_flow = null;
let chart_press = null;
let chart_qc = null;

export default {
  name: 'factoryMonitor',
  props: ['factoryId','factoryName'],
  mixins:[charts],
  data() {
    return {
      sdate:'', // 开始时间
      edate:'', //结束时间
      qc_radio: 'muddy', // 水质默认选着浊度
      monitorMsg: {
        inW: '',
        outW: '',
        inFlow:'',
        outFlow:'',
        press:'',
        ph:'',
        cl:'',
        muddy:''
      }, // 监测信息的数据
      init_fetch: true, //初始执行一次 水压和水质的接口
      // PH
      ph:[],
      //浊度
      muddy:[],
      // 余氯
      cl:[]
    };
  },
  methods: {
    // 自适应屏幕
    resize() {
      chart_flow.resize();
      chart_press.resize();
      chart_qc.resize();
    },
    // 一次性搜索 所有图表
    search() {
      this.waterFactory_getScjcList_();
    },

    // 一次选取时间 查询相关图表的  数据
    waterFactory_getScjcList_(npm=1){
      let that = this;
      this.sdate = this.$refs.sdate.value;
      this.edate = this.$refs.edate.value;

      // 选择的时间跨度不能大于 7天
      if (new Date( that.edate).getTime() - new Date(that.sdate).getTime() > 7 * 24 * 60 * 60 * 1000) {
        this.$message.error('开始时间和结束时间不能大于7天');
        return;
      }


      let temp_startDate = this.sdate;
      let temp_endDate = this.edate;
      waterFactory_getScjcList({
        wfctCd:that.factoryId,
        stm:''+temp_startDate,
        etm:''+temp_endDate
      },that).then(res=>{

        let {data} = res;
        let {scjcRealVo} = data;

        if(that.init_fetch){
          /**
           *
           * @params  今日取水量、今日供水量、取水流量、供水流量、压力、水质（余氯、PH、浊度）
           */
          let {jrqsl=null,jrgsl=null,qsslList=[],gsslList=[],ylList=[],szList=[]} = scjcRealVo;
          that.monitorMsg={
            inW: jrqsl?jrqsl:'/',
            outW: jrgsl?jrgsl:'/',
            inFlow:qsslList&&qsslList.length>0?qsslList[0].q:'/',
            outFlow:gsslList&&gsslList.length>0?gsslList[0].q:'/',
            press:ylList&&ylList.length>0?ylList[0].wgage:'/',
            ph:szList&&szList.length>0?szList[0].ph:'/',
            cl:szList&&szList.length>0?szList[0].chl:'/',
            muddy:szList&&szList.length>0?szList[0].turb:'/'
          }
        }

        if(res.status==1){
          that.init_fetch = false;
        }

        let {slList} = data;
        // 水流
        let flow = slList&&slList.length>0?slList:[];
        let temp_flow_data = [];
        flow.map(val=>{
          temp_flow_data.push(
                  [
                          new Date(val.tm),val.q?parseFloat(val.q):null
                  ]
          )
        });

        let flow_obj = this.drawLine({name:'流量',unit:'m³/h',data:[...temp_flow_data]});
        chart_flow.setOption(flow_obj);



        // 压力
        let press =  data.ylList&&data.ylList.length>0?data.ylList:[];
        let temp_press_data = [];
        press.map(val=>{
          temp_press_data.push(
                  [
                    new Date(val.tm),val.wgage?parseFloat(val.wgage):null
                  ]
          )
        });
        let press_obj = this.drawLine({name:'压力',unit:'MPa',data:[...temp_press_data]});
        chart_press.setOption(press_obj);

        //水质
        let qc = data.szList&&data.szList.length>0?data.szList:[];
        let temp_qc_muddy_data = [];
        let temp_qc_ph_data = [];
        let temp_qc_cl_data = [];
        qc.map(val=>{
          temp_qc_muddy_data.push(
                  [
                    new Date(val.tm),val.wgage?parseFloat(val.turb):null
                  ]
          );
          if(val.chl){
            temp_qc_cl_data.push(
                    [
                      new Date(val.tm),val.wgage?parseFloat(val.chl):null
                    ]
            );
          }
          if(val.ph){
            temp_qc_ph_data.push(
                    [
                      new Date(val.tm),val.wgage?parseFloat(val.ph):null
                    ]
            );
          }
        });

        let qc_obj = this.drawLine({name:'浊度',unit:'(NTU)',data:[...temp_qc_muddy_data]});
        chart_qc.setOption(qc_obj);

        that.ph = [...temp_qc_ph_data];
        that.muddy = [...temp_qc_muddy_data];
        that.cl = [...temp_qc_cl_data];

      });
    },
    // 切换 水质的 监测点
    selectThisItem(val){
      let that  = this;
      let qc_obj = null;
      switch (val) {
        case 'PH':
          qc_obj = this.drawLine({name:'PH',unit:'(PH)',data:[ ...that.ph ]});
          chart_qc.setOption(qc_obj);
          break;
        case 'muddy':
           qc_obj = this.drawLine({name:'浊度',unit:'(NTU)',data:[...that.muddy]});
          chart_qc.setOption(qc_obj);
          break;
        case 'CL':
          qc_obj = this.drawLine({name:'余氯',unit:'(mg/L)',data:[...that.cl]});
          chart_qc.setOption(qc_obj);
          break;
      }
    }
  },
  mounted() {
    chart_flow = this.$echarts.init(document.getElementById('chart_flow'));
    chart_press = this.$echarts.init(document.getElementById('chart_press'));
    chart_qc = this.$echarts.init(document.getElementById('chart_qc'));
    // 绘制图表 水流
    let flow_obj = this.drawLine({name:'流量',unit:'m³/h',data:[]});
    chart_flow.setOption(flow_obj);
    // 绘制图表 水压
    let press_obj = this.drawLine({name:'压力',unit:'MPa',data:[]});
    chart_press.setOption(press_obj);
    // 绘制图表 水质
    let qc_obj = this.drawLine({name:'浊度',unit:'(NTU)',data:[]});
    chart_qc.setOption(qc_obj);

    this.waterFactory_getScjcList_();


  },
  created() {
    let date =  this.$days().format('YYYY-MM-DD');
    this.sdate = date;
    this.edate = date;

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
  .select-monitors{
    width: 100%;
    padding: 10px;
    .el-button{
      margin-left: 10px;
    }
  }
  .wrap-charts {
    width: 100%;
    height: calc(100% - 141px);
    .chart-item {
      width: 100%;
      .top-head{
        justify-content: flex-start;
        span{
          margin-right: 10px;
        }
      }
      .chart-content {
        width: 100%;
        .change-item{
          width: 100%;
          display: flex;
          justify-content: flex-end;
          padding: 10px;
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



}
</style>
