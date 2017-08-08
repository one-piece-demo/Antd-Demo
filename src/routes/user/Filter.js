import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import moment from 'moment'
import {Form, Button, Row, Col, DatePicker, Input, Cascader } from 'antd'
import city from 'utils/city'

const Search = Input.Search
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}


const Filter = ({
	onAdd, 
	onFilterChange, 
	filter,
	form: {
		getFieldDecorator,
		getFieldsValue,
		setFieldsValue
	}
}) => {
	
	const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }
    return fields
  }
	
	 const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }
	
	const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const handleReset = () => { //重置
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }
  
  const { name, address } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }
	
	return (
		<Row gutter={24}>
			<Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('name', { initialValue: name })(<Search placeholder="Search Name" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('address', { initialValue: address })(
          <Cascader
            size="large"
            style={{ width: '100%' }}
            options={city}
            placeholder="Please pick an address"
            onChange={handleChange.bind(null, 'address')}
        />)}
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }}>
      	<span>createTime</span> &nbsp;
        {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
          <RangePicker style={{ width: '80%' }} size="large" onChange={handleChange.bind(null, 'createTime')} />
        )}
      </Col>
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>Search</Button>
            <Button size="large" onClick={handleReset}>Reset</Button>
          </div>
          <div>
            <Button size="large" type="ghost" onClick={onAdd}>Create</Button>
          </div>
        </div>
      </Col>
		</Row>
	)
}

Filter.PropTypes = {
	filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  onAdd: PropTypes.func,
	form: PropTypes.object,
}

export default Form.create()(Filter)
