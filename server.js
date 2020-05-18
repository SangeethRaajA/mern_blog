const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan');
const methodOverride = require('method-override');


//import routes
const Article = require('./models/article')
const articleRouter = require('./routes/articles')

const app = express()

//mongodb connection
mongoose.connect('mongodb://localhost/blog',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,    
    })
    .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });


app.set('view engine','ejs')

app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.get('/', async (req, res) =>{
    const articles = await Article.find().sort({createdAt:'desc'})
    res.render('articles/index', { articles: articles })
})

//middleware
app.use(morgan('dev'));

// routes middleware
app.use('/articles', articleRouter)

//localhost port
const port = process.env.PORT || 5050;

app.listen(port,()=>{
    console.log(`Server is runnig on port: ${port}`);
})