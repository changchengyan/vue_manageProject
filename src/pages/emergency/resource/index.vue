<template>
	<div class="data">

		<div class="block">
			<div class="card">
				<div class="tab">
					<ul class="row">
						<li v-for="(item, key) in tabs" :key="key" class="col" :class="tabIndex === key && 'active' " @click="onHandleTabChange(key)">
							<a href="JavaScript:void(0)">{{ item }}</a>
						</li>
					</ul>
				</div>
				<div v-show="tabIndex === 0" class="article">
					<div class="table">
						<el-table :data="tabsList[tabIndex].list" border size="mini">
							<el-table-column prop="a" align="center" label="序号" width="180">
							</el-table-column>
							<el-table-column prop="b" align="center" label="应急预案名称">
							</el-table-column>
							<el-table-column prop="c" align="center" label="上传时间">
							</el-table-column>
							<el-table-column align="center" label="操作" width="150" class="end">
								<template slot-scope="scope">
									<a href="JavaScript:void(0)" @click="onHandleListRemove(scope.row)">删除</a>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
				<div v-show="tabIndex === 1" class="article">
					<div class="handle">
						<el-form :inline="true" class="form">
							<!-- <el-form-item label="所属片区:">
                                <el-select v-model="tabsList[tabIndex].areaValue" placeholder="请选择">
                                    <el-option v-for="item in tabsList[tabIndex].areas" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item> -->
							<el-form-item label="机构名称或责任人:">
								<el-input v-model="tabsList[tabIndex].personLiable" placeholder="请输入关键字"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="onHandleExport">搜索</el-button>
								<el-button type="primary" @click="onHandleExport">下载模板</el-button>
								<el-button type="primary" @click="onHandleExport">导入</el-button>
								<el-button type="primary" @click="onHandleExport">新增</el-button>
							</el-form-item>
						</el-form>
						<div class="end">
							<el-button type="primary" @click="onHandleExport">导出</el-button>
						</div>
					</div>

					<div class="table">
						<el-table :data="tabsList[tabIndex].list" border size="mini">
							<el-table-column prop="a" align="center" label="机构名称" width="180">
							</el-table-column>
							<el-table-column prop="b" align="center" label="机构职责">
							</el-table-column>
							<el-table-column prop="c" align="center" label="责任人">
							</el-table-column>
							<el-table-column prop="d" align="center" label="公司电话">
							</el-table-column>
							<el-table-column prop="e" align="center" label="联系电话">
							</el-table-column>
							<el-table-column align="center" label="操作" width="150" class="end">
								<template slot-scope="scope">
									<!-- <a href="JavaScript:void(0)" @click="onHandleListModify(scope.row)">查看</a> -->
									<a href="JavaScript:void(0)" @click="onHandleListModify(scope.row)">编辑</a>
									<a href="JavaScript:void(0)" @click="onHandleListRemove(scope.row)">删除</a>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
				<div v-show="tabIndex === 2" class="article">
					<div class="handle">
						<el-form :inline="true" class="form">
							<el-form-item label="所属级别:">
								<el-select v-model="tabsList[tabIndex].gradeValue" placeholder="请选择">
									<el-option v-for="item in tabsList[tabIndex].grades" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="专家姓名活专业特长:">
								<el-input v-model="tabsList[tabIndex].personLiable" placeholder="请输入关键字"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="onHandleExport">搜索</el-button>
								<el-button type="primary" @click="onHandleExport">下载模板</el-button>
								<el-button type="primary" @click="onHandleExport">导入</el-button>
								<el-button type="primary" @click="onHandleExport">新增</el-button>
							</el-form-item>
						</el-form>
					</div>

					<div class="table">
						<el-table :data="tabsList[tabIndex].list" border size="mini">
							<el-table-column prop="a" align="center" label="专家姓名" width="180">
							</el-table-column>
							<el-table-column prop="b" align="center" label="所属级别">
							</el-table-column>
							<el-table-column prop="c" align="center" label="单位">
							</el-table-column>
							<el-table-column prop="d" align="center" label="职称">
							</el-table-column>
							<el-table-column prop="e" align="center" label="专业特长">
							</el-table-column>
							<el-table-column prop="f" align="center" label="联系电话">
							</el-table-column>
							<el-table-column align="center" label="操作" width="150" class="end">
								<template slot-scope="scope">
									<!-- <a href="JavaScript:void(0)" @click="onHandleListModify(scope.row)">查看</a> -->
									<!-- <a href="JavaScript:void(0)" @click="onHandleListModify(scope.row)">编辑</a> -->
									<a href="JavaScript:void(0)" @click="onHandleListRemove(scope.row)">删除</a>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>
		</div>

		<!-- 删除 -->
		<dse-save-status :showModel="confirm.visible" @delThis="onHandleConfirmCancel" @sureDelThis="onHandleConfirmSubmit" />
	</div>
</template>

<script>
	import DseSaveStatus from '../../../common/components/toast/DseSaveStatus';

	const pagination = {
		total: 10,
		current: 1,
		pageSize: 10,
	};
	const paginationGroup = [10, 20, 30];

	export default {
		components: {
			DseSaveStatus,
		},
		data() {
			return {
				paginationGroup,
				tabIndex: 0,
				tabs: ['应急预案管理', '应急机构管理', '应急专家管理'],
				tabsList: [{
					...pagination,

					list: [{
							a: '1',
							b: '同心县反恐应急预案',
							c: '2019-7-15',
						}, {
							a: '2',
							b: '同心县防投毒应急预案',
							c: '2019-7-14',
						}, {
							a: '3',
							b: '同心县氯气泄漏应急抢险预案',
							c: '2019-7-12',
						}, {
							a: '4',
							b: '同心县破坏性地震应急预案',
							c: '2019-7-12',
							d: '查看 删除',
						},

						{
							a: '5',
							b: '同心县消防安全应急预案',
							c: '2019-7-12',
							d: '查看 删除',
						},

						{
							a: '6',
							b: '同心县防汛应急预案',
							c: '2019-7-12',
						},

						{
							a: '7',
							b: '同心县雨雪冰冻应急预案',
							c: '2019-7-12',
						},

						{
							a: '8',
							b: '同心县环境事件应急预案',
							c: '2019-7-12',
						},

						{
							a: '9',
							b: '同心县供水系统重大事故应急预案',
							c: '2019-7-12',
						},

						{
							a: '10',
							b: '同心县停电应急预案',
							c: '2019-7-12',
						},

						{
							a: '11',
							b: '同心县水源地突发事件应急预案',
							c: '2019-7-12',
						},
					]
				}, {
					...pagination,

					areaValue: '1',
					areas: [{
						id: 1,
						label: '西部片区',
						value: '1',
					}, {
						id: 2,
						label: '东部片区',
						value: '2',
					}, {
						id: 3,
						label: '东部片区',
						value: '3',
					}],
					personLiable: '',
					list: [{
						a: '1',
						b: '同心县人民政府',
						c: '王金',
						d: '0712-7896543',
						e: '15693256981',
					}]
				}, {
					...pagination,

					gradeValue: '1',
					grades: [{
						id: 1,
						label: '省级应急专业',
						value: '1',
					}, {
						id: 2,
						label: '国家级应急专家',
						value: '2',
					}, {
						id: 3,
						label: '实际应急专家',
						value: '3',
					}],
					list: [{
						a: '边归国',
						b: '省级应急专家',
						c: '省环保厅',
						d: '高工',
						e: '危化品处理',
						f: '13809549636'
					}]
				}, ],
				confirm: {
					visible: false,
					payload: {}
				}
			};
		},
		mounted() {
			const that = this;

			that.$nextTick(() => {
				that.onHandleTabChange(0);
			});
		},
		methods: {
			onHandleTabChange(tabIndex = 0) {
				const that = this;
				that.tabIndex = tabIndex;
			},
			_search() {

			},
			onHandleExport() {
				console.warn(123);
			},
			onHandleSearch() {
				console.warn('onHandleSearch', 123);
			},
			onHandleListModify(params = {}) {
				// const that = this;
				//
				// that.$router.push({
				// 	name: 'emergencyResourceModify',
				// 	params
				// });
				// that.$store.commit('set_asideStatus', false);
				// that.$emit('hiddenAside');
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
				const {
					list = [], confirm = {}
				} = that;
				const {
					payload = {}
				} = confirm;
				const {
					id = ''
				} = payload;

				that.list = list.filter((item = {}) => (item.id !== id));

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
		},
	};
</script>

<style scoped="scoped" lang="scss">
	.data {
		width: 100%;
		height: 100%;
		background-color: #fff;
		overflow-y: auto;
	}

	.article {

		.handle,
		.table {
			padding: 16px;
		}

		.handle {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 0;

			/deep/ .el-form--inline {
				* {
					vertical-align: middle;
					line-height: initial !important;
				}
			}

			/deep/ .el-date-editor .el-range-separator {
				width: auto;
			}

			.el-form-item {
				margin-bottom: 0;
			}
		}

		.table {
			padding: 16px;

			/deep/ .el-table th {
				background-color: #f0f1f1;
				color: #333;
			}

			a {
				text-decoration: none;
				color: #187CEA;

				+a {
					margin-left: 8px;
				}
			}
		}
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

			border-bottom: 1px solid #E7E6E6;

			.col {
				padding-right: 16px;
				padding-left: 16px;

				a {
					list-style: none;
					text-decoration: none;

					display: block;
					padding-top: 8px;
					padding-bottom: 8px;

					color: #7796BB;
					cursor: pointer;
				}

				&.active {
					a {
						color: #187CEA;
						font-weight: bold;
						border-bottom: 1px solid #187CEA;
					}
				}
			}
		}
	}
</style>
