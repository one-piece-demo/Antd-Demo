const Mock = require('mockjs')
const { config } = require('./common')

const { apiPrefix } = config

const numObj = Mock.mock({
  "gid|1000-10000": 1001,
  "qq|300-1000": 301,
  "cell|200-1000": 301,
  "email|100-1000": 301,
  "imei|50-500": 301,
  "idcard|200-1000": 301,
  "weibo|260-800": 301,
})

const pullThroughData = Mock.mock([
	{
		"level1": "gid",
		"level1_total": numObj['gid'],
		"level2": "qq",
		"level2_total": numObj['qq'],
		"value|100-300": 102
	},
	{
		"level1": "gid",
		"level1_total": numObj['gid'],
		"level2": "cell",
		"level2_total": numObj['cell'],
		"value|100-200": 102
	},
	{
		"level1": "gid",
		"level1_total": numObj['gid'],
		"level2": "email",
		"level2_total": numObj['email'],
		"value|50-100": 60
	},
	{
		"level1": "gid",
		"level1_total": numObj['gid'],
		"level2": "imei",
		"level2_total": numObj['imei'],
		"value|20-50": 22
	},
	{
		"level1": "gid",
		"level1_total": numObj['gid'],
		"level2": "weibo",
		"level2_total": numObj['weibo'],
		"value|100-260": 102
	},
	{
		"level1": "gid",
		"level1_total": numObj['gid'],
		"level2": "idcard",
		"level2_total": numObj['idcard'],
		"value|100-200": 102
	},
	{
		"level1": "qq",
		"level1_total": numObj['qq'],
		"level2": "cell",
		"level2_total": numObj['cell'],
		"value|100-200": 102
	},
	{
		"level1": "qq",
		"level1_total": numObj['qq'],
		"level2": "weibo",
		"level2_total": numObj['weibo'],
		"value|100-260": 102
	},
	{
		"level1": "idcard",
		"level1_total": numObj['idcard'],
		"level2": "imei",
		"level2_total": numObj['imei'],
		"value|20-50": 22
	},
	{
		"level1": "qq",
		"level1_total": numObj['qq'],
		"level2": "email",
		"level2_total": numObj['email'],
		"value|60-100": 72
	},
	{
		"level1": "weibo",
		"level1_total": numObj['weibo'],
		"level2": "email",
		"level2_total": numObj['email'],
		"value|60-100": 72
	},
])


module.exports = {

  [`GET ${apiPrefix}/pullthrough`] (req, res) {
    res.status(200).json(pullThroughData)
  },
}