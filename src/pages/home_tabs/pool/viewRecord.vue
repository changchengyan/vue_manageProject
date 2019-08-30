<template>
    <div id="viewRecord">
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
            <template v-if="list&&list.length>0">
                <tr v-for="(val,index) in list" :key="index">
                    <td><span>{{val.code}}</span></td>
                    <td><span>{{poolName}}</span></td>
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
    </div>
</template>
<script>
    export default {
        name: 'pool-viewRecord',
        props:['poolName'],
        data(){
            return{
                list:[
                    {
                        code:'XJ-GC-20190001',
                        planName:'窑山2#高位蓄水池',
                        viewer:'秦琦',
                        viewTime:'2019-7-20',
                        viewParams:'1、卫生；2、监测设备；3、渗漏情况',
                        result:'2',
                        msg:'渗漏异常'
                    },
                    {
                        code:'XJ-GC-20190024',
                        planName:'窑山2#高位蓄水池',
                        viewer:'张若俞',
                        viewTime:'2019-6-20',
                        viewParams:'1、卫生；2、监测设备；3、渗漏情况',
                        result:'2',
                        msg:'渗漏异常'
                    },
                    {
                        code:'XJ-GC-20190189',
                        planName:'窑山2#高位蓄水池',
                        viewer:'张若俞',
                        viewTime:'2019-5-20',
                        viewParams:'1、卫生；2、监测设备；3、渗漏情况',
                        result:'1',
                        msg:'正常'
                    },
                    {
                        code:'XJ-GC-20190189',
                        planName:'窑山2#高位蓄水池',
                        viewer:'王洁',
                        viewTime:'2019-4-20',
                        viewParams:'1、卫生；2、监测设备；3、渗漏情况',
                        result:'2',
                        msg:'卫生异常'
                    },
                    {
                        code:'XJ-GC-20190189',
                        planName:'窑山2#高位蓄水池',
                        viewer:'王洁',
                        viewTime:'2019-3-20',
                        viewParams:'1、卫生；2、监测设备；3、渗漏情况',
                        result:'1',
                        msg:'正常'
                    }
                ]
            };
        }
    };
</script>
<style scoped lang="scss">
    #viewRecord{
        width: 100%;
        height: 100%;
        table{
            td{
                span.alert{
                    color: red;
                }
            }
        }
    }
</style>
