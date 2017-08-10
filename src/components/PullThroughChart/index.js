import React, {Component} from 'react' 
import PropTypes from 'prop-types'
import ReactDM from 'react-dom'
import pullChart from './main'
import './index.less'

class PullThroughChart extends Component {
	constructor(props) {
		super();
		
		this.state = {
			
		} 
	}

	componentDidMount() {
		this.container = ReactDM.findDOMNode(this.refs.chart)
		this.data = this.EditData(this.props.data)
		this.data && this.renderChart(this.props)
	}

	componentWillReceiveProps(nextProps) { 
		if('data' in nextProps || 'options' in nextProps) {
			this.data =  this.EditData(nextProps.data)
			this.renderChart(nextProps)
		}
	}

	EditData(data) {
		return data
	}

	renderChart(props) {
		new pullChart({
			container:this.container,
			pullData:this.data,
			...props
		})
	}

	render() {
		return (
			<div className='company-atlas-chart'>
				<div className='atlas-chart-box' ref='chart'>
				</div>
			</div>
		)
	}
}

PullThroughChart.PropTypes = {
	data: React.PropTypes.object.isRequired,
	options: React.PropTypes.object,
	formatData: React.PropTypes.func
}

export default PullThroughChart;