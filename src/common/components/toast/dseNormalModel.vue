<template>
    <div id="normalModel" v-if="modelShowFlag">
      <div class="model" :style="{top:top_?top_:'100px'}">
        <div class="top-head">
            <span>{{tips}}</span>
            <i class="el-icon-close" @click="closeModel"></i>
        </div>
        <div class="main-content">
          <slot></slot>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'dse-normalModel',
      // props:['tips','modelFlag', 'onHandleModelClose','top_'],
        props:{
            modelFlag:{
                type:Boolean,
                defaultProps:false
            },
            tips:{
                type:String,
                defaultProps:''
            },
            onHandleModelClose:{
                type:Function,
            },
            top_:{
                type:String,
                defaultProps:'100px'
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
          if(this.onHandleModelClose){
            this.onHandleModelClose();
          }
        },
        showModel(){
          this.modelShowFlag = true;
        }
      },
      watch:{
        modelFlag(val) {
					console.warn(val, 'val');
          this.modelShowFlag = val;
        }
      },
      created() {
        this.modelShowFlag = this.modelFlag;
      }
    };
</script>

<style scoped lang="scss">
  #normalModel{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(0,0,0,0.15);
    .model{
      position: absolute;
      background: #fff;
      width: 500px;
      height: 280px;
      left: 50%;
      margin-left: -250px;
      .top-head{
        width: 100%;
        height: 40px;
        position: relative;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        background: #0b83fe;
        color: #fff;
        padding: 0 10px;
        i{
          cursor: pointer;
          font-size: 14px;

        }
      }
      .main-content{
        width: 100%;
        height: calc(100% - 40px);
        overflow: auto;
      }
    }
  }

</style>
