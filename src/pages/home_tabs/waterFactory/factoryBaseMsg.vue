<template>
    <div id="BaseMsg_">
      <div class="table-content">
        <table class="innerTable">
          <tbody>
          <tr>
            <td><span>装机容量（KW）</span></td>
            <td><span>{{baseInfo.capacity}}</span></td>
          </tr>
          <tr>
            <td><span>供水负荷率</span></td>
            <td><span>{{baseInfo.rate}}</span></td>
          </tr>
          <tr>
            <td><span>日供水量</span></td>
            <td><span>{{baseInfo.dayProvide}}</span></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="imgs">
        <div class="img-head">
          <span class="rect"></span>
          <span>图片</span>
        </div>
        <div class="img-list">
         <template v-if="imgs&&imgs.length>0">
           <img :src="staticPathUrl+val.url" alt="" v-for="(val,index) in imgs" :key="index">
         </template>
        </div>
      </div>
    </div>
</template>

<script>


    export default {
        name: 'factoryBaseMsg',
      props:['factoryId'],
      data(){
          return{
            baseInfo:{
              capacity:'200',
              rate:'89',
              dayProvide:'3000'
            },
            imgs:[],
            staticPathUrl:''
          };
      },
      methods:{
        getWaterworksBase_(){

        }
      },
      created() {
          this.staticPathUrl = this.$store.getters.get_filePath;
          this.getWaterworksBase_();
      }
    };
</script>

<style scoped lang="scss">
#BaseMsg_{
  width: 100%;
  height: 100%;
  table{
    border-top:1px solid #e9e9e9;
  }
  .imgs{
    width: 100%;
    height: calc(100% - 106px);
    overflow-y: auto;
    .img-head{
      width: 100%;
      height: 30px;
      margin-bottom: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span{
        display: inline-block;
        margin-right: 10px;
      }
    }
    .img-list{
      width: 100%;
      height: calc(100% - 40px);
      overflow-y: auto;
      display: flex;
      flex-flow: wrap;
      justify-content: flex-start;
      align-items: center;
      img{
        height: 100px;
        margin-right: 10px;
      }

    }
  }
}
</style>
