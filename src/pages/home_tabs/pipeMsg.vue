<template>
    <div id="pipeMsg">
      <div class="featureToggle">
          <div class="tips">
              <i class="el-icon-view"></i>
              <span>查看方式</span>
          </div>
          <div class="select-tabs">
              <el-select v-model="areaItem"  placeholder="区域" @change="handleArea">
                  <el-option v-for="item in areaLists" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
              </el-select>
              <el-select v-model="productItem" placeholder="材质" @change="handleProduct">
                  <el-option v-for="item in productLists" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
              </el-select>
              <el-select v-model="caliberItem" placeholder="管径" @change="handleCaliber">
                  <el-option v-for="item in caliberLists" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
              </el-select>
          </div>
      </div>
      <div class="search-wrap">
          <el-input type="text" v-model="pipeName" clearable placeholder="请输入管道名称" />
          <el-button type="primary" class="defaultShow" @click="searchPipe('1')">搜索</el-button>
      </div>
      <div class="export">
          <el-checkbox v-model="oldChecked"  @change="toggleShowPipe">超期使用管道</el-checkbox>
          <div class="export-button" @click="exportPipeBaseInfo_"><span>导出</span></div>
      </div>
      <div class="main-table">
        <dse-table-list :totalNum="totalPages" :currentPage="currentPage" @goto_page="goto_page">
          <thead>
          <tr>
            <th><span>管道名称</span></th>
            <th><span>管道编号</span></th>
            <th><span>管径</span></th>
            <th><span>材质</span></th>
            <th><span>已用年限(使用寿命)</span></th>
          </tr>
          </thead>
          <tbody>

          <template v-if="pipeList&&pipeList.length>0">
            <tr v-for="(val,index) in pipeList" :key="index">
              <td :title="val.name" @click="whereAmI(val)"><span>{{val.name}}</span></td>
              <td><span>{{val.eleId}}</span></td>
              <td><span>{{val.PIPE_RADIUS}}</span></td>
              <td><span>{{val.PIPE_MATERIAL}}</span></td>
              <td><span :class="{error:val.alert}">{{val.USETIME}}({{val.USE_YEAR}})</span></td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td class="normal-show" colspan="5"><span>没有你所查找的数据哦~~!</span></td>
            </tr>
          </template>
          </tbody>
        </dse-table-list>
      </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import DseTableList from '../../common/components/DseTableList';

    export default {
        name: 'pipeMsg',
        components: {DseTableList},
        data(){
            return{
                contentList:[], //待选主内容区
                areaItem:'', //特定区域
                areaLists:[
                    {
                        label:'全县',
                        value:''
                    },
                    {
                        label:'东部片区',
                        value:'1'
                    },
                    {
                        label:'西部片区',
                        value:'2'
                    },
                    {
                        label:'中部片区',
                        value:'3'
                    }
                ],
                productItem:'', // 特定的材质
                productLists:[
                    {
                        label:'全部',
                        value:''
                    },
                    {
                        label:'PE',
                        value:'1'
                    },
                    {
                        label:'球墨铸铁管',
                        value:'2'
                    },
                    {
                        label:'UPVC',
                        value:'3'
                    }
                ],
                caliberItem:'',  // 特定的 管径
                caliberLists:[
                    {
                        label:'全部',
                        value:''
                    },
                    {
                        label:'DN100',
                        value:'1'
                    },
                    {
                        label:'DN150',
                        value:'2'
                    },
                    {
                        label:'DN200',
                        value:'3'
                    },
                    {
                        label:'DN250',
                        value:'4'
                    },
                    {
                        label:'DN300',
                        value:'5'
                    }
                ],
                selectTime:'', //时间段的字符串
                startYear:'',  //开始年份
                endYear:'', //结束年份
                selectFlag:false, //年代选取的布尔值
                totalPages:1,
                currentPage:1,
                topDis: 0, // 时间线向上滚动的距离
                activeFlag: null, // 时间轴的激活状态
                tabList:[],
                tabIndex:0, //默认的激活页签
                oldChecked:false, //超期服务 开关

                branchMainList:[
                  {
                    layerID:'pipeline2',
                    name:'012支干管',
                    eleId:'GD001',
                    PIPE_RADIUS:'DN200',
                    PIPE_MATERIAL:'UPVC',
                    USETIME:'17',
                    USE_YEAR:'30',
                    alert:false
                  },
                  {
                    layerID:'pipeline2',
                    name:'015支干管',
                    eleId:'GD002',
                    PIPE_RADIUS:'DN150',
                    PIPE_MATERIAL:'UPVC',
                    USETIME:'17',
                    USE_YEAR:'30',
                    alert:false
                  },
                  {
                    layerID:'pipeline2',
                    name:'018支干管',
                    eleId:'GD003',
                    PIPE_RADIUS:'DN150',
                    PIPE_MATERIAL:'PE',
                    USETIME:'4',
                    USE_YEAR:'50',
                    alert:false
                  }
                ], //暂存的 支干管
                branchList:[
                  {
                    layerID:'pipeline3',
                    name:'019支管',
                    eleId:'GD001',
                    PIPE_RADIUS:'DN150',
                    PIPE_MATERIAL:'PE',
                    USETIME:'4',
                    USE_YEAR:'50',
                    alert:false
                  },
                  {
                    layerID:'pipeline3',
                    name:'020支管',
                    eleId:'GD002',
                    PIPE_RADIUS:'DN100',
                    PIPE_MATERIAL:'PE',
                    USETIME:'6',
                    USE_YEAR:'50',
                    alert:false
                  },
                ], // 支管
                pipeList:[
                  {
                    layerID:'pipeline',
                    name:'河西主干管',
                    eleId:'GD001',
                    PIPE_RADIUS:'DN400',
                    PIPE_MATERIAL:'球墨铸铁',
                    USETIME:'12',
                    USE_YEAR:'50',
                    alert:false,
                  },
                  {
                    layerID:'pipeline',
                    name:'河西干管',
                    eleId:'GD002',
                    PIPE_RADIUS:'DN350',
                    PIPE_MATERIAL:'球墨铸铁',
                    USETIME:'12',
                    USE_YEAR:'50',
                    alert:false
                  },
                  {
                    layerID:'pipeline',
                    name:'河东主干管',
                    eleId:'GD003',
                    PIPE_RADIUS:'DN300',
                    PIPE_MATERIAL:'PE',
                    USETIME:'16',
                    USE_YEAR:'50',
                    alert:false
                  },
                  {
                    layerID:'pipeline',
                    name:'河东干管',
                    eleId:'GD004',
                    PIPE_RADIUS:'DN200',
                    PIPE_MATERIAL:'PE',
                    USETIME:'16',
                    USE_YEAR:'50',
                    alert:false
                  }
                ], //管网列表 默认主干管
                temp_pipeList:[
                    {
                        layerID:'pipeline',
                        name:'河西主干管',
                        eleId:'GD001',
                        PIPE_RADIUS:'DN400',
                        PIPE_MATERIAL:'球墨铸铁',
                        USETIME:'12',
                        USE_YEAR:'50',
                        alert:false,
                    },
                    {
                        layerID:'pipeline',
                        name:'河西干管',
                        eleId:'GD002',
                        PIPE_RADIUS:'DN350',
                        PIPE_MATERIAL:'球墨铸铁',
                        USETIME:'12',
                        USE_YEAR:'50',
                        alert:false
                    },
                    {
                        layerID:'pipeline',
                        name:'河东主干管',
                        eleId:'GD003',
                        PIPE_RADIUS:'DN300',
                        PIPE_MATERIAL:'PE',
                        USETIME:'16',
                        USE_YEAR:'50',
                        alert:false
                    },
                    {
                        layerID:'pipeline',
                        name:'河东干管',
                        eleId:'GD004',
                        PIPE_RADIUS:'DN200',
                        PIPE_MATERIAL:'PE',
                        USETIME:'16',
                        USE_YEAR:'50',
                        alert:false
                    }
                ], // 主干管
                pipeName:'', //搜索管道名字
            };
        },
        methods:{
            handleArea(e){
              this.areaItem = e;
              this.params_gisShow();
              let temp_index = this.tabIndex;
              switch (temp_index) {
                case 0:
                  this.searchPipe('1','1');
                  break;
                case 1:
                  this.searchPipe('1','2');
                  break;
                case 2:
                  this.searchPipe('1','3');
                  break;
              }

            },
            handleProduct(e){
              this.productItem = e;
              this.params_gisShow();
              let temp_index = this.tabIndex;
              switch (temp_index) {
                case 0:
                  this.searchPipe('1','1');
                  break;
                case 1:
                  this.searchPipe('1','2');
                  break;
                case 2:
                  this.searchPipe('1','3');
                  break;
              }
            },
            handleCaliber(e){
              this.caliberItem = e;
              this.params_gisShow();
              let temp_index = this.tabIndex;
              switch (temp_index) {
                case 0:
                  this.searchPipe('1','1');
                  break;
                case 1:
                  this.searchPipe('1','2');
                  break;
                case 2:
                  this.searchPipe('1','3');
                  break;
              }
            },
            // 改变参数 改变gis显隐
            params_gisShow(){
              let temp_areaItem = this.areaItem;
              let temp_productItem = this.productItem;
              let temp_caliberItem = this.caliberItem;
              let temp_oldChecked = this.oldChecked;
              let temp_pipeName = this.pipeName;


              let productList = window.DSE.productLists ;
              for(let i=0;i<productList.length;i++){
                if(productList[i].value==this.productItem){
                  temp_productItem = productList[i].label;
                  break;
                }
              }

              let radiusList = window.DSE.caliberLists ;
              for(let i=0;i<radiusList.length;i++){
                if(radiusList[i].value==this.caliberItem){
                  temp_caliberItem = radiusList[i].label;
                  break;
                }
              }


              let temp_start_time = '';
              let temp_end_time = '';

              if(this.selectTime!=''){
                temp_start_time = this.selectTime.split('-')[0];
                temp_end_time = this.selectTime.split('-')[1];
              }

              let temp_fm_name = this.fmName;
              let temp_jxj_name = this.jxjName;
              let temp_xfs_name = this.xfsName;

              this.$emit('tellFather_changeGis',{
                areaItem:temp_areaItem,
                productItem:temp_productItem,
                caliberItem:temp_caliberItem,
                oldChecked:temp_oldChecked,
                pipeName:temp_pipeName,
                fmName:temp_fm_name,
                jxjName:temp_jxj_name,
                xfsName:temp_xfs_name,
                start_time:temp_start_time,
                end_time:temp_end_time
              });
            },

            searchPipe(page,type){
              let that = this;
              this.params_gisShow();
              let startTime = '';
              let endTime = '';
              if (this.selectTime !== '') {
                startTime = this.selectTime.split('-')[0];
                endTime = this.selectTime.split('-')[1];
                this.startYear = startTime;
                this.endYear = endTime;
              }

              let temp_area = this.areaItem;
              let temp_product = this.productItem;
              let temp_caliber = this.caliberItem;
              if (temp_area == '全部城区' || temp_area == undefined) {
                temp_area = '';
              }
              if (temp_product == '全部管材' || temp_product == undefined) {
                temp_product = '';
              }
              if (temp_caliber == '全部管径' || temp_caliber == undefined) {
                temp_caliber = '';
              }

              // this.getPipeBaseInfo_(
              //   startTime,
              //   endTime,
              //   temp_area,
              //   temp_product,
              //   temp_caliber,
              //   page
              // );

              switch (type) {
                case '1':
                  that.pipeList = that.temp_pipeList;
                  break;
                case '2':
                  that.pipeList = that.branchMainList;
                  break;
                case '3':
                  that.pipeList = that.branchList;
                  break;
              }

            },
            //管网
            goto_page(pageNum){
                this.searchPipe(pageNum);
            },
            fromFather(component,list,flag){
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
                  case '主干管':
                    this.tabIndex = 0;
                    this.searchPipe('1','1');
                    break;
                  case '支干管':
                    this.tabIndex = 1;
                    this.searchPipe('1','2');
                    this.oldChecked = false;
                    break;
                  case '支管':
                    this.tabIndex = 2;
                    this.searchPipe('1','3');
                    this.oldChecked = false;
                    break;
                }

            },
          // 获取 管道列表信息
          getPipeBaseInfo_(startYear,endYear,temp_area,temp_product,temp_caliber,page){

          },
          //  导出管网 到word
          exportPipeBaseInfo_(imgData){
              // let that  = this ;
            let startTime = '';
            let endTime = '';
            if (this.selectTime !== '') {
              startTime = this.selectTime.split('-')[0];
              endTime = this.selectTime.split('-')[1];
              this.startYear = startTime;
              this.endYear = endTime;
            }

            let temp_area = this.areaItem;
            let temp_product = this.productItem;
            let temp_caliber = this.caliberItem;
            if (temp_area == '全部区域' || temp_area == undefined) {
              temp_area = '';
            }
            if (temp_product == '全部管材' || temp_product == undefined) {
              temp_product = '';
            }
            if (temp_caliber == '全部管径' || temp_caliber == undefined) {
              temp_caliber = '';
            }


            // let temp_compony = this.pipeName;
            // let temp_factoryId = this.$store.getters.get_companyId;
            let overTimeflag = this.oldChecked;
            if(overTimeflag){
              overTimeflag = '1';
            }else{
              overTimeflag = '';
            }
            // let  temp_user = this.$store.getters.get_userName;

            return ;

            // that.$emit('telHome_transWord',{
            //   startYear: ''+startTime,
            //   endYear: ''+endTime,
            //   areaId: ''+temp_area,
            //   factoryId: ''+temp_factoryId,
            //   type: '1',
            //   material: ''+temp_product,
            //   radius: ''+temp_caliber,
            //   pipelineName: '',
            //   page: '',
            //   pageSize: '',
            //   pipeName: ''+temp_compony,
            //   code: '',
            //   overLine: ''+overTimeflag,
            //   createUser: ''+temp_user,
            //   image: imgData
            // });

          },

          // gis上查找 该要素
          whereAmI(val){
              this.$emit('IamHere',val);
          },
          // 显隐过期的  管道
          toggleShowPipe(){
              let flag = this.oldChecked;
              this.$emit('PipeShow',flag);
              this.params_gisShow();
          },
        },
        computed: {
            years() {
                let temp_year = new Date().getFullYear();
                let yearStr = String(temp_year);
                let thisFront_year = yearStr.substring(0, yearStr.length - 1);
                thisFront_year = parseInt(thisFront_year + '0');
                let endYear = 1940;
                let D_year = (thisFront_year - endYear) / 10 + 1;
                let temp_list = [];
                temp_list.push('全部');
                for (let i = 0; i < D_year; i++) {
                    temp_list.push(
                        thisFront_year - i * 10 + '-' + (thisFront_year - i * 10 + 9)
                    );
                }
                temp_list.push('1949以前');
                return temp_list;
            },
            ...mapGetters({
                get_sunTab_pipe:'get_sunTab_pipe'
            }),
        },
        created() {
            this.areaLists = window.DSE.areaLists;
            this.productLists = window.DSE.productLists;
            this.caliberLists = window.DSE.caliberLists;
            this.searchPipe('1');
        }
    };
</script>

<style scoped lang="scss">
    #pipeMsg {
        width: 100%;
        height: 100%;
        tbody{
            td:first-child{
                span{
                    cursor: pointer;
                    text-decoration: underline;
                    color: #0b83fe;
                }
            }
          td{
            span.error{
              color: red;
            }
          }
        }

        .featureToggle {
            width: 100%;
            background: #fff;
            padding: 5px;
            z-index: 100;
            .tips {
                line-height: 20px;
                border-bottom: 1px solid #e9e9e9;
            }
            .select-tabs {
                width: 100%;
                height: 40px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 14px;
                .select-item {
                    width: 50px;
                    line-height: 25px;
                    /*padding: 0 10px;*/
                    border-radius: 5px;
                  text-align: center;
                    background: #fff;
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
                    cursor: pointer;
                    &.small {
                        font-size: 12px;
                        width: 40px;
                        padding: 0;
                        text-align: center;
                        margin-left: 5px;
                    }
                    &.actived {
                        background: #cbf3fc;
                    }
                }
                .el-select {
                    width: 90px !important;
                  margin-left: 10px;
                    &.small {
                        transform: scale(0.8);
                    }
                  /deep/ .el-input--suffix .el-input__inner{
                    padding-right: 20px;
                  }
                  /deep/ .el-input__inner{
                    padding: 0 10px;
                  }
                }
            }
        }
        .search-wrap{
            width: 100%;
            display: flex;
            justify-content: space-between;
            height: 30px;
            line-height: 30px;
            padding: 0 5px;
            margin-bottom: 10px;

            span{
                display: inline-block;
                width: 40px;
                line-height: 30px;
            }
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
        .export{
            width:100%;
            height: 40px;
            padding: 5px 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .export-button{
                width: 50px;
                height: 30px;
                background: #418738;
                color: #fff;
                line-height: 30px;
                text-align: center;
                font-size: 12px;
                cursor: pointer;
            }
        }
        .main-table{
            width: 100%;
            height: calc(100% - 151px);
          overflow-y: auto;
           &.short{
             height: calc(100% - 111px);
           }
        }

      table{
        tr{
            td:last-child{
                span{
                    line-height: 25px!important;
                }
            }
            td.error{
                color: red;
            }
        }
      }




    }
</style>
