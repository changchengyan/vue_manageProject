<template>
    <div id="tabsToggle">
        <div class="top-actions">
<!--          :class="{notAllow:startStop}"-->
            <div class="prev" @click="prev" >
                <i class="el-icon-arrow-left"></i>
            </div>
            <div class="tabs-wrap">
                <template v-if="list&&list.length>0">
                    <div class="inner-wrap" :style="{left:rockCount*100+'px'}">
                      <component :is="val" v-for="(val,index) in list"  :key="index" @click.native="selectThis(val,index)" :class="{activTab:index===activedTabIndex}"></component>
                    </div>
                </template>
            </div>
<!--          :class="{notAllow:endStop}"-->
            <div class="next" @click="next" >
                <i class="el-icon-arrow-right"></i>
            </div>
        </div>
        <div class="main-content">
           <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
        name: 'dse-tabsToggle',
        // props:['tabList'],
        props:{
            tabList:{
                type:Array,
                defaultProps:[]
            }
        },
        data(){
            return{
                rockCount:0, //记录左右晃动的次数，负数为左，正数为右
                activedTabIndex:0, //当前激活的tab
                list:[],
                startStop:true,
                endStop:false
            };
        },
        methods:{
          next(){
              let len = this.list?this.list.length:0;
              if(len<=3){
                  return;
              }
              if(this.rockCount<-(len-4)){
                  this.endStop = true;
                  return;
              }
             this.rockCount = this.rockCount-1;
              this.startStop = false;

          },
          prev(){
              let len = this.list?this.list.length:0;
              if(len<=3){
                  return;
              }
              if(this.rockCount==0){
                  this.startStop = true;
                  return;
              }
              this.rockCount = this.rockCount+1;
              this.endStop = false;

          },
          selectThis(val,index){

            let temp_item = val.template;
            this.activedTabIndex = index;

            temp_item = temp_item.replace(/<div class="tabItem"><span>/,'');
            temp_item=temp_item.replace(/<\/span><\/div>/,'');
            temp_item = temp_item.trim();

            let  temp_index = null; //原有索引
            switch (temp_item) {
              case '管网信息':
                temp_index = 0;
                break;
              case '工程信息':
                temp_index = 1;
                break;
              case '监测信息':
                temp_index = 2;
                break;
              case '巡查检修信息':
                temp_index = 3;
                break;
                case '水量水费信息':
                    temp_index = 4;
                    break;
            }

            this.$emit('myActivedIndex',{activedIndex:temp_index});
          },
          fromFather(list,componentName,flag){
            this.list = list;
            this.startStop=true;
            this.endStop=false;

            if(!flag){
              this.activedTabIndex = this.list.length-1;
              return;
            }


            for(let i=0;i<list.length;i++){
              if(list[i].template.includes(componentName)){
                this.activedTabIndex = i;
                break;
              }
            }
          },
          fromFather_activedTab(obj){
              let temp_len = obj.leftIds.length;
              if(this.funTool.indexOf(obj.leftIds,obj.index)>-1){
                  this.activedTabIndex = obj.index;
              }else{
                  this.activedTabIndex = (obj.leftIds).length==0?0:( parseInt((obj.leftIds)[temp_len-1]/10-1));
              }

          }
        },
        created() {
            this.list = this.tabList;
        }
    };
</script>

<style scoped lang="scss">
#tabsToggle{
  width: 100%;
  height: 40px;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  background: #1a88db;
  padding-top: 10px;

    .top-actions{
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
        border-bottom: 1px solid #e9e9e9;
        font-size:15px;
        .prev,.next{
            width: 30px;
            height: 100%;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            color: #fff;
            &:hover{
                background: #1edff9;
                i{
                  color: #fff;
                }
            }
            &.notAllow{
                background: rgba(0,0,0,0.3);
                i{
                    color: #fff;
                }
            }
            i{
                color: #fff;
            }
        }
        .tabs-wrap{
            width: calc(100% - 60px);
            height: 30px;

            overflow-x: hidden;
            position: relative;
            transition: all .5s ease-in-out;
            .inner-wrap{
                position: absolute;
                top: 0;
                height: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .tabItem{
                    width: 100px;
                    height: 100%;
                    text-align: center;
                    line-height: 30px;
                    cursor: pointer;
                    font-weight: 600;
                    color: #FFFDFD;
                  background: url("../../assets/images/home/tabNormal.png");
                  background-size: 100% 100%;
                  background-position: center center;
                    &.notAllow{
                        color: gray;
                        cursor: not-allowed;
                    }
                    &.activTab{
                        /*background: #fff;*/
                        color: #333;
                        /*border-top-left-radius: 5px;*/
                        /*border-top-right-radius: 5px;*/
                      background: url("../../assets/images/home/tabActived.png");
                      background-size: 100% 100%;
                      background-position: center center;
                    }
                }
            }
        }
    }
    .main-content{
        width: 100%;
        height: calc(100% - 35px);
    }

}
</style>
