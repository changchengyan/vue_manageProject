<template>
	<div id="qc">
		<div class="row">
			<span>起始时间:</span>
			<input
				class="Wdate"
				ref="sdate"
				v-model="sdate"
				id="sdate"
				name="sdate"
				onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:'readOnly',minDate:'#F{$dp.$D(\'edate\',{M:-12})}',maxDate:'#F{ $dp.$D(\'edate\')}'})"
				placeholder="请选择开始时间"
				type="text"
			/>
			<span>至</span>
			<input
				class="Wdate"
				ref="edate"
				v-model="edate"
				id="edate"
				name="edate"
				onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:'readOnly',minDate:'#F{$dp.$D(\'sdate\')}',maxDate:'#F{$dp.$D(\'sdate\',{M:+12})}'})"
				placeholder="请选择结束时间"
				type="text"
			/>
			<el-button type="primary" @click="search">搜索</el-button>
		</div>
		<div class="row">
			<template v-if="factoryName == '水质监测点'">
				<el-radio v-model="qc_radio" @change="selectThisParams" label="PH">PH</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="TURB">浊度</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="CHL">余氯</el-radio>
			</template>
			<template v-if="factoryName == '东部净水厂水质监测点'">
				<el-radio v-model="qc_radio" @change="selectThisParams" label="PH">PH</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="TDS">导电率</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="DO">溶解氧</el-radio>
			</template>
			<template v-if="factoryName == '窑山扩建水厂水质监测点'">
				<el-radio v-model="qc_radio" @change="selectThisParams" label="PH">PH</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="TDS">导电率</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="DO">溶解氧</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="TURB">浊度</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="CL">余氯</el-radio>
			</template>
			<template v-if="factoryName == '麻疙瘩、合合山净水厂水质监测点' || factoryName == '马家洼子净水厂水质监测点' || factoryName == '王团净水厂水质监测点'">
				<el-radio v-model="qc_radio" @change="selectThisParams" label="PH">PH</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="TDS">导电率</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="DO">溶解氧</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="TURB">浊度</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="CL">余氯</el-radio>
			</template>
			<template v-if="factoryName == '小洪沟净水厂水质监测点'">
				<el-radio v-model="qc_radio" @change="selectThisParams" label="PH">PH</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="TDS">导电率</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="DO">溶解氧</el-radio>
				<el-radio v-model="qc_radio" @change="selectThisParams" label="CL">余氯</el-radio>
			</template>
		</div>
		<div class="sub-charts"><div id="pipe_qc"></div></div>
	</div>
</template>

<script>
import {
	// 获取水质监测信息详情
	getSzList
} from '../../../api/interfaces/oneMap_api';

let chart_qc = null;
export default {
	name: 'qc',
	props: ['temp_id', 'factoryName'],
	components: {},
	data() {
		return {
			stcd: '',
			sdate: '',
			edate: '',
			radio: 'TURB',
			current_id: '',
			name: '浊度',
			unit: '(NTU)',
			qc_radio: 'PH',
			chlList: [],
			phList: [],
			turbList: []
		};
	},
	methods: {
		// 水质
		getWqList_(callback) {
			const that = this;
						
			that.sdate = that.$refs.sdate.value;
			that.edate = that.$refs.edate.value;
			// 选择的时间跨度不能大于 7天
			if (new Date(that.edate).getTime() - new Date(that.sdate).getTime() > 7 * 24 * 60 * 60 * 1000) {
				that.$message.error('开始时间和结束时间不能大于7天');
				return;
			}
			const { stcd = '', sdate, edate } = that;

			/**
			 * 获取水质监测信息详情
			 * @param {stcd}      	[false string]	分区县编码
			 * @param {stm}     	[false string] 	关键字查询
			 * @param {etm}     	[false string] 	关键字查询
			 */
			const params = {
				stcd,
				stm: sdate,
				etm: edate
			};
			return getSzList(params, that)
				.then((results = {}) => {
					const { status, data } = results;

					if (status) {
						const chlList = [];
						const phList = [];
						const turbList = [];
						Array.isArray(data) && data[0]
							? data.forEach((item = {}) => {
									const tm = new Date(item.tm).getTime();

									chlList.push([item.chl, tm]);
									phList.push([item.ph, tm]);
									turbList.push([item.turb, tm]);
							  })
							: [];

						that.chlList = chlList;
						that.phList = phList;
						that.turbList = turbList;
					}

					callback && callback();
				})
				.catch(e => console.error(e));
		},
		search() {
			let keyWord = '';
			if (this.radio == '1') {
				keyWord = 'TURB';
			} else {
				keyWord = 'CL';
			}
			this.getWqList_(() => this.selectThisParams('PH'));
		},
		// 切换 水质的 监测点
		selectThisParams(val) {
			const that = this;
			const { chlList, phList, turbList } = that;

			// console.warn(chlList, phList, turbList);
			val && (that.qc_radio = val);
			const tooltip = {
				trigger: 'axis',
				axisPointer: {
					type: 'line'
				}
			};
			const grid = {
				top: '40px',
				left: '40px',
				right: '45px',
				bottom: '30px'
			};
			const xAxis = {
				show: true,
				name: '时间',
				type: 'time',
				splitLine: {
					show: false
				}
			};
			const color = '#2d9fff';
			const series0 = {
				type: 'line',
				barWidth: '10%',
				smooth: true
			};

			switch (val) {
				case 'TURB':
					chart_qc.setOption({
						tooltip,
						grid,
						xAxis,
						yAxis: {
							show: true,
							name: '(°)'
						},
						color,
						series: [
							{
								...series0,
								name: '浊度',
								data: [
									[new Date().getTime() - 18000000, 1.5],
									[new Date().getTime() - 15000000, 1.3],
									[new Date().getTime() - 12000000, 1.28],
									[new Date().getTime() - 9000000, 1.9],
									[new Date().getTime() - 6000000, 2.3],
									[new Date().getTime() - 3000000, 2.4]
								]
							}
						]
					});
					break;
				case 'CL':
					chart_qc.setOption({
						tooltip,
						grid,
						xAxis,
						yAxis: {
							show: true,
							name: '(mg/L)'
						},
						color: '#2d9fff',
						series: [
							{
								...series0,
								name: '余氯',
								data: [
									[new Date().getTime() - 18000000, 0.53],
									[new Date().getTime() - 15000000, 0.62],
									[new Date().getTime() - 12000000, 0.58],
									[new Date().getTime() - 9000000, 0.51],
									[new Date().getTime() - 6000000, 0.67],
									[new Date().getTime() - 3000000, 0.61]
								]
							}
						]
					});
					break;
				case 'PH':
					chart_qc.setOption({
						tooltip,
						grid,
						xAxis,
						yAxis: {
							show: true,
							name: '(PH)'
						},
						color: '#2d9fff',
						series: [{ ...series0, name: '余氯', data: phList }]
					});
					break;
				// 浊度
				case 'TURB':
					chart_qc.setOption({
						tooltip,
						grid,
						xAxis,
						yAxis: {
							show: true,
							name: '(PH)'
						},
						color: '#2d9fff',
						series: [{ ...series0, name: '余氯', data: turbList }]
					});
					break;
				// 余氯
				case 'CHL':
					chart_qc.setOption({
						tooltip,
						grid,
						xAxis,
						yAxis: {
							show: true,
							name: '(PH)'
						},
						color: '#2d9fff',
						series: [{ ...series0, name: 'PH', data: chlList }]
					});
					break;
				case 'TDS':
					chart_qc.setOption({
						tooltip,
						grid,
						xAxis,
						yAxis: {
							show: true,
							name: '(ppm)'
						},
						color: '#2d9fff',
						series: [
							{
								...series0,
								name: '导电率',
								data: [
									[new Date().getTime() - 18000000, 942],
									[new Date().getTime() - 15000000, 879],
									[new Date().getTime() - 12000000, 720],
									[new Date().getTime() - 9000000, 880],
									[new Date().getTime() - 6000000, 920],
									[new Date().getTime() - 3000000, 880]
								]
							}
						]
					});
					break;
				case 'DO':
					chart_qc.setOption({
						tooltip,
						grid,
						xAxis,
						yAxis: {
							show: true,
							name: '(mg/L)'
						},
						color: '#2d9fff',
						series: [
							{
								...series0,
								name: '溶解氧',
								data: [
									[new Date().getTime() - 18000000, 5.3],
									[new Date().getTime() - 15000000, 5.8],
									[new Date().getTime() - 12000000, 6.7],
									[new Date().getTime() - 9000000, 7.3],
									[new Date().getTime() - 6000000, 5.7],
									[new Date().getTime() - 3000000, 6.1]
								]
							}
						]
					});
					break;
			}
		}
	},
	mounted() {
		chart_qc = this.$echarts.init(document.getElementById('pipe_qc'));

		// console.warn('start_temp_id', this.temp_id, 'end_temp_id');
		// console.warn('start_factoryName', this.factoryName, 'end_factoryName');
		this.getWqList_(() => {
			this.selectThisParams('PH');
		});
	},
	created() {
		let time = new Date();
		let currentDate = time.toLocaleDateString();
		this.edate = this.sdate = currentDate.replace(/\//g, '-');
		this.current_id = this.temp_id.split(',')[0];

		this.stcd = this.temp_id;
	}
};
</script>

<style scoped lang="scss">
#qc {
	width: 100%;
	height: 100%;
	padding: 10px;
	.row {
		width: 100%;
		height: 50px;
		padding: 10px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		span {
			display: inline-block;
			width: 80px;
			text-align: center;
		}
		.el-date-editor.el-input {
			width: 220px;
		}
		.el-button {
			margin-left: 10px;
		}
	}
	.sub-charts {
		width: 100%;
		height: calc(100% - 50px);
		& > div {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
