<template>
  <div id="gis_xfs">
    <h1> 消防栓</h1>
  </div>
</template>

<script>
  import {getHydrantMapList} from '../../../../api/interfaces/www_form';

  export default {
    name: 'gis_xfs',
    data(){
      return{

      };
    },
    methods:{
      getHydrantMapList_(){
        let that = this;
        getHydrantMapList(that).then(res=>{
          console.log(res);
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  #gis_xfs{
    width: 400px;
    height: 400px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }
</style>

