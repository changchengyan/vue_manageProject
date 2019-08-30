<template>
	<div id="patrolTeamConfig">
		<div class="top-head">
			<span>班组配置</span>
			<span @click="_goBack" class="go-back">返回首页</span>
		</div>
		<div class="configContent">
			<el-form ref="form" label-width="100px" class="groupName">
				<el-form-item label="巡检班组名称"><el-input v-model="data.groupName" placeholder="请输入巡检班组名称"></el-input></el-form-item>
			</el-form>
			<el-collapse v-model="collapseActiveNames" @change="onHandleCollapseChange" accordion>
				<el-collapse-item :default-expanded-keys="transferDefaultExpandedKeys" :title="collapseItemTabs[0]" name="1" style="padding-top: 25px;">
					<tree-transfer
						ref="transferTree1"
						:mode="mode"
						:title="transferTitles"
						:from_data="transfer1FromData"
						:to_data="transfer1ToData"
						:defaultProps="transfer1DefaultProps"
						:leafOnly="transfer1LeafOnly"
						:defaultTransfer="transfer1DefaultTransfer"
						height="350px"
						:button_text="transferButtonText"
						:openAll="transferOpenAll"
						@addBtn="onHandleTransfer1Add"
						@removeBtn="onHandleTransfer1Remove"
						@left-check-change="onHandleLeftCheckChange({ ...$event, flag: 0 })"
						@right-check-change="onHandleRightCheckChange({ ...$event, flag: 0 })"
					></tree-transfer>
				</el-collapse-item>
				<el-collapse-item :title="collapseItemTabs[1]" name="2">
					<tree-transfer
						:mode="mode"
						:title="transferTitles"
						:from_data="transfer2FromData"
						:to_data="transfer2ToData"
						:defaultProps="transfer2DefaultProps"
						:button_text="transferButtonText"
						:leafOnly="true"
						height="350px"
						openAll
						@addBtn="onHandleTransfer2Add"
						@removeBtn="onHandleTransfer2Remove"
						@left-check-change="onHandleLeftCheckChange({ ...$event, flag: 1 })"
						@right-check-change="onHandleRightCheckChange({ ...$event, flag: 1 })"
					></tree-transfer>
				</el-collapse-item>
			</el-collapse>
			<section style="margin-top: 15px; text-align: center;"><el-button type="primary" size="medium" @click="onHandleSubmit">提交</el-button></section>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import treeTransfer from 'el-tree-transfer';
// import {
// 根据组织机构ID获取部门列表
// listDepartmentByOrgId,
// 根据部门ID获取该部门下面所有人
// queryPersonByDept,
// 保存巡检班组
// saveInspectGroup
// } from '../../../api/interfaces/pipeSetting_api';

export default {
	name: 'patrolTeamConfig',
	components: {
		treeTransfer
	},
	computed: mapGetters({
		companyId: 'get_companyId'
	}),
	data() {
		return {
			data: {
				// 巡检班组名称
				groupName: '',
				leaderId: '',
				memberList: []
			},
			tem1: [],
			tem2: [],
			mode: 'transfer', // addressList
			transfer1DefaultProps: {
				children: 'children',
				label: 'label'
			},
			transfer1LeafOnly: true,
			transfer1DefaultTransfer: true,
			transfer2DefaultProps: {
				label: 'label'
			},
			departments: [],
			transferDefaultExpandedKeys: [1],
			collapseItemTabs: ['班组长选择', '班组人员选择'],
			collapseActiveNames: ['1'],
			transferOpenAll: true,
			transferButtonText: [' ', ' '],
			transferTitles: ['人员列表', '已选班组长'],
			transfer1FromData: [],
			transfer1ToData: [],
			transfer2FromData: [],
			transfer2ToData: []
		};
	},
	mounted() {
		const that = this;

		that._initialization();
	},
	methods: {
		_initialization() {
			const that = this;

			that._listDepartmentByOrgId();
		},
		_goBack() {
			this.$router.go(-1);
			this.$store.commit('set_asideStatus', true);
			this.$emit('showAside', '');
		},
		_listDepartmentByOrgId() {
			// const that = this;
			// const { companyId } = that;
			/**
			 * 根据组织机构ID获取部门列表 && 获取当前公司下的部门
			 * @param {orgId} [true string] 页码
			 */
			// 			const params = {
			// 				orgId: companyId
			// 			};
			// 			listDepartmentByOrgId(params, that).then((results = []) => {
			// 				that.departments = Array.isArray(results)
			// 					? results.map((item, key) => ({
			// 							id: item.ID,
			// 							pid: 0,
			// 							label: item.NAME,
			// 							children: [
			// 								{
			// 									id: '1',
			// 									pid: '0',
			// 									label: '数据多、没填充'
			// 								}
			// 							]
			// 					  }))
			// 					: [];
			//
			// 				that.transfer1FromData = that.departments;
			// 				that.transfer2FromData = that.departments;
			//
			// 				that._queryPersonByDept();
			// 			});
		},
		_queryPersonByDept(flag = 'transfer1FromData') {
			// const that = this;
			// const tem = [];
			// that[flag].forEach((item = {}, key = 0) => {
			// const deptId = item.id;
			/**
			 * 根据部门ID获取该部门下面所
			 * @param {orgId} [true string] 页码
			 */
			// const params = {
			// 	deptId
			// };
			// queryPersonByDept(params, that).then((results = {}) => {
			// 	const { data = [] } = results;
			// 	item.children = Array.isArray(data)
			// 		? data.map((item = {}) => ({
			// 				id: item.id,
			// 				pid: deptId,
			// 				label: item.name
			// 		  }))
			// 		: [];
			// });
			// });
		},
		onHandleSubmit() {
			const that = this;
			const { groupName = '' } = that.data;
			// const [leaderId = ''] = that.tem1;
			const [{ children = [] }] = that.transfer1ToData;
			const [{ id = '' }] = children;
			console.warn(id);
			const leaderId = id;
			// const leaderId = that.transfer1ToData[0] && that.transfer1ToData[0].id;
			// 			const memberList = that.tem2.map(id => ({
			// 				memberId: id
			// 			}));
			const memberList = [];
			// 				that.transfer2ToData[0] &&
			// 				that.transfer2ToData[0].children.map((item = {}) => ({
			// 					memberId: item.id
			// 				}));
			that.transfer2ToData.forEach((item = {}) => {
				if (item.children[0]) {
					const { children = [] } = item;
					Array.isArray(children) &&
						children.forEach((it = {}) => {
							memberList.push({
								memberId: it.id
							});
						});
				}
			});

			/**
			 * 监测点查询
			 * @param {groupName} 巡检班组名称
			 * @param {leaderId} 巡检班组长id
			 * @param {memberList: [memberId]} 班组成员集合[班组成员id]
			 */
			const params = {
				groupName,
				leaderId,
				memberList
			};

			console.warn(params, 'params_test');

			if (!groupName || !leaderId || !memberList[0]) {
				return that.$message.warning('请选择班组名称、班组长、班组人员~');
			}

			// 			saveInspectGroup(params, that).then((results = {}) => {
			// 				const { status } = results;
			//
			// 				if (status) {
			// 					that.$message.success('班组新增成功~');
			// 					that._goBack();
			// 				}
			// 				console.warn(results, 'results');
			// 			});
		},
		onHandleCollapseChange(val) {
			const that = this;

			val === '2' && that._queryPersonByDept('transfer2FromData');
		},
		onHandleLazy(e) {
			console.warn(e, 123);
		},
		_fn1(payload = {}) {
			const that = this;
			const { transferType = 0, toData = [], toType = 'transfer1ToData', fromType = 'transfer1FromData' } = payload;

			let TRANSFER_ITEM = [];

			// 单选情况下右侧的常量
			const toTypeData = that[toType];

			// 单选的情况下
			if (transferType === 0 && toTypeData[0]) {
				const TO_DATA = JSON.parse(JSON.stringify(toData));
				// 控制右侧人员数量
				that[toType] = [TO_DATA.pop()].map((item = {}) => {
					const { children = [] } = item;
					const C = JSON.parse(JSON.stringify(children));

					item.children = [C.pop()];
					TRANSFER_ITEM.push(...C);
					// item.children = C[C.length - 1];
					// TRANSFER_ITEM = [].concat(TRANSFER_ITEM, C.slice[(0, C.length - 2)]);
					return item;
				});

				// 控制左侧人员数量
				that[fromType].forEach((item = {}) => {
					// 控制左侧人员数量
					const id = that[toType][0] ? that[toType][0].id : '';
					if (id === item.id) item.children = item.children.concat(TRANSFER_ITEM);
				});

				return;
			}

			const TRANSFER_CHILDREN = [];
			const TO_DATA = JSON.parse(JSON.stringify(toData));
			that[toType] = TO_DATA.filter((item = {}) => {
				// 控制右侧人员数量
				// 将左侧部门人员不为空的情况下对象穿梭到右侧 && 临时存储
				const { children = [] } = item;
				if (Array.isArray(children) && children[0]) return TRANSFER_CHILDREN.push(item);

				return false;
			});

			const FROM_TYPE = JSON.parse(JSON.stringify(that[fromType]));
			that[fromType] = FROM_TYPE.filter((item = {}) => {
				let flag = true;

				// 控制左侧人员数量
				const { id = '' } = item;
				TRANSFER_CHILDREN.forEach((it = {}) => {
					const { children = [] } = it;

					// 左边的人已经到右边了
					if (it.id === id) {
						if (Array.isArray(children) && children[0]) {
							// 部门人员存在人的情况
							item.children = item.children.filter((j = {}) => {
								let f = true;

								children.forEach((k = {}) => {
									if (k.id === j.id) f = false;
								});

								return f;
							});
						} else {
							// 防止部门人员为空的对象传送到右边
							flag = false;
						}
					}
				});

				return flag;
			});
		},
		// 班组长添加
		onHandleTransfer1Add(fromData = [], toData = [], obj = {}) {
			const that = this;

			that._fn1({
				transferType: 0,
				fromData,
				toData,
				toType: 'transfer1ToData',
				fromType: 'transfer1FromData'
			});
		},
		// 班组长移除
		onHandleTransfer1Remove(fromData, toData, obj) {
			console.warn(fromData, toData, 'onHandleTransfer1Remove');
		},
		// 班组人员添加
		onHandleTransfer2Add(fromData = [], toData = [], obj = {}) {
			const that = this;

			that._fn1({
				transferType: 1,
				fromData,
				toData,
				toType: 'transfer2ToData',
				fromType: 'transfer2FromData'
			});

			console.warn(fromData, toData, 'onHandleTransfer2Add');
		},
		// 班组人员移除
		onHandleTransfer2Remove(fromData, toData, obj) {
			console.warn(JSON.stringify(toData), 'onHandleTransfer2Remove');
		},
		// 穿梭框左侧点击
		onHandleLeftCheckChange(payload = {}) {
			const that = this;
			const { flag = 0, children = [] } = payload;

			if (flag === 0) {
				const { transferTree1 = {} } = that.$refs;
				const fromTree = transferTree1.$refs['from-tree'];

				let { id = '' } = payload;
				// 存在子元素 以子元素的 ID为准
				if (children.length) {
					id = children[0].id;
				}

				fromTree.setCheckedKeys([id]);
				// const ids = fromTree.getCheckedKeys();
				// ids[0] && ids[0].id === id ? fromTree.setCheckedKeys([]) : fromTree.setCheckedKeys([id]);
			}

			if (flag === 1) {
				console.warn(123);
			}
		},
		// 穿梭框右侧点击
		onHandleRightCheckChange(payload = {}) {
			const { flag = 0, id = '', pid = 0, children = [] } = payload;

			console.warn(flag, id, pid, children);
		}
	}
};
</script>

<style lang="scss" scoped>
#patrolTeamConfig {
	width: 100%;
	height: 100%;
	overflow-y: auto;
	background-color: #fff;

	.top-head {
		width: 100%;
		// height: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		// padding-right: 0;
		// background: #0b83fe;
		color: #333;
		box-shadow: 3px 5px 15px rgba(0, 0, 0, 0.1);
		background-color: #fff;

		span {
			display: inline-block;

			&.go-back {
				width: 80px;
				text-align: center;
				cursor: pointer;
			}
		}
	}

	.configContent {
		width: 100%;
		height: calc(100% - 80px);
		width: 970px;
		margin-right: auto;
		margin-left: auto;

		.groupName {
			margin-top: 25px;
		}
	}

	/deep/ .el-form-item {
		margin-bottom: 0;
	}

	/deep/ .el-collapse {
		border-top: none;
	}
}
</style>
