<template>
	<div class="article">
		<!-- 操作栏 -->
		<div class="handle">
			<el-form :inline="true" class="form">
				<el-form-item label="分区选择:">
					<el-select v-model="tabsList[tabIndex].areaItem" placeholder="请选择分区" @change="onHandleChangeArea">
						<el-option v-for="item in areaList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="泵站名称:">
					<el-select v-model="tabsList[tabIndex].engineeringValue" placeholder="请选择泵站名称" @change="onHandleChangeEngineering">
						<el-option v-for="item in tabsList[tabIndex].engineerings" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="监测点:">
					<el-select v-model="tabsList[tabIndex].monitorValue" placeholder="请选择监测点" @change="onHandleChangeMonitor">
						<el-option v-for="(item, key) in tabsList[tabIndex].monitors" :key="key" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label=""><el-input v-model="tabsList[tabIndex].keywords" placeholder="模糊搜素 户名 户号 所属区域 管理单位"></el-input></el-form-item>
				<el-form-item><el-button type="primary" @click="onHandleSearch">搜索</el-button></el-form-item>
				<el-form-item label="时间:">
					<el-date-picker
						v-model="tabsList[tabIndex].date"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						:clearable="false"
						@change="getThisTime($event, 2)"
						@keyup.enter.native="getThisTime($event, 2)"
					></el-date-picker>
				</el-form-item>
			</el-form>
		</div>
		<!-- 图表 -->
		<div class="chart">
			<div class="category" ref="ChartCategory2"></div>
			<div v-show="tabsList[tabIndex].monitorType === '1'" class="chart-radios">
				<el-radio v-model="tabsList[tabIndex].flag" label="1" @change="showThisChart_waterFactory">浊度</el-radio>
				<el-radio v-model="tabsList[tabIndex].flag" label="2" @change="showThisChart_waterFactory">余氯</el-radio>
			</div>
		</div>
		<!-- 表格 -->
		<div class="globalTable">
			<table class="innerTable">
				<thead>
					<tr>
						<th v-for="item in tabsList[tabIndex].columns" :key="item.key">
							<span>{{ item.name }}</span>
						</th>
						<th style="width: 80px; text-align: center;"><span>操作</span></th>
					</tr>
				</thead>
				<tbody>
					<template v-if="tabsList[tabIndex].list && tabsList[tabIndex].list.length">
						<tr v-for="(item, i) in tabsList[tabIndex].list" :key="i">
							<td>
								<span>{{ item.tm }}</span>
							</td>
							<td>
								<span>{{ item.stnm }}</span>
							</td>
							<td>
								<span>
									{{
										item.jctype === '1'
											? tabsList[tabIndex].flag === '1'
												? item.turb + '（NTU）'
												: tabsList[tabIndex].flag === '2'
												? item.chl + '（mg/L）'
												: item.turb + '（NTU）'
											: item.jctype === '2'
											? item.wgage + '（MPa）'
											: item.jctype === '3'
											? item.q + '（m³/h）'
											: item.jctype === '4'
											? item.rz + '（m）'
											: ''
									}}
								</span>
							</td>
							<td class="btns" @click="onHandleListModelVisible({ ...item, $index: i })"><span style="margin-right: 0px">修改</span></td>
						</tr>
					</template>
					<template v-else>
						<tr>
							<td colspan="4"><span style="line-height: 30px">暂时没有数据！</span></td>
						</tr>
					</template>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		tabIndex: {
			type: Number,
			default() {
				return 0;
			}
		},
		tabsList: {
			type: Array,
			default() {
				return [{}];
			}
		},
		areaList: {
			type: Array,
			default() {
				return [{}];
			}
		},
		onHandleChangeArea: {
			type: Function,
			default() {
				return () => {};
			}
		},
		onHandleChangeEngineering: {
			type: Function,
			default() {
				return () => {};
			}
		},
		onHandleChangeMonitor: {
			type: Function,
			default() {
				return () => {};
			}
		},
		onHandleSearch: {
			type: Function,
			default() {
				return () => {};
			}
		},
		// getThisTime
		onHandleDatePicker: {
			type: Function,
			default() {
				return () => {};
			}
		},
		// showThisChart_waterFactory
		onHandleRadioToogle: {
			type: Function,
			default() {
				return () => {};
			}
		},
		onHandleListModelVisible: {
			type: Function,
			default() {
				return () => {};
			}
		}
	},
	methods: {
		name() {}
	}
};
</script>

<style lang="scss" scoped="scoped">
@import './style.scss';
</style>
