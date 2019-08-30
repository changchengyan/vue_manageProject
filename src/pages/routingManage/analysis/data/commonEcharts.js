const title = {
	text: '',
	x: 'center',
	y: 'top',
	textStyle: {
		color: '#333',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontFamily: 'Microsoft Yahei',
		fontSize: 16
	}
};

const grid = {
	top: '15%',
	right: '10%',
	bottom: 0,
	left: 0,
	containLabel: true
};

const tooltip = {
	trigger: 'axis',
	axisPointer: {
		type: 'shadow'
	}
};

const seriesLabel = {
	normal: {
		show: true,
		position: 'right',
		textStyle: {
			fontSize: 16,
			fontWeight: 600
		},
		formatter: (payload = {}) => Number(payload.value).toFixed(2) * 100 + '%',
	}
};

// const itemStyle = {
// 	normal: {
// 		label: {
// 			show: true,
// 			position: 'top',
// 			textStyle: {
// 				fontSize: 14,
// 				fontWeight: 600
// 			},
// 		},
// 		color: '#1B84EA'
// 	},
// 	emphasis: {
// 		shadowBlur: 10,
// 		shadowOffsetX: 0,
// 		shadowColor: 'rgba(0, 0, 0, 0.5)'
// 	},
// };

export default {
	commonBar0: {
		title,
		tooltip,
		grid,
		xAxis: {
			type: 'value',
			splitLine: {
				show: false
			},
		},
		yAxis: {
			type: 'category',
			data: ['东部', '中部', '西部']
		},
		series: [{
			name: '全县',
			type: 'bar',
			barWidth: '20%',
			data: [0.65, 0.7, 0.75, 0.80],
			label: seriesLabel
		}]
	},
	commonPie0: {
		title,
		color: ['#f5a72b', '#00b2f2', '#66ce33'],
		tooltip: {
			trigger: 'item',
			formatter: '{b} : {c} ({d}%)'
		},
		legend: {
			bottom: 10,
			left: 'center',
			data: ['东部', '中部', '西部']
		},
		grid: {
			...grid,
			top: '15%',
			bottom: '15%',
		},
		series: [{
			type: 'pie',
			radius: ['50%', '70%'],
			selectedMode: 'single',
			data: [{
					value: 15,
					name: '东部',
				},
				{
					value: 30,
					name: '中部'
				},
				{
					value: 26,
					name: '西部'
				}
			],
			itemStyle: {
				normal: {
					label: {
						show: true,
						formatter: '{b}:{c}({d}%)'
					}
				},
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	},
	commonRegionArticle: {
		title,
		tooltip,
		grid: {
			...grid,
			top: '10%',
			right: '15%',
			bottom: '5%',
			left: '5%'
		},
		xAxis: {
			name: '隐患点',
			type: 'category',
			data: []
		},
		yAxis: {
			name: '数量(个)',
			type: 'value',
			splitLine: {
				show: false
			},
		},
		series: [{
			data: [],
			type: 'bar',
			barWidth: '20%',
			itemStyle: {
				normal: {
					color: '#1B84EA',
					label: {
						show: true,
						position: 'top',
						formatter: (payload) => Number(payload.value).toFixed(2) * 100 + '%'
					}
				}
			},
		}]
	},
	commonRegionAside: {
		title: {
			...title,
			text: '上报隐患类型',
			textStyle: {
				...title.textStyle,
				color: '#1B84EA'
			}
		},
		color: ['#3b7fd2', '#d63b37', '#a2ce47', '#8058ae', '#34b8de', '#ff953f'],
		tooltip: {
			trigger: 'item',
			formatter: '{b} : {c} ({d}%)'
		},
		legend: {
			bottom: 10,
			left: 'center',
			data: ['爆管', '暗漏', '水泵机组', '阀门', '变压器', '其它设备']
		},
		series: [{
			type: 'pie',
			radius: '65%',
			center: ['50%', '50%'],
			selectedMode: 'single',
			data: [{
					value: 9,
					name: '爆管'
				},
				{
					value: 15,
					name: '暗漏'
				},
				{
					value: 7,
					name: '水泵机组'
				},
				{
					value: 15,
					name: '阀门'
				},
				{
					value: 4,
					name: '变压器'
				},
				{
					value: 46,
					name: '其它设备'
				}
			],
			itemStyle: {
				normal: {
					label: {
						show: true,
						formatter: '{b}:{c}({d}%)'
					}
				},
				labelLine: {
					show: true
				},
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	}
};
