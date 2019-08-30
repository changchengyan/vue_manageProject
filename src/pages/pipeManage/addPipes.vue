<template>
	<div id="addPipes">
		<div class="top-actions">
			<div class="back" @click="goback"><span class="go-back">返回</span></div>
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
	name: 'addPipes',
	data() {
		return {
			title: '修改设备管道',
			forms: []
		};
	},
	methods: {
		goback() {
			this.$router.push({
				name: 'pipeStandingBook'
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

		that.forms = [
			{ name: 'pipeName', value: payload.PIPE_NAME, label: '管道名称：', disabled: false, type: 0, children: [] },
			{ name: 'code', value: payload.CODE, label: '管道编码：', disabled: false, type: 0, children: [] },
			{ name: 'pipelineCode', value: payload.PIPELINE_CODE, label: '管线编码：', disabled: false, type: 0, children: [] },
			{ name: 'pipelineName', value: payload.PIPELINE_NAME, label: '管线名称：', disabled: false, type: 0, children: [] },
			{ name: 'pipeMaterial', value: payload.PIPE_MATERIAL, label: '管材：', disabled: false, type: 0, children: [] },
			{ name: 'pipeLength', value: payload.PIPE_LENGTH, label: '管长：', disabled: false, type: 0, children: [] },
			{ name: 'pipeRadius', value: payload.PIPE_RADIUS, label: '管径：', disabled: false, type: 0, children: [] },
			{ name: 'pipeThickness', value: payload.PIPE_THICKNESS, label: '管壁厚度：', disabled: false, type: 0, children: [] },
			{ name: 'interfaceType', value: payload.INTERFACE_TYPE, label: '接口形式：', disabled: false, type: 0, children: [] },
			{ name: 'startPoint', value: payload.START_POINT, label: '起点编号 起点坐标：', disabled: false, type: 0, children: [] },
			{ name: 'endPoint', value: payload.END_POINT, label: '终点编号 终点坐标：', disabled: false, type: 0, children: [] },
			{ name: 'companyId', value: payload.COMPANY_ID, label: '所属水司：', disabled: false, type: 0, children: [] },
			{ name: 'installTime', value: payload.INSTALL_TIME, label: '安装时间：', disabled: false, type: 0, children: [] },
			{ name: 'status', value: payload.STATUS, label: '管道状态 使用状态：', disabled: false, type: 0, children: [] },
			{ name: 'temperrature', value: payload.TEMPERRATURE, label: '输送温度：', disabled: false, type: 0, children: [] },
			{ name: 'transMedium', value: payload.TRANS_MEDIUM, label: '输送介质：', disabled: false, type: 0, children: [] },
			{ name: 'pressure', value: payload.PRESSURE, label: '输送压力/公称压力：', disabled: false, type: 0, children: [] },
			{ name: 'flowThreshold', value: payload.FLOW_THRESHOLD, label: '流量阈值：', disabled: false, type: 0, children: [] },
			{ name: 'presThreshold', value: payload.PRES_THRESHOLD, label: '压力阈值：', disabled: false, type: 0, children: [] },
			{ name: 'designDept', value: payload.DESIGN_DEPT, label: '设计单位：', disabled: false, type: 0, children: [] },
			{ name: 'constructionDept', value: payload.CONSTRUCTION_DEPT, label: '施工单位：', disabled: false, type: 0, children: [] },
			{ name: 'supervisorDept', value: payload.SUPERVISOR_DEPT, label: '监理单位：', disabled: false, type: 0, children: [] },
			{ name: 'buildDept', value: payload.BUILD_DEPT, label: '建设单位：', disabled: false, type: 0, children: [] },
			{ name: 'location', value: payload.LOCATION, label: '所在地：', disabled: false, type: 0, children: [] },
			{ name: 'useYear', value: payload.USE_YEAR, label: '使用年限：', disabled: false, type: 0, children: [] },
			{ name: 'type', value: payload.TYPE, label: '管道类型：', disabled: false, type: 0, children: [] },
			{ name: 'locationId', value: payload.LOCATION_ID, label: '所在地：', disabled: false, type: 0, children: [] },
			{ name: 'roadWeight', value: payload.ROAD_WEIGHT, label: '路面荷载：', disabled: false, type: 0, children: [] },
			{ name: 'pipeDeep', value: payload.PIPE_DEEP, label: '管道埋深：', disabled: false, type: 0, children: [] },
			{ name: 'startel', value: payload.STARTEL, label: '起点高程：', disabled: false, type: 0, children: [] },
			{ name: 'endel', value: payload.ENDEL, label: '终点高程：', disabled: false, type: 0, children: [] },
			{ name: 'antiStyle', value: payload.ANTI_STYLE, label: '防腐形式：', disabled: false, type: 0, children: [] },
			// { name: 'reponsibleId', value: payload.REPONSIBLE_ID, label: '责任人ID：', disabled: false, type: 0, children: [] },
			{
				name: 'pipeLevel',
				value: payload.PIPELEVEL,
				label: '管道评级',
				disabled: false,
				type: 1,
				children: [{ name: 'deviceLevel', label: '一级', value: 1 }, { name: 'deviceLevel', label: '二级', value: 2 }, { name: 'deviceLevel', label: '三级', value: 3 }]
			},
			{ name: 'antiseptic', value: payload.ANTISEPTIC, label: '防腐形式：', disabled: false, type: 0, children: [] },
			{ name: 'manufacturer', value: payload.MANUFACTURER, label: '生产厂家：', disabled: false, type: 0, children: [] },
			{ name: 'areaId', value: payload.AREAI_D, label: '所属分区：', disabled: false, type: 0, children: [] }
			// { name: 'id', value: payload.ID, label: '管道ID：', disabled: false, type: 0, children: [] }
		].map(item => ({
			...item,
			placeholder: String(item.label).substr(0, String(item.label).lastIndexOf('：'))
		}));
	}
};
</script>

<style scoped lang="scss">
@import '../../common/styles/settings/_vars.scss';

#addPipes {
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
		// 	height: calc(100% - 100px);
		// }
	}
}
</style>
