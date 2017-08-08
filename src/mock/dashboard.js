import { color } from '../utils/theme'
const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

const Dashboard = Mock.mock({
  consumeCount:{
 		clothes: {
 			'num|100-1000': 1212
 		},
 		food: {
 			'num|2000-10000': 1212
 		},
 		home: {
 			'num|1000-10000': 1212
 		},
 		travel: {
 			'num|1000-10000': 1212
 		},
  },
  browser: [
    {
      name: 'Google Chrome',
      percent: 43.3,
      status: 1,
    },
    {
      name: 'Mozilla Firefox',
      percent: 33.4,
      status: 2,
    },
    {
      name: 'Apple Safari',
      percent: 34.6,
      status: 3,
    },
    {
      name: 'Internet Explorer',
      percent: 12.3,
      status: 4,
    },
    {
      name: 'Opera Mini',
      percent: 3.3,
      status: 1,
    },
    {
      name: 'Chromium',
      percent: 2.53,
      status: 1,
    },
  ],
  userInfo: {
    name: 'NARUTOne',
    email: 'wznarutone326@.gmail.com',
    sales: 3241,
    sold: 3556
  },
})

module.exports = {
  [`GET ${apiPrefix}/dashboard`] (req, res) {
    res.json(Dashboard)
  },
}
