define([
  'require',
  'exports',
  'esri/views/2d/draw/Draw',
  'esri/geometry/geometryEngine',
  'esri/geometry/Polygon',
  'esri/Graphic',
  'esri/geometry/support/webMercatorUtils',
  'esri/geometry/Polyline'
], function (require, exports, Draw, geometryEngine, Polygon, Graphic, webMercatorUtils, Polyline) {
  /**
   * @description 导出 img 图片
   * */

  var EleClash = (function () {
    function EleClash(infoProps) {
      var that = this;

      this.view = infoProps.view;
      let handle = this.view.on('blur',() => {
        if(that.draw){
          that.draw.reset();
          that.draw = null;
        }
        if(handle) {
          handle.remove();
        }
      })


      this.draw = new Draw({
        view: that.view
      });
      // 管道的 图层
      this.pipeLayer = infoProps.pipeLayer;
      // 水压的图层
      this.pressLayer = infoProps.pressLayer;
      // 水流的图层
      this.flowLayer = infoProps.flowLayer;
      // 大用水户的 图层
      this.usersLayer = infoProps.usersLayer;
      // 分区的 图层
      this.partLayer = infoProps.partLayer;
      // 临时的 面的图层
      this.tempPartLayer = infoProps.tempPartLayer;

      // 当前 vue的实例
      this.thatVue = infoProps.that_;



      //检查当前绘制的图层 与 同级别的图层是否碰撞
      this.checkCollision = function (polygonGeometry) {
        let flag = true;
        let Layer = that.partLayer;
        for (let i = 0; i < Layer.graphics.items.length; i++) {
          //检查 碰撞一级图层
          let temp_ploygon = Layer.graphics.items[i].geometry;
          if (
            geometryEngine.intersects(polygonGeometry, temp_ploygon) ||
            geometryEngine.contains(polygonGeometry, temp_ploygon)
          ) {
            flag = false;
            break;
          }
        }
        return flag;
      };
      // 获取 流量计的个数
      this.count_Content_waterFlowPoints = function (polygonGeometry) {
        let sum = 0;
        let temp_arr = [];
        let Layer = that.flowLayer;
        for (let i = 0; i < Layer.graphics.items.length; i++) {
          let point = Layer.graphics.items[i].geometry;
          if (polygonGeometry.contains(point)) {
            sum += 1;
            temp_arr.push({
              type: '2',
              id: Layer.graphics.items[i].attributes.id
            });
          }
        }
        return {
          sum: sum,
          devs: temp_arr
        };
      };
      //  获取 水压计的个数
      this.count_Content_waterPress = function (polygonGeometry) {
        let sum = 0;
        let temp_arr = [];
        let Layer = that.pressLayer;
        for (let i = 0; i < Layer.graphics.items.length; i++) {
          let point = Layer.graphics.items[i].geometry;
          if (polygonGeometry.contains(point)) {
            sum += 1;
            temp_arr.push({
              type: '3',
              id: Layer.graphics.items[i].attributes.id
            });
          }
        }
        return {
          sum: sum,
          devs: temp_arr
        };
      };
      //  获取 用水户的个数
      this.count_Content_bgUser = function (polygonGeometry) {
        let userCount = 0;
        let sum_waterCapacity = 0;
        let Layer = that.usersLayer;
        let user_ids =[];
        for (let i = 0; i < Layer.graphics.items.length; i++) {
          let point = Layer.graphics.items[i].geometry;
          let temp_capacity = Layer.graphics.items[i].attributes.capacity;
          if (polygonGeometry.contains(point)) {
            userCount += 1;

            if(!temp_capacity) temp_capacity = 0;
            sum_waterCapacity +=
              sum_waterCapacity + parseFloat(temp_capacity);
              let user_id =  Layer.graphics.items[i].attributes.id;
              console.log(Layer.graphics.items[i].attributes);
              user_ids.push({
                waterUserId:user_id
              });
          }

        }
        return {
          userCount: userCount,
          sum_waterCapacity: sum_waterCapacity,
          user_ids:user_ids
        };
      };
      //获取  相交 管线的长度
      this.count_intersect_pipeLine = function (polygonGeometry) {
        let sum_len = 0;
        let sum_count = 0;
        let Layer = that.pipeLayer;
        for (let i = 0; i < Layer.graphics.items.length; i++) {
          let line = Layer.graphics.items[i].geometry;
          // let polyline_ = new Polyline({
          //   paths: line.paths,
          //   spatialReference: that.view.spatialReference
          // });
          // polyline_ = webMercatorUtils.geographicToWebMercator(polyline_);

          if (geometryEngine.intersects(polygonGeometry, line)) {

            sum_count += 1;
           let temp_len =  Layer.graphics.items[i].attributes.PIPE_LENGTH;
           if(!temp_len) temp_len = 0;
            sum_len += parseFloat(
              temp_len
            );
          }
        }
        return {
          sum_count: sum_count,
          sum_len: sum_len
        };
      };
      //获取  包含 管线的长度
      this.count_Contain_pipeLine = function (polygonGeometry) {
        let Layer = that.pipeLayer;
        let sum_len = 0;
        for (let i = 0; i < Layer.graphics.items.length; i++) {
          let line = Layer.graphics.items[i].geometry;
          // let polyline_ = new Polyline({
          //   paths: line.paths,
          //   spatialReference: that.view.spatialReference
          // });
          // polyline_ = webMercatorUtils.geographicToWebMercator(polyline_);

          if (geometryEngine.contains(polygonGeometry, line)) {
            let temp_len =  Layer.graphics.items[i].attributes.PIPE_LENGTH;
            if(!temp_len) temp_len = 0;
            sum_len += parseFloat(
              temp_len
            );
          }
        }
        return sum_len;
      };
      //创建一个面图层
      this.createGraphic = function (polygon) {
        let graphic = new Graphic({
          geometry: polygon,
          symbol: {
            type: 'simple-fill',
            color: [253, 200, 245, 0.6],
            style: 'solid',
            outline: {
              color: [255, 0, 255],
              width: 2,
              style: 'dash-dot'
            }
          }
        });
        return graphic;
      };
      //面图层的 文本
      this.labelAreas = function (geom,area) {

        let areaStr = area.toFixed(2)+'Km';
        let graphic = new Graphic({
          geometry: geom.centroid,
          symbol: {
            type: 'text',
            color: 'black',
            haloColor: 'black',
            haloSize: '1px',
            text: areaStr,
            xoffset: 3,
            yoffset: 3,
            font: {
              size: 14,
              family: 'sans-serif'
            }
          }
        });
        that.tempPartLayer.add(graphic);
        return graphic;
      };

      //构造一个 面要素
      this.createPolygon = function (vertices) {
        return new Polygon({
          rings: vertices,
          spatialReference: that.view.spatialReference
        });
      };


      // // 开始绘制 面
      this.drawPolygon = function (evt) {
        let vertices = evt.vertices;
        // that.post_data.zone = vertices;
        that.thatVue.show_gisTip = true;
        that.tempPartLayer.removeAll();
        let polygon = that.createPolygon(vertices);
        let graphic = that.createGraphic(polygon);
        let area = geometryEngine.geodesicArea(
          polygon,
          'square-kilometers'
        );
        that.tempPartLayer.add(graphic);
        // that.createPointMaker(vertices);
        that.labelAreas(polygon,area);
      };



      // 最后绘制 确定
      this.drawPolygon_last = function (evt) {
        let vertices = evt.vertices;
        // that.post_data.zone = vertices;
        that.tempPartLayer.removeAll();
        let polygon = that.createPolygon(vertices);
        polygon =  webMercatorUtils.webMercatorToGeographic(polygon);
        let graphic = that.createGraphic(polygon);
        that.tempPartLayer.add(graphic);
        // that.createPointMaker(vertices);
        let area = geometryEngine.geodesicArea(
          polygon,
          'square-kilometers'
        );

        that.thatVue.partForm.area = area.toFixed(2);
        let waterFlow= that.count_Content_waterFlowPoints(polygon);
        let waterPress = that.count_Content_waterPress(polygon);
        let intersect_pipe = that.count_intersect_pipeLine(polygon);
        let contain_pipeLen = that.count_Contain_pipeLine(polygon);
        let bgUser = that.count_Content_bgUser(polygon);
        // that.post_data.pipeCount = pipe.sum_count;
        that.thatVue.partForm.pipeLength = (intersect_pipe.sum_len + contain_pipeLen).toFixed(2);
        that.thatVue.partForm.flowCount = waterFlow.sum;
        that.thatVue.partForm.pipeCount = intersect_pipe.sum_count;
        that.thatVue.partForm.userCount =  bgUser.userCount;
        that.thatVue.partForm.consumption = (bgUser.sum_waterCapacity).toFixed(2);

        that.thatVue.partForm.waterUserList = bgUser.user_ids;
        //
        that.thatVue.partForm.monitorList = [
          ...that.thatVue.partForm.monitorList,
          ...waterFlow.devs,
          ...waterPress.devs
        ];

        /**
         *  返回 当前的 面的 空间数据  并加以 构造
         * @type {*|Array}
         */
        let paths = that.tempPartLayer.graphics.items[0].geometry.rings;
        console.log(paths);
        let pathStr = '';
        paths = paths[0];
        for(let i=0;i<paths.length;i++){
          pathStr+= paths[i][0]+' '+paths[i][1]+',';
        }
       // pathStr =  pathStr.substring(0,pathStr.length-1);
        pathStr = pathStr+paths[0][0]+' '+paths[0][1];
       let post_pathStr = ' MULTIPOLYGON((('+pathStr+')))';

       that.thatVue.partForm.zone =post_pathStr;






        //提交校验 时 用户会莫名其妙的 为零的问题
        // if (bgUser.userCount !== 0) {
        //   that.post_data.userCount = bgUser.userCount;
        //   that.post_data.consumption = bgUser.sum_waterCapacity;
        // }

        that.labelAreas(polygon,area);

        let collisionFlag = that.checkCollision(polygon);

        // console.log(collisionFlag)
        if (!collisionFlag) {
          that.tempPartLayer.removeAll();

          that.thatVue.partForm.code ='';
          that.thatVue.partForm.name ='';
          that.thatVue.partForm.zone ='';
          that.thatVue.partForm.area =0;
          that.thatVue.partForm.userCount =0;
          that.thatVue.partForm.pipeLength =0;
          that.thatVue.partForm.pipeInfo ='';
          that.thatVue.partForm.flowCount =0;
          that.thatVue.partForm.monitorList =[];
          that.thatVue.partForm.waterUserList =[];
          that.thatVue.partForm.flowLow =0;
          that.thatVue.partForm.flowHigh =0;
          that.thatVue.partForm.pressLow =0;
          that.thatVue.partForm.pressHigh =0;
        }
      };



    }

    EleClash.prototype.draw_polygon = function (flag) {
      let that = this;

      console.log(flag);

      if(!flag){
        that.draw.reset();
        that.draw.complete();
        console.log('删除了没');
          return;
      }

      let action = that.draw.create('polygon');
      that.view.focus();
      action.on('vertex-add', that.drawPolygon);

      action.on('draw-complete', that.drawPolygon_last);
    };

    return EleClash;

  }());
  return EleClash;
});
