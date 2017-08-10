import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import styles from './index.less';
import { config } from 'utils'
import {Button} from 'antd'

function Home({home, dispatch}) {
	const handleGo = () => {
		dispatch({type: 'home/go'})
	}
  return (
    <div className={styles.normal}>
    	<h1 className={styles.logo}>
    		<img alt={'logo'} src={config.logo} />
        <span>{config.name}</span>
    	</h1>
      <p className={styles.title}>Yay! Welcome to antd dva demo!</p>
      <Button className={styles.home_go} type="primary" icon='smile-o' onClick={handleGo}> Let's go </Button>
    </div>
  );
}

Home.propTypes = {
	home: PropTypes.object,
	dispatch: PropTypes.func,
};

export default connect(({home}) => ({home}))(Home);
