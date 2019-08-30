<template>
	<div class="modify">
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
				<el-form-item class="formBtns">
					<el-button type="primary" @click="onHandleSubmitForm('ruleForm')">保存</el-button>
				</el-form-item>
			</el-form>
			<!-- 上传 -->
			<el-dialog :visible.sync="upload.visible" size="tiny">
				<img width="100%" :src="upload.imageUrl" alt="">
			</el-dialog>
		</div>
	</div>
</template>

<script>
	const data = [{
			name: 'a',
			label: '设备名称',
		},
		{
			name: 'b',
			label: '设备编号',
		},
		{
			name: 'c',
			label: '设备类型',
		},
		{
			name: 'd',
			label: '使用寿命(年)',
		},
		{
			name: 'e',
			label: '所属水厂',
		},
		{
			name: 'f',
			label: '规格型号',
		},
		{
			name: 'g',
			label: '生产厂家',
		},
		{
			name: 'h',
			label: '安装位置',
		},
		{
			name: 'i',
			label: '购置时间',
		},
		{
			name: 'j',
			label: '责任人',
		},
		{
			name: 'k',
			label: '检修周期',
		},
		{
			name: 'l',
			label: '上次检验时间',
		},
		{
			name: 'm',
			label: '检修周期',
		},
		{
			name: 'n',
			label: '上次检验时间',
		},
		{
			name: 'o',
			label: '下次计划时间',
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
		data() {
			return {
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
					name: 'materialSpareParts'
				});
				that.$store.commit('set_asideStatus', true);
				that.$emit('showAside');
			},
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

	.modify {
		width: 100%;
		height: 100%;
		min-height: 100%;
		overflow-y: auto;

		.article {
			max-width: 1200px;
			margin-right: auto;
			margin-left: auto;
			margin-bottom: 24px;
			margin-top: 24px;
			border-radius: 6px;
			background-color: #fff;

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
	}
</style>
