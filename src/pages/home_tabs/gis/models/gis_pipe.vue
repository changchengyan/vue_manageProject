<template>
    <div id="gis_pipe">
      <h1> 管网</h1>
    </div>
</template>

<script>

    import {getPipeMapList} from '../../../../api/interfaces/www_form';

    export default {
        name: 'gis_pipe',
      data(){
          return{

          };
      },
      methods:{
        getPipeMapList_(){
          let that  = this;
          getPipeMapList(that).then(res=>{
              console.log(res);
          });
        }
      }
    };
</script>

<style scoped lang="scss">
#gis_pipe{
  width: 400px;
  height: 400px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
</style>
