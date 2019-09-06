<template>
	<div id="msg">
		<!-- 水位 -->
		<template v-if="tabIndex == 0">
			<dse-table-list :totalNum="totalPages" :currentPage="currentPage" @goto_page="goto_flow">
				<thead>
					<tr>
						<th><span>监测点</span></th>
						<th><span>所属区域&nbsp;</span></th>
						<th>
							<span>监测值</span>
							<span>(m)</span>
						</th>
						<th>
							<span>正常值</span>
							<span>(m)</span>
						</th>
						<th><span>时间</span></th>
					</tr>
				</thead>
				<tbody>
					<template v-if="levList && levList.length > 0">
						<tr v-for="(val, index) in levList" :key="index">
							<td :title="val.name" @click="whereAmI(val)" :class="{ alert: val.status }">
								<span>{{ val.name }}</span>
							</td>
							<td>
								<span :title="val.area">{{ val.area }}</span>
							</td>
							<td>
								<span>{{ val.value }}</span>
							</td>
							<td>
								<span>{{ val.normalVal }}</span>
							</td>
							<td :title="val.time">
								<span>{{ val.time }}</span>
							</td>
						</tr>
					</template>
					<template v-else>
						<tr>
							<td class="normal-show" colspan="5"><span>没有查找到你需要的数据哦~~</span></td>
						</tr>
					</template>
				</tbody>
			</dse-table-list>
		</template>
		<!-- 流量 -->
		<template v-if="tabIndex == 1">
			<dse-table-list :totalNum="totalPages" :currentPage="currentPage" @goto_page="goto_press">
				<thead>
					<tr>
						<th><span>监测点</span></th>
						<th><span>所属区域</span></th>
						<th>
							<span>监测值&</span>
							<span>(m³/s)</span>
						</th>
						<th>
							<span>正常值&nbsp;</span>
							<span>(m³/s)</span>
						</th>
						<th><span>时间</span></th>
					</tr>
				</thead>
				<tbody>
					<template v-if="flowList && flowList.length > 0">
						<tr v-for="(val, index) in flowList" :key="index">
							<td :title="val.name" @click="whereAmI(val)">
								<span :class="{ alert: val.status == false }">{{ val.name }}</span>
							</td>
							<td :title="val.area">
								<span>{{ val.area }}</span>
							</td>
							<td>
								<span>{{ val.value }}</span>
							</td>
							<td>
								<span>{{ val.normalVal }}</span>
							</td>
							<td :title="val.time">
								<span>{{ val.time }}</span>
							</td>
						</tr>
					</template>
					<template v-else>
						<tr>
							<td class="normal-show" colspan="5"><span>没有查找到你需要的数据哦~~</span></td>
						</tr>
					</template>
				</tbody>
			</dse-table-list>
		</template>
		<!-- <template v-if="tabIndex == 2">
			<dse-table-list :totalNum="totalPages" :currentPage="currentPage" @goto_page="goto_waterQC">
				<thead>
					<tr>
						<th><span>监测点</span></th>
						<th><span>所属区域</span></th>
						<th>
							<span>监测值</span>
							<span>mg/L</span>
						</th>
						<th>
							<span>正常值</span>
							<span>mg/L</span>
						</th>
						<th><span>时间</span></th>
					</tr>
				</thead>
				<tbody>
					<template v-if="waterQCList && waterQCList.length > 0">
						<tr v-for="(val, index) in waterQCList" :key="index">
							<td class="name1" :title="val.name" @click="whereAmI(val)">{{ val.name }}</td>
							<td :title="val.area">
								<span>{{ val.area }}</span>
							</td>
							<td>
								<span>{{ val.value }}</span>
							</td>
							<td>{{ val.normalVal }}</td>
							<td>
								<span>{{ val.time }}</span>
							</td>
						</tr>
					</template>
					<template v-else>
						<tr>
							<td class="normal-show" colspan="5"><span>没有查找到你需要的数据哦~~</span></td>
						</tr>
					</template>
				</tbody>
			</dse-table-list>
		</template> -->
		<!-- 压力 -->
		<template v-if="tabIndex == 3">
			<dse-table-list :totalNum="totalPages" :currentPage="currentPage" @goto_page="goto_video">
				<thead>
					<tr>
						<th><span>监测点</span></th>
						<th><span>所属区域</span></th>
						<th>
							<span>监测值</span>
							<span>MPa</span>
						</th>
						<th>
							<span>正常值</span>
							<span>MPa</span>
						</th>
						<th><span>时间</span></th>
					</tr>
				</thead>
				<tbody>
					<template v-if="pressList && pressList.length > 0">
						<tr v-for="(val, index) in pressList" :key="index">
							<td class="name1" :title="val.name" @click="whereAmI(val)">
								<span :class="{ alert: val.status == false }">{{ val.name }}</span>
							</td>
							<td :title="val.area">
								<span>{{ val.area }}</span>
							</td>
							<td>
								<span>{{ val.value }}</span>
							</td>
							<td>
								<span>{{ val.normalVal }}</span>
							</td>
							<td :title="val.time">
								<span>{{ val.time }}</span>
							</td>
						</tr>
					</template>
					<template v-else>
						<tr>
							<td class="normal-show" colspan="3"><span>没有查找到你需要的数据哦~~</span></td>
						</tr>
					</template>
				</tbody>
			</dse-table-list>
		</template>
		<!-- 水质 -->
		<template v-if="tabIndex == 4">
			<dse-table-list :totalNum="totalPages" :currentPage="currentPage" @goto_page="goto_video">
				<thead>
					<tr>
						<th><span>监测点</span></th>
						<th><span>所属区域</span></th>
						<th><span>监测值</span></th>
						<th><span>正常值</span></th>
						<th><span>时间</span></th>
					</tr>
				</thead>
				<tbody>
					<template v-if="waterQCList && waterQCList.length > 0">
						<template v-for="(val, index) in waterQCList">
							<tr :key="val.eleId" :aaa="val.eleId">
								<td class="name1" :title="val.name" :rowspan="val.paramsItem.length" @click="whereAmI(val)">
									<span :class="{ alert: val.status !== 0 }">{{ val.status }} {{ val.name }}</span>
								</td>
								<td :title="val.area" :rowspan="val.paramsItem.length">
									<span>{{ val.area }}</span>
								</td>
								<td>
									<!-- <span :class="{ alert: index == 0 }">{{ val.paramsItem[0].value }}</span> -->
									<span>{{ val.paramsItem[0].value }}</span>
								</td>
								<td>
									<span>{{ val.paramsItem[0].normalVal }}</span>
								</td>
								<td :title="val.time" :rowspan="val.paramsItem.length">
									<span>{{ val.time }}</span>
								</td>
							</tr>
							<template v-for="(item, i) in val.paramsItem">
								<tr v-if="i != 0" :key="i + Math.floor(Math.random() * 1000)">
									<td class="no-border">
										<span class="not-point">{{ item.value }}</span>
									</td>
									<td>
										<span class="not-point">{{ item.normalVal }}</span>
									</td>
								</tr>
							</template>
						</template>
					</template>
					<template v-else>
						<tr>
							<td class="normal-show" colspan="3"><span>没有查找到你需要的数据哦~~</span></td>
						</tr>
					</template>
				</tbody>
			</dse-table-list>
		</template>
		<!-- 视频 -->
		<template v-if="tabIndex == 5">
			<dse-table-list :totalNum="totalPages" :currentPage="currentPage" @goto_page="goto_video">
				<thead>
					<tr>
						<th><span>监测点名称</span></th>
						<th><span>所属区域</span></th>
						<th><span>状态</span></th>
					</tr>
				</thead>
				<tbody>
					<template v-if="videoList && videoList.length > 0">
						<tr v-for="(val, index) in videoList" :key="index">
							<td :title="val.name" @click="whereAmI(val)">
								<span>{{ val.name }}</span>
							</td>
							<td>
								<span>{{ val.area }}</span>
							</td>
							<td>
								<span :class="{ alert: val.status == false }">{{ val.status | formate_vadioStatus }}</span>
							</td>
						</tr>
					</template>
					<template v-else>
						<tr>
							<td class="normal-show" colspan="3"><span>没有查找到你需要的数据哦~~</span></td>
						</tr>
					</template>
				</tbody>
			</dse-table-list>
		</template>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import DseTableList from '../../common/components/DseTableList';
import {
	// 获取实时水质监测信息
	getSzJcList,

	// 获取实时水位监测信息
	getRzjcList,

	// 获取实时流量监测信息
	getSljcList,

	// 获取实时压力监测信息
	getYljcList
} from '../../api/interfaces/oneMap_api';

const MONITOR_PLACEHOLDER = '--';

export default {
	name: 'msg',
	components: {
		DseTableList
	},
	data() {
		return {
			contentList: [], //待选的主内容区
			tabList: null,
			tabIndex: 0, //默认的激活页签
			totalPages: 1,
			currentPage: 1,
			searchDevName: '', // 模糊搜索要查询的监测设备列表
			flowList: [],
			//压力的 列表
			pressList: [],
			//水质的列表
			waterQCList: [],
			//视频的列表
			videoList: [
				{
					layerID: 'shipin',
					eleId: 'SP000',
					name: '西部净水厂视频监测点',
					area: '中部片区',
					status: false
				},
				{
					layerID: 'shipin',
					eleId: 'SP001',
					name: '小洪沟水库视频监测点',
					area: '东部片区',
					status: true
				},
				{
					layerID: 'shipin',
					eleId: 'SP002',
					name: '东部净水厂视频监测点',
					area: '东部片区',
					status: true
				},
				{
					layerID: 'shipin', //西部净水厂视频监测点
					eleId: 'SP003',
					name: '窑山扩建水厂视频监测点',
					area: '中部片区',
					status: true
				}
			],
			// 水位的列表
			levList: [] //水位列表
		};
	},
	computed: {
		...mapGetters({
			get_sunTab_msg: 'get_sunTab_msg'
		})
	},
	methods: {
		fromFather(component, list, flag) {
			this.contentList = list;
			let temp_item = component;
			if (!temp_item) {
				temp_item = list[0];
			}
			temp_item = temp_item.template;
			if (!flag) {
				temp_item = list[list.length - 1].template;
			}
			temp_item = temp_item.replace(/<div class="tabItem"><span>/, '');
			temp_item = temp_item.replace(/<\/span><\/div>/, '');
			temp_item = temp_item.trim();

			switch (temp_item) {
				case '水位':
					this.tabIndex = 0;
					this.getLevList_(1);
					this.searchDevName = '';
					break;
				case '流量':
					this.tabIndex = 1;
					this.getQDataList_(1);
					this.searchDevName = '';
					break;
				case '压力':
					this.tabIndex = 3;
					this.searchDevName = '';
					this.getPressureList_(1);
					break;
				case '水质':
					this.tabIndex = 4;
					this.searchDevName = '';
					this.getWqList_(1);
					break;
				case '视频':
					this.tabIndex = 5;
					this.searchDevName = '';
					this.getVideoList_(1);
					break;
			}
		},
		// 获取流量的 列表
		getQDataList_(pageNum) {
			const that = this;

			/**
			 * 获取实时流量监测信息
			 * @param {adcd}      	[false string]	分区县编码
			 * @param {keyname}     [false string] 	关键字查询
			 */
			const params = {
				adcd: '',
				keyname: ''
			};
			getSljcList(params, that)
				.then((results = {}) => {
					const { status, data } = results;

					const flowList =
						Array.isArray(data) && data[0]
							? data.map((item = {}) => {
									const { stcd, stnm, adnm, tm, warnCount, jcz, zczfw } = item;

									return {
										layerID: 'liuliang',
										// 监测点编号
										eleId: stcd,
										// 监测点名称
										name: stnm,
										// 分区名称
										area: adnm || MONITOR_PLACEHOLDER,
										value: jcz || MONITOR_PLACEHOLDER,
										normalVal: zczfw || MONITOR_PLACEHOLDER,
										// 时间（yyyy-mm-dd HH:mm:ss） 前端格式化成需要的
										time: tm ? String(tm).substr(0, 16) : MONITOR_PLACEHOLDER,
										// 如果 > 0 则表示 有正在预警的数据。
										status: warnCount
									};
							  })
							: [];

					that.flowList = flowList;
					const totalPages = that.flowList.length;
					that.totalPages = totalPages;
					that.currentPage = 2;
					// console.warn(that.flowList);
				})
				.catch(e => console.warn(e));
		},
		goto_flow(num) {
			this.getQDataList_(parseInt(num));
		},
		// 获取 水质的 列表
		getWqList_(pageNum) {
			const that = this;

			/**
			 * 获取实时水质监测信息
			 * @param {adcd}      	[false string]	分区县编码
			 * @param {keyname}     [false string] 	关键字查询
			 */
			const params = {
				adcd: '',
				keyname: ''
			};
			getSzJcList(params, that)
				.then((results = {}) => {
					const { status, data } = results;

					const waterQCList =
						Array.isArray(data) && data[0]
							? data.map((item = {}) => {
									const { stcd, stnm, adnm, tm, warnCount, ph, phRange, turb, turbRange, chl, chlRange } = item;

									const paramsItem = [
										{
											// ph实时值
											value: `PH:${ph || MONITOR_PLACEHOLDER}`,
											// ph实时值+正常范围 phRange
											normalVal: ph && phRange ? phRange : MONITOR_PLACEHOLDER
										},
										{
											// 浊度实时值
											value: `浊度:${turb || MONITOR_PLACEHOLDER}`,
											// 浊度实时值+正常范围 turbRange
											normalVal: turb && turbRange ? turbRange : MONITOR_PLACEHOLDER
										},
										{
											// 余氯实时值
											value: `余氯:${chl || MONITOR_PLACEHOLDER}`,
											// 余氯实时值+正常范围 chlRange
											normalVal: chl && chlRange ? chlRange : MONITOR_PLACEHOLDER
										}
									];
									return {
										layerID: 'shuizhi',
										// 监测点编号
										eleId: stcd,
										// 监测点名称
										name: stnm,
										// 分区名称
										area: adnm || MONITOR_PLACEHOLDER,
										// 时间（yyyy-mm-dd HH:mm:ss） 前端格式化成需要的
										time: tm ? String(tm).substr(0, 16) : MONITOR_PLACEHOLDER,
										// 如果 > 0 则表示 有正在预警的数据。
										status: warnCount,
										paramsItem
									};
							  })
							: [];

					that.waterQCList = waterQCList;
					const totalPages = that.waterQCList.length;
					that.totalPages = totalPages;
					that.currentPage = 2;
					// console.warn(that.waterQCList);
				})
				.catch(e => console.warn(e));
		},
		goto_waterQC(num) {
			this.getWqList_(parseInt(num));
		},
		//获取  水压的  列表
		getPressureList_(pageNum) {
			const that = this;

			/**
			 * 获取实时压力监测信息
			 * @param {adcd}      	[false string]	分区县编码
			 * @param {keyname}     [false string] 	关键字查询
			 */
			const params = {
				adcd: '',
				keyname: ''
			};
			getYljcList(params, that)
				.then((results = {}) => {
					const { status, data } = results;

					const pressList =
						Array.isArray(data) && data[0]
							? data.map((item = {}) => {
									const { stcd, stnm, adnm, jcz, zczfw, tm } = item;

									return {
										layerID: 'yali',
										// 监测点编号
										eleId: stcd,
										// 监测点名称
										name: stnm,
										// 分区名称
										area: adnm || MONITOR_PLACEHOLDER,
										value: jcz || MONITOR_PLACEHOLDER,
										normalVal: zczfw || MONITOR_PLACEHOLDER,
										// 时间（yyyy-mm-dd HH:mm:ss） 前端格式化成需要的
										time: tm ? String(tm).substr(0, 16) : MONITOR_PLACEHOLDER
									};
							  })
							: [];

					that.pressList = pressList;
					const totalPages = that.pressList.length;
					that.totalPages = totalPages;
					that.currentPage = 2;
					// console.warn(that.pressList);
				})
				.catch(e => console.warn(e));
		},
		goto_press(num) {
			this.getPressureList_(parseInt(num));
		},
		// 获取 视频的  列表
		getVideoList_(pageNum) {},
		// 水位
		getLevList_(pageNum) {
			const that = this;

			/**
			 * 获取实时水位监测信息
			 * @param {adcd}      	[false string]	分区县编码
			 * @param {keyname}     [false string] 	关键字查询
			 */
			const params = {
				adcd: '',
				keyname: ''
			};
			getRzjcList(params, that)
				.then((results = {}) => {
					const { status, data } = results;

					const levList =
						Array.isArray(data) && data[0]
							? data.map((item = {}) => {
									const { stcd, stnm, adnm, tm, warnCount, jcz, zczfw } = item;

									return {
										layerID: 'shuiwei',
										// 监测点编号
										eleId: stcd,
										// 监测点名称
										name: stnm,
										// 分区名称
										area: adnm || MONITOR_PLACEHOLDER,
										// 监测值
										value: jcz || MONITOR_PLACEHOLDER,
										// 正常值范围
										normalVal: zczfw || MONITOR_PLACEHOLDER,
										// 时间（yyyy-mm-dd HH:mm:ss） 前端格式化成需要的
										time: tm ? String(tm).substr(0, 16) : MONITOR_PLACEHOLDER,
										// 如果 >0 则表示 有正在预警的数据。
										status: warnCount > 0 ? true : false
									};
							  })
							: [];

					// 复制数据 测试分页
					// const _levList = JSON.parse(JSON.stringify([...levList, ...levList, ...levList, ...levList, ...levList])).map((item = {}, key) => ({
					// 	...item,
					// 	eleId: key + 1
					// }));
					// that.levList = levList.concat(_levList);
					that.levList = levList;
					const totalPages = that.levList.length;
					// console.warn(that.levList);
					that.totalPages = totalPages;
					that.currentPage = 2;
				})
				.catch(e => console.warn(e));
		},
		goto_video(num) {
			this.getVideoList_(parseInt(num));
		},
		//搜索 特定设备列表
		searchMonitorDevs() {
			let tab_index = this.tabIndex;
			switch (tab_index) {
				case 0:
					this.getLevList_(1);
					break;
				case 1:
					this.getQDataList_(1);
					break;
				case 2:
					this.getWqList_(1);
					break;
				case 3:
					this.getPressureList_(1);
					break;
				case 4:
					this.getVideoList_(1);
					break;
			}
		},
		// gis上查找 该要素
		whereAmI(val) {
			/**
			 *  参数中必须 构造 含有 这样
			 *  {
			 *      name:'', //站点的 名字
			 *      eleId:'', //当前的 站点的业务ID
			 *      layerID:''， // 所属图层的 ID
			 *  }			 *
			 */
			const { name, eleId, layerID } = val;
			const payload = { name, eleId, layerID };

			this.$emit('IamHere', payload);
		}
	},
	filters: {
		formate_vadioStatus(val) {
			let temp_val = val;
			switch (val) {
				case true:
					temp_val = '在线';
					break;
				case false:
					temp_val = '离线';
					break;
			}
			return temp_val;
		}
	},
	created() {
		let that = this;
		this.tabList = { list: that.get_sunTab_msg, leftIds: [] };
	}
};
</script>

<style scoped lang="scss">
#msg {
	width: 100%;
	height: 100%;

	.row-search {
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: space-between;
		line-height: 30px;
		padding-bottom: 10px;

		.el-input {
			width: calc(100% - 60px);
			/deep/ .el-input__inner {
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
			}
		}
		/deep/ .el-button {
			width: 60px;
			padding: 0;
			color: #fff;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
	}

	#table {
		height: 100%;
	}

	table {
		tbody {
			tr {
				td:first-child {
					&.no-border {
						border-left: none;
					}
					span {
						text-decoration: underline;
						color: blue;
						cursor: pointer;
						&.alert {
							color: red;
						}
						&.not-point {
							color: #333;
							cursor: initial;
							text-decoration: initial;
						}
					}
				}
				span.alert {
					color: red;
				}
				td:last-child {
					line-height: 25px;
				}
			}
		}
	}

	.name1 {
		color: blue;
		cursor: pointer;
	}
	.name1:hover {
		color: red;
		text-decoration: underline;
	}

	.span1 {
		border-top: 1px solid #e9e9e9;
	}
}
</style>
