<template>
    <div id="addBase">
        <div class="top-actions">
            <div class="back"><span class="go-back" @click="goback">返回</span></div>
        </div>
        <div class="wraper">

            <div class="config">
                <div class="top-head">
                    <span>服务器配置</span>
                </div>
                <div class="form-data">
                    <el-form :inline='true' ref="form" :model="updateOrSave" :rules='rules' label-width="150px">
                        <el-form-item label='服务器名称:' prop='serveName'>
                            <el-input  v-model='updateOrSave.serveName' placeholder='服务器名称'></el-input>
                        </el-form-item>
                        <el-form-item label='类型:' prop='serveType'>
                            <el-select v-model="updateOrSave.serveType" placeholder="请选择服务器类型">
                                <el-option
                                        v-for="item in serviceTypeList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label='服务器IP:' prop='serveIp'>
                            <el-input  v-model='updateOrSave.serveIp' placeholder='服务器IP'></el-input>
                        </el-form-item>
                        <el-form-item label='服务器端口:' prop='servePost'>
                            <el-input  v-model='updateOrSave.servePost' placeholder='服务器端口'></el-input>
                        </el-form-item>
                        <el-form-item label='服务器用户名:' prop="serveUser">
                            <el-input  v-model='updateOrSave.serveUser' placeholder='服务器用户名'></el-input>
                        </el-form-item>
                        <el-form-item label='服务器用户密码:' prop="servePwd">
                            <el-input  v-model='updateOrSave.servePwd' placeholder='服务器用户密码'></el-input>
                        </el-form-item>
                        <el-form-item label='备注:' prop="remark" class="long-text">
                            <textarea v-model='updateOrSave.remark'  cols="30" rows="10" placeholder='备注'></textarea>
                        </el-form-item>
                    </el-form>
                </div>


            </div>
            <div class="config">
                <div class="top-head">
                    <span>视频点配置</span>
                    <span class="add-video-btn" @click="addVideoItem">新增视频</span>
                </div>
                <div class="form-data">
                    <el-form :inline='true' ref="form" :model="updateOrSave" :rules='rules' label-width="150px">
                        <template v-for="(v,i) in updateOrSave.videoList">
                            <el-form-item  :key="'videoName'+i" label='视频点名称:' prop='videoName'>
                                <el-input  v-model='v.videoName' placeholder='视频点名称'></el-input>
                            </el-form-item>
                            <el-form-item  :key="'videoChannel'+i" label='视频通道:' prop='videoChannel'>
                                <el-input  v-model='v.videoChannel' placeholder='视频通道'></el-input>
                            </el-form-item>
                            <el-form-item  :key="'videoPost'+i" label='视频端口:' prop='videoPost'>
                                <el-input  v-model='v.videoPost' placeholder='视频端口'></el-input>
                            </el-form-item>
                            <el-form-item  :key="'videoIp'+i" label='视频IP:' prop='videoIp'>
                                <el-input  v-model='v.videoIp' placeholder='视频IP'></el-input>
                            </el-form-item>
                        </template>

                    </el-form>
                </div>


            </div>
            <div class="actions">
                <!-- <span class="save" @click="saveConfigData">保存</span> -->
                <span class="save" @click="onHandleUpdateMonitor">保存</span>
                <span class="cancel" @click="goBack_">取消</span>
            </div>
            <dse-save-status :showModel="ifShowModel" :content="fetchContent"  :type="modelType" :flag="status"  />
        </div>
    </div>
</template>

<script>
    import DseSaveStatus from '../../../common/components/toast/dseSaveStatus';
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
            'digits':{param:30,msg:'您输入的数字有误'}
        });
        if (!vdt.result) {
            callBack(new Error(vdt.msg));
        } else {
            callBack();
        }
    }

    function isIp(rule,val,callBack) {
        let vdt = VDATA(val, {
            'ip':{param:30,msg:'您输入的IP有误'}
        });
        if (!vdt.result) {
            callBack(new Error(vdt.msg));
        } else {
            callBack();
        }
    }

    function limitLongStr(rule,val,callBack) {
        let vdt = VDATA(val, {
            'maxlength':{param:100,msg:'您输入的字符超过30个'}
        });
        if (!vdt.result) {
            callBack(new Error(vdt.msg));
        } else {
            callBack();
        }
    }

    export default {
        name: 'videoConfig',
        components: {DseSaveStatus},
        data(){
            return{
                modelType:false,
                status:false,
                ifShowModel:false,
                fetchContent:'', //保存成功的 提示语
                updateOrSave:{
                    serveName:'',
                    serveType:'',
                    serveIp:'',
                    servePost:'',
                    serveUser:'',
                    servePwd:'',
                    remark:'',
                    videoList:[
                        {
                            videoName:'',
                            videoChannel:'',
                            videoPost:'',
                            videoIp:''
                        }
                    ]
                },
                rules:{
                    serveName:[
                        {
                            validator:limitStr,
                            required:true,
                            trigger: 'blur'
                        }
                    ],
                    servePost:[
                        {
                            validator:isNumber,
                            required:true,
                            trigger: 'blur'
                        }
                    ],
                    serveIp:[
                        {
                            validator:isIp,
                            required:true,
                            trigger: 'blur'
                        }
                    ],
                    servePwd:[
                        {
                            required:true,
                            trigger: 'blur'
                        }
                    ],
                    serveUser:[
                        {
                            required:true,
                            trigger: 'blur'
                        }
                    ],
                    serveType:[
                        {
                            required:true,
                            trigger: 'blur'
                        }
                    ],
                    remark:[
                        {
                            validator:limitLongStr,
                            trigger: 'blur'
                        }
                    ],
                    videoName:[
                        {
                            validator:limitStr,
                            required:true,
                            trigger: 'blur'
                        }
                    ],
                    videoChannel:[
                        {
                            required:true,
                            trigger: 'blur'
                        }
                    ],
                    videoPost:[
                        {
                            validator:isNumber,
                            required:true,
                            trigger: 'blur'
                        }
                    ],
                    videoIp:[
                        {
                            validator:isIp,
                            required:true,
                            trigger: 'blur'
                        }
                    ]
                },
                // 服务器 类型列表
                serviceTypeList:[],
            };
        },
        methods:{
            goback() {
                this.$router.push({
                    name: 'systemMonitor'
                });
                this.$emit('showAside');
            },
            onHandleUpdateMonitor(){

            },
            goBack_(){
                this.goback();
            },
            addVideoItem(){
                this.updateOrSave.videoList.push({
                    videoName:'',
                    videoChannel:'',
                    videoPost:'',
                    videoIp:''
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    #addBase {
        position: relative;
        width: 100%;
        height: 100%;
        font-size: 14px;
        color: #333;
        background-color: #fff;
        i {
            color: red;
        }
        .top-actions {
            position: relative;
            width: 100%;
            height: 50px;
            padding: 10px 10px;
            box-shadow: 3px 5px 15px rgba(0, 0, 0, 0.1);
            background-color: #fff;

            .back {
                width: 80px;
                height: 30px;
                position: absolute;
                top: 10px;
                right: 10px;
                z-index: 10;
                text-align: center;
            }
        }


        .wraper {
            width: 1200px;
            height: calc(100% - 50px);
            padding: 10px;
            margin: 0 auto;
            .top-head{
                position: relative;
                span{
                    display: inline-block;
                    font-size: 16px;
                    font-weight: 600;
                    &.add-video-btn{
                        font-size: 12px;
                        color: #fff;
                        width: 70px;
                        text-align: center;
                        line-height: 30px;
                        background: #0b83fe;
                        cursor: pointer;
                        position: absolute;
                        top: 6px;
                        right: 20px;
                    }
                }
            }
            .config{
                width: 100%;

                .form-data{
                    .el-form--inline .el-form-item{
                        width: calc(50% - 30px);
                        &.long-text{
                            width: 100%;
                            textarea{
                                resize: none;
                                width: 400px;
                                border: 1px solid #e9e9e9;
                            }
                        }
                    }

                }
            }


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
    }
</style>
