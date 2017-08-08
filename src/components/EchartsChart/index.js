import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDM from 'react-dom'
import classnames from 'classnames'
import Chart from './main'
import styles from './index.less'
import {tools, shouldComponentUpdate} from 'utils'

class EchatsChart extends Component {
	constructor(props) {
		super();
		this.state = {}	
	}

	componentDidMount() {
		this.container = ReactDM.findDOMNode(this.refs.echarts)
		if(this.props.options && !tools.emptyObj(this.props.options)) {

			this.renderChart(this.props)
		}
	}

	componentWillReceiveProps(nextProps) {
		if('options' in nextProps && nextProps.options != this.props.options) {
			
			this.renderChart(nextProps)
		}
	}

	shouldComponentUpdate = shouldComponentUpdate

	renderChart(props) {
		new Chart({
			container:this.container,
			...props
		})
	}

	render() {
		return (
			<div className={styles.echarts_chart}>
				<div className={styles.echarts_chart_box} ref='echarts'>
				</div>
			</div>
		)
	}
}

export default EchatsChart;