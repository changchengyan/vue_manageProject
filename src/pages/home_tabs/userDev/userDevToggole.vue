<template>
    <div id="userDevToggole">
        <template v-if="tabIndex==0">
            <div class="col">
                <iframe :src="staticPath+'/companys/userDev/userDev_zhutai.html'" frameborder="0"></iframe>
            </div>
            <div class="col">
                <div class="top-head">
                    <span>户名</span>
                    <span>水表编号</span>
                    <span>当前水表</span>
                    <span>当月用水量</span>
                    <span>状态</span>
                    <span>控制命令</span>
                </div>
                <div class="row" v-for="(val,index) in ctrList" :key="index">
                    <div class="item">
                        <span>{{val.name}}</span>
                    </div>
                    <div class="item">
                        <span>{{val.code}}</span>
                    </div>
                    <div class="item">
                        <span>{{val.currentVal}}</span>
                    </div>
                    <div class="item">
                        <span>{{val.currentMonthVal}}</span>
                    </div>
                    <div class="item">
                        <span class="cycle" :class="{stopCycle:val.status==false}"></span>
                    </div>
                    <div class="item">
                        <span class="start" @click="showThis(index,val.status)" :class="{startStop:val.status==false}">开</span>
                        <span class="stop"  @click="showThis(index,!val.status)"  :class="{stopStart:val.status==false}">关</span>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <table class="innerTable" >
                <thead>
                <tr>
                    <th><span>巡检编号</span></th>
                    <th><span>巡检对象</span></th>
                    <th><span>巡检人</span></th>
                    <th><span>巡检时间</span></th>
                    <th><span>巡检项目</span></th>
                    <th><span>巡检结果</span></th>
                </tr>
                </thead>
                <tbody>
                <template v-if="tableList&&tableList.length>0">
                    <tr v-for="(val,index) in tableList" :key="index">
                        <td><span>{{val.code}}</span></td>
                        <td><span>{{userDevName}}</span></td>
                        <td><span>{{val.viewer}}</span></td>
                        <td><span>{{val.viewTime}}</span></td>
                        <td><span>{{val.viewParams}}</span></td>
                        <td><span :class="{alert:val.result=='2'}">{{val.result=='1'?'正常':val.msg}}</span></td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="6"><span>暂时没有数据!</span></td>
                    </tr>
                </template>
                </tbody>
            </table>
        </template>

    </div>
</template>

<script>
    export default {
        name: 'userDevToggole',
        props:['userDevName'],
        data(){
            return{
                tabIndex:0,
                staticPath:'',
                list:[
                    {
                        code:'1812302935',
                        name:'田丑女',
                        value:'9.9',
                        currentVal:'0'
                    },
                    {
                        code:'1812302917',
                        name:'罗发仁',
                        value:'9',
                        currentVal:'0'
                    },
                    {
                        code:'1812303150',
                        name:'杨文有',
                        value:'7.6',
                        currentVal:'0'
                    },
                    {
                        code:'1812303045',
                        name:'无人',
                        value:'2.2',
                        currentVal:'0'
                    }
                ],
                ctrList:[
                    {
                        name:'张东民',
                        code:'1812302935',
                        currentVal:0.7,
                        currentMonthVal:0.7,
                        status:true
                    },
                    {
                        name:'李潇',
                        code:'1812302917',
                        currentVal:3.3,
                        currentMonthVal:0.5,
                        status:true
                    },
                    {
                        name:'王强',
                        code:'1812303150',
                        currentVal:3.7,
                        currentMonthVal:0.1,
                        status:true
                    },
                    {
                        name:'王奉先',
                        code:'1812303185',
                        currentVal:0.7,
                        currentMonthVal:0.7,
                        status:true
                    },
                    {
                        name:'张百武',
                        code:'183456788',
                        currentVal:0.9,
                        currentMonthVal:0,
                        status:true
                    },
                    {
                        name:'李明雨',
                        code:'189456783',
                        currentVal:12.3,
                        currentMonthVal:0.9,
                        status:true
                    },
                    {
                        name:'邓闲林',
                        code:'189456785',
                        currentVal:3.9,
                        currentMonthVal:0,
                        status:true
                    },
                    {
                        name:'杨凯宾',
                        code:'189456786',
                        currentVal:2.2,
                        currentMonthVal:0.1,
                        status:true
                    },
                    {
                        name:'周中丰',
                        code:'189456782',
                        currentVal:0.9,
                        currentMonthVal:0,
                        status:true
                    }
                ],
                tableList:[
                {
                    code:'XJ-GC-20190001',
                    planName:'甘沟移民村1#联户表井',
                    viewer:'张军',
                    viewTime:'2019-7-20',
                    viewParams:'1、卫生；2、水表情况；3、渗漏情况',
                    result:'2',
                    msg:'渗漏异常'
                },
                {
                    code:'XJ-GC-20190024',
                    planName:'甘沟移民村1#联户表井',
                    viewer:'张军',
                    viewTime:'2019-6-20',
                    viewParams:'1、卫生；2、水表情况；3、渗漏情况',
                    result:'2',
                    msg:'渗漏异常'
                },
                {
                    code:'XJ-GC-20190189',
                    planName:'甘沟移民村1#联户表井',
                    viewer:'张军',
                    viewTime:'2019-5-20',
                    viewParams:'1、卫生；2、水表情况；3、渗漏情况',
                    result:'1',
                    msg:'正常'
                },
                {
                    code:'XJ-GC-20190001',
                    planName:'甘沟移民村1#联户表井',
                    viewer:'张军',
                    viewTime:'2019-4-20',
                    viewParams:'1、卫生；2、水表情况；3、渗漏情况',
                    result:'2',
                    msg:'水表异常'
                },
                {
                    code:'XJ-GC-20190024',
                    planName:'甘沟移民村1#联户表井',
                    viewer:'张军',
                    viewTime:'2019-3-8',
                    viewParams:'1、卫生；2、水表情况；3、渗漏情况',
                    result:'2',
                    msg:'卫生异常'
                }
            ]
            };
        },
        methods:{
            activeThis(index){
                this.tabIndex = index;
            },
            showThis(index,flag){
                if(flag==true){
                    return ;
                }
                this.ctrList[index].status = !this.ctrList[index].status;
            }

        },
        created() {
            this.staticPath = window.DSE.static_baseUrl;
        }

    };
</script>

<style scoped lang="scss">
#userDevToggole{
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
            width:calc(100% - 520px);
            /*img{*/
            /*    width: 100%;*/
            /*}*/
            iframe{
                width: 100%;
                height: 100%;
            }
        }
        &:last-child{
            width: 520px;
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

    }

    table{
        td{
            span.alert{
                color: red;
            }
        }
    }
}
</style>
