<template>
	<div class="data">
		<Tab ref="tab" :tabs="tabs" @onHandleTabChange="onHandleTabChange" style="padding-top: 8px;" />

		<div v-show="tabIndex === 0" class="article">
			<div class="handle">
				<el-form :inline="true" class="form">
					<el-form-item label="时间">
						<el-select v-model="tabsList[tabIndex].yearValue" placeholder="请选择时间" @change="onHandleYearChange">
							<el-option v-for="(it, k) in tabsList[tabIndex].yearList" :key="k" :label="it.label" :value="it.value"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div class="end">
					<el-button type="primary" @click="onHandleZJH">转计划</el-button>
					<el-button type="primary" @click="onHandleExport">预测</el-button>
					<el-button type="primary" @click="onHandleExport">导出</el-button>
				</div>
			</div>

			<div class="chart"><div class="category" ref="ChartCategory1"></div></div>

			<div class="table">
				<el-table :data="tabsList[tabIndex].list" border size="mini">
					<el-table-column prop="a" align="center" label="区域" width="80"></el-table-column>
					<el-table-column prop="b" align="center" label="1月"></el-table-column>
					<el-table-column prop="c" align="center" label="2月"></el-table-column>
					<el-table-column prop="d" align="center" label="3月"></el-table-column>
					<el-table-column prop="e" align="center" label="4月"></el-table-column>
					<el-table-column prop="f" align="center" label="5月"></el-table-column>
					<el-table-column prop="g" align="center" label="6月"></el-table-column>
					<el-table-column prop="h" align="center" label="7月"></el-table-column>
					<el-table-column prop="i" align="center" label="8月"></el-table-column>
					<el-table-column prop="j" align="center" label="9月"></el-table-column>
					<el-table-column prop="k" align="center" label="10月"></el-table-column>
					<el-table-column prop="l" align="center" label="11月"></el-table-column>
					<el-table-column prop="m" align="center" label="12月"></el-table-column>
					<el-table-column prop="n" align="center" label="总计"></el-table-column>
				</el-table>
			</div>
		</div>

		<div v-show="tabIndex === 1" class="article">
			<div class="handle">
				<el-form :inline="true" class="form">
					<el-form-item label="时间">
						<el-select v-model="tabsList[tabIndex].yearValue" placeholder="请选择时间">
							<el-option v-for="(it, k) in tabsList[tabIndex].yearList" :key="k" :label="it.label" :value="it.value"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div class="end">
					<el-button type="primary" @click="onHandleExport">录入</el-button>
					<el-button type="primary" @click="onHandleExport">加载去年数据</el-button>
					<el-button type="primary" @click="onHandleExport">批量导入</el-button>
					<el-button type="primary" @click="onHandleExport">模板下载</el-button>
				</div>
			</div>

			<div class="table">
				<h3 class="title">同心县{{ tabsList[tabIndex].yearValue }}年{{ tabs[tabIndex] }}</h3>
				<h5 class="subtitle">单位：m³</h5>
				<el-table :data="tabsList[tabIndex].list" border size="mini">
					<el-table-column prop="a" align="center" label="分区(月)"></el-table-column>
					<el-table-column prop="b" align="center" label="1月"></el-table-column>
					<el-table-column prop="c" align="center" label="2月"></el-table-column>
					<el-table-column prop="d" align="center" label="3月"></el-table-column>
					<el-table-column prop="e" align="center" label="4月"></el-table-column>
					<el-table-column prop="f" align="center" label="5月"></el-table-column>
					<el-table-column prop="g" align="center" label="6月"></el-table-column>
					<el-table-column prop="h" align="center" label="7月"></el-table-column>
					<el-table-column prop="i" align="center" label="8月"></el-table-column>
					<el-table-column prop="j" align="center" label="9月"></el-table-column>
					<el-table-column prop="k" align="center" label="10月"></el-table-column>
					<el-table-column prop="l" align="center" label="11月"></el-table-column>
					<el-table-column prop="m" align="center" label="12月"></el-table-column>
					<el-table-column prop="n" align="center" label="总计"></el-table-column>
				</el-table>
			</div>
		</div>

		<div v-show="tabIndex === 2" class="article">
			<div class="handle">
				<el-form :inline="true" class="form">
					<el-form-item label="时间">
						<el-select v-model="tabsList[tabIndex].yearValue" placeholder="请输入时间" @change="onHandleYearChange">
							<el-option v-for="(it, k) in tabsList[tabIndex].yearList" :key="k" :label="it.label" :value="it.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="区域">
						<el-select v-model="tabsList[tabIndex].areaValue" placeholder="请选择区域">
							<el-option v-for="(it, k) in tabsList[tabIndex].areas" :key="k" :label="it.label" :value="it.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item><el-button type="primary" @click="onHandleExport">查询</el-button></el-form-item>
				</el-form>
			</div>

			<div class="chart"><div class="category" ref="ChartCategory2"></div></div>

			<div class="table">
				<el-table :data="tabsList[tabIndex].list" border size="mini">
					<el-table-column prop="a" align="center" label="时间"></el-table-column>
					<el-table-column prop="b" align="center" label="计划（m3）"></el-table-column>
					<el-table-column prop="c" align="center" label="实际用水量（m3）"></el-table-column>
					<el-table-column prop="d" align="center" label="偏差量（m3）"></el-table-column>
					<el-table-column prop="e" align="center" label="偏差率"></el-table-column>
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
import _2020 from './data/2020';
import _2019 from './data/2019';
import _2018 from './data/2018';

let ChartCategory1;
let ChartCategory2;

// 初始化年份
const nowDate = new Date();
const currentYear = nowDate.getFullYear();
const startYear = currentYear - 20;
const endYear = currentYear + 20;
const yearList = [];
for (let i = startYear; i <= endYear; i++) {
	yearList.unshift({
		value: i,
		label: i
	});
}

const yearValue = currentYear;

const pagination = {
	total: 10,
	current: 1,
	pageSize: 100
};

const paginationGroup = [10, 20, 30];

const list1 = [
	{
		a: '1月',
		b: 42,
		c: 39.6,
		d: 2.4,
		e: '5.71%'
	},
	{
		a: '2月',
		b: 41,
		c: 38.28,
		d: 2.72,
		e: '6.63%'
	},
	{
		a: '3月',
		b: 47,
		c: 46.035,
		d: 0.97,
		e: '2.05%'
	},
	{
		a: '4月',
		b: 48,
		c: 44.55,
		d: 3.45,
		e: '7.19%'
	},
	{
		a: '5月',
		b: 55,
		c: 51.15,
		d: 3.85,
		e: '7.00%'
	},
	{
		a: '6月',
		b: 53,
		c: 49.5,
		d: 3.5,
		e: '6.60%'
	},
	{
		a: '7月',
		b: 55,
		c: 51.15,
		d: 3.85,
		e: '7.00%'
	},
	{
		a: '8月',
		b: 55,
		c: 51.15,
		d: 3.85,
		e: '7.00%'
	},
	{
		a: '9月',
		b: 53,
		c: 49.5,
		d: 3.5,
		e: '6.60%'
	},
	{
		a: '10月',
		b: 50,
		c: 46.03,
		d: 3.97,
		e: '7.93%'
	},
	{
		a: '11月',
		b: 48,
		c: 44.55,
		d: 3.45,
		e: '7.19%'
	},
	{
		a: '12月',
		b: 48,
		c: 46.04,
		d: 1.97,
		e: '4.09%'
	},
	{
		a: '总计',
		b: 595,
		c: 557.54,
		d: 37.47,
		e: '6.30%'
	}
];

export default {
	components: {
		Tab,
		DseSaveStatus
	},
	data() {
		return {
			paginationGroup,
			tabIndex: 0,
			tabs: ['需水预测管理', '计划用水管理', '计划用水分析'],
			tabsList: [
				{
					...pagination,

					yearValue,
					yearList,

					list: _2019
				},
				{
					...pagination,

					yearValue,
					yearList,

					list: []
				},
				{
					...pagination,

					yearValue,
					yearList,

					areaValue: '5',
					areas: [
						{
							value: '1',
							label: '东部片区'
						},
						{
							value: '2',
							label: '西部片区'
						},
						{
							value: '3',
							label: '中部片区'
						},
						{
							value: '4',
							label: '全县'
						},
						{
							value: '5',
							label: '同心县'
						}
					],
					list: list1
				}
			],
			confirm: {
				visible: false,
				payload: {}
			},
			chartCommon: {
				tooltip: {
					trigger: 'axis'
				},
				title: {
					text: '',
					x: 'center',
					y: 'top',
					textStyle: {
						color: '#333',
						fontStyle: 'normal',
						fontWeight: 'bold',
						fontFamily: 'Microsoft Yahei',
						fontSize: 16
					}
				},
				legend: {
					orient: 'horizontal',
					itemGap: 100,
					x: 'center',
					y: 'bottom'
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '10%',
					containLabel: true
				},
				xAxis: {
					name: '月份',
					type: 'category',
					boundaryGap: false,
					data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
				},
				yAxis: {
					name: 'm³',
					type: 'value'
				}
			}
		};
	},
	mounted() {
		const that = this;

		that.$nextTick(() => {
			ChartCategory1 = that.$echarts.init(that.$refs.ChartCategory1);
			that._drawCategory();
		});
	},
	methods: {
		// tab切换
		onHandleTabChange(tabIndex = 0) {
			const that = this;

			that.tabIndex = tabIndex;

			that.$nextTick(() => {
				switch (tabIndex) {
					case 2:
						ChartCategory2 = that.$echarts.init(that.$refs.ChartCategory2);
						that._drawCategory2();
						break;
					default:
						break;
				}
			});
		},
		// 需水预测管理转计划
		onHandleZJH() {
			const that = this;

			const [{ yearValue, list = [] }] = that.tabsList;

			that.tabsList[1].list = list;
			that.tabsList[1].yearValue = yearValue;

			that.$refs.tab._tabChange(1);
		},
		// 时间选择
		onHandleYearChange(value) {
			const that = this;

			const { tabIndex = 0, tabsList } = that;

			// 需水预测管理
			if (tabIndex === 0) {
				switch (value) {
					case 2018:
						tabsList[0].list = _2018;
						break;
					case 2020:
						tabsList[0].list = _2020;
						break;
					default:
						tabsList[0].list = _2019;
						break;
				}

				that._drawCategory();
			}

			if (tabIndex === 2) {
				that._drawCategory2();
			}
		},
		// 导出
		onHandleExport() {
			console.warn(123);
		},
		// 计划用水分析区域搜索
		onHandleSearch() {},
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
		_drawCategory() {
			const that = this;
			const { tabIndex = 0, tabs = [], tabsList = [], chartCommon = {} } = that;
			const { yearValue = '', list = [] } = tabsList[tabIndex];

			const data1 = Object.keys(list[0])
				.map(it => list[0][it])
				.slice(1, 13);
			const data2 = Object.keys(list[1])
				.map(it => list[1][it])
				.slice(1, 13);
			const data3 = Object.keys(list[2])
				.map(it => list[2][it])
				.slice(1, 13);
			const data4 = Object.keys(list[3])
				.map(it => list[3][it])
				.slice(1, 13);

			ChartCategory1.setOption({
				...chartCommon,
				title: {
					...chartCommon.title,
					text: `同心县${yearValue}年${tabs[tabIndex]}`
				},
				legend: {
					...chartCommon.legend,
					data: ['东部区域', '西部区域', '中部区域', '全县']
				},
				series: [
					{
						name: '东部区域',
						type: 'line',
						stack: '总量',
						data: data1
					},
					{
						name: '西部区域',
						type: 'line',
						stack: '总量',
						data: data2
					},
					{
						name: '中部区域',
						type: 'line',
						stack: '总量',
						data: data3
					},
					{
						name: '全县',
						type: 'line',
						stack: '总量',
						data: data4
					}
				]
			});
		},
		_drawCategory2() {
			const that = this;
			const { tabIndex = 0, tabs = [], tabsList = [], chartCommon = {} } = that;
			const { yearValue = '' } = tabsList[tabIndex];

			const data1 = [];
			const data2 = [];
			list1.forEach((item = {}, key) => {
				if (list1.length === key + 1) return;
				data1.push(item.b);
				data2.push(item.c);
			});

			ChartCategory2.setOption({
				...chartCommon,
				title: {
					...chartCommon.title,
					text: `同心县${yearValue}年${tabs[tabIndex]}`
				},
				legend: {
					...chartCommon.legend,
					data: ['计划', '实际']
				},
				series: [
					{
						name: '计划',
						type: 'line',
						stack: '总量',
						data: data1
					},
					{
						name: '实际',
						type: 'line',
						stack: '总量',
						data: data2
					}
				]
			});
		}
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
		height: 100%;
		padding-right: 16px;
		padding-left: 16px;

		.category {
			width: calc(100% - 32px);
			min-height: 400px;
			height: 100%;
			overflow: hidden;
		}
	}

	.table {
		/deep/ .el-table th {
			background-color: #f0f1f1;
			color: #333;
		}

		// .title,
		// .subtitle {
		// 	margin-top: 0;
		// 	margin-bottom: 0;
		// }

		.title {
			margin-top: 0;
			margin-bottom: 8px;
			color: #333;
			font-size: 16px;
			font-weight: bold;
			text-align: center;
		}

		.subtitle {
			margin-top: 0;
			margin-bottom: 8px;
			color: #333;
			font-size: 14px;
			font-weight: normal;
			text-align: center;
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
