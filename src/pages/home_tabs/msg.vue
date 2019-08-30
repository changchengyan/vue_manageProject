<template>
  <div id="msg">
      <template v-if="tabIndex==0">
        <dse-table-list :totalNum="totalPages" :currentPage="currentPage" @goto_page="goto_flow">
          <thead>
          <tr>
            <th><span>监测点</span></th>
            <th><span>所属区域&nbsp;</span></th>
            <th><span>检测值&nbsp;</span><span>(m)</span></th>
            <th><span>正常值</span><span>(m)</span></th>
            <th><span>时间</span></th>
          </tr>
          </thead>
          <tbody>
          <template v-if="levList&&levList.length>0">
            <tr v-for="(val,index) in levList" :key="index">
              <td :title="val.name" @click="whereAmI(val)" :class="{alert:val.status}"><span>{{val.name}}</span></td>
              <td><span :title="val.area">{{val.area}}</span></td>
              <td><span>{{val.value}}</span></td>
              <td><span>{{val.normalVal}}</span></td>
              <td :title="val.time"><span>{{val.time}}</span></td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td class="normal-show" colspan="5"><span>没有查找到你需要的数据哦~~</span></td>
            </tr>
          </template>

          </tbody>
        </dse-table-list>
      </template>
      <template v-if="tabIndex==1">
        <dse-table-list :totalNum="totalPages" :currentPage="currentPage" @goto_page="goto_press">
          <thead>
          <tr>
            <th><span>监测点</span></th>
            <th><span>所属区域</span></th>
            <th><span>监测值&nbsp;</span> <span>(m³/s)</span></th>
            <th><span>正常值&nbsp;</span><span>(m³/s)</span></th>
            <th><span>时间</span></th>
          </tr>
          </thead>
          <tbody>
          <template v-if="flowList&&flowList.length>0">
            <tr v-for="(val,index) in flowList" :key="index">
              <td :title="val.name"  @click="whereAmI(val)"><span :class="{alert:val.status==false}" >{{val.name}}</span></td>
              <td :title="val.area"><span>{{val.area}}</span></td>
              <td><span>{{val.value}}</span></td>
              <td ><span>{{val.normalVal}}</span></td>
              <td :title="val.time"><span>{{val.time}}</span></td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td class="normal-show" colspan="5"><span>没有查找到你需要的数据哦~~</span></td>
            </tr>
          </template>
          </tbody>
        </dse-table-list>
      </template>
      <template v-if="tabIndex==2">
        <dse-table-list :totalNum="totalPages" :currentPage="currentPage" @goto_page="goto_waterQC">
          <thead>
          <tr>
            <th><span>监测点</span></th>
            <th><span>所属区域</span></th>
            <th><span>监测值</span><span>mg/L</span> </th>
            <th><span>正常值</span><span>mg/L</span> </th>
            <th><span>时间</span></th>
          </tr>
          </thead>
          <tbody>
          <template v-if="waterQCList&&waterQCList.length>0">
            <tr v-for="(val,index) in waterQCList" :key="index">
              <td class="name1" :title="val.name" @click="whereAmI(val)">
                {{val.name}}
              </td>
              <td :title="val.area">
                <span>{{val.area}}</span>
              </td>
              <td>
                <span>{{val.value}}</span>
              </td>
              <td>{{val.normalVal}}</td>
              <td>
                <span>{{val.time}}</span>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td class="normal-show" colspan="5"><span>没有查找到你需要的数据哦~~</span></td>
            </tr>
          </template>
          </tbody>
        </dse-table-list>
      </template>
    <template v-if="tabIndex==3">
      <dse-table-list :totalNum="totalPages" :currentPage="currentPage" @goto_page="goto_video">
        <thead>
        <tr>
          <th><span>监测点</span></th>
          <th><span>所属区域</span></th>
          <th><span>监测值</span><span>MPa</span> </th>
          <th><span>正常值</span><span>MPa</span> </th>
          <th><span>时间</span></th>
        </tr>
        </thead>
        <tbody>

        <template v-if="pressList&&pressList.length>0">
          <tr v-for="(val,index) in pressList" :key="index">
            <td class="name1" :title="val.name" @click="whereAmI(val)">
              <span :class="{alert:val.status==false}">{{val.name}}</span>
            </td>
            <td :title="val.area">
              <span>{{val.area}}</span>
            </td>
            <td>
              <span>{{val.value}}</span>
            </td>
            <td>
              <span> {{val.normalVal}}</span>
            </td>
            <td :title="val.time">
              <span>{{val.time}}</span>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td class="normal-show" colspan="3"><span>没有查找到你需要的数据哦~~</span></td>
          </tr>
        </template>
        </tbody>
      </dse-table-list>
    </template>
     <template v-if="tabIndex==4">
      <dse-table-list :totalNum="totalPages" :currentPage="currentPage" @goto_page="goto_video">
        <thead>
        <tr>
          <th><span>监测点</span></th>
          <th><span>所属区域</span></th>
          <th><span>监测值</span> </th>
          <th><span>正常值</span></th>
          <th><span>时间</span></th>
        </tr>
        </thead>
        <tbody>

        <template v-if="waterQCList&&waterQCList.length>0">
          <template v-for="(val,index) in waterQCList">
            <tr  :key="index">
              <td class="name1" :title="val.name" :rowspan="val.paramsItem.length"  @click="whereAmI(val)">
                <span :class="{alert:val.status==false}">{{val.name}}</span>
              </td>
              <td :title="val.area" :rowspan="val.paramsItem.length">
                <span>{{val.area}}</span>
              </td>
              <td>
                <span :class="{alert:index==0}">{{val.paramsItem[0].value}}</span>
              </td>
              <td>
                <span> {{val.paramsItem[0].normalVal}}</span>
              </td>
              <td :title="val.time" :rowspan="val.paramsItem.length">
                <span>{{val.time}}</span>
              </td>
            </tr>
            <template v-for="(item,i) in val.paramsItem" >
               <tr v-if="i!=0" :key="i">
                <td class="no-border">
                <span class="not-point">{{item.value}}</span>
               </td>
              <td>
                <span class="not-point"> {{item.normalVal}}</span>
              </td>
              </tr>
            </template>
          </template>
        </template>
        <template v-else>
          <tr>
            <td class="normal-show" colspan="3"><span>没有查找到你需要的数据哦~~</span></td>
          </tr>
        </template>
        </tbody>
      </dse-table-list>
    </template>
      <template v-if="tabIndex==5">
        <dse-table-list :totalNum="totalPages" :currentPage="currentPage" @goto_page="goto_video">
          <thead>
          <tr>
            <th><span>监测点名称</span></th>
            <th><span>所属区域</span></th>
            <th><span>状态</span></th>
          </tr>
          </thead>
          <tbody>

          <template v-if="videoList&&videoList.length>0">
            <tr v-for="(val,index) in videoList" :key="index">
              <td :title="val.name" @click="whereAmI(val)"><span >{{val.name}}</span></td>
              <td><span>{{val.area}}</span></td>
              <td><span :class="{alert:val.status==false}">{{val.status |formate_vadioStatus}}</span></td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td class="normal-show" colspan="3"><span>没有查找到你需要的数据哦~~</span></td>
            </tr>
          </template>
          </tbody>
        </dse-table-list>
      </template>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import DseTableList from '../../common/components/dseTableList';

  export default {
    name: 'msg',
    components: {
      DseTableList
    },
    data() {
      return {
        contentList:[], //待选的主内容区
        tabList: null,
        tabIndex: 0, //默认的激活页签
        totalPages: 1,
        currentPage: 1,
        searchDevName: '', // 模糊搜索要查询的监测设备列表
        flowList: [
          {
            layerID:'liuliang',
            eleId:'SL000',
            name:'丁塘加压泵站出水管网流量监测点',
            area:'西部片区',
            value:5,
            normalVal:'2~4',
            time:'2019-8-5 9:32',
            status:false
          },
          {
            layerID:'liuliang',
            eleId:'SL001',
            name:'小洪沟水源泵站出水总管流量监测点',
            area:'西部片区',
            value:1.16,
            normalVal:'≤1',
            time:'2019-8-5 9:32',
            status:true
          },
          {
            layerID:'liuliang',
            eleId:'SL002',
            name:'河东加压泵站出水总管流量监测点',
            area:'东部片区',
            value:0.32,
            normalVal:'≤0.5',
            time:'2019-8-5 9:32',
            status:true
          },
          {
            layerID:'liuliang', // 丁塘加压泵站出水管网
            eleId:'SL003',
            name:'河西二级加压泵站出水总管流量监测点#',
            area:'西部片区',
            value:0.41,
            normalVal:'≤0.5',
            time:'2019-8-5 9:32',
            status:true
          }
        ], //压力的 列表
        pressList: [{
            layerID:'yali',
            eleId:'YL000',
            name: '丁塘加压泵站出水压力监测点',
            area: '西部片区',
            value: 0.8,
            normalVal: '0.2-0.4',
            time: '2019-8-5 9:32',
            status:false
          },
          {
            layerID:'yali',
            eleId:'YL001',
            name:'小洪沟水源泵站出水总管压力监测点',
            area:'西部片区',
            value:1.2,
            normalVal:'0.2-1',
            time:'2019-8-5 9:32',
            status:true
          },
          {
            layerID:'yali',
            eleId:'YL002',
            name:'河东加压泵站出水总管压力监测点',
            area:'东部片区',
            value:0.8,
            normalVal:'0.2-1.0',
            time:'2019-8-5 9:32',
            status:true
          },
          {
            layerID:'yali',
            eleId:'YL003',
            name: '河西二级加压泵站出水总管压力监测点',
            area: '西部片区',
            value: 0.5,
            normalVal: '0.2-1.0',
            time: '2019-8-5 9:32',
            status:true
          }

        ], //水质的列表
        waterQCList: [
          {
            layerID:'shuizhi',
            eleId:'SZ002',
            name:'东部净水厂水质监测点',
            area:'同心东部分公司',
            time:'2019-8-5 9:32',
            status:true,
            paramsItem:[
              {
                  value:'PH:10',
                 normalVal:'6.5~9.5'
              },
               {
                  value:'导电率:800',
                  normalVal:'≤1000ppm'
              },
               {
                  value: '溶解氧:7',
                  normalVal: '>5mg/L'
              }
            ]
          },
           {
            layerID:'shuizhi',
            eleId:'SZ001',
            name:'窑山扩建水厂水质监测点',
            area:'同心中部分公司',
            time:'2019-8-5 9:32',
            status:true,
            paramsItem:[
              {
                  value:'PH:8',
                 normalVal:'6.5~9.5'
              },
               {
                  value:'导电率:700',
                  normalVal:'≤1000ppm'
              },
               {
                  value: '溶解氧:7',
                  normalVal: '>5mg/L'
              },
               {
                  value: '余氯:0.4',
                  normalVal: '≤0.7mg/L'
              },
               {
                  value: '浊度:2',
                  normalVal: '≤3mg/L'
              }
            ]
          },
           {
            layerID:'shuizhi',
            eleId:'SZ003',
            name:'麻疙瘩、合合山净水厂水质监测点',
            area:'同心中部分公司',
            time:'2019-8-5 9:32',
            status:true,
            paramsItem:[
              {
                  value:'PH:8.5',
                 normalVal:'6.5~9.5'
              },
               {
                  value:'导电率:600',
                  normalVal:'≤1000ppm'
              },
               {
                  value: '溶解氧:6',
                  normalVal: '>5mg/L'
              },
               {
                  value: '余氯:0.5',
                  normalVal: '≤0.7mg/L'
              },
               {
                  value: '浊度:1',
                  normalVal: '≤3mg/L'
              }
            ]
          },
           {
            layerID:'shuizhi',
            eleId:'SZ005',
            name:'马家洼子净水厂水质监测点',
            area:'同心中部分公司',
            time:'2019-8-5 9:32',
            status:true,
            paramsItem:[
              {
                  value:'PH:9',
                 normalVal:'6.5~9.5'
              },
               {
                  value:'导电率:780',
                  normalVal:'≤1000ppm'
              },
               {
                  value: '溶解氧:9',
                  normalVal: '>5mg/L'
              },
               {
                  value: '余氯:0.45',
                  normalVal: '≤0.7mg/L'
              },
               {
                  value: '浊度:2.5',
                  normalVal: '≤3mg/L'
              }
            ]
          },
           {
            layerID:'shuizhi',
            eleId:'SZ004',
            name:'王团净水厂水质监测点',
            area:'同心中部分公司',
            time:'2019-8-5 9:32',
            status:true,
            paramsItem:[
              {
                  value:'PH:7.5',
                 normalVal:'6.5~9.5'
              },
               {
                  value:'导电率:850',
                  normalVal:'≤1000ppm'
              },
               {
                  value: '溶解氧:7.6',
                  normalVal: '>5mg/L'
              },
               {
                  value: '余氯:0.3',
                  normalVal: '≤0.7mg/L'
              },
               {
                  value: '浊度:1.3',
                  normalVal: '≤3mg/L'
              }
            ]
          },
           {
            layerID:'shuizhi',
            eleId:'SZ006',
            name:'小洪沟水厂水质监测点',
            area:'同心西部分公司',
            time:'2019-8-5 9:32',
            status:true,
            paramsItem:[
              {
                  value:'PH:9.5',
                 normalVal:'6.5~9.5'
              },
               {
                  value:'导电率:950',
                  normalVal:'≤1000ppm'
              },
               {
                  value: '溶解氧:8.5',
                  normalVal: '>5mg/L'
              },
               {
                  value: '余氯:0.38',
                  normalVal: '≤0.7mg/L'
              }
            ]
          }
        ],
        //视频的列表
        videoList: [{
          layerID:'shipin',
          eleId:'SP000',
          name: '西部净水厂视频监测点',
          area: '中部片区',
          status:false
        },
          {
            layerID:'shipin',
            eleId:'SP001',
            name:'小洪沟水库视频监测点',
            area:'东部片区',
            status:true
          },
          {
            layerID:'shipin',
            eleId:'SP002',
            name:'东部净水厂视频监测点',
            area:'东部片区',
            status:true
          },
          {
            layerID:'shipin',  //西部净水厂视频监测点
            eleId:'SP003',
            name: '窑山扩建水厂视频监测点',
            area: '中部片区',
            status:true
          },

        ], // 水位的列表
        levList:[
          {
            layerID:'shuiwei',
            eleId:'SW001',
            name:'旱天岭1#高位水池',
            area:'中部片区',
            value:3,
            normalVal:'0.2-2.6',
            time:'2019-8-5 9:32',
            status:true
          },
          {
            layerID:'shuiwei',
            eleId:'SW002',
            name:'旱天岭2#高位水池',
            area:'中部片区',
            value:2.7,
            normalVal:'0.2-2.6',
            time:'2019-8-5 9:32',
            status:true
          },
          {
            layerID:'shuiwei',
            eleId:'SW003',
            name:'窑山1#高位水池',
            area:'中部片区',
            value:1.1,
            normalVal:'0.2-2.6',
            time:'2019-8-5 9:32',
            status:true
          }
        ], //水位列表
      };
    },
    computed: {
      ...mapGetters({
        'get_sunTab_msg': 'get_sunTab_msg'
      })
    },
    methods: {
      fromFather(component,list,flag) {
        this.contentList = list;
        let temp_item = component;
        if(!temp_item){
          temp_item = list[0];
        }
        temp_item = temp_item.template;
        if(!flag){
          temp_item =list[list.length-1].template;
        }
        temp_item = temp_item.replace(/<div class="tabItem"><span>/,'');
        temp_item=temp_item.replace(/<\/span><\/div>/,'');
        temp_item = temp_item.trim();


        switch (temp_item) {
          case '水位':
            this.tabIndex = 0;
            this.getLevList_(1);
            this.searchDevName = '';
            break;
          case '流量':
            this.tabIndex = 1;
            this.getQDataList_(1);
            this.searchDevName = '';
            break;
          case '压力':
            this.tabIndex = 3;
            this.searchDevName = '';
            this.getPressureList_(1);
            break;
          case '水质':
            this.tabIndex = 4;
            this.searchDevName = '';
            this.getWqList_(1);
            break;
          case '视频':
            this.tabIndex = 5;
            this.searchDevName = '';
            this.getVideoList_(1);
            break;
        }
      },
      // 获取流量的 列表
      getQDataList_(pageNum) {

      },
      goto_flow(num){
        this.getQDataList_( parseInt(num));
      },
      // 获取 水质的 列表
      getWqList_(pageNum) {

      },
      goto_waterQC(num){
        this.getWqList_(parseInt(num));
      },
      //获取  水压的  列表
      getPressureList_(pageNum) {

      },
      goto_press(num){
        this.getPressureList_(parseInt(num));
      },
      // 获取 视频的  列表
      getVideoList_(pageNum) {

      },
      // 水位
      getLevList_(pageNum){

      },
      goto_video(num){
        this.getVideoList_(parseInt(num));
      },
      //搜索 特定设备列表
      searchMonitorDevs() {
        let tab_index = this.tabIndex;
        switch (tab_index) {
          case 0:
            this.getLevList_(1);
            break;
          case 1:
            this.getQDataList_(1);
            break;
          case 2:
            this.getWqList_(1);
            break;
          case 3:
            this.getPressureList_(1);
            break;
          case 4:
            this.getVideoList_(1);
            break;

        }

      },
      // gis上查找 该要素
      whereAmI(val){
        this.$emit('IamHere',val);
      },
    },
    filters:{
      formate_vadioStatus(val){

        let temp_val = val;
        switch (val) {
          case true:
            temp_val='在线';
            break;
          case false:
            temp_val='离线';
            break;
        }
        return temp_val;
      }
    },
    created() {
      let that = this;
      this.tabList = {list: that.get_sunTab_msg, leftIds: []};
    }
  };
</script>

<style scoped lang="scss">
  #msg {
    width: 100%;
    height: 100%;

    .row-search {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      line-height: 30px;
      padding-bottom:  10px ;

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


    }

    #table {
      height: 100%;

    }

    table{
      tbody{
        tr{
          td:first-child{
            &.no-border{
              border-left: none;
            }
            span{
              text-decoration: underline;
              color: blue;
              cursor: pointer;
              &.alert{
                color: red;
              }
              &.not-point{
                color: #333;
                cursor: initial;
                text-decoration: initial;
              }
            }
          }
          span.alert{
            color: red;
          }
          td:last-child{
            line-height: 25px;
          }
        }
      }
    }


.name1{
    color: blue;
    cursor: pointer;
}
.name1:hover{
  color: red;
  text-decoration: underline;
}

.span1{
  border-top: 1px solid #e9e9e9;
}
  }
</style>
