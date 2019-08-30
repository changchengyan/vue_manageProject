<template>
	<div class="history">
		<div class="block">
			<div class="card">
				<div class="globalHandle">
					<el-form :inline="true" class="form">
						<el-form-item label="模糊搜索:"><el-input v-model="data.keyword" placeholder="请输入关键字"></el-input></el-form-item>
						<el-form-item><el-button type="primary" @click="onHandleSearch">搜索</el-button></el-form-item>
						<el-form-item label="事件类型:">
							<el-select v-model="data.incidentValue" placeholder="请选择">
								<el-option v-for="item in data.incidents" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="所属片区:">
							<el-select v-model="data.areaValue" placeholder="请选择">
								<el-option v-for="item in data.areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<div class="end"><el-button type="primary" @click="onHanldeCreate">新增</el-button></div>
				</div>
				<div class="table">
					<el-table :data="list" border size="mini">
						<el-table-column prop="a" align="center" label="序号"></el-table-column>
						<el-table-column prop="b" align="center" label="应急事件名称"></el-table-column>
						<el-table-column prop="c" align="center" label="事件类型"></el-table-column>
						<el-table-column prop="d" align="center" label="所属片区"></el-table-column>
						<el-table-column prop="e" align="center" label="所属行政区域"></el-table-column>
						<el-table-column prop="f" align="center" label="填报单位"></el-table-column>
						<el-table-column prop="g" align="center" label="状态"></el-table-column>
						<el-table-column prop="h" align="center" label="时间"></el-table-column>
						<el-table-column prop="i" align="center" label="是否典型案例"></el-table-column>
						<el-table-column prop="j" align="center" label="操作">
							<template slot-scope="scope">
								<a v-if="true" href="JavaScript:void(0)" @click="onHandleListModify(scope.row)">处理</a>
								<a v-else href="JavaScript:void(0)" @click="onHandleListRemove(scope.row)">查看</a>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="globalPagination">
					<el-pagination
							@size-change="onHandleSizeChange"
							@current-change="onHandleCurrentChange"
							:current-page="data.current"
							:page-sizes="paginationGroups"
							:page-size="data.pageSize"
							:total="data.total"
							layout="total, sizes, prev, pager, next, jumper"
					></el-pagination>
				</div>
			</div>
		</div>
		<!-- 删除 -->
		<dse-save-status :showModel="confirm.visible" @delThis="onHandleConfirmCancel" @sureDelThis="onHandleConfirmSubmit" />
	</div>
</template>

<script>
import DseSaveStatus from '../../../common/components/toast/DseSaveStatus';

const paginationGroups = [10, 20, 30, 40];
const pagination = {
	total: 5,
	current: 1,
	pageSize: 10
};

export default {
	components: {
		DseSaveStatus
	},
	data() {
		return {
			paginationGroups,
			data: {
				...pagination,
				incidentValue: '0',
				incidents: [
					{
						id: 0,
						label: '全部',
						value: '0'
					},
					{
						id: 1,
						label: '水质超标',
						value: '1'
					},
					{
						id: 2,
						label: '爆管事件',
						value: '2'
					},
					{
						id: 3,
						label: '爆管事件',
						value: '3'
					}
				],
				areaValue: '0',
				areas: [
					{
						id: 0,
						label: '全部',
						value: '0'
					},
					{
						id: 1,
						label: '西部片区',
						value: '1'
					},
					{
						id: 2,
						label: '东部片区',
						value: '2'
					},
					{
						id: 3,
						label: '东部片区',
						value: '3'
					}
				],
				companyValue: '1',
				companies: [
					{
						id: 1,
						label: '东部净水厂',
						value: '1'
					},
					{
						id: 2,
						label: '窑山扩建净水厂',
						value: '2'
					},
					{
						id: 3,
						label: '王团扩建净水厂',
						value: '3'
					},
					{
						id: 4,
						label: '小洪沟净化水厂',
						value: '4'
					}
				],
				date: '2019-08-05 09:11'
			},
			// list: Array.from(new Array(10)).map(it => ({
			// 	a: 'PH',
			// 	b: '2019-05-11 21：20',
			// 	c: '报警消息，压力监测点、1号监测点，当前监测值0.5MPa正常返回0.2-0.4MPa',
			// 	d: '2019-05-12 22：20',
			// })),
			list: [
				{
					a: '1',
					b: '同心县人民政府',
					c: '水质超标',
					d: '西部片区',
					e: '丁塘镇',
					f: '西部片区管理单位',
					g: '已上报',
					h: '2019-7-15',
					i: '是'
				},
				{
					a: '2',
					b: '河西镇水质超标事件',
					c: '爆管事件',
					d: '东部片区',
					e: '河西镇',
					f: '东部片区管理单位',
					g: '处理中',
					h: '2019-5-2',
					i: '否'
				},
				{
					a: '3',
					b: '河西镇爆管事件',
					c: '爆管事件',
					d: '东部片区',
					e: '河西镇',
					f: '东部片区管理单位',
					g: '完成',
					h: '2019-4-2',
					i: '是'
				}
			],
			confirm: {
				visible: false,
				payload: {}
			}
		};
	},
	methods: {
		onHandleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		onHandleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		onHandleSearch() {
			const that = this;

			that.$message.success('报警信息导出成功~');
			console.log('onHandleSearch!');
		},
		onHanldeCreate() {
			const that = this;

			// that.$message.success('报警信息导出成功~');
			// console.log('onHanldeExport!');
			that.onHandleListModify();
		},
		onHandleListModify(params = {}) {
			const that = this;

			that.$router.push({
				name: 'emergencyIncidentModify',
				params
			});
			that.$store.commit('set_asideStatus', false);
			that.$emit('hiddenAside');
		},
		onHandleListProfile() {
			const that = this;

			const params = {};
			that.$router.push({
				name: 'materialDeviceProfile',
				params
			});
			that.$store.commit('set_asideStatus', false);
			that.$emit('hiddenAside');
		},
		onHandleListOut() {},
		onHandleListIn() {},
		onHandleListRemove() {
			const that = this;

			that.onHandleConfirmVisible();
		},
		onHandleConfirmSubmit() {
			const that = this;
			const { tabIndex = 0, tabsList = [], confirm = {} } = that;
			const { payload = {} } = confirm;
			const { id = '' } = payload;

			that.tabsList[tabIndex].list = tabsList[tabIndex].list.filter((item = {}) => item.id !== id);

			that.onHandleConfirmCancel();
		},
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
		}
	}
};
</script>

<style scoped="scoped" lang="scss">
.history {
	width: 100%;
	height: 100%;
	overflow-y: auto;
	background-color: #fff;

	/deep/ .el-table th {
		color: #333;
		background-color: #eee !important;
	}

	/deep/ .el-form--inline {
		* {
			vertical-align: middle;
			line-height: initial !important;
		}
	}

	/deep/ .el-date-editor .el-range-separator {
		width: auto;
	}

	/deep/ .el-button {
		line-height: initial !important;
	}

	/deep/ .el-form-item {
		margin-bottom: 0;
	}

	/deep/ .table-wrap {
		border: none !important;
	}

	.globalHandle {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;

		padding: 16px;
	}

	.table {
		padding: 16px;
		padding-top: 0;

		a {
			text-decoration: none;
			color: #187cea;

			+ a {
				margin-left: 8px;
			}
		}
	}
}
</style>
