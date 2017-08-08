const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

module.exports = {
  name: 'AntD Demo',
  prefix: 'antdDemo',
  footerText: 'Ant Design && Dva  Demo  © 2017 by NARUTOne',
  logo: '/code.png',
  YQL: [],
  CORS: [],
  openPages: ['/login'],
  homePages: ['/home'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    menus: `${APIV1}/menus`,
    dashboard: `${APIV1}/dashboard`,
  },
}
