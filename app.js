//require
const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes/')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//變數宣告
const app = express() 
const PORT = process.env.PORT

//樣板引擎
app.engine('hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

//middleware
app.use(routes)


//開始伺服器
app.listen(PORT, () => {
  console.log(`server works successfully![http://localhost:${PORT}]`)
})
