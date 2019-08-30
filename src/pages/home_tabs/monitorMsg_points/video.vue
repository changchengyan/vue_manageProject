<template>
    <div id="video">
<!--      <div class="distribution_technology">-->
<!--        <img src="../../../assets/images/common/noData.png" alt="">-->
<!--        <span>暂时没有配置组态图！</span>-->
<!--      </div>-->
        <img :src="staticPath+'/images/data/pump.jpg'" alt="">
    </div>
</template>

<script>

    export default {
        name: 'videoPoint',
      components: {},
      data(){
          return{
              staticPath:''
          };
      },
    created() {
        this.staticPath = window.DSE.static_baseUrl;
    }
    };
</script>

<style scoped lang="scss">
#video{
  width: 100%;
  height: 100%;
  .distribution_technology{
    width:100%;
    height:100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span{
      display:inline-block;
      padding-top: 20px;
      font-size: 16px;
      font-weight: 600;
    }
  }
    img{
        width: 100%;
    }
}
</style>
