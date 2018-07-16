const readArticle = require('../service/read-article')
const Success = require('../models/success')
const Error = require('../models/error')

const GetArticle = async ctx => {
  const name = ctx.params.name;
  try {
    const article = await readArticle(name)
    ctx.body = new Success({
      code: 0,
      data: article
    })
  } catch (e) {
    ctx.body = new Error({
      code: -1,
      msg: e.message
    })
  }
}

module.exports = router => {
  router.get('/api/article/:name', GetArticle)
}
