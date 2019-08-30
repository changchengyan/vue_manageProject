<template>
    <div id="waterate">
       <component :is="moduleComponent"></component>
    </div>
</template>

<script>

   const ALLAREA = ()=>import('@/pages/home_tabs/waterate/allArea');
   const EASTAREA = ()=>import('@/pages/home_tabs/waterate/east');
   const WESTAREA = ()=>import('@/pages/home_tabs/waterate/west');
   const MIDDLEAREA = ()=>import('@/pages/home_tabs/waterate/middle');
   const HAIYUANAREA = ()=>import('@/pages/home_tabs/waterate/haiyuan');

    export default {
        name: 'waterate',

        data(){
            return{
                tabIndex:0,
                initDate:'',
                moduleComponent:null
            };
        },
        methods:{
            fromFather(component,list,flag) {
                let that = this;
                this.contentList = list;
                let temp_item = component;
                if(!temp_item){
                    temp_item = list[0];
                }
                temp_item = temp_item.template;
                if(!flag){
                    temp_item =list[list.length-1].template;
                }
                temp_item = temp_item.replace(/<div class="tabItem"><span>/,'');
                temp_item=temp_item.replace(/<\/span><\/div>/,'');
                temp_item = temp_item.trim();
                switch (temp_item) {
                    case '同心县':
                        that.moduleComponent = ALLAREA;
                        break;
                    case '同心东部':
                        that.moduleComponent = EASTAREA;
                        break;
                    case '同心西部':
                        that.moduleComponent = WESTAREA;
                        break;
                    case '同心中部':
                        that.moduleComponent = MIDDLEAREA;
                        break;
                    case '海源县':
                        that.moduleComponent = HAIYUANAREA;
                        break;
                }
            },

        }
    };
</script>

<style scoped lang="scss">
#waterate{
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
                    }
                }
            }
        }
    }
    .areaWater-statiChart{
        width: 100%;
        height: 200px;
    }
    .areaRate-statiChart{
        width: 100%;
        height: 300px;
    }
}
</style>
