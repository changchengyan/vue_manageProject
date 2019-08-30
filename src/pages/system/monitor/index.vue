<template>
	<div class="block">
		<div class="card">
			<dse-tab :tabs="globalTabs" ref="tabDom" @onHandleTabChange="onHandleGlobalTabChange" />

			<div v-show="tabIndex === 0" class="article">
				<div class="globalHandle">
					<el-form :inline="true" class="form">
						<el-form-item label=""><el-input v-model="tabsList[tabIndex].keyword" placeholder="请输入名称" @keyup.enter.native="onHandleSearch"></el-input></el-form-item>
						<el-form-item label=""><el-button type="primary" @click="onHandleSearch">搜索</el-button></el-form-item>
					</el-form>
					<div class="end"><el-button type="primary" @click="onHandleAdd">新增</el-button></div>
				</div>

				<div class="globalTable">
					<dse-table-width-pagination :current-page="tabsList[tabIndex].current" :total-num="tabsList[tabIndex].total" @goto_page="goto_page">
						<thead>
						<tr>
							<th><span>编号</span></th>
							<th><span>测点名称</span></th>
							<th><span>测点编号</span></th>
							<th><span>所在地</span></th>
							<th><span>测点项类型</span></th>
							<th><span>仪表编号</span></th>
							<th><span>测点纬度</span></th>
							<th><span>测点经度</span></th>
							<th><span>状态</span></th>
							<th><span>数据标识</span></th>
							<!--<th><span>配置时间</span></th>-->
							<th><span>操作</span></th>
						</tr>
						</thead>
						<tbody>
						<template v-if="tabsList[tabIndex].list&&tabsList[tabIndex].list.length>0">
							<tr v-for="(item,index) in tabsList[tabIndex].list" :key="index">
								<td><span>{{(tabsList[tabIndex].current-1)*10+index+1}}</span></td>
								<td><span>{{item.stnm}}</span></td>
								<td><span>{{item.stcd}}</span></td>
								<td><span>{{item.loc}}</span></td>
								<td><span>{{item.jctype|formate_jctype}}</span></td>
								<td><span>{{item.deviceCode}}</span></td>
								<td><span>{{item.lgtd}}</span></td>
								<td><span>{{item.lttd}}</span></td>
								<td><span>{{item.usfl|formate_status}}</span></td>
								<td><span>{{item.dataCode}}</span></td>
								<!--<td><span>{{item.label}}</span></td>-->
								<td class="btns">
									<span @click="onHandleListEdit(item)">编辑</span>
									<span @click="onHandleListRemove(item)">删除</span>
								</td>
							</tr>
						</template>
						<template v-else>
							<tr>
								<td colspan="12"><span style="line-height: 30px">暂时没有数据~~</span></td>
							</tr>
						</template>
						</tbody>
					</dse-table-width-pagination>
				</div>
			</div>

			<div v-show="tabIndex === 1" class="article">
				<div class="globalHandle">
					<el-form :inline="true" class="form">
						<el-form-item label=""><el-input v-model="tabsList[tabIndex].keyword" placeholder="请输入名称" @keyup.enter.native="onHandleSearch"></el-input></el-form-item>
						<el-form-item label=""><el-button type="primary" @click="onHandleSearch">搜索</el-button></el-form-item>
					</el-form>
					<div class="end"><el-button type="primary" @click="onHandleAdd">新增</el-button></div>
				</div>

				<div class="globalTable">
					<dse-table-width-pagination :current-page="tabsList[tabIndex].current" :total-num="tabsList[tabIndex].total" @goto_page="goto_page">
						<thead>
						<tr>
							<th><span>编号</span></th>
							<th><span>测点名称</span></th>
							<th><span>测点编号</span></th>
							<th><span>所在地</span></th>
							<th><span>测点项类型</span></th>
							<th><span>仪表编号</span></th>
							<th><span>测点纬度</span></th>
							<th><span>测点经度</span></th>
							<th><span>状态</span></th>
							<th><span>数据标识</span></th>
							<!--<th><span>配置时间</span></th>-->
							<th><span>操作</span></th>
						</tr>
						</thead>
						<tbody>
						<template v-if="tabsList[tabIndex].list&&tabsList[tabIndex].list.length>0">
							<tr v-for="(item,index) in tabsList[tabIndex].list" :key="index">
								<td><span>{{(tabsList[tabIndex].current-1)*10+index+1}}</span></td>
								<td><span>{{item.stnm}}</span></td>
								<td><span>{{item.stcd}}</span></td>
								<td><span>{{item.loc}}</span></td>
								<td><span>{{item.jctype|formate_jctype}}</span></td>
								<td><span>{{item.deviceCode}}</span></td>
								<td><span>{{item.lgtd}}</span></td>
								<td><span>{{item.lttd}}</span></td>
								<td><span>{{item.usfl|formate_status}}</span></td>
								<td><span>{{item.dataCode}}</span></td>
								<!--<td><span>{{item.label}}</span></td>-->
								<td class="btns">
									<span @click="onHandleListEdit(item)">编辑</span>
									<span @click="onHandleListRemove(item)">删除</span>
								</td>
							</tr>
						</template>
						<template v-else>
							<tr>
								<td colspan="12"><span style="line-height: 30px">暂时没有数据~~</span></td>
							</tr>
						</template>
						</tbody>
					</dse-table-width-pagination>
				</div>
			</div>

			<div v-show="tabIndex === 2" class="article">
				<div class="globalHandle">
					<el-form :inline="true" class="form">
						<el-form-item label=""><el-input v-model="tabsList[tabIndex].keyword" placeholder="请输入名称" @keyup.enter.native="onHandleSearch"></el-input></el-form-item>
						<el-form-item label=""><el-button type="primary" @click="onHandleSearch">搜索</el-button></el-form-item>
					</el-form>
					<div class="end"><el-button type="primary" @click="onHandleAdd">新增</el-button></div>
				</div>

				<div class="globalTable">
					<dse-table-width-pagination :current-page="tabsList[tabIndex].current" :total-num="tabsList[tabIndex].total" @goto_page="goto_page">
						<thead>
						<tr>
							<th><span>编号</span></th>
							<th><span>测点名称</span></th>
							<th><span>测点编号</span></th>
							<th><span>所在地</span></th>
							<th><span>测点项类型</span></th>
							<th><span>仪表编号</span></th>
							<th><span>测点纬度</span></th>
							<th><span>测点经度</span></th>
							<th><span>状态</span></th>
							<th><span>数据标识</span></th>
							<!--<th><span>配置时间</span></th>-->
							<th><span>操作</span></th>
						</tr>
						</thead>
						<tbody>
						<template v-if="tabsList[tabIndex].list&&tabsList[tabIndex].list.length>0">
							<tr v-for="(item,index) in tabsList[tabIndex].list" :key="index">
								<td><span>{{(tabsList[tabIndex].current-1)*10+index+1}}</span></td>
								<td><span>{{item.stnm}}</span></td>
								<td><span>{{item.stcd}}</span></td>
								<td><span>{{item.loc}}</span></td>
								<td><span>{{item.jctype |formate_jctype}}</span></td>
								<td><span>{{item.deviceCode}}</span></td>
								<td><span>{{item.lgtd}}</span></td>
								<td><span>{{item.lttd}}</span></td>
								<td><span>{{item.usfl|formate_status}}</span></td>
								<td><span>{{item.dataCode}}</span></td>
								<!--<td><span>{{item.label}}</span></td>-->
								<td class="btns">
									<span @click="onHandleListEdit(item)">编辑</span>
									<span @click="onHandleListRemove(item)">删除</span>
								</td>
							</tr>
						</template>
						<template v-else>
							<tr>
								<td colspan="12"><span style="line-height: 30px">暂时没有数据~~</span></td>
							</tr>
						</template>
						</tbody>
					</dse-table-width-pagination>
				</div>
			</div>

			<div v-show="tabIndex === 3" class="article">
				<div class="globalHandle">
					<el-form :inline="true" class="form">
						<el-form-item label=""><el-input v-model="tabsList[tabIndex].keyword" placeholder="请输入名称" @keyup.enter.native="onHandleSearch"></el-input></el-form-item>
						<el-form-item label=""><el-button type="primary" @click="onHandleSearch">搜索</el-button></el-form-item>
					</el-form>
					<div class="end"><el-button type="primary" @click="onHandleAdd">新增</el-button></div>
				</div>

				<div class="globalTable">
					<dse-table-width-pagination :current-page="tabsList[tabIndex].current" :total-num="tabsList[tabIndex].total" @goto_page="goto_page">
						<thead>
						<tr>
							<th><span>编号</span></th>
							<th><span>测点名称</span></th>
							<th><span>测点编号</span></th>
							<th><span>所在地</span></th>
							<th><span>测点项类型</span></th>
							<th><span>仪表编号</span></th>
							<th><span>测点纬度</span></th>
							<th><span>测点经度</span></th>
							<th><span>状态</span></th>
							<th><span>数据标识</span></th>
							<!--<th><span>配置时间</span></th>-->
							<th><span>操作</span></th>
						</tr>
						</thead>
						<tbody>
						<template v-if="tabsList[tabIndex].list&&tabsList[tabIndex].list.length>0">
							<tr v-for="(item,index) in tabsList[tabIndex].list" :key="index">
								<td><span>{{(tabsList[tabIndex].current-1)*10+index+1}}</span></td>
								<td><span>{{item.stnm}}</span></td>
								<td><span>{{item.stcd}}</span></td>
								<td><span>{{item.loc}}</span></td>
								<td><span>{{item.jctype |formate_jctype}}</span></td>
								<td><span>{{item.deviceCode}}</span></td>
								<td><span>{{item.lgtd}}</span></td>
								<td><span>{{item.lttd}}</span></td>
								<td><span>{{item.usfl|formate_status}}</span></td>
								<td><span>{{item.dataCode}}</span></td>
								<!--<td><span>{{item.label}}</span></td>-->
								<td class="btns">
									<span @click="onHandleListEdit(item)">编辑</span>
									<span @click="onHandleListRemove(item)">删除</span>
								</td>
							</tr>
						</template>
						<template v-else>
							<tr>
								<td colspan="12"><span style="line-height: 30px">暂时没有数据~~</span></td>
							</tr>
						</template>
						</tbody>
					</dse-table-width-pagination>
				</div>
			</div>

			<div v-show="tabIndex === 4" class="article">
				<div class="globalHandle">
					<el-form :inline="true" class="form">
						<el-form-item label=""><el-input v-model="tabsList[tabIndex].keyword" placeholder="请输入名称" @keyup.enter.native="onHandleSearch"></el-input></el-form-item>
						<el-form-item label=""><el-button type="primary" @click="onHandleSearch">搜索</el-button></el-form-item>
					</el-form>
					<div class="end"><el-button type="primary" @click="onHandleAdd">新增</el-button></div>
				</div>

				<div class="globalTable">
					<dse-table-width-pagination :current-page="tabsList[tabIndex].current" :total-num="tabsList[tabIndex].total" @goto_page="goto_page">
						<thead>
						<tr>
							<th><span>编号</span></th>
							<th><span>测点名称</span></th>
							<th><span>测点编号</span></th>
							<th><span>所在地</span></th>
							<th><span>测点项类型</span></th>
							<th><span>仪表编号</span></th>
							<th><span>测点纬度</span></th>
							<th><span>测点经度</span></th>
							<th><span>状态</span></th>
							<th><span>数据标识</span></th>
							<!--<th><span>配置时间</span></th>-->
							<th><span>操作</span></th>
						</tr>
						</thead>
						<tbody>
						<template v-if="tabsList[tabIndex].list&&tabsList[tabIndex].list.length>0">
							<tr v-for="(item,index) in tabsList[tabIndex].list" :key="index">
								<td><span>{{(tabsList[tabIndex].current-1)*10+index+1}}</span></td>
								<td><span>{{item.stnm}}</span></td>
								<td><span>{{item.stcd}}</span></td>
								<td><span>{{item.loc}}</span></td>
								<td><span>{{item.jctype |formate_jctype}}</span></td>
								<td><span>{{item.deviceCode}}</span></td>
								<td><span>{{item.lgtd}}</span></td>
								<td><span>{{item.lttd}}</span></td>
								<td><span>{{item.usfl|formate_status}}</span></td>
								<td><span>{{item.dataCode}}</span></td>
								<!--<td><span>{{item.label}}</span></td>-->
								<td class="btns">
									<span @click="onHandleListEdit(item)">编辑</span>
									<span @click="onHandleListRemove(item)">删除</span>
								</td>
							</tr>
						</template>
						<template v-else>
							<tr>
								<td colspan="12"><span style="line-height: 30px">暂时没有数据~~</span></td>
							</tr>
						</template>
						</tbody>
					</dse-table-width-pagination>
				</div>
			</div>

			<div v-show="tabIndex === 5" class="article">
				<div class="globalHandle">
					<el-form :inline="true" class="form">
						<el-form-item label=""><el-input v-model="tabsList[tabIndex].keyword" placeholder="请输入名称" @keyup.enter.native="onHandleSearch"></el-input></el-form-item>
						<el-form-item label=""><el-button type="primary" @click="onHandleSearch">搜索</el-button></el-form-item>
					</el-form>
					<div class="end"><el-button type="primary" @click="onHandleAdd">新增</el-button></div>
				</div>

				<div class="globalTable">
					<dse-table-width-pagination :current-page="tabsList[tabIndex].current" :total-num="tabsList[tabIndex].total" @goto_page="goto_page">
						<thead>
						<tr>
							<th><span>编号</span></th>
							<th><span>测点名称</span></th>
							<th><span>测点编号</span></th>
							<th><span>所属地</span></th>
							<th><span>测点项类型</span></th>
							<th><span>仪表编号</span></th>
							<th><span>测点纬度</span></th>
							<th><span>测点经度</span></th>
							<th><span>状态</span></th>
							<th><span>数据标识</span></th>
							<!--<th><span>配置时间</span></th>-->
							<th><span>操作</span></th>
						</tr>
						</thead>
						<tbody>
						<template v-if="tabsList[tabIndex].list&&tabsList[tabIndex].list.length>0">
							<tr v-for="(item,index) in tabsList[tabIndex].list" :key="index">
								<td><span>{{(tabsList[tabIndex].current-1)*10+index+1}}</span></td>
								<td><span>{{item.stnm}}</span></td>
								<td><span>{{item.stcd}}</span></td>
								<td><span>{{item.loc}}</span></td>
								<td><span>{{item.jctype |formate_jctype}}</span></td>
								<td><span>{{item.deviceCode}}</span></td>
								<td><span>{{item.lgtd}}</span></td>
								<td><span>{{item.lttd}}</span></td>
								<td><span>{{item.usfl|formate_status}}</span></td>
								<td><span>{{item.dataCode}}</span></td>
								<!--<td><span>{{item.label}}</span></td>-->
								<td class="btns">
									<span @click="onHandleListEdit(item)">编辑</span>
									<span @click="onHandleListRemove(item)">删除</span>
								</td>
							</tr>
						</template>
						<template v-else>
							<tr>
								<td colspan="12"><span style="line-height: 30px">暂时没有数据~~</span></td>
							</tr>
						</template>
						</tbody>
					</dse-table-width-pagination>
				</div>
			</div>
		</div>

		<!-- 删除 -->
		<dse-save-status :showModel="confirm.visible" @delThis="onHandleConfirmCancel" @sureDelThis="onHandleConfirmDestory" />
	</div>
</template>

<script>
    import {
        // 系统配置-监测点配置-获取监测点基本信息列表
        getStJcdBList, getStWarnList, sitePointdel
        // 系统配置-监测点配置-删除监测点基本信息
        // destoryStJcdB
    } from '../../../api/interfaces/system_api';
    import DseTab from '../../../common/components/dseTab';
    import DseSaveStatus from '../../../common/components/toast/DseSaveStatus';
    import DseTableWidthPagination from '../../../common/components/dseTableWidthPagination';

    const PAGINATION = {
        total: 10,
        current: 1,
        pageSize: 10
    };

    export default {
        components: {
            DseTableWidthPagination,
            DseTab,
            DseSaveStatus
        },
        data() {
            return {
                paginationGroups: [10, 20, 30],
                tabIndex: 0,
                globalTabs: ['全部', '水质', '水压', '流量', '水位', '视频'],
                tabsList: [
                    {
                        ...PAGINATION,
                        keyword: '',
                        columns: [],
                        list: []
                    },
                    {
                        ...PAGINATION,
                        keyword: '',
                        columns: [],
                        list: []
                    },
                    {
                        ...PAGINATION,
                        keyword: '',
                        columns: [],
                        list: []
                    },
                    {
                        ...PAGINATION,
                        keyword: '',
                        columns: [],
                        list: []
                    },
                    {
                        ...PAGINATION,
                        keyword: '',
                        columns: [],
                        list: []
                    },
                    {
                        ...PAGINATION,
                        keyword: '',
                        columns: [],
                        list: []
                    }
                ],
                confirm: {
                    visible: false,
                    payload: {}
                }
            };
        },
        methods: {
            onHandleGlobalTabChange(tabIndex = 0) {
                const that = this;
                that.tabIndex = tabIndex;
                this.$store.commit('set_sys_monitor_tabIndex',tabIndex);
                // 系统配置-监测点配置-获取监测点基本信息列表
                this.tabsList[tabIndex].current = 1;

                that._getStJcdBList();
            },
            onHandleAdd() {
                const that = this;
                let tabIndex = this.tabIndex;
                let params={
                    bjftype: null,
                    dataCode: '',
                    deviceCode: '',
                    iszyzd: '',
                    jctype: '',
                    jzbw: '',
                    lgtd: '0.00',
                    loc: '',
                    lttd: '0.00',
                    prcode: '',
                    prtype: '1',
                    sblxsz: null,
                    stcd: '',
                    stnm: '',
                    tbjx: null,
                    usfl: '1',
                    vmax: null,
                    vmax2: null,
                    vmax3: null,
                    vmin: null,
                    vmin2: null,
                    vmin3: null,
                    vtm: null,
                    vtm2: null,
                    vtm3: null,
                    disable:false,
                    stWarnBList:[]
                };
                switch (tabIndex) {
                    case 0:
                        params.jctype='1';
                        break;
                    case 1:
                        params.jctype='1';
                        break;
                    case 2:
                        params.jctype='2';
                        break;
                    case 3:
                        params.jctype='3';
                        break;
                    case 4:
                        params.jctype='4';
                        break;
                    case 5:
                        params.jctype='5';
                        break;
                }
                console.log(params);
                if(tabIndex!=5){
                    that.$router.push({
                        name: 'systemMonitorModify',
                        params
                    });
                }else{
                    that.$router.push({
                        name: 'systemModifyVideo',
                        params
                    });
                }
                // that.$store.commit('set_asideStatus', false);
                that.$emit('hiddenAside');
            },
            onHandleSearch() {
                const that = this;

                // 更新监测点基本信息列表
                that._getStJcdBList();
            },
            onHandleListEdit(params = {}) {
                const that = this;
                getStWarnList({
                    stcd:params.stcd
                },that).then(res=>{

                    console.log(res);
                    let {data} = res;
                    data = data&&data.length>0?data:[];
                    that.$router.push({
                        name: 'systemMonitorModify',
                        params:{
                            ...params,
                            disable:true,
                            stWarnBList:[...data]
                        }
                    });
                    // that.$store.commit('set_asideStatus', false);
                    that.$emit('hiddenAside');

                });


            },
            onHandleListRemove(payload = {}) {
                const that = this;
                that.confirm = {
                    ...that.confirm,
                    payload
                };
                // 显示删除二次确认框
                that.onHandleConfirmVisible();
            },
            // 关闭删除二次确认框
            onHandleConfirmDestory() {
                const that = this;
                const { confirm } = that;
                const { payload = {} } = confirm;
                const { stcd = '' } = payload;
                sitePointdel({
                    delId:stcd
                },that).then(res=>{
                    const { status } = res;
                    if (status) {
                        that.$message({
                            message: '删除成功~',
                            type: 'success'
                        });
                        const { tabIndex, tabsList } = that;
                        const { list } = tabsList[tabIndex];
                        that.tabsList[tabIndex].list = list.filter((item = {}, key) => {
                            if (item.stcd === stcd) return false;
                            return true;
                        });
                    } else {
                        that.$message({
                            message: '删除失败~',
                            type: 'error'
                        });
                    }
                });
                that.onHandleConfirmCancel();
            },
            // 显示删除二次确认框
            onHandleConfirmVisible() {
                const that = this;

                that.confirm = {
                    ...that.confirm,
                    visible: true
                };
            },
            onHandleConfirmCancel() {
                const that = this;

                that.confirm = {
                    ...that.confirm,
                    visible: false
                };
            },
            onHandleSizeChange(pageSize) {
                const that = this;

                const { tabIndex } = that;

                that.tabsList[tabIndex] = {
                    ...that.tabsList[tabIndex],
                    pageSize
                };

                // 更新监测点基本信息列表
                that._getStJcdBList();
            },
            onHandleCurrentChange(current) {
                const that = this;

                const { tabIndex } = that;

                that.tabsList[tabIndex] = {
                    ...that.tabsList[tabIndex],
                    current
                };

                // 更新监测点基本信息列表
                that._getStJcdBList();
            },
            // 系统配置-监测点配置-获取监测点基本信息列表
            _getStJcdBList() {
                const that = this;

                const {
                    // globalTabs,
                    tabIndex,
                    tabsList
                } = that;
                const { current = '', pageSize, keyword = '' } = tabsList[tabIndex];
                // const stnm = globalTabs[tabIndex];
                /**
                 * 获取监测点基本信息列表
                 * @param {stnm}      	[false string] 	编码或名称
                 * @param {jctype}      [false string] 	监测类型 [1水厂,2水库,3泵站4, 蓄水池5. 联户表井,6管线]
                 * @param {pageNum}     [true string] 	第几页
                 * @param {pageSize}    [true string] 	页条数
                 */
                const payload = { pageNum: current, pageSize };
                Object.assign(payload, tabIndex && { jctype: tabIndex==0?'':tabIndex }, keyword && { stnm: keyword });
                getStJcdBList(payload, that)
                    .then((results = {}) => {
                        const { status, msg = '', data = {} } = results;
                        const { total, list = [] } = data;

                        if (status) {
                            that.tabsList[tabIndex].list = Array.isArray(list)
                                ? list.map((item = {}, key) => ({
                                    ...item,
                                    key: key + 1
                                }))
                                : [];
                            that.tabsList[tabIndex].current = current;
                            that.tabsList[tabIndex].pageSize = pageSize;
                            that.tabsList[tabIndex].total = total;
                        } else {
                            console.error(msg);
                        }
                    })
                    .catch(e => {
                        console.error(e);
                    });
            },
            _initialization() {
                const that = this;
                // 系统配置-监测点配置-获取监测点基本信息列表
                that.$nextTick(() => {
                    that._getStJcdBList();
                });
            },

            //  当前页面的点击
            goto_page(obj){
                let that = this;
                let index = this.tabIndex ;
                that.tabsList[index].current = obj.pageNum;
                that.tabsList[index].pageSize = obj.pageSize;

                this._getStJcdBList();

            }
        },
        mounted() {
            const that = this;
            this.$refs.tabDom._tabChange(that.tabIndex);
            that._initialization();
        },
        filters:{
            formate_jctype(val){
                let temp_str = val;
                switch (val) {
                    case '1':
                        temp_str = '水厂';
                        break;
                    case '2':
                        temp_str = '水库';
                        break;
                    case '3':
                        temp_str = '泵站';
                        break;
                    case '4':
                        temp_str = '蓄水池';
                        break;
                    case '5':
                        temp_str = '联户表井';
                        break;
                    case '6':
                        temp_str = '管线';
                        break;
                }
                return temp_str;
            },
            formate_status(val){
                let temp_str = val;
                switch (val) {
                    case '1':
                        temp_str = '启用';
                        break;
                    case '0':
                        temp_str = '停用';
                        break;
                }
                return temp_str;
            }
        },
        created() {
            let that  = this;
            this.tabIndex = parseInt(that.$store.getters.get_sys_monitor_tabIndex) ;
            console.log(this.tabIndex);
            console.log( typeof this.tabIndex);
        }
    };
</script>

<style scoped="scoped" lang="scss">
	.card{
		width: 100%;
		height: 100%;
	}

</style>
