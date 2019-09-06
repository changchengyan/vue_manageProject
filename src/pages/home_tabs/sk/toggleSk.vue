<template>
    <div id="toggleSk">
      <template v-if="activedIndex==0">
          <sk-msg :skId="skId" ref="sk_monitor"/>
      </template>
      <template v-else-if="activedIndex==1">
        <dse-live-video :videoList_="videoList"/>
      </template>
      <template v-else-if="activedIndex==2">
        <sk-base-msg :graphic="popupGraphic"/>
      </template>
      <template v-else-if="activedIndex==3">
        <sk--view-record />
      </template>

    </div>
</template>

<script>
    import SkMsg from './skMsg';
    import SkBaseMsg from './skBaseMsg';
    import DseLiveVideo from '../../../common/components/DseLiveVideo';
    import SkViewRecord from './skViewRecord';
    export default {
        name: 'toggleSk',
      components: {SkViewRecord, DseLiveVideo, SkMsg, SkBaseMsg},
      props:['skId','popupGraphic'],
      data(){
          return{
            activedIndex:0,
            videoList:[]
          };
      },
      methods:{
          activeThis(index){
            this.activedIndex = index;
          },
        resize(){
          let that = this;
          this.$nextTick(()=>{
            if(that.activedIndex==0){
              that.$refs.sk_monitor.resize();
            }
          });
        }
      }
    };
</script>

<style scoped lang="scss">
#toggleSk{
  width: 100%;
  height: 100%;
}
</style>
