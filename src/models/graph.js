import * as graph from '../services/graph'
import { config } from 'utils'

const { query } = graph
const { prefix } = config

export default {

  namespace: 'graph',

  state: {
  	options: {
      zoom: {
        x:0,
        y:0,
        scale:1.0,
        rotate:0
      }
    },
    chartData:{}
  },

  subscriptions: {
    setup ({ dispatch }) {
      dispatch({type: 'query'})
    },
  },

  effects: {
  	 *query ({
      payload
    }, {call, put}) {
      const {list} = yield call(query, payload)

      const chartData = list[0]
      
      yield put({ type: 'updateState', payload: { chartData } })
    }
  },

  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    updateOptions (state, { payload }) {
      return {
        ...state,
        options: payload.options
      }
    },
  },
}
