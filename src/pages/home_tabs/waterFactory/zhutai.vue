<template>
  <div id="zhutai">
      <iframe :src="staticPath+'/companys/liupanshan/ershuichang/main/index.html'" frameborder="0"></iframe>
  </div>
</template>

<script>
    export default {
        name: 'zhutai',
      data(){
        return{
          staticPath:''
        };
      },
      mounted() {
        this.staticPath = window.DSE.static_baseUrl;
      }
    };
</script>

<style scoped lang="scss">
  #zhutai{
    width: 100%;
    height: 100%;
    iframe{
      border-spacing: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
