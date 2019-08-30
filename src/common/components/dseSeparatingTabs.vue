<template>
  <div id="separatingTabs">
    <div class="tabs-wrap">
      <div class="tabItem" v-for="(val,index) in tabs" :key="index" :class="{actived:index==activedTabIndex}"
           @click="thisTab(index)">
        <span>{{val}}</span>
      </div>
    </div>
    <div class="sub-main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dse-separatingTabs',
    props: ['tabs', 'id'],
    data() {
      return {
        activedTabIndex: 0,
      };
    },
    methods: {
      thisTab(index) {
        this.activedTabIndex = index;
        this.$emit('separatingTabIndex', index);
      },
      init(){
        this.activedTabIndex = 0;
      }
    }
  };
</script>

<style scoped lang="scss">
  #separatingTabs {
    width: 100%;
    height: 100%;
    padding: 5px;
    .tabs-wrap {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: flex-start;
      margin-bottom: 10px;

      .tabItem {
        /*padding: 0 10px;*/
        width: 140px;
        margin-right: 10px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;

        &.actived {
          border-bottom: 1px solid #0b83fe;
        }
      }

    }

    .sub-main {
      width: 100%;
      height: calc(100% - 40px);
      overflow-y: auto;
      text-align: center;
    }


  }
</style>
