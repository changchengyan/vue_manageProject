<template>
    <div id="east">
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
        <div class="table-watercapacity">
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
        <div class="table-statiChart">
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
        name: 'east',
        data() {
            return {
                initDate: '',
                cardPanel: {
                    userCount: 97543,
                    usedWater: 691583.46,
                    receiveMoney: 551720.05,
                    willGiveMoneyUserCount: 537,
                    rangeUserCapacity: 0.79,
                    rangeUserCost: 33.95
                },
                waterCapacityList: [{
                    name: '预旺镇',
                    capacity: '42083.20'
                }, {
                    name: '马高庄乡',
                    capacity: '63612.01'
                }, {
                    name: '张家塬乡',
                    capacity: '42444.10'
                }, {
                    name: '韦州镇',
                    capacity: '33089.20'
                }, {
                    name: '下马关镇',
                    capacity: '50736.81'
                }],
                waterCostList: [
                    {
                        name: '预旺镇',
                        execCost: '121138.73',
                        realCost: '100093.17'
                    },
                    {
                        name: '马高庄乡',
                        execCost: '183110.56',
                        realCost: '151298.58'
                    },
                    {
                        name: '张家塬乡',
                        execCost: '122177.59',
                        realCost: '100951.56'
                    }, {
                        name: '韦州镇',
                        execCost: '95249.02',
                        realCost: '78701.31'
                    }, {
                        name: '下马关镇',
                        execCost: '146048.60',
                        realCost: '120675.43'
                    }
                ]
            };
        },
        methods: {},
        mounted() {

        }
    };
</script>

<style scoped lang="scss">
    #east {
        width: 100%;
        height: 100%;
        overflow-y: auto;

        .rate-cards {
            width: 100%;
            padding: 5px;

            .row {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;
                margin-bottom: 10px;

                .card-item {
                    width: calc(33.33% - 5px);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 5px 0;
                    border: 1px solid #4ACBE8;

                    span {
                        &.green {
                            color: #4ACBE8;
                            font-size: 14px;
                            font-weight: 600;
                        }
                    }
                }
            }
        }

        .table-watercapacity, .table-statiChart {
            width: 100%;

            table {
                tbody {
                    tr {
                        td {
                            &:last-child {
                                span {
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

