<template>
    <div id="funcTools">
      <div class="base-select">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="changeBaseLayer">
          <el-submenu index="1">
            <template slot="title">
              <img src="../../assets/images/common/baseMapChange.png" alt="">
              底图切换
            </template>
            <el-menu-item index="1-1" >地形图</el-menu-item>
            <el-menu-item index="1-2" >影像图</el-menu-item>
            <el-menu-item index="1-3" >矢量图</el-menu-item>
          </el-submenu>
        </el-menu>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="DrawTools">
          <el-submenu index="2">
            <template slot="title">
              <img src="../../assets/images/common/gistools.png" alt="">
              绘图工具
            </template>
            <el-menu-item index="2-1"  title="单击绘制，双击结束">标点</el-menu-item>
            <el-menu-item index="2-2"  title="单击绘制，双击结束">标线</el-menu-item>
            <el-menu-item index="2-3"  title="单击绘制，双击结束">标面</el-menu-item>
            <el-menu-item index="2-4"  >清除所有</el-menu-item>
          </el-submenu>
        </el-menu>
        <div class="fullScreen" @click="fullScreenAction">
          <template v-if="fullScreenFlag">
            <img src="../../assets/images/common/fullScreen.png" alt="">
            <span>全屏</span>
          </template>
          <template v-else>
            <img src="../../assets/images/common/normalScreen.png" alt="" @keyup="getNormalScreen">
            <span>退出</span>
          </template>

        </div>
      </div>
      <div class="async-items">
        <slot></slot>
      </div>
    </div>
</template>

<script>

  /**
   *  gis 工具箱  对外 提供 底图切换的 简单功能、绘制点线面的基本功能
   */
  export default {
        name: 'dse-funcTools',
        data(){
            return{
              fullCountNum:0,
              layers:[
                {
                  value: '1',
                  label: '地形图'
                },
                {
                  value: '2',
                  label: '影像图'
                },
                {
                  value: '3',
                  label: '矢量图'
                }
              ],
              layerItem:'2',
              drawTools:[
                {
                  value: '1',
                  label: '标点'
                },
                {
                  value: '2',
                  label: '标线'
                },
                {
                  value: '3',
                  label: '标面'
                },
                {
                  value: '4',
                  label: '清除所有'
                }
              ],
              drawItem:'',
              activeIndex:'0',
              fullScreenFlag:true
            };
        },
      methods:{
        changeBaseLayer(key, keyPat){
          let temp_index = (keyPat[1].split('-'))[1];
          this.$emit('changeBasemap',temp_index);
        },
        DrawTools(key, keyPat){
          let temp_index = (keyPat[1].split('-'))[1];
          this.$emit('drawTools',temp_index);
        },
        fullScreenAction(){
          let that  = this;
          this.$emit('fullScreen',that.fullScreenFlag);
          this.fullScreenFlag =!this.fullScreenFlag;
        },
        getNormalScreen(){

        }
      },
    mounted() {

    }
  };
</script>

<style scoped lang="scss">
#funcTools{
    height: 30px;
    display: flex;
    justify-content: flex-start;
    background: #fff;
    /*border: 1px solid #ccc;*/
    border-right: none;
  img{
    width: 14px;
    height: 14px;
    margin-right: 3px;
  }
    .base-select{
      width: 300px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .el-select:first-child{
        margin-right: 10px;
      }
      .el-menu{
        width: calc(50% - 30px);
      }
      .fullScreen{
        width: 60px;
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #e9e9e9;
        cursor: pointer;
        color: #909399;
        &:hover{
          color: blue;
        }
      }

    }
  .async-items{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
