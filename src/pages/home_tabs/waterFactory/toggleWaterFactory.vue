<template>
    <div id="toggleWaterFactory">
        <template v-if="activeComponentIndex==0">
            <zhutai :factoryId="factoryId"/>
        </template>
        <template v-else-if="activeComponentIndex==1">
            <factory-monitor ref="factory_monitor" :factoryName="factoryName" :factoryId="factoryId"/>
        </template>
        <template v-else-if="activeComponentIndex==2">
            <!--        <dse-live-video :videoList_="videoList"/>-->
            <img :src="staticPath+'/images/data/fc.jpg'" alt="">
        </template>
        <template v-else-if="activeComponentIndex==3">
            <factory-base-msg :factoryId="factoryId"/>
        </template>
        <template v-else>
            <factory-view-record :factoryName="factoryName"/>
        </template>
    </div>
</template>

<script>
    import Zhutai from './zhutai';
    import FactoryMonitor from './factoryMonitor';
    import FactoryBaseMsg from './factoryBaseMsg';
    import FactoryViewRecord from './factoryViewRecord';
    // import DseLiveVideo from '../../../common/components/dseLiveVideo';  // DseLiveVideo


    export default {
        name: 'toggleWaterFactory',
        components: {FactoryViewRecord, FactoryBaseMsg, FactoryMonitor, Zhutai},
        props: ['factoryId','factoryName'],
        data() {
            return {
                activeComponentIndex: 0,
                videoList: [],
                staticPath: ''
            };
        },
        methods: {
            activeThis(index) {
                this.activeComponentIndex = index;
            },
            resize() {
                let that = this;
                this.$nextTick(() => {
                    if (that.activeComponentIndex == 1) {
                        that.$refs.factory_monitor.resize();
                    }
                });
            }
        },
        created() {
            this.staticPath = window.DSE.static_baseUrl;

            console.log(this.factoryName);
        },
        beforeDestroy() {
            this.activeComponentIndex = 0;
        }
    };
</script>

<style scoped lang="scss">
    #toggleWaterFactory {
        width: 100%;
        height: 100%;

        img {
            width: 100%;
        }
    }
</style>
