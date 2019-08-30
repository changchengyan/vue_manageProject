<template>
	<div class="history">
		<div class="block">
			<div class="card">
				<div class="globalHandle">
					<el-form :inline="true" class="form">
						<el-form-item label="关键字:">
							<el-input v-model="searchData.keywords" placeholder="请输入关键字" @keyup.enter.native="onHandleSearch(1)" @change="onHandleSearch(1)"></el-input>
						</el-form-item>
						<el-form-item label="水厂:">
							<el-select v-model="searchData.prcode" placeholder="请选择水厂" @keyup.enter.native="onHandleSearch(1)" @change="onHandleSearch(1)">
								<el-option label="全部水厂" value="" selected>全部水厂</el-option>
								<el-option v-for="item in prtypeList" :key="item.prcd" :label="item.prnm" :value="item.prcd"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="监测类型:">
							<el-select v-model="searchData.siteType" placeholder="请选择监测类型" @keyup.enter.native="onHandleSearch(1)">
								<el-option v-for="item in siteTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="报警时间:">
							<el-date-picker
								v-model="searchData.date"
								@change="selectThisTime"
								value-format="yyyy-MM-dd"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
							></el-date-picker>
						</el-form-item>
						<el-form-item><el-button type="primary" @click="onHandleSearch(1)">搜索</el-button></el-form-item>
					</el-form>
					<!-- <div class="end"><el-button type="primary" @click="onHanldeExport">导出</el-button></div> -->
				</div>
				<div class="globalTable">
					<dse-table-width-pagination :totalNum="searchData.total" :currentPage="searchData.current" @goto_page="goto_page">
						<thead>
							<tr>
								<th><span>监测点</span></th>
								<th><span>监测类型</span></th>
								<th><span>所属水厂</span></th>
								<th><span>报警开始时间</span></th>
								<th><span>报警内容</span></th>
								<th><span>最新更新时间</span></th>
								<!--<th><span>处理措施</span></th>
                            <th><span>处理人</span></th>
                            <th><span>处理时间</span></th>
                            <th><span>操作</span></th>-->
							</tr>
						</thead>
						<tbody>
							<template v-if="warnList && warnList.length > 0">
								<tr v-for="(item, i) in warnList" :key="i">
									<td>
										<span>{{ item.stnm }}</span>
									</td>
									<td>
										<span>{{ item.jctypenm }}</span>
									</td>
									<td>
										<span>{{ item.wfctnm }}</span>
									</td>
									<td>
										<span>{{ item.tm }}</span>
									</td>
									<td>
										<span>{{ item.warnmx }}</span>
									</td>
									<td>
										<span>{{ item.uptm }}</span>
									</td>
									<!--<td><span>{{item.clcs}}</span></td>
								<td><span>{{item.clrnm}}</span></td>
								<td><span>{{item.cltm}}</span></td>
								<td><span><el-button @click.native="handleWarn" type="primary" icon="el-icon-plus">处理</el-button></span></td>-->
								</tr>
							</template>
							<template v-else>
								<tr>
									<td colspan="6"><span style="line-height: 30px">暂无数据！</span></td>
								</tr>
							</template>
						</tbody>
					</dse-table-width-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import DseTableWidthPagination from '../../common/components/dseTableWidthPagination';
// import dseNormalModel from '../../common/components/toast/dseNormalModel';
// eslint-disable-next-line standard/object-curly-even-spacing
import { getWarnList,getGcglList } from '../../api/interfaces/dataManage_api';
export default {
	components: {
		DseTableWidthPagination
	},
	data() {
		return {
			searchData: {
				total: 10,
				current: 1,
				pageSize: 10,
				keywords: '',
				siteType: '',
				prcode:'',
				date: ''
			},
			siteTypeList: [
				{
					label: '全部点位',
					value: ''
				},
				{
					label: '水压',
					value: '2'
				},
				{
					label: '流量',
					value: '3'
				},
				{
					label: '水位',
					value: '4'
				},
				{
					label: 'PH',
					value: '5'
				},
				{
					label: '浊度',
					value: '6'
				},
				{
					label: '余氯',
					value: '7'
				}
			],
			prtypeList:[],
			warnList: []
		};
	},
	methods: {
		goto_page(obj) {
			this.searchData.pageSize = obj.pageSize;
			this.searchData.current = obj.pageNum;

			this.onHandleSearch(obj.pageNum);
		},
		// 搜索当前参数列表
		onHandleSearch(num) {
			this.getWarnList_(num);
		},
		// 导出报表
		onHanldeExport() {
			let that = this;

			let params = {
				keyname: this.searchData.keywords,
				jcType: this.searchData.siteType,
				stm: this.searchData.date[0],
				etm: this.searchData.date[1]
				// stm: '',
				// etm: '',
			};
			that.$message.success('报警信息导出成功~');
			console.log('onHanldeExport!', params);

			// exportWarnList(params,that).then(res=>{
			// 	let {data} = res;
			// 	let {list} = data;
			// 	console.info(data);
			// 	list = list && list.length>0?list:[];
			// 	console.info('list=====>',list);
			// 	// that.warnList  = [...list];
			// });
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
		// 获取报警信息列表
		getWarnList_(num = 1) {
			let that = this;

			let params = {
				keyname: this.searchData.keywords,
				jcType: this.searchData.siteType,
				stm: this.searchData.date[0],
				etm: this.searchData.date[1],
				// stm: '',
				// etm: '',
				prcode:this.searchData.prcode,
				pageNum: num,
				pageSize: that.searchData.pageSize
			};

			let start = this.searchData.date[0];
			let end = this.searchData.date[1];

			if (new Date(end).getTime() - new Date(start).getTime() > 30 * 24 * 60 * 60 * 1000) {
				this.$message.error('开始时间和结束时间不能大于30天');
				return;
			}

			getWarnList(params, that).then(res => {
				let { data } = res;
				let { total, list } = data;
				list = list && list.length > 0 ? list : [];
				that.searchData.total = total ? parseInt(total) : 1;
				that.searchData.current = num;
				that.warnList = [...list];
			});
		},
		//获取水厂列表 工程类型（prtype）1：水厂 2： 水库 3：泵站  4：蓄水池 5：联户表井
		getGcglList_(){
			let that = this;
			let params = {
				prtype: '1',
				pageNum: 1,
				pageSize:100
			};
			getGcglList(params,that).then(res =>{
				let { data } = res;
				let { list } = data;
				list = list && list.length > 0 ? list : [];
				that.prtypeList = [...list];

			});

		},
		//  选择时间 搜索
		selectThisTime(time) {
			this.getWarnList_(1);
		}
	},
	filters: {
	},
	created() {
		let date = new Date().toLocaleDateString();
		date = date.replace(/\//g, '-');

		let beforeDayStr = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toLocaleDateString();
		beforeDayStr = beforeDayStr.replace(/\//g, '-');

		this.searchData.date = [beforeDayStr, date];
		this.getWarnList_(1);
		this.getGcglList_();
	}
};
</script>

<style scoped="scoped" lang="scss">
.history {
	width: 100%;
	height: 100%;
	overflow-y: auto;

	.card {
		height: 100%;
		display: flex;
		flex-direction: column;
		min-height: 100%;
	}

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

		padding: 8px;
	}

	.table {
		width: 100%;
		height: calc(100% - 50px);
		a {
			text-decoration: none;
			color: #187cea;

			+ a {
				margin-left: 8px;
			}
		}
	}
}
</style>
