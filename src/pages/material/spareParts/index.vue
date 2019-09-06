<template>
	<div class="history">
		<div class="block">
			<div class="card">
				<div class="globalHandle">
					<el-form :inline="true" class="form">
						<el-form-item label="备件名称:"><el-input v-model="data.keyword" placeholder="请输入关键字"></el-input></el-form-item>
						<el-form-item><el-button type="primary" @click="onHandleSearch">搜索</el-button></el-form-item>
						<el-form-item label="时间:">
							<el-date-picker v-model="data.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
						</el-form-item>
					</el-form>
					<div class="end"><el-button type="primary" @click="onHanldeCreate">新增</el-button></div>
				</div>
				<div class="table">
					<el-table :data="list" border size="mini">
						<el-table-column prop="a" align="center" label="备件名称"></el-table-column>
						<el-table-column prop="b" align="center" label="规格型号"></el-table-column>
						<el-table-column prop="c" align="center" label="备件类型"></el-table-column>
						<el-table-column prop="d" align="center" label="生产厂家"></el-table-column>
						<el-table-column prop="e" align="center" label="计数单位"></el-table-column>
						<el-table-column prop="f" align="center" label="数量"></el-table-column>
						<el-table-column prop="g" align="center" label="所属仓库"></el-table-column>
						<el-table-column prop="h" align="center" label="详情">
							<template slot-scope="scope">
								<a href="JavaScript:void(0)" @click="onHandleListProfile(scope.row)">详情</a>
							</template>
						</el-table-column>
						<el-table-column prop="i" align="center" label="编辑">
							<template slot-scope="scope">
								<a href="JavaScript:void(0)" @click="onHandleListModify(scope.row)">修改</a>
								<a href="JavaScript:void(0)" @click="onHandleListRemove(scope.row)">删除</a>
							</template>
						</el-table-column>
						<el-table-column prop="j" align="center" label="操作">
							<template slot-scope="scope">
								<a href="JavaScript:void(0)" @click="onHandleListExport(scope.row)">出库</a>
								<a href="JavaScript:void(0)" @click="onHandleListImport(scope.row)">入库</a>
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
		<!-- 入库 -->
		<dse-normal-model :tips="modelImport.title" :modelFlag="modelImport.visible" :onHandleModelClose="onHandleModelImportClose" class="fnModel">
			<div class="fnTable">
				<ul class="row">
					<li v-for="(item, key) in modelImportList" :key="key" class="col">
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
		</dse-normal-model>

		<!-- 出库 -->
		<dse-normal-model :tips="modelExport.title" :modelFlag="modelExport.visible" :onHandleModelClose="onHandleModelExportClose" class="fnModel">
			<div class="fnTable">
				<ul class="row">
					<li v-for="(item, key) in modelExportList" :key="key" class="col">
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
		</dse-normal-model>

		<!-- 删除 -->
		<dse-save-status :showModel="confirm.visible" @delThis="onHandleConfirmCancel" @sureDelThis="onHandleConfirmSubmit" />
	</div>
</template>

<script>
import dseNormalModel from '../../../common/components/toast/DseNormalModel';
import DseSaveStatus from '../../../common/components/toast/DseSaveStatus';
import modelExportList from './data/modelExportList';
import modelImportList from './data/modelImportList';

const paginationGroups = [10, 20, 30, 40];
const pagination = {
	total: 5,
	current: 1,
	pageSize: 10
};

export default {
	components: {
		dseNormalModel,
		DseSaveStatus
	},
	data() {
		return {
			paginationGroups,
			data: {
				...pagination,
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
					a: '座椅靠背',
					b: 'sdf',
					c: '机械类',
					d: '大股东身份',
					e: '个',
					f: '12',
					g: '南郊一仓库'
				},
				{
					a: '圆盘蝶阀',
					b: 'DN300 PN=1.0MPa',
					c: '机械类',
					d: '天津塘沽第一阀门厂',
					e: '个',
					f: '12',
					g: '南郊一仓库'
				},
				{
					a: '液位计',
					b: 'CS26',
					c: '零件类',
					d: '山东淄博先行测控',
					e: '个',
					f: '50',
					g: '六盘山水务公司总仓'
				}
			],
			modelExportList: modelExportList.map((item = {}) => ({
				type: 0,
				children: [],
				placeholder: `${item.type ? '请选择' : '请输入'}${item.label}`,
				...item
			})),
			modelImportList: modelImportList.map((item = {}) => ({
				type: 0,
				children: [],
				placeholder: `${item.type ? '请选择' : '请输入'}${item.label}`,
				...item
			})),
			confirm: {
				visible: false,
				payload: {}
			},
			modelImport: {
				visible: false,
				title: '入库'
			},
			modelExport: {
				visible: false,
				title: '出库'
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
		onHandlePage() {
			console.warn(123);
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
				name: 'materialSparePartsModify',
				params
			});
			that.$store.commit('set_asideStatus', false);
			that.$emit('hiddenAside');
		},
		onHandleListProfile() {
			const that = this;

			const params = {};
			that.$router.push({
				name: 'materialSparePartsProfile',
				params
			});
			that.$store.commit('set_asideStatus', false);
			that.$emit('hiddenAside');
		},
		onHandleListExport() {
			const that = this;

			console.warn('onHandleListExport');

			that.modelExport = {
				...that.modelExport,
				visible: true
			};
		},
		onHandleListImport() {
			const that = this;

			console.warn('onHandleListImport');

			that.modelImport = {
				...that.modelImport,
				visible: true
			};
		},
		onHandleModelExportClose() {
			const that = this;

			that.modelExport = {
				...that.modelExport,
				visible: false
			};
		},
		onHandleModelImportClose() {
			const that = this;

			that.modelImport = {
				...that.modelImport,
				visible: false
			};
		},
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

	.fnModel {
		/deep/ .model {
			width: 950px !important;
			height: auto !important;
			margin-left: -475px !important;
		}

		/deep/ .main-content {
			padding: 24px;
		}
	}

	.fnTable {
		width: 100%;
		// border-top: 1px solid #eee;
		// border-left: 1px solid #eee;
		border: 1px solid #eee;
		border-bottom: none;

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
					text-decoration: none;

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
}
</style>
