import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import NProgress from 'nprogress'
import { classnames, config, particles_param } from 'utils'
import { Layoutx, Loader } from 'components'
import { Layout, Menu, Icon, Popover } from 'antd';
import Particles from 'react-particles-js'
import './app.less'
import '../themes/index.less'

const { prefix, homePages, openPages } = config
const { Header, Footer, Menux, Bread, styles } = Layoutx

const {Sider, Content } = Layout;

let lastHref

const App = ({ children, dispatch, app, loading, location }) => {
	const {user, isCollapsed, menu, isNavbar} = app
  let { pathname } = location
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  const href = window.location.href
  
	const headerProps = {
    user,
    logout () {
      dispatch({ type: 'app/logout' })
    }
  }
	
	const toggle = () => {
    dispatch({ type: 'app/toggle', payload: { isCollapsed: !isCollapsed } })
  }
	
	const menuProps = {
		menu,
		handleClickNavMenu: toggle
	}
	
	const breadProps = {
		menu
	}	
  
  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }
  
  if (openPages && openPages.includes(pathname)) {
    return (<div>
      <Loader spinning={loading.effects['app/query']} />
      {children}
    </div>)
  }
  if (homePages && homePages.includes(pathname)) {
    return (<div>
    	<Particles width={'100%'} height={'100vh'} params={particles_param}/>
      <div className={styles.homeBox}>
      	<Header {...headerProps} />
      	{children}
      	<Footer />
      </div>
    </div>)
  }
  
  return (
    <Layout>
      {!isNavbar ? <Sider
				breakpoint='md'
				collapsedWidth="0"
				trigger={null}
        collapsible
        collapsed={isCollapsed}
      >
        <Menux {...menuProps}/>
      </Sider> : null}
      <Layout>
        <Header {...headerProps} />
        <div>
        	{isNavbar ? <Popover placement="bottomLeft" onVisibleChange={toggle} visible={isCollapsed} overlayClassName={styles.popovermenu} trigger="click" content={<Menux {...menuProps} />}>
	          <div className={styles.slider_btn} onClick={toggle}>
		          <Icon
		            className="trigger"
		            type={isCollapsed ? 'menu-unfold' : 'menu-fold'}
		          />
		        </div>
	        </Popover> :
	        	<div className={styles.slider_btn} onClick={toggle}>
		          <Icon
		            className="trigger"
		            type={isCollapsed ? 'menu-unfold' : 'menu-fold'}
		          />
		        </div>}
	        <Bread {...breadProps}/>
        </div>
        
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          <div className={styles.app_content}>{children}</div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ app, loading }) => ({ app, loading }))(App)
