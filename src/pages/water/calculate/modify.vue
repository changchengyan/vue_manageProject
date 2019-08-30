<template>
	<div class="data">
		<div class="handleBack">
			<div class="back"><span class="go-back" @click="onHandleBack">返回</span></div>
		</div>

		<div class="article">
			<el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="165px" class="ruleForm">
				<el-form-item v-for="(item, key) in data" :key="key" :label="item.label" :prop="item.name">
					<el-select v-if="item.type === 1" v-model="ruleForm[item.name]" :placeholder="item.placeholder">
						<el-option v-for="(it, k) in item.children" :key="k" :label="it.label" :value="it.value"></el-option>
					</el-select>
					<template v-else-if="item.type === 2">
						<el-radio v-for="(it, k) in item.children" :key="k" v-model="ruleForm[item.name]" :label="it.value">{{ it.label }}</el-radio>
					</template>
					<el-input v-else v-model="ruleForm[item.name]" :placeholder="item.placeholder"></el-input>
				</el-form-item>
				<el-form-item label="图片" prop="e" style="width: 100%;">
					<el-upload style="margin-top: 16px;" :action="upload.action" list-type="picture-card" :on-preview="onHandlePictureCardPreview"
					 :on-remove="onHandlePictureCardRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
				<el-form-item class="formBtns">
					<el-button type="primary" @click="onHandleSubmitForm('ruleForm')">保存</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 上传 -->
		<el-dialog :visible.sync="upload.visible" size="tiny">
			<img width="100%" :src="upload.imageUrl" alt="">
		</el-dialog>

		<!-- 删除 -->
		<dse-save-status :showModel="confirm.visible" @delThis="onHandleConfirmCancel" @sureDelThis="onHandleConfirmSubmit" />
	</div>
</template>

<script>
	import DseSaveStatus from '../../../common/components/toast/DseSaveStatus';

	// 初始化年份
	const nowDate = new Date();
	const startYear = nowDate.getFullYear() - 20;
	const endYear = nowDate.getFullYear();
	const yearList = [];
	for (let i = startYear; i <= endYear; i++) {
		yearList.unshift({
			value: i,
			label: i
		});
	}

	const data = [{
			name: 'a',
			label: '事件名称',
		},
		{
			name: 'b',
			label: '事件类型',
			type: 1,
			children: yearList
		},
		{
			name: 'c',
			label: '出判等级',
			type: 1,
			children: yearList
		},
		{
			name: 'e',
			label: '所属行政区域',
		},
		{
			name: 'f',
			label: '所属片区',
		},
		{
			name: 'g',
			label: '详细地点',
		},
		{
			name: 'h',
			label: '经度',
		},
		{
			name: 'i',
			label: '纬度',
		},
		{
			name: 'i',
			label: '事发原因',
		},
	].map((item = {}) => ({
		type: 0,
		children: [],
		placeholder: `${item.type ? '请选择' : '请输入'}${item.label}`,
		disabled: false,
		...item,
		label: item.label + '：'
	}));

	const rules = {
		a: [{
				required: true,
				trigger: 'blur'
			},
			{
				min: 3,
				max: 5,
				message: '长度在 3 到 5 个字符',
				trigger: 'blur'
			}
		],
		b: [{
			required: true,
			trigger: 'blur'
		}],
		c: [{
			type: 'date',
			required: true,
			trigger: 'blur'
		}],
		d: [{
			type: 'date',
			required: true,
			trigger: 'blur'
		}],
		e: [{
			type: 'array',
			required: true,
			trigger: 'blur'
		}],
		f: [{
			required: true,
			trigger: 'blur'
		}],
		g: [{
			required: true,
			trigger: 'blur'
		}],
		h: [{
			required: true,
			trigger: 'blur'
		}],
		i: [{
			required: true,
			trigger: 'blur'
		}],
		j: [{
			required: true,
			trigger: 'blur'
		}],
		k: [{
			required: true,
			trigger: 'blur'
		}],
	};

	const ruleForm = {};
	data.forEach((item = {}) => {
		const {
			name = '', placeholder = ''
		} = item;

		Object.assign(ruleForm, {
			[name]: ''
		});

		if (rules[name]) {
			rules[name][0].message = placeholder;
		}
	});

	export default {
		components: {
			DseSaveStatus
		},
		data() {
			return {
				confirm: {
					visible: false,
					payload: {}
				},
				name: 'systemEngineeringIndex',
				data,
				ruleForm,
				rules,
				upload: {
					action: 'https://jsonplaceholder.typicode.com/posts/',
					imageUrl: '',
					visible: false
				}
			};
		},
		methods: {
			onHandleBack() {
				const that = this;

				that.$router.push({
					name: 'waterExamine'
				});
				that.$store.commit('set_asideStatus', true);
				that.$emit('showAside');
			},
			onHandleTabChange(tabIndex = 0) {
				const that = this;

				that.tabIndex = tabIndex;
			},
			onHandleExport() {
				console.warn(123);
			},
			onHandleSearch() {
				const that = this;
				const {
					tabIndex = 0, tabsList = []
				} = that;

				const {
					keyword = ''
				} = tabsList[tabIndex];

				that.tabsList[tabIndex].list = tabsList[tabIndex].list.filter((item = {}) => (item.id == keyword));

				console.warn(keyword, 'onHandleSearch', 123);
			},
			onHandleListEdit(params = {}) {
				const that = this;

				that.$router.push({
					name: 'systemMonitorModify',
					params
				});
				that.$store.commit('set_asideStatus', false);
				that.$emit('hiddenAside');
			},
			onHandleListRemove(payload = {}) {
				const that = this;

				that.confirm = {
					...that.confirm,
					payload
				};

				that.onHandleConfirmVisible();
			},
			onHandleConfirmSubmit() {
				const that = this;
				const {
					tabIndex = 0,
						tabsList = [], confirm = {}
				} = that;
				const {
					payload = {}
				} = confirm;
				const {
					id = ''
				} = payload;

				that.tabsList[tabIndex].list = tabsList[tabIndex].list.filter((item = {}) => (item.id !== id));

				that.onHandleConfirmCancel();
			},
			onHandleConfirmVisible() {
				const that = this;

				that.confirm = {
					...that.confirm,
					visible: true
				};
			},
			onHandleConfirmCancel() {
				const that = this;

				that.confirm = {
					...that.confirm,
					visible: false
				};
			},
			onHandleSizeChange() {},
			onHandleCurrentChange() {},
			onHandlePictureCardPreview(file, fileList) {
				console.log(file, fileList);
			},
			onHandlePictureCardRemove(file) {
				const that = this;

				that.dialogImageUrl = file.url;
				that.dialogVisible = true;
			},
			onHandleSubmitForm(formName) {
				const that = this;

				that.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
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
		},
	};
</script>

<style scoped="scoped" lang="scss">
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

	.data {
		width: 100%;
		height: 100%;
		max-height: 100%;
		background-color: #fff;

		.article {
			max-width: 1200px;
			margin-right: auto;
			margin-left: auto;
			margin-bottom: 24px;
			margin-top: 24px;
			border-radius: 6px;
			background-color: #fff;
		}

		.ruleForm {
			padding-top: 24px;
			padding-bottom: 24px;

			/deep/ .el-form-item {
				width: calc(50% - 25px);

				.el-input__inner {
					width: 250px;
				}
			}

			/deep/ .el-select {
				width: 100%;
			}

			/deep/ .el-button {
				line-height: initial !important;
			}

			.el-form-item {
				margin-bottom: 16px;

			}

			.formBtns {
				width: 100%;
				padding-top: 24px;
				padding-bottom: 24px;

				/deep/ .el-form-item__content {
					margin-left: 570px !important;
				}
			}
		}
	}

	.article {

		.handle,
		.table {
			padding: 16px;
		}

		.chart {
			position: relative;
			width: 100%;
			height: 300px;
			padding-right: 24px;
			padding-left: 24px;

			.category {
				width: 1500px;
				height: 100%;
			}
		}

		.table {

			/deep/ .el-table th {
				background-color: #f0f1f1;
				color: #333;
			}

			a {
				text-decoration: none;
				color: #187CEA;

				+a {
					margin-left: 8px;
				}
			}
		}
	}


	.tab {
		padding-top: 8px;
		padding-right: 16px;
		padding-left: 16px;

		.row {
			display: flex;

			list-style: none;
			margin-top: 0;
			margin-bottom: 0;
			padding-left: 0;
			list-style: none;

			border-bottom: 1px solid #E7E6E6;

			.col {
				padding-right: 16px;
				padding-left: 16px;

				a {
					list-style: none;
					text-decoration: none;

					display: block;
					padding-top: 8px;
					padding-bottom: 8px;

					color: #7796BB;
					cursor: pointer;
				}

				&.active {
					a {
						color: #187CEA;
						font-weight: bold;
						border-bottom: 1px solid #187CEA;
					}
				}
			}
		}
	}
</style>
