<template>
    <div id="TipTabs">
        <div class="tabs">
            <div class="tab-item" @click="selecThis(index)" :class="{actived:index==tabIndex}" v-for="(val,index) in tabs" :key="index">
                <span>{{val}}</span>
            </div>
        </div>
        <div class="inner-content">
            <template v-if="tabIndex==0">
                <div class="sm-title"><span>已建工程/设备运行状态</span></div>
                <table class="innerTable">
                    <thead>
                    <tr >
                        <th rowspan="2"><span>工程/设备</span></th>
                        <th colspan="2"><span>颍东县</span></th>
<!--                        <th colspan="2"><span>海原县</span></th>-->
                    </tr>
                    <tr >
                        <th ><span>总数</span></th>
                        <th ><span>预警数</span></th>
<!--                        <th ><span>总数</span></th>-->
<!--                        <th ><span>预警数</span></th>-->
                    </tr>
                    </thead>
                    <tbody>
                    <template v-if="workingList&&workingList.length>0">
                        <tr v-for="(val,index) in workingList" :key="index" >
                            <td><span>{{val.name}}</span></td>
                            <td><span>{{val.tongxin_num}}</span></td>
                            <td><span>{{val.tongxin_alertCount}}</span></td>
<!--                            <td><span>{{val.haiyuan_num}}</span></td>-->
<!--                            <td><span>{{val.haiyuan_alertCount}}</span></td>-->
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="3"><span>暂时没有数据!</span></td>
                        </tr>
                    </template>
                    </tbody>
                </table>
                <div class="sm-title"><span>颍东县今日水量</span></div>
                <div class="tip-blocks">
                    <div class="block-item" v-for="(val,index) in tongxin_currentWaterList" :key="index">
                        <span>{{val.value}}</span>
                        <span>{{val.name}}</span>
                    </div>
                </div>
<!--                <div class="sm-title"><span>海源县今日水量</span></div>-->
<!--                <div class="tip-blocks">-->
<!--                    <div class="block-item" v-for="(val,index) in haiyuan_currentWaterList" :key="index">-->
<!--                        <span>{{val.value}}</span>-->
<!--                        <span>{{val.name}}</span>-->
<!--                    </div>-->
<!--                </div>-->
            </template>
            <template v-else>
                <component :is="modelComponent" ref="indexVal"></component>
            </template>
        </div>
    </div>
</template>

<script>
    let VALINDEXMODULE = ()=>import('@/pages/tipPanel/valIndex');
    export default {
        name: 'TipTabs',
        data(){
            return{
                modelComponent:null,
                tabs:['水司总览','颍东概览'],
                tabIndex:0,
                workingList:[
                    {
                        name:'泵站',
                        tongxin_num:15,
                        haiyuan_num:5,
                        tongxin_alertCount:2,
                        haiyuan_alertCount:0,
                    },
                    {
                        name:'蓄水池',
                        tongxin_num:92,
                        haiyuan_num:29,
                        tongxin_alertCount:2,
                        haiyuan_alertCount:0,
                    },
                    {
                        name:'管网监测点',
                        tongxin_num:378,
                        haiyuan_num:57,
                        tongxin_alertCount:2,
                        haiyuan_alertCount:0,
                    },
                    {
                        name:'联户表井',
                        tongxin_num:4735,
                        haiyuan_num:329,
                        tongxin_alertCount:1,
                        haiyuan_alertCount:0,
                    },
                    {
                        name:'远传水表',
                        tongxin_num:29869,
                        haiyuan_num:2632,
                        tongxin_alertCount:0,
                        haiyuan_alertCount:0,
                    },
                    {
                        name:'水质监测',
                        tongxin_num:2,
                        haiyuan_num:2,
                        tongxin_alertCount:0,
                        haiyuan_alertCount:0,
                    },
                    {
                        name:'视频监控',
                        tongxin_num:29,
                        haiyuan_num:21,
                        tongxin_alertCount:1,
                        haiyuan_alertCount:0,
                    }
                ],
                tongxin_currentWaterList:[
                    {
                        name:'总取水量(m³)',
                        value:20000
                    },
                    {
                        name:'总出水量(m³)',
                        value:18000
                    },
                    {
                        name:'总用水量(m³)',
                        value:17000
                    }
                ],
                haiyuan_currentWaterList:[
                    {
                        name:'总取水量(m³)',
                        value:18000
                    },
                    {
                        name:'总出水量(m³)',
                        value:16000
                    },
                    {
                        name:'总用水量(m³)',
                        value:14000
                    }
                ]
            };
        },
        methods:{
            selecThis(index){
                this.tabIndex = index;
                if(index==0){
                    this.modelComponent = null;
                }else{
                    this.modelComponent = VALINDEXMODULE;
                }
            },
            changeIndex(type){
                let index =   this.tabIndex ;
                if(index==1){
                    this.$refs.indexVal.changeVal(type);
                }
            }
        }
    };
</script>

<style scoped lang="scss">
#TipTabs{
    width: 220px;
    /*@media screen and (max-width: 1600px){*/
    /*    height: 500px;*/
    /*}*/
    /*@media screen and (max-width: 1601px){*/
    /*    height: 900px;*/
    /*}*/
    border-radius: 5px;
    border: 1px solid #ccc;
    overflow-y: auto;
    background: #fff;
    color: #333;
    position: relative;

    .tabs{
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #e1f0f9;
        .tab-item{
            width: 50%;
            text-align: center;
            height: 40px;
            line-height: 40px;
            color: #0790f8;
            cursor: pointer;
            &.actived{
                background: #0790f8;
                color: #fff;
            }
        }
    }
    .inner-content{
        width: 100%;
        height: calc(100% - 40px);
        padding: 10px;
        padding-top: 0;
        overflow-y: auto;
        @media screen and (max-width: 1600px) {
            max-height: 500px;
        }
        @media screen and (min-width: 1602px) {
            max-height: 800px;
        }

        .sm-title{
            width: 100%;
            text-align: center;
            height: 40px;
            color: #135688;
            font-weight: 600;
            span{
                line-height: 40px;
            }
        }

        table{
            tbody{
                tr{
                    td:first-child{
                        span{
                            text-align: left;
                            padding-left: 3px;
                        }
                    }

                    td:last-child{
                        span{
                            line-height: 14px;
                        }
                    }
                }
            }
        }

        .laber-wrap{
            width: 100%;
            .label-item{
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 60px;
                margin-bottom: 10px;
                border: 1px solid #e9e9e9;
                &:last-child{
                    margin-bottom: 0;
                }
                .title{
                    width: 20px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 12px;
                    text-align: center;
                    color: #fff;
                }
                &:nth-child(1){
                    .title{
                        background: #FCB96C;
                    }
                }
                &:nth-child(2){
                    .title{
                        background: #0690F8;
                    }
                }
                &:nth-child(3){
                    .title{
                        background: #07C087;
                    }
                }

                .content-list{
                    width: calc(100% - 20px);
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    .content-item{
                        width: 25%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        span.green{
                            color: #03C9FB;
                            line-height: 20px;
                            font-size: 14px;
                            font-weight: 600;
                        }
                        span:last-child{
                            font-size: 12px;
                        }
                    }
                }

            }
        }

        .tip-blocks{
            width: 100%;
            .block-item{
                width: 100%;
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #0b83fe;
                color: #fff;
                margin-bottom: 10px;
                padding: 0 10px;
                span{
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                    &:first-child{
                        text-align: left;
                    }
                }
                &:nth-child(1){
                    background: #1A88DB;
                }
                &:nth-child(2){
                    background: #f0a967;
                }
                &:nth-child(3){
                    background: #27C592;
                }
            }
        }
    }
}
</style>
