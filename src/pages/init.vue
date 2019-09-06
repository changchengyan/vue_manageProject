<template>
    <div id="init">
        <div class="stage">
            <div class="dot-pulse"></div>
        </div>
        <div class="tips">数据加载中...</div>
    </div>
</template>

<script>

    import {mapMutations} from 'vuex';
    import {getAreaList} from '../api/interfaces/common_api';
    import {getAlarmUrl, getRealTimeWarnList} from '../api/interfaces/oneMap_api';

    export default {
        name: 'init',
        data() {
            return {};
        },
        methods: {
            ...mapMutations({
                'set_menuList': 'set_menuList',
                'set_companyName': 'set_companyName',
                'set_companyId': 'set_companyId',
                'set_userName': 'set_userName',
                'set_userId': 'set_userId',
                'set_deptName': 'set_deptName',
                'set_deptId': 'set_deptId',
                'set_tel': 'set_tel',
                'set_btnsIds': 'set_btnsIds',
                'set_cityPosition': 'set_cityPosition',
                'set_orgTree': 'set_orgTree',
                'set_filePath': 'set_filePath',
                'set_cityAreas': 'set_cityAreas',
                'set_warningList':'set_warningList'
            }),
            btns_allowed(arr) {

            },
            setSession() {
                // let that = this;
                // getSessionUser(that).then(res => {
                //
                //     let temp_session = JSON.stringify(res);
                //     sessionStorage.setItem('user_info',temp_session);
                //
                //     that.set_companyId(res.organizationIds?res.organizationIds[0]:'');
                //     that.set_companyName(res.organizationName);
                //     that.set_userName(res.name);
                //     that.set_userId(res.id);
                //     that.set_deptName(res.departmentName);
                //     that.set_deptId(res.mainDepartmentIds?res.mainDepartmentIds[0]:'');
                //     that.set_tel(res.mobile);
                //     that.set_btnsIds(res.resourceIds);
                //
                //     let temp_arr = res.positions&&res.positions[0] ? res.positions[0].split(',') : [];
                //     if (temp_arr.length > 0) {
                //         temp_arr[0] = parseFloat(temp_arr[0]);
                //         temp_arr[1] = parseFloat(temp_arr[1]);
                //     } else {
                //         temp_arr = [106.290351, 36.001819];
                //     }
                //     that.set_cityPosition(temp_arr);
                //     if(res.organizationIds&&res.organizationIds[0]){
                //         that.getOrgTree_(res.organizationIds[0]);
                //         that.getOrganDictTree_(res.organizationIds[0]);
                //     }
                // });
            },
            getRouters() {

            },
            getFilePathUrl_() {

            },
            getOrgTree_(id) {

            },
            getOrganDictTree_(id) {

            },
            // 获取工单类型的字典
            getDictByPCode_order() {

            },
            // 获取材质的字典
            getDictByPCode_material() {

            },
            // 获取口径的 字典
            getDictByPCode_radius() {

            },
            // 获取 接口的字典
            getDictByPCode_interface() {

            },
            // 获取 紧急程度的 字典
            getDictByPCode_proLev() {

            },
            // 获取报警 音频列表前缀
            getAlarmUrl_(){
                let that  = this;
              let result =  new Promise((resolve,reject)=>{
                  getAlarmUrl({
                      tm:''
                  },that).then(res=>{
                    resolve(res.data.voiceUrl);
                  });
              }) ;

              return result;
            },
            // 报警 列表
            getWarnList_() {
                let that = this;
                let result = new Promise((resolve ,reject)=>{
                    getRealTimeWarnList({tm:''},that).then(res=>{
                        let {data} = res;
                        data = data && data.length>0?data:[];
                        // that.warnList  = [...list];
                        resolve(data);
                    });
                });
                return result;
            },
            // 获取分区的列表
            getAreaList_() {
                let that = this;
                let result =  new Promise((resolve,reject)=>{
                  getAreaList({
                      list: [1,2]
                  }, that).then(res => {
                      let {data} = res;
                      data = data && data.length > 0 ? data : [];

                      let list = [];

                      data.map(val => {
                          list.push({
                              label: val.name,
                              value: val.code
                          });
                      });
                      that.set_cityAreas(list);
                      resolve(list);
                  });
              });
              return result;
            }
        },
        created() {
            // this.setSession();
            let that = this;
            Promise.all([that.getAreaList_(),that.getAlarmUrl_(),that.getWarnList_()]).then(res=>{
                let path = res[1];
                let list = [...res[2]];
                list.map(val=>{
                    val.voiceUrl = path+val.voiceUrl;
                });
                console.log(res);
                that.set_warningList([...list]);

                that.$router.push({
                    path: '/mainContent'
                });
            });
        }
    };
</script>

<style lang="scss" scoped>
    @keyframes dotPulse {
        0% {
            box-shadow: 9964px 0 0 -10px #0b83ff, 9999px 0 0 0 #0b83ff, 10044px 0 0 2px #0b83ff
        }

        25% {
            box-shadow: 9964px 0 0 0 #0b83ff, 9999px 0 0 2px #0b83ff, 10044px 0 0 0 #0b83ff
        }

        50% {
            box-shadow: 9964px 0 0 2px #0b83ff, 9999px 0 0 0 #0b83ff, 10044px 0 0 -10px #0b83ff
        }

        75% {
            box-shadow: 9964px 0 0 0 #0b83ff, 9999px 0 0 -10px #0b83ff, 10044px 0 0 0 #0b83ff
        }

        100% {
            box-shadow: 9964px 0 0 -10px #0b83ff, 9999px 0 0 0 #0b83ff, 10044px 0 0 2px #0b83ff
        }
    }

    #init {
        width: 100%;
        height: 100%;
        position: relative;

        .stage {
            width: 200px;
            height: 100px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -50px;
            margin-left: -100px;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;

            .dot-pulse {
                position: relative;
                left: -9999px;
                width: 20px;
                height: 20px;
                border-radius: 10px;
                background-color: #0b83ff;
                color: #0b83ff;
                box-shadow: 9964px 0 0 0 #0b83ff, 9999px 0 0 0 #0b83ff, 10044px 0 0 0 #0b83ff;
                animation: dotPulse 1.5s infinite linear;
            }
        }

        .tips {
            width: 100px;
            height: 20px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: 30px;
            margin-left: -40px;
        }

    }
</style>
