/**
 *
 * @param value
 * @returns {string}
 * @dssc 格式化 度分秒
 */

export  function formatDegree(value) {
  ///<summary>将度转换成为度分秒</summary>

  value = Math.abs(value);
  var v1 = Math.floor(value);//度
  var v2 = Math.floor((value - v1) * 60);//分
  var v3 = Math.round((value - v1) * 3600 % 60);//秒
  return v1 + '°' + v2 + '\'' + v3 + '"';
}

/**
 *
 * @param layer 图层
 * @param map
 * @param name  要素名字
 * @ return 空间数据
 */

export function queryEle(map,layer,name) {

  let temp_graphic = null;

  console.log(layer);
  console.log(name);

  let graphics = layer.graphics&&layer.graphics.items.length>0?layer.graphics.items:[];
  for(let i=0;i<graphics.length;i++){
    if(graphics[i].attributes.name==name){
      temp_graphic = graphics[i];
      break;
    }
  }
  return temp_graphic;
}

/**
 *  修改 空间要素的 属性
 */

export function updateAttr(layer,name) {

  let graphics = layer.graphics&&layer.graphics.items.length>0?layer.graphics.items:[];



  for(let i=0;i<graphics.length;i++){
    if(graphics[i].attributes.name==''){
      graphics[i].attributes.name =name;
      break;
    }
  }



}
