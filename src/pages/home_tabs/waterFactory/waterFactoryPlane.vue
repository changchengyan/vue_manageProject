<template>
    <div id="waterFactoryPlane">
        <div class="card">
            <span>放置平面图</span>
        </div>
        <div class="card">
            <div class="tip-head">
                <span>监测设备信息</span>
            </div>
            <div class="main-contnet">
                <template  v-if="monitorNumList.length>0">
                    <div class="row" v-for="(val,index) in monitorNumList" :key="index">
                        <div class="col"><span>{{val.jcdNum}}</span><span>摄像头</span></div>
                        <div class="col"><span>{{val.noWarnNum}}</span><span>正常摄像头数量</span></div>
                        <div class="col"><span>{{val.warnNum}}</span><span>摄像摄像头预警</span></div>
                    </div>
                </template>
                <template v-else>
                    <div class="row">
                        <div class="col"><span>暂无配置监测对象!</span></div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import {getScyxxx} from '../../../api/interfaces/oneMap_api';

    export default {
        name: 'waterFactoryPlane',
        props:{
            factoryId:{
                type:String,
                defaultProps:''
            }
        },
        data(){
            return{
                monitorNumList:[]
            };
        },
        methods:{
            // 获取 实时监测的 状态项
            getScyxxx_(){
                let that = this;
                getScyxxx({
                    wfctCd:that.factoryId
                },that).then(res=>{
                    let {data} = res;
                    let {jcDeviceList=[]} = data;
                    jcDeviceList = jcDeviceList&&jcDeviceList.length>0?jcDeviceList:[];
                    that.monitorNumList = [...jcDeviceList];
                });
            }
        },
        created() {
            this.staticPathUrl = this.$store.getters.get_filePath;
            this.getScyxxx_();
        }
    }
</script>

<style scoped lang="scss">
#waterFactoryPlane{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .card{

        &:first-child{
            width: calc(100% - 410px);
        }
        &:last-child{
            width: 400px;
        }
        box-shadow: 0 0 10px rgba(0,0,0,0.12);

        .tip-head{
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: left;
            font-size: 16px;
            font-weight: 600;
        }
        .main-contnet{
            width: 100%;
            .row{
                width: 100%;
                display: flex;
                padding: 0  10px ;
                justify-content: space-around;
                margin-bottom: 10px;
                &:last-child{
                    margin-bottom: 0;
                }
                .col{
                    width: calc(33.33% - 10px);
                    padding: 10px 0 ;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background: #dfecf9;
                    span{
                        display: inline-block;
                        line-height: 25px;
                    }
                }
            }
        }

    }
}
</style>
