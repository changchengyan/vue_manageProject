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
	chartCommon: {
		title,
		color: ['#f5a72b'],
		tooltip: {
			show: true
		},
		xAxis: {
			type: 'category',
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			data: [820, 932, 901, 934, 1290, 1330, 1320],
			type: 'line'
		}]
	},
};
