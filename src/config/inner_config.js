/**
 * 全局配置文件在这，方便自己 ，也要方便他人
 *   注释信息一定要 写清楚
 */

//
let dse = {};
// 服务端需要修改路径为 文件所在的根目录 dse.baseURL = getIndexUrl('/pipe/pages/app/pipe/');
dse.baseURL = window.baseURL; // ******
dse.static_baseUrl = window.static_baseUrl;

dse.arcgis_startJS = window.arcgis_IP + '/arcgis_js_v48_api/library/4.8/init.js';
dse.arcgis_mainCss = window.arcgis_IP + '/arcgis_js_v48_api/library/4.8/esri/css/main.css';

// dse.arcgis_startJS =  window.arcgis_IP+'/arcgis_js_v411_api/library/4.11/init.js';
// dse.arcgis_mainCss =  window.arcgis_IP+'/arcgis_js_v411_api/library/4.11/esri/css/main.css';

dse.version = '1.0.0';
// 说明 该地址既是接口地址 、也是跳转服务地址
dse.base_api_url = window.base_api_url;

// 视频的基础APIURL
dse.video_api_url = window.base_video_host + '/api/v1';


dse.video_host = window.base_video_host;
dse.video_streamHost = window.base_video_streamHost;

dse.video_name = 'admin';
dse.video_password = '21232f297a57a5a743894a0e4a801fc3';

//管网信息管理 管网综合信息管理 导出pdf
dse.pipeMsg_mkpdf = window.static_baseUrl + '/makepdf/index.html';

// arcgis 外部模块导入配置
dse.gisConfig = {
  async: true,
  packages: [{
    name: 'dse',
    location: window.static_baseUrl + '/gisTools'
  }]
};


//配置 区域 ID
dse.area = {
  old: '',
  new: '',
  deve: ''
};
// 设备类型
dse.devices = [{
  label: '阀门',
  value: '1',
},
  {
    label: '消防栓',
    value: '2',
  },
  {
    label: '流量计',
    value: '3',
  },
  {
    label: '压力计',
    value: '4',
  },
  {
    label: '水质仪器',
    value: '5',
  },
  {
    label: '其他',
    value: '6',
  }, {
    label: '检查井',
    value: '7',
  }
];
//传输介质
dse.transmissionMedium = [];
// 管口连接方式
dse.interFace = [];
// 供水类型
dse.waterSupply_type = [];
// 区域
dse.areaLists = [];
// 管材
dse.productLists = [];
//管径
dse.caliberLists = [];

//防腐形式
dse.anticorrosiveList = [
  {'value': '8ae4b2cd6c8373dc016c847e89af0026', 'label': '内壁涂防腐层'},
  {'value': '8ae4b2cd6c8373dc016c847ed09e0027', 'label': '外壁涂防腐层'},
  {'value': '8ae4b2cd6c8373dc016c847f22720028', 'label': '阴极保护'},
  {'value': '8ae4b2cd6c8373dc016c847f77100029', 'label': '其他'}
];


// 巡检对象 列表
dse.inspectViewTypeList = [];

/**
 * 管网巡检抢修
 */
// 管网 巡检抢修 工单紧急程度
dse.dangerlist = [{
  label: '重大',
  value: '4'
},
  {
    label: '较大',
    value: '2'
  },
  {
    label: '一般',
    value: '1'
  }
];
// 管网 巡检抢修 工单的检修类型
dse.problem_type = [];
// 管网 巡检抢修 工单的派单状态
dse.orderStatus = [{
  label: '全部',
  value: ''
},
  {
    label: '未处理',
    value: '0'
  },
  {
    label: '待处理',
    value: '1'
  },
  {
    label: '已处理',
    value: '2'
  },
  {
    label: '待审核',
    value: '3'
  },
  {
    label: '待处理',
    value: '4'
  },
  {
    label: '待归档',
    value: '5'
  },
  {
    label: '已完成',
    value: '6'
  },
  {
    label: '已销毁',
    value: '7'
  },
  {
    label: '待充填',
    value: '8'
  },
  {
    label: '待验收',
    value: '9'
  }
];

// 检修工单类型
dse.repairOrderTypes = [{
  label: '巡检工单',
  value: '0'
},
  {
    label: '维护工单',
    value: '1'
  },
  {
    label: '抢修工单',
    value: '2'
  }
];


/**
 * 管网监测
 */
// 路面荷载
dse.roadWeights = [];
// 管龄
dse.pipe_age = [];
// 爆管次数
dse.pipe_burst_num = [];
// 管道埋深
dse.pipe_deep = [];
//管网水质监测主项
dse.water_quality = [];

//水厂组织结构
dse.tree = [];
// 方便在gis页面中引出弹窗的数据绑定
dse.globalData = null;

dse.compyName = '';
dse.compyID = '';
dse.userName = '';

dse.this_ = null; //绑定 vue的实例

dse.temp_arr = []; //必要条件下  需要挂载的数组

dse.allowBtns = {

};

export default dse;
