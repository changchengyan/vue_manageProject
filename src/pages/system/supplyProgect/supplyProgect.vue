<template>
	<div id="supplyProject">
		<div class="block">
			<div class="card">
				<div class="article">
					<div class="globalHandle">
						<el-form :inline="true" class="form">
							<el-form-item label="关键字:"><el-input v-model="search.keyword" placeholder="请输入名称" @keyup.enter.native="onHandleSearch"></el-input></el-form-item>
							<el-form-item label="分区:">
								<el-select v-model="search.areaItem" placeholder="请选择分区" @keyup.enter.native="onHandleSearch">
									<el-option v-for="item in areaList" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label=""><el-button type="primary" @click="onHandleSearch">搜索</el-button></el-form-item>
						</el-form>
						<div class="end"><el-button type="primary" @click="onHandleAdd">新增</el-button></div>
					</div>

					<div class="globalTable">
						<dse-table-width-pagination :current-page="tabsList.current" :total-num="tabsList.total" @goto_page="goto_page">
							<thead>
							<tr>
								<th><span>编号</span></th>
								<th><span>工程名称</span></th>
								<th><span>所属分区</span></th>
								<th><span>设计供水日规模</span></th>
								<th><span>设计供水人口</span></th>
								<th><span>供水工程类型</span></th>
								<th><span>供水范围</span></th>
								<th><span>受益行政村数量</span></th>
								<th><span>管理单位</span></th>
								<th><span>操作</span></th>
							</tr>
							</thead>
							<tbody>
							<template v-if="tabsList.list && tabsList.list.length">
								<tr v-for="(item, index) in tabsList.list" :key="index">
									<td>
										<span>{{ (tabsList.current - 1) * 10 + index + 1 }}</span>
									</td>
									<td>
										<span>{{ item.cwsNm }}</span>
									</td>
									<td>
										<span>{{ item.adnm }}</span>
									</td>
									<td>
										<span>{{ item.desWsScal }}</span>
									</td>
									<td>
										<span>{{ item.desWsPp }}</span>
									</td>
									<td>
										<span>{{ item.cwsTpnm }}</span>
									</td>
									<td>
										<span>{{ item.wsReg }}</span>
									</td>
									<td>
										<span>{{ item.benVilNum }}</span>
									</td>
									<td>
										<span>{{ item.engMan }}</span>
									</td>
									<td class="btns">
										<span @click="onHandleListEdit(item)">编辑</span>
										<span @click="onHandleStop(item)">{{ item.runCond == '1' ? '启用' : '停用' }}</span>
									</td>
								</tr>
							</template>
							<template v-else>
								<tr>
									<td colspan="10"><span style="line-height: 30px">暂时没有数据~~</span></td>
								</tr>
							</template>
							</tbody>
						</dse-table-width-pagination>
					</div>
				</div>
			</div>
		</div>

		<dse-save-status :showModel="confirm.visible" :flag="confirm.flag" :content="confirm.content" :type="confirm.modelType" @delThis="hiddenSelf" />
	</div>
</template>

<script>
import DseSaveStatus from '../../../common/components/toast/DseSaveStatus';
import DseTableWidthPagination from '../../../common/components/DseTableWidthPagination';
import { getWrCwsBList, updWrCwsUseStatus } from '../../../api/interfaces/system_api';
export default {
	name: 'supplyProject',
	components: { DseSaveStatus, DseTableWidthPagination },
	data() {
		return {
			search: {
				keyword: '',
				areaItem: ''
			},
			confirm: {
				visible: false,
				modelType: true,
				flag: false,
				content: '',
				stopId: '',
				statusNum: ''
			},
			tabsList: {
				current: 1,
				total: 1,
				pageNum:1,
				pageSize:10,
				list: []
			},
			areaList: [
				{
					value: '',
					label: ''
				}
			]
		};
	},
	methods: {
		// 搜索
		onHandleSearch() {
			this.getWrCwsBList_();
		},
		// 关闭弹窗
		hiddenSelf(flag) {
			this.confirm.visible = false;
		},
		// 新增或删除
		onHandleAdd() {
			let params = {
				adcd: '',
				benVilNum: null,
				chargForm: '',
				cwsCd: '',
				cwsNm: '',
				cwsTp: '',
				desWsPp: null,
				desWsScal: null,
				engMan: '',
				nt: '',
				runCond: '',
				sanLicSn: '',
				ts: null,
				wsReg: '',
				ifEdit: false
			};

			this.$router.push({
				name: 'supplyProjectModify',
				params
			});
			this.$emit('hiddenAside', false);
		},
		//  点开删除弹窗
		onHandleStop(item) {
			this.confirm.stopId = item.cwsCd;

			if (item.runCond == '1') {
				this.confirm.statusNum = '0';
			} else {
				this.confirm.statusNum = '1';
			}

			this.updWrCwsUseStatus_();
		},
		// 跳转页面
		goto_page(obj) {

			this.tabsList.current = obj.pageNum;
			this.tabsList.pageSize = obj.pageNum;

			this.getWrCwsBList_();


		},
		// 编辑跳转
		onHandleListEdit(item) {
			this.$router.push({
				name: 'supplyProjectModify',
				params: {
					...item,
					ifEdit: true
				}
			});
			this.$emit('hiddenAside', false);
		},
		// 获取列表
		getWrCwsBList_() {
			let that = this;

			let temp_keyword = this.search.keyword;
			let temp_area = this.search.areaItem;

			// let {pageNum,pageSize} = this.tabsList;

			getWrCwsBList(
				{
					cwsNm: temp_keyword,
					adcd: temp_area
				},
				that
			).then(res => {
				const { data } = res;
				that.tabsList.list = Array.isArray(data) ? data : [];
			});
		},
		// 启用或停用
		updWrCwsUseStatus_() {
			let that = this;
			let temp_id = this.confirm.stopId;
			let statusNum = this.confirm.statusNum;
			updWrCwsUseStatus(
				{
					cwsCd: temp_id,
					runCond: statusNum
				},
				that
			).then(res => {
				let { status, msg } = res;
				that.confirm.flag = status == 1;
				that.confirm.content = msg;
				that.confirm.visible = true;
				setTimeout(() => {
					that.getWrCwsBList_();
				}, 2500);
			});
		}
	},
	filters: {},
	created() {
		this.areaList = this.$store.getters.get_cityAreas || [];
		if (this.areaList.length > 0) {
			this.search.areaItem = this.areaList[0].value;
		}

		this.getWrCwsBList_();
	}
};
</script>

<style scoped lang="scss">

.article {
	width: 100%;
	height: 100%;
	.globalTable {
		width: 100%;
		height: calc(100% - 60px);

		tbody{
			tr{
				td:first-child{
					span{
						text-decoration: initial;
						cursor: initial;
						color: #333;
					}

				}
			}
		}
	}
}
#supplyProject {
	width: 100%;
	height: 100%;
	/deep/ .el-form-item__label {
		line-height: 30px !important;
	}
	.card{
		height: 100%;
	}
}
</style>
