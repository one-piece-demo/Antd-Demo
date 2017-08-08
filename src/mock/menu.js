const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '1',
    icon: 'laptop',
    name: 'Dashboard',
    route: '/dashboard',
  },
  {
    id: '2',
    bpid: '1',
    name: 'Users',
    icon: 'user',
    route: '/user',
  },
  {
    id: '21',
    mpid: '-1',
    bpid: '2',
    name: 'User Detail',
    route: '/user/:id',
  },
  {
    id: '3',
    bpid: '1',
    name: 'Recharts',
    icon: 'code-o',
  },
  {
    id: '31',
    bpid: '3',
    mpid: '3',
    name: 'LineChart',
    icon: 'line-chart',
    route: '/recharts/lineChart',
  },
  {
    id: '32',
    bpid: '3',
    mpid: '3',
    name: 'BarChart',
    icon: 'bar-chart',
    route: '/recharts/barChart',
  },
  {
    id: '33',
    bpid: '3',
    mpid: '3',
    name: 'AreaChart',
    icon: 'area-chart',
    route: '/recharts/areaChart',
  },

  {
    id: '4',
    bpid: '1',
    name: 'relation',
    icon: 'code-o',
  },
  {
    id: '41',
    bpid: '4',
    mpid: '4',
    name: 'Graph',
    icon: 'dot-chart',
    route: '/relation/graph',
  },
  {
    id: '42',
    bpid: '4',
    mpid: '4',
    name: 'IDPullThrough',
    icon: 'api',
    route: '/relation/pullThrough',
  }
]

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
