<template>
    <div id="pumpViewRecord">
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
                    <td><span>{{pumpName}}</span></td>
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
        name: 'pumpViewRecord',
        props:['pumpName'],
        data(){
            return{
                list:[
                    {
                        code:'XJ-GC-20190001',
                        planName:'小洪沟水源泵站',
                        viewer:'陈立荣',
                        viewTime:'2019-7-20',
                        viewParams:'1、卫生；2、门窗；3、泵组；4、机电设备；5、渗漏情况',
                        result:'1',
                        msg:'正常'
                    },
                    {
                        code:'XJ-GC-20190024',
                        planName:'小洪沟水源泵站',
                        viewer:'王亚',
                        viewTime:'2019-6-20',
                        viewParams:'1、卫生；2、门窗；3、泵组；4、机电设备；5、渗漏情况',
                        result:'1',
                        msg:'正常'
                    },
                    {
                        code:'XJ-GC-20190189',
                        planName:'小洪沟水源泵站',
                        viewer:'陈立荣',
                        viewTime:'2019-5-20',
                        viewParams:'1、卫生；2、门窗；3、泵组；4、机电设备；5、渗漏情况',
                        result:'2',
                        msg:'泵组异常'
                    }
                ]
            };
        }
    };
</script>

<style scoped lang="scss">
#pumpViewRecord{
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
