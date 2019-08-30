<template>
	<div class="modify">
		<!-- <div class="handleBack">
			<div class="back"><span class="go-back" @click="onHandleBack">返回</span></div>
		</div> -->
		<template v-if="!isEdit">
			<div class="header">新增</div>
			<Tab class="tab" :columns="columns" @onHandleChange="onHandleChange" />
		</template>
		<!-- 1：水厂       2： 水库            3：泵站               4：蓄水池                  5：联户表井 -->
		<div class="article" :class="isEdit && 'isEdit'">
			<!-- 新增水库 -->
			<template v-if="Number(prtype) === columns[0].value">
				<Reservoir :data="data" :onHandleCancel="onHandleBack" @onHandleSubmit="onHandleSubmit"></Reservoir>
			</template>
			<!-- 新增水厂 -->
			<template v-if="Number(prtype) === columns[1].value">
				<WaterWork :data="data" :onHandleCancel="onHandleBack" @onHandleSubmit="onHandleSubmit"></WaterWork>
			</template>
			<!-- 新增泵站 -->
			<template v-if="Number(prtype) === columns[2].value">
				<PumpingStation :data="data" :onHandleCancel="onHandleBack" @onHandleSubmit="onHandleSubmit"></PumpingStation>
			</template>
			<!-- 新增联户表井 -->
			<template v-if="Number(prtype) === columns[3].value" :isSaveSuccessWaterMeter="isSaveSuccessWaterMeter">
				<WaterMeter :data="data" :onHandleCancel="onHandleBack" @onHandleSubmit="onHandleSubmit"></WaterMeter>
			</template>
			<!-- 新增蓄水池 -->
			<template v-if="Number(prtype) === columns[4].value">
				<Cistern :data="data" :onHandleCancel="onHandleBack" @onHandleSubmit="onHandleSubmit"></Cistern>
			</template>
		</div>
	</div>
</template>

<script>
import {
	// 检查水库编码是否存在
	wrResBCtrlCheckExist,
	// 检查水厂编码是否存在
	wrWfctBCtrlCheckExist,
	// 检查泵站编码是否存在
	wrPumpBCtrlCheckExist,
	// 检查联户表井编码是否存在
	dseWrLhbjBCtrlCheckExist,
	// 检查蓄水池编码是否存在
	dsePoolinfBCtrlCheckExist,
	// 系统配置-工程配置-保存更新水库基本信息
	saveOrUpWrResB,
	// 系统配置-工程配置-保存更新水厂基本信息
	saveOrUpWrWfctB,
	// 系统配置-工程配置-保存更新泵站基本信息
	saveOrUpWrPumpB,
	// 系统配置-工程配置-保存更新联户表井基本信息
	saveOrUpDseWrLhbjB,
	// 系统配置-工程配置-保存更新蓄水池基本信息
	saveOrUpDsePoolinfB
} from '../../../api/interfaces/system_api';

import Tab from './comonents/Tab';
import Cistern from './comonents/Cistern';
import PumpingStation from './comonents/PumpingStation';
import Reservoir from './comonents/Reservoir';
import WaterMeter from './comonents/WaterMeter';
import WaterWork from './comonents/WaterWork';

export default {
	name: 'systemEngineeringModify',
	data() {
		return {
			// 默认新增
			isEdit: false,
			// 展示类型 默认：水库
			prtype: 2,
			// tab标签栏
			columns: Array.from(new Array(5)).map(() => ({})),
			// 修改数据
			data: {},
			isSaveSuccessWaterMeter: false
		};
	},
	components: {
		Tab,
		Cistern,
		PumpingStation,
		Reservoir,
		WaterMeter,
		WaterWork
	},
	created() {
		const that = this;
		const { params = {} } = that.$route;
		const { isEdit = false, prtype } = params;

		console.warn('详情：' + JSON.stringify(params));

		// 初始化编辑
		that.isEdit = isEdit;
		// 如果是编辑,则选择相应 tab
		isEdit && (that.prtype = prtype);
		that.data = params;
	},
	methods: {
		onHandleBack() {
			const that = this;

			that.$router.push({
				name: 'systemEngineering'
			});
			that.$store.commit('set_asideStatus', true);
			that.$emit('showAside');
		},
		onHandleChange(prtype) {
			const that = this;

			that.prtype = prtype;
		},
		onHandleSubmit(payload) {
			const that = this;

			// 新增&&修改
			that.onHandleCreateAndUpdate(payload);
		},
		onHandleCreateAndUpdate(params) {
			const that = this;

			const { prtype, isEdit } = that;
			params.compYm = String(params.compYm).replace(/-/g, '');
			// 1：水厂       2： 水库            3：泵站               4：蓄水池                  5：联户表井
			switch (Number(prtype)) {
				case 1:
					/**
					 * 检查水厂编码是否存在
					 * @param {wfctCd}      [true string] 	水厂编码
					 */
					wrWfctBCtrlCheckExist(
						{
							wfctCd: params.wfctCd
						},
						that
					)
						.then((_ = {}) => {
							if (_.data && !isEdit) {
								that.$message({
									message: '编码已存在，请重新输入',
									type: 'warning'
								});
								return;
							}
							/**
							 * 保存更新水厂基本信息
							 * @param {prtype}      [false string] 	工程类型
							 */
							return saveOrUpWrWfctB(params, that).then((results = {}) => {
								const { status, msg } = results;

								if (status) {
									that.onHandleBack();

									that.$message({
										message: '提交成功~',
										type: 'success'
									});
								} else {
									that.$message({
										message: msg,
										type: 'warning'
									});
								}
							});
						})
						.catch(e => {});
					break;
				case 2:
					/**
					 * 检查水库编码是否存在
					 * @param {resCd}      [true string] 	水库编码
					 */
					wrResBCtrlCheckExist(
						{
							resCd: params.resCd
						},
						that
					)
						.then((_ = {}) => {
							if (_.data && !isEdit) {
								that.$message({
									message: '编码已存在，请重新输入',
									type: 'warning'
								});
								return;
							}
							/**
							 * 保存更新水库基本信息
							 */
							return saveOrUpWrResB(params, that).then((results = {}) => {
								const { status, msg } = results;

								if (status) {
									that.onHandleBack();

									that.$message({
										message: '提交成功~',
										type: 'success'
									});
								} else {
									that.$message({
										message: msg,
										type: 'warning'
									});
								}
							});
						})
						.catch(e => {});
					break;
				case 3:
					/**
					 * 检查泵站编码是否存在
					 * @param {pumpCd}      [true string] 	泵站编码
					 */
					wrPumpBCtrlCheckExist(
						{
							pumpCd: params.pumpCd
						},
						that
					)
						.then((_ = {}) => {
							if (_.data && !isEdit) {
								that.$message({
									message: '编码已存在，请重新输入',
									type: 'warning'
								});
								return;
							}

							/**
							 * 保存更新泵站基本信息
							 * @param {prtype}      [false string] 	工程类型
							 */
							return saveOrUpWrPumpB(params, that).then((results = {}) => {
								const { status, msg } = results;

								if (status) {
									that.onHandleBack();
									
									that.$message({
										message: '提交成功~',
										type: 'success'
									});
									// that.$store.commit('', {
									//
									// });
								} else {
									that.$message({
										message: msg,
										type: 'warning'
									});
								}
							});
						})
						.catch(e => {});
					break;
				case 4:
					/**
					 * 检查蓄水池编码是否存在
					 * @param {poolcd}      [true string] 	蓄水池编码
					 */
					dsePoolinfBCtrlCheckExist(
						{
							poolcd: params.poolcd
						},
						that
					)
						.then((_ = {}) => {
							if (_.data && !isEdit) {
								that.$message({
									message: '编码已存在，请重新输入',
									type: 'warning'
								});
								return;
							}

							/**
							 * 保存更新蓄水池基本信息
							 * @param {prtype}      [false string] 	工程类型
							 */
							return saveOrUpDsePoolinfB(params, that).then((results = {}) => {
								const { status, msg } = results;

								if (status) {
									that.onHandleBack();

									that.$message({
										message: '提交成功~',
										type: 'success'
									});
								} else {
									that.$message({
										message: msg,
										type: 'warning'
									});
								}
							});
						})
						.catch(e => {});
					break;
				case 5:
					that.isSaveSuccessWaterMeter = false;
					/**
					 * 检查联户表井编码是否存在
					 * @param {bjid}      [true string]  联户表井编码
					 */
					dseWrLhbjBCtrlCheckExist(
						{
							bjid: params.bjid
						},
						that
					)
						.then((_ = {}) => {
							if (_.data && !isEdit) {
								that.$message({
									message: '编码已存在，请重新输入',
									type: 'warning'
								});
								return;
							}

							/**
							 * 保存更新联户表井基本信息
							 * @param {prtype}      [false string] 	工程类型
							 */
							return saveOrUpDseWrLhbjB(params, that).then((results = {}) => {
								const { status, msg } = results;

								if (status) {
									that.isSaveSuccessWaterMeter = true;
									
									that.$message({
										message: '提交成功~',
										type: 'success'
									});
								} else {
									that.$message({
										message: msg,
										type: 'warning'
									});
								}
							});
						})
						.catch(e => {});
					break;
			}
		},
		_initialization() {
			const that = this;

			// 初始化 tab标签栏
			that.columns = [
				{
					label: '新增水库',
					value: 2
				},
				{
					label: '新增水厂',
					value: 1
				},
				{
					label: '新增泵站',
					value: 3
				},
				{
					label: '新增联户表井',
					value: 5
				},
				{
					label: '新增蓄水池',
					value: 4
				}
			];
		}
	},
	mounted() {
		const that = this;

		// 初始化
		that._initialization();
	}
};
</script>

<style scoped="scoped" lang="scss">
@import '../../../common/styles/settings/_vars.scss';

.handleBack {
	position: relative;
	width: 100%;
	height: 50px;
	padding: 10px 10px;
	background-color: #fff;
	box-shadow: 3px 5px 15px rgba(0, 0, 0, 0.1);

	.back {
		width: 80px;
		height: 30px;
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 10;
		text-align: center;
	}
}

.modify {
	width: 100%;
	height: 100%;
	min-height: 100%;
	overflow-y: auto;
	background-color: $component-background;
	background-color: #fff;

	.header {
		padding: 20px;
		background-color: #d8ecff;
		color: #356491;
		text-align: center;
		font-size: 18px;
	}

	.block {
		background-color: #fff;
	}

	.header,
	.tab,
	.article {
		max-width: 1200px;
		margin-right: auto;
		margin-left: auto;
	}

	.article {
		margin-bottom: 24px;
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;

		background-color: #fff;

		&.isEdit {
			margin-top: 24px;
			border-top-right-radius: 6px;
			border-top-left-radius: 6px;
		}
	}
}
</style>
