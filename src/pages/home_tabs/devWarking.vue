<template>
  <div id="devWarking">
    <div class="search-wrap">
      <div class="row">
        <span>属地部门:</span>
        <el-select v-model="deptItem" placeholder="请选择">
          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="row">
        <span>设备类型:</span>
        <el-select v-model="typeItem" placeholder="请选择">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="row">
        <el-input placeholder="请输入设备名字" v-model="name" clearable id="searchName"></el-input>
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="table-content">
      <dse-table-list :currentPage="currentPage" :totalNum="totalNum">
        <thead>
        <tr>
          <th>
            <span>设备名称</span>
          </th>
          <th>
            <span>设备编号</span>
          </th>
          <th>
            <span>设备类型</span>
          </th>
          <th>
            <span>属地部门</span>
          </th>
          <th>
            <span>状态</span>
          </th>
        </tr>
        </thead>
        <tbody>
        <template v-if="list&&list.length>0">
          <tr v-for="(val,index) in list" :key="index">
            <td><span>{{val.name}}</span></td>
            <td><span>{{val.code}}</span></td>
            <td><span>{{val.type}}</span></td>
            <td><span>{{val.dept}}</span></td>
            <td><span :class="{error:val.status}">{{val.status|formate_status}}</span></td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="5"><span>没有您查找的数据哦~~</span></td>
          </tr>
        </template>
        </tbody>
      </dse-table-list>
    </div>
  </div>
</template>

<script>
  import DseTableList from '../../common/components/dseTableList';

  export default {
    name: 'devWarking',
    components: {DseTableList},
    data() {
      return {
        currentPage:1,
        totalNum:1,
        tempList:[
          {
            name:'设备#1',
            code:'DEV1',
            type:'水泵类',
            dept:'工程部',
            status:false
          },
          {
            name:'设备#2',
            code:'DEV2',
            type:'自动化类',
            dept:'工程部',
            status:true
          },
          {
            name:'设备#3',
            code:'DEV3',
            type:'电机类',
            dept:'工程部',
            status:false
          },
          {
            name:'设备#4',
            code:'DEV4',
            type:'自动化类',
            dept:'工程部',
            status:true
          }
        ],
        list:[
          {
            name:'设备#1',
            code:'DEV1',
            type:'水泵类',
            dept:'工程部',
            status:false
          },
          {
            name:'设备#2',
            code:'DEV2',
            type:'自动化类',
            dept:'工程部',
            status:true
          },
          {
            name:'设备#3',
            code:'DEV3',
            type:'电机类',
            dept:'工程部',
            status:false
          },
          {
            name:'设备#4',
            code:'DEV4',
            type:'自动化类',
            dept:'工程部',
            status:true
          }
        ],

        deptList:[
          {
            label:'宁东水务公司',
            value:''
          },
          {
            label:'生产运营管理相关部门',
            value:'1'
          },
          {
            label:'管网部门',
            value:'2'
          },
          {
            label:'工程部',
            value:'3'
          },
          {
            label:'后期服务公司',
            value:'4'
          }
        ],
        deptItem:'',
        typeList:[
          {
            label:'全部',
            value:''
          },
          {
            label:'水泵类',
            value:'1'
          },
          {
            label:'自动化类',
            value:'2'
          },
          {
            label:'电机类',
            value:'3'
          }
        ],
        typeItem:'',
        devList:[
          {
            label:'电动阀',
            value:'1'
          }
        ],
        devItem:'',
        name:''
      };
    },
    methods: {
      fromFather(component, list) {
        console.log(component);
      },
      search(){
        let temp_name = this.name;
        let temp_type = this.typeItem;
        let temp_dept = this.deptItem;

        let list = this.tempList;

       this.list = list.filter(val=>{
          if(val.name===temp_name&&val.type==temp_type&&val.dept==temp_dept){
            return true;
          }else{
            return  false;
          }
        });
      }
    },
    filters:{
      formate_status(val){
        let temp_val = val;
        switch (val) {
          case false:
            temp_val = '异常';
            break;
          case true:
            temp_val = '正常';
            break;
        }
        return temp_val;
      }
    }
  };
</script>

<style scoped lang="scss">
  #devWarking {
    width: 100%;
    height: 100%;

    .search-wrap {
      width: 100%;

      .row {
        width: 100%;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;


        &:last-child {
          display: flex;
          justify-content: space-between;

          .el-input {
            width: calc(100% - 60px);

            /deep/ .el-input__inner {
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
              border-right: none;
            }
          }

          /deep/ .el-button--primary {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
      }
    }

    .table-content {
      width: 100%;
      height: calc(100% - 120px);
      td{
        span.error{
          color: red;
        }
      }
    }
  }
</style>
