<template>
	<div class="block">
		<div class="card">
			<!-- 操作栏 -->
			<div class="globalHandle">
				<div class="start">
					<el-form :inline="true" class="form">
						<el-form-item label="关键字:"><el-input v-model="searchData.keywords" placeholder="请输入工程名称关键字" @keyup.enter.native="onHandleSearch"></el-input></el-form-item>
						<el-form-item label="工程类型:">
							<el-select v-model="searchData.prtype" placeholder="请选择工程类型" @keyup.enter.native="onHandleSearch">
								<el-option value="" label="全部类型"></el-option>
								<el-option v-for="item in prtypeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item><el-button type="primary" @click="onHandleSearch">搜索</el-button></el-form-item>
					</el-form>
				</div>
				<div class="end"><el-button type="primary" @click="onHandleListCreate">新增工程</el-button></div>
			</div>
			<!-- 表格 -->
			<div class="globalTable">
				<dse-table-width-pagination :current-page="pagination.current" :total-num="pagination.total" @goto_page="onHandleGotoPage">
					<thead>
						<tr>
							<th v-for="(item, key) in columns" :key="key">
								<span>{{ item.label }}</span>
							</th>
							<th><span>操作</span></th>
						</tr>
					</thead>
					<tbody>
						<template v-if="list && list[0]">
							<tr v-for="(item, key) in list" :key="key">
								<td>
									<span>{{ (pagination.current - 1) * 10 + key + 1 }}</span>
								</td>
								<td>
									<span>{{ item.prnm }}</span>
								</td>
								<td>
									<span>{{ item.cwsnm }}</span>
								</td>
								<td>
									<span>{{ item.lgtd }}</span>
								</td>
								<td>
									<span>{{ item.lttd }}</span>
								</td>
								<td>
									<span>{{ item.prtypenm }}</span>
								</td>
								<td>
									<span>{{ item.runCondnm }}</span>
								</td>
								<td>
									<span>{{ item.compym }}</span>
								</td>
								<td>
									<span>{{ item.gldw }}</span>
								</td>
								<td>
									<span>{{ item.loc }}</span>
								</td>
								<td class="btns">
									<span @click="onHandleListEdit(item)">编辑</span>
									<span @click="onHandleListRemove(item)">删除</span>
								</td>
							</tr>
						</template>
						<template v-else>
							<tr>
								<td colspan="11"><span style="line-height: 30px">暂时没有数据~~</span></td>
							</tr>
						</template>
					</tbody>
				</dse-table-width-pagination>
				<!-- <el-table :data="list" size="mini" border stripe v-loading="loading">
					<el-table-column v-for="(item, key) in columns" :key="key" :prop="item.name" :label="item.label" :width="item.width" align="center"></el-table-column>
					<el-table-column align="center" label="操作" width="100" class="end">
						<template slot-scope="scope">
							<a href="JavaScript:void(0)" @click="onHandleListEdit(scope.row)">修改</a>
							<a href="JavaScript:void(0)" @click="onHandleListRemove(scope.row)">删除</a>
						</template>
					</el-table-column>
				</el-table> -->
			</div>
			<!-- 分页 -->
			<!-- <div class="globalPagination">
				<el-pagination
					@size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange"
					:current-page="pagination.current"
					:page-sizes="pagination.pageSizes"
					:page-size="pagination.pageSize"
					:total="pagination.total"
					layout="total, sizes, prev, pager, next, jumper"
				></el-pagination>
			</div> -->
		</div>

		<!-- 二次确认删除 -->
		<dse-save-status :showModel="confirm.visible" @delThis="onHandleConfirmCancel" @sureDelThis="onHandleConfirmSubmit" />
	</div>
</template>

<script>
import DseSaveStatus from '../../../common/components/toast/DseSaveStatus';
import {
	// 获取分区列表
	getDictListByValues,
	// 接口为本地测试接口
	getGcglList,
	// 删除工程信息
	destoryGcgl,
	// 获取所有工程列表
	getWrCwsBList
} from '../../../api/interfaces/system_api';
import DseTableWidthPagination from '../../../common/components/dseTableWidthPagination';

const PROFILE_NAME = 'systemEngineeringModify';
// const PROFILE_NAME = '/system/engineering/modify';

export default {
	components: {
		DseTableWidthPagination,
		DseSaveStatus
	},
	data() {
		return {
			searchData: {
				keywords: '',
				prtype: ''
			},
			prtypeList: [],
			pagination: {
				current: '',
				total: 0
			},
			confirm: {
				visible: false,
				payload: {}
			},
			columns: [],
			list: [],
			loading: true
		};
	},
	methods: {
		onHandleGotoPage(payload = {}) {
			const that = this;

			const { pageNum, pageSize } = payload;
			that.pagination = {
				...that.pagination,
				current: pageNum,
				pageSize
			};

			// 更新工程配置列表
			that._getGcglList();
			// console.warn(e);
		},
		// 搜索当前参数列表
		onHandleSearch() {
			const that = this;

			// 更新工程配置列表
			that._getGcglList();
		},
		// 分页配置
		onHandleSizeChange(pageSize) {
			const that = this;

			that.pagination = {
				...that.pagination,
				pageSize
			};

			// 更新工程配置列表
			that._getGcglList();
		},
		// 分页跳转
		onHandleCurrentChange(current) {
			const that = this;

			that.pagination = {
				...that.pagination,
				current
			};
			// 更新工程配置列表
			that._getGcglList();
		},
		// 新增站点
		onHandleListCreate() {
			const that = this;

			that.$router.push({
				name: PROFILE_NAME,
				params: {
					isEdit: false
				}
			});
			that.$store.commit('set_asideStatus', false);
			that.$emit('hiddenAside');
		},
		// 工程配置列表编辑
		onHandleListEdit(payload = {}) {
			const that = this;

			that.$router.push({
				name: PROFILE_NAME,
				params: {
					...payload,
					isEdit: true
				}
			});
			that.$store.commit('set_asideStatus', false);
			that.$emit('hiddenAside');
		},
		// 工程配置列表删除
		onHandleListRemove(payload = {}) {
			const that = this;

			that.confirm = {
				...that.confirm,
				payload
			};

			// 二次确认展开
			that.onHandleConfirmVisible();
		},
		// 二次确认展开
		onHandleConfirmVisible() {
			const that = this;

			that.confirm = {
				...that.confirm,
				visible: true
			};
		},
		// 二次确认隐藏
		onHandleConfirmCancel() {
			const that = this;

			that.confirm = {
				...that.confirm,
				visible: false
			};
		},
		// 获取工程配置删除
		onHandleConfirmSubmit() {
			const that = this;

			const { list = [], confirm = {} } = that;
			const { payload = {} } = confirm;
			const { prtype = '', prcd = '' } = payload;
			/**
			 * 删除工程信息
			 * @param {prtype}      [false string]    工程类型 [1：水厂 2： 水库 3：泵站 4：蓄水池 5：联户表井]
			 * @param {prcd}        [false string]    工程id
			 */
			const params = { prtype, prcd };
			destoryGcgl(params, that)
				.then((results = {}) => {
					// 二次确认隐藏
					that.onHandleConfirmCancel();

					// 服务器 ajax删除后，本地删除
					that.list = list.filter((item = {}) => {
						if (item.prtype == prtype && item.prcd == prcd) return false;
						return true;
					});
				})
				.catch(e => {
					// 二次确认隐藏
					that.onHandleConfirmCancel();
				});
		},

		_initPrTypeList() {
			const that = this;

			/**
			 * 获取供水工程列表
			 * @param {code}      [false string]    字典代码
			 * 		CWS_TP ：农村供水工程类型
					RUN_COND：运行状况
					PR_TYPE：所属工程类型
					ST_TYPE：监测类型
					ST_JC_TYPE：监测对象
			 */
			const param = {
				code: 'PR_TYPE'
			};
			getDictListByValues(param, that)
				.then(results => {
					const { status, msg, data } = results;

					if (status) {
						that.prtypeList = [...(Array.isArray(data) ? data : [])];
					} else {
						console.error(msg);
					}
				})
				.catch(e => console.error(e));
		},
		// 获取分区
		_initPartitions() {
			const that = this;
			/**
			 * 取分区列表
			 * @param {code}      	[false string]   字典代码
			 */
			const payload = {};
			getWrCwsBList(payload, that)
				.then((results = {}) => {
					const { status, msg, data } = results;

					if (status) {
						const values = Array.isArray(data)
							? data.map((item = {}) => ({
									value: item.cwsCd,
									label: item.cwsNm
							  }))
							: [];

						that.$store.commit('set_partition', values);
					} else {
						console.warn(msg);
					}
				})
				.catch((e = {}) => {
					console.error(e);
				});
		},
		// 获取工程配置列表
		_getGcglList() {
			const that = this;

			const { pagination = {} } = that;
			const { current, pageSize } = pagination;
			const { keywords, prtype } = this.searchData;
			/**
			 * 获取工程配置列表
			 * @param {prtype}      [false string]    工程类型
			 * @param {prnm}        [false string]    工程名称
			 * @param {pageNum}     [true string]    第几页
			 * @param {pageSize}    [true string]    页条数
			 */
			const payload = {
				pageNum: current,
				pageSize,
				prnm: keywords,
				prtype: prtype
			};
			getGcglList(payload, that)
				.then((results = {}) => {
					const { status, data = {} } = results;
					const { pageNum, total, list } = data;

					/*
					loc 			所在地
					prtypenm 		工程类型名称
					prtype 			工程类型
					gldw 			管理单位
					adcd 			所属分区
					lttd 			经度
					adnm 			所属分区名称
					cwsnm 			所属供水工程名称
					prnm 			工程名称
					prcd 			工程编码
					runCondnm 		运行状况：1在用良好，0停用
					lgtd 			纬度
					compym 			建站年月
					deadV 			死库容
					deadZ 			死水位
					totV 			总库容
					frscV 			调洪库容
					dszfl 			设计规模（万方/天）
					desHead 		设计扬程
					dsincp 			装机容量(kW)
					*/

					if (status) {
						that.pagination.current = pageNum;
						that.pagination.total = total;
						const _list = list.map((item = {}) => ({
							...item,
							compym: String(item.compym).slice(0, 4) + '-' + String(item.compym).slice(4, 6),
							// type: item.type === 1 ? '水厂' : item.type === 2 ? '哈哈' : item.type === 0 ? '嘻嘻' : '暂未',
							adnm: item.adnm ? item.adnm : '/',
							runCondnm: item.runCondnm ? '启用' : '停用'
						}));

						that.loading = false;
						that.list = _list;
					}
				})
				.catch(e => {
					console.warn(e);
					that.loading = false;
					that.$message({
						message: e,
						type: 'error'
					});
				});
		},
		_initialization() {
			const that = this;

			// 初始化分页
			that.pagination = {
				total: 10,
				current: 1,
				pageSize: 10,
				pageSizes: [10, 15, 20, 25, 30]
			};

			// 初始化表格导航
			that.columns = [
				{
					name: '_id',
					label: '编码'
				},
				{
					name: 'prnm',
					label: '工程名称'
				},
				{
					name: 'cwsnm',
					label: '所属供水工程'
				},
				{
					name: 'lgtd',
					label: '经度',
					width: '150px'
				},
				{
					name: 'lttd',
					label: '纬度',
					width: '150px'
				},
				{
					name: 'prtypenm',
					label: '站点类型'
				},
				{
					name: 'runCondnm',
					label: '是否启用'
				},
				{
					name: 'compym',
					label: '建站年月'
				},
				{
					name: 'gldw',
					label: '管理单位'
				},
				{
					name: 'loc',
					label: '站址'
				}
			].map((item = {}) => ({
				width: '',
				...item
			}));

			// 初始化工程配置列表
			that._getGcglList();
			// 初始化分区
			that._initPartitions();
		}
	},
	mounted() {
		const that = this;

		// 初始化
		that._initialization();
		//初始化查询下拉框
		that._initPrTypeList();
	}
};
</script>

<style scoped="scoped" lang="scss">


.block {
	/deep/ .el-form-item__label {
		line-height: 30px !important;
	}
}
</style>
