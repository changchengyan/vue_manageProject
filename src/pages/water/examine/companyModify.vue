<template>
	<div class="data">
		<div class="handleBack">
			<div class="back"><span class="go-back" @click="onHandleBack">返回</span></div>
		</div>

		<div class="article">
			<h3>考核信息</h3>
			<el-form ref="form" :inline="true" :model="form" label-width="170px">
				<el-form-item label="年度:">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="考核单位:">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="考核时间:">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="考核结果:">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="考核组成员">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
			</el-form>

			<div class="table">
				<h3 class="title">一、节水技术评分标准（35分）</h3>
				<el-table :data="list1" border size="mini">
					<el-table-column prop="a" align="center" label="序号">
					</el-table-column>
					<el-table-column prop="b" align="center" label="指标">
					</el-table-column>
					<el-table-column prop="c" align="center" label="考核内容">
					</el-table-column>
					<el-table-column prop="d" align="center" label="评分标准">
					</el-table-column>
					<el-table-column prop="e" align="center" label="分值">
					</el-table-column>
					<el-table-column prop="f" align="center" label="得分">
					</el-table-column>
					<el-table-column prop="g" align="center" label="备注">
					</el-table-column>
				</el-table>
				<h3 class="title">二、节水管理评价标准（65分）</h3>
				<el-table :data="list2" border size="mini">
					<el-table-column prop="a" align="center" label="序号">
					</el-table-column>
					<el-table-column prop="b" align="center" label="指标">
					</el-table-column>
					<el-table-column prop="c" align="center" label="考核内容">
					</el-table-column>
					<el-table-column prop="d" align="center" label="评分标准">
					</el-table-column>
					<el-table-column prop="e" align="center" label="分值">
					</el-table-column>
					<el-table-column prop="f" align="center" label="得分">
					</el-table-column>
					<el-table-column prop="g" align="center" label="备注">
					</el-table-column>
				</el-table>
				<h3 class="title">三、节水鼓励性评价标准（5分）</h3>
				<el-table :data="list3" border size="mini">
					<el-table-column prop="a" align="center" label="序号">
					</el-table-column>
					<el-table-column prop="b" align="center" label="指标">
					</el-table-column>
					<el-table-column prop="c" align="center" label="考核内容">
					</el-table-column>
					<el-table-column prop="d" align="center" label="评分标准">
					</el-table-column>
					<el-table-column prop="e" align="center" label="分值">
					</el-table-column>
					<el-table-column prop="f" align="center" label="得分">
					</el-table-column>
					<el-table-column prop="g" align="center" label="备注">
					</el-table-column>
				</el-table>
			</div>
		
			<el-upload style="margin-top: 16px;" :action="upload.action">
				<el-button type="primary">上传附件</el-button>
			</el-upload>
			
			<div class="btnGroup">
				<el-button type="primary">提交</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				upload: {
					action: 'https://jsonplaceholder.typicode.com/posts/',
					imageUrl: '',
					visible: false
				},
				list1: [{
					a: '1',
					b: '水计量率',
					c: '',
					d: '',
					e: '10',
					f: '',
				}, {
					a: '2',
					b: '节水器具普及率',
					c: '',
					d: '',
					e: '10',
					f: '',
				}, {
					a: '3',
					b: '人均用水量',
					c: '',
					d: '',
					e: '7',
					f: '',
				}, {
					a: '4',
					b: '用水器具漏失率',
					c: '',
					d: '',
					e: '8',
					f: '',
				}],
				list2: [{
					a: '5',
					b: '规章制度',
					c: '',
					d: '',
					e: '15',
					f: '',
				}, {
					a: '6',
					b: '计量统计',
					c: '',
					d: '',
					e: '15',
					f: '',
				}, {
					a: '7',
					b: '节水技术推广与改造',
					c: '',
					d: '',
					e: '18',
					f: '',
				}, {
					a: '8',
					b: '管理维护',
					c: '',
					d: '',
					e: '10',
					f: '',
				}, {
					a: '9',
					b: '节水宣传',
					c: '',
					d: '',
					e: '7',
					f: '',
				}],
				list3: [{
					a: '1',
					b: '中央空调冷却补水率',
					c: '',
					d: '',
					e: '1',
					f: '',
				}, {
					a: '2',
					b: '锅炉冷凝水回收率',
					c: '',
					d: '',
					e: '1',
					f: '',
				}, {
					a: '3',
					b: '非常规水源利用',
					c: '',
					d: '',
					e: '3',
					f: '',
				}],
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
		}
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
		background-color: #E9EAEB;
		overflow-y: auto;

		.article {
			max-width: 1200px;
			margin-right: auto;
			margin-left: auto;
			padding: 24px;
			text-align: left;
			background-color: #fff;

			.el-form {
				.el-form-item {
					margin-bottom: 8px;
				}
				
				/deep/ .el-form-item__content {
					width: 370px;
				}
			}

			.table {
				padding: 16px;

				/deep/ .el-table {
					th {
						background-color: #f0f1f1;
						color: #333;
					}
				}

				.title {
					font-size: 16px;
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
		
		.btnGroup {
			margin: 32px 0;
			text-align: center;
		}
	}
</style>
