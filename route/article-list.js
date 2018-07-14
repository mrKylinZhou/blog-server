const readArticles = require('../service/read-articles')
const Success = require('../models/success')

const GetArticles = async ctx => {
  const articles = await readArticles()
  console.log(articles)
  ctx.body = new Success({
    code: 0,
    data: articles
  })
}

module.exports = router => {
  router.get('/api/articles', GetArticles)
}
