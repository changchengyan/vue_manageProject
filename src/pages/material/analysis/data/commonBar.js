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

const itemStyle = {
	normal: {
		label: {
			show: true,
			position: 'top',
			textStyle: {
				fontSize: 14,
				fontWeight: 600
			},
		},
		color: '#1B84EA'
	},
	emphasis: {
		shadowBlur: 10,
		shadowOffsetX: 0,
		shadowColor: 'rgba(0, 0, 0, 0.5)'
	},
};

export default {
	commonBarCenter: {
		title,
		tooltip,
		grid,
		xAxis: {
			type: 'value',
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
	commonPieCenter: {
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
			// radius: ['50%', '70%'],
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
			// label: {
			// 	normal: {
			// 		show: true,
			// 		position: 'center',
			// 		formatter(argument) {
			// 			const html = '本月业绩\r\n\r\n' + '50单';
			// 			return html;
			// 		},
			// 		textStyle: {
			// 			fontSize: 15,
			// 			color: '#39CCCC'
			// 		}
			// 	}
			// },
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	},
	commonBarAside: {
		title,
		tooltip,
		grid: {
			...grid,
			top: '10%',
			right: '15%',
		},
		xAxis: {
			name: '隐患点',
			type: 'category',
			axisLabel: {
				rotate: -60
			},
			data: ['小洪沟水源泵站', '小洪沟二泵站', '河东加压泵站', '丁塘加压泵站', '河西二级加压泵站', '河西镇3#联户表井', '庆华村3#联户表井', '韦州镇#联户表井',
				'庆华村3#联户表井', '徐家河湾3#联户表井'
			]
		},
		yAxis: {
			name: '数量(个)',
			type: 'value'
		},
		series: [{
			data: [10, 9, 7, 5, 4, 3, 3, 3, 2, 3],
			type: 'bar',
			barWidth: '20%',
			itemStyle
		}]
	},
	commonPieAside: {
		color: ['#f5a72b', '#00b2f2', '#66ce33'],
		tooltip: {
			trigger: 'item',
			formatter: '{b} : {c} ({d}%)'
		},
		legend: {
			// orient: 'vertical',
			// top: 'middle',
			bottom: 10,
			left: 'center',
			data: ['东部', '中部', '西部']
		},
		series: [{
			type: 'pie',
			radius: '65%',
			center: ['50%', '50%'],
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
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	}
};
