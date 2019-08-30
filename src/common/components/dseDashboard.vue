<template>
  <div class="globalDashboard" :style="{width:width_}">
    <template v-if="togglePannelFlag">
      <div class="desc">
        <div class="row"><span class="green">{{tempData.peopleCount}}万</span><span>受益人口</span></div>
        <div class="row"><span class="green">{{tempData.ownArea}}</span><span>覆盖范围</span></div>
      </div>
      <div class="card-panel">
        <div class="row">
          <div class="card-item">
            <div class="col">
              <div class="tip">昨日取水量(万m³)</div>
              <div class="value green ">{{tempData.lastDayOut}}</div>
            </div>
            <div class="col">
              <div ref="ChartLiquidFill1" class="one1 pie"></div>
            </div>
          </div>
          <div class="card-item">
            <div class="col">
              <div class="tip">本年取水量(万m³)</div>
              <div class="value yellow ">{{tempData.currentDayOut}}</div>
            </div>
            <div class="col">
              <div ref="ChartLiquidFill2" class="one2 pie"></div>
            </div>
          </div>
          <div class="card-item">
            <div class="col">
              <div class="tip">本月已收水费(元)</div>
              <div class="value green ">{{tempData.monthConst}}</div>
            </div>
            <div class="col">
              <div ref="ChartLiquidFill6" class="one1 pie"></div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="card-item">
            <div class="col">
              <div class="tip">昨日供水量(万m³)</div>
              <div class="value green">{{tempData.lastDayIn}}</div>
            </div>
            <div class="col">
              <div ref="ChartLiquidFill3" class="one1 pie"></div>
            </div>
          </div>
          <div class="card-item">
            <div class="col">
              <div class="tip">本年供水量(万m³)</div>
              <div class="value yellow">{{tempData.currentDayIn}}</div>
            </div>
            <div class="col">
              <div ref="ChartLiquidFill4" class="one2 pie"></div>
            </div>
          </div>
          <div class="card-item">
            <div class="col">
              <div class="tip">本年已收水费(元)</div>
              <div class="value green ">{{tempData.yearCost}}</div>
            </div>
            <div class="col ">
              <div ref="ChartLiquidFill5" class="one2  green pie"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-count">
        <div class="col">
          <div class="item blue">
            <div><span>{{tempData.resrvoirCount}}</span></div>
            <div><span>水库</span></div>
          </div>
          <div class="item green_">
            <div><span>{{tempData.pumpCount}}</span></div>
            <div><span>泵站</span></div>
          </div>
          <div class="item green">
            <div> <span>{{tempData.factoryCount}}</span></div>
            <div> <span>水厂</span></div>
          </div>
        </div>
        <div class="col">
          <div class="item green">
            <div> <span>{{tempData.userDevCount}}</span></div>
            <div> <span>联户表井</span></div>
          </div>
          <div class="item blue">
            <div> <span>{{tempData.poolCount}}</span></div>
            <div> <span>蓄水池</span></div>
          </div>
        </div>
      </div>
      <div class="chart-wrap">
        <div class="tip-head">
          四率一览
        </div>
        <div class="chart-cycles">
          <div class="pipe-item" >
            <div class="pie" ref="pie1" ></div>
            <div class="tips"><span>供水保障率</span></div>
          </div>
          <div class="pipe-item" >
            <div class="pie" ref="pie2" ></div>
            <div class="tips"><span>水质达标率</span></div>
          </div>
          <div class="pipe-item" >
            <div class="pie" ref="pie3" ></div>
            <div class="tips"><span>自来水普及率</span></div>
          </div>
          <div class="pipe-item" >
            <div class="pie" ref="pie4" ></div>
            <div class="tips"><span>集中供水率</span></div>
          </div>
        </div>
      </div>
      <img src="../../assets/images/home/toggleShowPanel.png" alt="" @click="changeToggle">
    </template>
    <template v-else>
      <div class="panel-btn" @click="changeToggle">农饮指标</div>
    </template>
  </div>
</template>

<script>
  import 'echarts-liquidfill';

  let ChartPie1;
  let ChartPie2;
  let ChartPie3;
  let ChartPie4;


  let ChartLiquidFill1;
  let ChartLiquidFill2;
  let ChartLiquidFill3;
  let ChartLiquidFill4;
  let ChartLiquidFill5;
  let ChartLiquidFill6;

  export default {
    name: 'dse-dashbord',
    // props: ['defaultpanelWidth'],
    props:{
      defaultpanelWidth:{
        type:String,
        default:'200px'
      }
    },
    data() {
      return {
        width_: '',
        initWidth:'', //响应式的 盘宽
        togglePannelFlag:true,
        pannelData:{
          peopleCount:39.8,
          ownArea:'全县',
          lastDayOut:2,
          lastOutRate:1.2,
          lastDayIn:1.8,
          lastInRate:1.2,
          currentDayOut:4.6,
          currentOutRate:-1.2,
          currentDayIn:4.14,
          currentInRate:-1.2,
          resrvoirCount:2,
          pumpCount:17,
          userDevCount:8270,
          factoryCount:5,
          poolCount:17,
          yearCost:1789723.95,
          yearRate:1.5,
          monthConst:174958.45,
          month:2.5
        },
        tempData:{
          peopleCount:39.8,
          ownArea:'全县',
          lastDayOut:2,
          lastOutRate:1.2,
          lastDayIn:1.8,
          lastInRate:1.2,
          currentDayOut:4.6,
          currentOutRate:-1.2,
          currentDayIn:4.14,
          currentInRate:-1.2,
          resrvoirCount:2,
          pumpCount:5,
          userDevCount:5,
          factoryCount:6,
          poolCount:6,
          yearCost:1789723.95,
          yearRate:1.5,
          monthConst:174958.45,
          monthRate:2.5
        },
        pannelData_east:{
          peopleCount:12.85,
          ownArea:'东部片区',
          lastDayOut:0.67,
          lastOutRate:2,
          lastDayIn:0.65,
          lastInRate:1.5,
          currentDayOut:1.8,
          currentOutRate:-2,
          currentDayIn:1.4,
          currentInRate:-1.1,
          resrvoirCount:1,
          pumpCount:1,
          userDevCount:0,
          factoryCount:1,
          poolCount:1,
          yearCost:873215.3,
          yearRate:2,
          monthConst:58432.89,
          monthRate:3
        },
        pannelData_west:{
          peopleCount:14.56,
          ownArea:'西部片区',
          lastDayOut:0.85,
          lastOutRate:3,
          lastDayIn:0.83,
          lastInRate:1.3,
          currentDayOut:1.6,
          currentOutRate:-0.85,
          currentDayIn:1.3,
          currentInRate:-0.64,
          resrvoirCount:1,
          pumpCount:2,
          userDevCount:0,
          factoryCount:1,
          poolCount:1,
          yearCost:597823.35,
          yearRate:1,
          monthConst:73589.34,
          monthRate:1.5
        },
        pannelData_middle:{
          peopleCount:12.39,
          ownArea:'中部片区',
          lastDayOut:0.48,
          lastOutRate:1.6,
          lastDayIn:0.32,
          lastInRate:0.8,
          currentDayOut:1.2,
          currentOutRate:-1.3,
          currentDayIn:1.44,
          currentInRate:-1.1,
          resrvoirCount:0,
          pumpCount:2,
          userDevCount:5,
          factoryCount:4,
          poolCount:4,
          yearCost:318685.3,
          yearRate:1.3,
          monthConst:42936.22,
          monthRate:2
        }
      };
    },
    watch: {
      defaultpanelWidth: {
        handler(newValue, oldValue) {
          this.width_ = newValue;
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      resize(){
        ChartPie1.resize();
        ChartPie2.resize();
        ChartPie3.resize();
        ChartPie4.resize();
        ChartLiquidFill1.resize();
        ChartLiquidFill2.resize();
        ChartLiquidFill3.resize();
        ChartLiquidFill4.resize();
        ChartLiquidFill5.resize();
        ChartLiquidFill6.resize();
      },
      initPie(obj){
        let label_fontSize=null;
        let fontSize =null;
        if(this.initWidth>1600){
          fontSize = 14;
          label_fontSize = 16;
        }else{
          fontSize = 12;
          label_fontSize = 12;
        }
        return  {
          title: {
            text: obj.value+'%',
            top: '20px',
            left: 'center',
            textStyle: {
              color: '#5bd3ca',
              fontSize: label_fontSize
            }
          },
          backgroundColor: '#fff',
          'color': ['#5bd3ca', '#5bd3ca', '#29b99c'],
          series: [{
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['80%', '90%'],
            hoverAnimation: false,
            data: [{
              name: '',
              value: obj.value,
              label: {
                show: true,
                color: '#575E5D',
                fontSize: fontSize,
                position:'center',
                fontWeight: 'bold'
              }
            },
              { //画中间的图标
                name: '',
                value: 0,
                label: {
                  position: 'inside',
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  padding: 30
                }
              }, { //画剩余的刻度圆环
                name: '',
                value: (100-obj.value),
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            ]
          }]
        };
      },
      initLiquit(obj){
        return {
          series: [{
            type: 'liquidFill',
            radius: '90%',
            data: [{
              value: Math.abs(obj.value/10) ,
              direction: 'left',
              itemStyle: {
                normal: {
                  color: obj.color
                }
              },
              label:{
                formatter:function (o) {
                  if(obj.value>0){
                    return  '↑'+Math.abs(obj.value)+'%';
                  }else{
                   return  '↓'+Math.abs(obj.value)+'%';
                  }
                }
              }
            }],
            label: {
              normal: {
                color: obj.color,
                insideColor: 'transparent',
                textStyle: {
                  fontSize: 12,
                  fontWeight: 'bold',
                  fontFamily: 'Microsoft YaHei'
                }
              }
            },
            itemStyle: {
              normal: {
                shadowBlur: 0
              }
            },
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 1,
                borderColor: obj.color,
                shadowBlur: 20
              }
            },
            backgroundStyle: {
              color: '#fff'
            }
          }]
        };
      },
      changArea(index){
        let that = this;
        switch (index) {
          case '1':
           this.tempData = this.pannelData;
            break;
          case '2':
            this.tempData = this.pannelData_middle;

            break;
          case '3':
            this.tempData = this.pannelData_west;
            break;
          case '4':
            this.tempData = this.pannelData_east;
            break;
        }
        ChartLiquidFill1.setOption(
                that.initLiquit({value:that.tempData.lastOutRate,color:'#5BC3DA'})
        );
        ChartLiquidFill2.setOption(
                that.initLiquit({value:that.tempData.currentOutRate,color:'#FB8C15'})
        );
        ChartLiquidFill3.setOption(
                that.initLiquit({value:that.tempData.lastInRate,color:'#5BC3DA'})
        );
        ChartLiquidFill4.setOption(
                that.initLiquit({value:that.tempData.currentInRate,color:'#FB8C15'})
        );
        ChartLiquidFill5 =that.$echarts.init(that.$refs.ChartLiquidFill5);
        ChartLiquidFill5.setOption(
                that.initLiquit({value:that.tempData.yearRate,color:'#5BC3DA'})
        );
        ChartLiquidFill6 =that.$echarts.init(that.$refs.ChartLiquidFill6);
        ChartLiquidFill6.setOption(
                that.initLiquit({value:that.tempData.monthRate,color:'#5BC3DA'})
        );
      },
      changeToggle(){
        let that = this;
        this.togglePannelFlag = !this.togglePannelFlag;
        if(this.togglePannelFlag){
          this.$nextTick(()=>{

            setTimeout(()=>{
              ChartPie1 =that.$echarts.init(that.$refs.pie1);
              ChartPie1.setOption(
                      that.initPie({name:'供水保障率',value:98})
              );
              ChartPie2 =that.$echarts.init(that.$refs.pie2);
              ChartPie2.setOption(
                      that.initPie({name:'水质达标率',value:100})
              );
              ChartPie3 =that.$echarts.init(that.$refs.pie3);
              ChartPie3.setOption(
                      that.initPie({name:'自来水普及率',value:95})
              );
              ChartPie4 =that.$echarts.init(that.$refs.pie4);
              ChartPie4.setOption(
                      that.initPie({name:'集中供水率',value:98})
              );

              ChartLiquidFill1 =that.$echarts.init(that.$refs.ChartLiquidFill1);
              ChartLiquidFill1.setOption(
                      that.initLiquit({value:that.tempData.lastOutRate,color:'#5BC3DA'})
              );
              ChartLiquidFill2 =that.$echarts.init(that.$refs.ChartLiquidFill2);
              ChartLiquidFill2.setOption(
                      that.initLiquit({value:that.tempData.currentOutRate,color:'#FB8C15'})
              );
              ChartLiquidFill3 =that.$echarts.init(that.$refs.ChartLiquidFill3);
              ChartLiquidFill3.setOption(
                      that.initLiquit({value:that.tempData.lastInRate,color:'#5BC3DA'})
              );
              ChartLiquidFill4 =that.$echarts.init(that.$refs.ChartLiquidFill4);
              ChartLiquidFill4.setOption(
                      that.initLiquit({value:that.tempData.currentInRate,color:'#FB8C15'})
              );

              console.log(ChartLiquidFill6);
              console.log(ChartLiquidFill5);
              ChartLiquidFill5 =that.$echarts.init(that.$refs.ChartLiquidFill5);
              ChartLiquidFill5.setOption(
                      that.initLiquit({value:that.tempData.yearRate,color:'#5BC3DA'})
              );
              ChartLiquidFill6 =that.$echarts.init(that.$refs.ChartLiquidFill6);
              ChartLiquidFill6.setOption(
                      that.initLiquit({value:that.tempData.monthRate,color:'#5BC3DA'})
              );
            },1000);


          });
        }
      }
    },
    mounted() {
      const that = this;
      this.initWidth = document.body.clientWidth || document.documentElement.clientWidth;
      this.$nextTick(()=>{
        ChartPie1 =that.$echarts.init(that.$refs.pie1);
        ChartPie1.setOption(
          that.initPie({name:'供水保障率',value:99})
        );
        ChartPie2 =that.$echarts.init(that.$refs.pie2);
        ChartPie2.setOption(
          that.initPie({name:'水质达标率',value:90})
        );
        ChartPie3 =that.$echarts.init(that.$refs.pie3);
        ChartPie3.setOption(
          that.initPie({name:'自来水普及率',value:99})
        );
        ChartPie4 =that.$echarts.init(that.$refs.pie4);
        ChartPie4.setOption(
          that.initPie({name:'集中供水率',value:99})
        );

        ChartLiquidFill1 =that.$echarts.init(that.$refs.ChartLiquidFill1);
        ChartLiquidFill1.setOption(
          that.initLiquit({value:that.tempData.lastOutRate,color:'#5BC3DA'})
        );
        ChartLiquidFill2 =that.$echarts.init(that.$refs.ChartLiquidFill2);
        ChartLiquidFill2.setOption(
          that.initLiquit({value:that.tempData.currentOutRate,color:'#FB8C15'})
        );
        ChartLiquidFill3 =that.$echarts.init(that.$refs.ChartLiquidFill3);
        ChartLiquidFill3.setOption(
          that.initLiquit({value:that.tempData.lastInRate,color:'#5BC3DA'})
        );
        ChartLiquidFill4 =that.$echarts.init(that.$refs.ChartLiquidFill4);
        ChartLiquidFill4.setOption(
         that.initLiquit({value:that.tempData.currentInRate,color:'#FB8C15'})
        );
        ChartLiquidFill5 =that.$echarts.init(that.$refs.ChartLiquidFill5);
        ChartLiquidFill5.setOption(
                that.initLiquit({value:that.tempData.yearRate,color:'#5BC3DA'})
        );
        ChartLiquidFill6 =that.$echarts.init(that.$refs.ChartLiquidFill6);
        ChartLiquidFill6.setOption(
                that.initLiquit({value:that.tempData.monthRate,color:'#5BC3DA'})
        );

      });
    },
    created() {
      this.width_ = this.defaultpanelWidth;
    }
  };
</script>

<style scoped="scoped" lang="scss">

  .globalDashboard {
    position: absolute;
    bottom: 10px;
    display: flex;
    height: 120px;
    padding: 5px;
    left: 20px;
    justify-content: space-around;
    align-items: center;
    font-size: 12px;
    transition: all 0.5s linear;
    &>img{
      display: inline-block;
      position: absolute;
      top: 30px;
      right: -12px;
      width: 20px;
      /*height: 100%;*/
      z-index: 200;
      background: url("../../assets/images/home/toggleShowPanel.png") no-repeat;
      cursor: pointer;
    }

    .panel-btn{
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border-radius: 50%;
      cursor: pointer;
      background: #0b83fe;
      color: #fff;
      opacity: 0.5;
      position: absolute;
      left: 10px;
      &:hover{
        opacity: 1;
      }
    }
    .desc{
      width: 100px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      padding: 5px;
      .row{
        width: 100%;
        height: calc(50% - 5px);
        background: #f1f9fb;
        border: 1px solid #29b99c;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span.green{
          color: #5BC3DA;
        }
        span:nth-child(1){
            font-size: 16px;
        }
        span:nth-child(2){
            font-size: 12px;
        }
      }
    }
    .card-panel{
      width: calc(52% - 120px);
      height: 100%;
      /*display: flex;*/
      /*justify-content: space-around;*/
      padding: 10px 10px 0;
      background: #fff;
      .row{
        width: 100%;
        height: calc(50% - 5px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .card-item{
          width:33.33%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          .col{
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            position: relative;
            &:nth-child(1){
              width: 120px;
            }
            &:nth-child(2){
              width: calc(100% - 120px);
              justify-content: flex-start;
            }

            &>div.pie{
              width: 90%;
              height: 90%;
            }
            &>div.value.green{
              color: #5BC3DA;
              text-align: left;
              width: 100%;
              font-weight: 600;
              font-size: 14px;
            }
            &>div.tip{
              font-size: 12px;
              line-height: 20px;
            }
            &>div.value.yellow{
              color: #FB8C15;
              text-align: left;
              width: 100%;
              font-weight: 600;
              font-size: 14px;
            }

          }
          &:nth-child(1){
            .col{
              div.one1::after{
                content: '环比';
                position: absolute;
                top: 15px;
                left: -8px;
                color: #a7a7a7;
              }
            }
          }
          &:nth-child(2){
            .col{
                div.one2::after{
                  content: '同比';
                  position: absolute;
                  top: 15px;
                  left: -8px;
                  color: #a7a7a7;
                }
              div.one2.green::after{
                color: #29b99c;
              }

            }
          }
          &:nth-child(3){
            .col{
              div.one1::after{
                content: '环比';
                position: absolute;
                top: 15px;
                left: -8px;
                color: #a7a7a7;
              }
              div.one2::after{
                content: '同比';
                position: absolute;
                top: 15px;
                left: -8px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
      >.col{
        width: 33%;
        height: 100%;
        .item{

        }
      }
    }
    .card-count{
      width: calc(20%);
      height: 100%;
      background: #fff;
      padding: 10px;
      .col{
        width: 100%;
        height: calc(50% - 5px);
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        &:last-child{
          margin-bottom: 0;
        }
        .item{
          height: 100% ;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          &.blue{
            background: #1a88db;
          }
          &.green{
            background: #29b99c;
          }
          &.green_{
            background: #5bc4da;
          }
          &>div{
              &:nth-child(1){
                font-size: 14px;
                line-height: 16px;
              }
              &:nth-child(2){
                line-height: 16px;
                font-size: 12px;
              }
          }
        }
        &:nth-child(1){
          .item{
            width: calc(33.33% - 5px);
          }
        }
        &:nth-child(2){
          .item{
            width: calc(50% - 5px);
          }
        }
      }
    }
    .chart-wrap{
      width: 28%;
      height: 100%;
      background: #fff;
      .tip-head{
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #ccc;
        text-align: center;
        font-size: 16px;
        @media screen and(min-width: 1601px){
          font-size: 16px;
        }
        @media screen and(max-width: 1600px){
          font-size: 14px;
        }
      }
      .chart-cycles{
        width: 100%;
        height: calc(100% - 30px);
        display: flex;
        justify-content: space-around;
        align-items: center;
        .pipe-item{
          width: 25%;
          height: 100%;
          .pie{
            width: 100%;
            height: calc(100% - 20px);
          }
          .tips{
            width: 100%;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            text-align: center;
            color:#575E5D ;
          }

        }
      }
    }
  }

</style>
