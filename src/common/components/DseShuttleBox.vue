<template>
<div id="shuttleBox">
    <div class="cards">
        <div class="left-card">
            <div class="title">部门人员列表</div>
            <div class="search-wrap">
                <input type="text" placeholder="请输入人员" v-model="org.left_name">
                <div class="btn-search" @click="searchSomething_left">搜索</div>
            </div>
            <!-- :checked="org.left_all?'checked':''" -->
            <div class="selected-all">
                <span class="select-img" :class="{selected:org.selectedAllStuff_left}" @click="AllStuff_left"></span>
                <input type="checkbox" :value="org.depts_left"  v-model="org.get_allDept_left" @click="AllStuff_left">
                <span class="dept-name">全选</span>
            </div>
            <div class="wrap-lists" >
                <template  v-if="org.depts_left.length">
                    <div class="dept" v-for="(dept,index) in org.depts_left" :key="index">
                        <div class="top-dept">
                            <div class="left">
                                <span class="select-img" :class="{selected:dept.action}"></span>
                                <input type="checkbox" :value="dept" v-model="org.get_oneDept_left" @change="selectedAll_stuff_left($event,index,dept)">
                            </div>
                            <div class="right">
                                <span class="dept-name">{{dept.NAME}}</span>
                                <i class="el-icon-arrow-right" :class="{selected:dept.showSub}" @click="show_subStuff_left(index)"></i>
                            </div>
                        </div>
                        <template v-if="dept.showSub">
                             <div class="dept-subStuff" v-for="(item,idx) in dept.children"  :key="idx">
                                <input type="checkbox" :value="item" v-model="org.oneStuff_left" @change="selectedThis_stuff_left($event,index,idx,dept.ID,dept.NAME,item)">
                                <span class="select-img" :class="{selected:item.action}"></span>
                                <span class="dept-name">{{item.NAME}}</span>
                                <span class="phoneNums">{{item.TELEPHONE}}</span>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
        </div>
        <div class="middel-actions">
            <div class="right-action" :class="{actived:org.toRight.length!=0}" @click="selected_list_right">
                <i class="el-icon-arrow-right"></i>
            </div>
            <div class="left-action" :class="{actived:org.toLeft.length!=0}" @click="cancel_list_left">
                <i class="el-icon-arrow-left"></i>
            </div>
        </div>
        <div class="right-card">
            <div class="title">已选人员</div>
            <div class="search-wrap">
                <input type="text" placeholder="请输入人员" v-model="org.right_name">
                <div class="btn-search" @click="searchSomething_right">搜索</div>
            </div>
            <!-- :checked="org.right_all?'checked':''" -->
            <div class="selected-all">
                <input type="checkbox" :value="org.depts_right"  v-model="org.get_allDept_right" @click="AllStuff_right">
                <span class="select-img" :class="{selected:org.selectedAllStuff_right}"></span>
                <span class="dept-name">全选</span>
            </div>
            <div class="wrap-lists">
                <template v-if="org.depts_right.length>0">
                     <div class="dept" v-for="(dept,index) in org.depts_right"  :key="index">
                        <div class="top-dept">
                            <div class="left">
                                <input type="checkbox" :value="dept" v-model="org.get_oneDept_right" @change="selectedAll_stuff_right($event,index,dept)">
                                <span class="select-img" :class="{selected:dept.action}"></span>
                            </div>
                            <div class="right">
                                <span class="dept-name">{{dept.NAME}}</span>
                                <i class="el-icon-arrow-right" :class="{selected:dept.showSub}" @click="show_subStuff_right(index)"></i>
                            </div>
                        </div>
                        <template v-if="dept.showSub">
                              <div class="dept-subStuff" v-for="(item,idx) in dept.children"  :key="idx">
                                <input type="checkbox" :value="item" v-model="org.oneStuff_right" @change="selectedThis_stuff_right($event,index,idx,dept.ID,dept.NAME,item)">
                                <span class="select-img" :class="{selected:item.action}"></span>
                                <span class="dept-name">{{item.NAME}}</span>
                                <span class="phone">{{item.TELEPHONE}}</span>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </div>
</div>
</template>

<script>
/**
 *  该穿梭框 适用于 具有二级列表 同时具有 配置增减服务端已配置的人员功能  已经格式化完成 需要传入 配对字段
 * 传值 示例
 *  [{
        NAME: "安全部",
        ID: "1",
        action: false,
        showSub: true,
        children: [{
                NAME: "老王",
                TELEPHONE: "11111111111",
                action: false,
                ID: "11"
            },
            {
                NAME: "老刘",
                TELEPHONE: "22222222222",
                action: false,
                ID: "12"
            },
            {
                NAME: "老铁",
                TELEPHONE: "33333333333",
                action: false,
                ID: "13"
            }
        ]
    }]
 *
 *
 *   类似 样子
 *
 *         _   ____________________                    __   ___________________
 *        |_| |___________________| 搜索               |_| |___________________| 搜索
 *          _                                          _
 *         |_| XXXXXXXX                               |_| XXXXXXXX
 *          _                                          _
 *         |_| XXXXXXXX                <<              |_| XXXXXXXX
 *                                     >>
 *          _                                           _
 *         |_| XXXXXXXX                                |_| XXXXXXXX
 *
 *
 */

export default {
    // props: ['defaultWorkers'],
    props:{
        defaultWorkers:{
            type:Array,
            defaultProps:[]
        },
        props:{
            type:Object,
            defaultProps: {
                ID:'ID',
                children:'children'
            }
        }
    },
    name:'dse-shuttleBox',
    data() {
        return {
            selectMsg: '',
            type: '水位差',
            showSub: true,
            recordOrgLength: 1,
            temp_num: 1,
            dept: '', //部门名字
            org: {
                selectedAllStuff_left: false,
                selectedAllStuff_right: false,
                search_hiddenAll_left: false,
                search_hiddenAll_right: false,

                left_all: false,
                depts_left: [], //需要显示的 左侧部门列表
                temp_depts_left: [],
                get_allDept_left: [],
                get_oneDept_left: [],
                get_oneStuff_left: [],
                right_all: false,
                depts_right: [], // 已经选中的到右侧的列表
                temp_depts_right: [],
                get_allDept_right: [],
                get_oneDept_right: [],
                get_oneStuff_right: [],
                toLeft: [],
                toRight: [],
                remove_dept_index: '', //缓存删除的部门
                left_name: '', //左侧的搜索结果
                right_name: '' // 右侧的搜索结果
            },
            name: ''
        };
    },
    methods: {
        removeCommen: function (arr) { // 单个数组去重
            let temp_arr = arr;
            let res = [arr[0]];
            for (let i = 0; i < temp_arr.length; i++) {
                let repeat = false;
                for (let j = 0; j < res.length; j++) {
                    if (temp_arr[i].ID == res[j].ID) {
                        repeat = true;
                        break;
                    }
                }
                if (!repeat) {
                    res.push(temp_arr[i]);
                }
            }
            return res;
        },
        removeCommen2: function (arr) { // 单个数组去重
            let temp_arr = arr;
            let res = [arr[0]];
            for (let i = 0; i < temp_arr.length; i++) {
                let repeat = false;
                for (let j = 0; j < res.length; j++) {
                    if (temp_arr[i] == res[j]) {
                        repeat = true;
                        break;
                    }
                }
                if (!repeat) {
                    res.push(temp_arr[i]);
                }
            }
            return res;
        },
        towArr_removeCommon: function (arr) { //两个数组 取 补集
            let temp_arr = arr;
            let delArr = [];
            if (temp_arr.length > 0) {
                for (let i = 0; i < temp_arr.length; i++) {
                    for (let j = 0; j < temp_arr[i].children.length; j++) {
                        if (temp_arr[i].children[j].MSGID) {
                            delArr.push({
                                'id': '' + temp_arr[i].children[j].MSGID
                            });
                        }
                    }

                }
            }
            return delArr;
        },
        resetAll: function (arr) {
            let temp = arr;
            let temp_flag = false;
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].action == true) {
                    temp_flag = true;
                    continue;
                } else {
                    temp_flag = false;
                    break;
                }
            }

            return temp_flag;
        },
        resetDepts: function (obj, all_or_cancelAll) { //重置部门 选择下的  所有员工的状态
            let temp = obj;
            if (all_or_cancelAll == true) {
                for (let k = 0; k < obj.children.length; k++) {
                    temp.children[k].action = true;
                }
            } else {
                for (let k = 0; k < obj.children.length; k++) {
                    temp.children[k].action = false;
                }
            }
            return temp;
        },
        reset_stuff: function (obj) {
            let flag = false;
            for (let k = 0; k < obj.children.length; k++) {
                if (obj.children[k].action == true) {
                    flag = true;
                    continue;
                } else {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        resetSelectedAll: function (arr, flag) {
            let temp = arr;
            if (flag) {
                for (let i = 0; i < temp.length; i++) {
                    temp[i].action = true;
                    temp[i].showSub = true;
                    for (let k = 0; k < temp[i].children.length; k++) {
                        temp[i].children[k].action = true;
                    }
                }
            } else {
                for (let i = 0; i < temp.length; i++) {
                    temp[i].action = false;
                    temp[i].showSub = false;
                    for (let k = 0; k < temp[i].children.length; k++) {
                        temp[i].children[k].action = false;
                    }
                }

            }

            return temp;

        }, //重置所有部门 所有员工
        resetSelectedAll2: function (arr) {
            let temp = arr;
            for (let i = 0; i < temp.length; i++) {
                temp[i].action = false;
                // temp[i].showSub=true;
                for (let k = 0; k < temp[i].children.length; k++) {
                    temp[i].children[k].action = false;
                }
            }

            return temp;

        }, //重置所有部门 所有员工

        AllStuff_left: function () {
            let that = this;
            let temp_checkBox_flag = !this.org.left_all;
            this.org.selectedAllStuff_left = !this.org.selectedAllStuff_left;
            let temp_flag = this.org.selectedAllStuff_left;
            this.org.depts_left = this.resetSelectedAll(that.org.depts_left, temp_flag);
            if (temp_checkBox_flag) {
                this.org.toRight =[...this.org.depts_left];
                // this.org.selectedAllStuff_right=true;
            } else {
                this.org.toRight = [];
                // this.org.selectedAllStuff_right=false;
            }
        }, //左侧 选择所有部门、并选择所有员工
        selectedAll_stuff_left: function (event, index, dept) {
            let that = this;
            this.org.depts_left[index].action = !this.org.depts_left[index].action;

            //判断是否当前是否全部本门都选中  若选中则选上全选
            let all_flag = this.resetAll(that.org.depts_left);
            if (all_flag) {
                this.org.selectedAllStuff_left = true;
            } else {
                this.org.selectedAllStuff_left = false;
            }

            //判断是否当前是否本部门选中  若选中则该该部门人员全选
            let temp_flag = this.org.depts_left[index].action;
            if (temp_flag) {
                this.org.depts_left[index].showSub = true;
            } else {
                this.org.depts_left[index].showSub = false;
            }
            this.org.depts_left[index] = this.resetDepts(that.org.depts_left[index], temp_flag);

            //添加该部门人员到按钮中
            let temp_toRight = this.org.toRight;
            if (temp_flag) {
                this.org.get_oneDept_left = [dept];
                if (temp_toRight.length > 0) {
                    let temp_repeat = true;
                    for (let i = 0; i < temp_toRight.length; i++) {
                        if (temp_toRight[i].ID == dept.ID) {
                            temp_repeat = false;
                            temp_toRight[i].children = [...dept.children];
                            break;
                        }
                    }
                    if (temp_repeat) {
                        temp_toRight = temp_toRight.concat(this.org.get_oneDept_left);
                    }

                } else {
                    temp_toRight = this.org.get_oneDept_left;
                }
                // that.org.selectedAllStuff_right=true
            } else {
                this.org.get_oneDept_left = [];
                if (temp_toRight.length) {
                    for (let i = 0; i < temp_toRight.length; i++) {
                        if (temp_toRight[i].ID == dept.ID) {
                            temp_toRight.splice(i, 1);
                            break;
                        }
                    }
                }
                // that.org.selectedAllStuff_right=false
            }

            this.org.toRight = [...temp_toRight];

        }, //  左侧 在单个部门选择全部员工
        selectedThis_stuff_left: function (event, parentIndex, idx, dept_id, dept_name, stuff) {
            let that = this;

            this.org.depts_left[parentIndex].children[idx].action = !this.org.depts_left[parentIndex].children[idx].action;
            let temp_flag = this.org.depts_left[parentIndex].children[idx].action;

            //判断部门是否满选
            let dept_flag = this.reset_stuff(this.org.depts_left[parentIndex]);
            if (dept_flag) {
                this.org.depts_left[parentIndex].action = true;
            } else {
                this.org.depts_left[parentIndex].action = false;
            }

            //判断是否当前是否全部本门都选中  若选中则选上全选
            let all_flag = this.resetAll(that.org.depts_left);
            if (all_flag) {
                this.org.selectedAllStuff_left = true;
            } else {
                this.org.selectedAllStuff_left = false;
            }

            //添加该部门人员到按钮中
            let temp_toRight = this.org.toRight || [];
            if (temp_flag === true) {
                this.org.get_oneStuff_left = [stuff];
                if (temp_toRight.length > 0) {
                    let temp_dif_flag = false;
                    for (let i = 0; i < temp_toRight.length; i++) {
                        if (temp_toRight[i].ID == dept_id) {
                            temp_dif_flag = true;
                            temp_toRight[i].showSub = true;
                            let temp_arr = temp_toRight[i].children.concat([stuff]);
                            temp_toRight[i].children = that.removeCommen(temp_arr);
                            break;
                        }
                    }
                    if (!temp_dif_flag) {
                        temp_toRight.push({
                            ID: dept_id,
                            NAME: dept_name,
                            showSub: true,
                            action: true,
                            children: [stuff]
                        });
                    }
                } else {
                    temp_toRight.push({
                        ID: dept_id,
                        NAME: dept_name,
                        showSub: true,
                        action: true,
                        children: [stuff]
                    });
                }
            } else {
                if (temp_toRight.length > 0) {
                    for (let i = 0; i < temp_toRight.length; i++) {
                        for (let j = 0; j < temp_toRight[i].children.length; j++) {
                            if (temp_toRight[i].ID == dept_id && temp_toRight[i].children[j].ID == stuff.ID) {
                                temp_toRight[i].children.splice(j, 1);
                                if (temp_toRight[i].children.length == 0) {
                                    temp_toRight.splice(i, 1);
                                }
                                break;
                            }
                        }
                    }
                }
                this.org.get_oneDept_left = [];
            }
            temp_toRight = JSON.parse(JSON.stringify(temp_toRight));
            this.org.toRight = temp_toRight;
            // console.log(temp_toRight);

        },
        show_subStuff_left: function (index) {
            this.org.depts_left[index].showSub = !this.org.depts_left[index].showSub;
        },
        searchSomething_left: function () {
            this.org.search_hiddenAll_left = true;
            let temp_arr = [];
            let temp_depts_left = [...this.org.temp_depts_left];
            let temp_name = this.org.left_name;
            if (temp_name && temp_depts_left.length) {
                for (let i = 0; i < temp_depts_left.length; i++) {
                    for (let j = 0; j < temp_depts_left[i].children.length; j++) {
                        if (temp_depts_left[i].children[j].NAME.indexOf(this.org.left_name) >= 0) {
                            let temp_json = {};
                            temp_json.action = temp_depts_left[i].action;
                            temp_json.ID = temp_depts_left[i].ID;
                            temp_json.showSub = temp_depts_left[i].showSub;
                            temp_json.NAME = temp_depts_left[i].NAME;
                            temp_json.children = [];
                            temp_json.children = [temp_depts_left[i].children[j]];
                            temp_arr.push(temp_json);
                        }
                    }
                }
                this.org.depts_left = temp_arr;
            } else {
                this.org.depts_left = this.org.temp_depts_left;
            }

        },

        AllStuff_right: function () { //  右侧  在全部部门全部员工
            let that = this;
            let temp_checkBox_flag = !this.org.right_all;
            this.org.selectedAllStuff_right = !this.org.selectedAllStuff_right;
            let temp_flag = this.org.selectedAllStuff_right;
            this.org.depts_right = this.resetSelectedAll(that.org.depts_right, temp_flag);

            if (temp_checkBox_flag) {
                this.org.toLeft = JSON.parse(JSON.stringify(this.org.depts_right));
                // this.org.selectedAllStuff_left=true;
            } else {
                this.org.toLeft = [];
                // this.org.selectedAllStuff_left=false;
            }

        }, //右侧 选择所有部门、并选择所有员工
        selectedAll_stuff_right: function (event, index, dept) { //  右侧 在单个部门选择全部员工
            let that = this;
            this.org.depts_right[index].action = !this.org.depts_right[index].action;

            //判断是否当前是否全部本门都选中  若选中则选上全选
            let all_flag = this.resetAll(that.org.depts_right);
            if (all_flag) {
                this.org.selectedAllStuff_right = true;
            } else {
                this.org.selectedAllStuff_right = false;
            }

            //判断是否当前是否本部门选中  若选中则该该部门人员全选
            let temp_flag = this.org.depts_right[index].action;
            if (temp_flag) {
                this.org.depts_right[index].showSub = true;
            } else {
                this.org.depts_right[index].showSub = false;
            }
            this.org.depts_right[index] = this.resetDepts(that.org.depts_right[index], temp_flag);

            //添加该部门人员到按钮中
            let temp_toLeft = this.org.toLeft || [];
            if (temp_flag) {
                this.org.get_oneDept_right = [dept];
                if (temp_toLeft.length > 0) {
                    let temp_repeat = true;
                    for (let i = 0; i < temp_toLeft.length; i++) {
                        if (temp_toLeft[i].ID == dept.ID) {
                            temp_repeat = false;
                            temp_toLeft[i].children = [...dept.children];
                            break;
                        }
                    }
                    if (temp_repeat) {
                        temp_toLeft = temp_toLeft.concat(this.org.get_oneDept_right);
                    }

                } else {
                    temp_toLeft = [dept];
                }
                // that.org.selectedAllStuff_left=true
            } else {
                this.org.get_oneDept_left = [];
                if (temp_toLeft.length) {
                    for (let i = 0; i < temp_toLeft.length; i++) {
                        if (temp_toLeft[i].ID == dept.ID) {
                            temp_toLeft.splice(i, 1);
                            break;
                        }
                    }
                }
                // that.org.selectedAllStuff_left=false
            }
            this.org.toLeft = JSON.parse(JSON.stringify(temp_toLeft));
        },
        selectedThis_stuff_right: function (event, parentIndex, idx, dept_id, dept_name, stuff) { // 右侧 选择单个部门  单个员工
            let that = this;

            this.org.depts_right[parentIndex].children[idx].action = !this.org.depts_right[parentIndex].children[idx].action;
            let temp_flag = this.org.depts_right[parentIndex].children[idx].action;

            //判断部门是否满选
            let dept_flag = this.reset_stuff(this.org.depts_right[parentIndex]);
            if (dept_flag) {
                this.org.depts_right[parentIndex].action = true;
            } else {
                this.org.depts_right[parentIndex].action = false;
            }

            //判断是否当前是否全部本门都选中  若选中则选上全选
            let all_flag = this.resetAll(that.org.depts_right);
            if (all_flag) {
                this.org.selectedAllStuff_right = true;
            } else {
                this.org.selectedAllStuff_right = false;
            }

            //添加该部门人员到按钮中
            let temp_toLeft = this.org.toLeft || [];
            if (temp_flag === true) {
                this.org.get_oneStuff_right = [stuff];
                if (temp_toLeft.length > 0) {
                    let temp_dif_flag = false;
                    for (let i = 0; i < temp_toLeft.length; i++) {
                        if (temp_toLeft[i].ID == dept_id) {
                            temp_dif_flag = true;
                            temp_toLeft[i].showSub = true;
                            let temp_arr = temp_toLeft[i].children.concat([stuff]);
                            temp_toLeft[i].children = that.removeCommen(temp_arr);
                            break;
                        }
                    }
                    if (!temp_dif_flag) {
                        temp_toLeft.push({
                            ID: dept_id,
                            NAME: dept_name,
                            showSub: true,
                            action: true,
                            children: [stuff]
                        });
                    }

                } else {
                    temp_toLeft.push({
                        ID: dept_id,
                        NAME: dept_name,
                        showSub: true,
                        action: true,
                        children: [stuff]
                    });
                }
            } else {
                if (temp_toLeft.length > 0) {
                    for (let i = 0; i < temp_toLeft.length; i++) {
                        for (let j = 0; j < temp_toLeft[i].children.length; j++) {
                            if (temp_toLeft[i].ID == dept_id && temp_toLeft[i].children[j].ID == stuff.ID) {
                                temp_toLeft[i].children.splice(j, 1);
                                if (temp_toLeft[i].children.length == 0) {
                                    temp_toLeft.splice(i, 1);
                                }
                                break;
                            }
                        }
                    }
                }
                this.org.get_oneDept_right = [];
            }
            this.org.toLeft = JSON.parse(JSON.stringify(temp_toLeft));
        },
        show_subStuff_right: function (index) {
            this.org.depts_right[index].showSub = !this.org.depts_right[index].showSub;
        },
        searchSomething_right: function () {
            let that = this;
            this.org.search_hiddenAll_right = true;
            let temp_arr = [];
            let temp_depts_right = JSON.parse(JSON.stringify(this.org.temp_depts_right));
            let temp_name = this.org.right_name;
            if (temp_name && temp_depts_right.length) {
                for (let i = 0; i < temp_depts_right.length; i++) {
                    for (let j = 0; j < temp_depts_right[i].children.length; j++) {
                        if (temp_depts_right[i].children[j].NAME.indexOf(this.org.right_name) >= 0) {
                            let temp_json = {};
                            temp_json.action = temp_depts_right[i].action;
                            temp_json.ID = temp_depts_right[i].ID;
                            temp_json.showSub = temp_depts_right[i].showSub;
                            temp_json.NAME = temp_depts_right[i].NAME;
                            temp_json.children = [];
                            temp_json.children = [temp_depts_right[i].children[j]];
                            temp_arr.push(temp_json);
                        }
                    }
                }
                this.org.depts_right = JSON.parse(JSON.stringify(temp_arr));
            } else {
                this.org.depts_right = this.org.temp_depts_right;
            }

            this.$emit('thisWorkers', that.org.depts_right);

        },

        selected_list_right: function () { //点击 往右 按钮   全部传向右侧
            let that = this;
            let temp_toRight = this.org.toRight;
            let temp_depts_right = this.org.depts_right || [];

            if (temp_depts_right.length == 0) {
                temp_depts_right = temp_toRight;
            } else {
                //把被选的部门中没有的  单独搜集在一起 一块放到被选部门中
                let repeat = [];
                for (let j = 0; j < temp_toRight.length; j++) {
                    repeat.push(true);
                    for (let k = 0; k < temp_depts_right.length; k++) {
                        if (temp_toRight[j].ID == temp_depts_right[k].ID) {
                            repeat[j] = false;
                            temp_depts_right[k].showSub = true;
                            let temp_arr = temp_depts_right[k].children.concat(temp_toRight[j].children);
                            temp_depts_right[k].children = that.removeCommen(temp_arr);
                            break;
                        }
                    }

                }
                for (let m = 0; m < repeat.length; m++) {
                    if (repeat[m]) {
                        temp_depts_right = temp_depts_right.concat(temp_toRight[m]);
                    }
                }
            }

            //重置回原始状态
            this.org.selectedAllStuff_left = false;
            this.org.selectedAllStuff_right = false;
            temp_depts_right = JSON.parse(JSON.stringify(temp_depts_right));
            this.org.depts_right = temp_depts_right;
            let temp_leftDepts = this.org.depts_left;
            let temp_rightDepts = this.org.depts_right;
            this.org.depts_left = this.resetSelectedAll2(temp_leftDepts);
            this.org.depts_right = this.resetSelectedAll2(temp_rightDepts);
            this.org.toRight = [];
            this.org.left_all = false;
            this.org.temp_depts_right = this.org.depts_right;

            this.$emit('thisWorkers', that.org.depts_right);

        },
        cancel_list_left: function () {
            let that = this;
            let temp_toLeft = this.org.toLeft;
            let temp_depts_copy = JSON.parse(JSON.stringify(this.org.depts_right));
            let temp_depts_right = JSON.parse(JSON.stringify(this.org.depts_right));
            let temp_del = [];
            for (let i = 0; i < temp_toLeft.length; i++) {
                for (let j = 0; j <= temp_toLeft[i].children.length; j++) {
                    if (temp_toLeft[i].children[j] && temp_toLeft[i].children[j].MSGID) {
                        temp_del.push(
                            JSON.parse(JSON.stringify({
                                'id': '' + temp_toLeft[i].children[j].MSGID
                            }))
                        );
                    }
                }
            }
            let len_j = temp_depts_copy.length;
            for (let j = 0; j < len_j; j++) {
                temp_depts_copy[j].children = [];
            }
            for (let n = 0; n < temp_depts_right.length; n++) {
                for (let m = 0; m < temp_depts_right[n].children.length; m++) {
                    if (temp_depts_right[n].children.length > 0) {
                        if (!temp_depts_right[n].children[m].action) {
                            temp_depts_copy[n].children.push(temp_depts_right[n].children[m]);
                        }
                    }
                }
            }
            let arr_right = temp_depts_copy.filter(function (item) {
                return item.children.length > 0;
            });
            this.org.depts_right = arr_right;

            this.org.toLeft = [];
            this.org.selectedAllStuff_left = false;
            this.org.selectedAllStuff_right = false;
            this.org.right_all = false;

            this.$emit('thisWorkers', that.org.depts_right);

        },

        cancel_stuff: function () {
            location.reload();
        },
        save_stuff: function () {
            let temp_arr = this.org.depts_right;
            let post_arr = [];
            for (let i = 0; i < temp_arr.length; i++) {
                for (let j = 0; j < temp_arr[i].children.length; j++) {
                    if (temp_arr[i].children[j].MSGID) {
                        return;
                    } else {
                        post_arr.push({
                            'pid': '',
                            'msgType': '' + temp_arr[i].children[j].TYPE,
                            'msgTo': '' + temp_arr[i].children[j].ID,
                            'name': '' + temp_arr[i].children[j].NAME,
                            'phoneNum': '' + temp_arr[i].children[j].TELEPHONE,
                            'dept': '' + temp_arr[i].ID
                        });
                        // break;
                    }
                }
            }
            // //添加  人员
            // $.ajax({
            //     type: 'post',
            //     url: baseUrl + '/tbMessageConfigController/addMsgStaff.do',
            //     data: JSON.stringify(post_arr),
            //     contentType: 'application/json',
            //     success: function (res) {
            //         let temp_flag = (res.status == '1')
            //         action({
            //             title: '保存状态',
            //             type: true,
            //             flag: temp_flag,
            //             content: res.msg
            //         });
            //
            //         if (temp_flag) {
            //             setTimeout(function () {
            //                 location.reload()
            //             }, 2 * 1100)
            //         }
            //     }
            //
            // })
        },
        formateList(list){
            let that = this;
            if(!list) return [];
            if(!(list instanceof Array)) return  [];
            let tempList = [...list];
            tempList.map(val=>{
                val.action = false;
                val.ID = val[that.props['ID']];
            });
            return  tempList;
        }

    },
    created() {
        // this.org.depts_left = [...this.defaultWorkers];
        // this.org.temp_depts_left = this.defaultWorkers;
    },
    watch:{

        defaultWorkers:{
            handler:(newVal,oldVal)=>{

                let that = this;
               let tempList = [];

               this.defaultWorkers.map(val=>{
                    tempList.push({
                        ID:val[that.props['ID']],
                        action:false,
                        showSub:true,
                        children: that.formateList(val[that.props['children']])
                    });
               });

               that.org.depts_left = [...tempList];
               that.org.temp_depts_left = [...tempList];

               return;
            },
            immediate:true,
            deep:true
        }


    }
};
</script>

<style lang='scss'>
#shuttleBox {
    width: 100%;
    height: 100%;
    font-size: 14px;
    color: #333;
    .cards {
        width: 100%;
        display: flex;
        justify-content: space-between;
        &>div {
            .title {
                line-height: 30px;
                font-weight: 600;
            }
            width: 40%;
            &.middel-actions {
                width: 20%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                &>div {
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    border: 1px solid #0b83fe;
                    border-radius: 5px;
                    margin-bottom: 10px;
                    line-height: 30px;
                    text-align: center;
                    cursor: pointer;
                    color: #333;
                    &.actived {
                        background: #0b83fe;
                        color: #fff;
                    }
                }
            }
            .search-wrap {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 10px;
                input {
                    border: 1px solid #ccc;
                    border-radius: 2px;
                    height: 25px;
                    margin-right: 10px;
                    padding-left: 10px;
                }
                .btn-search {
                    display: inline-block;
                    /*padding: 0 20px;*/
                    line-height: 25px;
                    height: 25px;
                    width: 70px;
                    text-align: center;
                    background: #0b83fe;
                    cursor: pointer;
                    color: #fff;
                    border-radius: 5px;
                }
            }
            .selected-all {
                width: 100%;
                height: 25px;
                line-height: 25px;
                padding: 0 10px;
                position: relative;
                border: 1px solid #ccc;
                border-bottom: none;
                display: flex;
                align-items: center;
                input {
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
                }
                span:last-child {
                    margin-left: 20px;
                }
                .select-img {
                    cursor: pointer;
                    width: 14px;
                    height: 14px;
                    display: inline-block;
                    border: 1px solid #ccc;
                    &.selected {
                        background: url('../../assets/images/common/select.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
            .wrap-lists {
                width: 100%;
                border: 1px solid #ccc;
                border-top: none;
                min-height: 100px;
                max-height: 200px;
                overflow-y: auto;
                .dept {
                    width: 100%;
                    .top-dept {
                        width: 100%;
                        height: 20px;
                        display: flex;
                        justify-content: flex-end;
                        padding-left: 10px;
                        .left {
                            width: 20px;
                            position: relative;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            input {
                                display: inline-block;
                                width: 100%;
                                height: 100%;
                                position: absolute;
                                top: 0;
                                left: 0;
                                opacity: 0;
                            }
                            .select-img {
                                cursor: pointer;
                                width: 14px;
                                height: 14px;
                                display: inline-block;
                                border: 1px solid #ccc;
                                &.selected {
                                    background: url('../../assets/images/common/select.png') no-repeat;
                                    background-size: 100% 100%;
                                }
                            }
                        }
                        .right {
                            cursor: pointer;
                            width: calc(100% - 30px);
                            padding: 0 10px;
                            margin-left: 30px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            i {
                                transition: all .5s linear;
                            }
                            i.selected {
                                transform: rotate(90deg);
                            }
                        }
                    }
                    .dept-subStuff {
                        width: 100%;
                        height: 25px;
                        padding: 0 10px;
                        line-height: 25px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        position: relative;
                        cursor: pointer;
                        &:hover {
                            background: rgb(245, 241, 241);
                        }
                        .select-img {
                            cursor: pointer;
                            width: 14px;
                            height: 14px;
                            display: inline-block;
                            border: 1px solid #ccc;
                            &.selected {
                                background: url('../../assets/images/common/select.png') no-repeat;
                                background-size: 100% 100%;
                            }
                        }
                        input {
                            display: inline-block;
                            width: 20px;
                            height: 20px;
                            position: absolute;
                            top: 0;
                            left: 6px;
                            opacity: 0;
                        }
                        .dept-name {
                            display: inline-block;
                            margin-left: 60px;
                            width: calc(100% - 160px);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .phoneNums {
                            display: inline-block;
                            width: 110px;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
}
</style>
