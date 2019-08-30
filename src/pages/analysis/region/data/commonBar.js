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
	right: '17%',
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
		}
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
	commonLineStart: {
		title: {
			...title,
			text: '东部水费收缴变化趋势图'
		},
		color: ['#00b2f2', '#66ce33'],
		// legend: {
		// 	orient: 'horizontal',
		// 	itemGap: 100,
		// 	x: 'center',
		// 	y: 'bottom',
		// 	data: ['应缴水费', '实缴水费']
		// },
		legend: {
			// orient: 'vertical',
			// top: 'middle',
			bottom: 0,
			left: 'center',
			data: ['应缴水费', '实缴水费']
		},
		tooltip,
		grid: {
			...grid,
			top: '12%',
			right: 0,
			bottom: '12%'
		},
		xAxis: {
			type: 'category',
			data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
		},
		yAxis: {
			type: 'value',
			splitLine: {
				show: false
			},
		},
		series: [{
			name: '应缴水费',
			// data: [20000, 21000, 22000, 23000, 24000, 25000, 26000, 27000, 28000, 29000, 21000, 21100],
			data: [35824.91, 44811.09, 50343.01, 56162.78, 62270.41, 66363.05, 72470.68, 88375.40, 65227.03, 47835.76,
				41958.71, 36081.65
			],
			type: 'line'
		}, {
			name: '实缴水费',
			// data: [30000, 31000, 32000, 33000, 34000, 35000, 36000, 37000, 38000, 39000, 31000, 31100],
			data: [29601.02, 37026.02, 41596.87, 46405.57, 51452.11, 54833.73, 59880.27, 73021.85, 53895.07, 39525.21,
				34669.18, 29813.15
			],
			type: 'line'
		}]
	},
	commonBarCenter: {
		title,
		tooltip,
		grid,
		xAxis: {
			type: 'value',
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
		tooltip: {
			trigger: 'item',
			formatter(payload = {}) {
				const {
					dataIndex = 0
				} = payload;

				if (dataIndex > 5) return '预计用水';
				return '实际用水';
			}
		},
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
			type: 'value',
			name: '万m³',
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
			// data: [46.695, 47.985, 55.783, 58.510, 61.347, 62.407, 65.783, 83.510, 67.375, 52.707, 45.124, 44.356],
			// data: [4.670, 4.799, 5.578, 5.851, 6.135, 6.241, 6.578, 8.351, 6.738, 5.271, 4.512, 4.436],
			data: [1.244, 1.556, 1.748, 1.951, 2.163, 2.305, 2.517, 3.070, 2.265, 1.661, 1.457, 1.253],
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
					value: 1,
					name: '东部片区',
				},
				{
					value: 3,
					name: '预旺镇'
				},
				{
					value: 4,
					name: '高马庄乡'
				},
				{
					value: 2,
					name: '张家塬乡',
				},
				{
					value: 5,
					name: '维州镇'
				},
				{
					value: 1,
					name: '韦州镇'
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
