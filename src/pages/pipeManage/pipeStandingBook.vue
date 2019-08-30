<template>
	<div id="pipeStandingBook">
		<div class="block">
			<div class="card">
				<div class="top-search">
					<el-input v-model="pipeName" placeholder="名字查询"></el-input>
					<el-button type="primary" @click="search">查询</el-button>
					<el-button class="export-file" type="primary">
						<input type="file" @change="fileChange" />
						导入
					</el-button>
					<el-button type="primary" @click="exportPipeList_">导出</el-button>
					<a :href="templateFile">
						<i class="el-icon-download"></i>
						下载模板
					</a>
				</div>
				<div class="row">
					<span>分区选择:</span>
					<span class="all" @click="clear_areaItem">全部</span>
					<div class="list" ref="area">
						<template v-if="temp_areaList && temp_areaList.length > 0">
					<span
							:title="val.name"
							:class="{ actived: tab_area_index == index }"
							@click="select_areaItem(val.id, index, '0')"
							class="tab-item"
							v-for="(val, index) in temp_areaList"
							:key="index"
					>
						{{ val.name }}
					</span>
						</template>
						<template v-else>
							<span>请配置~~</span>
						</template>
						<div class="show-more-model" v-if="show_model_area">
							<div class="model-top"><i class="el-icon-close" @click="showMore_area"></i></div>
							<div class="left-list">
						<span
								:class="{ actived: tab_area_index == index + temp_areaList.length - 1 }"
								:title="val.name"
								@click="select_areaItem(val.id, index, '1')"
								class="tab-item"
								v-for="(val, index) in left_area_list"
								:key="index"
						>
							{{ val.name }}
						</span>
							</div>
						</div>
					</div>
					<span class="more" @click="showMore_area" v-if="show_area_more">更多></span>
				</div>
				<div class="row">
					<span>管径选择:</span>
					<span class="all" @click="clear_radiusItem">全部</span>
					<div class="list" ref="radius">
						<template v-if="temp_radiusList && temp_radiusList.length > 0">
					<span
							:class="{ actived: tab_radius_index == index }"
							class="tab-item"
							v-for="(val, index) in temp_radiusList"
							@click="select_radiusItem(val.value, index, '0')"
							:key="index"
					>
						{{ val.label }}
					</span>
						</template>
						<template v-else>
							<span>请配置~~</span>
						</template>
						<div class="show-more-model" v-if="show_model_radius">
							<div class="model-top"><i class="el-icon-close" @click="showMore_radius"></i></div>
							<div class="left-list">
						<span
								:class="{ actived: tab_radius_index == index + temp_radiusList.length - 1 }"
								@click="select_radiusItem(val.value, index, '1')"
								class="tab-item"
								v-for="(val, index) in left_radius_list"
								:key="index"
						>
							{{ val.label }}
						</span>
							</div>
						</div>
					</div>
					<span class="more" @click="showMore_radius" v-if="show_radius_more">更多></span>
				</div>
				<div class="row">
					<span>管材选择:</span>
					<span class="all" @click="clear_materialItem">全部</span>
					<div class="list" ref="material">
						<template v-if="temp_materiaList && temp_materiaList.length > 0">
					<span
							@click="select_materialItem(val.value, index, '0')"
							:class="{ actived: tab_material_index == index }"
							class="tab-item"
							v-for="(val, index) in temp_materiaList"
							:key="index"
					>
						{{ val.label }}
					</span>
						</template>
						<template v-else>
							<span>请配置~~</span>
						</template>
						<div class="show-more-model" v-if="show_model_material">
							<div class="model-top"><i class="el-icon-close" @click="showMore_material"></i></div>
							<div class="left-list">
						<span
								:class="{ actived: tab_material_index == index + temp_materiaList.length - 1 }"
								@click="select_materialItem(val.value, index, '1')"
								class="tab-item"
								v-for="(val, index) in left_material_list"
								:key="index"
						>
							{{ va.label }}
						</span>
							</div>
						</div>
					</div>
					<span class="more" @click="showMore_material" v-if="show_material_more">更多></span>
				</div>
				<div class="row">
					<span>责任人:</span>
					<span class="all" @click="clear_peopleItem">全部</span>
					<div class="list" ref="people">
						<template v-if="temp_peopleList && temp_peopleList.length > 0">
					<span
							:class="{ actived: tab_people_index == index }"
							class="tab-item"
							@click="select_peopleItem(val.id, index, '0')"
							v-for="(val, index) in temp_peopleList"
							:key="index"
					>
						{{ val.name }}
					</span>
						</template>
						<template v-else>
							<span>请配置~~</span>
						</template>
						<div class="show-more-model" v-if="show_model_personal">
							<div class="model-top"><i class="el-icon-close" @click="showMore_personal"></i></div>
							<div class="left-list">
						<span
								:class="{ actived: tab_people_index == index + temp_peopleList.length - 1 }"
								@click="select_peopleItem(val.id, index, '1')"
								class="tab-item"
								v-for="(val, index) in left_people_list"
								:key="index"
						>
							{{ val.name }}
						</span>
							</div>
						</div>
					</div>
					<span class="more" @click="showMore_personal" v-if="show_personal_more">更多></span>
				</div>
				<div class="row">
					<span>监测指标:</span>
					<span class="all" @click="clear_status">全部</span>
					<div class="list">
				<span
						:class="{ actived: monitorItemIndex == index }"
						@click="get_monitorItem(val.value, index, '0')"
						class="tab-item"
						v-for="(val, index) in monitorItemList"
						:key="index"
				>
					{{ val.label }}
				</span>
					</div>
				</div>
				<div class="row">
					<span>使用状态:</span>
					<span class="all" @click="clear_monitor">全部</span>
					<div class="list">
				<span
						:class="{ actived: tab_status_index == index }"
						@click="get_statusItem(val.value, index, '0')"
						class="tab-item"
						v-for="(val, index) in statusList"
						:key="index"
				>
					{{ val.label }}
				</span>
					</div>
				</div>
				<div class="table-contnet">
					<dse-table-width-pagination :totalNum="totalNum" :currentPage="currentPage" @goto_page="goto_page">
						<thead>
						<tr>
							<!-- <th> <el-checkbox v-model="checkedAll" @change="selecctAll">全选</el-checkbox></th> -->
							<th><span>管道名称</span></th>
							<th><span>管道编号</span></th>
							<th><span>分区</span></th>
							<th><span>管径</span></th>
							<th><span>管材</span></th>
							<th><span>长度(m)</span></th>
							<th><span>生产厂家</span></th>
							<th><span>安装时间</span></th>
							<th><span>使用寿命(年)</span></th>
							<th><span>使用状态</span></th>
							<th><span>操作</span></th>
						</tr>
						</thead>
						<tbody>
						<template v-if="list && list.length > 0">
							<tr v-for="(val, index) in list" :key="index">
								<!-- <td><el-checkbox v-model="val.status"></el-checkbox></td> -->
								<td>
									<span>{{ val.PIPE_NAME }}</span>
								</td>
								<td>
									<span>{{ val.CODE }}</span>
								</td>
								<td>
									<span>{{ val.AREANAME }}</span>
								</td>
								<td>
									<span>{{ val.PIPE_RADIUS }}</span>
								</td>
								<td>
									<span>{{ val.PIPE_MATERIAL }}</span>
								</td>
								<td>
									<span>{{ val.PIPE_LENGTH }}</span>
								</td>
								<td>
									<span>{{ val.MANUFACTURER }}</span>
								</td>
								<td>
									<span>{{ val.INSTALL_TIME }}</span>
								</td>
								<td>
									<span>{{ val.USE_YEAR }}</span>
								</td>
								<td>
									<span>{{ val.STATUS | formate_status }}</span>
								</td>
								<td>
									<span class="edit" @click="edit(val)">编辑</span>
									<!-- <span class="del" @click="del(val.ID)">删除</span> -->
								</td>
							</tr>
						</template>
						<template v-else>
							<tr>
								<td colspan="12"><span>没有您查找的数据哦~~</span></td>
							</tr>
						</template>
						</tbody>
					</dse-table-width-pagination>
				</div>
			</div>
		</div>
		<dse-loading-animation :showAnimate="showAnimate" />
		<dse-save-status :showModel="showDelModel" :type="delType" @delThis="delThis" @sureDelThis="sureDelThis" />
	</div>
</template>

<script>
import DseTableWidthPagination from '../../common/components/dseTableWidthPagination';
import DseLoadingAnimation from '../../common/components/dseLoadingAnimation';
import DseSaveStatus from '../../common/components/toast/dseSaveStatus';


export default {
	components: { DseSaveStatus, DseTableWidthPagination, DseLoadingAnimation },
	data() {
		return {
			pipeName: '',
			totalNum: 1,
			currentPage: 1,
			areaList: [
				{
					name:'测试分区1'
				},
				{
					name:'测试分区2'
				},
				{
					name:'测试分区3'
				},
				{
					name:'测试分区4'
				},
				{
					name:'测试分区5'
				}
			],
			temp_areaList: [
				{
					name:'测试分区1'
				},
				{
					name:'测试分区2'
				},
				{
					name:'测试分区3'
				},
				{
					name:'测试分区4'
				},
				{
					name:'测试分区5'
				}
			],
			left_area_list: [],
			show_area_more: false,
			show_model_area: false,
			tab_area_index: null,
			areaItem: '',
			radiusList: [
				{
					label:'DN100'
				},
				{
					label:'DN200'
				},
				{
					label:'DN300'
				},
				{
					label:'DN400'
				},
				{
					label:'DN500'
				}
			],
			temp_radiusList: [
				{
					label:'DN100'
				},
				{
					label:'DN200'
				},
				{
					label:'DN300'
				},
				{
					label:'DN400'
				},
				{
					label:'DN500'
				}
			],
			left_radius_list: [],
			radiusItem: '',
			show_radius_more: false,
			show_model_radius: false,
			tab_radius_index: null,
			materiaList: [
				{
					label:'铸铁管'
				},
				{
					label:'水泥管'
				}
			],
			temp_materiaList: [
				{
					label:'铸铁管'
				},
				{
					label:'水泥管'
				}
			],
			left_material_list: [],
			materialItem: '',
			show_material_more: false,
			show_model_material: false,
			tab_material_index: null,
			peopleList: [
				{
					name:'张全蛋'
				},
				{
					name:'王铁柱'
				}
			],
			temp_peopleList: [
				{
					name:'张全蛋'
				},
				{
					name:'王铁柱'
				}
			],
			left_people_list: [],
			personal: '',
			show_personal_more: false,
			show_model_personal: false,
			tab_people_index: null,
			statusItem: '', //选中的 状态
			monitorItem:'', // 选中的检测项
			monitorItemIndex:null,
			monitorItemList: [
				{
					label: '流量',
					value: '1'
				},
				{
					label: '压力',
					value: '2'
				},
				{
					label: '水质',
					value: '3'
				}
			],
			tab_status_index: null,
			statusList: [
				{
					label: '正常',
					value: '0'
				},
				{
					label: '异常',
					value: '3'
				}
			],
			list:[{'CONSTRUCTION_DEPT':'中建三局','CREATE_USER':null,'BELONG_SYSTEM':'管线','BUILD_DEPT':'宁夏水务集团投资有限公司','STATUS':'0','ROAD_WEIGHT':null,'PIPE_LENGTH':5.00,'DESIGN_DEPT':'宁夏勘察设计院有限责任公司','COM_TYPE':'1','ID':'A58804C67EAB4862943B7EA470F6AB36','CREATE_TIME':'2017-06-12 00:00:00','PIPE_THICKNESS':3.60,'TYPE':'1','USE_YEAR':5.00,'INSTALL_TIME':'1992-10-21','PIPE_MATERIAL':'其它管','AREACODE':'NDCQ001','ANTI_STYLE':null,'FLOW_THRESHOLD':1.20,'PIPELINE_NAME':null,'INTERFACE_TYPE_NAME':'热熔连接','END_POINT':null,'USETIME':27.0,'START_POINT':null,'LOCATION':'银川','TRANS_MEDIUM':'water','INTERFACE_TYPE':'8ae4b2d1651d6a0101653c659a2000ee','PIPELINE_CODE':null,'PIPE_RADIUS':'DN80','STATUS_NAME':'已使用','PRESSURE':0.15,'ENDEL':null,'PIPE_NAME':'新城纵四街3','REPONSIBLE_NAME':null,'LOCATION_ID':null,'PIPE_LEVEL':null,'SUPERVISOR_DEPT':'宁夏建设监理公司','COMPANY_ID':'8a7d81da60720db601607275f467000f','STARTEL':null,'TEMPERRATURE':25.00,'AREAID':'8ae4b2cd6af8d5eb016b259f70fa0157','UPDATE_USER':null,'UPDATE_TIME':null,'MANUFACTURER':null,'CODE':'GD00','PRES_THRESHOLD':1.00,'PIPE_DEEP':'1.2','AREANAME':'化工管线','REPONSIBLE_ID':null,'BELONG_DEPT':'管网公司'},{'CONSTRUCTION_DEPT':'中建三局','CREATE_USER':null,'BELONG_SYSTEM':'管线','BUILD_DEPT':'宁夏水务集团投资有限公司','STATUS':'0','ROAD_WEIGHT':null,'PIPE_LENGTH':6.00,'DESIGN_DEPT':'宁夏勘察设计院有限责任公司','COM_TYPE':'1','ID':'58493826D2C744B7B82841D1023BF510','CREATE_TIME':'2017-10-12 00:00:00','PIPE_THICKNESS':3.50,'TYPE':'1','USE_YEAR':5.00,'INSTALL_TIME':'1992-10-21','PIPE_MATERIAL':'水泥管','AREACODE':'NDCQ001','ANTI_STYLE':null,'FLOW_THRESHOLD':1.20,'PIPELINE_NAME':null,'INTERFACE_TYPE_NAME':'承插连接','END_POINT':null,'USETIME':27.0,'START_POINT':null,'LOCATION':'银川','TRANS_MEDIUM':'water','INTERFACE_TYPE':'8ae4b2d1651d6a0101653c6365cd00ec','PIPELINE_CODE':null,'PIPE_RADIUS':'DN65','STATUS_NAME':'已使用','PRESSURE':0.15,'ENDEL':null,'PIPE_NAME':'警民路2','REPONSIBLE_NAME':null,'LOCATION_ID':null,'PIPE_LEVEL':null,'SUPERVISOR_DEPT':'宁夏建设监理公司','COMPANY_ID':'8a7d81da60720db601607275f467000f','STARTEL':null,'TEMPERRATURE':25.00,'AREAID':'8ae4b2cd6af8d5eb016b259f70fa0157','UPDATE_USER':null,'UPDATE_TIME':null,'MANUFACTURER':null,'CODE':'GD00','PRES_THRESHOLD':1.00,'PIPE_DEEP':'1.3','AREANAME':'化工管线','REPONSIBLE_ID':null,'BELONG_DEPT':'管网公司'},{'CONSTRUCTION_DEPT':'中建三局','CREATE_USER':null,'BELONG_SYSTEM':'管线','BUILD_DEPT':'宁夏水务集团投资有限公司','STATUS':'0','ROAD_WEIGHT':'8ae4b2d165855f490165e63f67e7033b','PIPE_LENGTH':5.00,'DESIGN_DEPT':'宁夏勘察设计院有限责任公司','COM_TYPE':'1','ID':'77F1F7F96F512D58E055000000000001','CREATE_TIME':null,'PIPE_THICKNESS':3.70,'TYPE':'1','USE_YEAR':5.00,'INSTALL_TIME':'1992-10-21','PIPE_MATERIAL':'钢管','AREACODE':'NDCQ001','ANTI_STYLE':null,'FLOW_THRESHOLD':1.20,'PIPELINE_NAME':null,'INTERFACE_TYPE_NAME':'承插连接','END_POINT':null,'USETIME':27.0,'START_POINT':null,'LOCATION':'银川','TRANS_MEDIUM':'water','INTERFACE_TYPE':'8ae4b2d1651d6a0101653c6365cd00ec','PIPELINE_CODE':null,'PIPE_RADIUS':'DN65','STATUS_NAME':'已使用','PRESSURE':0.13,'ENDEL':null,'PIPE_NAME':'新城横二路','REPONSIBLE_NAME':null,'LOCATION_ID':null,'PIPE_LEVEL':null,'SUPERVISOR_DEPT':'宁夏建设监理公司','COMPANY_ID':'8a7d81da60720db601607275f467000f','STARTEL':null,'TEMPERRATURE':25.00,'AREAID':'8ae4b2cd6af8d5eb016b259f70fa0157','UPDATE_USER':null,'UPDATE_TIME':null,'MANUFACTURER':null,'CODE':'GD00','PRES_THRESHOLD':1.00,'PIPE_DEEP':'0.5','AREANAME':'化工管线','REPONSIBLE_ID':null,'BELONG_DEPT':'管网公司'},{'CONSTRUCTION_DEPT':'中建三局','CREATE_USER':null,'BELONG_SYSTEM':'管线','BUILD_DEPT':'宁夏水务集团投资有限公司','STATUS':'0','ROAD_WEIGHT':'8ae4b2d165855f490165e63ee7c0038a','PIPE_LENGTH':6.00,'DESIGN_DEPT':'宁夏勘察设计院有限责任公司','COM_TYPE':'1','ID':'77F1F7F96F6D2D58E055000000000001','CREATE_TIME':null,'PIPE_THICKNESS':3.60,'TYPE':'1','USE_YEAR':5.00,'INSTALL_TIME':'1992-10-21','PIPE_MATERIAL':'水泥管','AREACODE':'NDCQ001','ANTI_STYLE':null,'FLOW_THRESHOLD':1.20,'PIPELINE_NAME':null,'INTERFACE_TYPE_NAME':'热熔连接','END_POINT':null,'USETIME':27.0,'START_POINT':null,'LOCATION':'银川','TRANS_MEDIUM':'water','INTERFACE_TYPE':'8ae4b2d1651d6a0101653c659a2000ee','PIPELINE_CODE':null,'PIPE_RADIUS':'DN80','STATUS_NAME':'已使用','PRESSURE':0.15,'ENDEL':null,'PIPE_NAME':'支管','REPONSIBLE_NAME':null,'LOCATION_ID':null,'PIPE_LEVEL':null,'SUPERVISOR_DEPT':'宁夏建设监理公司','COMPANY_ID':'8a7d81da60720db601607275f467000f','STARTEL':null,'TEMPERRATURE':25.00,'AREAID':'8ae4b2cd6af8d5eb016b259f70fa0157','UPDATE_USER':null,'UPDATE_TIME':null,'MANUFACTURER':null,'CODE':'GD00','PRES_THRESHOLD':1.00,'PIPE_DEEP':'0.5','AREANAME':'化工管线','REPONSIBLE_ID':null,'BELONG_DEPT':'管网公司'},{'CONSTRUCTION_DEPT':'中建三局','CREATE_USER':null,'BELONG_SYSTEM':'管线','BUILD_DEPT':'宁夏水务集团投资有限公司','STATUS':'0','ROAD_WEIGHT':'8ae4b2d165855f490165e63ee7c0036a','PIPE_LENGTH':5.00,'DESIGN_DEPT':'宁夏勘察设计院有限责任公司','COM_TYPE':'1','ID':'77F1F7F96F9F2D58E055000000000001','CREATE_TIME':null,'PIPE_THICKNESS':3.70,'TYPE':'1','USE_YEAR':5.00,'INSTALL_TIME':'1992-10-21','PIPE_MATERIAL':'钢管','AREACODE':'NDCQ001','ANTI_STYLE':null,'FLOW_THRESHOLD':1.20,'PIPELINE_NAME':null,'INTERFACE_TYPE_NAME':'承插连接','END_POINT':null,'USETIME':27.0,'START_POINT':null,'LOCATION':'银川','TRANS_MEDIUM':'water','INTERFACE_TYPE':'8ae4b2d1651d6a0101653c6365cd00ec','PIPELINE_CODE':null,'PIPE_RADIUS':'DN65','STATUS_NAME':'已使用','PRESSURE':0.13,'ENDEL':null,'PIPE_NAME':'堡西路','REPONSIBLE_NAME':null,'LOCATION_ID':null,'PIPE_LEVEL':null,'SUPERVISOR_DEPT':'宁夏建设监理公司','COMPANY_ID':'8a7d81da60720db601607275f467000f','STARTEL':null,'TEMPERRATURE':25.00,'AREAID':'8ae4b2cd6af8d5eb016b259f70fa0157','UPDATE_USER':null,'UPDATE_TIME':null,'MANUFACTURER':null,'CODE':'GD00','PRES_THRESHOLD':1.00,'PIPE_DEEP':'0.7','AREANAME':'化工管线','REPONSIBLE_ID':null,'BELONG_DEPT':'管网公司'},{'CONSTRUCTION_DEPT':'中建三局','CREATE_USER':null,'BELONG_SYSTEM':'管线','BUILD_DEPT':'宁夏水务集团投资有限公司','STATUS':'0','ROAD_WEIGHT':'8ae4b2d165855f490165e63ee7c0037a','PIPE_LENGTH':5.00,'DESIGN_DEPT':'宁夏勘察设计院有限责任公司','COM_TYPE':'1','ID':'77F1F7F96F212D58E055000000000001','CREATE_TIME':null,'PIPE_THICKNESS':3.60,'TYPE':'1','USE_YEAR':5.00,'INSTALL_TIME':'1992-10-21','PIPE_MATERIAL':'其它管','AREACODE':'NDCQ001','ANTI_STYLE':null,'FLOW_THRESHOLD':1.20,'PIPELINE_NAME':null,'INTERFACE_TYPE_NAME':'热熔连接','END_POINT':null,'USETIME':27.0,'START_POINT':null,'LOCATION':'银川','TRANS_MEDIUM':'water','INTERFACE_TYPE':'8ae4b2d1651d6a0101653c659a2000ee','PIPELINE_CODE':null,'PIPE_RADIUS':'DN80','STATUS_NAME':'已使用','PRESSURE':0.15,'ENDEL':null,'PIPE_NAME':'支管','REPONSIBLE_NAME':null,'LOCATION_ID':null,'PIPE_LEVEL':null,'SUPERVISOR_DEPT':'宁夏建设监理公司','COMPANY_ID':'8a7d81da60720db601607275f467000f','STARTEL':null,'TEMPERRATURE':25.00,'AREAID':'8ae4b2cd6af8d5eb016b259f70fa0157','UPDATE_USER':null,'UPDATE_TIME':null,'MANUFACTURER':null,'CODE':'GD00','PRES_THRESHOLD':1.00,'PIPE_DEEP':'0.7','AREANAME':'化工管线','REPONSIBLE_ID':null,'BELONG_DEPT':'管网公司'},{'CONSTRUCTION_DEPT':'中建三局','CREATE_USER':null,'BELONG_SYSTEM':'管线','BUILD_DEPT':'宁夏水务集团投资有限公司','STATUS':'0','ROAD_WEIGHT':'8ae4b2d165855f490165e63f67e7033b','PIPE_LENGTH':5.00,'DESIGN_DEPT':'宁夏勘察设计院有限责任公司','COM_TYPE':'1','ID':'77F1F7F96F442D58E055000000000001','CREATE_TIME':null,'PIPE_THICKNESS':3.70,'TYPE':'1','USE_YEAR':5.00,'INSTALL_TIME':'1992-10-21','PIPE_MATERIAL':'钢管','AREACODE':'NDCQ001','ANTI_STYLE':null,'FLOW_THRESHOLD':1.20,'PIPELINE_NAME':null,'INTERFACE_TYPE_NAME':'承插连接','END_POINT':null,'USETIME':27.0,'START_POINT':null,'LOCATION':'银川','TRANS_MEDIUM':'water','INTERFACE_TYPE':'8ae4b2d1651d6a0101653c6365cd00ec','PIPELINE_CODE':null,'PIPE_RADIUS':'DN65','STATUS_NAME':'已使用','PRESSURE':0.13,'ENDEL':null,'PIPE_NAME':'G309二','REPONSIBLE_NAME':null,'LOCATION_ID':null,'PIPE_LEVEL':null,'SUPERVISOR_DEPT':'宁夏建设监理公司','COMPANY_ID':'8a7d81da60720db601607275f467000f','STARTEL':null,'TEMPERRATURE':25.00,'AREAID':'8ae4b2cd6af8d5eb016b259f70fa0157','UPDATE_USER':null,'UPDATE_TIME':null,'MANUFACTURER':null,'CODE':'GD00','PRES_THRESHOLD':1.00,'PIPE_DEEP':'0.5','AREANAME':'化工管线','REPONSIBLE_ID':null,'BELONG_DEPT':'管网公司'},{'CONSTRUCTION_DEPT':'中建三局','CREATE_USER':null,'BELONG_SYSTEM':'管线','BUILD_DEPT':'宁夏水务集团投资有限公司','STATUS':'0','ROAD_WEIGHT':'8ae4b2d165855f490165e63f67e7033b','PIPE_LENGTH':9.00,'DESIGN_DEPT':'宁夏勘察设计院有限责任公司','COM_TYPE':'1','ID':'77F1F7F96F542D58E055000000000001','CREATE_TIME':null,'PIPE_THICKNESS':3.40,'TYPE':'1','USE_YEAR':5.00,'INSTALL_TIME':'1992-10-21','PIPE_MATERIAL':'PE管','AREACODE':'NDCQ001','ANTI_STYLE':null,'FLOW_THRESHOLD':1.20,'PIPELINE_NAME':null,'INTERFACE_TYPE_NAME':'热熔连接','END_POINT':null,'USETIME':27.0,'START_POINT':null,'LOCATION':'银川','TRANS_MEDIUM':'water','INTERFACE_TYPE':'8ae4b2d1651d6a0101653c659a2000ee','PIPELINE_CODE':null,'PIPE_RADIUS':'DN80','STATUS_NAME':'已使用','PRESSURE':0.15,'ENDEL':null,'PIPE_NAME':'同康路3','REPONSIBLE_NAME':null,'LOCATION_ID':null,'PIPE_LEVEL':null,'SUPERVISOR_DEPT':'宁夏建设监理公司','COMPANY_ID':'8a7d81da60720db601607275f467000f','STARTEL':null,'TEMPERRATURE':25.00,'AREAID':'8ae4b2cd6af8d5eb016b259f70fa0157','UPDATE_USER':null,'UPDATE_TIME':null,'MANUFACTURER':null,'CODE':'GD00','PRES_THRESHOLD':1.00,'PIPE_DEEP':'0.5','AREANAME':'化工管线','REPONSIBLE_ID':null,'BELONG_DEPT':'管网公司'},{'CONSTRUCTION_DEPT':'中建三局','CREATE_USER':null,'BELONG_SYSTEM':'管线','BUILD_DEPT':'宁夏水务集团投资有限公司','STATUS':'0','ROAD_WEIGHT':'8ae4b2d165855f490165e63ee7c0039a','PIPE_LENGTH':5.00,'DESIGN_DEPT':'宁夏勘察设计院有限责任公司','COM_TYPE':'1','ID':'77F1F7F96F2E2D58E055000000000001','CREATE_TIME':null,'PIPE_THICKNESS':3.60,'TYPE':'1','USE_YEAR':5.00,'INSTALL_TIME':'1992-10-21','PIPE_MATERIAL':'其它管','AREACODE':'NDCQ001','ANTI_STYLE':null,'FLOW_THRESHOLD':1.20,'PIPELINE_NAME':null,'INTERFACE_TYPE_NAME':'热熔连接','END_POINT':null,'USETIME':27.0,'START_POINT':null,'LOCATION':'银川','TRANS_MEDIUM':'water','INTERFACE_TYPE':'8ae4b2d1651d6a0101653c659a2000ee','PIPELINE_CODE':null,'PIPE_RADIUS':'DN80','STATUS_NAME':'已使用','PRESSURE':0.15,'ENDEL':null,'PIPE_NAME':'西关街','REPONSIBLE_NAME':null,'LOCATION_ID':null,'PIPE_LEVEL':null,'SUPERVISOR_DEPT':'宁夏建设监理公司','COMPANY_ID':'8a7d81da60720db601607275f467000f','STARTEL':null,'TEMPERRATURE':25.00,'AREAID':'8ae4b2cd6af8d5eb016b259f70fa0157','UPDATE_USER':null,'UPDATE_TIME':null,'MANUFACTURER':null,'CODE':'GD00','PRES_THRESHOLD':1.00,'PIPE_DEEP':'0.7','AREANAME':'化工管线','REPONSIBLE_ID':null,'BELONG_DEPT':'管网公司'},{'CONSTRUCTION_DEPT':'中建三局','CREATE_USER':null,'BELONG_SYSTEM':'管线','BUILD_DEPT':'宁夏水务集团投资有限公司','STATUS':'0','ROAD_WEIGHT':'8ae4b2d165855f490165e63f67e7033b','PIPE_LENGTH':5.00,'DESIGN_DEPT':'宁夏勘察设计院有限责任公司','COM_TYPE':'1','ID':'77F1F7F96F7C2D58E055000000000001','CREATE_TIME':null,'PIPE_THICKNESS':3.60,'TYPE':'1','USE_YEAR':5.00,'INSTALL_TIME':'1992-10-21','PIPE_MATERIAL':'其它管','AREACODE':'NDCQ001','ANTI_STYLE':null,'FLOW_THRESHOLD':1.20,'PIPELINE_NAME':null,'INTERFACE_TYPE_NAME':'热熔连接','END_POINT':null,'USETIME':27.0,'START_POINT':null,'LOCATION':'银川','TRANS_MEDIUM':'water','INTERFACE_TYPE':'8ae4b2d1651d6a0101653c659a2000ee','PIPELINE_CODE':null,'PIPE_RADIUS':'DN80','STATUS_NAME':'已使用','PRESSURE':0.15,'ENDEL':null,'PIPE_NAME':'中山街','REPONSIBLE_NAME':null,'LOCATION_ID':null,'PIPE_LEVEL':null,'SUPERVISOR_DEPT':'宁夏建设监理公司','COMPANY_ID':'8a7d81da60720db601607275f467000f','STARTEL':null,'TEMPERRATURE':25.00,'AREAID':'8ae4b2cd6af8d5eb016b259f70fa0157','UPDATE_USER':null,'UPDATE_TIME':null,'MANUFACTURER':null,'CODE':'GD00','PRES_THRESHOLD':1.00,'PIPE_DEEP':'0.7','AREANAME':'化工管线','REPONSIBLE_ID':null,'BELONG_DEPT':'管网公司'}],
			checkedAll: false,
			templateFile: '', // 上传文件的 模板
			showAnimate: false, //默认 加载动画,
			showDelModel: false,
			delType: false,
			delId: ''
		};
	},
	methods: {
		gotoAdd() {
			this.$router.push({
				name: 'pipeAdd'
			});
			this.$store.commit('set_asideStatus', false);
			this.$emit('hiddenAside');
		},
		goto_page(pageNum) {
			this.getPipeBaseInfo_({ page: pageNum });
		},
		search() {
			this.getPipeBaseInfo_({ page: 1 });
		},
		showMore_area() {
			this.show_model_area = !this.show_model_area;
		},
		showMore_radius() {
			this.show_model_radius = !this.show_model_radius;
		},
		showMore_material() {
			this.show_model_material = !this.show_model_material;
		},
		showMore_personal() {
			this.show_model_personal = !this.show_model_personal;
		},
		getAreaLeakList_() {

		},
		// 获取管网列表
		getPipeBaseInfo_(payload = {}) {


		},
		// 选择当前的 分区
		select_areaItem(id, index, type) {
			const that = this;

			that.areaItem = id;
			that.tab_area_index = index;
			if (type == '1') {
				that.tab_area_index = index + that.temp_areaList.length - 1;
			}

			console.warn(id, 'id');
		},
		// 选择管径
		select_radiusItem(id, index, type) {
			const that = this;

			that.radiusItem = id;
			that.tab_radius_index = index;
			if (type == '1') {
				that.tab_radius_index = index + that.temp_radiusList.length - 1;
			}

			that.search();
		},
		// 管材
		select_materialItem(id, index, type) {
			const that = this;

			that.materialItem = id;
			that.tab_material_index = index;
			if (type == '1') {
				that.tab_material_index = index + that.temp_materiaList.length - 1;
			}

			that.search();
		},
		// 责任人
		select_peopleItem(id, index, type) {
			const that = this;

			that.personal = id;
			that.tab_people_index = index;
			if (type == '1') {
				that.tab_radius_index = index + that.temp_peopleList.length - 1;
			}

			that.search();
		},
		// 使用状态
		get_statusItem(id, index, type) {
			const that = this;

			that.statusItem = id;
			that.tab_status_index = index;

			that.search();
		},

		// 选取 监测项
		get_monitorItem(id, index, type){
			const that = this;

			that.monitorItem = id;
			that.monitorItemIndex = index;

			that.search();
		},
		// 获取人员列表
		queryPersonByDept_() {

		},
		//获取全部 分区
		clear_areaItem() {
			const that = this;

			that.areaItem = '';
			that.tab_area_index = null;

			that.search();
		},
		// 获取全部 管径
		clear_radiusItem() {
			const that = this;

			that.radiusItem = '';
			that.tab_radius_index = null;

			that.search();
		},
		// 获取全部 管材
		clear_materialItem() {
			const that = this;

			that.materialItem = '';
			that.tab_material_index = null;

			that.search();
		},
		// 获取全部 人员
		clear_peopleItem() {
			const that = this;

			that.personal = '';
			that.tab_people_index = null;

			that.search();
		},
		// 获取 全部状态
		clear_status() {
			const that = this;
			that.statusItem = '';
			that.tab_status_index = null;

			that.search();
		},
		// 获取全部监测数据
		clear_monitor(){
			const that = this;
			that.monitorItem = '';
			that.monitorItemIndex = null;

			that.search();
		},
		// 设置选择全部
		selecctAll(val) {
			let list = this.list;
			if (val) {
				for (let i = 0; i < list.length; i++) {
					list[i].status = true;
				}
			} else {
				for (let i = 0; i < list.length; i++) {
					list[i].status = false;
				}
			}
		},
		// 导入文件
		fileChange(e) {

			let type = 'application/vnd.ms-excel';
			if (e.target.files[0].type != type) {
				this.$message.warning('文件格式必须是.xls!');
				return;
			}
			let formdata = new FormData();
			formdata.append('file', e.target.files[0]);

		},
		//导出文件
		exportPipeList_() {


		},
		// 关闭 删除 弹窗
		delThis() {
			this.showDelModel = false;
			this.delId = '';
		},
		//  确认删除
		sureDelThis() {

		},
		// 修改管网
		edit(item) {
			console.warn(item, 'item');

			this.$router.push({
				name: 'pipeAdd',
				params: item
			});
			this.$store.commit('set_asideStatus', false);
			this.$emit('hiddenAside');
		}
		//选择 列表删除管网
		// del(id){
		//   this.delId = id;
		//   this.showDelModel = true;
		// }
	},
	filters: {
		formate_status(val) {
			let temp_val = val;
			switch (val) {
				case '0':
					temp_val = '正常';
					break;
				case '3':
					temp_val = '异常';
					break;
			}
			return temp_val;
		}
	},
	mounted() {
		let area_width = this.$refs.area.clientWidth;
		let list_radius_width = this.radiusList.length * 100 - 10;
		let list_material_width = this.materiaList.length * 100 - 10;

		let count = parseInt((area_width + 10) / 80);
		if (this.radiusList.length >= count) {
			this.temp_radiusList = this.radiusList.slice(0, count);
			this.left_material_list = this.radiusList.slice(count);
		} else {
			this.temp_radiusList = this.radiusList;
			this.left_material_list = [];
		}
		if (this.materiaList.length >= count) {
			this.temp_materiaList = this.materiaList.slice(0, count);
			this.left_radius_list = this.materiaList.slice(count);
		} else {
			this.temp_materiaList = this.materiaList;
			this.left_radius_list = [];
		}
		if (this.peopleList.length >= count) {
			this.temp_peopleList = this.peopleList.slice(0, count);
			this.left_people_list = this.peopleList.slice(count);
		} else {
			this.temp_peopleList = this.peopleList;
			this.left_people_list = [];
		}

		if (area_width < list_radius_width) {
			this.show_radius_more = true;
		} else {
			this.show_radius_more = false;
		}

		if (area_width < list_material_width) {
			this.show_material_more = true;
		} else {
			this.show_material_more = false;
		}

		this.getAreaLeakList_();

		this.queryPersonByDept_();
	},
	created() {
		this.radiusList = window.DSE.caliberLists.slice(1);
		this.materiaList = window.DSE.productLists.slice(1);
		this.getPipeBaseInfo_({ page: 1 });
		this.templateFile = this.$store.getters.get_filePath + '/template/管道台账导入模板.xls';
	}
};
</script>

<style scoped lang="scss">
#pipeStandingBook {
	width: 100%;
	height: 100%;
	/*padding: 0 10px 10px;*/
	/*background: #fff;*/
	.top-search {
		padding: 10px 0;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
		.el-input {
			width: 300px;
		}
		.el-button {
			margin-left: 10px;
			position: relative;
			&.export-file {
				input {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					opacity: 0;
					z-index: 10;
				}
			}
		}
		a {
			position: absolute;
			top: 5px;
			right: 5px;
		}
	}
	.row {
		width: 100%;
		height: 40px;

		padding: 5px 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
		span {
			display: inline-block;
			margin-right: 10px;
			width: 70px;
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			cursor: pointer;
			line-height: 30px;
			&:last-child {
				margin-right: 0px;
			}
			&.all {
				background: #ccc;
				color: #fff;
			}
			&.more {
				color: #0b83fe;
				text-decoration: underline;
				cursor: pointer;
			}
			&.tab-item {
				cursor: pointer;
				&:hover {
					color: #0b83fe;
				}
			}
			&.actived {
				background: #0b83fe;
				color: #fff;
			}
		}
		.list {
			width: calc(100% - 220px);
			position: relative;
			.show-more-model {
				position: absolute;
				top: 40px;
				left: 0;
				z-index: 2;
				width: 100%;
				background: #f2f2f2;
				.model-top {
					display: flex;
					justify-content: flex-end;
					height: 10px;
					align-items: center;
					position: relative;
					i {
						position: absolute;
						top: 2px;
						right: 2px;
					}
				}
				.left-list {
					width: 100%;
					display: flex;
					flex-flow: wrap;
					justify-content: flex-start;
					align-items: center;
				}
			}
		}
	}
	.table-contnet {
		width: 100%;
		height: calc(100% - 275px);
		overflow-y: auto;
	}

	table {
		thead {
			tr {
			}
		}
		tbody {
			tr {
				td:last-child {
					span {
						width: 40px;
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
