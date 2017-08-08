const LineScore = (data) => {
	const option = {
    title: {
        text: '近年消费趋势'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['clothes','foods','home','travel']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2010','2011','2012','2013','2014','2015','2016']
    },
    yAxis: {
        type: 'value',
        name:'￥（元）'
    },
    series: [
        {
            name:'clothes',
            type:'line',
            smooth: true,
            stack: '总量',
            data:[1200, 1320, 1010, 1340, 900, 2300, 2100]
        },
        {
            name:'foods',
            type:'line',
            smooth: true,
            stack: '总量',
            data:[2200, 1820, 1910, 2340, 2900, 3300, 3100]
        },
        {
            name:'home',
            type:'line',
            smooth: true,
            stack: '总量',
            data:[1500, 2320, 2010, 1540, 1900, 3300, 4100]
        },
        {
            name:'travel',
            type:'line',
            smooth: true,
            stack: '总量',
            data:[3200, 3320, 3010, 3340, 3900, 3300, 3200]
        }
    ]
	};
 
	return option
}

const pie = (data) => {
	const option = {
    title : {
        text: '消费占比',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['clothes','foods','home','travel']
    },
    series : [
        {
            name: '消费占比',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:1350, name:'clothes'},
                {value:3200, name:'foods'},
                {value:3860, name:'home'},
                {value:1650, name:'travel'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
	};

	return option
}

export {
	LineScore,
	pie
}