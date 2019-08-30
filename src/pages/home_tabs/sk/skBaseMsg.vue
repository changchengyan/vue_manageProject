<template>
    <div id="BaseMsg_">
      <div class="table-content">
        <table class="innerTable">
          <tbody>
          <tr>
            <td><span>总库容（万m³）</span></td>
            <td><span>{{baseInfo.zongKR}}</span></td>
          </tr>
          <tr>
            <td><span>调节库容（万m³）</span></td>
            <td><span>{{baseInfo.tiaoJieKR}}</span></td>
          </tr>
          <tr>
            <td><span>死库容（万m³）</span></td>
            <td><span>{{baseInfo.siKR}}</span></td>
          </tr>
          <tr>
            <td><span>正常蓄水水位（m）</span></td>
            <td><span>{{baseInfo.zcsw}}</span></td>
          </tr>
          <tr>
            <td><span>死水位（m）</span></td>
            <td><span>{{baseInfo.ssw}}</span></td>
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
           <!-- <img :src="staticPathUrl+val.url" alt="" v-for="(val,index) in imgs" :key="index"> -->
           <img :src="val.url" alt="" v-for="(val,index) in imgs" :key="index">
         </template>
        </div>
      </div>
    </div>
</template>

<script>


    export default {
        name: 'skBaseMsg',
      props:['factoryId','popupGraphic'],
      data(){
          return{
            baseInfo:{
              zongKR: 2300,
              tiaoJieKR: 2000,
              siKR: 1500,
              zcsw: 1500,
              ssw: 1500
            },
            imgs:[
              {
                url: '../../../static/images/data/shuiku1.jpg'
              },
              {
                url: '../../../static/images/data/shuiku2.jpg'
              },
              {
                url: '../../../static/images/data/shuiku3.jpg'
              }
            ],
            staticPathUrl:''
          };
      },
      methods:{
        getWaterworksBase_(){

        }
      },
      created() {
          this.staticPathUrl = this.$store.getters.get_filePath;
          console.log('this.popupGraphic',this.popupGraphic);
          // this.getWaterworksBase_();
      },
      mounted(){
        console.log('mounted popupGraphic',this.popupGraphic);
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
      // height: calc(100% - 40px);
      overflow-y: auto;
      display: flex;
      flex-flow: wrap;
      justify-content: flex-start;
      align-items: center;
      img{
        // height: 100px;
        width: calc(100% / 3.2);
        margin-right: 10px;
      }

    }
  }
}
</style>
