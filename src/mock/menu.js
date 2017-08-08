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
    id: '5',
    bpid: '1',
    name: 'Recharts',
    icon: 'code-o',
  },
  {
    id: '51',
    bpid: '5',
    mpid: '5',
    name: 'LineChart',
    icon: 'line-chart',
    route: '/recharts/lineChart',
  },
  {
    id: '52',
    bpid: '5',
    mpid: '5',
    name: 'BarChart',
    icon: 'bar-chart',
    route: '/recharts/barChart',
  },
  {
    id: '53',
    bpid: '5',
    mpid: '5',
    name: 'AreaChart',
    icon: 'area-chart',
    route: '/recharts/areaChart',
  },
]

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
