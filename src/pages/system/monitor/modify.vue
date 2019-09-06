<template>
	<div id="addBase">
		<div class="top-actions">
			<div class="back"><span class="go-back" @click="goback">返回</span></div>
		</div>
		<div class="wraper">
			<div class="select-items" v-if="toggoleShowProModel">
				<div class="top-head">
					<span>监测项选择</span>
					<i @click="closeProgects" class="el-icon-close"></i>
				</div>
				<div class="projects">
					<div class="item" v-for="(item, index) in selectProject" :key="index" @click="selectSub_item(index, item.code)">
						<span class="circle" :class="{ actived: item.itemFlag == true }"></span>
						<span class="noWrap" :title="item.name">{{ item.name }}</span>
					</div>
				</div>
			</div>
			<div class="top-head">
				<span>{{ postData.moniType | fortmateType }}</span>
			</div>
			<div class="main-content">
				<div class="params-item">
					<div class="sun-head"><span>基础信息</span></div>
					<div class="row">
						<div class="col">
							<span class="required">*</span>
							<span>测点编码:</span>
						</div>
						<div class="col two-com">
							<el-input :disabled="ifFromEdit" clearable placeholder="请输入监测点编码" @blur="getSiteCodeChange" v-model="postData.stcd"></el-input>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<span class="required">*</span>
							<span>测点名称:</span>
						</div>
						<div class="col"><el-input clearable placeholder="测点名称" v-model="postData.name" @change="get_name_len"></el-input></div>
					</div>
					<div class="row">
						<div class="col"><span>监测项类型:</span></div>
						<div class="col">
							<el-radio :disabled="ifFromEdit" v-model="postData.moniType" @change="showThisRadio" label="3">流量</el-radio>
							<el-radio :disabled="ifFromEdit" v-model="postData.moniType" @change="showThisRadio" label="2">水压</el-radio>
							<el-radio :disabled="ifFromEdit" v-model="postData.moniType" @change="showThisRadio" label="1">水质</el-radio>
							<el-radio :disabled="ifFromEdit" v-model="postData.moniType" @change="showThisRadio" label="4">水位</el-radio>
							<el-radio :disabled="ifFromEdit" v-model="postData.moniType" @change="showThisRadio" label="5">视频</el-radio>
						</div>
					</div>
					<!--<div class="row">
						<div class="col"><span>数据标识:</span></div>
						<div class="col">
							<el-input placeholder="数据标识" clearable v-model="postData.dataCode"
									  @change="get_dataCode_len"></el-input>
						</div>
					</div>-->
					<div class="row">
						<div class="col">
							<span>
								<span class="required">*</span>
								状态:
							</span>
						</div>
						<div class="col">
							<el-radio v-model="postData.isValid" label="1">启用</el-radio>
							<el-radio v-model="postData.isValid" label="2">停用</el-radio>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<span class="required">*</span>
							<span>监测仪器编号:</span>
						</div>
						<div class="col"><el-input placeholder="请输入检测仪器编号" clearable v-model="postData.deviceCode" @change="get_deviceCode_len"></el-input></div>
					</div>
					<div class="row">
						<div class="col">
							<span class="required">*</span>
							<span>经度:</span>
						</div>
						<div class="col"><el-input v-model="postData.lgtd" @change="isLgtd($event, 'lgtd')" placeholder="请输入经度"></el-input></div>
					</div>
					<div class="row">
						<div class="col">
							<span class="required">*</span>
							<span>纬度:</span>
						</div>
						<div class="col"><el-input v-model="postData.lttd" @change="isLttd($event, 'lttd')" placeholder="请输入维度"></el-input></div>
					</div>
					<!-- <div class="row">
                        <div class="col"><span>重要站点:</span></div>
                        <div class="col">
                            <el-radio v-model="postData.importantFlag" label="1">是</el-radio>
                            <el-radio v-model="postData.importantFlag" label="2">否</el-radio>
                        </div>
                    </div> -->
					<template v-if="postData.moniType !== '9'">
						<template v-if="postData.moniType !== '4' && postData.moniType !== '5'">
							<div class="row">
								<div class="col"><span>进出水标识:</span></div>
								<div class="col">
									<el-radio :disabled="ifFromEdit" v-model="postData.inOut" label="1">进厂</el-radio>
									<el-radio :disabled="ifFromEdit" v-model="postData.inOut" label="2">出厂</el-radio>
								</div>
							</div>
						</template>
						<div class="row">
							<div class="col"><span>关联工程类型:</span></div>
							<div class="col">
								<el-radio :disabled="ifFromEdit" v-model="devItem" @change="getProjectList" label="1">水厂</el-radio>
								<el-radio :disabled="ifFromEdit" v-model="devItem" @change="getProjectList" label="2">水库</el-radio>
								<el-radio :disabled="ifFromEdit" v-model="devItem" @change="getProjectList" label="3">泵站</el-radio>
								<el-radio :disabled="ifFromEdit" v-model="devItem" @change="getProjectList" label="4">蓄水池</el-radio>
								<el-radio :disabled="ifFromEdit" v-model="devItem" @change="getProjectList" label="5">联户表井</el-radio>
								<el-radio :disabled="ifFromEdit" v-model="devItem" @change="getProjectList" label="6">管线</el-radio>
							</div>
						</div>
						<div class="row">
							<div class="col"><span>工程列表:</span></div>
							<div class="col">
								<el-select :disabled="ifFromEdit" v-model="postData.prcode" placeholder="请选择工程站点">
									<el-option v-for="item in prijectSiteList" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<span>所在地:</span>
							</div>
							<div class="col"><el-input placeholder="请输入所在地" clearable v-model="postData.loc"></el-input></div>
						</div>
					</template>
				</div>
				<template v-if="postData.moniType == '1'">
					<div class="params-item">
						<div class="detectionItem"><span @click="showProgectsModel">选择监测项</span></div>
						<div class="detectionList">
							<table class="innerTable">
								<thead>
									<tr>
										<th><span>监测项</span></th>
										<th><span>正常范围</span></th>
										<th style="width: 80px"><span>操作</span></th>
									</tr>
								</thead>
								<tbody>
									<template v-for="(item, i) in selectProject">
										<tr :key="item.code" v-if="item.itemFlag == true">
											<td>
												<span>{{ item.name }}</span>
											</td>
											<td>
												<template v-if="item.name == '浊度'">
													<el-input
														style="width:calc(100% - 60px)"
														v-model="item.vmax"
														@change="ifValid($event, i + '-vmax')"
														placeholder="最大值"
													></el-input>
													(NTU)
												</template>
												<template v-if="item.name == '余氯'">
													<el-input
														style="width:calc(100% - 60px)"
														v-model="item.vmax"
														@change="ifValid($event, i + '-vmax')"
														placeholder="最大值"
													></el-input>
													(mg/L)
												</template>
												<template v-if="item.name == 'PH'">
													<el-input
														style="width:calc(50% - 60px)"
														v-model="item.vmin"
														@change="ifValid($event, i + '-vmin')"
														placeholder="最小值"
													></el-input>

													<span>~</span>
													<el-input
														style="width:calc(50% - 60px)"
														v-model="item.vmax"
														@change="ifValid($event, i + '-vmax')"
														placeholder="最大值"
													></el-input>
												</template>
											</td>
											<td @click="delSelf(i, 'selectList')"><span class="delBtn">删除</span></td>
										</tr>
									</template>
								</tbody>
							</table>
						</div>
					</div>
				</template>
				<div class="params-item">
					<template v-if="postData.moniType == '2'">
						<div class="sun-head"><span>预警信息</span></div>
						<div class="row">
							<div class="col"><span>水压上限:</span></div>
							<div class="col times">
								<el-input placeholder="水压" @change="ifValid($event, 'vmax')" v-model="postData.vmax" clearable></el-input>
								MPa
							</div>
						</div>
						<div class="row">
							<div class="col"><span>水压下限:</span></div>
							<div class="col times">
								<el-input placeholder="水压" @change="ifValid($event, 'vmin')" v-model="postData.vmin" clearable></el-input>
								MPa
							</div>
						</div>
						<div class="row">
							<div class="col"><span>水压突变:</span></div>
							<div class="col only-input">
								<el-input placeholder="水压突变" @change="ifValid($event, 'sblxsz')" v-model="postData.sblxsz" clearable></el-input>
								MPa
							</div>
						</div>
					</template>
					<template v-if="postData.moniType == '3'">
						<div class="sun-head"><span>预警信息</span></div>
						<div class="row">
							<div class="col"><span>流量上限:</span></div>
							<div class="col times">
								<el-input placeholder="流量" v-model="postData.vmax" @change="ifValid($event, 'vmax')" clearable></el-input>
								m³/s
							</div>
						</div>
						<div class="row">
							<div class="col"><span>流量下限:</span></div>
							<div class="col times">
								<el-input placeholder="流量" v-model="postData.vmin" @change="ifValid($event, 'vmin')" clearable></el-input>
								m³/s
							</div>
						</div>
						<div class="row">
							<div class="col"><span>流量突变:</span></div>
							<div class="col only-input">
								<el-input placeholder="流量突变" @change="ifValid($event, 'sblxsz')" v-model="postData.sblxsz" clearable></el-input>
								m³/s
							</div>
						</div>
					</template>
					<template v-if="postData.moniType == '4'">
						<div class="sun-head"><span>预警信息</span></div>
						<div class="row">
							<div class="col"><span>水位上限:</span></div>
							<div class="col times">
								<el-input placeholder="水位" v-model="postData.vmax" @change="ifValid($event, 'vmax')" clearable></el-input>
								&nbsp;&nbsp;m
							</div>
						</div>
						<div class="row">
							<div class="col"><span>水位下限:</span></div>
							<div class="col times">
								<el-input placeholder="水位" v-model="postData.vmin" @change="ifValid($event, 'vmin')" clearable></el-input>
								&nbsp;&nbsp;m
							</div>
						</div>
						<div class="row">
							<div class="col"><span>水位突变:</span></div>
							<div class="col only-input">
								<el-input placeholder="水位突变" @change="ifValid($event, 'sblxsz')" v-model="postData.sblxsz" clearable></el-input>
								m
							</div>
						</div>
					</template>
					<div class="row">
						<div class="col"><span>设备离线时长:</span></div>
						<div class="col only-input">
							<el-input v-model="postData.deviceOffline" @change="ifValid($event, 'deviceOffline')" placeholder="设备离线时长" clearable></el-input>
							h
						</div>
					</div>
				</div>
			</div>
			<div class="actions">
				<!-- <span class="save" @click="saveConfigData">保存</span> -->
				<span class="save" @click="onHandleUpdateMonitor">保存</span>
				<span class="cancel" @click="goBack_">取消</span>
			</div>
			<dse-save-status :showModel="ifShowModel" :content="fetchContent" @delThis="closeModel" :type="modelType" :flag="status" @sureDelThis="configDel" />
		</div>
	</div>
</template>

<script>
import DseSaveStatus from '../../../common/components/toast/DseSaveStatus';
import Valid from '@/utils/inputs_valid';

import { getGcByAreaCode } from '../../../api/interfaces/dataManage_api';
import { getDictListByValues, saveOrUpStJcdB, wrPumpBCtrlCheckExist } from '../../../api/interfaces/system_api';

export default {
	components: { DseSaveStatus },
	data() {
		return {
			title: '编辑监测点',
			getTips_up: '', //placehoder
			getTips_down: '', //placehoder
			ifFromEdit: false, //是否从编辑中来
			ifShowModel: false,
			fetchContent: '',
			modelType: true,
			status: null,
			map: null,
			view: null,
			layer1: null, // 管网
			toggoleShowGisModel: false, //gis 获取经纬度的弹窗
			toggoleShowProModel: false, //选择项的弹窗
			comeFrme_editID: '', //来自编辑的id
			devItem: '', // 关联工程的ID
			changeSiteCodeFlag: false, //默认 没有更改测站编码，等更改后需要验证有效性
			postData: {
				stcd: '', //站点编码
				name: '',
				pipeCode: '',
				lgtd: '',
				lttd: '',
                loc: '',
				depth: '',
				altitude: '',
				deviceCode: '',
				moniType: '',
				dataCode: '',
				isValid: '1',
				deviceOffline: 3.0,
				importantFlag: '1', //是否是重要站点
				vtx: '00:24', // 时间域
				vmax: '', // 监测值上限
				vmin: '', //监测值下限
				sblxsz: '', //监测值突变
				inOut: '1', //进出水标识
				prcode: '', //关联工程编码
				stWarnBList: [] // 水质监测点被选中列表
			},
			temp_offTime: 3.0, //缓存下线时间
			xy: {
				gtd_formate: '',
				lttd_formate: ''
			},
			selectProject: [], //待检测的 水质监测项
			showSubList_index: null, //点击展示某个分类的下级列表
			showSubList_item_index: null, //下级列表的文件索引
			endTime: '',
			getTips: '', //输入框提示
			fromEditList: [], //来自编辑的检测项列表
			valid_number: true, // 离线时长的输入校验
			fromActived_index: 0, //来至哪个索引
			prijectSiteList: [] //站点的 列表
		};
	},
	methods: {
		_submit() {},
		goback() {
			this.$router.push({
				name: 'systemMonitor'
			});
			this.$store.commit('set_asideStatus', true);
			this.$emit('showAside');
		},
		closeModel(val) {
			this.ifShowModel = val.modelFlag;
		},
		configDel(obj) {
			this.deleteCommonInfo_(obj.num);
		},
		closeProgects() {
			this.toggoleShowProModel = false;
		},
		showProgectsModel() {
			this.toggoleShowProModel = true;
		},
		filterActiveItem() {
			let temp_arr = this.selectProject;
			// let that = this;
			let temp = [];
			if (temp_arr.length > 0) {
				for (let i = 0; i < temp_arr.length; i++) {
					if (temp_arr[i].itemFlag) {
						let temp_json = {};
						temp_json['id'] = temp_arr[i].id;
						temp_json['name'] = temp_arr[i].name;
						temp_json['value'] = temp_arr[i].value;
						temp_json['code'] = temp_arr[i].code;
						temp.push(temp_json);
					}
				}
			}
			return temp;
		},
		save() {
			let that = this;
			if (!this.valid_number) {
				this.$message.error('请输入数字或者带有小数的数字!');
				return;
			}
			let postData_ = this.postData;
			if (postData_.pipeCode == '') {
				this.$message.error('请在管线上拾取坐标点!');
				return;
			}
			if (postData_.name == '' || postData_.name == '' || postData_.deviceCode == '' || postData_.dataCode == '' || postData_.deviceOffline == '') {
				this.$message.error('请输入完整!');
				return;
			}

			let post_arr = this.filterActiveItem();
			this.postData.baseinfEntityList = [...post_arr, ...that.fromEditList];
			this.postData.deviceOffline = parseFloat(that.postData.deviceOffline);
			if (!this.ifFromEdit) {
				this.addMonitor_(postData_);
			} else {
				postData_['id'] = that.comeFrme_editID;
				this.updateMonitor_(postData_);
			}
		},
		// 经纬度 转度分秒
		formate_xy(val) {
			let temp_value = parseFloat(val);
			let du = parseInt(temp_value);
			let fen = parseInt((parseFloat(temp_value) - du) * 60);
			let miao = parseInt((temp_value - du - fen / 60) * 60 * 10000) / 10000;
			temp_value = du + '°' + fen + '′' + miao + '″';
			return temp_value;
		},
		showSub(index) {
			let temp_arr = [...this.selectProject];
			temp_arr[index].showSubListFlag = !temp_arr[index].showSubListFlag;
			this.selectProject = [...temp_arr];
		},
		delCommonItem(code) {
			let that = this;
			let temp_fromEditList = this.fromEditList;
			for (let i = 0; i < temp_fromEditList.length; i++) {
				if (temp_fromEditList[i].code == code) {
					that.fromEditList.splice(i, 1);
					break;
				}
			}
		},
		selectSub_item(index, code) {
			let temp_arr = [...this.selectProject];
			temp_arr[index].itemFlag = !temp_arr[index].itemFlag;
			this.selectProject = [...temp_arr];
			this.delCommonItem(code);
		},
		isNUll(arr) {
			let temp = arr;
			let flag = 0;
			if (arr.length > 0) {
				for (let i = 0; i < temp.length; i++) {
					if (temp[i].MAXVALUE != '' && temp[i].MINVALUE != '') {
						flag += 1;
					}
				}
			}
			return flag == temp.length;
		},
		// 更新 监测站点配置
		save_() {
			let that = this;

			if (this.changeSiteCodeFlag) {
				this.$message.warning('监测点编码无效，请重新输入!');
				return;
			}

			if (!this.postData.moniType) {
				this.$message.error('请选择一个监测类型!');
				return;
			}

			if (!this.postData.name) {
				this.$message.error('测点名称不能为空!');
				return;
			}

			// if(!this.postData.dataCode){
			// 	this.$message.error('数据标识不能为空!');
			// 	return;
			// }

			if (!this.postData.deviceCode) {
				this.$message.error('监测仪器编号不能为空!');
				return;
			}
			// if(!this.devItem){
			// 	this.$message.error('关联工程类型不能为空!');
			// 	return;
			// }
			// if(!this.postData.prcode){
			// 	this.$message.error('请选择一个工程!');
			// 	return;
			// }

			if (!this.postData.stcd) {
				this.$message.error('站点编号不能为空!');
				return;
			}

			if (!this.postData.lgtd || !this.postData.lttd) {
				this.$message.error('经纬度不能为空!');
				return;
			}

			if (this.postData.moniType == '2' || this.postData.moniType == '3') {
				let flag = true;
				if (this.postData.vmax) {
					flag = new Valid().isNumber(that.postData.vmax);
				}
				if (this.postData.vmin) {
					flag = new Valid().isNumber(that.postData.vmin);
				}
				if (this.postData.vmin && that.postData.vmax) {
					if (parseFloat(that.postData.vmin) > parseFloat(that.postData.vmax)) {
						flag = false;
					}
				}
				if (!flag) {
					this.$message.error('您输入的最大最小值有误!');
					return;
				}
			}
			this.updateMonitor_(that.postData);
		},
		goBack_() {
			this.goback();
		},

		delSelf(i, type) {
			if (type == 'edit') {
				this.fromEditList[i].itemFlag = false;
			} else {
				this.selectProject[i].itemFlag = false;
			}
		},
		showThisRadio(val) {
			this.postData.moniType = val;
		},
		// 过滤出 选中的 列表项
		filter_params() {
			let that = this;
			let list = that.selectProject.filter(val => {
				return val.itemFlag;
			});
			let temp_list = [];

			let flag = true;

			for (let i = 0; i < list.length; i++) {
				if (list[i].vmin && list[i].vmax) {
					let min = parseFloat(list[i].vmin);
					let max = parseFloat(list[i].vmax);
					if (min > max) {
						flag = false;
						that.$message.error(`第${i}行中，最大值不能小于最小值`);
						break;
					}
				}
			}

			list.map(val => {
				let bjf = '';
				//比较符类型：1,<=小于等于2 >=大于等于 3 BETWEEN
				if (val.value == '5') {
					// ph
					bjf = '3';
				} else if (val.value == '6' || val.value == '7') {
					// 浊度 或者/余氯
					bjf = '1';
				} else {
					bjf = '';
				}

				temp_list.push({
					jctype: val.value,
					stcd: that.postData.stcd,
					bjftype: bjf,
					sblxsz: '',
					tbjx: '',
					vtx: '00:24',
					vmin: val.vmin,
					vmax: val.vmax
				});
			});

			return { flag: flag, list: temp_list };
		},
		updateMonitor_(params) {
			let that = this;
			let temp_data = {
				stcd: that.postData.stcd,
				stnm: that.postData.name,
				lgtd: '' + that.postData.lgtd,
				lttd: '' + that.postData.lttd,
                loc: ''+ that.postData.loc,
				prtype: that.devItem,
				dataCode: that.postData.dataCode,
				deviceCode: that.postData.deviceCode,
				usfl: that.postData.isValid,
				iszyzd: that.postData.importantFlag,
				jctype: that.postData.moniType,
				prcode: that.postData.prcode,
				jzbw: that.postData.inOut
			};

			if (this.postData.moniType == '1') {
				let tempObj = this.filter_params();
				if (tempObj.flag) {
					temp_data.stWarnBList = [...tempObj.list];
					temp_data.stWarnBList.map(val => {
						val.tbjx = that.postData.deviceOffline;
					});
				} else {
					return;
				}
			} else if (this.postData.moniType == '2' || this.postData.moniType == '3' || this.postData.moniType == '4') {
				temp_data.stWarnBList = [
					{
						vtx: '00:24',
						vmax: that.postData.vmax,
						vmin: that.postData.vmin,
						sblxsz: that.postData.sblxsz,
						tbjx: that.postData.deviceOffline,
						jctype: that.postData.moniType,
						stcd: that.postData.stcd,
						bjftype: '3'
					}
				];
			} else {
				temp_data.stWarnBList = [];
			}

			saveOrUpStJcdB(temp_data).then(res => {
				that.ifShowModel = true;
				that.status = res.status == 1;

				console.log(that.status);

				that.fetchContent = res.msg;
				if (res.status == 1) {
					setTimeout(() => {
						that.$router.go(-1);
						that.$emit('showAside');
					}, 2500);
				}
			});
		},
		delSelf_fromEdit(index) {
			this.fromEditList.splice(index, 1);
		},
		ifValid(e, type) {
			let temp = e;
			let flag = new Valid().isNumber(temp);
			this.valid_number = flag;
			let typeList = type.split('-');
			if (typeList.length == 1) {
				if (!flag) {
					this.$message.error('请输入带有小数点的数字 例如 3.2');
					this.postData[type] = '';
				}
			} else {
				if (!flag) {
					this.$message.error('请输入带有小数点的数字 例如 3.2');
					let temp_index = parseInt(typeList[0]);
					this.selectProject[temp_index][typeList[1]] = '';
				}
			}

			return flag;
		},
		get_name_len(val) {
			let temp_value = val;
			if (val == '') {
				this.$message.warning('输入不能为空!');
				return;
			}
			let temp_len = temp_value.length;
			if (temp_len > 25) {
				this.$message.warning('输入的文字不能超过25个字!');
				temp_value = temp_value.substring(0, 25);
			}
			this.postData.name = temp_value;
		},
		get_dataCode_len(val) {
			let temp_value = val;
			if (val == '') {
				this.$message.warning('输入不能为空!');
				return;
			}
			let temp_len = temp_value.length;
			if (temp_len > 50) {
				temp_value = temp_value.substring(0, 30);
			}
			this.postData.dataCode = temp_value;
		},
		get_deviceCode_len(val) {
			let temp_value = val;
			if (val == '') {
				this.$message.warning('输入不能为空!');
				return;
			}
			let temp_len = temp_value.length;
			if (temp_len > 50) {
				temp_value = temp_value.substring(0, 30);
			}
			this.postData.deviceCode = temp_value;
		},
		// 执行 保存操作
		onHandleUpdateMonitor() {
			this.save_();
		},
		// 判断当前的字符是否是合法的 小数
		isFloat(e, type) {
			console.log(e, type);
			if (e) {
				let flag = new Valid().isFloat(e);
				if (!flag) {
					this.postData[type] = '';
				}
			}
		},
		// 判断当前的站点编码是否 在数据库中有重复
		check_codeValidate() {
			let that = this;
			let val = this.postData.stcd;
			wrPumpBCtrlCheckExist(
				{
					stcd: val
				},
				that
			).then(res => {
				let { status } = res;
				if (status != 1) {
					that.postData.stcd = '';
					that.$message.error('编码已存在，请重新写入!');
				} else {
					that.changeSiteCodeFlag = false;
					that.$message.success('编码有效!');
				}
			});
		},
		//  获取当前用户的 不同站点类型下的 站点列表

		/**
		 *
		 * @param typeList  []<String>
		 * @private
		 */

		getGcByAreaCode_(typeList, currentValue) {
			let that = this;
			let temp_code = '6403';
			getGcByAreaCode(
				{
					code: temp_code,
					prtypeList: [...typeList]
				},
				that
			).then(res => {
				let { data } = res;
				data = data && data.length > 0 ? data : [];
				let temp_list = [];
				data.map(val => {
					temp_list.push({
						label: val.gcname,
						value: val.gccd
					});
				});
				that.prijectSiteList = [...temp_list];

				if (temp_list.length > 0) {
					if (currentValue) {
						that.postData.prcode = currentValue;
					} else {
						that.postData.prcode = temp_list[0].gccd;
					}
				} else {
					that.postData.prcode = '';
				}
			});
		},

		// 切换工程类型 获取工程列表
		getProjectList(v) {
			this.getGcByAreaCode_(v, '');
		},

		// 检查 站点编码是否有改动
		getSiteCodeChange(event) {
			this.changeSiteCodeFlag = true;
			let temp_val = event.target.value;
			let flag = new Valid().isNotHan(temp_val);
			if (!flag) {
				this.postData.stcd = '';
				this.$message.error('请输入非汉字的字符!');
				return;
			}
			this.check_codeValidate();
		},

		// 获取水质检测项
		getDictListByValues_(list = []) {
			let that = this;
			getDictListByValues(
				{
					code: 'ST_SZ_JCX'
				},
				that
			).then(res => {
				let { data } = res;
				data = data && data.length > 0 ? data : [];

				data.map((val, index) => {
					val.itemFlag = false;
					val.vmin = null;
					val.vmax = null;
				});
				for (let i = 0; i < data.length; i++) {
					for (let j = 0; j < list.length; j++) {
						if (data[i].value == list[j].jctype) {
							data[i].itemFlag = true;
							data[i].vmin = list[j].vmin;
							data[i].vmax = list[j].vmax;
						}
					}
				}

				that.selectProject = data;
			});
		},

		// 校验经度
		isLgtd(val, type) {
			let temp = val;
			let flag = new Valid().isLgtd(temp);
			this.valid_number = flag;
			if (!flag) {
				this.$message.error('您输入的经度有误!');
				this.postData[type] = '';
			}

			return flag;
		},
		// 校验维度
		isLttd(val, type) {
			let temp = val;
			let flag = new Valid().isLttd(temp);
			this.valid_number = flag;
			if (!flag) {
				this.$message.error('您输入的维度有误!');
				this.postData[type] = '';
			}
			return flag;
		}
	},
	computed: {
		timeList() {
			let time = [];
			return time;
		}
	},
	filters: {
		fortmateType(val) {
			let temp = val;
			switch (val) {
				case '1':
					temp = '水质';
					break;
				case '2':
					temp = '水压';
					break;
				case '3':
					temp = '流量';
					break;
				case '4':
					temp = '水位';
					break;
				case '5':
					temp = '视频';
					break;
			}
			return temp;
		},
		formate_unit(val) {
			let temp = val;
			switch (val) {
				case '2':
					temp = 'MPa';
					break;
				case '3':
					temp = 'm³/s';
					break;
			}
			return temp;
		},
		formate_monitorType(val) {
			let temp = val;
			switch (val) {
				case '5':
					temp = 'PH';
					break;
				case '6':
					temp = '浊度';
					break;
				case '7':
					temp = '余氯';
					break;
			}
			return temp;
		}
	},
	created() {
		let temp = this.$route.params;
		console.log(temp);
        const that = this;
		if (temp) {
			this.ifFromEdit = this.$route.params.disable;
			this.comeFrme_editID = temp.id;
			this.devItem = temp.prtype;
			this.postData = {
				...that.postData,
				moniType: temp.jctype,
				isValid: temp.usfl,
				name: temp.stnm,
				dataCode: temp.dataCode,
				lgtd: temp.lgtd,
				lttd: temp.lttd,
                loc: temp.loc,
				deviceCode: temp.deviceCode,
				pipeCode: '',
				deviceOffline: temp.stWarnBList[0] != null ? temp.stWarnBList[0].tbjx : '',
				prcode: temp.prcode,
				stcd: temp.stcd,
				...(temp.jzbw ? { inOut: temp.jzbw } : {}),
				vmin: temp.stWarnBList[0] != null ? temp.stWarnBList[0].vmin : 0,
				vmax: temp.stWarnBList[0] != null ? temp.stWarnBList[0].vmax : 0,
				sblxsz: temp.stWarnBList[0] != null ? temp.stWarnBList[0].sblxsz : 0,
				stWarnBList: [...temp.stWarnBList]
			};

			this.getGcByAreaCode_(temp.prtype, temp.prcode);
			this.getDictListByValues_(temp.stWarnBList);
		}
	}
};
</script>

<style lang="scss" scoped>
#addBase {
	position: relative;
	width: 100%;
	height: 100%;
	font-size: 14px;
	color: #333;
	background-color: #fff;

	i {
		color: red;
	}

	.required {
		color: red;
	}

	.wraper {
		width: 1200px;
		height: calc(100% - 50px);
		padding: 10px;
		margin: 0 auto;
	}

	.top-actions {
		position: relative;
		width: 100%;
		height: 50px;
		padding: 10px 10px;
		box-shadow: 3px 5px 15px rgba(0, 0, 0, 0.1);
		background-color: #fff;

		.back {
			width: 80px;
			height: 30px;
			position: absolute;
			top: 10px;
			right: 10px;
			z-index: 10;
			text-align: center;
		}
	}

	.top-head {
		width: 100%;

		.tips {
			width: 100%;
			height: 20px;
			display: flex;
			align-items: center;

			span.rect {
				display: inline-block;
				width: 14px;
				height: 14px;
				background: #d6fafa;
				font-weight: 600;
				margin-right: 10px;
			}
		}

		.subInputs {
			width: 100%;
			border-top: 1px solid #ccc;

			.row {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 50px; // padding: 10px 0;
				border-bottom: 1px solid #ccc;

				.col {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100%;
					width: 120px;
					text-align: center;

					&:nth-child(odd) {
						background: #d6fafa;
						line-height: 49px;
					}

					&.short {
						width: 160px !important;
					}

					&:nth-child(even) {
						width: calc(33.33% - 152px);
					}

					.el-input {
						width: 80%;
					}

					.gisBtn {
						display: inline-block;
						padding: 10px 10px;
						background: #0b83fe;
						border-radius: 5px;
						cursor: pointer;
						color: #fff;
						margin-left: 10px;
					}

					img {
						width: 24px;
					}
				}
			}
		}
	}

	.detectionItem {
		width: 100%;
		height: 50px;
		padding: 10px 0;

		span {
			line-height: 30px;
			display: inline-block;
			padding: 0 20px;
			background: #3c9a3e;
			color: #fff;
			border-radius: 5px;
			cursor: pointer;
		}
	}

	.detectionList {
		width: 100%;
		position: relative;
		margin-bottom: 20px;

		span.delBtn {
			display: inline-block;
			padding: 0px 10px;
			line-height: 30px;
			background: #0b83fe;
			border-radius: 5px;
			color: #fff;
			cursor: pointer;
		}
	}

	.getGisPositionModel {
		width: 50%;
		height: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -25%;
		margin-left: -25%;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		z-index: 999;

		.tips {
			width: 100%;
			padding: 0 10px;
			height: 30px;
			background: #0b83fe;
			line-height: 30px;
			text-align: center;
			color: #fff;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			i {
				cursor: pointer;
			}
		}

		#gis {
			width: 100%;
			height: calc(100% - 30px);
		}
	}

	.select-items {
		width: 200px;
		position: absolute;
		min-height: 300px;
		left: 50%;
		top: 50%;
		margin-top: -150px;
		margin-left: -150px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		border-radius: 5px;
		background: #fff;
		z-index: 100;
		font-size: 14px;

		.top-head {
			width: 100%;
			height: 20px;
			background: #0b83fe;
			line-height: 20px;
			color: #fff;
			text-align: center;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 10px;
			font-size: 14px;

			i {
				cursor: pointer;
			}
		}

		.projects {
			width: 100%;
			max-height: 280px;
			overflow-y: auto;

			.item {
				width: 100%;
				padding: 0 10px;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				&:hover {
					background: #e9e9e9;
				}

				height: 20px;

				span:first-child {
					display: inline-block;
					width: 14px;
					height: 14px;
					border: 1px solid #ccc;
					// border-radius: 14px;
					margin-right: 10px;

					&.actived {
						background: url(' ../../../assets/images/common/select.png') no-repeat;
						background-size: 100% 100%;
					}
				}

				span:last-child {
					display: inline-block;
					width: calc(100% - 20px);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}

	.shortInput {
		width: 100%;
		height: calc(100% - 240px);

		.topTips {
			width: 100%;
			height: 30px;
			display: flex;
			align-items: center;

			.rect {
				display: inline-block;
				width: 14px;
				height: 14px;
				background: #d6fafa;
				font-weight: 600;
				margin-right: 10px;
			}
		}

		.subContent {
			width: 100%;
			height: calc(100% - 30px);
			overflow-y: auto;
			display: flex;
			justify-content: space-between;

			// align-items: center;
			.col {
				width: calc(100% - 300px);

				&:last-child {
					width: 300px;
				}

				.row {
					width: 100%;
					height: 60px;
					line-height: 60px;
					display: flex;
					justify-content: space-between;

					& > .col {
						border-left: 1px solid #ccc;
						border-top: 1px solid #ccc;

						&:nth-child(odd) {
							width: 100px;
							text-align: center;
							background: #d6fafa;
							font-weight: 600;
						}

						&:nth-child(even) {
							width: calc(100% - 100px);
							display: flex;
							justify-content: space-around;
						}

						.time-col {
							width: 33.33%;
							display: flex;
							justify-content: space-around;

							border-right: 1px solid #ccc;

							.el-input--suffix {
								width: 80%;
							}

							.el-date-editor {
								width: 44%;
							}
						}
					}

					&:last-child {
						.col {
							border-bottom: 1px solid #ccc;
						}
					}
				}

				.heightRow {
					width: 100%;
					height: 180px;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.col {
						height: 100%;
						line-height: 180px;
						text-align: center;

						&:first-child {
							width: 100px;
							background: #d6fafa;
							font-weight: 600;
						}

						&:last-child {
							width: calc(100% - 100px);
						}

						.el-input {
							width: 80%;
						}
					}
				}
			}
		}

		.footers {
			width: 100%;
			padding: 10px 0;
			display: flex;
			justify-content: center;
			background: #e3e3e3;
			border-radius: 10px;

			span {
				display: inline-block;
				padding: 0px 20px;
				line-height: 40px;
				background: #0b83fe;
				cursor: pointer;
				margin-right: 20px;
				border-radius: 5px;
				color: #fff;
			}
		}
	}

	.top-head {
		height: 50px;
		padding: 10px;
		text-align: center;
		font-size: 18px;
		font-weight: 600;
		border-bottom: 1px solid #ccc;
		margin-bottom: 10px;
	}

	.main-content {
		height: calc(100% - 110px);
		width: 100%;
		overflow-y: auto;

		.params-item {
			width: 100%;

			.sun-head {
				width: 100%;
				height: 30px;
				padding-left: 2em;
				background: #e5ffff;
				text-align: left;
				font-size: 16px;
				line-height: 30px;
				font-weight: 600;
			}

			& > .row {
				width: 100%;
				height: 40px;
				padding: 5px 0;
				line-height: 30px;
				display: flex;
				justify-content: space-between;
				align-items: center;

				& > .col {
					&:nth-child(1) {
						width: 120px;
						line-height: 30px;
						text-align: right;
					}

					&:nth-child(2) {
						width: calc(100% - 140px);

						&.two-com {
							.el-input {
								width: 300px;
							}
						}

						span.get-point {
							cursor: pointer;
							color: #2a91db;
							text-decoration: underline;
						}

						&.times {
							display: flex;
							justify-content: flex-start;
							align-items: center;

							span {
								display: inline-block;
								flex: 1;
								text-align: center;
							}

							.el-input {
								width: 25%;
							}
						}

						&.only-input {
							/*display: flex;*/
							/*justify-content: flex-start;*/
							/*align-items: center;*/

							.el-input {
								width: 25%;
								margin-right: 1em;
							}
						}
					}
				}
			}
		}
	}

	.actions {
		height: 50px;
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;

		span {
			display: inline-block;
			height: 30px;
			line-height: 30px;
			padding: 0 10px;
			cursor: pointer;
			background: #2a91db;
			color: #fff;
			margin-right: 20px;
		}
	}
}
</style>
