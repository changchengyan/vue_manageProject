<template>
    <div id="xscVideo">
<!--        <dse-live-video :videoList_="videoList"/>-->
        <img :src="staticPath+'/images/data/xsc.jpg'" alt="">
    </div>
</template>

<script>
    // DseLiveVideo
    // import DseLiveVideo from '../../../common/components/dseLiveVideo';
    export default {
        name: 'pool-video',
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
#xscVideo{
    width: 100%;
    height: 100%;
    img{
        width: 100%;
    }
}
</style>
