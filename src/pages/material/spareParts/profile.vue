<template>
	<div class="data">
		<div class="handleBack">
			<div class="back"><span class="go-back" @click="onHandleBack">返回</span></div>
		</div>

		<div class="tab">
			<ul class="row">
				<li v-for="(item, key) in tabs" :key="key" class="col" :class="tabIndex === key && 'active'" @click="onHandleTabChange(key)">
					<a href="JavaScript:void(0)">{{ item }}</a>
				</li>
			</ul>
		</div>

		<div v-show="tabIndex === 0" class="article">
			<div class="table">
				<div class="fnTable">
					<ul class="row">
						<li v-for="(item, key) in tabsList[tabIndex].list" :key="key" class="col">
							<template v-if="item.type === 1">
								<a href="JavaScript:void(0)">
									<span class="label">{{ item.label }}</span>
									<el-select v-model="item.value" :placeholder="item.placeholder">
										<el-option v-for="(it, k) in item.children" :key="k" :value="it.value" :label="it.label" />
									</el-select>
								</a>
							</template>
							<template v-else>
								<a href="JavaScript:void(0)">
									<span class="label">{{ item.label }}</span>
									<el-input v-model="item.value" :placeholder="item.placeholder" type="text" />
								</a>
							</template>
						</li>
					</ul>
				</div>
			</div>

			<div class="globalPagination">
				<el-pagination
					@size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange"
					:current-page="tabsList[tabIndex].current"
					:page-sizes="paginationGroups"
					:page-size="tabsList[tabIndex].pageSize"
					:total="tabsList[tabIndex].total"
					layout="total, sizes, prev, pager, next, jumper"
				></el-pagination>
			</div>
		</div>

		<div v-show="tabIndex === 1" class="article">
			<div class="table">
				<el-table :data="tabsList[tabIndex].list" size="mini">
					<el-table-column prop="a" align="center" label="备件单号" width="80"></el-table-column>
					<el-table-column prop="b" align="center" label="备件名称"></el-table-column>
					<el-table-column prop="c" align="center" label="备件型号"></el-table-column>
					<el-table-column prop="d" align="center" label="时间"></el-table-column>
					<el-table-column prop="e" align="center" label="类型"></el-table-column>
					<el-table-column prop="f" align="center" label="出入库数量"></el-table-column>
					<el-table-column prop="g" align="center" label="期末库存"></el-table-column>
					<el-table-column prop="g" align="center" label="操作人"></el-table-column>
				</el-table>
			</div>

			<div class="globalPagination">
				<el-pagination
					@size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange"
					:current-page="tabsList[tabIndex].current"
					:page-sizes="paginationGroups"
					:page-size="tabsList[tabIndex].pageSize"
					:total="tabsList[tabIndex].total"
					layout="total, sizes, prev, pager, next, jumper"
				></el-pagination>
			</div>
		</div>

		<div v-show="tabIndex === 2" class="article">
			<div class="table">
				<el-table :data="tabsList[tabIndex].list" size="mini">
					<el-table-column prop="a" align="center" label="设备名称" width="80"></el-table-column>
					<el-table-column prop="b" align="center" label="设备编号"></el-table-column>
					<el-table-column prop="c" align="center" label="设备型号"></el-table-column>
					<el-table-column prop="d" align="center" label="设备类型"></el-table-column>
					<el-table-column prop="e" align="center" label="所属水厂"></el-table-column>
					<el-table-column prop="f" align="center" label="安装地点"></el-table-column>
					<el-table-column prop="g" align="center" label="生产厂商"></el-table-column>
					<el-table-column prop="h" align="center" label="责任人"></el-table-column>
				</el-table>
			</div>

			<div class="globalPagination">
				<el-pagination
					@size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange"
					:current-page="tabsList[tabIndex].current"
					:page-sizes="paginationGroups"
					:page-size="tabsList[tabIndex].pageSize"
					:total="tabsList[tabIndex].total"
					layout="total, sizes, prev, pager, next, jumper"
				></el-pagination>
			</div>
		</div>

		<div v-show="tabIndex === 3" class="article">
			<div class="table">
				<el-table :data="tabsList[tabIndex].list" size="mini">
					<el-table-column prop="a" align="center" label="序号" width="80"></el-table-column>
					<el-table-column prop="b" align="center" label="文件名"></el-table-column>
					<el-table-column prop="c" align="center" label="上传时间"></el-table-column>
					<el-table-column prop="d" align="center" label="文件大小(m)"></el-table-column>
					<el-table-column prop="e" align="center" label="操作"></el-table-column>
				</el-table>
			</div>

			<div class="globalPagination">
				<el-pagination
					@size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange"
					:current-page="tabsList[tabIndex].current"
					:page-sizes="paginationGroups"
					:page-size="tabsList[tabIndex].pageSize"
					:total="tabsList[tabIndex].total"
					layout="total, sizes, prev, pager, next, jumper"
				></el-pagination>
			</div>
		</div>

		<div v-show="tabIndex === 4" class="article">图片</div>

		<div v-show="tabIndex === 5" class="article">图片</div>

		<div v-show="tabIndex === 6" class="article">图片</div>

		<!-- 删除 -->
		<dse-save-status :showModel="confirm.visible" @delThis="onHandleConfirmCancel" @sureDelThis="onHandleConfirmSubmit" />
	</div>
</template>

<script>
import DseSaveStatus from '../../../common/components/toast/DseSaveStatus';

const list = Array.from(new Array(3)).map((it = {}, key) => ({
	id: key,
	a: key + 1,
	b: '三聚和额水厂',
	c: '2019-05-12 22：20',
	d: '/',
	e: '/',
	f: '/',
	g: '/',
	h: '/',
	i: '/',
	j: '/',
	k: '/'
}));

const pagination = {
	total: 10,
	current: 1,
	pageSize: 100
};

const paginationGroups = [10, 20, 30];

export default {
	components: {
		DseSaveStatus
	},
	data() {
		return {
			paginationGroups,

			tabIndex: 0,
			tabs: ['基本信息', '出入库记录', '关联设备', '关联文档', '备件图片'],
			tabsList: [
				{
					...pagination,

					keyword: '',

					list: [
						{
							label: '设备名称',
							value: '座椅靠背'
						},
						{
							label: '设备编号',
							value: '4345345'
						},
						{
							label: '设备类型',
							value: '1',
							type: 1,
							children: [
								{
									label: '机械类',
									value: '1'
								}
							]
						},
						{
							label: '规格型号',
							value: 'sdf'
						},
						{
							label: '所属仓库',
							value: 'asdasdaasdasd'
						},
						{
							label: '责任人',
							value: '王建军'
						},
						{
							label: '生产厂家',
							value: '大股东身份'
						},
						{
							label: '数量',
							value: '12'
						},
						{
							label: '计数单位',
							value: '个'
						},
						{
							label: '库存下限',
							value: '1',
						},
						{
							label: '库存上限',
							value: '100'
						}
					].map((item = {}) => ({
						type: 0,
						children: [],
						placeholder: `${item.type ? '请选择' : '请输入'}${item.label}`,
						...item
					}))
				},
				{
					...pagination,

					keyword: '',

					list
				},
				{
					...pagination,

					keyword: '',

					list
				},
				{
					...pagination,

					keyword: '',

					list
				},
				{
					...pagination,

					keyword: '',

					list
				},
				{
					...pagination,

					keyword: '',

					list
				},
				{
					...pagination,

					keyword: '',

					list
				}
			],
			confirm: {
				visible: false,
				payload: {}
			}
		};
	},
	methods: {
		onHandleBack() {
			const that = this;

			that.$router.push({
				name: 'materialDevice'
			});
			that.$store.commit('set_asideStatus', true);
			that.$emit('showAside');
		},
		onHandleTabChange(tabIndex = 0) {
			const that = this;

			that.tabIndex = tabIndex;
		},
		onHandleExport() {
			console.warn(123);
		},
		onHandleSearch() {
			const that = this;
			const { tabIndex = 0, tabsList = [] } = that;

			const { keyword = '' } = tabsList[tabIndex];

			that.tabsList[tabIndex].list = tabsList[tabIndex].list.filter((item = {}) => item.id == keyword);

			console.warn(keyword, 'onHandleSearch', 123);
		},
		onHandleListEdit(params = {}) {
			const that = this;

			that.$router.push({
				name: 'systemMonitorModify',
				params
			});
			that.$store.commit('set_asideStatus', false);
			that.$emit('hiddenAside');
		},
		onHandleListRemove(payload = {}) {
			const that = this;

			that.confirm = {
				...that.confirm,
				payload
			};

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
		},
		onHandleSizeChange() {},
		onHandleCurrentChange() {}
	}
};
</script>

<style scoped="scoped" lang="scss">
.handleBack {
	position: relative;
	width: 100%;
	height: 50px;
	padding: 10px 10px;
	background-color: #fff;
	box-shadow: 3px 5px 15px rgba(0, 0, 0, 0.1);

	.back {
		width: 80px;
		height: 30px;
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 10;
		text-align: center;
	}
}

.data {
	width: 100%;
	height: 100%;
	max-height: 100%;
	background-color: #fff;
}

.article {
	.handle,
	.table {
		padding: 16px;
	}

	.chart {
		position: relative;
		width: 100%;
		height: 300px;
		padding-right: 24px;
		padding-left: 24px;

		.category {
			width: 1500px;
			height: 100%;
		}
	}

	.table {
		/deep/ .el-table th {
			background-color: #f0f1f1;
			color: #333;
		}

		.fnTable {
			width: 100%;
			margin-top: 24px;
			border-top: 1px solid #eee;
			border-left: 1px solid #eee;

			* {
				box-sizing: border-box;
			}

			.row {
				list-style: none;

				width: 100%;
				margin-top: 0;
				margin-bottom: 0;
				padding-left: 0;
				font-size: 0;

				.col {
					display: inline-block;
					width: 50%;
					font-size: 14px;

					a {
						display: flex;
						align-items: center;
						justify-content: space-between;

						border-right: 1px solid #eee;
						border-bottom: 1px solid #eee;

						.label {
							display: block;
							width: 150px;
							height: 100%;
							padding: 8px;
							color: #333;
							text-align: center;
							background-color: #d6fafa;
						}

						// .input {
						// 	flex: 1;
						// 	padding: 8px 10px;
						// 	border: none;
						// 	outline: none;
						// }

						/deep/ .el-select {
							width: 100%;
						}

						/deep/ .el-input__inner {
							// flex: 1;
							// width: 430px !important;
							border: none;
						}
					}
				}
			}
		}

		a {
			text-decoration: none;
			color: #187cea;

			+ a {
				margin-left: 8px;
			}
		}
	}
}

.article,
.handle,
.table,
.tab {
	max-width: 1200px;
	margin: auto;
}

.tab {
	padding-top: 8px;
	padding-right: 16px;
	padding-left: 16px;

	.row {
		display: flex;

		list-style: none;
		margin-top: 0;
		margin-bottom: 0;
		padding-left: 0;
		list-style: none;

		border-bottom: 1px solid #e7e6e6;

		.col {
			padding-right: 16px;
			padding-left: 16px;

			a {
				list-style: none;
				text-decoration: none;

				display: block;
				padding-top: 8px;
				padding-bottom: 8px;

				color: #7796bb;
				cursor: pointer;
			}

			&.active {
				a {
					color: #187cea;
					font-weight: bold;
					border-bottom: 1px solid #187cea;
				}
			}
		}
	}
}
</style>
