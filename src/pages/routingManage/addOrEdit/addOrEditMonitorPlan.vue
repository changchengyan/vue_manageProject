<template>
  <div id="addOrEditMonitorPlan">
    <div class="gis-panel" :style="{width:gisPanelWidth}">
      <div id="gisMap"></div>
    </div>
    <div class="from-panel">
      <dse-toggle-table :innerWidth="360" @toggleFlag="formToggleFlag">
        <div class="form-title">制定巡查计划</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="ruleForm">
          <el-form-item label="巡查名称：" prop="planName">
            <el-input v-model.trim="ruleForm.planName"></el-input>
          </el-form-item>
          <el-form-item label="巡查编号：" prop="plan_code">
            <el-input v-model.trim="ruleForm.plan_code"></el-input>
          </el-form-item>
          <el-form-item label="巡检方式：" prop="inspectMode">
            <el-radio-group v-model="ruleForm.inspectMode">
              <el-radio label="3">汽车</el-radio>
              <el-radio label="2">摩托车</el-radio>
              <el-radio label="0">步行</el-radio>
              <el-radio label="1">自行车</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="巡检人员：" v-model="ruleForm.inspectMode">
            <el-select v-model="ruleForm.inspectMode" placeholder="请选择">
              <el-option
                      v-for="item in tasks"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="管线签到点：">
            <span class="qdd">{{ruleForm.pipePointNum}}个</span>
            <span class="add-btn" @click="addQdd('0')">新增</span>
          </el-form-item>
          <el-form-item label="管线签到点巡检项：">
                 <span class="qdd" v-for="(item,index) in gxqddxjx" :key="index">
                     {{item.item_name}}
                 </span>
          </el-form-item>
          <el-form-item label="工程签到点：">
            <span class="qdd">{{ruleForm.projectPointNum}}个</span>
            <span class="add-btn" @click="addQdd('1')">新增</span>
          </el-form-item>
          <el-form-item label="水源地签到点：">
            <span class="qdd">{{ruleForm.waterPointNum}}个</span>
            <span class="add-btn" @click="addQdd('2')">新增</span>
          </el-form-item>
          <el-form-item label="工程签到点巡检项：">
               <span class="qdd" v-for="(item,index) in gcqddxjx" :key="index">
                   {{item.item_name}}
               </span>
          </el-form-item>

          <div class="pointList">
            <table class="innerTable">
              <thead>
              <tr>
                <th><span>巡检点类型</span></th>
                <th><span>巡检点名字</span></th>
                <th><span>操作</span></th>
              </tr>
              </thead>
              <tbody>
              <template v-if="ruleForm.signPoint&&ruleForm.signPoint.length>0">
                <tr v-for="(val,index) in ruleForm.signPoint" :key="index">
                  <td><span>{{val.pointType |formate_pointType}}</span></td>
                  <td><span>{{val.pointName}}</span></td>
                  <td><span class="del" @click="delThisPoint(index,val.pointName,val.pointType)">删除</span></td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="3"><span>请新增巡检点</span></td>
                </tr>
              </template>

              </tbody>
            </table>
          </div>


          <el-form-item label="任务启用状态：" prop="use_status">
            <el-radio-group v-model="ruleForm.use_status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注：" prop="remarks">
            <el-input type="textarea" v-model.trim="ruleForm.remarks"></el-input>
          </el-form-item>
        </el-form>
        <div class="actions">
          <span class="save" @click="submitForm('ruleForm')">保存</span>
          <span class="cancel" @click="goBack">取消</span>
        </div>
      </dse-toggle-table>
    </div>
    <dse-save-status :showModel="showModel" :content="modelContent" :type="modelType" :flag="modelFlag"
                     @delThis="closePointModel"/>
    <div class="search-list" :style="{opacity:searchPannelFlag?'1':'0'}">
      <div class="top-head">
        <span>待选择的要素点，请选择</span>
      </div>
      <div class="list-search">
        <div class="searchItem" v-for="(val,index) in searchLists" :key="index" @click="searchThis(val)">
          <div class="col">
            <img :src="DSE.static_baseUrl+'/images/symbol/'+val.icon+'.png'" alt="">
            <span>{{val.name}}</span>
          </div>
          <div class="col">
            <i class="el-icon-position"></i>
          </div>
        </div>
      </div>
    </div>
    <dse-gis-model :showFlag="post_newPoint.showFlag" :tips="post_newPoint.tips" :left_="post_newPoint.left_+'px'"
                   :top_="post_newPoint.top_+'px'" @closeModel="cancel_newPoint">
      <el-form :model="post_newPoint" :rules="newPointRules" ref="newPointRule" label-width="120px">
        <el-form-item label="名称：" prop="name">
          <el-input v-model.trim="post_newPoint.name"></el-input>
        </el-form-item>
      </el-form>
      <div class="actions">
        <span class="save" @click="save_newPoint">保存</span>
        <span class='goback' @click="cancel_newPoint">取消</span>
      </div>
    </dse-gis-model>
  </div>
</template>
<script>
  import * as esriLoader from 'esri-loader';
  import DseToggleTable from '../../../common/components/DseToggleTable';
  import DseSaveStatus from '../../../common/components/toast/DseSaveStatus';

  import DseGisModel from '../../../common/components/toast/DseGisModel';
  import {queryEle, updateAttr} from '../../../utils/gisUtils';

  let options = {
    url: window.DSE.arcgis_startJS,
    dojoConfig: window.DSE.gisConfig
  };
  esriLoader.loadCss(window.DSE.arcgis_mainCss);

  // 构造 一个 新的监测点
  let newPoint_func = null;

  // 构造一个 工程签到点
  let newProjectPoint_func = null;

  export default {
    components: {DseGisModel, DseSaveStatus, DseToggleTable},
    name: 'addOrEditMonitorPlan',
    props: ['rowData','operType'],
    data() {
      return {
        view: null,
        map: null,
        newPointLayer: null,
        newProjectPointLayer:null,
        searchLists: [], //待选择的 gis图层
        searchPannelFlag: false, //显示 待选择的 弹窗
        view_new_point: [], //屏幕 新增点的 经纬度
        post_newPoint: {  // 提交点的名字
          name: '',
          top_: '',
          left_: '',
          tips: '新增管线签到点',
          showFlag: false,
          eidtOrdel: true // 默认编辑  或者查看
        },
        init_signPoint:null,
        newPointRules: {
          name: [
            {required: true, message: '请输入巡检点名称', trigger: 'blur'},
            {max: 50, message: '长度最多为50个字符', trigger: 'blur'}
          ],
        },
        gisPanelWidth: 'calc(100% - 360px)',//gis面板的宽度
        gxqddxjx: [],//管线签到点巡检项
        gcqddxjx: [],//工程签到点巡检项
        tasks:[
          {
            value:'1',
            label:'一班组'
          },
          {
            value:'2',
            label:'二班组'
          },
          {
            value:'3',
            label:'三班组'
          },
          {
            value:'4',
            label:'四班组'
          }
        ],
        task:'',
        // 计划ID
        planId: '',
        //表单数据
        ruleForm: {
          planName: '',
          plan_code: '',
          inspectMode: '3',
          waterPointNum:0,
          use_status: '1',
          remarks: '',
          pipePointNum: 0,//管线签到点个数
          projectPointNum: 0,//工程签到点个数
          signPoint: [],//签到点集合
        },
        //表单验证规则
        rules: {
          planName: [
            {required: true, message: '请输入巡检名称', trigger: 'blur'},
            {max: 50, message: '长度最多为50个字符', trigger: 'blur'}
          ],
          plan_code: [
            {required: true, message: '请输入巡检编号', trigger: 'blur'},
            {max: 32, message: '长度最多为32个字符', trigger: 'blur'}
          ],
          inspectMode: [
            {required: true, message: '请选择巡检方式', trigger: 'change'}
          ],
          use_status: [
            {required: true, message: '请选择任务启用状态', trigger: 'change'}
          ],
          remarks: [
            {required: false, message: '请填写备注', trigger: 'blur'},
            {max: 32, message: '长度最多为32个字符', trigger: 'blur'}
          ]
        },
        saveFlag: true,//保存标志 防止二次保存
        //消息弹窗
        modelType: true,//为true,显示保存成功或失败弹窗 ,为false 显示是否删除弹窗
        modelFlag: false,//modelType为 true的情况下 false表示保存失败，true保存成功
        modelContent: '',// 在 modelType 为true的情况下，当前的保存状态  内容从ajax接口中获取
        showModel: false//开关弹窗
      };
    },
    watch: {},
    methods: {
      // 是否进行 管阀模拟
      pipe_ifSimulate_fm(val) {
        this.getPipe_id_fm = val;
      },

      //新增签到点 type:1为管线签到点 2为工程签到点
      addQdd(type) {
        if ('0' === type) {
          this.init_signPoint = '0';
          this.post_newPoint.tips = '新增管线签到点';
        } else if('1' === type) {
          this.init_signPoint = '1';
          this.post_newPoint.tips = '新增工程签到点';
        }else {
          this.init_signPoint = '2';
          this.post_newPoint.tips = '新增水源地签到点';
        }
      },

      //获取巡检项
      getPipeInspectObjectList() {

      },

      //新增签到点 到临时保存点
      save_newPoint() {
        let that = this;
        let temp_json = {};
        temp_json.pointName = this.post_newPoint.name;
        temp_json.lgtd = this.view_new_point[0];
        temp_json.lttd = this.view_new_point[1];
        /*temp_json.planId = this.planId;*/
        if(this.init_signPoint==='0'){
          temp_json.pointType = '0';
        }else{
          temp_json.pointType = '1';
        }
        this.ruleForm.signPoint.push(temp_json);
        this.post_newPoint.showFlag = false;
        // 更新 要素的名字
        if(this.init_signPoint==='0'){
          updateAttr(that.newPointLayer, that.post_newPoint.name);
          this.ruleForm.pipePointNum++;
        }else{
          updateAttr(that.newProjectPointLayer, that.post_newPoint.name);
          this.ruleForm.projectPointNum++;
        }
        setTimeout(()=>{
          that.post_newPoint.name = '';
        },0);


      },
      // 临时删除签到点 到保存点
      cancel_newPoint() {
        let that = this;
        this.post_newPoint.showFlag = false;

        if(this.init_signPoint==='0'){
          let temp_graphic = queryEle(that.map, that.newPointLayer, that.post_newPoint.name);
          that.newPointLayer.remove(temp_graphic);
        }else{
          let temp_graphic = queryEle(that.map, that.newProjectPointLayer, that.post_newPoint.name);
          that.newProjectPointLayer.remove(temp_graphic);
        }
      },
      // 关闭签到点弹窗
      closePointModel(flag) {
        this.post_newPoint.showFlag = false;

      },
      // 删除 签到点
      delThisPoint(index, name,type) {
        let that = this;
        this.ruleForm.signPoint.splice(index, 1);

        if(name ===this.post_newPoint.name){
          this.post_newPoint.showFlag = false;
        }

        if(type==='0'){
          this.ruleForm.pipePointNum--;
          let temp_graphic = queryEle(that.map, that.newPointLayer, name);
          that.newPointLayer.remove(temp_graphic);
        }else{
          this.ruleForm.projectPointNum--;
          let temp_graphic = queryEle(that.map, that.newProjectPointLayer, name);
          that.newProjectPointLayer.remove(temp_graphic);
        }

      },
      //表单提交事件
      submitForm(formName) {
        this.$emit('closeAddOrEdit');
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     this.toSave();
        //   } else {
        //     return false;
        //   }
        // });
      },

      //保存事件
      toSave() {
        if (this.saveFlag) {

          let formData = {
            pjSignNum: this.ruleForm.projectPointNum,
            planName: this.ruleForm.planName,
            planCode: this.ruleForm.plan_code,
            inspectMode: this.ruleForm.inspectMode,
            useStatus: this.ruleForm.use_status,
            remarks: this.ruleForm.remarks,
            signNum: this.ruleForm.pipePointNum,
            signPointList: this.ruleForm.signPoint
          };
          if (this.operType === 'edit') {//编辑
            formData.id = this.rowData.planId;
              let signPointList = [];
              for(let item  of this.ruleForm.signPoint){
                  let signPoint = {
                      pointName: item.pointName,
                      lgtd: item.lgtd,
                      lttd: item.lttd,
                      planId: this.rowData.planId,
                      pointType: item.pointType
                  };
                  signPointList.push(signPoint);
              }
              formData.signPointList = signPointList;

            this.editToUpdate(formData);
          } else {//新增
            this.addToSave(formData);
          }
        }
      },

      //编辑后更新 formData:表单数据
      editToUpdate(formData) {

      },

      //新增后保存 formData:表单数据
      addToSave(formData) {

      },

      //form显示隐藏事件
      formToggleFlag(flag) {
        //设置gisPanel的宽度
        if (flag) {
          this.gisPanelWidth = 'calc(100% - 360px)';
        } else {
          this.gisPanelWidth = '100%';
        }
      },

      //取消事件
      goBack() {
//        this.$router.push({name: 'monitorPlan'});
        this.$emit('closeAddOrEdit');
      },

      //消息弹窗关闭事件
      closeModel(val) {
        // this.showModel = val.modelFlag;
        this.post_newPoint.showFlag = false;
      },
      // 加载 gis
      loadGis() {
        let that = this;
        esriLoader.loadModules(['dojo/on', 'esri/Map', 'esri/views/MapView', 'esri/layers/WebTileLayer', 'esri/layers/GraphicsLayer', 'esri/Graphic', 'esri/symbols/PictureMarkerSymbol', 'esri/geometry/Point', 'esri/geometry/Polyline', 'dojo/domReady!'], options)
          .then(([on, Map, MapView, WebTileLayer, GraphicsLayer, Graphic, PictureMarkerSymbol, Point, Polyline]) => {
            that.map = new Map({
              basemap: {
                baseLayers: [
                  //地形图
                  new WebTileLayer({
                    urlTemplate: 'http://{subDomain}.tianditu.gov.cn/DataServer?T=ter_w&X=${col}&Y=${row}&L=${level}&tk=94aa433732f999e8f30b6a7b0141cbfd',
                    subDomains: ['t0', 't1', 't5', 't6', 't7'],
                    visible: false
                  }),
                  //地形图注记
                  new WebTileLayer({
                    urlTemplate: 'http://{subDomain}.tianditu.gov.cn/DataServer?T=cta_w&X=${col}&Y=${row}&L=${level}&tk=94aa433732f999e8f30b6a7b0141cbfd',
                    subDomains: ['t0', 't1', 't5', 't6', 't7'],
                    visible: false
                  }),
                  //影像图
                  new WebTileLayer({
                    urlTemplate: 'http://{subDomain}.tianditu.gov.cn/DataServer?T=img_w&X=${col}&Y=${row}&L=${level}&tk=94aa433732f999e8f30b6a7b0141cbfd',
                    subDomains: ['t0', 't1', 't5', 't6', 't7'],
                    visible: false
                  }),
                  //影像图注记
                  new WebTileLayer({
                    urlTemplate: 'http://{subDomain}.tianditu.gov.cn/DataServer?T=cia_w&X=${col}&Y=${row}&L=${level}&tk=94aa433732f999e8f30b6a7b0141cbfd',//注记
                    subDomains: ['t0', 't1', 't5', 't6', 't7'],
                    visible: false
                  }),
                  //矢量图
                  new WebTileLayer({
                    urlTemplate: 'http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_w&X=${col}&Y=${row}&L=${level}&tk=94aa433732f999e8f30b6a7b0141cbfd',
                    subDomains: ['t0', 't1', 't5', 't6', 't7'],
                    visible: true
                  }),
                  //矢量图注记
                  new WebTileLayer({
                    urlTemplate: 'http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_w&X=${col}&Y=${row}&L=${level}&tk=94aa433732f999e8f30b6a7b0141cbfd',
                    subDomains: ['t0', 't1', 't5', 't6', 't7'],
                    visible: true
                  })
                ],
              }
            });
            that.view = new MapView({
              container: 'gisMap',
              map: that.map,
              zoom: 12,
              center: [106.6, 38.2]
            });
            that.view.ui.add('gisModel', 'manual');

            // 监听 popup 随地图移动
            that.view.watch('extent', () => {
              //popup随地图移动
              if (that.post_newPoint.showFlag) {
                let mapPoint = new Point({
                  x: that.view_new_point[0],
                  y: that.view_new_point[1],
                  spatialReference: {
                    wkid: 4326
                  }
                });
                let mps = that.view.toScreen(mapPoint);
                console.log(mps);
                that.post_newPoint.left_ = mps.x;
                that.post_newPoint.top_ = mps.y;
              }
            });


            // 显示 水库
            let reservoirLayer = null;
            reservoirLayer = new GraphicsLayer('reservoirLayer');
            that.map.add(reservoirLayer);
            reservoirLayer.removeAll();




            // 显示 水厂
            let factoryLayer = null;
            factoryLayer = new GraphicsLayer('reservoir');
            that.map.add(factoryLayer);
            factoryLayer.removeAll();



            // 显示 大用水户
            let usersLayer = null;
            usersLayer = new GraphicsLayer('usersLayer');
            that.map.add(usersLayer);
            factoryLayer.removeAll();


            // 显示 泵站
            let pumpLayer = null;
            pumpLayer = new GraphicsLayer('pumpLayer');
            that.map.add(pumpLayer);
            factoryLayer.removeAll();


            // 显示 计量间
            let countRoomLayer = null;
            countRoomLayer = new GraphicsLayer('countRoomLayer');
            that.map.add(countRoomLayer);
            factoryLayer.removeAll();



            // 显示 阀门
            let fmLayer = null;
            fmLayer = new GraphicsLayer('fmLayer');
            that.map.add(fmLayer);
            fmLayer.removeAll();


            // 显示 检修井
            let jxjLayer = null;
            jxjLayer = new GraphicsLayer('jxjLayer');
            that.map.add(jxjLayer);
            fmLayer.removeAll();


            // 显示 消防栓
            let xfsLayer = null;
            xfsLayer = new GraphicsLayer('xfsLayer');
            that.map.add(xfsLayer);
            fmLayer.removeAll();


            // 显示 管线
            let pipeLayer = null;
            pipeLayer = new GraphicsLayer('pipeLayer');
            that.map.add(pipeLayer);
            pipeLayer.removeAll();



            // 新增 一个巡检点
            //点击显示popup
            that.view.on('click', (event) => {
              that.view.hitTest(event).then(function (response) {
                console.log(response);

                let mapPonit = response.screenPoint.mapPoint;
                that.view_new_point = [mapPonit.longitude, mapPonit.latitude];

                that.post_newPoint.top_ = response.screenPoint.y;
                that.post_newPoint.left_ = response.screenPoint.x;

                if (response.results.length > 0) {
                  let filterLayers = []; //受保护的 业务图层 也就是需要弹窗的业务图层
                  let resList = response.results;

                  let configList = window.gisConfig.optionalLayers;
                  for (let i = 0; i < configList.length; i++) {
                    for (let j = 0; j < resList.length; j++) {
                      if (configList[i].id == resList[j].graphic.attributes.layerID) {
                        filterLayers.push({
                          layerID: resList[j].graphic.attributes.layerID,
                          name: resList[j].graphic.attributes.name,
                          icon: resList[j].graphic.attributes.icon
                        });
                      }
                    }
                  }

                  if (filterLayers.length == 1) {
                    that.searchThis(filterLayers[0]);
                  } else if (filterLayers.length > 1) {
                    // 展示 待选择的图层列表
                    that.searchLists = filterLayers;
                    that.searchPannelFlag = true;
                  } else {
                    that.searchPannelFlag = false;
                  }
                }
                if(that.init_signPoint==='1'||that.init_signPoint==='2'){
                  that.searchThis([{
                    layerID: 'project',
                    name: '',
                    icon: 'position'
                  }]);
                }
              });
            });
            // 新增签到点的 图层
            that.newPointLayer = new GraphicsLayer('newPointLayer');
            that.map.add(that.newPointLayer);
            let newPointIcon = window.DSE.static_baseUrl + '/images/symbol/position.png';
            let newPointSymbol = new PictureMarkerSymbol(newPointIcon, 20, 20);
            // 构造一个新增点
            newPoint_func = function () {


              let point_geometry = new Point({
                hasZ: false,
                hasM: false,
                x: that.view_new_point[0],
                y: that.view_new_point[1],
                spatialReference: {wkid: 4326}
              });
              let graphic = new Graphic(point_geometry, newPointSymbol, {});
              that.newPoint_index = that.newPoint_index++;
              graphic.attributes.name = '';
              graphic.attributes.layerID = 'xunjian';
              graphic.attributes.icon = 'position';

              that.newPointLayer.add(graphic);
            };

            // 服务端加载的 管线签到点
            function init_newPipePoint(){
              let points = that.ruleForm.signPoint&&that.ruleForm.signPoint.length?that.ruleForm.signPoint:[];
              for(let i=0;i<points.length;i++){
                if(points[i].pointType==='0'){
                  let point_geometry = new Point({
                    hasZ: false,
                    hasM: false,
                    x: parseFloat(points[i].lgtd),
                    y: parseFloat(points[i].lttd),
                    spatialReference: {wkid: 4326}
                  });
                  let graphic = new Graphic(point_geometry, newPointSymbol, {});
                  that.newPoint_index = that.newPoint_index++;
                  graphic.attributes.name = points[i].pointName;
                  graphic.attributes.layerID = 'xunjian';
                  graphic.attributes.icon = 'position';
                  that.newPointLayer.add(graphic);
                }
              }
            }
            init_newPipePoint();

            // 新增工程签到点的 图层
            that.newProjectPointLayer = new GraphicsLayer('newProjectPoint');
            that.map.add(that.newProjectPointLayer);
            let newProjectPointIcon = window.DSE.static_baseUrl + '/images/symbol/position.png';
            let newProjectPointSymbol = new PictureMarkerSymbol(newProjectPointIcon, 20, 20);
            // 构造一个 工程签到点
            newProjectPoint_func = function () {
              let point_geometry = new Point({
                hasZ: false,
                hasM: false,
                x: that.view_new_point[0],
                y: that.view_new_point[1],
                spatialReference: {wkid: 4326}
              });
              let graphic = new Graphic(point_geometry, newProjectPointSymbol, {});
              that.newPoint_index = that.newPoint_index++;
              graphic.attributes.name = '';
              graphic.attributes.layerID = 'project';
              graphic.attributes.icon = 'position';
              that.newProjectPointLayer.add(graphic);
            };

            // 初始化  工程的签到点
           function init_projectPoint(){
              let points = that.ruleForm.signPoint&&that.ruleForm.signPoint.length?that.ruleForm.signPoint:[];
              for(let i=0;i<points.length;i++){
                if(points[i].pointType==='1'){
                  let point_geometry = new Point({
                    hasZ: false,
                    hasM: false,
                    x: parseFloat(points[i].lgtd),
                    y: parseFloat(points[i].lttd),
                    spatialReference: {wkid: 4326}
                  });
                  let graphic = new Graphic(point_geometry, newPointSymbol, {});
                  that.newPoint_index = that.newPoint_index++;
                  graphic.attributes.name = points[i].pointName;
                  graphic.attributes.layerID = 'xunjian';
                  graphic.attributes.icon = 'position';
                  that.newPointLayer.add(graphic);
                }
              }
            }
            init_projectPoint();
          })
          .catch(err => {
            console.error(err);
          });
      },
      // 搜索这个要素
      searchThis(val) {
        let type = val.layerID;
        console.log(this.init_signPoint);

        if(this.init_signPoint==='0'){
          if (type === 'pipeline') {
            newPoint_func();
            this.post_newPoint.showFlag = true;
          } else {
            this.$message.warning('请选择管线');
            this.searchPannelFlag = false;
            this.view_new_point = [];
          }
        }else if (this.init_signPoint==='1') {
          newProjectPoint_func();
          this.post_newPoint.showFlag = true;
        }else if (this.init_signPoint==='2') {

          newProjectPoint_func();
          this.post_newPoint.showFlag = true;
        }
      },

    },
    filters:{
      formate_pointType(val){
        let temp_val = val;
        switch (val) {
          case '0':
            temp_val ='管道巡检点';
            break;
          case '1':
            temp_val ='工程巡检点';
            break;
        }
        return temp_val;

      }
    },
    beforeDestroy(){
      this.post_newPoint.name = '';
    },
    mounted() {
      this.getPipeInspectObjectList();
      if (this.operType === 'edit') {//编辑
        this.ruleForm = this.rowData;
        this.planId = this.rowData.planId;
      }
      this.loadGis();
    },
    created() {}
  };

</script>

<style scoped lang="scss">
  #addOrEditMonitorPlan {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    background-color: #ffffff;


    .gis-panel {
      height: 100%;
      width: calc(100% - 360px);
      /*border: 1px solid red;*/
      #gisMap {
        width: 100%;
        height: 100%;
      }
    }

    .search-list {
      position: absolute;
      top: 100px;
      left: 20px;
      width: 200px;
      background: #fff;
      box-shadow: 0 0 10px rgb(0, 0, 0);

      .top-head {
        width: 100%;
        height: 30px;
        line-height: 30px;
        background: #0b83fe;
        text-align: left;
        color: #fff;
        padding-left: 1em;
      }

      .list-search {
        width: 100%;
        max-height: 300px;
        overflow-y: auto;

        .searchItem {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          border-bottom: 1px solid #e9e9e9;
          height: 20px;

          &:hover {
            background: rgba(0, 0, 0, 0.3);
          }

          .col {
            display: flex;
            align-items: center;
            padding: 0 5px;

            &:first-child {
              width: 180px;
              justify-content: flex-start;

              img {
                width: 14px;
                height: 14px;
                margin-right: 5px;
              }

              span {
                display: inline-block;
                width: calc(100% - 16px);
                height: 100%;
                line-height: 20px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
            }

            &:last-child {
              width: 20px;
              justify-content: flex-end;
            }

          }
        }
      }
    }

    .from-panel {
      top: 10px;
      right: 10px;
      position: absolute;
      height: calc(100% - 20px);;
      display: inline-block;

      /deep/ #toggleTable_list .table-content .main-content {
        padding: 0;
      }

      .form-title {
        height: 30px;
        line-height: 30px;
        padding: 0 10px 0 10px;
        font-size: 16px;
        font-weight: bold;
        border-bottom: 1px solid #eeeeee;
      }

      .ruleForm {
        padding: 5px;
        height: calc(100% - 70px);
        overflow: auto;

        .qdd {
          color: #606266;
        }

        .add-btn {
          margin-left: 15px;
          color: #4B9dFe;
          cursor: pointer;
        }

        /deep/ .el-textarea__inner {
          font-family: "\5FAE\8F6F\96C5\9ED1"
        }
      }

      .actions {
        position: absolute;
        bottom: 0px;
        background-color: #eeeeee;
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
        }

        .save {
          margin-right: 20px;
        }
      }
    }

    table {
      tbody {
        td {
          span.del {
            color: #0b83fe;
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }

  }


</style>
