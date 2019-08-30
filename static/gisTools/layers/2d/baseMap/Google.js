/**
 * Created by dell on 2017/8/9.
 * 绘制工具，目前可以绘制点，线，面，圆，等后续api更新后可能会弃用QAQ
 * version:0.2.0;
 */

define([
    'dojo/on',
    'esri/core/Accessor',
    'dojo/Evented',
  ],
  function (on,Accessor, Evented) {
    var Google=Accessor.createSubclass([Evented],{
      declaredClass: 'dse.layers.2d.baseMap.Google',
      constructor:function(options){
        this.view=options.view;
        this.clear(options);
      },

      clear:function(options){
        console.log(options);
      },
    });
    return Google;
  });
