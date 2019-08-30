<template>
<div id="countMsg">
    <div class="row"><span>用水户数:</span><span>106户</span></div>
    <div class="row"><span>用水量:</span><span>56m³</span></div>
    <div class="row"><span>已缴水费:</span><span>6.5元</span></div>
    <div class="row"><span>登记代缴户数:</span><span>81户</span></div>
</div>
</template>

<script>
    export default {
        name: 'countMsg',
        data(){
            return{

            };
        }
    };
</script>

<style scoped lang="scss">
#countMsg{
   width: 100%;
    height: 100%;
    font-size: 12px;
.row{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    span{
        width: 50%;
        &:first-child{
            text-align: left;
            letter-spacing: 3px;
        }
    }
}








    width: 100%;
    height: 100%;
}
</style>
