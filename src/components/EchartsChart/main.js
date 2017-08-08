/*
  line chart base on echarts.js
*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts'
import {tools, request} from 'utils'

class Chart extends Component {
  constructor(config) {
    super()
    this.config = config;
    this.container = config.container;
    
    this.init()
  }
  
  init() {
  	const _this = this
  	if(_this.config.showMapName) {
    	
    	async function getMap(){
			  return request({
			    url: `/data/map/${_this.config.showMapName}.json`,
			    method: 'get',
			    data: {},
			  })
			}
    	
    	getMap().then(res => {
    		console.log(res)    		
				res && echarts.registerMap(_this.config.showMapName, res);
				_this.renderChart()
			});		
			
    }
  	else {
  		_this.renderChart()
  	}
  }
  
  renderChart() {
  	const myChart = echarts.init(this.container);

    if(this.config.options && !tools.emptyObj(this.config.options)) {
      this.config.options.color = ['#64ea91','#8fc9fb', '#d897eb', '#f69899', '#f8c82e','#f797d6',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
      myChart.setOption(this.config.options);
    }

    window.addEventListener("resize",function(){
      myChart.resize();
    });

    const _this = this
    for (let key in this.config) {
      if(/^on[a-zA-Z]*$/.test(key)) {
        const even = key.substring(2);
        myChart.on(even, function (params) {
          _this.config[key] && _this.config[key](params)
        });
      }
    }  
  }
}

Chart.PropTypes = {
  container: PropTypes.object,
  showMapName:PropTypes.string,
  options: PropTypes.object,
  customProp(props) {
    if(!props.options) {
      return new Error('You echarts chart need a options!')
    }
  }
}

export default Chart
