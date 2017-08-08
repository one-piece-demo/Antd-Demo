import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import {clusterData} from 'utils/graph'
import {GraphChart} from 'components'

const {ClusterChart} = GraphChart

class Graph extends Component {
	constructor(props) { // 初始化的工作放入到构造函数
    super(props); // 在 es6 中如果有父类，必须有 super 的调用用以初始化父类信息
  }

  componentDidMount() {
		this.initZoom()

		window.onresize = () => {
			this.initZoom()
		}
	}

	initZoom() {
		const srceenWidth = window.screen.availWidth
		const w = this.refs.chart.clientWidth
		const h = this.refs.chart.clientHeight
		const scale = 0.8 * (w/srceenWidth)

		const zoom = {
			x: w /2,
			y: h /2,
			scale: scale,
			rotate: 0
		}

		const options = {
			zoom: zoom
		}
		
		this.props.dispatch({ type: 'graph/updateOptions', payload: { options} })
	}

  render() {
		return (
			<div className={styles.chartBox} ref='chart'>
				<ClusterChart data={clusterData} options={this.props.graph.options}/>
			</div>
		)
  }
}

Graph.PropTypes = {}

export default connect(({ graph })=>({ graph }))(Graph);