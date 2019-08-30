<template>
	<div class="region">
		<div class="main clearfix">
			<div class="article">
				<div class="table card">
					<h2 class="title">2019年1月-6月全县用水分析</h2>
					<el-table :data="articleTableData" border size="mini">
						<el-table-column v-for="item in articleTableHead" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
					</el-table>
					<div class="barWraperCenter">
						<ul class="row">
							<li class="col"><div ref="BarEleCenter1" class="barEleCenter"></div></li>
							<li class="col"><div ref="BarEleCenter2" class="barEleCenter"></div></li>
							<li class="col"><div ref="BarEleCenter3" class="barEleCenter"></div></li>
						</ul>
					</div>
				</div>
				<div class="barWraperEnd card"><div ref="BarEleEnd" class="barEleEnd"></div></div>
			</div>
			<div class="aside">
				<div class="table card">
					<h2 class="title">超2月待缴水费用水户分析</h2>
					<el-table :data="asideTableData" border size="mini">
						<el-table-column v-for="item in asideTableHead" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
					</el-table>
					<div class="pieEleWraper"><div ref="PieEle" class="pieEle"></div></div>
				</div>
				<div class="tab card">
					<div class="tabbar">
						<span v-for="(item, key) in asideTabs" :key="key" class="item" :class="asideTabIndex === key && 'active'" @click="onHandleTab(key)">{{ item }}</span>
					</div>
					<div class="tabContent">
						<el-table v-show="asideTabIndex === 0" :data="asideTableData1" border size="mini">
							<el-table-column v-for="item in asideTableHead1" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
						</el-table>
						<el-table v-show="asideTabIndex === 1" :data="asideTableData2" border size="mini">
							<el-table-column v-for="item in asideTableHead2" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
						</el-table>
						<el-table v-show="asideTabIndex === 2" :data="asideTableData3" border size="mini">
							<el-table-column v-for="item in asideTableHead3" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
						</el-table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import articleTableHead from './data/articleTableHead';
import articleTableData from './data/articleTableData';
import asideTableHead from './data/asideTableHead';
import asideTableData from './data/asideTableData';
import asideTableHead1 from './data/asideTableHead1';
import asideTableData1 from './data/asideTableData1';
import asideTableHead2 from './data/asideTableHead2';
import asideTableData2 from './data/asideTableData2';
import asideTableHead3 from './data/asideTableHead3';
import asideTableData3 from './data/asideTableData3';
import commonBar from './data/commonBar';

const { commonBarCenter, commonBarEnd, commonPie } = commonBar;

let BarEleCenter1;
let BarEleCenter2;
let BarEleCenter3;
let BarEleEnd;
let PieEle;

export default {
	data() {
		return {
			articleTableHead,
			articleTableData,
			asideTableHead,
			asideTableData,
			asideTabIndex: 0,
			asideTabs: ['东部', '中部', '西部'],
			asideTableHead1,
			asideTableData1,
			asideTableHead2,
			asideTableData2,
			asideTableHead3,
			asideTableData3,
			commonBarCenter: {},
			commonBarEnd: {},
			commonPie: {}
		};
	},
	mounted() {
		const that = this;

		setTimeout(() => {
			that._initialization();
		}, 700);
	},
	methods: {
		_initialization() {
			const that = this;

			that.commonBarCenter = commonBarCenter;
			that.commonBarEnd = commonBarEnd;

			that.commonPie = commonPie;

			that.$nextTick(() => {
				BarEleCenter1 = that.$echarts.init(that.$refs.BarEleCenter1);
				BarEleCenter2 = that.$echarts.init(that.$refs.BarEleCenter2);
				BarEleCenter3 = that.$echarts.init(that.$refs.BarEleCenter3);

				BarEleEnd = that.$echarts.init(that.$refs.BarEleEnd);
				PieEle = that.$echarts.init(that.$refs.PieEle);

				that._drawBarCenter();
				that._drawBarWraperEnd();
				that._drawPipe();
			});
		},
		_drawBarCenter() {
			const that = this;
			const { commonBarCenter = {} } = that;

			const { title = {}, xAxis = {}, series = [] } = commonBarCenter;

			BarEleCenter1.setOption({
				...commonBarCenter,
				title: {
					...title,
					text: '产销率对比图'
				},
				xAxis: {
					...xAxis
				},
				series: [
					{
						...series[0],
						itemStyle: {
							...series[0].itemStyle,
							normal: {
								color: '#1B84EA'
							}
						},
						data: [0.7458, 0.7233, 0.7221, 0.8056]
					}
				]
			});
			BarEleCenter2.setOption({
				...commonBarCenter,
				title: {
					...title,
					text: '户均用水对比图'
				},
				xAxis: {
					...xAxis,
					axisLabel: {
						...xAxis.axisLabel,
						formatter: null
					}
				},
				series: [
					{
						name: '全县',
						type: 'bar',
						barWidth: '20%',
						itemStyle: {
							...series[0].itemStyle,
							normal: {
								color: '#f5a72b'
							}
						},
						data: [0.77, 0.79, 0.82, 0.71],
						label: {
							normal: {
								show: true,
								position: 'right',
								textStyle: {
									// color: 'black',
									fontSize: 16,
									fontWeight: 600
								}
								// formatter: (payload={}) => Number(payload.value)
							}
						}
					}
				]
			});
			BarEleCenter3.setOption({
				...commonBarCenter,
				title: {
					...title,
					text: '水费收缴率对比图'
				},
				xAxis: {
					...xAxis
				},
				series: [
					{
						...series[0],
						itemStyle: {
							...series[0].itemStyle,
							normal: {
								color: '#22cdab'
							}
						},
						data: [0.9, 0.93, 0.92, 0.85]
					}
				]
			});
		},
		_drawBarWraperEnd() {
			const that = this;

			const { commonBarEnd = {} } = that;

			BarEleEnd.setOption({
				...commonBarEnd,
				title: {
					...commonBarEnd.title,
					text: '全县用水趋势图'
				},
				xAxis: {
					...commonBarEnd.xAxis,
					name: '月份'
				}
			});
		},
		_drawPipe() {
			const that = this;

			const { commonPie = {} } = that;

			console.warn(PieEle, 'PieEle');

			PieEle.setOption(commonPie);
		},
		onHandleTab(asideTabIndex = 0) {
			const that = this;

			that.asideTabIndex = asideTabIndex;
		}
	}
};
</script>

<style lang="scss" scoped="scoped">
@import './style/index.scss';
// /deep/ tr:not(:first-child) {
// 	td:last-child {
// 		.cell {
// 			width: 60px;
// 			margin: 0 auto;
// 			color: #0b83fe;
// 			padding: 3px 0px;
// 			border: 1px solid #0b83fe;
// 			cursor: pointer;
// 		}
// 	}
// }
</style>
