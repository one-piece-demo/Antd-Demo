import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Button} from 'antd' 
import city from '../../utils/city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const Add = ({
	item = {}, //初始化参数
	onOk,
	onCancel,
	form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
	
	const handleOk = () => { 
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      data.address = data.address.join(' ')
      onOk(data)
    })
  }
	
	const handleCancel = () => {
		onCancel()
	}

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
    onCancel: handleCancel
  }
	return (
		<Modal
		
      footer={[
        <Button key="back" size="large" onClick={handleCancel}>取消</Button>,
        <Button key="submit" type="primary" size="large" onClick={handleOk}>
          确认
        </Button>,
      ]}
      
      {...modalOpts}
    >
      <Form layout="horizontal">
      	<FormItem label="Name" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="NickName" hasFeedback {...formItemLayout}>
          {getFieldDecorator('nickName', {
            initialValue: item.nickName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Gender" hasFeedback {...formItemLayout}>
          {getFieldDecorator('isMale', {
            initialValue: item.isMale,
            rules: [
              {
                required: true,
                type: 'boolean',
              },
            ],
          })(
            <Radio.Group>
              <Radio value>Male</Radio>
              <Radio value={false}>Female</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="Age" hasFeedback {...formItemLayout}>
          {getFieldDecorator('age', {
            initialValue: item.age,
            rules: [
              {
                required: true,
                type: 'number',
              },
            ],
          })(<InputNumber min={18} max={100} />)}
        </FormItem>
        <FormItem label="Phone" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: item.phone,
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: 'The input is not valid phone!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="E-mail" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: item.email,
            rules: [
              {
                required: true,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: 'The input is not valid E-mail!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Address" hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: item.address && item.address.split(' '),
            rules: [
              {
                required: true,
              },
            ],
          })(<Cascader
            size="large"
            style={{ width: '100%' }}
            options={city}
            placeholder="Pick an address"
          />)}
        </FormItem>
      </Form>
    </Modal>	
	)
}

Add.PropTypes = {
	form: PropTypes.object.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Form.create()(Add)


