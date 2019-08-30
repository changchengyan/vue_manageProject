<template>
    <div id='fuzzySearch'>
        <input  @keyup.13='getLists' v-model='pipeName' placeholder='回车模糊查询数据' /> <span class="searchSomething" @click="search">搜索</span>
        <div class='sub_searchList' v-if='colseFlag&&lists&&lists.length>0' >
            <div class='searchItem'   @click='selectThis(item)' v-for='(item,index) in lists' :key='index' >
              <img :src="staticPath+'/images/searchIcon/'+item.type+'.png'" alt="">
              <span>{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>

  let that = null;

  window.onclick=function () {
    if(that.colseFlag){
      that.colseFlag = false;
    }
  };

    export default {
        props: ['searchLists', 'defaultName','closeList_flag'],
        name:'dse-fuzzySearch',
        data() {
            return {
                pipeName: '',
                colseFlag:true,
                lists:[],
                staticPath:''
            };
        },
        methods: {
            selectThis(val) {
                this.pipeName = val.name;
                this.colseFlag = false;
                this.$emit('selectThis', val);
            },
            getLists(event) {
                this.colseFlag = true;
                let temp_name = event.target.value;
                this.$emit('callBackList',temp_name);
            },
          search(){
              let temp_name =  this.pipeName;
              this.$emit('callBackList',temp_name);
          },
          searchList(list){
              this.lists = list;
             this.colseFlag = true;
          }
        },
        computed: {
            pipeName_: {
                get: function () {
                    return this.pipeName;
                },
                set: function (newValue) {
                    this.pipeName = newValue;
                }
            }
        },
        watch: {
            defaultName: function (val) {
                this.pipeName = val;
                // console.log(val)
            },
            closeList_flag:function(val){
                this.colseFlag = val;
                // console.log(val)
            },
            searchLists:{
                handler(newValue,oldValue){
                    let temp_arr = newValue;
                    if(temp_arr&&temp_arr.length&&temp_arr.length>10){
                        this.lists = temp_arr.splice(0,5);
                    }else{
                        this.lists = newValue;
                    }
                    // console.log(this.lists)
                },
                immediate:true,
                deep:true
            }

        },
        created(){
          that = this;
            this.pipeName = this.defaultName;
            this.lists = this.searchLists;
            this.staticPath =window.DSE.static_baseUrl;
        }

    };
</script>

<style lang='scss' scoped>
    #fuzzySearch {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        input{
            border: 1px solid #ccc;
            height: 30px;
            line-height: 28px;
            padding-left: 10px;
            width: calc(100% - 50px);
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
      .searchSomething{
        display: inline-block;
        width: 50px;
        text-align: center;
        line-height: 30px;
        background: #0b83fe;
        color: #fff;
        cursor: pointer;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
        .sub_searchList {
            width: 100%;
            height: 100px;
            position: absolute;
            top: 40px;
            left: 0;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            border-radius: 5px;
            z-index: 100;
            background: #fff;
            overflow-y: auto;
            .searchItem {
                border-bottom: 1px solid #ccc;
                line-height: 25px;
                cursor: pointer;
                padding-left: 10px;
                &:hover {
                    background: #66b1ff;
                    color: #fff;
                    border-radius: 5px;
                }
              img{
                width: 12px;
                height: 12px;
              }
            }
        }
    }
</style>
