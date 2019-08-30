<template>
	<div id="addDeves">
		<div class="top-actions">
			<div class="back"><span class="go-back" @click="goback">返回</span></div>
		</div>
		<div class="article">
			<h3 class="globalTitle">{{ title }}</h3>
			<div class="sub-content">
				<el-form ref="form" inline label-width="170px">
					<el-form-item v-for="(item, key) in forms" :key="key" :label="item.label" :style="item.type !== 4 && 'width: calc(50% - 10px);'">
						<el-select v-if="item.type === 1 && item.children" v-model="item.value" :placeholder="`请选择${item.placeholder}`">
							<el-option v-for="(i, k) in item.children" :key="k" :label="i.label" :value="i.value"></el-option>
						</el-select>
						<template v-else-if="item.type === 2 && item.children">
							<el-radio v-for="(i, k) in item.children" :key="k" v-model="item.value" :label="i.value">{{ i.label }}</el-radio>
						</template>
						<template v-else-if="item.type === 3">
							<el-date-picker type="datetime" v-model="item.value" :placeholder="`请选择${item.placeholder}`"></el-date-picker>
						</template>
						<el-input v-else-if="item.type === 4" v-model="item.value" type="textarea" :rows="5" :placeholder="item.placeholder" style="700px"></el-input>
						<el-input v-else v-model="item.value" :placeholder="!item.disabled && `请输入${item.placeholder}`" :disabled="item.disabled || false"></el-input>
					</el-form-item>
					<el-form-item style="width: 100%; text-align: center;"><el-button type="primary" @click="onHandleSubmit">保存</el-button></el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'addDeves',
	data() {
		return {
			title: '修改设备台账',
			forms: []
		};
	},
	methods: {
		goback() {
			this.$router.push({
				name: 'devStandingBook'
			});
			this.$store.commit('set_asideStatus', true);
			this.$emit('showAside');
		},
		onHandleSubmit() {
			const that = this;

			const { title, forms = [] } = that;
			const params = {};
			forms.forEach((item = {}) => {
				Object.assign(params, {
					[item.name]: item.value
				});
			});

			that.$message.success(`${title}成功`);
			that.goback();
		}
	},
	mounted() {
		const that = this;
		const payload = that.$route.params;

		const { DSE = {} } = window || {};
		const { devices = [] } = DSE;

		that.forms = [
			// {
			// 	name: 'pipeId',
			// 	value: payload.PIPE_ID,
			// 	label: '管道ID：',
			// 	disabled: true,
			// 	type: 0,
			// 	children: []
			// },
			{
				name: 'constructionDept',
				value: payload.CONSTRUCTION_DEPT,
				label: '施工单位：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'devType',
				value: payload.DEV_TYPE,
				label: '设备类型：',
				disabled: false,
				type: 0,
				children: devices
			},
			{
				name: 'groundHeight',
				value: payload.GROUND_HEIGHT,
				label: '地面标高：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'caliber',
				value: payload.CALIBER,
				label: '公称直径：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'rotationDirection',
				value: payload.ROTATION_DIRECTION,
				label: '转动方向：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'isHarm',
				value: payload.IS_HARM,
				label: '是否产生职业危害：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'buildDept',
				value: payload.BUILD_DEPT,
				label: '建设单位：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'nameplateParam',
				value: payload.NAMEPLATE_PARAM,
				label: '设备铭牌及技术参数：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'generalMedium',
				value: payload.GENERAL_MEDIUM,
				label: '通用介质：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'devStatus',
				value: payload.DEV_STATUS,
				label: '设备状态：',
				type: 1,
				children: [
					{
						label: '是正常',
						value: 0
					},
					{
						label: '是删除',
						value: 1
					}
				]
			},
			{
				name: 'deviceLevel',
				value: payload.DEVICE_LEVEL,
				label: '设备评级：',
				disabled: false,
				type: 1,
				children: [
					{
						name: 'deviceLevel',
						label: '一类',
						value: 1
					},
					{
						name: 'deviceLevel',
						label: '二类',
						value: 2
					},
					{
						name: 'deviceLevel',
						label: '三类',
						value: 3
					}
				]
			},
			{
				name: 'designDept',
				value: payload.DESIGN_DEPT,
				label: '设计单位：',
				disabled: false,
				type: 0,
				children: []
			},
			// {
			// 	name: 'outFactoryCode',
			// 	value: payload.OUT_FACTORY_CODE,
			// 	label: '出厂编号：',
			// 	disabled: false,
			// 	type: 0,
			// 	children: []
			// },
			{
				name: 'specificationType',
				value: payload.SPECIFICATION_TYPE,
				label: '规格型号：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'nominalPressure',
				value: payload.NOMINAL_PRESSURE,
				label: '公称压力：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'supervisorDept',
				value: payload.SUPERVISOR_DEPT,
				label: '监理单位：',
				disabled: false,
				type: 0,
				children: []
			},
			// {
			// 	name: 'probePointCode',
			// 	value: payload.PROBE_POINT_CODE,
			// 	label: '探头点编号：',
			// 	disabled: false,
			// 	type: 0,
			// 	children: []
			// },
			// {
			// 	name: 'companyId',
			// 	value: payload.COMPANY_ID,
			// 	label: '水司id：',
			// 	disabled: false,
			// 	type: 0,
			// 	children: []
			// },
			{
				name: 'installAddr',
				value: payload.INSTALL_ADDR,
				label: '安装位置：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'factoryTel',
				value: payload.FACTORY_TEL,
				label: '厂家联系方式：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'topHeight',
				value: payload.TOP_HEIGHT,
				label: '管顶标高：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'runParam',
				value: payload.RUN_PARAM,
				label: '运行参数：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'outFactoryTime',
				value: payload.OUT_FACTORY_TIME,
				label: '出厂日期：',
				disabled: false,
				type: 3,
				children: []
			},
			{
				name: 'installTime',
				value: payload.INSTALL_TIME,
				label: '安装日期：',
				disabled: false,
				type: 3,
				children: []
			},
			{
				name: 'lifeCycle',
				value: payload.LIFE_CYCLE,
				label: '寿命周期：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'manufacturer',
				value: payload.MANUFACTURER,
				label: '生产厂家：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'fullOpenNum',
				value: payload.FULL_OPEN_NUM,
				label: '全开转数：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'name',
				value: payload.NAME,
				label: '设备名称：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'isDanger',
				value: payload.IS_DANGER,
				label: '是否为重大危险源',
				disabled: false,
				type: 2,
				children: [
					{
						name: 'isDanger',
						label: '是',
						value: 0
					},
					{
						name: 'isDanger',
						label: '否',
						value: 1
					}
				]
			},
			{
				name: 'code',
				value: payload.CODE,
				label: '设备编号：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'probeCode',
				value: payload.PROBE_CODE,
				label: '探头编号：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'pileNum',
				value: payload.PILE_NUM,
				label: '桩号：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'connectType',
				value: payload.CONNECT_TYPE,
				label: '接口形式：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'mediumTemperature',
				value: payload.MEDIUM_TEMPERATURE,
				label: '介质温度：',
				disabled: false,
				type: 0,
				children: []
			},
			// {
			// 	name: 'reponsibleId',
			// 	value: payload.REPONSIBLE_ID,
			// 	label: '设备管理员id：',
			// 	disabled: false,
			// 	type: 0,
			// 	children: []
			// },
			{
				name: 'depth',
				value: payload.DEPTH,
				label: '埋深：',
				disabled: false,
				type: 0,
				children: []
			},
			{
				name: 'lastRepairTime',
				value: payload.LAST_REPAIR_TIME,
				label: '上次大修时间：',
				disabled: false,
				type: 3,
				children: []
			}
			// {
			// 	name: 'id',
			// 	value: payload.ID,
			// 	label: 'ID：',
			// 	disabled: true,
			// 	type: 0,
			// 	children: []
			// }
		].map(item => ({
			...item,
			placeholder: String(item.label).substr(0, String(item.label).lastIndexOf('：'))
		}));
	}
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/settings/_vars.scss';

#addDeves {
	width: 100%;
	height: 100%;
	padding-bottom: 25px;
	background-color: $component-background;
	overflow-y: auto;

	/deep/ .el-input__inner {
		width: 250px !important;
	}

	/deep/ .el-textarea {
		width: 735px;
	}

	/deep/ .el-form-item {
		margin-bottom: $padding-sm;
	}

	.top-actions {
		position: relative;
		width: 100%;
		height: 50px;
		padding: 10px 10px;
		box-shadow: 3px 5px 15px rgba(0, 0, 0, 0.1);
		background-color: #fff;

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

	.article {
		width: 970px;
		margin-right: auto;
		margin-left: auto;
		margin-top: $padding-lg;
		padding-top: $padding-lg;
		padding-bottom: $padding-lg;
		border-radius: $border-radius-base;
		background-color: #fff;

		.globalTitle {
			margin-top: 0;
			margin-bottom: $padding-lg;
			text-align: center;
		}

		// .sub-content {
		// 	width: 970px;
		// 	margin-right: auto;
		// 	margin-left: auto;
		// 	height: calc(100% - 100px);
		// }
	}
}
</style>
