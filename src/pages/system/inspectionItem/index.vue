<template>
	<div class="block" id="inspectionItem">
		<div class="card">
			<section class="header">
				<div class="top-add-handle">
					<!-- <div class="prev"><i class="el-icon-arrow-left icon"></i></div> -->
					<section class="scroll">
						<menu :class="tabIndex === key && 'active'" v-for="(item, key) in tabs" :key="item.id" @click="_tabChange(key, $event)">
							{{ item.name }}
							<i class="el-icon-close" @click="_tabRemove(key, $event)"></i>
						</menu>
					</section>
					<!-- <div class="next"><i class="el-icon-arrow-right icon"></i></div> -->
				</div>
				<div class="top-add-item">
					<div class="col">
						<el-button type="primary" @click="onHandleAddInspectionItemShow">
							<i class="el-icon-plus"></i>
							新增巡检对象
						</el-button>
					</div>
				</div>
			</section>
			<div class="table-content">
				<table class="innerTable">
					<thead>
						<tr>
							<th><span>巡检项</span></th>
							<th><span>巡检结果</span></th>
						</tr>
					</thead>
					<tfoot>
						<tr class="inspectionBtnWraper">
							<td colspan="2">
								<el-tooltip effect="dark" content="新增巡检项" placement="top">
									<i class="el-icon-circle-plus-outline inspectionBtn" @click="onHandleAddInspectionShow"></i>
								</el-tooltip>
							</td>
						</tr>
					</tfoot>
					<tbody>
						<template v-if="tabContent.length">
							<tr v-for="item in tabContent" :key="item.id">
								<td>
									<!-- <span>{{ item.item_name }}</span> -->
									<span>{{ item.a }}</span>
								</td>
								<td>
									<span>{{ item.b }}</span>
									<!-- <span v-for="(i, k) in item.resultList" :key="k">{{ i.result_name }} {{ k === item.resultList.length - 1 ? '' : '、' }}</span> -->
									<!-- <el-radio v-for="(i, k) in item.resultList" :name="item.id" label="0" :key="k">{{ i.result_name }}</el-radio> -->
									<!-- <el-radio v-model="item.radio" label="0">异常</el-radio> -->
								</td>
							</tr>
						</template>
						<template v-else>
							<tr>
								<td colspan="2"><span>没有您查找的数据哦~~</span></td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
		</div>
		<!-- 新增 -->
		<dse-normal-model :tips="model1Tips" :modelFlag="model1Flag" :onHandleModelClose="onHandleModel1Close" class="spectionObj">
			<div class="model1Wraper">
				<el-form ref="form" label-width="100px">
					<el-form-item label="巡检对象名称"><el-input v-model="model1Value"></el-input></el-form-item>
				</el-form>
				<el-button type="primary" @click="onHandleAddInspectionItemSubmit">提交</el-button>
			</div>
		</dse-normal-model>
		<dse-normal-model :tips="model2Tips" :modelFlag="model2Flag" :onHandleModelClose="onHandleModel2Close" class="spectionItem">
			<div class="model1Wraper">
				<el-form ref="form" label-width="80px">
					<el-form-item label="选检项目:"><el-input type="textarea" v-model="data.itemName"></el-input></el-form-item>
					<el-form-item label="巡检结果:">
						<el-checkbox-group v-model="data.resultList">
							<el-checkbox label="正常"></el-checkbox>
							<el-checkbox label="异常"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer"><el-button type="primary" @click="onHandleAddInspectionSubmit">提 交</el-button></span>
			</div>
		</dse-normal-model>
		<!-- 删除 -->
		<dse-save-status
			:showModel="confirm.showModel"
			:content="confirm.content"
			:type="confirm.type"
			:flag="confirm.flag"
			@delThis="onHandleClosePointModel"
			@sureDelThis="onHandleSureDelThis()"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import DseSaveStatus from '../../../common/components/toast/DseSaveStatus';
import dseNormalModel from '../../../common/components/toast/DseNormalModel';
// import {
// 查询巡检对象列表
// getPipeInspectObjectList,
// 保存巡检对象
// saveInspectObject,
// 删除巡检对象
// deleteInspectObject,
// 保存巡检项
// saveInspectItem
// } from '../../../api/interfaces/pipeSetting_api';
export default {
	name: 'inspectionItem',
	computed: mapGetters({
		companyId: 'get_companyId'
	}),
	components: {
		DseSaveStatus,
		dseNormalModel
	},
	data() {
		return {
			tabIndex: 0,
			tabs: [],
			tabContent: [],
			increment: 0,
			dialogVisible: false,
			data: {
				itemName: '',
				resultList: []
			},
			model1Value: '',
			model1Flag: false,
			model1Tips: '新增巡检对象',
			model2Flag: false,
			model2Tips: '新增巡检项',
			confirm: {
				tabIndex: 0,
				showModel: false
			}
		};
	},
	mounted() {
		const that = this;

		that._initialization();
	},
	methods: {
		_initialization() {
			const that = this;

			// 查询巡检对象列表
			that._getPipeInspectObjectList();
		},
		onHandleClosePointModel(payload = {}) {
			this.confirm = {
				...this.confirm,
				showModel: false
			};
		},
		onHandleSureDelThis() {
			const { tabIndex = 0 } = this.confirm;
			const { id = '' } = this.tabs[tabIndex];
			this._deleteInspectObject(id);
			this.confirm = {
				...this.confirm,
				showModel: false
			};
		},
		_tabRemove(tabIndex = 0, e) {
			e.preventDefault();
			e.stopPropagation();

			this.confirm = {
				...this.confirm,
				tabIndex,
				showModel: true
			};
		},
		_tabChange(tabIndex) {
			this.tabIndex = tabIndex;
		},
		_getPipeInspectObjectList() {
			const that = this;

			// const { pagination = {} } = that;
			// const { current, pageSize } = pagination;
			/**
			 * 查询巡检对象列表
			 * @param {companyId}      [false] 公司 ID
			 */
			// const payload = { company_id: companyId };
			// getPipeInspectObjectList(payload, that)
			// 	.then((results = {}) => {
			// 		const { errno, errmsg, data = {} } = results;
			// 		const { current, pageSize, total, rows } = data;
			// 		if (!errno) {
			// 			that.list = rows.map((item = {}) => ({
			// 				...item,
			// 				type: item.type === 1 ? '水厂' : item.type === 2 ? '哈哈' : item.type === 0 ? '嘻嘻' : '暂未',
			// 				isDisplay: item.isDisplay === 1 ? '显示' : '隐藏'
			// 			}));
			// 			that.pagination = {
			// 				...that.pagination,
			// 				current,
			// 				pageSize,
			// 				total
			// 			};
			// 		} else {
			// 			console.warn(errmsg);
			// 		}
			// 	})
			// 	.catch(e => {
			// 		console.warn(e);
			// 	});

			that.tabs = [
				{
					name: '管线签到点'
				},
				{
					name: '工程巡检点'
				}
			];
			that.tabContent = [
				{
					a: '1、用户计量间门窗、门锁有无损坏，室内设备运行有无异常。',
					b: '正常'
				},
				{
					a: '2、进、配水管网有无渗漏水现象。',
					b: '正常'
				},
				{
					a: '3、进、配水管网管床、阀门井有无塌陷现象、巡视道路是否畅通。',
					b: '正常'
				},
				{
					a: '5、进、配水管网上有无重车碾压通过。',
					b: '正常'
				},
				{
					a: '6、进、配水管网征地范围内有无建筑施工、取土、挖掘、种植、侵占土地等现象。',
					b: '正常'
				},
				{
					a: '7.进、配水管网范围内有无私自取水偷水、未经允许私自进入阀门井内、私自开关阀门等现象。',
					b: '正常'
				}
			];
		},
		onHandleModel1Close() {
			this.model1Flag = false;
		},
		onHandleModel2Close() {
			this.model2Flag = false;
		},
		onHandleAddInspectionItemShow() {
			const that = this;

			that.model1Flag = true;
		},
		onHandleAddInspectionShow() {
			const that = this;

			that.model2Flag = true;
		},
		onHandleAddInspectionItemSubmit() {
			const that = this;
			// that.increment += 1;
			// const { companyId = '', increment = 0 } = that;
			// const value = that.model1Value;

			// if (!value)
			// 	return that.$message({
			// 		type: 'warning',
			// 		message: '巡检对象名称不能为空！'
			// 	});

			/**
			 * 保存巡检对象
			 * @param {objName} [true] 对象名称
			 * @param {companyId} [true] 水司id
			 * @param {objType} [true] 1是管线签到点对象 2是工程签到点对象
			 */
			// 			const params = {
			// 				objName: value,
			// 				companyId,
			// 				objType: increment
			// 			};
			// 			saveInspectObject(params, that).then((results = {}) => {
			// 				const { status = 0 } = results;
			//
			// 				if (status) {
			// 					that.$message({
			// 						type: 'success',
			// 						message: '巡检项添加成功~'
			// 					});
			//
			// 					that.model1Flag = false;
			// 					that._initialization();
			// 				}
			// 			});
			that.$message({
				type: 'success',
				message: '巡检项添加成功~'
			});

			that.model1Flag = false;
			that._initialization();
			// 			that.$prompt('对象名称：', '新增巡检对象', {
			// 				confirmButtonText: '提交'
			// 			})
			// 				.then(({ value }) => {
			// 				})
			// 				.catch(() => {});
		},
		// 删除巡检对象
		_deleteInspectObject(id) {
			const that = this;
			/**
			 * 删除巡检对象
			 * @param {id} [true] 公司 ID
			 * @param {delFlag} [true] 删除标记 删除：1
			 */
			// 				const params = {
			// 					id,
			// 					delFlag: 1
			// 				};
			// 				deleteInspectObject(params, that).then((results = {}) => {
			// 					const {
			// 						status = 0
			// 					} = results;
			//
			// 					if (status) {
			// 						that.$message({
			// 							type: 'success',
			// 							message: '删除巡检对象成功~'
			// 						});
			//
			// 						that._initialization();
			// 					}
			// 				});

			that.$message({
				type: 'success',
				message: '删除巡检对象成功~'
			});

			that._initialization();
		},
		// onHandleAddInspection
		onHandleAddInspectionSubmit() {
			const that = this;
			// const tabIndex = that.tabIndex;
			// const {
			// 	id
			// } = that.tabs[tabIndex];
			// const {
			// 	companyId
			// } = that;
			// const {
			// 	itemName = '', resultList
			// } = that.data;
			// if (!itemName) {
			// 	return that.$message({
			// 		type: 'warning',
			// 		message: '选检项目不能为空！'
			// 	});
			// }
			// const _resultList = resultList.map(resultName => ({
			// 	resultName
			// }));
			/**
			 * 保存巡检项
			 * @param {itemName} [true] 巡检项名称
			 * @param {objId} [true] 巡检对象id
			 * @param {resultList:[resultName]} [true] 巡检结果对象数组[巡检班组成员name]
			 * @param {id} [true] 巡检班组id
			 */

			// 				const params = {
			// 					objId: id,
			// 					companyId,
			// 					itemName,
			// 					resultList: _resultList
			// 				};
			//
			// 				saveInspectItem(params, that).then((results = {}) => {
			// 					const {
			// 						status = 0
			// 					} = results;
			// 					if (status) {
			// 						that.$message({
			// 							type: 'success',
			// 							message: '新增巡检项成功~'
			// 						});
			//
			// 						// that.dialogVisible = false;
			// 						that.model2Flag = false;
			// 						that._initialization();
			// 					}
			// 				});

			that.$message({
				type: 'success',
				message: '新增巡检项成功~'
			});

			// that.dialogVisible = false;
			that.model2Flag = false;
			that._initialization();
		}
		// 		onHandleDialogVisible() {
		// 			this.dialogVisible = true;
		// 		},
		// 		onHandleDialogClose() {
		// 			this.dialogVisible = false;
		// 		}
	}
};
</script>

<style scoped lang="scss">
.block {
	padding: 8px;
}

.card {
	min-height: 100%;
}

#inspectionItem {
	width: 100%;
	height: 100%;
	padding: 10px;

	.header {
		position: relative;
		min-height: 38px;
		// padding: 5px 10px 10px;
		font-size: 0;

		.top-add-handle {
			overflow: hidden;
			margin-bottom: 5px;

			.prev,
			.next {
				display: inline-block;
				vertical-align: top;
				height: 100%;
				margin: 5px 0;
				padding: 7px;
				border-radius: 3px;
				text-align: center;
				cursor: pointer;
				background-color: rgba(0, 0, 0, 0.3);
				/* background: #1bcbf1; */
				color: #fff;

				&:actived {
					background-color: #1bcbf1;
				}

				.icon {
					font-size: initial;
				}
			}

			// 修改巡检项配置 UI
			.scroll {
				display: inline-block;
				width: calc(100% - 355px);
				margin-right: 5px;
				margin-left: 5px;
				padding-top: 5px;
				padding-bottom: 5px;
				// padding: 5px 10px;
				white-space: nowrap;
			}

			.scroll {
				overflow-x: auto;

				&::-webkit-scrollbar {
					width: 5px;
					height: 5px;
				}

				&::-webkit-scrollbar-track {
					box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
					border-radius: 10px;
					background-color: #f0f0f0;
				}

				&::-webkit-scrollbar-thumb {
					box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
					border-radius: 10px;
					background-color: #ccc;
				}
			}

			menu {
				position: relative;
				display: inline-block;
				margin-top: 0;
				margin-bottom: 0;
				padding: 5px 20px;
				color: #666;
				border-radius: 6px;
				cursor: pointer;
				font-size: 14px;
				text-align: center;
				text-decoration: none;
				background-color: #e4e4e4;

				&.active {
					color: #333;
					background-color: #cccccc;
				}

				i {
					position: absolute;
					top: -5px;
					right: -6px;
					padding: 1px;
					border-radius: 50%;
					color: #fff;
					background-color: #999;
				}

				+ menu {
					margin-left: 15px;
				}
			}
		}

		.top-add-item {
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);

			height: 50px;
			padding: 10px 0 10px 10px;

			.col {
				&:last-child {
					text-align: right;
				}
			}
		}
	}

	.innerTable {
		tr td span {
			width: auto;
		}

		.inspectionBtnWraper {
			td {
				padding-top: 5px;
				padding-bottom: 5px;
			}

			.inspectionBtn {
				font-size: 26px;
				color: #999;
				cursor: pointer;
			}
		}
	}

	.table-content {
		width: 100%;
		height: calc(100% - 50px);
	}

	.model1Wraper {
		width: 80%;
		height: 100%;
		margin-right: auto;
		margin-left: auto;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;

		.el-form {
			width: 100%;
		}
	}

	.spectionObj {
		/deep/ .model {
			height: 200px !important;
		}
	}

	.spectionItem {
		/deep/ .model {
			height: 270px !important;
		}
	}
}
</style>
