<template>
    <div id="DseSideMenu">
       <div v-for="(item, key) in list" :key="key" class="item" :class="key === index && 'active'" @click="_goNavPage(key)">
           <i :class="'iconfont icon-' + item.icon"></i>
           <span>{{ item.label }}</span>
       </div>
    </div>
</template>

<script>
    export default {
        name: 'dse-sideMenu',
        data(){
            return{
                list:[],
                index: 0
            };
        },
        created() {
            let that = this;
            this.list = this.$route.meta.links;
            this.index =sessionStorage.getItem('currentChildIndex')? parseInt(sessionStorage.getItem('currentChildIndex')):0;
            this.$nextTick(()=>{
                    that._goNavPage(that.index);
            });
        },
        methods:{
            _goNavPage(index){
                this.index = index;
                sessionStorage.setItem('currentChildIndex',index);
                const PATH = this.list[index].path;
                this.$router.push({path:PATH});
            }
        }
    };
</script>

<style scoped lang="scss">
#DseSideMenu{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 80px !important;

    .item {
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100%;
        padding-top: 12px;
        padding-bottom: 12px;
        cursor: pointer;
        font-weight: normal;
        color: #187cea;
        text-align: center;

        &.active {
            color: #fff;
            background-color: #187cea;

            i {
                color: #fff;
            }
        }

        i {
            margin-bottom: 8px;
            font-size: 40px;
            color: #187cea;
        }

        span {
            line-height: 1.5;
        }
    }

}
</style>
