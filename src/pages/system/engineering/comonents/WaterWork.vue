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
			<!-- 上传预览图片 -->
			<dse-upload :fileList="fileList" :files="files" @onHandlePictureSuccess="onHandlePictureSuccess" @onHandlePictureCardRemove="onHandlePictureCardRemove" />
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
	</div>
</template>

<script>
// 新增修改水厂
// import uuidv1 from 'uuid/v1';
import { mapGetters } from 'vuex';
import DseUpload from '../../../../common/components/DseUpload';
import { systemAction } from '../../../../mixins/system';
import URLS from '../../../../api/urls';
import { VDT, VDATA } from '../../../../utils/el_validater';

function notHan(rule, val, callBack) {
	let vdt = VDATA(val, {
		notHan: { msg: '请输入字母或者数字!' }
	});
	if (!vdt.result) {
		callBack(new Error(vdt.msg));
	} else {
		callBack();
	}
}

function isNumber(rule, val, callBack) {
	let vdt = VDATA(val, {
		number: { msg: '您输入的数字有误' }
	});
	if (!vdt.result) {
		callBack(new Error(vdt.msg));
	} else {
		callBack();
	}
}

function isDigits(rule, val, callBack) {
	let vdt = VDATA(val, {
		digits: { msg: '您输入的不是整数' }
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
		onHandleCancel: {
			type: Function,
			default() {
				return () => {};
			}
		},
		onHandleSubmit: {
			typp: Function,
			default() {
				return () => {};
			}
		}
	},
	data() {
		return {
			name: 'systemEngineeringIndex',
			formList: [],
			ruleForm: {},
			rules: {},
			upload: {
				// action: '/api/upload' || URLS.uploadFiles,
				action: URLS.uploadFiles,
				imageUrl: '',
				visible: false
			},
			fileList: [],
			files: []
		};
	},
	mixins: [systemAction],
	computed: {
		...mapGetters(['get_partition'])
	},
	components: {
		DseUpload
	},
	methods: {
		// 上传图片成功后返回
		onHandlePictureSuccess(file) {
			const that = this;

			that.files.push(file);
		},
		// 上传图片成功后删除
		onHandlePictureCardRemove(files = []) {
			const that = this;

			// 删除图片
			that.files = files;
		},
		onHandleSubmitForm(formName) {
			const that = this;

			const { ruleForm, files = [] } = that;

			that.$refs[formName].validate(valid => {
				if (valid) {
					that.$emit('onHandleSubmit', { ...ruleForm, files });
				} else {
					// console.log('error submit!!');
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
		// 参数回填
		_backfilling() {
			const that = this;

			const { data } = that;
			const { isEdit } = data;
			if (isEdit) {
				/*
					预计出参：详情数据
					loc 			所在地
					prtypenm 		工程类型名称
					prtype 			工程类型
					gldw 			管理单位
					adcd 			所属分区
					lttd 			经度
					adnm 			所属分区名称
					cwsnm 			所属供水工程名称
					prnm 			工程名称
					prcd 			工程编码
					runCondnm 		运行状况：1在用良好，0停用
					lgtd 			纬度
					compym 			建站年月
					deadV 			死库容
					deadZ 			死水位
					totV 			总库容
					frscV 			调洪库容
					dszfl 			设计规模（万方/天）
					desHead 		设计扬程
					dsincp 			装机容量(kW)
				*/
				/*
					实际出参：详情数据
					{
						"loc": "",
						"prtypenm": "",
						"deadV": "",
						"deadZ": "",
						"dszfl": "",
						"prtype": "",
						"gldw": "",
						"frscV": "",
						"adcd": "",
						"lttd": "",
						"totV": "",
						"dsincp": "",
						"desHead": "",
						"adnm": "",
						"cwsnm": "",
						"prnm": "",
						"prcd": "",
						"runCondnm": "",
						"lgtd": "",
						"compym": "",
						"isEdit": ""
					}
				*/
				const {
					loc,
					// prtypenm,
					// deadV,
					// deadZ,
					freshV,
					// dszfl,
					// prtype,
					gldw,
					// frscV,
					adcd,
					lttd,
					dayCap,
					wsObj,
					wsReg,
					// totV,
					// dsincp,
					// desHead,
					// adnm,
					cwsnm,
					wsPp,
					prnm,
					prcd,
					runCond,
					lgtd,
					compym,
					fzrnm,
					fzrtel,

					files
				} = data;

				/*
				入参：详情数据
				wfctCd 			//	水厂代码
				wfctnm 			//	水厂名称
				cwsCd 			//	所属供水工程
				loc 			//	所在地
				compYm 			//	建成年月 格式：yyyyMM
				engMan 			//	管理单位
				lgtd 			//	经度单位
				lttd 			//	纬度单位
				freshV 			//	清水库容量
				dayCap 			//	日生产能力
				pipeSum 		//	管线总长
				wsReg 			//	供水范围
				wsObj 			//	供水对象
				wsPp 			//	供水人口
				wwCond 			//	取水计量情况
				dflcd 			//	取水许可证代码
				runCond 		//	运行状况：1在用良好，0停用
				ts 				//	时间戳
				nt 				//	备注
				syly 			//	水源来源
				fzrnm 			//	负责人
				fzrtel 			//	负责人电话
				adcd 			//	所属分区
				*/
				that.ruleForm = {
					...that.ruleForm,
					wfctCd: prcd + '',
					wfctnm: prnm + '',
					cwsCd: cwsnm + '',
					loc: loc + '',
					compYm: compym,
					engMan: gldw + '',
					lgtd: lgtd + '',
					lttd: lttd + '',
					freshV: freshV + '',
					dayCap,
					pipeSum: '',
					wsReg,
					wsObj,
					wsPp,
					wwCond: '',
					dflcd: '',
					runCond: runCond + '',
					ts: '',
					nt: '',
					syly: '',
					fzrnm,
					fzrtel,
					adcd: adcd + ''
				};
				//	Object.keys(data).forEach((key = '') => {
				//		that.ruleForm[key] = data[key];
				//	});

				that.formList.find((item = {}) => {
					if (item.name === 'wfctCd') {
						item.disabled = true;
						return true;
					} //else {
					// 	item.disabled = false;
					// }
				});

				// 填充图片
				if (Array.isArray(files) && files[0]) {
					that.files = files;
					that.fileList = that.files.map((item = {}) => ({
						name: item.fileName,
						url: window.static_baseUrl + '/' + item.filePath
					}));
				}
			}
		},
		// 初始化分区
		_initPartition() {
			const that = this;

			const { cwsCd } = that.data;

			that.formList.find((item = {}) => {
				if (item.name === 'cwsCd') {
					const children = that.get_partition;
					const [{ value }] = Array.isArray(children) && children[0] ? children : [{}];
					cwsCd ? (that.ruleForm[item.name] = cwsCd) : (that.ruleForm[item.name] = value);
					item.children = children;
				}
			});
		},
		_initialization() {
			const that = this;

			// 初始化年份
			// const nowDate = new Date();
			// const currentYear = nowDate.getFullYear();
			// const currentMonth = String(nowDate.getMonth() + 1).padStart(2, 0);
			// const initCompYm = `${currentYear}-${currentMonth}`;

			// 初始化表单列表
			const formList = [
				{
					name: 'wfctCd',
					label: '站点代码',
					// value: uuidv1().replace(/-/g, '')
					value: ''
				},
				{
					name: 'cwsCd1',
					label: '站点类型',
					disabled: true,
					type: 1,
					value: '1',
					children: [
						{
							label: '水厂',
							value: '1'
						}
					]
				},
				{
					name: 'wfctnm',
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
				// {
				// 	name: 'freshV',
				// 	label: '清水库容量(万m³)'
				// },
				{
					name: 'lttd',
					label: '纬度'
				},
				{
					name: 'dayCap',
					label: '日生产能力(万m³)'
				},
				{
					name: 'wsReg',
					label: '供水范围'
				},
				{
					name: 'wsObj',
					label: '供水对象'
				},
				{
					name: 'wsPp',
					label: '供水人口（万人）'
				},
				{
					name: 'fzrnm',
					label: '负责人'
				},
				{
					name: 'fzrtel',
					label: '负责人电话'
				},
				{
					name: 'compYm',
					label: '建站年月',
					type: 3,
					// value: initCompYm
					value: ''
				},
				{
					name: 'cwsCd',
					label: '所属工程',
					type: 1,
					value: '0',
					children: []
				},
				{
					name: 'loc',
					label: '地址'
				},
				{
					name: 'engMan',
					label: '管理单位'
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
				wfctCd: [{ ...COMMON_RULES_CONFIG, required: true, validator: notHan, message: '请输入字母或者数字!' }],
				prcd: [{ ...COMMON_RULES_CONFIG, required: true }],
				wfctnm: [
					{ ...COMMON_RULES_CONFIG, required: true },
					{
						min: 3,
						max: 5,
						message: '长度在 3 到 5 个字符',
						trigger: 'blur'
					}
				],
				lgtd: [
					{
						...COMMON_RULES_CONFIG,
						required: true,
						message: '您输入的经度有误或者最多保存六位小数',
						validator(rule, value, callback) {
							if (VDT.lgtd(value)) {
								callback();
							} else {
								callback(new Error(this.message));
							}
						}
					}
				],
				lttd: [
					{
						...COMMON_RULES_CONFIG,
						required: true,
						message: '您输入的纬度有误或者最多保存六位小数',
						validator(rule, value, callback) {
							if (VDT.lttd(value)) {
								callback();
							} else {
								callback(new Error(this.message));
							}
						}
					}
				],
				
				dayCap: [{ ...COMMON_RULES_CONFIG, required: true, validator: isNumber, message: '您输入的数字有误' }],
				wsPp: [{ ...COMMON_RULES_CONFIG, required: true, validator: isDigits, message: '您输入的不是整数' }],

				compYm: [COMMON_RULES_CONFIG],
				engMan: [COMMON_RULES_CONFIG],
				cwsCd: [COMMON_RULES_CONFIG],
				adcd: [{ ...COMMON_RULES_CONFIG, required: true }]
			};

			const ruleForm = {};
			formList.forEach((item = {}) => {
				const { name = '', value, placeholder = '' } = item;

				Object.assign(ruleForm, {
					[name]: value
				});

				if (Array.isArray(rules[name])) {
					const [first, ...others] = rules[name];

					rules[name] = [
						{
							message: placeholder,
							...first
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

		that._initialization();
	}
};
</script>

<style scoped="scoped" lang="scss"></style>
