/**
 *
 * @type {{methods: {drawLine(*): *}}}
 *
 * @desc 所有的 线 柱子 等自定义 公用写在这里
 */


export  let charts = {
    methods:{
        // 绘制线(单条线)
        drawLine(obj){

            /**
             *
             *  obj.name 悬浮窗的名字
             *  obj.unit 数据单位
             *  obj.data = series[0].data < [ [],[],[] ] >
             *  obj.color 线的颜色
             */

            return {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line'
                    }
                },
                // toolbox: {
                //     show : true,
                //     feature: {
                //         dataView: {
                //             show: true,
                //             readOnly: false
                //         }
                //     }
                // },
                grid: {
                    top: '40px',
                    left: '40px',
                    right: '45px',
                    bottom: '30px'
                },
                xAxis: {
                    show: true,
                    name: '时间',
                    type: 'time',
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    show: true,
                    name: obj.unit
                },
                color: obj.color?obj.color:'#0e9cff',
                series: [
                    {
                        name: obj.name,
                        type: 'line',
                        barWidth: '10%',
                        data: obj.data,
                        areaStyle: {normal: {
                                color:'#ceeafe'
                            }},
                    }
                ]
            }

        }
    }
}
