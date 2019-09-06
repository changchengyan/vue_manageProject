<template>
	<div class="region">
		<Tab :tabs="globalTabs" @onHandleTabChange="onHandleGlobalTabChange" />
		<div class="dashboard card">
			<ul v-if="globalTabIndex === 0" class="row">
				<li v-for="(item, key) in dashboards0" :key="key" class="col">
					<div class="section">
						<p class="text">
							<span class="label">{{ item.label }}</span>
						</p>
						<p class="text">
							<span v-if="item.subLabel" class="subLabel">{{ item.subLabel }}：</span>
							<countTo :startVal="0" :endVal="Number(item.value)" :duration="3000" class="value" />
							<span v-if="item.unit" class="unit">{{ item.unit }}</span>
						</p>
					</div>
				</li>
			</ul>
			<ul v-if="globalTabIndex === 1" class="row">
				<li v-for="(item, key) in dashboards1" :key="key" class="col">
					<div class="section">
						<p class="text">
							<span class="label">{{ item.label }}</span>
						</p>
						<p class="text">
							<span v-if="item.subLabel" class="subLabel">{{ item.subLabel }}：</span>
							<countTo :startVal="0" :endVal="Number(item.value)" :duration="3000" class="value" />
							<span v-if="item.unit" class="unit">{{ item.unit }}</span>
						</p>
					</div>
				</li>
			</ul>
			<ul v-if="globalTabIndex === 2" class="row">
				<li v-for="(item, key) in dashboards2" :key="key" class="col">
					<div class="section">
						<p class="text">
							<span class="label">{{ item.label }}</span>
						</p>
						<p class="text">
							<span v-if="item.subLabel" class="subLabel">{{ item.subLabel }}：</span>
							<countTo :startVal="0" :endVal="Number(item.value)" :duration="3000" class="value" />
							<span v-if="item.unit" class="unit">{{ item.unit }}</span>
						</p>
					</div>
				</li>
			</ul>
		</div>
		<div v-show="globalTabIndex === 0" class="main clearfix">
			<div class="article">
				<div class="lineWraperStart card"><div ref="LineEleStart" class="lineEleStart"></div></div>
				<div class="barWraperEnd card"><div ref="BarEleEnd" class="barEleEnd"></div></div>
			</div>
			<div class="aside">
				<div class="table card">
					<el-table :data="asideTableData01" border size="mini">
						<el-table-column v-for="item in asideTableHead01" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
					</el-table>
					<div class="pieEleWraper"><div ref="PieEle" class="pieEle"></div></div>
				</div>
				<div class="table card">
					<el-table :data="asideTableData02" border size="mini">
						<el-table-column v-for="item in asideTableHead02" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
						<el-table-column prop="h" align="center" label="操作">
							<template slot-scope="scope">
								<a class="handleBtn" href="JavaScript:void(0)" @click="onHandleListConfigurationVisible(scope.row)">组态图</a>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<dse-bg-model :tips="configuration.title" :modelFlag='configuration.visible' ref="bgModel" @closeBg="closeBg">
				<div class="bgmodel-row">
					<div class="col">
						<iframe :src="staticPath+'/companys/userDev/userDev_zhutai.html'" frameborder="0"></iframe>
					</div>
					<div class="col">
						<div class="top-head">
							<span>户名</span>
							<span>水表编号</span>
							<span>当前水表</span>
							<span>当月用水量</span>
							<span>状态</span>
							<span>控制命令</span>
						</div>
						<div class="row" v-for="(val,index) in ctrList" :key="index">
							<div class="item">
								<span>{{val.name}}</span>
							</div>
							<div class="item">
								<span>{{val.code}}</span>
							</div>
							<div class="item">
								<span>{{val.currentVal}}</span>
							</div>
							<div class="item">
								<span>{{val.currentMonthVal}}</span>
							</div>
							<div class="item">
								<span class="cycle" :class="{stopCycle:val.status==false}"></span>
							</div>
							<div class="item">
								<span class="start" @click="showThis(index,val.status)" :class="{startStop:val.status==false}">开</span>
								<span class="stop"  @click="showThis(index,!val.status)"  :class="{stopStart:val.status==false}">关</span>
							</div>
						</div>
					</div>
				</div>
			</dse-bg-model>
		</div>
		<div v-show="globalTabIndex === 1" class="main clearfix">
			<div class="article">
				<div class="lineWraperStart card"><div ref="LineEleStart1" class="lineEleStart"></div></div>
				<div class="barWraperEnd card"><div ref="BarEleEnd1" class="barEleEnd"></div></div>
			</div>
			<div class="aside">
				<div class="table card">
					<el-table :data="asideTableData11" border size="mini">
						<el-table-column v-for="item in asideTableHead11" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
					</el-table>
					<div class="pieEleWraper"><div ref="PieEle1" class="pieEle"></div></div>
				</div>
				<div class="table card">
					<el-table :data="asideTableData02" border size="mini">
						<el-table-column v-for="item in asideTableHead02" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
					</el-table>
				</div>
			</div>
		</div>
		<div v-show="globalTabIndex === 2" class="main clearfix">
			<div class="article">
				<div class="lineWraperStart card"><div ref="LineEleStart2" class="lineEleStart"></div></div>
				<div class="barWraperEnd card"><div ref="BarEleEnd2" class="barEleEnd"></div></div>
			</div>
			<div class="aside">
				<div class="table card">
					<el-table :data="asideTableData21" border size="mini">
						<el-table-column v-for="item in asideTableHead21" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
					</el-table>
					<div class="pieEleWraper"><div ref="PieEle2" class="pieEle"></div></div>
				</div>
				<div class="table card">
					<el-table :data="asideTableData02" border size="mini">
						<el-table-column v-for="item in asideTableHead02" :key="item.a" :prop="item.value" align="center" :label="item.label"></el-table-column>
					</el-table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import countTo from 'vue-count-to';
import Tab from '../../../common/components/DseTab';
import DseBgModel from '../../../common/components/toast/DseBgModel';


import dashboards0 from './data/dashboards0';
import dashboards1 from './data/dashboards1';
import dashboards2 from './data/dashboards2';
import articleTableHead from './data/articleTableHead';
import articleTableData from './data/articleTableData';
import asideTableHead01 from './data/asideTableHead01';
import asideTableData01 from './data/asideTableData01';
import asideTableHead11 from './data/asideTableHead11';
import asideTableData11 from './data/asideTableData11';
import asideTableHead21 from './data/asideTableHead21';
import asideTableData21 from './data/asideTableData21';

import asideTableHead02 from './data/asideTableHead02';
import asideTableData02 from './data/asideTableData02';
import asideTableHead12 from './data/asideTableHead12';
import asideTableData12 from './data/asideTableData12';
import asideTableHead22 from './data/asideTableHead22';
import asideTableData22 from './data/asideTableData22';
import commonBar from './data/commonBar';

const { commonLineStart, commonBarEnd, commonPie } = commonBar;

let LineEleStart;
let BarEleEnd;
let PieEle;

let LineEleStart1;
let BarEleEnd1;
let PieEle1;

let LineEleStart2;
let BarEleEnd2;
let PieEle2;

export default {
	components: { DseBgModel, Tab, countTo },
	data() {
		return {
			globalTabIndex: 0,
			globalTabs: ['东部片区用水分析', '中部片区用水分析', '西部片区用水分析'],
			articleTableHead,
			articleTableData,
			asideTableHead01,
			asideTableData01,
			asideTableHead11,
			asideTableData11,
			asideTableHead21,
			asideTableData21,
			asideTabIndex: 0,
			asideTabs: ['东部', '中部', '西部'],
			asideTableHead02,
			asideTableData02,
			asideTableHead12,
			asideTableData12,
			asideTableHead22,
			asideTableData22,

			// 区域用水分析右侧组态图
			configuration: {
				visible: false,
				title: '组态图'
			},

			commonLineStart: {},
			commonBarEnd: {},
			commonPie: {},
			dashboards0,
			dashboards1,
			dashboards2,
			staticPath:'', //静态文件路径
			ctrList:[
				{
					name:'张超',
					code:'1812302935',
					currentVal:145.43,
					currentMonthVal:5.8,
					status:true
				},
				{
					name:'王晓敏',
					code:'1812302917',
					currentVal:156.87,
					currentMonthVal:7.3,
					status:true
				},
				{
					name:'李伟',
					code:'1812303150',
					currentVal:149.84,
					currentMonthVal:6.8,
					status:true
				},
				{
					name:'赵强',
					code:'1812303185',
					currentVal:161.72,
					currentMonthVal:7.3,
					status:true
				},
				{
					name:'王莉',
					code:'183456788',
					currentVal:168.21,
					currentMonthVal:6.21,
					status:true
				},
				{
					name:'邓超',
					code:'189456783',
					currentVal:171.32,
					currentMonthVal:6.82,
					status:true
				},
				{
					name:'张海',
					code:'189456785',
					currentVal:168.89,
					currentMonthVal:6.21,
					status:true
				},
				{
					name:'刘段超',
					code:'189456786',
					currentVal:165.46,
					currentMonthVal:5.89,
					status:true
				},
				{
					name:'王大为',
					code:'189456782',
					currentVal:156.89,
					currentMonthVal:6.73,
					status:true
				}
			]
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

			that.commonLineStart = commonLineStart;
			that.commonBarEnd = commonBarEnd;

			that.commonPie = commonPie;

			that.onHandleGlobalTabChange(0);
		},
		_drawLineStart() {
			const that = this;

			const {
				globalTabIndex = 0,
				// globalTabs = [],
				commonLineStart = {}
			} = that;
			// const text = globalTabs[globalTabIndex] + '水费收缴趋势图';

			switch (globalTabIndex) {
				case 0:
					LineEleStart.setOption({
						...commonLineStart,
						title: {
							...commonLineStart.title,
							text: '东部片区水费收缴趋势图'
						},
						yAxis: {
							...commonLineStart.yAxis,
							name: '元'
						}
					});
					break;
				case 1:
					LineEleStart1.setOption({
						...commonLineStart,
						title: {
							...commonLineStart.title,
							text: '中部片区水费收缴趋势图'
						},
						yAxis: {
							...commonLineStart.yAxis,
							name: '元'
						},
						series: [
							{
								...commonLineStart.series[0],
								data: [34797.92, 39765.53, 54292.9, 62484.06, 58427.08, 72286.99, 82311.67, 91227.57, 66392.07, 49376.82, 43449.49, 40294.15]
							},
							{
								...commonLineStart.series[1],
								data: [28752.44, 32857.03, 44860.54, 51628.64, 48276.49, 59728.5, 68011.58, 75378.51, 54857.71, 40798.54, 35900.97, 33293.81]
							}
						]
					});
					break;
				case 2:
					LineEleStart2.setOption({
						...commonLineStart,
						title: {
							...commonLineStart.title,
							text: '西部片区水费收缴趋势图'
						},
						yAxis: {
							...commonLineStart.yAxis,
							name: '元'
						},
						series: [
							{
								...commonLineStart.series[0],
								data: [69986.77, 58297.15, 60346.62, 53089.88, 60115.5, 42819.92, 35202.29, 64186.82, 66980.78, 58955.39, 47975.31, 55757.83]
							},
							{
								...commonLineStart.series[1],
								data: [57827.9, 48169.13, 49862.54, 43866.52, 49671.57, 35380.78, 29086.56, 53035.58, 55344.14, 48713.01, 39640.51, 46070.96]
							}
						]
					});
					break;
				default:
					break;
			}
		},
		_drawBarWraperEnd() {
			const that = this;

			const { globalTabIndex = 0, globalTabs = [], commonBarEnd = {} } = that;
			const text = globalTabs[globalTabIndex] + '趋势图';

			switch (globalTabIndex) {
				case 0:
					BarEleEnd.setOption({
						...commonBarEnd,
						title: {
							...commonBarEnd.title,
							text
						},
						xAxis: {
							...commonBarEnd.xAxis,
							name: '月份'
						}
					});
					break;
				case 1:
					BarEleEnd1.setOption({
						...commonBarEnd,
						title: {
							...commonBarEnd.title,
							text
						},
						xAxis: {
							...commonBarEnd.xAxis,
							name: '月份'
						},
						series: [
							{
								...commonBarEnd.series[0],
								data: [1.255, 1.434, 1.958, 2.254, 2.107, 2.607, 2.969, 3.291, 2.395, 1.781, 1.567, 1.453]
							}
						]
					});
					break;
				case 2:
					BarEleEnd2.setOption({
						...commonBarEnd,
						title: {
							...commonBarEnd.title,
							text
						},
						xAxis: {
							...commonBarEnd.xAxis,
							name: '月份'
						},
						series: [
							{
								...commonBarEnd.series[0],
								data: [2.169, 1.807, 1.87, 1.645, 1.863, 1.327, 1.091, 1.989, 2.076, 1.827, 1.487, 1.728]
							}
						]
					});
					break;
				default:
					break;
			}
		},
		_drawPipe() {
			const that = this;

			const { globalTabIndex = 0, commonPie = {} } = that;
			const { series = [] } = commonPie;

			switch (globalTabIndex) {
				case 0:
					PieEle.setOption({
						...commonPie,
						series: [
							{
								...series[0],
								itemStyle: {
									...series[0].itemStyle,
									normal: null
								}
							}
						]
					});
					break;
				case 1:
					PieEle1.setOption(commonPie);
					break;
				case 2:
					PieEle2.setOption(commonPie);
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
						LineEleStart = that.$echarts.init(that.$refs.LineEleStart);
						BarEleEnd = that.$echarts.init(that.$refs.BarEleEnd);
						PieEle = that.$echarts.init(that.$refs.PieEle);
						break;
					case 1:
						LineEleStart1 = that.$echarts.init(that.$refs.LineEleStart1);
						BarEleEnd1 = that.$echarts.init(that.$refs.BarEleEnd1);
						PieEle1 = that.$echarts.init(that.$refs.PieEle1);
						break;
					case 2:
						LineEleStart2 = that.$echarts.init(that.$refs.LineEleStart2);
						BarEleEnd2 = that.$echarts.init(that.$refs.BarEleEnd2);
						PieEle2 = that.$echarts.init(that.$refs.PieEle2);
						break;
					default:
						break;
				}

				that._drawLineStart();
				that._drawBarWraperEnd();
				that._drawPipe();
			});
		},
		onHandleListConfigurationVisible(payload = {}) {
			const that = this;

			that.configuration = {
				...that.configuration,
				visible: true
			};
			this.$refs.bgModel.showModel();
		},
		onHandleListConfigurationClose(payload = {}) {
			const that = this;

			that.configuration = {
				...that.configuration,
				visible: false
			};
		},
		// 关闭 大弹窗
		closeBg(flag) {
			console.log(flag);
		},
		showThis(index,flag){
			if(flag==true){
				return ;
			}
			this.ctrList[index].status = !this.ctrList[index].status;
		}
	},
	created() {
		this.staticPath = window.DSE.static_baseUrl;
	}
};
</script>

<style lang="scss" scoped="scoped">
@import '../county/style/index.scss';

.spectionObj {
	/deep/ .main-content {
		position: relative;
	}

	iframe {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
}

.bgmodel-row{
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	.col{
		&:first-child{
			width:calc(100% - 520px);
			/*img{*/
			/*    width: 100%;*/
			/*}*/
			iframe{
				width: 100%;
				height: 100%;
			}
		}
		&:last-child{
			width: 520px;
			padding: 10px;
			.top-head {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 30px;
				line-height: 30px;
				font-size: 14px !important;
				background: #e9e9e9 !important;
				color: #333!important;
				span{
					display: inline-block;
					width: 33.33%;
					text-align: center;
				}
			}
			.row{
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-left: 1px solid #e9e9e9;
				border-right: 1px solid #e9e9e9;
				&:last-child{
					border-bottom: 1px solid #e9e9e9;
				}
				.item{
					width: 33.33%;
					text-align: center;
					padding: 5px 0;
					&:last-child{
						display: flex;
						justify-content: center;
						align-items: center;
					}
					span{
						display: inline-block;
						line-height: 20px;
						&.cycle{
							width: 15px;
							height: 15px;
							border-radius: 50%;
							background: green;
							&.stopCycle{
								background: red;
							}
						}
						&.start{
							height: 25px;
							width: 30px;
							line-height: 25px;
							background: #0b83fe;
							color: #fff;
							border: 1px solid #0b83fe;
							border-top-left-radius: 3px;
							border-bottom-left-radius: 3px;
							cursor: pointer;
							border-right: none;
							&.startStop{
								background: #fff;
								color: #0b83fe;
							}
						}
						&.stop{
							height: 25px;
							width: 30px;
							line-height: 25px;
							background: #fff;
							color: #0b83fe;
							border: 1px solid #0b83fe;
							border-top-right-radius: 3px;
							border-bottom-right-radius: 3px;
							cursor: pointer;
							border-left: none;
							&.stopStart{
								background: #0b83fe;
								color: #fff;
							}
						}
					}

				}
			}
		}

	}
}
</style>
