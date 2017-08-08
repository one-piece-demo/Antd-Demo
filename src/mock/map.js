const config = require('../utils/config')
const { apiPrefix } = config

module.exports = {
	[`POST ${apiPrefix}/map`] (req, res) {
    const { name } = req.body
    const data = {
    	name:'as'
    }
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  }
}
