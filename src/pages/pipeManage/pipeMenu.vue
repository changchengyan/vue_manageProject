<template>
    <div id="pipeMenu">
        <el-container>
            <el-header>
                <dse-breadcrumb ref="bread"/>
            </el-header>
            <el-container class="leftHeight">
                <el-aside class="globalAside" :style="{backgroundColor:'#214167',width:wd}" v-if='showAside'>
                    <dse-side-menu />
                </el-aside>
                <el-main class="child-view" :style="{width:content_wd,left:asideLeft}">
                    <transition :name="transitionName">
                        <router-view   @thisTab="changeTabs" @hiddenAside="hidden_aside" @showAside="show_aside"></router-view>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import DseBreadcrumb from '../../common/components/dseBreadcrumb';
    import DseSideMenu from '../../common/components/DseSideMenu';
    export default {
        name: 'pipeMenu',
        components: {DseSideMenu, DseBreadcrumb},
        data(){
            return{
                transitionName: 'slide-left',
                activePage: 1,
                wd: '',
                content_wd: '',
                main_left: '200px',
                showAside: true,
                small: false,
                asideLeft: '',
                MenuData: []
            };
        },
        methods:{
            changeTabs(num) {
                this.MenuData = this.menuList;
            },
            breadcrumb(obj){
                console.log(obj);
                this.$refs.bread.showItem(obj);
            },
            hidden_aside(flag) {
                this.showAside = false;

                this.content_wd = 'calc(100%)';
                this.asideLeft = '0px';
            },
            show_aside(flag) {
                this.showAside = true;
                if (this.small) {
                    this.content_wd = 'calc(100% - 80px)';
                    this.asideLeft = '80px';
                } else {
                    this.content_wd = 'calc(100%  - 80px)';
                    this.asideLeft = '80px';
                }
            },
            asyncMenuList(arr) {
                this.MenuData = JSON.parse(JSON.stringify(arr));
            }
        },
        watch: {
            '$route'(to, from) {
                const toIndex = to.meta.index;
                const fromIndex = from.meta.index;

                this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left';
            }
        }
    };
</script>

<style scoped lang="scss">
    #pipeMenu{
        width: 100%;
        height: calc(100% - 55px);
        overflow-y: auto;
        /deep/ .el-header{
            height: 30px !important;
        }
        .el-container{
            /*min-height: 100%;*/
        }
    }
</style>
