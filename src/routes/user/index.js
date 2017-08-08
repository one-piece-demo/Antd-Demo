import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import styles from './index.less'
import { Row, Col, Popconfirm, Button } from 'antd'

import Filter from './Filter'
import List from './List'
import Add from './Add'

const User = ({dispatch, user, location, loading}) => {
	
	const { list, pagination, currentItem, modalVisible, modalType, selectedRowKeys } = user
  const { pageSize } = pagination
  
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['user/update'],
    title: `${modalType === 'create' ? 'Create User' : 'Update User'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `user/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'user/hideModal',
      })
    },
  }
	
	const filterProps = {
    filter: {},
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onAdd () {
      dispatch({
        type: 'user/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }
  }
	
	const listProps = {
    dataSource: list,
    loading: loading.effects['user/query'],
    pagination,
    location,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'user/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'user/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'user/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }
	
	const handleDeleteItems = () => {
    dispatch({
      type: 'user/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }
	
	return (
		<div className='content-inner'>
			<Filter {...filterProps}/>
			{
        selectedRowKeys.length > 0 &&
         <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
           <Col>
             {`Selected ${selectedRowKeys.length} items `}
             <Popconfirm title={'Are you sure delete these items?'} placement="left" onConfirm={handleDeleteItems}>
               <Button type="primary" size="large" style={{ marginLeft: 8 }}>Remove</Button>
             </Popconfirm>
           </Col>
         </Row>
      }
			<List {...listProps} />
			{modalVisible && <Add {...modalProps} />}
		</div>
	)
}

User.PropTypes = {
	user: PropTypes.object,
	dispatch: PropTypes.func,
	location: PropTypes.object,
	loading: PropTypes.object,
}

export default connect(({user, loading}) => ({user, loading}))(User)
