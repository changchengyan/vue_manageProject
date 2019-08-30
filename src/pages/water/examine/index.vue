<template>
	<div class="data">
		<Tab :tabs="tabs" @onHandleTabChange="onHandleTabChange" style="padding-top: 8px;" />
		<!-- <div class="tab">
			<ul class="row">
				<li v-for="(item, key) in tabs" :key="key" class="col" :class="tabIndex === key && 'active'" @click="onHandleTabChange(key)">
					<a href="JavaScript:void(0)">{{ item }}</a>
				</li>
			</ul>
		</div> -->

		<div v-show="tabIndex === 0" class="article">
			<div class="handle">
				<el-form :inline="true" class="form"></el-form>
				<div class="end">
					<el-button type="primary" @click="onHandleCreate">新增</el-button>
				</div>
			</div>

			<div class="table">
				<el-table :data="tabsList[tabIndex].list" border size="mini">
					<el-table-column prop="a" align="center" label="年度" width="80"></el-table-column>
					<el-table-column prop="b" align="center" label="单位名称"></el-table-column>
					<el-table-column prop="c" align="center" label="考核分数"></el-table-column>
					<el-table-column prop="d" align="center" label="考核结果"></el-table-column>
					<el-table-column prop="e" align="center" label="考核日期"></el-table-column>
					<el-table-column prop="f" align="center" label="考核组成员"></el-table-column>
					<el-table-column prop="k" align="center" label="操作">
						<template slot-scope="scope">
							<a href="JavaScript:void(0)" @click="onHandleListModify(scope.row)">修改</a>
							<a href="JavaScript:void(0)" @click="onHandleListRemove(scope.row)">删除</a>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>

		<div v-show="tabIndex === 1" class="article">
			<div class="handle">
				<el-form :inline="true" class="form">
					<el-form-item label="标题:">
						<el-input v-model="tabsList[tabIndex].title" placeholder="请输入标题"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onHandleSearch">搜索</el-button>
					</el-form-item>
					<el-form-item label="发布状态:">
						<el-select v-model="tabsList[tabIndex].status" placeholder="请选择状态">
							<el-option v-for="(it, k) in tabsList[tabIndex].statuses" :key="k" :label="it.label" :value="it.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="时间">
						<el-date-picker v-model="tabsList[tabIndex].date" type="daterange" range-separator="至" start-placeholder="开始日期"
						 end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
				</el-form>
				<div class="end">
					<el-button type="primary" @click="onHandleCreate">新增</el-button>
				</div>
			</div>

			<div class="table">
				<el-table :data="tabsList[tabIndex].list" border size="mini">
					<el-table-column prop="a" align="center" label="标题"></el-table-column>
					<el-table-column prop="b" align="center" label="发布时间"></el-table-column>
					<el-table-column prop="c" align="center" label="发布人"></el-table-column>
					<el-table-column prop="d" align="center" label="状态"></el-table-column>
					<el-table-column prop="k" align="center" label="操作">
						<template slot-scope="scope">
							<a href="JavaScript:void(0)" @click="onHandleListShow(scope.row)">查看</a>
							<a href="JavaScript:void(0)" @click="onHandleListModify(scope.row)">修改</a>
							<a href="JavaScript:void(0)" @click="onHandleListRemove(scope.row)">删除</a>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>

		<!-- 删除 -->
		<dse-save-status :showModel="confirm.visible" @delThis="onHandleConfirmCancel" @sureDelThis="onHandleConfirmSubmit" />
	</div>
</template>

<script>
	import Tab from '../../../common/components/dseTab';
	import DseSaveStatus from '../../../common/components/toast/dseSaveStatus';

	window.tabIndex = 0;

	// 初始化年份
	const nowDate = new Date();
	const startYear = nowDate.getFullYear() - 20;
	const endYear = nowDate.getFullYear();
	const yearList = [];
	for (let i = startYear; i <= endYear; i++) {
		yearList.unshift({
			value: i,
			label: i
		});
	}

	function getNowFormatDate(preDate) {
		const date = preDate ? preDate : new Date();
		const seperator1 = '-';
		const year = date.getFullYear();
		let month = date.getMonth() + 1;
		let strDate = date.getDate();
		if (month >= 1 && month <= 9) month = '0' + month;
		if (strDate >= 0 && strDate <= 9) strDate = '0' + strDate;

		const currentdate = year + seperator1 + month + seperator1 + strDate;
		return currentdate;
	}

	const preFormatDate = getNowFormatDate(new Date(new Date().getTime() - 24 * 60 * 60 * 1000));
	const currentFormatDate = getNowFormatDate();

	const pagination = {
		total: 10,
		current: 1,
		pageSize: 100
	};

	const paginationGroup = [10, 20, 30];

	const list = [{
		a: '2018',
		b: '同心县人民政府',
		c: 94,
		d: '合格',
		e: '2019-4-5',
		f: '王永义、张武',
	}];

	const list1 = [{
			a: '同心县节水型社会建设取得阶段性成效',
			b: '2019-07904  19：15：30',
			c: '同心县水务局',
			d: '已发布',
		},
		{
			a: '节水倡议书',
			b: '2019-07904  19：15：30',
			c: '同心县水务局',
			d: '已发布',
		},
		{
			a: '节水单位考核结果',
			b: '2019-07904  19：15：30',
			c: '同心县水务局',
			d: '已发布',
		},
		{
			a: '创建节水单位通知',
			b: '2019-07904  19：15：30',
			c: '同心县水务局',
			d: '已发布',
		},
	];

	export default {
		components: {
			Tab,
			DseSaveStatus
		},
		data() {
			return {
				paginationGroup,
				tabIndex: window.tabIndex,
				tabs: ['节水单位考核', '节水宣传'],
				tabsList: [{
						...pagination,

						value: '',
						yearList,

						list
					},
					{
						...pagination,

						title: '',
						status: 1,
						statuses: [{
							id: 1,
							label: '已发布',
							value: 1
						}, {
							id: 2,
							label: '未发布',
							value: 2
						}],
						date: [preFormatDate, currentFormatDate],

						list: list1
					}
				],
				confirm: {
					visible: false,
					payload: {}
				}
			};
		},
		mounted() {
			console.warn(window.tabIndex, 123);
		},
		methods: {
			onHandleGoPage(name, params = {}) {
				const that = this;

				that.$router.push({
					name,
					params
				});
				that.$store.commit('set_asideStatus', false);
				that.$emit('hiddenAside');
			},
			onHandleTabChange(tabIndex = 0) {
				const that = this;

				that.tabIndex = tabIndex;
			},
			onHandleExport() {
				console.warn(123);
			},
			onHandleSearch() {},
			// 新增
			onHandleCreate() {
				const that = this;

				const {
					tabIndex = 0
				} = that;

				if (tabIndex === 0) {
					window.tabIndex = 0;
					that.onHandleGoPage('waterExamineCompany');
				}
				if (tabIndex === 1) {
					window.tabIndex = 1;
					that.onHandleGoPage('waterExamineModify');
				}
			},
			// 修改
			onHandleListModify(params = {}) {
				const that = this;

				const {
					tabIndex = 0
				} = that;

				if (tabIndex === 0) {
					window.tabIndex = 0;
					that.onHandleGoPage('waterExamineCompany', params);
				}
				if (tabIndex === 1) {
					window.tabIndex = 1;
					that.onHandleGoPage('waterExamineModify', params);
				}
			},
			// 查看
			onHandleListShow(params = {}) {
				const that = this;

				const {
					tabIndex = 0
				} = that;

				if (tabIndex === 0) {
					window.tabIndex = 0;
					that.onHandleGoPage('waterExamineCompany');
				}
				if (tabIndex === 1) {
					window.tabIndex = 1;
					that.onHandleGoPage('waterExamineProfile');
				}
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
					tabIndex = 0, tabsList = [], confirm = {}
				} = that;
				const {
					payload = {}
				} = confirm;
				const {
					id = ''
				} = payload;

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
		}
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
		background-color: #fff;

		.handle,
		.table {
			padding: 16px;
		}

		.handle {
			display: flex;
			justify-content: space-between;
			align-items: center;

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
				margin-bottom: 16px;
			}

			+ .table {
				padding-top: 0;
			}
		}

		.chart {
			position: relative;
			width: 100%;
			height: 300px;
			padding-right: 24px;
			padding-left: 24px;

			.category {
				width: 100%;
				height: 100%;
			}
		}

		.table {

			/deep/ .el-table th {
				background-color: #f0f1f1;
				color: #333;
			}

			.title,
			.subtitle {
				margin-top: 0;
				margin-bottom: 0;
			}

			.title {
				color: #333;
				font-size: 16px;
				font-weight: bold;
				text-align: center;
			}

			.subtitle {
				margin-bottom: 8px;
				color: #333;
				font-size: 14px;
				font-weight: normal;
				text-align: center;
			}

			a {
				text-decoration: none;
				color: #187cea;

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
