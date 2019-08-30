<template>
    <div id="gisTools">
        <slot></slot>
        <div class="default-tool">
            <div class="base-layer">
              <img src="../../assets/images/common/baseMapChange.png" alt="">
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleLayers">
                <el-submenu index="1">
                  <template slot="title">底图切换</template>
                  <el-menu-item :index="1-index" v-for="(item,index) in baseLayerList" :key="index">{{item.label}}</el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
            <div class="draw">
              <img src="../../assets/images/common/gistools.png" alt="">
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleDraw">
                <el-submenu index="1">
                  <template slot="title">绘图工具</template>
                  <el-menu-item :index="1-index" v-for="(item,index) in drawList" :key="index">{{item.label}}</el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'dse-gisTools',
        data(){
            return{
               baseLayerList:[
                   {
                       value: '1',
                       label: '卫星图'
                   },
                   {
                       value: '2',
                       label: '平面图'
                   },
                   {
                       value: '3',
                       label: '地形图'
                   }
               ],
               layerItem:'底图',
               drawList:[
                   {
                       value: '1',
                       label: '描点'
                   },
                   {
                       value: '2',
                       label: '画线'
                   },
                   {
                       value: '3',
                       label: '画面'
                   },
                   {
                       value: '4',
                       label: '清除全部'
                   }
               ],
               drawItem:'绘图',
              activeIndex:0
            };
        },
        methods:{
            handleLayers(label){
               this.layerItem = label;
            },
            handleDraw(label){
                if(label==='清除全部'){
                    this.drawItem = '绘图';
                    return ;
                }
                this.drawItem = label;
            }
        },
        created() {

        }
    };
</script>

<style scoped lang="scss">
  #gisTools{
      height: 30px;
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items:center;
      box-shadow: 0 0 5px rgba(0,0,0,0.15);
      padding: 0 5px;
    img{
      width: 14px;
      height: 14px;
    }

      .default-tool{
          display: flex;
          width: 180px;
          justify-content: space-between;
          &>div{
              width: 85px;
           }
          i:first-child{
              display: inline-block;
              margin-right: 3px;
          }
      }
  }
</style>
