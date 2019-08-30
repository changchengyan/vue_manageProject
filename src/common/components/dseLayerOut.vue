<template>
<div id="layerOut">
    <div class="main-content">
        <slot></slot>
    </div>
    <div class="trees">
        <div class="topHead" :title="title">
            <span>{{title}}</span>
        </div>
        <div class="tree-main">
        <el-tree :data="treeList"   :props="defaultProps" :expand-on-click-node="false" highlight-current false  default-expand-all @node-click="handleNodeClick">
        </el-tree>
        </div>

    </div>
</div>
</template>

<script>

export default {
    // props:['treeList','title'],
    props:{
        treeList:{
            type:Array,
            defaultProps: []
        },
        title:{
            type:String,
            defaultProps:''
        }
    },
    name:'dse-layerOut',
    data() {
        return {
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    methods: {
        handleNodeClick(data) {
            this.$emit('select_thisTree',data);
        }
    }
};
</script>

<style lang="scss" scoped>
#layerOut {
    width: 100%;
    height: 100%;
    font-size: 14px;
    color: #333;
    background: #ebebeb;
    padding: 10px;
    display: flex;
    justify-content: space-between;

    .main-content {
        width: calc(100% - 210px);
        height: 100%;
        background: #fff;
        border-radius: 10px;
    }

    .trees {
        width: 200px;
        height: 100%;
        background: #fff;
        padding: 10px;
        border-radius: 10px;
        .topHead{
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: left;
            font-weight: 600;
            background: #c4e9f1;
            text-align: center;
            span{
                display: inline-block;
                padding: 0 5px;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .tree-main{
            width: 100%;
            height: calc(100% - 30px);
            overflow-y: auto;
        }

    }
}
</style>
