<template>
    <div id="poolToggle">

        <template v-if="tabIndex==0">
            <div class="col">
                <iframe :src="staticPath+'/companys/pool/pool.html'" frameborder="0"></iframe>
            </div>
            <div class="col">
                <div class="top-head">
                    <span>控制对象</span>
                    <span>对象状态</span>
                    <span>控制命令</span>
                </div>
                <div class="row" v-for="(val,index) in ctrList" :key="index">
                    <div class="item">
                        <span>{{val.name}}</span>
                    </div>
                    <div class="item">
                        <span class="cycle" :class="{stopCycle:val.status==false}"></span>
                    </div>
                    <div class="item">
                        <span class="start" @click="showThis(index,val.status)" :class="{startStop:val.status==false}">开</span>
                        <span class="stop"  @click="showThis(index,!val.status)"  :class="{stopStart:val.status==false}">关</span>
                    </div>
                </div>
                <div class="title-tips"><span class="rect"></span><span>实时信息</span></div>
                <div class="row-item"><span>水位:</span><span>2.342m</span></div>
                <div class="row-item"><span>电量:</span><span>50%,35Am/h</span></div>
                <div class="row-item"><span>通讯状态:</span><span>在线</span></div>
                <div class="row-item"><span>信号强度:</span><span>30,优</span></div>
                <div class="row-item alert"><span>预警:</span><span>水位低于下限</span></div>
                <div class="title-tips alert"><span class="rect"></span><span>RTU远程操作</span></div>
                <div class="actions">
                    <span >升级</span>
                    <span>重启</span>
                </div>
            </div>
        </template>
        <template v-if="tabIndex==1">
            <pool-monitor />
        </template>
        <template v-if="tabIndex==2">
            <pool-video />
        </template>
        <template  v-if="tabIndex==3">
            <pool-base />
        </template>
        <template v-if="tabIndex==4" >
            <pool-view-record  :poolName="poolName"/>
        </template>
    </div>
</template>

<script>
    import PoolMonitor from './monitor';
    import PoolVideo from './video';
    import PoolBase from './base';
    import PoolViewRecord from './viewRecord';
    export default {
        name: 'poolToggle',
        components: {PoolViewRecord, PoolBase, PoolVideo, PoolMonitor},
        props:['poolId','poolName'],
        data(){
            return{
                tabIndex:0,
                staticPath:'',
                ctrList:[
                    {
                        name:'阀门63015_F_3',
                        status:true
                    },
                    {
                        name:'阀门63015_F_4',
                        status:true
                    }
                ]
            };
        },
        methods:{
            activeThis(index){
                this.tabIndex = index;
            },
            resize(){
                let that = this;
                this.$nextTick(()=>{
                    if(that.tabIndex==1){
                        that.$refs.pump_monitor.resize();
                    }
                });
            },
            showThis(index,flag){
                if(flag==true){
                    return ;
                }
                this.ctrList[index].status = !this.ctrList[index].status;
            }
        },
        created(){
          this.staticPath = window.DSE.static_baseUrl;
        },
        beforeDestroy() {
            this.tabIndex = 0;
        }
    };
</script>

<style scoped lang="scss">
    #poolToggle{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        img{
            width: 100%;
        }

        .col{
            &:first-child{
                width:calc(100% - 300px);
                iframe{
                    width: 100%;
                    height: 100%;
                }
            }
            &:last-child{
                width: 300px;
                padding: 10px;
                .top-head {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 30px;
                    line-height: 30px;
                    span{
                        display: inline-block;
                        width: 33.33%;
                    }
                }
                .row{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-left: 1px solid #e9e9e9;
                    border-right: 1px solid #e9e9e9;
                    &:last-child{
                        border-bottom: 1px solid #e9e9e9;
                    }
                    .item{
                        width: 33.33%;
                        text-align: center;
                        padding: 5px 0;
                        &:last-child{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        span{
                            display: inline-block;
                            line-height: 20px;
                            &.cycle{
                                width: 15px;
                                height: 15px;
                                border-radius: 50%;
                                background: green;
                                &.stopCycle{
                                    background: red;
                                }
                            }
                            &.start{
                                height: 25px;
                                width: 30px;
                                line-height: 25px;
                                background: #0b83fe;
                                color: #fff;
                                border: 1px solid #0b83fe;
                                border-top-left-radius: 3px;
                                border-bottom-left-radius: 3px;
                                cursor: pointer;
                                border-right: none;
                                &.startStop{
                                    background: #fff;
                                    color: #0b83fe;
                                }
                            }
                            &.stop{
                                height: 25px;
                                width: 30px;
                                line-height: 25px;
                                background: #fff;
                                color: #0b83fe;
                                border: 1px solid #0b83fe;
                                border-top-right-radius: 3px;
                                border-bottom-right-radius: 3px;
                                cursor: pointer;
                                border-left: none;
                                &.stopStart{
                                    background: #0b83fe;
                                    color: #fff;
                                }
                            }
                        }

                    }
                }
            }
            .title-tips{
                width: 100%;
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid #e9e9e9;
                text-align: left;
                padding-left: 10px;
                span{
                    display: inline-block;
                    margin-right: 10px;
                }

            }
            .row-item{
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 30px;
                padding-left: 20px;
                &.alert{
                    color: red;
                }
                span:first-child{
                    letter-spacing: 4px;
                    font-weight: 600;
                }
            }
            .actions{
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50px;
                padding: 10px 0;
                span{
                    display: inline-block;
                    padding: 5px 10px ;
                    background: #0b83fe;
                    color: #fff;
                    cursor: pointer;
                    margin-right: 10px;
                }
            }
        }
    }
</style>
