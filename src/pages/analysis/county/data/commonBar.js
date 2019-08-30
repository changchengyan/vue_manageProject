// https://echarts.baidu.com/echarts2/doc/example/themeDesigner.html
// function formatNum(strNum) {
// 	if (strNum.length <= 3) {
// 		return strNum;
// 	}
// 	if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
// 		return strNum;
// 	}
// 	var a = RegExp.$1,
// 		b = RegExp.$2,
// 		c = RegExp.$3;
// 	var re = new RegExp();
// 	re.compile('(\\d)(\\d{3})(,|$)');
// 	while (re.test(b)) {
// 		b = b.replace(re, '$1,$2$3');
// 	}
// 	return a + '' + b + '' + c;
// }

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
	right: '15%',
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
			// color: 'black',
			fontSize: 16,
			fontWeight: 600
		},
		formatter: (payload = {}) => (Number(payload.value) * 100).toFixed(2) + '%',
	}
};

const itemStyle = {
	normal: {
		label: {
			...seriesLabel.normal,
			position: 'top',
			// formatter(p) {
			// 	console.warn(formatNum(p.value), 'formatter');
			// 	return formatNum(p.value);
			// },
			formatter: null
		},
		color(payload) {
			if (payload.dataIndex > 5) return '#28ab75';
			return '#1B84EA';
		}
	},
	emphasis: {
		shadowBlur: 10,
		shadowOffsetX: 0,
		shadowColor: 'rgba(0, 0, 0, 0.5)'
	},
};

export default {
	// commonBarCenter1: {
	// 	title,
	// 	dataset: {
	// 		source: [
	// 			['amount', 'product'],
	// 			[1, '全县'],
	// 			[2, '东部'],
	// 			[3, '中部'],
	// 			[4, '西部']
	// 		]
	// 	},
	// 	grid,
	// 	xAxis: {
	// 		name: ''
	// 	},
	// 	yAxis: {
	// 		name: '',
	// 		type: 'category'
	// 	},
	// 	series: [{
	// 		type: 'bar',
	// 		encode: {
	// 			x: 'amount',
	// 			y: 'product'
	// 		},
	// 		barWidth: 10,
	// 		itemStyle
	// 	}]
	// },
	commonBarCenter: {
		title,
		tooltip,
		grid,
		xAxis: {
			type: 'value',
			axisLabel: {
				show: true,
				interval: 0,
				// rotate: 45,
				fontSize: 10,
				formatter: (data) => (Number(data) * 100).toFixed(2) + '%'
			},
			splitLine: {
				show: false
			},
		},
		yAxis: {
			type: 'category',
			data: ['全县', '东部', '中部', '西部']
		},
		series: [{
			name: '全县',
			type: 'bar',
			barWidth: '20%',
			data: [0.65, 0.7, 0.75, 0.80],
			label: seriesLabel
		}]
	},
	commonBarEnd: {
		title,
		legend: {
			orient: 'horizontal',
			itemGap: 100,
			x: 'center',
			y: 'bottom'
		},
		xAxis: {
			name: '月份',
			type: 'category',
			data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
		},
		yAxis: {
			name: '万m³',
			type: 'value',
			splitLine: {
				show: false
			},
		},
		grid: {
			...grid,
			top: '8%',
			right: 0,
		},
		series: [{
			data: [4.669, 4.798, 5.578, 5.851, 6.134, 6.240, 6.578, 8.351, 6.737, 5.270, 4.512, 4.436],
			type: 'bar',
			// barWidth: 20,
			barWidth: '20%',
			itemStyle
		}]
	},
	commonPie: {
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
					// label: {
					// 	normal: {
					// 		formatter: [
					// 			'{title|{b}}{abg|}',
					// 			'  {weatherHead|天气}{valueHead|天数}{rateHead|占比}',
					// 			'{hr|}',
					// 			'  {Sunny|}{value|202}{rate|55.3%}',
					// 			'  {Cloudy|}{value|142}{rate|38.9%}',
					// 			'  {Showers|}{value|21}{rate|5.8%}'
					// 		].join('\n'),
					// 		backgroundColor: '#eee',
					// 		borderColor: '#777',
					// 		borderWidth: 1,
					// 		borderRadius: 4,
					// 		rich: {
					// 			title: {
					// 				color: '#eee',
					// 				align: 'center'
					// 			},
					// 			abg: {
					// 				backgroundColor: '#333',
					// 				width: '100%',
					// 				align: 'right',
					// 				height: 25,
					// 				borderRadius: [4, 4, 0, 0]
					// 			},
					// 			weatherHead: {
					// 				color: '#333',
					// 				height: 24,
					// 				align: 'left'
					// 			},
					// 			hr: {
					// 				borderColor: '#777',
					// 				width: '100%',
					// 				borderWidth: 0.5,
					// 				height: 0
					// 			},
					// 			value: {
					// 				width: 20,
					// 				padding: [0, 20, 0, 30],
					// 				align: 'left'
					// 			},
					// 			valueHead: {
					// 				color: '#333',
					// 				width: 20,
					// 				padding: [0, 20, 0, 30],
					// 				align: 'center'
					// 			},
					// 			rate: {
					// 				width: 40,
					// 				align: 'right',
					// 				padding: [0, 10, 0, 0]
					// 			},
					// 			rateHead: {
					// 				color: '#333',
					// 				width: 40,
					// 				align: 'center',
					// 				padding: [0, 10, 0, 0]
					// 			}
					// 		}
					// 	}
					// }
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
				},
				normal: {
					label: {
						show: true,
						formatter: '{b}:{c}({d}%)'
					}
				},
				labelLine: {
					show: true
				}
			}
		}]
	}
};
