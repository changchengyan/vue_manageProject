<template>
  <div id="monitorMsg">
    <template v-if="tabIndex==0">
      <div class="row live-msg">
        <el-input v-model="live_person" placeholder="请输入巡检人员名字"></el-input>
        <el-button  type="primary" class="defaultShow" @click="search_live">搜索</el-button>
      </div>
      <div class="sub-table live-msg">
        <dse-table-list :totalNum="totalNum" :currentPage="currentPage" @goto_page="goto_page">
          <thead>
          <tr>
            <th><span>巡检人员</span></th>
            <th><span>状态</span></th>
            <th><span>上下线时间</span></th>
            <th><span>今日巡检里程</span></th>
          </tr>
          </thead>
          <tbody>
          <template v-if="liveList&&liveList.length>0">
            <tr v-for="(val,index) in liveList" :key="index">
              <td :title="val.userName"  @click="whereAmI(val)"><span>{{val.userName}}</span></td>
              <td><span>{{val.onLine|onliveFlagFormate}}</span></td>
              <td><span :title="val.startTime">{{val.startTime}}</span> <span
                :title="val.endTime">{{val.endTime}}</span></td>
              <td><span>{{val.inspectLength?val.inspectLength:0}}m</span></td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td  class="normal-show" colspan="4"><span>没有你所查找的数据哦~~!</span></td>
            </tr>
          </template>
          </tbody>
        </dse-table-list>
      </div>
    </template>
    <template v-if="tabIndex==1">
      <div class="row repair">
        <span>时间:</span>
        <input type="text" ref="sdate_repair" id="sdate_repair" name="sdate_repair" class="Wdate"  placeholder="请选择开始时间"
               onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',startDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'edate_repair\')||\'%y-%M-%d\'}'
                ,onpicked:function(){
                  if($dp.$('edate_repair').value !== ''){
                    let edate = $dp.$D('edate_repair');
                    let date = $dp.$D('sdate_repair',{M:+1});
                    if(edate.y < date.y){return;}
                    else if(edate.y == date.y && edate.M < date.M){ return;}
                    else if(edate.M == date.M && edate.d < date.d){ return; }
                    $dp.$('edate_repair').value = date.y + '-' + (date.M<10?'0'+date.M:date.M) + '-' + (date.d<10?'0'+date.d:date.d);
                  }
                }
                })">
        <span>至</span>
        <input type="text" ref="edate_repair" id="edate_repair" name="edate_repair" class="Wdate" placeholder="请选择结束时间"
               onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'sdate_repair\')}',maxDate:'%y-%M-%d',startDate:'%y-%M-%d'
                ,onpicked:function(){
                  if($dp.$('sdate_repair').value !== ''){
                    let sdate = $dp.$D('sdate_repair');
                    let date = $dp.$D('edate_repair',{M:-1});
                    if(sdate.y > date.y){return;}
                    else if(sdate.y == date.y && sdate.M > date.M){ return;}
                    else if(sdate.M == date.M && sdate.d > date.d){ return; }
                    $dp.$('sdate_repair').value = date.y + '-' + (date.M<10?'0'+date.M:date.M) + '-' + (date.d<10?'0'+date.d:date.d);
                  }
                }
                })">
      </div>
      <div class="row repair-select">
        <span>状态:</span>
        <el-select v-model="repair_statusItem" placeholder="placeholder">
          <el-option
            v-for="item in repair_statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button  type="primary"  class="defaultShow" @click="order_search">搜索</el-button>
      </div>
      <div class="sub-table repair-msg">
        <dse-table-list :totalNum="totalNum" :currentPage="currentPage" @goto_page="goto_page">
          <thead>
          <tr>
            <th><span>检修单号</span></th>
            <th><span>上报时间</span></th>
            <th><span>检修状态</span></th>
            <th><span>详情</span></th>
          </tr>
          </thead>
          <tbody>
          <template v-if="repairList&&repairList.length>0">
            <tr v-for="(val,index) in repairList" :key="index">
              <td :title="val.orderCode"  @click="whereAmI(val)"><span>{{val.orderCode}}</span></td>
              <td :title="val.reportTimeStr"><span>{{val.reportTimeStr}}</span></td>
              <td><span>{{val.orderStatus}}</span></td>
              <td><span class="hollowOut-border">详情</span></td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td class="normal-show" colspan="4"><span>没有你所查找的数据哦~~!</span></td>
            </tr>
          </template>

          </tbody>
        </dse-table-list>
      </div>
    </template>
    <template v-if="tabIndex==2">
      <div class="row repair">
        <span>时间:</span>
        <input type="text" ref="sdate_danger" id="sdate_danger" name="sdate_danger" class="Wdate"  placeholder="请选择开始时间"
               onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',startDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'edate_danger\')||\'%y-%M-%d\'}'
              ,onpicked:function(){
                  if($dp.$('edate_danger').value !== ''){
                    let edate = $dp.$D('edate_danger');
                    let date = $dp.$D('sdate_danger',{M:+1});
                    if(edate.y < date.y){return;}
                    else if(edate.y == date.y && edate.M < date.M){ return;}
                    else if(edate.M == date.M && edate.d < date.d){ return; }
                    $dp.$('edate_danger').value = date.y + '-' + (date.M<10?'0'+date.M:date.M) + '-' + (date.d<10?'0'+date.d:date.d);
                  }
                }
              })">
        <span>至</span>
        <input type="text" ref="edate_danger" id="edate_danger" name="edate_danger" class="Wdate" placeholder="请选择结束时间"
               onfocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'sdate_danger\')}',maxDate:'%y-%M-%d',startDate:'%y-%M-%d'
              ,onpicked:function(){
                  if($dp.$('sdate_danger').value !== ''){
                    let sdate = $dp.$D('sdate_danger');
                    let date = $dp.$D('edate_danger',{M:-1});
                    if(sdate.y > date.y){return;}
                    else if(sdate.y == date.y && sdate.M > date.M){ return;}
                    else if(sdate.M == date.M && sdate.d > date.d){ return; }
                    $dp.$('sdate_danger').value = date.y + '-' + (date.M<10?'0'+date.M:date.M) + '-' + (date.d<10?'0'+date.d:date.d);
                  }
                }
              })">
      </div>
      <div class="row repair-select">
        <span>状态:</span>
        <el-select v-model="danger_statusItem" placeholder="请选择紧急状态">
          <el-option
            v-for="item in repair_statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary"  class="defaultShow" @click="order_search">搜索</el-button>
      </div>
      <div class="sub-table repair-msg">
        <dse-table-list :totalNum="totalNum" :currentPage="currentPage" @goto_page="goto_page">
          <thead>
          <tr>
            <th><span>隐患编号</span></th>
            <th><span>上报时间</span></th>
            <th><span>隐患状态</span></th>
            <th><span >详情</span></th>
          </tr>
          </thead>
          <tbody>
          <template v-if="dangerList&&dangerList.length>0">
            <tr v-for="(val,index) in dangerList" :key="index">
              <td :title="val.probCode"  @click="whereAmI(val)"><span>{{val.probCode}}</span></td>
              <td :title="val.reportTimeSt"><span>{{val.reportTimeStr}}</span></td>
              <td><span>{{val.probStatus |formate_repairStatus}}</span></td>
              <td><span class="hollowOut-border">详情</span></td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td class="normal-show" colspan="4"><span>没有你所查找的数据哦~~!</span></td>
            </tr>
          </template>
          </tbody>
        </dse-table-list>
      </div>
    </template>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import DseTableList from '../../common/components/DseTableList';

  export default {
    name: 'monitorMsg',
    components: {DseTableList},
    data() {
      return {
        contentList:[], // 待选的主内容区
        tabList: null,
        tabIndex: 0, //默认的激活页签
        totalNum: 1,
        currentPage: 1,
        live_person: '', //搜索名字
        repair_startTime: '',
        repair_endTime: '',
        repair_statusList: [
          {
            label: '全部',
            value: ''
          },
          {
            label: '派单',
            value: '0'
          },
          {
            label: '受理',
            value: '1'
          },
          {
            label: '处理中',
            value: '2'
          },
          {
            label: '拒绝处理',
            value: '3'
          },
          {
            label: '处理完成',
            value: '4'
          },
          {
            label: '审核通过',
            value: '5'
          },
          {
            label: '审核拒绝',
            value: '6'
          }
        ],
        repair_statusItem: '',
        repair_name: '',
        repairList: [
          {
            layerID:'jianxiu',
            eleId:'JX001',
            orderCode:'GTX0012',
            reportTimeStr:'2019-8-5 8:32',
            orderStatus:'处理中'
          },
          {
            layerID:'jianxiu',
            eleId:'JX002',
            orderCode:'GTX0013',
            reportTimeStr:'2019-8-5 8:32',
            orderStatus:'拒绝处理'
          },
          {
            layerID:'jianxiu',
            eleId:'JX003',
            orderCode:'GTX0014',
            reportTimeStr:'2019-8-5 8:32',
            orderStatus:'处理完成'
          }
        ], //检修信息的列表
        historyTime: '',
        history_name: '',
        liveList: [
          {
            layerID:'shishi',
            eleId:'SS001',
            userName:'王建国',
            onLine:'0',
            startTime:'2019-8-5 8:21',
            endTime:'2019-8-5 17:31',
            inspectLength:9200
          },
          {
            layerID:'shishi',
            eleId:'SS002',
            userName:'李富贵',
            onLine:'0',
            startTime:'2019-8-5 8:21',
            endTime:'2019-8-5 17:31',
            inspectLength:13210
          },
          {
            layerID:'shishi',
            eleId:'SS003',
            userName:'刘国庆',
            onLine:'0',
            startTime:'2019-8-5 8:21',
            endTime:'2019-8-5 17:31',
            inspectLength:15329
          }
        ], //实时信息列表
        danger_startTime: '',
        danger_endTime: '',
        danger_statusList: [],
        danger_statusItem: '',
        danger_name: '',
        dangerList: [
          {
            layerID:'yinhuan',
            eleId:'YH001',
            probCode:'GTX0001',
            reportTimeStr:'2019-8-5 17:31',
            probStatus:'2'
          },
          {
            layerID:'yinhuan',
            eleId:'YH002',
            probCode:'GTX0002',
            reportTimeStr:'2019-8-5 17:31',
            probStatus:'4'
          },
          {
            layerID:'yinhuan',
            eleId:'YH003',
            probCode:'GTX0003',
            reportTimeStr:'2019-8-5 17:31',
            probStatus:'2'
          }
        ], //隐患的 列表
      };
    },
    computed: {
      ...mapGetters({
        'get_sunTab_monitor': 'get_sunTab_monitor'
      })
    },
    methods: {
      fromFather(component,list) {
        let that = this;
        this.contentList = list;
        this.currentPage = 1;
        this.totalNum = 1;

        let temp_item = component;
        if(!temp_item){
          temp_item = list[0];
        }
        temp_item = temp_item.template;

        temp_item = temp_item.replace(/<div class="tabItem"><span>/,'');
        temp_item=temp_item.replace(/<\/span><\/div>/,'');
        temp_item = temp_item.trim();
        switch (temp_item) {
          case '实时信息':
            this.tabIndex = 0;
            that.queryOnlinePerson_('1');
            break;
          case '检修信息':
            this.tabIndex = 1;
            that.getInsOrderById_('1');
            break;
          case '隐患信息':
            this.tabIndex = 2;
            that.getInsProblemById_('1');
            break;
        }
      },
      goto_page(num) {

        let currentIndex = this.tabIndex;
        if (currentIndex === 0) {
          this.queryOnlinePerson_(num);
        } else if (currentIndex === 1) {
          this.getInsOrderById_(num);
        } else {
          this.getInsProblemById_(num);
        }
      },
      // 实时查询
      search_live() {
        this.queryOnlinePerson_('1');
      },
      // 实时信息查询
      queryOnlinePerson_(pageNum) {

      },
      //  隐患信息 查询
      getInsProblemById_(page) {

      },
      //  检修信息  查询
      getInsOrderById_(page) {

      },
      // gis上查找 该要素
      whereAmI(val){
        this.$emit('IamHere',val);
      },
      // 工单 搜索
      order_search() {



      }
    },
    filters: {
      onliveFlagFormate(val) {

        let temp = '在线';
        if (val === '0') {
          temp = '离线';
        }
        return temp;
      },
      formate_repairStatus(val) {
        let temp_val = val;

        switch (temp_val) {
          case '0':
            temp_val = '派单';
            break;
          case '1':
            temp_val = '受理';
            break;
          case '2':
            temp_val = '处理中';
            break;
          case '3':
            temp_val = '拒绝处理';
            break;
          case '4':
            temp_val = '处理完成';
            break;
          case '5':
            temp_val = '审核通过';
            break;
          default:
            temp_val = '审核拒绝';
        }


        return temp_val;
      },
      formate_problemLev(val) {
        let temp_val = val;
        switch (temp_val) {
          case '0':
            temp_val = '紧急';
            break;
          case '1':
            temp_val = '严重';
            break;
          case '2':
            temp_val = '一般';
            break;
        }

        return temp_val;
      }
    },
    created() {
      this.tabList = {list: this.get_sunTab_monitor, leftIds: []};
      this.danger_statusList = window.DSE.dangerlist;
    }
  };
</script>

<style scoped lang="scss">
  #monitorMsg {
    width: 100%;
    height: 100%;

    tbody td:first-child span {
      cursor: pointer;
      text-decoration: underline;
      color: #0b83fe;
    }

    .row {
      width: 100%;
      margin-bottom: 5px;
      height: 30px;
      display: flex;
      justify-content: flex-start;
      .el-input{
        width: calc(100% - 60px);
        /deep/ .el-input__inner{
          border-top-left-radius:0;
          border-bottom-left-radius:0;
        }
      }
      /deep/ .el-button{
        width:60px ;
        padding: 0;
        color: #fff;
        border-top-left-radius:0;
        border-bottom-left-radius:0;
      }

      &.live-msg {

      }

      &.repair {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .el-date-editor.el-input {
          width: calc(50% - 40px);
          margin-right: 0px;
        }

        & > span {
          display: inline-block;
          width: 35px;
          text-align: center;
        }
      }

      &.repair-select {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        span {
          display: inline-block;
          width: 35px;
          margin-right: 3px;
          text-align: center;
        }

        .el-select {
          width: calc(100% - 88px);
          margin-right: 10px;
        }
      }

      &.history {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .el-date-editor.el-input {
          width: 150px;
          margin-right: 0px;
        }

        & > span {
          display: inline-block;
          width: 35px;
          text-align: center;
          margin-right: 10px;
        }
      }
    }

    .sub-table.live-msg {
      width: 100%;
      height: calc(100% - 35px);
    }

    .sub-table.repair-msg {
      width: 100%;
      height: calc(100% - 70px);
    }

    .sub-table.history {
      width: 100%;
      height: calc(100% - 70px);
    }
    table{
      td:last-child{
        line-height: 25px;
      }
    }

  }
</style>
