const title = {
	text: '',
	x: 'center',
	y: 'top',
	textStyle: {
		color: '#1B84EA',
		fontStyle: 'normal',
		fontWeight: '600',
		fontFamily: 'Microsoft Yahei',
		fontSize: 16
	}
};

module.exports = {
	ArticleBarParams1: {
		title,
		color: ['#28ab75', '#1b84ea', '#22cdab', '#f5a72b'],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			bottom: 10,
			left: 'center',
			data: []
		},
		calculable: true,
		xAxis: [{
			type: 'category',
			axisTick: {
				show: false
			},
			splitLine: {
				show: false
			},
			data: ['2019年1月', '2019年2月', '2019年3月', '2019年4月', '2019年5月', '2019年6月']
		}],
		yAxis: [{
				type: 'value',
				name: '',
				splitLine: {
					show: false
				},
				axisLabel: {
					formatter: '{value}'
				}
			},
			{
				type: 'value',
				name: '',
				splitLine: {
					show: false
				},
				axisLabel: {
					formatter: value => (value * 100 + '%')
				}
			}
		],
		series: [{
			name: '',
			type: 'bar',
			barGap: 0,
			barWidth: 20,
			data: []
		}]
	},
	AsideBarParams1: {
		title,
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		grid: {
			top: '15%',
			right: '15%',
			bottom: '2%',
			left: '2%',
			containLabel: true
		},
		color: ['#00b2f2'],
		xAxis: {
			type: 'value',
			axisLabel: {
				show: true,
				interval: 0,
				fontSize: 10,
				formatter: (data) => (Number(data) * 100).toFixed(2) + '%'
			},
			splitLine: {
				show: false
			},
		},
		yAxis: {
			type: 'category',
			data: ['东部分公司', '同心分公司', '西部分公司', '海原分公司']
		},
		series: [{
			name: '全县',
			type: 'bar',
			// barWidth: '20%',
			barWidth: 20,
			barGap: 0,
			data: [0.1572, 0.1216, 0.1732, 0.1489, 0.1357],
			label: {
				normal: {
					show: true,
					position: 'right',
					textStyle: {
						fontSize: 16,
						fontWeight: 600
					},
					formatter: (payload = {}) => (Number(payload.value) * 100).toFixed(2) + '%',
				}
			}
		}]
	},
	AsideBarParams2: {
		title,
		color: ['#1b84ea', '#f5a72b', '#f5a72b'],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			bottom: 10,
			left: 'center',
			data: []
		},
		calculable: true,
		xAxis: [{
			type: 'category',
			axisTick: {
				show: false
			},
			data: []
		}],
		yAxis: [{
				type: 'value',
				name: '',
				axisLabel: {
					formatter: '{value} m³'
				}
			},
			{
				type: 'value',
				name: '',
				axisLabel: {
					formatter: value => (value * 100 + '%')
				}
			}
		],
		series: [{
			name: '',
			type: 'bar',
			barGap: 0,
			data: []
		}]
	},
};
