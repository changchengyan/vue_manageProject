# vue_manageProject
分享 项目实际开发的 框架轮子，算是查漏补缺


#  config-cli
    通用框架配置文档
## Build Setup

``` bash
# 安装依赖项
npm install

# 新建文件   可以一次生成包含 视图文件、路由文件(需要后期调整)、接口文件（里面有示例代码）
npm  run new fileName[文件名字]  或者  npm run new dirName/fileName[文件夹名字/文件名字]

# 服务开启  默认 开启 服务 为 IP:8080
npm run dev

#  沿用 官方打包要求  同时在这个命令后新添加 把生产环境的 配置文件替换为  开发环境的配置文件
npm run build

#  打包 并且 查看 包占用分析报告
npm run build --report

# 上传打包文件 到服务器指定目录
npm  run local2serve

```

##  项目目录结构

    
     特别值得注意的是 src中的静态文件是参与打包的
     与 src同级的static文件 打包中会原封不动挪到dist中的合并的static中
   ```
     -build
     -config
     -src
        -assets
            -imgs
        -common
            -components
                │  dseAside.vue   // 侧边菜单
                │  dseBreadcrumb.vue // 面包屑
                │  dseCalanderEvent.vue // 事件日历
                │  dseDashboard.vue // 图表面板
                │  dseFilterTab.vue // 含有(更多)的 多item 点选
                │  dseFuncTools.vue // gis工具栏
                │  dseFuzzySearch.vue // 模糊搜索 带有下拉列表 (需要定制)
                │  dseGisMap.vue // 一张图的 gis主文件
                │  dseGisTools.vue // gis工具栏
                │  dseHeaderInner.vue // 通用的头部菜单文件
                │  dseLayerOut.vue // 通用的 左右布局的 内容和树的组件
                │  dseLegend.vue  // gis的图例组件
                │  dseLiveVideo.vue // 在线视频组件 (针对 easynvr)
                │  dseLoadAnimation.vue // 耗时的吃豆人动画组件
                │  dseLoadingAnimation.vue // 页面跳转和数据加载的 缓动动画
                │  dseMenu.vue  // 菜单的主文件 (可按需生成三级组文件)
                │  dseMyPagination.vue  // 自定义的 带有列表+自定义分页的 抽屉组件
                │  dsePagination.vue  // 细分的 自定义分页组件
                │  DseselectTips.vue // 根据情况 单选进入的组件（按需修改）
                │  dseSelectWithTree.vue // 输入框嵌套树的 选择组件
                │  dseSeparatingTabs.vue // 分离式的 页签切换组件
                │  DseShuttleBox.vue // 支持两级切换的穿梭框(需要按需修改)
                │  dseSlideTableList.vue // 侧边抽屉的 表格列表和elment-ui分页样式的组件
                │  dseTab.vue
                │  dseTableList.vue // 侧边抽屉 表格和分页组件
                │  dseTableWidthPagination.vue // 大型表格和分页组件
                │  dseTabsToggle.vue // 页签切换组件
                │  dseTabsUnderline.vue // 带有下划线的组件
                │  dseToggleTable.vue  // 抽屉的 开关组件
                │  FirstMapHead.vue  // 可参考的 头部菜单组件
                │
                ├─tabs
                │      dseR_tableCard.vue // 竖向菜单和 内容区的组件
                │
                └─toast
                        dseBgModel.vue  // 大的弹窗
                        Dsedit.vue // 带有 取消和保存按钮的 自定义弹窗
                        dseGisModel.vue // 自由配置弹窗位置 无按钮 (宽大于高)
                        dseListModel.vue // 以展示为主的 无按钮弹窗 (高大于宽)
                        dseNormalModel.vue  // 通用的弹窗组件 无按钮
                        dseSaveStatus.vue // 保存状态的组件 (含有 确认删除和保存成功的组件)
                        DseView.vue // 自定义宽高的组件
            -config
                +inner_config.js    //内置配置共享数据 不可轻易配置  与外置/static/config.js 联动
            -styles
                  main.scss   // 各种样式文件导入的主文件 全局定义样式  包含基于element-ui的样式纠正 (尽量不要在组件中用 /deep/ 应该改文件中定义重置样式)
                │
                ├─generic  // 定义基本的通用样式
                │      base.scss  // 通用的全局样式
                │      iconfont.scss // 全局的字体文件
                │      reset.scss  // 全局的重置样式(重置element-ui)
                │
                └─settings
                        _fun.scss  // 定义 可传参数的 的函数样式或者(定义一段样式的混合器)
                        _vars.scss //定义 基准的 基准变量
        -store
           │  index.js  状态包裹器
           │
           └─modules
                   dataManage_store.js  数据管理状态器
                   emergencyManage_store.js  应急管理状态器
                   goodsManage_store.js      物资管理状态器
                   oneMap_store.js    一张图状态器
                   pipeManage_store.js   管网管理状态器
                   root.js   用户信息管理状态器
                   routingManager_store.js   巡检管理状态器
                   saveWaterManage_store.js  节水管理状态器
                   system_store.js   系统管理状态器
                   waterAnalysis_store.js    用水分析状态器
        -mixins  // 混合器目录
               arcgis_methods.js   gis相关的
               common_mixins.js     时间日历的使用函数
               pipeSetting_sites_mixin.js   水质、水压、水流、视频等站点的混合器
               README.md
        -pages
               404.vue   
            │  500.vue
            │  gisEdit.vue  gis编辑
            │  home.vue     一张图的主页
            │  init.vue     页面初始化
            │  Login.vue    登录的页面
            │  mainContent.vue  所有页面的 包裹器页面
            │  Temp.vue     判断是否登录的 跳转缓存页面
            │
            ├─analysis   用水分析  模块
            │  ├─county
            │  │  │  index.vue
            │  │  │
            │  │  └─style
            │  │          index.scss
            │  │
            │  ├─region
            │  │  │  index.vue
            │  │
            │  └─zhongyuan
            │      │  index.vue
            │
            ├─contingencyManagement
            ├─data  数据管理 模块
            │  │  enterpriseTable.vue  
            │  │  standingBook.vue
            │  │  target.vue  农饮指标
            │  │  warning.vue  预警消息
            │  │
            │  └─monitor  监测站点
            │      │  index.vue  
            │      │
            │      ├─comonents
            │      │      Cistern.vue
            │      │      Monitor.vue
            │      │      PumpingStation.vue
            │      │      Reservoir.vue
            │      │      WaterMeter.vue
            │      │      WaterWork.vue
            │
            ├─emergency  应急管理模块
            │  ├─incident
            │  │      index.vue
            │  │      modify.vue
            │  │
            │  └─resource
            │      │  index.vue
            │      │  modify.vue
            │      │
            │      └─comonents
            │              Cistern.vue
            │              Monitor.vue
            │              PumpingStation.vue
            │              Reservoir.vue
            │              WaterMeter.vue
            │              WaterWork.vue
            │
            ├─home_tabs  一张图 右侧抽屉的 页签模块
            │  │  devWarking.vue
            │  │  msg.vue
            │  │  pipeMsg.vue
            │  │  projectMsg.vue
            │  │  RoutingView.vue
            │  │  waterate.vue
            │  │
            │  ├─countMsg
            │  │      countMsg.vue
            │  │
            │  ├─gis
            │  │  ├─js
            │  │  └─models
            │  │          gis_fm.vue
            │  │          gis_jxj.vue
            │  │          gis_pipe.vue
            │  │          gis_xfs.vue
            │  │
            │  ├─monitorMsg_points
            │  │      flow.vue
            │  │      press.vue
            │  │      qc.vue
            │  │      video.vue
            │  │      waterLev.vue
            │  │
            │  ├─part
            │  │      partToggle.vue
            │  │      waterCapacity.vue
            │  │      waterCost.vue
            │  │
            │  ├─pool
            │  │      base.vue
            │  │      monitor.vue
            │  │      poolToggle.vue
            │  │      video.vue
            │  │      viewRecord.vue
            │  │
            │  ├─project_models
            │  │      baseMsg.vue
            │  │      configuration.vue
            │  │      monitorManager.vue
            │  │      pumpViewRecord.vue
            │  │      videoMonitor.vue
            │  │
            │  ├─pump
            │  │      pumpToggle.vue
            │  │
            │  ├─showAllModel
            │  │      sModel.vue
            │  │
            │  ├─sk
            │  │      skBaseMsg.vue
            │  │      skMsg.vue
            │  │      skViewRecord.vue
            │  │      toggleSk.vue
            │  │
            │  ├─userDev
            │  │      userDevToggole.vue
            │  │
            │  ├─waterate
            │  │      allArea.vue
            │  │      east.vue
            │  │      haiyuan.vue
            │  │      middle.vue
            │  │      west.vue
            │  │
            │  └─waterFactory
            │          factoryBaseMsg.vue
            │          factoryMonitor.vue
            │          factoryViewRecord.vue
            │          toggleWaterFactory.vue
            │          zhutai.vue
            │
            ├─image
            │      collectFee.vue
            │      device.vue
            │      engineering.vue
            │      monitor.vue
            │
            ├─material
            │  ├─analysis
            │  │  │  devStatistic.vue
            │  │  │  index.vue
            │  │  │  spareParts.vue
            │  │
            │  ├─device
            │  │      index.vue
            │  │      modify.vue
            │  │      profile.vue
            │  │
            │  └─spareParts
            │      │  index.vue
            │      │  modify.vue
            │      │  profile.vue
            │
            ├─pipeManage   管网管理模块
            │      addDeves.vue
            │      addPipes.vue
            │      devStandingBook.vue
            │      pipeStandingBook.vue
            │
            ├─routingManage  巡检管理 模块
            │  │  changeShifts.vue
            │  │  dutyRecord.vue
            │  │  form.vue
            │  │  hiddenDanger.vue
            │  │  information.vue
            │  │  makePlan.vue
            │  │  monitorPlan.vue
            │  │  monitorRecord.vue
            │  │  performance_statistic.vue
            │  │  pipeRepair.vue
            │  │  record.vue
            │  │  repair.vue
            │  │  routing_statistic.vue
            │  │  standard.vue
            │  │  statistic.vue
            │  │
            │  ├─addOrEdit
            │  │      addOrEditMonitorPlan.vue
            │  │
            │  ├─analysis
            │  │  │  index.vue
            │  │
            │  └─detail
            │          monitorRecordDetail.vue
            │
            ├─system  系统管理 模块
            │  │  monitor.vue
            │  │  partition.vue
            │  │  zone.vue
            │  │
            |  |—— supplyProject 供水工程
            │  ├─engineering  工程配置
            │  │  │  index.vue
            │  │  │  modify.vue
            │  │  │
            │  │  └─comonents
            │  │          Back.vue
            │  │          Cistern.vue
            │  │          PumpingStation.vue
            │  │          Reservoir.vue
            │  │          Tab.vue
            │  │          WaterMeter.vue
            │  │          WaterWork.vue
            │  │
            │  ├─inspectionItem  
            │  │      index.vue
            │  │
            │  ├─monitor  监测点 配置
            │  │      index.vue
            │  │      modify.vue
            │  │
            │  └─patrolTeam
            │          configure.vue
            │          index.vue
            │
            ├─tipPanel
            │      TipTabs.vue
            │      valIndex.vue
            │
            ├─water
            │  ├─calculate
            │  │  │  index.vue
            │  │  │  modify.vue
            │  │  │  profile.vue
            │  │
            │  └─examine
            │          companyModify.vue
            │          index.vue
            │          modify.vue
            │          profile.vue
            │
            └─waterRate
        -api
           │  contentType_form_fetch.js   针对 www-form 接口封装
           │  fetch.js  一般 json 格式封装
           │  fetchForExport.js   导出数据流文件封装
           │  postFile.js  上传文件 带进度条封装
           │  README.md  
           │  urls.js  所有 接口地址的所在目录
           │
           └─interfaces
                   common_api.js  通用 接口回调
                   dataManage_api.js  数据管理 接口回调
                   emergencyManage_api.js  应急管理 接口回调
                   goodsManage_api.js   物资管理 接口回调
                   oneMap_api.js   一张图 接口回调
                   pipeManage_api.js  管网管理 接口回调
                   routingManager_api.js  巡检管理 接口回调
                   saveWaterManage_api.js  节水管理 接口回调
                   system_api.js   系统管理 接口回调
                   waterAnalysis_api.js   用水分析 接口回调
                   www_form.js  针对 www-form 的接口统一 位置
        -router
            index.js
     -static
        -imgs
            *.jpg
        +config.js  //外置配置全局变量
   

##   项目运行 需要 loader 及 配置

   
        一、配置  sass
            需要 loader   node-sass   sass-loader
            配置  build/webpack.base.conf.js

            
            modules:{
                rules：[
                    {
                        test: /\.scss$/,
                        loaders: ["style", "css", "sass"]
                    }
                ]
            }
            
            
        二、 配置 store 增加 命名空间  使用子模块可根模块共存
            解决多人 编辑状态字段
        
        三、解决 IE下对ES6 编译成ES5的 兼容  babel-polyfill
            配置  build/webpack.base.conf.js 添加

            
                require(""babel-polyfill")
                module.exports = {
                    entry: {
                        app: ["babel-polyfill", "./src/main.js"]
                    }
                }
            
        四、项目启动，打开浏览器
            配置： config/index.js 
            
            dev:{
            autoOpenBrowser: true, 
            }

        五、 基于业务的 配置 放置在 config / inner_config.js
         里面存放 项目的所有内置配置 (arcgis 的相关 配置 也放置其中)
         
         
         
         
##  项目接口调用配置(spring boot)

     /static/config.js 下 
     `
         window.base_api_url = ?????(注意 跟原来的写法不同 )
     
     `
     另外 就是 在  /config/index.js里面  注意 配置 跨域请求
     `
        dev: {
        		proxyTable: {
        			'/ncysgc': {  配置 跨域访问
        				// target: 'http://www.whdse.cn:56096',
        				target: 'http://10.100.50.170:8091',
        				// target: 'http://10.100.50.197:8091',
        				changeOrigin: true
        			},
        			'/api': { 配置 本地的假数据 跨域访问
        				target: 'http://10.100.50.155:3000',
        				changeOrigin: true
        			},
        		},
        	}
     

## 全局状态保持（包含刷新状态下）  尤其是完整的单页面应用 针对全局的状态保持（尤其是在刷新浏览器的情况下的状态保持）

    开发使用相关功能，请参照相关的 状态文件的 开发实例
     
## 纯粹 单页应用 优化路由 

    1、支持 浏览器地址栏刷新页面，而不会失去刷新前的状态
    2、页面的回退 建议 使用 go(-1); 同时加上 this.$emit('show_aside',true);
    3、页面内部跳转 添加 this.$emit('hiddenAside',false);
    4、弊端 暂时没有做成祖宗级及重孙级 也就是 一个脉系的事件唤醒，暂时支持单一的 父子组件实现菜单的开关
    5、路由使用二级路由嵌套、相关页面的增添 可查看相关文件 实例
    6、优化 面包屑组件的监听实现;


## SVN 更新和 提交前 需要 注意的 地方

    1、除了第一次上传配置文件外，任何其他人上传，必须屏蔽掉 /static/config.js


## 打包前需要新增 生产环境的 配置文件编写

   
        现有 配置文件  仅限于   index.html  和 static 下的 config.js
        
        核对 根目录下 package.json 的字段
        "buildStaticPath": "/tongxin/",  // nginx配置的根目录下一级模块或者项目的根目录
        
   
        
        SVN 更新前 注意修改 如下部分  /static/config.js  就像下面这样
        `
            // 服务端文件所在的根目录
             window.baseURL = getIndexUrl('/tongxin/');
            //本地开发路径
            //window.baseURL = getIndexUrl();
            
            
            //服务器端静态资源所在的目录
             window.static_baseUrl = getIndexUrl('/tongxin/static');
            //本地静态资源所在的目录
            //window.static_baseUrl = getIndexUrl('/static');
       
        `

## 插件

     

        1.  打包压缩  *.gz
            限制版本号要求: "compression-webpack-plugin": "^1.1.12",
            修改webpack：config/index.js  把  productionGzip 改为 true
        2. 打包清除所有的 控制台信息  console.log()或者  func(){console.log()}
            无版本号限制：
            修改 build目录下的 webpack.prod.conf.js 中plugins中的
            
                new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                    warnings: false,
                    drop_console: true,//console
                    drop_debuger:true
                    pure_funcs: ['console.log']//移除console
                    }
                },
                sourceMap: config.build.productionSourceMap,
                parallel: true
                }),
            
        3. 运行期 开启 IP 连接
            无版本要求：
            修改 build/webpack.dev.conf.js 
            在文件 开头 加入
            
            function getIPAdress() {
                    var interfaces = require('os').networkInterfaces();
                    for (var devName in interfaces) {
                        var iface = interfaces[devName];
                        for (var i = 0; i < iface.length; i++) {
                            var alias = iface[i];
                            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                                return alias.address;
                            }
                        }
                    }
                }
            
            然后 把  const HOST = getIPAdress();

        4.  打包静态资挂载源路径
            修改  config/index.js  添加如下
                
                let temp_json = require("../package.json");
                let temp_staticPath_build = temp_json.buildStaticPath
            
            修改 build 对象下的   
            
                build:{
                    assetsPublicPath:""+temp_staticPath_build
                }
            
            package.json 中  配置静态文件路径  buildStaticPath = "pipe/pc/"
        
        5. 清除无用的CSS样式  purgecss
         webpack 具体配置详见:https://www.purgecss.com/
         
         6. 解决 两层  相对路径的 背景图片  例如 url(../../static/img/logo-index.2f00bf2.png) no-repeat
         
         需要在 build/utils.js  修改 类似这样
         
         // Extract CSS when that option is specified
             // (which is the case during production build)
             if (options.extract) {
               return ExtractTextPlugin.extract({
                 use: loaders,
                 fallback: 'vue-style-loader',
                 publicPath:'../../',   这是重点
               })
             } else {
               return ['vue-style-loader'].concat(loaders)
             }
        
        
 ## 引用的 包
 
      1、 lodash   工具库   已注册全局  使用 方式 this.funTool.unil(XXX)
      2、 vee-valitor 表单校验 已注册全局  关注官方教程
      4、 element-ui
      5、 eris-loader
      6、 proj4  用于不同坐标系之间转换空间数据
      7、 xlsx   用于excel数据的导入
      8、 jquery 引入
      9、外置脚本库  video.js
      10、 外置 脚本库 my97date
      11、  el-tree-transfer  多级穿梭框
      12、 echarts 使用原生写法  使用 方式  this.$echarts.init(XXXXX) 使用方式 沿用 jq时代的方式，写法完全一致，不需要再造轮子
      13、 dayjs 时间处理插件 使用方式 this.$days().formate('YYYY-MM-DD HH:mm:ss'); 类似写法 具体参见官方文档
 ##  打包 注意事项
 
       1、项目的 基本配置项中的 业务配置向项 写在 /src/config/inner_config.js 中
       
         （1）、大量的 字典项 需要 调用接口 会引起 性能问题，索性放入本地，减少请求（重新部署时，需要完善或者验证字典项的 ID是否变化）
         
 
 
 
 
    
            


 




    

