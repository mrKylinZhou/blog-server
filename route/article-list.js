const readArticles = require('../service/read-articles')
const Success = require('../models/success')
const Error = require('../models/error')

const GetArticles = async ctx => {
  try {
    const articles = await readArticles()
    ctx.body = new Success({
      code: 0,
      data: articles
    })
  } catch(e) {
    ctx.body = new Error({
      code: -1,
      msg: e.message
    })
  }
}

module.exports = router => {
  router.get('/api/articles', GetArticles)
}
