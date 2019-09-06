<template>
	<div id="devStandingBook">
		<div class="block">
			<div class="card">
				<div class="top-search">
					<div class="left">
						<div class="col">
							<span>设备名称:</span>
							<el-input v-model="data.deviceName" placeholder="设备名称" clearable></el-input>
						</div>
						<div class="col">
							<span>属地部门:</span>
							<el-input v-model="data.territorial" placeholder="属地部门" clearable></el-input>
						</div>
						<div class="col"><span class="search" @click="_search">查询</span></div>
					</div>
					<div class="right">
						<!--                <div class="col"><input type="file"> <span>导入</span></div>-->
						<!--                <div class="col"><span>导出</span></div>-->
						<!-- <div class="col"><span @click="gotoAdd">新增</span></div> -->
					</div>
				</div>
				<div class="main-table">
					<dse-table-width-pagination :totalNum="totalPageNum" :currentPage="currentPage" @goto_page="onHandlePagination">
						<thead>
						<tr>
							<th><span>序号</span></th>
							<th><span>设备编号</span></th>
							<th><span>设备名称</span></th>
							<th><span>规格型号</span></th>
							<th><span>设备类型</span></th>
							<th><span>生产厂家</span></th>
							<th><span>设备添加日期</span></th>
							<th><span>属地部门</span></th>
							<th><span>安装地点</span></th>
							<!-- <th><span>导出二维码</span></th> -->
							<th><span>操作</span></th>
						</tr>
						</thead>
						<tbody>
						<tr v-for="(item,index) in list" :key="item.ID">
							<td>
								<span>{{ index+1}}</span>
							</td>
							<td>
								<span>{{ item.CODE }}</span>
							</td>
							<td>
								<span>{{ item.NAME }}</span>
							</td>
							<td>
								<span>{{ item.SPECIFICATION_TYPE }}</span>
							</td>
							<td>
								<span>{{ item.DEV_TYPE }}</span>
							</td>
							<td>
								<span>{{ item.MANUFACTURER || '/' }}</span>
							</td>
							<td>
								<span>{{ item.INSTALL_TIME }}</span>
							</td>
							<td>
								<span>{{ item.TERRITORIAL }}</span>
							</td>
							<td>
								<span>{{ item.INSTALL_ADDR }}</span>
							</td>
							<!-- <td><span class="exportQR">导出</span></td> -->
							<td class="_inline">
								<span class="edit" @click="_edit(item, $event)">编辑</span>
								<!-- <span>删除</span> -->
							</td>
						</tr>
						</tbody>
					</dse-table-width-pagination>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import DseTableWidthPagination from '../../common/components/DseTableWidthPagination';
export default {
	computed: mapGetters({
		companyId: 'get_companyId'
	}),
	components: {
		DseTableWidthPagination
	},
	data() {
		return {
			currentPage: 1, //当前页的索引
			totalPageNum: 1, //共多少页,
			list: [
				{
					BELONG_SYSTEM: '管线',
					BUILD_DEPT: null,
					BUILD_TIME: 1561367257000,
					CALIBER: null,
					CODE: 'GD5467892',
					COMPANY_ID: '2c9d26c6644045a30164abf2b9f40b45',
					CONNECT_TYPE: null,
					CONSTRUCTION_DEPT: null,
					COORDINATE: '114.12,30.33',
					CREATE_USER: null,
					DEPTH: null,
					DESIGN_DEPT: null,
					DEVICE_LEVEL: '一类',
					DEV_STATUS: '0',
					DEV_TYPE: '管道',
					DEV_TYPE_NAME: '其他',
					ELEVATION: 10,
					FACTORY_TEL: null,
					FULL_OPEN_NUM: null,
					GENERAL_MEDIUM: null,
					GROUND_HEIGHT: null,
					ID: '0859136ec8e64c80a55f101ad8004b6a',
					INSTALL_ADDR: '水泵层',
					INSTALL_TIME: '2019-06-24 00:00:00',
					IS_DANGER: null,
					IS_HARM: null,
					LAST_REPAIR_TIME: null,
					LIFE_CYCLE: '30',
					MANUFACTURER: null,
					MEDIUM_TEMPERATURE: null,
					NAME: '管网',
					NAMEPLATE_PARAM: null,
					NOMINAL_PRESSURE: null,
					OUT_FACTORY_CODE: null,
					OUT_FACTORY_TIME: null,
					PILE_NUM: null,
					PIPE_ID: null,
					PROBE_CODE: null,
					PROBE_POINT_CODE: null,
					QR_CODE: null,
					REPONSIBLE_ID: '2c9d26c6672b89ec016816a070a25137',
					REPONSIBLE_NAME: '雷成洋',
					ROTATION_DIRECTION: null,
					RUN_PARAM: null,
					SPECIFICATION_TYPE: 'TD3500-8/1730',
					SUPERVISOR_DEPT: null,
					TERRITORIAL: '管网公司',
					TOP_HEIGHT: null,
					UPDATE_TIME: null,
					UPDATE_USER: null,
					USETIME: 0
				}
			],
			data: {
				deviceName: '',
				territorial: ''
			}
		};
	},
	methods: {
		_initialization() {
			const that = this;

			that._getPipeDeviceList();
		},
		_getPipeDeviceList(payload = {}) {


		},
		_edit(item) {
			console.warn(item, 'item');

			this.$router.push({
				name: 'addDeves',
				params: item
			});
			this.$store.commit('set_asideStatus', false);
			this.$emit('hiddenAside');
		},
		_search() {
			const that = this;
			const { deviceName = '', territorial = '' } = that.data;

			that._getPipeDeviceList({
				deviceName,
				territorial
			});
		},
		onHandlePagination(currentPage = 0) {
			const that = this;

			that.currentPage = currentPage;
			that._getPipeDeviceList({
				page: currentPage
			});
		}
	},
	mounted() {
		const that = this;

		that._initialization();
	}
};
</script>

<style scoped lang="scss">
#devStandingBook {
	width: 100%;
	height: 100%;
	.top-search {
		width: 100%;
		height: 50px;
		padding: 10px 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			/*width: 600px;*/
			display: flex;
			align-items: center;
			justify-content: space-between;

			.col {
				width: calc(50% - 40px);

				&:last-child {
					width: 60px;
				}

				span {
					display: inline-block;
					width: 60px;
					margin-right: 5px;

					&.search {
						height: 30px;
						line-height: 30px;
					}
				}

				.el-input {
					width: calc(100% - 70px);
				}
			}
		}

		.right {
			width: 120px;
			display: flex;
			justify-content: space-between;

			.col {
				width: 50px;
				text-align: center;
				background: #0b83fe;
				line-height: 30px;
				height: 30px;
				color: #fff;
				cursor: pointer;
				position: relative;

				span {
					display: inline-block;
					width: 100%;
				}

				input {
					display: inline-block;
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 100;
					opacity: 0;
					cursor: pointer;
				}
			}
		}
	}

	.main-table {
		width: 100%;
		height: calc(100% - 50px);

		table {
			thead,
			tbody {
				th:first-child,
				th:first-child {
					width: 40px;
				}
			}

			td {
				span.exportQR {
					display: inline-block;
					width: 50px;
					height: 28px;
					line-height: 28px;
					background: #0b83fe;
					cursor: pointer;
					color: #fff;
				}
			}
		}

		._inline {
			span {
				width: auto;
				text-decoration: underline;
				cursor: pointer;

				+ span {
					margin-left: 10px;
				}
			}
		}
	}

	table {
		thead {

		}
		tbody {
			tr {
				td:last-child {
					span {
						width: 40px !important;
						text-align: center;
						color: #fff;
						cursor: pointer;
						&.edit {
							// background: #0b83fe;
							color: #0b83fe;
						}
						&.del {
							background: red;
						}
					}
				}
			}
		}
	}
}
</style>
