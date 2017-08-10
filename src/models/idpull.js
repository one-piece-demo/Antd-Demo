import * as pullthrough from '../services/pullthrough'
import { config } from 'utils'

const { query } = pullthrough
const { prefix } = config

export default {

  namespace: 'IDpull',

  state: {
    data:[],
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

      const data = list
      
      yield put({ type: 'updateState', payload: { data } })

      yield put({ type: 'setChartData', payload: { key: 'GID' } })
    }
  },

  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    setChartData(state, {payload}) {
      let data = state.data
      let key = payload.key

      var tData = {
        obj: { name: key, value: 0 },
        relations: []
      };
      var obj = {
        weibo: '微博',
        qq: 'QQ',
        cell: '(手机)',
        gid: 'GID',
        email: '邮箱',
        imei: 'IMEI',
        idcard: '(身份证)'
      }
      for(var attr in obj){
        for(var i=0; i<data.length; i++){
          if(data[i].level1 === attr){
            data[i].level1 = obj[attr];
          }
          if(data[i].level2 === attr){
            data[i].level2 = obj[attr];
          }
        }
      }
      for(var i=0; i<data.length; i++) {
        if(data[i].level1 === key && data[i].level2_total !== 0) {
          tData.obj.value = data[i].level1_total;
          tData.relations.push({
            name: data[i].level2,
            value: data[i].level2_total,
            distance: data[i].value
          });
        }
        else if(data[i].level2 === key && data[i].level2_total !== 0) {
          tData.obj.value = data[i].level2_total;
          tData.relations.push({
            name: data[i].level1,
            value: data[i].level1_total,
            distance: data[i].value
          });
        }
       
      }
      return {
        ...state,
        chartData: tData
      }
    }
  },
}
