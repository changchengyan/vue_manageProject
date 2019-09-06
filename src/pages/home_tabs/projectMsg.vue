<template>
  <div id="projectMsg">

    <template v-if="tabIndex==0">
      <div class="table-card">
        <div class="card-wrap">
          <div class="card-item" v-for="(val,index) in reservoirList" :key="index">
            <div class="item-head">
              <div class="col"><img src="../../assets/images/common/legend/reservoir.png" alt="">
                <span class="title">{{val.name}}</span></div>
              <div class="col"><img src="../../assets/images/common/position.png" alt="" @click="whereAmI(val)"></div>
            </div>
            <div class="item-body">
              <div class="row"><span>水位:</span><span>{{val.lev}}m</span></div>
              <div class="row"><span>水位时间:</span><span>{{val.levTime}}</span></div>
<!--              <div class="row"><span>浊度:</span><span>{{val.ntu}}(NTU)</span></div>-->
<!--              <div class="row"><span>浊度时间:</span><span>{{val.ntuTime}}</span></div>-->
            </div>
          </div>
        </div>
        <div class="pagination">
          <dse-my-pagination :totalPage="totalPage" :currentPage="currentPage" @thisPage="thisPage"/>
        </div>
      </div>
    </template>
    <template v-if="tabIndex==1">
      <div class="table-card">
        <div class="card-wrap">
          <div class="card-item" v-for="(val,index) in waterfactoryList" :key="index">
            <div class="item-head">
              <div class="col"><img src="../../assets/images/common/legend/waterFactory.png" alt="">
                <span class="title">{{val.wfctnm}}</span></div>
              <div class="col"><img src="../../assets/images/common/position.png" alt="" @click="whereAmI(val)"></div>
            </div>
            <div class="item-body">
              <div class="row"><span>供水流量:</span><span>{{val.q}}m³/s</span></div>
              <div class="row"><span>时间:</span><span>{{val.tm}}</span></div>
              <div class="row"><span>今日供水量:</span><span>{{val.totalQ}}(m³)</span></div>
              <div class="row"><span>泵开关状态:</span><span class="status-cycle" :class="{alert:item=='0'}" v-for="(item,index) in val.pumpList" :key="index">{{index+1}}</span></div>
              <div class="row" :title="val.jcTypeNm"><span>预警状态:</span><span :class="{alert:val.jcTypeNm!=''}" >{{val.jcTypeNm}}</span></div>
            </div>
          </div>
        </div>
        <div class="pagination">
          <dse-my-pagination :totalPage="totalPage" :currentPage="currentPage" @thisPage="thisPage"/>
        </div>
      </div>
    </template>
    <template v-if="tabIndex==2">
      <div class="table-card">
        <div class="card-wrap">
          <div class="card-item" v-for="(val,index) in pumpSiteList" :key="index">
            <div class="item-head">
              <div class="col"><img src="../../assets/images/common/legend/pump.png" alt="">
                <span class="title" :title="val.pumpNm">{{val.pumpNm}}</span></div>
              <div class="col"><img src="../../assets/images/common/position.png" alt="" @click="whereAmI(val)"></div>
            </div>
            <div class="item-body">
              <div class="row"><span>供水瞬时流量:</span><span>{{val.q}}m³/s</span></div>
              <div class="row"><span>时间:</span><span>{{val.qtm}}</span></div>
              <div class="row"><span>出水压力:</span><span>{{val.wgage}}(MPa)</span></div>
              <div class="row"><span>时间:</span><span>{{val.wtm}}</span></div>
              <div class="row" :title="val.jcTypeNm"><span>状态:</span><span :class="{alert:val.jcTypeNm!=''}">{{val.jcTypeNm}}</span></div>
            </div>
          </div>
        </div>
        <div class="pagination">
          <dse-my-pagination :totalPage="totalPage" :currentPage="currentPage" @thisPage="thisPage"/>
        </div>
      </div>
    </template>
    <template v-if="tabIndex==3">
      <div class="table-card">
        <div class="card-wrap">
          <div class="card-item" v-for="(val,index) in poolList" :key="index">
            <div class="item-head">
              <div class="col"><img src="../../assets/images/common/legend/xsc.png" alt="">
                <span class="title" :title="val.name">{{val.name}}</span></div>
              <div class="col"><img src="../../assets/images/common/position.png" alt="" @click="whereAmI(val)"></div>
            </div>
            <div class="item-body">
              <div class="row"><span>实时水位:</span><span>{{val.lev}}m</span></div>
              <!-- <div class="row"><span>水表个数:</span><span>{{val.devCount}}</span></div> -->
              <div class="row"><span>所属区域:</span><span>{{val.ownArea}}</span></div>
              <div class="row"><span>状态:</span><span :class="{alert:val.status}">{{val.status?val.msg:'正常'}}</span></div>
            </div>
          </div>
        </div>
        <div class="pagination">
          <dse-my-pagination :totalPage="totalPage" :currentPage="currentPage" @thisPage="thisPage"/>
        </div>
      </div>
    </template>
    <template v-if="tabIndex==4">
      <div class="table-card">
       <dse-table-list :totalPage="totalPage" :currentPage="currentPage" @thisPage="thisPage">
         <thead>
         <tr>
           <th><span>名称</span></th>
           <th><span>所属区域</span></th>
           <th><span>水表个数</span></th>
           <th><span>状态</span></th>
         </tr>
         </thead>
         <tbody>
         <tr v-for="(val,index) in userDevList" :key="index">
           <td @click="whereAmI(val)" :title="val.name"><span>{{val.name}}</span></td>
           <td><span>{{val.ownArea}}</span></td>
           <td><span>{{val.count}}</span></td>
           <td><span :class="{alert:val.status}">{{val.status|formate_status}}</span></td>
         </tr>
         </tbody>
       </dse-table-list>
      </div>
    </template>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  import DseMyPagination from '../../common/components/DseMyPagination';
  import DseTableList from '../../common/components/DseTableList';
  import {getBzgcxx, getScgcxx} from "../../api/interfaces/oneMap_api";

  export default {
    name: 'projectMsg',
    components: {DseTableList, DseMyPagination},
    data() {
      return {
        contentList: [], //待选的主内容区
        tabList: null,
        tabIndex: 0, //默认的激活页签

        reservoirName: '', //水库名字
        reservoirList: [
          {
            layerID:'shuiku',
            eleId:'SK001',
            name: '小洪沟',
            lev: 1234.56,
            levTime: '2019-8-5 8:30',
            ntu: '2.56',
            ntuTime: '2019-8-5 8:30'
          },
          // {
          //   layerID:'shuiku',
          //   eleId:'SK002',
          //   name: '南坪水库',
          //   lev: 1234.56,
          //   levTime: '2019-6-20 8:30',
          //   ntu: '2.56',
          //   ntuTime: '2019-6-20 8:30'
          // },
          // {
          //   layerID:'shuiku',
          //   eleId:'SK003',
          //   name: '苋麻河水库',
          //   lev: 1234.56,
          //   levTime: '2019-6-20 8:30',
          //   ntu: '2.56',
          //   ntuTime: '2019-6-20 8:30'
          // },
          {
            layerID:'shuiku',
            eleId:'SK004',
            name: '小西沟水库',
            lev: 1234.56,
            levTime: '2019-8-5 8:30',
            ntu: '2.56',
            ntuTime: '2019-8-5 8:30'
          }
        ], //水库列表
        waterfactoryName: '', //水厂名字
        waterfactoryList: [], //水厂列表
        bgUserName: '', //
        poolList: [
          {
            layerID:'xushuichi',
            eleId:'XSC001',
            name: '旱天岭1#高位蓄水池',
            time: '2019-8-5 8:30',
            ownArea: '东部片区',
            lev:1326.67,
            devCount:6,
            status: true,
            msg:'水位低于下限,一般预警'
          },
          {
            layerID:'xushuichi',
            eleId:'XSC003',
            name: '西部净水厂清水池水',
            time: '2019-8-5 8:30',
            ownArea: '东部片区',
            lev:3,
            devCount:5,
            status: true,
            msg:'水位低于下限,一般预警'
          },
          {
            layerID:'xushuichi',
            eleId:'XSC002',
            name: '旱天岭2#高位蓄水池',
            time: '2019-8-5 8:30',
            ownArea: '东部片区',
            lev:1335.43,
            devCount:8,
            status: false
          },
          {
            layerID:'xushuichi',
            eleId:'XSC003',
            name: '河东加压泵站前池',  //西部净水厂清水池水
            time: '2019-8-5 8:30',
            ownArea: '东部片区',
            lev:1349.35,
            devCount:5,
            status: false
          },
          {
            layerID:'xushuichi',
            eleId:'XSC004',
            name: '窑山1#高位蓄水池',
            time: '2019-8-5 8:30',
            ownArea: '东部片区',
            lev:1325.55,
            devCount:5,
            status: false
          },
          {
            layerID:'xushuichi',
            eleId:'XSC005',
            name: '窑山2#高位蓄水池',
            time: '2019-8-5 8:30',
            ownArea: '东部片区',
            lev:1337.25,
            devCount:5,
            status: false
          },
          {
            layerID:'xushuichi',
            eleId:'XSC030',
            name: '净化水厂水池',
            time: '2019-8-5 8:30',
            ownArea: '东部片区',
            lev:1337.25,
            devCount:5,
            status: false
          },
          {
            layerID:'xushuichi',
            eleId:'XSC031',
            name: '人饮四泵站水池',
            time: '2019-8-5 8:30',
            ownArea: '东部片区',
            lev:1337.25,
            devCount:5,
            status: false
          },
          {
            layerID:'xushuichi',
            eleId:'XSC032',
            name: '韦州镇外来水源蓄水池',
            time: '2019-8-5 8:30',
            ownArea: '东部片区',
            lev:1337.25,
            devCount:5,
            status: false
          },
          {
            layerID:'xushuichi',
            eleId:'XSC033',
            name: '张家塬外来水源蓄水池',
            time: '2019-8-5 8:30',
            ownArea: '东部片区',
            lev:1337.25,
            devCount:5,
            status: false
          },
          {
            layerID:'xushuichi',
            eleId:'XSC034',
            name: '麻疙瘩、合合山饮水工程末端蓄水池',
            time: '2019-8-5 8:30',
            ownArea: '中部片区',
            lev:1337.25,
            devCount:5,
            status: false
          },
          {
            layerID:'xushuichi',
            eleId:'XSC035',
            name: '王团扩建末端蓄水池',
            time: '2019-8-5 8:30',
            ownArea: '中部片区',
            lev:1337.25,
            devCount:5,
            status: false
          },
          {
            layerID:'xushuichi',
            eleId:'XSC036',
            name: '小洪沟水厂蓄水池',
            time: '2019-8-5 8:30',
            ownArea: '西部片区',
            lev:1337.25,
            devCount:5,
            status: false
          }
        ], //蓄水池列表
        pumpSiteName: '', //泵站名字
        pumpSiteList: [], //泵站列表
        flowmetersName: '', //联户表井
        userDevList: [
          {
            layerID:'dayongshuihu',
            eleId:'LHBJ001',
            name: '韦州镇1#联户表井',
            ownArea: '东部区',
            count: 4,
            status: true
          },
          {
            layerID:'dayongshuihu',
            eleId:'LHBJ002',
            name: '庆华村1#联户表井',
            ownArea: '东部区',
            count: 4,
            status: false
          },
          {
            layerID:'dayongshuihu',
            eleId:'LHBJ003',
            name: '甘沟移民村1#联户表井',
            ownArea: '东部区',
            count: 4,
            status: false
          },
          {
            layerID:'dayongshuihu',
            eleId:'LHBJ004',
            name: '旧老庄村1#联户表井',
            ownArea: '东部区',
            count: 4,
            status: false
          },
          {
            layerID:'dayongshuihu',
            eleId:'LHBJ005',
            name: '徐家河湾1#联户表井',
            ownArea: '东部区',
            count: 4,
            status: false
          }
        ], //计量间列表
        totalPage: 1,
        currentPage: 1
      };
    },
    computed: {
      ...mapGetters({
        'get_sunTab_project': 'get_sunTab_project'
      })
    },
    methods: {

      thisPage(num){

        let that = this;

        let temp_tabIndex = this.tabIndex;
        switch (temp_tabIndex) {
          case 0:
            that.getRsvrWqInfo_(num);
            break;
          case 1:
            that.getWaterworksInfo_(num);
            break;
          case 2:
            that.getUserWList_(num);
            break;
          case 3:
            that.getPumpList_(num);
            break;
          case 4:
            that.getMeterHouseList_(num);
            break;
        }


      },
      fromFather(component, list, flag) {
        let that = this;
        this.contentList = list;
        let temp_item = component;
        if (!temp_item) {
          temp_item = list[0];
        }
        temp_item = temp_item.template;
        if (!flag) {
          temp_item = list[list.length - 1].template;
        }
        temp_item = temp_item.replace(/<div class="tabItem"><span>/, '');
        temp_item = temp_item.replace(/<\/span><\/div>/, '');
        temp_item = temp_item.trim();
        switch (temp_item) {
          case  '水库':
            this.tabIndex = 0;
            that.getRsvrWqInfo_(1);
            break;
          case  '水厂':
            this.tabIndex = 1;
            that.getWaterworksInfo_(1);
            break;
          case  '泵站':
            this.tabIndex = 2;
            that.getPumpList_(1);
            break;
          case  '蓄水池':
            this.tabIndex = 3;
            that.getUserWList_(1);
            break;
          case  '联户表井':
            this.tabIndex = 4;
            that.getMeterHouseList_(1);
            break;
        }
      },
      // 获取 水库列表
      getRsvrWqInfo_(num=1) {



        //let that = this;
        // that.totalPage = 1;
        // that.currentPage = num;
        // let list = [];

        // 列表 必须 包含 如下三个字段
        // list.map(val=>{
        //   val.name = val.n;
        //   val.eleId = val.code;
        //   val.layerID = 'shuiku'
        // });
        // that.reservoirList = [...list];


      },
      // 获取 水厂 列表
      getWaterworksInfo_(num=1) {

        let that = this;
        getScgcxx({
          'adcd': '',
          'keyname': '',
          'pageNum':''+num,
          'pageSize': '12'
        },that).then(res=>{
          let {data} = res;
          let {list=[],total=1} = data;
          list = list&&list.length>0?list:[];

          that.currentPage = num;
          that.totalPage = total?Math.ceil(parseInt(total)/12):1;

          // 列表 必须 包含 如下三个字段
          list.map(val=>{
            val.name = val.wfctnm;
            val.eleId = val.wfctCd;
            val.layerID = 'shuichang';
            val.pumpList = val.bzstate?val.bzstate.split(','):[];
          });
          that.waterfactoryList = [...list];
        });

      },
      // 获取 蓄水池列表
      getUserWList_(num=1) {

        // let that = this;
        // that.totalPage = 1;
        // that.currentPage = num;
        // let list = [];

        // 列表 必须 包含 如下三个字段
        // list.map(val=>{
        //   val.name = val.n;
        //   val.eleId = val.code;
        //   val.layerID = 'xushuichi'
        // });
        // that.poolList = [...list];


      },
      // 获取 泵站列表
      getPumpList_(num=1) {

        let that = this;
        getBzgcxx({
          adcd:'',
          keyname:'',
          pageNum:num,
          pageSize:'12'
        },that).then(res=>{
          let {data} = res;
          let {list=[],total=1} = data;
          that.totalPage = total?Math.ceil(total/12):1;
          that.currentPage = num;
          list =list&&list.length>0?list:[];
          // 列表 必须 包含 如下三个字段
          list.map(val=>{
            val.name = val.pumpNm;
            val.eleId = val.pumpCd;
            val.layerID = 'bengzhan'
          });
          that.pumpSiteList = [...list];
        })

      },
      // 获取 联户表井的 列表
      getMeterHouseList_(num=1) {

        //let that = this;
        // that.totalPage = 1;
        // that.currentPage = num;
        // let list = [];

        // 列表 必须 包含 如下三个字段
        // list.map(val=>{
        //   val.name = val.n;
        //   val.eleId = val.code;
        //   val.layerID = 'dayongshuihu'
        // });
        // that.userDevList = [...list];

      },
      // gis上查找 该要素
      whereAmI(val) {

        /**
         *
         *  参数中必须 构造 含有 这样
         *
         *  {
         *      name:'', //站点的 名字
         *      eleId:'', //当前的 站点的业务ID
         *      layerID:''， // 所属图层的 ID
         *  }
         *
         */


        this.$emit('IamHere', val);
      },

    },
    filters:{
      formate_status(val){

        let temp_val = val;
        switch (val) {
          case true:
            temp_val='预警';
            break;
          case false:
            temp_val='正常';
            break;
        }
        return temp_val;
      }
    },
    created() {
      this.tabList = {list: this.get_sunTab_project, leftIds: []};
    }
  };
</script>

<style scoped lang="scss">
  #projectMsg {
    width: 100%;
    height: 100%;

    table {
      thead {
        tr {
          th:first-child {
            border-bottom: 1px solid #ccc;
          }
        }
      }
    }

    .search-wrap {
      width: 100%;
      height: 40px;
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .el-input {
        width: calc(100% - 60px);

        /deep/ .el-input__inner {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }

      /deep/ .el-button {
        width: 60px;
        padding: 0;
        color: #fff;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }

    .table-card {
      width: 100%;
      height: 100%;

      .card-wrap {
        width: 100%;
        height: calc(100% - 30px);
        overflow-y: auto;
        .card-item {
          width: 100%;

          .item-head {
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .col {
              width: 100%;
              padding: 0 10px;
              height: 30px;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              .title{
                font-weight: 600;
              }

              img {
                width: 14px;
                height: 14px;
                margin-right: 1em;
              }

              &>span{
                display: inline-block;
                width: calc(100% - 20px);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              &:last-child {
                justify-content: flex-end;
                cursor: pointer;
              }
            }

            border-bottom: 1px solid #e9e9e9;
          }

          .item-body {
            width: 100%;

            .row {
              width: 100%;
              padding-left: 30px;
              height: 30px;
              line-height: 30px;
              color: #8B8B8B;
              display: flex;
              span {
                display: inline-block;
                letter-spacing: 2px;

                &.status-cycle{
                 background: green;
                  border-radius: 12px;
                  display: inline-block;
                  width: 20px;
                  height: 20px;
                  line-height: 20px;
                  text-align: center;
                  color: #fff;
                  margin-right: 10px;
                  &.alert{
                    background: red;
                    color: #fff;
                  }
                }
                &.alert{
                  color: red;
                  width: calc(100% - 119px);
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }
        }

        .pagination {
          width: 100%;
          height: 30px;
        }
      }
    }

    span.can-click {
      display: inline-block;
      text-decoration: underline;
      color: blue;
      cursor: pointer;
    }

  }
</style>
