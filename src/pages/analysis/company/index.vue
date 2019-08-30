<template>
	<div class="region">
		<Tab :tabs="globalTabs" @onHandleTabChange="onHandleGlobalTabChange" />

		<div v-show="globalTabIndex === 0" class="main clearfix">
			<div class="article">
				<div class="table card">
					<h2 class="title">2019年1月-6月中源水务公司供销水分析</h2>
					<el-table :data="articleTableData11" border size="mini">
						<el-table-column v-for="item in articleTableHead11" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
					</el-table>
				</div>
				<div class="bar">
					<ul class="row">
						<li class="col"><div ref="ArticleBarEle11" class="card"></div></li>
						<li class="col"><div ref="ArticleBarEle12" class="card"></div></li>
						<li class="col"><div ref="ArticleBarEle13" class="card"></div></li>
						<li class="col"><div ref="ArticleBarEle14" class="card"></div></li>
						<li class="col"><div ref="ArticleBarEle15" class="card"></div></li>
						<li class="col"><div ref="ArticleBarEle16" class="card"></div></li>
						<li class="col"><div ref="ArticleBarEle17" class="card"></div></li>
						<li class="col"><div ref="ArticleBarEle18" class="card"></div></li>
						<li class="col"><div ref="ArticleBarEle19" class="card"></div></li>
						<li class="col"><div ref="ArticleBarEle110" class="card"></div></li>
					</ul>
				</div>
			</div>
			<div class="aside">
				<div class="row"><div ref="AsideBarEle11" class="card"></div></div>
				<div class="row"><div ref="AsideBarEle12" class="card"></div></div>
				<div class="row"><div ref="AsideBarEle13" class="card"></div></div>
			</div>
		</div>
		<div v-show="globalTabIndex === 1" class="main clearfix">
			<div class="article">
				<div class="table card">
					<h2 class="title">2019年1月-6月中源水务公司供销水分析</h2>
					<el-table :data="articleTableData21" border size="mini">
						<el-table-column v-for="item in articleTableHead21" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
					</el-table>
				</div>
				<div class="bar">
					<ul class="row">
						<li class="col"><div ref="ArticleBarEle21" class="card"></div></li>
						<li class="col"><div ref="ArticleBarEle22" class="card"></div></li>
						<li class="col"><div ref="ArticleBarEle23" class="card"></div></li>
						<li class="col"><div ref="ArticleBarEle24" class="card"></div></li>
						<li class="col"><div ref="ArticleBarEle25" class="card"></div></li>
						<li class="col"><div ref="ArticleBarEle26" class="card"></div></li>
					</ul>
				</div>
			</div>
			<div class="aside">
				<div class="row"><div ref="AsideBarEle21" class="card" style="height: 191px;"></div></div>
				<div class="row"><div ref="AsideBarEle22" class="card"></div></div>
				<div class="row"><div ref="AsideBarEle23" class="card"></div></div>
			</div>
		</div>
	</div>
</template>

<script>
import Tab from '../../../common/components/dseTab';
import articleTableHead11 from './data/articleTableHead11';
import articleTableData11 from './data/articleTableData11';
import articleTableHead21 from './data/articleTableHead21';
import articleTableData21 from './data/articleTableData21';
import commonEcharts from './data/commonEcharts';

const { ArticleBarParams1, AsideBarParams1, AsideBarParams2 } = commonEcharts;

let ArticleBarEle11;
let ArticleBarEle12;
let ArticleBarEle13;
let ArticleBarEle14;
let ArticleBarEle15;
let ArticleBarEle16;
let ArticleBarEle17;
let ArticleBarEle18;
let ArticleBarEle19;
let ArticleBarEle110;
let AsideBarEle11;
let AsideBarEle12;
let AsideBarEle13;

let ArticleBarEle21;
let ArticleBarEle22;
let ArticleBarEle23;
let ArticleBarEle24;
let ArticleBarEle25;
let ArticleBarEle26;
let AsideBarEle21;
let AsideBarEle22;
let AsideBarEle23;

export default {
	components: { Tab },
	data() {
		return {
			globalTabIndex: 0,
			globalTabs: ['按子公司统计', '按行政区域统计'],
			articleTableHead11,
			articleTableData11,
			articleTableHead21,
			articleTableData21
		};
	},
	mounted() {
		const that = this;

		that._initialization();
	},
	methods: {
		_initialization() {
			const that = this;

			that.onHandleGlobalTabChange(0);
		},
		onHandleGlobalTabChange(globalTabIndex) {
			const that = this;

			that.globalTabIndex = globalTabIndex;
			that.$nextTick(() => {
				switch (globalTabIndex) {
					case 0:
						ArticleBarEle11 = that.$echarts.init(that.$refs.ArticleBarEle11);
						ArticleBarEle12 = that.$echarts.init(that.$refs.ArticleBarEle12);
						ArticleBarEle13 = that.$echarts.init(that.$refs.ArticleBarEle13);
						ArticleBarEle14 = that.$echarts.init(that.$refs.ArticleBarEle14);
						ArticleBarEle15 = that.$echarts.init(that.$refs.ArticleBarEle15);
						ArticleBarEle16 = that.$echarts.init(that.$refs.ArticleBarEle16);
						ArticleBarEle17 = that.$echarts.init(that.$refs.ArticleBarEle17);
						ArticleBarEle18 = that.$echarts.init(that.$refs.ArticleBarEle18);
						ArticleBarEle19 = that.$echarts.init(that.$refs.ArticleBarEle19);
						ArticleBarEle110 = that.$echarts.init(that.$refs.ArticleBarEle110);

						AsideBarEle11 = that.$echarts.init(that.$refs.AsideBarEle11);
						AsideBarEle12 = that.$echarts.init(that.$refs.AsideBarEle12);
						AsideBarEle13 = that.$echarts.init(that.$refs.AsideBarEle13);
						break;
					case 1:
						ArticleBarEle21 = that.$echarts.init(that.$refs.ArticleBarEle21);
						ArticleBarEle22 = that.$echarts.init(that.$refs.ArticleBarEle22);
						ArticleBarEle23 = that.$echarts.init(that.$refs.ArticleBarEle23);
						ArticleBarEle24 = that.$echarts.init(that.$refs.ArticleBarEle24);
						ArticleBarEle25 = that.$echarts.init(that.$refs.ArticleBarEle25);
						ArticleBarEle26 = that.$echarts.init(that.$refs.ArticleBarEle26);

						AsideBarEle21 = that.$echarts.init(that.$refs.AsideBarEle21);
						AsideBarEle22 = that.$echarts.init(that.$refs.AsideBarEle22);
						AsideBarEle23 = that.$echarts.init(that.$refs.AsideBarEle23);
						break;
					default:
						break;
				}

				that._drawArticle();
				that._drawAside();
			});
		},
		// 绘制左侧 echarts
		_drawArticle() {
			const that = this;

			// tab索引
			const { globalTabIndex } = that;
			const { title, legend, yAxis, series } = ArticleBarParams1;

			console.warn(title, legend, series);
			const colorWaterRent = ['#00b2f2', '#66ce33', '#f5a72b'];
			switch (globalTabIndex) {
				case 0:
					// 绘制按子公司统计 echarts
					ArticleBarEle11.setOption({
						...ArticleBarParams1,
						color: ['#5498ff', '#f38e26', '#22cdab', '#f5a72b'],
						title: {
							...title,
							text: '中源水务公司水量分析'
						},
						legend: {
							...legend,
							data: ['取水量', '供水量', '售水量', '产销差率']
						},
						yAxis: [
							{
								...yAxis[0],
								name: '水量( m³)'
							},
							{
								...yAxis[1],
								name: '产销率差'
							}
						],
						series: [
							{
								...series[0],
								name: '取水量',
								data: [80537.62, 82803.1, 91406.83, 97389.66, 101991.79, 102953.69]
							},
							{
								...series[0],
								name: '供水量',
								data: [81466.38, 83757.98, 92460.93, 98512.76, 103167.96, 104140.95]
							},
							{
								...series[0],
								name: '售水量',
								data: [63633.77, 65423.75, 72221.66, 76948.77, 80584.97, 81344.98]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '产销差率',
								data: [0.2285, 0.1762, 0.184, 0.1517, 0.1795, 0.1572]
							}
						]
					});
					ArticleBarEle12.setOption({
						...ArticleBarParams1,
						// color: colorWaterRent,
						color: ['#00b2f2', '#f5a72b', '#f5a72b'],
						title: {
							...title,
							text: '中源水务公司水费收缴分析'
						},
						legend: {
							...legend,
							data: ['应缴水费', '已收水费', '水费收缴率']
						},
						yAxis: [
							{
								...yAxis[0],
								name: '水费(元)',
								axisLabel: {
									formatter: '{value}'
								}
							},
							{
								...yAxis[1],
								name: '水费收缴率'
							}
						],
						series: [
							{
								...series[0],
								name: '应缴水费',
								data: [141039.12, 145006.47, 160073.48, 170550.74, 178610.09, 180294.59]
							},
							{
								...series[0],
								name: '已收水费',
								data: [116536.25, 119814.35, 132263.76, 140920.79, 147579.98, 148971.83]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '水费收缴率',
								data: [0.8132, 0.8462, 0.8684, 0.7906, 0.8128, 0.8235]
							}
						]
					});
					ArticleBarEle13.setOption({
						...ArticleBarParams1,
						title: {
							...title,
							text: '东部分公司水量分析'
						},
						color: ['#5498ff', '#f5f01b', '#22cdab', '#f5a72b'],
						legend: {
							...legend,
							data: ['取水量', '供水量', '售水量', '产销差率']
						},
						yAxis: [
							{
								...yAxis[0],
								name: '水量( m³)'
							},
							{
								...yAxis[1],
								name: '产销率差'
							}
						],
						series: [
							{
								...series[0],
								name: '取水量',
								data: [15751.51, 19702.55, 22134.83, 24693.67, 27379.07, 29178.52]
							},
							{
								...series[0],
								name: '供水量',
								data: [17868.59, 22350.67, 25109.86, 28012.62, 31058.95, 33100.26]
							},
							{
								...series[0],
								name: '售水量',
								data: [12445.46, 15567.23, 17489.0, 19510.77, 21632.54, 23054.31]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '产销差率',
								data: [0.2345, 0.1832, 0.1843, 0.1643, 0.1855, 0.1252]
							}
						]
					});
					ArticleBarEle14.setOption({
						...ArticleBarParams1,
						color: colorWaterRent,
						title: {
							...title,
							text: '东部公司水费收缴分析'
						},
						legend: {
							...legend,
							data: ['应缴水费', '已收水费', '水费收缴率']
						},
						yAxis: [
							{
								...yAxis[0],
								name: '水费(元)',
								axisLabel: {
									formatter: '{value}'
								}
							},
							{
								...yAxis[1],
								name: '水费收缴率'
							}
						],
						series: [
							{
								...series[0],
								name: '应缴水费',
								data: [35824.91, 44811.09, 50343.01, 56162.78, 62270.41, 66363.05]
							},
							{
								...series[0],
								name: '已收水费',
								data: [29601.02, 37026.02, 41596.87, 46405.57, 51452.11, 54833.73]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '水费收缴率',
								data: [0.7655, 0.8168, 0.8157, 0.8357, 0.8145, 0.8748]
							}
						]
					});
					ArticleBarEle15.setOption({
						...ArticleBarParams1,
						title: {
							...title,
							text: '同心县分公司水费收缴分析'
						},
						legend: {
							...legend,
							data: ['取水量', '供水量', '售水量', '产销差率']
						},
						yAxis: [
							{
								...yAxis[0],
								name: '水量( m³)'
							},
							{
								...yAxis[1],
								name: '产销率差'
							}
						],
						series: [
							{
								...series[0],
								name: '取水量',
								data: [15888.18, 18156.32, 24789.29, 28529.24, 26676.89, 33005.1]
							},
							{
								...series[0],
								name: '供水量',
								data: [18003.33, 20573.42, 28089.42, 32327.26, 30228.31, 37398.98]
							},
							{
								...series[0],
								name: '售水量',
								data: [12553.45, 14345.53, 19586.32, 22541.3, 21077.74, 26077.74]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '产销差率',
								data: [0.2137, 0.1862, 0.1785, 0.1327, 0.1643, 0.1642]
							}
						]
					});
					ArticleBarEle16.setOption({
						...ArticleBarParams1,
						color: colorWaterRent,
						title: {
							...title,
							text: '同心县分公司水量分析'
						},
						legend: {
							...legend,
							data: ['应缴水费', '已收水费', '水费收缴率']
						},
						yAxis: [
							{
								...yAxis[0],
								name: '水费(元)',
								axisLabel: {
									formatter: '{value}'
								}
							},
							{
								...yAxis[1],
								name: '水费收缴率'
							}
						],
						series: [
							{
								...series[0],
								name: '应缴水费',
								data: [34797.92, 39765.53, 54292.9, 62484.06, 58427.08, 72286.99]
							},
							{
								...series[0],
								name: '已收水费',
								data: [28752.44, 32857.03, 44860.54, 51628.64, 48276.49, 59728.5]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '水费收缴率',
								data: [0.7863, 0.8138, 0.8215, 0.8673, 0.8357, 0.8358]
							}
						]
					});
					ArticleBarEle17.setOption({
						...ArticleBarParams1,
						title: {
							...title,
							text: '西部分公司水费收缴分析'
						},
						legend: {
							...legend,
							data: ['取水量', '供水量', '售水量', '产销差率']
						},
						yAxis: [
							{
								...yAxis[0],
								name: '水量( m³)'
							},
							{
								...yAxis[1],
								name: '产销率差'
							}
						],
						series: [
							{
								...series[0],
								name: '取水量',
								data: [25651.17, 21366.75, 22117.91, 19458.21, 22033.21, 15694.13]
							},
							{
								...series[0],
								name: '供水量',
								data: [27459.93, 22873.41, 23677.53, 20830.29, 23586.85, 16800.78]
							},
							{
								...series[0],
								name: '售水量',
								data: [21696.43, 18072.56, 18707.91, 16458.27, 18636.26, 13274.5]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '产销差率',
								data: [0.2435, 0.1752, 0.1795, 0.1627, 0.1545, 0.1642]
							}
						]
					});
					ArticleBarEle18.setOption({
						...ArticleBarParams1,
						color: colorWaterRent,
						title: {
							...title,
							text: '西部分公司水量分析'
						},
						legend: {
							...legend,
							data: ['应缴水费', '已收水费', '水费收缴率']
						},
						yAxis: [
							{
								...yAxis[0],
								name: '水费(元)',
								axisLabel: {
									formatter: '{value}'
								}
							},
							{
								...yAxis[1],
								name: '水费收缴率'
							}
						],
						series: [
							{
								...series[0],
								name: '应缴水费',
								data: [69986.77, 58297.15, 60346.62, 53089.88, 60115.5, 42819.92]
							},
							{
								...series[0],
								name: '已收水费',
								data: [57827.9, 48169.13, 49862.54, 43866.52, 49671.57, 35380.78]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '水费收缴率',
								data: [0.7565, 0.8248, 0.8205, 0.8373, 0.8455, 0.8358]
							}
						]
					});
					ArticleBarEle19.setOption({
						...ArticleBarParams1,
						title: {
							...title,
							text: '海原分公司水费收缴分析'
						},
						legend: {
							...legend,
							data: ['取水量', '供水量', '售水量', '产销差率']
						},
						yAxis: [
							{
								...yAxis[0],
								name: '水量( m³)'
							},
							{
								...yAxis[1],
								name: '产销率差'
							}
						],
						series: [
							{
								...series[0],
								name: '取水量',
								data: [18003.33, 20573.42, 28089.42, 32327.26, 30228.31, 37398.98]
							},
							{
								...series[0],
								name: '供水量',
								data: [15888.18, 18156.32, 24789.29, 28529.24, 26676.89, 33005.1]
							},
							{
								...series[0],
								name: '售水量',
								data: [12553.45, 14345.53, 19586.32, 22541.3, 21077.74, 26077.74]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '产销差率',
								data: [0.2137, 0.1862, 0.1785, 0.1327, 0.1643, 0.1642]
							}
						]
					});
					ArticleBarEle110.setOption({
						...ArticleBarParams1,
						color: colorWaterRent,
						title: {
							...title,
							text: '海原分公司水量分析'
						},
						legend: {
							...legend,
							data: ['应缴水费', '已收水费', '水费收缴率']
						},
						yAxis: [
							{
								...yAxis[0],
								name: '水费(元)',
								axisLabel: {
									formatter: '{value}'
								}
							},
							{
								...yAxis[1],
								name: '水费收缴率'
							}
						],
						series: [
							{
								...series[0],
								name: '应缴水费',
								data: [39054.55, 40207.39, 37901.71, 42513.07, 44357.61, 43665.9]
							},
							{
								...series[0],
								name: '已收水费',
								data: [32269.56, 33222.12, 31317.01, 35127.23, 36651.32, 36079.78]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '水费收缴率',
								data: [0.7716, 0.8238, 0.8161, 0.8483, 0.8206, 0.8428]
							}
						]
					});
					break;
				case 1:
					// 绘制政区域统计 echarts
					ArticleBarEle21.setOption({
						...ArticleBarParams1,
						title: {
							...title,
							text: '中源水务公司水量分析'
						},
						legend: {
							...legend,
							data: ['取水量', '供水量', '售水量', '产销差率']
						},
						yAxis: [
							{
								...yAxis[0],
								name: '水量( m³)'
							},
							{
								...yAxis[1],
								name: '产销率差'
							}
						],
						series: [
							{
								...series[0],
								name: '取水量',
								data: [17868.59, 22350.67, 25109.86, 28012.62, 31058.95, 33100.26]
							},
							{
								...series[0],
								name: '供水量',
								data: [15751.51, 19702.55, 22134.83, 24693.67, 27379.07, 29178.52]
							},
							{
								...series[0],
								name: '售水量',
								data: [12445.46, 15567.23, 17489.0, 19510.77, 21632.54, 23054.31]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '产销差率',
								data: [0.2345, 0.1832, 0.1843, 0.1643, 0.1855, 0.1252]
							}
						]
					});
					ArticleBarEle22.setOption({
						...ArticleBarParams1,
						color: colorWaterRent,
						title: {
							...title,
							text: '中源水务公司水费收缴分析'
						},
						legend: {
							...legend,
							data: ['应缴水费', '已收水费', '水费收缴率']
						},
						yAxis: [
							{
								...yAxis[0],
								name: '水费(元)',
								axisLabel: {
									formatter: '{value}'
								}
							},
							{
								...yAxis[1],
								name: '水费收缴率'
							}
						],
						series: [
							{
								...series[0],
								name: '应缴水费',
								data: [35824.91, 44811.09, 50343.01, 56162.78, 62270.41, 66363.05]
							},
							{
								...series[0],
								name: '已收水费',
								data: [29601.02, 37026.02, 41596.87, 46405.57, 51452.11, 54833.73]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '水费收缴率',
								data: [0.7655, 0.8168, 0.8157, 0.8357, 0.8145, 0.8748]
							}
						]
					});
					ArticleBarEle23.setOption({
						...ArticleBarParams1,
						title: {
							...title,
							text: '同心县水量分析'
						},
						legend: {
							...legend,
							data: ['取水量', '供水量', '售水量', '产销差率']
						},
						yAxis: [
							{
								...yAxis[0],
								name: '水量( m³)'
							},
							{
								...yAxis[1],
								name: '产销率差'
							}
						],
						series: [
							{
								...series[0],
								name: '取水量',
								data: [59099.62, 60732.28, 70601.65, 74053.19, 77642.81, 78984.4]
							},
							{
								...series[0],
								name: '供水量',
								data: [61523.09, 64290.85, 75317.19, 79798.09, 83320.47, 86193.37]
							},
							{
								...series[0],
								name: '售水量',
								data: [46695.34, 47985.32, 55783.23, 58510.34, 61346.54, 62406.55]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '产销差率',
								data: [0.2285, 0.1762, 0.184, 0.1517, 0.1795, 0.1572]
							}
						]
					});
					ArticleBarEle24.setOption({
						...ArticleBarParams1,
						color: colorWaterRent,
						title: {
							...title,
							text: '同心县水费收缴率分析'
						},
						legend: {
							...legend,
							data: ['应缴水费', '已收水费', '水费收缴率']
						},
						yAxis: [
							{
								...yAxis[0],
								name: '水费(元)',
								axisLabel: {
									formatter: '{value}'
								}
							},
							{
								...yAxis[1],
								name: '水费收缴率'
							}
						],
						series: [
							{
								...series[0],
								name: '应缴水费',
								data: [26288.82, 32866.88, 38884.4, 42705.08, 47404.3, 50912.66]
							},
							{
								...series[0],
								name: '已收水费',
								data: [21721.64, 27156.89, 32128.97, 35285.89, 39168.71, 42067.55]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '水费收缴率',
								data: [0.8332, 0.8262, 0.8384, 0.7606, 0.8128, 0.8435]
							}
						]
					});
					ArticleBarEle25.setOption({
						...ArticleBarParams1,
						title: {
							...title,
							text: '海原县水量分析'
						},
						legend: {
							...legend,
							data: ['取水量', '供水量', '售水量', '产销差率']
						},
						yAxis: [
							{
								...yAxis[0],
								name: '水量( m³)'
							},
							{
								...yAxis[1],
								name: '产销率差'
							}
						],
						series: [
							{
								...series[0],
								name: '取水量',
								data: [17645.18, 18166.04, 17124.32, 19207.77, 20041.15, 19728.63]
							},
							{
								...series[0],
								name: '供水量',
								data: [21438.0, 22070.82, 20805.18, 23336.47, 24348.98, 23969.29]
							},
							{
								...series[0],
								name: '售水量',
								data: [16938.43, 17438.43, 16438.43, 18438.43, 19238.43, 18938.43]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '产销差率',
								data: [0.2035, 0.1843, 0.1944, 0.1617, 0.1895, 0.1772]
							}
						]
					});
					ArticleBarEle26.setOption({
						...ArticleBarParams1,
						color: colorWaterRent,
						title: {
							...title,
							text: '海原县水费收缴率分析'
						},
						legend: {
							...legend,
							data: ['应缴水费', '已收水费', '水费收缴率']
						},
						yAxis: [
							{
								...yAxis[0],
								name: '水费(元)',
								axisLabel: {
									formatter: '{value}'
								}
							},
							{
								...yAxis[1],
								name: '水费收缴率'
							}
						],
						series: [
							{
								...series[0],
								name: '应缴水费',
								data: [9536.1, 11944.21, 11458.61, 13457.7, 14866.11, 15450.39]
							},
							{
								...series[0],
								name: '已收水费',
								data: [7879.38, 9869.13, 9467.9, 11119.68, 12283.4, 12766.18]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '水费收缴率',
								data: [0.8032, 0.8262, 0.8184, 0.8206, 0.7928, 0.8235]
							}
						]
					});
					break;
				default:
					break;
			}
		},
		_drawAside() {
			const that = this;

			const { globalTabIndex } = that;
			const { title } = AsideBarParams1;
			const { legend, grid = {}, xAxis, yAxis, series } = ArticleBarParams1;

			switch (globalTabIndex) {
				case 0:
					AsideBarEle11.setOption({
						...AsideBarParams1,
						title: {
							...title,
							text: '2019年6月产销差率对比图'
						},
						series: [
							{
								...AsideBarParams1.series[0],
								data: [0.28, 0.28, 0.19, 0.04],
								splitLine: {
									show: false
								}
							}
						]
					});
					AsideBarEle12.setOption({
						...AsideBarParams2,
						grid: {
							...grid,
							right: '10%',
							left: '2%',
							bottom: '15%',
							containLabel: true
						},
						title: {
							...title,
							text: '2019年6月供水量同比环比图'
						},
						legend: {
							...legend,
							data: ['供水量', '环比率', '同比率']
						},
						xAxis: {
							...xAxis,
							data: ['东部分公司', '同心分公司', '西部分公司', '海原分公司']
						},
						yAxis: [
							{
								...yAxis[0],
								name: '供水量'
							},
							{
								...yAxis[0],
								name: '环比率',
								offset: 0,
								axisLabel: {
									formatter: value => value * 100 + '%'
								}
							},
							{
								...yAxis[0],
								name: '同比率',
								offset: 40,
								axisLabel: {
									formatter: value => value * 100 + '%'
								}
							}
						],
						series: [
							{
								...series[0],
								name: '供水量',
								barWidth: 20,
								data: [29178.52, 33005.1, 16800.78, 23969.29]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '环比率',
								data: [0.0617, 0.0052, 0.342, 0.0158]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '同比率',
								data: [0.032, -0.0233, 0.0042, 0.037]
							}
						]
					});
					AsideBarEle13.setOption({
						...AsideBarParams1,
						title: {
							...title,
							text: '2019年6月各分公司水费收缴率对比图'
						},
						color: ['#66ce33'],
						series: [
							{
								...AsideBarParams1.series[0],
								data: [0.705, 0.852, 0.962, 0.777]
							}
						]
					});
					break;
				case 1:
					AsideBarEle21.setOption({
						...AsideBarParams1,
						title: {
							...title,
							text: '2019年6月产销差率对比图'
						},
						yAxis: {
							...yAxis,
							data: ['中源水务公司', '同心县', '海原县']
						},
						series: [
							{
								...AsideBarParams1.series[0],
								data: [0.27, 0.22, 0.04]
							}
						]
					});
					AsideBarEle22.setOption({
						...AsideBarParams2,
						grid: {
							...grid,
							right: '10%',
							left: '2%',
							bottom: '15%',
							containLabel: true
						},
						title: {
							...title,
							text: '2019年6月供水量同比环比图'
						},
						legend: {
							...legend,
							data: ['供水量', '环比率', '同比率']
						},
						xAxis: {
							...xAxis,
							data: ['中源水务公司', '东部分公司', '同心分公司']
						},
						yAxis: [
							{
								...yAxis[0],
								name: '供水量'
							},
							{
								...yAxis[0],
								name: '环比率',
								axisLabel: {
									formatter: value => value * 100 + '%'
								}
							},
							{
								...yAxis[0],
								name: '同比率',
								offset: 40,
								axisLabel: {
									formatter: value => value * 100 + '%'
								}
							}
						],
						series: [
							{
								...series[0],
								name: '供水量',
								data: [102953.69, 78984.4, 23969.29]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '环比率',
								data: [0.0093, 0.0617, -0.0052]
							},
							{
								...series[0],
								type: 'line',
								yAxisIndex: 1,
								name: '同比率',
								data: [0.0054, 0.032, -0.0233]
							}
						]
					});
					AsideBarEle23.setOption({
						...AsideBarParams1,
						title: {
							...title,
							text: '2019年6月各分公司水费收缴率对比图'
						},
						yAxis: {
							...yAxis,
							data: ['中源水务公司', '同心县', '海原县']
						},
						series: [
							{
								...AsideBarParams1.series[0],
								data: [0.753, 0.762, 0.803]
							}
						]
					});
					break;
				default:
					break;
			}
		}
	}
};
</script>

<style lang="scss" scoped="scoped">
@import '../county/style/index.scss';
.bar {
	.row {
		list-style: none;
		margin-top: 0;
		margin-bottom: 0;
		padding-left: 0;

		display: flex;
		flex-wrap: wrap;
		margin-left: -8px;

		.col {
			padding-bottom: 8px;
			padding-left: 8px;
			flex-basis: 50%;
			overflow: hidden;

			.card {
				width: 100%;
				height: 300px;
				min-height: 300px;
			}
		}
	}
}

.aside {
	.row {
		margin-bottom: 8px;

		.card {
			width: 100%;
		}

		&:first-child {
			.card {
				height: 261px;
			}
		}

		&:not(:first-child) {
			.card {
				height: 300px;
			}
		}
	}
}
</style>
