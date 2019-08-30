<template>
	<div class="region">
		<Tab ref="tab" :tabs="globalTabs" @onHandleTabChange="onHandleGlobalTabChange" />
		<!-- 全县 -->
		<div v-show="globalTabIndex === 0" class="main clearfix">
			<div class="article">
				<div class="table card">
					<h3 class="title">2019年1-6月巡检统计分析</h3>
					<el-table :data="articleTableData0" border size="mini">
						<el-table-column v-for="(item, key) in articleTableHead0" :key="key" :prop="item.value" align="center" :label="item.label"></el-table-column>
					</el-table>
					<div class="barWraperCenter">
						<ul class="row">
							<li class="col" style="flex-basis: 50%;"><div ref="BarEleCenter01" class="barEleCenter"></div></li>
							<li class="col" style="flex-basis: 50%;"><div ref="BarEleCenter02" class="barEleCenter"></div></li>
						</ul>
					</div>
				</div>
				<div class="pieWraperEnd">
					<ul class="row">
						<li class="col">
							<div class="card"><div ref="PieEleCenter01" class="pieEleCenter"></div></div>
						</li>
						<li class="col">
							<div class="card"><div ref="PieEleCenter02" class="pieEleCenter"></div></div>
						</li>
					</ul>
				</div>
			</div>
			<div class="aside">
				<div class="table card">
					<h2 class="title">2019年1-6月对象隐患发生次数排名</h2>
					<div class="barWraperAside"><div ref="BarEleAside0" class="barEle"></div></div>
					<!-- <h5 class="title">2019年1-6月对象隐患发生次数排名</h5> -->
					<el-table :data="asideTableData0" border size="mini">
						<el-table-column v-for="item in asideTableHead0" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
					</el-table>
				</div>
			</div>
		</div>
		<!-- 东部片区 -->
		<div v-show="globalTabIndex === 1" class="main clearfix">
			<div class="article">
				<div v-if="globalTabIndex === 1" class="dashboard card">
					<ul class="row">
						<li v-for="(item, key) in dashboards1" :key="key" class="col">
							<div class="section">
								<p class="text">
									<template v-if="typeof item.value === 'string'">
										<span class="value">{{ item.value }}</span>
									</template>
									<template v-else>
										<countTo :startVal="0" :endVal="item.value" :duration="3000" class="value" />
									</template>
								</p>
								<p class="text">
									<span class="label">{{ item.label }}</span>
								</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="pieWraperEnd" style="margin-top: 8px;">
					<ul class="row">
						<li class="col">
							<div class="card">
								<div ref="BarEleEnd11" class="barEleEnd"></div>
								<el-table :data="articleTableData11" border size="mini">
									<el-table-column v-for="item in articleTableHead11" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
								</el-table>
							</div>
						</li>
						<li class="col">
							<div class="card">
								<div ref="BarEleEnd12" class="barEleEnd"></div>
								<el-table :data="articleTableData12" border size="mini">
									<el-table-column v-for="item in articleTableHead12" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
								</el-table>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="aside">
				<div class="table card">
					<div class="pieEleWraper"><div ref="PieEleAside1" class="pieEle"></div></div>
				</div>
				<div class="table card">
					<el-table :data="asideTableData1" border size="mini">
						<el-table-column v-for="item in asideTableHead1" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
					</el-table>
				</div>
			</div>
		</div>
		<!-- 中部片区 -->
		<div v-show="globalTabIndex === 2" class="main clearfix">
			<div class="article">
				<div v-if="globalTabIndex === 2" class="dashboard card">
					<ul class="row">
						<li v-for="(item, key) in dashboards2" :key="key" class="col">
							<div class="section">
								<p class="text">
									<template v-if="typeof item.value === 'string'">
										<span class="value">{{ item.value }}</span>
									</template>
									<template v-else>
										<countTo :startVal="0" :endVal="item.value" :duration="3000" class="value" />
									</template>
								</p>
								<p class="text">
									<span class="label">{{ item.label }}</span>
								</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="pieWraperEnd" style="margin-top: 8px;">
					<ul class="row">
						<li class="col">
							<div class="card">
								<div ref="BarEleEnd21" class="barEleEnd"></div>
								<el-table :data="articleTableData11" border size="mini">
									<el-table-column v-for="item in articleTableHead11" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
								</el-table>
							</div>
						</li>
						<li class="col">
							<div class="card">
								<div ref="BarEleEnd22" class="barEleEnd"></div>
								<el-table :data="articleTableData12" border size="mini">
									<el-table-column v-for="item in articleTableHead12" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
								</el-table>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="aside">
				<div class="table card">
					<div class="pieEleWraper"><div ref="PieEleAside2" class="pieEle"></div></div>
				</div>
				<div class="table card">
					<el-table :data="asideTableData1" border size="mini">
						<el-table-column v-for="item in asideTableHead1" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
					</el-table>
				</div>
			</div>
		</div>
		<!-- 西部片区 -->
		<div v-show="globalTabIndex === 3" class="main clearfix">
			<div class="article">
				<div v-if="globalTabIndex === 3" class="dashboard card">
					<ul class="row">
						<li v-for="(item, key) in dashboards3" :key="key" class="col">
							<div class="section">
								<p class="text">
									<template v-if="typeof item.value === 'string'">
										<span class="value">{{ item.value }}</span>
									</template>
									<template v-else>
										<countTo :startVal="0" :endVal="item.value" :duration="3000" class="value" />
									</template>
								</p>
								<p class="text">
									<span class="label">{{ item.label }}</span>
								</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="pieWraperEnd" style="margin-top: 8px;">
					<ul class="row">
						<li class="col">
							<div class="card">
								<div ref="BarEleEnd31" class="barEleEnd"></div>
								<el-table :data="articleTableData11" border size="mini">
									<el-table-column v-for="item in articleTableHead11" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
								</el-table>
							</div>
						</li>
						<li class="col">
							<div class="card">
								<div ref="BarEleEnd32" class="barEleEnd"></div>
								<el-table :data="articleTableData12" border size="mini">
									<el-table-column v-for="item in articleTableHead12" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
								</el-table>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="aside">
				<div class="table card">
					<div class="pieEleWraper"><div ref="PieEleAside3" class="pieEle"></div></div>
				</div>
				<div class="table card">
					<el-table :data="asideTableData1" border size="mini">
						<el-table-column v-for="item in asideTableHead1" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
					</el-table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import countTo from 'vue-count-to';
import Tab from '../../../common/components/dseTab';

import dashboards1 from './data/dashboards1';
import dashboards2 from './data/dashboards2';
import dashboards3 from './data/dashboards3';

// 全县
import articleTableHead0 from './data/articleTableHead0';
import articleTableData0 from './data/articleTableData0';
import asideTableHead0 from './data/asideTableHead0';
import asideTableData0 from './data/asideTableData0';
import commonEcharts from './data/commonEcharts';

// 东部片区
import articleTableHead11 from './data/articleTableHead11';
import articleTableData11 from './data/articleTableData11';
import asideTableHead1 from './data/asideTableHead1';
import asideTableData1 from './data/asideTableData1';
// 中部片区
import articleTableHead12 from './data/articleTableHead12';
import articleTableData12 from './data/articleTableData12';

const { commonBar0, commonPie0, commonRegionArticle, commonRegionAside } = commonEcharts;

// 全县
let BarEleCenter01;
let BarEleCenter02;
let PieEleCenter01;
let PieEleCenter02;
let BarEleAside0;

// 东部片区
let BarEleEnd11;
let BarEleEnd12;
let PieEleAside1;

// 中部片区
let BarEleEnd21;
let BarEleEnd22;
let PieEleAside2;

// 西部片区
let BarEleEnd31;
let BarEleEnd32;
let PieEleAside3;

export default {
	components: { countTo, Tab },
	data() {
		return {
			globalTabIndex: 0,
			globalTabs: ['全县', '东部片区', '中部片区', '西部片区'],
			commonBar0,
			commonPie0,
			commonRegionArticle,
			commonRegionAside,

			dashboards1,
			dashboards2,
			dashboards3,

			articleTableHead0,
			articleTableData0,
			asideTableHead0,
			asideTableData0,

			articleTableHead11,
			asideTableHead1,
			asideTableData1,

			articleTableData11,
			articleTableHead12,
			articleTableData12
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

			that.onHandleGlobalTabChange(0);
		},
		// 全县
		_drawBarCenter() {
			const that = this;
			const { commonBar0 = {} } = that;

			const { title = {}, xAxis = {}, series = [] } = commonBar0;

			BarEleCenter01.setOption({
				...commonBar0,
				title: {
					...title,
					text: '2019年1-6月巡检完成率'
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
						data: [0.8333, 0.6923, 0.8]
					}
				]
			});
			BarEleCenter02.setOption({
				...commonBar0,
				title: {
					...title,
					text: '2019年1-6月检修处理完成率'
				},
				xAxis: {
					...xAxis
				},
				// series: [
				// 	{
				// 		name: '全县',
				// 		type: 'bar',
				// 		barWidth: '20%',
				// 		data: [0.8, 0.8, 0.7143],
				// 		label:{
				// 			normal: {
				// 				show: true,
				// 				position: 'right',
				// 				textStyle: {
				// 					// color: 'black',
				// 					fontSize: 16,
				// 					fontWeight: 600
				// 				},
				// 				formatter: (payload={}) => Number(payload.value).toFixed(2)*100+'%'
				// 			}
				// 		}
				// 	}
				// ]
				series: [
					{
						...series[0],
						itemStyle: {
							...series[0].itemStyle,
							normal: {
								color: '#1B84EA'
							}
						},
						data: [0.8, 0.8, 0.7143]
					}
				]
			});
		},
		// 全县
		_drawPieCenter() {
			const that = this;

			const { commonPie0 = {} } = that;
			const { title = {}, legend = {}, series = [] } = commonPie0;

			PieEleCenter01.setOption({
				...commonPie0,
				title: {
					...title,
					text: '2019年1-6月隐患分布情况'
				},
				series: [
					{
						...series[0],
						data: [
							{
								value: 20,
								name: '东部'
							},
							{
								value: 25,
								name: '中部'
							},
							{
								value: 12,
								name: '西部'
							}
						]
					}
				]
			});
			PieEleCenter02.setOption({
				...commonPie0,
				title: {
					...title,
					text: '2019年1-6月隐患类型统计'
				},
				legend: {
					...legend,
					data: ['爆管', '暗漏', '水泵机组', '阀门', '变压器', '其它设备']
				},
				series: [
					{
						...series[0],
						data: [
							{
								value: 9,
								name: '爆管'
							},
							{
								value: 15,
								name: '暗漏'
							},
							{
								value: 7,
								name: '水泵机组'
							},
							{
								value: 15,
								name: '阀门'
							},
							{
								value: 4,
								name: '变压器'
							},
							{
								value: 46,
								name: '其它设备'
							}
						]
					}
				]
			});
		},
		_drawArticle() {
			const that = this;

			const { globalTabIndex = 0, commonRegionArticle = {} } = that;
			const { title = {}, xAxis = {}, series = [] } = commonRegionArticle;

			const aaa = {
				...commonRegionArticle,
				title: {
					...title,
					text: '巡检完成率排序'
				},
				xAxis: {
					...xAxis,
					data: ['王华', '胡海', '李莎', '陈宇']
				},
				series: [
					{
						...series[0],
						data: [0.9333, 0.8667, 0.8, 0.7333]
					}
				]
			};
			const bbb = {
				...commonRegionArticle,
				title: {
					...title,
					text: '检修完成率排序'
				},
				xAxis: {
					...xAxis,
					data: ['刘伟', '与海', '翁可', '张华']
				},
				series: [
					{
						...series[0],
						data: [0.6, 0.75, 0.5, 0.6667]
					}
				]
			};

			switch (globalTabIndex) {
				case 0:
					that._drawBarCenter();
					that._drawPieCenter();
					break;
				case 1:
					BarEleEnd11.setOption(aaa);
					BarEleEnd12.setOption(bbb);
					break;
				case 2:
					BarEleEnd21.setOption(aaa);
					BarEleEnd22.setOption(bbb);
					break;
				case 3:
					BarEleEnd31.setOption(aaa);
					BarEleEnd32.setOption(bbb);
					break;
				default:
					break;
			}
		},
		_drawAside() {
			const that = this;

			const { globalTabIndex = 0, commonRegionArticle = {}, commonRegionAside = {}, asideTableData0 = {} } = that;
			const { title = {}, xAxis = {}, series = {} } = commonRegionArticle;

			const xAxisData = asideTableData0.map((item = {}) => item.b);
			const seriesData = asideTableData0.map((item = {}) => item.c);

			switch (globalTabIndex) {
				case 0:
					BarEleAside0.setOption({
						...commonRegionArticle,
						title: {
							...title,
							text: ''
						},
						xAxis: {
							...xAxis,
							axisLabel: {
								// https://www.oschina.net/question/615230_247798
								rotate: 40
							},
							data: xAxisData
						},
						series: [
							{
								...series[0],
								data: seriesData,
								itemStyle: {
									normal: {
										color: '#1B84EA',
										label: {
											show: true,
											position: 'top'
										}
									}
								}
							}
						]
					});
					break;
				case 1:
					PieEleAside1.setOption(commonRegionAside);
					break;
				case 2:
					PieEleAside2.setOption(commonRegionAside);
					break;
				case 3:
					PieEleAside3.setOption(commonRegionAside);
					break;
				default:
					break;
			}
		},
		onHandleGlobalTabChange(globalTabIndex) {
			const that = this;

			that.globalTabIndex = globalTabIndex;

			that.$nextTick(() => {
				switch (globalTabIndex) {
					case 0:
						BarEleCenter01 = that.$echarts.init(that.$refs.BarEleCenter01);
						BarEleCenter02 = that.$echarts.init(that.$refs.BarEleCenter02);

						PieEleCenter01 = that.$echarts.init(that.$refs.PieEleCenter01);
						PieEleCenter02 = that.$echarts.init(that.$refs.PieEleCenter02);

						BarEleAside0 = that.$echarts.init(that.$refs.BarEleAside0);
						break;
					case 1:
						BarEleEnd11 = that.$echarts.init(that.$refs.BarEleEnd11);
						BarEleEnd12 = that.$echarts.init(that.$refs.BarEleEnd12);

						PieEleAside1 = that.$echarts.init(that.$refs.PieEleAside1);

						break;
					case 2:
						BarEleEnd21 = that.$echarts.init(that.$refs.BarEleEnd21);
						BarEleEnd22 = that.$echarts.init(that.$refs.BarEleEnd22);

						PieEleAside2 = that.$echarts.init(that.$refs.PieEleAside2);
						break;
					case 3:
						BarEleEnd31 = that.$echarts.init(that.$refs.BarEleEnd31);
						BarEleEnd32 = that.$echarts.init(that.$refs.BarEleEnd32);

						PieEleAside3 = that.$echarts.init(that.$refs.PieEleAside3);
						break;
					default:
						break;
				}

				that._drawArticle();
				that._drawAside();
			});
		}
	}
};
</script>

<style lang="scss" scoped="scoped">
@import '../../analysis/county/style/index.scss';

.barEleEnd {
	width: 100%;
	height: 299px;
}

.main .aside .table .pieEle {
	height: 370px;
}
</style>
