//require
const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes/')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
require('./config/mongoose')
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
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.successMsg = req.flash('successMsg')
  res.locals.warningMsg = req.flash('warningMsg')
  next()
})
app.use(routes)

//開啟伺服器
app.listen(PORT, () => {
  console.log(`server works successfully![http://localhost:${PORT}]`)
})
