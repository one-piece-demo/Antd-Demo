import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'dva/router'
import { Row, Col, Menu, Icon } from 'antd'
import { config } from 'utils'

import styles from './index.less'

const SubMenu = Menu.SubMenu

const Header = ({user, logout, location}) => {
	let handleClickMenu = e => e.key === 'logout' && logout()
  return (
    <div className={styles.header}>
    	<Row>
	      <Col lg={8} xs={12}>
	      	<Link to="/" className={styles.header__logo}>
	      		<img alt={'logo'} src={config.logo} />
            <span>{config.name}</span>
          </Link>
	      </Col>
	      <Col className={styles.header__right}>
	      	<Menu mode="horizontal" onClick={handleClickMenu}>
	          <SubMenu style={{
	            float: 'right',
	          }} title={< span > <Icon type="user" />
	            {user.username} < /span>}
	          >
	            <Menu.Item key="logout">
	              {user.username ? 'Sign out': 'Sign in'}
	            </Menu.Item>
	          </SubMenu>
	        </Menu>
	      </Col>
	    </Row>      
    </div>
  );
};

Header.propTypes = {
	user: PropTypes.object,
  logout: PropTypes.func,
  location: PropTypes.object,
};

export default Header;
