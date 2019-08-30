<template>
    <div id="tabsUnderline">
        <div class="tabs">
            <template v-if="list.length>0">
              <component :is="val" v-for="(val,index) in list" :key="index" @click.native="activedTab(index,val)" :class="{actived:index===activedTabIndex}"></component>
            </template>

        </div>
        <div class="sub-content">
           <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'dse-tabsUnderline',
        // props:['tabs'],
        props:{
            tabs:{
                type:Array,
                defaultProps:[]
            }
        },
        data(){
            return{
                activedTabIndex:0,
                list:[]
            };
        },
        methods:{
            activedTab(index,val){
                this.activedTabIndex = index;
                let temp_list = this.list;
                console.log(val);
                console.log(temp_list);
                console.log('_____________________');
                this.$emit('tab_line_index',{component:val,list:temp_list});
            },
            fromFather(list,template,flag){
                this.list = list;
                let  temp_index = 0;
                let temp_template = template;

                if(!temp_template){
                  this.activedTabIndex =temp_index;
                  return ;
                }

                if(!flag){
                  temp_template = list[list.length-1];
                }
                for(let i=0;i<list.length;i++){
                  if(list[i]==temp_template){
                    temp_index = i;
                    break;
                  }
                }
                this.activedTabIndex =temp_index;
            }
        },
        created() {
            this.list = this.tabs?this.tabs : [] ;
        }
    };
</script>

<style scoped lang="scss">
#tabsUnderline{
    width: 100%;
    height: calc(100% - 50px);
    transition: all 0.5s ease-in-out;
    .tabs{
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        font-size: 14px;
        margin-bottom: 5px;
      border-bottom: 1px solid #ccc;
        .tabItem{
            /*margin-right: 18px;*/
            line-height: 28px;
            span{
                line-height: 28px;
            }
            cursor: pointer;
            &.notAllow{
                color: gray;
                cursor: not-allowed;
            }
            &.actived{
                color: #0b83fe;
                border-bottom: 2px solid #0b83fe;
            }
        }
    }
    .sub-content{
        width: 100%;
        height: calc(100% - 24px);
        overflow: auto;
        overflow-x: hidden;
    }
}
</style>
