<template>
    <div id="gisEdit">
      <div class="top-head">
        <span>图层编辑</span>
        <span class="go-back" @click="goBack">返回首页</span>
      </div>
      <div id="gisContent">
        <!-- <div class="gis-import">
          <input type="file"
            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ref="importExcelId" @change="importGISExcel"/>
        </div> -->
        <div class="addToolbar">
          <el-button @click.native="addGraphic('liuliang')" type="primary" icon="el-icon-plus">流量</el-button>
          <el-button @click.native="addGraphic('yali')" type="primary" icon="el-icon-plus">压力</el-button>
          <el-button @click.native="addGraphic('shuizhi')" type="primary" icon="el-icon-plus">水质</el-button>
          <el-button @click.native="addGraphic('shipin')" type="primary" icon="el-icon-plus">视频</el-button>
          <el-button @click.native="del" type="primary" icon="el-icon-delete">删除</el-button>
          <!-- <el-button @click.native="pan" type="primary" icon="el-icon-rank">移动</el-button> -->
          <el-button @click.native="save" type="primary" icon="el-icon-upload">保存</el-button>
          <!-- <el-button type="primary" icon="el-icon-document">导入管网数据</el-button> -->
          <input type="file"  id='my_file' @change="importJSON"  style="display:none;"/>
          <label for='my_file' >
            <div class="inputButton" >导入管网数据</div>
          </label>
        </div>
      </div>
    </div>
</template>

<script>
  import * as esriLoader from 'esri-loader';
  import {excelInGIS} from '../mixins/arcgis_methods';

  import {
    getPartitionGISData,
    getPipelineGISData,
    getManholeGISData,
    getFireHydrantGISData,
    getValveGISData,
    getJianXiuGISData,
    getGCJCGISData,
    updateGeoData,
    updatePointGeo
  } from '../api/interfaces/home_api';

  let options = {
    url: window.DSE.arcgis_startJS,
    dojoConfig: window.DSE.gisConfig
  };
  esriLoader.loadCss(window.DSE.arcgis_mainCss);
  
  let importJSON_func = null;

  let graphicsAdd = [];//保存新增的空间数据
  let graphicsUpd = [];//保存修改的空间数据
  let graphicsDel = [];//保存删除的空间数据
  let addGraphic_func = null;
  let panGraphic_func = null;
  let delGraphic_func = null;
  let test_func = null;

  let layerInfos = {};//各图层配置信息
  //用于高亮
  let highlight = {
    defaultSymbol: null,
    symbols: {},
    graphics: []
  };
  let highlight_func = null;

  export default {
    name: 'gisEdit',
    mixins: [excelInGIS],
    data(){
      return {
        editLayerIDs: ['liuliang','yali','shuizhi','shipin']
      };
    },
    methods:{
        goBack(){
          this.$router.go(-1);
        },
        importJSON(e){
          importJSON_func(e);
        },
        //新增空间数据
        addGraphic(layerID){
          addGraphic_func(layerID);
        },
        //移动空间数据
        pan(){
          panGraphic_func();
          test_func();
        },
        //删除空间数据
        del(){
          delGraphic_func();
        },
        //arcGIS的图形数据的JSON格式转WKT格式
        arcGISJSONToWKT(geometry){
          let wktData = '';
          switch(geometry.type){
            case 'point':
              wktData = `POINT(${geometry.x} ${geometry.y})`;
              break;
            case 'polyline':
              wktData = 'MULTILINESTRING(';
              for(let i=0;i<geometry.paths.length;i++){
                if(i !== 0) wktData += ',';
                wktData += '(';
                for(let j=0;j<geometry.paths[i].length;j++){
                  if(j !== 0) wktData += ',';
                  wktData += geometry.paths[i][j][0] + ' ' + geometry.paths[i][j][1];
                }
                wktData += ')';
              }
              wktData += ')';
              break;
            case 'polygon':
              break;
          }
          return wktData;
        },
        //保存到后端数据库
        save(){
          let list = [];
          let monitorList = [];
          //新增的数据
          graphicsAdd.forEach(graphic => {
            let type = null;
            switch(graphic.layer.id){
              case 'liuliang':
                type = '3';
                break;
              case 'yali':
                type = '2';
                break;
              case 'shuizhi':
                type = '1';
                break;
              case 'shipin':
                type = '9';
                break;
            }
            if(type){
              monitorList.push({
                id: graphic.attributes.id,
                type: type,
                pointCode: graphic.attributes.id,
                lgtd: graphic.geometry.x,
                lttd: graphic.geometry.y,
                depth: '',
                altitude: '',
                operTp: 'add'
              });
            }else{
              list.push({
                id: graphic.attributes.id,
                fromid: '',
                toid: '',
                geometry: this.arcGISJSONToWKT(graphic.geometry),
                fromtable: '',
                totable: '',
                type: '',
                fromnode: '',
                tonode: '',
                tableNm: layerInfos[graphic.layer.id].geometryTable,
                operTp: 'add'
              });
            }
          });
          //修改的数据
          graphicsUpd.forEach(graphic => {
            let type = null;
            switch(graphic.layer.id){
              case 'liuliang':
                type = '3';
                break;
              case 'yali':
                type = '2';
                break;
              case 'shuizhi':
                type = '1';
                break;
              case 'shipin':
                type = '9';
                break;
            }
            if(type){
              monitorList.push({
                id: graphic.attributes.id,
                type: type,
                pointCode: '',
                lgtd: graphic.geometry.x,
                lttd: graphic.geometry.y,
                depth: '',
                altitude: '',
                operTp: 'upd'
              });
            }else{
              list.push({
                id: graphic.attributes.id,
                fromid: '',
                toid: '',
                geometry: this.arcGISJSONToWKT(graphic.geometry),
                fromtable: '',
                totable: '',
                type: '',
                fromnode: '',
                tonode: '',
                tableNm: layerInfos[graphic.layer.id].geometryTable,
                operTp: 'upd'
              });
            }
          });
          //删除的数据
          graphicsDel.forEach(graphic => {
            let type = null;
            switch(graphic.layerID){
              case 'liuliang':
                type = '3';
                break;
              case 'yali':
                type = '2';
                break;
              case 'shuizhi':
                type = '1';
                break;
              case 'shipin':
                type = '9';
                break;
            }
            if(type){
              monitorList.push({
                id: graphic.attributes.id,
                type: type,
                pointCode: '',
                lgtd: graphic.geometry.x,
                lttd: graphic.geometry.y,
                depth: '',
                altitude: '',
                operTp: 'del'
              });
            }else{
              list.push({
                id: graphic.attributes.id,
                fromid: '',
                toid: '',
                geometry: this.arcGISJSONToWKT(graphic.geometry),
                fromtable: '',
                totable: '',
                type: '',
                fromnode: '',
                tonode: '',
                tableNm: graphic.layer ? layerInfos[graphic.layer.id].geometryTable : layerInfos[graphic.delLayerID].geometryTable,
                operTp: 'del'
              });
            }
          });
          // console.log('list',JSON.stringify(list));
          // console.log('monitorList',JSON.stringify(monitorList));
          if(list.length > 0){
            updateGeoData(list,this).then(result => {
              if(result && result.status && result.status === 1){
                graphicsAdd = graphicsAdd.filter(graphic => {
                  return !list.some(data => {
                    return data.id === graphic.attributes.id;
                  });
                });
                graphicsUpd = graphicsUpd.filter(graphic => {
                  return !list.some(data => {
                    return data.id === graphic.attributes.id;
                  });
                });
                graphicsDel = graphicsDel.filter(graphic => {
                  return !list.some(data => {
                    return data.id === graphic.attributes.id;
                  });
                });
              }
            });
          }
          if(monitorList.length > 0){
            updatePointGeo(monitorList,this).then(monitorResult => {
              if(monitorResult && monitorResult.status && monitorResult.status === 1){
                graphicsAdd = graphicsAdd.filter(graphic => {
                  return !monitorList.some(data => {
                    return data.id === graphic.attributes.id;
                  });
                });
                graphicsUpd = graphicsUpd.filter(graphic => {
                  return !monitorList.some(data => {
                    return data.id === graphic.attributes.id;
                  });
                });
                graphicsDel = graphicsDel.filter(graphic => {
                  return !monitorList.some(data => {
                    return data.id === graphic.attributes.id;
                  });
                });
              }
            });
          }
        },
        guid() {
          return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
          });
        },
        loadGis() {
          let that = this;
          esriLoader.loadModules(['dojo/on', 'esri/Map', 'esri/views/MapView', 'esri/Graphic',
            'esri/layers/GraphicsLayer', 'esri/layers/WebTileLayer', 'esri/geometry/support/webMercatorUtils','esri/geometry/geometryEngine',
            'esri/geometry/Point','esri/geometry/Polyline','esri/geometry/Polygon','esri/views/2d/draw/Draw','dojo/domReady!'], options)
            .then(([on, Map, MapView, Graphic, GraphicsLayer, WebTileLayer, webMercatorUtils, geometryEngine, Point, Polyline, Polygon,Draw]) => {

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
                    visible: true
                  }),
                  //影像图注记
                  new WebTileLayer({
                    urlTemplate: 'http://{subDomain}.tianditu.gov.cn/DataServer?T=cia_w&X=${col}&Y=${row}&L=${level}&tk=94aa433732f999e8f30b6a7b0141cbfd',//注记
                    subDomains: ['t0', 't1', 't5', 't6', 't7'],
                    visible: true
                  }),
                  //矢量图
                  new WebTileLayer({
                    urlTemplate: 'http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_w&X=${col}&Y=${row}&L=${level}&tk=94aa433732f999e8f30b6a7b0141cbfd',
                    subDomains: ['t0', 't1', 't5', 't6', 't7'],
                    visible: false
                  }),
                  //矢量图注记
                  new WebTileLayer({
                    urlTemplate: 'http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_w&X=${col}&Y=${row}&L=${level}&tk=94aa433732f999e8f30b6a7b0141cbfd',
                    subDomains: ['t0', 't1', 't5', 't6', 't7'],
                    visible: false
                  })
                ]
              }
            });

            that.view = new MapView({
              container: 'gisContent',
              map: that.map,
              zoom: 12,
              center: [106.6, 38.2],
              ui: {
                components:['zoom']
              }
            });

            //添加地图约束条件
            if(window.gisConfig.minScale != undefined){
              that.view.constraints.minScale = window.gisConfig.minScale;
            }
            if(window.gisConfig.maxScale != undefined){
              that.view.constraints.maxScale = window.gisConfig.maxScale;
            }
            if(window.gisConfig.snapToZoom != undefined){
              that.view.constraints.snapToZoom = window.gisConfig.snapToZoom;
            }
            if(window.gisConfig.rotationEnabled != undefined){
              that.view.constraints.rotationEnabled = window.gisConfig.rotationEnabled;
            }

            function loadLayerAllData_func(layerID){
              let promise = undefined;
              let layerConfigItem;
              window.gisConfig.optionalLayers.forEach(item => {
                if(item.id == layerID){
                    layerConfigItem = item;
                }
              });
              switch(layerID){
                case 'partition':
                  promise = getPartitionGISData(null,that);
                  break;
                case 'pipeline':
                  promise = getPipelineGISData(null,that);
                  break;
                case 'manhole':
                  promise = getManholeGISData(null,that);
                  break;
                case 'fire_hydrant':
                  promise = getFireHydrantGISData(null,that);
                  break;
                case 'valve':
                  promise = getValveGISData(null,that);
                  break;
                case 'shishi':
                case 'jianxiu':
                case 'yinhuan':
                case 'guanfa':
                  promise = getJianXiuGISData(null,that);
                  break;
                case 'shuiku'://水库
                  promise = getGCJCGISData({type: 1},that);
                  break;
                case 'shuichang'://水厂
                  promise = getGCJCGISData({type: 2},that);
                  break;
                case 'dayongshuihu'://大用水户
                  promise = getGCJCGISData({type: 3},that);
                  break;
                case 'bengzhan'://泵站
                  promise = getGCJCGISData({type: 4},that);
                  break;
                case 'jiliangjian'://计量间
                  promise = getGCJCGISData({type: 5},that);
                  break;
                case 'liuliang'://流量
                  promise = getGCJCGISData({type: 6},that);
                  break;
                case 'yali'://压力
                  promise = getGCJCGISData({type: 7},that);
                  break;
                case 'shuizhi'://水质
                  promise = getGCJCGISData({type: 8},that);
                  break;
                case 'shipin'://视频
                  promise = getGCJCGISData({type: 9},that);
                  break;
              }
              if(!promise){
                return;
              }

              promise.then(res=>{
                let resData;
                switch(layerID){
                  case 'shishi':
                    resData = res.data.userMapList;
                    break;
                  case 'jianxiu':
                    resData = res.data.orderMapList;
                    break;
                  case 'yinhuan':
                    resData = res.data.problemMapList;
                    break;
                  case 'guanfa':
                    resData = res.data.projectMapList;
                    break;
                  default:
                    resData = res.data;
                    break;
                }
                if(resData){
                  resData.forEach(item => {
                    let geometry = item[layerConfigItem.geometryField];
                    if(geometry){
                      let graphic = new Graphic({
                        symbol: layerConfigItem.symbol ? layerConfigItem.symbol : layerConfigItem.symbolFunc(item),
                        attributes: {}
                      });
                      //添加属性
                      for(let key in item){
                        if(key !== layerConfigItem.geometryField){
                          graphic.attributes[key] = item[key];
                        }
                      }
                      if(geometry.indexOf('MULTILINESTRING') >= 0){//多线
                        let polyline = new Polyline({
                          hasZ: false,
                          hasM: false,
                          paths: [],
                          spatialReference: { wkid: 4326 }
                        });
                        //分割出多线
                        let strs = geometry.substring(geometry.indexOf('(')).split('),');
                        strs.forEach(lineStr => {
                          let line = [];
                          let pointstrs = lineStr.replace(/\(/g,'').replace(/\)/g,'').split(',');
                          pointstrs.forEach(pointstr => {
                            let points = pointstr.split(' ');
                            line.push(points);
                          });
                          polyline.paths.push(line);
                        });
                        graphic.geometry = polyline;
                      }else if(geometry.indexOf('LINESTRING') >= 0){//线
                        //
                        console.log('未实现的空间数据类型类型：LINESTRING！');
                      }else if(geometry.indexOf('MULTIPOLYGON') >= 0){//多面
                        let polygon = new Polygon({
                          hasZ: false,
                          hasM: false,
                          rings: [],
                          spatialReference: { wkid: 4326 }
                        });
                        //分割出多面
                        let strs = geometry.substring(geometry.indexOf('(')).split('),');
                        strs.forEach(ringStr => {
                          let ring = [];
                          let pointstrs = ringStr.replace(/\(/g,'').replace(/\)/g,'').split(',');
                          //WKT格式多边形的每个ring中第一个点和最后一个点是重合的，而arcGIS中ring没有重合，所以转换时不添加ring的最后一个点
                          for(let k=0;k<pointstrs.length - 1;k++) {
                            let points = pointstrs[k].split(' ');
                            ring.push(points);
                          }
                          polygon.rings.push(ring);
                        });
                        graphic.geometry = polygon;
                      }else if(geometry.indexOf('POLYGON') >= 0){//面
                        //
                        console.log('未实现的空间数据类型类型：POLYGON！');
                      }else if(geometry.indexOf('POINT') >= 0){//点
                        let strs = geometry.substring(geometry.indexOf('(') + 1,geometry.indexOf(')')).split(' ');
                        let point = new Point({
                          hasZ: false,
                          hasM: false,
                          x: strs[0],
                          y: strs[1],
                          spatialReference: { wkid: 4326 }
                        });
                        graphic.geometry = point;
                      }else{
                        console.log('无效的空间数据类型！',res);
                      }
                      that.map.findLayerById(layerID).graphics.add(graphic);
                    }
                  });
                }
              });
            }
            
            //添加图层，图层顺序按照配置文件中的顺序添加，图层数据后面根据实际情况添加
            if (window.gisConfig && window.gisConfig.optionalLayers && window.gisConfig.optionalLayers.length) {
              window.gisConfig.optionalLayers.forEach(item => {
                //获取各图层配置信息
                layerInfos[item.id] = item;

                //添加图层
                let layer = new GraphicsLayer({
                  id: item.id,
                  maxScale: item.maxScale ? item.maxScale : 0,
                  minScale: item.minScale ? item.minScale : 0,
                  graphics: []
                });
                that.map.add(layer);
                //如果初始配置显示为true，则加载数据
                if(item.initShow){
                  loadLayerAllData_func(item.id);
                }
              });
            }

            importJSON_func = function(e){
              let files = e.target.files;
              if(files.length == 0) return;
              for(let i=0;i<files.length;i++){
                if(!/\.json/g.test(files[i].name)) {
                  alert('仅支持读取JSON文件！');
                  return;
                }
                // this.$refs.importJSONId.value=null;

                let reader = new FileReader();
                reader.onload = e => {
                  // console.log('data',e.target.result);
                  let data = JSON.parse(e.target.result);
                  //将数据分类保存到对应的图层
                  if (data.features) {
                    data.features.forEach(feature => {
                      let layerID = '';
                      let graphic = new Graphic();
                      //添加表中的id
                      graphic.attributes = {};
                      graphic.attributes.id = that.guid();
                      //添加空间数据
                      if (feature.geometry) {
                        if (feature.geometry.paths) {
                          feature.geometry.type = 'polyline';
                          layerID = 'pipeline';
                          //添加属性数据
                          if (feature.attributes) {
                            graphic.attributes.PIPE_RADIUS = feature.attributes.管径;
                            switch(feature.attributes.类型){
                              case 1:
                                graphic.attributes.PIPE_MATERIAL = 'PE';
                                break;
                              case 2:
                                graphic.attributes.PIPE_MATERIAL = 'PVC';
                                break;
                              case 3:
                                graphic.attributes.PIPE_MATERIAL = 'PCCP';
                                break;
                              case 4:
                                graphic.attributes.PIPE_MATERIAL = '钢管';
                                break;
                              case 5:
                                graphic.attributes.PIPE_MATERIAL = '铸铁';
                                break;
                              case 6:
                                graphic.attributes.PIPE_MATERIAL = 'FRP';
                                break;
                            }
                          }
                        }
                        else if (feature.geometry.rings) {//分区
                          // feature.geometry.type = 'polygon';
                          return;
                        }
                        else{//点类型数据
                          feature.geometry.type = 'point';
                          switch(feature.attributes.类型){
                            case 2://阀门
                              layerID = 'valve';
                              break;
                            case 3://消火栓
                              layerID = 'fire_hydrant';
                              break;
                            // case 4://泵站
                            //   layerID = 'bengzhan';
                            //   break;
                            case 7://井
                              layerID = 'manhole';
                              break;
                            // case 8://排气阀
                            //   layerID = 'valve';
                            //   break;
                            // case 9://排污阀
                            //   layerID = 'valve';
                            //   break;
                            default:
                              return;
                          }
                        }
                        graphic.geometry = feature.geometry;
                        graphic.symbol = layerInfos[layerID].symbol ? layerInfos[layerID].symbol : layerInfos[layerID].symbolFunc('');
                        that.map.findLayerById(layerID).graphics.add(graphic);
                        graphicsAdd.push(graphic);
                      }
                      
                    });
                    // console.log(graphicsAdd);
                  }

                  
                  
                };
                reader.readAsText(files[i]);
              }
            };

            addGraphic_func = function(layerID){
              //通知其它工具有工具新建或者激活
              that.$emit('active-tool');
              //其它工具激活时清理此工具
              let clearFunc = () => {
                if(graphic){
                  that.map.findLayerById(layerID).graphics.remove(graphic);
                  graphic = null;
                }
                that.$off('active-tool',clearFunc);
                if(handleViewBlur){
                  handleViewBlur.remove();
                }
                if(handleViewClick){
                  handleViewClick.remove();
                }
                if(draw){
                  draw.reset();
                  draw = null;
                }
              };
              that.$on('active-tool',clearFunc);
              var draw = new Draw({
                view: that.view
              });
              let graphic = null;
              let handleViewBlur = null;
              let handleViewClick = null;
              createAction();
              function createAction(){
                var action = draw.create('point');//此处创建时会自动清理view的click绑定的事件（arcGIS js api的bug）
                action.on('cursor-update', function (evt) {
                  createPointGraphic(evt.coordinates);
                });
                action.on('draw-complete', function (evt) {
                  createPointGraphic(evt.coordinates);
                  if(draw){
                    graphic.attributes = {};
                    graphic.attributes.id = that.guid();
                    graphicsAdd.push(graphic);
                    graphic = null;
                    //重复新增图形
                    if(handleViewBlur){
                      handleViewBlur.remove();
                    }
                    if(handleViewClick){
                      handleViewClick.remove();
                    }
                    createAction();
                  }
                });
                //如下情况下取消此工具
                handleViewBlur = that.view.on('blur',clearFunc);
                handleViewClick = that.view.on('click',(e) => {
                  if(e.button === 2){
                    clearFunc();
                  }
                });
              }

              function createPointGraphic(coordinates){
                if(graphic){
                    that.map.findLayerById(layerID).graphics.remove(graphic);
                    graphic = null;
                }
                if(draw){//draw没有取消
                  var point = {
                    type: 'point', 
                    x: coordinates[0],
                    y: coordinates[1],
                    spatialReference: that.view.spatialReference
                  };
                  graphic = new Graphic({
                    geometry: point
                  });
                  if(graphic.geometry.spatialReference.wkid !== 4326){
                    graphic.geometry = webMercatorUtils.webMercatorToGeographic(graphic.geometry);
                  }
                  graphic.symbol = layerInfos[layerID].symbol ? layerInfos[layerID].symbol : layerInfos[layerID].symbolFunc('');
                  that.map.findLayerById(layerID).graphics.add(graphic);
                }

                  // //线
                  // var line = createLine(vertices);
                  // var lineLength = geometryEngine.geodesicLength(line, "miles");
                  // var graphic = createGraphic(line);
                  // view.graphics.add(graphic);
              }

            };

            test_func = function(){
              //
              this.view.on('drag',e => {
                console.log('action',e.action);
              });
              return;
            }.bind(that);

            panGraphic_func = function(){
              this.$emit('active-tool');
              //此工具失效时清理此工具
              let clearFunc = () => {
                if(graphic){//用于选择的多边形
                  this.view.graphics.remove(graphic);
                }
                if(selectedGraphics){
                  highlight_func(null,'query','1');
                  selectedGraphics= [];
                }
                this.$off('active-tool',clearFunc);
                if(handleViewBlur){
                  handleViewBlur.remove();
                }
                if(handleViewClick){
                  handleViewClick.remove();
                }
                if(handleMapClick){
                  handleMapClick.remove();
                }
                if(handleMapKeyup){
                  handleMapKeyup.remove();
                }
                if(draw){
                  draw.reset();
                  draw = null;
                }
                clearPanAction();
              };
              this.$on('active-tool',clearFunc);
              //如下情况下取消此工具
              let handleViewBlur = null;
              let handleViewClick = null;
              //初始化工具
              let selectedGraphics = [];
              //点选操作表示放弃当前平移操作，重新开始平移操作
              let handleMapClick = this.view.on('click', (event) => {
                console.log('pan click');
                createAction();
              });
              //多边形选择
              var draw = new Draw({
                view: this.view
              });
              let graphic = null;
              
              let createAction = function() {
                var action = draw.create('polygon');//此处创建时会自动清理view的click绑定的事件（arcGIS js api的bug）
                action.on('vertex-add', function (evt) {
                  createPolygonGraphic(evt.vertices);
                });
                action.on('vertex-remove', function (evt) {
                  createPolygonGraphic(evt.vertices);
                });
                action.on('cursor-update', function (evt) {
                  createPolygonGraphic(evt.vertices);
                });
                action.on('draw-complete', function (evt) {
                  createPolygonGraphic(evt.vertices);
                  if(draw){
                    //查询
                    if(selectedGraphics){
                      highlight_func(null,'query','1');
                      selectedGraphics= [];
                    }
                    //筛选出与选择的多边形相交的所有的业务图层中的图形
                    this.editLayerIDs.forEach(layerID => {
                      this.map.findLayerById(layerID).graphics.forEach(gra => {
                        if(geometryEngine.intersects(graphic.geometry, gra.geometry)){
                          selectedGraphics.push(gra);
                          highlight_func(gra,'query','2');
                          // if(selectedGraphics.indexOf(graphic) > 0){//如果之前已经选择了，就取消选择
                          //   highlight_func(gra,'query',1);
                          //   selectedGraphics.splice(graphic,'3');
                          // }else{
                          //   selectedGraphics.push(gra);
                          //   highlight_func(gra,'query','2');
                          // }
                        }
                      });
                    });
                    this.view.graphics.remove(graphic);
                    graphic = null;
                    // //重复多边形选择
                    // if(handleViewBlur){
                    //   handleViewBlur.remove();
                    // }
                    // if(handleViewClick){
                    //   handleViewClick.remove();
                    // }
                    // createAction();

                    //如果有选择的图形，则激活移动功能
                    if(selectedGraphics.length > 0){
                      clearPanAction();
                      panAction();
                    }
                  }
                }.bind(this));
                //此情况下取消此工具
                handleViewBlur = this.view.on('blur',clearFunc);
                handleViewClick = this.view.on('click',(e) => {
                  if(e.button === 2){
                    clearFunc();
                  }
                });
              }.bind(this);

              let createPolygonGraphic = function (vertices){
                if(vertices.length === 1){
                  return;
                }
                
                if(graphic){
                    this.view.graphics.remove(graphic);
                    graphic = null;
                }
                if(draw){//draw没有取消
                  var polylineOrPolygon = {
                    spatialReference: this.view.spatialReference
                  };
                  if(vertices.length === 2){
                    polylineOrPolygon.type = 'polyline';
                    polylineOrPolygon.paths = vertices;
                  }else{
                    polylineOrPolygon.type = 'polygon';
                    polylineOrPolygon.rings = vertices;
                  }
                  graphic = new Graphic({
                    geometry: polylineOrPolygon
                  });
                  //坐标转换
                  if(graphic.geometry.spatialReference.wkid !== 4326){
                    graphic.geometry = webMercatorUtils.webMercatorToGeographic(graphic.geometry);
                  }
                  graphic.symbol = highlight.defaultSymbol.popup.func(graphic);
                  this.view.graphics.add(graphic);
                }
              }.bind(this);

              createAction();

              //选择后的移动功能
              let handlePointerDown = null;
              let handlePointerMove = null;
              let handlePointerUp = null;
              let isPanStart = false;
              let tempPoint = null;
              let panAction = () => {
                handlePointerDown = this.view.on('pointer-down',e => {
                  if(e.button === 0){
                    isPanStart = true;
                    tempPoint = this.view.toMap(e);
                    //坐标转换
                    if(tempPoint.spatialReference.wkid !== 4326){
                      tempPoint = webMercatorUtils.webMercatorToGeographic(tempPoint);
                    }
                  }
                });
                handlePointerMove = this.view.on('pointer-move',e => {
                  if(e.button === 0 && isPanStart){
                    let point = this.view.toMap(e);
                    //坐标转换
                    if(point.spatialReference.wkid !== 4326){
                      point = webMercatorUtils.webMercatorToGeographic(point);
                    }
                    let dx = point.x - tempPoint.x;
                    let dy = point.y - tempPoint.y;
                    selectedGraphics.forEach(gra => {
                      if(gra.geometry.type == 'point'){
                        gra.x += dx;
                        gra.y += dy;
                      }
                    });
                    tempPoint = point;
                  }
                });
                handlePointerUp = this.view.on('pointer-up',e => {
                  if(e.button === 0 && isPanStart){
                    isPanStart = false;
                    tempPoint = null;
                  }
                });
              };
              let clearPanAction = () =>{
                if(handlePointerDown){
                  handlePointerDown.remove();
                }
                if(handlePointerMove){
                  handlePointerMove.remove();
                }
                if(handlePointerUp){
                  handlePointerUp.remove();
                }
                isPanStart = false;
                tempPoint = null;
              };

              //键盘方向键微调，每次移动按屏幕N个像素微调
              let handleMapKeyup = this.view.on('key-up', function(evt){
                if(selectedGraphics){
                  if (evt.key === 'ArrowDown'){
                      highlight_func(null,'query','1');
                      selectedGraphics.forEach(graphic => {
                        // graphic.layer.graphics.remove(graphic);
                      });
                  }else if (evt.key === 'ArrowLeft'){//
                  }
                  else if (evt.key === 'ArrowRight'){//
                  }
                  else if (evt.key === 'ArrowUp'){//
                  }
                }
              });
            }.bind(that);

            delGraphic_func = function(){
              this.$emit('active-tool');
              //此工具失效时清理此工具
              let clearFunc = () => {
                if(graphic){//用于选择的多边形
                  this.view.graphics.remove(graphic);
                }
                if(selectedGraphics){
                  highlight_func(null,'query','1');
                  selectedGraphics= [];
                }
                this.$off('active-tool',clearFunc);
                if(handleViewBlur){
                  handleViewBlur.remove();
                }
                if(handleViewClick){
                  handleViewClick.remove();
                }
                // if(handleMapClick){
                //   handleMapClick.remove();
                // }
                if(handleMapKeyup){
                  handleMapKeyup.remove();
                }
                if(draw){
                  draw.reset();
                  draw = null;
                }
              };
              this.$on('active-tool',clearFunc);
              //如下情况下取消此工具
              let handleViewBlur = null;
              let handleViewClick = null;
              //初始化工具
              let selectedGraphics = [];
              // //点选操作
              // let handleMapClick = this.view.on('click', (event) => {
              //   this.view.hitTest(event).then(function (response) {
              //     if (response.results.length) {
              //       selectedGraphics = response.results.filter(function(result){
              //         if(layerInfos[result.graphic.layer.id] !== undefined){
              //           highlight_func(result.graphic,'query',1);
              //           return true;
              //         }
              //       });
              //     }
              //   });
              // });
              //多边形选择
              var draw = new Draw({
                view: this.view
              });
              let graphic = null;
              
              let createAction = function() {
                var action = draw.create('polygon');//此处创建时会自动清理view的click绑定的事件（arcGIS js api的bug）
                action.on('vertex-add', function (evt) {
                  createPolygonGraphic(evt.vertices);
                });
                action.on('vertex-remove', function (evt) {
                  createPolygonGraphic(evt.vertices);
                });
                action.on('cursor-update', function (evt) {
                  createPolygonGraphic(evt.vertices);
                });
                action.on('draw-complete', function (evt) {
                  createPolygonGraphic(evt.vertices);
                  if(draw){
                    //查询
                    if(selectedGraphics){
                      highlight_func(null,'query','1');
                      // selectedGraphics.forEach(graphic => {
                      //   graphic.layer.graphics.remove(graphic);
                      // });
                      selectedGraphics= [];
                    }
                    //筛选出与选择的多边形相交的所有的业务图层中的图形
                    this.editLayerIDs.forEach(layerID => {
                      this.map.findLayerById(layerID).graphics.forEach(gra => {
                        if(geometryEngine.intersects(graphic.geometry, gra.geometry)){
                          selectedGraphics.push(gra);
                          highlight_func(gra,'query','2');
                          // if(selectedGraphics.indexOf(graphic) > 0){//如果之前已经选择了，就取消选择
                          //   highlight_func(gra,'query',1);
                          //   selectedGraphics.splice(graphic,'3');
                          // }else{
                          //   selectedGraphics.push(gra);
                          //   highlight_func(gra,'query','2');
                          // }
                        }
                      });
                    });
                    this.view.graphics.remove(graphic);
                    graphic = null;
                    //重复多边形选择
                    if(handleViewBlur){
                      handleViewBlur.remove();
                    }
                    if(handleViewClick){
                      handleViewClick.remove();
                    }
                    createAction();
                  }
                }.bind(this));
                //此情况下取消此工具
                handleViewBlur = this.view.on('blur',clearFunc);
                handleViewClick = this.view.on('click',(e) => {
                  if(e.button === 2){
                    clearFunc();
                  }
                });
              }.bind(this);

              let createPolygonGraphic = function (vertices){
                if(vertices.length === 1){
                  return;
                }
                
                if(graphic){
                    this.view.graphics.remove(graphic);
                    graphic = null;
                }
                if(draw){//draw没有取消
                  var polylineOrPolygon = {
                    spatialReference: this.view.spatialReference
                  };
                  if(vertices.length === 2){
                    polylineOrPolygon.type = 'polyline';
                    polylineOrPolygon.paths = vertices;
                  }else{
                    polylineOrPolygon.type = 'polygon';
                    polylineOrPolygon.rings = vertices;
                  }
                  graphic = new Graphic({
                    geometry: polylineOrPolygon
                  });
                  //坐标转换
                  if(graphic.geometry.spatialReference.wkid !== 4326){
                    graphic.geometry = webMercatorUtils.webMercatorToGeographic(graphic.geometry);
                  }
                  graphic.symbol = highlight.defaultSymbol.popup.func(graphic);
                  this.view.graphics.add(graphic);
                }
              }.bind(this);

              createAction();
              //删除
              let handleMapKeyup = this.view.on('key-up', function(evt){
                if (evt.key === 'Delete'){
                  if(selectedGraphics){
                    highlight_func(null,'query','1');
                    selectedGraphics.forEach(graphic => {
                      let hasSave = true;
                      graphic.layerID = graphic.layer.id;
                      graphic.layer.graphics.remove(graphic);
                      for(let i=0;i<graphicsAdd.length;i++){
                        if(graphicsAdd[i] === graphic){
                          graphicsAdd.splice(i,1);
                          hasSave = false;
                          break;
                        }
                      }
                      for(let i=0;i<graphicsUpd.length;i++){
                        if(graphicsUpd[i] === graphic){
                          graphicsUpd.splice(i,1);
                          break;
                        }
                      }
                      if(hasSave){
                        graphicsDel.push(graphic);
                      }
                    });
                    selectedGraphics= [];
                  }
                }
              });
            }.bind(that);

            //获取配置文件中的高亮设置信息
            if (window.gisConfig && window.gisConfig.defaultHighlight){
              highlight.defaultSymbol = window.gisConfig.defaultHighlight;
            }
            // else{
            //   console.log('请先配置高亮符号！');
            // }
            if (window.gisConfig && window.gisConfig.optionalLayers && window.gisConfig.optionalLayers.length) {
              window.gisConfig.optionalLayers.forEach(item => {
                  highlight.symbols[item.id] = item.highlight ? item.highlight : null;
              });
            }

            /**
             * 高亮某个图形
             * 设计思路：按触发高亮的类型、高亮优先级，值越小优先级越高，优先级只针对高亮图形本身的所有高亮类型
             * 叠加时新增一个graphic（与原graphic在同一个图层）用于高亮，不叠加时替换原graphic的symbol
             * 在配置文件中各图层可以配置自己的高亮信息，没有配置时取默认高亮信息defaultHighlight
             * @param {Graphic} graphic - 需要高亮的图形
             * @param {String} type - 触发类型：popup、query
             * @param {String} [clearType = '0'] - 清理类型：0：清理所有高亮，1：清理本触发类型的所有高亮，2：不处理之前的高亮
             * @returns {null} - 没有返回值
             */
            highlight_func = function (graphic,type, clearType = '0'){
              //高亮清理相关处理
              switch(clearType){
                case '0':
                  // highlight.graphics.forEach(gc => {
                    
                  // });
                  // highlight.graphics = [];
                  break;
                case '1':
                  // console.log('高亮清理1',highlight);
                  for(let i=0;i<highlight.graphics.length;i++){
                    let gc = highlight.graphics[i];
                    if(type == 'popup'){
                      if(gc[type]){//已存在
                        if(gc[type].symbol !== undefined){//以覆盖方式存在
                          gc.layer.graphics.remove(gc[type]);
                          gc[type] = null;
                          //如果存在query
                          if(gc['query']){
                            if(gc['query'].symbol !== undefined){//以覆盖方式存在
                              gc.layer.graphics.add(gc['query']);
                            }else{
                              gc.symbol = gc['query'];
                            }
                          }
                          else{
                            highlight.graphics.splice(i, 1);
                            i--;
                          }
                        }else{//以符号方式存在
                          gc[type] = null;
                          if(gc['query']){
                            if(gc['query'].symbol !== undefined){//以覆盖方式存在
                              gc.layer.graphics.add(gc['query']);
                              gc.symbol = gc.symbol_old;
                              gc.symbol_old = null;
                            }else{
                              gc.symbol = gc['query'];
                            }
                          }else{//不存在query
                            gc.symbol = gc.symbol_old;
                            gc.symbol_old = null;
                            highlight.graphics.splice(i, 1);
                            i--;
                          }
                        }
                      }
                      // else{//不存在
                      // }
                    }else if(type == 'query'){
                      if(gc[type]){//已存在
                        if(gc['popup']){//已存在
                          gc[type] = null;
                        }else{//popup不存在
                          if(gc[type]){//'query'存在
                            if(gc[type].symbol !== undefined){//以覆盖方式存在
                              gc.layer.graphics.remove(gc[type]);
                            }else{
                              gc.symbol = gc.symbol_old;
                              gc.symbol_old = null;
                            }
                            gc[type] = null;
                            highlight.graphics.splice(i, 1);
                            i--;
                          }else{//'query'不存在
                            highlight.graphics.splice(i, 1);
                            i--;
                          }
                        }
                      }
                      // else{//不存在
                      // }
                    }
                  }
                  break;
                case '2':
                  break;
              }
              if(graphic == null){
                return;
              }

              //高亮符号
              let symbol = null;
              let isOver = null;
              if(highlight.defaultSymbol){
                symbol = highlight.defaultSymbol[type].func(graphic);
                isOver = highlight.defaultSymbol[type].isOver;
              }
              if(highlight.symbols[graphic.layer.id]){
                symbol = highlight.symbols[graphic.layer.id][type].func(graphic.attributes);
                isOver = highlight.symbols[graphic.layer.id][type].isOver;
              }
              if(symbol == null){
                return;
              }
              //是否叠加
              let newGraphic = null;
              if(isOver){
                newGraphic = new Graphic();
                newGraphic.geometry = graphic.geometry.clone();
                newGraphic.symbol = symbol;
              }
              //popup在最上，query过滤其次
              if(newGraphic){
                if(type == 'popup'){
                  if(graphic[type]){//已存在popup高亮
                    //判断已存在popup高亮是graphic还是symbol
                    if(graphic[type].symbol === undefined){//是symbol
                      graphic.layer.graphics.add(newGraphic);
                      if(graphic['query']){
                        if(graphic['query'] === undefined){//是symbol
                        }else{
                          graphic.symbol = graphic.symbol_old;
                          graphic.symbol_old = null;
                        }
                      }else{//不存在query
                        graphic.symbol = graphic.symbol_old;
                        graphic.symbol_old = null;
                      }
                    }else{
                      graphic.layer.graphics.remove(graphic[type]);
                      graphic.layer.graphics.add(newGraphic);
                    }
                  }else{//不存在popup高亮
                    if(graphic['query']){
                      //判断已存在query高亮是graphic还是symbol
                      if(graphic['query'].symbol === undefined){//是symbol
                        graphic.symbol = graphic.symbol_old;
                        graphic.symbol_old = null;
                        graphic.layer.graphics.add(newGraphic);
                      }else{
                        graphic.layer.graphics.add(newGraphic);
                      }
                    }else{
                      graphic.layer.graphics.add(newGraphic);
                      highlight.graphics.push(graphic);
                    }
                  }
                }
                else if(type == 'query'){
                  //如果存在popup高亮，则不改变符号，只保存query高亮信息
                  if(!graphic['popup']){//不存在popup高亮
                    if(graphic[type]){//存在query高亮
                      //如果之前是覆盖方式高亮则先删除
                      if(graphic[type].symbol !== undefined){
                        graphic.layer.graphics.remove(graphic[type]);
                        // graphic.layer.graphics.add(newGraphic,graphic.layer.graphics.indexOf(graphic) + 1);
                        graphic.layer.graphics.add(newGraphic);
                      }
                      else{//符号
                        graphic.symbol = graphic.symbol_old;
                        graphic.symbol_old = null;
                        // graphic.layer.graphics.add(newGraphic,graphic.layer.graphics.indexOf(graphic) + 1);
                        graphic.layer.graphics.add(newGraphic);
                      }
                    }else{
                      // graphic.layer.graphics.add(newGraphic,graphic.layer.graphics.indexOf(graphic) + 1);
                      graphic.layer.graphics.add(newGraphic);
                      highlight.graphics.push(graphic);
                    }
                  }
                }
                graphic[type] = newGraphic;
              }
              else{
                if(type == 'popup'){
                  //如果query义覆盖的方式存在，则需要将query对应的newGraphic从图层中删除
                  if(graphic['query'] && graphic['query'].symbol !== undefined){
                    graphic['query'].layer.graphics.remove(graphic['query']);
                    graphic.symbol = graphic.symbol_old;
                  }

                  if(graphic[type]){//已存在popup高亮
                    //判断已存在popup高亮是graphic还是symbol
                    if(graphic[type].symbol === undefined){//是symbol
                      graphic.symbol = symbol;
                    }else{
                      graphic[type].layer.graphics.remove(graphic[type]);
                      graphic.symbol = symbol;
                    }
                  }else{//不存在popup高亮
                    graphic.symbol = symbol;
                  }
                }
                else if(type == 'query'){
                  //如果存在popup高亮
                  if(graphic['popup']){
                    //之前是覆盖方式高亮
                    if(graphic['popup'].symbol !== undefined){
                      if(graphic[type].symbol !== undefined){//之前是覆盖方式高亮
                        graphic.symbol_old = graphic.symbol;
                      }
                    }
                    // else{//符号
                    // }
                  }
                  else{//不存在popup高亮
                    if(graphic[type]){//存在
                      if(graphic[type].symbol !== undefined){//之前是覆盖方式高亮
                        graphic.layer.graphics.remove(graphic[type]);
                        graphic.symbol_old = symbol;
                        graphic.symbol = symbol;
                      }
                      else{//符号
                        graphic.symbol = symbol;
                      }
                    }
                    else{//不存在
                      graphic.symbol_old = symbol;
                      graphic.symbol = symbol;
                      highlight.graphics.push(graphic);
                    }
                  }
                }
                
                graphic[type] = symbol;
              }
            };

            })
            .catch(err => {
              console.error(err);
            });
        },
    },
    mounted() {
        this.loadGis();
    }
  };
</script>

<style scoped lang="scss">
#gisEdit{
  width: 100%;
  height: 100%;
  .top-head{
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    padding-right: 0;
    background: #0b83fe;
    color: #fff;
    span{
      display: inline-block;
      &.go-back{
        width: 80px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  #gisContent{
    width: 100%;
    height: calc(100% - 30px);
    .gis-import {
      position: absolute;
      top: 120px;
      left: 10px;
      z-index: 100;
    }
    .addToolbar{
      position: absolute;
      top: 50px;
      left: 100px;
      z-index: 100;

      .el-button+.el-button {
          margin-left: 5px;
      }

      .inputButton {
        display: inline-block;
        white-space: nowrap;
        cursor: pointer;
        background: #FFF;
        border: 1px solid #DCDFE6;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        font-size: 14px;
        border-radius: 4px;

        color: #FFF;
        background-color: #409EFF;
        border-color: #409EFF;

        padding: 0 15px !important;
        height: 30px !important;
        line-height: 28px !important;

        margin-left: 5px;
      }
    }
  }
}
</style>
