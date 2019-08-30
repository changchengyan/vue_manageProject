<template>
	<div class="data">
		<div class="block">
			<div class="card.bak">
				<Tab :tabs="tabs" @onHandleTabChange="onHandleTabChange" style="padding-top: 8px;" />

				<!--水厂-->
				<div v-show="tabIndex === 0" class="article">
					<!-- 操作栏 -->
					<div class="handle">
						<el-form :inline="true" class="form">
							<el-form-item label="分区选择:">
								<el-select v-model="tabsList[tabIndex].areaItem" placeholder="请选择分区" @change="onHandleChangeArea" @keyup.enter.native="onHandleChangeArea">
									<el-option v-for="item in areaList" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="水厂名称:">
								<el-select
									v-model="tabsList[tabIndex].engineeringValue"
									placeholder="请输入水厂名称"
									@change="onHandleChangeEngineering"
									@keyup.enter.native="onHandleChangeEngineering"
								>
									<el-option v-for="item in tabsList[tabIndex].engineerings" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="监测点:">
								<el-select
									v-model="tabsList[tabIndex].monitorValue"
									placeholder="请选择监测点"
									@change="onHandleChangeMonitor"
									@keyup.enter.native="onHandleChangeMonitor"
								>
									<el-option v-for="item in tabsList[tabIndex].monitors" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item><el-button type="primary" @click="onHandleSearch">搜索</el-button></el-form-item>
							<el-form-item label="时间:">
								<el-date-picker
									v-model="tabsList[tabIndex].date"
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
									format="yyyy-MM-dd"
									@keyup.enter.native="getThisTime($event, 0)"
								></el-date-picker>
							</el-form-item>
						</el-form>
					</div>
					<!-- 图表 -->
					<div class="chart">
						<div class="category" ref="ChartCategory0"></div>
						<div v-show="tabsList[tabIndex].monitorType === '1'" class="chart-radios">
							<el-radio v-model="tabsList[tabIndex].flag" label="1" @change="showThisChart_waterFactory">浊度</el-radio>
							<el-radio v-model="tabsList[tabIndex].flag" label="2" @change="showThisChart_waterFactory">余氯</el-radio>
						</div>
					</div>
					<!-- 表格 -->
					<div class="globalTable">
						<table class="innerTable">
							<thead>
								<tr>
									<th v-for="item in tabsList[tabIndex].columns" :key="item.key">
										<span>{{ item.name }}</span>
									</th>
									<th style="width: 180px; text-align: center;"><span>操作</span></th>
								</tr>
							</thead>
							<tbody>
								<template v-if="tabsList[tabIndex].list && tabsList[tabIndex].list.length">
									<tr v-for="(item, i) in tabsList[tabIndex].list" :key="i">
										<td>
											<span>{{ item.tm }}</span>
										</td>
										<td>
											<span>{{ item.stnm }}</span>
										</td>
										<td>
											<span>
												{{
													item.jctype === '1'
														? tabsList[tabIndex].flag === '1'
															? item.turb + '（NTU）'
															: tabsList[tabIndex].flag === '2'
															? item.chl + '（mg/L）'
															: item.turb + '（NTU）'
														: item.jctype === '2'
														? item.wgage + '（MPa）'
														: item.jctype === '3'
														? item.q + '（m³/h）'
														: item.jctype === '4'
														? item.rz + '（m）'
														: ''
												}}
											</span>
										</td>
										<td class="btns" @click="onHandleListModelVisible({ ...item, $index: i })"><span style="margin-right: 0px">修改</span></td>
									</tr>
								</template>
								<template v-else>
									<tr>
										<td colspan="4"><span style="line-height: 30px">暂时没有数据！</span></td>
									</tr>
								</template>
							</tbody>
						</table>
					</div>
				</div>

				<!--水库-->
				<div v-show="tabIndex === 1" class="article">
					<!-- 操作栏 -->
					<div class="handle">
						<el-form :inline="true" class="form">
							<el-form-item label="分区选择:">
								<el-select v-model="tabsList[tabIndex].areaItem" placeholder="请选择分区" @change="onHandleChangeArea">
									<el-option v-for="item in areaList" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="水库名称:">
								<el-select v-model="tabsList[tabIndex].engineeringValue" placeholder="请选择水库名称" @change="onHandleChangeEngineering">
									<el-option v-for="item in tabsList[tabIndex].engineerings" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="监测点:">
								<el-select v-model="tabsList[tabIndex].monitorValue" placeholder="请选择监测点" @change="onHandleChangeMonitor">
									<el-option v-for="(item, key) in tabsList[tabIndex].monitors" :key="key" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item><el-button type="primary" @click="onHandleSearch">搜索</el-button></el-form-item>
							<el-form-item label="时间:">
								<el-date-picker
									v-model="tabsList[tabIndex].date"
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
									@change="getThisTime($event, 1)"
								></el-date-picker>
							</el-form-item>
						</el-form>
						<!-- <div class="end"><el-button type="primary" @click="onHandleExport">导出</el-button></div> -->
					</div>
					<!-- 图表 -->
					<div class="chart">
						<div class="category" ref="ChartCategory1"></div>
						<div v-show="tabsList[tabIndex].monitorType === '1'" class="chart-radios">
							<el-radio v-model="tabsList[tabIndex].flag" label="1" @change="showThisChart_waterFactory">浊度</el-radio>
							<el-radio v-model="tabsList[tabIndex].flag" label="2" @change="showThisChart_waterFactory">余氯</el-radio>
						</div>
					</div>
					<!-- 表格 -->
					<div class="globalTable">
						<table class="innerTable">
							<thead>
								<tr>
									<th v-for="item in tabsList[tabIndex].columns" :key="item.key">
										<span>{{ item.name }}</span>
									</th>
									<th style="width: 80px; text-align: center;"><span>操作</span></th>
								</tr>
							</thead>
							<tbody>
								<template v-if="tabsList[tabIndex].list && tabsList[tabIndex].list.length">
									<tr v-for="(item, i) in tabsList[tabIndex].list" :key="i">
										<td>
											<span>{{ item.tm }}</span>
										</td>
										<td>
											<span>{{ item.stnm }}</span>
										</td>
										<td>
											<span>
												{{
													item.jctype === '1'
														? tabsList[tabIndex].flag === '1'
															? item.turb + '（NTU）'
															: tabsList[tabIndex].flag === '2'
															? item.chl + '（mg/L）'
															: item.turb + '（NTU）'
														: item.jctype === '2'
														? item.wgage + '（MPa）'
														: item.jctype === '3'
														? item.q + '（m³/h）'
														: item.jctype === '4'
														? item.rz + '（m）'
														: ''
												}}
											</span>
										</td>
										<td class="btns" @click="onHandleListModelVisible({ ...item, $index: i })"><span style="margin-right: 0px">修改</span></td>
									</tr>
								</template>
								<template v-else>
									<tr>
										<td colspan="4"><span style="line-height: 30px">暂时没有数据！</span></td>
									</tr>
								</template>
							</tbody>
						</table>
					</div>
				</div>
				<!-- 泵站 -->
				<div v-show="tabIndex === 2" class="article">
					<!-- 操作栏 -->
					<div class="handle">
						<el-form :inline="true" class="form">
							<el-form-item label="分区选择:">
								<el-select v-model="tabsList[tabIndex].areaItem" placeholder="请选择分区" @change="onHandleChangeArea">
									<el-option v-for="item in areaList" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="泵站名称:">
								<el-select v-model="tabsList[tabIndex].engineeringValue" placeholder="请选择泵站名称" @change="onHandleChangeEngineering">
									<el-option v-for="item in tabsList[tabIndex].engineerings" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="监测点:">
								<el-select v-model="tabsList[tabIndex].monitorValue" placeholder="请选择监测点" @change="onHandleChangeMonitor">
									<el-option v-for="(item, key) in tabsList[tabIndex].monitors" :key="key" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label=""><el-input v-model="tabsList[tabIndex].keywords" placeholder="模糊搜素 户名 户号 所属区域 管理单位"></el-input></el-form-item>
							<el-form-item><el-button type="primary" @click="onHandleSearch">搜索</el-button></el-form-item>
							<el-form-item label="时间:">
								<el-date-picker
									v-model="tabsList[tabIndex].date"
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
									@change="getThisTime($event, 2)"
								></el-date-picker>
							</el-form-item>
						</el-form>
					</div>
					<!-- 图表 -->
					<div class="chart">
						<div class="category" ref="ChartCategory2"></div>
						<div v-show="tabsList[tabIndex].monitorType === '1'" class="chart-radios">
							<el-radio v-model="tabsList[tabIndex].flag" label="1" @change="showThisChart_waterFactory">浊度</el-radio>
							<el-radio v-model="tabsList[tabIndex].flag" label="2" @change="showThisChart_waterFactory">余氯</el-radio>
						</div>
					</div>
					<!-- 表格 -->
					<div class="globalTable">
						<table class="innerTable">
							<thead>
								<tr>
									<th v-for="item in tabsList[tabIndex].columns" :key="item.key">
										<span>{{ item.name }}</span>
									</th>
									<th style="width: 80px; text-align: center;"><span>操作</span></th>
								</tr>
							</thead>
							<tbody>
								<template v-if="tabsList[tabIndex].list && tabsList[tabIndex].list.length">
									<tr v-for="(item, i) in tabsList[tabIndex].list" :key="i">
										<td>
											<span>{{ item.tm }}</span>
										</td>
										<td>
											<span>{{ item.stnm }}</span>
										</td>
										<td>
											<span>
												{{
													item.jctype === '1'
														? tabsList[tabIndex].flag === '1'
															? item.turb + '（NTU）'
															: tabsList[tabIndex].flag === '2'
															? item.chl + '（mg/L）'
															: item.turb + '（NTU）'
														: item.jctype === '2'
														? item.wgage + '（MPa）'
														: item.jctype === '3'
														? item.q + '（m³/h）'
														: item.jctype === '4'
														? item.rz + '（m）'
														: ''
												}}
											</span>
										</td>
										<td class="btns" @click="onHandleListModelVisible({ ...item, $index: i })"><span style="margin-right: 0px">修改</span></td>
									</tr>
								</template>
								<template v-else>
									<tr>
										<td colspan="4"><span style="line-height: 30px">暂时没有数据！</span></td>
									</tr>
								</template>
							</tbody>
						</table>
					</div>
				</div>

				<!-- 蓄水池 -->
				<div v-show="tabIndex === 3" class="article">
					<!-- 操作栏 -->
					<div class="handle">
						<el-form :inline="true" class="form">
							<el-form-item label="分区选择:">
								<el-select v-model="tabsList[tabIndex].areaItem" placeholder="请选择分区" @change="onHandleChangeArea">
									<el-option v-for="item in areaList" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="蓄水池名称:">
								<el-select v-model="tabsList[tabIndex].engineeringValue" placeholder="请选择蓄水池名称" @change="onHandleChangeEngineering">
									<el-option v-for="item in tabsList[tabIndex].engineerings" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="监测点:">
								<el-select v-model="tabsList[tabIndex].monitorValue" placeholder="请选择监测点" @change="onHandleChangeMonitor">
									<el-option v-for="(item, key) in tabsList[tabIndex].monitors" :key="key" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="">
								<el-input v-model="tabsList[tabIndex].keywords" placeholder="模糊搜索，能用蓄水池名称、所属片区、管理单位关键词进行模糊搜索"></el-input>
							</el-form-item>
							<el-form-item label=""><el-button type="primary" @click="onHandleSearch">搜索</el-button></el-form-item>
							<el-form-item label="时间:">
								<el-date-picker
									v-model="tabsList[tabIndex].date"
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
									@change="getThisTime($event, 3)"
								></el-date-picker>
							</el-form-item>
						</el-form>
					</div>
					<!-- 图表 -->
					<div class="chart">
						<div class="category" ref="ChartCategory3"></div>
						<div v-show="tabsList[tabIndex].monitorType === '1'" class="chart-radios">
							<el-radio v-model="tabsList[tabIndex].flag" label="1" @change="showThisChart_waterFactory">浊度</el-radio>
							<el-radio v-model="tabsList[tabIndex].flag" label="2" @change="showThisChart_waterFactory">余氯</el-radio>
						</div>
					</div>
					<!-- 表格 -->
					<div class="globalTable">
						<table class="innerTable">
							<thead>
								<tr>
									<th v-for="item in tabsList[tabIndex].columns" :key="item.key">
										<span>{{ item.name }}</span>
									</th>
									<th style="width: 80px; text-align: center;"><span>操作</span></th>
								</tr>
							</thead>
							<tbody>
								<template v-if="tabsList[tabIndex].list && tabsList[tabIndex].list.length">
									<tr v-for="(item, i) in tabsList[tabIndex].list" :key="i">
										<td>
											<span>{{ item.tm }}</span>
										</td>
										<td>
											<span>{{ item.stnm }}</span>
										</td>
										<td>
											<span>
												{{
													item.jctype === '1'
														? tabsList[tabIndex].flag === '1'
															? item.turb + '（NTU）'
															: tabsList[tabIndex].flag === '2'
															? item.chl + '（mg/L）'
															: item.turb + '（NTU）'
														: item.jctype === '2'
														? item.wgage + '（MPa）'
														: item.jctype === '3'
														? item.q + '（m³/h）'
														: item.jctype === '4'
														? item.rz + '（m）'
														: ''
												}}
											</span>
										</td>
										<td class="btns" @click="onHandleListModelVisible({ ...item, $index: i })"><span style="margin-right: 0px">修改</span></td>
									</tr>
								</template>
								<template v-else>
									<tr>
										<td colspan="4"><span>暂时没有数据！</span></td>
									</tr>
								</template>
							</tbody>
						</table>
					</div>
				</div>

				<!-- 联户表井监测 -->
				<div v-show="tabIndex === 4" class="article">
					<!-- 操作栏 -->
					<div class="handle">
						<el-form :inline="true" class="form">
							<!-- <el-form-item label="分区选择:">
								<el-select v-model="tabsList[tabIndex].areaItem" placeholder="请选择分区" @change="onHandleChangeArea">
									<el-option v-for="item in areaList" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item> -->
							<el-form-item label=""><el-input v-model="tabsList[tabIndex].keyname" placeholder="模糊搜素 户名 户号 所属区域 管理单位"></el-input></el-form-item>
							<el-form-item label=""><el-button type="primary" @click="onHandleSearch">搜索</el-button></el-form-item>
							<el-form-item label="时间:">
								<el-date-picker v-model="tabsList[tabIndex].date" type="month" placeholder="选择月" @change="getThisMonth_userDev($event)"></el-date-picker>
							</el-form-item>
							<!-- <el-form-item label="">
							<el-date-picker
								v-model="tabsList[tabIndex].date"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								@change="getThisTime($event, 5)"
							></el-date-picker>
							</el-form-item> -->
						</el-form>
					</div>
					<!-- 表格 -->
					<div class="globalTable">
						<table class="innerTable">
							<thead>
								<tr>
									<th v-for="item in tabsList[tabIndex].columns" :key="item.key">
										<span>{{ item.name }}</span>
									</th>
									<th style="width: 80px; text-align: center;"><span>操作</span></th>
								</tr>
							</thead>
							<tbody>
								<template v-if="tabsList[tabIndex].list && tabsList[tabIndex].list.length">
									<tr v-for="(item, i) in tabsList[tabIndex].list" :key="i">
										<td>
											<span>{{ `${item.yearno}-${item.monthno}` }}</span>
										</td>
										<td>
											<span>{{ item.sbbh }}</span>
										</td>
										<td>
											<span>{{ item.uname }}</span>
										</td>
										<td>
											<span>{{ item.adnm }}</span>
										</td>
										<td>
											<span>{{ item.engman }}</span>
										</td>
										<td>
											<span>{{ item.bqnum }}</span>
										</td>
										<td>
											<span>{{ item.ysl }}</span>
										</td>
										<td class="btns" @click="onHandleListModelVisible({ ...item, $index: i, isWaterMeter: true })">
											<span style="margin-right: 0px">修改</span>
										</td>
									</tr>
								</template>
								<template v-else>
									<tr>
										<td colspan="8"><span style="line-height: 30px">暂时没有数据！</span></td>
									</tr>
								</template>
							</tbody>
						</table>
					</div>
				</div>

				<!-- 管道监测点监测 -->
				<div v-show="tabIndex === 5" class="article">
					<!-- 操作栏 -->
					<div class="handle">
						<el-form :inline="true" class="form">
							<el-form-item label="分区选择:">
								<el-select v-model="tabsList[tabIndex].areaItem" placeholder="请选择分区" @change="onHandleChangeArea">
									<el-option v-for="item in areaList" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label=""><el-input v-model="tabsList[tabIndex].adcd" placeholder="模糊搜素 户名 户号 所属区域 管理单位"></el-input></el-form-item>
							<el-form-item label=""><el-button type="primary" @click="onHandleSearch">搜索</el-button></el-form-item>
							<el-form-item label="时间:">
								<el-date-picker
									v-model="tabsList[tabIndex].date"
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
									@change="getThisTime($event, 5)"
								></el-date-picker>
							</el-form-item>
						</el-form>
					</div>
					<!-- 表格 -->
					<div class="globalTable">
						<table class="innerTable">
							<thead>
								<tr>
									<th v-for="item in tabsList[tabIndex].columns" :key="item.key">
										<span>{{ item.name }}</span>
									</th>
									<th style="width: 80px; text-align: center;"><span>操作</span></th>
								</tr>
							</thead>
							<tbody>
								<template v-if="tabsList[tabIndex].list && tabsList[tabIndex].list.length">
									<tr v-for="(item, i) in tabsList[tabIndex].list" :key="i">
										<td>
											<span>{{ item.tm }}</span>
										</td>
										<td>
											<span>{{ item.stnm }}</span>
										</td>
										<td>
											<span>
												{{
													item.jctype === '1'
														? tabsList[tabIndex].flag === '1'
															? item.turb + '（NTU）'
															: tabsList[tabIndex].flag === '2'
															? item.chl + '（mg/L）'
															: item.turb + '（NTU）'
														: item.jctype === '2'
														? item.wgage + '（MPa）'
														: item.jctype === '3'
														? item.q + '（m³/h）'
														: item.jctype === '4'
														? item.rz + '（m）'
														: ''
												}}
											</span>
										</td>
										<td class="btns" @click="onHandleListModelVisible({ ...item, $index: i })"><span style="margin-right: 0px">修改</span></td>
									</tr>
								</template>
								<template v-else>
									<tr>
										<td colspan="4"><span style="line-height: 30px">暂时没有数据！</span></td>
									</tr>
								</template>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

		<!-- 修改 -->
		<dse-normal-model
			:tips="listModel.title"
			:modelFlag="listModel.visible"
			:onHandleModelClose="onHandleListModelClose"
			:class="listModel.payload.isWaterMeter ? 'waterMeter' : 'fnModel'"
		>
			<div class="modelWraper">
				<el-form ref="form" label-width="110px">
					<!--<el-form-item>{{listModel}}</el-form-item> -->
					<!--<el-form-item v-for="(item, key) in listModel.head" :key="key" :label="item.label">
						<el-input v-model="tabsList[tabIndex].list[listModel.$index][item.value]"></el-input>
					</el-form-item> -->
					<template v-if="listModel.payload.isWaterMeter">
						<el-form-item label="时间"><el-input v-model="listModel.payload.updatedAt" :disabled="true"></el-input></el-form-item>
						<el-form-item label="户号"><el-input v-model="listModel.payload.sbbh" :disabled="true"></el-input></el-form-item>
						<el-form-item label="户名"><el-input v-model="listModel.payload.uname" :disabled="true"></el-input></el-form-item>
						<el-form-item label="所属区域"><el-input v-model="listModel.payload.adnm" :disabled="true"></el-input></el-form-item>
						<el-form-item label="管理单位"><el-input v-model="listModel.payload.engman" :disabled="true"></el-input></el-form-item>
						<el-form-item label="当前水表读数"><el-input :value="listModel.payload.bqnum" v-on:input="onHandleCalculation"></el-input></el-form-item>
						<el-form-item label="用水量"><el-input v-model="listModel.payload.ysl" :disabled="true"></el-input></el-form-item>
						<el-form-item class="btn"><el-button type="primary" @click="updateWaterFactory">保存</el-button></el-form-item>
					</template>
					<template v-else>
						<el-form-item label="时间"><el-input v-model="listModel.payload.tm" :disabled="true"></el-input></el-form-item>
						<el-form-item label="水厂"><el-input v-model="listModel.payload.stnm" :disabled="true"></el-input></el-form-item>
						<el-form-item label="监测值"><el-input v-model="listModel.payload._value"></el-input></el-form-item>
						<el-form-item class="btn"><el-button type="primary" @click="updateWaterFactory">保存</el-button></el-form-item>
					</template>
				</el-form>
			</div>
		</dse-normal-model>
	</div>
</template>

<script>
import Tab from '../../../common/components/dseTab';
import dseNormalModel from '../../../common/components/toast/dseNormalModel';
import articleTableHead01 from './data/articleTableHead01';
import articleTableHead11 from './data/articleTableHead11';
import articleTableHead21 from './data/articleTableHead21';
import articleTableHead31 from './data/articleTableHead31';
import articleTableHead41 from './data/articleTableHead41';
import articleTableHead51 from './data/articleTableHead51';
import {
	// 根据分区编码获取相应工程
	getGcByAreaCode,
	// 获取监测点基本信息列表
	getStJcdBList,
	// 获取水厂监测数据列表
	getScjcList,
	// 获取水库监测数据列表
	getSkjcList,
	// 获取泵站监测数据列表
	getBzjcList,
	// 获取蓄水池水位数据列表
	getXscjcList,
	// 获取联户表井监测数据列表
	getLhbjList,
	// 获取管道监测点数据列表
	getGdjcdList,
	// 修改监测数据
	updScjcData
} from '../../../api/interfaces/dataManage_api';
import { getGcglList } from '../../../api/interfaces/system_api';

let ChartCategory0;
let ChartCategory1;
let ChartCategory2;
let ChartCategory3;

const pagination = {
	currentPage: 1,
	totalNum: 1
};
const paginationGroup = [10, 20, 30];

const TITLE = {
	text: '',
	x: 'center',
	y: 'top',
	textStyle: {
		color: '#1B84EA',
		fontStyle: 'normal',
		fontWeight: '600',
		fontFamily: 'Microsoft Yahei',
		fontSize: 16
	}
};

// 水厂下面：水压（MPa）、水位（m）、流量（m³/h）、水质（余氯（mg/L）、浊度（NTU）、PH）
// 水库下面：水位（m）、浊度（NTU）、PH
// 泵站下面：流量（m³/h）、水压（MPa）
// 蓄水池下面：水位（m）
// 联户表井下面：水量（m³）
// 管线下面：流量（m³/s）、水压（MPa）

export default {
	components: {
		Tab,
		dseNormalModel
	},
	data() {
		return {
			paginationGroup,
			tabIndex: 0,
			// tabs: ['水厂监测', '水库监测', '泵站监测', '蓄水池监测', '联户表井监测', '管道监测点监测'],
			tabs: ['水厂监测', '水库监测', '泵站监测', '蓄水池监测', '联户表井监测'],
			// 全局分区列表
			areaList: [],
			tabsList: [
				{
					// 一
					...pagination,
					areaItem: '0',
					date: [],
					// 监测类型编码
					engineeringValue: '',
					// 监测源头编码
					monitorValue: '1',
					// 监测对象列表
					engineerings: [],
					monitors: [],
					head: articleTableHead01,
					list: [],
					columns: [
						{
							key: 1,
							id: 1,
							name: '时间'
						},
						{
							key: 2,
							id: 2,
							name: '水厂'
						},
						{
							key: 3,
							id: 3,
							// name: '监测值(m³/s)'
							name: '监测值'
						}
					],
					// 1水厂,2水库,3泵站4, 蓄水池5. 联户表井,6管线
					engineeringType: '1',
					// 水压下的 xx 等
					// 水质下的 检测项  浊度 余氯 等
					monitorType: '',
					flag: '1'
				},
				{
					// 二
					...pagination,
					areaItem: '0',
					date: [],
					// 监测类型编码
					engineeringValue: '',
					// 监测源头编码
					monitorValue: '1',
					// 监测对象列表
					engineerings: [],
					monitors: [],
					head: articleTableHead11,
					list: [],
					columns: [
						{
							key: 1,
							id: 1,
							name: '时间'
						},
						{
							key: 2,
							id: 2,
							name: '水库'
						},
						{
							key: 3,
							id: 3,
							name: '监测值'
						}
					],
					engineeringType: '1',
					monitorType: '' //检测项
				},
				{
					// 三
					// 泵站
					...pagination,
					areaItem: '0',
					date: [],
					// 监测类型编码
					engineeringValue: '',
					// 监测源头编码
					monitorValue: '1',
					// 监测对象列表
					engineerings: [],
					monitors: [],
					head: articleTableHead21,
					list: [],
					columns: [
						{
							key: 1,
							id: 1,
							name: '时间'
						},
						{
							key: 2,
							id: 2,
							name: '泵站'
						},
						{
							key: 3,
							id: 3,
							name: '监测值'
						}
					],
					// 模糊搜索
					keywords: ''
				},
				{
					// 四
					// 蓄水池
					...pagination,
					areaItem: '0',
					date: [],
					// 监测类型编码
					engineeringValue: '',
					// 监测源头编码
					monitorValue: '1',
					// 监测对象列表
					engineerings: [],
					monitors: [],
					head: articleTableHead31,
					list: [],
					columns: [
						{
							key: 1,
							id: 1,
							name: '时间'
						},
						{
							key: 2,
							id: 2,
							name: '蓄水池'
						},
						{
							key: 3,
							id: 3,
							name: '监测值'
						}
					],
					// 模糊搜索
					keywords: ''
				},
				{
					// 五
					// 联户表井
					...pagination,
					areaItem: '0',
					date: [],
					keyname: '',
					head: articleTableHead41,
					list: [],
					columns: [
						{
							key: 1,
							name: '时间',
							id: 'tm'
						},
						{
							key: 2,
							name: '户号',
							id: 'bjid'
						},
						{
							key: 3,
							name: '户名',
							id: 'uname'
						},
						{
							key: 4,
							name: '所属区域',
							id: 'adnm'
						},
						{
							key: 5,
							name: '管理单位',
							id: 'eng_man'
						},
						{
							key: 6,
							name: '当前水表读数',
							id: 'ysprice'
						},
						{
							key: 7,
							name: '当前累计用水量',
							id: 'ysl'
						}
					],
					// 模糊搜索
					adcd: ''
				},
				{
					...pagination,
					areaItem: '0',
					date: [],
					head: articleTableHead51,
					list: [],
					columns: [
						{
							key: 1,
							id: 1,
							name: '时间'
						},
						{
							key: 2,
							id: 2,
							name: '管道'
						},
						{
							key: 3,
							id: 3,
							name: '监测值'
						}
					],
					// 模糊搜索
					keywords: ''
				}
			],
			listModel: {
				visible: false,
				title: '修改',
				data: {},
				params: {},
				payload: {}
			},
			siteTyleList: [
				{
					label: '水质',
					value: '1'
				},
				{
					label: '流量',
					value: '2'
				}
			],
			// 当为‘出厂’源头时，只会显示 ‘水质’和‘流量’
			temp_siteTyleList: [
				{
					label: '水质',
					value: '1'
				},
				{
					label: '流量',
					value: '2'
				},
				{
					label: '水压',
					value: '3'
				},
				{
					label: '水位',
					value: '4'
				}
			]
		};
	},
	mounted() {
		const that = this;

		// 初始化
		that._initialization();
	},
	methods: {
		async _initialization() {
			const that = this;

			// 初始化分区选择
			await that._setAreaList();
			that.$nextTick(() => {
				Promise.all([that.getGcglList_('1')]).then(res => {
					// 获取 水厂监测列表
					// that.getScjcList_(1);

					// 默认 tab切换第一个
					that.onHandleTabChange(0);
				});
			});
		},
		onHandleCalculation(value) {
			const that = this;
			const { listModel = {} } = that;
			const { payload = {} } = listModel;
			const { bqnum, sqnum, ysl } = payload;
			const res = value - sqnum;
			
			listModel.payload.bqnum = value;
			if ((bqnum > sqnum) && (res > 0)) {
				listModel.payload.ysl = res;
				listModel.payload.isDisabled = false;				
			} else {
				listModel.payload.ysl = ysl;
				listModel.payload.isDisabled = true;
				that.$message.warning('当前水表读数小于上期水表读数');
			}
			console.warn(value, bqnum, sqnum, ysl);
		},
		// 初始化分区选择
		_setAreaList() {
			const that = this;

			// 初始化分区
			that.areaList = that.$store.getters.get_cityAreas;
			const [{ value = '' }] = that.areaList || [{}];
			that.tabsList.forEach((item = {}) => {
				item.areaItem = value;
			});

			// 初始化工程选择
			return that._getGcByAreaCode();
		},
		// tab切换
		async onHandleTabChange(tabIndex = 0) {
			const that = this;

			that.tabIndex = tabIndex;
			that.tabsList[tabIndex].engineeringType = tabIndex + 1 + '';
			that.tabsList[tabIndex].monitorValue = '';

			// 获取工程名称
			await that._getGcByAreaCode();
			// if ([0, 1, 2, 3].includes(tabIndex)) await that._getGcByAreaCode();
			that.$nextTick(() => {
				switch (tabIndex) {
					case 0:
						ChartCategory0 = that.$echarts.init(that.$refs.ChartCategory0);
						break;
					case 1:
						ChartCategory1 = that.$echarts.init(that.$refs.ChartCategory1);
						break;
					case 2:
						ChartCategory2 = that.$echarts.init(that.$refs.ChartCategory2);
						break;
					case 3:
						ChartCategory3 = that.$echarts.init(that.$refs.ChartCategory3);
						break;
					default:
						break;
				}

				that.onHandleSearch();
				//new Promise((resolve, reject) => {
				//	// 查询 当前页签的数据
				//	resolve(that.onHandleSearch());
				//}).then(res => {
				//	// 搜索,格式化图表
				//	that._search();
				//});
			});
		},
		// 搜索,格式化图表
		_search() {
			const that = this;
			const { tabIndex = 0 } = that;

			switch (tabIndex) {
				case 0:
					that._drawCategory0();
					break;
				case 1:
					that._drawCategory1();
					break;
				case 2:
					that._drawCategory2();
					break;
				case 3:
					that._drawCategory3();
					break;
				default:
					break;
			}
		},
		// 查询 当前页签的数据
		async onHandleSearch() {
			const that = this;

			await that.onHandleChangeEngineering();
		},
		// 选择时间 查询当前页签的数据
		async getThisTime(time) {
			const that = this;

			// const { tabIndex } = that;
			const [stm, etm] = time;
			if (new Date(etm).getTime() - new Date(stm) > 7 * 24 * 60 * 60 * 1000) {
				this.$message.error('开始时间与结束时间差不大于7天!');

				return false;
			}

			that.$nextTick(() => {
				that.onHandleChangeArea();
			});
		},
		onHandleListModelVisible(payload = {}) {
			const that = this;

			const { $index } = payload;
			const { tabsList = [], tabIndex } = that;
			const { head, flag } = tabsList[tabIndex];

			// console.warn(payload);
			const { jctype, turb, chl, wgage = '', q = '', rz } = payload;
			let _value = '';
			if (jctype === '1') {
				flag === '1' && _value === turb;
				flag === '2' && _value === chl;
			}
			if (jctype === '2') {
				_value = wgage;
			}
			if (jctype === '3') {
				_value = q;
			}
			if (jctype === '4') {
				_value = rz;
			}

			that.listModel = {
				...that.listModel,
				visible: true,
				head,
				$index,
				payload: {
					...payload,
					_value,
					updatedAt: `${payload.yearno}-${payload.monthno}`
				}
				// params: {
				// 	stcd,
				// 	tm,
				// 	stnm,
				// 	wgage
				// }
			};
		},
		onHandleListModelSubmit() {
			const that = this;

			that.onHandleListModelClose();
		},
		onHandleListModelClose() {
			const that = this;

			that.listModel = {
				...that.listModel,
				visible: false
			};
		},
		onHandleListRemove(payload = {}) {},
		// 三级联动一
		async onHandleChangeArea(e) {
			const that = this;

			const { tabIndex } = that;
			that.tabsList[tabIndex].list = [];
			await that._getGcByAreaCode();
			await that.onHandleChangeEngineering();
		},
		// 三级联动二
		async onHandleChangeEngineering() {
			const that = this;

			const { tabIndex } = that;
			that.tabsList[tabIndex].list = [];
			// 搜索
			if (tabIndex === 0) {
				that._drawCategory0();
			}
			if (tabIndex === 1) {
				that._drawCategory1();
			}
			if (tabIndex === 2) {
				that._drawCategory2();
			}
			if (tabIndex === 3) {
				that._drawCategory3();
			}
			// 获取监测点基本信息列表
			await that._getStJcdBList();
			await that.onHandleChangeMonitor();
		},
		// 三级联动三
		async onHandleChangeMonitor() {
			const that = this;

			const { tabIndex, tabsList = [] } = that;
			const { monitors = [], monitorValue } = tabsList[tabIndex];
			// alert(JSON.stringify(monitors));
			if (!monitors[0] && [0, 1, 2, 3].includes(tabIndex)) return false;
			let flag;
			if (monitorValue) {
				const { jctype } = monitors.find(item => item.stcd === monitorValue);
				flag = jctype;
			} else {
				const [{ jctype }] = monitors[0] ? monitors : [{}];
				flag = jctype;
			}

			that.tabsList[tabIndex].monitorType = flag;
			// that.tabsList[tabIndex].list = [];

			// 搜索
			if (tabIndex === 0) {
				await that.getScjcList_();
				that._drawCategory0();
			}
			if (tabIndex === 1) {
				await that.getSkjcList_();
				that._drawCategory1();
			}
			if (tabIndex === 2) {
				await that.getBzjcList_();
				that._drawCategory2();
			}
			if (tabIndex === 3) {
				await that.getXscjcList_();
				that._drawCategory3();
			}
			if (tabIndex === 4) {
				that.getLhbjList_();
			}
			if (tabIndex === 5) {
				that.getGdjcdList_();
			}
		},
		_getGcByAreaCode() {
			const that = this;

			const { tabIndex, tabsList, areaList } = that;
			const { areaItem } = tabsList[tabIndex];
			// 清空
			that.tabsList[tabIndex].engineeringValue = '';
			that.tabsList[tabIndex].engineerings = [];
			that.tabsList[tabIndex].monitorValue = '';
			that.tabsList[tabIndex].monitors = [];
			// 如果父级为空,则不往下执行
			if ((Array.isArray(areaList) && !areaList[0]) || !Array.isArray(areaList)) return false;
			/**
			 * 根据分区编码获取相应工程
			 * @param {code}      		[true string] 	分区编号
			 * @param {prtypeList}      [true string] 	所属工程类型:1水厂,2水库,3泵站4, 蓄水池5. 联户表井,6管线
			 */
			const params = {
				code: areaItem,
				prtypeList: [tabIndex + 1]
			};
			return getGcByAreaCode(params, that)
				.then((results = {}) => {
					const { status, data } = results;

					if (status) {
						const _data = Array.isArray(data)
							? data.map((item = {}) => ({
									...item,
									label: item.gcname,
									value: item.gccd
							  }))
							: [];
						const [{ value = '' }] = _data[0] ? _data : [{}];

						// 获取监测点基本信息列表
						return that._getStJcdBList({
							engineeringValue: value,
							engineerings: _data
						});
					}
				})
				.catch(e => {
					console.error(e);
				});
		},
		_getStJcdBList(payload = {}) {
			const that = this;

			const { tabIndex, tabsList } = that;
			let { engineeringValue = '', engineerings = [], engineeringType = '', monitorType = '' } = payload;
			engineeringValue || (engineeringValue = tabsList[tabIndex].engineeringValue);
			engineerings[0] || (engineerings = tabsList[tabIndex].engineerings);
			engineeringType || (engineeringType = tabsList[tabIndex].engineeringType);
			// alert(JSON.stringify(engineerings));
			// 如果父级为空,则不往下执行
			if ((Array.isArray(engineerings) && !engineerings[0]) || !Array.isArray(engineerings)) return false;
			/**
			 * 获取监测点基本信息列表
			 * @param {stnm}      		[true string] 	编码或名称
			 * @param {jctype}      	[true string] 	监测类型
			 * @param {pageNum}     	[true string] 	第几页
			 * @param {pageSize}      	[true string] 	页条数
			 * @param {prcode}      	[true string] 	所属工程编码
			 */
			const params = {
				prcode: engineeringValue
			};
			return getStJcdBList(params, that).then((results = {}) => {
				const { status, data } = results;
				const { list } = data;

				if (status) {
					const tem = [];
					const _data = Array.isArray(list)
						? list
								.map((item = {}) => ({ ...item, label: item.stnm, value: item.stcd }))
								.filter((it = {}) => {
									if (tem.includes(it.value)) return false;
									tem.push(it.value);
									return true;
								})
						: [];
					const [{ value = '', jctype = '' }] = _data[0] ? _data : [{}];
					engineeringValue && (that.tabsList[tabIndex].engineeringValue = engineeringValue);
					engineerings[0] && (that.tabsList[tabIndex].engineerings = engineerings);
					monitorType || (that.tabsList[tabIndex].monitorType = jctype);
					that.tabsList[tabIndex].monitorValue = value;
					that.tabsList[tabIndex].monitors = _data;
				}
			});
		},
		// 水厂的 图表
		_drawCategory0() {
			const that = this;

			const { tabIndex = 0, tabsList = [] } = that;
			const { list, engineeringType, monitorType, flag, date } = tabsList[tabIndex];
			let [startTime = '', endTime = ''] = date;
			startTime = startTime.toLocaleDateString().replace(/\//g, '-');
			endTime = endTime.toLocaleDateString().replace(/\//g, '-');
			const chartList = list.map((item = {}) => {
				// 水压监测点
				if (item.jctype === '1') {
					if (flag === '1') return [item.tm, item.turb];
					if (flag === '2') return [item.tm, item.chl];
					// console.warn(item.tm);
					return [item.tm, item.turb];
				}
				//
				if (item.jctype === '2') {
					return [item.tm, item.wgage];
				}
				//
				if (item.jctype === '3') {
					return [item.tm, item.q];
				}
				// 水位监测点
				if (item.jctype === '4') {
					return [item.tm, item.rz];
				}
				return [];
			});
			let chartParams = {
				title: '',
				unit: '', // 单位
				name: '', // 名字
				startTime,
				endTime
			};
			/**
			 * engineeringType 1、水厂, 2、水库, 3、泵站, 4、蓄水池, 5、联户表井, 6、管线
			 * @type {string}  选择不同的 类型 展示不同的图表
			 * 	水厂下面：水压（MPa）、流量（m³/s）、水质（余氯（mg/L）、浊度（NTU）、PH（%））
				水库下面：浊度（NTU）、余氯（mg/L）
				泵站下面：流量（m³/s）
				蓄水池下面：水位（m）
				联户表井下面：流量（m³/s）、水量（m）
				管线下面：流量（T/h）、水压（MPa）
			 */
			switch (engineeringType) {
				case '1':
					// 1水厂
					if (monitorType == '1') {
						if (flag === '1') {
							chartParams = {
								...chartParams,
								title: '水厂',
								unit: 'NTU',
								name: '水质（浊度）'
							};
						}
						if (flag === '2') {
							chartParams = {
								...chartParams,
								title: '水厂',
								unit: 'mg/L',
								name: '水质（余氯）'
							};
						}
						if (flag === '3') {
							chartParams = {
								...chartParams,
								title: '水厂',
								unit: 'PH',
								name: '水质（PH）'
							};
						}
					} else if (monitorType == '2') {
						chartParams = {
							...chartParams,
							title: '水厂',
							unit: 'MPa',
							name: '水压'
						};
					} else if (monitorType == '3') {
						chartParams = {
							...chartParams,
							title: '水厂',
							unit: 'm³/s',
							name: '流量'
						};
					} else if (monitorType == '4') {
						chartParams = {
							...chartParams,
							title: '水厂',
							unit: 'M',
							name: '水位'
						};
					} else {
						chartParams = {
							...chartParams,
							title: '水厂',
							unit: '暂无监测点',
							name: '暂无监测点'
						};
					}
					break;
				case '2':
					// 2水库
					if (monitorType == '1') {
						chartParams.name = '浊度';
						chartParams.unit = 'NTU';
					} else if (monitorType == '2') {
						chartParams.name = '余氯';
						chartParams.unit = 'mg/L';
					}
					break;
				case '3':
					// 3泵站
					chartParams = {
						...chartParams,
						unit: 'm³/s',
						name: '流量'
					};
					break;
				case '4':
					// 蓄水池
					chartParams = {
						...chartParams,
						unit: 'm',
						name: '水位'
					};
					break;
				case '5':
					// 联户表井
					chartParams = {
						...chartParams,
						unit: 'm',
						name: '水位'
					};
					break;
				case '6':
					// 管线
					chartParams = {
						...chartParams,
						unit: 'm',
						name: '水位'
					};
					break;
			}
			const { title, unit, name } = chartParams;
			ChartCategory0.setOption({
				title: {
					...TITLE,
					text: `${startTime}至${endTime}${title}趋势图`
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						animation: false
					}
				},
				color: ['#f5a72b'],
				xAxis: {
					name: '时间',
					type: 'time'
				},
				yAxis: {
					name: unit,
					type: 'value',
					splitLine: {
						show: false
					}
				},
				series: [
					{
						data: chartList,
						type: 'line',
						name: name
					}
				]
			});
		},
		// 水库的图表
		_drawCategory1() {
			const that = this;

			const { tabIndex = 0, tabsList = [] } = that;
			const { engineeringType, monitorType, list, flag, date } = tabsList[tabIndex];
			/**
			 *
			 * @type {string}  选择不同的 类型 展示不同的图表
			 */
			let [startTime = '', endTime = ''] = date;
			startTime = startTime.toLocaleDateString().replace(/\//g, '-');
			endTime = endTime.toLocaleDateString().replace(/\//g, '-');
			const chartList = list.map((item = {}) => {
				// 水压监测点
				if (item.jctype === '1') {
					// console.warn(item.tm);
					return [item.tm, item.turb];
				}
				// 水压监测点
				if (item.jctype === '2') {
					return [item.tm, item.wgage];
				}
				// 水压监测点
				if (item.jctype === '3') {
					return [item.tm, item.q];
				}
				// 水位监测点
				if (item.jctype === '4') {
					return [item.tm, item.rz];
				}
				return [];
			});
			// console.warn(JSON.stringify(chartList));
			let chartParams = {
				title: '',
				unit: '', // 单位
				name: '', // 名字
				startTime,
				endTime
			};
			// alert(engineeringType);
			/**
			 * engineeringType 1、水厂, 2、水库, 3、泵站, 4、蓄水池, 5、联户表井, 6、管线
			 * @type {string}  选择不同的 类型 展示不同的图表
			 * 	水厂下面：水压（MPa）、流量（m³/s）、水质（余氯（mg/L）、浊度（NTU）、PH（%））
				水库下面：浊度（NTU）、余氯（mg/L）
				泵站下面：流量（m³/s）
				蓄水池下面：水位（m）
				联户表井下面：流量（m³/s）、水量（m）
				管线下面：流量（T/h）、水压（MPa）
			 */
			switch (engineeringType) {
				case '1':
					// 1水厂

					break;
				case '2':
					// 2水库
					if (monitorType == '1') {
						if (flag === '1') {
							chartParams = {
								...chartParams,
								title: '水库',
								unit: 'NTU',
								name: '水质（浊度）'
							};
						}
						if (flag === '2') {
							chartParams = {
								...chartParams,
								title: '水库',
								unit: 'mg/L',
								name: '水质（余氯）'
							};
						}
						if (flag === '3') {
							chartParams = {
								...chartParams,
								title: '水库',
								unit: 'PH',
								name: '水质（PH）'
							};
						}
					} else if (monitorType == '2') {
						chartParams = {
							...chartParams,
							title: '水库',
							unit: 'MPa',
							name: '水压'
						};
					} else if (monitorType == '3') {
						chartParams = {
							...chartParams,
							title: '水库',
							unit: 'm³/s',
							name: '流量'
						};
					} else if (monitorType == '4') {
						chartParams = {
							...chartParams,
							title: '水库',
							unit: 'M',
							name: '水位'
						};
					} else {
						chartParams = {
							...chartParams,
							title: '水库',
							unit: '暂无监测点',
							name: '暂无监测点'
						};
					}
					break;
				case '3':
					// 3泵站
					chartParams = {
						...chartParams,
						unit: 'm³/s',
						name: '流量'
					};
					break;
				case '4':
					// 蓄水池
					chartParams = {
						...chartParams,
						unit: 'm',
						name: '水位'
					};
					break;
				case '5':
					// 联户表井
					chartParams = {
						...chartParams,
						unit: 'm',
						name: '水位'
					};
					break;
				case '6':
					// 管线
					chartParams = {
						...chartParams,
						unit: 'm',
						name: '水位'
					};
					break;
			}
			const { unit, name, title } = chartParams;
			ChartCategory1.setOption({
				title: {
					...TITLE,
					text: `${startTime}至${endTime}${title}趋势图`
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						animation: false
					}
				},
				color: ['#f5a72b'],
				xAxis: {
					name: '时间',
					type: 'time'
				},
				yAxis: {
					name: unit,
					type: 'value',
					splitLine: {
						show: false
					}
				},
				series: [
					{
						data: chartList,
						type: 'line',
						name: name
					}
				]
			});
		},
		// 泵站图表
		_drawCategory2() {
			const that = this;

			const { tabIndex = 0, tabsList = [] } = that;
			const { engineeringType, monitorType, list, flag, date } = tabsList[tabIndex];
			/**
			 *
			 * @type {string}  选择不同的 类型 展示不同的图表
			 */
			let [startTime = '', endTime = ''] = date;
			startTime = startTime.toLocaleDateString().replace(/\//g, '-');
			endTime = endTime.toLocaleDateString().replace(/\//g, '-');
			const chartList = list.map((item = {}) => {
				// 水压监测点
				if (item.jctype === '1') {
					return [item.tm, item.turb];
				}
				// 水压监测点
				if (item.jctype === '2') {
					return [item.tm, item.wgage];
				}
				// 水压监测点
				if (item.jctype === '3') {
					return [item.tm, item.q];
				}
				// 水位监测点
				if (item.jctype === '4') {
					return [item.tm, item.rz];
				}
				return [];
			});
			// console.warn(JSON.stringify(chartList));
			let chartParams = {
				title: '',
				unit: '', // 单位
				name: '', // 名字
				startTime,
				endTime
			};
			/**
			 * engineeringType 1、水厂, 2、水库, 3、泵站, 4、蓄水池, 5、联户表井, 6、管线
			 * @type {string}  选择不同的 类型 展示不同的图表
			 * 	水厂下面：水压（MPa）、流量（m³/s）、水质（余氯（mg/L）、浊度（NTU）、PH（%））
				水库下面：浊度（NTU）、余氯（mg/L）
				泵站下面：流量（m³/s）
				蓄水池下面：水位（m）
				联户表井下面：流量（m³/s）、水量（m）
				管线下面：流量（T/h）、水压（MPa）
			 */
			switch (engineeringType) {
				case '1':
					// 1水厂
					console.warn(312);
					break;
				case '2':
					// 2水库
					if (monitorType == '1') {
						chartParams.name = '浊度';
						chartParams.unit = 'NTU';
					} else if (monitorType == '2') {
						chartParams.name = '余氯';
						chartParams.unit = 'mg/L';
					}
					break;
				case '3':
					// 3泵站
					if (monitorType == '1') {
						console.warn(123);
					} else if (monitorType == '2') {
						chartParams = {
							...chartParams,
							title: '泵站',
							unit: 'MPa',
							name: '水压'
						};
					} else if (monitorType == '3') {
						if (flag === '1') {
							chartParams = {
								...chartParams,
								title: '泵站',
								unit: 'NTU',
								name: '水质（浊度）'
							};
						}
						if (flag === '2') {
							chartParams = {
								...chartParams,
								title: '泵站',
								unit: 'mg/L',
								name: '水质（余氯）'
							};
						}
						if (flag === '3') {
							chartParams = {
								...chartParams,
								title: '泵站',
								unit: 'PH',
								name: '水质（PH）'
							};
						}
					} else if (monitorType == '4') {
						chartParams = {
							...chartParams,
							title: '泵站',
							unit: 'M',
							name: '水位'
						};
					} else {
						chartParams = {
							...chartParams,
							title: '泵站',
							unit: '暂无监测点',
							name: '暂无监测点'
						};
					}
					break;
				case '4':
					// 蓄水池
					chartParams = {
						...chartParams,
						unit: 'm',
						name: '水位'
					};
					break;
				case '5':
					// 联户表井
					chartParams = {
						...chartParams,
						unit: 'm',
						name: '水位'
					};
					break;
				case '6':
					// 管线
					chartParams = {
						...chartParams,
						unit: 'm',
						name: '水位'
					};
					break;
			}
			const { unit, name, title } = chartParams;
			ChartCategory2.setOption({
				title: {
					...TITLE,
					text: `${startTime}至${endTime}${title}趋势图`
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						animation: false
					}
				},
				color: ['#f5a72b'],
				xAxis: {
					name: '时间',
					type: 'time'
				},
				yAxis: {
					name: unit,
					type: 'value',
					splitLine: {
						show: false
					}
				},
				series: [
					{
						data: chartList,
						type: 'line',
						name: name
					}
				]
			});
		},
		// 蓄水池的图表
		_drawCategory3() {
			const that = this;
			const { tabIndex = 0, tabsList = [] } = that;
			const { engineeringType, monitorType, list, flag, date } = tabsList[tabIndex];
			/**
			 *
			 * @type {string}  选择不同的 类型 展示不同的图表
			 */
			let [startTime = '', endTime = ''] = date;
			startTime = startTime.toLocaleDateString().replace(/\//g, '-');
			endTime = endTime.toLocaleDateString().replace(/\//g, '-');
			const chartList = list.map((item = {}) => {
				// 水压监测点
				if (item.jctype === '1') {
					return [item.tm, item.turb];
				}
				// 水压监测点
				if (item.jctype === '2') {
					return [item.tm, item.wgage];
				}
				// 水压监测点
				if (item.jctype === '3') {
					return [item.tm, item.q];
				}
				// 水位监测点
				if (item.jctype === '4') {
					return [item.tm, item.rz];
				}
				return [];
			});
			// console.warn(JSON.stringify(chartList));
			let chartParams = {
				title: '',
				unit: '', // 单位
				name: '', // 名字
				startTime,
				endTime
			};
			/**
			 * engineeringType 1、水厂, 2、水库, 3、泵站, 4、蓄水池, 5、联户表井, 6、管线
			 * @type {string}  选择不同的 类型 展示不同的图表
			 * 	水厂下面：水压（MPa）、流量（m³/s）、水质（余氯（mg/L）、浊度（NTU）、PH（%））
				水库下面：浊度（NTU）、余氯（mg/L）
				泵站下面：流量（m³/s）
				蓄水池下面：水位（m）
				联户表井下面：流量（m³/s）、水量（m）
				管线下面：流量（T/h）、水压（MPa）
			 */
			switch (engineeringType) {
				case '1':
					// 1水厂
					console.warn(123);
					break;
				case '2':
					// 2水库
					if (monitorType == '1') {
						chartParams.name = '浊度';
						chartParams.unit = 'NTU';
					} else if (monitorType == '2') {
						chartParams.name = '余氯';
						chartParams.unit = 'mg/L';
					}
					break;
				case '3':
					// 3泵站
					chartParams = {
						...chartParams,
						unit: 'm³/s',
						name: '流量'
					};
					break;
				case '4':
					// 蓄水池
					if (monitorType == '1') {
						if (flag === '1') {
							chartParams = {
								...chartParams,
								title: '蓄水池',
								unit: 'NTU',
								name: '水质（浊度）'
							};
						}
						if (flag === '2') {
							chartParams = {
								...chartParams,
								title: '蓄水池',
								unit: 'mg/L',
								name: '水质（余氯）'
							};
						}
						if (flag === '3') {
							chartParams = {
								...chartParams,
								title: '蓄水池',
								unit: 'PH',
								name: '水质（PH）'
							};
						}
					} else if (monitorType == '2') {
						chartParams = {
							...chartParams,
							title: '蓄水池',
							unit: 'MPa',
							name: '水压'
						};
					} else if (monitorType == '3') {
						chartParams = {
							...chartParams,
							title: '蓄水池',
							unit: 'm³/s',
							name: '流量'
						};
					} else if (monitorType == '4') {
						chartParams = {
							...chartParams,
							title: '蓄水池',
							unit: 'M',
							name: '水位'
						};
					} else {
						chartParams = {
							...chartParams,
							title: '蓄水池',
							unit: 'xxx',
							name: 'xxx'
						};
					}
					break;
				case '5':
					// 联户表井
					chartParams = {
						...chartParams,
						unit: 'm',
						name: '水位'
					};
					break;
				case '6':
					// 管线
					chartParams = {
						...chartParams,
						unit: 'm',
						name: '水位'
					};
					break;
			}
			const { unit, name, title } = chartParams;
			ChartCategory3.setOption({
				title: {
					...TITLE,
					text: `${startTime}至${endTime}${title}趋势图`
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						animation: false
					}
				},
				color: ['#f5a72b'],
				xAxis: {
					name: '时间',
					type: 'time'
				},
				yAxis: {
					name: unit,
					type: 'value',
					splitLine: {
						show: false
					}
				},
				series: [
					{
						data: chartList,
						type: 'line',
						name: name
					}
				]
			});
		},
		// 获取 水厂监测列表
		getScjcList_(num = 1) {
			const that = this;

			const { tabIndex, tabsList } = that;
			const { engineeringValue, date, monitors, monitorValue } = tabsList[tabIndex];
			let [stm = '', etm = ''] = date || [];
			stm = stm.toLocaleDateString().replace(/\//g, '-');
			etm = etm.toLocaleDateString().replace(/\//g, '-');
			const res = Array.isArray(monitors)
				? monitors.filter((item = {}) => {
						if (item.stcd === monitorValue) return true;
						return false;
				  })
				: [];
			const [{ jctype = '' }] = res[0] ? res : [{}];
			that.tabsList[tabIndex].columns = [
				{
					key: 1,
					id: 1,
					name: '时间'
				},
				{
					key: 2,
					id: 2,
					name: '水厂'
				},
				{
					key: 3,
					id: 3,
					// name: '监测值(m³/s)'
					name: '监测值'
				}
			];
			/**
			 * 获取水厂监测数据列表
			 * @param {prcd}      	[false string] 	工程编码
			 * @param {stcd}      	[true string] 	监测点编号
			 * @param {stJcType}    [true string] 	监测类型：1.水质2.水压3.流量，4水位
			 * @param {stm}      	[true string] 	开始日期
			 * @param {etm}      	[true string] 	结束日期
			 * @param {jzbw}      	[true string] 	监测源头：1进厂2出厂当监测类型为1.水质3.流量时有效，其他隐藏
			 */
			const params = {
				prcd: engineeringValue,
				stcd: monitorValue,
				stJcType: jctype,
				stm,
				etm,
				jzbw: ''
			};
			return getScjcList(params, that).then(results => {
				const { status, msg, data } = results;

				if (status) {
					that.tabsList[tabIndex].list = Array.isArray(data)
						? data.map((item = {}) => {
								return {
									...item,
									date: '/',
									value: '/'
								};
						  })
						: [];
				} else {
					that.$message.warning(msg);
				}
			});
		},
		// 获取 水库监测列表
		getSkjcList_(num = 1) {
			const that = this;

			const { tabIndex, tabsList } = that;
			const { engineeringValue, date, monitors, monitorValue } = tabsList[tabIndex];
			let [stm = '', etm = ''] = date || [];
			stm = stm.toLocaleDateString().replace(/\//g, '-');
			etm = etm.toLocaleDateString().replace(/\//g, '-');
			const res = Array.isArray(monitors)
				? monitors.filter((item = {}) => {
						if (item.stcd === monitorValue) return true;
						return false;
				  })
				: [];
			const [{ jctype = '' }] = res[0] ? res : [{}];
			that.tabsList[tabIndex].columns = [
				{
					key: 1,
					id: 1,
					name: '时间'
				},
				{
					key: 2,
					id: 2,
					name: '水库'
				},
				{
					key: 3,
					id: 3,
					name: '监测值'
				}
			];
			/**
			 * 获取水库监测数据列表
			 * @param {prcd}      	[false string]  	工程编码
			 * @param {stJcType}    [true string] 		监测点 ：1.水质2.水压3.流量，4水位
			 * @param {stm}    		[true string] 		开始日期
			 * @param {etm}      	[true string] 		结束日期
			 * @param {stcd}      	[true string] 		监测点编号
			 */
			let params = {
				prcd: engineeringValue,
				stcd: monitorValue,
				stJcType: jctype,
				stm,
				etm
			};
			if (!params.prcd) {
				that.tabsList[0].list = [];
				return;
			}
			return getSkjcList(params, that).then(res => {
				let { data } = res;
				data = data && data.length > 0 ? data : [];
				that.tabsList[1].list = data;
			});
		},
		// 获取 泵站监测列表
		getBzjcList_(num = 1) {
			const that = this;

			const { tabIndex, tabsList } = that;
			const { engineeringValue, monitors, monitorValue, keyname, date } = tabsList[tabIndex];
			let [stm = '', etm = ''] = date || [];
			stm = stm.toLocaleDateString().replace(/\//g, '-');
			etm = etm.toLocaleDateString().replace(/\//g, '-');
			const res = Array.isArray(monitors)
				? monitors.filter((item = {}) => {
						if (item.stcd === monitorValue) return true;
						return false;
				  })
				: [];
			const [{ jctype = '' }] = res[0] ? res : [{}];
			that.tabsList[tabIndex].columns = [
				{
					key: 1,
					id: 1,
					name: '时间'
				},
				{
					key: 2,
					id: 2,
					name: '泵站'
				},
				{
					key: 3,
					id: 3,
					name: '监测值'
				}
			];
			/**
			 * 获取水厂监测数据列表
			 * @param {prcd}      	[false string] 	工程编码
			 * @param {stcd}      	[true string] 	监测点编号
			 * @param {stJcType}    [true string] 	监测类型：2.水压3.流量
			 * @param {keyname}    	[true string] 	关键字模糊查询
			 * @param {stm}      	[true string] 	开始日期
			 * @param {etm}      	[true string] 	结束日期
			 */
			const params = {
				prcd: engineeringValue,
				stcd: monitorValue,
				stJcType: jctype,
				keyname,
				etm,
				stm
			};
			return getBzjcList(params, that).then(res => {
				let { data } = res;
				data = data && data.length > 0 ? data : [];
				that.tabsList[2].list = data;
			});
		},
		// 获取 蓄水池监测列表
		getXscjcList_(num = 1) {
			const that = this;

			const { tabIndex, tabsList } = that;
			const { engineeringValue, monitorValue, monitors, keyname, date } = tabsList[tabIndex];
			let [stm = '', etm = ''] = date || [];
			stm = stm.toLocaleDateString().replace(/\//g, '-');
			etm = etm.toLocaleDateString().replace(/\//g, '-');
			const res = Array.isArray(monitors)
				? monitors.filter((item = {}) => {
						if (item.stcd === monitorValue) return true;
						return false;
				  })
				: [];
			const [{ jctype = '' }] = res[0] ? res : [{}];
			that.tabsList[tabIndex].columns = [
				{
					key: 1,
					id: 1,
					name: '时间'
				},
				{
					key: 2,
					id: 2,
					name: '蓄水池'
				},
				{
					key: 3,
					id: 3,
					name: '监测值'
				}
			];
			/**
			 * 获取蓄水池水位数据列表
			 * @param {keyname}      	[false string] 	关键字模糊查询
			 * @param {stm}      		[true string] 	开始日期
			 * @param {stcd}    		[true string] 	监测点编号
			 * @param {stJcType}      	[true string] 	监测类型： 4 水位
			 * @param {etm}      		[true string] 	结束日期
			 */
			const params = {
				stcd: engineeringValue,
				stJcType: jctype,
				keyname,
				etm,
				stm
			};
			return getXscjcList(params, that).then(res => {
				let { data } = res;
				data = data && data.length > 0 ? data : [];
				that.tabsList[3].list = [...data];
			});
		},
		// 获取 联户表井监测列表
		getLhbjList_(num = 1) {
			let that = this;

			const { tabIndex, tabsList } = that;
			const { keyname, date } = tabsList[tabIndex];
			const nowDate = date.toLocaleDateString();
			const yearMonth = nowDate.split('/');
			const [yearno, monthno] = yearMonth;
			// that.tabsList[tabIndex].columns = [

			// ];
			/**
			 * 获取联户表井监测数据列表
			 * @param {cwscd}      	[false string] 	工程编码
			 * @param {yearno}      [false string] 	年份
			 * @param {adcd}      	[true  string] 	分区编码
			 * @param {bjid}    	[false string] 	表井ID
			 * @param {keyname}     [false string] 	关键字模糊查询
			 * @param {monthno}     [false string] 	月份
			 */
			const params = {
				// cwscd: engineeringValue,
				cwscd: '',
				bjid: '',
				adcd: '',
				yearno,
				keyname,
				monthno
			};
			return getLhbjList(params, that).then((results = {}) => {
				const { status, data } = results;

				if (status) {
					const { tabIndex } = that;
					const list = Array.isArray(data) ? data : [];
					that.tabsList[tabIndex].list = list;
				}
			});
		},
		// 获取 管道监测列表
		getGdjcdList_(num = 1) {
			const that = this;

			const { tabIndex, tabsList } = that;
			const { monitors, monitorValue, keyname, date } = tabsList[tabIndex];
			let [stm = '', etm = ''] = date || [];
			stm = stm.toLocaleDateString().replace(/\//g, '-');
			etm = etm.toLocaleDateString().replace(/\//g, '-');
			const res = Array.isArray(monitors)
				? monitors.filter((item = {}) => {
						if (item.stcd === monitorValue) return true;
						return false;
				  })
				: [];
			const [{ jctype = '' }] = res[0] ? res : [{}];
			that.tabsList[tabIndex].columns = [
				{
					key: 1,
					id: 1,
					name: '时间'
				},
				{
					key: 2,
					id: 2,
					name: '管道'
				},
				{
					key: 3,
					id: 3,
					name: '监测值'
				}
			];
			/**
			 * 获取管道监测点数据列表
			 * @param {keyname}      	[false string] 	关键字模糊查询
			 * @param {stJcType}      	[true string] 	监测对象类型
			 * @param {stm}    			[true string] 	开始日期
			 * @param {etm}      		[true string] 	结束日期
			 * @param {stcd}      		[true string] 	监测点编号
			 */
			const params = {
				keyname,
				stJcType: jctype,
				stm,
				etm,
				stcd: monitorValue
			};
			return getGdjcdList(params, that).then(res => {
				let { data } = res;
				data = data && data.length > 0 ? data : [];
				that.tabsList[5].list = data;
			});
		},
		// 更新 水厂的监测数据
		updateWaterFactory() {
			const that = this;

			const { tabIndex, tabsList } = that;
			const { flag } = tabsList[tabIndex];
			const { payload = {} } = that.listModel;
			const {
				stcd,
				tm,
				jctype,
				// q, wgage, rz, chl, ph, turb,
				_value,
				isDisabled
			} = payload;
			if(isDisabled) return that.$message.warning('当前水表读数小于上期水表读数');
			that.listModel.visible = false;
			/**
			 * 修改监测数据
			 * @param stcd 		测点编号
			 * @param tm   		监测时间（改字段不可在界面上修改）
			 * @param jctype 	监测类型：1.水质2.水压3.流量，4水位
			 * @param q 		瞬时流量 ，修改流量值时填
			 * @param wgage 	压力值 修改压力的时候传
			 * @param rz 		水位
			 * @param chl 		余氯(mg/L) 修改 水质 余氯(mg/L)的时候传
			 * @param ph 		pH值 修改 水质 ph 的时候传
			 * @param turb 		浊度 修改 水质 浊度值的时候传
			 */
			const params = {
				stcd,
				tm,
				jctype
				// q,
				// wgage,
				// rz,
				// chl,
				// ph,
				// turb
			};
			// 水压监测点
			if (jctype === '1') {
				flag === '1' &&
					Object.assign(params, {
						turb: _value
					});
				flag === '2' &&
					Object.assign(params, {
						chl: _value
					});
			}
			if (jctype === '2') {
				Object.assign(params, {
					wgage: _value
				});
			}
			if (jctype === '3') {
				Object.assign(params, {
					q: _value
				});
			}
			if (jctype === '4') {
				Object.assign(params, {
					rz: _value
				});
			}
			updScjcData(params, that)
				.then((results = {}) => {
					const { status } = results;
					console.info(results);
					if (status) {
						that.$message.success('修改成功！');
					} else {
						that.$message.error('修改成功！');
					}
				})
				.catch(e => console.warn(e));
		},
		getGcglList_(type = '1') {
			const that = this;

			if (that) {
				return new Promise((resolve, reject) => {
					resolve(true);
				});
			}
			/**
			 * @desc 获取站点列表
			 * @param type   当前站点的类型
			 * @private
			 * @type '1':水厂,'2':水库，‘3’:泵站，‘4’：蓄水池，‘5’：联户表井
			 */
			return new Promise((resolve, reject) => {
				getGcglList(
					{
						prtype: type
					},
					that
				).then(res => {
					let { data } = res;
					let { list } = data;
					list = list && list.length > 0 ? list : [];

					let mapList = [];
					list.map(val => {
						mapList.push({
							label: val.prtypenm,
							value: val.prcd
						});
					});

					switch (type) {
						case '1':
							that.tabsList[0].waterWorks = [...mapList];
							that.tabsList[0].waterWorkValue = mapList.length > 0 ? mapList[0].value : '';
							break;
						case '2':
							that.tabsList[1].reservoirs = [...mapList];
							that.tabsList[1].reservoirValue = mapList.length > 0 ? mapList[0].value : '';
							break;
						case '3':
							that.tabsList[2].pumpingStations = [...mapList];
							that.tabsList[2].pumpingStationValue = mapList.length > 0 ? mapList[0].value : '';
							break;
						case '4':
							that.tabsList[3].cisterns = [...mapList];
							that.tabsList[3].cisternValue = mapList.length > 0 ? mapList[0].value : '';
							break;
					}
					resolve();
				});
			});
		},

		/**
		 *
		 * @param val  获取当前切换的值 注意 当监测类型为1.水质3.流量时有效，其他隐藏
		 */

		getSource_waterFactory(val) {
			let flag = val;

			switch (flag) {
				case '1':
					this.siteTyleList = [
						{
							label: '水质',
							value: '1'
						},
						{
							label: '流量',
							value: '2'
						}
					];
					break;
				case '2':
					this.siteTyleList = [
						{
							label: '水质',
							value: '1'
						},
						{
							label: '流量',
							value: '2'
						},
						{
							label: '水压',
							value: '3'
						},
						{
							label: '水位',
							value: '4'
						}
					];
					break;
			}
		},

		/**
		 *
		 * @param val  切换当前的 水厂下不同检测项的 图表
		 */

		showThisChart_waterFactory(val) {
			console.warn(val);
			// this._drawCategory0();
			this.onHandleChangeMonitor();
		},

		/**
		 *
		 * @param val  切换当前的 水库下不同检测项的 图表
		 */

		showThisChart_reservoir(val) {
			this._drawCategory1();
		},

		/**
		 *
		 * @param val 当前的 年月  联户表井
		 */

		getThisMonth_userDev(e) {
			const that = this;
			// e.preventDefault();
			// e.stopPropagation();
			that.onHandleTabChange(4);
		}
	},
	created() {
		const end = new Date();
		const start = new Date();
		start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);

		this.tabsList.forEach((val, index) => {
			if (index != 4) {
				val.date = [start, end];
			} else {
				val.date = start;
			}
		});
	}
};
</script>

<style scoped="scoped" lang="scss">
.data {
	width: 100%;
	height: 100%;

	overflow-y: auto;
}

.article {
	.handle,
	.table {
		padding: 16px;
	}

	.handle {
		display: flex;
		justify-content: space-between;
		align-items: center;

		/deep/ .el-form--inline {
			* {
				vertical-align: middle;
				line-height: initial !important;
			}
		}

		/deep/ .el-date-editor .el-range-separator {
			width: auto;
		}

		.el-form-item {
			margin-bottom: 16px;
		}
	}

	.chart {
		position: relative;
		width: 100%;
		height: 100%;
		padding-right: 16px;
		padding-left: 16px;

		.category {
			width: calc(100% - 32px);
			width: 100%;
			height: 400px;
			overflow: hidden;
		}

		.chart-radios {
			position: absolute;
			top: 10px;
			right: 20px;
		}
	}

	.table {
		padding: 0 16px 16px;

		/deep/ .el-table th {
			background-color: #f0f1f1;
			color: #333;
		}

		a {
			text-decoration: none;
			color: #187cea;

			+ a {
				margin-left: 8px;
			}
		}
	}
}

.fnModel {
	/deep/ .model {
		height: 300px !important;
	}
}
.waterMeter {
	/deep/ .model {
		height: 500px !important;
	}
}

.fnModel,
.waterMeter {
	.modelWraper {
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
			// height: 100%;

			/deep/ .el-form-item {
				margin-bottom: 8px;
			}
		}
	}
}
</style>
