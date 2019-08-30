<template>
	<div class="history">
		<div class="block">
			<div class="card">
				<div class="globalHandle">
					<el-form :inline="true" class="form">
						<el-form-item label="备件名称:">
							<el-input v-model="data.keyword" placeholder="请输入关键字"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onHandleSearch">搜索</el-button>
						</el-form-item>
						<el-form-item label="设备类型:">
							<el-select v-model="data.deviceValue" placeholder="请选择设备类型">
								<el-option v-for="item in data.devices" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="责任单位:">
							<el-select v-model="data.personLiable" placeholder="请选择责任人">
								<el-option v-for="item in data.personLiables" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="购置时间:">
							<el-date-picker v-model="data.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
							</el-date-picker>
						</el-form-item>
						<el-form-item>
							<el-checkbox v-model="ifValid">是否超期</el-checkbox>
						</el-form-item>
					</el-form>
					<div class="end">
						<!-- <el-button type="primary" @click="onHanldeCreate">导出二维码</el-button> -->
						<el-button type="primary" @click="onHanldeCreate">新增</el-button>
					</div>
				</div>
				<div class="table">
					<el-table :data="list" border size="mini">
						<el-table-column prop="a" align="center" label="备件名称">
						</el-table-column>
						<el-table-column prop="b" align="center" label="设备编号">
						</el-table-column>
						<el-table-column prop="c" align="center" label="规格型号">
						</el-table-column>
						<el-table-column prop="d" align="center" label="生产厂家">
						</el-table-column>
						<el-table-column prop="e" align="center" label="购置时间">
						</el-table-column>
						<el-table-column prop="f" align="center" label="使用寿命">
						</el-table-column>
						<el-table-column prop="g" align="center" label="是否超过年限使用">
						</el-table-column>
						<el-table-column prop="h" align="center" label="责任单位">
						</el-table-column>
						<el-table-column prop="i" align="center" label="责任人">
						</el-table-column>
						<el-table-column prop="j" align="center" label="详情">
							<template slot-scope="scope">
								<a href="JavaScript:void(0)" @click="onHandleListProfile(scope.row)">详情</a>
							</template>
						</el-table-column>
						<el-table-column prop="i" align="center" label="设备二维码">
							二维码
						</el-table-column>
						<el-table-column prop="j" align="center" label="操作">
							<template slot-scope="scope">
								<a href="JavaScript:void(0)" @click="onHandleListModify(scope.row)">编辑</a>
								<a href="JavaScript:void(0)" @click="onHandleListRemove(scope.row)">删除</a>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="globalPagination">
					<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" :current-page="data.current"
								   :page-sizes="paginationGroups" :page-size="data.pageSize" :total="data.total" layout="total, sizes, prev, pager, next, jumper">
					</el-pagination>
				</div>
			</div>
		</div>
		<!-- 删除 -->
		<dse-save-status :showModel="confirm.visible" @delThis="onHandleConfirmCancel" @sureDelThis="onHandleConfirmSubmit" />
	</div>
</template>

<script>
	import DseSaveStatus from '../../../common/components/toast/DseSaveStatus';

	const paginationGroups = [10, 20, 30, 40];
	const pagination = {
		total: 5,
		current: 1,
		pageSize: 10,
	};

	export default {
		components: {
			DseSaveStatus
		},
		data() {
			return {
				paginationGroups,
				data: {
					...pagination,
					deviceValue: '1',
					devices: [{
						id: 1,
						label: '机电类',
						value: '1',
					}, {
						id: 2,
						label: '自动化类',
						value: '2',
					}],
					personLiable: '',
					personLiables: [{
						id: 0,
						label: '全部水厂',
						value: '',
					},{
						id: 1,
						label: '东部净水厂',
						value: '1',
					},{
						id: 2,
						label: '西部净水厂',
						value: '2',
					}, {
						id: 3,
						label: '窑山扩建净水厂',
						value: '3',
					}, {
						id: 4,
						label: '王团扩建净水厂',
						value: '4',
					}, {
						id: 5,
						label: '小洪沟净化水厂',
						value: '5',
					}],
					date: '2019-08-05 09:11'
				},
				// list: Array.from(new Array(10)).map(it => ({
				// 	a: 'PH',
				// 	b: '2019-05-11 21：20',
				// 	c: '报警消息，压力监测点、1号监测点，当前监测值0.5MPa正常返回0.2-0.4MPa',
				// 	d: '2019-05-12 22：20',
				// })),
				list: [{
						a: '耐腐耐磨泵',
						b: 281,
						c: '32NHB-UF',
						d: '宜兴市宙斯泵业有限公司',
						e: '2016/7/19',
						f: '21(20)',
						g: '是',
						h: '东部净水厂',
						i: '杨生发'
					},
					{
						a: '高频开关电源',
						b: 316,
						c: 'RN-8000',
						d: '济南欧瑞实业有限公司',
						e: '2016/7/19',
						f: '4(20)',
						g: '否',
						h: '东部净水厂',
						i: '杨生发'
					},
					{
						a: '高频开关电源',
						b: 315,
						c: 'GGDF950A/60V',
						d: '济南欧瑞实业有限公司',
						e: '2016/7/19',
						f: '5(20)',
						g: '否',
						h: '小洪沟净化水厂',
						i: '胡海'
					},
					{
						a: '次氯酸钠发生器',
						b: 314,
						c: 'RN-8000',
						d: '济南欧瑞实业有限公司',
						e: '2016/7/19',
						f: '4(20)',
						g: '否',
						h: '小洪沟净化水厂',
						i: '胡海'
					},
					{
						a: '电动葫芦',
						b: 312,
						c: '1T',
						d: '银川起重机厂',
						e: '2016/7/19',
						f: '4(20)',
						g: '否',
						h: '小洪沟净化水厂',
						i: '胡海'
					},
					{
						a: '电磁流量计',
						b: 311,
						c: 'LDY-32S',
						d: '上海光华仪表有限公司',
						e: '2016/7/19',
						f: '5(20)',
						g: '否',
						h: '窑山扩建净水厂',
						i: '张君'
					},
					{
						a: 'PAC投加泵配套流量计',
						b: 310,
						c: 'LDY-32S',
						d: '上海光华仪表有限公司',
						e: '2016/7/19',
						f: '5(20)',
						g: '否',
						h: '窑山扩建净水厂',
						i: '张君'
					},
					{
						a: '电磁流量计',
						b: 309,
						c: 'LDY-32S',
						d: '上海光华仪表有限公司',
						e: '2016/7/19',
						f: '5(20)',
						g: '否',
						h: '王团扩建净水厂',
						i: '李伟'
					},
					{
						a: '变频三相异步电动机',
						b: 308,
						c: 'YVP-71M2-4',
						d: '浙江沪新防爆电机有限公司',
						e: '2016/7/19',
						f: '10(20)',
						g: '否',
						h: '王团扩建净水厂',
						i: '李伟'
					},
					{
						a: '耐腐耐磨泵',
						b: 282,
						c: '32NHB-UF',
						d: '宜兴市宙斯泵业有限公司',
						e: '2016/7/19',
						f: '10(20)',
						g: '否',
						h: '王团扩建净水厂',
						i: '李伟'
					}
				],
				confirm: {
					visible: false,
					payload: {}
				},
				ifValid:false
			};
		},
		methods: {
			onHandleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			onHandleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			onHandleSearch() {
				const that = this;

				that.$message.success('报警信息导出成功~');
				console.log('onHandleSearch!');
			},
			onHanldeCreate() {
				const that = this;

				// that.$message.success('报警信息导出成功~');
				// console.log('onHanldeExport!');
				that.onHandleListModify();
			},
			onHandleListModify(params = {}) {
				const that = this;

				that.$router.push({
					name: 'materialDeviceModify',
					params
				});
				that.$store.commit('set_asideStatus', false);
				that.$emit('hiddenAside');
			},
			onHandleListProfile() {
				const that = this;

				const params = {};
				that.$router.push({
					name: 'materialDeviceProfile',
					params
				});
				that.$store.commit('set_asideStatus', false);
				that.$emit('hiddenAside');
			},
			onHandleListOut() {},
			onHandleListIn() {},
			onHandleListRemove() {
				const that = this;

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
		}
	};
</script>

<style scoped="scoped" lang="scss">
	.history {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		background-color: #fff;

		/deep/ .el-table th {
			color: #333;
			background-color: #eee !important;
		}

		/deep/ .el-form--inline {
			* {
				vertical-align: middle;
				line-height: initial !important;
			}
		}

		/deep/ .el-date-editor .el-range-separator {
			width: auto;
		}

		/deep/ .el-button {
			line-height: initial !important;
		}

		/deep/ .el-form-item {
			margin-bottom: 0;
		}

		/deep/ .table-wrap {
			border: none !important;
		}

		.globalHandle {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;

			padding: 16px;
		}

		.table {
			padding: 16px;
			padding-top: 0;

			a {
				text-decoration: none;
				color: #187CEA;

				+a {
					margin-left: 8px;
				}
			}
		}
	}
</style>
