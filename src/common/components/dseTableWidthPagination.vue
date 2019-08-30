<template>
    <div id="tableWidthPagination">
        <div class="table-wrap" >
            <table  class="innerTable">
                <slot></slot>
            </table>
        </div>

        <div class="pages">
            <el-pagination
                    background
                    @size-change="changPageSize"
                    @current-change="getThisPage"
                    :current-page="currentPage_"
                    :page-sizes="[10, 15, 20, 25, 30]"
                    :page-size="pageSize"
                    :total="totalNum"
                    layout="total, sizes, prev, pager, next, jumper"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        props:['totalNum','currentPage'],
        name: 'dse-tableWidthPagination',
        data() {
            return {
                pageSize:10,
                currentPage_:1, // 当前的页码
            };
        },
        methods:{
            getThisPage(val){
                let that = this;
                let temp_num = parseInt(val);
                let params = {
                  pageNum:temp_num,
                  pageSize:that.pageSize
                };
                this.$emit('goto_page',params);
            },
            changPageSize(num){
                let that = this;
                this.pageSize = num;
                this.currentPage_ = 1;
                let params = {
                    pageNum:that.currentPage,
                    pageSize:num
                }; this.$emit('goto_page',params);
            }
        },
        watch:{
            currentPage:{
                handler:(newVal,oldVal)=>{
                    this.currentPage_ = newVal;
                },
                immediate:true
            }
        }
    };
</script>

<style lang="scss" scoped>
    #tableWidthPagination {
        width: 100%;
        height: 100%;

        font-size: 14px;
        color: #333;
        .table-wrap{
            // border: 1px solid #ccc;
            overflow-y: auto;
            /*border-radius: 10px;*/
            width: 100%;
            height: calc(100% - 60px);
            &.hasPage{
                height: 100%;
            }
        }
        .pages{
            width: 100%;
            padding: 10px 0;
            display: flex;
            justify-content: center;
        }
    }
</style>
