<template>
	<div class="block">
		<el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="165px" class="ruleForm">
			<el-form-item v-for="(item, key) in formList" :key="key" :label="item.label" :prop="item.name">
				<!-- 下拉框 -->
				<el-select v-if="item.type === 1" v-model="ruleForm[item.name]" :placeholder="item.placeholder" :disabled="item.disabled">
					<el-option v-for="(it, k) in item.children" :key="k" :label="it.label" :value="it.value"></el-option>
				</el-select>
				<!-- 单选框 -->
				<template v-else-if="item.type === 2">
					<el-radio v-for="(it, k) in item.children" :key="k" v-model="ruleForm[item.name]" :label="it.value">{{ it.label }}</el-radio>
				</template>
				<!-- 日期选择 -->
				<template v-else-if="item.type === 3">
					<el-date-picker v-model="ruleForm[item.name]" type="month" :placeholder="item.placeholder" value-format="yyyyMM"></el-date-picker>
				</template>
				<!-- 文本框 -->
				<el-input v-else v-model="ruleForm[item.name]" :placeholder="item.placeholder" :disabled="item.disabled"></el-input>
			</el-form-item>
		</el-form>
		<!-- 联户表井内部信息 -->
		<div class="table">
			<h3 class="title">
				<span>联户表井内部信息</span>
				<el-button type="primary" @click="onHandleModelVisible">新增</el-button>
			</h3>
			<el-table :data="inners" width="100%" size="small  border stripe">
				<el-table-column v-for="(item, key) in innerColumns" :key="key" :prop="item.value" :label="item.label" align="center"></el-table-column>
			</el-table>
		</div>
		<el-form class="ruleForm" label-width="165px">
			<el-form-item label="图片" prop="e" style="width: 100%;">
				<el-upload
					style="margin-top: 16px;"
					name="files"
					list-type="picture-card"
					multiple
					:action="upload.action"
					:with-credentials="true"
					:data="{ id: 1 }"
					:on-success="onHandlePictureSuccess"
					:on-preview="onHandlePictureCardPreview"
					:on-remove="onHandlePictureCardRemove"
				>
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
			<!-- form 提交按钮 -->
			<div class="actions">
				<span class="save" @click="onHandleSubmitForm('ruleForm')">保存</span>
				<span class="cancel" @click="onHandleCancel">取消</span>
			</div>
			<!-- <el-form-item class="formBtns">
				<el-button @click="onHandleCancel">返&nbsp;回</el-button>
				<el-button type="primary" @click="onHandleSubmitForm('ruleForm')">保&nbsp;存</el-button>
			</el-form-item> -->
		</el-form>

		<!-- 上传 -->
		<el-dialog :visible.sync="upload.visible" size="tiny"><img width="100%" :src="upload.imageUrl" alt="" /></el-dialog>
		<!-- 新增 -->
		<dse-normal-model :tips="model.title" :modelFlag="model.visible" :onHandleModelClose="onHandleModelClose" class="fnModel">
			<div class="modelWraper">
				<el-form ref="form" label-width="100px">
					<el-form-item label="用户名称"><el-input v-model="temInners.a"></el-input></el-form-item>
					<el-form-item label="水表编号"><el-input v-model="temInners.b"></el-input></el-form-item>
					<el-form-item label="联系方式"><el-input v-model="temInners.c"></el-input></el-form-item>
					<el-form-item label="用水类型">
						<el-select v-model="temInners.d">
							<el-option value="生活用水">生活用水</el-option>
							<el-option value="农业用水">农业用水</el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<el-button type="primary" @click="onHandleModelSubmit">提交</el-button>
			</div>
		</dse-normal-model>
	</div>
</template>

<script>
// 新增修改联户表井
import uuidv1 from 'uuid/v1';
import { mapGetters } from 'vuex';
import {
	// 保存更新用水户基本信息
	saveOrUpDseWateruseB
} from '../../../../api/interfaces/system_api';
import URLS from '../../../../api/urls';
import { systemAction } from '../../../../mixins/system';
import dseNormalModel from '../../../../common/components/toast/dseNormalModel';
import { VDATA } from '../../../../utils/el_validater';
import { getAreaList } from '../../../../api/interfaces/common_api';

//限制 最大整数
function isDigitsAndRange(rule, val, callBack) {
	let vdt = VDATA(val, {
		digits: { msg: '您输入的不是整数' },
		range: { param: [0, 999], msg: '请输入小于999的整数!' }
	});
	if (!vdt.result) {
		callBack(new Error(vdt.msg));
	} else {
		callBack();
	}
}

export default {
	props: {
		data: {
			type: Object,
			default() {
				return {};
			}
		},
		isSaveSuccessWaterMeter: {
			type: Boolean,
			default() {
				return false;
			}
		},
		onHandleCancel: {
			type: Function,
			default() {
				return () => {};
			}
		},
		onHandleSubmit: {
			type: Function,
			default() {
				return () => {};
			}
		}
	},
	components: {
		dseNormalModel
	},
	mixins: [systemAction],
	computed: {
		...mapGetters(['get_partition'])
	},
	data() {
		return {
			name: 'systemEngineeringIndex',
			formList: [],
			ruleForm: {},
			rules: {},
			upload: {
				action: '/api/upload' || URLS.uploadFiles,
				imageUrl: '',
				visible: false
			},
			inners: [],
			innerColumns: [],
			model: {
				visible: false,
				title: '新增联户表井用水户信息'
			},
			temInners: {
				id: '',
				d: '生活用水'
			},
			fileList: [],
			areaList: []
		};
	},
	methods: {
		onHandlePictureSuccess(file) {
			const that = this;

			const { filename = {} } = file;
			const [{ path }] = filename[0] ? filename : [{}];

			that.fileList.push(path);
		},
		onHandlePictureCardPreview(file, fileList) {
			const that = this;

			const { url } = file;

			that.upload = {
				...that.upload,
				imageUrl: url,
				visible: true
			};
		},
		// 获取分区的列表
		getAreaList_() {
			let that = this;
			getAreaList(
				{
					list: [3, 4]
				},
				that
			).then(res => {
				let { data } = res;
				data = data && data.length > 0 ? data : [];

				let list = [];
				data.map(val => {
					list.push({
						label: val.name,
						value: val.code
					});
				});

				that.areaList = list;
			});
		},
		onHandlePictureCardRemove(file) {
			const that = this;

			const { response = {} } = file;
			const { filename = [] } = response;
			const [{ path }] = filename[0] ? filename : [{}];

			that.fileList = that.fileList.filter((item = {}) => {
				if (item === path) return false;
				return true;
			});

			that.upload = {
				...that.upload,
				imageUrl: '',
				visible: false
			};
		},
		onHandleSubmitForm(formName) {
			const that = this;

			const { ruleForm, inners, fileList } = that;

			that.$refs[formName].validate(valid => {
				if (valid) {
					that.$emit('onHandleSubmit', { ...ruleForm, inners: inners, fileList });
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		onHandleResetForm(formName) {
			const that = this;

			that.$refs[formName].resetFields();
			that.onHandleBack();
		},
		onHandleBack() {
			const that = this;

			that.$router.push({
				name: 'systemEngineeringIndex'
			});
			that.$store.commit('set_asideStatus', true);
			that.$emit('showAside');
		},
		onHandleModelVisible() {
			const that = this;

			const { isSaveSuccessWaterMeter } = that;
			if (!isSaveSuccessWaterMeter) return that.$message.warning('请先保存联户表井信息');

			that.model = {
				...that.model,
				visible: true
			};
		},
		onHandleModelClose() {
			const that = this;

			that.model = {
				...that.model,
				visible: false
			};

			that.temInners = {};
		},
		// 联户表井内部信息提交
		onHandleModelSubmit() {
			const that = this;

			const uuid = uuidv1().replace(/-/g, '');
			that.temInners.id = uuid;
			console.warn(that.temInners, 123);
			if (that.temInners.id) {
				that.inners = [...that.inners, that.temInners];
			}
			/**
			 * 保存更新用水户基本信息（用水类型：1居民生活用水,2行政事业用水,3工业用水,4经营服务用水,5特种行业用水	）
			 * @param {wid}      	[false string] 			用水户编号
			 * @param {uname}     	[false string] 			用水户名称
			 * @param {bjid}      	[false string] 			联户表井代码
			 * @param {sbbh}      	[false string] 			水表编号
			 * @param {whouse}      [false string] 			用水户住址
			 * @param {wtel}      	[false string] 			用水户联系方式
			 * @param {ystype}      [false string] 			用水类型：1居民生活用水,2行政事业用水,3工业用水,4经营服务用水,5特种行业用水
			 * @param {mtype}      	[false string] 			水表类型:1机械表，2远程表，3代码表，4流量计
			 * @param {createdate}  [false string] 			建户日期
			 * @param {valid}      	[false string] 			是否终止业务往来（0 否 1是）
			 * @param {validdate}   [false string] 			终止日期
			 * @param {adcd}      	[false string] 			所属分区
			 */
			const params = {
				wid: '',
				uname: '',
				bjid: '',
				sbbh: '',
				whouse: '',
				wtel: '',
				ystype: '',
				mtype: '',
				createdate: '',
				valid: '',
				validdate: '',
				adcd: ''
			};
			saveOrUpDseWateruseB(params, that)
				.then((results = {}) => {
					const { status, msg } = results;

					console.warn(status, msg);
					that.$message.success('提交成功~');
					that.onHandleModelClose();
				})
				.catch(e => {
					that.$message.error(e);
					that.onHandleModelClose();
				});
		},
		_saveOrUpDseWateruseB() {},
		// 初始化分区
		_initPartition() {
			const that = this;
			const { cwsCd } = that.data;

			that.formList.find((item = {}) => {
				if (item.name === 'cwsCd') {
					const children = that.get_partition;
					const [{ value }] = children;
					cwsCd ? (that.ruleForm[item.name] = cwsCd) : (that.ruleForm[item.name] = value);
					item.children = children;
					return true;
				}
				if (item.name === 'adcd') {
					const areaChildren = that.getAreaList_();
					console.info('adcd ============', areaChildren);
					console.info('adcd1 ============', that.areaList);
					/*const [{ value }] = areaChildren;
					that.ruleForm[item.name] = value;
					item.children = areaChildren;
					return true;*/
				}
			});
		},
		// 参数回填
		_backfilling() {
			const that = this;

			const { data } = that;
			const { isEdit } = data;
			if (isEdit) {
				const { loc, gldw, lttd, adnm, cwsnm, prnm, prcd, runCond, lgtd, sbnum, compym } = data;

				/*
				入参：详情数据
				bjid 			//	联户表井代码
				bjnm 			//	联户表井名称
				cwsCd 			//	所属供水工程
				adcd 			//	所属区划
				loc 			//	所在地
				compYm 			//	建成年月格式：yyMMdd
				engMan 			//	管理单位
				lgtd 			//	经度单位
				lttd 			//	纬度单位
				runCond 		//	运行状况：1在用良好，0停用
				sbnum 			//	水表个数
				ts 				//	时间戳
				nt 				//	备注
				adcd 			//	所属分区
				*/

				that.ruleForm = {
					...that.ruleForm,
					bjid: prcd + '',
					bjnm: prnm + '',
					cwsCd: cwsnm + '',
					adcd: adnm + '',
					loc: loc + '',
					compYm: compym,
					engMan: gldw + '',
					lgtd: lgtd + '',
					lttd: lttd + '',
					runCond: runCond + '',
					sbnum: sbnum,
					ts: '',
					nt: ''
				};

				//	Object.keys(data).forEach((key = '') => {
				//		that.ruleForm[key] = data[key];
				//	});

				that.formList.find((item = {}) => {
					if (item.name === 'bjid') {
						item.disabled = true;
						return true;
					} else {
						item.disabled = false;
					}
				});
			}
		},
		_initialization() {
			const that = this;

			// 初始化年份

			const formList = [
				{
					name: 'bjid',
					label: '站点代码'
				},
				{
					name: 'cwsCd1',
					label: '站点类型',
					disabled: true,
					type: 1,
					value: '0',
					children: [
						{
							label: '联户表井',
							value: '0'
						}
					]
				},
				{
					name: 'bjnm',
					label: '站点名称'
				},
				{
					name: 'runCond',
					label: '是否启用',
					type: 2,
					value: '1',
					children: [
						{
							label: '启用',
							value: '1'
						},
						{
							label: '停用',
							value: '0'
						}
					]
				},
				{
					name: 'lgtd',
					label: '经度'
				},
				{
					name: 'compYm',
					label: '建站年月',
					type: 3,
					// value: initCompYm
					value: ''
				},
				{
					name: 'lttd',
					label: '纬度'
				},
				{
					name: 'engMan',
					label: '管理单位'
				},
				{
					name: 'adcd',
					label: '所属行政区划',
					type: 1,
					value: '0',
					children: []
				},
				{
					name: 'cwsCd',
					label: '所属供水工程',
					type: 1,
					value: '0',
					children: []
				},
				{
					name: 'loc',
					label: '地址'
				},
				{
					name: 'nt',
					label: '备注'
				},
				{
					name: 'sbnum',
					label: '水表个数'
				}
			].map((item = {}) => ({
				type: 0,
				children: [],
				placeholder: `${item.type ? '请选择' : '请输入'}${item.label}`,
				disabled: false,
				...item,
				label: item.label + ' : '
			}));

			// 初始化表单验证
			const COMMON_RULES_CONFIG = {
				required: false,
				trigger: 'blur'
			};
			const rules = {
				bjid: [{ ...COMMON_RULES_CONFIG, required: true }],
				bjnm: [
					{ ...COMMON_RULES_CONFIG, required: true },
					{
						min: 3,
						max: 5,
						message: '长度在 3 到 5 个字符',
						trigger: 'blur'
					}
				],
				b: [COMMON_RULES_CONFIG],
				lgtd: [{ ...COMMON_RULES_CONFIG, required: true, validator: isDigitsAndRange }],
				compYm: [COMMON_RULES_CONFIG],
				lttd: [{ ...COMMON_RULES_CONFIG, required: true, validator: isDigitsAndRange }],
				engMan: [COMMON_RULES_CONFIG],
				cwsCd: [COMMON_RULES_CONFIG],
				adcd: [{ ...COMMON_RULES_CONFIG, required: true }],
				loc: [COMMON_RULES_CONFIG],
				j: [COMMON_RULES_CONFIG],
				k: [COMMON_RULES_CONFIG],
				l: [COMMON_RULES_CONFIG],
				m: [COMMON_RULES_CONFIG],
				n: [COMMON_RULES_CONFIG],
				o: [COMMON_RULES_CONFIG],
				p: [COMMON_RULES_CONFIG],
				q: [COMMON_RULES_CONFIG]
			};

			const ruleForm = {};
			formList.forEach((item = {}) => {
				const { name = '', value = '', placeholder = '' } = item;

				Object.assign(ruleForm, {
					[name]: value
				});

				if (Array.isArray(rules[name])) {
					const [first, ...others] = rules[name];

					rules[name] = [
						{
							...first,
							message: placeholder
						},
						others
					];
					// 修改作用域 bug
					// rules[name][0].message = placeholder;
				}
			});

			that.formList = formList;
			that.rules = rules;
			that.ruleForm = ruleForm;
			that.innerColumns = [
				{
					label: '用户名称',
					value: 'a'
				},
				{
					label: '水表编号',
					value: 'b'
				},
				{
					label: '联系方式',
					value: 'c'
				},
				{
					label: '用水类型',
					value: 'd'
				}
			];

			that.$nextTick(() => {
				// 参数回填
				that._backfilling();
				// 初始化分区
				that._initPartition();
			});
		}
	},
	mounted() {
		const that = this;
		that.getAreaList_();
		that._initialization();
	}
};
</script>

<style scoped="scoped" lang="scss">
.table {
	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;

		span {
			font-size: 16px;
			color: #333;
		}
	}
}
.fnModel {
	/deep/ .model {
		height: 350px !important;
	}

	.modelWraper {
		height: 100%;
		padding-top: 16px;
		padding-right: 32px;
		text-align: center;

		/deep/ .el-select {
			width: 100%;
		}

		button {
			margin-left: 32px;
		}
	}
}
</style>
