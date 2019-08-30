<template>
    <div id="videoMonitor">
<!--      <dse-live-video :videoList_="videoList"/>-->
        <img :src="staticPath+'/images/data/pump.jpg'" alt="">
    </div>
</template>

<script>
    // DseLiveVideo
    // import DseLiveVideo from '../../../common/components/dseLiveVideo';
    export default {
        name: 'videoMonitor',
        components: {},
        data(){
            return{
                videoList:[],
                staticPath:''
            };
        },
        created() {
            this.staticPath = window.DSE.static_baseUrl;
        }
    };
</script>

<style scoped lang="scss">
    #videoMonitor{
        width: 100%;
        height: 100%;
        img{
            width: 100%;
        }
    }
</style>
