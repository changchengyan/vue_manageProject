<template>
	<div class="block">
		<el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="165px" class="ruleForm">
			<el-form-item v-for="(item, key) in formList" :key="key" :label="item.label" :prop="item.name">
				<!-- 下拉框 -->
				<el-select v-if="item.type === 1" @change="getAreaCode" v-model="ruleForm[item.name]" :placeholder="item.placeholder" :disabled="item.disabled">
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
// 新增修改水库
import { mapGetters } from 'vuex';
import DseUpload from '../../../../common/components/DseUpload';
import { systemAction } from '../../../../mixins/system';
import URLS from '../../../../api/urls';
import { VDT } from '../../../../utils/el_validater';

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
			type: Function,
			default() {
				return () => {};
			}
		}
	},
	mixins: [systemAction],
	computed: {
		...mapGetters(['get_partition'])
	},
	components: {
		DseUpload
	},
	data() {
		return {
			name: 'systemEngineeringIndex',
			formList: [],
			ruleForm: {},
			rules: {},
			fileList: [],
			files: []
		};
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
					runMode			运行方式
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
					deadZ,
					dszfl,
					// prtype,
					gldw,
					// frscV,
					// adcd,
					lttd,
					// totV,
					dsincp,
					// desHead,
					// adnm,
					// cwsnm,
					cwsCd,
					prnm,
					prcd,
					runCond,
					runMode,
					lgtd,
					compym,
					desHead,

					files
				} = data;

				/*
				入参：详情数据
				pumpCd 			//	泵站工程代码
				pumpNm 			//	泵站名称
				cwsCd 			//	所属供水工程
				loc 			//	所在地
				compYm 			//	建成年月 格式：yyMMdd
				engMan 			//	管理单位
				lgtd 			//	经度单位
				lttd 			//	纬度单位
				projScal 		//	工程规模
				pumpTp 			//	泵站类型
				insQ 			//	装机流量
				desHead 		//	设计扬程
				pumpNum 		//	水泵数量
				dszfl 			//	设计规模（万方/天）
				dsincp 			//	装机容量(kW)
				allEquWw 		//	设备总取水能力
				runCond 		//	运行状况：1在用良好，0停用
				wsReg 			//	供水范围
				ts 				//	时间戳
				nt 				//	备注
				adcd 			//	所属分区
				*/

				that.ruleForm = {
					...that.ruleForm,
					pumpCd: prcd + '',
					pumpNm: prnm + '',
					cwsCd,
					loc: loc + '',
					compYm: compym,
					engMan: gldw + '',
					lgtd: lgtd + '',
					lttd: lttd + '',
					// projScal: dszfl + '',
					// pumpTp: '010101' + '',
					// insQ: '010101' + '',
					desHead: desHead + '',
					// pumpNum: '010101' + '',
					dszfl: dszfl + '',
					dsincp: dsincp,
					allEquWw: deadZ + '',
					runCond: runCond + '',
					runMode: runMode + ''
					// wsReg: '010101' + '',
					// ts: '010101' + '',
					// nt: '010101' + '',
					// adcd: adcd + ''
				};

				//	Object.keys(data).forEach((key = '') => {
				//		that.ruleForm[key] = data[key];
				//	});

				that.formList.find((item = {}) => {
					if (item.name === 'pumpCd') {
						item.disabled = true;
						return true;
					} else {
						item.disabled = false;
					}
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
					const [{ value }] = children;

					cwsCd ? (that.ruleForm[item.name] = cwsCd) : (that.ruleForm[item.name] = value);
					item.children = children;
					return true;
				}
			});
		},

		// 获取分区
		getAreaCode(val) {},
		_initialization() {
			const that = this;

			// 初始化年份
			// const nowDate = new Date();
			// const currentYear = nowDate.getFullYear();
			// const currentMonth = String(nowDate.getMonth() + 1).padStart(2, 0);
			// const initCompYm = `${currentYear}-${currentMonth}`;

			const formList = [
				{
					name: 'pumpCd',
					label: '站点代码'
				},
				{
					name: 'projScal',
					label: '站点类型',
					disabled: true,
					type: 1,
					value: '0',
					children: [
						{
							label: '泵站',
							value: '0'
						}
					]
				},
				{
					name: 'pumpNm',
					label: '站点名称'
				},
				{
					name: 'dszfl',
					label: '设计规模(m³/天)'
				},
				{
					name: 'lgtd',
					label: '经度'
				},
				{
					name: 'dsincp',
					label: '装机容量(kw)'
				},
				{
					name: 'lttd',
					label: '纬度'
				},
				{
					name: 'runMode',
					label: '运行方式'
				},
				{
					name: 'cwsCd',
					label: '所属工程',
					type: 1,
					value: '',
					children: []
				},
				{
					name: 'desHead',
					label: '扬程(m)'
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
					name: 'compYm',
					label: '建站年月',
					type: 3,
					// value: initCompYm,
					value: ''
				},
				{
					name: 'loc',
					label: '站址'
				},
				{
					name: 'engMan',
					label: '管理单位'
				}
			].map((item = {}) => ({
				type: 0,
				children: [],
				placeholder: `${item.type ? '请选择' : '请输入'}${item.label}${item.name === 'runMode' ? '（几用几备）' : ''}`,
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
				pumpCd: [{ ...COMMON_RULES_CONFIG, required: true }],
				pumpNm: [
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
				compYm: [COMMON_RULES_CONFIG],
				engMan: [COMMON_RULES_CONFIG],
				projScal: [COMMON_RULES_CONFIG],
				cwsCd: [{ ...COMMON_RULES_CONFIG, required: true }],
				loc: [COMMON_RULES_CONFIG],
				j: [COMMON_RULES_CONFIG],
				dszfl: [COMMON_RULES_CONFIG],
				desHead: [COMMON_RULES_CONFIG],
				runMode: [
					{ ...COMMON_RULES_CONFIG, required: true },
					{
						min: 0,
						max: 100,
						message: '最长不能超过100个字',
						trigger: 'blur'
					}
				],
				dsincp: [COMMON_RULES_CONFIG]
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
