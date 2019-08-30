<template>
    <div id="gisModel" class="gisModel" :style="{top:top_?top_:'0px',left:left_?left_:'0px',width:width_?width_:'300px'}" v-show="modelShowFlag">
     <div class="top-head">
       <span>{{tips}}</span>
       <i class="el-icon-close" @click="closeModel"></i>
     </div>
      <div class="main-content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'dse-gisModel',
        // props:['showFlag','width_','top_','left_','tips'],
        props:{
            showFlag:{
                type:Boolean,
                defaultProps:false
            },
            tips:{
                type:String,
                defaultProps:''
            },
            width_:{
                type:String,
                defaultProps:'300px'
            },
            left_:{
                type:String,
                defaultProps:'0px'
            },
            top_:{
                type:String,
                defaultProps:'0px'
            }
        },

      data(){
          return{
              modelShowFlag:false
          };
      },
      methods:{
        closeModel(){
          this.modelShowFlag = false;
          this.$emit('closeModel','');
        }
      },
      watch:{
        showFlag(val) {
          this.modelShowFlag = val;
        }
      },
      created() {
          this.modelShowFlag = this.showFlag;
      }
    };
</script>

<style scoped lang="scss">
#gisModel{
  background: #fff;
  position: absolute;
  z-index: 11;
  .top-head{
    width: 100%;
    height: 30px;
    background: #0b83fe;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    color: #fff;
    i{
      cursor: pointer;
    }
  }
  .main-content{
    width: 100%;
    height: calc(100% - 30px);
    padding: 5px;
  }
}
</style>
