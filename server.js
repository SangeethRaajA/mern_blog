const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://localhost/blog',{
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine','ejs')

app.use(express.urlencoded({extended: false}))

app.get('/',(req,res) =>{
    const articles = [{
        title : 'test article',
        createdAt : new Date(),
        description : 'test desciption 1'
    },
    {
        title : 'test article 2',
        createdAt : new Date(),
        description : 'test desciption 2'
    }]
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5003)