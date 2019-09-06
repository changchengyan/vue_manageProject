<template>
	<div class="block" id="patrolTeam">
		<div class="card">
			<div class="globalHandle"><el-button type="primary" @click="addNew">新增</el-button></div>
			<div class="globalTable">
				<el-table :data="list" border size="mini">
					<el-table-column v-for="(item, key) in columns" :key="key" :prop="item.value" :label="item.label" align="center"></el-table-column>
					<el-table-column prop="k" align="center" label="操作">
						<template slot-scope="scope">
							<a href="JavaScript:void(0)" @click="_deleteInspectGroup(scope.row)">删除</a>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>

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
// import DseTableWidthPagination from '../../../common/components/dseTableWidthPagination';
import DseSaveStatus from '../../../common/components/toast/DseSaveStatus';

// import {
// 查询巡检班组列表
// getPipeInspectGroupList,
// 删除巡检班组
// deleteInspectGroup
// } from '../../../api/interfaces/pipeSetting_api';

export default {
	name: 'patrolTeam',
	computed: mapGetters({
		companyId: 'get_companyId',
		deptId: 'get_deptId'
	}),
	components: {
		// DseTableWidthPagination,
		DseSaveStatus
	},
	data() {
		return {
			totalNum: 1,
			currentPage: 1,
			pageSize: 1,
			columns: [],
			list: [],
			confirm: {
				item: {},
				showModel: false
			}
		};
	},
	mounted() {
		const that = this;

		that._initialization();

		that._getPipeInspectGroupList();
		const params = {
			pipeId: '',
			constructionDept: '',
			devType: '',
			groundHeight: '',
			caliber: '',
			rotationDirection: '',
			isHarm: '',
			buildDept: '',
			nameplateParam: '',
			generalMedium: '',
			devStatus: '',
			deviceLevel: '',
			designDept: '',
			outFactoryCode: '',
			specificationType: '',
			nominalPressure: '',
			supervisorDept: '',
			probePointCode: '',
			companyId: '',
			installAddr: '',
			factoryTel: '',
			topHeight: '',
			runParam: '',
			outFactoryTime: '',
			installTime: '',
			lifeCycle: '',
			manufacturer: '',
			fullOpenNum: '',
			name: '',
			isDanger: '',
			code: '',
			probeCode: '',
			pileNum: '',
			connectType: '',
			mediumTemperature: '',
			reponsibleId: '',
			depth: '',
			lastRepairTime: '',
			id: ''
		};
		console.warn(params, 'params');
	},
	/**
	 * 修改设备 以下都是必填项
	 * @param {pipeId}
	 * @param {constructionDept}
	 * @param {devType}
	 * @param {groundHeight}
	 * @param {caliber}
	 * @param {rotationDirection}
	 * @param {isHarm}
	 * @param {buildDept}
	 * @param {nameplateParam}
	 * @param {generalMedium}
	 * @param {devStatus}
	 * @param {deviceLevel}
	 * @param {designDept}
	 * @param {outFactoryCode}
	 * @param {specificationType}
	 * @param {nominalPressure}
	 * @param {supervisorDept}
	 * @param {probePointCode}
	 * @param {companyId}
	 * @param {installAddr}
	 * @param {factoryTel}
	 * @param {topHeight}
	 * @param {runParam}
	 * @param {outFactoryTime}
	 * @param {installTime}
	 * @param {lifeCycle}
	 * @param {manufacturer}
	 * @param {fullOpenNum}
	 * @param {name}
	 * @param {isDanger}
	 * @param {code}
	 * @param {probeCode}
	 * @param {pileNum}
	 * @param {connectType}
	 * @param {mediumTemperature}
	 * @param {reponsibleId}
	 * @param {depth}
	 * @param {lastRepairTime}
	 * @param {id}
	 */
	methods: {
		_initialization() {
			const that = this;

			that.columns = [
				{
					label: '班组名称',
					value: 'a'
				},
				{
					label: '班组长',
					value: 'b'
				},
				{
					label: '班组成员',
					value: 'c'
				}
			];

			that.list = [
				{
					a: '管网一班',
					b: '章三',
					c: '章一、六三',
					d: '韩子墨'
				},
				{
					a: '管网二班',
					b: '章一',
					c: '章一、六三',
					d: '韩子墨'
				},
				{
					a: '管网二三',
					b: '章一',
					c: '章一、六三',
					d: '韩子墨'
				},
				{
					a: '管网四班',
					b: '章一',
					c: '章一、六三',
					d: '韩子墨'
				},
				{
					a: '管网五班',
					b: '章三',
					c: '章一、六三',
					d: '韩子墨'
				},
				{
					a: '管网六班',
					b: '章一',
					c: '章一、六三',
					d: '韩子墨'
				}
			];
		},
		_getPipeInspectGroupList() {
			// const that = this;
			// const {
			// 	companyId
			// } = that;
			/**
			 * name: 查询巡检班组列表
			 * company_id:		false 分区id
			 * page:		分页参数
			 * pageSize:	分页参数
			 */
			// 			const params = {
			// 				// company_id: companyId,
			// 				page: 1,
			// 				pageSize: 10
			// 			};
			//
			// 			getPipeInspectGroupList(params, that).then((results = {}) => {
			// 				const that = this;
			// 				const { status, data = {} } = results;
			// 				const { page = 0, pageSize = 0, total = 0, rows = [] } = data;
			//
			// 				if (status && Array.isArray(rows)) {
			// 					if (!rows.length) {
			// 						that.patrolTeamList = [];
			// 						return;
			// 					}
			// 					rows.forEach(item => {
			// 						that.patrolTeamList.push({
			// 							del_flag: item.del_flag,
			// 							memberList: item.memberList,
			// 							company_id: item.company_id,
			// 							create_time: item.create_time,
			// 							group_name: item.group_name,
			// 							leader_name: item.leader_name,
			// 							leader_id: item.leader_id,
			// 							id: item.id
			// 						});
			// 					});
			//
			// 					that.totalNum = total;
			// 					that.currentPage = page;
			// 					that.pageSize = pageSize;
			// 				} else {
			// 					that.patrolTeamList = [];
			// 				}
			// 			});
		},
		goto_page(pageNum) {},
		addNew() {
			this.$router.push({
				name: 'systemPatrolTeamConfigure'
			});
			this.$store.commit('set_asideStatus', false);
			this.$emit('hiddenAside', '');
		},
		_deleteInspectGroup(item = {}) {
			const that = this;

			this.confirm = {
				...that.confirm,
				showModel: true,
				item
			};
		},
		onHandleSureDelThis() {
			const that = this;

			// const {
			// 	item = {}
			// } = that.confirm;
			// const {
			// 	id = ''
			// } = item;
			/**
			 * 删除巡检班组
			 * @param {id} id
			 * @param {delFlag} 删除标记 删除 1
			 */
			// 				const params = {
			// 					id,
			// 					delFlag: 1
			// 				};
			// 				deleteInspectGroup(params, that).then((results = {}) => {
			// 					const {
			// 						status = 0
			// 					} = results;
			// 					if (status) {
			// 						that.$message({
			// 							message: '删除巡检班组消息!',
			// 							type: 'success'
			// 						});
			//
			// 						that._getPipeInspectGroupList();
			// 					}
			// 				});

			that.onHandleClosePointModel();
		},
		onHandleClosePointModel() {
			const that = this;

			this.confirm = {
				...that.confirm,
				showModel: false
			};
		}
	}
};
</script>

<style scoped lang="scss">

</style>
