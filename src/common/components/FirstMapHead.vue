<template>
    <div id="FirstMapHead">
      <div class="bg-title">
        <div class="short-line"></div>
        <div class="project-title">
          <img src="../../assets/images/home/projectLogo.png" alt="">
          <span>同心县农村安全饮水管理平台</span>
        </div>
      </div>
      <div class="sub-tabs">
        <div class="left">
          <div class="tab-item" @click="tabThis(index)" :class="{actived:index==tabIndex}" v-for="(val,index) in tabs" :key="index">
            <template v-if="index==0">
              <span>{{val}}</span>
              <i class="trans el-icon-caret-right" :class="{bottom:showTree}"></i>
            </template>
            <template v-else>
              <span>{{val}}</span>
            </template>
          </div>
        </div>
        <div class="right">
          <div class="tab-item" @click="rightTabThis(index)" :class="{rightActived:index==rightTabIndex}" v-for="(val,index) in rightTabs" :key="index">
            <span>{{val}}</span>
          </div>
          <div class="user">
            <div class="bg-logo">
              <img src="../../assets/images/home/user.png" alt="">
            </div>
            <div class="user-count">
              <span>同心供水-综合</span>
              <span>李建国</span>
            </div>
          </div>
          <div class="alert-msg" @click="showMsgModel">
            <i class="el-icon-bell"></i>
          </div>
          <div class="exit-btn">
            <a href="/#/login">退出</a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'FirstMapHead',
      data(){
          return{
            tabs:['一张图','用水分析','用水节水','巡查管理','管网管理'],
            tabIndex:0,
            showTree:false , // 一张图
            rightTabs:['应急管理','物资系统','数据管理','系统配置'],
            rightTabIndex:null, //右侧的 tab
          };
      },
      methods:{
        tabThis(index){
          let that = this;
          this.rightTabIndex = null;
          this.tabIndex = index;
          switch (index) {
            case 0:
              this.showTree = !this.showTree;
              this.$emit('showTree',that.showTree);
              break;
            case 1:

              break;
            case 2:
              window.location.href = window.DSE.baseURL+'?id=FarmingDrinkingWater';
              break;
            case 3:
              window.location.href = window.DSE.baseURL+'?id=FarmingDrinkingRouting';
              break;
            case 4:
              window.location.href = window.DSE.baseURL+'?id=FarmingDrinkingPipe';
              break;
          }

        },
        rightTabThis(index){
          this.tabIndex = null;
          this.rightTabIndex = index;
          switch (index) {
            case 0:
              window.location.href=window.DSE.baseURL+'?id=FarmingDrinkingEmergency';
              break;
            case 1:
              window.location.href=window.DSE.baseURL+'?id=FarmingDrinkingMaterial';
              break;
            case 2:
              window.location.href = window.DSE.baseURL+'?id=FarmingDrinkingData';
              break;
            case 3:
              window.location.href = window.DSE.baseURL+'?id=FarmingDrinkingSystem';
              break;
          }
        },
        showMsgModel(){
          this.$emit('showMsgModel',true);
        }
      }
    };
</script>

<style scoped lang="scss">
#FirstMapHead{
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;

  .trans{
    transition: all 0.5s linear;
    &.bottom{
      transform: rotate(90deg);
    }
  }

  .bg-title{
    width: 100%;
    .short-line{
      width: 100%;
      height: 12px;
      background: #0690f8;
    }
    .project-title{
      position: absolute;
      left: 50%;
      top: 0;
      margin-left: -225px;
      width: 450px;
      height: 50px;
      text-align: center;
      background: url("../../assets/images/common/logo_bg.png") no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 24px;
      font-weight: 600;
      img{
        width: 30px;
        margin-right: 5px;
      }
    }
  }
  .sub-tabs{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255,255,255,0.5);
    .left,.right{
      width: 50%;
      height: 100%;
      padding: 20px;
      .tab-item{
        width: 70px;
        @media screen and (min-width: 1600px){
          margin-right: 20px;
        }
        @media screen  and (min-width: 960px) and (max-width: 1600px){
          margin-right: 5px;
        }

        border: 1px solid  rgba(153, 153, 153, 0.48);
        border-radius: 20px;
        padding: 5px;
        background: #fff;
        color: #333;
        font-size: 12px;
        text-align: center;
        cursor: pointer;
        font-weight: 600;
        &.actived,&.rightActived{
          border: 1px solid #0690f8;
          color: #0690f8;
        }

      }
      .user{
        width: 140px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .bg-logo{
          width: 40px;
          height: 40px;
          img{
            width: 40px;
            height: 40px;
          }
        }
        .user-count{
          width: calc(100% - 45px);
          span{
            display: inline-block;
            width: 100%;
          }
        }
      }
      .alert-msg {
        width: 50px;
        text-align: center;
        font-size: 30px;
        cursor: pointer;
        &:hover{
          color: #0690f8;
        }
      }
      .exit-btn{
        &:hover{
          a{
            color: #0690f8;
          }
        }
      }
    }
    .left{
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .right{
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
