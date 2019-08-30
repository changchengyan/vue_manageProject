<template>
  <div id="gis_jxj">
    <h1> 检修井</h1>
  </div>
</template>

<script>
  import {getWellMapList} from '../../../../api/interfaces/www_form';

  export default {
    name: 'gis_jxj',
    data(){
      return{

      };
    },
    methods:{
      getWellMapList_(){
        let that = this;
        getWellMapList(that).then(res=>{
          console.log(res);
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  #gis_jxj{
    width: 400px;
    height: 400px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }
</style>
