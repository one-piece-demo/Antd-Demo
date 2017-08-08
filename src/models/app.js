import { query, logout } from '../services/app'
import * as menusService from '../services/menus'
import { routerRedux } from 'dva/router'
import config from 'config'
import { parse } from 'qs'

export default {
	namespace: 'app',
	state: {
		user: {},
		isCollapsed: false,
		menu: [
      {
        id: 1,
        icon: 'laptop',
        name: 'Dashboard',
        router: '/dashboard',
      },
    ],
    isNavbar: document.body.clientWidth < 769,
	},
	subscriptions: {
		setup ({ dispatch }) {
			//登录验证
      dispatch({ type: 'query' })
      
      // 移动 端导航
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },
	},
	effects: {
		*query ({
      payload,
    }, { call, put }) {
    	
      const { success, user } = yield call(query, payload)      
      if (success && user) {
      	
      	const { list } = yield call(menusService.query)
      	
      	let menu = list
      	
        yield put({
          type: 'updateState',
          payload: {
            user,
            menu
          },
        })
        if (location.pathname === '/login') {
          yield put(routerRedux.push('/home'))
        }
      } else {
        if (config.homePages && config.homePages.indexOf(location.pathname) < 0 && config.openPages.indexOf(location.pathname) < 0) {
          let from = location.pathname
          window.location = `${location.origin}/login?from=${from}`
        }
      }
    },

    *logout ({
      payload,
    }, { call, put }) {
      const data = yield call(logout, parse(payload))
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        throw (data)
      }
    },
     *changeNavbar ({
      payload,
    }, { put, select }) {
      const { app } = yield(select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },
		
	},
	reducers: {
		updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    toggle (state, { payload }) {
     	return {
        ...state,
        isCollapsed: payload.isCollapsed,
      }
  	},
  	handleNavbar (state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },
	}
}
