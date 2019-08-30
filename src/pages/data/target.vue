<template>
	<div class="history">
		<div class="block">
			<div class="card">
				<div class="globalHandle">
					<el-form :inline="true" :model="getList" class="form">
						<el-form-item label="分区选择:">
							<el-select v-model="getList.id" placeholder="请选择分区" @keyup.enter.native="onHandleSearch" @change="onHandleSearch">
								<el-option v-for="item in areaList" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="模糊搜索:">
							<el-input v-model="getList.keyword" placeholder="请输入百分率" @keyup.enter.native="onHandleSearch"></el-input>
						</el-form-item>
						<el-form-item label="时间选择:">
							<el-date-picker v-model="getList.date" value-format="yyyy" type="year" placeholder="请选择时间日期" @change="searchThisTime"></el-date-picker>
						</el-form-item>
						<el-form-item><el-button type="primary" @click="onHandleSearch">搜索</el-button></el-form-item>
					</el-form>
					<div class="end">
						<el-button type="primary" @click="onHanldeCreate">新增</el-button>
						<el-button type="primary" @click="onHanldeExport">导出</el-button>
					</div>
				</div>
				<div class="globalTable">
					<dse-table-width-pagination :totalNum="totalNum" :currentPage="currentPage" @goto_page="goto_page">
						<thead>
							<tr>
								<th><span>分区名称</span></th>
								<th><span>供水保障率</span></th>
								<th><span>水质达标率</span></th>
								<th><span>自来水普及率</span></th>
								<th><span>集中供水率</span></th>
								<th><span>填写日期</span></th>
								<th style="width: 180px"><span>操作</span></th>
							</tr>
						</thead>
						<tbody>
							<template v-if="nyIndexList && nyIndexList.length > 0">
								<tr v-for="(item, index) in nyIndexList" :key="index">
									<td>
										<span>{{ item.adcdnm }}</span>
									</td>
									<td>
										<span>{{ item.gsbzl }}%</span>
									</td>
									<td>
										<span>{{ item.szdbl }}%</span>
									</td>
									<td>
										<span>{{ item.zlspjl }}%</span>
									</td>
									<td>
										<span>{{ item.jzgsl }}%</span>
									</td>
									<td>
										<span>{{ item.tm }}</span>
									</td>
									<td class="btns">
										<span @click="onHandleListModify(item)">修改</span>
										<span @click="onHandleListRemove(item)">删除</span>
									</td>
								</tr>
							</template>
							<template v-else>
								<tr>
									<td colspan="7"><span style="line-height: 30px">暂无数据</span></td>
								</tr>
							</template>
						</tbody>
					</dse-table-width-pagination>
				</div>
			</div>
		</div>
		<!-- 新增&&修改 -->
		<dse-normal-model :tips="model.tips" :modelFlag="model.flag" :onHandleModelClose="onHandleModelClose" class="fnModel">
			<el-form :model="updateOrSave" :rules="rules" ref="updateOrSave" label-width="150px" class="modelRuleForm">
				<el-form-item label="供水保障率" prop="gsbzl"><el-input v-model="updateOrSave.gsbzl" placeholder="供水保障率"></el-input></el-form-item>
				<el-form-item label="水质达标率" prop="szdbl"><el-input v-model="updateOrSave.szdbl" placeholder="水质达标率"></el-input></el-form-item>
				<el-form-item label="自来水普及率" prop="zlspjl"><el-input v-model="updateOrSave.zlspjl" placeholder="自来水普及率"></el-input></el-form-item>
				<el-form-item label="集中供水率" prop="jzgsl"><el-input v-model="updateOrSave.jzgsl" placeholder="集中供水率"></el-input></el-form-item>
				<el-form-item><el-button type="primary" @click="onHandleModelSubmit()">保存</el-button></el-form-item>
			</el-form>
		</dse-normal-model>
		<!-- 删除 -->
		<dse-save-status :type="modelType" :showModel="confirm.visible" @delThis="onHandleConfirmCancel" @sureDelThis="onHandleConfirmSubmit" />
	</div>
</template>

<script>
import DseTableWidthPagination from '../../common/components/dseTableWidthPagination';
import dseNormalModel from '../../common/components/toast/dseNormalModel';
import DseSaveStatus from '../../common/components/toast/DseSaveStatus';

import { getDseGszbRList, nyIndex_delete, saveOrUpDseGszbR } from '../../api/interfaces/dataManage_api';
import { VDATA } from '../../utils/el_validater';

function numberOrFloat(rule, val, callBack) {
	let vdt = VDATA(val, {
		required: { msg: '数据必填！' },
		number: { msg: '请输入正确的数字！' },
		min: { param: 0, msg: '数字不能小于0！' },
		max: { param: 100, msg: '不能超过100！' }
	});
	if (!vdt.result) {
		callBack(new Error(vdt.msg));
	} else {
		callBack();
	}
}

export default {
	components: {
		DseTableWidthPagination,
		dseNormalModel,
		DseSaveStatus
	},
	data() {
		return {
			rules: {
				gsbzl: [
					{
						validator: numberOrFloat,
						trigger: 'blur'
					}
				],
				szdbl: [
					{
						validator: numberOrFloat,
						trigger: 'blur'
					}
				],
				zlspjl: [
					{
						validator: numberOrFloat,
						trigger: 'blur'
					}
				],
				jzgsl: [
					{
						validator: numberOrFloat,
						trigger: 'blur'
					}
				]
			},
			currentPage: 1,
			totalNum: 1,
			initFlag: true, //默认是 新增农饮指标
			modelType: false, //默认显示是删除的弹窗
			delId: '', //要删除的ID
			getList: {
				id: '',
				keyword: '',
				total: 10,
				current: 1,
				pageSize: 10,
				date: new Date().getFullYear() + ''
			},
			// 分区列表
			areaList: [],
			// 农饮指标列表
			nyIndexList: [],
			model: {
				tips: '指标新增',
				flag: false,
				value: ''
			},
			updateOrSave: {
				gid: '',
				adcd: '',
				tm: '',
				gsbzl: '', // 供水保障率
				szdbl: '', // 水质达标率
				zlspjl: '', // 自来水普及率
				jzgsl: '', // 集中供水率
				czr: this.$store.getters.get_userName,
				cztm: ''
			},
			// 弹窗 配置
			confirm: {
				visible: false
			}
		};
	},
	methods: {
		onHandleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		onHandleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		onHandlePage() {
			console.warn(123);
		},
		// 搜索当前的 的参数列表
		onHandleSearch() {
			this.getDseGszbRList_(1);
		},
		// 获取 当前的 时间的 列表
		searchThisTime(time) {
			this.getDseGszbRList_(1);
		},
		onHanldeExport() {
			const that = this;

			that.$message.success('报警信息导出成功~');
			console.log('onHanldeExport!');

			// const content = res;
			// const blob = new Blob([content], {type: 'application/vnd.ms-excel;charset=utf-8'});
			// const fileName = '管网台账.xls';
			// if ('download' in document.createElement('a')) {
			// 	// 非IE下载
			// 	const elink = document.createElement('a');
			// 	elink.download = fileName;
			// 	elink.style.display = 'none';
			// 	elink.href = window.URL.createObjectURL(blob);
			// 	document.body.appendChild(elink);
			// 	elink.click();
			// 	window.URL.revokeObjectURL(elink.href); // 释放URL 对象
			// 	document.body.removeChild(elink);
			// } else {
			// 	// IE10+下载
			// 	navigator.msSaveBlob(blob, fileName);
			// }
			//
			// that.showAnimate = false;
		},
		onHanldeCreate() {
			const that = this;
			this.initFlag = true;
			that.onHanldeModelVisible();
			this.updateOrSave = {
				...that.updateOrSave,
				adcd: this.getList.id,
				gsbzl: '', // 供水保障率
				szdbl: '', // 水质达标率
				zlspjl: '', // 自来水普及率
				jzgsl: '' // 集中供水率
			};
		},
		// 编辑农饮指标
		onHandleListModify(payload = {}) {
			const that = this;
			this.initFlag = false;
			this.updateOrSave = {
				...that.updateOrSave,
				...payload
			};

			that.onHanldeModelVisible();
		},
		onHanldeModelVisible() {
			const that = this;

			that.model = {
				...that.model,
				flag: true
			};
		},
		onHandleModelClose() {
			const that = this;
			that.model = {
				...that.model,
				flag: false
			};
		},
		// 新增 农饮指标
		onHandleModelSubmit() {
			const that = this;
			if (this.initFlag) {
				this.updateOrSave.gid = '';
			}

			if (this.getList.id == '') {
				this.$message.error('请选择一个分区！');
				return;
			}

			//更新当前日期

			this.updateOrSave.tm = this.$days().format('YYYY-MM-DD');
			this.updateOrSave.cztm = this.$days().format('YYYY-MM-DD HH:mm:ss');

			that.$refs.updateOrSave.validate(valid => {
				if (valid) {
					that.saveOrUpDseGszbR_(that.updateOrSave);
				} else {
					that.$message.error('您输入的内容有误');
					return false;
				}
			});
			that.onHandleModelClose();
		},
		// 显示删除 农饮指标的  弹窗
		onHandleListRemove(payload = {}) {
			const that = this;
			this.delId = payload.gid;
			that.onHandleConfirmVisible();
		},
		// 确定删除 一行数据
		onHandleConfirmSubmit() {
			this.nyIndex_delete_();
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
		// 跳转到指定页面
		goto_page(obj) {
			this.getList.current = obj.pageNum;
			this.getList.pageSize = obj.pageSize;

			this.getDseGszbRList_(obj.pageNum);
		},
		// 获取农饮指标的 列表
		getDseGszbRList_(num = 1) {
			let that = this;
			/**
			 *
			 * @param adcd 分区ID
			 * @param keyname 模糊搜索名字
			 * @param tyear 年份
			 *
			 */
			let { id = '', keyword = '', date = '' } = this.getList;
			getDseGszbRList(
				{
					adcd: id,
					keyname: keyword,
					tyear: date,
					pageNum: num,
					pageSize: that.getList.pageSize
				},
				that
			).then(res => {
				let { data } = res;
				let { total, list } = data;

				that.currentPage = num;
				that.totalNum = parseInt(total) ? parseInt(total) : 1;
				list = list && list.length > 0 ? list : [];
				// 实例
				that.nyIndexList = [...list];
			});
		},
		// 保存或者更新农饮指标
		saveOrUpDseGszbR_(params) {
			let that = this;
			saveOrUpDseGszbR(params, that).then(res => {
				let { status = 1 } = res;
				that.model.flag = false;
				if (status == 1) {
					setTimeout(() => {
						that.$message.success('保存成功');
						that.getDseGszbRList_(1);
					}, 1000);
				} else {
					setTimeout(() => {
						that.$message.error('保存失败');
					}, 1000);
				}
			});
		},
		// 删除 农饮指标
		nyIndex_delete_() {
			let that = this;
			nyIndex_delete(
				{
					delId: that.delId
				},
				that
			).then(res => {
				let { status = 1 } = res;
				that.onHandleConfirmCancel();
				if (status == 1) {
					setTimeout(() => {
						that.$message.success('删除成功!');
						that.getDseGszbRList_(1);
					}, 1500);
				} else {
					setTimeout(() => {
						that.$message.success('删除失败!');
					}, 1500);
				}
			});
		}
	},
	created() {
		this.areaList = this.$store.getters.get_cityAreas;
		if (this.areaList.length > 0) {
			this.getList.id = this.areaList[0].value;
		}

		this.getDseGszbRList_(1);
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

		/deep/ .el-form-item {
			margin-bottom: 0;
		}
	}

	/deep/ .el-button {
		line-height: initial !important;
	}

	/deep/ .table-wrap {
		border: none !important;
	}

	// /deep/ .el-form--inline,
	// /deep/ .el-form-item,
	// /deep/ .el-form-item__content{
	// 	display: flex;
	// 	align-items: center;
	// }

	.globalHandle {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;

		padding: 16px;
	}

	.table {
		width: 100%;
		height: calc(100% - 60px);

		a {
			text-decoration: none;
			color: #187cea;

			+ a {
				margin-left: 8px;
			}
		}
		td {
			span {
				line-height: 20px;
			}
		}
	}

	.pagination {
		padding: 16px 24px;
		text-align: center;
	}

	.fnModel {
		/deep/ .model {
			height: auto !important;
		}

		/deep/ .el-form-item {
			margin-bottom: 16px;
		}

		.modelRuleForm {
			padding: 16px 24px;
		}

		.btnGroup {
			padding-top: 8px;
			text-align: center;
		}
	}
}
</style>
