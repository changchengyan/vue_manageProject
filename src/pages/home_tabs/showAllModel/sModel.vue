<template>
  <div  class="gisInfoWindow"  >
    <slot></slot>
  </div>
</template>

<script>

  export default {
    name: 'allwayshowModel',
    props:['modelVal'],
    data(){
      return{

      };
    },
    methods:{
    },
    created() {
      console.log(this.modelVal);
    }
  };
</script>

<style scoped lang="scss">
  .gisInfoWindow{
    background: #fff;
    position: absolute;
    z-index: 1;
    width: 135px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    &::after{
      content: '';
      display: block;
      position: absolute;
      bottom: -11px;
      left: 60px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 11px solid #fff;
    }
    .top-head{
      width: 100%;
      height: 30px;
      background: #0b83fe;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      color: #fff;
      span{
        display: inline-block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .main-content{
      width: 100%;
      height: calc(100% - 30px);
      padding: 5px;
    }
  }
</style>
