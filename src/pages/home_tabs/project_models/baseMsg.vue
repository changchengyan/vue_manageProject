<template>
  <div id="baseMsg">
    <div class="table-view">
      <table class="innerTable">
        <thead>
        <tr>
          <th><span>关键项</span></th>
          <th><span>参数值</span></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><span>设计规模(万方/天)</span></td>
          <td><span>{{baseInfo.scale}}</span></td>
        </tr>
        <tr>
          <td><span>扬程(m)</span></td>
          <td><span>{{baseInfo.height}}</span></td>
        </tr>
        <tr>
          <td><span>装机容量(KW)</span></td>
          <td><span>{{baseInfo.capacity}}</span></td>
        </tr>
        <tr>
          <td><span>运行方式</span></td>
          <td><span>{{baseInfo.oModel}}</span></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="img-cards">
      <div class="top-title">
        <span class="rect"></span>
        <span>图片</span>
      </div>
      <div class="imgs">
        <template v-for="(val,index) in imgUrls">
          <img :src="staticPathUrl+'/'+val.url" alt="" :key="index">
        </template>

      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'baseMsg',
    props: ['pumpId'],
    data() {
      return {
          baseInfo:{
            scale:'12000',
            height:'12',
            capacity:'120',
            oModel:'三备一用'
          },
          imgUrls:[],
         staticPathUrl:''
      };
    },
    methods:{
      getPumpAttrInfo_(){


      }
    },
    created() {
      this.getPumpAttrInfo_();
      this.staticPathUrl = this.$store.getters.staticPathUrl;
    }
  };
</script>

<style scoped lang="scss">
  #baseMsg {
    width: 100%;
    height: 100%;

    .table-view {
      width: 100%;
      padding: 0 10px;
      height: 180px;
      overflow: auto;
    }

    .img-cards {
      width: 100%;
      height: calc(100% - 180px);

      .top-title {
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #ccc;
        font-size: 16px;
        font-weight: 600;
        text-align: left;
      }

      .imgs {
        width: 100%;
        height: calc(100% - 30px);
        display: flex;
        justify-content: flex-start;
        flex-flow: wrap;
        align-items: center;
        img{
          height: 100px;
          margin-right: 10px;
        }
      }
    }
  }
</style>
