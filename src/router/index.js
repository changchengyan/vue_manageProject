// import Vue from 'vue';
import  Vue from  'vue/dist/vue.js';

import VueRouter from 'vue-router';

Vue.use(VueRouter);


let routes = [
        {
            path: '/',
            component: () => import('@/pages/Temp'), // 缓冲页
            name: 'temp'
        },
        {
            path: '/login',
            component: () => import('@/pages/Login'), // 登录页
            name: 'login'
        },
        {
            path: '/ruralDrikingWater',
            component: () => import('@/pages/init'), // 初始化数据
            name: 'ruralDrikingWater'
        },
        {
            path: '/mainContent',
            component: () => import('@/pages/mainContent'), //主要内容包裹器
            name: 'mainContent',
            children: [
                {
                    path: '/',
                    redirect: '/oneMap'
                },
                {
                    path: '/oneMap',
                    component: () => import('@/pages/home'), // 首页 一张图
                    name: 'oneMap',
                    meta: {
                        index: 1,
                        crumbs: [{
                            path: '/oneMap',
                            label: '一张图'
                        }],
                        links: [
                            {
                                path: '/oneMap',
                                label: '一张图',
                                icon: 'zhongyuan'
                            }
                        ]
                    }
                },
                {
                    path: '/analysis',
                    component: () => import('@/pages/analysis/analysisMenu'), // 用水分析 侧边栏
                    name: 'analysis',
                    meta: {
                        index: 2,
                        crumbs: [{
                            path: '/analysis',
                            label: '用水分析'
                        }],
                        links: [
                            {
                                path: '/analysis/company',
                                label: '公司用水分析',
                                icon: 'zhongyuan'
                            },
                            {
                                path: '/analysis/county',
                                label: '全县用水分析',
                                icon: 'analysisCounty'
                            },
                            {
                                path: '/analysis/region',
                                label: '区域用水分析',
                                icon: 'analysisRegion'
                            }
                        ]
                    },
                    children: [
                        {
                            path: '/analysis/company',
                            component: () => import('@/pages/analysis/company/index'), // 用水分析 公司用水分析
                            name: 'analysisCompany',
                            meta: {
                                index: 21,
                                crumbs: [{
                                    path: '/analysis',
                                    label: '公司用水分析',
                                    icon: 'zhongyuan'
                                }],
                                links: [
                                    {
                                        path: '/analysis/company',
                                        label: '公司用水分析',
                                        icon: 'zhongyuan'
                                    },
                                    {
                                        path: '/analysis/county',
                                        label: '全县用水分析',
                                        icon: 'analysisCounty'
                                    },
                                    {
                                        path: '/analysis/region',
                                        label: '区域用水分析',
                                        icon: 'analysisRegion'
                                    }
                                ]

                            },
                        },
                        {
                            path: '/analysis/county',
                            component: () => import('@/pages/analysis/county/index'), // 用水分析 全县用水分析
                            name: 'analysisCounty',
                            meta: {
                                index: 22,
                                crumbs: [{
                                    path: '/analysis/county',
                                    label: '全县用水分析',
                                    icon: 'analysisCounty'
                                }],
                                links: [
                                    {
                                        path: '/analysis/company',
                                        label: '公司用水分析',
                                        icon: 'zhongyuan'
                                    },
                                    {
                                        path: '/analysis/county',
                                        label: '全县用水分析',
                                        icon: 'analysisCounty'
                                    },
                                    {
                                        path: '/analysis/region',
                                        label: '区域用水分析',
                                        icon: 'analysisRegion'
                                    }
                                ]
                            }
                        },
                        {
                            path: '/analysis/region',
                            component: () => import('@/pages/analysis/region/index'), // 用水分析 区域用水分析
                            name: 'analysisRegion',
                            meta: {
                                index: 23,
                                crumbs: [{
                                    path: '/analysis/region',
                                    label: '区域用水分析',
                                    icon: 'analysisRegion'
                                }],
                                links: [
                                    {
                                        path: '/analysis/company',
                                        label: '公司用水分析',
                                        icon: 'zhongyuan'
                                    },
                                    {
                                        path: '/analysis/county',
                                        label: '全县用水分析',
                                        icon: 'analysisCounty'
                                    },
                                    {
                                        path: '/analysis/region',
                                        label: '区域用水分析',
                                        icon: 'analysisRegion'
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    path: '/routing',
                    component: () => import('@/pages/routingManage/routingManageMenu'), // 巡检管理
                    name: 'routingManageMenu',
                    meta: {
                        index: 3,
                        crumbs: [{
                            path: '/routing',
                            label: '巡检管理'
                        }],
                        links: [
                            {
                                path: '/routing/statisticAnalysis',
                                label: '巡检统计分析',
                                icon: 'statisticManage'
                            },
                            {
                                path: '/routing/monitorRecord',
                                label: '巡检记录',
                                icon: 'multMsg'
                            },
                            {
                                path: '/routing/monitorPlan',
                                label: '巡检计划',
                                icon: 'inspectionPlan'
                            },
                            {
                                path: '/routing/hiddenDanger',
                                label: '隐患管理',
                                icon: 'hiddenDangerManage'
                            },
                            {
                                path: '/routing/repair',
                                label: '检修管理',
                                icon: 'repairManage'
                            }
                        ]
                    },
                    children: [
                        {
                            path: '/routing/statisticAnalysis',
                            component: () => import('@/pages/routingManage/analysis/index'), //管网巡检  巡检统计分析
                            name: 'monitorAnalysis',
                            meta: {
                                index: 31,
                                crumbs: [{
                                    path: '/routing/statisticAnalysis',
                                    label: '检修管理/巡检统计分析',
                                    icon: 'zhongyuan'
                                }],
                                links: [
                                    {
                                        path: '/routing/statisticAnalysis',
                                        label: '巡检统计分析',
                                        icon: 'statisticManage'
                                    },
                                    {
                                        path: '/routing/monitorRecord',
                                        label: '巡检记录',
                                        icon: 'multMsg'
                                    },
                                    {
                                        path: '/routing/monitorPlan',
                                        label: '巡检计划',
                                        icon: 'inspectionPlan'
                                    },
                                    {
                                        path: '/routing/hiddenDanger',
                                        label: '隐患管理',
                                        icon: 'hiddenDangerManage'
                                    },
                                    {
                                        path: '/routing/repair',
                                        label: '检修管理',
                                        icon: 'repairManage'
                                    }
                                ]

                            },
                        },
                        {
                            path: '/routing/monitorRecord',
                            component: () => import('@/pages/routingManage/monitorRecord'), //管网巡检  巡检统计分析
                            name: 'monitorRecord',
                            meta: {
                                index: 32,
                                crumbs: [{
                                    path: '/routing/monitorRecord',
                                    label: '检修管理/巡检记录',
                                    icon: 'multMsg'
                                }],
                                links: [
                                    {
                                        path: '/routing/statisticAnalysis',
                                        label: '巡检统计分析',
                                        icon: 'statisticManage'
                                    },
                                    {
                                        path: '/routing/monitorRecord',
                                        label: '巡检记录',
                                        icon: 'multMsg'
                                    },
                                    {
                                        path: '/routing/monitorPlan',
                                        label: '巡检计划',
                                        icon: 'inspectionPlan'
                                    },
                                    {
                                        path: '/routing/hiddenDanger',
                                        label: '隐患管理',
                                        icon: 'hiddenDangerManage'
                                    },
                                    {
                                        path: '/routing/repair',
                                        label: '检修管理',
                                        icon: 'repairManage'
                                    }
                                ]

                            },
                        },//管网巡检  巡检记录
                        {
                            path: '/routing/monitorRecordDetail',
                            component: () => import('@/pages/routingManage/detail/monitorRecordDetail'),//管网巡检  巡检统计分析
                            name: 'monitorRecordDetail',
                            meta: {
                                index: 321,
                                crumbs: [{
                                    path: '/routing/monitorRecordDetail',
                                    label: '检修管理/巡检记录详情',
                                    icon: 'multMsg'
                                }],
                                links: [
                                    {
                                        path: '/routing/statisticAnalysis',
                                        label: '巡检统计分析',
                                        icon: 'statisticManage'
                                    },
                                    {
                                        path: '/routing/monitorRecord',
                                        label: '巡检记录',
                                        icon: 'multMsg'
                                    },
                                    {
                                        path: '/routing/monitorPlan',
                                        label: '巡检计划',
                                        icon: 'inspectionPlan'
                                    },
                                    {
                                        path: '/routing/hiddenDanger',
                                        label: '隐患管理',
                                        icon: 'hiddenDangerManage'
                                    },
                                    {
                                        path: '/routing/repair',
                                        label: '检修管理',
                                        icon: 'repairManage'
                                    }
                                ]

                            },
                        },//管网巡检  巡检记录详情

                        {
                            path: '/routing/monitorPlan',
                            component: () => import('@/pages/routingManage/monitorPlan'), //管网巡检  巡检计划
                            name: 'monitorPlan',
                            meta: {
                                index: 33,
                                crumbs: [{
                                    path: '/routing/monitorPlan',
                                    label: '检修管理/巡检计划',
                                    icon: 'inspectionPlan'
                                }],
                                links: [
                                    {
                                        path: '/routing/statisticAnalysis',
                                        label: '巡检统计分析',
                                        icon: 'statisticManage'
                                    },
                                    {
                                        path: '/routing/monitorRecord',
                                        label: '巡检记录',
                                        icon: 'multMsg'
                                    },
                                    {
                                        path: '/routing/monitorPlan',
                                        label: '巡检计划',
                                        icon: 'inspectionPlan'
                                    },
                                    {
                                        path: '/routing/hiddenDanger',
                                        label: '隐患管理',
                                        icon: 'hiddenDangerManage'
                                    },
                                    {
                                        path: '/routing/repair',
                                        label: '检修管理',
                                        icon: 'repairManage'
                                    }
                                ]

                            },
                        },//管网巡检   巡检计划列表页
                        {
                            path: 'routing/addOrEditMonitorPlan',
                            component: () => import('@/pages/routingManage/addOrEdit/addOrEditMonitorPlan'), //管网巡检  巡检计划制定
                            name: 'addOrEditMonitorPlan',
                            meta: {
                                index: 331,
                                crumbs: [{
                                    path: 'routing/addOrEditMonitorPlan',
                                    label: '检修管理/巡检计划制定',
                                    icon: 'inspectionPlan'
                                }],
                                links: [
                                    {
                                        path: '/routing/statisticAnalysis',
                                        label: '巡检统计分析',
                                        icon: 'statisticManage'
                                    },
                                    {
                                        path: '/routing/monitorRecord',
                                        label: '巡检记录',
                                        icon: 'multMsg'
                                    },
                                    {
                                        path: '/routing/monitorPlan',
                                        label: '巡检计划',
                                        icon: 'inspectionPlan'
                                    },
                                    {
                                        path: '/routing/hiddenDanger',
                                        label: '隐患管理',
                                        icon: 'hiddenDangerManage'
                                    },
                                    {
                                        path: '/routing/repair',
                                        label: '检修管理',
                                        icon: 'repairManage'
                                    }
                                ]

                            },
                        },//管网巡检    巡检计划新增or编辑

                        {
                            path: '/routing/hiddenDanger',
                            component: () => import('@/pages/routingManage/hiddenDanger'), //管网巡检  隐患管理
                            name: 'hiddenDanger',
                            meta: {
                                index: 34,
                                crumbs: [{
                                    path: '/routing/hiddenDanger',
                                    label: '检修管理/隐患管理',
                                    icon: 'analysisCounty'
                                }],
                                links: [
                                    {
                                        path: '/routing/statisticAnalysis',
                                        label: '巡检统计分析',
                                        icon: 'zhongyuan'
                                    },
                                    {
                                        path: '/routing/monitorRecord',
                                        label: '巡检记录',
                                        icon: 'analysisCounty'
                                    },
                                    {
                                        path: '/routing/monitorPlan',
                                        label: '巡检计划',
                                        icon: 'analysisCounty'
                                    },
                                    {
                                        path: '/routing/hiddenDanger',
                                        label: '隐患管理',
                                        icon: 'analysisCounty'
                                    },
                                    {
                                        path: '/routing/repair',
                                        label: '检修管理',
                                        icon: 'analysisCounty'
                                    }
                                ]

                            },
                        },//管网巡检  隐患管理

                        {
                            path: '/routing/repair',
                            component: () => import('@/pages/routingManage/repair'), //管网巡检  检修管理
                            name: 'repair',
                            meta: {
                                index: 35,
                                crumbs: [{
                                    path: '/routing/repair',
                                    label: '检修管理/检修管理',
                                    icon: 'repairManage'
                                }],
                                links: [
                                    {
                                        path: '/routing/statisticAnalysis',
                                        label: '巡检统计分析',
                                        icon: 'statisticManage'
                                    },
                                    {
                                        path: '/routing/monitorRecord',
                                        label: '巡检记录',
                                        icon: 'multMsg'
                                    },
                                    {
                                        path: '/routing/monitorPlan',
                                        label: '巡检计划',
                                        icon: 'inspectionPlan'
                                    },
                                    {
                                        path: '/routing/hiddenDanger',
                                        label: '隐患管理',
                                        icon: 'hiddenDangerManage'
                                    },
                                    {
                                        path: '/routing/repair',
                                        label: '检修管理',
                                        icon: 'repairManage'
                                    }
                                ]

                            },
                        },//管网巡检  检修管理
                        {
                            path: '/routing/piperepair',
                            component: () => import('@/pages/routingManage/pipeRepair'), //管网巡检  检修管理 检修工单
                            name: 'piperepair',
                            meta: {
                                index: 351,
                                crumbs: [{
                                    path: '/routing/piperepair',
                                    label: '检修管理/检修工单',
                                    icon: 'repairManage'
                                }],
                                links: [
                                    {
                                        path: '/routing/statisticAnalysis',
                                        label: '巡检统计分析',
                                        icon: 'statisticManage'
                                    },
                                    {
                                        path: '/routing/monitorRecord',
                                        label: '巡检记录',
                                        icon: 'multMsg'
                                    },
                                    {
                                        path: '/routing/monitorPlan',
                                        label: '巡检计划',
                                        icon: 'inspectionPlan'
                                    },
                                    {
                                        path: '/routing/hiddenDanger',
                                        label: '隐患管理',
                                        icon: 'hiddenDangerManage'
                                    },
                                    {
                                        path: '/routing/repair',
                                        label: '检修管理',
                                        icon: 'repairManage'
                                    }
                                ]

                            },
                        },//管网巡检  检修管理 工单信息
                    ]
                },
                {
                    path: '/material',
                    component: () => import('@/pages/material/materialMenu'), // 首页 设备信息
                    name: 'material',
                    meta: {
                        index: 4,
                        crumbs: [{
                            path: '/material',
                            label: '物资管理'
                        }],
                        links: [
                            {
                                path: '/material/analysis',
                                label: '物资管理',
                                icon: 'materialDevice'
                            },
                            {
                                path: '/material/device',
                                label: '设备管理',
                                icon: 'equipment'
                            },
                            {
                                path: '/material/spareParts',
                                label: '备品备件',
                                icon: 'materialSpareParts'
                            }
                        ]
                    },
                    children: [
                        {
                            path: '/material/analysis',
                            component: () => import('@/pages/material/analysis/index'), // 物资管理  设备管理
                            name: 'materialAnalysis',
                            meta: {
                                index: 41,
                                crumbs: [{
                                    path: '/material/analysis',
                                    label: '物资管理',
                                    icon: 'materialDevice'
                                }],
                                links: [
                                    {
                                        path: '/material/analysis',
                                        label: '物资管理',
                                        icon: 'materialDevice'
                                    },
                                    {
                                        path: '/material/device',
                                        label: '设备管理',
                                        icon: 'equipment'
                                    },
                                    {
                                        path: '/material/spareParts',
                                        label: '备品备件',
                                        icon: 'materialSpareParts'
                                    }
                                ]

                            },
                        },
                        {
                            path: '/material/device',
                            component: () => import('@/pages/material/device/index'), // 物资管理  设备管理
                            name: 'materialDevice',
                            meta: {
                                index: 42,
                                crumbs: [{
                                    path: '/material/device',
                                    label: '物资管理/设备管理',
                                    icon: 'equipment'
                                }],
                                links: [
                                    {
                                        path: '/material/analysis',
                                        label: '物资管理',
                                        icon: 'materialDevice'
                                    },
                                    {
                                        path: '/material/device',
                                        label: '设备管理',
                                        icon: 'equipment'
                                    },
                                    {
                                        path: '/material/spareParts',
                                        label: '备品备件',
                                        icon: 'materialSpareParts'
                                    }
                                ]

                            },
                        },
                        {
                            path: '/material/device/profile',
                            component: () => import('@/pages/material/device/profile'), // // 物资管理  设备管理 设备管理详情
                            name: 'materialDeviceProfile',
                            meta: {
                                index: 421,
                                crumbs: [{
                                    path: '/material/device/profile',
                                    label: '物资管理/设备管理详情',
                                    icon: 'equipment'
                                }],
                                links: [
                                    {
                                        path: '/material/analysis',
                                        label: '物资管理',
                                        icon: 'materialDevice'
                                    },
                                    {
                                        path: '/material/device',
                                        label: '设备管理',
                                        icon: 'equipment'
                                    },
                                    {
                                        path: '/material/spareParts',
                                        label: '备品备件',
                                        icon: 'materialSpareParts'
                                    }
                                ]

                            },
                        },
                        {
                            path: '/material/device/modify',
                            component: () => import('@/pages/material/device/modify'), // // 物资管理  设备管理 设备管理修改
                            name: 'materialDeviceModify',
                            meta: {
                                index: 422,
                                crumbs: [{
                                    path: '/material/device/profile',
                                    label: '物资管理/设备管理详情',
                                    icon: 'equipment'
                                }],
                                links: [
                                    {
                                        path: '/material/analysis',
                                        label: '物资管理',
                                        icon: 'materialDevice'
                                    },
                                    {
                                        path: '/material/device',
                                        label: '设备管理',
                                        icon: 'equipment'
                                    },
                                    {
                                        path: '/material/spareParts',
                                        label: '备品备件',
                                        icon: 'materialSpareParts'
                                    }
                                ]

                            },
                        },

                        {
                            path: '/material/spareParts',
                            component: () => import('@/pages/material/spareParts/index'), // 物资管理  备品备件
                            name: 'materialDevice',
                            meta: {
                                index: 43,
                                crumbs: [{
                                    path: '/material/spareParts',
                                    label: '物资管理/备品备件',
                                    icon: 'materialSpareParts'
                                }],
                                links: [
                                    {
                                        path: '/material/analysis',
                                        label: '物资管理',
                                        icon: 'materialDevice'
                                    },
                                    {
                                        path: '/material/device',
                                        label: '设备管理',
                                        icon: 'equipment'
                                    },
                                    {
                                        path: '/material/spareParts',
                                        label: '备品备件',
                                        icon: 'materialSpareParts'
                                    }
                                ]

                            },
                        },
                        {
                            path: '/material/spareParts/modify',
                            component: () => import('@/pages/material/spareParts/modify'), // 物资管理  备品备件 备品备件修改
                            name: 'materialSparePartsModify',
                            meta: {
                                index: 431,
                                crumbs: [{
                                    path: '/routing/modify',
                                    label: '物资管理/备品备件修改',
                                    icon: 'materialSpareParts'
                                }],
                                links: [
                                    {
                                        path: '/material/analysis',
                                        label: '物资管理',
                                        icon: 'materialDevice'
                                    },
                                    {
                                        path: '/material/device',
                                        label: '设备管理',
                                        icon: 'equipment'
                                    },
                                    {
                                        path: '/material/spareParts',
                                        label: '备品备件',
                                        icon: 'materialSpareParts'
                                    }
                                ]

                            },
                        },
                        {
                            path: '/material/spareParts/profile',
                            component: () => import('@/pages/material/spareParts/profile'), // 物资管理  备品备件 备品备件详情
                            name: 'materialSparePartsProfile',
                            meta: {
                                index: 432,
                                crumbs: [{
                                    path: '/routing/spareParts/profile',
                                    label: '物资管理/备品备件详情',
                                    icon: 'materialSpareParts'
                                }],
                                links: [
                                    {
                                        path: '/material/analysis',
                                        label: '物资管理',
                                        icon: 'materialDevice'
                                    },
                                    {
                                        path: '/material/device',
                                        label: '设备管理',
                                        icon: 'equipment'
                                    },
                                    {
                                        path: '/material/spareParts',
                                        label: '备品备件',
                                        icon: 'materialSpareParts'
                                    }
                                ]

                            },
                        },

                    ]
                },
                {
                    path: '/water',
                    component: () => import('@/pages/water/waterMenu'), // 节水管理
                    name: 'waterMenu',
                    meta: {
                        index: 5,
                        crumbs: [{
                            path: '/water',
                            label: '节水管理'
                        }],
                        links: [
                            {
                                path: '/water/calculate',
                                label: '需水预测管理',
                                icon: 'waterCalculate'
                            },
                            {
                                path: '/water/examine',
                                label: '节水考核',
                                icon: 'waterExamine'
                            }
                        ]
                    },
                    children: [
                        {
                            path: '/water/calculate',
                            component: () => import('@/pages/water/calculate/index'), // 物资管理  设备管理
                            name: 'waterCalculate',
                            meta: {
                                index: 51,
                                crumbs: [{
                                    path: '/water/calculate',
                                    label: '节水管理/需水预测管理',
                                    icon: 'waterCalculate'
                                }],
                                links: [
                                    {
                                        path: '/water/calculate',
                                        label: '需水预测管理',
                                        icon: 'waterCalculate'
                                    },
                                    {
                                        path: '/water/examine',
                                        label: '节水考核',
                                        icon: 'waterExamine'
                                    }
                                ]
                            },
                        },
                        {
                            path: '/water/calculate/modify',
                            component: () => import('@/pages/water/calculate/index'), // 节水管理 需水预测管理 新增/修改
                            name: 'waterCalculateModify',
                            meta: {
                                index: 511,
                                crumbs: [{
                                    path: '/water/calculate/modify',
                                    label: '节水管理/需水预测管理新增/修改',
                                    icon: 'waterCalculate'
                                }],
                                links: [
                                    {
                                        path: '/water/calculate',
                                        label: '需水预测管理',
                                        icon: 'waterCalculate'
                                    },
                                    {
                                        path: '/water/examine',
                                        label: '节水考核',
                                        icon: 'waterExamine'
                                    }
                                ]
                            },
                        },
                        {
                            path: '/water/calculate/show',
                            component: () => import('@/pages/water/calculate/profile'), // 节水管理 需水预测管理 需水预测管理详情
                            name: 'waterCalculateProfile',
                            meta: {
                                index: 511,
                                crumbs: [{
                                    path: '/water/calculate/show',
                                    label: '节水管理/需水预测管理详情',
                                    icon: 'waterCalculate'
                                }],
                                links: [
                                    {
                                        path: '/water/calculate',
                                        label: '需水预测管理',
                                        icon: 'waterCalculate'
                                    },
                                    {
                                        path: '/water/examine',
                                        label: '节水考核',
                                        icon: 'waterExamine'
                                    }
                                ]
                            },
                        },

                        {
                            path: '/water/examine',
                            component: () => import('@/pages/water/examine/index'), // 用水节水  节水考核
                            name: 'waterExamine',
                            meta: {
                                index: 52,
                                crumbs: [{
                                    path: '/water/examine',
                                    label: '节水管理/节水考核',
                                    icon: 'waterExamine'
                                }],
                                links: [
                                    {
                                        path: '/water/calculate',
                                        label: '需水预测管理',
                                        icon: 'waterCalculate'
                                    },
                                    {
                                        path: '/water/examine',
                                        label: '节水考核',
                                        icon: 'waterExamine'
                                    }
                                ]
                            },
                        },
                        {
                            path: '/water/examine/show',
                            component: () => import('@/pages/water/calculate/index'), // 节水管理 节水考核 节水考核详情
                            name: 'waterExamineProfile',
                            meta: {
                                index: 521,
                                crumbs: [{
                                    path: '/water/examine/show',
                                    label: '节水管理/节水考核详情',
                                    icon: 'waterExamine'
                                }],
                                links: [
                                    {
                                        path: '/water/calculate',
                                        label: '需水预测管理',
                                        icon: 'waterCalculate'
                                    },
                                    {
                                        path: '/water/examine',
                                        label: '节水考核',
                                        icon: 'waterExamine'
                                    }
                                ]
                            },
                        },
                        {
                            path: '/water/examine/company',
                            component: () => import('@/pages/water/examine/companyModify'), // 节水管理 节水考核 节水考核详情
                            name: 'waterExamineCompany',
                            meta: {
                                index: 522,
                                crumbs: [{
                                    path: '/water/examine/company',
                                    label: '节水管理/节水考核详情',
                                    icon: 'waterExamine'
                                }],
                                links: [
                                    {
                                        path: '/water/calculate',
                                        label: '需水预测管理',
                                        icon: 'waterCalculate'
                                    },
                                    {
                                        path: '/water/examine',
                                        label: '节水考核',
                                        icon: 'waterExamine'
                                    }
                                ]
                            },
                        },
                    ]
                },
                {
                    path: '/pipeRecord',
                    component: () => import('@/pages/pipeManage/pipeMenu'), // 管网管理 管网台账
                    name: 'pipeRecordMenu',
                    meta: {
                        index: 6,
                        crumbs: [{
                            path: '/pipeRecord/pipeStandingBook',
                            label: '管网管理/管网台账'
                        }],
                        links: [
                            {
                                path: '/pipeRecord/pipeStandingBook',
                                label: '管网台账',
                                icon: 'pipeAccount'
                            },
                            {
                                path: '/pipeRecord/devStandingBook',
                                label: '设备台账',
                                icon: 'pipeDev'
                            }
                        ]
                    },
                    children: [
                        {
                            path: '/pipeRecord/pipeStandingBook',
                            component: () => import('@/pages/pipeManage/pipeStandingBook'), // 管网管理 管网台账
                            name: 'pipeStandingBook',
                            meta: {
                                index: 61,
                                crumbs: [{
                                    path: '/pipeRecord/pipeStandingBook',
                                    label: '管网管理/管网台账',
                                    icon: 'pipeAccount'
                                }],
                                links: [
                                    {
                                        path: '/pipeRecord/pipeStandingBook',
                                        label: '管网台账',
                                        icon: 'pipeAccount'
                                    },
                                    {
                                        path: '/pipeRecord/devStandingBook',
                                        label: '设备台账',
                                        icon: 'pipeDev'
                                    }
                                ]
                            },
                        },
                        {
                            path: '/pipeRecord/addPipe',
                            component: () => import('@/pages/pipeManage/addPipes'), // 管网管理 管网台账 新增
                            name: 'pipeAdd',
                            meta: {
                                index: 611,
                                crumbs: [{
                                    path: '/pipeRecord/addPipe',
                                    label: '管网管理/新增管网',
                                    icon: 'pipeAccount'
                                }],
                                links: [
                                    {
                                        path: '/pipeRecord/pipeStandingBook',
                                        label: '管网台账',
                                        icon: 'pipeAccount'
                                    },
                                    {
                                        path: '/pipeRecord/devStandingBook',
                                        label: '设备台账',
                                        icon: 'pipeDev'
                                    }
                                ]
                            },
                        },

                        {
                            path: '/pipeRecord/devStandingBook',
                            component: () => import('@/pages/pipeManage/devStandingBook'), // 管网管理 设备台账
                            name: 'devStandingBook',
                            meta: {
                                index: 62,
                                crumbs: [{
                                    path: '/pipeRecord/devStandingBook',
                                    label: '管网管理/设备台账',
                                    icon: 'pipeDev'
                                }],
                                links: [
                                    {
                                        path: '/pipeRecord/pipeStandingBook',
                                        label: '管网台账',
                                        icon: 'pipeAccount'
                                    },
                                    {
                                        path: '/pipeRecord/devStandingBook',
                                        label: '设备台账',
                                        icon: 'pipeDev'
                                    }
                                ]
                            },
                        },
                        {
                            path: '/pipeRecord/addDev',
                            component: () => import('@/pages/pipeManage/addDeves'), // 管网管理 设备台账 新增设备
                            name: 'addDeves',
                            meta: {
                                index: 621,
                                crumbs: [{
                                    path: '/pipeRecord/addDev',
                                    label: '管网管理/新增设备',
                                    icon: '设备台账'
                                }],
                                links: [
                                    {
                                        path: '/pipeRecord/pipeStandingBook',
                                        label: '管网台账',
                                        icon: 'pipeAccount'
                                    },
                                    {
                                        path: '/pipeRecord/devStandingBook',
                                        label: '设备台账',
                                        icon: 'pipeDev'
                                    }
                                ]
                            },
                        },


                    ]
                },
                {
                    path: '/emergency',
                    component: () => import('@/pages/emergency/emergencyMenu'), // 应急管理
                    name: 'emergencyMenu',
                    meta: {
                        index: 7,
                        crumbs: [{
                            path: '/emergency',
                            label: '应急管理'
                        }],
                        links: [
                            {
                                path: '/emergency/incident',
                                label: '应急事件',
                                icon: 'emergencyIncident'
                            },
                            {
                                path: '/emergency/resource',
                                label: '应急资源',
                                icon: 'emergencyResource'
                            }
                        ]
                    },
                    children: [
                        {
                            path: '/emergency/incident',
                            component: () => import('@/pages/emergency/incident/index'), // 应急事件管理 应急事件
                            name: 'emergencyIncident',
                            meta: {
                                index: 71,
                                crumbs: [{
                                    path: '/emergency/incident',
                                    label: '应急事件/应急事件',
                                    icon: 'emergencyIncident'
                                }],
                                links: [
                                    {
                                        path: '/emergency/incident',
                                        label: '应急事件',
                                        icon: 'emergencyIncident'
                                    },
                                    {
                                        path: '/emergency/resource',
                                        label: '应急资源',
                                        icon: 'emergencyResource'
                                    }
                                ]
                            },
                        },
                        {
                            path: '/emergency/incident/modify',
                            component: () => import('@/pages/emergency/incident/modify'), // 应急事件管理 应急事件新增
                            name: 'emergencyIncidentModify',
                            meta: {
                                index: 711,
                                crumbs: [{
                                    path: '/emergency/incident/modify',
                                    label: '应急管理/应急事件新增',
                                    icon: 'emergencyIncident'
                                }],
                                links: [
                                    {
                                        path: '/emergency/incident',
                                        label: '应急事件',
                                        icon: 'emergencyIncident'
                                    },
                                    {
                                        path: '/emergency/resource',
                                        label: '应急资源',
                                        icon: 'emergencyResource'
                                    }
                                ]
                            },
                        },

                        {
                            path: '/emergency/resource',
                            component: () => import('@/pages/emergency/resource/index'), // 应急事件管理 应急资源管理
                            name: 'emergencyResource',
                            meta: {
                                index: 72,
                                crumbs: [{
                                    path: '/emergency/resource',
                                    label: '应急管理/应急资源',
                                    icon: 'emergencyResource'
                                }],
                                links: [
                                    {
                                        path: '/emergency/incident',
                                        label: '应急事件',
                                        icon: 'emergencyIncident'
                                    },
                                    {
                                        path: '/emergency/resource',
                                        label: '应急资源',
                                        icon: 'emergencyResource'
                                    }
                                ]
                            },
                        },
                        {
                            path: '/emergency/resource/modify',
                            component: () => import('@/pages/emergency/resource/modify'), // 应急事件管理 应急资源新增
                            name: 'emergencyResourceModify',
                            meta: {
                                index: 721,
                                crumbs: [{
                                    path: '/emergency/resource/modify',
                                    label: '应急管理/应急资源新增/修改',
                                    icon: 'emergencyResource'
                                }],
                                links: [
                                    {
                                        path: '/emergency/incident',
                                        label: '应急事件',
                                        icon: 'emergencyIncident'
                                    },
                                    {
                                        path: '/emergency/resource',
                                        label: '应急资源',
                                        icon: 'emergencyResource'
                                    }
                                ]
                            },
                        },
                    ]
                },
                {
                    path: '/data',
                    component: () => import('@/pages/data/dataMenu'), // 数据管理
                    name: 'dataMenu',
                    meta: {
                        index: 8,
                        crumbs: [{
                            path: '/data',
                            label: '数据管理'
                        }],
                        links: [
                            {
                                path: '/data/warning',
                                label: '报警信息',
                                icon: 'warning'
                            },
                            {
                                path: '/data/monitor',
                                label: '监测信息',
                                icon: 'monitor'
                            },
                            {
                                path: '/data/target',
                                label: '农饮指标',
                                icon: 'target'
                            }
                            // {
                            //     path: '/data/waterCapacity',
                            //     label: '水量管理',
                            //     icon: 'dataEnterpriseTable'
                            // }
                        ]
                    },
                    children: [
                        {
                            path: '/data/warning',
                            component: () => import('@/pages//data/warning'), // 数据管理 报警信息
                            name: 'dataWarning',
                            meta: {
                                index: 81,
                                crumbs: [{
                                    path: '/emergency/incident',
                                    label: '数据管理/报警信息',
                                    icon: 'warning'
                                }],
                                links: [
                                    {
                                        path: '/data/warning',
                                        label: '报警信息',
                                        icon: 'warning'
                                    },
                                    {
                                        path: '/data/monitor',
                                        label: '监测信息',
                                        icon: 'monitor'
                                    },
                                    {
                                        path: '/data/target',
                                        label: '农饮指标',
                                        icon: 'target'
                                    }
                                    // {
                                    //     path: '/data/waterCapacity',
                                    //     label: '水量管理',
                                    //     icon: 'dataEnterpriseTable'
                                    // }
                                ]
                            },
                        },
                        {
                            path: '/data/monitor',
                            component: () => import('@/pages/data/monitor/index'), // 数据管理 监测信息
                            name: 'dataMonitor',
                            meta: {
                                index: 81,
                                crumbs: [{
                                    path: '/data/monitor',
                                    label: '数据管理/监测信息',
                                    icon: 'monitor'
                                }],
                                links: [
                                    {
                                        path: '/data/warning',
                                        label: '报警信息',
                                        icon: 'warning'
                                    },
                                    {
                                        path: '/data/monitor',
                                        label: '监测信息',
                                        icon: 'monitor'
                                    },
                                    {
                                        path: '/data/target',
                                        label: '农饮指标',
                                        icon: 'target'
                                    }
                                    // {
                                    //     path: '/data/waterCapacity',
                                    //     label: '水量管理',
                                    //     icon: 'dataEnterpriseTable'
                                    // }
                                ]
                            },
                        },
                        {
                            path: '/data/target',
                            component: () => import('@/pages/data/target'), // 数据管理  农饮指标
                            name: 'dataTarget',
                            meta: {
                                index: 81,
                                crumbs: [{
                                    path: '/data/target',
                                    label: '数据管理/农饮指标',
                                    icon: 'target'
                                }],
                                links: [
                                    {
                                        path: '/data/warning',
                                        label: '报警信息',
                                        icon: 'warning'
                                    },
                                    {
                                        path: '/data/monitor',
                                        label: '监测信息',
                                        icon: 'monitor'
                                    },
                                    {
                                        path: '/data/target',
                                        label: '农饮指标',
                                        icon: 'target'
                                    }
                                    // {
                                    //     path: '/data/waterCapacity',
                                    //     label: '水量管理',
                                    //     icon: 'dataEnterpriseTable'
                                    // }
                                ]
                            },
                        },
                        {
                            path: '/data/waterCapacity',
                            component: () => import('@/pages/data/enterpriseTable'), // 数据管理  水量管理
                            name: 'enterpriseTable',
                            meta: {
                                index: 81,
                                crumbs: [{
                                    path: '/data/target',
                                    label: '数据管理/水量管理',
                                    icon: 'dataEnterpriseTable'
                                }],
                                links: [
                                    {
                                        path: '/data/warning',
                                        label: '报警信息',
                                        icon: 'warning'
                                    },
                                    {
                                        path: '/data/monitor',
                                        label: '监测信息',
                                        icon: 'monitor'
                                    },
                                    {
                                        path: '/data/target',
                                        label: '农饮指标',
                                        icon: 'target'
                                    }
                                    // {
                                    //     path: '/data/waterCapacity',
                                    //     label: '水量管理',
                                    //     icon: 'dataEnterpriseTable'
                                    // }
                                ]
                            },
                        },
                    ]
                },
                {
                    path: '/system',
                    component: () => import('@/pages/system/systemMenu'), // 系统管理
                    name: 'systemMenu',
                    meta: {
                        index: 8,
                        crumbs: [{
                            path: '/data',
                            label: '数据管理'
                        }],
                        links: [
                            {
                                path: '/system/supplyProject',
                                label: '供水工程',
                                icon: 'systemEngineering'
                            },
                            {
                                path: '/system/engineering',
                                label: '工程配置',
                                icon: 'systemEngineering'
                            },
                            {
                                path: '/system/monitor',
                                label: '监测点配置',
                                icon: 'monitor'
                            }
                            // {
                            //     path: '/system/zone',
                            //     label: '分区配置',
                            //     icon: 'systemZone'
                            // },
                            // {
                            //     path: '/system/inspectionItem',
                            //     label: '巡检项配置',
                            //     icon: 'systemInspectionItem'
                            // },
                            // {
                            //     path: '/system/patrolTeam',
                            //     label: '巡检班配置',
                            //     icon: 'systemPatrolTeam'
                            // }
                        ]
                    },
                    children: [
                        {
                            path: '/system/supplyProject',
                            component: () => import('@/pages/system/supplyProgect/supplyProgect'), // 系统配置供水工程
                            name: 'systemSupplyProject',
                            meta: {
                                index: 91,
                                crumbs: [{
                                    path: '/system/supplyProject',
                                    label: '系统配置/供水工程',
                                    icon: 'monitor'
                                }],
                                links: [
                                    {
                                        path: '/system/supplyProject',
                                        label: '供水工程',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/engineering',
                                        label: '工程配置',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/monitor',
                                        label: '监测点配置',
                                        icon: 'monitor'
                                    }
                                    // {
                                    //     path: '/system/zone',
                                    //     label: '分区配置',
                                    //     icon: 'systemZone'
                                    // },
                                    // {
                                    //     path: '/system/inspectionItem',
                                    //     label: '巡检项配置',
                                    //     icon: 'systemInspectionItem'
                                    // },
                                    // {
                                    //     path: '/system/patrolTeam',
                                    //     label: '巡检班配置',
                                    //     icon: 'systemPatrolTeam'
                                    // }
                                ]
                            },
                        },
                        {
                            path: '/system/supplyProjectModify',
                            component: () => import('@/pages/system/supplyProgect/supplyProjectModify'), // 系统配置供水工程  编辑/新增
                            name: 'supplyProjectModify',
                            meta: {
                                index: 91,
                                crumbs: [{
                                    path: '/system/supplyProject',
                                    label: '系统配置/供水工程',
                                    icon: 'monitor'
                                }],
                                links: [
                                    {
                                        path: '/system/supplyProject',
                                        label: '供水工程',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/engineering',
                                        label: '工程配置',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/monitor',
                                        label: '监测点配置',
                                        icon: 'monitor'
                                    }
                                    // {
                                    //     path: '/system/zone',
                                    //     label: '分区配置',
                                    //     icon: 'systemZone'
                                    // },
                                    // {
                                    //     path: '/system/inspectionItem',
                                    //     label: '巡检项配置',
                                    //     icon: 'systemInspectionItem'
                                    // },
                                    // {
                                    //     path: '/system/patrolTeam',
                                    //     label: '巡检班配置',
                                    //     icon: 'systemPatrolTeam'
                                    // }
                                ]
                            },
                        },
                        {
                            path: '/system/engineering',
                            component: () => import('@/pages/system/engineering/index'), // 系统配置 工程配置
                            name: 'systemEngineering',
                            meta: {
                                index: 92,
                                crumbs: [{
                                    path: '/system/engineering',
                                    label: '系统配置/工程配置',
                                    icon: 'systemEngineering'
                                }],
                                links: [
                                    {
                                        path: '/system/supplyProject',
                                        label: '供水工程',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/engineering',
                                        label: '工程配置',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/monitor',
                                        label: '监测点配置',
                                        icon: 'monitor'
                                    }
                                    // {
                                    //     path: '/system/zone',
                                    //     label: '分区配置',
                                    //     icon: 'systemZone'
                                    // },
                                    // {
                                    //     path: '/system/inspectionItem',
                                    //     label: '巡检项配置',
                                    //     icon: 'systemInspectionItem'
                                    // },
                                    // {
                                    //     path: '/system/patrolTeam',
                                    //     label: '巡检班配置',
                                    //     icon: 'systemPatrolTeam'
                                    // }
                                ]
                            },
                        },
                        {
                            path: '/system/engineering/modify',
                            component: () => import('@/pages/system/engineering/modify'), // 系统配置 工程配置 配置修改
                            name: 'systemEngineeringModify',
                            meta: {
                                index: 921,
                                crumbs: [{
                                    path: '/system/engineering/modify',
                                    label: '系统配置/工程配置 修改',
                                    icon: 'systemEngineering'
                                }],
                                links: [
                                    {
                                        path: '/system/supplyProject',
                                        label: '供水工程',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/engineering',
                                        label: '工程配置',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/monitor',
                                        label: '监测点配置',
                                        icon: 'monitor'
                                    }
                                    // {
                                    //     path: '/system/zone',
                                    //     label: '分区配置',
                                    //     icon: 'systemZone'
                                    // },
                                    // {
                                    //     path: '/system/inspectionItem',
                                    //     label: '巡检项配置',
                                    //     icon: 'systemInspectionItem'
                                    // },
                                    // {
                                    //     path: '/system/patrolTeam',
                                    //     label: '巡检班配置',
                                    //     icon: 'systemPatrolTeam'
                                    // }
                                ]
                            },
                        },

                        {
                            path: '/system/monitor',
                            component: () => import('@/pages/system/monitor/index'), // 系统配置 监测点配置
                            name: 'systemMonitor',
                            meta: {
                                index: 93,
                                crumbs: [{
                                    path: '/system/monitor',
                                    label: '系统配置/监测点配置',
                                    icon: 'monitor'
                                }],
                                links: [
                                    {
                                        path: '/system/supplyProject',
                                        label: '供水工程',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/engineering',
                                        label: '工程配置',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/monitor',
                                        label: '监测点配置',
                                        icon: 'monitor'
                                    }
                                    // {
                                    //     path: '/system/zone',
                                    //     label: '分区配置',
                                    //     icon: 'systemZone'
                                    // },
                                    // {
                                    //     path: '/system/inspectionItem',
                                    //     label: '巡检项配置',
                                    //     icon: 'systemInspectionItem'
                                    // },
                                    // {
                                    //     path: '/system/patrolTeam',
                                    //     label: '巡检班配置',
                                    //     icon: 'systemPatrolTeam'
                                    // }
                                ]
                            },
                        },
                        {
                            path: '/system/monitor/modify',
                            component: () => import('@/pages/system/monitor/modify'), // 系统配置 监测点配置 配置修改
                            name: 'systemMonitorModify',
                            meta: {
                                index: 931,
                                crumbs: [{
                                    path: '/system/monitor',
                                    label: '系统配置/监测点配置',
                                    icon: 'monitor'
                                }],
                                links: [
                                    {
                                        path: '/system/supplyProject',
                                        label: '供水工程',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/engineering',
                                        label: '工程配置',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/monitor',
                                        label: '监测点配置',
                                        icon: 'monitor'
                                    }
                                    // {
                                    //     path: '/system/zone',
                                    //     label: '分区配置',
                                    //     icon: 'systemZone'
                                    // },
                                    // {
                                    //     path: '/system/inspectionItem',
                                    //     label: '巡检项配置',
                                    //     icon: 'systemInspectionItem'
                                    // },
                                    // {
                                    //     path: '/system/patrolTeam',
                                    //     label: '巡检班配置',
                                    //     icon: 'systemPatrolTeam'
                                    // }
                                ]
                            },
                        },
                        {
                            path: '/system/monitor/modifyVideo',
                            component: () => import('@/pages/system/monitor/videoConfig'), // 系统配置 监测点配置 配置修改
                            name: 'systemModifyVideo',
                            meta: {
                                index: 932,
                                crumbs: [{
                                    path: '/system/monitor/modifyVideo',
                                    label: '系统配置/监测点视频配置',
                                    icon: 'monitor'
                                }],
                                links: [
                                    {
                                        path: '/system/supplyProject',
                                        label: '供水工程',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/engineering',
                                        label: '工程配置',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/monitor',
                                        label: '监测点配置',
                                        icon: 'monitor'
                                    }
                                    // {
                                    //     path: '/system/zone',
                                    //     label: '分区配置',
                                    //     icon: 'systemZone'
                                    // },
                                    // {
                                    //     path: '/system/inspectionItem',
                                    //     label: '巡检项配置',
                                    //     icon: 'systemInspectionItem'
                                    // },
                                    // {
                                    //     path: '/system/patrolTeam',
                                    //     label: '巡检班配置',
                                    //     icon: 'systemPatrolTeam'
                                    // }
                                ]
                            },
                        },
                        {
                            path: '/system/zone',
                            component: () => import('@/pages/system/zone'), // 系统配置 分区配置
                            name: 'systemZone',
                            meta: {
                                index: 93,
                                crumbs: [{
                                    path: '/system/zone',
                                    label: '系统配置/分区配置',
                                    icon: 'systemZone'
                                }],
                                links: [
                                    {
                                        path: '/system/supplyProject',
                                        label: '供水工程',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/engineering',
                                        label: '工程配置',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/monitor',
                                        label: '监测点配置',
                                        icon: 'monitor'
                                    }
                                    // {
                                    //     path: '/system/zone',
                                    //     label: '分区配置',
                                    //     icon: 'systemZone'
                                    // },
                                    // {
                                    //     path: '/system/inspectionItem',
                                    //     label: '巡检项配置',
                                    //     icon: 'systemInspectionItem'
                                    // },
                                    // {
                                    //     path: '/system/patrolTeam',
                                    //     label: '巡检班配置',
                                    //     icon: 'systemPatrolTeam'
                                    // }
                                ]
                            },
                        },
                        {
                            path: '/system/inspectionItem',
                            component: () => import('@/pages/system/inspectionItem/index'), // 系统配置 巡检项配置
                            name: 'systemInspectionItem',
                            meta: {
                                index: 94,
                                crumbs: [{
                                    path: '/system/inspectionItem',
                                    label: '系统配置/巡检项配置',
                                    icon: 'systemInspectionItem'
                                }],
                                links: [
                                    {
                                        path: '/system/supplyProject',
                                        label: '供水工程',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/engineering',
                                        label: '工程配置',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/monitor',
                                        label: '监测点配置',
                                        icon: 'monitor'
                                    }
                                    // {
                                    //     path: '/system/zone',
                                    //     label: '分区配置',
                                    //     icon: 'systemZone'
                                    // },
                                    // {
                                    //     path: '/system/inspectionItem',
                                    //     label: '巡检项配置',
                                    //     icon: 'systemInspectionItem'
                                    // },
                                    // {
                                    //     path: '/system/patrolTeam',
                                    //     label: '巡检班配置',
                                    //     icon: 'systemPatrolTeam'
                                    // }
                                ]
                            },
                        },

                        {
                            path: '/system/patrolTeam',
                            component: () => import('@/pages/system/patrolTeam/index'), // 系统配置 巡检班配置
                            name: 'systemPatrolTeam',
                            meta: {
                                index: 95,
                                crumbs: [{
                                    path: '/system/inspectionItem',
                                    label: '系统配置/巡检班配置',
                                    icon: 'systemPatrolTeam'
                                }],
                                links: [
                                    {
                                        path: '/system/supplyProject',
                                        label: '供水工程',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/engineering',
                                        label: '工程配置',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/monitor',
                                        label: '监测点配置',
                                        icon: 'monitor'
                                    }
                                    // {
                                    //     path: '/system/zone',
                                    //     label: '分区配置',
                                    //     icon: 'systemZone'
                                    // },
                                    // {
                                    //     path: '/system/inspectionItem',
                                    //     label: '巡检项配置',
                                    //     icon: 'systemInspectionItem'
                                    // },
                                    // {
                                    //     path: '/system/patrolTeam',
                                    //     label: '巡检班配置',
                                    //     icon: 'systemPatrolTeam'
                                    // }
                                ]
                            },
                        },
                        {
                            path: '/system/patrolTeam/configure',
                            component: () => import('@/pages/system/patrolTeam/configure'), // 系统配置 巡检班配置 新增巡检班
                            name: 'systemPatrolTeamConfigure',
                            meta: {
                                index: 951,
                                crumbs: [{
                                    path: '/system/inspectionItem/configure',
                                    label: '系统配置/巡检班配置新增',
                                    icon: 'systemPatrolTeam'
                                }],
                                links: [
                                    {
                                        path: '/system/supplyProject',
                                        label: '供水工程',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/engineering',
                                        label: '工程配置',
                                        icon: 'systemEngineering'
                                    },
                                    {
                                        path: '/system/monitor',
                                        label: '监测点配置',
                                        icon: 'monitor'
                                    }
                                    // {
                                    //     path: '/system/zone',
                                    //     label: '分区配置',
                                    //     icon: 'systemZone'
                                    // },
                                    // {
                                    //     path: '/system/inspectionItem',
                                    //     label: '巡检项配置',
                                    //     icon: 'systemInspectionItem'
                                    // },
                                    // {
                                    //     path: '/system/patrolTeam',
                                    //     label: '巡检班配置',
                                    //     icon: 'systemPatrolTeam'
                                    // }
                                ]
                            },
                        }


                    ]
                }
            ]
        },
        {
            path: '/noAccess',
            component: () => import('@/pages/403'), // 500
            name: 'error',
            meta: {
                index: 16
            }
        },
        {
            path: '*',
            component: () => import('@/pages/404'), // 404
            name: 'noFound',
            meta: {
                index: 17
            }
        }
    ];

let router = new VueRouter({
    mode: 'hash',
    base: '/',
    routes: [],
});

router.addRoutes(routes);

// 拦截路由地址...
// router.beforeEach((to, from, next) => {
//     //
//     let loginPath = '/#/login';
//     let hasLoginToken = localStorage.getItem('__app_token__');
//     let path = to.path;
//     if (path === loginPath) {
//         next();
//         return;
//     }
//     if (hasLoginToken) {
        // if (path === '/') {
        //     next({
        //         path: 'demo'
        //     })
        // } else {
        //     next()
        // }
//     } else {
//         next({
//             path: '/#/noAccess'
//         })
//     }
// });

export default router;
