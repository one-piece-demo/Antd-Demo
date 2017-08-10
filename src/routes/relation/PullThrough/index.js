import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import {Row, Col, Table} from 'antd'
import styles from './index.less'
import { PullThroughChart } from 'components'
import { tools } from 'utils'


const columns = [{
  title: '打通类型',
  dataIndex: 'level1',
  key:'level1',
  render: (text, record) => `${record.level1} —— ${record.level2}`
}, {
  title: '打通用户数',
  dataIndex: 'value',
  key:'value',
  render: text => tools.numPoints(text)
}]

var pagination = {
	pageSize : 8
};

class PullThrough extends Component {
	constructor(props) { // 初始化的工作放入到构造函数
    super(props); // 在 es6 中如果有父类，必须有 super 的调用用以初始化父类信息
  }

  relationship(key) {
    this.props.dispatch({ type: 'IDpull/setChartData', payload: { 'key': key} })
  } 

  render () {
  	return (
  		<div className={styles.pullBox}>
	  		<Row gutter={24}>
	  			<Col lg={16} xs={24}>
	  				<div className={styles.chartTitle}>
							<h3>用户ID打通比例</h3>
	  				</div>
						<div className={styles.chartBox} ref='chart'>
							<PullThroughChart data={this.props.IDpull.chartData} formatData={::this.relationship} />
						</div>
	  			</Col>
	  			<Col lg={8} xs={24}>
	  				<div className={styles.pullTable}>
							<Table columns={columns} dataSource={this.props.IDpull.data} pagination={pagination}/>
						</div>
	  			</Col>
	  		</Row>
			</div>
		)
  }	
}
 
PullThrough.PropTypes = {}

export default connect(({ IDpull })=>({ IDpull }))(PullThrough);