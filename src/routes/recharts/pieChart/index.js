import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, Button } from 'antd'
import Container from '../Container'
import {
	PieChart, 
  Pie, 
  Legend,
  Sector, 
  Cell,
  Tooltip
} from 'recharts'

const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}]
const data02 = [{name: 'A1', value: 100},
                    {name: 'A2', value: 300},
                   {name: 'B1', value: 100},
                   {name: 'B2', value: 80},
                   {name: 'B3', value: 40},
                   {name: 'B4', value: 30},
                   {name: 'B5', value: 50},
                  {name: 'C1', value: 100},
                  {name: 'C2', value: 200},
                   {name: 'D1', value: 150},
                   {name: 'D2', value: 50}]


const colProps = {
  lg: 12,
  md: 24,
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'}  dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const TwoLevelPieChart  = () => (
  <Container>
   <PieChart width={600} height={300}>
    <Pie data={data01} cx={200} cy={120} dataKey='value' outerRadius={60} fill="#8884d8"/>
    <Pie data={data02} cx={200} cy={120} dataKey='value' innerRadius={70} outerRadius={90} fill="#82ca9d" label/>
   </PieChart>
  </Container>
)

const SimplePieChart  = () => (
  <Container>
    <PieChart width={600} height={300}>
      <Pie
        data={data01} 
        cx={300} 
        cy={120} 
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80} 
        fill="#8884d8"
        dataKey='value'
      >
        {
          data01.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
        }
      </Pie>
    </PieChart>
  </Container>
)

const TwoSimplePieChart = () => (
  <Container>
    <PieChart width={800} height={300}>
        <Pie isAnimationActive={false} data={data01} dataKey='value' cx={200} cy={120} outerRadius={80} fill="#8884d8" label/>
        <Pie data={data02} cx={500} cy={120} dataKey='value' innerRadius={40} outerRadius={80} fill="#82ca9d"/>
        <Tooltip/>
       </PieChart>
  </Container>
)


const PieCharts = () => {
	
	return (
		<div className="content-inner">
	    <Button type="primary" size="large" style={{
	      position: 'absolute',
	      right: 0,
	      top: -48,
	    }}>
	      <a href="http://recharts.org/#/en-US/examples/TinyBarChart" target="blank">Show More</a>
	    </Button>
	    <Row gutter={32}>
	      <Col {...colProps}>
	        <Card title="TwoLevelPieChart">
	          <TwoLevelPieChart />
	        </Card>
	      </Col>
	      <Col {...colProps}>
	        <Card title="SimplePieChart">
	          <SimplePieChart />
	        </Card>
	      </Col>
        <Col md={24}>
          <Card title="TwoSimplePieChart">
            <TwoSimplePieChart />
          </Card>
        </Col>
	    </Row>
	  </div>
	)
}

PieCharts.PropTypes = {
	
}

export default PieCharts
