<template>
  <div id="gis_fm">
    <h1> 阀门</h1>
  </div>
</template>

<script>
    import {getPipeValveMapList} from '../../../../api/interfaces/www_form';

    export default {
        name: 'gis_fm',
      data(){
        return{

        };
      },
      methods:{
        getPipeValveMapList_(){
          let that = this;
          getPipeValveMapList(that).then(res=>{
            console.log(res);
          });
        }
      }
    };
</script>

<style scoped lang="scss">
  #gis_fm{
    width: 400px;
    height: 400px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }
</style>
