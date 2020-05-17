const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan');


//import routes
const articleRouter = require('./routes/articles')
const app = express()

//mongodb connection
mongoose.connect('mongodb://localhost/blog',{
    useNewUrlParser: true, useUnifiedTopology: true,    
    })
    .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });


app.set('view engine','ejs')

app.use(express.urlencoded({ extended: false }))

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

//middleware
app.use(morgan('dev'));

// routes middleware
app.use('/articles', articleRouter)

//localhost port
const port = process.env.PORT || 5050;

app.listen(port,()=>{
    console.log(`Server is runnig on port: ${port}`);
})