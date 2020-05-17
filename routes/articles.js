const express = require('express')
const Article = require('./../models/article');

const Router = express.Router()

Router.get('/new', (req,res) => {
        res.render('articles/new', { article: new Article() })
})

// router.get('/:id', (req,res) => {
//   const article = Article.findById(req.params.id)
//   res.send(req.params.id)
// })

Router.post('/', async (req, res) =>{
  const article = new Article({
    title : req.body.title,
    description : req.body.description,
    markdown : req.body.markdown
  })

  try{
    article = await article.save()
    res.redirect('/article/${article.id}')
  }catch(e){
    // console.log(e)
    res.render('articles/new', { article: article })
  }
  
})

module.exports = Router