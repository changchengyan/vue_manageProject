<template>
    <div id="listModel" v-if="modelShowFlag">
        <div class="model">
            <div class="top-head">
                <span>{{tips}}</span>
                <i class="el-icon-close" @click="closeModel"></i>
            </div>
            <div class="sub-wrap">
                <slot></slot>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'dse-listModel',
        // props:['list','tips'],
        props:{
            list:{
                type:Array,
                defaultProps:[]
            },
            tips:{
                type:String,
                defaultProps:''
            }
        },
        data(){
            return{
                modelShowFlag:false
            };
        },
        methods:{
            closeModel(){
                this.modelShowFlag = false;
                this.$emit('stopMp3',false);
            },
            showModel(){
                this.modelShowFlag = true;
            }
        }
    };
</script>

<style scoped lang="scss">
#listModel{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.15);
    z-index: 100;
    position: fixed;
    left: 0;
    top: 30px;
    .model{
        width: 400px;
        position: absolute;
        top: 80px;
        left: 50%;
        margin-left: -200px;
        overflow-x: hidden;
        background: #fff;
        .top-head{
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            position: relative;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #0b83fe;
            color: #fff;
            padding: 0 10px;
            i{
                cursor: pointer;
                font-size: 18px;
            }
        }
        .sub-wrap{
            width: 100%;
            height: calc(100% - 30px);
            max-height: 400px;
            overflow-y: auto;
        }
    }
}
</style>
