<template>
    <div id="middle">
        <div class="top-head">
            <div class="row">
                <span class="rect"></span>
                <span>水费数据</span>
            </div>
        </div>
        <div class="rate-cards">
            <div class="row">
                <div class="card-item">
                    <span class="green">{{cardPanel.userCount}}</span>
                    <span>用户数(户)</span>
                </div>
                <div class="card-item">
                    <span class="green">{{cardPanel.usedWater}}</span>
                    <span>用水量(m³)</span>
                </div>
                <div class="card-item">
                    <span class="green">{{cardPanel.receiveMoney}}</span>
                    <span>已收水费(元)</span>
                </div>
            </div>
            <div class="row">
                <div class="card-item">
                    <span class="green">{{cardPanel.willGiveMoneyUserCount}}</span>
                    <span>登记待缴户数</span>
                </div>
                <div class="card-item">
                    <span class="green">{{cardPanel.rangeUserCapacity}}</span>
                    <span>户均用水量(m³)</span>
                </div>
                <div class="card-item">
                    <span class="green">{{cardPanel.rangeUserCost}}</span>
                    <span>户均缴费(元)</span>
                </div>
            </div>
        </div>
        <div class="top-head">
            <div class="col">
                <span class="rect"></span>
                <span>各乡镇水量统计(m³)</span>
            </div>
        </div>
        <div class="table-watercapacity" >
            <table class="innerTable">
                <thead>
                <tr>
                    <th><span>乡镇名</span></th>
                    <th><span>用水量(m³)</span></th>
                </tr>
                </thead>
                <tbody>
                <template v-if="waterCapacityList&&waterCapacityList.length>0">
                    <tr v-for="(val,index) in waterCapacityList" :key="index">
                        <td><span>{{val.name}}</span></td>
                        <td><span>{{val.capacity}}</span></td>
                    </tr>
                </template>
                </tbody>
            </table>
        </div>
        <div class="top-head">
            <div class="col">
                <span class="rect"></span>
                <span>各乡镇用水费收缴统计</span>
            </div>
        </div>
        <div class="table-statiChart" >
            <table class="innerTable">
                <thead>
                <tr>
                    <th><span>乡镇名</span></th>
                    <th><span>应收水费(元)</span></th>
                    <th><span>实收水费(元)</span></th>
                </tr>
                </thead>
                <tbody>
                <template v-if="waterCostList&&waterCostList.length>0">
                    <tr v-for="(val,index) in waterCostList" :key="index">
                        <td><span>{{val.name}}</span></td>
                        <td><span>{{val.execCost}}</span></td>
                        <td><span>{{val.realCost}}</span></td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="3"><span>暂时没有数据!</span></td>
                    </tr>
                </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'middle',
        data(){
            return{
                initDate:'',
                cardPanel: {
                    userCount: 101543,
                    usedWater: 250761.58,
                    receiveMoney: 574344.74,
                    willGiveMoneyUserCount: 1254,
                    rangeUserCapacity: 0.82,
                    rangeUserCost: 4.1
                },
                waterCapacityList:[{
                    name:'王团镇',
                    capacity:'45032.45'
                },{
                    name:'下马关镇',
                    capacity:'40253.18'
                },{
                    name:'石狮管委会',
                    capacity:'43982.12'
                },{
                    name:'田老庄乡',
                    capacity:'38652.43'
                },{
                    name:'河西镇',
                    capacity:'36728.34'
                },{
                    name:'预旺镇',
                    capacity:'46113.06'
                }],
                waterCostList:[
                    {
                        name:'王团镇',
                        execCost:'124845.24',
                        realCost:'103142.40'
                    },
                    {
                        name:'马高庄乡',
                        execCost:'111595.48',
                        realCost:'92195.95'
                    },
                    {
                        name:'石狮管委会',
                        execCost:'121933.37',
                        realCost:'100736.72'
                    }, {
                        name:'田老庄乡',
                        execCost:'107157.66',
                        realCost:'88529.59'
                    }, {
                        name:'河西镇',
                        execCost:'101823.43',
                        realCost:'84122.65'
                    }, {
                        name:'预旺镇',
                        execCost:'127841.06',
                        realCost:'105617.43'
                    }
                ]
            };
        },
        methods:{

        },
        mounted() {

        }
    };
</script>

<style scoped lang="scss">
    #middle{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        .rate-cards{
            width: 100%;
            padding: 5px;
            .row{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;
                margin-bottom: 10px;
                .card-item  {
                    width: calc(33.33% - 5px);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 5px 0;
                    border: 1px solid #4ACBE8;
                    span{
                        &.green{
                            color: #4ACBE8;
                            font-size: 14px;
                            font-weight: 600;
                        }
                    }
                }
            }
        }
        .table-watercapacity,.table-statiChart{
            width: 100%;
            table{
                tbody{
                    tr{
                        td{
                            &:last-child{
                                span{
                                    line-height: 30px;
                                }
                            }
                        }
                    }
                }
            }
        }

    }
</style>
