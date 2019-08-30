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



(lib.未标题1 = function() {
	this.initialize(img.未标题1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,500,500);


(lib.箭头2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00CCFF").s().p("AAVAMIhhAAIAAgYIBhAAIAAgxIA4A9Ig4A+g");
	this.shape.setTransform(7.7,6.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,15.5,12.4);


(lib.元件12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("AGzu/IAAADAmyu8IAAgDAGzPAItlAA");
	this.shape.setTransform(71.6,96);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00CCCC").s().p("AlnDwIAAnfILPAAIAAHfg");
	this.shape_1.setTransform(71.1,160.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#66CCFF").s().p("Aq7QtMAAAghZIEYAAIAAd8INmAAIAA98IDXAAIAAAMIAiAAIAAO2IgiAAIAASXg");
	this.shape_2.setTransform(70,107.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-1,140.1,215.2);


(lib.元件34 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层_1
	this.instance = new lib.箭头2("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(6.2,7.8,1,1,-90,0,0,7.7,6.2);

	this.instance_1 = new lib.箭头2("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(6.2,31.5,1,1,-90,0,0,7.7,6.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,12.4,39.2);


(lib.元件35 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层_1
	this.instance = new lib.元件34("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(19.6,6.2,1,1,90,0,0,6.2,19.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,39.2,12.4);


(lib.向左边 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层_1
	this.instance = new lib.元件35("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(19.6,6.2,1,1,180,0,0,19.6,6.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,39.2,12.4);


(lib.元件7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层_1
	this.instance = new lib.向左边("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(26.8,6.2,1.367,1,0,0,180,19.6,6.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.1,0,53.5,12.4);


// stage content:
(lib.蓄水池 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00FF00").s().p("AguAvQgTgUAAgbQAAgbATgTQAUgTAaAAQAcAAATATQATATAAAbQAAAbgTAUQgTATgcAAQgaAAgUgTg");
	this.shape.setTransform(486.6,614.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#009933").s().p("AhFBHQgdgeAAgpQAAgoAdgeQAdgcAoAAQApAAAdAcQAeAeAAAoQAAApgeAeQgdAcgpAAQgoAAgdgcgAgtgxQgTAUgBAcQABAaATAUQATATAbAAQAbAAAUgTQATgUAAgaQAAgcgTgUQgUgTgbAAQgbAAgTATg");
	this.shape_1.setTransform(486.6,614.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00FF00").s().p("AguAvQgTgUAAgbQAAgbATgTQAUgTAaAAQAcAAATATQATATAAAbQAAAbgTAUQgTATgcAAQgaAAgUgTg");
	this.shape_2.setTransform(1369.9,808.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#009933").s().p("AhFBHQgegeAAgpQAAgoAegeQAdgcAogBQApABAdAcQAdAeABAoQgBApgdAeQgdAcgpAAQgoAAgdgcgAgtgwQgUATAAAcQAAAaAUATQATAUAbAAQAbAAAUgUQATgTAAgaQAAgcgTgTQgUgUgbAAQgbAAgTAUg");
	this.shape_3.setTransform(1369.8,808.7);

	this.instance = new lib.未标题1();
	this.instance.parent = this;
	this.instance.setTransform(1254,744,0.275,0.275);

	this.instance_1 = new lib.未标题1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(373,554,0.275,0.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#009933").s().p("AhFBHQgegeABgpQgBgoAegdQAdgdAoAAQApAAAeAdQAdAdgBAoQABApgdAeQgeAdgpAAQgoAAgdgdgAgtgxQgTAUAAAbQAAAbATAUQATATAbAAQAcAAASgTQAUgUAAgbQAAgbgUgUQgSgSgcgBQgbABgTASg");
	this.shape_4.setTransform(1368.4,806.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#009933").s().p("AhFBGQgegdAAgpQAAgoAegdQAdgeAoAAQApAAAdAeQAdAdAAAoQAAApgdAdQgdAdgpAAQgoAAgdgdgAgtgwQgUATAAAbQAAAbAUATQATAUAbAAQAbAAAUgUQATgTAAgbQAAgbgTgTQgUgUgbABQgbgBgTAUg");
	this.shape_5.setTransform(488.6,613.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.shape_3},{t:this.shape_2,p:{x:1369.9,y:808.5}},{t:this.shape_1},{t:this.shape,p:{x:486.6,y:614.4}}]}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.shape_5},{t:this.shape_2,p:{x:488.7,y:613.5}},{t:this.shape_4},{t:this.shape,p:{x:1368.5,y:805.9}}]},39).wait(1));

	// 图层 1
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_6.setTransform(846.6,397.9,2.785,0.216,90);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.lf(["#187FC4","#0060D4"],[0,1],-20,0,20,0).s().p("AhjFjQgqAAgdgKQgdgMAAgPIAAp8QAAgPAdgLQAdgKAqAAIDHAAQApAAAdAKQAeALAAAPIAAJ8QAAAPgeAMQgdAKgpAAg");
	this.shape_7.setTransform(847.9,562.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["#0081BF","rgba(42,157,255,0.698)","rgba(106,248,255,0.698)"],[0,0.035,1],-20,0,20,0).s().p("AhjPUQgqAAgdgdQgdgeAAgpIAA7fQAAgpAdgeQAdgdAqAAIDHAAQApAAAdAdQAeAeAAApIAAbfQAAApgeAeQgdAdgpAAg");
	this.shape_8.setTransform(847.9,622.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]},38).wait(2));

	// 图层_3 复制
	this.instance_2 = new lib.元件7("synched",0);
	this.instance_2.parent = this;
	this.instance_2.setTransform(1089.6,841.7,1,1,0,0,0,26.8,6.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({x:1488,y:843.1},38).wait(2));

	// 图层_3
	this.instance_3 = new lib.元件7("synched",0);
	this.instance_3.parent = this;
	this.instance_3.setTransform(256,648.1,1,1,0,0,0,26.8,6.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({x:643.2},38).wait(2));

	// 图层_1
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_9.setTransform(1353.8,841.7,4.058,0.735);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#CCCCCC").s().p("AkIAYIAmgtIHqgEIABAzg");
	this.shape_10.setTransform(845.8,56.1,1.196,1.196);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#999999").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_11.setTransform(845.6,84.8,0.681,0.316);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#CCCCCC").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_12.setTransform(846,144,0.313,0.315);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#E1E0E0").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_13.setTransform(845.8,97.2,1.196,1.196);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#333333").s().p("AAcBvIABgcIAAhhIglAAIgdABIAAgTIAcABIAmAAIAAgxIgBgeIAVAAIgBAXIAAA4IAoAAIAagBIAAATIgZgBIgpAAIAABgIABAdgAhPBXQAHgIgBgPIAAhQIgoABIAAgTIAWABIAlAAIAAAmIAAA8QAQgRAKgNIANAPIgbAcIgYAZIgNgQgAhchfIAOgMIAoApIgQAPQgOgTgYgZg");
	this.shape_14.setTransform(932,668.8);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#333333").s().p("AhPByQACgRAAgeIAAhcQgPAZgJANQgHgNgGgFQAMgOAPgfQAQgfAHggQANAHAMADQgHAHgNAnIAAB7IABAwgABaBfIhjAAIghABIAAgUIAfABIAvAAQANgrALhEIAbAGQgEAFgHAYIgUBMIAiAAIAZgBIAAAUIgZgBgAgHAXQgGgVgKgZQAKgCAKgEQAQAwAKApIgTAHQgEgWgHgWgABRgzIhWAAIgcABIAAgSIAcABIBXAAIAagBIAAASIgbgBgAAKhoQAJgEAJgFIAVAjQgIACgNAHQgHgSgLgRg");
	this.shape_15.setTransform(906.9,668.8);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#333333").s().p("AgnBbQAPADAIgCQAGgCAAgLIAAiZQAAgZgCgOIAWAAIAAAaQgBAMACARQADARAQAXQAnghAIgSIATASQgMAJgMALIgiAdQAIAQAUAUQAVAVAdAIQgQAIgEAMQgkgXgVgbQgTgbgLgbIAABsQABANgLAGQgKAGgTACQgBgLgIgMgAhzBGQAbgTAQgaQAQgZAIghIgaAAQgPAAgSACIAAgVIAgABIAzAAQgGAagHAVQgHAUgMAVQgMAUgbAbQgHgJgNgFg");
	this.shape_16.setTransform(882.1,668.9);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#333333").s().p("ABIBuIAAgTIgvAAIAAASIgRAAIABgpIgBglIBRAAIgBApIABAmgAAZBNIAvAAIAAgfIgvAAgAhaBuIABgqIgBglIBNAAIgBAoIABAmIgQAAIAAgSIgrAAIAAATgAhIBNIArAAIAAgfIgrAAgAhxAMQAUAAARgDQARgDANgFQANgEAMgMIgrAAIgmABIAAgQIAmABIAwAAQADgJgBgNIAZAEQgGAGAAAMIAsAAQgIgHgHgFIAPgKQAHAGAHAIQgGADgFAFIAOAAIAngBIAAAQIgngBIgxAAQASAPAdAEQAdAFAVgCQgIAKgCAMQgZgCgRgEQgQgDgOgHQgPgHgSgTQgRAWgcAJQgdAKgcADQgDgMgHgHgAAIg1IAAgdIAAgaIBRAAIgBAaIABAdgAAZhEIAvAAIAAgbIgvAAgAhag1IABgcIgBgbIBNAAIgBAbIABAcgAhIhEIArAAIAAgbIgrAAg");
	this.shape_17.setTransform(978.5,100.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#333333").s().p("AA9BZQARAAAGgBQAGgBAAgMIAAibIgBgcIAVAAIgBAcIAACoQAAANgKAEQgKADgUADQgDgMgFgKgAgxBuIABgcIAAg2IgeAAIAAA+IgVAAIABgbIAAgVIgBgdIAzAAIAAgaIgfAAIgeABIAAgRIAeABIAfAAIAAgdIgiAAQgFAMgFAIQgJgGgIgEQAGgKAFgMQAFgNAEgQQAKAEANADQgGAKgEAJIAcAAIgBgmIAXAAIgBAmIAOAAIAigBIAAARIghgBIgPAAIAAAdIAYAAIAegBIAAAQIg2AAIAAAaIAzAAIgBAgIgBAcQgBAHgHADQgIAEgOADQgCgLgFgMQANAAACgBQADgCAAgNIAAgXIgeAAIAAA2IABAcgAAqA6QACgQAAgRIAAhQQAAgKgCgOIAVAAIgBAYIAABQIABAhg");
	this.shape_18.setTransform(952.9,99.9);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#333333").s().p("AhoBaQAQACAEgBQAFgCgBgKIAAg2QgIADgUAKQgCgNgEgJIAigKIAAgvIgHAAIgYABIAAgRIAYABIAHAAIAAgXQAAgQgCgQIAWAAQgCAMAAAQIAAAbIAWgBIAAARIgWgBIAAApIAWgKIABARIgXAKIAABDQgBAVgJADIgYAGQgDgQgFgIgABSBmIhRAAIgiABIAAgTQALACAVAAIAeAAIAAg8IgWAAQgRAAgMACIAAgTIAcABIA7AAIAggBIAAASIgfgBIgSAAIAAA8IAgAAQARAAASgCIAAATIghgBgAgdgFQAZgVAQgbQAKAIAJAEQgGAFgKAMQgJAMgTATgAAzgpIAPgLQAgAiAIAMIgQAKQgagigNgLgABdgqIAAgZIhoAAIAAAZIgTAAIABgTIgBgYIA6AAQgDgKgGgNIAXgFIAIAcIA+AAIgBAXIABAUg");
	this.shape_19.setTransform(928.4,99.9);

	this.instance_4 = new lib.元件12("synched",0);
	this.instance_4.parent = this;
	this.instance_4.setTransform(845,641.9,2.195,2.3,0,0,0,70,107.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AiMCYIACg+IAAh9QAAgcgCgVIAeAAQgEAUAAAfIAAC5gABEB7QAbAAAKgCQAJgCAAgUIAAjVIhgAAIgzACIAAgZQAYABAZAAIB9AAIgBA4IAADBQAAAYgSAGQgRAGgZADQgDgSgJgLgAhKB9IACg1IAAhRIgVAfIgQgQQAUgXAPgdQAPgdAFgXIAbANQgKAOgMAYIAACsgABFBzQgUgFgUgjQgNAOgbAYQgIgJgOgLQANgFAOgKQANgJAMgQQgJgRgJgwQgGgBgbAGIgDgXIAigFIgDhDQAPAEANAAQgDARAAAQQAAAOACANQAYgDAvgHIAEAWQgXACgzAHQADAcAJAaQAPgTAMgWQAIAFASAGQgJAJgLANQgKANgNAOQARAfAHgCQAHgDACgVQALAMAPAAQgPAqgSAAIgDAAgAAphVQAMgGAGgHIAZAeQgLAGgJAIQgNgVgKgKgAhziFIAZgTQAQAYAQATIgZASQgPgagRgQg");
	this.shape_20.setTransform(1368.3,723.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("Ag0B5QAUAEAKgDQAJgDAAgOIAAjMQAAgggDgUIAdAAIgBAjQAAAQADAWQADAXAVAfQA1gsAKgZIAaAZQgQAMgRAOIgsAnQAKAVAcAbQAbAcAmALQgWALgEAPQgxgegagkQgbgkgOgkIAACPQABATgOAHQgPAIgZADQgBgOgKgRgAiZBdQAkgaAVghQAWgiAKgsIgjAAQgTAAgZACIAAgbIArABIBDAAQgGAjgKAcQgKAbgQAbQgQAcgjAjQgJgMgSgHg");
	this.shape_21.setTransform(1335,723.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("ABnCWIAAgXIjnAAQACgQAAgWIAAgnQAAgWgCgNIAcAAQgCANAAAWIAAA3IBbAAIAAh3IhmAAIABggIAAgpIgBggIAbAAIgBAfIAAA0IBMAAIAAhMQAAgTgBgSIAaAAQgBAQAAAVIAABMIBOAAIAAgwQAAgVgCgNIAcAAQgCANAAAWIAAAjQAAAVACANIhoAAIAAB3IBaAAIAAg3IgBgiIAbAAQgCAPAAASIAAA6QAAAaACARg");
	this.shape_22.setTransform(1301.5,723.6);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AAHBvIAIg7IgqAAIgIA7IgVAAIAIg7IgaAAIAAgZIAdAAIAIg2IglAAIAAgYIAnAAIAIg7IAVAAIgIA7IAqAAIAIg7IAUAAIgHA7IAaAAIAAAYIgdAAIgIA2IAlAAIAAAZIgnAAIgIA7gAgYAbIApAAIAIg2IgqAAg");
	this.shape_23.setTransform(1276.7,723.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AAAByQgYgBgSgPQgTgPgFgcIAYgEQAFARALALQAMALARgBQARgBALgNQAKgOgBgRQgCgSgMgKQgMgJgbgEIAAgQQAbgDAMgLQAMgMgBgTQgBgTgQgIQgPgJgRAHQgRAGgLAeIgXgEQAIgXANgQQAOgPAXgDQAXgCARAIQASAIAHASQAHASgFAUQgFAVgZAQQASAGAKAQQAKAQgEAZQgDAZgTAQQgTAPgYAAIgBAAg");
	this.shape_24.setTransform(1259.9,723.4);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AiMCZIACg/IAAh9QAAgcgCgVIAeAAQgEATAAAgIAAC6gABEB7QAbAAAKgCQAJgCAAgUIAAjVIhgAAIgzABIAAgYQAYABAZABIB9AAIgBA3IAADAQAAAZgSAGQgRAGgZADQgDgTgJgKgAhKB+IACg2IAAhQIgVAdIgQgPQAUgYAPgcQAPgdAFgXIAbANQgKAOgMAYIAACtgABFBzQgUgFgUgjQgNAOgbAXQgIgIgOgLQANgFAOgKQANgKAMgPQgJgRgJgxQgGAAgbAGIgDgYIAigEIgDhDQAPAEANAAQgDARAAAQQAAAOACANQAYgDAvgIIAEAYQgXABgzAHQADAdAJAZQAPgTAMgXQAIAGASAHQgJAIgLANQgKANgNAOQARAeAHgCQAHgCACgVQALAMAPAAQgPAqgSAAIgDAAgAAphVQAMgHAGgGIAZAeQgLAGgJAIQgNgUgKgLgAhziFIAZgSQAQAXAQAUIgZARQgPgagRgQg");
	this.shape_25.setTransform(492.8,516.1);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("Ag0B5QAVAEAJgDQAJgDAAgOIAAjMQAAgggCgUIAcAAIgBAjQAAAQADAWQAEAXAUAfQA1gsAKgZIAbAZQgRAMgRAOIgsAnQAKAVAbAbQAbAcAoALQgXALgDAPQgygegbgkQgagkgOgkIAACPQABATgOAHQgOAIgaADQAAgOgLgRgAiaBdQAlgaAWghQAVgiAKgsIgjAAQgTAAgZACIAAgbIArABIBEAAQgHAjgKAcQgJAbgRAbQgQAcgjAjQgJgMgTgHg");
	this.shape_26.setTransform(459.6,516.3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AAsCTQgogBgggJQghgIgRgKQgQgJgNAJQgMAKgOAQQgIgMgMgJQAfgYAPgJIAAhtQgPAAgWADIAAgaIAnABIAZAAQgDAdAAASIAABSQAmAaArAEQAqAFAogBQApgCAhgFQgHAQgBARQg+AAgogCgAg1BeQAZgWAIgTQAHgTAEgYIg0ABIAAgYQAYACAfAAQACgeAAgcQgaAAgYADIAAgaIA0ABQAAgdgCgcIAbADIgDA2IAsAAIgBg5IAbAAQgBAQAAApIA1gBIAAAZQgagCgbAAIAAA6QAfAAAdgCIAAAYIg8gBIAAA1IABAtIgbAAQAAgXABgWIAAg1IgxAAQgFAjgKAWQgJAWgTAWQgNgLgMgGgAAQgLIAwAAIAAg6IgsAAIgEA6gAh/iCIAagKQAVAqAFAQQgOADgMAIQgEgYgWgjg");
	this.shape_27.setTransform(426.1,515.9);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AAHBvIAIg8IgqAAIgIA8IgVAAIAIg8IgaAAIAAgYIAdAAIAIg2IglAAIAAgYIAnAAIAIg7IAVAAIgIA7IAqAAIAIg7IAUAAIgHA7IAaAAIAAAYIgdAAIgIA2IAlAAIAAAYIgnAAIgIA8gAgYAbIApAAIAIg2IgqAAg");
	this.shape_28.setTransform(401.2,516.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AAAByQgYgBgSgPQgTgPgFgcIAYgEQAFARALALQAMALARgBQARgBALgNQAKgOgBgRQgCgSgMgKQgMgJgbgEIAAgQQAbgDAMgLQAMgMgBgTQgBgTgQgIQgPgJgRAHQgRAGgLAeIgXgEQAIgXANgQQAOgPAXgDQAXgCARAIQASAIAHASQAHASgFAUQgFAVgZAQQASAGAKAQQAKAQgEAZQgDAZgTAQQgTAPgYAAIgBAAg");
	this.shape_29.setTransform(384.4,516.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.lf(["#C9CACA","#9FA0A0","#FFFFFF","#DCDDDD","#B5B5B6"],[0,0.169,0.565,0.749,0.922],0,12.5,0,-12.5).s().p("AtqB9IAAj5IbVAAIAAD5g");
	this.shape_30.setTransform(408.8,649.7,3.229,0.735);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#66CCFF").s().p("EgAkAmbMAAAgqPIBJAAMAAAAqPgEgAkgl/IAAgbIBJAAIAAAbg");
	this.shape_31.setTransform(995,642.2);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#EFEEEE").s().p("AAAAAQAAgRABgPIAABBQgBgQAAgRg");
	this.shape_32.setTransform(831.1,573.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.instance_4},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]}).wait(40));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1086.2,593.1,1582.6,835.1);
// library properties:
lib.properties = {
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [
		{src:"images/未标题1.png", id:"未标题1"}
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;