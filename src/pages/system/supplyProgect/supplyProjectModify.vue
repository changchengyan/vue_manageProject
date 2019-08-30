<template>
    <div id="supplyProjectModifyt">
        <!-- <div class="top-actions">
            <div class="back"><span class="go-back" @click="goback">返回</span></div>
        </div> -->
        <div class="wraper">

            <div class="form-data">

                <el-form :inline="true" ref="form" :model="formData" :rules="rules" label-width="150px">
                    <el-form-item label="工程代码:" prop="cwsCd">
                        <el-input  :disabled="formData.ifEdit" v-model="formData.cwsCd" placeholder="供水工程代码" @blur="getCodeValid"></el-input>
                    </el-form-item>
                    <el-form-item label="运行状况:" prop="runCond">
                        <el-select v-model="formData.runCond" placeholder="运行状况">
                            <el-option
                                    v-for="item in statusList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工程名称:" prop="cwsNm">
                        <el-input v-model="formData.cwsNm" placeholder="工程名称"></el-input>
                    </el-form-item>
                    <el-form-item label="供水日规模:" prop="desWsScal">
                        <el-input v-model="formData.desWsScal" placeholder="供水日规模"></el-input>
                    </el-form-item>
                    <el-form-item label="工程类型:" prop="cwsTp">
                        <el-select v-model="formData.cwsTp" placeholder="工程类型">
                            <el-option
                                    v-for="item in projectList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="设计供水人口:" prop="desWsPp">
                        <el-input v-model="formData.desWsPp" placeholder="设计供水人口"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="卫生许可证编号:" prop="sanLicSn">-->
<!--                        <el-input v-model="formData.sanLicSn" placeholder="卫生许可证编号"></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="所属分区:" prop="adcd">
                        <el-select v-model="formData.adcd" placeholder="所属分区">
                            <el-option
                                    v-for="item in areaList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="供水范围:" prop="wsReg">
                        <el-input v-model="formData.wsReg" placeholder="供水范围"></el-input>
                    </el-form-item>
                    <el-form-item label="管理单位:" prop="engMan">
                        <el-input v-model="formData.engMan" placeholder="管理单位"></el-input>
                    </el-form-item>
                    <el-form-item label="受益行政村数量:" prop="benVilNum">
                        <el-input v-model="formData.benVilNum" placeholder="收益行政村数量"></el-input>
                    </el-form-item>
                    <el-form-item label="收费形式:" prop="chargForm">
                        <el-select v-model="formData.chargForm" placeholder="收费形式">
                            <el-option
                                    v-for="item in chargFormList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="备注:"  class="long-text">
                        <el-input  v-model="formData.nt"  type="textarea" :rows="5" placeholder="备注"></el-input>
                    </el-form-item>


                </el-form>

            </div>

            <div class="actions">
                <!-- <span class="save" @click="saveConfigData">保存</span> -->
                <span class="save" @click="onHandleUpdateMonitor">保存</span>
                <span class="cancel" @click="goBack_">取消</span>
            </div>
            <dse-save-status :showModel="confirm.ifShowModel" :content="confirm.fetchContent" :type="confirm.modelType" :flag="confirm.status"  />
        </div>
    </div>
</template>

<script>
    import DseSaveStatus from '../../../common/components/toast/dseSaveStatus';

    import {getAreaList} from '../../../api/interfaces/common_api';
    import {saveOrUpWrCwsB, supplyWaterCheckExist} from '../../../api/interfaces/system_api';
    import {VDATA} from '../../../utils/el_validater';


    function limitStr(rule,val,callBack) {
        let vdt = VDATA(val, {
            'maxlength':{param:30,msg:'您输入的字符超过30个'}
        });
        if (!vdt.result) {
            callBack(new Error(vdt.msg));
        } else {
            callBack();
        }
    }

    function isNumber(rule,val,callBack) {
        let vdt = VDATA(val, {
            'number':{msg:'您输入的数字有误'}
        });
        if (!vdt.result) {
            callBack(new Error(vdt.msg));
        } else {
            callBack();
        }
    }

    function isDigits(rule,val,callBack) {
        let vdt = VDATA(val, {
                'digits':{msg:'您输入的不是整数'}
            }
            );
        if (!vdt.result) {
            callBack(new Error(vdt.msg));
        } else {
            callBack();
        }
    }

    //限制 最大整数
    function isDigitsAndRange(rule,val,callBack) {
        let vdt = VDATA(val, {
                'digits':{msg:'您输入的不是整数'},
                'range':{param:[0,999],msg:'请输入小于999的整数!'}
            }
        );
        if (!vdt.result) {
            callBack(new Error(vdt.msg));
        } else {
            callBack();
        }
    }


    function notHan(rule,val,callBack) {
        let vdt = VDATA(val, {
            'notHan':{msg:'请输入字母或者数字!'}
        });
        if (!vdt.result) {
            callBack(new Error(vdt.msg));
        } else {
            callBack();
        }
    }


    export default {
        name: 'supplyProjectModify',
        components: {DseSaveStatus},
        data(){
            return{
                confirm:{
                    ifShowModel:false,
                    modelType:true,
                    status:false,
                    fetchContent:''
                },
                rules:{
                    cwsCd: [
                        {
                            validator:notHan,
                            required:true,
                            trigger: 'blur'
                        }
                    ],
                    cwsNm: [
                        {
                            validator:limitStr,
                            required:true,
                            trigger: 'blur'
                        }
                    ],
                    cwsTp: [
                        {
                            required:true,
                            trigger: 'blur'
                        }
                    ],
                    desWsScal:[
                        {
                            validator:isNumber,
                            trigger: 'blur'
                        }
                    ],
                    desWsPp:[
                        {
                            validator:isDigits,
                            trigger: 'blur'
                        }
                    ],
                    sanLicSn: [
                        {
                            trigger: 'blur'
                        }
                    ],
                    adcd: [
                        {
                            required:true,
                            trigger: 'blur'
                        }
                    ],
                    wsReg: [
                        {
                            trigger: 'blur'
                        }
                    ],
                    benVilNum:[
                        {
                            validator:isDigitsAndRange,
                            trigger: 'blur'
                        }
                    ],
                    chargForm: [
                        {
                            required:true,
                            trigger: 'blur'
                        }
                    ],
                    runCond: [
                        {
                            required:true,
                            trigger: 'blur'
                        }
                    ],
                    engMan: [
                        {
                            required:true,
                            trigger: 'blur'
                        }
                    ]
                },
                // ts: '',
                formData:{
                    cwsCd: '',
                    cwsNm: '',
                    cwsTp: '',
                    desWsScal: 0,
                    desWsPp: 0,
                    sanLicSn: '',
                    adcd: '',
                    wsReg: '',
                    benVilNum: 0,
                    chargForm: '',
                    runCond: '',
                    engMan: '',
                    nt: ''
                },
                areaList:[],
                projectList:[
                    {
                        label:'集中式Ⅰ型',
                        value:'1'
                    },
                    {
                        label:'集中式Ⅱ型',
                        value:'2'
                    },
                    {
                        label:'集中式Ⅲ型',
                        value:'3'
                    },
                    {
                        label:'集中式Ⅳ型',
                        value:'4'
                    },
                    {
                        label:'集中式Ⅴ型',
                        value:'5'
                    },
                    {
                        label:'分散式',
                        value:'6'
                    }
                ],
                statusList:[
                    {
                        label:'启用',
                        value:'1'
                    },
                    {
                        label:'关闭',
                        value:'0'
                    }
                ],
                chargFormList:[
                    {
                        label:'计量收费',
                        value:'1'
                    },
                    {
                        label:'固定收费',
                        value:'2'
                    },
                    {
                        label:'混合方式',
                        value:'3'
                    },
                    {
                        label:'不收费',
                        value:'4'
                    },
                ]
            };
        },
        methods:{
            goback(){
                this.$router.go(-1);
                this.$emit('showAside',true);
            },
            onHandleUpdateMonitor(){
                let that = this;
                that.$refs.form.validate((valid) => {
                    if (valid) {
                        that.saveOrUpWrCwsB_();
                    } else {
                        that.$message.error('您输入的内容有误');
                        return false;
                    }
                });
            },
            goBack_(){
                this.goback();
            },
            saveOrUpWrCwsB_(){
                let that = this;
                let params = this.formData;
                saveOrUpWrCwsB(params,that).then(res=>{
                    let {status,msg} = res;
                    that.confirm.status = status==1;
                    that.confirm.fetchContent = msg;
                    that.confirm.ifShowModel = true;
                    if(status==1){
                        setTimeout(()=>{
                            that.$router.go(-1);
                            that.$emit('showAside',true);
                        },2500);
                    }
                });
            },
            // 判断当前的 编码是否有效
            getCodeValid(val){
                let that = this;
                supplyWaterCheckExist({
                    wfctCd: that.formData.cwsCd
                },that).then(res=>{
                    let {status} = res;
                    if(status!=1){
                        that.formData.cwsCd = '';
                        that.$message.error('编码无效,请重新填写');
                    }

                });

            },
            // 获取分区的列表
            getAreaList_() {
                let that = this;
                  getAreaList({
                      list: [2]
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

                     that.areaList = list;
                  });
            }
        },
        created() {
           this.getAreaList_();
            this.formData ={
              ...this.formData,
              ...this.$route.params
            };

        }
    };
</script>

<style scoped lang="scss">
#supplyProjectModifyt{
    width: 100%;

    /deep/ .el-textarea{
        width: 750px;
    }

    .wraper {
        width: 1200px;
        height: calc(100% - 50px);
        padding: 32px 10px;
        margin: 0 auto;

        .form-data{
            width: 100%;
            .el-form--inline .el-form-item{
                width: calc(50% - 30px);

                &.long-text{
                    width: 100%;
                    textarea{
                        resize: none;
                        width: 800px;
                        border: 1px solid #e9e9e9;
                    }
                }
            }

        }
    }

//     .top-actions {
//         position: relative;
//         width: 100%;
//         height: 50px;
//         padding: 10px 10px;
//         box-shadow: 3px 5px 15px rgba(0, 0, 0, 0.1);
//         background-color: #fff;
//
//         .back {
//             width: 80px;
//             height: 30px;
//             position: absolute;
//             top: 10px;
//             right: 10px;
//             z-index: 10;
//             text-align: center;
//         }
//     }



    .actions {
        height: 50px;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            cursor: pointer;
            background: #2a91db;
            color: #fff;
            margin-right: 20px;
        }
    }
}
</style>
