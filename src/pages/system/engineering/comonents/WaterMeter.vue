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
		<!-- <div v-show="!data.isEdit" class="table"> -->
		<div class="table">
			<h3 class="title">
				<span>联户表井内部信息</span>
				<el-button type="primary" @click="onHandleModelVisible">新增</el-button>
			</h3>
			<div class="tableWidthPagination">
				<div class="table-wrap">
					<table class="innerTable">
						<thead>
							<tr>
								<th><span>编号</span></th>
								<th v-for="(item, key) in innerColumns" :key="key">
									<span>{{ item.label }}</span>
								</th>
							</tr>
						</thead>
						<tbody>
							<template v-if="Array.isArray(inners) && inners[0]">
								<tr v-for="(item, key) in inners" :key="key">
									<td>
										<span>{{ key + 1 }}</span>
									</td>
									<td>
										<span>{{ item.uname }}</span>
									</td>
									<td>
										<span>{{ item.sbbh }}</span>
									</td>
									<td>
										<span>{{ item.whouse }}</span>
									</td>
									<td>
										<span>{{ item.wtel }}</span>
									</td>
									<td>
										<span>{{ item.ystype }}</span>
									</td>
									<td>
										<span>{{ item.mtype }}</span>
									</td>
									<td>
										<span>{{ item.createdate }}</span>
									</td>
									<td>
										<span>{{ item.validdate }}</span>
									</td>
									<td>
										<span>{{ item.valid }}</span>
									</td>
								</tr>
							</template>
							<template v-else>
								<tr>
									<td colspan="11"><span style="line-height: 30px">暂时没有数据~~</span></td>
								</tr>
							</template>
						</tbody>
					</table>
				</div>
			</div>
			<!-- <el-table :data="inners" width="100%" size="small  border stripe">
				<el-table-column v-for="(item, key) in innerColumns" :key="key" :prop="item.value" :label="item.label" align="center"></el-table-column>
			</el-table> -->
		</div>
		<el-form class="ruleForm" label-width="165px">
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

		<!-- 新增 -->
		<dse-normal-model :tips="model.title" :modelFlag="model.visible" :onHandleModelClose="onHandleModelClose" class="fnModel">
			<div class="modelWraper">
				<el-form ref="innerRuleForm" :model="innerForm" :rules="innerRules" label-width="150px">
					<!-- <el-form-item label="联户表井代码" style="display: none;"><el-input v-model="innerForm.bjid" type="hidden"></el-input></el-form-item> -->
					<!-- <el-form-item label="用户编号"><el-input v-model="innerForm.wid"></el-input></el-form-item> -->
					<el-form-item label="用户名称" prop="uname"><el-input v-model="innerForm.uname" placeholder="请输入用户名称"></el-input></el-form-item>
					<el-form-item label="水表编号" prop="sbbh"><el-input v-model="innerForm.sbbh" placeholder="请输入水表编号"></el-input></el-form-item>
					<el-form-item label="用户地址" prop="whouse"><el-input v-model="innerForm.whouse" placeholder="请输入用户地址"></el-input></el-form-item>
					<el-form-item label="联系方式" prop="wtel"><el-input v-model="innerForm.wtel" placeholder="请输入联系方式"></el-input></el-form-item>
					<el-form-item label="用水类型" prop="ystype">
						<el-select v-model="innerForm.ystype" placeholder="请选择用水类型">
							<el-option value="1" label="居民生活用水"></el-option>
							<el-option value="2" label="行政事业用水"></el-option>
							<el-option value="3" label="工业用水"></el-option>
							<el-option value="4" label="经营服务用水"></el-option>
							<el-option value="5" label="特种行业用水"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="水表类型" prop="mtype">
						<el-select v-model="innerForm.mtype" placeholder="请选择水表类型">
							<el-option value="1" label="机械表"></el-option>
							<el-option value="2" label="远程表"></el-option>
							<el-option value="3" label="代码表"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="建户日期" prop="createdate">
						<el-date-picker type="date" v-model="innerForm.createdate" placeholder="请选择建户日期" value-format="yyyy-MM-dd"></el-date-picker>
					</el-form-item>
					<el-form-item label="终止日期" prop="validdate">
						<el-date-picker type="date" v-model="innerForm.validdate" placeholder="请选择终止日期" value-format="yyyy-MM-dd"></el-date-picker>
					</el-form-item>
					<el-form-item label="是否终止业务往来" prop="valid">
						<el-radio label="0" v-model="innerForm.valid">否</el-radio>
						<el-radio label="1" v-model="innerForm.valid">是</el-radio>
					</el-form-item>
					<!-- <el-form-item label="联系方式" style="display: none;"><el-input v-model="innerForm.adcd"></el-input></el-form-item> -->
				</el-form>
				<el-button type="primary" @click="onHandleModelSubmit('innerRuleForm')">提交</el-button>
			</div>
		</dse-normal-model>
	</div>
</template>

<script>
// 新增修改联户表井

import { mapGetters } from 'vuex';
import DseUpload from '../../../../common/components/DseUpload';
import {
	// 获取联户表井用户
	getWateruseBList,
	// 保存更新用水户基本信息
	saveOrUpDseWateruseB
} from '../../../../api/interfaces/system_api';
import {
	// 获取分区列表
	getAreaList
} from '../../../../api/interfaces/common_api';
import URLS from '../../../../api/urls';
import { systemAction } from '../../../../mixins/system';
import dseNormalModel from '../../../../common/components/toast/DseNormalModel';
import { VDT } from '../../../../utils/el_validater';

const _NORMALIZERESULTS_ = (payload = {}) => {
	const { ystype, mtype, valid } = payload;
	const _ystype =
		ystype === '1' ? '居民生活用水' : ystype === '2' ? '行政事业用水' : ystype === '3' ? '工业用水' : ystype === '4' ? '经营服务用水' : ystype === '5' ? '特种行业用水' : '';
	const _mtype = mtype === '1' ? '机械表' : mtype === '2' ? '远程表' : mtype === '3' ? '代码表' : mtype === '4' ? '流量计' : '';
	const _valid = valid === '0' ? '否' : '是';

	return {
		ystype: _ystype,
		mtype: _mtype,
		valid: _valid
	};
};

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
		DseUpload,
		dseNormalModel
	},
	data() {
		return {
			name: 'systemEngineeringIndex',
			formList: [],
			ruleForm: {},
			rules: {},
			inners: [],
			innerColumns: [],
			innerForm: {},
			innerRules: {},
			model: {
				visible: false,
				title: '新增联户表井用水户信息'
			},
			areaList: [],
			isSaveSuccess: true,
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
		// 获取分区的列表
		getAreaList_(callback) {
			const that = this;

			/*
				预计出参：详情数据
				list 	  [true array[number]]			级别列表 如 [1,2]
			*/
			const params = {
				list: [3, 4]
			};
			getAreaList(params, that)
				.then(res => {
					let { data } = res;
					data = Array.isArray(data) && data[0] ? data : [];

					let list = [];
					data.forEach(val => {
						list.push({
							label: val.name,
							value: val.code
						});
					});

					that.areaList = list;
					callback();
				})
				.catch(e => {
					callback();
				});
		},
		onHandleSubmitForm(formName) {
			const that = this;

			const { ruleForm, inners, files = [] } = that;

			that.$refs[formName].validate(valid => {
				if (valid) {
					that.$emit('onHandleSubmit', { ...ruleForm, inners, files });
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

			const { isSaveSuccess } = that;
			if (!isSaveSuccess) return that.$message.warning('请先保存联户表井信息');

			// that.innerForm.valid = '0';
			// const { innerForm } = that;
			// const { valid } = innerForm;
			// valid !== '0' &&
			// 	Object.assign(that.innerForm, {
			// 		valid: '0'
			// 	});
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

			that.innerForm = {};
		},
		// 联户表井内部信息提交
		onHandleModelSubmit(formName) {
			const that = this;

			that.$refs[formName].validate(v => {
				if (v) {
					const { innerForm = {}, ruleForm } = that;
					const { bjid, cwsCd } = ruleForm;
					const {
						uname,
						sbbh,
						whouse,
						wtel,
						ystype, // 1居民生活用水,2行政事业用水,3工业用水,4经营服务用水,5特种行业用水
						mtype, // 水表类型:1机械表，2远程表，3代码表，4流量计
						createdate,
						validdate,
						valid
					} = innerForm;

					const { adcd } =
						that.get_partition.find((item = {}) => {
							if (item.value === cwsCd) return true;
							return false;
						}) || {};
					// if (innerForm) return;
					/**
					 * 保存更新用水户基本信息（用水类型：1居民生活用水,2行政事业用水,3工业用水,4经营服务用水,5特种行业用水	）
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
						bjid,
						uname,
						sbbh,
						whouse,
						wtel,
						ystype, // 1居民生活用水,2行政事业用水,3工业用水,4经营服务用水,5特种行业用水
						mtype, // 水表类型:1机械表，2远程表，3代码表，4流量计
						createdate,
						validdate,
						valid, // 0 否 1是
						adcd
					};
					saveOrUpDseWateruseB(params, that)
						.then((results = {}) => {
							const { status, msg } = results;

							console.warn(status, msg);
							if (status) {
								that._getWateruseBList();
								that.$message.success('提交成功~');
							} else {
								that.$message.warning(msg);
							}
							// const payload = _NORMALIZERESULTS_(params);
							// const { inners } = that;
							// that.inners = [...inners, params];
							// that.inners = inners.map((item = {}) => {
							// 	return {
							// 		...item,
							// 		..._NORMALIZERESULTS_(item)
							// 	};
							// });
							// console.warn('start123');
							// console.warn(that.inners);
							// console.warn('send123a');
							that.onHandleModelClose();
						})
						.catch(e => {
							that.$message.error(e);
							that.onHandleModelClose();
						});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		_getWateruseBList() {
			const that = this;

			const { prcd } = that.data;
			/**
			 * 获取联户表井用户
			 * @param {bjid}        [false string]    联户表井id
			 */
			getWateruseBList({ bjid: prcd }, that).then((results = {}) => {
				const { status, data } = results;

				if (status) {
					const res = Array.isArray(data)
						? data.map((item = {}) => {
								const payload = _NORMALIZERESULTS_(item);

								return { ...item, ...payload };
						  })
						: [];

					// that.inners = [...that.inners, ...res];
					that.inners = res;
					// console.warn('用户回填123');
					// console.warn(res);
					// console.warn(that.inners);
					// console.warn('用户回填312');
				}
			});
		},
		_isSaveSuccess(flag = false) {
			const that = this;

			that.isSaveSuccess = flag;
		},
		// 初始化分区
		_initPartition() {
			const that = this;

			const { areaList } = that;
			const { cwsCd, adcd } = that.data;

			that.formList.forEach((item = {}) => {
				if (item.name === 'cwsCd') {
					const children = that.get_partition;
					const [{ value }] = Array.isArray(children) && children[0] ? children : [{}];
					cwsCd ? (that.ruleForm[item.name] = cwsCd) : (that.ruleForm[item.name] = value);
					item.children = children;
				}

				if (item.name === 'adcd') {
					const [{ value = '' }] = Array.isArray(areaList) && areaList[0] ? areaList : [{}];
					adcd ? (that.ruleForm[item.name] = adcd) : (that.ruleForm[item.name] = value);
					item.children = areaList;
				}
			});
		},
		// 参数回填
		_backfilling() {
			const that = this;

			const { data } = that;
			const { isEdit } = data;
			if (isEdit) {
				const { loc, gldw, lttd, adnm, cwsnm, prnm, prcd, runCond, lgtd, sbnum, compym, files } = data;

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

				that.formList.find((item = {}) => {
					if (item.name === 'bjid') {
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

				that._getWateruseBList();
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
				cwsCd: [COMMON_RULES_CONFIG],
				adcd: [{ ...COMMON_RULES_CONFIG, required: true }],
				loc: [COMMON_RULES_CONFIG]
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
				}
			});

			that.formList = formList;
			that.rules = rules;
			that.ruleForm = ruleForm;
			that.inners = [];
			that.innerColumns = [
				{
					value: 'uname',
					label: '用户名称'
				},
				{
					value: 'sbbh',
					label: '水表编号'
				},
				{
					value: 'whouse',
					label: '用户地址'
				},
				{
					value: 'wtel',
					label: '联系方式'
				},
				{
					value: 'ystype',
					label: '用水类型',
					type: '1'
				},
				{
					value: 'mtype',
					label: '水表类型',
					type: '1'
				},
				{
					value: 'createdate',
					label: '建户日期',
					type: '1'
				},
				{
					value: 'validdate',
					label: '终止日期',
					type: '1'
				},
				{
					value: 'valid',
					label: '是否终止业务往来',
					type: '1'
				}
			];
			const innerForm = {
				valid: '0',
				bjid: '',
				adcd: ''
			};
			const innerRules = {};
			that.innerColumns.forEach((item = {}) => {
				Object.assign(innerForm, {
					[item.value]: ''
				});

				Object.assign(innerRules, {
					[item.value]: [
						{
							required: true,
							message: `${item.type === '1' ? '请选择' : '请输入'}${item.label}`,
							trigger: 'blur'
						}
					]
				});
			});
			that.innerForm = innerForm;
			that.innerRules = innerRules;

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

		that.getAreaList_(() => that._initialization());
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
		height: 620px !important;
	}

	/deep/ .el-form-item {
		margin-bottom: 15px !important;
	}

	/deep/ .el-form-item__content {
		text-align: left;
	}

	/deep/ .el-date-editor.el-input {
		width: 100% !important;
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
			margin-top: 10px;
			margin-left: 32px;
		}
	}
}
</style>
