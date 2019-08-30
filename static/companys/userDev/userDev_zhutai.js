(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:



(lib.控制器 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AkIAYIAmgtIHqgEIABAzg");
	this.shape.setTransform(31.7,3.1,1.196,1.196);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_1.setTransform(31.6,31.8,0.681,0.316);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_2.setTransform(31.9,90.9,0.313,0.315);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E1E0E0").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_3.setTransform(31.7,44.2,1.196,1.196);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,63.5,101);


// stage content:
(lib.联户表井 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FFFFFF","#666666"],[0,1],0,0,0,0,0,215.3).s().p("AgXWhQBLpdjbmKQixk7lkilQj/h3k/ggQhkgLheAAIhLACIgU0AQWCgcMSHJQJ2FtDOKQQCTHUhQI3QgoEchGC+g");
	this.shape.setTransform(1653.5,786.3,0.12,0.148,90,0,0,154.5,32.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#FFFFFF","#666666"],[0,1],0,0,0,0,0,215.3).s().p("AgXWhQBLpdjbmKQixk7lkilQj/h3k/ggQhkgLheAAIhLACIgU0AQWCgcMSHJQJ2FtDOKQQCTHUhQI3QgoEchGC+g");
	this.shape_1.setTransform(1473.1,1032.3,0.12,0.148,90,0,0,154.5,32.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.rf(["#FFFFFF","#666666"],[0,1],0,0,0,0,0,215.3).s().p("AgXWhQBLpdjbmKQixk7lkilQj/h3k/ggQhkgLheAAIhLACIgU0AQWCgcMSHJQJ2FtDOKQQCTHUhQI3QgoEchGC+g");
	this.shape_2.setTransform(1482,482.2,0.12,0.148);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// 图层 1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#187FC4","#0060D4"],[0,1],50,0,-50,0).s().p("Am+D6QgWAAgQgQQgPgPAAgWIAAmJQAAgWAPgQQAQgPAWAAIN9AAQAVAAAQAPQAQAQAAAWIAAGJQAAAWgQAPQgQAQgVAAg");
	this.shape_3.setTransform(217.7,169.2,0.537,0.537);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.792,1],23.5,40.7,-23.4,-40.7).s().p("AlMFNQiJiKAAjDQAAjCCJiJQCKiKDCAAQDCAACKCKQCKCJAADCQAADDiKCKQiKCJjCAAQjCAAiKiJg");
	this.shape_4.setTransform(218.8,245.5,0.537,0.537);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],34,58.9,-34,-58.9).s().p("AngHhQjHjHAAkaQAAkZDHjHQDHjHEZAAQEaAADHDHQDHDHAAEZQAAEajHDHQjHDHkaAAQkZAAjHjHg");
	this.shape_5.setTransform(218.8,244.4,0.537,0.537);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(106,248,255,0.698)"],[0,0.035,1],74.7,125.8,-71.1,-126.8).s().p("AKvQdQjloLi5h2QiThfhyCmQhQB3g3DtQgcB3gMBfIh8BWIp1gWMgASgjPIdNgVMgASAkPg");
	this.shape_6.setTransform(218,193.4,0.537,0.537);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],-92,0,92,0).s().p("AlkWXQijhDh9h6Qh9h5hFieQhHikAAizQAAhDAKhDQgUgXAAgdIAA83QAAgkAdgZQAdgZAqAAIZnAAQApAAAdAZQAeAZAAAkIAAc3QAAAjgeAZQAKBCAAA8QAACzhHCkQhFCeh9B5Qh+B6iiBDQioBFi3AAQi4AAiohFg");
	this.shape_7.setTransform(218.3,212.8,0.537,0.537);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#00FF00").s().p("AguAvQgTgTAAgcQAAgaATgUQAUgTAaAAQAcAAATATQATAUAAAaQAAAcgTATQgTATgcAAQgaAAgUgTg");
	this.shape_8.setTransform(1256.7,956.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#009933").s().p("AhFBHQgdgegBgpQABgoAdgeQAdgdAoAAQAqAAAcAdQAdAeAAAoQAAApgdAeQgcAcgqAAQgoAAgdgcgAgtgsQgUAUAAAaQAAAcAUAUQATATAbAAQAcAAATgTQATgUAAgcQAAgagTgUQgTgTgcAAQgbAAgTATg");
	this.shape_9.setTransform(1256.7,956.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.lf(["#187FC4","#0060D4"],[0,1],50,0,-50,0).s().p("Am+D6QgWAAgQgQQgPgPAAgWIAAmJQAAgWAPgQQAQgPAWAAIN9AAQAVAAAQAPQAQAQAAAWIAAGJQAAAWgQAPQgQAQgVAAg");
	this.shape_10.setTransform(1221.7,910.4,0.537,0.537,0,180,0);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.792,1],23.5,40.7,-23.4,-40.7).s().p("AlMFNQiJiKAAjDQAAjCCJiJQCKiKDCAAQDCAACKCKQCKCJAADCQAADDiKCKQiKCJjCAAQjCAAiKiJg");
	this.shape_11.setTransform(1222.8,834.1,0.537,0.537,0,180,0);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],34,58.9,-34,-58.9).s().p("AngHhQjHjHAAkaQAAkZDHjHQDHjHEZAAQEaAADHDHQDHDHAAEZQAAEajHDHQjHDHkaAAQkZAAjHjHg");
	this.shape_12.setTransform(1222.8,835.2,0.537,0.537,0,180,0);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(106,248,255,0.698)"],[0,0.035,1],74.7,125.8,-71.1,-126.8).s().p("AKvQdQjloLi5h2QiThfhyCmQhQB3g3DtQgcB3gMBfIh8BWIp1gWMgASgjPIdNgVMgASAkPg");
	this.shape_13.setTransform(1222,886.2,0.537,0.537,0,180,0);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],-92,0,92,0).s().p("AlkWXQijhDh9h6Qh9h5hFieQhHikAAizQAAhDAKhDQgUgXAAgdIAA83QAAgkAdgZQAdgZAqAAIZnAAQApAAAdAZQAeAZAAAkIAAc3QAAAjgeAZQAKBCAAA8QAACzhHCkQhFCeh9B5Qh+B6iiBDQioBFi3AAQi4AAiohFg");
	this.shape_14.setTransform(1222.3,866.8,0.537,0.537,0,180,0);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#00FF00").s().p("AguAvQgTgTAAgcQAAgaATgUQAUgTAaAAQAcAAATATQATAUAAAaQAAAcgTATQgTATgcAAQgaAAgUgTg");
	this.shape_15.setTransform(1027,956.5);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#009933").s().p("AhEBHQgegegBgpQABgoAegeQAcgdAoAAQAqAAAcAdQAdAeABAoQgBApgdAeQgcAcgqAAQgoAAgcgcgAgtgsQgTAUAAAaQAAAcATAUQAUATAbAAQAbAAATgTQAUgUAAgcQAAgagUgUQgTgTgbAAQgbAAgUATg");
	this.shape_16.setTransform(1026.9,956.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.lf(["#187FC4","#0060D4"],[0,1],50,0,-50,0).s().p("Am+D6QgWAAgQgQQgPgPAAgWIAAmJQAAgWAPgQQAQgPAWAAIN9AAQAVAAAQAPQAQAQAAAWIAAGJQAAAWgQAPQgQAQgVAAg");
	this.shape_17.setTransform(992,910.4,0.537,0.537,0,180,0);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.792,1],23.5,40.7,-23.4,-40.7).s().p("AlMFNQiJiKAAjDQAAjCCJiJQCKiKDCAAQDCAACKCKQCKCJAADCQAADDiKCKQiKCJjCAAQjCAAiKiJg");
	this.shape_18.setTransform(993.1,834.1,0.537,0.537,0,180,0);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],34,58.9,-34,-58.9).s().p("AngHhQjHjHAAkaQAAkZDHjHQDHjHEZAAQEaAADHDHQDHDHAAEZQAAEajHDHQjHDHkaAAQkZAAjHjHg");
	this.shape_19.setTransform(993.1,835.2,0.537,0.537,0,180,0);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(106,248,255,0.698)"],[0,0.035,1],74.7,125.8,-71.1,-126.8).s().p("AKvQdQjloLi5h2QiThfhyCmQhQB3g3DtQgcB3gMBfIh8BWIp1gWMgASgjPIdNgVMgASAkPg");
	this.shape_20.setTransform(992.3,886.2,0.537,0.537,0,180,0);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],-92,0,92,0).s().p("AlkWXQijhDh9h6Qh9h5hFieQhHikAAizQAAhDAKhDQgUgXAAgdIAA83QAAgkAdgZQAdgZAqAAIZnAAQApAAAdAZQAeAZAAAkIAAc3QAAAjgeAZQAKBCAAA8QAACzhHCkQhFCeh9B5Qh+B6iiBDQioBFi3AAQi4AAiohFg");
	this.shape_21.setTransform(992.5,866.8,0.537,0.537,0,180,0);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#00FF00").s().p("AguAvQgTgTAAgcQAAgaATgUQAUgTAaAAQAcAAATATQATAUAAAaQAAAcgTATQgTATgcAAQgaAAgUgTg");
	this.shape_22.setTransform(793.6,956.5);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#009933").s().p("AhFBHQgdgegBgpQABgoAdgeQAdgdAoAAQAqAAAcAdQAdAeAAAoQAAApgdAeQgcAcgqAAQgoAAgdgcgAgtgsQgUAUABAaQgBAcAUAUQAUATAaAAQAcAAASgTQAUgUAAgcQAAgagUgUQgSgTgcAAQgaAAgUATg");
	this.shape_23.setTransform(793.5,956.3);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.lf(["#187FC4","#0060D4"],[0,1],50,0,-50,0).s().p("Am+D6QgWAAgQgQQgPgPAAgWIAAmJQAAgWAPgQQAQgPAWAAIN9AAQAVAAAQAPQAQAQAAAWIAAGJQAAAWgQAPQgQAQgVAAg");
	this.shape_24.setTransform(758.6,910.4,0.537,0.537,0,180,0);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.792,1],23.5,40.7,-23.4,-40.7).s().p("AlMFNQiJiKAAjDQAAjCCJiJQCKiKDCAAQDCAACKCKQCKCJAADCQAADDiKCKQiKCJjCAAQjCAAiKiJg");
	this.shape_25.setTransform(759.7,834.1,0.537,0.537,0,180,0);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],34,58.9,-34,-58.9).s().p("AngHhQjHjHAAkaQAAkZDHjHQDHjHEZAAQEaAADHDHQDHDHAAEZQAAEajHDHQjHDHkaAAQkZAAjHjHg");
	this.shape_26.setTransform(759.7,835.2,0.537,0.537,0,180,0);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(106,248,255,0.698)"],[0,0.035,1],74.7,125.8,-71.1,-126.8).s().p("AKvQdQjloLi5h2QiThfhyCmQhQB3g3DtQgcB3gMBfIh8BWIp1gWMgASgjPIdNgVMgASAkPg");
	this.shape_27.setTransform(758.9,886.2,0.537,0.537,0,180,0);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],-92,0,92,0).s().p("AlkWXQijhDh9h6Qh9h5hFieQhHikAAizQAAhDAKhDQgUgXAAgdIAA83QAAgkAdgZQAdgZAqAAIZnAAQApAAAdAZQAeAZAAAkIAAc3QAAAjgeAZQAKBCAAA8QAACzhHCkQhFCeh9B5Qh+B6iiBDQioBFi3AAQi4AAiohFg");
	this.shape_28.setTransform(759.2,866.8,0.537,0.537,0,180,0);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#009933").s().p("AhFBGQgdgdgBgpQABgoAdgeQAdgdAoAAQAqAAAcAdQAdAeAAAoQAAApgdAdQgcAdgqAAQgoAAgdgdgAgtgsQgUAUABAbQgBAbAUAUQATASAbABQAcgBASgSQAUgUAAgbQAAgbgUgUQgSgTgcAAQgbAAgTATg");
	this.shape_29.setTransform(562.2,951.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#00FF00").s().p("AguAvQgTgTAAgcQAAgaATgUQAUgTAaAAQAcAAATATQATAUAAAaQAAAcgTATQgTATgcAAQgaAAgUgTg");
	this.shape_30.setTransform(562.3,951.3);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.lf(["#187FC4","#0060D4"],[0,1],50,0,-50,0).s().p("Am+D6QgWAAgQgQQgPgPAAgWIAAmJQAAgWAPgQQAQgPAWAAIN9AAQAVAAAQAPQAQAQAAAWIAAGJQAAAWgQAPQgQAQgVAAg");
	this.shape_31.setTransform(535.3,910.4,0.537,0.537,0,180,0);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.792,1],23.5,40.7,-23.4,-40.7).s().p("AlMFNQiJiKAAjDQAAjCCJiJQCKiKDCAAQDCAACKCKQCKCJAADCQAADDiKCKQiKCJjCAAQjCAAiKiJg");
	this.shape_32.setTransform(536.4,834.1,0.537,0.537,0,180,0);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],34,58.9,-34,-58.9).s().p("AngHhQjHjHAAkaQAAkZDHjHQDHjHEZAAQEaAADHDHQDHDHAAEZQAAEajHDHQjHDHkaAAQkZAAjHjHg");
	this.shape_33.setTransform(536.4,835.2,0.537,0.537,0,180,0);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(106,248,255,0.698)"],[0,0.035,1],74.7,125.8,-71.1,-126.8).s().p("AKvQdQjloLi5h2QiThfhyCmQhQB3g3DtQgcB3gMBfIh8BWIp1gWMgASgjPIdNgVMgASAkPg");
	this.shape_34.setTransform(535.6,886.2,0.537,0.537,0,180,0);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],-92,0,92,0).s().p("AlkWXQijhDh9h6Qh9h5hFieQhHikAAizQAAhDAKhDQgUgXAAgdIAA83QAAgkAdgZQAdgZAqAAIZnAAQApAAAdAZQAeAZAAAkIAAc3QAAAjgeAZQAKBCAAA8QAACzhHCkQhFCeh9B5Qh+B6iiBDQioBFi3AAQi4AAiohFg");
	this.shape_35.setTransform(535.9,866.8,0.537,0.537,0,180,0);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#00FF00").s().p("AguAvQgTgUAAgbQAAgbATgTQAUgTAaAAQAcAAATATQATATAAAbQAAAbgTAUQgTATgcAAQgaAAgUgTg");
	this.shape_36.setTransform(1255.5,539.4);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#009933").s().p("AhFBHQgegeAAgpQAAgoAegeQAdgdAoAAQApAAAdAdQAdAeAAAoQAAApgdAeQgdAcgpAAQgoAAgdgcgAgtgwQgUATAAAcQAAAaAUATQATAUAbAAQAcAAATgUQATgTAAgaQAAgcgTgTQgTgUgcAAQgbAAgTAUg");
	this.shape_37.setTransform(1255.4,539.6);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.lf(["#187FC4","#0060D4"],[0,1],50,0,-50,0).s().p("Am+D6QgWAAgQgQQgPgPAAgWIAAmJQAAgWAPgQQAQgPAWAAIN9AAQAVAAAQAPQAQAQAAAWIAAGJQAAAWgQAPQgQAQgVAAg");
	this.shape_38.setTransform(1221.1,573.4,0.537,0.537);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.792,1],23.5,40.7,-23.4,-40.7).s().p("AlMFNQiJiKAAjDQAAjCCJiJQCKiKDCAAQDCAACKCKQCKCJAADCQAADDiKCKQiKCJjCAAQjCAAiKiJg");
	this.shape_39.setTransform(1222.2,649.7,0.537,0.537);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],34,58.9,-34,-58.9).s().p("AngHhQjHjHAAkaQAAkZDHjHQDHjHEZAAQEaAADHDHQDHDHAAEZQAAEajHDHQjHDHkaAAQkZAAjHjHg");
	this.shape_40.setTransform(1222.2,648.6,0.537,0.537);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(106,248,255,0.698)"],[0,0.035,1],74.7,125.8,-71.1,-126.8).s().p("AKvQdQjloLi5h2QiThfhyCmQhQB3g3DtQgcB3gMBfIh8BWIp1gWMgASgjPIdNgVMgASAkPg");
	this.shape_41.setTransform(1221.4,597.6,0.537,0.537);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],-92,0,92,0).s().p("AlkWXQijhDh9h6Qh9h5hFieQhHikAAizQAAhDAKhDQgUgXAAgdIAA83QAAgkAdgZQAdgZAqAAIZnAAQApAAAdAZQAeAZAAAkIAAc3QAAAjgeAZQAKBCAAA8QAACzhHCkQhFCeh9B5Qh+B6iiBDQioBFi3AAQi4AAiohFg");
	this.shape_42.setTransform(1221.6,616.9,0.537,0.537);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#00FF00").s().p("AguAvQgTgUAAgbQAAgbATgTQAUgTAaAAQAcAAATATQATATAAAbQAAAbgTAUQgTATgcAAQgaAAgUgTg");
	this.shape_43.setTransform(1255.5,539.4);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#009933").s().p("AhFBHQgegeAAgpQAAgoAegeQAdgdAoAAQApAAAdAdQAdAeAAAoQAAApgdAeQgdAcgpAAQgoAAgdgcgAgtgwQgUATAAAcQAAAaAUATQATAUAbAAQAcAAATgUQATgTAAgaQAAgcgTgTQgTgUgcAAQgbAAgTAUg");
	this.shape_44.setTransform(1255.4,539.6);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#00FF00").s().p("AguAvQgTgUAAgbQAAgbATgTQAUgTAaAAQAcAAATATQATATAAAbQAAAbgTAUQgTATgcAAQgaAAgUgTg");
	this.shape_45.setTransform(1021.2,539.4);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#009933").s().p("AhFBHQgegeAAgpQAAgoAegeQAdgdAoAAQAqAAAcAdQAdAeABAoQgBApgdAeQgcAcgqAAQgoAAgdgcgAgtgwQgTATAAAcQAAAaATATQAUAUAbAAQAbAAATgUQAUgTgBgaQABgcgUgTQgTgUgbAAQgbAAgUAUg");
	this.shape_46.setTransform(1021.1,539.6);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.lf(["#187FC4","#0060D4"],[0,1],50,0,-50,0).s().p("Am+D6QgWAAgQgQQgPgPAAgWIAAmJQAAgWAPgQQAQgPAWAAIN9AAQAVAAAQAPQAQAQAAAWIAAGJQAAAWgQAPQgQAQgVAAg");
	this.shape_47.setTransform(985.9,573.4,0.537,0.537);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.792,1],23.5,40.7,-23.4,-40.7).s().p("AlMFNQiJiKAAjDQAAjCCJiJQCKiKDCAAQDCAACKCKQCKCJAADCQAADDiKCKQiKCJjCAAQjCAAiKiJg");
	this.shape_48.setTransform(987,649.7,0.537,0.537);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],34,58.9,-34,-58.9).s().p("AngHhQjHjHAAkaQAAkZDHjHQDHjHEZAAQEaAADHDHQDHDHAAEZQAAEajHDHQjHDHkaAAQkZAAjHjHg");
	this.shape_49.setTransform(987,648.6,0.537,0.537);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(106,248,255,0.698)"],[0,0.035,1],74.7,125.8,-71.1,-126.8).s().p("AKvQdQjloLi5h2QiThfhyCmQhQB3g3DtQgcB3gMBfIh8BWIp1gWMgASgjPIdNgVMgASAkPg");
	this.shape_50.setTransform(986.2,597.6,0.537,0.537);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],-92,0,92,0).s().p("AlkWXQijhDh9h6Qh9h5hFieQhHikAAizQAAhDAKhDQgUgXAAgdIAA83QAAgkAdgZQAdgZAqAAIZnAAQApAAAdAZQAeAZAAAkIAAc3QAAAjgeAZQAKBCAAA8QAACzhHCkQhFCeh9B5Qh+B6iiBDQioBFi3AAQi4AAiohFg");
	this.shape_51.setTransform(986.4,616.9,0.537,0.537);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#00FF00").s().p("AguAvQgTgUAAgbQAAgbATgTQAUgTAaAAQAcAAATATQATATAAAbQAAAbgTAUQgTATgcAAQgaAAgUgTg");
	this.shape_52.setTransform(1021.2,539.4);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#009933").s().p("AhFBHQgegeAAgpQAAgoAegeQAdgdAoAAQAqAAAcAdQAdAeABAoQgBApgdAeQgcAcgqAAQgoAAgdgcgAgtgwQgTATAAAcQAAAaATATQAUAUAbAAQAbAAATgUQAUgTgBgaQABgcgUgTQgTgUgbAAQgbAAgUAUg");
	this.shape_53.setTransform(1021.1,539.6);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#00FF00").s().p("AguAvQgTgUAAgbQAAgbATgTQAUgTAaAAQAcAAATATQATATAAAbQAAAbgTAUQgTATgcAAQgaAAgUgTg");
	this.shape_54.setTransform(786.9,539.4);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#009933").s().p("AhFBHQgdgeAAgpQAAgoAdgeQAdgdAoAAQApAAAeAdQAdAeAAAoQAAApgdAeQgeAcgpAAQgoAAgdgcgAgtgwQgTATgBAcQABAaATATQAUAUAaAAQAcAAASgUQAUgTAAgaQAAgcgUgTQgSgUgcAAQgaAAgUAUg");
	this.shape_55.setTransform(786.8,539.6);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.lf(["#187FC4","#0060D4"],[0,1],50,0,-50,0).s().p("Am+D6QgWAAgQgQQgPgPAAgWIAAmJQAAgWAPgQQAQgPAWAAIN9AAQAVAAAQAPQAQAQAAAWIAAGJQAAAWgQAPQgQAQgVAAg");
	this.shape_56.setTransform(752.1,573.4,0.537,0.537);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.792,1],23.5,40.7,-23.4,-40.7).s().p("AlMFNQiJiKAAjDQAAjCCJiJQCKiKDCAAQDCAACKCKQCKCJAADCQAADDiKCKQiKCJjCAAQjCAAiKiJg");
	this.shape_57.setTransform(753.2,649.7,0.537,0.537);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],34,58.9,-34,-58.9).s().p("AngHhQjHjHAAkaQAAkZDHjHQDHjHEZAAQEaAADHDHQDHDHAAEZQAAEajHDHQjHDHkaAAQkZAAjHjHg");
	this.shape_58.setTransform(753.2,648.6,0.537,0.537);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(106,248,255,0.698)"],[0,0.035,1],74.7,125.8,-71.1,-126.8).s().p("AKvQdQjloLi5h2QiThfhyCmQhQB3g3DtQgcB3gMBfIh8BWIp1gWMgASgjPIdNgVMgASAkPg");
	this.shape_59.setTransform(752.4,597.6,0.537,0.537);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],-92,0,92,0).s().p("AlkWXQijhDh9h6Qh9h5hFieQhHikAAizQAAhDAKhDQgUgXAAgdIAA83QAAgkAdgZQAdgZAqAAIZnAAQApAAAdAZQAeAZAAAkIAAc3QAAAjgeAZQAKBCAAA8QAACzhHCkQhFCeh9B5Qh+B6iiBDQioBFi3AAQi4AAiohFg");
	this.shape_60.setTransform(752.7,616.9,0.537,0.537);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#00FF00").s().p("AguAvQgTgUAAgbQAAgbATgTQAUgTAaAAQAcAAATATQATATAAAbQAAAbgTAUQgTATgcAAQgaAAgUgTg");
	this.shape_61.setTransform(786.9,539.4);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#009933").s().p("AhFBHQgdgeAAgpQAAgoAdgeQAdgdAoAAQApAAAeAdQAdAeAAAoQAAApgdAeQgeAcgpAAQgoAAgdgcgAgtgwQgTATgBAcQABAaATATQAUAUAaAAQAcAAASgUQAUgTAAgaQAAgcgUgTQgSgUgcAAQgaAAgUAUg");
	this.shape_62.setTransform(786.8,539.6);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#00FF00").s().p("AguAvQgTgUAAgbQAAgbATgTQAUgTAaAAQAcAAATATQATATAAAbQAAAbgTAUQgTATgcAAQgaAAgUgTg");
	this.shape_63.setTransform(569.8,539.4);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#009933").s().p("AhFBHQgdgegBgpQABgoAdgeQAdgdAoAAQAqAAAdAdQAcAeAAAoQAAApgcAeQgdAcgqAAQgoAAgdgcgAgtgwQgTATAAAcQAAAaATATQAUAUAaAAQAcAAASgUQAUgTAAgaQAAgcgUgTQgSgUgcAAQgaAAgUAUg");
	this.shape_64.setTransform(569.8,539.6);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.lf(["#187FC4","#0060D4"],[0,1],50,0,-50,0).s().p("Am+D6QgWAAgQgQQgPgPAAgWIAAmJQAAgWAPgQQAQgPAWAAIN9AAQAVAAAQAPQAQAQAAAWIAAGJQAAAWgQAPQgQAQgVAAg");
	this.shape_65.setTransform(542.2,573.4,0.537,0.537);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.792,1],23.5,40.7,-23.4,-40.7).s().p("AlMFNQiJiKAAjDQAAjCCJiJQCKiKDCAAQDCAACKCKQCKCJAADCQAADDiKCKQiKCJjCAAQjCAAiKiJg");
	this.shape_66.setTransform(543.3,649.7,0.537,0.537);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],34,58.9,-34,-58.9).s().p("AngHhQjHjHAAkaQAAkZDHjHQDHjHEZAAQEaAADHDHQDHDHAAEZQAAEajHDHQjHDHkaAAQkZAAjHjHg");
	this.shape_67.setTransform(543.3,648.6,0.537,0.537);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(106,248,255,0.698)"],[0,0.035,1],74.7,125.8,-71.1,-126.8).s().p("AKvQdQjloLi5h2QiThfhyCmQhQB3g3DtQgcB3gMBfIh8BWIp1gWMgASgjPIdNgVMgASAkPg");
	this.shape_68.setTransform(542.5,597.6,0.537,0.537);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],-92,0,92,0).s().p("AlkWXQijhDh9h6Qh9h5hFieQhHikAAizQAAhDAKhDQgUgXAAgdIAA83QAAgkAdgZQAdgZAqAAIZnAAQApAAAdAZQAeAZAAAkIAAc3QAAAjgeAZQAKBCAAA8QAACzhHCkQhFCeh9B5Qh+B6iiBDQioBFi3AAQi4AAiohFg");
	this.shape_69.setTransform(542.7,616.9,0.537,0.537);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#00FF00").s().p("AguAvQgTgUAAgbQAAgbATgTQAUgTAaAAQAcAAATATQATATAAAbQAAAbgTAUQgTATgcAAQgaAAgUgTg");
	this.shape_70.setTransform(569.8,539.4);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#009933").s().p("AhFBHQgdgegBgpQABgoAdgeQAdgdAoAAQAqAAAdAdQAcAeAAAoQAAApgcAeQgdAcgqAAQgoAAgdgcgAgtgwQgTATAAAcQAAAaATATQAUAUAaAAQAcAAASgUQAUgTAAgaQAAgcgUgTQgSgUgcAAQgaAAgUAUg");
	this.shape_71.setTransform(569.8,539.6);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#00FF00").s().p("AguAvQgTgUAAgbQAAgbATgTQAUgTAaAAQAcAAATATQATATAAAbQAAAbgTAUQgTATgcAAQgaAAgUgTg");
	this.shape_72.setTransform(348.9,539.4);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#009933").s().p("AhFBHQgdgeAAgpQAAgoAdgeQAdgdAoAAQApAAAdAdQAeAeAAAoQAAApgeAeQgdAcgpAAQgoAAgdgcgAgtgwQgTATgBAcQABAaATATQATAUAbAAQAbAAAUgUQATgTAAgaQAAgcgTgTQgUgUgbAAQgbAAgTAUg");
	this.shape_73.setTransform(348.9,539.6);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.lf(["#187FC4","#0060D4"],[0,1],50,0,-50,0).s().p("Am+D6QgWAAgQgQQgPgPAAgWIAAmJQAAgWAPgQQAQgPAWAAIN9AAQAVAAAQAPQAQAQAAAWIAAGJQAAAWgQAPQgQAQgVAAg");
	this.shape_74.setTransform(314.9,573.4,0.537,0.537);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.792,1],23.5,40.7,-23.4,-40.7).s().p("AlMFNQiJiKAAjDQAAjCCJiJQCKiKDCAAQDCAACKCKQCKCJAADCQAADDiKCKQiKCJjCAAQjCAAiKiJg");
	this.shape_75.setTransform(316,649.7,0.537,0.537);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],34,58.9,-34,-58.9).s().p("AngHhQjHjHAAkaQAAkZDHjHQDHjHEZAAQEaAADHDHQDHDHAAEZQAAEajHDHQjHDHkaAAQkZAAjHjHg");
	this.shape_76.setTransform(316,648.6,0.537,0.537);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(106,248,255,0.698)"],[0,0.035,1],74.7,125.8,-71.1,-126.8).s().p("AKvQdQjloLi5h2QiThfhyCmQhQB3g3DtQgcB3gMBfIh8BWIp1gWMgASgjPIdNgVMgASAkPg");
	this.shape_77.setTransform(315.2,597.6,0.537,0.537);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.lf(["#0081BF","#FFFFFF","rgba(42,157,255,0.698)","rgba(42,157,255,0.698)"],[0,0.494,0.792,1],-92,0,92,0).s().p("AlkWXQijhDh9h6Qh9h5hFieQhHikAAizQAAhDAKhDQgUgXAAgdIAA83QAAgkAdgZQAdgZAqAAIZnAAQApAAAdAZQAeAZAAAkIAAc3QAAAjgeAZQAKBCAAA8QAACzhHCkQhFCeh9B5Qh+B6iiBDQioBFi3AAQi4AAiohFg");
	this.shape_78.setTransform(315.4,616.9,0.537,0.537);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]}).wait(1));

	// flash0.ai
	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_79.setTransform(1130.8,904.8,0.558,0.573,0,180,0);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_80.setTransform(1086,955.8,0.661,0.329,0,-90,90);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_81.setTransform(895.4,905.9,0.558,0.573,0,180,0);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_82.setTransform(850.5,956.9,0.661,0.329,0,-90,90);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_83.setTransform(673.4,903.7,0.558,0.573,0,180,0);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_84.setTransform(628.6,954.7,0.661,0.329,0,-90,90);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_85.setTransform(457.8,905.9,0.558,0.573,0,180,0);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_86.setTransform(412.9,956.9,0.661,0.329,0,-90,90);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_87.setTransform(1158.5,586.4,0.7,0.574);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_88.setTransform(1102.5,535.6,0.662,0.413,-90);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_89.setTransform(931.7,589.4,0.7,0.574);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_90.setTransform(875.7,538.5,0.662,0.413,-90);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_91.setTransform(695.7,586.4,0.7,0.574);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_92.setTransform(639.6,535.6,0.662,0.413,-90);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_93.setTransform(465.2,589.4,0.7,0.574);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_94.setTransform(409.2,538.5,0.662,0.413,-90);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_95.setTransform(207.1,589.4,0.7,0.574);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_96.setTransform(151,538.5,0.662,0.413,-90);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_97.setTransform(1572.5,777.4,0.826,0.735);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_98.setTransform(1669.5,481.8,3.194,0.735,90);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_99.setTransform(1491,744.1,2.869,0.735,90);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_100.setTransform(761.5,471.4,8.028,0.735);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_101.setTransform(1232.2,778.3,2.656,1.004,90);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_102.setTransform(1000.2,782.3,2.656,1.004,90);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_103.setTransform(761.5,782.1,2.656,1.004,90);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_104.setTransform(538.9,780.1,2.656,1.004,90);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_105.setTransform(686.1,754.6,7.09,1.653);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#00FF00").s().p("AguAvQgTgUAAgbQAAgbATgTQAUgTAaAAQAcAAATATQATATAAAbQAAAbgTAUQgTATgcAAQgaAAgUgTg");
	this.shape_106.setTransform(349.6,540.4);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#009933").s().p("AhFBGQgegdAAgpQAAgoAegeQAdgdAoAAQApAAAdAdQAdAeAAAoQAAApgdAdQgdAdgpAAQgoAAgdgdgAgtgwQgUATAAAcQAAAaAUATQATAUAbAAQAbAAAUgUQATgTAAgaQAAgcgTgTQgUgUgbABQgbgBgTAUg");
	this.shape_107.setTransform(349.6,540.6);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_108.setTransform(764.1,1023.1,7.909,0.735);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f().s("#999999").ss(1,1,1).p("EgokgP+MBRJAAAIAAf9MhRJAAAg");
	this.shape_109.setTransform(390.7,219.4);

	this.text = new cjs.Text("水表", "25px 'SimHei'", "#333333");
	this.text.textAlign = "center";
	this.text.lineHeight = 27;
	this.text.parent = this;
	this.text.setTransform(336,203,1.346,1.346);

	this.instance = new lib.控制器("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(477.8,211.4,1.346,1.346,0,0,0,31.8,50.6);

	this.text_1 = new cjs.Text("网关", "25px 'SimHei'", "#333333");
	this.text_1.textAlign = "center";
	this.text_1.lineHeight = 27;
	this.text_1.parent = this;
	this.text_1.setTransform(588,203,1.346,1.346);

	this.text_2 = new cjs.Text("189457587", "20px 'SimHei'", "#333333");
	this.text_2.textAlign = "center";
	this.text_2.lineHeight = 22;
	this.text_2.parent = this;
	this.text_2.setTransform(1364.7,792.8,1.346,1.346);

	this.text_3 = new cjs.Text("189457987", "20px 'SimHei'", "#333333");
	this.text_3.textAlign = "center";
	this.text_3.lineHeight = 22;
	this.text_3.parent = this;
	this.text_3.setTransform(1109.9,789.3,1.346,1.346);

	this.text_4 = new cjs.Text("189456987", "20px 'SimHei'", "#333333");
	this.text_4.textAlign = "center";
	this.text_4.lineHeight = 22;
	this.text_4.parent = this;
	this.text_4.setTransform(887,789.3,1.346,1.346);

	this.text_5 = new cjs.Text("189456787", "20px 'SimHei'", "#333333");
	this.text_5.textAlign = "center";
	this.text_5.lineHeight = 22;
	this.text_5.parent = this;
	this.text_5.setTransform(637.4,789.3,1.346,1.346);

	this.text_6 = new cjs.Text("183456788", "20px 'SimHei'", "#333333");
	this.text_6.textAlign = "center";
	this.text_6.lineHeight = 22;
	this.text_6.parent = this;
	this.text_6.setTransform(1364.7,692.8,1.346,1.346);

	this.text_7 = new cjs.Text("183456789", "20px 'SimHei'", "#333333");
	this.text_7.textAlign = "center";
	this.text_7.lineHeight = 22;
	this.text_7.parent = this;
	this.text_7.setTransform(1105.3,692.8,1.346,1.346);

	this.text_8 = new cjs.Text("183455789", "20px 'SimHei'", "#333333");
	this.text_8.textAlign = "center";
	this.text_8.lineHeight = 22;
	this.text_8.parent = this;
	this.text_8.setTransform(880.8,692.8,1.346,1.346);

	this.text_9 = new cjs.Text("183456787", "20px 'SimHei'", "#333333");
	this.text_9.textAlign = "center";
	this.text_9.lineHeight = 22;
	this.text_9.parent = this;
	this.text_9.setTransform(637.4,692.8,1.346,1.346);

	this.text_10 = new cjs.Text("183456784", "20px 'SimHei'", "#333333");
	this.text_10.textAlign = "center";
	this.text_10.lineHeight = 22;
	this.text_10.parent = this;
	this.text_10.setTransform(428.8,692.8,1.346,1.346);

	this.instance_1 = new lib.控制器("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(1670.1,134.5,1.346,1.346,0,0,0,31.8,50.6);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#999999").s().p("AhvAHQAtgMA3gBIAXAAQA2ABAuAMg");
	this.shape_110.setTransform(1647.5,271.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_110},{t:this.instance_1},{t:this.text_10},{t:this.text_9},{t:this.text_8},{t:this.text_7},{t:this.text_6},{t:this.text_5},{t:this.text_4},{t:this.text_3},{t:this.text_2},{t:this.text_1},{t:this.instance},{t:this.text},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1019.1,606.5,1653.6,966.1);
// library properties:
lib.properties = {
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;