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



(lib.元件3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#000000","#FFFFFF","#666666"],[0,0,1],-0.1,0,0,-0.1,0,17).s().p("AgdCcIAAk3IA7AAIAAE3g");
	this.shape.setTransform(48.9,36.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#000000","#FFFFFF","#666666"],[0,0,1],-0.1,0,0,-0.1,0,14.3).s().p("AgYCcIAAk3IAyAAIAAE3g");
	this.shape_1.setTransform(56,36.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.rf(["#000000","#FFFFFF","#666666"],[0,0,1],-0.1,0,0,-0.1,0,17).s().p("AgdCcIAAk3IA7AAIAAE3g");
	this.shape_2.setTransform(3,36.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.rf(["#000000","#FFFFFF","#666666"],[0,0,1],-0.1,0,0,-0.1,0,14.3).s().p("AgZCcIAAk3IAyAAIAAE3g");
	this.shape_3.setTransform(10.2,36.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#666666","#B9B9B9","#000000"],[0,0.275,0.792],0.7,7.1,-1.9,-18.8).s().p("AkQBdIAAi5IIhAAIAAC5g");
	this.shape_4.setTransform(31.3,38);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#66CCCC").ss(0.1,1,1).p("AB7glIAABLIj1AAIAAgh");
	this.shape_5.setTransform(33.4,38.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.lf(["#666666","#CCCCCC","#666666"],[0.145,0.514,0.867],-2.8,3.9,2.9,3.9).s().p("AgcBCIAAiCIAAgBIAOABIAOAAIADAAIACAAIAVAAIADAAIAACCg");
	this.shape_6.setTransform(30.2,11.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.lf(["#666666","#CCCCCC","#666666"],[0.145,0.514,0.867],-13.1,0,13,0).s().p("AiCBTIAAilIBiAAIA4AAIBrAAIAAClg");
	this.shape_7.setTransform(30.6,26.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["#666666","#CCCCCC","#666666"],[0.145,0.514,0.867],-21.9,0,21.9,0).s().p("AAYAbIgDAAIgVAAIAAAAIgFAAIgNAAIgPgBIAAABIgMgBQg9gCgwgFQgjgEgRgGQgMgEAAgFQAAgEAMgEQARgFAjgFQBAgHBagBQBaABBAAHQBBAIAAAKQAAALhBAIQgiAEgrACIgpACIgMAAg");
	this.shape_8.setTransform(30.7,2.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,58.6,52.1);


(lib.元件1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#666666","#999999","#999999"],[0,0.498,0.933],-1,-5.6,-1,6.2).s().p("AnbA/IAAh+IO3AAIAAB+g");
	this.shape.setTransform(47.6,6.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,95.3,12.7);


(lib.管子 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层_1
	this.instance = new lib.元件1("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(173.8,5.5,3.636,0.848,0,0,0,47.8,6.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,346.3,10.8);


(lib.元件8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层_1
	this.instance = new lib.元件1("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(47.6,6.4,1,1,0,0,0,47.6,6.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,95.3,12.7);


(lib.阀门 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层_1
	this.instance = new lib.元件3("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(36.1,32.1,1.23,1.23,0,0,0,29.3,26.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,72.1,64.1);


(lib.管子2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层_1
	this.instance = new lib.管子("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(527,8.9,3.042,1.651,0,0,0,173.2,5.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1053.6,17.8);


// stage content:
(lib.泵站 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AgiAjQgOgPAAgUQAAgUAOgOQAPgOATAAQAVAAAOAOQAOAOAAAUQAAAUgOAPQgOAOgVAAQgTAAgPgOg");
	this.shape.setTransform(961.9,767.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CC3300").s().p("AgzA0QgWgVAAgfQAAgeAWgVQAWgWAdAAQAfAAAWAWQAVAVAAAeQAAAfgVAVQgWAWgfAAQgdAAgWgWgAghgkQgPAOAAAVQAAATAPAPQAPAPATAAQAVAAAOgPQAOgPAAgTQAAgVgOgOQgOgOgVAAQgTAAgPAOg");
	this.shape_1.setTransform(961.9,767.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AgiAjQgOgPAAgUQAAgUAOgOQAPgOATAAQAVAAAOAOQAOAOAAAUQAAAUgOAPQgOAOgVAAQgTAAgPgOg");
	this.shape_2.setTransform(1009,575.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CC3300").s().p("AgzA0QgWgWAAgeQAAgeAWgVQAVgWAeAAQAfAAAWAWQAVAVAAAeQAAAegVAWQgWAWgfAAQgeAAgVgWgAghgkQgOAOAAAVQAAATAOAPQAOAPAUAAQAUAAAOgPQAPgPAAgTQAAgVgPgOQgOgOgUAAQgUAAgOAOg");
	this.shape_3.setTransform(1009,576.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0000").s().p("AgiAjQgOgPAAgUQAAgUAOgOQAPgOATAAQAVAAAOAOQAOAOAAAUQAAAUgOAPQgOAOgVAAQgTAAgPgOg");
	this.shape_4.setTransform(216.9,677.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CC3300").s().p("AgzA0QgWgVAAgfQAAgeAWgVQAVgWAeAAQAfAAAWAWQAVAVAAAeQAAAfgVAVQgWAWgfAAQgeAAgVgWgAghgkQgOAOAAAVQAAATAOAPQAOAPAUAAQAUAAAPgPQAOgPAAgTQAAgVgOgOQgPgOgUAAQgUAAgOAOg");
	this.shape_5.setTransform(216.9,677.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#00FF00").s().p("AgiAjQgOgPAAgUQAAgUAOgOQAPgOATAAQAVAAAOAOQAOAOAAAUQAAAUgOAPQgOAOgVAAQgTAAgPgOg");
	this.shape_6.setTransform(117.5,199.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#009933").s().p("AgzA0QgWgVAAgfQAAgeAWgVQAVgWAeAAQAfAAAWAWQAVAVAAAeQAAAfgVAVQgWAWgfAAQgeAAgVgWgAghgkQgOAOAAAVQAAATAOAPQAOAPAUAAQAUAAAPgPQAOgPAAgTQAAgVgOgOQgPgOgUAAQgUAAgOAOg");
	this.shape_7.setTransform(117.4,199.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#00FF00").s().p("AgiAjQgOgPAAgUQAAgUAOgOQAPgOATAAQAVAAAOAOQAOAOAAAUQAAAUgOAPQgOAOgVAAQgTAAgPgOg");
	this.shape_8.setTransform(303,194.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#009933").s().p("AgzA1QgWgXAAgeQAAgdAWgWQAVgWAeAAQAfAAAWAWQAVAWAAAdQAAAegVAXQgWAVgfAAQgeAAgVgVgAghgkQgOAOAAAVQAAAUAOAOQAOAOAUABQAUgBAOgOQAPgOAAgUQAAgVgPgOQgOgOgUAAQgUAAgOAOg");
	this.shape_9.setTransform(302.9,195.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#00FF00").s().p("AgiAjQgOgPAAgUQAAgUAOgOQAPgOATAAQAVAAAOAOQAOAOAAAUQAAAUgOAPQgOAOgVAAQgTAAgPgOg");
	this.shape_10.setTransform(1672.5,167.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#009933").s().p("AgzA1QgWgXAAgeQAAgdAWgWQAVgWAeAAQAfAAAVAWQAWAWAAAdQAAAegWAXQgVAVgfAAQgeAAgVgVgAghgkQgOAOAAAVQAAAUAOAOQAOAOAUABQAUgBAOgOQAPgOAAgUQAAgVgPgOQgOgOgUAAQgUAAgOAOg");
	this.shape_11.setTransform(1672.5,168.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#00FF00").s().p("AgiAjQgOgPAAgUQAAgUAOgOQAPgOATAAQAVAAAOAOQAOAOAAAUQAAAUgOAPQgOAOgVAAQgTAAgPgOg");
	this.shape_12.setTransform(1451,189.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#009933").s().p("AgzA0QgWgWAAgeQAAgeAWgVQAWgWAdAAQAfAAAVAWQAWAVAAAeQAAAegWAWQgVAWgfAAQgdAAgWgWgAghgkQgPAOAAAVQAAATAPAPQAPAPATAAQAVAAANgPQAPgPAAgTQAAgVgPgOQgOgOgUAAQgTAAgPAOg");
	this.shape_13.setTransform(1450.9,189.6);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#333333").s().p("AgZBGQAMABAFgBQAEgBAAgIIAAhAIgpAAIABgbIggAWQgDgHgKgGQAXgKAQgNQARgMAJgRIgfAAIgYACIAAgQIAkACIBdAAQATAAAOgCIAAAQIgZgCIg/AAQgGALgJAKIBVAAIgBAYIABAZIg0AAIAHARQACAFAHAJQASgLAPgQQAFAJAHAHQgIACgJAFIgVANQAIAJANAIQAOAHATADQgKAIgCAJQgTgIgUgQQgUgRgJgWIAAAvQgBAQgHADQgGACgNACQgBgKgHgIgAgegQIBQAAIAAgWIhQAAgAhZBCQAVgFAOgLQANgLAHgOIgXAAIgWAAIAAgPIAXABIAqAAQgEAOgGALQgFALgMALQgMAKgXANQgDgIgKgHg");
	this.shape_14.setTransform(1366.2,860);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#333333").s().p("AgfBJQAMACAGgCQAFgBABgJIAAh6QgBgUgBgLIARAAIAAAVQgBAJACAOQACANAMATQAhgaAGgPIAPAPQgKAHgKAIIgbAYQAGAMARAQQARARAXAHQgOAGgCAJQgegSgQgVQgPgWgJgVIAABVQABALgIAFQgJAFgPABQgBgIgGgKgAhcA4QAWgPANgVQAMgUAHgaIgVAAIgbABIAAgQIAaABIAoAAQgDAVgGAQQgGAQgJARQgKAQgWAVQgFgHgLgEg");
	this.shape_15.setTransform(1346.2,859.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#333333").s().p("AAXBYIAAgVIAAhOIgdAAIgXAAIAAgOIAVABIAfAAIAAgoIAAgXIAQAAIgBASIAAAtIAgAAIAVgBIAAAOIgUAAIghAAIAABNIABAWgAg/BGQAFgHAAgMIAAhAIggABIAAgOIASAAIAdAAIgBAeIAAAwQAOgNAIgLIAKAMIgVAWIgUAVIgKgNgAhKhMIAMgKIAgAiIgOALQgKgPgUgUg");
	this.shape_16.setTransform(1379.2,957.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#333333").s().p("AA9BTIh3AAIgZABIAAgMIAZABIA1AAIAAgMIgnAAQgMAAgLACIAAgNIAXABIAnAAIAAgKIg5AAIABgaIgBgVIB/AAIAAAYIAAAXIg5AAIAAAKIAkAAIAZgBIAAAMIgZgBIgkAAIAAAMIA1AAIAZgBIAAAMIgZgBgAAIAeIAqAAIAAgIIgqAAgAguAeIApAAIAAgIIgpAAgAAIAMIAqAAIAAgKIgqAAgAguAMIApAAIAAgKIgpAAgAA3gPIhlAAIgqAAIAAgMIAqACIBkAAIAjgCIAAAMIgiAAgAg8giIABgbIgBgWIB8AAIgBAWIABAbgAgtgsIBeAAIAAgKIheAAgAgthBIBeAAIAAgJIheAAg");
	this.shape_17.setTransform(1359.2,957.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#333333").s().p("Ag0BRQAQgHAIgMQAGgMABgPQABgPgBgNQAJACAIAAIgCAYQgBAQgGAPQgGAPgVAOQgGgHgGgFgAA3BXQgPAAAAgPIAAguIgBgTIAQAAIAAAVIAAAnQgBAGAIAAIAHAAQAGABABgTQAGAFAKACQgFAUgFADQgFACgHAAgAAHBXIABgZIAAgjIgBgUIAQAAIgBAUIAAAjIABAZgAhbBLQAIgJAKgTQALgSAGgTQAGAGAIAEQgIAOgJATQgJAVgHALQgGgGgKgEgAA4gHIguAEQgdACgKABQgDgFgEgGQAIgDALgNQAKgNAHgOIgIAAIgdABIAAgPIAdABIAVAAIgLgRIAMgIIAQAZIAZAAIAcgBIAAAOIgcAAIgyAAIALAHQgEACgGAIIgSAWIA7gCQgHgJgJgIQAIgFAEgEQAVAXAQASIgNAJIgLgOgAhbgVIAKgPQASALAQAMQgHAGgEAHQgOgNgTgIgAhRhHIAJgMQASAKAMAKIgKAOQgNgNgQgJg");
	this.shape_18.setTransform(1339.5,957.3);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#333333").s().p("AAnBIQAPAAAFgCQAFgCAAgIIAAh5IguAAQgSAAgPACIAAgQIAhAAIA/AAIgBAfIAABsQAAASgKADQgKAEgOABQgCgIgFgKgAhQBZIAAgcIAAhRIAAgZIARAAIAAAVIAABxgAhDhQIAPgJIAUAdIgQAJIgTgdg");
	this.shape_19.setTransform(1583.6,952.9);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#333333").s().p("AhUBcIABgmIAAhKIgBgeIASAAQgCALAAAUIAABvgAApBKQARAAAFgCQAGgBAAgLIAAiAIg6AAIgfABIAAgPIAeAAIBLAAIgBAiIAAB0QAAAPgKADQgLADgPACQgBgLgGgGgAgsBMIABghIAAgwIgMASIgKgJQAMgPAJgRQAJgQADgOIAQAHQgGAIgHAPIAABogAAqBFQgNgDgLgVQgIAIgQAPQgFgGgJgGQAIgDAJgGQAHgGAHgJQgFgLgFgcIgUADIgBgOIAUgCIgCgpQAJADAIAAIgCATIABAQIArgGIACAOIgsAGQABAPAGARQAJgMAHgNQAFACALAFIgMAMIgOARQAKASAEgBQAFgCAAgNQAHAHAJABQgIAZgLAAIgCAAgAAZgzIALgHIAPARIgMAJQgIgNgGgGgAhFhQIAPgLIAUAaIgPAKQgKgQgKgJg");
	this.shape_20.setTransform(1563.6,953.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#333333").s().p("AgNBRQAOgMAJgNQAJgMAFgOQAEgOABgPIACgiIgNAAIgTABIAAgPIAUABIAMAAIAAgWIgBgWQAKACAIAAIgCASIAAAYIAsAAIgCAWIgEBYQgCAQgKADQgLAEgOACQgCgJgFgIQARABAGgDQAHgDAAgIIAEhcIgcAAQgCAigDASQgEARgHAQQgIAPgWAYQgHgHgGgDgAhWAvQAKgGAIgTQAJgSAEgOIgGAAIgcABIAAgPIAcABIAeAAIAfgBIAAAPIgfgBIgIAAIgLAaIgNAcQAfgEAPgDQgEgJgIgOIAMgIIANAYIALAYIgNAIIgGgNIgoAHQgPADgLADQgDgHgFgIgAgjg2IgSAAIgZABIAAgPIAYAAIATAAIAdAAIAAAPIgdgBg");
	this.shape_21.setTransform(1543.5,953.4);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#333333").s().p("AgWBFIAAgbIgtAAIAAAPIgSAAIABg2IgBg7IA/AAIAAghIARAAIgBAhIA+AAQgBALAAAlIABAyIg+AAIAAAVQAAAOAOAAIApAAQANAAACgGQACgFACgMQAIAGAKACQgGASgEAFQgFAFgLAAIg8AAIgCAAQgTAAgBgVgAgGAdIAuAAIAAgfIguAAgAhDAdIAtAAIAAgfIgtAAgAgGgOIAuAAIAAgdIguAAgAhDgOIAtAAIAAgdIgtAAg");
	this.shape_22.setTransform(1524.2,953.2);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#333333").s().p("AAnBIQAPAAAFgCQAFgCAAgIIAAh5IguAAQgSAAgPACIAAgQIAhAAIA/AAIgBAfIAABsQAAASgKADQgKAEgOABQgCgIgFgKgAhQBZIAAgcIAAhRIAAgZIARAAIAAAVIAABxgAhDhQIAPgJIAUAdIgQAJIgTgdg");
	this.shape_23.setTransform(1583.6,883.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#333333").s().p("AhUBcIABglIAAhMIgBgdIASAAQgCALAAATIAABwgAApBKQARAAAFgBQAGgBAAgMIAAiAIg6AAIgfAAIAAgOIAeABIBLAAIgBAhIAABzQAAAQgKADQgLADgPACQgBgLgGgGgAgsBLIABgfIAAgxIgMASIgKgKQAMgNAJgRQAJgSADgOIAQAIQgGAIgHAOIAABogAAqBFQgNgDgLgVQgIAJgQANQgFgFgJgGQAIgDAJgGQAHgGAHgKQgFgJgFgdIgUADIgBgOIAUgDIgCgoQAJACAIAAIgCAUIABAQIArgGIACAOIgsAGQABAQAGAPQAJgMAHgNQAFAEALADIgMAOIgOAQQAKASAEgBQAFgBAAgNQAHAGAJABQgIAZgLAAIgCAAgAAZgzIALgIIAPASIgMAJQgIgMgGgHgAhFhQIAPgLIAUAaIgPAKQgKgPgKgKg");
	this.shape_24.setTransform(1563.6,883.6);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#333333").s().p("AgNBRQAOgMAJgMQAJgNAFgOQAEgOABgOIACgjIgNAAIgTABIAAgPIAUABIAMAAIAAgWIgBgWQAKADAIAAIgCARIAAAYIAsAAIgCAXIgEBYQgCAPgKAEQgLADgOACQgCgJgFgJQARABAGgDQAHgCAAgIIAEhcIgcAAQgCAigDARQgEATgHAOQgIAQgWAYQgHgIgGgCgAhWAwQAKgHAIgSQAJgUAEgNIgGAAIgcAAIAAgNIAcABIAeAAIAfgBIAAANIgfAAIgIAAIgLAZIgNAcQAfgDAPgDQgEgJgIgOIAMgIIANAYIALAXIgNAIIgGgLIgoAGQgPADgLADQgDgIgFgGgAgjg2IgSAAIgZABIAAgPIAYABIATAAIAdgBIAAAPIgdgBg");
	this.shape_25.setTransform(1543.5,883.7);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#333333").s().p("AgWBFIAAgbIgtAAIAAAPIgSAAIABg2IgBg7IA/AAIAAghIARAAIgBAhIA+AAQgBALAAAlIABAyIg+AAIAAAVQAAAOAOAAIApAAQANAAACgGQACgFACgMQAIAGAKACQgGASgEAFQgFAFgLAAIg8AAIgCAAQgTAAgBgVgAgGAdIAuAAIAAgfIguAAgAhDAdIAtAAIAAgfIgtAAgAgGgOIAuAAIAAgdIguAAgAhDgOIAtAAIAAgdIgtAAg");
	this.shape_26.setTransform(1524.2,883.5);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#333333").s().p("AAXBZIAAgWIAAhOIgdAAIgXABIAAgPIAVAAIAfAAIAAgmIAAgZIAQAAIgBASIAAAtIAgAAIAVAAIAAAPIgUgBIghAAIAABNIABAXgAg/BGQAFgGAAgNIAAg/IggAAIAAgPIASABIAdAAIgBAfIAAAvQAOgOAIgKIAKANIgVAVIgUAUIgKgMgAhKhMIAMgKIAgAhIgOAMQgKgOgUgVg");
	this.shape_27.setTransform(1740.7,970.3);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#333333").s().p("Ag/BcQABgOAAgYIAAhKIgTAeQgFgKgFgEQAKgKAMgaQAMgZAGgaQALAHAJACQgFAFgLAgIAABiIABAngABIBLIhPAAIgbABIAAgPIAZAAIAmAAQAKghAKg3IAUAFQgCAEgGATIgQA8IAbAAIAUAAIAAAPIgUgBgAgFATQgFgSgIgTQAIgCAIgDQANAnAHAgIgPAGIgIgjgABBgpIhEAAIgYABIAAgPIAYABIBFAAIAVgBIAAAPIgWgBgAAIhTIAPgIIAQAdQgGABgKAFQgGgOgJgNg");
	this.shape_28.setTransform(1720.6,970.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#333333").s().p("AgfBJQAMACAGgCQAFgBABgJIAAh6QgBgUgBgLIARAAIAAAVQgBAJACAOQACANAMATQAhgaAGgPIAPAPQgKAHgKAIIgbAYQAHAMAQAQQAQARAYAHQgOAGgCAJQgegSgQgVQgPgWgJgVIAABVQABALgIAFQgJAFgPABQgBgIgGgKgAhcA4QAWgPANgVQAMgUAHgaIgVAAIgbABIAAgQIAaABIAoAAQgDAVgGAQQgGAQgJARQgKAQgWAVQgFgHgLgEg");
	this.shape_29.setTransform(1700.8,970.4);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#333333").s().p("AA5BXIAAgOIglAAIAAANIgNAAIABgfIgBgeIBBAAIgBAgIABAegAAUA9IAlAAIAAgYIglAAgAhHBXIABggIgBgeIA9AAIgBAfIABAeIgOAAIAAgNIghAAIAAAOgAg5A9IAhAAIAAgYIghAAgAhaAKQAPAAAOgDQAOgDALgDQAKgDAKgKIgjAAIgeABIAAgNIAeABIAmAAQADgHgBgKIAUACQgFAGgBAJIAkAAIgLgJIALgIIALAKIgJAHIAMAAIAfgBIAAANIgfgBIgnAAQAPAMAWAEQAXADARgCQgGAJgCAJQgTgCgOgCQgNgEgMgFQgLgFgOgPQgOARgXAHQgXAIgWADQgCgKgGgFgAAGgrIABgXIgBgUIBCAAIgBAUIABAXgAAUg2IAlAAIAAgWIglAAgAhHgrIABgWIgBgVIA9AAIgBAVIABAWgAg5g2IAhAAIAAgWIghAAg");
	this.shape_30.setTransform(1778.7,879.8);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#333333").s().p("AgaBZQgKAAgBgJQgCgIAAgIIgCgTIARAAIgBATIABAJQABAFAJgBIAjAAQAIAAADgCQADgEABgLQAGAFALADQgGAQgEADQgEACgGAAgAhUBPQAHgIAIgaIAPAGIgQAiIgOgGgAA2A4IANgKQARAVAGAJIgOAJQgIgPgOgOgAgOApIAMgJIAQAZQgGAEgGAFQgDgIgNgRgAhbAiQAKgMAFgLQADgLABgOIAAgyIBSAAIgBgWIARACQgCAJABALIAjAAIAZgBIAAAOIgZAAIgiAAQADAgAKAQQAFgHADgMIAHgVIAQAFQgDADgFAOQgFAPgKAQQAJAIAHAEQAGADACgCQACgCAEgOQAGAFAIACQgGAXgGACQgFADgLgDQgJgEgQgOQgJAKgMAJQgGgHgGgCQAQgKAKgLQgJgNgFgRQgDgRgDgOIhEAAQAAAjgCAMQgBALgEAMQgEAKgHANQgKgHgGgBgAgyAYIAAgnIA2AAIAAAngAglANIAdAAIAAgRIgdAAgAgxgcIAAgLIA0AAIAAALgAAkhOIAIgKIASANIgJAJIgRgMg");
	this.shape_31.setTransform(1758.8,879.3);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#333333").s().p("AAcBHIgdgQIAGgNIAfAOQAIgPAHgSIg8AAIAJgiIgQAAIgVABIAAgOIAWABIARAAIAFgYIgKAAIgXABIAAgPIAVABIAOAAQADgWABgJIASADQgDAEgEAYIAhAAIAXgBIAAAPIgYgBIgiAAIgFAYIAyAAIAYgBIAAAOIgYgBIg0AAIgGAVIBBAAIgYA1IAXAPQgFAFgGAJQgNgJgVgMgAg+BYQACgNAAgUIAAhMIgUAcQgDgGgHgFQAJgLAOgXQAMgXAJgcIATAJQgGAGgMAdIAABjIABAig");
	this.shape_32.setTransform(1738.5,879.6);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#333333").s().p("AhTBPQASgKANgKQAMgKAJgNQAJgNAFgQQAEgQABgWIgWAAIgqABIAAgPIAqAAIAXAAIAAgXIgBgXIATADQgCAHAAANIAAAXIBPAAIgEA6IgDAnQgCAXgLAFQgKAGgaACQgBgJgHgLQAXAAAIgDQAIgDABgIIACgXIAEg+Ig9AAQgDAcgDAPQgFARgIANQgJAOgNAMQgNAMgTAMQgEgGgLgHg");
	this.shape_33.setTransform(1718.5,879.6);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#333333").s().p("AhXBNQANgTAEgSQAFgRABgWIAAg6IgCgdIB8AAIAbgBIAAAQIgbgBIhqAAIAABFQAAAagGAWQgGAVgLAWQgGgHgKgEgAA7BNIhPAAIgcAAIAAgPIAcAAIAcAAIAAg/IgRAAIgbABIAAgRIAbABIARAAIAAgYIAAgVIASAAQgCAGAAAPIAAAYIAcAAIAYgBIAAARIgYgBIgcAAIAAA/IAiAAIAeAAIAAAPIgdAAgAAlATQAHgFAGgEIAUAcIgQAKQgHgRgKgMg");
	this.shape_34.setTransform(1698.2,880);

	this.instance = new lib.阀门("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(1275.9,954.1,0.857,0.857,0,0,0,36.1,32.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#66CCCC").ss(0.1,1,1).p("AALgoIAABRIgVAA");
	this.shape_35.setTransform(1484.9,911.1);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.lf(["#666666","#CCCCCC","#666666"],[0.145,0.514,0.867],-15.3,-0.1,15,-0.1).s().p("AiXCLIAAkVIBFAAICbAAIBPAAIAAEVg");
	this.shape_36.setTransform(1468.5,893.1);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.lf(["#666666","#CCCCCC","#666666"],[0.145,0.514,0.867],-16.2,14.8,15.9,14.8).s().p("AhCAaIgHAAIhXAAIAAgzIApAAIAeAAID6AAIAAAzg");
	this.shape_37.setTransform(1467.6,868);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.lf(["#666666","#CCCCCC","#666666"],[0.145,0.514,0.867],-7.8,21.3,7.7,21.3).s().p("AhNArIAAhVIAHAAIAfACIAmAAIAKAAIAEAAIA6AAIAHAAIAABTg");
	this.shape_38.setTransform(1468,874.9);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#666666").s().p("AgdAeIgGgHQgHgKAAgNQAAgMAHgKIAGgHQAMgNARAAQASAAAMANQANAMAAARQAAASgNAMQgMANgSAAQgRAAgMgNg");
	this.shape_39.setTransform(1468.8,852);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#999999").s().p("AgtBaIgQAAIhBAAIAAizID9AAIAACzgAAQgYIgHAHQgGALAAAMQAAAMAGAKIAHAHQAMANARAAQASAAAMgNQANgMABgRQgBgSgNgMQgMgMgSAAQgRAAgMAMg");
	this.shape_40.setTransform(1464.3,851.5);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#CCCCCC").s().p("ACdCMIj6AAIgfAAIgoAAIhcAAIAAkXIICAAIAAEXgAikBaIBBAAIAQAAICsAAIAAizIj9AAg");
	this.shape_41.setTransform(1468.1,851.5);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#CCCCCC").s().p("AhOCyQghgXAAggQAAgHACgGIAAimIABAAIAAiPIAEAAQAHAHAUAGQAhAKAtAAQAuAAAggKQASgFAIgHIACgBIAFAAIAACPIgBAAIAACuIAAAFQAAAgghAXQggAWguAAQgtAAghgWg");
	this.shape_42.setTransform(1653.9,980.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#999999").s().p("AhpCCIgEgEQgBgCAAgEQAAgDABgCIAAjOIgBgGQAAgDABgCQAGgKAZgIQAfgJAqAAIALAAQAqAAAfAJQASAFAIAHIAEAGIACAAIAAADIAAACIAAADIAAApIAAAFIAACmIAAACIAAADQgBAEgEADg");
	this.shape_43.setTransform(1653.8,947);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#CCCCCC").s().p("Ah1FgQgwgsgBg/QAAgOADgMIAAlMIACAAIAAkcIAEAAQAMAPAdAMQAxAUBEAAQBFAAAwgUQAbgLAMgNIADgDIAGAAIAAEcIgBAAIAAFcIAAAKQAAA/gwAsQgxAuhEAAQhEAAgxgug");
	this.shape_44.setTransform(518.8,731);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#999999").s().p("AidECQgEgDgBgEQgDgGAAgGQAAgFADgGIAAmaQgDgFAAgGQAAgGADgFIAAAAQAIgUAmgQQAtgRBAAAIAQAAQA/AAAtARQAbALAMAOQAFAFACAGIADAAIAAAHIAAAEIAAAEIAABTIAAALIAAFKIAAAEIAAAGQgCAHgFAGg");
	this.shape_45.setTransform(518.6,665.1);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#CCCCCC").s().p("Ah5C8QgogSgIgbQgCgFABgHQgBgHADgHIAAixIABAAIAAiYIAGAAQALAIAfAGIAUADQAnAHAxABIALAAIAAAAIABAAIAKAAQAzgBAngGIAUgEQAcgGANgGIACgCIAIAAIAACYIgCAAIAAC6IAAAFQAAAHgCAFQgIAbgoASQgzAZhFAAQhHAAgygZg");
	this.shape_46.setTransform(1655.9,882.2);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#999999").s().p("AABCPIgBAAIAAAAIgLAAQgxgBgngHIgCgBIgDgEIgCgGIACgGIAAjbQgBgDgBgEIACgFQAGgLAXgIQAegKAoAAIALAAQAoAAAdAKQASAFAIAIIAEAGIACAAIAAADIAAACIAAADIAAAtIAAAFIAACxIAAACIAAACQgBAFgEADIgBACQgnAGgzABg");
	this.shape_47.setTransform(1655.9,849.1);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#CCCCCC").s().p("Ai8FYQhAgjgLgwQgDgKABgMQAAgNADgMIAAlEIADAAIAAkWIAIAAQARAPAxALIAeAHQA8ALBOACIAQAAIABAAIACAAIAQAAQBNgBA+gMIAggHQArgKATgNIAEgDIALAAIAAEWIgCAAIAAFUIAAAJQAAAMgDAKQgLAwhAAjQhOAthsAAQhuAAhOgtg");
	this.shape_48.setTransform(116.5,628.5);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#999999").s().p("AABEFIgBAAIgBAAIgQAAQhOgCg8gLIgCgDQgEgDgBgEQgDgGAAgGQAAgFADgGIAAmQQgDgGAAgGQAAgFADgFIAAgBQAIgTAmgPQAtgSBAAAIAQAAQA/AAAtASQAbALAMANQAFAFACAFIADAAIAAAIIAAADIAAAFIAABRIAAAKIAAFDIAAAEIAAAFQgCAIgFAGIgDADQg9AMhNABg");
	this.shape_49.setTransform(116.5,568.1);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#CCCCCC").s().p("AkIAYIAmgtIHqgEIABAzg");
	this.shape_50.setTransform(1468,925.8,1.195,0.917);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#999999").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_51.setTransform(1468,946.6,0.681,0.242);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#CCCCCC").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_52.setTransform(1468.4,990.8,0.313,0.241);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#E1E0E0").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_53.setTransform(1468,956.9,1.195,0.917);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#CCCCCC").s().p("AkIAYIAmgtIHqgEIABAzg");
	this.shape_54.setTransform(302.7,151,1.195,0.917);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#999999").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_55.setTransform(302.7,171.7,0.681,0.242);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#CCCCCC").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_56.setTransform(303,215.9,0.313,0.241);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#E1E0E0").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_57.setTransform(302.6,182,1.195,0.917);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.lf(["#FFFFFF","#000000"],[0,1],-12.5,0,12.5,0).s().p("AAkCXQgkgkAAg0Ih8AAIAAh9IB8AAQAAgzAkglQAmglAzAAIAAF3QgzAAgmglg");
	this.shape_58.setTransform(1239.4,862.2,0.46,0.43);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,14.7).s().p("AAFCDQgIgFgIgGQgLgKgEgMQgCgGAAgGIAAiqQAAgVARgOQAQgPAYAAIAAEMQgNABgLgEg");
	this.shape_59.setTransform(1279.4,863.6);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.lf(["#FFFFFF","#000000"],[0,1],-12.9,0,13,0).s().p("AhHCuIAAgaIgdAAIAAigIAdAAIAAhrIg6AAIAAg2ICtAAIAAA2Ig5AAIAABrIA5AAIAAA1IAcAAIAAgbIA6AAIAABsIg6AAIAAgbIgcAAIAAA1Ig5AAIAAAag");
	this.shape_60.setTransform(1260.6,856.8);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,13.3).s().p("AiBAbIAAg1IEDAAIAAA1g");
	this.shape_61.setTransform(1298.1,867.4);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,13).s().p("AiBAIIAAgPIEDAAIAAAPg");
	this.shape_62.setTransform(1298.1,873.5);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,13.3).s().p("AiBAbIAAg1IEDAAIAAA1g");
	this.shape_63.setTransform(1298.1,859.3);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,13.2).s().p("AiBATIAAglIEDAAIAAAlg");
	this.shape_64.setTransform(1298.1,852);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,11).s().p("AhHApQgMgBgJgHQgIgJAAgKIAAg1IDJAAIAAA1QAAAKgJAJQgIAHgLABg");
	this.shape_65.setTransform(1298.1,843.5);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,14.8).s().p("AgciGQAYAAAQAPQARAOAAAVIAACqQAAAGgCAGQgEAMgLAKQgIAGgHAFQgMAEgNgBg");
	this.shape_66.setTransform(1316.9,863.6);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#CCCCCC").ss(1,1,1,3,true).p("EgvqgQFMBfVAAAMAAAAgLMhfVAAAg");
	this.shape_67.setTransform(1523.8,918.4);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("EgvqAQGMAAAggLMBfVAAAMAAAAgLg");
	this.shape_68.setTransform(1523.8,918.4);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#333333").s().p("AANBDIAAgeIg7AAIAAgNIA+haIAMAAIAABaIATAAIAAANIgTAAIAAAegAgdAYIAqAAIAAg9g");
	this.shape_69.setTransform(328.7,113);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#333333").s().p("AglBEIAAgEQABgLAKgKQAKgJAPgUQAPgTAFgLQAEgLAAgIQgCgHgGgFQgGgGgJABQgGABgIAGQgHAFgFALIgOgCQAGgSAKgJQAKgIANgBQAHAAAGABQAGABAHAEQAGAFAEAIQAFAJgBAMQgCAMgLAQQgKARgeAkIA3AAIAAAOg");
	this.shape_70.setTransform(318.5,113);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#333333").s().p("AgZA7QgLgJgDgSIAOgCQADAKAHAHQAHAHAJgBQALAAAGgIQAGgJAAgKQgBgLgIgGQgHgFgPgDIAAgJQAPgBAHgIQAIgHgBgLQgBgLgJgFQgJgFgKAEQgLADgGASIgOgCQAFgOAIgJQAIgKAOgBQANgCALAFQAKAFAFALQAEAKgDANQgDAMgPAKQALADAGAKQAGAJgCAPQgCAQgMAJQgMAJgOAAQgOAAgLgJg");
	this.shape_71.setTransform(308.6,113.1);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#333333").s().p("AANBDIAAgeIg7AAIAAgNIA+haIAMAAIAABaIATAAIAAANIgTAAIAAAegAgdAYIAqAAIAAg9g");
	this.shape_72.setTransform(298.7,113);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#333333").s().p("AgXA/QgMgHgEgMQgEgMABgMQAAgLAEgIIAKgSIAfgyIASAAIgfAzQAUgFAMAHQANAHAEAIQAEAJABAKQAAALgDAKQgEAKgJAIQgJAJgQAAIgDAAQgNAAgKgFgAgEgFQgMACgFAJQgGAKABALQABAMAHAHQAHAIALAAQALABAIgIQAIgJAAgQQAAgRgKgFQgIgFgJAAIgEAAg");
	this.shape_73.setTransform(288.9,113.1);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#333333").s().p("AgXA/QgMgHgEgMQgEgMABgMQAAgLAEgIIAKgSIAfgyIASAAIgfAzQAUgFAMAHQANAHAEAIQAEAJABAKQAAALgDAKQgEAKgJAIQgJAJgQAAIgDAAQgNAAgKgFgAgEgFQgMACgFAJQgGAKABALQABAMAHAHQAHAIALAAQALABAIgIQAIgJAAgQQAAgRgKgFQgIgFgJAAIgEAAg");
	this.shape_74.setTransform(131.5,124.1);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#333333").s().p("AgZA7QgLgJgDgSIAOgCQADAKAHAHQAHAHAJgBQALAAAGgIQAGgJAAgKQgBgLgIgGQgHgFgPgDIAAgJQAPgBAHgIQAIgHgBgLQgBgLgJgFQgJgFgKAEQgLADgGASIgOgCQAFgOAIgJQAIgKAOgBQANgCALAFQAKAFAFALQAEAKgDANQgDAMgPAKQALADAGAKQAGAJgCAPQgCAQgMAJQgMAJgOAAQgOAAgLgJg");
	this.shape_75.setTransform(121.2,124.1);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#333333").s().p("AgXBCQAOg8Ajg5IhDAAIAAgOIBTAAIAAANQglA6gKA8g");
	this.shape_76.setTransform(111.4,124.2);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#333333").s().p("AglBEIAAgEQABgLAKgKQAKgJAQgUQAOgTAFgLQAFgLgCgIQgBgHgGgFQgGgGgIABQgIABgHAGQgIAFgDALIgPgCQAGgSAKgJQAJgIAOgBQAHAAAGABQAGABAHAEQAGAFAFAIQAEAJgBAMQgBAMgLAQQgLARgfAkIA4AAIAAAOg");
	this.shape_77.setTransform(101.1,124);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#333333").s().p("AgXA/QgMgHgEgMQgEgMABgMQAAgLAEgIIAKgSIAfgyIASAAIgfAzQAUgFAMAHQANAHAEAIQAEAJABAKQAAALgDAKQgEAKgJAIQgJAJgQAAIgDAAQgNAAgKgFgAgEgFQgMACgFAJQgGAKABALQABAMAHAHQAHAIALAAQALABAIgIQAIgJAAgQQAAgRgKgFQgIgFgJAAIgEAAg");
	this.shape_78.setTransform(91.5,124.1);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#333333").s().p("AAFBDIAAhrQgJAKgQAKIAAgPQAUgNALgSIAKAAIAACFg");
	this.shape_79.setTransform(1692.9,100);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#333333").s().p("AANBDIAAgeIg7AAIAAgNIA+haIAMAAIAABaIATAAIAAANIgTAAIAAAegAgdAYIAqAAIAAg9g");
	this.shape_80.setTransform(1684,100);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#333333").s().p("AgXBCQAOg7Ajg6IhDAAIAAgOIBTAAIAAANQglA6gKA8g");
	this.shape_81.setTransform(1674.1,100.2);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#333333").s().p("AglBEIAAgEQAAgLALgKQAKgJAQgUQAOgTAFgLQAEgLAAgIQgBgHgHgFQgGgGgJABQgGABgIAGQgIAFgEALIgOgCQAGgSAKgJQAKgIANgBQAGAAAHABQAGABAHAEQAHAFADAIQAFAJgBAMQgBAMgMAQQgKARgfAkIA4AAIAAAOg");
	this.shape_82.setTransform(1663.8,100);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#333333").s().p("AgXBCQAOg7Ajg6IhDAAIAAgOIBTAAIAAANQglA6gKA8g");
	this.shape_83.setTransform(1654.1,100.2);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#333333").s().p("AgXA/QgMgHgEgMQgEgMABgMQAAgLAEgIIAKgSIAfgyIASAAIgfAzQAUgFAMAHQANAHAEAIQAEAJABAKQAAALgDAKQgEAKgJAIQgJAJgQAAIgDAAQgNAAgKgFgAgEgFQgMACgFAJQgGAKABALQABAMAHAHQAHAIALAAQALABAIgIQAIgJAAgQQAAgRgKgFQgIgFgJAAIgEAAg");
	this.shape_84.setTransform(1644.2,100.1);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#333333").s().p("AAFBDIAAhrQgJAKgQAKIAAgPQAUgNALgSIAKAAIAACFg");
	this.shape_85.setTransform(1476.9,124);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#333333").s().p("AAFBDIAAhrQgJAKgQAKIAAgPQAUgNALgSIAKAAIAACFg");
	this.shape_86.setTransform(1466.9,124);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#333333").s().p("AAFBDIAAhrQgJAKgQAKIAAgPQAUgNALgSIAKAAIAACFg");
	this.shape_87.setTransform(1456.9,124);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#333333").s().p("AgFBDQgMgBgKgIQgLgHgEgTIAOgEQAGAVANACQAMADAJgFQAIgGADgIQAEgIAAgKQgBgKgFgHQgFgGgIgDQgIgCgIACQgKADgGAHIgOgBIAPhCIA9AAIAAAOIgxAAIgIAhQAMgFAJAAQAKABAJAEQAKAEAEAIQAEAHACAGQACAIAAAIQAAAJgEAJQgDAJgGAGQgGAGgJADQgHADgIAAIgFAAg");
	this.shape_88.setTransform(1447.6,124.3);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#333333").s().p("AgFBDQgMgBgKgIQgLgHgEgTIAOgEQAGAVANACQAMADAJgFQAIgGADgIQAEgIAAgKQgBgKgFgHQgFgGgIgDQgIgCgIACQgKADgGAHIgOgBIAPhCIA9AAIAAAOIgxAAIgIAhQAMgFAJAAQAKABAJAEQAKAEAEAIQAEAHACAGQACAIAAAIQAAAJgEAJQgDAJgGAGQgGAGgJADQgHADgIAAIgFAAg");
	this.shape_89.setTransform(1437.6,124.3);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#333333").s().p("AhQBRIAAiiIChAAIAACigAhFBGICLAAIAAiMIiLAAg");
	this.shape_90.setTransform(1810.9,683.4);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#333333").s().p("AAeAsIAAg+QAAgEgBgDQgCgEgEAAQgGABgFAFQgEAGAAAKIAAAzIgPAAIAAg+QAAgEgBgDQgCgEgFAAQgFABgFAFQgEAGAAAKIAAAzIgQAAIAAhWIAQAAIAAAMQADgGAGgEQAFgDAHAAQAGAAADADQAEAEACAGQAEgGAFgEQAFgDAGAAQAKAAAEAEQAFAGAAAJIAABEg");
	this.shape_91.setTransform(1796,685.8);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#333333").s().p("AgMBBQgNgGgGgLQgFgLgDgMQgCgMABgUQABgVAFgMQAFgMAJgIQAJgIANAAQAOAAAKAMQAKALADARQADARgBAWQgBAWgHAOQgGAOgOAGQgGACgFAAQgHAAgHgEgAgOgrQgHAKgDAVQgCAVAEARQAEAQAJAHQAJAHAIgEQAJgEAFgNQAEgNAAgPIgBgbQgBgMgGgLQgGgKgKAAIgBAAQgIAAgHAKg");
	this.shape_92.setTransform(1785.9,683.5);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#333333").s().p("AgMBBQgNgGgGgLQgFgLgDgMQgCgMABgUQABgVAFgMQAFgMAJgIQAJgIANAAQAOAAAKAMQAKALADARQADARgBAWQgBAWgHAOQgGAOgOAGQgGACgFAAQgHAAgHgEgAgOgrQgHAKgDAVQgCAVAEARQAEAQAJAHQAJAHAIgEQAJgEAFgNQAEgNAAgPIgBgbQgBgMgGgLQgGgKgKAAIgBAAQgIAAgHAKg");
	this.shape_93.setTransform(1775.9,683.5);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#333333").s().p("AgIAIIAAgPIARAAIAAAPg");
	this.shape_94.setTransform(1763.5,689.4);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#333333").s().p("AgSBCQgIgDgGgGQgFgFgCgHQgCgIAAgJQAAgKAEgJQAFgJALgEQgJgFgDgHQgEgHAAgIQAAgJACgGQADgGAGgGQAFgFAHgCQAGgCAIAAQAHAAAGABQAGACAHAFQAIAFADAJQADAKgEAMQgDANgPAHQANADAGAIQAFAIAAAMQAAAMgDAHQgEAHgEAEQgFAFgHADQgHACgMAAQgKAAgIgCgAgBAEQgLABgGAGQgHAHAAAJQgBAJAEAHQADAHAKACQAJACAJgCQAKgCAEgJQAEgJgBgIQgBgJgJgGQgIgFgIAAIgBAAgAgCg1QgLABgFAFQgFAGAAAIQAAAIAGAHQAFAHAMAAQALAAAGgHQAGgHgBgKQAAgKgHgEQgFgEgJAAIgDAAg");
	this.shape_95.setTransform(1755.8,683.6);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#333333").s().p("AgMBBQgNgGgGgLQgFgLgDgMQgCgMABgUQABgVAFgMQAFgMAJgIQAJgIANAAQAOAAAKAMQAKALADARQADARgBAWQgBAWgHAOQgGAOgOAGQgGACgFAAQgHAAgHgEgAgOgrQgHAKgDAVQgCAVAEARQAEAQAJAHQAJAHAIgEQAJgEAFgNQAEgNAAgPIgBgbQgBgMgGgLQgGgKgKAAIgBAAQgIAAgHAKg");
	this.shape_96.setTransform(1745.9,683.5);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#333333").s().p("AAFBDIAAhrQgJAKgQAKIAAgPQAUgNALgSIAKAAIAACFg");
	this.shape_97.setTransform(1734.9,683.5);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#333333").s().p("AgSBCQgIgDgGgGQgFgFgCgHQgCgIAAgJQAAgKAEgJQAFgJALgEQgJgFgDgHQgEgHAAgIQAAgJACgGQADgGAGgGQAFgFAHgCQAGgCAIAAQAHAAAGABQAGACAHAFQAIAFADAJQADAKgEAMQgDANgPAHQANADAGAIQAFAIAAAMQAAAMgDAHQgEAHgEAEQgFAFgHADQgHACgMAAQgKAAgIgCgAgBAEQgLABgGAGQgHAHAAAJQgBAJAEAHQADAHAKACQAJACAJgCQAKgCAEgJQAEgJgBgIQgBgJgJgGQgIgFgIAAIgBAAgAgCg1QgLABgFAFQgFAGAAAIQAAAIAGAHQAFAHAMAAQALAAAGgHQAGgHgBgKQAAgKgHgEQgFgEgJAAIgDAAg");
	this.shape_98.setTransform(1725.8,683.6);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#333333").s().p("AgXBCQAOg8Ajg5IhDAAIAAgOIBTAAIAAANQglA6gKA8g");
	this.shape_99.setTransform(1716.1,683.6);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#333333").s().p("AglBEIAAgEQABgLAKgKQAKgJAQgUQAOgTAFgLQAFgLgCgIQgBgHgGgFQgGgGgIABQgIABgHAGQgIAFgDALIgPgCQAGgSAKgJQAJgIAOgBQAHAAAGABQAGABAHAEQAGAFAFAIQAEAJgBAMQgCAMgKAQQgLARgfAkIA4AAIAAAOg");
	this.shape_100.setTransform(1705.8,683.4);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#333333").s().p("AgMAmIAAgaIAZAAIAAAagAgMgLIAAgaIAZAAIAAAag");
	this.shape_101.setTransform(1686.1,686.9);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#333333").s().p("AA9BTIh3AAIgZABIAAgMIAZABIA1AAIAAgMIgnAAQgMAAgLABIAAgMIAXABIAnAAIAAgKIg5AAIABgaIgBgWIB/AAIAAAYIAAAYIg5AAIAAAKIAkAAIAZgBIAAAMIgZgBIgkAAIAAAMIA1AAIAZgBIAAAMIgZgBgAAIAeIAqAAIAAgIIgqAAgAguAeIApAAIAAgIIgpAAgAAIAMIAqAAIAAgKIgqAAgAguAMIApAAIAAgKIgpAAgAA3gPIhlAAIgqAAIAAgMIAqABIBkAAIAjgBIAAAMIgiAAgAg8gjIABgbIgBgVIB8AAIgBAVIABAbgAgtgsIBeAAIAAgKIheAAgAgthAIBeAAIAAgKIheAAg");
	this.shape_102.setTransform(1670.9,683.6);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#333333").s().p("Ag0BRQAQgHAHgMQAIgMAAgQQABgPgBgMQAIACAJABIgCAXQgBAQgGAPQgGAPgVAOQgGgHgGgFgAA3BWQgPAAAAgOIAAguIgBgTIAQAAIAAAVIAAAnQgBAGAIABIAHAAQAGAAABgSQAHAEAJACQgFAUgFADQgFABgHAAgAAGBWIACgZIAAghIgCgVIARAAIgBAVIAAAhIABAZgAhbBLQAIgJAKgSQALgSAGgUQAGAGAIAEQgIAOgJATQgJAVgHALQgGgGgKgEgAA4gHIguADQgdACgKADQgDgGgEgHQAIgCALgNQAKgOAHgOIgIAAIgdACIAAgPIAdABIAVAAIgLgRIAMgIIAQAZIAZAAIAcgBIAAAOIgcgBIgyAAIALAHQgEAEgGAHIgSAXIA7gDQgHgKgJgGQAJgGACgEQAWAXAPASIgMAJIgLgOgAhbgWIAKgOQASALAQAMQgHAGgEAHQgOgMgTgKgAhRhHIAJgNQASAMAMAJIgKAOQgNgMgQgKg");
	this.shape_103.setTransform(1651.3,683.6);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#333333").s().p("AAXBZIAAgWIAAhOIgdAAIgXABIAAgPIAVAAIAfAAIAAgmIAAgZIAQAAIgBASIAAAtIAgAAIAVAAIAAAPIgUgBIghAAIAABNIABAXgAg/BGQAFgGAAgNIAAhAIggABIAAgOIASAAIAdAAIgBAeIAAAwQAOgOAIgKIAKAMIgVAWIgUAUIgKgMgAhKhMIAMgKIAgAhIgOAMQgKgPgUgUg");
	this.shape_104.setTransform(1631,683.5);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#333333").s().p("AgZBGQAOABACgBQAEgCAAgEIAAgdIggACIgjAEIgFgPQAOgBANgEQAOgDAfgQQgmADgRADQgBgIgDgEQAGAAAOgGQAMgFALgHIgxAAIABghIgBgfICNAAIAAAfIAAAhIgZAAIANALQgJABgRAIIgfANIgaANIBFgFIgOgJIAJgKIAsAcIgKANQgGgGgIgFIgzADIAAAiQAAANgJADQgHADgLABQgBgHgGgKgAgbgHIArgBQAPgHAMgHIgqAAIgcAPgAAIghIAvAAIAAgOIgvAAgAg2ghIAwAAIAAgOIgwAAgAAIg6IAvAAIAAgSIgvAAgAg2g6IAwAAIAAgSIgwAAgAhTBGQAKgFANgIQANgHAMgJQADAFAJAGIgVAMIgcASQgFgHgGgFgAAxBCQgLgHgMgFQAFgGADgGIAYALIAZANQgGAGgDAIQgNgJgMgFg");
	this.shape_105.setTransform(1611.1,683.8);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#333333").s().p("Ag5BZIABggIAAg3QgJAWgPAXIgLgRQAMgNAEgJIAKgTQAEgKACgNIgbABIAAgOIAeABIAAgTIgBgWIARAAIgBAWIAAATIAagBIAAAOIgagBIAAAbIAMgIIASAeIgOAKIgQgeIAAA+IABAggABABPIg2AAIgcABIAAgOIAdABIATAAIAAg3IgIAAIgYABIAAgNIAYAAIAIAAIAAgpIgLAAIgbABIAAgOIAbABIArAAIAZgBIAAAOIgZgBIgQAAIAAApIAMAAIAZAAIAAANIgZgBIgMAAIAAA3IASAAIAcgBIAAAOIgcgBgAAchIIgFgMQAIgDAJgBIAFALIAEANIgQAEIgFgMg");
	this.shape_106.setTransform(1730.9,647.1);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#333333").s().p("AgIBcIABgZIAAhEIgCAAQgJAZgOASQgPASgeAQQgCgHgKgLQAWgGAQgPQARgQAKgYIgmAAQgLAAgRACIAAgQIAcABIA3AAIAAgyQAAgOgCgLIASAAIgBAZIAAAyIAyAAIAfgBIAAAQQgQgCgPAAIglAAQANAUAQANQAQANAZAIQgKANABAGQgagMgRgPQgQgPgPgcIAABDIABAZgAAbgoQAPgSAKgYIATAKQgFAFgIALIgQAZIgPgJgAhEhGIAPgKQAOATALAUQgJAEgHAGQgKgUgOgTg");
	this.shape_107.setTransform(1711.1,647.2);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#333333").s().p("AglBEIAAgEQAAgLALgKQAKgJAQgUQAOgTAFgLQAFgLgCgIQgBgHgGgFQgGgGgIABQgIABgHAGQgIAFgDALIgPgCQAGgSAKgJQAJgIAOgBQAGAAAHABQAGABAHAEQAHAFAEAIQAEAJgBAMQgCAMgKAQQgLARgfAkIA4AAIAAAOg");
	this.shape_108.setTransform(1695.8,647.1);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#333333").s().p("AgFBDQgMgBgKgIQgLgHgEgTIAOgEQAGAVANACQAMADAJgFQAIgGADgIQAEgIAAgKQgBgKgFgHQgFgGgIgDQgIgCgIACQgKADgGAHIgOgBIAPhCIA9AAIAAAOIgxAAIgIAhQAMgFAJAAQAKABAJAEQAKAEAEAIQAEAHACAGQACAIAAAIQAAAJgEAJQgDAJgGAGQgGAGgJADQgHADgIAAIgFAAg");
	this.shape_109.setTransform(1685.6,647.4);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#333333").s().p("AgIAIIAAgQIARAAIAAAQg");
	this.shape_110.setTransform(1673.5,653.1);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#333333").s().p("AgZA7QgLgJgDgSIAOgCQADAKAHAHQAHAHAJgBQALAAAGgIQAGgJAAgKQgBgLgIgGQgHgFgPgDIAAgJQAPgBAHgIQAIgHgBgLQgBgLgJgFQgJgFgKAEQgLADgGASIgOgCQAFgOAIgJQAIgKAOgBQANgCALAFQAKAFAFALQAEAKgDANQgDAMgPAKQALADAGAKQAGAJgCAPQgCAQgMAJQgMAJgOAAQgOAAgLgJg");
	this.shape_111.setTransform(1665.9,647.3);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#333333").s().p("AgMAmIAAgaIAZAAIAAAagAgMgLIAAgaIAZAAIAAAag");
	this.shape_112.setTransform(1646.1,650.6);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#333333").s().p("AhTBPQASgKANgKQAMgKAJgNQAJgNAFgQQAEgQABgWIgWAAIgqABIAAgPIAqAAIAXAAIAAgXIgBgXIATADQgCAHAAANIAAAXIBPAAIgEA6IgDAnQgCAXgLAFQgKAGgaACQgBgJgHgLQAXAAAIgDQAIgDABgIIACgXIAEg+Ig9AAQgDAcgDAPQgFARgIANQgJAOgNAMQgNAMgTAMQgEgGgLgHg");
	this.shape_113.setTransform(1630.8,647.3);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#333333").s().p("AhXBOQANgUAEgRQAFgSABgWIAAg5IgCgeIB8AAIAbgBIAAAPIgbAAIhqAAIAABGQAAAZgGAWQgGAWgLAVQgGgGgKgEgAA7BNIhPAAIgcABIAAgQIAcAAIAcAAIAAg/IgRAAIgbABIAAgRIAbAAIARAAIAAgXIAAgVIASAAQgCAGAAAQIAAAWIAcAAIAYAAIAAARIgYgBIgcAAIAAA/IAiAAIAeAAIAAAQIgdgBgAAlASQAHgEAGgFIAUAdIgQAKQgHgQgKgOg");
	this.shape_114.setTransform(1610.5,647.6);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#333333").s().p("AglBEIAAgEQAAgLALgKQAKgJAPgUQAPgTAFgLQAEgLAAgIQgBgHgHgFQgGgGgJABQgGABgIAGQgHAFgFALIgOgCQAGgSAKgJQAKgIANgBQAGAAAHABQAGABAHAEQAHAFADAIQAFAJgBAMQgBAMgMAQQgKARgfAkIA4AAIAAAOg");
	this.shape_115.setTransform(1210.7,743.5);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#333333").s().p("AgwAFIAAgJIBhAAIAAAJg");
	this.shape_116.setTransform(1200.8,752.9);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#333333").s().p("AgpBDIAAiFIApAAQATAAAJAKQAKALAAAOQAAAOgHAGQgGAHgHACQAJACAIAHQAHAIAAAMQAAAXgNAIQgMAJgTAAgAgXA0IASAAQANAAAIgFQAHgGAAgOQAAgMgIgGQgIgFgJAAIgVAAgAgXgJIAXAAQAIAAAGgGQAGgFAAgLQAAgLgGgEQgGgFgIAAIgXAAg");
	this.shape_117.setTransform(1190.9,743.7);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#333333").s().p("AgwAFIAAgJIBhAAIAAAJg");
	this.shape_118.setTransform(1180.8,752.9);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#333333").s().p("AANBDIAAgeIg7AAIAAgNIA+haIAMAAIAABaIATAAIAAANIgTAAIAAAegAgdAYIAqAAIAAg9g");
	this.shape_119.setTransform(1170.8,743.6);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#333333").s().p("AglBEIAAgEQAAgLALgKQAKgJAPgUQAPgTAFgLQAEgLgBgIQgBgHgGgFQgGgGgIABQgHABgIAGQgHAFgEALIgPgCQAGgSAKgJQAKgIANgBQAGAAAHABQAGABAHAEQAGAFAEAIQAFAJgBAMQgCAMgKAQQgLARgeAkIA3AAIAAAOg");
	this.shape_120.setTransform(1160.7,743.5);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#333333").s().p("AgZA7QgLgJgDgSIAOgCQADAKAHAHQAHAHAJgBQALAAAGgIQAGgJAAgKQgBgLgIgGQgHgFgPgDIAAgJQAPgBAHgIQAIgHgBgLQgBgLgJgFQgJgFgKAEQgLADgGASIgOgCQAFgOAIgJQAIgKAOgBQANgCALAFQAKAFAFALQAEAKgDANQgDAMgPAKQALADAGAKQAGAJgCAPQgCAQgMAJQgMAJgOAAQgOAAgLgJg");
	this.shape_121.setTransform(1150.7,743.7);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#333333").s().p("AANBDIAAgeIg7AAIAAgNIA+haIAMAAIAABaIATAAIAAANIgTAAIAAAegAgdAYIAqAAIAAg9g");
	this.shape_122.setTransform(1140.8,743.6);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#333333").s().p("AgXA/QgMgHgEgMQgEgMABgMQAAgLAEgIIAKgSIAfgyIASAAIgfAzQAUgFAMAHQANAHAEAIQAEAJABAKQAAALgDAKQgEAKgJAIQgJAJgQAAIgDAAQgNAAgKgFgAgEgFQgMACgFAJQgGAKABALQABAMAHAHQAHAIALAAQALABAIgIQAIgJAAgQQAAgRgKgFQgIgFgJAAIgEAAg");
	this.shape_123.setTransform(1131,743.7);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#333333").s().p("AAFBDIAAhrQgJAKgQAKIAAgPQAUgNALgSIAKAAIAACFg");
	this.shape_124.setTransform(1076.4,627.3);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#333333").s().p("AgwAFIAAgJIBhAAIAAAJg");
	this.shape_125.setTransform(1067.4,636.6);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#333333").s().p("AgpBDIAAiFIApAAQATAAAJAKQAKALAAAOQAAAOgHAGQgGAHgHACQAJACAIAHQAHAIAAAMQAAAXgNAIQgMAJgTAAgAgXA0IASAAQANAAAIgFQAHgGAAgOQAAgMgIgGQgIgFgJAAIgVAAgAgXgJIAXAAQAIAAAGgGQAGgFAAgLQAAgLgGgEQgGgFgIAAIgXAAg");
	this.shape_126.setTransform(1057.5,627.4);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#333333").s().p("AgwAFIAAgJIBhAAIAAAJg");
	this.shape_127.setTransform(1047.4,636.6);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#333333").s().p("AANBDIAAgeIg7AAIAAgNIA+haIAMAAIAABaIATAAIAAANIgTAAIAAAegAgdAYIAqAAIAAg9g");
	this.shape_128.setTransform(1037.4,627.3);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#333333").s().p("AglBEIAAgEQABgLAKgKQAKgJAPgUQAPgTAFgLQAEgLAAgIQgCgHgGgFQgGgGgJABQgGABgIAGQgHAFgFALIgOgCQAGgSAKgJQAKgIANgBQAGAAAHABQAGABAHAEQAGAFAEAIQAFAJgBAMQgCAMgLAQQgKARgeAkIA3AAIAAAOg");
	this.shape_129.setTransform(1027.3,627.2);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#333333").s().p("AgZA7QgLgJgDgSIAOgCQADAKAHAHQAHAHAJgBQALAAAGgIQAGgJAAgKQgBgLgIgGQgHgFgPgDIAAgJQAPgBAHgIQAIgHgBgLQgBgLgJgFQgJgFgKAEQgLADgGASIgOgCQAFgOAIgJQAIgKAOgBQANgCALAFQAKAFAFALQAEAKgDANQgDAMgPAKQALADAGAKQAGAJgCAPQgCAQgMAJQgMAJgOAAQgOAAgLgJg");
	this.shape_130.setTransform(1017.3,627.4);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#333333").s().p("AANBDIAAgeIg7AAIAAgNIA+haIAMAAIAABaIATAAIAAANIgTAAIAAAegAgdAYIAqAAIAAg9g");
	this.shape_131.setTransform(1007.4,627.3);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#333333").s().p("AgXA/QgMgHgEgMQgEgMABgMQAAgLAEgIIAKgSIAfgyIASAAIgfAzQAUgFAMAHQANAHAEAIQAEAJABAKQAAALgDAKQgEAKgJAIQgJAJgQAAIgDAAQgNAAgKgFgAgEgFQgMACgFAJQgGAKABALQABAMAHAHQAHAIALAAQALABAIgIQAIgJAAgQQAAgRgKgFQgIgFgJAAIgEAAg");
	this.shape_132.setTransform(997.6,627.4);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#333333").s().p("AAbAsIAAg+QAAgEgCgEQgBgCgEgBQgFABgEAFQgEAGAAAJIAAA0IgNAAIAAg+IgBgIQgBgCgEgBQgFABgEAFQgEAGAAAJIAAA0IgOAAIAAhWIAOAAIAAAMQADgHAFgDQAFgEAFAAQAGAAACAEQAEADABAHQAEgHAEgDQAFgEAFAAQAIABAEAFQAEAEAAAKIAABEg");
	this.shape_133.setTransform(166.8,805.8);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#333333").s().p("AgLBBQgLgGgFgLQgFgLgCgMQgCgMABgUQABgVAEgMQAEgMAJgIQAIgIALAAQAMAAAJAMQAIALADARQADARgBAWQgBAWgGAOQgGAOgLAGQgFACgFAAQgGAAgHgEgAgMgrQgHAKgCAVQgCAVAEARQADAQAIAHQAIAHAHgEQAIgEAEgNQAEgNAAgPIgBgbQgBgMgGgLQgFgKgIAAIgBAAQgHAAgGAKg");
	this.shape_134.setTransform(158,803.5);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#333333").s().p("AgWA7QgKgJgCgSIAMgCQADAKAGAHQAGAHAIgBQAJAAAGgIQAFgJAAgKQgBgLgHgGQgGgFgNgDIAAgJQANgBAGgIQAHgHgBgLQgBgLgIgFQgIgFgIAEQgJADgGASIgMgCQAEgOAHgJQAHgKANgBQALgCAJAFQAJAFAEALQAEAKgDANQgDAMgNAKQAKADAFAKQAFAJgBAPQgCAQgKAJQgLAJgMAAQgNAAgJgJg");
	this.shape_135.setTransform(149.3,803.5);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#333333").s().p("AgHAIIAAgQIAPAAIAAAQg");
	this.shape_136.setTransform(138.5,809.4);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#333333").s().p("AAEBDIAAhrQgHAKgOAKIAAgPQARgNAKgSIAIAAIAACFg");
	this.shape_137.setTransform(131,803.4);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#333333").s().p("AgWA7QgKgJgCgSIAMgCQADAKAGAHQAGAHAIgBQAJAAAGgIQAFgJAAgKQgBgLgHgGQgGgFgNgDIAAgJQANgBAGgIQAHgHgBgLQgBgLgIgFQgIgFgIAEQgJADgGASIgMgCQAEgOAHgJQAHgKANgBQALgCAJAFQAJAFAEALQAEAKgDANQgDAMgNAKQAKADAFAKQAFAJgBAPQgCAQgKAJQgLAJgMAAQgNAAgJgJg");
	this.shape_138.setTransform(123.1,803.5);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#333333").s().p("AgHAsIAAgRIAPAAIAAARgAgHgbIAAgRIAPAAIAAARg");
	this.shape_139.setTransform(114.4,805.8);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#333333").s().p("AgyBZIABggIAAg3QgIAWgNAXQgIgPgCgCQALgNAEgJIAJgTQADgKACgNIgYABIAAgOIAaABIAAgTIgBgWIAPAAIAAAWIAAATIAVgBIAAAOIgVgBIAAAbIAKgIIAQAeIgNAKIgNgeIAAA+IAAAggAA4BPIgvAAIgZABIAAgOIAZABIARAAIAAg3IgHAAIgVABIAAgNIAVAAIAHAAIAAgpIgJAAIgYABIAAgOIAYABIAlAAIAXgBIAAAOIgXgBIgPAAIAAApIAMAAIAVAAIAAANIgVgBIgMAAIAAA3IARAAIAYgBIAAAOIgYgBgAAZhIIgFgMQAIgDAHgBIAEALIAEANIgPAEIgDgMg");
	this.shape_140.setTransform(101.3,803.4);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#333333").s().p("AhJBPQARgKALgKQALgKAHgNQAIgNAEgQQAEgQABgWIgUAAIgkABIAAgPIAkAAIAVAAIAAgXIgBgXIAQADQgBAHgBANIAAAXIBGAAIgEA6IgCAnQgCAXgKAFQgJAGgWACQgBgJgGgLQAUAAAGgDQAHgDABgIIACgXIADg+Ig1AAQgCAcgDAPQgEARgHANQgHAOgMAMQgMAMgQAMQgDgGgLgHg");
	this.shape_141.setTransform(83.7,803.5);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#333333").s().p("AhMBOQAMgUADgRQAEgSACgWIAAg5IgCgeIBsAAIAXgBIAAAPIgXAAIhdAAIAABGQAAAZgFAWQgFAVgJAWQgGgHgJgDgAA0BNIhEAAIgaABIAAgQIAaAAIAYAAIAAg/IgPAAQgSAAgGABIAAgSIAYABIAPAAIAAgXIgBgVIAPAAQgBAGAAAQIAAAWIAZAAIAVgBIAAASIgVgBIgZAAIAAA/IAeAAIAaAAIAAAQIgZgBgAAhASQAGgDAFgGIASAdIgOAKQgHgQgIgOg");
	this.shape_142.setTransform(66,803.9);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#333333").s().p("AgGBEIgiiGIAQAAIAYBlIABAAIAYhlIAQAAIgiCGg");
	this.shape_143.setTransform(262.8,766.6);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#333333").s().p("AAbAsIAAg+QAAgFgCgDQgBgCgEAAQgFAAgEAFQgEAGAAAJIAAA0IgNAAIAAg+IgBgIQgBgCgEAAQgFAAgEAFQgEAGAAAJIAAA0IgOAAIAAhWIAOAAIAAAMQADgHAFgDQAFgDAFgBQAGABACADQAEADABAHQAEgHAEgDQAFgDAFgBQAIAAAEAGQAEAEAAAKIAABEg");
	this.shape_144.setTransform(254.2,768.8);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#333333").s().p("AgLBBQgLgGgFgLQgFgLgCgMQgCgMABgUQABgVAEgMQAEgMAJgIQAIgIALAAQAMAAAJAMQAIALADARQADARgBAWQgBAWgGAOQgGAOgLAGQgFACgFAAQgGAAgHgEgAgMgrQgHAKgCAVQgCAVAEARQADAQAIAHQAIAHAHgEQAIgEAEgNQAEgNAAgPIgBgbQgBgMgGgLQgFgKgIAAIgBAAQgHAAgGAKg");
	this.shape_145.setTransform(245.4,766.5);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#333333").s().p("AgLBBQgLgGgFgLQgFgLgCgMQgCgMABgUQABgVAEgMQAEgMAJgIQAIgIALAAQAMAAAJAMQAIALADARQADARgBAWQgBAWgGAOQgGAOgLAGQgFACgFAAQgGAAgHgEgAgMgrQgHAKgCAVQgCAVAEARQADAQAIAHQAIAHAHgEQAIgEAEgNQAEgNAAgPIgBgbQgBgMgGgLQgFgKgIAAIgBAAQgHAAgGAKg");
	this.shape_146.setTransform(236.6,766.5);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#333333").s().p("AgHAIIAAgQIAPAAIAAAQg");
	this.shape_147.setTransform(225.9,772.4);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#333333").s().p("AgEBDQgLgBgJgIQgJgHgEgTIANgEQAFAVALACQALADAHgFQAHgGADgIQADgIAAgKQAAgKgFgHQgEgGgHgDQgHgCgIACQgIADgGAHIgLgBIANhCIA1AAIAAAOIgrAAQgDAVgEAMQAKgFAIAAQAJABAIAEQAJAEADAIQAEAHACAGQACAIgBAIQAAAJgDAJQgDAJgFAGQgGAGgHADQgGADgHAAIgEAAg");
	this.shape_148.setTransform(219,766.7);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#333333").s().p("AgEBDQgLgBgJgIQgJgHgEgTIANgEQAFAVALACQALADAHgFQAHgGADgIQADgIAAgKQAAgKgFgHQgEgGgHgDQgHgCgIACQgIADgGAHIgLgBIANhCIA1AAIAAAOIgrAAQgDAVgEAMQAKgFAIAAQAJABAIAEQAJAEADAIQAEAHACAGQACAIgBAIQAAAJgDAJQgDAJgFAGQgGAGgHADQgGADgHAAIgEAAg");
	this.shape_149.setTransform(210.2,766.7);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#333333").s().p("AALBDIAAgeIgzAAIAAgNIA2haIAKAAIAABaIARAAIAAANIgRAAIAAAegAgZAYIAkAAIAAg9g");
	this.shape_150.setTransform(201.8,766.4);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#333333").s().p("AgQBCQgHgDgFgGQgFgFgBgHQgCgIAAgJQAAgKAEgJQAEgJAKgEQgIgFgDgHQgDgHAAgIQgBgJADgGQACgGAFgGQAFgFAGgCQAFgCAHAAQAGAAAFABQAGACAGAFQAGAFADAJQADAKgDAMQgDANgNAHQALADAFAIQAFAIAAAMQAAAMgDAHQgDAHgEAEQgEAFgGADQgHACgKAAQgJAAgHgCgAgBAEQgJABgGAGQgGAHAAAJQAAAJADAHQADAHAIACQAIACAIgCQAJgCADgJQAEgJgBgIQgBgJgIgGQgHgFgHAAIgBAAgAgCg1QgJABgFAFQgEAGAAAIQAAAIAFAHQAFAHAKAAQAJAAAGgHQAFgHgBgKQAAgKgGgEQgFgEgIAAIgCAAg");
	this.shape_151.setTransform(192.9,766.5);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#333333").s().p("AggBEIAAgEQABgLAIgKQAJgJAOgUQANgTAEgLQAEgLgBgIQgBgHgGgFQgFgGgHABQgGABgHAGQgGAFgEALIgNgCQAGgSAIgJQAJgIALgBQAGAAAGABQAFABAGAEQAGAFADAIQAEAJgBAMQgBAMgJAQQgKARgaAkIAwAAIAAAOg");
	this.shape_152.setTransform(184.1,766.4);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#333333").s().p("AgWA7QgKgJgCgSIAMgCQADAKAGAHQAGAHAIgBQAJAAAGgIQAFgJAAgKQgBgLgHgGQgGgFgNgDIAAgJQANgBAGgIQAHgHgBgLQgBgLgIgFQgIgFgIAEQgJADgGASIgMgCQAEgOAHgJQAHgKANgBQALgCAJAFQAJAFAEALQAEAKgDANQgDAMgNAKQAKADAFAKQAFAJgBAPQgCAQgKAJQgLAJgMAAQgNAAgJgJg");
	this.shape_153.setTransform(175.5,766.5);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#333333").s().p("AgHAsIAAgRIAPAAIAAARgAgHgbIAAgRIAPAAIAAARg");
	this.shape_154.setTransform(166.8,768.8);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#333333").s().p("AhMBOQALgUAFgRQAEgSAAgWIAAg5IgBgeIBsAAIAYgBIAAAPIgYAAIhdAAIAABGQAAAZgFAWQgFAWgKAVQgFgGgJgEgAA0BNIhFAAIgZABIAAgQIAZAAIAYAAIAAg/IgOAAIgYABIAAgRIAYAAIAOAAIAAgXIAAgVIAQAAQgCAGAAAQIAAAWIAZAAIAVAAIAAARIgVgBIgZAAIAAA/IAeAAIAaAAIAAAQIgZgBgAAhASQAGgEAEgFIASAdIgNAKQgHgQgIgOg");
	this.shape_155.setTransform(153.4,766.9);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#333333").s().p("AgTBFIAAgbIgnAAIAAAPIgQAAQABgIAAguQAAgtgBgOIA3AAIAAghIAPAAIgBAhIA2AAQgBALAAAlIABAyIg2AAIAAAVQAAAOAMAAIAkAAQALAAACgGQACgFABgMQAHAGAJACQgFASgEAFQgEAFgJAAIg1AAIgBAAQgRAAgBgVgAgFAdIAoAAIAAgfIgoAAgAg6AdIAnAAIAAgfIgnAAgAgFgOIAoAAIAAgdIgoAAgAg6gOIAnAAIAAgdIgnAAg");
	this.shape_156.setTransform(136.9,766.4);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#333333").s().p("AhPBOQAHgJAJgWQAJgUADgMQAGAEAIAFQgEAGgIAXIgOAjIgQgKgAAABVQgTAAABgYIAAg+IgPAFIgDgOIASgHIAAgSIgBgaIAPAAIgBAZIAAAPIAVgIIAAggIgBgaIAOAAIgBAbIAAAaIAogOIgEBAQAAANgFAEQgFADgNADQgBgIgGgIQALgBADgCQADgBABgLIABgkIgZAJIAAAtIABAbIgOAAIABgbIAAgpIgVAIIAABCQAAANALgCIAuAAQAHAAACgFQADgEACgRQAGAGAJADQgEARgEAIQgEAGgOABgAhQgVIAIgNQANAHAQAMQgFAHgEAIQgMgLgQgKgAhDhHIAJgLQAMAKAOANIgKANIgZgZg");
	this.shape_157.setTransform(118.9,766.5);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#333333").s().p("AgTBFIAAgbIgnAAIAAAPIgQAAQABgIAAguQAAgtgBgOIA3AAIAAghIAPAAIgBAhIA2AAQgBALAAAlIABAyIg2AAIAAAVQAAAOAMAAIAkAAQALAAACgGQACgFABgMQAHAGAJACQgFASgEAFQgEAFgJAAIg1AAIgBAAQgRAAgBgVgAgFAdIAoAAIAAgfIgoAAgAg6AdIAnAAIAAgfIgnAAgAgFgOIAoAAIAAgdIgoAAgAg6gOIAnAAIAAgdIgnAAg");
	this.shape_158.setTransform(102,766.4);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#333333").s().p("AhIBJQALABADgBQADgBAAgJIAAgrIgTALQgCgLgEgHIAZgIIAAglIgGAAIgPABIAAgPIAPACIAGAAIAAgSQgBgOgBgMIAQAAQgCAJAAANIAAAWIAQgCIAAAPIgQgBIAAAgIAQgIIAAAOIgQAHIAAA2QAAARgGACIgRAFQgCgNgEgFgAA6BSIg5AAIgXABIAAgQQAHACAPAAIAUAAIAAgwIgPAAQgMAAgIABIAAgPIATABIAqAAIAXgBIAAAOIgXAAIgMAAIAAAwIAWAAQAMAAAMgCIAAAQIgWgBgAgTgEQAQgRAMgVIANAKQgEAEgHAJIgUAZgAAjggIALgJQAXAbAFAJIgLAIQgSgagKgJgABBghIAAgUIhIAAIAAAUIgNAAIAAgQIAAgTIAoAAIgGgSIAPgEIAGAWIAsAAIgBASIABARg");
	this.shape_159.setTransform(83.9,766.5);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#333333").s().p("AhJBcIABglIAAhMIgBgdIAQAAQgCALAAATIAABwgAAkBKQAPAAAEgBQAFgBAAgMIAAiAIgzAAIgaAAIAAgOIAZAAIBCAAIAAAiIAABzQgBAPgIAEQgKADgNACQgBgLgFgGgAgmBLIAAggIAAgwIgKASQgEgFgFgFQALgNAHgSQAIgRADgOIAPAIQgGAIgGAOIAABogAAkBFQgKgDgLgVQgGAJgOANQgFgFgHgGQAHgDAIgGQAGgGAGgKQgEgKgGgcIgQADIgCgOIASgDIgBgoQAHACAHAAIgBAUIAAAQIAmgGIABAOIgmAFQABARAFAPQAIgMAGgNQAEADAKAEIgLAOIgMAQQAKASADgBQAEgBABgNQAFAGAIABQgHAZgKAAIgCAAgAAWgzQAGgEADgEIANASIgKAJQgHgNgFgGgAg8hQIANgLIARAaIgNAKQgIgPgJgKg");
	this.shape_160.setTransform(66.5,766.5);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#333333").s().p("AAbAtIAAg/QAAgEgCgEQgBgCgEAAQgFgBgEAGQgEAGAAAJIAAA1IgNAAIAAg/IgBgIQgBgCgEAAQgFgBgEAGQgEAGAAAJIAAA1IgOAAIAAhXIAOAAIAAAMQADgGAFgEQAFgDAFgBQAGABACADQAEAEABAGQAEgGAEgEQAFgDAFgBQAIAAAEAGQAEAEAAAKIAABFg");
	this.shape_161.setTransform(219.2,734);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#333333").s().p("AgLBBQgLgGgFgLQgFgLgCgMQgCgMABgUQABgVAEgMQAEgMAJgIQAIgIALAAQAMAAAJAMQAIALADARQADARgBAWQgBAWgGAOQgGAOgLAGQgFACgFAAQgGAAgHgEgAgMgrQgHAKgCAVQgCAVAEARQADAQAIAHQAIAHAHgEQAIgEAEgNQAEgNAAgPIgBgbQgBgMgGgLQgFgKgIAAIgBAAQgHAAgGAKg");
	this.shape_162.setTransform(210.4,731.7);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#333333").s().p("AgLBBQgLgGgFgLQgFgLgCgMQgCgMABgUQABgVAEgMQAEgMAJgIQAIgIALAAQAMAAAJAMQAIALADARQADARgBAWQgBAWgGAOQgGAOgLAGQgFACgFAAQgGAAgHgEgAgMgrQgHAKgCAVQgCAVAEARQADAQAIAHQAIAHAHgEQAIgEAEgNQAEgNAAgPIgBgbQgBgMgGgLQgFgKgIAAIgBAAQgHAAgGAKg");
	this.shape_163.setTransform(201.7,731.7);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#333333").s().p("AgHAJIAAgRIAPAAIAAARg");
	this.shape_164.setTransform(190.9,737.6);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#333333").s().p("AggBEIAAgEQABgLAIgKQAJgJAOgUQANgTAEgLQAEgLgBgIQgBgHgGgFQgFgGgHABQgGABgHAGQgGAFgEALIgNgCQAGgSAIgJQAJgIALgBQAGAAAGABQAFABAGAEQAGAFADAIQAEAJgBAMQgBAMgJAQQgKARgaAkIAwAAIAAAOg");
	this.shape_165.setTransform(184.1,731.6);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#333333").s().p("AgRBFQAPgdAIgXQgQADgLgJQgLgIgDgNQgCgOADgLQACgLAGgIQAGgHAIgDQAIgEAGAAQAGAAAHAEQAHADAFAGQAGAGACAHQACAGAAALQAAALgHAPQgHAQgZA0gAgIgyQgHAEgDAJQgEAJABAKQABALAGAGQAHAGAHgBQAHgBAEgDQAFgEAEgJQADgMgCgIQgBgIgGgFQgGgGgHAAIgBAAQgDAAgFACg");
	this.shape_166.setTransform(175.3,731.7);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#333333").s().p("AgQBCQgHgDgFgGQgFgFgBgHQgCgIAAgJQAAgKAEgJQAEgJAKgEQgIgFgDgHQgDgHAAgIQgBgJADgGQACgGAFgGQAFgFAGgCQAFgCAHAAQAGAAAFABQAGACAGAFQAGAFADAJQADAKgDAMQgDANgNAHQALADAFAIQAFAIAAAMQAAAMgDAHQgDAHgEAEQgEAFgGADQgHACgKAAQgJAAgHgCgAgBAEQgJABgGAGQgGAHAAAJQAAAJADAHQADAHAIACQAIACAIgCQAJgCADgJQAEgJgBgIQgBgJgIgGQgHgFgHAAIgBAAgAgCg1QgJABgFAFQgEAGAAAIQAAAIAFAHQAFAHAKAAQAJAAAGgHQAFgHgBgKQAAgKgGgEQgFgEgIAAIgCAAg");
	this.shape_167.setTransform(166.7,731.8);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#333333").s().p("AgEBDQgLgBgJgIQgJgHgEgTIANgEQAFAVALACQALADAHgFQAHgGADgIQADgIAAgKQAAgKgFgHQgEgGgHgDQgHgCgIACQgIADgGAHIgLgBIANhCIA1AAIAAAOIgrAAQgDAVgEAMQAKgFAIAAQAJABAIAEQAJAEADAIQAEAHACAGQACAIgBAIQAAAJgDAJQgDAJgFAGQgGAGgHADQgGADgHAAIgEAAg");
	this.shape_168.setTransform(157.8,731.9);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#333333").s().p("AgQBCQgHgDgFgGQgFgFgBgHQgCgIAAgJQAAgKAEgJQAEgJAKgEQgIgFgDgHQgDgHAAgIQgBgJADgGQACgGAFgGQAFgFAGgCQAFgCAHAAQAGAAAFABQAGACAGAFQAGAFADAJQADAKgDAMQgDANgNAHQALADAFAIQAFAIAAAMQAAAMgDAHQgDAHgEAEQgEAFgGADQgHACgKAAQgJAAgHgCgAgBAEQgJABgGAGQgGAHAAAJQAAAJADAHQADAHAIACQAIACAIgCQAJgCADgJQAEgJgBgIQgBgJgIgGQgHgFgHAAIgBAAgAgCg1QgJABgFAFQgEAGAAAIQAAAIAFAHQAFAHAKAAQAJAAAGgHQAFgHgBgKQAAgKgGgEQgFgEgIAAIgCAAg");
	this.shape_169.setTransform(149.3,731.8);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#333333").s().p("AgWA7QgKgJgCgSIAMgCQADAKAGAHQAGAHAIgBQAJAAAGgIQAFgJAAgKQgBgLgHgGQgGgFgNgDIAAgJQANgBAGgIQAHgHgBgLQgBgLgIgFQgIgFgIAEQgJADgGASIgMgCQAEgOAHgJQAHgKANgBQALgCAJAFQAJAFAEALQAEAKgDANQgDAMgNAKQAKADAFAKQAFAJgBAPQgCAQgKAJQgLAJgMAAQgNAAgJgJg");
	this.shape_170.setTransform(140.6,731.8);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#333333").s().p("AgHAtIAAgSIAPAAIAAASgAgHgbIAAgRIAPAAIAAARg");
	this.shape_171.setTransform(131.8,734);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#333333").s().p("AA2BTIhoAAIgWABIAAgMIAWABIAuAAIAAgMIgiAAIgVACIAAgNIAVABIAiAAIAAgKIgyAAIABgaIgBgVIBvAAIgBAYIABAXIgyAAIAAAKIAgAAIAVgBIAAAMIgVgBIggAAIAAAMIAvAAIAVgBIAAAMIgVgBgAAHAeIAkAAIAAgIIgkAAgAgoAeIAkAAIAAgIIgkAAgAAHAMIAkAAIAAgJIgkAAgAgoAMIAkAAIAAgJIgkAAgAAwgPIhYAAIgkABIAAgNIAkACIBXAAIAegCIAAANIgdgBgAg1giIABgbIgBgWIBtAAIgBAWIABAbgAgogsIBTAAIAAgLIhTAAgAgohBIBTAAIAAgJIhTAAg");
	this.shape_172.setTransform(118.8,731.8);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#333333").s().p("AgtBRQAOgHAGgMQAGgMABgPIAAgbQAHABAJAAIgDAYQgBAQgFAPQgGAPgSAOQgEgHgGgFgAAwBXQgNAAAAgPIAAguIgBgSIAOAAIAAAUIAAAmQAAAIAFgBIAHAAQAGABABgTQAFAFAIADQgEATgFACQgEADgGAAgAAGBXIAAgZIAAgjIAAgTIAOAAIAAATIAAAjIAAAZgAhPBLQAHgJAIgTQAJgSAHgTQAFAFAHAFQgHANgIAUIgOAfQgGgFgIgEgAAxgHIgpAEQgYACgJABQgCgFgEgGQAGgDAKgNQAKgOAFgNIgHAAIgZABIAAgPIAZABIATAAQgGgLgEgGQAGgEAFgEIANAZIAWAAIAYgBIAAAOIgYAAIgrAAIAJAHQgDACgGAJIgPAVIA0gCQgIgJgHgIQAIgFACgEQATAXANASIgKAJIgKgOgAhPgVIAIgPIAeAXQgFAGgEAHQgNgNgQgIgAhHhHIAIgMQAQAKALAKIgKAOQgLgNgOgJg");
	this.shape_173.setTransform(101.6,731.8);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#333333").s().p("AAUBYIAAgVIAAhOIgZAAIgVAAIAAgOIATABIAbAAIAAgoIAAgXIAOAAIgBASIAAAtIAcAAIASgBIAAAOIgRAAIgdAAIAABNIABAWgAg3BGQAFgHgBgMIAAhAIgbABIAAgPIAPABIAaAAIgBAeIAAAwQAMgNAGgLIAKAMIgTAWIgRAVIgJgNgAhBhMIALgJIAcAhIgMALQgJgOgSgVg");
	this.shape_174.setTransform(83.9,731.7);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#333333").s().p("AgVBGQALABADgBQADgDAAgCIAAgeIgcACIgfAEIgEgOQAMgCAMgEQALgEAcgPQgiADgOAEQgCgJgCgFQAGAAALgFQALgFAJgIIgpAAIAAgfIAAghIB6AAIgBAhIABAfIgWAAIALALQgHADgQAIIgaAMIgXANIA9gEIgNgKQAFgEAEgFIAmAbIgJAMIgNgLIgsAFIAAAhQAAAMgIAEQgGADgJACQgBgIgFgKgAgXgHIAlgBQANgHALgIIglAAIgYAQgAAHghIAqAAIAAgPIgqAAgAgvghIAqAAIAAgPIgqAAgAAHg7IAqAAIAAgRIgqAAgAgvg7IAqAAIAAgRIgqAAgAhJBGIAVgNQALgHAKgKQADAGAIAGIgSAMIgZASIgKgMgAArBBIgUgKIAGgNIAWALIAVAMQgEAIgDAHIgWgPg");
	this.shape_175.setTransform(66.5,732);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#333333").s().p("AAeAtIAAg+QAAgFgBgEQgCgCgEAAQgGgBgFAGQgEAGAAAKIAAA0IgPAAIAAg+QAAgFgBgEQgCgCgFAAQgFgBgFAGQgEAGAAAKIAAA0IgQAAIAAhXIAQAAIAAAMQADgHAGgDQAFgDAHgBQAGABADADQAEADACAHQAEgHAFgDQAFgDAGgBQAKAAAEAGQAFAEAAAKIAABFg");
	this.shape_176.setTransform(562.1,923.8);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#333333").s().p("AgbAhQgNgMAAgVQAAgUANgMQAMgMAQAAQASAAAJAJQALAJgBAMIgRAAQAAgJgGgEQgGgDgIAAQgIAAgIAHQgIAIAAAPQAAARAIAHQAIAHAIAAQAKAAAHgFQAGgGAAgLIARAAQAAAQgMAKQgKAKgSAAQgQAAgMgMg");
	this.shape_177.setTransform(552,923.9);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#333333").s().p("AgMBBQgNgGgGgLQgFgLgDgMQgCgMABgUQABgVAFgMQAFgMAJgIQAJgIANAAQAOAAAKAMQAKALADARQADARgBAWQgBAWgHAOQgGAOgOAGQgGACgFAAQgHAAgHgEgAgOgrQgHAKgDAVQgCAVAEARQAEAQAJAHQAJAHAIgEQAJgEAFgNQAEgNAAgPIgBgbQgBgMgGgLQgGgKgKAAIgBAAQgIAAgHAKg");
	this.shape_178.setTransform(542,921.5);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#333333").s().p("AgSBCQgIgDgGgGQgFgFgCgHQgCgIAAgJQAAgKAEgJQAFgJALgEQgJgFgDgHQgEgHAAgIQAAgJACgGQADgGAGgGQAFgFAHgCQAGgCAIAAQAHAAAGABQAGACAHAFQAIAFADAJQADAKgEAMQgDANgPAHQANADAGAIQAFAIAAAMQAAAMgDAHQgEAHgEAEQgFAFgHADQgHACgMAAQgKAAgIgCgAgBAEQgLABgGAGQgHAHAAAJQgBAJAEAHQADAHAKACQAJACAJgCQAKgCAEgJQAEgJgBgIQgBgJgJgGQgIgFgIAAIgBAAgAgCg1QgLABgFAFQgFAGAAAIQAAAIAGAHQAFAHAMAAQALAAAGgHQAGgHgBgKQAAgKgHgEQgFgEgJAAIgDAAg");
	this.shape_179.setTransform(532,921.6);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#333333").s().p("AgIAJIAAgRIARAAIAAARg");
	this.shape_180.setTransform(519.7,927.4);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#333333").s().p("AgMBBQgNgGgGgLQgFgLgDgMQgCgMABgUQABgVAFgMQAFgMAJgIQAJgIANAAQAOAAAKAMQAKALADARQADARgBAWQgBAWgHAOQgGAOgOAGQgGACgFAAQgHAAgHgEgAgOgrQgHAKgDAVQgCAVAEARQAEAQAJAHQAJAHAIgEQAJgEAFgNQAEgNAAgPIgBgbQgBgMgGgLQgGgKgKAAIgBAAQgIAAgHAKg");
	this.shape_181.setTransform(512,921.5);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#333333").s().p("AANBDIAAgeIg7AAIAAgNIA+haIAMAAIAABaIATAAIAAANIgTAAIAAAegAgdAYIAqAAIAAg9g");
	this.shape_182.setTransform(502.1,921.5);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#333333").s().p("AglBEIAAgEQAAgLALgKQAKgJAPgUQAPgTAFgLQAFgLgCgIQgBgHgGgFQgGgGgIABQgIABgHAGQgHAFgEALIgPgCQAGgSAKgJQAKgIANgBQAGAAAHABQAGABAHAEQAGAFAFAIQAEAJgBAMQgCAMgKAQQgLARgeAkIA3AAIAAAOg");
	this.shape_183.setTransform(492,921.4);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#333333").s().p("AgIAtIAAgSIARAAIAAASgAgIgaIAAgSIARAAIAAASg");
	this.shape_184.setTransform(482,923.8);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#333333").s().p("Ag/BbQABgOAAgXIAAhKIgSAeQgGgKgFgEQAKgLAMgZQAMgYAGgaQAKAGAKACQgGAGgJAfIAABiIAAAmgABIBLIhPAAIgbABIAAgPIAaABIAlAAQAKgjAJg2IAWAEQgEAFgFASIgPA+IAaAAIAUgBIAAAPIgUgBgAgFASQgFgQgIgUQAIgCAIgEQANAoAHAgIgPAGIgIgkgABBgpIhFAAIgWABIAAgOIAWAAIBFAAIAWAAIAAAOIgWgBgAAIhSIAOgIIARAcQgGABgLAGQgFgOgJgNg");
	this.shape_185.setTransform(467.1,921.6);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#333333").s().p("AgfBJQANACAFgCQAGgBgBgJIAAh6QAAgUgBgLIARAAIgBAVQAAAJACAOQACANAMATQAggaAGgPIAQAPQgKAHgJAIIgbAYQAGAMAQAQQAQARAYAHQgOAGgCAJQgdgSgQgVQgRgWgIgVIAABVQABALgIAFQgJAFgPABQgBgIgGgKgAhcA4QAWgPANgVQAMgUAHgaIgVAAIgaABIAAgQIAZABIAoAAQgDAVgGAQQgGAQgKARQgJAQgVAVQgGgHgLgEg");
	this.shape_186.setTransform(447.2,921.6);

	this.instance_1 = new lib.元件8("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(972.9,442.8,2.863,0.612,-90,0,0,46.5,7.8);

	this.instance_2 = new lib.元件8("synched",0);
	this.instance_2.parent = this;
	this.instance_2.setTransform(915.9,739.3,0.393,0.612,-90,0,0,46.4,7.8);

	this.instance_3 = new lib.管子2("synched",0);
	this.instance_3.parent = this;
	this.instance_3.setTransform(889.1,724.9,0.056,0.578,0,0,0,528.4,9.1);

	this.instance_4 = new lib.元件8("synched",0);
	this.instance_4.parent = this;
	this.instance_4.setTransform(864.2,520.1,4.504,0.612,-90,0,0,46.6,7.8);

	this.instance_5 = new lib.元件8("synched",0);
	this.instance_5.parent = this;
	this.instance_5.setTransform(1785.7,431,2.584,0.329,-90,0,0,45.5,11.1);

	this.instance_6 = new lib.管子2("synched",0);
	this.instance_6.parent = this;
	this.instance_6.setTransform(1727.9,304.3,0.113,0.331,0,0,0,539.8,16.8);

	this.instance_7 = new lib.元件8("synched",0);
	this.instance_7.parent = this;
	this.instance_7.setTransform(518.9,526.4,4.504,0.612,-90,0,0,46.6,7.8);

	this.instance_8 = new lib.管子2("synched",0);
	this.instance_8.parent = this;
	this.instance_8.setTransform(638.5,306.2,0.639,0.578,0,0,0,528.5,9.1);

	this.instance_9 = new lib.元件8("synched",0);
	this.instance_9.parent = this;
	this.instance_9.setTransform(217,522.5,2.236,0.612,-90,0,0,47.1,7.4);

	this.instance_10 = new lib.管子2("synched",0);
	this.instance_10.parent = this;
	this.instance_10.setTransform(168,413.9,0.099,0.578,0,0,0,527.4,9.1);

	this.instance_11 = new lib.阀门("synched",0);
	this.instance_11.parent = this;
	this.instance_11.setTransform(1787.1,588.1,1.162,1.162,0,0,0,36.1,32.1);

	this.instance_12 = new lib.元件8("synched",0);
	this.instance_12.parent = this;
	this.instance_12.setTransform(1669.2,402.4,4.299,0.612,-90,0,0,47.1,7.4);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#CCCCCC").s().p("AkIAYIAmgtIHqgEIABAzg");
	this.shape_187.setTransform(1668.8,122.7,1.196,0.938);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#999999").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_188.setTransform(1668.7,143.3,0.681,0.247);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#CCCCCC").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_189.setTransform(1668.8,189.1,0.313,0.247);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#E1E0E0").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_190.setTransform(1668.7,153.5,1.196,0.938);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#CCCCCC").s().p("ACeAHQAFgHACgGIAAANgAikAHIAAgHQACAEADADg");
	this.shape_191.setTransform(1669.3,557.3);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#999999").s().p("AidD9QgEgDgBgEQgDgGAAgGQAAgGADgFIAAmQQgDgGAAgGQAAgGADgFIAAAAQAIgTAmgQQAtgRBAAAIAQAAQA/AAAtARQAbALAMAOQAFAFACAFIADAAIAAAIIAAADIAAAFIAABRIAAAKIAAFDIAAAEIAAAFQgCAHgFAHg");
	this.shape_192.setTransform(1669.2,532.7);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#CCCCCC").s().p("AkHFFQgCgLgBgLQAAgOAEgMIAAlEIADAAIAAkVIAIAAQARAPAxALIAeAHQA8ALBOABIAQAAIACAAIABAAIARAAQBMgBA9gLIAhgHQArgKATgNIAEgDIALAAIAAEVIgCAAIAAFVIAAAJQAAALgCALg");
	this.shape_193.setTransform(1669.2,587.5);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#999999").s().p("AABAIIgBAAIgBAAIgRAAQhNgCg8gKIgDgDIE9AAIgDADQg9ALhNABg");
	this.shape_194.setTransform(1669.2,558.8);

	this.instance_13 = new lib.管子2("synched",0);
	this.instance_13.parent = this;
	this.instance_13.setTransform(1657.4,604.8,0.167,1.685,0,0,0,527.8,9.1);

	this.instance_14 = new lib.元件8("synched",0);
	this.instance_14.parent = this;
	this.instance_14.setTransform(116.5,437,4.299,0.612,-90,0,0,47.1,7.4);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#CCCCCC").s().p("AkIAYIAmgtIHqgEIABAzg");
	this.shape_195.setTransform(116.1,157.3,1.196,0.938);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#999999").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_196.setTransform(116,177.9,0.681,0.247);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#CCCCCC").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_197.setTransform(116.1,223.8,0.313,0.247);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#E1E0E0").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_198.setTransform(116,188.2,1.196,0.938);

	this.instance_15 = new lib.元件8("synched",0);
	this.instance_15.parent = this;
	this.instance_15.setTransform(1455.1,437.1,4.398,0.612,-90,0,0,46.6,7.8);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#CCCCCC").s().p("AkIAYIAmgtIHqgEIABAzg");
	this.shape_199.setTransform(1454.7,152.6,1.195,0.959);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#999999").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_200.setTransform(1454.3,169.8,0.681,0.252);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#CCCCCC").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_201.setTransform(1454.4,216.9,0.313,0.252);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#E1E0E0").s().p("AkIFAIAAp/IIRAAIAAJ/g");
	this.shape_202.setTransform(1454.7,183,1.195,0.959);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#CCCCCC").s().p("ACeAHQAFgGABgHIAAANgAijAHIAAgHQABADADAEg");
	this.shape_203.setTransform(1455,596.1);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#999999").s().p("AidEDQgEgEgBgEQgDgGAAgGQAAgGADgFIAAmZQgDgGAAgHQAAgFADgFIAAgBQAIgTAmgQQAtgSBAAAIAQAAQA/AAAtASQAbALAMAOQAFAFACAFIADAAIAAAIIAAADIAAAGIAABSIAAAKIAAFLIAAAEIAAAFQgCAIgFAHg");
	this.shape_204.setTransform(1454.9,570.9);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#CCCCCC").s().p("Ah1FgQgwgsgBg/QABgOACgMIAAlMIACAAIAAkcIAEAAQAMAPAeAMQAwAUBEAAQBEAAAxgUQAbgLAMgNIACgDIAHAAIAAEcIgBAAIAAFcIAAAKQAAA/gwAsQgxAuhEAAQhEAAgxgug");
	this.shape_205.setTransform(1455.1,636.8);

	this.instance_16 = new lib.元件8("synched",0);
	this.instance_16.parent = this;
	this.instance_16.setTransform(303.3,424.7,4.206,0.612,-90,0,0,47.1,7.4);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.lf(["#FFFFFF","#000000"],[0,1],-12.5,0,12.5,0).s().p("AAkCXQgkgkAAg0Ih8AAIAAh9IB8AAQAAgzAkglQAmglAzAAIAAF3QgzAAgmglg");
	this.shape_206.setTransform(924.5,768.6,1.065,0.702);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,34.3).s().p("AhCjbQA4AAAmAYQAnAXAAAhIAAEXQAAALgFAJQgIAVgaAPQgSALgUAGQgZAHgfAAg");
	this.shape_207.setTransform(1099.5,769.4);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,30.8).s().p("AkrAsIAAhXIJXAAIAABXg");
	this.shape_208.setTransform(1056.2,775.6);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,30.1).s().p("AkrANIAAgZIJXAAIAAAZg");
	this.shape_209.setTransform(1056.2,785.6);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,30.4).s().p("AkrAfIAAg9IJXAAIAAA9g");
	this.shape_210.setTransform(1056.2,750.5);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,30.8).s().p("AkrAsIAAhXIJXAAIAABXg");
	this.shape_211.setTransform(1056.2,762.4);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.rf(["#FFFFFF","#000000"],[0,1],-0.1,0,0,-0.1,0,34).s().p("AALDVQgUgGgSgLQgagQgIgUQgFgJAAgLIAAkXQAAghAngXQAmgYA4AAIAAG3QgfAAgZgHg");
	this.shape_212.setTransform(1012.9,769.4);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,25.5).s().p("AilBCQgcAAgTgNQgUgNAAgSIAAhXIHRAAIAABXQAAASgTANQgTANgcAAg");
	this.shape_213.setTransform(1056.2,736.5);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.lf(["#FFFFFF","#000000"],[0,1],-30,0,30,0).s().p("AilEdIAAgrIhDAAIAAkGIBDAAIAAiwIiGAAIAAhYIGQAAIAABYIiFAAIAACwICFAAIAABXIBBAAIAAgsICGAAIAACvIiGAAIAAgrIhBAAIAABXIiFAAIAAArg");
	this.shape_214.setTransform(969.6,758.4);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.lf(["#FFFFFF","#000000"],[0,1],-12.5,0,12.5,0).s().p("AAkCXQgkgkAAg0Ih8AAIAAh9IB8AAQAAgzAkglQAmglAzAAIAAF3QgzAAgmglg");
	this.shape_215.setTransform(981,578.4,0.944,0.702);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,26.6).s().p("AkJANIAAgZIISAAIAAAZg");
	this.shape_216.setTransform(1097.2,595.3);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,22.6).s().p("AiTBCQgYAAgRgNQgSgNAAgSIAAhXIGdAAIAABXQAAASgSANQgRANgYAAg");
	this.shape_217.setTransform(1097.1,546.2);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,27.3).s().p("AkJAsIAAhXIISAAIAABXg");
	this.shape_218.setTransform(1097.2,585.2);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,26.9).s().p("AkJAfIAAg9IISAAIAAA9g");
	this.shape_219.setTransform(1097.2,560.2);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,27.3).s().p("AkJAsIAAhXIISAAIAABXg");
	this.shape_220.setTransform(1097.2,572);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,30.1).s().p("AAKDVQgSgGgQgLQgXgQgHgUQgEgJAAgLIAAkXQAAghAigXQAigYAxAAIAAG3QgbAAgWgHg");
	this.shape_221.setTransform(1058.8,579.1);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.lf(["#FFFFFF","#000000"],[0,1],-26.6,0,26.5,0).s().p("AiTEdIAAgrIg7AAIAAkGIA7AAIAAiwIh2AAIAAhYIFiAAIAABYIh1AAIAACwIB1AAIAABXIA6AAIAAgsIB3AAIAACvIh3AAIAAgrIg6AAIAABXIh1AAIAAArg");
	this.shape_222.setTransform(1020.4,568);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.rf(["#FFFFFF","#000000"],[0,1],0,0,0,0,0,30.4).s().p("Ag6jbQAxAAAiAYQAiAXAAAhIAAEXQAAALgEAJQgHAVgXAPQgQALgRAGQgXAHgbAAg");
	this.shape_223.setTransform(1135.5,579.1);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f().s("#66CCCC").ss(0.1,1,1).p("AALgoIAABRIgVAA");
	this.shape_224.setTransform(319.5,696.4);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.lf(["#666666","#CCCCCC","#666666"],[0.145,0.514,0.867],-15.3,-0.1,15,-0.1).s().p("AiXCLIAAkVIBFAAICbAAIBPAAIAAEVg");
	this.shape_225.setTransform(303.2,678.4);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.lf(["#666666","#CCCCCC","#666666"],[0.145,0.514,0.867],-16.2,14.8,15.9,14.8).s().p("AhCAaIgHAAIhXAAIAAgzIApAAIAeAAID6AAIAAAzg");
	this.shape_226.setTransform(302.3,653.3);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.lf(["#666666","#CCCCCC","#666666"],[0.145,0.514,0.867],-7.8,21.3,7.7,21.3).s().p("AhNArIAAhVIAHAAIAfACIAmAAIAKAAIAEAAIA6AAIAHAAIAABTg");
	this.shape_227.setTransform(302.7,660.2);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#CCCCCC").s().p("ACdCMIj7AAIgdAAIgqAAIhcAAIAAkXIICAAIAAEXgAilBaIBDAAIAOAAICuAAIAAizIj/AAg");
	this.shape_228.setTransform(302.7,636.8);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#666666").s().p("AgdAeIgGgHQgHgKAAgNQAAgMAHgKIAGgHQAMgNARAAQASAAAMANQANAMAAARQAAASgNAMQgMANgSAAQgRAAgMgNg");
	this.shape_229.setTransform(303.5,637.3);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#999999").s().p("AguBaIgOAAIhDAAIAAizID/AAIAACzgAAPgYIgFAIQgHAJAAAMQAAANAHAKIAFAHQANANASAAQARAAAMgNQANgMAAgSQAAgQgNgNQgMgNgRAAQgSAAgNANg");
	this.shape_230.setTransform(298.9,636.8);

	this.instance_17 = new lib.阀门("synched",0);
	this.instance_17.parent = this;
	this.instance_17.setTransform(215,663.3,1.162,1.162,0,0,0,36.1,32.1);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#00CCCC").s().p("ApwHdIAAu4IThAAIAAO4g");
	this.shape_231.setTransform(1455.7,653.6);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#66CCFF").s().p("EgSkAhIMAAAhCPIHnAAMAAAA7ZIXmAAMAAAg7ZIF1AAIAAAXIAHAAIAAddIgHAAMAAAAkbg");
	this.shape_232.setTransform(1451.2,548.4);

	this.instance_18 = new lib.管子2("synched",0);
	this.instance_18.parent = this;
	this.instance_18.setTransform(1272.6,586.5,0.16,1.685,0,0,0,527.5,9.1);

	this.instance_19 = new lib.管子2("synched",0);
	this.instance_19.parent = this;
	this.instance_19.setTransform(1088.3,691.3,0.185,1.605,0,0,0,527.1,9.2);

	this.instance_20 = new lib.管子2("synched",0);
	this.instance_20.parent = this;
	this.instance_20.setTransform(1001.1,735.9,0.087,1.186,90,0,0,527,8.8);

	this.instance_21 = new lib.管子2("synched",0);
	this.instance_21.parent = this;
	this.instance_21.setTransform(1179.7,596.5,0.206,0.958,90,0,0,527,8.9);

	this.instance_22 = new lib.管子2("synched",0);
	this.instance_22.parent = this;
	this.instance_22.setTransform(1082.2,498.7,0.202,1.605,0,0,0,527.4,9.2);

	this.instance_23 = new lib.管子2("synched",0);
	this.instance_23.parent = this;
	this.instance_23.setTransform(870.9,768.9,0.104,1.387,0,0,0,527.4,9.6);

	this.instance_24 = new lib.管子2("synched",0);
	this.instance_24.parent = this;
	this.instance_24.setTransform(987.4,543.9,0.087,1.289,90,0,0,527,8.8);

	this.instance_25 = new lib.管子2("synched",0);
	this.instance_25.parent = this;
	this.instance_25.setTransform(815.8,672.9,0.206,1.677,90,0,0,527,8.8);

	this.instance_26 = new lib.管子2("synched",0);
	this.instance_26.parent = this;
	this.instance_26.setTransform(898,576.3,0.167,1.139,0,0,0,527.4,9.3);

	this.instance_27 = new lib.管子2("synched",0);
	this.instance_27.parent = this;
	this.instance_27.setTransform(736.3,667.5,0.16,1.685,0,0,0,527.1,9.1);

	this.instance_28 = new lib.管子2("synched",0);
	this.instance_28.parent = this;
	this.instance_28.setTransform(230.3,678,0.298,1.39,0,0,0,527.4,9.1);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f().s("#000000").ss(0.1,1,1).p("EANsgigIAAAIEgNrgiYIAAgIEANsAihI7XAA");
	this.shape_233.setTransform(520.3,618.3);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#00CCCC").s().p("ArUIpIAAxQIIuAAIAABYIgBAAIAAFNQgDAMAAANQAABAAxArQAwAtBFAAQBEAAAwgtQAxgrAAhAIAAgJIAAldIABAAIAAhYIIzAAIAARQg");
	this.shape_234.setTransform(519.2,766.1);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#CCCCCC").s().p("EAh4AHyQAGgGABgHIAAANgAc2HyIAAgHQACAEADADgA88nkQAFgGACgIIAAAOgEgh+gHkIAAgHQABAEAEADg");
	this.shape_235.setTransform(317.7,641.1);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#66CCFF").s().p("EgViAmbMAAAhM1II1AAMAAABE5IbXAAMAAAhE5IGxAAIAAAbIAIAAMAAAAiKIgIAAMAAAAqQg");
	this.shape_236.setTransform(514.1,644.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.shape_232},{t:this.shape_231},{t:this.instance_17},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.instance_16},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.instance_15},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.instance_14},{t:this.instance_13},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.instance},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1016,628,1915.5,934.5);
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