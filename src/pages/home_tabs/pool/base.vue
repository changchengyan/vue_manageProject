<template>
    <div id="poolBase">
        <div class="row">
            <table class="innerTable">
                <tbody>
                <tr>
                    <td><span>管理单位:</span></td>
                    <td><span>{{manageUnit}}</span></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="row">
            <div class="top-head">
                <span class="rect"></span>
                <span>图片</span>
            </div>
            <div class="chart-content">
                <template v-if="imgs.length>0">
                    <img :src="val" alt=""  v-for="(val,index) in imgs" :key="index">
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'pool-base',
        components: {},
        data(){
            return{
                name:'窑山2#高位蓄水池详情',
                manageUnit:'东部分公司',
                imgs:[]
            };
        }
    };
</script>

<style scoped lang="scss">
#poolBase{
    width: 100%;
    height: 100%;
    table{
        border-top: 1px solid #e9e9e9;
    }
    .row{
        &:not(:first-child){
            height: 400px;
            .top-head{
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                span{
                    margin-right: 10px;
                }
            }
            .chart-content{
                width: 100%;
                height: calc(100% - 20px);
                .search-time{
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    span{
                        display: inline-block;
                        margin-right: 10px;
                    }
                    input{
                        margin-right: 10px;
                    }
                }
                .main-chart{
                    width: 100%;
                    height: calc(100% - 40px);
                    &>div{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
}
</style>
