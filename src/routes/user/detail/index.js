import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Upload, Icon, Modal, Row, Col } from 'antd';

const Detail = ({ userDetail, dispatch }) => {
  const { data, previewVisible, previewImage, fileList } = userDetail
  const content = []
  for (let key in data) {
    if ({}.hasOwnProperty.call(data, key)) {
      content.push(<div key={key} className={styles.item}>
        <div>{key}</div>
        <div>{String(data[key])}</div>
      </div>)
    }
  }
  
  const handleCancel = () => {
  	dispatch({
        type: 'userDetail/updateState',
        payload: {
          previewVisible: false
        },
     })
  }

  const handlePreview = (file) => {
  	dispatch({
        type: 'userDetail/updateState',
        payload: {
          previewImage: file.url || file.thumbUrl,
      		previewVisible: true,
        },
    })
  }
  
  const handleChange = ({ fileList }) => {
  	dispatch({
        type: 'userDetail/updateState',
        payload: {
          fileList
        },
    })
  }
  
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (<div className="content-inner">
    <div className={styles.content}>
    	<Row gutter={24}>
    		<Col md={6} xs={24}>
    			<Upload
	          action="//jsonplaceholder.typicode.com/posts/"
	          listType="picture-card"
	          fileList={fileList}
	          onPreview={handlePreview}
	          onChange={handleChange}
	        >
	          {fileList.length >= 1 ? null : uploadButton}
	        </Upload>  			
    		</Col>
    		<Col md={18} xs={24}>
    			{content}
    		</Col>
    	</Row>
    </div>
    <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
      <img alt="example" style={{ width: '100%' }} src={previewImage} />
    </Modal>
  </div>)
}

Detail.propTypes = {
  userDetail: PropTypes.object,
  loading: PropTypes.bool,
  dispatch: PropTypes.func,
}

export default connect(({ userDetail, loading }) => ({ userDetail, loading: loading.models.userDetail }))(Detail)
