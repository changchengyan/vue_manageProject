import XLSX from 'xlsx';
import proj4 from 'proj4';
  export  let excelInGIS = {
    methods:{
      importGISExcel(e){
        let files = e.target.files;
        if(files.length == 0) return;
        let f = files[0];
        if(!/\.xls$/g.test(f.name)) {
          alert('仅支持读取excel文件！');
          return;
        }
        this.$refs.importExcelId.value=null;

        let reader = new FileReader();
        reader.onload = e => {
          let data = e.target.result;
          let workbook = XLSX.read(data, {type: 'binary'});
          let jsDatas = XLSX.utils.sheet_to_json(workbook.Sheets['给水']);
          // console.log('jsDatas', jsDatas);
          // for(let key in workbook.Sheets['给水']){
          //     if(key[0] !== '!'){
          //         worksheet[key].v
          //     }
          // }
          //导入给水管网数据
          //先将空间数据由2433坐标系转为4326坐标系
          let projection2433 = '+proj=tmerc +lat_0=0 +lon_0=108 +k=1 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs';
          let isValideData = true;
          jsDatas.forEach(node => {
            if(parseFloat(node.Y).toString() == 'NaN' || parseFloat(node.X).toString() == 'NaN'){
              console.log(node.图上点号,node.X + '  ' + node.Y);
              isValideData = false;
            }else{
              let point = proj4(projection2433).inverse([node.Y, node.X]);
              node.X = point[0].toFixed(6);
              node.Y = point[1].toFixed(6);
            }
          });
          // console.log('jsDatasToWGS84', jsDatas);
          if(isValideData){
            let pipelines = [];//管网节点集合的数组
            let pipelineWKTs = [];//管网WKT格式数组
            let manholes = [];//检修井
            let fire_hydrants = [];//消防栓
            let valves = [];//阀门
            // let topuPipelines = {};//管线拓扑数据
            //将节点添加到对应的管线

            let addNodeToPipeline = function (node){
              let pipeNodes = [node];//用于处理管线为环状的情况
              let addNodeToPipelineTemp = function (node){
                if(!node.图上点号){
                  console.log('图上点号为空',node);
                }else if(!node.连接点号){//连接点号为空，则创建新的管线
                  node.pipelinesIndex = pipelines.push([node]) - 1;
                }else{
                  if(node.连接点号 == node.图上点号){
                    console.log('数据错误！连接点号和图上点号相同：',node.图上点号);
                    //创建新的管线，以避免连接点号和图上点号相同时后面的节点会出现异常
                    node.pipelinesIndex = pipelines.push([node]) - 1;
                  }else if(!jsDatas.some(node2 => {
                    if(node.连接点号 == node2.图上点号){//连接点号在此excel文件中匹配到对应的图上点号
                      //连接点号对应的图上点号的特征类似如下时，创建新管线
                      if(node2.特征 == '三通' || node2.特征 == '四通' || node2.特征 == '五通'){
                        node.pipelinesIndex = pipelines.push([node2, node]) - 1;
                        // console.log('三通、四通、五通：', node.pipelinesIndex, pipelines[node2.pipelinesIndex]);
                      }
                      //则将该节点添加到已有的管线
                      else if(node2.pipelinesIndex){//已添加到管线
                        pipelines[node2.pipelinesIndex].push(node);
                        node.pipelinesIndex = node2.pipelinesIndex;
                        // console.log('则节点添加到已有的管线：', node2.pipelinesIndex, pipelines[node2.pipelinesIndex]);
                      }else{//还没有添加到管线
                        // console.log('node：',node.图上点号);
                        // console.log('node2：',node2.图上点号);
                        if(!pipeNodes.some(pipeNode => {
                          if(pipeNode.连接点号 == node2.连接点号){
                            console.log('数据错误！管线节点出现循环：', pipeNode.图上点号, node.图上点号);
                          }
                          return true;
                        })){
                          pipeNodes.push(node2);
                          addNodeToPipelineTemp(node2);
                          pipelines[node2.pipelinesIndex].push(node);
                          node.pipelinesIndex = node2.pipelinesIndex;
                          // console.log('回溯时节点添加到已有的管线：', node2.pipelinesIndex, pipelines[node2.pipelinesIndex]);
                        }
                      }
                      return true;
                    }
                  })){//连接点号在此excel文件中匹配不到对应的图上点号，则创建新的管线
                    node.pipelinesIndex = pipelines.push([node]) - 1;
                  }
                }
              };
              addNodeToPipelineTemp(node);
            };
            // console.log('jsDatas：', jsDatas);
            jsDatas.forEach(node => {
              if(node.附属物 == '截止阀' && node.特征 == '变径'){
                valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                addNodeToPipeline(node);
              }else if(node.附属物 == '井盖' && node.特征 == '井盖'){
                manholes.push({ geometry: `POINT (${node.X} ${node.Y})` });
              }else if(node.附属物 == '流量计' && node.特征 == '流量计'){
                addNodeToPipeline(node);
              }else if(node.附属物 && node.特征){
                switch(node.附属物){
                  case '消防栓':
                    fire_hydrants.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    break;
                  case '井盖':
                    manholes.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    break;
                  case '截止阀':
                  case '排气阀':
                  case '排泥阀':
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    break;
                  case '2个截止阀':
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    break;
                  case '3个截止阀':
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    break;
                  case '4个截止阀':
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    break;
                  case '5个截止阀':
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    break;
                  case '水表':
                  case '截至闸':
                    break;
                  default:
                    console.log(node.图上点号,`附属物列值：${node.附属物} 和特征列值：${node.特征} 同时有值时未处理的类型`);
                }
                switch(node.特征){
                  case '泄压阀':
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    addNodeToPipeline(node);
                    break;
                  case '三通':
                  case '四通':
                  case '五通':
                  case '预留口':
                    addNodeToPipeline(node);
                    break;
                  case '变径':
                  case '支管':
                  case '超越管':
                  case '连通':
                  case '放空管':
                  case '拐点':
                  case '流量计':
                    addNodeToPipeline(node);
                    break;
                  default:
                    console.log(node.图上点号,`附属物列值：${node.附属物} 和特征列值：${node.特征} 同时有值时未处理的类型`);
                }
              }else if(node.附属物){
                switch(node.附属物){
                  case '截止阀':
                  case '截止阀（有表）':
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    addNodeToPipeline(node);
                    break;
                  case '2个截止阀':
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    addNodeToPipeline(node);
                    break;
                  case '3个截止阀':
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    addNodeToPipeline(node);
                    break;
                  case '截止阀/消防栓':
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    fire_hydrants.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    addNodeToPipeline(node);
                    break;
                  case '截止阀、排气阀':
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    addNodeToPipeline(node);
                    break;
                  case '截止阀、水表':
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    addNodeToPipeline(node);
                    break;
                  case '2个排气阀，1个截止阀':
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    addNodeToPipeline(node);
                    break;
                  case '井盖、截止阀':
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    manholes.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    addNodeToPipeline(node);
                    break;
                  case '井盖':
                    manholes.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    break;
                  case '消防井':
                    manholes.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    addNodeToPipeline(node);
                    break;
                  case '消防栓':
                    fire_hydrants.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    addNodeToPipeline(node);
                    break;
                  case '排气阀':
                  case '排泥阀':
                  case '电磁阀':
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    addNodeToPipeline(node);
                    break;
                  case '2个排泥阀':
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    addNodeToPipeline(node);
                    break;
                  case '3个排泥阀':
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    valves.push({ geometry: `POINT (${node.X} ${node.Y})` });
                    addNodeToPipeline(node);
                    break;
                  case '水表':
                  case '水':
                  case '变压器':
                  case '流量计':
                  case '传感器':
                  case '截至闸':
                  case '计量间':
                  case '计量器':
                  case '泵房':
                  case '泵站':
                  case '水泵':
                  case '变径':
                  case '预留口':
                  case '堵头':
                  case '水龙头':
                    addNodeToPipeline(node);
                    break;
                  default:
                    console.log(node.图上点号,'未知的附属物类型：' + node.附属物);
                }
              }else if(node.特征){
                switch(node.特征){
                  case '三通':
                  case '四通':
                  case '五通':
                  case '变径':
                  case '一般点':
                  case '封':
                  case '管头止':
                  case '管止':
                  case '管头':
                  case '拐点':
                  case '支管':
                  case '管线点':
                  case '泵房':
                  case '放空管':
                  case '计量间':
                    addNodeToPipeline(node);
                    break;
                  default:
                    console.log(node.图上点号,'未知的特征类型：' + node.特征);
                }
              }else{
                // console.log(node.图上点号,'特征和附属物列都没有值！');
                if(node.连接点号){
                  addNodeToPipeline(node);
                }else{//创建新的管线
                  node.pipelinesIndex = pipelines.push([node]) - 1;
                }
              }
            });
            // console.log('pipelines', pipelines);
            for(let i=0;i<pipelines.length;i++){
              //删除只有一个节点的无效管线
              if(pipelines[i].length <= 1){
                pipelines.splice(i,1);
                i--;
              }else{//将管线节点数组转换为wkt格式
                let ps = '';
                pipelines[i].forEach(node => { ps += `,${node.X} ${node.Y}`; });
                ps = ps.substring(1,ps.length-1);
                pipelineWKTs.push({ geometry: `MULTILINESTRING ((${ ps }))` });
              }
            }
            //添加到地图对应图层上
            console.log('pipelineWKTs', pipelineWKTs);
            this.optionalLayers['pipeline'].loadWKTData(pipelineWKTs,null);
            this.optionalLayers['manhole'].loadWKTData(manholes,null);
            this.optionalLayers['fire_hydrant'].loadWKTData(fire_hydrants,null);
            this.optionalLayers['valve'].loadWKTData(valves,null);
            console.log('this.optionalLayers', this.optionalLayers);
          }
        };
        reader.readAsBinaryString(f);
      },
      guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
        });
      },
    }
  };
