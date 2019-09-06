<template>
    <div id="monitorPlan">
        <div class="block">
            <div class="card">
                <div class="search-wrap">
                    <el-button @click="gotoAddOrEditModel('add',null)" class="right-btn" type="primary"><i
                            class="el-icon-plus"></i>新增
                    </el-button>
                </div>
                <div class="table-content">
                    <dse-table-width-pagination :currentPage="currentPage" :totalNum="totalNum" @goto_page="goto_page">
                        <thead>
                        <tr>
                            <th><span>巡检名称</span></th>
                            <th><span>巡检编号</span></th>
                            <th><span>巡检方式</span></th>
                            <th><span>管线签到点</span></th>
                            <th><span>工程签到点</span></th>
                            <th><span>水源地签到点</span></th>
                            <th width="120"><span>操作</span></th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-if="planList && planList.length>0">
                            <tr :key="index" v-for="(item,index) in planList">
                                <td><span>{{item.planName}}</span></td>
                                <td><span>{{item.plan_code}}</span></td>
                                <td><span>{{item.inspectMode|fortmateInspectMode}}</span></td>
                                <td><span>{{item.pipePointNum}}</span></td>
                                <td><span>{{item.projectPointNum}}</span></td>
                                <td><span>{{item.waterPointNum}}</span></td>
                                <td class="btns"><span @click="gotoAddOrEditModel('edit',item)" >修改</span> <span
                                        @click="delThis(item)" >删除</span></td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="7"><span>无数据</span></td>
                            </tr>
                        </template>
                        </tbody>
                    </dse-table-width-pagination>

                </div>
            </div>
        </div>
        <dse-save-status :content="modelContent" :definedContent="definedContent" :flag="modelFlag"
                         :showModel="showModel" :type="modelType" @delThis="closeModel" @sureDelThis="sureDelThis"/>
        <add-or-edit-monitor-plan :operType="operType" :rowData="rowData" @closeAddOrEdit="closeAddOrEdit"
                                  @refreshList="refreshList" v-if="showAddOrEdit"></add-or-edit-monitor-plan>
    </div>
</template>
<script>

    import DseTableWidthPagination from '../../common/components/DseTableWidthPagination';
    import DseSaveStatus from '../../common/components/toast/DseSaveStatus';
    import addOrEditMonitorPlan from './addOrEdit/addOrEditMonitorPlan';//新增或编辑页

    export default {
        name: 'monitorPlan',
        components: {DseSaveStatus, DseTableWidthPagination, addOrEditMonitorPlan},
        data() {
            return {
                planList: [{
                    'planName': '窑山管网巡检',
                    'plan_code': '001',
                    'use_status': '1',
                    'projectPointNum': 2,
                    'pipePointNum': 2,
                    waterPointNum:'0',
                    'allName': null,
                    'planCycle': null,
                    'signPoint': [{
                        'signFlag': '0',
                        'signTime': null,
                        'inspectArea': null,
                        'pointName': '测试窗口是否关上',
                        'inspectPlan': null,
                        'signUser': null,
                        'lgtd': 106.539575195,
                        'lttd': 38.202832872,
                        'planId': '044e69e749e74f18a0672e9ba8567892',
                        'id': '1d0396443ab64521a6aeb8554ae40d9c',
                        'pointType': '0',
                        'signId': '1d0396443ab64521a6aeb8554ae40d9c'
                    }, {
                        'signFlag': '0',
                        'signTime': null,
                        'inspectArea': null,
                        'pointName': '随便填的工程点',
                        'inspectPlan': null,
                        'signUser': null,
                        'lgtd': 106.604806519,
                        'lttd': 38.210386657,
                        'planId': '044e69e749e74f18a0672e9ba8567892',
                        'id': '3d2022e47aa84f7786a781f7e98d21ad',
                        'pointType': '1',
                        'signId': '3d2022e47aa84f7786a781f7e98d21ad'
                    }, {
                        'signFlag': '0',
                        'signTime': null,
                        'inspectArea': null,
                        'pointName': '大范围',
                        'inspectPlan': null,
                        'signUser': null,
                        'lgtd': 106.642544779,
                        'lttd': 38.158917306,
                        'planId': '044e69e749e74f18a0672e9ba8567892',
                        'id': 'ee6e019fbc834efcb91789d02236191b',
                        'pointType': '1',
                        'signId': 'ee6e019fbc834efcb91789d02236191b'
                    }, {
                        'signFlag': '0',
                        'signTime': null,
                        'inspectArea': null,
                        'pointName': '顶顶顶顶顶的呢',
                        'inspectPlan': null,
                        'signUser': null,
                        'lgtd': 106.657678223,
                        'lttd': 38.190961053,
                        'planId': '044e69e749e74f18a0672e9ba8567892',
                        'id': 'fbdcf996d5f6464a9e04d8779887ec18',
                        'pointType': '0',
                        'signId': 'fbdcf996d5f6464a9e04d8779887ec18'
                    }],
                    'sumnum': 0.00,
                    'startTime': null,
                    'planId': '044e69e749e74f18a0672e9ba8567892',
                    'endTime': null,
                    'inspectMode': '3',
                    'remarks': '验证关闭gis小窗口'
                }, {
                    'planName': '小西沟水库巡检',
                    'plan_code': '002',
                    'use_status': '1',
                    'projectPointNum': 0,
                    'pipePointNum': 0,
                    waterPointNum:'1',
                    'allName': null,
                    'planCycle': null,
                    'signPoint': [{
                        'signFlag': '0',
                        'signTime': null,
                        'inspectArea': null,
                        'pointName': '工程信息1',
                        'inspectPlan': null,
                        'signUser': null,
                        'lgtd': 106.548844910,
                        'lttd': 38.216860707,
                        'planId': '0462a58bae1a4506abc6f7b447e71e0d',
                        'id': '02469e02faef460abc3fedd3edb2d6cf',
                        'pointType': '1',
                        'signId': '02469e02faef460abc3fedd3edb2d6cf'
                    }, {
                        'signFlag': '0',
                        'signTime': null,
                        'inspectArea': null,
                        'pointName': '管线2',
                        'inspectPlan': null,
                        'signUser': null,
                        'lgtd': 106.656991577,
                        'lttd': 38.213084248,
                        'planId': '0462a58bae1a4506abc6f7b447e71e0d',
                        'id': '128654812b104cd7a81d597495804fde',
                        'pointType': '0',
                        'signId': '128654812b104cd7a81d597495804fde'
                    }, {
                        'signFlag': '0',
                        'signTime': null,
                        'inspectArea': null,
                        'pointName': '2',
                        'inspectPlan': null,
                        'signUser': null,
                        'lgtd': 106.657334900,
                        'lttd': 38.198650975,
                        'planId': '0462a58bae1a4506abc6f7b447e71e0d',
                        'id': 'ce1f710b03ec4bcbace38715e7ae31d8',
                        'pointType': '0',
                        'signId': 'ce1f710b03ec4bcbace38715e7ae31d8'
                    }],
                    'sumnum': 0.00,
                    'startTime': null,
                    'planId': '0462a58bae1a4506abc6f7b447e71e0d',
                    'endTime': null,
                    'inspectMode': '0',
                    'remarks': '测试通过吗'
                }, {
                    'planName': '王团管网巡检',
                    'plan_code': '003',
                    'use_status': '1',
                    'projectPointNum': 1,
                    waterPointNum:'0',
                    'pipePointNum': 3,
                    'allName': null,
                    'planCycle': null,
                    'signPoint': [],
                    'sumnum': null,
                    'startTime': null,
                    'planId': '0462a58bae1a4506abc6f7b447e71e1d',
                    'endTime': null,
                    'inspectMode': '0',
                    'remarks': ''
                }, {
                    'planName': '河西加压泵站巡检',
                    'plan_code': '004',
                    'use_status': '1',
                    'projectPointNum': 2,
                    waterPointNum:'0',
                    'pipePointNum': 1,
                    'allName': null,
                    'planCycle': null,
                    'signPoint': [],
                    'sumnum': null,
                    'startTime': null,
                    'planId': '05af2700c5cd432e82d9ce67de2611b0',
                    'endTime': null,
                    'inspectMode': '0',
                    'remarks': '尽快处理'
                }],//巡检计划
                totalNum: 1,//总共记录条数
                currentPage: 1,//当前页码
                //删除弹窗
                delId: '',//要删除的数据id
                showModel: false,
                modelContent: '',
                modelType: false,
                modelFlag: false,
                definedContent: '',
                //新增编辑页
                operType: '',//操作类型
                rowData: {},//行数据
                showAddOrEdit: '',//新增编辑页是否显示
            };
        },
        computed: {},
        filters: {
            fortmateInspectMode(val) {
                let temp = val;
                switch (val) {
                    case '0':
                        temp = '步行';
                        break;
                    case '1':
                        temp = '自行车';
                        break;
                    case '2':
                        temp = '摩托车';
                        break;
                    case '3':
                        temp = '汽车';
                        break;
                }
                return temp;
            },
        },
        methods: {
            //新增编辑页取消按钮事件
            closeAddOrEdit() {
                this.showAddOrEdit = false;
                this.$store.commit('set_asideStatus', true);
                this.$emit('showAside');
            },
            //刷新列表
            refreshList() {
                this.showAddOrEdit = false;
                this.getMonitorPlanList_(1);
                this.$store.commit('set_asideStatus', true);
                this.$emit('showAside');
            },
            //获取巡检记录列表
            getMonitorPlanList_(page) {

            },

            //翻页事件
            goto_page(pageNum) {
                this.getMonitorPlanList_(pageNum);
            },

            //新增或编辑 operType:操作类型,rowData:编辑的行数据
            gotoAddOrEditModel(operType, rowData) {
                this.operType = operType;
                this.rowData = rowData;
                this.showAddOrEdit = true;
//          this.$router.push({name: 'addOrEditMonitorPlan',params:{'rowData':rowData,'operType':operType}});
                this.$store.commit('set_asideStatus', false);
                this.$emit('hiddenAside');
            },

            //删除数据
            delThis(rowData) {
                this.delId = rowData.planId;
                this.modelType = false;
                this.definedContent = '确认删除' + rowData.planName + '？';
                this.showModel = true;
            },

            //确认删除
            sureDelThis() {

            },

            //消息弹窗关闭事件
            closeModel(val) {
                this.showModel = val.modelFlag;
            }
        },
        created() {
        },
        mounted() {
            this.getMonitorPlanList_(1);
        }

    };

</script>

<style lang="scss" scoped>
    #monitorPlan {
        width: 100%;
        height: 100%;
        .search-wrap {
            width: 100%;
            height: 30px;
            line-height: 30px;
            align-items: center;
            margin-bottom: 10px;

            .Wdate {
                width: 140px;
                margin-right: 10px;
            }

            & > span {
                display: inline-block;
                width: 60px;
                margin-right: 10px;
            }

            .el-input {
                width: 200px;
                margin-right: 10px;
            }

            .right-btn {
                float: right;
            }
        }

        .table-content {
            width: 100%;
            height: calc(100% - 30px);
        }
    }
</style>
