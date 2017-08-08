import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import styles from './index.less';
import { config, tools } from 'utils'
import {Row, Col, Card, Icon, Table } from 'antd'
import CountUp from 'react-countup'
import {EchartsChart} from 'components'
import {Browser, User} from './components/'

import {LineScore, pie} from './chartsOption'

import mapOption from './mapTravel'

const bodyStyle = {
  bodyStyle: {
  	marginBottom: '24px',
  	padding: '8px',
    background: '#fff',
  },
}

function Dashboard({dashboard, dispatch}) {
	const {consumeCount, browser, userInfo} = dashboard
	const chart_options = LineScore()
	const pie_options = pie()
  return (
    <div className={styles.dashboard}>
    	<Row gutter={24}>
	      <Col className="gutter-row" lg={6} md={12}>
	        <Card bordered={false} 
	        	title={<p className={styles.card_title}>
	        		<Icon type='shopping-cart' className={styles.card_title_icon} style={{color:'#a5d6a7'}}/>
	        		Clothes
	        	</p>}
	        	bodyStyle={{
	          padding: '24px 36px 24px 0',
	        }}>
	        	<p className={styles.number_count}>
		        	<CountUp
		            start={0}
		            end={consumeCount.clothes && consumeCount.clothes.num}
		            duration={2.75}
		            useEasing
		            useGrouping
		            separator=","
		          />
		        	<span className={styles.error}>￥</span>
		        </p>
	        </Card>
	      </Col>
	      <Col className="gutter-row" lg={6} md={12}>
	        <Card bordered={false} title={<p className={styles.card_title}>
	        		<Icon type='coffee' className={styles.card_title_icon} style={{color:'#ef9a9a'}}/>
	        		Foods
	        	</p>} bodyStyle={{
	          padding: '24px 36px 24px 0',
	        }}>
		        <p className={styles.number_count}>
		        	<CountUp
		            start={0}
		            end={consumeCount.food && consumeCount.food.num}
		            duration={2.75}
		            useEasing
		            useGrouping
		            separator=","
		          />
		        	<span className={styles.error}>￥</span>
		        </p>
	        </Card>
	      </Col>
	      <Col className="gutter-row" lg={6} md={12}>
	        <Card bordered={false} title={<p className={styles.card_title}>
	        		<Icon type='home' className={styles.card_title_icon} style={{color:'#ce93d8'}}/>
	        		Home
	        	</p>} bodyStyle={{
	          padding: '24px 36px 24px 0',
	        }}>
		        <p className={styles.number_count}>
		        	<CountUp
		            start={0}
		            end={consumeCount.home && consumeCount.home.num}
		            duration={2.75}
		            useEasing
		            useGrouping
		            separator=","
		          />
		        	<span className={styles.error}>￥</span>
		        </p>
	        </Card>
	      </Col>
	      <Col className="gutter-row" lg={6} md={12}>
	        <Card bordered={false} title={<p className={styles.card_title}>
	        		<Icon type='car' className={styles.card_title_icon} style={{color:'#90caf9'}}/>
	        		Travel
	        	</p>} bodyStyle={{
	          padding: '24px 36px 24px 0',
	        }}>
		        <p className={styles.number_count}>
		        	<CountUp
		            start={0}
		            end={consumeCount.travel && consumeCount.travel.num}
		            duration={2.75}
		            useEasing
		            useGrouping
		            separator=","
		          />
		        	<span className={styles.error}>￥</span>
		        </p>
	        </Card>
	      </Col>
	      <Col lg={16} md={24}>
	      	<div className={styles.chartBox}>
	      		<Card bordered={false} {...bodyStyle}>
	      			<EchartsChart options={chart_options}/>
	      		</Card>	      		
	      	</div>
	      </Col>
	      <Col lg={8} md={24}>
	      	<div className={styles.chartBox}>
	      		<Card bordered={false} {...bodyStyle}>
	      			<EchartsChart options={pie_options}/>
	      		</Card>	      		
	      	</div>
	      </Col>
	      <Col lg={12} md={24}>
	      	<div>
	      		<Card bordered={false} {...bodyStyle}>
	      			<Browser data={browser}/>
	      		</Card>	      		
	      	</div>
	      </Col>
	      <Col lg={12} md={24}>
	      	<div>
	      		<Card bordered={false} {...bodyStyle}>
	      			<User {...userInfo}/>
	      		</Card>	      		
	      	</div>
	      </Col>
	      <Col lg={24} md={24}>
      		<Card bordered={false} {...bodyStyle}>
	      		<div className={styles.chartBox_map}>
	      			<EchartsChart options={mapOption} showMapName='china'/>
	      		</div>
      		</Card>	 
	      </Col>
	    </Row>
    </div>
  );
}

Dashboard.propTypes = {
	dashboard: PropTypes.object,
	dispatch: PropTypes.func,
};

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard);
