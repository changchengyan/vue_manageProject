
<template>
    <div id="monitorRecordDetail">
        <div class="detail-title">
            巡检记录详情
            <el-button class="right-btn" @click="goBack" type="primary">返回</el-button>
        </div>
        <div class="item-title">巡查抢修管线巡查记录</div>
        <div class="item">
            <div class="gis-panel" id="gisMap" :style="{width:gisPanelWidth}">
<!--              <dse-gis-map ref="gisLayer" @tellFather_stop="tellFather_stop"  />-->
            </div>
            <table class="innerTable left-table">
                <tr><td>巡检人员</td><td><span>{{inspectRecord.userName}}</span></td></tr>
                <tr><td>巡检计划名称</td><td :title="inspectRecord.planName"><span>{{inspectRecord.planName}}</span></td></tr>
                <tr><td>今日签到点</td><td><span>{{inspectRecord.sumNowCount}}</span></td></tr>
                <tr><td>开始时间</td><td><span>{{inspectRecord.nowStartTime}}</span></td></tr>
                <tr><td>在线时长</td><td><span>{{inspectRecord.leadTime !== null ? inspectRecord.leadTime +' 小时' : ''}}</span></td></tr>
                <tr><td>巡检进度</td><td><span>{{inspectRecord.sumNum !== null ? inspectRecord.sumNum+' %' : ''}}</span></td></tr>
                <tr><td>巡检方式</td><td><span>{{inspectRecord.inspectMode|fortmateInspectMode}}</span></td></tr>
                <tr><td>巡线长度</td><td><span>{{inspectRecord.inspectLength !== null ? inspectRecord.inspectLength+' km' : ''}}</span></td></tr>
                <tr><td>累计签到点</td><td><span>{{inspectRecord.sumCount}}</span></td></tr>
                <tr><td>结束时间</td><td><span>{{inspectRecord.nowEndTime}}</span></td></tr>
                <tr><td>平均速度</td><td><span>{{inspectRecord.inspectSpeed !== null ? inspectRecord.inspectSpeed+' km/h' : ''}}</span></td></tr>
                <tr>
                  <td>轨迹回放</td>
                  <td>
                    <span @click="replayGj(inspectRecord.inspectMode)" class="icon replay"></span>
                  </td>
                </tr>
              <!--TODO 待GIs人员开发  点击回放，可在地图上回放巡检轨迹 数据：this.inspectTrackData-->
                <tr><td>隐患个数</td><td><span>{{inspectRecord.probCount}}</span></td></tr>
            </table>
        </div>
        <div class="item-title">隐患详情</div>
        <div class="item">
            <table class="innerTable">
                <thead>
                    <tr>
                        <th width="50px"><span>序号</span></th>
                        <th><span>隐患上报时间</span></th>
                        <th><span>隐患编号</span></th>
                        <th><span>紧急程度</span></th>
                        <th><span>隐患地点</span></th>
                        <th><span>隐患描述</span></th>
                        <th><span>隐患状态</span></th>
                        <th><span>操作</span></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="proData && proData.length>0">
                        <tr v-for="(item,index) in proData" :key="index">
                            <td><span>{{index+1}}</span></td>
                            <td><span>{{item.reportTime}}</span></td>
                            <td><span>{{item.probCode}}</span></td>
                            <td><span>{{item.probLevel|fortmateProbLevel}}</span></td>
                            <td :title="item.place"><span>{{item.place}}</span></td>
                            <td :title="item.descrip"><span>{{item.descrip}}</span></td>
                            <td><span>{{item.probStatus|fortmateProbStatus}}</span></td>
                            <td><span class="icon location" @click="doLocation(item)"></span><span class="op-btn" v-if="item.file && item.file.length>0" @click="playImg(item.file)">查看照片</span></td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr><td colspan="8"><span>无数据</span></td></tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div class="item-title">巡检站点</div>
        <div class="item">
            <table class="innerTable">
                <thead>
                <tr>
                    <th width="50px"><span>序号</span></th>
                    <th><span>签到点</span></th>
                    <th><span>签到时间</span></th>
                    <th><span>巡检项</span></th>
                    <th><span>巡检结果</span></th>
                    <th><span>备注</span></th>
                </tr>
                </thead>
                <tbody>
                <template v-if="signRecordList && signRecordList.length>0">
                    <tr v-for="(item,index) in signRecordList" :key="index">
                        <td><span>{{index+1}}</span></td>
                        <td><span>{{item.pointName}}</span></td>
                        <td><span>{{item.signTime}}</span></td>
                        <td :title="item.prams"><span >{{item.prams}}</span></td>
                        <td :title="item.signResult"><span >{{item.signResult}}</span></td>
                        <td><span>{{item.remark}}</span></td>
                    </tr>
                </template>
                <template v-else>
                    <tr><td colspan="6"><span>无数据</span></td></tr>
                </template>
                </tbody>
            </table>
        </div>

        <el-dialog title="查看图片" :visible.sync="imgVisible" top="20px" width="90%">
            <el-carousel :interval="4000" type="card" >
                <el-carousel-item v-for="item in files.length" :key="item">
                    <img v-for="(file,index) in files" :key="index" :src="fileBasePath + file.filePath"  class="img">
                </el-carousel-item>
            </el-carousel>
        </el-dialog>

    </div>
</template>
<script>
  // import DseGisMap from '../../../common/components/dseGisMap';

  import * as esriLoader from 'esri-loader';
  let options = {
      url: window.DSE.arcgis_startJS,
      dojoConfig: window.DSE.gisConfig
  };
  esriLoader.loadCss(window.DSE.arcgis_mainCss);



  let loadJSON_func = null;
  let layerInfos = {};
export  default {
    name: 'monitorRecordDetail',
    components: {},
    data(){
        return{
            gisPanelWidth: 'calc(100% - 350px)',//gis面板的宽度
            inspectRecord: {},//巡检记录
            inspectTrackData: [],//TODO 巡检轨迹数据 用于地图上
            proData: [
                {
                    reportTime:'2019-03-24 9:52',
                    probCode:'BHJBHJGHUGH',
                    probLevel:'1',
                    place:'',
                    descrip:'爆管了',
                    probStatus:'2',
                    file:[],
                    position:{
                        x:105.91693,
                        y: 36.991113
                    }
                }
            ],//隐患详情
            signRecordList: [
                {
                    pointName:'同心县人民广场',
                    signTime:'2019-7-23 8:02',
                    signResult:'渗漏正常,塌陷正常,光缆正常,车辆穿越正常',
                    prams:'渗漏、塌陷、光缆、车辆穿越',
                    remark:'阀门打开'
                }
            ],//签到站点

            fileBasePath: this.$store.getters.get_filePath,//文件基础路径
            imgVisible:false,
            files:[],//图片文件
            recordId:'', // 记录ID
            toggolePlayFlag:true, //开始或者结束轨迹动画

        };
    },
    computed: {},
    filters: {
        fortmateProbLevel(val) {
            let temp = val;
            switch (val) {
                case '0':
                    temp = '紧急';
                    break;
                case '1':
                    temp = '严重';
                    break;
                case '2':
                    temp = '一般';
                    break;
            }
            return temp;
        },
        fortmateProbStatus(val) {
            let temp = val;
            switch (val) {
                case '0':
                    temp = '派单';
                    break;
                case '1':
                    temp = '受理';
                    break;
                case '2':
                    temp = '处理中';
                    break;
                case '3':
                    temp = '拒绝处理';
                    break;
                case '4':
                    temp = '处理完成';
                    break;
                case '5':
                    temp = '审核通过';
                    break;
                case '6':
                    temp = '审核拒绝';
                    break;
            }
            return temp;
        },
        fortmateInspectMode(val) {
            let temp = val;
            switch (val) {
                case '0':
                    temp = '步行';
                    break;
                case '1':
                    temp = '自行车';
                    break;
                case '2':
                    temp = '摩托车';
                    break;
                case '3':
                    temp = '汽车';
                    break;
            }
            return temp;
        },
    },
    methods:{
        // 加载底图
        loadGis() {
            let that = this;
            esriLoader.loadModules(['dojo/on', 'esri/Map', 'esri/views/MapView', 'esri/layers/WebTileLayer',
                'esri/layers/GraphicsLayer', 'esri/Graphic', 'esri/symbols/PictureMarkerSymbol', 'esri/geometry/Point',
                'esri/geometry/Polygon', 'esri/geometry/Polyline', 'dse/utils/EleClash', 'dojo/domReady!'
            ], options)
                .then(([on, Map, MapView, WebTileLayer, GraphicsLayer, Graphic, PictureMarkerSymbol, Point, Polygon, Polyline,
                           EleClash
                       ]) => {
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
                                    urlTemplate: 'http://{subDomain}.tianditu.gov.cn/DataServer?T=cia_w&X=${col}&Y=${row}&L=${level}&tk=94aa433732f999e8f30b6a7b0141cbfd', //注记
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
                        zoom: 10,
                        center: [106.462165,36.96828],
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

                    //配置文件中自带空间数据
                    loadJSON_func = function(layerID){
                        let layer = that.map.findLayerById(layerID);
                        let layerInfo = layerInfos[layerID];
                        if (layerInfo.features) {
                            layerInfo.features.forEach(feature => {
                                let graphic = new Graphic();
                                //添加属性数据
                                if (feature.attributes) {
                                    graphic.attributes = feature.attributes;
                                }
                                //添加符号
                                graphic.symbol = layerInfo.symbolFunc(graphic.attributes);
                                //添加空间数据
                                if (feature.geometry) {
                                    feature.geometry.type = 'point';
                                    if (feature.geometry.rings) {
                                        feature.geometry.type = 'polygon';
                                    }
                                    if (feature.geometry.paths) {
                                        feature.geometry.type = 'polyline';
                                    }
                                    graphic.geometry = feature.geometry;
                                }
                                layer.graphics.add(graphic);
                            });
                        }
                    };



                    //添加基础图层（非业务图层）
                    if (window.gisConfig && window.gisConfig.baseLayers && window.gisConfig.baseLayers.length) {
                        window.gisConfig.baseLayers.forEach(item => {
                            layerInfos[item.id] = item;
                            let layer = new GraphicsLayer({
                                id: item.id,
                                maxScale: item.maxScale ? item.maxScale : 0,
                                minScale: item.minScale ? item.minScale : 0,
                                graphics: []
                            });
                            that.map.add(layer);
                            //如果初始配置显示为true，则加载数据
                            if(item.initShow){
                                loadJSON_func(item.id);
                            }
                        });
                    }

                    // 监听 popup 随地图移动
                    that.view.watch('extent', () => {
                        //popup随地图移动
                        //     let mapPoint = new Point({
                        //         x: that.view_new_point[0],
                        //         y: that.view_new_point[1],
                        //         spatialReference: {
                        //             wkid: 4326
                        //         }
                        //     });
                        //     let mps = that.view.toScreen(mapPoint);
                        //     console.log(mps);
                        //     that.post_newPoint.left_ = mps.x;
                        //     that.post_newPoint.top_ = mps.y;

                    });


                    // 显示 隐患点
                    that.dangerLayer = new GraphicsLayer('hiddenDangerPoint');
                    that.map.add(that.dangerLayer);

                    let dangerIcon = window.DSE.static_baseUrl + '/images/symbol/actionDanger.png';
                    let dangerPointSymbol = new PictureMarkerSymbol(dangerIcon, 20, 20);
                    // 构造一个新增点
                    let point_geometry = new Point({
                        hasZ: false,
                        hasM: false,
                        x: 105.91693,
                        y: 36.991113,
                        spatialReference: {wkid: 4326}
                    });
                    let graphic = new Graphic(point_geometry, dangerPointSymbol, {});
                    that.dangerLayer.add(graphic);


                    that.repairLayer = new GraphicsLayer('hiddenDangerPoint');
                    that.map.add(that.repairLayer);
                    function addRepairPoint(obj) {
                        let repairIcon = window.DSE.static_baseUrl + '/images/symbol/position.png';
                        let repairPointSymbol = new PictureMarkerSymbol(repairIcon, 20, 20);
                        // 构造一个新增点
                        let point_geometry = new Point({
                            hasZ: false,
                            hasM: false,
                            x: obj.x,
                            y: obj.y,
                            spatialReference: {wkid: 4326}
                        });
                        let graphic = new Graphic(point_geometry, repairPointSymbol, {});
                        that.repairLayer.add(graphic);
                    }
                    addRepairPoint({
                        x:105.997059,
                        y:37.171915
                    });


                })
                .catch(err => {
                    console.error(err);
                });
        },
        //地图  地图待Gis人员开发
        pipe_ifSimulate_fm(){},

        //在地图上定位 itam：{lttd:经度,lgtd:纬度,...}
        doLocation(item){
            this.$refs.gisLayer.searchThis(item);
        },
        //在地图上回放轨迹
        replayGj(type){

          if(!this.toggolePlayFlag){
            this.$message.warning('轨迹动画还没有播完');
            return ;
          }

          this.$refs.gisLayer.trajRun(type);
          this.toggolePlayFlag = false;
        },
        // 重新播放轨迹
        tellFather_stop(flag){
            this.toggolePlayFlag = true;
        },
        //返回列表页
        goBack(){
           this.$router.go(-1);
           this.$emit('showAside',true);
        },

        //图片轮播
        playImg(files){
            this.files = files;
            this.imgVisible = true;
        },

        //获得巡检结果
        getXjjg(signResult){
            let xjjgStr = [];
            for(let item of signResult){
                xjjgStr.push(item.result_name);
            }
            return xjjgStr.join(',');
        },

        //获得巡检项
        getXjxName(signResult){
            let xjxStr = [];
            for(let item of signResult){
                xjxStr.push(item.item_name);
            }
            return xjxStr.join(',');
        },

        //获取巡检记录详情
        getInspectionInfoDetail_(recordId){

        }
    },
    created(){
        this.recordId = '';
        // this.getInspectionInfoDetail_(this.recordId);

        this.inspectRecord = {
            'nowEndTime': '2019-03-03 23:23:00',
            'sumCount': 0,
            'inspectDate': '2019-02-28 14:06:00',
            'planName': '小西沟水库巡检',
            'leadTime': 26400,
            'userName': '刘晓庆',
            'recordId': 'F9B4F6199A77B0F70D3EF2D55A989410',
            'inspectLength': 1.6343,
            'nowStartTime': '2019-02-25 00:00:00',
            'sumNowCount': 0,
            'groupName': '一班',
            'probCount': 0,
            'inspectSpeed': 0.00,
            'planId': 'NJJ6QRH32IGAB4PU7NH7TVA2AE0OT5U5',
            'startTime': '2019-02-28 14:06:00',
            'sumNum': 80,
            'endTime': '2019-02-28 14:17:00',
            'inspectMode': '0'
        };
    },
  mounted() {
      let that = this;
      this.$nextTick(()=>{
        setTimeout(()=>{
         that.loadGis();
        },1000);
      });
  }
};

</script>

<style scoped lang="scss">
    #monitorRecordDetail {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: #ffffff;

        .detail-title{
            font-size: 24px;
            height:50px;
            line-height: 50px;
            text-align: center;
            background-color: #0b83fd;
            color: #ffffff;

            .right-btn {
                float: right;
                margin: 10px;
            }
        }
        .item-title {
            margin: 10px 10px 5px 10px;
            padding-left: 10px;
            font-size: 16px;
            font-weight: bold;
            display: inline-flex;
            border-left:15px solid #2fc6f3;
        }

        .item {
            padding: 10px;
            display: inline-flex;
            width: 100%;
        }

        .gis-panel {
            height: 520px;
            width: calc(100% - 350px);
        }

        .innerTable{
            width: 100%;
            border-top: 1px solid #e9e9e9;

            tr td > span > p {
                display: inline-block;
            }

            .location {
                margin-right: 10px;
                height: 30px; width: 15px; display: inline-block;
                background: url('../../../assets/images/common/location.png') 0  no-repeat;
            }

            .replay {
                height: 30px;
                width: 30px;
                display: inline-block;
                background: url('../../../assets/images/video/video_stop.png')   no-repeat;
                background-size: 100% 100%;
            }
        }

        .innerTable.left-table{
            height:520px;
            width: 340px;
            margin-left: 10px;

            tr td:first-of-type{
                background-color: #f1f1f1;
            }
        }

        table tr td span {
            color: #333;

            &.op-btn {
                border-radius: 4px;
                width: 80px;
                height: 25px;
                line-height: 25px;
                cursor: pointer;
                padding: 0 10px;
                border: 1px solid #16b1f5;
                color: #4B9dFe;
            }
        }

        .img {
            width:100%;
            height:100%;
        }


    }
</style>
